const Groups = require('../models/groups');
const GroupImage = require('../models/group_image');
const UserGroup = require('../models/user-groups');
const Images = require('../models/images');
const Events = require('../models/events');
const GroupEvents = require('../models/group-events');

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

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;


  try {
    //Get all the values for normalized tables first
    const [groupEvents, groupUsers, groupImage] = await Promise.allSettled([
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

    await Promise.allSettled([
      await Images.findByPk(groupImage.value.image_id),
    ])

    const groupDetails = {
      memberCount: groupUsers.value.count,
    }


    return res.json({ groupDetails })
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }

}
 
module.exports = { createGroup, getGroups, getGroupDetails };
