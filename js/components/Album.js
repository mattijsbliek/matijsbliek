
const init = () => {

};

const view = (album, handler) => {
	if (album.year) {
	  album.artist = album.artist + '(' + album.year + ')';;
	}
	return h('article.album-grid__album album', [
		h('img.album__cover', { src: "http://placehold.it/400x400", alt: "" }),
		h('h1.album__title', album.title),
		h('cite.album__artist', album.artist),
    h('ol.album__tracklist tracklist', album.tracks.map(track => {
      h('li', { ariaSelected: 'true' }, [
        h('button', track.title, [
          h('b.track__duration', track.duration)
        ])
      ])
    }))
	]);
}

export default view;
