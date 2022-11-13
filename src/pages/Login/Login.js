import { useState } from "react";
import Logo from "../../components/Logo/Logo";
import "./Login.css";
import Input from "../../components/Input/Input";

import { useNavigate } from "react-router-dom";
import { auth } from"../../services/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function conectar(e) {
        e.preventDefault();
        
        if (email === '' || senha === '') {
            toast.warning('Preencha os campos corretamente');
            return;
        }

        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            toast.success('Bem vindo de volta!');
            navigate('/admin', { replace: true });
        })
        .catch(() => {
            toast.error("Email ou senha incorretos.");
        })
    }

    return (
        <div className="container-login">
            <Logo />

            <form className="container-login-form" onSubmit={conectar}>
                <Input
                    type='email'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
                
                <Input
                    type='password'
                    placeholder='Digite sua senha...'
                    autoComplete='on'
                    value={senha}
                    onChange={ e => setSenha(e.target.value) }
                />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
