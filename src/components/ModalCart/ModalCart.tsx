import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../store/store"
import { setCount } from "../../store/reducers/countCardReducer"
import { ICardLocal, ICart } from "../../models/type"

interface IProps {
    closeCart: () => void
    openOrder: () => void
}


import dataFood from "../../assets/db/food-band.json"
import dataGusi from "../../assets/db/gusi-lebedi.json"
import dataPalki from "../../assets/db/palki-skalki.json"
import dataPizzaBurger from "../../assets/db/pizza-burger.json"
import dataPizzaPlus from "../../assets/db/pizza-plus.json"
import dataTanuki from "../../assets/db/tanuki.json"




function ModalCart(props: IProps) {
    const { closeCart, openOrder } = props;
    const dataArr = [dataPizzaPlus, dataTanuki, dataFood, dataPalki, dataGusi, dataPizzaBurger];
    const dispatch = useAppDispatch()
    const countStore = useAppSelector((store) => store.countCardReducer).count;

    const [arrCart, setArrCart] = useState<ICart[]>([]);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const localCard = localStorage.getItem("card")
        const card: ICardLocal[] = localCard ? JSON.parse(localCard) : [];
        let priceProduct = 0
        const items = card.map((item) => {
            const product = dataArr[item.idRes].find((i) => i.id)
            if (product) priceProduct = priceProduct + product.price * item.count;
            return {
                id: item.id,
                idRes: item.idRes,
                price: product ? product.price : 0,
                img: product ? product.image : "",
                count: item.count,
                name: product ? product.name : ""
            }

        })
        setArrCart(items);
        setPrice(priceProduct)

    }, [])

    const setLocalStorage = (id: string, count: number) => {
        const localCard = localStorage.getItem("card")
        const card: ICardLocal[] = localCard ? JSON.parse(localCard) : [];
        const indexLocal = card.findIndex((item) => item.id === id)
        if (count === 0) {
            card.splice(indexLocal, 1)
        } else {
            card[indexLocal].count = count;
        }


        localStorage.setItem("card", JSON.stringify(card))
    }
    const addCount = (id: string, priceProduct: number, countProduct: number) => {
        const prodIndex = arrCart.findIndex((item) => item.id === id)
        if (prodIndex === -1) return
        const count = countProduct + 1;
        if (count > 10) return
        dispatch(setCount(countStore + 1))
        setPrice(price + priceProduct)
        arrCart[prodIndex].count = count;
        setArrCart(arrCart)
        setLocalStorage(id, count)

    }
    const removeCount = (id: string, priceProduct: number, countProduct: number) => {
        const prodIndex = arrCart.findIndex((item) => item.id === id)
        if (prodIndex === -1) return
        const count = countProduct - 1;
        if (count < 0) return
        dispatch(setCount(countStore - 1))
        setPrice(price - priceProduct)
        if (count === 0) {
            arrCart.splice(prodIndex, 1)
        } else {
            arrCart[prodIndex].count = count;
        }

        setArrCart(arrCart)
        setLocalStorage(id, count)

    }

    return (
        <div className="modal modal-cart">
            {arrCart.length === 0 && <div className="modal-dialog">   <div className="modal-header">
                <h2>Корзина пуста...</h2>
                <button onClick={closeCart} className="close">&times;</button>
            </div></div>}
            {arrCart.length > 0 && <div className="modal-dialog">
                <div className="modal-header">
                    <h3 className="modal-title">Корзина</h3>
                    <button onClick={closeCart} className="close">&times;</button>
                </div>

                <div className="modal-body">
                    {arrCart.map((item) => <div className="food-row" key={item.id}>
                        <div className="food-img"><img src={item.img} alt="" /></div>
                        <span className="food-name">{item.name}</span>
                        <strong className="food-price">{item.price} ₽</strong>
                        <div className="food-counter">
                            <button className="counter-button" onClick={() => removeCount(item.id, item.price, item.count)}>-</button>
                            <span className="counter">{item.count}</span>
                            <button className="counter-button" onClick={() => addCount(item.id, item.price, item.count)}>+</button>
                        </div>
                    </div>)}

                </div>

                <div className="modal-footer">
                    <span className="modal-pricetag">{price} ₽</span>
                    <div className="footer-buttons">
                        <button className="button button-primary" onClick={openOrder}>Оформить заказ</button>
                        <button className="button clear-cart">Отмена</button>
                    </div>
                </div>

            </div>}
        </div>
    );
}

export default ModalCart;