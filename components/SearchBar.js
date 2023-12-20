import {setQuery} from "@/store/filtersSlice";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {FaSearch} from "react-icons/fa";
import styles from 'styles/SearchBar.module.scss'

export default function SearchBar() {
    const [request, setRequest] = useState('')

    const router = useRouter()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(request && request.replace(/\s/g, '').length) {
            dispatch(setQuery(request))
            setRequest('')
            router.push('/shop')
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={request}
                    onChange={e => setRequest(e.target.value)}
                />
                <button type='submit'><FaSearch/></button>
            </form>
        </div>
    )
}