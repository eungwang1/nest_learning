import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent } from "react";
import styled from "styled-components";
import AuthForm from "../../src/components/common/AuthForm";
import Layout from "../../src/components/common/Layout";
import useInput from "../../src/hooks/useInput";

const Auth = () => {
  return (
    <AuthContainer>
      <Layout>
        <AuthForm type="register" />
      </Layout>
    </AuthContainer>
  );
};

export default Auth;

const AuthContainer = styled.div`
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
