let playlist = [];
let songs = [];
let currentsong = new Audio();

let play = document.querySelector(".play-song").getElementsByTagName("img")[0];
// play.src = "./svgs/play.svg";

// document.querySelector(".play-song").appendChild(play);

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zeros if necessary
    minutes = String(minutes).padStart(2, "0");
    remainingSeconds = String(remainingSeconds).padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}


document.querySelector(".play-song").addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play();
        play.src = "./svgs/pause.svg";
    } else {
        currentsong.pause();
        play.src = "./svgs/play.svg";
    }
});





function playmusic(e) {
    currentsong.src = e;
    currentsong.play();
    play.src = "./svgs/pause.svg";
    let songNamePlaybar1 = e.split("/");
    let songNamePlaybar2 = songNamePlaybar1[songNamePlaybar1.length - 1];
    let songNamePlaybar = ((songNamePlaybar2.replaceAll("%20", " ")).split(".mp3"))[0]
    console.log(songNamePlaybar);
    document.querySelector(".song-name-playbar").innerHTML = songNamePlaybar;
}


function createPlaylist(playlist) {
    let div = document.querySelector(".card-container");
    // console.log(playlist);
    playlist.forEach(album => {
        album2 = (album.split("/albums/")[1]).replaceAll("%20", " ");
        div.innerHTML = div.innerHTML + `<div class="card">
        <img src="https://plus.unsplash.com/premium_photo-1687609112015-23bcdb2385f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2ljJTIwYWxidW18ZW58MHx8MHx8fDA%3D" alt="playlist1">
        <h3 style="display:none">${album}</h3>
        <h2>${album2}</h2>
        <p>Lokeshwar Kamuni</p>
        <div class="play">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black">
            <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
        </div>`

        // console.log(document.querySelector(".card-container"));
        // console.log(album);

    });
}

async function getSongsFromPlaylists(albumlink, albumName) {
    songs = [];
    let links = [];

    let songDetails = await fetch(albumlink);

    let response = await songDetails.text();

    // console.log(response);
    let some = document.createElement("html");
    some.innerHTML = response;

    // console.log(albumName);

    let albumNameUrl = "/" + albumName.replaceAll(" ", "%20") + "/";
    // console.log(albumNameUrl);

    let aS = some.querySelectorAll("a");
    Array.from(aS).forEach(element => {
        if ((element.href).endsWith(".mp3")) {
            // console.log(element.href);
            links.push(element.href);
            songs.push(element.href);
        }
    });

    console.log(songs);

    /* getting songs into the songs playlits and playing them when clicked */
    let e = songs[0];
    currentsong.src = e;
    currentsong.src = e;
    let songNamePlaybar1 = e.split("/");
    let songNamePlaybar2 = songNamePlaybar1[songNamePlaybar1.length - 1];
    let songNamePlaybar = ((songNamePlaybar2.replaceAll("%20", " ")).split(".mp3"))[0]
    console.log(songNamePlaybar);
    document.querySelector(".song-name-playbar").innerHTML = songNamePlaybar;

    let songsUL = document.querySelector(".songs").getElementsByTagName("ul")[0];
    songsUL.innerHTML = "";
    // console.log(songs.innerHTML); 


    for (const song of songs) {
        let songName = song.split(albumNameUrl)[1].replaceAll("%20", " ").split(".mp3")[0];

        // console.log(songName);

        songsUL.innerHTML = songsUL.innerHTML + `<li>
        <img src="./svgs/music.svg" alt="">
        <div class="song-info">
          <div >${songName}</div>
          <div >Lokesh Kamuni</div>
          <div class="song-link">${song}</div>
        </div>
        <div class="play-now">
          <span>Play Now</span>
          <img src="./svgs/play.svg" alt="play-button">
        </div>
      </li>`
    }

    Array.from(songsUL.querySelectorAll("li")).forEach(element => {
        // console.log(element);
        element.addEventListener("click", (e) => {
            // console.log(e.target);
            playmusic(element.getElementsByClassName("song-link")[0].innerHTML)

        })
    });

}

async function main() {

    // setting the default songs in "Your songs".

    getSongsFromPlaylists("http://127.0.0.1:5500/spotify/albums/Hindi%20Songs/", "Hindi Songs");

    //fetching the albums from the local files

    let playlistDetails = await fetch("http://127.0.0.1:5500/spotify/albums/");
    //convert the fetched page html into text
    let response = await playlistDetails.text();

    let some = document.createElement("html");
    //giving the fetched html to the created html element

    some.innerHTML = response;
    //checking for the folders using the links
    let aS = some.querySelectorAll("a");
    aS.forEach(element => {

        // console.log(element.href);

        //getting all the folders in albums folder


        if (element.href.includes("/albums/")) {

            playlist.push(element.href);

        }
    });

    // console.log(playlist);
    createPlaylist(playlist);

    //click on the card to display songs in the "Your Songs"

    Array.from(document.querySelectorAll(".card")).forEach(element => {
        element.addEventListener("click", (e) => {
            // console.log(element);
            // console.log(element.querySelector("h3").innerHTML);

            getSongsFromPlaylists(element.querySelector("h3").innerHTML, element.querySelector("h2").innerHTML)
        })
    });
    // Array.from(document.querySelectorAll(".card")).forEach(element => {
    //     element.querySelector(".play").addEventListener("click", (e) => {
    //         // console.log(element);
    //         // console.log(element.querySelector("h3").innerHTML);

    //         getSongsFromPlaylists(element.querySelector("h3").innerHTML, element.querySelector("h2").innerHTML)
    //     })
    // });



}

main();

// console.log(songs);

//  playing previous song when prev icon is clicked and updating song name in the playbar
document.querySelector(".prev-song").addEventListener("click", () => {
    if (songs.indexOf(currentsong.src) == 0) {
        playmusic(songs[(songs.length) - 1]);

    } else {
        // playmusic(songs[(songs.indexOf(currentsong.src)) - 1]);
        playmusic(songs[songs.indexOf(currentsong.src) - 1]);
    }
});

//  playing next song song when next icon is clicked and updating song name in the playbar

document.querySelector(".next-song").addEventListener("click", () => {

    if (songs.indexOf(currentsong.src) == ((songs.length) - 1)) {
        playmusic(songs[0]);
    } else {
        // playmusic(songs[(songs.indexOf(currentsong.src)) + 1console.log
        playmusic(songs[songs.indexOf(currentsong.src) + 1]);
    }
});


//  playing previous and next songs when left and right arrow-keys are clicked 
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        currentsong.currentTime -= 10;
    } else if (e.keyCode == 39) {
        currentsong.currentTime += 10;
    }
});







currentsong.addEventListener("loadeddata", () => {
    document.querySelector(".song-duration-playbar").innerHTML = `${formatTime(
        currentsong.currentTime
    )} / ${formatTime(currentsong.duration)}`;
});

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
    console.log(e.offsetX);
    console.log(e.target.getBoundingClientRect());


    let seek = ((e.offsetX) / (document.querySelector(".bar").getBoundingClientRect().width)) * 100;
    console.log(seek);


    currentsong.currentTime = (currentsong.duration * seek) / 100;
});

// setting a volume bar and giving functionality 

document.querySelector(".volume").addEventListener("click", (e) => {
    console.log(e.clientX);
    // console.log(e.getBoundingClientRect().width);

    let seek = ((e.offsetX) / (document.querySelector(".volume").getBoundingClientRect().width)) * 100;

    console.log(seek);

    // document.querySelector(".volume-circle").style.left = seek +"%";
    document.querySelector(".rand").style.width = seek + "%";
    if ((seek / 100) > 1) {
        currentsong.volume = 1;
    } else {

        currentsong.volume = seek / 100;
    }
})


// changing the volume when the up and down arrows keys are pressed

function changeVolume(key) {
    let currentVolume = currentsong.volume;
    if (key === "ArrowUp") {
        // Increase volume
        currentVolume = Math.min(currentVolume + 0.1, 1); // Increase by 0.1, maximum volume is 1
    } else if (key === "ArrowDown") {
        // Decrease volume
        currentVolume = Math.max(currentVolume - 0.1, 0); // Decrease by 0.1, minimum volume is 0
    }
    currentsong.volume = currentVolume; // Update the volume
    document.querySelector(".rand").style.width = currentsong.volume * 100 + "%";;
    console.log(document.querySelector(".rand").style.width)
}

// Event listener for key presses
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling behavior
        changeVolume(event.key); // Call function to change volume
    }
});


currentsong.addEventListener("ended", () => {
    if (songs.indexOf(currentsong.src) == ((songs.length) - 1)) {
        playmusic(songs[0]);
    } else {
        // playmusic(songs[(songs.indexOf(currentsong.src)) + 1console.log
        playmusic(songs[songs.indexOf(currentsong.src) + 1]);
    }
});

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0%";
    document.querySelector(".cross").style.display = "block";
})


document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "";
})

