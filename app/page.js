'use client'
import {useGetProductsQuery} from "@/store/api";
import Modal from "@/components/Modal";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Button from "@/components/Button";
import styles from './page.module.scss'

export default function Home() {
    const {data: productsData = [], isLoading} = useGetProductsQuery()

    return (
        <div className={styles.wrapper}>
            <section>
                <div>
                    <h1>Introducing the Latest Summer Styles</h1>
                    <h5>This season, our new summer collection embraces designs to provide comfort and<br/>style - ensuring you're well-prepared for whatever comes your way.</h5>
                    <Button/>
                </div>
            </section>
            <section>
                <h1>Our newest styles are here to help you<br/>look your best.</h1>
                <Button/>
                <div>
                    {isLoading && <ProductCardSkeleton amount={4}/>}
                    {
                        productsData.slice(0, 4).map((item, i) => <ProductCard key={item.id} i={i} {...item}/>)
                    }
                </div>
            </section>
            <Modal/>
        </div>
    )
}
