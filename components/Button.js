'use client'
import {useDispatch} from "react-redux";
import {setQuery} from "@/store/filtersSlice";
import {FaArrowRightLong} from "react-icons/fa6";
import Link from "next/link";

export default function Button() {
    const dispatch = useDispatch()

    return (
        <Link href='/shop' onClick={() => dispatch(setQuery(''))}>
            <div className='btn1'>
                <h3>Explore products</h3>
                <FaArrowRightLong/>
            </div>
        </Link>
    )
}