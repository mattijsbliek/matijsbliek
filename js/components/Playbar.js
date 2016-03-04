import { h } from '@cycle/dom';
import Queue from './Queue';
import PlaybackProgress from './PlaybackProgress';
import PlaybackControls from './PlaybackControls';

const view = state => {
	return h('div.playbar.js-player', [
		PlaybackControls.DOM(state),
		PlaybackProgress.DOM(state.currentTrack, state.playbackProgress),
		h('audio', { src: '' }),
		//h('label', [
			//h('input', { type: 'checkbox' }),
			//'Shuffle'
		//]),
		//h('button', 'Repeat'),
		h('button.queue-toggler', {
		  onclick: () => {
        toggleQueueVisibility.onNext();
		  }
		}, 'Toggle queue'),
		Queue.view(state.queue, state.queueIsVisible)
  ])
};

const Playbar = {
    DOM: view
}

export default Playbar;
