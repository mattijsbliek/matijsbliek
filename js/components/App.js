import { h } from '@cycle/dom';
import Rx from 'rx';
import Api from '../api';

import AlbumList from './AlbumList';
import Playbar from './Playbar';
import Player from './Player';

const getInitialState = () => {
  return {
    isPlaying: false,
    albums: [],
    tracks: [],
    queue: [],
    loading: 0,
    queueIsVisible: false,
    playedQueue: [],
    currentTrack: null,
    playbackProgress: 0
  };
}

const url = 'http://localhost:4000/api/albums?filter[include]=tracks';

const intent = DOM => {
  const playAlbum$ = AlbumList.intent(DOM);

  return {
    playAlbum$
  }
};

const model = ({ HTTPSource, actions }) => {
  
  const response$$ = HTTPSource.filter(response$ => response$.request.url === url);
  const response$ = response$$.switch().map(res => ({
      albums: res.body
  }));

  actions.playAlbum$.subscribe(ev => {
    console.log('action: ', ev);
  });

  // Return a state$ observable, containing the full application state
  const state$ = Rx.Observable.merge(
    response$,
    actions.playAlbum$
  );

  return state$.scan(
    (prevState, addToState) => Object.assign(prevState, addToState), getInitialState()
  );
}

const view = state$ => {
  return state$.map(state => {
    return h('div', [
        AlbumList.DOM(state),
        Playbar.DOM(state),
        Player.DOM(state)
      ])
  });
}

const App = sources => {
  // Create initial API request
  const request$ = Rx.Observable.just(url);

  const actions = intent(sources.DOM);

  // Get state
  const state$ = model({ HTTPSource: sources.HTTP, actions });

  // Get Virtual DOM tree
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    HTTP: request$,
  };
}

export default App;
