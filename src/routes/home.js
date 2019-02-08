import { Avatar, Card, Col, Icon, Row } from "antd";
import { Meta } from "antd/lib/list/Item";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { getPostsQuery } from "../graphql/post/queries/getPostsQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

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
          <Container width="62%">
            {console.log(data.me)}
            <h1>Popular Posts</h1>
            <Row gutter={16}>
              {data.posts.map((post) => (
                <Col key={post.id} span={6} style={{ marginTop: "1rem" }}>
                  <Link to={`/posts/${post.id}`}>
                    <Card>
                      <Meta
                        avatar={<Avatar size="large" src={post.author.profile.profilePictureUrl} />}
                        title={post.title}
                        description={post.description}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </Nav>
      );
    }}
  </Query>
);

export default Home;
