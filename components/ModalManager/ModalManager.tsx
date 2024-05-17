import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {$class} from "../../utils";
import CartModal from "../CartModal/CartModal";
import AuthModal from "../AuthModal/AuthModal";
import './index.scss';

const modals = {
  cart: CartModal,
  auth: AuthModal
};

export default function ModalManager() {
  const {activeModal, isOpen} = useAppSelector(state => state.modal);
  const {closeModal, clearActiveModal} = useActions();

  const close = () => {
    closeModal();
    setTimeout(() => {
      clearActiveModal();
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