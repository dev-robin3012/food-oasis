export const getSingleMeal = async (id) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await res.json();
    return meals[0];
  } catch (err) {
    console.log(err);
  }
};
