let toggleButton = document.getElementById("toggleButton");
// console.log(toggleButton);

let hide_items = document.getElementsByClassName("hide_items");

// console.log(hide_items);

toggleButton.addEventListener("click", () => {
  // console.log("Clicking......");

  for (let val of hide_items) {
    // console.log(val);

    val.classList.toggle("hidden_content");
  }
});

const api_key = "AIzaSyCOF2Ja4f51Ofc_OmptlQC7PtgqzZ3GaqA";
const search_http = "https://www.googleapis.com/youtube/v3/search?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

let search_button = document.getElementById("search_button");
// console.log(search_button);

search_button.addEventListener("click", () => {
  let user_input = document.getElementById("user_input").value;
  // console.log(user_input);
  callYoutubeDataAPI(user_input);
});

let callYoutubeDataAPI = async (query) => {
  // console.log(query);

  let searchParams = new URLSearchParams({
    key: api_key,
    part: "snippet",
    q: query,
    maxResults: 50,
    type: "video",
    regionCode: "IN",
  });

  let res = await fetch(search_http + searchParams);
  // console.log(res);
  let data = await res.json();
  // console.log(data);

  data.items.map((item) => {
    // console.log(item);
    getChannelIcon(item);
  });
};

// ? to get channel icon based on channel ID

let getChannelIcon = async (video_data) => {
  // console.log(video_data);

  let channelParam = new URLSearchParams({
    key: api_key,
    part: "snippet",
    id: video_data.snippet.channelId,
  });

  let res = await fetch(channel_http + channelParam);
  let data = await res.json();
  console.log(data);

  video_data.channelIconImage = data.items[0].snippet.thumbnails.default.url;

  console.log(video_data);

  appendVideoInToContainer(video_data);
};

let main_content = document.getElementById("main_content");
main_content.innerHTML = "";

// To display viedos

let appendVideoInToContainer = (video_data) => {
  let {
    snippet,
    channelIconImage,
    id: { videoId },
  } = video_data;
  main_content.innerHTML += `
    <a href="https://www.youtube.com/watch?v=${videoId}">
        <main class="video_container">
            <article class="imageBox">
                <img src="${snippet.thumbnails.medium.url}" alt="">
            </article>
            <article class="infoBox">
                <div>
                    <img src="${channelIconImage}" alt="">
                </div>
                <div>
                    <p>${snippet.title}</p>
                    <p class=""ChannelName>${snippet.channelTitle}</p>
                </div>
            </article>
        </main>
    </a>
    
    `;
};
