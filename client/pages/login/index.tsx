import React from "react";
import styled from "styled-components";
import AuthForm from "../../src/components/common/AuthForm";
import Layout from "../../src/components/common/Layout";

const Login = () => {
  return (
    <LoginContainer>
      <Layout>
        <AuthForm type="login" />
      </Layout>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div``;
