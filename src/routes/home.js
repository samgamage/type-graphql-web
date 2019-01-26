import { Avatar, CardActions, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { postsQuery } from "../graphql/querys";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const styles = {
  card: {
    maxWidth: 445,
    minWidth: 345,
    float: "left",
    margin: "1rem",
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: 10,
    float: "left",
  },
  username: {
    lineHeight: "100%",
  },
};

const Home = ({ classes }) => (
  <Query query={postsQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <Nav>
            <Container>
              <CircularProgress color="secondary" />
            </Container>
          </Nav>
        );
      }
      if (error) {
        return (
          <Nav>
            <p>
              Error:
              {`Name: ${error.name}, Message: ${error.message}.`}
            </p>
          </Nav>
        );
      }

      return (
        <Nav>
          <Container width="62%">
            {data.posts.map((post) => (
              <Card className={classes.card} key={post.id}>
                <CardActionArea>
                  <Link to={`/posts/${post.id}`}>
                    <CardMedia
                      className={classes.media}
                      image="https://picsum.photos/400/500/?random"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography component="p">{post.description}</Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
                <CardActions>
                  <Avatar
                    alt={post.author.username}
                    src="https://picsum.photos/400/500/?image=2"
                    className={classes.avatar}
                  />
                  <Typography component="p" className={classes.username}>
                    {post.author.username}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </Container>
        </Nav>
      );
    }}
  </Query>
);

export default withStyles(styles)(Home);
