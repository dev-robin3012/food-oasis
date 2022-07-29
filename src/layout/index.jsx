import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export const UserContext = createContext();
export const ModalContext = createContext();

const Layout = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("food-oasis:user"));
    user && setUser(user);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ModalContext.Provider value={[openModal, setOpenModal]}>
        <NavBar setOpenSideBar={() => setOpenSideBar(true)} />
        <SideBar visible={openSideBar} setInVisible={() => setOpenSideBar(false)} />
        <AuthModal />
        {children}
        <Footer />
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
