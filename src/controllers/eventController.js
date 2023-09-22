/* eslint-disable no-console */
const Events = require('../models/events');
const Images = require('../models/images');
const EventThumbnail = require('../models/event_thumbnail');
const Comments = require('../models/comments');
const InterestedEvents = require('../models/interested-events');

const getEvents = async (req, res) => {
  try {
    const events = await Events.findAll({ limit: 10 });

    res.status(200).json({
      events,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
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

    const userId = req.user.id;

    const newEvent = {
      title,
      description,
      location,
      creator_id: userId,
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
const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    } = req.body;

    // Fetch the event by ID
    const event = await Events.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update event details
    event.title = title;
    event.description = description;
    event.location = location;
    event.creator_id = userId;
    event.start_date = start_date;
    event.end_date = end_date;
    event.start_time = start_time;
    event.end_time = end_time;

    // Save the updated event
    await event.save();

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res
      .status(500)
      .json({
        error: 'An error occurred while updating the event',
        details: error.message,
      });
  }
};

const addCommentToEventController = async (req, res) => {
  const { eventId } = req.params;
  const { body } = req.body;

  const userId = req.user.id;

  const event = await Events.findByPk(eventId);

  if (!event) {
    return res.status(404).send({ error: 'Event not found' });
  }

  try {
    const newComment = { body, event_id: eventId, user_id: userId };
    const comment = await Comments.create(newComment);

    return res.status(201).send({ message: 'Comment created successfully', comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'An error occurred while creating the comment',
      details: error.message,
    });
  }
};

// get Event details
const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Events.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  getEvents,
  createEventController,
  deleteEventController,
  updateEventController,
  addCommentToEventController,
  getEventDetails,
};
