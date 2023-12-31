const Groups = require('../models/2-groups');
const GroupImage = require('../models/group_image');
const UserGroup = require('../models/user-groups');
const Images = require('../models/4-images');
const Events = require('../models/3-events');
const GroupEvents = require('../models/group-events');
const User = require('../models/1-users');

const getEvent = require('../utils/helpers/getEvent');
const { upload } = require('../services/cloudinary');

const createGroup = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!req.files) return res.status(400).json({ message: 'add event image' });

    // upload the images
    const urls = await upload(req.files);

    const newGroup = await Groups.create({
      title,
    });
    const imageIDs = [];

    // loop to create images
    for (const url of urls) {
      const image = await Images.create({ url });
      imageIDs.push(image.id);
    }

    // loop to create image comment association
    for (const imageID of imageIDs) {
      GroupImage.create({
        group_id: newGroup.dataValues.id,
        image_id: imageID,
      });
    }

    const newUserGroup = {
      user_id: req.user.id,
      group_id: newGroup.id,
    };

    await UserGroup.create(newUserGroup);

    return res.status(201).json({ ...newGroup.dataValues, url: urls });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Groups.findAll();

    // If no group is available
    if (groups.length < 1) {
      return res.status(200).json({ groups: [] });
    }

    return res.status(201).json({ groups });
  } catch (error) {
    return res.status(500).json({
      error: 'An error occured while fetching groups',
    });
  }

  const groups = 'All Groups';
  res.json({ groups });
};

const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Groups.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Get all the values for normalized tables first
    const [groupEvents, groupUsers, groupImageId] = await Promise.all([
      await GroupEvents.findAll({
        where: {
          group_id: groupId,
        },
      }),
      await UserGroup.findAndCountAll({
        where: {
          group_id: groupId,
        },
      }),
      await GroupImage.findOne({
        where: {
          group_id: groupId,
        },
      }),
    ]);

    const eventIds = groupEvents.map(
      (groupEvent) => groupEvent.dataValues.event_id,
    );

    const [groupImage, events] = await Promise.all([
      await Images.findOne({
        where: {
          id: groupImageId.dataValues.image_id,
        },
      }),
      await Promise.all(eventIds.map(async (id) => await getEvent(id))),
    ]);

    const groupDetails = {
      ...group.dataValues,
      member_count: groupUsers.count,
      group_image: groupImage.url,
      events,
    };

    return res.json({ groupDetails });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: 'Internal server error' });
  }
};

const addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.params;
  console.log(req.params);
  try {
    // Find the group and user based on the provided IDs
    const group = await Groups.findByPk(groupId);
    const user = await User.findByPk(userId);

    // Check if group exists
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Check if the user is already a member of the group
    const existingMember = await UserGroup.findOne({
      where: { user_id: userId, group_id: groupId },
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ error: 'User is already a member of the group' });
    }

    //  Create a new UserGroup entry to represent the user's membership in the group
    const newUserGroup = {
      user_id: userId,
      group_id: groupId,
    };
    await UserGroup.create(newUserGroup);

    return res
      .status(201)
      .json({ message: 'User successfully added to group' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeUserFromAGroup = async (req, res) => {
  const { userId } = req.params;
  const { groupId } = req.params;

  try {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the group does not exists
    const groupExists = await Groups.findByPk(groupId);
    if (!groupExists) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // check if the user is in the group
    const userInGroup = await UserGroup.findOne({
      where: { user_id: userId, group_id: groupId },
    });
    if (!userInGroup) {
      return res
        .status(404)
        .json({ error: 'User is not a member of the group' });
    }

    // Delete the user from the group
    const response = await UserGroup.destroy({
      where: {
        user_id: userId,
        group_id: groupId,
      },
    });

    return res.json({
      message: 'Successfully Removed the user from the group',
      data: response,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  addUserToGroup,
  getGroupDetails,
  removeUserFromAGroup,
};
