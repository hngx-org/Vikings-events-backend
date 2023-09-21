const Groups = require('../models/groups');
const GroupImage = require('../models/group_image');
const UserGroup = require('../models/user-groups');
const Images = require('../models/images');
const Events = require('../models/events');
const GroupEvents = require('../models/group-events');
const User = require('../models/users');

const getEvent = require('../utils/helpers/getEvent')

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
  let { groupId } = req.params;
  groupId = Number(groupId)

  try {
    const group = await Groups.findByPk(groupId);
    if(!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    //Get all the values for normalized tables first
    const [groupEvents, groupUsers, groupImageId] = await Promise.all([
      await GroupEvents.findAll({
        where: {
          group_id: groupId
        }
      }),
      await UserGroup.findAndCountAll({
        where: {
          group_id: groupId
        }
      }),
      await GroupImage.findOne({
        where: {
          group_id: groupId
        }
      })
    ]);

    const eventIds = groupEvents.map((groupEvent) => {
      return groupEvent.dataValues.event_id
    })
    
    const [groupImage, events] = await Promise.all([
      await Images.findOne({
        where: {
          id: groupImageId.dataValues.image_id
        }
      }),
      await Promise.all(eventIds.map(async (id) => await getEvent(id)))
    ])

    const groupDetails = {
      ...group.dataValues,
      member_count: groupUsers.count,
      group_image: groupImage.url,
      events: events
    }


    return res.json({ groupDetails })
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Internal server error" });
  }

}


 
module.exports = {
  createGroup, getGroups, addUserToGroup, getGroupDetails,
};
