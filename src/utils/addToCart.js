export const addToCart = (product) => {
  const user = JSON.parse(sessionStorage.getItem("food-oasis:user"));
  let userCart = user?.cart || [];

  if (userCart.length) {
    userCart = [...userCart, product];
  } else {
    userCart = [product];
  }

  sessionStorage.setItem(
    "food-oasis:user",
    JSON.stringify({
      ...user,
      cart: userCart,
    })
  );
  return { ...user, cart: userCart };
};
