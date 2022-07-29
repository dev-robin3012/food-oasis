import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  TextArea,
} from "semantic-ui-react";
import { UserContext } from "../../layout";
import { getSingleMeal } from "../../services/fetchSingleMeal";

const Checkout = () => {
  const [user, setUser] = useContext(UserContext);
  const [singleOrder, setSingleOrder] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    const storage = JSON.parse(sessionStorage.getItem("food-oasis:user"));
    const updated = user.cart.filter((item) => item.idMeal !== id);
    setUser({ ...user, cart: updated });
    sessionStorage.setItem("food-oasis:user", JSON.stringify({ ...storage, cart: updated }));
  };

  const handlePlaceOrder = () => {
    if (id) {
      setSingleOrder(null);
    } else {
      setUser({ credentials: user.credentials });
      sessionStorage.setItem("food-oasis:user", JSON.stringify({ credentials: user.credentials }));
    }
    alert("Order Placed");
    navigate("/");
  };

  useEffect(() => {
    getSingleMeal(id).then((res) => setSingleOrder(res));
  }, [id]);

  return (
    <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Header as="h1">Checkout</Header>
      <Grid columns={2}>
        <Grid.Column mobile={16} computer={10}>
          <Form>
            <Form.Group widths="equal">
              <Form.Field id="form-input-control-name">
                <label>Name</label>
                <Input placeholder="Full Name" defaultValue={user?.credentials.fullName} />
              </Form.Field>
              <Form.Field id="form-input-control-email">
                <label>Email</label>
                <Input placeholder="Email" defaultValue={user?.credentials.email} />
              </Form.Field>
            </Form.Group>
            <Form.Field
              id="form-textarea-control-address"
              control={TextArea}
              label="Shipping Address"
              placeholder="Address"
            />
          </Form>
        </Grid.Column>
        <Grid.Column mobile={16} computer={6}>
          <Header as="h3">Your Order</Header>
          <Divider />
          {singleOrder ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <img src={singleOrder.strMealThumb} alt="" height={70} />
              <div style={{ textAlign: "start", flexBasis: "50%" }}>
                <h3 style={{ margin: 0 }} className="product_title">
                  {singleOrder.strMeal}
                </h3>
                <small>
                  {singleOrder.strArea} {singleOrder.strCategory}
                </small>
                <p>{singleOrder.strMeasure1}</p>
              </div>
              <h4 style={{ margin: 0 }}>$200.00</h4>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {user?.cart?.map((item) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                  }}
                >
                  <Icon
                    name="delete"
                    size="large"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromCart(item.idMeal)}
                  />
                  <img src={item.strMealThumb} alt="" height={70} />
                  <div style={{ textAlign: "start", flexBasis: "50%" }}>
                    <h3 style={{ margin: 0 }} className="product_title">
                      {item.strMeal}
                    </h3>
                    <small>
                      {item.strArea} {item?.strCategory}
                    </small>
                    <p>{item.strMeasure1}</p>
                  </div>
                  <h4 style={{ margin: 0 }}>$200.00</h4>
                </div>
              ))}
            </div>
          )}
          <Divider />
          <h3 style={{ margin: 0, textAlign: "end", padding: "10px" }}>
            <span style={{ marginRight: "10px" }}>Total:</span> $800.00
          </h3>

          <Button color="orange" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Checkout;
