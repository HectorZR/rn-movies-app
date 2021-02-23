import {useEffect, useRef, useState} from 'react';
import appBaseUrl from '../configs/configs';
import {trans} from '../trans/trans';

const defaultOptions = {
  method: 'GET',
  useBaseUrl: true,
  body: {},
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  queryParams: {},
  params: {},
  responseType: 'json',
  redirectUnauthorized: true,
  showErrorSnackbar: false,
  showSucessSnackbar: false,
};

function useXhr(params) {
  params = {...defaultOptions, ...params};

  const [error, setError] = useState(null);
  const xhr = useRef(new XMLHttpRequest());

  useEffect(() => {
    const request = xhr.current;
    return () => {
      request.abort();
    };
  });

  function send(options = {}) {
    options = {...params, ...options};

    xhr.current.abort();

    return new Promise((resolve, reject) => {
      xhr.current.open(options.method, formatUrl(options), true);

      setHeaders(options, xhr.current);

      xhr.current.send(setBody(options));
      xhr.current.onload = () => {
        const response = getResponse(options, xhr.current);

        if (xhr.current.status >= 200 && xhr.current.status < 300)
          return resolve(
            options.responseType === 'json'
              ? {
                  ...response,
                  status: xhr.current.status,
                }
              : {
                  [options.responseType]: response,
                  status: xhr.current.status,
                },
          );

        if (xhr.current.status < 200 && xhr.current.status >= 300)
          return reject({
            ...response,
            status: xhr.current.status,
          });
      };

      xhr.current.onerror = () => {
        setError({
          status: 0,
          message: trans('exceptions.networkError'),
        });
      };
    });
  }

  function abort() {
    if (xhr.current.readyState < 4 && xhr.current.readyState > 0)
      xhr.current.abort();
  }

  return [send, error, abort];
}

function formatUrl({useBaseUrl, url, params, queryParams}) {
  if (useBaseUrl) url = `${appBaseUrl()}${url}`;

  Object.keys(params || {}).forEach((param) => {
    url = url.replace(`:${param}`, params[param]);
  });

  const query = Object.keys(queryParams || {}).map(
    (query) => `${query}=${queryParams[query]}`,
  );

  if (query.length > 0) url = `${url}?${query.join('&')}`;

  return url;
}

function setHeaders(options, xhr) {
  Object.keys(options.headers).forEach((key) => {
    xhr.setRequestHeader(key, options.headers[key]);
  });
}

function setBody(options = {}) {
  if (!Object.keys(options.body || {}).length === 0) return null;

  if (
    options.headers?.hasOwnProperty('Content-Type') &&
    options.headers['Content-Type'] === 'application/json'
  )
    return JSON.stringify(options.body);

  const formData = new FormData();

  Object.keys(options.body || {}).forEach((key) => {
    formatToFormatData(formData, key, options.body[key]);
  });

  return formData;
}

function formatToFormatData(formData, key, data) {
  if (data instanceof Array)
    for (let i = 0; i < data.length; i += 1) {
      if (data instanceof Array || data instanceof Object) {
        formatToFormatData(formData, `${key}[${i}]`, data[i]);
      }
    }
  else if (
    data instanceof Object &&
    !(data instanceof File) &&
    !(data instanceof Image) &&
    !(data instanceof Blob)
  )
    for (const prop in data) {
      if (data instanceof Array || data instanceof Object)
        formatToFormatData(formData, `${key}[${prop}]`, data[prop]);
    }
  else formData.append(key, data);
}

function getResponse(options, xhr) {
  try {
    if (options.responseType === 'json') return JSON.parse(xhr.response);

    return xhr.response;
  } catch (error) {
    return xhr.response;
  }
}

export default useXhr;
