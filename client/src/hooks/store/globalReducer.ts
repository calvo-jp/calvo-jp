import GlobalAction from './GlobalAction';
import GlobalState from './GlobalState';

const globalReducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
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
