import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import NavBar from "./NavBar";

const { Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const MobileContainer = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <Media as={Sidebar.Pushable} at="mobile">
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          onHide={() => setSideBarOpen(false)}
          vertical
          visible={sideBarOpen}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sideBarOpen}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={() => setSideBarOpen(true)}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            {/* <HeroSection device="mobile" /> */}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const Layout = ({ children }) => (
  <Media greaterThan="mobile">
    <NavBar />
    {children}
  </Media>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
