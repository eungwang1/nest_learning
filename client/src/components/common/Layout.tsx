import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
