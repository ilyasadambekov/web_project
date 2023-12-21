import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import styles from 'styles/PaginationBlock.module.scss'

export default function PaginationBlock({items, amountOfItemsOnPage = 12, page, setPage}) {
    const amountOfPages = Math.ceil(items.length / amountOfItemsOnPage)

    return (
        <div className={styles.wrapper}>
            {items.length > amountOfItemsOnPage && page !== 0 ?
                <div
                    style={ {position: 'absolute', left: '-44px'} }
                    onClick={() => setPage(prev => prev - 1)}
                >
                    <FaAngleLeft/>
                </div> : null}
            {new Array(amountOfPages).fill(0).map((_, i) =>
                <div
                    key={i}
                    style={page === i ? {borderColor: '#fff', color: '#fff'} : null}
                    onClick={() => setPage(i)}
                >
                    {i + 1}
                </div>
            )}
            {items.length > amountOfItemsOnPage && page !== amountOfPages - 1 ?
                <div
                    onClick={() => setPage(prev => prev + 1)}
                >
                    <FaAngleRight/>
                </div> : null}
        </div>
    )
}