import {useDispatch} from 'react-redux';
import {filtersActions} from '../store/filtersSlice';
import {cartActions} from '../store/cartSlice';
import {modalActions} from '../store/modalSlice';
import {authActions, checkAuthStatus, logInUser, logOutUser, registerUser} from '../store/authSlice';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';

const actions = {
  ...filtersActions,
  ...cartActions,
  ...modalActions,
  ...authActions,
  registerUser,
  logInUser,
  logOutUser,
  checkAuthStatus
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};