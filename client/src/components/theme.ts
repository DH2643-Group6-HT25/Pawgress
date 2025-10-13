import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    dark_grey: "#7D999B",
    light_grey: "#A4B6B5",
    black: "#000000",
    white: "#ffffffff",
  },

  fonts: {
    pixel: "'Pixelify Sans', monospace",
  },
  border: {
    thickness: "3px",
    shadowOffset: "3px",
  },
  size: {
    card_width: "30%",
    card_height: "25%",
    small_card_width: "100%",
    small_card_height: "90%",
    large_card_width: "100%",
    large_card_heigth: "90%",
    card_border_radius: "20px",
  },
};
