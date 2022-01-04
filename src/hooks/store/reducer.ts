import StoreAction from './action';
import StoreState from './state';

type StoreReducer = (state: StoreState, action: StoreAction) => StoreState;

const storeReducer: StoreReducer = (state, { type }) => {
  switch (type) {
    case 'navbar.toggle':
      return toggleNavbar(state);
    default:
      return state;
  }
};

const toggleNavbar = <T extends StoreState>(state: T): T => {
  return {
    ...state,
    navbarOpen: !state.navbarOpen,
  };
};

export default storeReducer;
