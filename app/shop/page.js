'use client'
import {useSelector} from "react-redux";
import {useGetProductsQuery} from "@/store/api";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Checkbox from "@/components/Checkbox";
import Modal from "@/components/Modal";
import styles from './page.module.scss'


export default function Shop() {
    const {data: productsData = [], isLoading} = useGetProductsQuery()
    const filters = useSelector(state => state.filters)

    const filteredItems = () => {
        let newData = productsData
        if(filters.query.length) {
            newData = newData.filter(item => item.title.toLowerCase().includes(filters.query.toLowerCase()))
        }
        if(filters.categories.length) {
            newData = newData.filter(item => filters.categories.includes(item.category))
        }
        return newData
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <h2>Categories</h2>
                {
                    [...new Map(productsData.map(item => [item['category'], item])).values()].map(item => item.category).map((item, i) =>
                        <Checkbox key={i} item={item}/>
                    )
                }
            </div>
            <div>
                {filters.query.length &&
                    (filteredItems().length ? <h2>Showing {filteredItems().length} results for "{filters.query}"</h2> : <h2>There are no products that match "{filters.query}"</h2>)}
                <div>
                    {isLoading && <ProductCardSkeleton amount={10}/>}
                    {
                        filteredItems().map((item, i) =>
                            <ProductCard key={item.id} i={i} {...item}/>
                        )
                    }
                </div>
            </div>
            <Modal/>
        </div>
    )
}