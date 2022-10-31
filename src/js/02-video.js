import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const localStorageKeyName = 'videoplayer-current-time';
const currentTime = window.localStorage.getItem(localStorageKeyName);
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerTimeUpdate(e) {
  window.localStorage.setItem(localStorageKeyName, e.seconds);
}

if (currentTime !== null) {
  player.setCurrentTime(currentTime);
}
