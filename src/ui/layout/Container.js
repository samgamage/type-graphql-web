import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.width};
`;
const Parent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default ({ children, width }) => (
  <Parent>
    <Container width={width}>{children}</Container>
  </Parent>
);
