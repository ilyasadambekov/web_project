import styles from '/styles/ProductCardSkeleton.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";

export default function ProductCardSkeleton({amount}) {
    return (
        Array(amount).fill(0).map((_, i) =>
            <div key={i} className={styles.wrapper}>
                <Skeleton height={398} width={332}/>
                <h3><Skeleton width={64}/></h3>
                <h5><Skeleton/></h5>
            </div>
        )
    )
}