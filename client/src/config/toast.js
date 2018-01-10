import { style } from 'react-toastify';

style({
  width: '320px',
  colorDefault: '#fff',
  colorInfo: '#557cf2',
  colorSuccess: '#A0E03A',
  colorWarning: '#f1c40f',
  colorError: '#CF5959',
  colorProgressDefault: 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
  mobile: 'only screen and (max-width : 480px)',
  fontFamily: 'Source Sans Pro',
  zIndex: 9999,
  TOP_LEFT: {
    top: '1em',
    left: '1em'
  },
  TOP_CENTER: {
    top: '2em',
    marginLeft: `-${320/2}px`,
    left: '50%'
  },
  TOP_RIGHT: {
    top: '1em',
    right: '1em'
  },
  BOTTOM_LEFT: {
    bottom: '1em',
    left: '1em'
  },
  BOTTOM_CENTER: {
    bottom: '1em',
    marginLeft: `-${320/2}px`,
    left: '50%'
  },
  BOTTOM_RIGHT: {
    bottom: '1em',
    right: '1em'
  }
});
