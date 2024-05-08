import { useMediaQuery } from "@mui/material";
import axios from "axios";

export const getDefaultUserTheme = () => {
  if (typeof sessionStorage !== "undefined") {
    let val = sessionStorage.getItem("theme") || "light";
    return val;
  }
  const isDarkModeEnabled = useMediaQuery("(prefers-color-scheme: dark)");
  let val = isDarkModeEnabled ? "dark" : "light";
  return val;
};

export const setDefaultUserTheme = function (theme) {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("theme", theme);
  }
};