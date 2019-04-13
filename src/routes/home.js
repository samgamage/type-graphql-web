import { Icon } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPostsQuery } from "../graphql/post/queries/getPostsQuery";
import * as Card from "../ui/Card";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";
import * as Page from "../ui/Page";

const formatDate = (date) => dayjs(date).format("D MMM YYYY");

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const Home = ({ history }) => (
  <Query query={getPostsQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <Nav>
            <Container width="10%">
              <Icon type="loading" style={{ fontSize: 24 }} spin />
            </Container>
          </Nav>
        );
      }

      if (error && error.graphQLErrors[0].message.includes("Not authenticated")) {
        history.push("/login");
        return null;
      }

      return (
        <Nav>
          <Page.Wrapper>
            <Page.Title>Popular Posts</Page.Title>
            <PostGrid>
              {data.posts.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <Card.Wrapper>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Description>{post.description}</Card.Description>
                    <Card.Footer>
                      <Card.Date>UX</Card.Date>
                      <Card.Date>{formatDate(post.createdAt)}</Card.Date>
                    </Card.Footer>
                  </Card.Wrapper>
                </Link>
              ))}
            </PostGrid>
          </Page.Wrapper>
        </Nav>
      );
    }}
  </Query>
);

export default Home;
