import {useAppSelector} from '../../hooks/useAppSelector';
import {useState} from "react";
import {$class} from "../../utils";
import {FaXmark} from "react-icons/fa6";
import CartItem from "../CartItem/CartItem";
import Button from "../Button";
import styles from '../CartModal/CartModal.module.scss';

export default function CartModal({isActive, close}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const {cartItems} = useAppSelector(state => state.cart);

  return (
    <div className={$class(styles.cartModal, [styles.cartModalActive, isActive])}>
      <div className={styles.top}>
        <h2>My Cart</h2>
        <Button
          height={36}
          width={36}
          variant='outlined'
          onClick={close}
        >
          <FaXmark/>
        </Button>
      </div>

      <div className={styles.list}>
        {!cartItems.length ? <h3>Your cart is empty</h3> : (
          cartItems.map(item => <CartItem key={item.id} item={item}/>)
        )}
      </div>

      {cartItems.length && (
        <div className={styles.bottom}>
          <div>
            <h4>Total</h4>
            <h3>${cartItems.map(item => parseInt(item.price) * item.amount).reduce((a, b) => a + b, 0)}</h3>
          </div>
          <Button variant='secondary' loading={loading} onClick={() => setLoading(true)}>
            Proceed to checkout
          </Button>
        </div>
      )}
    </div>
  );
}