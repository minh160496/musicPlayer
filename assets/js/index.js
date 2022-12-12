let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

//bắt các nodeElement trong DOM
let player = $(".player");
let dashBoard = $(".dashboard");
let playlist = $(".playlist");
let marginTopPlaylist = Number(playlist.style.marginTop);
let headingSongName = $("header h2");
let cdThumb = $(".cd-thumb");
let cd = $(".cd");
let audio = $("audio");
let progress = $("#progress");
progress.value = 0;
let toggleBtn = $(".btn-toggle-play");
let nextBtn = $(".btn-next");
let prevBtn = $(".btn-prev");
let repeatBtn = $(".btn-repeat");
let randomBtn = $(".btn-random");
const app = {
  currentIndex: 0,
  isRepeat: false,
  isRandom: false,
  songs: [
    {
      id: 1,
      name: "Bài nhạc số 01 nè",
      singger: "My singger 1",
      src: "./assets/audio/song1.mp3",
      image: "./assets/img/img1.png",
    },
    {
      id: 2,
      name: "Bài nhạc số 02 nè",
      singger: "My singger 2",
      src: "./assets/audio/song2.mp3",
      image: "./assets/img/img2.png",
    },
    {
      id: 3,
      name: "Bài nhạc số 03 nè",
      singger: "My singger 3",
      src: "./assets/audio/song3.mp3",
      image: "./assets/img/img3.png",
    },
    {
      id: 4,
      name: "Bài nhạc số 04 nè",
      singger: "My singger 4",
      src: "./assets/audio/song4.mp3",
      image: "./assets/img/img4.png",
    },
    {
      id: 5,
      name: "Bài nhạc số 05 nè",
      singger: "My singger 5",
      src: "./assets/audio/song5.mp3",
      image: "./assets/img/img5.png",
    },
    {
      id: 6,
      name: "Bài nhạc số 06 nè",
      singger: "My singger 6",
      src: "./assets/audio/song6.mp3",
      image: "./assets/img/img6.png",
    },
    {
      id: 7,
      name: "Bài nhạc số 07 nè",
      singger: "My singger 7",
      src: "./assets/audio/song7.mp3",
      image: "./assets/img/img7.png",
    },
    {
      id: 8,
      name: "Bài nhạc số 08 nè",
      singger: "My singger 8",
      src: "./assets/audio/song8.mp3",
      image: "./assets/img/img8.png",
    },
    {
      id: 9,
      name: "Bài nhạc số 09 nè",
      singger: "My singger 9",
      src: "./assets/audio/song9.mp3",
      image: "./assets/img/img9.png",
    },
    {
      id: 10,
      name: "Bài nhạc số 10 nè",
      singger: "My singger 10",
      src: "./assets/audio/song10.mp3",
      image: "./assets/img/img10.png",
    },
    {
      id: 11,
      name: "Bài nhạc số 11 nè",
      singger: "My singger 11",
      src: "./assets/audio/song11.mp3",
      image: "./assets/img/img11.png",
    },
  ],

  //render ra plahylit songs
  renderListSongs() {
    let htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-type="${song.id}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singger}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                  </div>
                `;
    });
    playlist.innerHTML = htmls.join("");
  },

  //hiện ra song hiện đang phát trên giao diện
  showCurrentSong() {
    progress.value = 0;
    let currentSong = this.songs[this.currentIndex];
    console.log(this.currentIndex);
    headingSongName.innerText = currentSong.name;
    cdThumb.style.backgroundImage = `url(${currentSong.image})`;
    audio.setAttribute("src", `${currentSong.src}`);
  },

  //hiên bài hát tương ứng trên playlist
  showCurrentSongPlaylist() {
    currentSongList = $(".song.active");

    //bài nào hiện trên thumb bài đó view trên list
    currentSongList.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  },

  //hàm active các btn khi click
  active(element) {
    element.classList.toggle("active");
  },

  //xử lý các sự kiện diễn ra
  handalEvents() {
    const _this = this;
    //sự kiện khi audio đang play
    let animation;
    audio.onplay = () => {
      player.classList.add("playing");
      animation = cd.animate(
        [
          // keyframes
          { transform: "rotate(360deg)" },
        ],
        {
          // timing options
          duration: 10000,
          iterations: Infinity,
        }
      );
    };

    //khi audio pause
    audio.onpause = () => {
      animation.pause();
      player.classList.remove("active");
    };
    //sự kiện cuộn list bài nhạc
    document.onscroll = () => {
      marginTopPlaylist = 408 - window.scrollY + "px";
      cd.style.width = 200 - window.scrollY + "px";
      if (window.scrollY > 200) {
        cd.style.width = 0;
      }
    };

    //sự kiện click vào nút play or pause
    toggleBtn.onclick = () => {
      player.classList.toggle("playing");
      let playing = $(".playing");
      if (playing) {
        audio.play();
      } else audio.pause();
    };

    //sự kiện click vào nút next
    nextBtn.onclick = () => {
      const currentIndexOfThis = _this.currentIndex;
      if (!this.isRandom) {
        _this.currentIndex =
          _this.currentIndex < _this.songs.length - 1
            ? _this.currentIndex + 1
            : 0;
      } else {
        _this.currentIndex = Math.floor(
          Math.random() * (_this.songs.length - 1)
        );
      }
      if (_this.currentIndex == currentIndexOfThis)
        _this.currentIndex = _this.currentIndex + 1;

      _this.renderListSongs();
      _this.showCurrentSong();
      _this.showCurrentSongPlaylist();

      audio.play();
    };

    //sự kiện click vào nút prev
    prevBtn.onclick = () => {
      const currentIndexOfPrev = _this.currentIndex;
      if (!this.isRandom) {
        _this.currentIndex =
          _this.currentIndex > 0 ? _this.currentIndex - 1 : 10;
      } else {
        _this.currentIndex = Math.floor(
          Math.random() * (_this.songs.length - 1)
        );
      }
      if (_this.currentIndex == currentIndexOfPrev)
        _this.currentIndex = _this.currentIndex + 1;
      _this.renderListSongs();
      _this.showCurrentSong();
      _this.showCurrentSongPlaylist();
      audio.play();
    };

    //sự kiện tour song
    progress.onchange = () => {
      let audioDuration = audio.duration;
      let valueProgress = progress.value / 100;
      audio.currentTime = valueProgress * audioDuration;
      audio.play();
    };

    //cho input progress auto tour theo thời lượng bài hát
    audio.ontimeupdate = () => {
      let audioDuration = audio.duration;
      let currentTimeAudio = audio.currentTime;
      progress.value = Math.floor((currentTimeAudio / audioDuration) * 100);
    };

    //xử lý sự kiện khi một bài hát kết thúc thì autoNext
    audio.onended = () => {
      setTimeout(() => {
        nextBtn.click();
      }, 1000);
    };

    //sự kiện click vào nút lặp lại
    repeatBtn.onclick = () => {
      _this.active(repeatBtn);
      _this.isRepeat = !_this.isRepeat;
    };

    //sự kiện click vào nút random
    randomBtn.onclick = () => {
      _this.active(randomBtn);
      _this.isRandom = !_this.isRandom;
    };

    //lắng nghe hành vi click vào playlist
    playlist.onclick = (e) => {
      let song = e.target.closest(".song:not(.active)");
      let option = e.target.closest(".option");
      if (song && !option) {
        let dataTypeSong = song.getAttribute("data-type");
        const currentIndexOfPlaylist = _this.currentIndex;
        _this.currentIndex = dataTypeSong - 1;
        _this.showCurrentSong();
        _this.renderListSongs();
        _this.showCurrentSongPlaylist();
        audio.play();
      }
    };
  },

  start() {
    this.renderListSongs();
    this.showCurrentSong();
    this.handalEvents();
  },
};

app.start();

//reder ra list nhạc
//render ra bài hát default
//scroll playlist đĩa nhạc nhỏ dần
//làm quay đĩa nhạc
//làm chức năng play
//làm chức năng next
//làm chức năng tuour
//làm chức năng next bài random
//làm chức năng lặp lại
//làm chức năng hát đến bài nào thì veiw đúng bài đó trong list, click vào bài nào thì play bài đó
