/* eslint-disable no-empty-pattern */
/* eslint-disable no-console */
/* jshint esversion: 6 */
/* eslint-disable */

import { get, post, download, upload, put, remove } from "@/core/services/apis";

const apis = {
  namespaced: true,
  actions: {
    async get({}, payload) {
      try {
        let response = await get(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
    async post({}, payload) {
      try {
        let response = await post(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
    async download({}, payload) {
      try {
        let response = await download(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
    async upload({}, payload) {
      try {
        let response = await upload(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
    async put({}, payload) {
      try {
        let response = await put(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
    async remove({}, payload) {
      try {
        let response = await remove(payload);
        return response;
      } catch (e) {
        return { error: true, statusCode: e.status, message: e.title || e.message };
      }
    },
  },
};

export default apis;
