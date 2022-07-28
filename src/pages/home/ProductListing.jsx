import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, Icon, Image, Input } from "semantic-ui-react";
import { getBySearch, getMeal } from "../../services/fetchMealList";
import "./productListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState(null);
  const [searching, setSearching] = useState(false);

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
    <Container textAlign="center" style={{ padding: "30px 0" }}>
      {/* <Header as="h1">Grab your favorite food by search.</Header> */}
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
      <Grid columns={4} style={{ marginTop: "20px" }}>
        {products &&
          products.map((product, key) => (
            <Grid.Column key={key}>
              <Card>
                <Image src={product.strMealThumb} wrapped ui={false} />
                <Card.Content>
                  <Card.Header className="product_title">
                    <a href="#test">{product.strMeal}</a>
                  </Card.Header>
                  <Card.Meta>
                    {product.strArea} {product.strCategory}
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra style={{ padding: 0 }}>
                  <Button.Group style={{ width: "100%" }}>
                    <Button animated="vertical">
                      <Button.Content visible>Add to Cart</Button.Content>
                      <Button.Content hidden>
                        <Icon name="cart plus" />
                      </Button.Content>
                    </Button>
                    <Button color="orange">Order Now</Button>
                  </Button.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductListing;
