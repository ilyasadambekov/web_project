'use client';
import FiltersBlock from "../../components/FiltersBlock/FiltersBlock";
import ProductsList from "../../components/ProductsList/ProductsList";
import {useEffect} from "react";
import {useActions} from '../../hooks/useActions';
import styles from './page.module.scss';

export default function Shop() {
  const {setQuery} = useActions();

  useEffect(() => {
   setQuery('');
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