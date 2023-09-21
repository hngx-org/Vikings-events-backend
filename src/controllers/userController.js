const User = require('../models/users')
const getUser = async (req, res) => {
  const users = 'All Users'
  res.json({ users })
}
const profile = async (req, res) => {
  const userProfileId = req.params.profileId
  // console.log(userProfileId);
  try {
    const userProfile = await User.findByPk(userProfileId)

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' })
    }

    res.status(200).json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Unable to fetch user profile' })
  }
}

module.exports = { getUser, profile }
