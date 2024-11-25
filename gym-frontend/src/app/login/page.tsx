import React from "react";
import LoginForm from "../component/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
