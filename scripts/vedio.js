// functiion
function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const finalSeconds = remainingSeconds % 60;

    return `${hours} hour ${minutes} minutes ${finalSeconds} seconds ago`;
};

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
};
// 1. fetch, load and show catagories

// load catagories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
};

loadCategories();

// display catagory videos function
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // remove bg color 
            removeActiveClass();
            // ad bg color
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            displayVideos(data.category)
        })
        .catch(error => console.log(error));
}
// display catagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        // creat a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;
        categoryContainer.append(buttonContainer)
    });
};

// demo object 
// const demoObject = {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// };

// load vedios 
const loadVideos = (searchText="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error));
};

loadVideos();

// display vedios

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="./asset/Icon.png" />
        <h2 class="text-center text-4xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid")
    }

    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML =
            `
         <figure class="h-[200px] rounded relative">
            <img
            src= ${video.thumbnail}
            class="h-full w-full object-cover"
            alt="thumbnail" />
            ${video.others.posted_date?.length == 0 ? "" : ` <span class="absolute right-2 bottom-2 text-xs text-[#fff] bg-gray-800 rounded-lg px-2 py-1">${secondsToTime(video.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2">
           <div>
            <img
            src= ${video.authors[0].profile_picture}
            class="h-10 w-10 object-cover rounded-full"
            alt="person" />
           </div>
            <div>
            <h2 class="text-base font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
            <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
            
            ${video.authors[0].verified == true ? ' <img src= "./asset/icons8-verify-48.png" class="h-5 w-5 object-cover rounded-full" alt="person" />' : ''}

            </div>
            <p class="text-sm text-gray-500">${video.others.views} views</p>
            </div>
        </div>
        `
        videoContainer.append(card);
    });
};

document.getElementById('search-input').addEventListener('keyup', (e) =>{
    loadVideos(e.target.value)
})