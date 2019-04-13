import { Link } from "react-router-dom";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
`;
export const Sidebar = styled.div`
  width: 100%;
  height: fill-available;
  padding: 0 2rem;
  background-color: #f0f0f0;
`;
export const Item = styled(Link)`
  ${(props) => (props.margin ? `margin: ${props.margin}` : "margin: 2rem 0")};
  width: 100%;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  :hover {
    color: black;
  }
`;
export const ItemText = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  vertical-align: center;
  font-weight: 500;
`;
