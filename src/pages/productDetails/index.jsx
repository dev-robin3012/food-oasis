import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Dimmer, Grid, Header, Icon, Image, Loader, Segment } from "semantic-ui-react";
import { ModalContext, UserContext } from "../../layout";
import { getSingleMeal } from "../../services/fetchSingleMeal";
import { addToCart } from "../../utils/addToCart";

const ProductDetails = () => {
  const [user, setUser] = useContext(UserContext);
  const [openModal, setOpenModal] = useContext(ModalContext);
  const [details, setDetails] = useState(null);
  const [addCart, setAddCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (addCart && user) {
      const res = addToCart(details);
      setUser(res);
    }
    !openModal && setAddCart(false);
  }, [addCart, details, openModal, setOpenModal, setUser, user]);

  useEffect(() => {
    getSingleMeal(id).then((res) => setDetails(res));
  }, [id]);

  return details ? (
    <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Grid.Column computer={6} mobile={16}>
        <Image bordered rounded src={details?.strMealThumb} />
      </Grid.Column>
      <Grid.Column computer={10} mobile={16}>
        <Grid>
          <Grid.Column computer={10} tablet={10} mobile={16}>
            <Header
              as="h1"
              style={{ margin: 0, display: "flex", alignItems: "center", gap: "20px" }}
            >
              <span>{details?.strMeal}</span>
              <Link to={`${details?.strSource.split(":")[1]}`} target="_blank">
                <Icon name="external alternate" size="small" />
              </Link>
            </Header>
            <Header as="h4" style={{ margin: 0 }}>
              {details?.strArea} {details?.strCategory}
            </Header>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={16}>
            <Button
              disabled={user?.cart.find((i) => i.idMeal === details?.idMeal)}
              animated="vertical"
              onClick={() => {
                setAddCart(true);
                !user && setOpenModal(true);
              }}
            >
              <Button.Content visible>Add to Cart</Button.Content>
              <Button.Content hidden>
                <Icon name="cart plus" />
              </Button.Content>
            </Button>
            <Link to={`/checkout/${details?.idMeal}`}>
              <Button color="orange">Order Now</Button>
            </Link>
          </Grid.Column>
        </Grid>

        <Header as="h3">Ingredients:</Header>

        <ul>
          {details &&
            Object.entries(details)
              .filter((i) => i[0].includes("strIngredient"))
              .map(
                (z, key) =>
                  z[1] && (
                    <li key={key}>
                      {z[0]} : {z[1]}
                    </li>
                  )
              )}
        </ul>

        <p>{details?.strInstructions}</p>
      </Grid.Column>
    </Grid>
  ) : (
    <Segment style={{ height: "70vh", margin: "0", border: "none", borderRadius: "0" }}>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  );
};

export default ProductDetails;
