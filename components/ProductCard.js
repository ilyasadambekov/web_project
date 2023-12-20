import styles from '/styles/ProductCard.module.scss'
import {motion} from 'framer-motion'
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ i, id, image, title, price }) {

    return (
        <Link href={`/shop/${id}`}>
            <motion.div
                className={styles.wrapper}
                transition={{ delay: 0.1 * i}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div>
                    <Image src={image} alt='image' fill={true}/>
                </div>
                <h3>{`$${price}`}</h3>
                <h5>{title}</h5>
            </motion.div>
        </Link>
    )
}