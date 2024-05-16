import {useSelector} from "react-redux";
import {useState} from "react";
import {$class} from "@/utils";
import {FaXmark} from "react-icons/fa6";
import CartItem from "@/components/CartItem/CartItem";
import Button from "@/components/Button";
import styles from '@/components/CartModal/CartModal.module.scss';

export default function CartModal({isActive, close}) {
  const [loading, setLoading] = useState(false);
  const cart = useSelector(state => state.cart);

  return (
    <div className={$class(styles.cartModal, [styles.cartModalActive, isActive])}>
      <div className={styles.header}>
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
      <div className={styles.body}>
        <div>
          {!cart.products.length ? <h3>Your cart is empty</h3> : (
            cart.products.map(item => <CartItem key={item.id} item={item}/>)
          )}
        </div>
        {cart.products.length &&
          <div>
            <div>
              <h4>Total</h4>
              <h3>${cart.products.map(item => item.price * item.amount).reduce((a, b) => a + b, 0)}</h3>
            </div>
            <Button variant='secondary' loading={loading} onClick={() => setLoading(true)}>
              Proceed to checkout
            </Button>
          </div>
        }
      </div>
    </div>
  );
}