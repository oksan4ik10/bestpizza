import { useRef, useState } from "react";

import { useForm } from "react-hook-form"

import {
    createUserWithEmailAndPassword,
    getAuth,
} from 'firebase/auth';

import InputEmail from "../InputEmail/InputEmail";
import InputPassword from "../InputPassword/InputPassword";

import ReactInputMask from "react-input-mask";


interface IForm {
    email: string;
    password: string;
    password_repeat: string;
    phone: string;
    checkbox: boolean;
}

interface IProps {
    closeLogin: () => void

}
function FormSignUp(props: IProps) {
    const { closeLogin } = props;
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IForm>({ shouldUseNativeValidation: false, });
    const password = useRef({});
    password.current = watch("password", "");


    const auth = getAuth();

    const [errorAuth, setErrorAuth] = useState(false);

    // !Qw1234567 kj@mail.ru

    const onSubmit = async (data: IForm) => {

        try {
            const s = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const token = (s as any).user.accessToken;
            console.log(token);


            // dispatch(setToken(token))
            // navigate(`/`)


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
        required: "Заполните пароль",
        pattern: { value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g, message: "Некорректный пароль" }
    });
    const regPasswordRepeat = register('password_repeat', {
        required: "Повторите пароль",
        validate: value =>
            value === password.current || "Пароли не совпадают"
    });
    return (
        <div className="form">
            <h1 className="form__head">Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputEmail register={regEmail} error={errors.email} errorAuth={errorAuth}></InputEmail>
                <label className={"form__label email " + ((errors.phone) ? "error" : "")}>
                    <span>Телефон</span>
                    <ReactInputMask
                        mask={"+7(999)999-99-99"}
                        alwaysShowMask={false}

                        type={'text'}
                        placeholder="+7(999)999-99-99"
                        {...register("phone", { validate: (value) => value.length > 15 })}
                    />
                    {errors.phone && <p className='error-message'>{errors.phone.message}</p>}
                </label>
                <InputPassword register={regPassword} error={errors.password} errorAuth={errorAuth}></InputPassword>
                <InputPassword register={regPasswordRepeat} error={errors.password_repeat} errorAuth={errorAuth}></InputPassword>

                <button className="btn form__btn button button-primary">Зарегистрироваться</button>
            </form>
            <p className="about__text">Уже есть аккаунт? <a className="link" onClick={() => closeLogin()}>Войти</a></p>
        </div>
    );
}

export default FormSignUp;