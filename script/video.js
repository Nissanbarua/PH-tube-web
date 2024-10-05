//load category
const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};

const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((element) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = element.category;
    categoryContainer.append(button);
  });
};


/* 
category_id
: 
"1003"
description
: 
"'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
others
: 
{views: '2.6K', posted_date: '15400'}
thumbnail
: 
"https://i.ibb.co/ZNggzdm/cake.jpg"
title
: 
"Beyond The Pale"
video_id
: 
"aaak"*/ 

//load videos
const loadvideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => dispalyvideos(data.videos))
    .catch((err) => console.log(err));
};
const dispalyvideos = (video) => {
  console.log(video);
  const videosContainer = document.getElementById("videos");
  video.forEach((element) => {
    console.log(element);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
            <figure>
    <img
      src=${element.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
          `;
    videosContainer.append(card);
  });
};
loadCatagory();
loadvideos();
