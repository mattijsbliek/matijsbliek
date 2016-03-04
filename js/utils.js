/**
 * Log values in composed functions. Useful for using
 * with Ramda's R.compose
 * @param {Value} The value you want to log
 */
const log = x => {
	console.log(x);
	return x;
}

/**
 * Get closest DOM element up the tree that contains a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Node} Null if no match
 */
const closest = (elem, selector) => {

    let firstChar = selector.charAt(0);

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If selector is a class
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        }

        // If selector is an ID
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        } 

        // If selector is a data attribute
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                return elem;
            }
        }

        // If selector is a tag
        if ( elem.tagName.toLowerCase() === selector ) {
            return elem;
        }

    }

    return false;

};

const secondsToTimecode = totalSeconds => {
  let hours   = Math.floor(totalSeconds / 3600);
      hours = hours < 10 ? "0" + hours : hours;
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.ceil(seconds * 100) / 100

  let result = hours > 0 ? hours + ':' : '';
      result += (hours > 0 ? "0" + minutes : minutes) + ':';
      result += (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

export default {
  log,
  closest,
  secondsToTimecode
};
