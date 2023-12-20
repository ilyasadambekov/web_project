import Link from "next/link";
import {FaArrowRightLong} from "react-icons/fa6";

export default function Button() {
    return (
        <Link href='/shop'>
            <div className='btn1'>
                <h3>Explore products</h3>
                <FaArrowRightLong/>
            </div>
        </Link>
    )
}