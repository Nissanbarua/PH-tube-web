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
            <figure class = 'h-[200px]'>
    <img class = 'w-full h-full object-cover'
      src=${element.thumbnail}
      alt="" />
  </figure>
  <div class="px-0 py-2 flex items-center gap-3">
   <div class="w-10 h-10">
    <img class='w-full h-full rounded-full object-cover' src=${element.authors[0].profile_picture}>
   </div>
   <div>
   <h2 class = 'font-bold'>
   ${element.title}
   </h2>
  <div class = 'flex items-center gap-1'>
   <p class='text-xs'>
   ${element.authors[0].profile_name}
   </p>
   <img class = 'w-4 h-4' src = "https://img.icons8.com/?size=100&id=85097&format=png&color=228BE6">
  </div>
   <p>
   </p>
   </div>
  </div>
          `;
    videosContainer.append(card);
  });
};
loadCatagory();
loadvideos();

// {
//   "category_id": "1001",
//   "video_id": "aaah",
//   "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//   "title": "Colors of the Wind",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//           "profile_name": "Ethan Clark",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "233K",
//       "posted_date": "16090"
//   },
//   "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }
