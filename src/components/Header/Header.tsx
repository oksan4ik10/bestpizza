import { useAppSelector, useAppDispatch } from "../../store/store";
import { setToken } from "../../store/reducers/userReducer";

import style from "./Header.module.css"

import urlLogo from "../../assets/img/icon/logo.svg"
interface IProps {
    clickLogo: () => void
    openAuth: () => void
    openCart: () => void
}

function Header(props: IProps) {

    const { clickLogo, openAuth, openCart } = props;

    const token = useAppSelector((store) => store.userReducer).token;
    const count = useAppSelector((store) => store.countCardReducer).count;
    const dispatch = useAppDispatch()

    const closeAuth = () => {
        dispatch(setToken(""));
        localStorage.removeItem("token")
    }
    return (
        <div className="container">
            <header className="header">
                <a className="logo" onClick={clickLogo}>
                    <img src={urlLogo} alt="Logo" />
                </a>

                <div className="buttons">
                    <span className="user-name"></span>
                    <button className={"button button-primary button-auth " + (token ? "none" : "")} onClick={openAuth}>
                        <span className="button-auth-svg"></span>
                        <span className="button-text">Войти</span>
                    </button>
                    <button className={"button button-cart " + (!token ? "none" : "") + " " + style.cart} id="cart-button" onClick={openCart}>
                        <span className="button-cart-svg"></span>
                        <span className="button-text">Корзина</span>
                        {count > 0 && <span className={style.count}>{count}</span>}
                    </button>
                    <button onClick={closeAuth} className={"button button-primary button-out " + (!token ? "none" : "")}>
                        <span className="button-text">Выйти</span>
                        <span className="button-out-svg"></span>
                    </button>
                </div>
            </header>
        </div>
    );
}

export default Header;