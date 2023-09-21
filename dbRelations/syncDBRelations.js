const CommentImages = require('../src/models/comment_images');
const Comments = require('../src/models/comments');
const Events = require('../src/models/events');
const Images = require('../src/models/images');
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
};

module.exports = syncDBRelations;
