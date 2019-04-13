import { Icon } from "antd";
import React from "react";
import * as Page from "../../Page";
import * as S from "./styles";

const styles = {
  icon: {
    fontSize: "24px",
    marginRight: "8px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
};

const Nav = ({ children }) => (
  <S.Grid>
    <S.Sidebar>
      <Page.Title>Blog</Page.Title>
      <S.Item to="/" margin="0 0 1rem 0">
        <Icon type="appstore" style={styles.icon} />
        <S.ItemText>Home</S.ItemText>
      </S.Item>
      <S.Item to="/profile-pic">
        <Icon type="user" style={styles.icon} />
        <S.ItemText>Profile</S.ItemText>
      </S.Item>
      <S.Item to="/login">
        <Icon type="login" style={styles.icon} />
        <S.ItemText>Login</S.ItemText>
      </S.Item>
      <S.Item to="/register">
        <Icon type="user-add" style={styles.icon} />
        <S.ItemText>Register</S.ItemText>
      </S.Item>
    </S.Sidebar>
    {children}
  </S.Grid>
);

export default Nav;
