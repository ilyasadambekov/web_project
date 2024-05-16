import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetProductsQuery} from "@/store/api";
import {clearFilters, setMaterial, setPrice, setSortBy} from "@/store/filtersSlice";
import {FaCheck} from "react-icons/fa6";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import styles from '@/components/FiltersBlock/FiltersBlock.module.scss';

export default function FiltersBlock() {
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  });
  const filters = useSelector(state => state.filters);
  const {data: productsData = [], isLoading} = useGetProductsQuery();
  const dispatch = useDispatch();

  const handlePriceRange = () => {
    if (priceRange.min && priceRange.max) {
      dispatch(setPrice(priceRange));
    }
  };

  const clear = () => {
    dispatch(clearFilters());
    setPriceRange({
      min: '',
      max: ''
    });
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h4>Sort by</h4>
        {['Rating', 'Price (high to low)', 'Price (low to high)'].map((item, i) =>
          <Button
            key={i}
            variant="text"
            autoWidth
            style={{textDecoration: filters.sortBy === item && 'underline'}}
            onClick={() => dispatch(setSortBy(item))}
          >
            {item}
          </Button>
        )}
      </div>
      <div>
        <h4>Material</h4>
        {isLoading ? <h3>...</h3> : (
          [...new Map(productsData.map(item => [item['material'], item])).values()].map(item => item.material).map((item, i) =>
            <Button
              key={i}
              variant="text"
              autoWidth
              style={{textDecoration: filters.material === item && 'underline'}}
              onClick={() => dispatch(setMaterial(item))}
            >
              {item}
            </Button>
          )
        )}
      </div>
      <div>
        <h4>Price ($)</h4>
        <div>
          <Input
            className={styles.input}
            type="number"
            placeholder="min"
            width="100px"
            value={priceRange.min}
            onChange={e => setPriceRange({...priceRange, min: e.target.value})}
          />
          <Input
            className={styles.input}
            type="number"
            placeholder="max"
            value={priceRange.max}
            onChange={e => setPriceRange({...priceRange, max: e.target.value})}
          />
          {priceRange.min && priceRange.max && priceRange.min !== filters.price.min || priceRange.min && priceRange.max && priceRange.max !== filters.price.max ? (
            <Button
              height={48}
              width={48}
              variant="outlined"
              onClick={handlePriceRange}
            >
              <FaCheck/>
            </Button>
          ) : null}
        </div>
      </div>
      {filters.query || filters.sortBy || filters.material || filters.price.min && filters.price.max ? (
        <Button variant="text" autoWidth onClick={clear}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}