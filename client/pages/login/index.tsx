import axios from "axios";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // const res = await axios.get("http://localhost:8000/me", {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExMUBuYXZlci5jb20iLCJzdWIiOiI2MmQ1NTE1Nzk3MGJlNTBiM2RkZWViOWYiLCJpYXQiOjE2NTgxOTU2MTEsImV4cCI6MTY1ODE5NTYzMX0.p_5s8qU5ukC-cJ-LP2E19E0zSDlCMXFqwd-7zhNFK5A",
    //   },
    // });
    // console.log(res.headers["set-cookie"]);
  } catch (e) {
    console.error(e);
  }

  // console.log(res);
  // const cookieString = ctx.req ? ctx.req.headers["set-cookie"] : "";
  // console.log(cookieString);
  // console.log(ctx.res.getHeaders());
  // console.log("test");
  // set the cookies
  // ctx.res.setHeader("set-Cookie", "foo=bar; HttpOnly");
  return { props: {} };
};
