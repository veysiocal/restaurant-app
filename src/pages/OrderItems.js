import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHttp } from "../hooks/use-http";
import { uiActions } from "../store/ui-slice";
import ErrorModal from '../components/UI/ErrorModal';

import classes from './OrderItems.module.css';

const OrderItems = props => {
    const [isLoading, haveError, sendRequest,clearError] = useHttp();
    const [adminPageOrders, setAdminPageOrders] = useState([]);

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const getAdminPageOrders = async () => {
            const data = await sendRequest('http://localhost:8080/api/orders/owner/get-order-lines/' + props.id,
                'GET',
                {
                    'Authorization': 'Bearer: ' + token
                });
            if (data && data.success === true) {
                console.log("data1: ", data)
                setAdminPageOrders(data.data);
            }
        }
        getAdminPageOrders()
    }, [sendRequest]);

    const orderDeliveringHandler = async () => {
        const data = await sendRequest('http://localhost:8080/api/orders/owner/order-delivering/' + props.id, 'PUT',
            {
                'Authorization': 'Bearer: ' + token,
            }
        );
        if (data && data.success === true) {
            props.deleteFromActiveOrders(props.id);
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Successfully Delivered!',
            }));
        }
        // history.go(0);

    };

    const orderRejectingHandler = async () => {
        const data = await sendRequest('http://localhost:8080/api/orders/owner/order-rejecting/' + props.id, 'PUT',
            {
                'Authorization': 'Bearer: ' + token,
            }
        );
        if (data && data.success === true) {
            props.deleteFromActiveOrders(props.id);
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Successfully Rejected! ',
            }));
        }
        // history.go(0);
    }

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <li key={props.key} className={classes.itemCustom}>
                <header>Sipariş Id: {props.id}</header>
                <span>Durum: {props.status}</span>
                <Card className={classes.cartCustom}>
                    <ul>
                        {adminPageOrders.map((item) => (
                            <li className={classes.itemCustom}>
                                lineId: {item.lineId}
                                <header>
                                    <h3>ProductId: {item.productName}</h3>
                                    <div className={classes.priceCustom} >
                                        {/* ${total.toFixed(2)}{' '} */}
                                        {/* ${total}{' '} */}

                                        {/* <span className={classes.itempriceCustom}>(${price.toFixed(2)}/item)</span> */}
                                        <span className={classes.itempriceCustom}>(₺{item.price}/item)</span>

                                    </div>
                                </header>
                                <div
                                    className={classes.detailsCustom}
                                >
                                    <div className={classes.quantityCustom} >
                                        x <span>{item.quantity}</span>
                                    </div>

                                </div>
                                <hr />
                            </li>
                        ))}
                    </ul>
                    <div>
                        <span>Toplam: {props.totalPrice} ₺</span>
                    </div>
                    <hr />
                    <button onClick={orderDeliveringHandler}>Teslim Et</button>
                    <button onClick={orderRejectingHandler}>İptal Et</button>
                </Card>
            </li>
        </React.Fragment>
    )
};

export default OrderItems;