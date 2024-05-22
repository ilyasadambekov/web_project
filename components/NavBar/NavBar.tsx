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

const NavButton = ({icon, onClick}: { icon: React.ReactNode, onClick: () => void }) => {
  return (
    <Button
      height={48}
      width={48}
      variant="outlined"
      onClick={onClick}>
      {icon}
    </Button>
  );
};

export default function NavBar() {
  const [bgColor, setBGColor] = useState<string>('transparent');
  const logoRef = useRef<HTMLDivElement>(null);
  const {user} = useAppSelector(state => state.auth);
  const {cartItems} = useAppSelector(state => state.cart);
  const {openModal, logOutUser} = useActions();
  const pathname = usePathname();
  const router = useRouter();

  const cartItemsAmount = cartItems.length
    ? cartItems.map(item => item.amount).reduce((a, b) => a + b)
    : 0;

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
        <NavButton icon={<FaShop/>} onClick={() => router.push('/shop')}/>
        <div className={styles.cartBtn}>
          <NavButton icon={<FaCartShopping/>} onClick={() => openModal('cart')}/>
          <div>{cartItemsAmount}</div>
        </div>

        {!user && <NavButton icon={<FaUser/>} onClick={() => openModal('auth')}/>}

        {user && (
          <>
            <Button
              height={48}
              autoWidth
              variant="outlined">
              {user.email}
            </Button>
            <NavButton icon={<FaArrowRightToBracket/>} onClick={logOutUser}/>
          </>
        )}
      </div>
    </div>
  );
}