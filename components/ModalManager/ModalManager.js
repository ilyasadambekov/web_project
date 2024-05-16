import {useDispatch, useSelector} from "react-redux";
import {clearActiveModal, closeModal} from "@/store/modalSlice";
import {$class} from "@/utils";
import CartModal from "@/components/CartModal/CartModal";
import AuthModal from "@/components/AuthModal/AuthModal";
import './index.scss';

const modals = {
  cart: CartModal,
  auth: AuthModal
};

export default function ModalManager() {
  const {activeModal, isOpen} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
    setTimeout(() => {
      dispatch(clearActiveModal());
    }, 200);
  };

  const ModalBody = modals[activeModal?.name] ? modals[activeModal.name] : () => null;

  return (
    <>
      <div
        className={$class('modal-wrapper', ['active', isOpen])}
        onClick={close}
      />
      <ModalBody isActive={isOpen} close={close} />
    </>
  );
}