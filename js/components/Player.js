import { h } from '@cycle/dom';
import Rx from 'rx';
import { intent } from './AlbumList';

const AUDIO = document.querySelector('audio');

const pause = () => {
  // Pause audio
  AUDIO.pause();

  // Update state
  updateState({
    isPlaying: false
  });
}

const play = track => {
  // Create object to update state
  let update = { isPlaying: true }

  // If new track is passed in, change <audio src> to
  // new track. Set currentTrack to track for state.
  if (track) {
    AUDIO.src = DOMAIN + '/' + track.fileLocation;
    update.currentTrack = track;
  }

  // Play audio
  AUDIO.play();

  // Update state
  updateState(update);
}

const restart = () => {
  AUDIO.currentTime = 0;
  AUDIO.play();
}

// Create an Observable from the timeupdate event so
// we can track the progress of the track.
const playbackProgress$ = Rx.Observable
  .fromEvent(AUDIO, 'timeupdate')
  .subscribe(() => {
    // When fired, update playbackProgress in state
    updateState({
      playbackProgress: AUDIO.currentTime
    });
  });

const playbackEnded$ = Rx.Observable
  .fromEvent(AUDIO, 'ended')
  .subscribe(() => {
    next.onNext();
  });

const view = state => {
  return h('audio.js-player-audio', {
    attributes: {
      src: '#'
    }
  });
}

const model = () => {
}


export default {
  DOM: view
}
