// Controllers just handle the logic
export const login = (req, res) => {
  console.log("login");
  res.send("User login");
};

export const logout = (req, res) => {
  console.log("logoutUser");
  res.send("User logout");
};

export const signup = (req, res) => {
  console.log("signup");
  res.send("User signup");
};
