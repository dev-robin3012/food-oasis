import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Icon, Label, Menu, Segment, Visibility } from "semantic-ui-react";
import { ModalContext, UserContext } from ".";

const NavBar = ({ setOpenSideBar }) => {
  const [fixed, setFixed] = useState();
  const [openModal, setOpenModal] = useContext(ModalContext);
  const [user, setUser] = useContext(UserContext);

  const handleLogOut = () => {
    sessionStorage.removeItem("food-oasis:user");
    setUser(null);
  };

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
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">About Us</Menu.Item>

            <Menu.Item as="a" position="left" onClick={setOpenSideBar}>
              <Icon name="cart" size="large" />
              <Label color="orange" floating>
                {user?.cart?.length || 0}
              </Label>
            </Menu.Item>

            <Menu.Item position="right" style={{ paddingRight: 0 }}>
              {!user ? (
                <Button
                  inverted={!fixed}
                  secondary={fixed}
                  style={{ marginLeft: "0.5em" }}
                  onClick={() => setOpenModal(true)}
                >
                  Log in
                </Button>
              ) : (
                <Button.Group>
                  <Button as="a" color="orange">
                    {user.credentials.fullName}
                  </Button>
                  <Button as="a" animated="vertical">
                    <Button.Content visible>
                      <Icon name="user outline" color="orange" />
                    </Button.Content>
                    <Button.Content hidden onClick={handleLogOut}>
                      <Icon name="log out" />
                    </Button.Content>
                  </Button>
                </Button.Group>
              )}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default NavBar;
