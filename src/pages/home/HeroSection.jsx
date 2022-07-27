import PropTypes from "prop-types";
import React from "react";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import heroImage from "../../assets/hero-image.webp";

const HeroSection = ({ device }) => {
  return (
    <Segment style={styles.hero_container}>
      <Container>
        <Segment>
          <Header
            as="h1"
            content="We’re hot and spicy… literally!"
            inverted
            style={{
              fontSize: device === "mobile" ? "2em" : "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: device === "mobile" ? "1.5em" : "3em",
            }}
          />
          <Header
            as="h2"
            content="Modern Mexican cuisine made with local ingredients."
            inverted
            style={{
              fontSize: device === "mobile" ? "1.5em" : "1.7em",
              fontWeight: "normal",
              margin: 0,
            }}
          />
        </Segment>
        <Button color="orange">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
  );
};

HeroSection.propTypes = {
  mobile: PropTypes.string,
};

// styles
const styles = {
  hero_container: {
    minHeight: 600,
    background: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    margin: 0,
    borderRadius: 0,
  },
};

export default HeroSection;
