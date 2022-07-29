import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Icon, Segment, Sidebar } from "semantic-ui-react";
import { UserContext } from ".";

const SideBar = ({ visible, setInVisible }) => {
  const [user, setUser] = useContext(UserContext);

  const removeFromCart = (id) => {
    const storage = JSON.parse(sessionStorage.getItem("food-oasis:user"));
    const updated = user.cart.filter((item) => item.idMeal !== id);
    setUser({ ...user, cart: updated });
    sessionStorage.setItem("food-oasis:user", JSON.stringify({ ...storage, cart: updated }));
  };

  return (
    <Sidebar
      as={Segment}
      animation="overlay"
      inverted
      onHide={setInVisible}
      vertical
      visible={visible}
      width="wide"
      style={{ textAlign: "center" }}
    >
      <Icon name="cart" size="huge" />
      <Divider />
      {user?.cart?.length ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px 0",
              marginTop: "20px",
              borderBottom: "2px solid white",
            }}
          >
            {user.cart.map((item, key) => (
              <div
                key={key}
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 10px",
                  color: "#fff",
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
                    {item.strArea} {item.strCategory}
                  </small>
                  <p>{item.strMeasure1}</p>
                </div>
                <h4 style={{ margin: 0 }}>$200.00</h4>
              </div>
            ))}
          </div>

          <h3 style={{ margin: 0, textAlign: "end", padding: "10px" }}>
            <span style={{ marginRight: "10px" }}>Total:</span> $800.00
          </h3>

          <Link to="checkout" onClick={setInVisible}>
            <Button color="orange" style={{ marginTop: "20px" }}>
              Checkout
            </Button>
          </Link>
        </>
      ) : (
        <div>
          <img src="https://www.rokonbaghdad.com/static/media/empty_cart.4a7779da.png" alt="" />
        </div>
      )}
    </Sidebar>
  );
};

export default SideBar;
