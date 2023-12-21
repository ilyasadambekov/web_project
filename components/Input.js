import {useReducer} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import styles from 'styles/Input.module.scss'

export default function Input({type = 'text', placeholder, style}) {
    const [isShown, toggle] = useReducer(value => !value, false)

    return (
        <div className={styles.wrapper} style={style}>
            <input type={isShown ? 'text' : type} required='required'/>
            <span>{placeholder}</span>
            {type === 'password' &&
                <div style={ {color: isShown ? '#fff' : '#7a7a7a'} } onClick={() => toggle()}>{isShown ? <FaRegEye/> : <FaRegEyeSlash/>}</div>}
        </div>
    )
}