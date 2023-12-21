import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "@/store/modalSlice";
import {FaXmark} from "react-icons/fa6";
import Input from "@/components/Input";
import styles from 'styles/LoginModal.module.scss'

export default function LoginModal() {
    const [page, setPage] = useState('login')

    const modal = useSelector(state => state.modal)

    const dispatch = useDispatch()

    useEffect(() => {

    }, [modal.status])

    const modalBody = () => {
        switch(page) {
            case 'login': return (
                <>
                    <h1>Welcome back</h1>
                    <Input type='email' placeholder='Email'/>
                    <Input type='password' placeholder='Password'/>
                    <div>
                        <div>
                            <h4>Sign in</h4>
                        </div>
                        <div>
                            <h5>Not a member?</h5>
                            <h5 onClick={() => setPage('register')}>Sign up</h5>
                        </div>
                    </div>
                </>
            )
            case 'register': return (
                <>
                    <h1>Become a member</h1>
                    <Input placeholder='First name'/>
                    <Input placeholder='Last name'/>
                    <Input type='email' placeholder='Email'/>
                    <Input type='password' placeholder='Password'/>
                    <div>
                        <div>
                            <h4>Sign up</h4>
                        </div>
                        <div>
                            <h5>Already a member?</h5>
                            <h5 onClick={() => setPage('login')}>Sign in</h5>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className={styles.wrapper} style={ {opacity: modal.status === 'login' && '1'} }>
            <div onClick={() => dispatch(closeModal())}>
                <FaXmark/>
            </div>
            {modalBody()}
        </div>
    )
}