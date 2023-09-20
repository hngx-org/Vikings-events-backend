/* eslint-disable */
import sequelize from '../models/user.js'

const getUser = async (req, res) => {
  const users = 'All Users'
  res.json({ users })
}

const userProfile = async (req, res) => {
  const userProfileId = req.params.id

  try {
    const userProfile = await UserProfile.findByPk(userProfileId)

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' })
    }

    res.status(200).json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ error: 'Unable to fetch user profile' })
  }
}

export { userProfile }
