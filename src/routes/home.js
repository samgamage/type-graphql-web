import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/mutations";
import { postsQuery } from "../graphql/querys";
import Nav from "../ui/layout/Nav";

const styles = {
  card: {
    maxWidth: 345,
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
      if (loading)
        return (
          <Nav>
            <p>Loading...</p>
          </Nav>
        );
      if (error)
        return (
          <Nav>
            <p>Error: {`Name: ${error.name}, Message: ${error.message}.`}</p>
          </Nav>
        );

      return (
        <Nav>
          {data &&
            data.posts.map((post) => (
              <Mutation
                mutation={deletePostMutation}
                update={(cache) => {
                  const { posts } = cache.readQuery({ query: postsQuery });
                  const newPosts = posts.filter(
                    (queryPost) => post.id !== queryPost.id
                  );
                  cache.writeQuery({
                    query: postsQuery,
                    data: {
                      posts: newPosts,
                    },
                  });
                }}
                key={post.id}
              >
                {(deletePost, { loading, error }) => (
                  // <div>
                  //   <p>
                  //     <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  //   </p>
                  //   {data.me.id === post.author.id && (
                  //     <button
                  //       onClick={(e) => {
                  //         e.preventDefault();
                  //         deletePost({
                  //           variables: { postId: parseFloat(post.id, 10) },
                  //         });
                  //       }}
                  //     >
                  //       Delete Post
                  //     </button>
                  //   )}
                  //   {loading && <p>Loading...</p>}
                  //   {error && (
                  //     <p>
                  //       Error {error.message}, {error.name}
                  //     </p>
                  //   )}
                  // </div>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography component="p">
                          {post.description}
                        </Typography>
                        <Avatar
                          alt={post.author.username}
                          src=""
                          className={classes.avatar}
                        />
                        <Typography component="p" className={classes.username}>
                          {post.author.username}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          deletePost({
                            variables: { postId: parseFloat(post.id, 10) },
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </Mutation>
            ))}
        </Nav>
      );
    }}
  </Query>
);

export default withStyles(styles)(Home);
