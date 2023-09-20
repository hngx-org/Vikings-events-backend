const getGroups = async (req, res) => {
  const groups = 'All Groups'
  res.json({ groups })
}

module.exports = { getGroups }
