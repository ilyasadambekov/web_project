'use client'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetProductsQuery} from "@/store/api";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import FiltersBlock from "@/components/FiltersBlock";
import PaginationBlock from "@/components/PaginationBlock";
import Modal from "@/components/Modal";
import styles from './page.module.scss'

export default function Shop() {
    const [page, setPage] = useState(0)

    const {data: productsData = [], isLoading} = useGetProductsQuery()
    const filters = useSelector(state => state.filters)

    const filteredItems = () => {
        let newData = productsData
        if(filters.query) {
            newData = newData.filter(item => item.title.toLowerCase().includes(filters.query.toLowerCase()))
        }
        if(filters.sortBy) {
            switch(filters.sortBy) {
                case 'Rating':
                    newData = newData.toSorted((a, b) => b.rating.rate - a.rating.rate)
                    break
                case 'Price (high to low)':
                    newData = newData.toSorted((a, b) => b.price - a.price)
                    break
                case 'Price (low to high)':
                    newData = newData.toSorted((a, b) => a.price - b.price)
                    break
            }
        }
        if(filters.category) {
            newData = newData.filter(item => item.category === filters.category)
        }
        if(filters.price.min && filters.price.max) {
            newData = newData.filter(item => item.price >= parseInt(filters.price.min) && item.price <= parseInt(filters.price.max))
        }
        return newData
    }

    const amountOfItemsOnPage = 9

    useEffect(() => {
        setPage(0)
    }, [filteredItems().length])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    return (
        <div className={styles.wrapper}>
            <FiltersBlock/>
            <div>
                {filters.query.length ?
                    (filteredItems().length ? <h2>Showing {filteredItems().length} results for "{filters.query}"</h2> : <h2>There are no products that match "{filters.query}"</h2>) : null}
                <div>
                    {isLoading && <ProductCardSkeleton amount={amountOfItemsOnPage}/>}
                    {
                        filteredItems().slice(page * amountOfItemsOnPage, page * amountOfItemsOnPage + amountOfItemsOnPage).map((item, i) =>
                            <ProductCard key={item.id} i={i} {...item}/>
                        )
                    }
                </div>
                <PaginationBlock items={filteredItems()} amountOfItemsOnPage={amountOfItemsOnPage} page={page} setPage={setPage}/>
            </div>
            <Modal/>
        </div>
    )
}