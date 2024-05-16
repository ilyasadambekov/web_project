import {setQuery} from "@/store/filtersSlice";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {FaSearch} from "react-icons/fa";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import styles from '@/components/SearchBar/SearchBar.module.scss';

export default function SearchBar() {
  const [request, setRequest] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (request && request.replace(/\s/g, '').length) {
      dispatch(setQuery(request));
      setRequest('');
      router.push('/shop');
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={e => handleSubmit(e)}>
        <Input
          type="text"
          placeholder="Search..."
          value={request}
          onChange={e => setRequest(e.target.value)}
        />
        <Button
          className={styles.btn}
          variant="text"
          autoWidth
        >
          <FaSearch/>
        </Button>
      </form>
    </div>
  );
}