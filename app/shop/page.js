'use client';
import FiltersBlock from "@/components/FiltersBlock/FiltersBlock";
import ProductsList from "@/components/ProductsList/ProductsList";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setQuery} from "@/store/filtersSlice";
import styles from './page.module.scss';

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuery(''));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <FiltersBlock/>
      </div>
      <ProductsList amountOfItemsOnPage={9}/>
    </div>
  );
}