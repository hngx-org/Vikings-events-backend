const CommentImages = require('../src/models/comment_images');
const Comments = require('../src/models/comments');
const Events = require('../src/models/events');
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
};

module.exports = syncDBRelations;
