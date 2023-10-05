import Vue from "vue";

export const get = payload => {
  return Vue.http
    .get(payload.url, { params: payload.params })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

export const post = payload => {
  return Vue.http
    .post(payload.url, payload.params)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

export const download = payload => {
  return Vue.http
    .post(payload.url, payload.params, {
      responseType: "blob"
    })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

export const upload = payload => {
  return Vue.http
    .post(payload.url, payload.params, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

export const put = payload => {
  return Vue.http
    .put(payload.url, payload.params)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};

export const remove = payload => {
  return Vue.http
    .delete(payload.url)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
};
