import {useDispatch} from "react-redux";
import {addToCart, removeFromCart, terminateFromCart} from "@/store/cartSlice";
import {closeModal} from "@/store/modalSlice";
import {FaMinus, FaPlus, FaXmark} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/CartItem.module.scss'

export default function CartItem({item}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <div>
                <div>
                    <Link href={`/shop/${item.id}`} onClick={() => dispatch(closeModal())}>
                        <Image src={item.image} alt='image' fill={true}/>
                    </Link>
                    <div onClick={() => dispatch(terminateFromCart(item))}>
                        <FaXmark/>
                    </div>
                </div>
                <div>
                    <Link href={`/shop/${item.id}`} onClick={() => dispatch(closeModal())}><h3>{item.title}</h3></Link>
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