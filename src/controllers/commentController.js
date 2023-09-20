const getGroups = async (req, res) => {
  const groups = 'All Groups'
  res.json({ groups })
}

const getCommentImages = async (req, res) => {

  try {
    const images = [];
    return res.json({ images })

  } catch (e) {
    return res.status(500).json({ message: "Internal server error" })
  }
  
}

export { getGroups, getCommentImages }
