'use client';
import {openModal} from "@/store/modalSlice";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {FaCartShopping, FaShop, FaUser} from "react-icons/fa6";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button";
import anime from "animejs";
import Letterize from "letterizejs";
import styles from '/components/NavBar/NavBar.module.scss';


export default function NavBar() {
  const [bgColor, setBGColor] = useState('transparent');
  const logoRef = useRef();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const logoElement = logoRef.current;

    const logo = new Letterize({
      targets: logoElement
    })

    const animation = anime.timeline({
      targets: logo.listAll,
      delay: anime.stagger(50),
    });

    animation
      .add({
        translateY: -5
      })
      .add({
        translateY: 0
      });

    const handleMouseEnter = () => {
      animation.play();
    };

    logoElement.addEventListener('mouseenter', handleMouseEnter);

    const handleBGColor = () => {
      if (window.scrollY >= 1) {
        setBGColor('black');
      } else {
        setBGColor('transparent');
      }
    };

    window.addEventListener('scroll', handleBGColor);

    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleBGColor);
    };
  }, [])

  return (
    <div className={styles.wrapper} style={pathname === '/' ? {backgroundColor: bgColor} : null}>
      <Link href="/">
        <h1 ref={logoRef}>.adamb</h1>
      </Link>

      <SearchBar/>

      <div>
        <Button
          variant="outlined"
          autoWidth
          onClick={() => router.push('/shop')}>
          <FaShop/>
        </Button>

        <Button
          variant="outlined"
          autoWidth
          onClick={() => dispatch(openModal({name: 'auth', position: 'center'}))}>
          <FaUser/>
        </Button>

        <Button
          variant="outlined"
          autoWidth
          onClick={() => dispatch(openModal({name: 'cart', position: 'right'}))}>
          <FaCartShopping/>
        </Button>
      </div>
    </div>
  );
}