import { useState } from "react";
import { useForm } from "react-hook-form"

import {
    getAuth,
    signInWithEmailAndPassword,
    Auth,
} from 'firebase/auth';

import InputEmail from "../../components/InputEmail/InputEmail";
import InputPassword from "../../components/InputPassword/InputPassword";

import { useAppDispatch } from "../../store/store";
import { setDataUser } from "../../store/reducers/userReducer";



interface IForm {
    email: string;
    password: string;
    checkbox: boolean;

}

interface IProps {
    login: boolean;
    closeLogin: () => void
    closeAuth: () => void;

}

function FormLogin(props: IProps) {
    const { login, closeLogin, closeAuth } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({ shouldUseNativeValidation: false, });
    const auth = getAuth();

    const [errorAuth, setErrorAuth] = useState(false);
    const dispatch = useAppDispatch();

    // !Qw1234567 kj@mail.ru

    const funcSubmit = async (auth: Auth, email: string, password?: string, check?: boolean) => {

        if (!password) return
        const s = await signInWithEmailAndPassword(auth, email, password);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = (s as any).user.accessToken;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const phone = (s as any).user.phoneNumber;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailUser = (s as any).user.email;
        console.log(s);

        if (check) localStorage.setItem("tokenAuth", token)

        if (token) {

            dispatch(setDataUser({
                name: emailUser,
                phone: phone,
                token: token
            }))
            closeAuth()
        }

        // dispatch(setToken(token))
        // navigate(`/`)

    }

    const onSubmit = async (data: IForm) => {
        const password = data.password ? data.password.trim() : "";
        try {
            funcSubmit(auth, data.email.trim(), password, data.checkbox)
        } catch (e) {
            setErrorAuth(true);
            return

        }


    }
    const regEmail = register('email', {
        required: 'Заполните email',
        validate: (value) => ((value.length > 5)), pattern: /^\S+@\S+\.\S+$/
    });
    const regPassword = register('password', {
        required: login ? "Заполните пароль" : false,
    });
    return (

        <div className="form">
            <h1 className="form__head">Авторизация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="formAuth">
                <InputEmail register={regEmail} error={errors.email} errorAuth={errorAuth}></InputEmail>
                <InputPassword register={regPassword} error={errors.password} errorAuth={errorAuth}></InputPassword>

                <button className="btn form__btn button button-primary">Войти</button>
            </form>
            {login && <p className="about__text">Нет аккаунта ? <a className="link" onClick={() => closeLogin()}>Зарегистрироваться</a></p>}
        </div>

    );
}

export default FormLogin;