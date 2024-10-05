const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};

const displayCatagories = (categories) => {
  console.log(categories);

  categories.forEach(element => {
          console.log(element)
          const categoryContainer = document.getElementById('category')
          const button = document.createElement('button')
          button.classList = 'btn'
          button.innerText = element.category
          categoryContainer.append(button)
  });
};

loadCatagory();
