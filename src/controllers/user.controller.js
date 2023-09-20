// /* eslint-disable */

// // Create a new user profile


// // Get a user profile by ID
// async function getUserProfileById(req, res) {
//   const userProfileId = req.params.id;

//   try {
//     const userProfile = await UserProfile.findByPk(userProfileId);

//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found' });
//     }

//     res.status(200).json(userProfile);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Unable to fetch user profile' });
//   }
// }

// // Update a user profile by ID
// async function updateUserProfile(req, res) {
//   const userProfileId = req.params.id;

//   try {
//     const userProfile = await UserProfile.findByPk(userProfileId);

//     if (!userProfile) {
//       return res.status(404).json({ error: 'User profile not found' });
//     }

//     const { firstName, lastName, bio } = req.body;
//     await userProfile.update({ firstName, lastName, bio });

//     res.status(200).json(userProfile);
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ error: 'Unable to update user profile' });
//   }
// }


// module.exports = {
//   getUserProfileById,
//   updateUserProfile,

// };
