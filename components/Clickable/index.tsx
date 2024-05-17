import React, { useRef } from 'react';
import {$class} from "../../utils";
import anime from 'animejs';
import './index.scss';

interface IProps {
  onClick?: () => void,
  rippleColor?: string,
  className?: string,
  style?: React.CSSProperties,
  children: React.ReactNode,
  disabled?: boolean
}

const Clickable = ({
  onClick,
  rippleColor = 'black',
  className,
  style,
  children,
  disabled,
}: IProps) => {
  const elRef = useRef<HTMLButtonElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);

  const onUp = () => {
    anime({
      targets: pointerRef.current,
      opacity: 0,
    });
  };

  const onDown = () => {
    anime({
      targets: pointerRef.current,
      opacity: 1,
      scale: 3,
    });
  };

  const onEnter = () => {
    anime({
      targets: pointerRef.current,
      opacity: 1,
      scale: 1,
    });
  };

  const onMove = e => {
    const x = e?.clientX;
    const y = e?.clientY;

    const rect = elRef.current?.getBoundingClientRect();

    if (!rect) return;

    anime({
      targets: pointerRef.current,
      left: x - rect.x - 15,
      top: y - rect.y - 15,
      duration: 20,
    });
  };

  return (
    <button
      ref={elRef}
      onTouchStart={onDown}
      onMouseDown={onDown}
      onTouchEnd={onUp}
      onTouchCancel={onUp}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStartCapture={onEnter}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onClick={onClick && !disabled ? onClick : undefined}
      className={$class('ui-clickable', className)}
      disabled={disabled}
      style={style}>
      <div
        ref={pointerRef}
        style={{ backgroundColor: rippleColor }}
        className="ui-clickable-pointer"></div>
      {children}
    </button>
  );
};

export default Clickable;
