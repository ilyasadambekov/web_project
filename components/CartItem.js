import {useDispatch} from "react-redux";
import {FaMinus, FaPlus} from "react-icons/fa6";
import {addToCart, decreaseAmount, increaseAmount, removeFromCart} from "@/store/cartSlice";
import Image from "next/image";
import styles from 'styles/CartItem.module.scss'

export default function CartItem({item}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <div>
                <div>
                    <Image src={item.image} alt='image' fill={true}/>
                </div>
                <div>
                    <h3>{item.title}</h3>
                    <h4>{`${item.color} / ${item.size}`}</h4>
                </div>
            </div>
            <div>
                <h3>{`$${item.price * item.amount}`}</h3>
                <div>
                    <div onClick={() => dispatch(removeFromCart(item))}><FaMinus/></div>
                    <div><h4>{item.amount}</h4></div>
                    <div onClick={() => dispatch(addToCart(item))}><FaPlus/></div>
                </div>
            </div>
        </div>
    )
}