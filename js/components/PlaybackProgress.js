import { h } from '@cycle/dom';
import { secondsToTimecode } from '../utils';

const view = (track, currentTime) => {
  let timeElapsed = track ? secondsToTimecode(Math.ceil(currentTime)) : '';
  let timeLeft = track ? secondsToTimecode(Math.max(0, track.duration - Math.ceil(currentTime))) : '';
  let progress = track ? currentTime * 100 / track.duration : 0;

	return h('div.playback-progress', [
		h('span.playback-progress__elapsed', timeElapsed),
		h('progress', {
		  attrs: {
		    'max': 100,
		    'value': progress
		  }
		}),
		h('span.playback-progress__remaining', timeLeft)
	])
};

const PlaybackProgress = {
  DOM: view
};

export default PlaybackProgress;
