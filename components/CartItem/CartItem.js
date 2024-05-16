import {useDispatch} from "react-redux";
import {addToCart, removeFromCart, terminateFromCart} from "@/store/cartSlice";
import {closeModal} from "@/store/modalSlice";
import {FaMinus, FaPlus, FaXmark} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import styles from '@/components/CartItem/CartItem.module.scss'

export default function CartItem({item}) {
  const dispatch = useDispatch()

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          <Link href={`/shop/${item.id}`} onClick={() => dispatch(closeModal())}>
            <Image src={item.image} alt='image' fill={true}/>
          </Link>
          <Button
            className={styles.deleteBtn}
            height={18}
            width={18}
            variant='secondary'
            onClick={() => dispatch(terminateFromCart(item))}
          >
            <FaXmark/>
          </Button>
        </div>
        <div>
          <h3>{item.title}</h3>
          <h4>{`${item.color} / ${item.size}`}</h4>
        </div>
      </div>
      <div>
        <h3>{`$${item.price * item.amount}`}</h3>
        <div>
          <Button
            variant='text'
            autoWidth
            onClick={() => dispatch(removeFromCart(item))}
          >
            <FaMinus/>
          </Button>
          <div><h4>{item.amount}</h4></div>
          <Button
            variant='text'
            autoWidth
            onClick={() => dispatch(addToCart(item))}
          >
            <FaPlus/>
          </Button>
        </div>
      </div>
    </div>
  )
}