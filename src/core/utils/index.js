/* jshint esversion:6 */

import moment from "moment";
import accounting from "accounting";
import store from "@/core/services/store";
import { camelCase } from "lodash";

export const pageSize = 20;

export function validEmail(email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// export function validPhone(phone) {
//   const re = /^\+65(6|8|9)\d{7}$/;
//   return re.match(phone);
//   // return /\(?(?:\+62|62|08)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g.test(
//   //   phone
//   // );
// }

// export function validPhone(phone) {
//   return /\(?(?:\+62|62|08)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g.test(
//     phone
//   );
// }

export function capitalize(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function initial(fullname) {
  return Array.prototype.map
    .call(fullname.split(" "), function(x, y) {
      return y < 2 ? x.substring(0, 1).toUpperCase() : "";
    })
    .join("");
}

export function truncate(str, len) {
  len = len || 100;
  return str.length > len ? str.substring(0, len) + "..." : str;
}

export function parseError(e) {
  let error = {};

  for (let key in e.messages) {
    let field = key.replace("_", " ");
    error["field"] = capitalize(field);
    error["messages"] = e.messages[key].join(", ");
  }

  return error;
}

export function getDay(date) {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return moment(date, format).format("dddd");
}

export function getDate() {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return moment().format(format);
}

export function getDateTime() {
  moment.locale("id-id");
  let format = "YYYY-MM-DD HH:mm";
  return moment().format(format);
}

export function getYear() {
  moment.locale("id-id");
  let format = "YYYY";
  return moment().format(format);
}

export function startDate() {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return moment().format("D") == 1
    ? moment()
        .add(-1, "M")
        .startOf("month")
        .format(format)
    : moment()
        .startOf("month")
        .format(format);
}

export function yearStart() {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return moment()
    .startOf("year")
    .format(format);
}

export function yearEnd() {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return moment()
    .endOf("year")
    .format(format);
}

export function dateFormat(date, format) {
  if (date == null) return "-";
  moment.locale("id-id");
  format = format || "DD/MM/YYYY";
  return moment(date).format(format);
}

export function indonesianDatetime(date) {
  moment.locale("id-id");
  return moment(date).add(7, "hours");
}

export function dateTimeFormat(date, format) {
  if (date == null) return "-";
  // moment.locale("id-id");
  format = format || "DD/MM/YYYY HH:mm:ss";
  return moment(date).format(format);
}

export function numberFormat(number, precision = 0, delimiter = ".") {
  let result = null;
  if (Math.floor(number) === number) {
    result = accounting.formatNumber(
      number,
      0,
      delimiter == "." ? "." : ",",
      delimiter == "." ? "," : "."
    );
  } else {
    result = accounting.formatNumber(
      number,
      precision,
      delimiter == "." ? "." : ",",
      delimiter == "." ? "," : "."
    );
  }

  return result;
}

export function numberUnFormat(number) {
  return accounting.unformat(number);
}

export function isLastDateOfMonth(date) {
  moment.locale("id-id");
  let format = "YYYY-MM-DD";
  return (
    moment(date).format(format) ==
    moment(date)
      .endOf("month")
      .format(format)
  );
}

export function dateAdd(date, length, period) {
  moment.locale("id-id");

  return moment(date)
    .add(length, period)
    .toDate();
}

export function years() {
  let result = [];
  for (let item = 1900; item <= 2099; item++) {
    result.push({
      id: item,
      label: item
    });
  }

  return result;
}

export function tableHeight() {
  return document.documentElement.clientHeight - 295;
}

export function convertAmpersand(text) {
  return text.replace(/&amp;/g, "&");
}

export function hoursAgo(date) {
  moment.locale("id-id");
  let now = moment(new Date());
  let end = moment(date);
  let duration = moment.duration(now.diff(end));
  let days = duration.asDays();

  if (days >= 1) {
    return moment(date).format("DD MMM YYYY HH:mm");
  } else {
    return moment(date).format("HH:mm");
  }
}

export function stripHTML(str) {
  let regex = /(<([^>]+)>)/gi;
  return str.replace(regex, "");
}

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

export function dateFromNumber(excelDate) {
  return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
}

export function getExt(filename) {
  return (
    filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
    filename
  );
}

export function arraySelected(arr, value) {
  if (arr.includes(value)) {
    // console.log(true);
    // return arr.filter(item => item !== value);
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  } else {
    // console.log(false);
    return arr.push(value);
  }
}

/* export function phoneValidator(str) {
  let regex = RegExp(r'^(8|9)\d{7}$');
  return regex.hasMatch(str);
} */

export async function getRegion() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/region"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getRole() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/role"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getDppu() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/dppu",
      params: {
        actived: true
      }
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getAppearance() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/appearance"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getColour() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/colour"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getCleanlines() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/cleanlines"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getFreeWater() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/free-water"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getWaterDetector() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/water-detector"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getVisualCheck() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/visual-check"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getChecklistResult() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/checklist-result"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

export async function getGeneralCondition() {
  let result = [];

  await store
    .dispatch("apis/get", {
      url: "/common/general-condition"
    })
    .then(response => {
      result = response.data;
    });

  return result;
}

// export function groupBy(list, keyGetter) {
//   const map = new Map();
//   list.forEach((item) => {
//        const key = keyGetter(item);
//        const collection = map.get(key);
//        if (!collection) {
//            map.set(key, [item]);
//        } else {
//            collection.push(item);
//        }
//   });
//   return map;
// }

export function groupBy(arr, key) {
  const initialValue = {};
  return arr.reduce((acc, cval) => {
    const myAttribute = cval[key];
    acc[myAttribute] = [...(acc[myAttribute] || []), cval];
    return acc;
  }, initialValue);
}

export function camelizeKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key])
      }),
      {}
    );
  }
  return obj;
}

export function isNullOrEmpty(str) {
  if (str === null || str.trim() === "") return true;
  else return false;
}

export function normalizer(node) {
  return {
    id: node.value,
    label: node.text
  };
}

export function setVolume(params, uom = "L") {
  return `${numberFormat(params)} ${uom}`;
}

export function setDensity(params) {
  return `${numberFormat(params)} Kg/L`;
}

export function setTemperature(params) {
  return `${numberFormat(params)} °C`;
}

export function setConductivity(params) {
  return `${numberFormat(params)} pS/m`;
}

export function setPsi(params) {
  return `${numberFormat(params)} Psi`;
}

export function setFlowRate(params) {
  return `${numberFormat(params)} Ltr/Mnt`;
}
