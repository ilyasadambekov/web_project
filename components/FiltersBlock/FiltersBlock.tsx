import {useState} from "react";
import {useGetProductsQuery} from "../../store/api";
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {FaCheck} from "react-icons/fa6";
import Button from "../Button";
import Input from "../Input/Input";
import styles from './FiltersBlock.module.scss';

export default function FiltersBlock() {
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  });
  const filters = useAppSelector(state => state.filters);
  const {data: productsData, isLoading} = useGetProductsQuery();
  const {setPrice, clearFilters, setSortBy, setMaterial} = useActions();

  const handlePriceRange = () => {
    if (priceRange.min && priceRange.max) {
      setPrice(priceRange);
    }
  };

  const clear = () => {
    clearFilters();
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
            onClick={() => setSortBy(item)}
          >
            {item}
          </Button>
        )}
      </div>
      <div>
        <h4>Material</h4>
        {isLoading ? <h3>...</h3> : (
          [...new Map(productsData.map(item => [item.material, item])).values()].map((item: Product) => item.material).map((item, i) =>
            <Button
              key={i}
              variant="text"
              autoWidth
              style={{textDecoration: filters.material === item && 'underline'}}
              onClick={() => setMaterial(item)}
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