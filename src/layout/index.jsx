import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import NavBar from "./NavBar";

export const ModalContext = createContext();
export const UserContext = createContext();

const Layout = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem("food-oasis:user"));
    loggedUser && setUser(loggedUser);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ModalContext.Provider value={[openModal, setOpenModal]}>
        <AuthModal />
        <NavBar />
        {children}
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
