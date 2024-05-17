'use client';
import {useActions} from '../../hooks/useActions';
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {FaArrowRightToBracket, FaCartShopping, FaShop, FaUser} from "react-icons/fa6";
import {useAppSelector} from '../../hooks/useAppSelector';
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button";
import anime from "animejs";
import Letterize from "letterizejs";
import styles from './NavBar.module.scss';

export default function NavBar() {
  const [bgColor, setBGColor] = useState<string>('transparent');
  const logoRef = useRef<HTMLDivElement>(null);
  const {user} = useAppSelector(state => state.auth);
  const {openModal, logOutUser} = useActions();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const logoElement = logoRef.current;

    const logo = new Letterize({
      targets: logoElement
    });

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
  }, []);

  return (
    <div className={styles.wrapper} style={pathname === '/' ? {backgroundColor: bgColor} : null}>
      <Link href="/">
        <h1 ref={logoRef}>.adamb</h1>
      </Link>

      <SearchBar/>

      <div>
        <Button
          height={48}
          width={48}
          variant="outlined"
          onClick={() => router.push('/shop')}>
          <FaShop/>
        </Button>

        <Button
          height={48}
          width={48}
          variant="outlined"
          onClick={() => openModal({name: 'cart', position: 'right'})}>
          <FaCartShopping/>
        </Button>

        {!user && (
          <Button
            height={48}
            width={48}
            variant="outlined"
            onClick={() => openModal({name: 'auth', position: 'center'})}>
            <FaUser/>
          </Button>
        )}

        {user && (
          <>
            <Button
              height={48}
              autoWidth
              variant="outlined">
              {user.email}
            </Button>

            <Button
              height={48}
              width={48}
              variant="outlined"
              onClick={logOutUser}>
              <FaArrowRightToBracket/>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}