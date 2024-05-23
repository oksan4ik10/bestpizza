import { useState } from "react";
import { useForm } from "react-hook-form"

import {
    getAuth,
    signInWithEmailAndPassword,
    Auth,
} from 'firebase/auth';

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

import InputEmail from "../../components/InputEmail/InputEmail";
import InputPassword from "../../components/InputPassword/InputPassword";

import { useAppDispatch } from "../../store/store";
import { setDataUser } from "../../store/reducers/userReducer";



interface IForm {
    email: string;
    password: string;

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

    // !Qq345678 efimov2024@gmail.ru

    const funcSubmit = async (auth: Auth, email: string, password?: string, check?: boolean) => {

        if (!password) return
        try {
            const authUser = await signInWithEmailAndPassword(auth, email, password);

            const token = authUser.user.uid;
            const docRef = doc(db, "userInfo", token);
            const infoUser = await getDoc(docRef);
            if (!infoUser.exists()) {
                throw new Error("Not data")
            }
            const name = infoUser.data().name;
            const phone = infoUser.data().phone;

            if (check) localStorage.setItem("tokenAuth", token)

            if (token) {
                dispatch(setDataUser({
                    name: name ? name : "",
                    phone: phone ? phone : "",
                    email: email,
                    token: token
                }))
                closeAuth()
            }
        } catch (e) {
            setErrorAuth(true);

        }
    }

    const onSubmit = async (data: IForm) => {
        const password = data.password ? data.password.trim() : "";

        funcSubmit(auth, data.email.trim(), password)



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