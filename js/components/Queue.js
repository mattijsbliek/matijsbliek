import { h } from '@cycle/dom';
import { playFromQueue } from '../controllers/queueManager';

const view = (tracks, isVisible) => {
  let className = isVisible ? { className: 'is-open' } : {};
  return h('ol.queue', className,
    tracks.map(track => {
      let trackTitle = `${track.artist} - ${track.title}`;
		  return h('li', [
			  h('button', {
			    onclick: ev => {
            playFromQueue.onNext(track.id);
			    }
			  }, trackTitle)
		  ])
	  })
  );
}

export default { view };
