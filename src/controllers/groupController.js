const Groups = require('../models/groups');
const User = require('../models/users');
const UserGroup = require('../models/user-groups');

const createGroup = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newGroup = await Groups.create({
      title,
    });
    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.params;
  console.log(req.params);
  try {
    // Find the group and user based on the provided IDs
    const group = await Groups.findOne({ where: { id: groupId } });
    const user = await User.findOne({ where: { id: userId } });
    // const user = await User.findByPk(userId);
    console.log(group);
    console.log(user);

    // Check if user and group exists
    if (!group && !user) {
      return res.status(404).json({ error: 'Group and user not found' });
    }

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
    const userGroup = await UserGroup.create(newUserGroup);

    res.status(201).json({ userGroup });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Groups.findByPk(groupId);
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const removeUserFromAGroup = async (req, res) => {
  const userId = req.params.userId;
  const groupId = req.params.groupId;

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
