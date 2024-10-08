// time section
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingTime = time % 3600;
  const minutes = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  return `${hour} H ${minutes}M ${remainingTime}S`;
}
const removeActiveBtn = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//alert when click btn
const loadCatagoriesVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove active btn
      removeActiveBtn();
      // add active btn
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      dispalyvideos(data.category);
    })
    .catch((err) => console.log(err));
};
//load category
const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};
// load deatails
const videoDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDeatails(data.video);
};

const displayDeatails = (video) => {
  const deatailsContainer = document.getElementById("modal-content");
  deatailsContainer.innerHTML = `
  <img src=${video.thumbnail}>
  <p>
  ${video.description}
  </p>
  `;
  //way-2
  document.getElementById("customModal").showModal();
};

//display
const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${element.category_id}" onclick="loadCatagoriesVideo(${element.category_id})" class = "btn category-btn">
    ${element.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

//load videos
const loadvideos = (serchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${serchText} `
  )
    .then((res) => res.json())
    .then((data) => dispalyvideos(data.videos))
    .catch((err) => console.log(err));
};
const dispalyvideos = (video) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (video == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class = "min-h-screen flex flex-col justify-center items-center gap-5">
    <img src="./images/Icon.png"/>
    <h2 class="font-bold text-2xl">
    Oops!! Sorry, There is no content here
    </h2>
    </div>
    `;
  } else {
    videosContainer.classList.add("grid");
  }

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
  
   
   <button onclick="videoDetails('${
     element.video_id
   }')" class="btn-error btn btn-sm mt-1">
    Details
   </button>
   
   </div>
  </div>
          `;
    videosContainer.append(card);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadvideos(e.target.value);
});
loadCatagory();
loadvideos();
