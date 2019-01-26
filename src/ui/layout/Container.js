import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export default ({ children }) => {
  return <Container>{children}</Container>;
};
