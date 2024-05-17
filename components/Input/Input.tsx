import {useReducer} from "react";
import {$class} from "../../utils";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import Button from "../Button";
import styles from '../Input/Input.module.scss';

interface IProps {
  value: any,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  type?: React.HTMLInputTypeAttribute,
  name?: string,
  className?: string,
  placeholder?: string,
  style?: React.CSSProperties,
  required?: boolean
}

export default function Input({
  value,
  onChange,
  type = 'text',
  name,
  className,
  placeholder,
  style,
  required = false
}: IProps) {
  const [isShown, toggle] = useReducer(value => !value, false);

  return (
    <div className={$class(styles.wrapper, className)} style={style}>
      <input
        type={isShown ? 'text' : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
      {type === 'password' &&
        <Button
          autoWidth
          variant='text'
          className={$class(styles.eyeBtn, [styles.eyeBtnActive, isShown])}
          onClick={toggle}
        >
          {isShown ? <FaRegEye/> : <FaRegEyeSlash/>}
        </Button>
      }
    </div>
  );
}