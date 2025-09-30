import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
        dark_grey: string;
        light_grey: string;
        black: string;
        white: string;
    };
    fonts: {
        pixel: string;
    };
    border: {
        thickness: string;
        shadowOffset: string;
    };
    size: {
        card_width: string;
        card_height: string;
        small_card_width: string,
        small_card_height: string,
        card_border_radius: string,
    }
  }
}