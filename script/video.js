const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagory(data.categories))
    .catch((err) => console.log(err));
};

const displayCatagory = (data) => {
  console.log(data);
};

loadCatagory();
