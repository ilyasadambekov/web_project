import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {useEffect, useState} from "react";
import {$class} from "../../utils";
import {FaXmark} from "react-icons/fa6";
import Input from "../Input/Input";
import Button from "../Button";
import styles from '../AuthModal/AuthModal.module.scss';

export default function AuthModal({isActive, close}: ModalProps) {
  const [view, setView] = useState<'login' | 'reg'>('login');
  const [form, setForm] = useState({
    email: '',
    pass: ''
  });
  const {status} = useAppSelector(state => state.auth);
  const {logInUser, registerUser} = useActions();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, [e.target.name]: e.target.value});

  const handleLogin = async () => {
    await logInUser({email: form.email, password: form.pass});
  };

  const handleRegister = async () => {
    await registerUser({email: form.email, password: form.pass});
  };

  useEffect(() => {
    setForm({
      email: '',
      pass: ''
    });
  }, [view]);

  useEffect(() => {
    if (status === 'succeeded') close();
  }, [status]);

  const LoginForm = () => {
    return (
      <div className={styles.form}>
        <h1>Welcome back</h1>
        <Input type="email" placeholder="Email" name="email" value={form.email} onChange={onChange}/>
        <Input type="password" placeholder="Password" name="pass" value={form.pass} onChange={onChange}/>
        <Button
          variant="secondary"
          loading={status === 'loading'}
          onClick={handleLogin}
        >
          Log in
        </Button>
        <div>
          <h5>Not a member?</h5>
          <Button autoWidth variant="text" onClick={() => setView('reg')}>
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
        <Input type="email" placeholder="Email" name="email" value={form.email} onChange={onChange}/>
        <Input type="password" placeholder="Password" name="pass" value={form.pass} onChange={onChange}/>
        <Button
          variant="secondary"
          loading={status === 'loading'}
          onClick={handleRegister}
        >
          Sign in
        </Button>
        <div>
          <h5>Already a member?</h5>
          <Button autoWidth variant="text" onClick={() => setView('login')}>
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
        variant="outlined"
        onClick={close}
      >
        <FaXmark/>
      </Button>
      {view === 'login' && LoginForm()}
      {view === 'reg' && RegForm()}
    </div>
  );
}