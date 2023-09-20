const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getGroupDetails = async (req, res) => {

  try {
    const groupDetails = {};
    return res.json({ groupDetails })
  } catch {
    return res.status(500).json({ message: "Internal server error" })
  }

}

export { getGroups,getGroupDetails }
