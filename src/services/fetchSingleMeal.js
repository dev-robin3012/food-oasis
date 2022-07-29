export const getSingleMeal = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/lookup.php?i=${id}`);
    const { meals } = await res.json();
    return meals[0];
  } catch (err) {
    console.log(err);
  }
};
