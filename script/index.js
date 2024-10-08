function getTimeString(time){
    // get hour and rest second
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
    
}



// fetch load and show Categories an html

// create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))

};

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));
};

const loadCategoriesVideos = (id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.category))
        .catch((error) => console.log(error));
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';
    if(videos.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="max-h-[500px] flex flex-col gap-5 justify-center items-center">
        <img src="assects/icon.png"></
        <h2 class="text-center text-xl font-bold">
        No Content Here in this Category
        </h2>
        </div>
        `
        return;
        
    }

    else{
        videoContainer.classList.add('grid')
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
        <figure class ="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class ="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? "": `<span class="absolute right-2 text-sm bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}
      </span>`}
      
  </figure>
  <div class="px-0 py-2">
    <div class="flex gap-2">
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}</
    </div>
       <div>
          <h2 class="font-bold">${video.title}</h2>
          <div class="flex items-center gap-2">
          <p class="text-gray-400">${video.authors[0].profile_name}</p>
          ${video.authors[0].verified == true ? `<img class="w-10 h-10 rounded-full object-cover" src="assects/Verify.png"></`: ''}
          </div>
         </div>
  </div>
        `;
        videoContainer.append(card)

    })
}



// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')
    categories.forEach((item) => {
        console.log(item);
        // create a button

        const buttonContainer = document.createElement('div');
       buttonContainer.innerHTML = `
       <button onclick="loadCategoriesVideos(${item.
        category_id})" class='btn'>
       ${item.category}
       </button>
       `;
        // add button to categories
        categoryContainer.append(buttonContainer);
    })


}

loadCategories();
loadVideos();