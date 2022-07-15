import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
interface AuthForm {
  type: "register" | "login";
}

const AuthForm: React.FC<AuthForm> = ({ type }) => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [name, onChangeName] = useInput("");
  const router = useRouter();
  const onRegister = async (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password, name };
    try {
      await axios.post("http://localhost:8000/cats", data);
      router.push("/login");
    } catch (e: any) {
      console.error(e);
      alert(e.response.data.message);
    }
  };
  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password };
    try {
      await axios.post("http://localhost:8000/cats/login", data);
      router.push("/");
    } catch (e) {
      console.error(e);
      alert("error");
    }
  };
  const isRegister = type === "register";
  return (
    <LoginFormContainer>
      <form className="auth-container" onSubmit={isRegister ? onRegister : onLogin}>
        {isRegister && (
          <div className="auth-name-wrapper">
            <span>name</span>
            <input value={name} onChange={onChangeName} />
          </div>
        )}
        <div className="auth-email-wrapper">
          <span>Email</span>
          <input value={email} onChange={onChangeEmail} type="email" />
        </div>
        <div className="auth-password-wrapper">
          <span>Password</span>
          <input value={password} onChange={onChangePassword} type="password" />
        </div>
        <button type="submit">{isRegister ? "회원가입하기" : "로그인하기"}</button>
      </form>
    </LoginFormContainer>
  );
};

export default AuthForm;

const LoginFormContainer = styled.div`
  .auth-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #e4e4e4;
    padding: 20px;
    gap: 10px;
  }
  .auth-name-wrapper,
  .auth-password-wrapper,
  .auth-email-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;
