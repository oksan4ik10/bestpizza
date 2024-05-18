import urlCheck from "../../assets/img/check.png"

function ModalFinishOrder() {
    return (

        <div className="modal modal-cart">
            <div className="modal-dialog">
                <div className="modal-header modal-finishOrder">
                    <img src={urlCheck} alt="check" className="finish__check" />
                    <h2>Спасибо за заказ!</h2>
                    <p>Менеджер свяжется с вами в ближайшее время.</p>
                </div>
            </div>
        </div>
    );
}

export default ModalFinishOrder;