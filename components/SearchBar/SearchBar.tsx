import {useState} from "react";
import {useRouter} from "next/navigation";
import {useActions} from '../../hooks/useActions';
import {FaSearch} from "react-icons/fa";
import Input from "../Input/Input";
import Button from "../Button";
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [request, setRequest] = useState('');
  const {setQuery} = useActions();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    if (request && request.replace(/\s/g, '').length) {
      setQuery(request);
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