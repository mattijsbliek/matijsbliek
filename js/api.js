import Rx from 'rx';
import fetch from 'isomorphic-fetch';

// getUrl :: String -> String
let getUrl = function(query) {
	return 'http://localhost:4000/api/' + query;
}

let Api = {};

Api.get = (query) => {
  return Rx.Observable.create(function(observer) {  
    let url = getUrl(query);
    let subscribed = true;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (subscribed) {
          observer.onNext(data);
          observer.onCompleted();
        }
    }).catch(err => {
      if (subscribed) {
        observer.onError(err);
      }
    });

    return function() {
      subscribed = false;
    }
  });
}

export default Api;
