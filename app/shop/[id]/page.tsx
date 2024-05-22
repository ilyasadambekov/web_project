'use client';
import {useState} from "react";
import {useActions} from '../../../hooks/useActions';
import {$class, $shimmer} from '../../../utils';
import {useGetProductQuery} from "../../../store/api";
import Image from "next/image";
import Button from "../../../components/Button";
import styles from './page.module.scss';

interface IForm {
  color: ProductColor | null;
  size: ProductSize | null;
}

export default function Product({params}: {params: {id: string}}) {
  const [form, setForm] = useState<IForm>({color: null, size: null});
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
      <div className={$class(styles.image, $shimmer(isLoading))}>
        {!isLoading && <Image src={productData?.image} alt="image" fill={true}/>}
      </div>
      <div>
        <h5 className={$shimmer(isLoading, 'text')}>{productData?.material}</h5>
        <h1 className={$shimmer(isLoading, 'text')}>{productData?.title}</h1>
        <h4 className={$shimmer(isLoading, 'text')}>{productData?.description}</h4>
        <div className={styles.selectBlock}>
          <h3>Select color</h3>
          <div>
            {['Black', 'White'].map((item: ProductColor, i) =>
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
        <div className={styles.selectBlock}>
          <h3>Select size</h3>
          <div>
            {['XS', 'S', 'M', 'L', 'XL'].map((item: ProductSize, i) =>
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
        <div className={styles.price}>
          $<span className={$shimmer(isLoading, 'text')}>{productData?.price}</span>
        </div>
        <Button
          variant='outlined'
          disabled={!form.color || !form.size || !productData}
          onClick={handleAddition}
        >
          <h3>ADD TO THE CART</h3>
        </Button>
      </div>
    </div>
  );
}