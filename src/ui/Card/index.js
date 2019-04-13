import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: #f8f8f8;
  padding: 1rem;
  height: 180px;
`;
export const Title = styled.span`
  max-height: 30%;
  width: 100%;
  color: black;
  font-size: 16px;
  font-weight: bold;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Description = styled.span`
  flex: 1;
  color: darkgray;
  font-size: 14px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Date = styled.span`
  color: darkgray;
`;
