import React, { useContext, useState } from "react";
import { Button, Container, Icon, Label, Menu, Segment, Visibility } from "semantic-ui-react";
import { ModalContext, UserContext } from ".";

const NavBar = () => {
  const [fixed, setFixed] = useState();
  const [openModal, setOpenModal] = useContext(ModalContext);
  const [user, setUser] = useContext(UserContext);

  console.log(user);

  return (
    <Visibility
      once={false}
      onBottomPassed={() => setFixed(true)}
      onBottomPassedReverse={() => setFixed(false)}
    >
      <Segment inverted vertical>
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

            <Menu.Item as="a" position="right">
              <Icon name="cart" size="large" />
              <Label color="orange" floating>
                0
              </Label>
            </Menu.Item>

            <Menu.Item position="right" style={{ paddingRight: 0 }}>
              {!user ? (
                <Button
                  as="a"
                  inverted={!fixed}
                  secondary={fixed}
                  style={{ marginLeft: "0.5em" }}
                  onClick={() => setOpenModal(true)}
                >
                  Log in
                </Button>
              ) : (
                <Button icon labelPosition="right">
                  {user.fullName}
                  <Icon name="user outline" color="orange" size="large" />
                </Button>
              )}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default NavBar;
