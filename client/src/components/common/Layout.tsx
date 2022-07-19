import React from "react";
import styled from "styled-components";
import { Cat } from "../../../customTypes/cats";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
  me: Cat | null;
}
const Layout: React.FC<LayoutProps> = ({ children, me }) => {
  return (
    <LayoutContainer>
      <Nav me={me} />
      <div className="layout-wrapper">{children}</div>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  .layout-wrapper {
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
