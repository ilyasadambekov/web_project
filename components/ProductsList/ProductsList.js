import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetProductsQuery} from "@/store/api";
import ProductCard from "@/components/ProductCard/ProductCard";
import PaginationBlock from "@/components/PaginationBlock/PaginationBlock";
import styles from '@/components/ProductsList/ProductsList.module.scss';

export default function ProductsList({amountOfItemsOnPage}) {
  const [page, setPage] = useState(0);
  const {data: productsData = [], isLoading} = useGetProductsQuery();
  const filters = useSelector(state => state.filters);

  const filteredItems = () => {
    let newData = productsData;
    if (filters.query) {
      newData = newData.filter(item => item.title.toLowerCase().includes(filters.query.toLowerCase()));
    }
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'Rating':
          newData = newData.toSorted((a, b) => b.rating - a.rating);
          break;
        case 'Price (high to low)':
          newData = newData.toSorted((a, b) => b.price - a.price);
          break;
        case 'Price (low to high)':
          newData = newData.toSorted((a, b) => a.price - b.price);
          break;
      }
    }
    if (filters.material) {
      newData = newData.filter(item => item.material === filters.material);
    }
    if (filters.price.min && filters.price.max) {
      newData = newData.filter(item => item.price >= parseInt(filters.price.min) && item.price <= parseInt(filters.price.max));
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
      {filters.query.length ? (
        filteredItems().length ? (
          <h2>Showing {filteredItems().length} results for "{filters.query}"</h2>
        ) : (
          <h2>There are no products that match "{filters.query}"</h2>
        )
      ) : null}
      <div className={styles.list}>
        {filteredItems().slice(page * amountOfItemsOnPage, page * amountOfItemsOnPage + amountOfItemsOnPage).map(item =>
          <ProductCard key={item.id}{...item}/>
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