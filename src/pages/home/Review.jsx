import React from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import user from "../../assets/dummy-user.jpg";

const Review = () => {
  return (
    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "What a Restaurant"
            </Header>
            <p style={{ fontSize: "1.33em" }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "First, we eat. Then, we do everything else."
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image avatar src={user} />
              <b>Nani</b> Chief Food Officer
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Review;
