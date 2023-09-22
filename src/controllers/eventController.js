/* eslint-disable no-console */
const cloudinary = require('cloudinary').v2;
const Events = require('../models/events');
const Images = require('../models/images');
const CommentImages = require('../models/comment_images');
const EventThumbnail = require('../models/event_thumbnail');

cloudinary.config({
  cloud_name: 'ol4juwon',
  api_key: '619781942963636',
  api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
});
const getEvents = async (req, res) => {
  try {
    const events = await Events.find({ limit: 10 });

    res.send(events);
  } catch (error) {
    console.log(error);
  }
};

const createEventController = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    } = req.body;

    const newEvent = {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    };
    const events = await Events.create(newEvent);

    return res.send(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteEventController = async (req, res) => {
  // Extract the event ID from the request parameters
  const eventIdToDelete = req.params.eventId;
  const t = await Events.sequelize.transaction();

  try {
    const relatedImageEvent = await EventThumbnail.findOne({
      where: {
        event_id: eventIdToDelete,
      },
      transaction: t, // Associate the transaction with the query
    });

    console.log(relatedImageEvent);

    // Find related data (images and image_event) associated with the event

    let relatedImage;

    if (relatedImageEvent) {
      relatedImage = await Images.findOne({
        where: {
          id: relatedImageEvent.image_id,
        },
        transaction: t, // Associate the transaction with the query
      });
    }

    console.log(relatedImageEvent, relatedImage);

    // Delete related data (within the transaction), if it exists
    if (relatedImage) {
      await Images.destroy({
        where: {
          eventId: relatedImage.id,
        },
        transaction: t, // Associate the transaction with the delete operation
      });
    }

    if (relatedImageEvent) {
      await EventThumbnail.destroy({
        where: {
          id: relatedImageEvent.id,
        },
        transaction: t, // Associate the transaction with the delete operation
      });
    }

    // Step 3: Delete the event itself (within the transaction)
    const deletedRows = await Events.destroy({
      where: {
        id: eventIdToDelete,
      },
      transaction: t, // Associate the transaction with the delete operation
    });

    // Commit the transaction if everything succeeds
    await t.commit();

    if (deletedRows === 1) {
      return res.status(200).json({
        message: `Event with ID ${eventIdToDelete} and its related data have been deleted successfully.`,
      });
    }
    return res
      .status(404)
      .json({ message: `Event with ID ${eventIdToDelete} was not found.` });
  } catch (error) {
    console.error('Error deleting event and related data:', error);

    // Roll back the transaction in case of an error
    await t.rollback();

    return res.status(500).json({
      error: 'An error occurred while deleting the event and related data.',
    });
  }
};

const addEventCommentImage = async (req, res) => {
  const t = await Images.sequelize.transaction();
  const c = await CommentImages.sequelize.transaction();
  try {
    console.log('error');
    const { commentId, eventId } = req.params;
    const files = req.file;
    console.log({ files });
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log({ result });
    const imageID = await Images.create({ url: result.secure_url });
    console.log(imageID.dataValues.id);
    await CommentImages.create({ image_id: imageID.dataValues.id, comment_id: commentId });
    t.commit();
    c.commit();
    return res.status(200).json({ data: 'image added successfully' });
  } catch (e) {
    t.rollback();
    c.rollback();
    console.error(e);
    res
      .status(500)
      .json({ error: 'An internal error occurred while  uploading image' });
  }
};

module.exports = {
  getEvents, createEventController, deleteEventController, addEventCommentImage,
};
