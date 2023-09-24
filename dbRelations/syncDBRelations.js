const CommentImages = require('../src/models/comment_images');
const Comments = require('../src/models/comments');
const EventThumbnail = require('../src/models/event_thumbnail');
const Events = require('../src/models/events');
const GroupEvents = require('../src/models/group-events');
const Groups = require('../src/models/groups');
const Images = require('../src/models/images');
const Likes = require('../src/models/likes');
const User = require('../src/models/users');

const syncDBRelations = () => {
  Comments.belongsTo(User, { foreignKey: 'user_id' });
  Comments.belongsTo(Events, { foreignKey: 'event_id' });

  Comments.belongsToMany(Images, {
    through: { model: CommentImages },
    otherKey: 'comment_id',
    foreignKey: 'comment_id',
  });
  Images.belongsToMany(Comments, {
    through: CommentImages,
    otherKey: 'image_id',
    foreignKey: 'image_id',
  });

  Comments.hasMany(Likes, { foreignKey: 'comment_id' });
  Likes.belongsTo(Comments, { foreignKey: 'comment_id' });

  Events.belongsToMany(Images, {
    through: { model: EventThumbnail },
    foreignKey: 'event_id',
    otherKey: 'event_id',
  });
  Images.belongsToMany(Events, {
    through: EventThumbnail,
    foreignKey: 'image_id',
    otherKey: 'image_id',
  });

  Events.belongsToMany(Groups, {
    through: { model: GroupEvents },
    foreignKey: 'event_id',
    otherKey: 'event_id',
  });

  Groups.belongsToMany(Events, {
    through: { model: GroupEvents },
    foreignKey: 'group_id',
    otherKey: 'group_id',
  });
};

module.exports = syncDBRelations;
