import { server_url } from "./Config";
import axios from "axios";
import { logout } from "utils/LocalStorage";
import { useEffect } from "react";

import { message } from "antd";

export const GET = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));

  console.log("url", url);
  try {
    return (
      axios
        .get(server_url + url, {
          method: "get",
          crossDomain: true,
          timeout: 10000,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
        // .then((response) => response.json())
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response?.data);
          }
          if (error.response?.data?.auth == false) {
            message.error(error.response?.data.message);
            setTimeout(() => {
              logout();
              window.location.replace("/");
            }, 1000);
          } else
            message.error(
              error.response?.data.message || "Network error. Request timeout."
            );

          return error.response?.data || {};
        })
    );
  } catch (e) {
    return e;
  }
};

export const POST = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  console.log("url", url);
  try {
    return fetch(server_url + url, {
      method: "post",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      // body: formData,
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    return e;
  }
};

export const PATCH = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("url", url);
  try {
    return fetch(server_url + url, {
      method: "PATCH",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    return e;
  }
};
export const DELETE = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("url", url);
  try {
    return fetch(server_url + url, {
      method: "DELETE",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    return e;
  }
};

export const WEBHOOKPOST = async (formData) => {
  console.log(formData, "webhook form data ");
  for (var value of formData.values()) {
    console.log(value);
  }
  try {
    return fetch("https://webhook.site/229acca9-527c-432c-ba40-ec3199618a75", {
      method: "post",
      crossDomain: true,
      headers: {
        // Accept: "application/json",
        // "content-type": "multipart/form-data",
        // "content-type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    return e;
  }
};
export const AXIOS_WEBHOOK_POST = async (formData) => {
  console.log(formData, "webhook form data ");

  try {
    return axios({
      url: "https://webhook.site/f2ff9ef8-61b8-4582-91fb-7d440f46c648",
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (response) {
        return response;
      })
      .catch((error) => {
        //Network error comes in
        return error;
      });
  } catch (e) {
    return e;
  }
};
export const AXIOS_POST = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log("url", url);

  try {
    return axios({
      url: server_url + url,
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        //Network error comes in
        return error.response;
      });
  } catch (e) {
    console.log("Catch try catch");

    return e;
  }
};
export const AXIOS_PATCH = async (url, formData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  try {
    return axios({
      url: server_url + url,
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        //Network error comes in
        return error.response;
      });
  } catch (e) {
    console.log("Catch try catch");

    return e;
  }
};

export const REGISTER_USER = async (url, formData) => {
  console.log(server_url + url);

  try {
    return fetch(server_url + url, {
      method: "post",
      // mode: "no-cors",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())

      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    return e;
  }
};

export const getDays = (startDate, day) => {
  let days = ["S", "M", "T", "W", "T", "F", "S"];
  const interval = 1000 * 60 * 60 * 24;
  // console.log(
  //   new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()
  // );

  return Array.from({ length: day }, (v, i) => {
    let getDate = new Date(startDate.valueOf() + interval * i);
    return {
      day: days[getDate.getDay()],
      date: getDate.getDate(),
      month: getDate.getMonth() + 1,
      year: getDate.getFullYear(),
    };
  });
};

export const formatDate = (date, indicator) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(indicator);
};

export function getFormData(formData, data, previousKey) {
  if (data instanceof Object) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof Object && !Array.isArray(value)) {
        return this.getFormData(formData, value, key);
      }
      if (previousKey) {
        key = `${previousKey}[${key}]`;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
    });
  }
}
export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};
