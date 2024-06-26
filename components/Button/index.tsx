'use client';
import {$class} from "../../utils";
import Clickable from "../Clickable";
import './index.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text'

interface IProps {
  children: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
  variant?: ButtonVariant,
  rippleColor?: string,
  loading?: boolean,
  disabled?: boolean,
  height?: number,
  width?: number,
  autoWidth?: boolean,
  onClick?: () => void
}

const Button = ({
  children,
  className,
  style,
  variant = 'primary',
  rippleColor,
  loading,
  disabled,
  height,
  width,
  autoWidth,
  onClick
}: IProps) => {
  return (
    <Clickable
      rippleColor={rippleColor ? rippleColor : variant === 'secondary' ? 'black' : 'white'}
      disabled={loading || disabled}
      className={$class(
        'ui-button',
        ['ui-button--text', variant === 'text'],
        ['ui-button--primary', variant === 'primary'],
        ['ui-button--secondary', variant === 'secondary'],
        ['ui-button--outlined', variant === 'outlined'],
        ['ui-button--loading', loading],
        ['ui-button--disabled', disabled],
        className
      )}
      onClick={disabled ? undefined : onClick}
      style={{
        height: height ? height : 'auto',
        width: width ? width : autoWidth ? 'fit-content' : '100%',
        padding: height && width && '0',
        ...style,
      }}
    >
      <div className="ui-button-wrap">
        {children}
      </div>
      <div className="ui-button-loading">
        <span></span>
      </div>
    </Clickable>
  );
};

export default Button;