import { useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../api/auth";
import { SignupPageView } from "../views/SignupPageView";

const SignupPagePresenter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup(email, password, name);
    setMsg(result.message || result.error);
    if (result.message === "Signup successful") {
      navigate("/onboarding");
    }
  };

  return (
    <SignupPageView
      email={email}
      setEmail={setEmail}
      name={name}
      setName={setName}
      password={password}
      setPassword={setPassword}
      msg={msg}
      handleSubmit={handleSubmit}
    />
  );
};

export const SignupPage = SignupPagePresenter;