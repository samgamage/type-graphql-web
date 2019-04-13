import React from "react";
import * as S from "./styles";

export default ({ children, width }) => (
  <S.Parent>
    <S.Container width={width}>{children}</S.Container>
  </S.Parent>
);
