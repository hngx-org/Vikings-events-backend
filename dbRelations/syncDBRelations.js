const CommentImages = require('../src/models/comment_images');
const Comments = require('../src/models/5-comments');
const Events = require('../src/models/3-events');
const Images = require('../src/models/4-images');
const Likes = require('../src/models/likes');
const User = require('../src/models/1-users');

const syncDBRelations = () => {
  Comments.belongsTo(User, { foreignKey: 'user_id' });
  Comments.belongsTo(Events, { foreignKey: 'event_id' });

  Comments.belongsToMany(Images, {
    through: { model: CommentImages },
    foreignKey: 'comment_id',
  });
  Images.belongsToMany(Comments, {
    through: CommentImages,
    foreignKey: 'image_id',
  });

  Comments.hasMany(Likes, { foreignKey: 'comment_id' });
  Likes.belongsTo(Comments, { foreignKey: 'comment_id' });
};

module.exports = syncDBRelations;
