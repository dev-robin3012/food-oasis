import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Image, Input, Modal, Segment } from "semantic-ui-react";
import { ModalContext, UserContext } from ".";
import logo from "../assets/logo.png";

const AuthModal = () => {
  const [user, setUser] = useContext(UserContext);
  const [openModal, setOpenModal] = useContext(ModalContext);
  const [modalAction, setModalAction] = useState("login");
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    const db = JSON.parse(localStorage.getItem("food-oasis:users"));

    switch (modalAction) {
      case "login":
        const user = db.find((user) => user.email === formData.email);

        if (!user) return alert("User not found. Please sign up.");

        if (user.password === formData.password) {
          delete user.password;
          sessionStorage.setItem("food-oasis:user", JSON.stringify({ credentials: user }));
          setUser({ credentials: user });
          setOpenModal(false);
        } else {
          alert("password did'n match");
        }
        break;

      case "signUp":
        const exist = db.find((user) => user.email === formData.email);
        if (exist) return alert("user already exist.");
        else {
          localStorage.setItem("food-oasis:users", JSON.stringify([...db, formData]));
          delete formData.password;
          sessionStorage.setItem("food-oasis:user", JSON.stringify({ credentials: formData }));
          setUser({ credentials: formData });
          setOpenModal(false);
        }
        break;

      default:
        console.log("something went wrong");
    }
  };

  useEffect(() => {
    setModalAction("login");
    const db = localStorage.getItem("food-oasis:users");
    openModal && !db && localStorage.setItem("food-oasis:users", JSON.stringify([]));
  }, [openModal]);

  return (
    <Modal onClose={() => setOpenModal(false)} open={openModal} style={{ width: "50%" }}>
      <Modal.Content style={styles.wrapper}>
        <Image size="small" src={logo} wrapped />
        <Header as="h2" style={{ margin: 0 }}>
          {modalAction === "login" && "Login"}
          {modalAction === "signUp" && "SignUp"}
        </Header>
        <Form style={{ width: "60%" }} onSubmit={handleSubmit}>
          {modalAction === "signUp" && (
            <Form.Field
              onChange={({ target }) => setFormData({ ...formData, [target.name]: target.value })}
            >
              <label>Full Name</label>
              <Input iconPosition="left" name="fullName" placeholder="Full Name">
                <Icon name="user" />
                <input />
              </Input>
            </Form.Field>
          )}
          <Form.Field
            onChange={({ target }) => setFormData({ ...formData, [target.name]: target.value })}
          >
            <label>Email</label>
            <Input iconPosition="left" placeholder="Email" name="email">
              <Icon name="at" />
              <input />
            </Input>
          </Form.Field>
          <Form.Field
            onChange={({ target }) => setFormData({ ...formData, [target.name]: target.value })}
          >
            <label>Password</label>
            <Input iconPosition="left" placeholder="Password" name="password">
              <Icon name="lock" />
              <input />
            </Input>
          </Form.Field>
          <Segment
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            {modalAction === "login" && (
              <p style={{ margin: 0 }}>
                Did't Registered ?{" "}
                <span
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={() => setModalAction("signUp")}
                >
                  Click here
                </span>
              </p>
            )}
            {modalAction === "signUp" && (
              <p style={{ margin: 0 }}>
                Already Registered ?{" "}
                <span
                  style={{ color: "orange", cursor: "pointer" }}
                  onClick={() => setModalAction("login")}
                >
                  Click here
                </span>
              </p>
            )}
            <Button color="orange" type="submit">
              Submit
            </Button>
          </Segment>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
};

export default AuthModal;
