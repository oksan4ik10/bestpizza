
import { useForm } from "react-hook-form"
import ReactInputMask from "react-input-mask";

import { useAppSelector } from "../../store/store"
interface IProps {
    closeOrder: () => void
    closeCart: () => void;
    closeFinishOrder: () => void;
    openFinishOrder: () => void;
}

interface IForm {
    phone: string;
    address: string;
    name: string;
    comment: string;
    payCheckbox: string;

}

function ModalOrder(props: IProps) {
    const { closeOrder, closeCart, closeFinishOrder, openFinishOrder } = props;
    const user = useAppSelector((store) => store.userReducer);
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
        shouldUseNativeValidation: false, defaultValues: {
            name: user.name ? user.name : "",
            phone: user.phone ? user.phone : ""
        }
    });
    const onSubmit = async (data: IForm) => {
        console.log(data);
        localStorage.removeItem("card")
        closeModal();
        openFinishOrder();

        setTimeout(() => closeFinishOrder(), 3000)

    }
    const closeModal = () => {
        closeCart()
        closeOrder()

    }
    return (
        <div className="modal-auth">
            <div className="modal-dialog modal-dialog-auth">
                <button className="close-auth" onClick={closeModal}>&times;</button>
                <div className="form form__order">
                    <h1 className="form__head">Заполните данные</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className={"form__label " + ((errors.name) ? "error" : "")}>
                            <span>Имя</span>
                            <input placeholder="Введите имя" type="text" {...register("name", { validate: (value) => value.length > 1 })} />
                            {errors.name && <p className='error-message'>Заполните имя</p>}
                        </label>
                        <label className={"form__label " + ((errors.phone) ? "error" : "")}>
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
                        <label className={"form__label " + ((errors.address) ? "error" : "")}>
                            <span>Адрес</span>
                            <input placeholder="Введите адрес" type="text" {...register("address", { validate: (value) => value.length > 1 })} />
                            {errors.name && <p className='error-message'>Заполните адрес</p>}
                        </label>
                        <div className="form__label form__pay">

                            <div className="form__info">
                                <span>Способ оплаты</span>
                                <label className="label__checkbox">
                                    <input type="radio"  {...register("payCheckbox")} />
                                    <span className="label__check"></span>
                                    <span className="label__text">Наличными</span>
                                </label>
                                <label className="label__checkbox">
                                    <input type="radio"  {...register("payCheckbox")} />
                                    <span className="label__check"></span>
                                    <span className="label__text">Картой курьеру</span>
                                </label>
                            </div>

                        </div>
                        <label className={"form__label "}>
                            <span>Комментарии к заказу</span>
                            <input placeholder="Оставьте комментарии к заказу" type="text" {...register("comment")} />

                        </label>


                        <button className="btn form__btn button button-primary">Подтвердить</button>
                    </form>

                </div>

            </div>

        </div>
    );
}


export default ModalOrder;