import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { findUserQuery } from "../graphql/querys";
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

const ProfileView = ({
  match: {
    params: { id },
  },
  classes,
}) => (
  <Nav>
    <Query query={findUserQuery} variables={{ id: parseFloat(id) }}>
      {({ data: { findUser, me }, loading }) => {
        if (loading) {
          return (
            <Container>
              <CircularProgress color="secondary" />
            </Container>
          );
        }

        return (
          <Container width="40%">
            {me.id === findUser.id && <Button variant="outlined">Edit Profile</Button>}
            <CardActions>
              <Avatar alt={findUser.username} src={findUser.profilePictureUrl} />
              <Typography variant="h6" gutterBottom>
                {findUser.username}
              </Typography>
            </CardActions>
            {findUser.posts.map((post) => (
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
                    src={findUser.profilePictureUrl}
                    className={classes.avatar}
                  />
                  <Typography component="p" className={classes.username}>
                    {post.author.username}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </Container>
        );
      }}
    </Query>
  </Nav>
);

export default withStyles(styles)(ProfileView);
