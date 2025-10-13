import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/auth";
import LoginPageView from "../views/LoginPageView";

const LoginPagePresenter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    setMsg(result.message || result.error);
    if (result.message === "Login successful") {
      navigate("/dashboard");
    }
  };

  return (
    <LoginPageView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      msg={msg}
      handleSubmit={handleSubmit}
    />
  );
};

export const LoginPage = LoginPagePresenter;
