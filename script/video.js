// time section
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingTime = time % 3600;
  const minutes = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  return `${hour} H ${minutes}M ${remainingTime}S`;
}
//alert when click btn
const loadCatagoriesVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => dispalyvideos(data.category))
    .catch((err) => console.log(err));
};
//load category
const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};
//display
const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCatagoriesVideo(${element.category_id})" class = "btn">
    ${element.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
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
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  video.forEach((element) => {
    console.log(element);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
            <figure class = "h-[200px] relative">
    <img class = "w-full h-full object-cover"
      src=${element.thumbnail}
      alt="" />
      ${
        element.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute bg-black text-white text-xs p-1 right-2 bottom-2 rounded-full ">
            ${getTimeString(element.others.posted_date)}
          </span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex items-center gap-3">
   <div class="w-10 h-10">
    <img class="w-full h-full rounded-full object-cover" src=${
      element.authors[0].profile_picture
    }>
   </div>
   <div>
   <h2 class = 'font-bold'>
   ${element.title}
   </h2>
  <div class = 'flex items-center gap-1'>
   <p class='text-xs'>
   ${element.authors[0].profile_name}
   </p>
   ${
     element.authors[0].verified === true
       ? '<img class = "w-4 h-4" src = "https://img.icons8.com/?size=100&id=85097&format=png&color=228BE6"></img>'
       : ""
   }
  
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
