import {useDispatch} from 'react-redux';
import {filtersActions} from '../store/filtersSlice';
import {cartActions} from '../store/cartSlice';
import {modalActions} from '../store/modalSlice';
import {authActions} from '../store/authSlice';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';

const actions = {
  ...filtersActions,
  ...cartActions,
  ...modalActions,
  ...authActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};