import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Grid,
  Icon,
  Image,
  Input,
  Loader,
} from "semantic-ui-react";
import { ModalContext, UserContext } from "../../layout";
import { getBySearch, getMeal } from "../../services/fetchMealList";
import { addToCart } from "../../utils/addToCart";
import "./productListing.css";

const ProductListing = () => {
  const [user, setUser] = useContext(UserContext);
  const [openModal, setOpenModal] = useContext(ModalContext);
  const [products, setProducts] = useState(null);
  const [searching, setSearching] = useState(false);
  const [initialCart, setInitialCart] = useState(null);

  useEffect(() => {
    if (user && initialCart) {
      const res = addToCart(initialCart);
      setUser(res);
    }
    !openModal && setInitialCart(null);
  }, [initialCart, openModal, setUser, user]);

  useEffect(() => {
    (async () => {
      let result = [];
      for (let i = 0; i < 8; i++) {
        const res = await getMeal();
        result.push(res);
      }
      setProducts(result);
    })();
  }, []);

  return (
    <Container textAlign="center" style={{ padding: "30px 0" }} id="products">
      <Input
        icon={<Icon name="search" inverted circular link color="orange" loading={searching} />}
        placeholder="Grab your favorite food by search"
        size="large"
        style={{ width: "50%", margin: "auto" }}
        onChange={(e) => {
          setSearching(true);
          getBySearch(e.target.value).then((res) => {
            setProducts(res);
            setSearching(false);
          });
        }}
      />
      <Grid style={{ marginTop: "20px" }}>
        {products ? (
          products.map((product, key) => (
            <Grid.Column key={key} mobile="16" tablet="8" computer="4">
              <Card style={{ margin: "auto" }}>
                <Image src={product.strMealThumb} wrapped ui={false} />
                <Card.Content>
                  <Card.Header className="product_title">
                    <Link to={product.idMeal}>{product.strMeal}</Link>
                  </Card.Header>
                  <Card.Meta>
                    {product.strArea} {product.strCategory}
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra style={{ padding: 0 }}>
                  <Button.Group style={{ width: "100%" }}>
                    <Button
                      disabled={user?.cart && user.cart.find((i) => i.idMeal === product.idMeal)}
                      animated="vertical"
                      onClick={() => {
                        setInitialCart(product);
                        !user && setOpenModal(true);
                      }}
                    >
                      <Button.Content visible>Add to Cart</Button.Content>
                      <Button.Content hidden>
                        <Icon name="cart plus" />
                      </Button.Content>
                    </Button>
                    <Link to={`checkout/${product.idMeal}`}>
                      <Button color="orange">Order Now</Button>
                    </Link>
                  </Button.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))
        ) : (
          <Grid.Column
            width={16}
            style={{
              height: "70vh",
              margin: "0",
              border: "none",
              borderRadius: "0",
            }}
          >
            <div>
              <Dimmer active inverted style={{ background: "#fff", zIndex: "-1" }}>
                <Loader size="medium">Loading...</Loader>
              </Dimmer>
            </div>
          </Grid.Column>
        )}
      </Grid>
    </Container>
  );
};

export default ProductListing;
