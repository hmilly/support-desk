const registeredUser = (req, res) => {
  res.send("Register Route");
};

const loginUser = (req, res) => {
  res.send("login Route");
};

module.exports = {
  registeredUser,
  loginUser,
};
