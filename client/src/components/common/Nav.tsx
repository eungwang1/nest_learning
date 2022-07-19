import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Cat } from "../../../customTypes/cats";
import ProfileCard from "./ProfileCard";
interface NavProps {
  me: Cat | null;
}
const Nav = ({ me }: NavProps) => {
  return (
    <NavContainer>
      <Link href="/">홈</Link>
      {me ? <ProfileCard me={me} /> : <Link href="/login">로그인</Link>}
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #e4e4e4;
  gap: 30px;
`;
