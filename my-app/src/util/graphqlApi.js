import BlueBird from 'bluebird';
import $ from 'jquery';

const API_URL = 'http://localhost:1337/';

let csrfToken = '';

/**
 * [_request description]
 *
 * @method _request
 * @param {[type]} inputOptions [description]
 * @return {[type]} [description]
 */
function request(inputOptions) {
  // Promisify Jquery ajax
  return new BlueBird.Promise((resolve, reject) => {
    // Clone the options object
    const options = Object.assign({
      success: resolve,
      error: reject,
    }, inputOptions);

    return $.ajax(options);
  });
}

export function preflight() {
  return request({
    method: 'GET',
    xhrFields: {
      withCredentials: true,
    },
    url: `${API_URL}csrfToken`,
  }).then((tokenObj) => {
    csrfToken = tokenObj._csrf;
    return tokenObj;
  });
}

export function query(queryString) {
  return preflight().then(() => {
    // Add csrf token to parameters
    const apiData = { query: queryString, _csrf: csrfToken };

    return request({
      method: 'POST',
      url: `${API_URL}graphql`,
      data: apiData,
      xhrFields: {
        withCredentials: true,
      },
    })
  });
}
