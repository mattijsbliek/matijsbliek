import { h } from '@cycle/dom';
import { playAction, pauseAction } from '../controllers/player';
import { previous, next } from '../controllers/queueManager';

const view = state => {
  const playEnabled = state.currentTrack ? {} : { disabled: 'disabled' };
  const nextEnabled = state.queue.length !== 0 ? {} : { disabled: 'disabled' };
  const PlayButton = state.isPlaying ?
    h('button.playback-controls__pause', {
      onclick: () => {
        pauseAction.onNext()
      }
    }, 'Pause') :
    h('button.playback-controls__play', {
      onclick: () => {
        playAction.onNext()
      },
      attrs: playEnabled
    }, 'Play');
	return h('div.playback-controls', [
	  h('button.playback-controls__prev', {
	    onclick: () => {
        previous.onNext();
	    },
      attrs: playEnabled
	  }, 'Previous'),
	  PlayButton,
	  h('button.playback-controls__next', {
	    onclick: () => {
        next.onNext();
	    },
      attrs: nextEnabled
	  }, 'Next')
	]);
};

export default {
  DOM: view
};
