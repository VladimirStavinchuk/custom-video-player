// todo Добавить проверку поддержки: 1) медиа html5 и 2) программное определение и переключение поддерживаемых кодеков 3) поддержка субтитров, в том числе для обеспечния accessibility 4) панель управления сделать всплывающей поверх плейера

// ! добавить: стоп (с отмоткой на начало), быстрее, медленнее.
// ! добавить управление с клавиатуры.
// ! добавить темы, переводы.
// ! добавить изменение скорости
// ! добавить развернуть на весь экран и смотреть в отдельном окне

// import i18Obj from './translate-video.js';

const changeClassActive = function (className, classValue = 'active') {
  className.classList.toggle (classValue);
};

const deleteClassActive = function (className, classValue = 'active') {
  className.classList.remove (classValue);
};

function videoPlayerControls () {
  const videoPlayer = document.querySelector ('.video-player');
  const video = videoPlayer.querySelector ('.video-player__video');
  const progressVideo = videoPlayer.querySelector (
    '.video-player__slider_video'
  );
  const progressSound = videoPlayer.querySelector (
    '.video-player__slider_sound'
  );
  const btnPlayHover = videoPlayer.querySelector (
    '.video-player__hover-btn-img'
  );
  const btnPlayPause = videoPlayer.querySelector ('.video-player__btn-play');
  const btnStop = videoPlayer.querySelector ('.video-player__btn-stop');
  const btnMute = videoPlayer.querySelector ('.video-player__btn-mute');
  let progressTimeVideo = 0;
  // let progressVolumeVideo = 50;
  let saveVolumeVideo = 0.7;
  let isPlay = false;
  // let isMute = false;

  changeSound (saveVolumeVideo);

  seekingProgressVideo ();
  seekingVideoPlayer ();
  seekingVolumeVideo ();

  function seekingVideoPlayer () {
    videoPlayer.addEventListener ('click', function (e) {
      const clickBtn = e.target.classList;

      if (
        clickBtn.contains ('video-player__btn-play') ||
        clickBtn.contains ('video-player__hover-btn-img') ||
        (clickBtn.contains ('video-player__video') && isPlay)
      ) {
        isPlay === false ? playVideo () : pauseVideo ();
      } else if (clickBtn.contains ('video-player__btn-mute')) {
        video.volume > 0 ? offSoundVideo () : onSoundVideo ();
      } else if (clickBtn.contains ('video-player__btn-stop')) {
        stopVideo ();
      }
    });
  }

  function seekingProgressVideo () {
    progressVideo.addEventListener ('input', function () {
      video.currentTime = this.value * video.duration / 100;
      progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, #b3b3b3 ${this.value}%, #b3b3b3 100%)`;
    });

    video.addEventListener ('timeupdate', function () {
      progressTimeVideo = this.currentTime * 100 / video.duration;
      progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressTimeVideo}%, #b3b3b3 ${progressTimeVideo}%, #b3b3b3 100%)`;
      progressVideo.value = progressTimeVideo;
    });
  }

  function seekingVolumeVideo () {
    progressSound.addEventListener ('input', function () {
      video.volume = this.value / 100;
      progressSound.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, #b3b3b3 ${this.value}%, #b3b3b3 100%)`;
    });
  }

  function playVideo () {
    video.play ();
    isPlay = true;
    btnPlayHover.classList.add ('play');
    btnPlayPause.src = './assets/img/svg/pause.svg';
    btnStop.src = './assets/img/svg/stop.svg';
  }

  function pauseVideo () {
    video.pause ();
    isPlay = false;
    btnPlayHover.classList.remove ('play');
    btnPlayPause.src = './assets/img/svg/play.svg';
    btnStop.src = './assets/img/svg/previous.svg';
  }

  function stopVideo () {
    video.pause ();
    video.currentTime > 0 ? (video.currentTime = 0) : 0;
    isPlay = false;
    btnPlayPause.src = './assets/img/svg/play.svg';
    btnPlayHover.classList.remove ('play');
  }

  function offSoundVideo () {
    saveVolumeVideo = video.volume;
    video.volume = 0;
    changeSound (0);
  }

  function onSoundVideo () {
    console.log ('onSoundVideo saveVolumeVideo DO =  ' + saveVolumeVideo);
    console.log ('onSoundVideo video.volume DO =  ' + video.volume);
    video.volume = saveVolumeVideo;
    // isMute = false;
    // btnMute.src = './assets/img/svg/volume.svg';
    changeSound (saveVolumeVideo);
    console.log ('onSoundVideo saveVolumeVideo =  ' + saveVolumeVideo);
    console.log ('onSoundVideo video.volume =  ' + video.volume);
    // return saveVolumeVideo;
  }

  function changeSound (currentSound) {
    video.volume = currentSound;
    let currentSoundProgress = currentSound * 100;
    // console.log ('saveVolumeVideo  ' + saveVolumeVideo);
    // console.log ('progressVolumeVideo  ' + progressVolumeVideo);
    progressSound.value = currentSound * 100;
    progressSound.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentSoundProgress}%, #b3b3b3 ${currentSoundProgress}%, #b3b3b3 100%)`;
    // video.volume = progressVolumeVideo / 100;
    currentSound <= 0
      ? (btnMute.src = './assets/img/svg/mute.svg')
      : (btnMute.src = './assets/img/svg/volume.svg');
  }
}

videoPlayerControls ();
