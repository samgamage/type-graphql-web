import React from "react";
import { Query } from "react-apollo";
import { meQuery } from "../../graphql/user/queries/meQuery";
import Container from "./Container";

class Nav extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;
    console.log(open);
    return (
      <div>
        <Query query={meQuery}>
          {({ data: { me }, error, loading }) => {
            if (loading) {
              return <div>loading</div>;
            }
            if (error) {
              return (
                <div>
                  Error!
                  {error.message}
                </div>
              );
            }
            return (
              <Container width="60%">
                <div>{me.id}</div>
              </Container>
            );
          }}
        </Query>
        {children}
      </div>
    );
  }
}

export default Nav;
