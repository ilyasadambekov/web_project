import {useDispatch, useSelector} from "react-redux";
import {FaXmark} from "react-icons/fa6";
import {closeModal} from "@/store/modalSlice";
import CartItem from "@/components/CartItem";
import styles from 'styles/SideCart.module.scss'

export default function SideCart() {
    const modal = useSelector(state => state.modal)
    const cart = useSelector(state => state.cart)
    console.log(cart);

    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper} style={ {right: modal.status === 'cart' ? '0' : '-400px'} }>
            <div>
                <h2>My Cart</h2>
                <div onClick={() => dispatch(closeModal())}>
                    <FaXmark/>
                </div>
            </div>
            <div>
                <div>
                    {!cart.products.length && <h3>Your cart is empty</h3>}
                    {
                        cart.products.map(item => <CartItem key={item.id} item={item}/>)
                    }
                </div>
                {cart.products.length &&
                    <div>
                        <div>
                            <h4>Total</h4>
                            <h3>${cart.products.map(item => item.price * item.amount).reduce((a, b) => a + b, 0)}</h3>
                        </div>
                        <div><h3>Proceed to checkout</h3></div>
                    </div>
                }
            </div>
        </div>
    )
}