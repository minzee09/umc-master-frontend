import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: {
      400: '#49BA9B',
      500: '#1B8C78',
      600: '#137870',
      700: '#0D6364',
      800: '#084951',
      900: '#053643',
    },
    blue: {
      400: '#148AFB',
      500: '#0470D6',
    },
    red: {
      400: '#DC5B6D',
      500: '#D33248',
    },
    green: '#2BBF53',
    text: {
      black: '#121212',
      gray: '#636363',
      lightGray: '#9C9C9C',
      white: '#FFFFFF',
    },
  },
  typography: {
    caption: {
      default: {
        size: '12px',
        weight: 400,
      },
    },
    heading: {
      large: {
        size: '50px',
        weight: 600,
        lineHeight: '75px',
      },
      medium: {
        size: '40px',
        weight: 600,
        lineHeight: '60px',
      },
      small: {
        size: '36px',
        weight: 600,
        lineHeight: '54px',
      },
      xsmall: {
        size: '30px',
        weight: 600,
        lineHeight: '45px',
      },
      xxsmall: {
        size: '28px',
        weight: 600,
        lineHeight: '42px',
      },
      xxxsmall: {
        size: '24px',
        weight: 600,
        lineHeight: '36px',
      },
    },
    title: {
      large: {
        size: '36px',
        weight: 500,
        lineHeight: '54px',
      },
      medium: {
        size: '30px',
        weight: 500,
        lineHeight: '45px',
      },
      small: {
        size: '28px',
        weight: 500,
        lineHeight: '42px',
      },
      xsmall: {
        size: '24px',
        weight: 500,
        lineHeight: '36px',
      },
      xxsmall: {
        size: '20px',
        weight: 500,
      },
      xxxsmall: {
        size: '18px',
        weight: 500,
      },
    },
    body: {
      content: {
        size: '28px',
        weight: 400,
        lineHeight: '42px',
      },
      large: {
        size: '24px',
        weight: 400,
        lineHeight: '36px',
      },
      medium: {
        size: '20px',
        weight: 400,
        lineHeight: '30px',
      },
      small: {
        size: '18px',
        weight: 400,
        lineHeight: '27px',
      },
      xsmall: {
        size: '16px',
        weight: 400,
      },
    },
  },
  fontFamily: {
    regular: 'Pretendard',
    medium: 'Pretendard',
    semibold: 'Pretendard',
    bold: 'Pretendard',
  },
};

export default theme;
