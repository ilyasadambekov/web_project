'use client'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useGetProductQuery} from "@/store/api";
import {addToCart} from "@/store/cartSlice";
import {setModal} from "@/store/modalSlice";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Modal from "@/components/Modal";
import styles from './page.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'



export default function Product({ params }) {
    const [form, setForm] = useState({color: '', size: ''})

    const {data: productData = [], isLoading} = useGetProductQuery(parseInt(params.id))

    const dispatch = useDispatch()

    const handleAddition = () => {
        if(form.color && form.size) {
            dispatch(addToCart({...productData, color: form.color, size: form.size}))
            dispatch(setModal('cart'))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <div>
                    {!isLoading && <Image src={productData.image} alt='image' fill={true}/>}
                </div>
                <div>
                    <h5>{productData.category}</h5>
                    <h1>{productData.title}</h1>
                    <h4>{productData.description}</h4>
                    <h3>Select color</h3>
                    <div>
                        {['Black', 'White'].map(item =>
                            <div onClick={() => setForm({...form, color: item})} style={ {borderColor: form.color === item ? '#fff' : '#7a7a7a'} }>
                                <h5>{item}</h5>
                            </div>
                        )}
                    </div>
                    <h3>Select size</h3>
                    <div>
                        {['XS', 'S', 'M', 'L', 'XL'].map(item =>
                            <div onClick={() => setForm({...form, size: item})} style={ {borderColor: form.size === item ? '#fff' : '#7a7a7a'} }>
                                <h5>{item}</h5>
                            </div>
                        )}
                    </div>
                    {!isLoading && <h1>{`$${productData.price}`}</h1>}
                    <div onClick={() => handleAddition()}>
                        <h3>ADD TO THE CART</h3>
                    </div>
                </div>
            </div>
            <Modal/>
        </div>
    )
}