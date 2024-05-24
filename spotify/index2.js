let seekPercent = 0;
let play = document.createElement("img");
play.src = "./svgs/play.svg";

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  // Add leading zeros if necessary
  minutes = String(minutes).padStart(2, "0");
  remainingSeconds = String(remainingSeconds).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

document.querySelector(".play-song").appendChild(play);

document.querySelector(".play-song").addEventListener("click", () => {
  if (currentsong.paused) {
    currentsong.play();
    play.src = "./svgs/pause.svg";
  } else {
    currentsong.pause();
    play.src = "./svgs/play.svg";
  }
});

document.getElementById("10xf").addEventListener("click", (e) => {
  currentsong.currentTime += 10;
});

document.getElementById("10xr").addEventListener("click", (e) => {
  currentsong.currentTime -= 10;
});

//   getting songs info and songs from folder
let currentsong = new Audio();

async function getSongs() {
  let songDetails = await fetch("http://127.0.0.1:5500/spotify/songs");

  let response = await songDetails.text();
  // console.log(songDetails)

  let div = document.createElement("div");

  div.innerHTML = response;

  let aS = div.querySelectorAll("a");
  let songs = [];

  for (let index = 0; index < aS.length; index++) {
    const element = aS[index];

    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
    //  console.log(element.href);
  }
  return songs;
}

async function getSongs2(e){
   
  console.log(e.replaceAll(" ","%20"));
  console.log("http://127.0.0.1:5500/spotify/albums/"+e.replaceAll(" ","%20"));
  let url = "http://127.0.0.1:5500/spotify/albums/"+e.replaceAll(" ","%20");
  let songDetails = await fetch(url); 

  let response = await songDetails.text();
  // console.log(songDetails)

  let div = document.createElement("div");

  div.innerHTML = response;

  let aS = div.querySelectorAll("a");
  let songs = [];

  for (let index = 0; index < aS.length; index++) {
    const element = aS[index];

    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
    //  console.log(element.href);
  }
  return songs;

  

  // console.log(liv.getElementsByTagName("h2").innerHTML);

}


async function getSongsFromAlbums(){
  let songDetails = await fetch("http://127.0.0.1:5500/spotify/albums/kerintha");

  let response = await songDetails.text();
  // console.log(songDetails)

  let div = document.createElement("div");

  div.innerHTML = response;

  let aS = div.querySelectorAll("a");
  let songs = [];

  for (let index = 0; index < aS.length; index++) {
    const element = aS[index];

    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
    //  console.log(element.href);
  }
  songs.forEach(element => {
    console.log(element);
  });
} 

//getting song albums form albums folder as cards

async function getAlbums() {
  let albumsDetails = await fetch("http://127.0.0.1:5500/spotify/albums/");
  let response = await albumsDetails.text();
  // console.log( response);

  let div = document.createElement("div");
  div.innerHTML = response;

  // console.log(div);

  let aS = div.querySelectorAll("a");
  let albums = [];
  aS.forEach((element) => {
    // console.log(element.href);

    // console.log(element.href.split("/albums/"));
    if (element.href.split("/albums/")[1] !== undefined) {
      albums.push(element.href);
    }
  });

  console.log(albums);

  let playlist = document.querySelector(".card-container");
  // console.log(playlist);

  for (const album of albums) {
    playlist.innerHTML =
      playlist.innerHTML +
      `<div class="card">
      <img src="https://plus.unsplash.com/premium_photo-1687609112015-23bcdb2385f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D" alt="playlist1">
      <h2>${album.split("/albums/")[1].replaceAll("%20", " ")}</h2>
      <p>Lokeshwar Kamuni</p>
      <div class="play">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black">
          <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
      </svg>
      </div>
    </div> `;
  }
  Array.from(document.querySelectorAll(".card")).forEach((element) => {
    element.addEventListener("click",async  (e) => {
      console.log(element);
      let songs = await getSongs2(element.querySelector("h2").innerHTML);
      console.log(songs);
    });
  });
}

// Function to play music and add song name and duration to the playbar

function playmusic(e) {
  // console.log(e);
  currentsong.src = "songs/" + e + ".mp3";
  currentsong.play();
  play.src = "./svgs/pause.svg";
  

  document.querySelector(".song-name-playbar").innerHTML = e;
}

async function main() {
  //get all the songs from the folder server
  let songs = await getSongs();
  //  console.log(songs);

  //show all the songs in the playlist
  let songsUL = document.querySelector(".songs").getElementsByTagName("ul")[0];
  // let playlist = document.querySelector(".card-container");
  // console.log(playlist);
  for (const song of songs) {
    /* Creating playlist automatically using java Script
   After adding song to the songs folder, it will automatically add the songs to the playlist with the help of below code*/
    songsUL.innerHTML =
      songsUL.innerHTML +
      `<li>
        <img src="./svgs/music.svg" alt="">
        <div class="song-info">
          <div >${song
        .split("/songs/")[1]
        .split(".mp3")[0]
        .replaceAll("%20", " ")}</div>
          <div>Lokesh Kamuni</div>
          
        </div>
        <div class="play-now">
          <span>Play Now</span>
          <img src="./svgs/play.svg" alt="play-button">
        </div>
      </li>`;

    /*Creating cards automatically using java Script
   After adding song to the songs folder, it will automatically create a card with the help of below code  */

    // playlist.innerHTML =
    //   playlist.innerHTML +
    //   `<div class="card">
    //   <img src="https://plus.unsplash.com/premium_photo-1687609112015-23bcdb2385f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D" alt="playlist1">
    //   <h2>${song
    //     .split("/songs/")[1]
    //     .split(".mp3")[0]
    //     .replaceAll("%20", " ")}</h2>
    //   <p>Lokeshwar Kamuni</p>
    //   <div class="play">
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black">
    //       <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
    //   </svg>
    //   </div>
    // </div> `;
  }

  /* Setting default first song and displaying its name and duration using the below code*/

  let firstsong =
    document.querySelector(".song-info").firstElementChild.textContent;
  // console.log(firstsong);
  currentsong.src = "songs/" + firstsong + ".mp3";
  document.querySelector(".song-name-playbar").innerHTML = firstsong;

  currentsong.addEventListener("loadeddata", () => {
    document.querySelector(".song-duration-playbar").innerHTML = `${formatTime(
      currentsong.currentTime
    )} / ${formatTime(currentsong.duration)}`;

    // changes the time on the play bar as the song is playing -----
    currentsong.addEventListener("timeupdate", () => {
      document.querySelector(
        ".song-duration-playbar"
      ).innerHTML = `${formatTime(currentsong.currentTime)} / ${formatTime(
        currentsong.duration
      )}`;

      seekPercent = (currentsong.currentTime / currentsong.duration) * 100;

      document.querySelector(".circle").style.left = seekPercent + "%";
      document.querySelector(".time-bar").style.width = seekPercent + "%";
    });

    // giving the seekbar its functionality;

    document.querySelector(".bar").addEventListener("click", (e) => {
      console.log(e.clientX);

      let seek = ((e.clientX - 384) / (1510 - 384)) * 100;
      // console.log(1510-384);

      currentsong.currentTime = (currentsong.duration * seek) / 100;
    });
  });

  /* Below Code creates a array of all the list items in the songs div and add a event listener that plays the song when clicked using play music function*/

  Array.from(
    document.querySelector(".songs").getElementsByTagName("li")
  ).forEach((e) => {
    // console.log(e.querySelector(".song-info").getElementsByTagName("div")[0]);
    e.addEventListener("click", (element) => {
      playmusic(e.querySelector(".song-info").getElementsByTagName("div")[0].innerHTML);
    });
  });

  /*Lets create a code that plays music when the play button on card is clicked */

  // console.log(document.querySelector(".card"));

  // Array.from(document.querySelectorAll(".card")).forEach((element) => {
  //   element.querySelector(".play").addEventListener("click", () => {
  //     playmusic(element.getElementsByTagName("h2")[0].innerHTML);
  //   });
  // });

  console.log(songs.length);

  //  playing previous song when prev icon is clicked and updating song name in the playbar
  document.querySelector(".prev-song").addEventListener("click",()=>{
    if(songs.indexOf(currentsong.src)==0){
      currentsong.src = songs[(songs.length)-1];
      currentsong.play();
    }else{
      currentsong.src = songs[(songs.indexOf(currentsong.src))-1];
      currentsong.play();
    }
    play.src = "./svgs/pause.svg";
    let songname = currentsong.src.split("/songs/")[1].split(".mp3")[0].replaceAll("%20", " ");
    document.querySelector(".song-name-playbar").innerHTML = songname;
  })


//  playing next song song when next icon is clicked and updating song name in the playbar

  document.querySelector(".next-song").addEventListener("click",()=>{
    if(songs.indexOf(currentsong.src)==((songs.length)-1)){
      currentsong.src = songs[0];
      currentsong.play();
    }else{
      currentsong.src = songs[(songs.indexOf(currentsong.src))+1];
      currentsong.play();
    }

    play.src = "./svgs/pause.svg";
    let songname = currentsong.src.split("/songs/")[1].split(".mp3")[0].replaceAll("%20", " ");
    document.querySelector(".song-name-playbar").innerHTML = songname;
  })




  // setting a volume bar and giving functionality 
  


  document.querySelector(".volume").addEventListener("click",(e)=>{
    console.log(e.clientX);

    let seek = ((e.clientX-1183)/(1315-1183))*100
    console.log(seek);

    document.querySelector(".volume-circle").style.left = seek +"%";
    document.querySelector(".rand").style.width = seek + "%";

    currentsong.volume = seek/100;
  })

}


main();

getAlbums();

getSongsFromAlbums();
