import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import Button from "../Button";
import styles from '../PaginationBlock/PaginationBlock.module.scss'

interface IProps {
  items: Product[],
  amountOfItemsOnPage?: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationBlock({items, amountOfItemsOnPage = 12, page, setPage}: IProps) {
  const amountOfPages = Math.ceil(items.length / amountOfItemsOnPage)

  return (
    <div className={styles.wrapper}>
      {items.length > amountOfItemsOnPage && page !== 0 ?
        <Button
          height={36}
          width={36}
          variant='outlined'
          className={styles.btnLeft}
          onClick={() => setPage(prev => prev - 1)}
        >
          <FaAngleLeft/>
        </Button> : null}

      {new Array(amountOfPages).fill(0).map((_, i) =>
        <Button
          key={i}
          height={36}
          width={36}
          variant='outlined'
          style={page === i ? {borderColor: '#fff', color: '#fff'} : null}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </Button>
      )}

      {items.length > amountOfItemsOnPage && page !== amountOfPages - 1 ? (
        <Button
          height={36}
          width={36}
          variant='outlined'
          onClick={() => setPage(prev => prev + 1)}
        >
          <FaAngleRight/>
        </Button>
      ) : null}
    </div>
  )
}