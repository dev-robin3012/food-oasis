import React, { useState } from "react";
import { Button, Container, Menu, Segment, Visibility } from "semantic-ui-react";

const NavBar = () => {
  const [fixed, setFixed] = useState();

  return (
    <Visibility
      once={false}
      onBottomPassed={() => setFixed(true)}
      onBottomPassedReverse={() => setFixed(false)}
    >
      <Segment inverted textAlign="center" vertical>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="small"
        >
          <Container>
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted={!fixed}>
                Log in
              </Button>
              <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: "0.5em" }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default NavBar;
