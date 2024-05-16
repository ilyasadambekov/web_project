import {useState} from "react";
import {useDispatch} from "react-redux";
import {$class} from "@/utils";
import {FaXmark} from "react-icons/fa6";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import styles from '@/components/AuthModal/AuthModal.module.scss';

export default function AuthModal({isActive, close}) {
  const [view, setView] = useState('login');
  const [form, setForm] = useState({
    email: '',
    pass: ''
  });
  const dispatch = useDispatch();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value})

  const LoginForm = () => {
    return (
      <div className={styles.form}>
        <h1>Welcome back</h1>
        <Input type="email" placeholder="Email" name='email' value={form.email} onChange={onChange}/>
        <Input type="password" placeholder="Password" name='pass' value={form.pass} onChange={onChange}/>
        <Button variant='secondary'>
          Log in
        </Button>
        <div>
          <h5>Not a member?</h5>
          <Button autoWidth variant='text' onClick={() => setView('reg')}>
            Sign in
          </Button>
        </div>
      </div>
    );
  };

  const RegForm = () => {
    return (
      <div className={styles.form}>
        <h1>Become a member</h1>
        <Input type="email" placeholder="Email" name='email' value={form.email} onChange={onChange}/>
        <Input type="password" placeholder="Password" name='pass' value={form.pass} onChange={onChange}/>
        <Button variant='secondary'>
          Sign in
        </Button>
        <div>
          <h5>Already a member?</h5>
          <Button autoWidth variant='text' onClick={() => setView('login')}>
            Log in
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={$class(styles.authModal, [styles.authModalActive, isActive])}>
      <Button
        className={styles.closeBtn}
        height={36}
        width={36}
        variant='outlined'
        onClick={close}
      >
        <FaXmark/>
      </Button>
      {view === 'login' && <LoginForm/>}
      {view === 'reg' && <RegForm/>}
    </div>
  );
}