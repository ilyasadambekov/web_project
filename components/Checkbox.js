import {useEffect, useReducer} from "react";
import {useDispatch} from "react-redux";
import {addCategory, removeCategory} from "@/store/filtersSlice";

export default function Checkbox({item}) {
    const [isChecked, toggle] = useReducer(value => !value, false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isChecked) {
            dispatch(addCategory(item))
        } else {
            dispatch(removeCategory(item))
        }
    }, [isChecked])

    return(
        <div>
            <input id={item} type='checkbox' style={ {marginRight: '8px'} } checked={isChecked} onChange={() => toggle()}/>
            <label htmlFor={item}><h5 style={ {textTransform: 'capitalize'} }>{item}</h5></label>
        </div>
    )
}