'use client';
import {useState} from "react";
import {useActions} from '../../../hooks/useActions';
import {useGetProductQuery} from "../../../store/api";
import Image from "next/image";
import Button from "../../../components/Button";
import styles from './page.module.scss';

export default function Product({params}: {params: {id: string}}) {
  const [form, setForm] = useState({color: '', size: ''});
  const {data: productData = null, isLoading} = useGetProductQuery(params.id);
  const {addToCart, openModal} = useActions();

  const handleAddition = () => {
    if (form.color && form.size) {
      addToCart({...productData, color: form.color, size: form.size});
      openModal('cart');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        {!isLoading && <Image src={productData?.image} alt="image" fill={true}/>}
      </div>
      <div>
        <h5>{productData?.material}</h5>
        <h1>{productData?.title}</h1>
        <h4>{productData?.description}</h4>
        <div>
          <h3>Select color</h3>
          <div>
            {['Black', 'White'].map((item, i) =>
              <Button
                key={i}
                height={48}
                width={48}
                variant='outlined'
                onClick={() => setForm({...form, color: item})}
                style={{borderColor: form.color === item ? '#fff' : '#7a7a7a'}}
              >
                <h5>{item}</h5>
              </Button>
            )}
          </div>
        </div>
        <div>
          <h3>Select size</h3>
          <div>
            {['XS', 'S', 'M', 'L', 'XL'].map((item, i) =>
              <Button
                key={i}
                height={48}
                width={48}
                variant='outlined'
                onClick={() => setForm({...form, size: item})}
                style={{borderColor: form.size === item ? '#fff' : '#7a7a7a'}}
              >
                <h5>{item}</h5>
              </Button>
            )}
          </div>
        </div>
        <h1>${productData?.price}</h1>
        <Button
          variant='outlined'
          disabled={!form.color && !form.size}
          onClick={handleAddition}
        >
          <h3>ADD TO THE CART</h3>
        </Button>
      </div>
    </div>
  );
}