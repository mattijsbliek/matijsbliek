"use strict";

import { h } from '@cycle/dom';
import Rx from 'rx';

const albumView = album => {
  return h('li',
    {
      attributes: {
        'data-album-id': album.id
      }
    }, [
    h('a.js-play-album', {
      href: '#',
    }, [
      h('img', {
          src: "http://placehold.it/240x240",
          alt: ""
      }),
      h('h2', album.title),
      h('h3', album.artist)
    ]),
    h('button', 'Play album')
  ])
};

const intent = DOMSource => DOMSource
  .select('button')
  .events('click')
  .map(
    e => ({
      playAlbum: Number(e.target.parentNode.getAttribute('data-album-id'))
    })
  );

const view = albums => {
    return h('ol.album-grid', 
       albums
        .filter(album => album.tracks.length) // only show albums that contain tracks
        .map(album => albumView(album))
    );
}

const AlbumList = {
  DOM: state => view(state.albums),
  intent
};

export default AlbumList;
