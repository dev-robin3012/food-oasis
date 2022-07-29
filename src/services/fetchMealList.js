export const getMeal = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/random.php"`);
    const meal = await res.json();
    return meal.meals[0];
  } catch (error) {
    console.log(error);
  }
};

export const getBySearch = async (query) => {
  try {
    if (query) {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/search.php?s=${query}`);
      const { meals } = await res.json();
      return meals;
    } else {
      let meals = [];
      for (let i = 0; i < 8; i++) {
        const res = await getMeal();
        meals.push(res);
      }
      return meals;
    }
  } catch (error) {}
};
