import styles from '/components/ProductCard/ProductCard.module.scss'
import Image from "next/image";
import Link from "next/link";
import Clickable from "@/components/Clickable";

export default function ProductCard({id, image, title, price}) {

  return (
    <Link href={`/shop/${id}`}>
      <Clickable className={styles.productCard} rippleColor='white'>
        <div className={styles.productCardWrapper}>
          <div>
            <Image src={image} alt='image' fill={true}/>
          </div>
          <h3>${price}</h3>
          <h5>{title}</h5>
        </div>
      </Clickable>
    </Link>
  )
}