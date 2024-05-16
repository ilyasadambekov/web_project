'use client'
import styles from '@/components/Footer/Footer.module.scss';
import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import {FaArrowRight} from "react-icons/fa6";

export default function Footer() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <section>
        <div>
          <h1>Shop the latest styles</h1>
          <Button variant='outlined' onClick={() => router.push('/shop')}>
            Explore our products
            <FaArrowRight/>
          </Button>
        </div>
        <div/>
      </section>
    </div>
  );
}