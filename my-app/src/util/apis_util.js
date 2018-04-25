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
  });
}

export function get(urlSuffix, parameters) {
  return request({
    method: 'GET',
    url: `${API_URL}${urlSuffix}`,
    data: parameters,
  });
}

export function post(urlSuffix, parameters) {
  return preflight().then(() => {
    // Add csrf token to parameters
    const apiData = { ...parameters, _csrf: csrfToken };

    // Perform the actual request
    return request({
      method: 'POST',
      xhrFields: {
        withCredentials: true,
      },
      url: `${API_URL}${urlSuffix}`,
      data: apiData,
    });
  });
}

export function deleteRequest(urlSuffix, parameters) {
  return preflight().then(() => {
    // Add csrf token to parameters
    const apiData = { ...parameters, _csrf: csrfToken };

    // Perform the actual request
    return request({
      method: 'DELETE',
      xhrFields: {
        withCredentials: true,
      },
      url: `${API_URL}${urlSuffix}`,
      data: apiData,
    });
  });
}

export function patch(urlSuffix, parameters) {
  return preflight().then(() => {
    // Add csrf token to parameters
    const apiData = { ...parameters, _csrf: csrfToken };

    // Perform the actual request
    return request({
      method: 'PATCH',
      xhrFields: {
        withCredentials: true,
      },
      url: `${API_URL}${urlSuffix}`,
      data: apiData,
    });
  });
}
