import React from "react";
import Login from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import HomePage from "./pages/home/home";
const App = () => {
  return (
    <div>
      <SignupPage />
      <Login />
      <HomePage />
    </div>
  );
};

export default App;
