import React from "react";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import banner from "../../assets/reservation.avif";
const Reservation = () => {
  return (
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We Are Accepting Reservations
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Host Your Next Eveny
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image bordered rounded src={banner} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="large" color="orange">
              Check Them Out
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Reservation;
