/*
 *
 * Form reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  userData: []
};

export const { Types: formTypes, Creators: formCreators } = createActions({
  addUserData: ['userData'],
  getUserData: null
});

export const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case formTypes.ADD_USER_DATA:
        console.log(action.userData);
        draft.userData.push(action.userData);
      case formTypes.GET_USER_DATA:
      // draft.userData.push(action.userData);
      default:
    }
  });

export default formReducer;
