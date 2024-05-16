'use client';
import {useGetProductsQuery} from "@/store/api";
import {useRouter} from "next/navigation";
import {FaArrowRight} from "react-icons/fa6";
import ProductCard from "@/components/ProductCard/ProductCard";
import Button from "@/components/Button";
import styles from './page.module.scss';

export default function Home() {
  const {data: productsData = [], isLoading} = useGetProductsQuery();
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <section>
        <div>
          <h1>Introducing the Latest Summer Styles</h1>
          <h5>This season, our new summer collection embraces designs to provide comfort and<br/>style - ensuring you're
            well-prepared for whatever comes your way.</h5>
          <Button variant="outlined" onClick={() => router.push('/shop')}>
            Explore our products
            <FaArrowRight/>
          </Button>
        </div>
      </section>

      <section>
        <h1>Our newest styles are here to help you<br/>look your best.</h1>
        <Button
          variant="outlined"
          autoWidth
          onClick={() => router.push('/shop')}
        >
          Explore our products
          <FaArrowRight/>
        </Button>
        <div>
          {productsData.slice(0, 4).map((item, i) => <ProductCard key={item.id} {...item}/>)}
        </div>
      </section>
    </div>
  );
}
