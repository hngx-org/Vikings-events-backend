const createGroup = async (req, res) => {
  try {
    const {title} = req.body;

  if (!title){
    return res.status(400).json({error: 'Title is required'});
  }

  const newGroup = await Group.create({
    title,
  });
  res.status(201).json(newGroup);
}
catch(error) {
  console.error(error);
  res.status(500).json({error: 'Internal server error'});
}
};

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getGroupDetails = async (req, res) => {

  try {
    const groupDetails = {};
    return res.json({ groupDetails })
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }

}

export { getGroups, createGroup, getGroupDetails };
 
