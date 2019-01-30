import gql from "graphql-tag";

export const postsQuery = gql`
  query GetPostsQuery {
    posts {
      id
      title
      description
      content
      author {
        id
        username
        profilePictureUrl
      }
    }
    me {
      id
    }
  }
`;

export const getPostQuery = gql`
  query GetPostQuery($id: Float!) {
    getPost(id: $id) {
      id
      title
      description
      content
      author {
        id
        username
        profilePictureUrl
      }
    }
    me {
      id
    }
  }
`;

export const meQuery = gql`
  {
    me {
      id
      profilePictureUrl
    }
  }
`;

export const findUserQuery = gql`
  query FindUserQuery($id: Float!) {
    findUser(id: $id) {
      id
      username
      email
      profilePictureUrl
      posts {
        id
        title
        description
        content
        author {
          id
          username
          email
        }
      }
    }
    me {
      id
    }
  }
`;
