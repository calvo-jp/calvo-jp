import GlobalAction from './GlobalAction';
import GlobalState from './GlobalState';

type GlobalReducer = (state: GlobalState, action: GlobalAction) => GlobalState;

const globalReducer: GlobalReducer = (state, { type }) => {
  switch (type) {
    case 'navbar.toggle':
      return toggleNavbar(state);
    default:
      return state;
  }
};

const toggleNavbar = <T extends GlobalState>(state: T): T => {
  return {
    ...state,
    navbarOpen: !state.navbarOpen,
  };
};

export default globalReducer;
