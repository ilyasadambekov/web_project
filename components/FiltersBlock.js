import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetProductsQuery} from "@/store/api";
import {clearFilters, setCategory, setPrice, setSortBy} from "@/store/filtersSlice";
import {FaCheck} from "react-icons/fa6";
import styles from 'styles/FiltersBlock.module.scss'

export default function FiltersBlock() {
    const [priceRange, setPriceRange] = useState({
        min: '',
        max: ''
    })

    const filters = useSelector(state => state.filters)

    const {data: productsData = []} = useGetProductsQuery()

    const dispatch = useDispatch()

    const handlePriceRange = () => {
        if(priceRange.min && priceRange.max) {
            dispatch(setPrice(priceRange))
        }
    }
    const clear = () => {
        dispatch(clearFilters())
        setPriceRange({
            min: '',
            max: ''
        })
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <h4>Sort by</h4>
                {['Rating', 'Price (high to low)', 'Price (low to high)'].map((item, i) =>
                    <h3
                        key={i}
                        style={ {textDecoration: filters.sortBy === item && 'underline'} }
                        onClick={() => dispatch(setSortBy(item))}
                    >
                        {item}
                    </h3>
                )}
            </div>
            <div>
                <h4>Category</h4>
                {
                    [...new Map(productsData.map(item => [item['category'], item])).values()].map(item => item.category).map((item, i) =>
                        <h3
                            key={i}
                            style={ {textDecoration: filters.category === item && 'underline'} }
                            onClick={() => dispatch(setCategory(item))}
                        >
                            {item}
                        </h3>
                    )
                }
            </div>
            <div>
                <h4>Price ($)</h4>
                <div>
                    <input
                        type="number"
                        placeholder='min'
                        value={priceRange.min}
                        onChange={e => setPriceRange({...priceRange, min: e.target.value})}
                    />
                    <input
                        type="number"
                        placeholder='max'
                        value={priceRange.max}
                        onChange={e => setPriceRange({...priceRange, max: e.target.value})}
                    />
                    {priceRange.min && priceRange.max && priceRange.min !== filters.price.min || priceRange.min && priceRange.max && priceRange.max !== filters.price.max ?
                        <div onClick={() => handlePriceRange()}>
                            <FaCheck/>
                        </div> : null}
                </div>
            </div>
            {filters.query || filters.sortBy || filters.category || filters.price.min && filters.price.max ?
                <h3 onClick={() => clear()}>Clear filters</h3> : null}
        </div>
    )
}