import React from "react";
import Attention from "./Attention";
import HeroSection from "./HeroSection";
import ProductListing from "./ProductListing";
import Reservation from "./Reservation";
import Review from "./Review";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProductListing />
      <Reservation />
      <Review />
      <Attention />
    </>
  );
};

export default HomePage;
