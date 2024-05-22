import {FaMinus, FaPlus, FaXmark} from "react-icons/fa6";
import {useActions} from '../../hooks/useActions';
import Link from 'next/link';
import Image from "next/image";
import Button from "../Button";
import styles from '../CartItem/CartItem.module.scss'


export default function CartItem({item}: {item: Product}) {
  const {
    closeModal,
    terminateFromCart,
    removeFromCart,
    addToCart
  } = useActions();

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          <Link href={`/shop/${item.id}`} className={styles.image} onClick={closeModal}>
            <Image src={item.image} alt='image' fill={true}/>
          </Link>
          <Button
            className={styles.deleteBtn}
            height={18}
            width={18}
            variant='secondary'
            onClick={() => terminateFromCart(item)}
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
        <h3>{`$${parseInt(item.price) * item.amount}`}</h3>
        <div>
          <Button
            variant='text'
            autoWidth
            onClick={() => removeFromCart(item)}
          >
            <FaMinus/>
          </Button>
          <h4>{item.amount}</h4>
          <Button
            variant='text'
            autoWidth
            onClick={() => addToCart(item)}
          >
            <FaPlus/>
          </Button>
        </div>
      </div>
    </div>
  )
}