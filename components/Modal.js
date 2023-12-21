import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "@/store/modalSlice";
import SideCart from "@/components/SideCart";
import LoginModal from "@/components/LoginModal";

export default function Modal() {
    const modal = useSelector(state => state.modal)

    const dispatch = useDispatch()

    const modalBody = () => {
        switch(modal.status) {
            case 'cart': return <SideCart/>
            case 'login': return <LoginModal/>
            default: return null
        }
    }

    return (
        <>
            <div
                className='modal'
                style={ {opacity: modal.status === 'closed' && '0', pointerEvents: modal.status === 'closed' && 'none'} }
                onClick={() => dispatch(closeModal())}
            />
            {modalBody()}
        </>
    )
}