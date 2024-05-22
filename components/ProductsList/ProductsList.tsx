import {useEffect, useState} from "react";
import {useGetProductsQuery} from "../../store/api";
import {useAppSelector} from '../../hooks/useAppSelector';
import ProductCard from "../ProductCard/ProductCard";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import styles from './ProductsList.module.scss';

export default function ProductsList({amountOfItemsOnPage}: {amountOfItemsOnPage: number}) {
  const [page, setPage] = useState(0);
  const {data: productsData = [], isLoading} = useGetProductsQuery();
  const {query, sortBy, material, price} = useAppSelector(state => state.filters);

  const filteredItems = () => {
    let newData = productsData;
    if (query) {
      newData = newData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (sortBy) {
      switch (sortBy) {
        case 'Rating':
          newData = newData.toSorted((a, b) => b.rating - a.rating);
          break;
        case 'Price (high to low)':
          newData = newData.toSorted((a, b) => parseInt(b.price) - parseInt(a.price));
          break;
        case 'Price (low to high)':
          newData = newData.toSorted((a, b) => parseInt(a.price) - parseInt(b.price));
          break;
      }
    }
    if (material) {
      newData = newData.filter(item => item.material === material);
    }
    if (price.min && price.max) {
      newData = newData.filter(item => parseInt(item.price) >= parseInt(price.min) && parseInt(item.price) <= parseInt(price.max));
    }
    return newData;
  };

  useEffect(() => {
    setPage(0);
  }, [filteredItems().length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className={styles.wrapper}>
      {query.length ? (
        filteredItems().length ? (
          <h2>Showing {filteredItems().length} results for "{query}"</h2>
        ) : (
          <h2>There are no products that match "{query}"</h2>
        )
      ) : null}
      <div className={styles.list}>
        {filteredItems().slice(page * amountOfItemsOnPage, page * amountOfItemsOnPage + amountOfItemsOnPage).map(item =>
          <ProductCard key={item.id} {...item}/>
        )}
      </div>
      <PaginationBlock
        items={filteredItems()}
        amountOfItemsOnPage={amountOfItemsOnPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}