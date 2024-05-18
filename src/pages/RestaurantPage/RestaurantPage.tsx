
import { useAppSelector, useAppDispatch } from "../../store/store"
import { setCount } from "../../store/reducers/countCardReducer"

import { ICardLocal } from "../../models/type"

import dataFood from "../../assets/db/food-band.json"
import dataGusi from "../../assets/db/gusi-lebedi.json"
import dataPalki from "../../assets/db/palki-skalki.json"
import dataPizzaBurger from "../../assets/db/pizza-burger.json"
import dataPizzaPlus from "../../assets/db/pizza-plus.json"
import dataTanuki from "../../assets/db/tanuki.json"

import dataPartenr from "../../assets/db/partners.json"
interface IProps {
    restaurant: string;
    openAuth: () => void;
}
function RestaurantPage(props: IProps) {
    const { restaurant, openAuth } = props;
    const token = useAppSelector((store) => store.userReducer).token;
    const dataArr = [dataPizzaPlus, dataTanuki, dataFood, dataPalki, dataGusi, dataPizzaBurger];
    const data = dataArr[+restaurant]
    const partner = dataPartenr[+restaurant]

    const dispatch = useAppDispatch();

    const addProduct = (id: string) => {
        if (!token) {
            openAuth()
            return;
        }
        const localCard = localStorage.getItem("card")
        const card: ICardLocal[] = localCard ? JSON.parse(localCard) : [];
        const indexCard = card.findIndex((item) => item.id === id)
        if (indexCard !== -1) {
            card[indexCard].count++;
        } else {
            card.push({
                id: id,
                count: 1,
                idRes: +restaurant
            })
        }
        const count = card.reduce((prev, cur) => prev + cur.count, 0)

        dispatch(setCount(count))
        localStorage.setItem("card", JSON.stringify(card))
    }


    return (
        <div>
            <div className="container">
                <section className="menu">
                    <div className="section-heading">
                        <h2 className="section-title restaurant-title">{partner.name}</h2>
                        <div className="card-info">
                            <div className="rating">
                                {partner.stars}
                            </div>
                            <div className="price">{`От ${partner.price} ₽`}</div>
                            <div className="category">{partner.kitchen}</div>
                        </div>

                    </div>
                    <div className="cards cards-menu">
                        {data.map((item) =>
                            <div className="card" key={item.id} onClick={() => addProduct(item.id)}>
                                <img src={item.image} alt="image" className="card-image" />
                                <div className="card-text">
                                    <div className="card-heading">
                                        <h3 className="card-title card-title-reg">{item.name}</h3>
                                    </div>

                                    <div className="card-info">
                                        <div className="ingredients">{item.description}
                                        </div>
                                    </div>

                                    <div className="card-buttons">
                                        <button className="button button-primary button-add-cart">
                                            <span className="button-card-text">В корзину</span>
                                            <span className="button-cart-svg"></span>
                                        </button>
                                        <strong className="card-price-bold">{`${item.price} ₽`}</strong>
                                    </div>
                                </div>

                            </div>)}



                    </div>

                </section>
            </div>

        </div>
    );
}

export default RestaurantPage;