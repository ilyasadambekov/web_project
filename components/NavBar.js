'use client'
import {setModal} from "@/store/modalSlice";
import {setQuery} from "@/store/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {FaCartShopping} from "react-icons/fa6";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import styles from '/styles/NavBar.module.scss'

export default function NavBar() {
    const pathname = usePathname()

    const [bgColor, setBGColor] = useState('transparent')

    const cartData = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const changeBGColor = () => {
        if (window.scrollY >= 64) {
            setBGColor('#000')
        } else {
            setBGColor('transparent')
        }
    }

    window.addEventListener('scroll', changeBGColor)

    return (
        <div className={styles.wrapper} style={ pathname === '/' ? {backgroundColor: bgColor, borderBottom: 'none'} : null }>
            <Link href='/'>
                <div>
                    <h1>.adamb</h1>
                </div>
            </Link>
            <SearchBar/>
            <div>
                <Link href='/shop' onClick={() => dispatch(setQuery(''))}>
                    <h3>Shop</h3>
                </Link>
                <div onClick={() => dispatch(setModal('cart'))}>
                    <FaCartShopping/>
                    <div><h6>{cartData.products.length ? cartData.products.map(item => item.amount).reduce((a, i) => a + i) : '0'}</h6></div>
                </div>
            </div>
        </div>
    )
}