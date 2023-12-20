import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {setQuery} from "@/store/filtersSlice";
import {FaSearch} from "react-icons/fa";
import styles from 'styles/SearchBar.module.scss'

export default function SearchBar() {
    const [request, setRequest] = useState('')

    const router = useRouter()

    const dispatch = useDispatch()

    const handleSubmit = () => {
        if(request) {
            dispatch(setQuery(request))
        }
        router.push('/shop')
        setRequest('')
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Search..."
                value={request}
                onChange={e => setRequest(e.target.value)}
            />
            <button onClick={() => handleSubmit()}><FaSearch/></button>
        </div>
    )
}