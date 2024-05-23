import { app } from "../../firebase";

import { collection, getFirestore, getDocs } from "firebase/firestore";


import pizzaPlus from "../../assets/img/pizza-plus/preview.jpg"
import tanuki from "../../assets/img/tanuki/preview.jpg"
import food from "../../assets/img/food-band/preview.jpg"
import palki from "../../assets/img/palki-skalki/preview.jpg"
import gusi from "../../assets/img/gusi-lebedi/preview.jpg"
import pizza from "../../assets/img/pizza-burger/preview.jpg"

import dataPartner from "../../assets/db/partners.json"

interface IProps {
    changeRestaurant: (str: string) => void
}
function MainPage(props: IProps) {
    const { changeRestaurant } = props;


    const db = getFirestore(app);
    const addtodb = async () => {
        console.log(222);

        const querySnapshot = await getDocs(collection(db, "myCollection"));
        console.log(querySnapshot);

        querySnapshot.forEach((doc) => {
            if (doc.exists())            // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
            else console.log(222289);



        });
    }

    const clickRestaurant = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const elem = target.closest(".card-restaurant") as HTMLElement;
        if (!elem) return

        const data = elem.dataset.name;
        if (data) changeRestaurant(data);
    }

    const imgArr = [pizzaPlus, tanuki, food, palki, gusi, pizza]
    return <>
        <button onClick={addtodb}>Click</button>

        <main className="main">
            <div className="container">
                <section className="container-promo">
                    <section className="promo pizza">
                        <h1 className="promo-title">Онлайн-сервис<br />доставки еды</h1>
                        <p className="promo-text">
                            Доставка еды по городу Сергиев Посад, Хотьково, Краснозаводск на дом или в офис
                        </p>
                    </section>

                </section>
                <section className="restaurants">
                    <div className="section-heading">
                        <h2 className="section-title">Категории</h2>
                        {/* <label className="search">
                            <input type="text" className="input input-search" placeholder="Поиск блюд и ресторанов" />
                        </label> */}
                    </div>
                    <div className="cards cards-restaurants" onClick={clickRestaurant}>
                        {dataPartner.map((item, index) => <a href="restaurant.html" data-name={index} key={index} className="card card-restaurant">
                            <img src={imgArr[index]} alt="image" className="card-image" />
                            <div className="card-text">
                                <div className="card-heading">
                                    <h3 className="card-title">{item.name}</h3>
                                    <span className="card-tag tag">{`${item.time_of_delivery} мин`}</span>
                                </div>

                                <div className="card-info">
                                    <div className="rating">
                                        {item.stars}
                                    </div>
                                    <div className="price">{`От ${item.price} ₽`}</div>
                                    <div className="category">{item.kitchen}</div>
                                </div>

                            </div>

                        </a>
                        )}



                    </div>

                </section>


            </div>

        </main>

    </>

}

export default MainPage;