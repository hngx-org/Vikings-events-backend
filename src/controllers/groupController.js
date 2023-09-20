exports.getGroups = async (req, res) => {
  const groups = 'All Groups'
  res.json({ groups })
}

exports.addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.params
  res.status(200).json({ groupId, userId })
}
