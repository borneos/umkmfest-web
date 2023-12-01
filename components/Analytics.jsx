import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-5RTMVZ3D2');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};