import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Layout from "../src/components/common/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <HomeContainer>
      <Layout>Home</Layout>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;
