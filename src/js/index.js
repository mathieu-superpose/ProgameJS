import '../sass/style.scss';

import apikey from "./apikey";
import dayjs from 'dayjs';

import Home from "./Home";
import {PageList} from "./PageList";
import {PageDetail} from "./PageDetail";

import routes from "./routes";

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());