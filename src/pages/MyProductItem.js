import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/FormElements/Input';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import { adminActions } from '../store/admin-slice';
import classes from './ActiveProductItem.module.css';

const ProductItem = (props) => {
    const { title, status, description, productId, } = props;
    const [showActivationProductDetails, setShowActivationProductDetails] = useState(false);
    const [inputState, setInputState] = useState({
        amount: '',
        startTime: '',
        endTime: '',
        price: '',
    });

    const token = useSelector(state => state.auth.token);

    const [isLoading, haveError, sendRequest] = useHttp();
    const [statusHandler, setStatusHandler] = useState(status);
    const dispatch = useDispatch();
    // const decrementHandler = () => {
    //     dispatch(adminActions.removeItemFromActiveProducts(id));
    // };

    const inputHandler = event => {
        setInputState({
            ...inputState,
            [event.target.name]: event.target.value,
        })
    };

    const activateProduct = () => {
        const data = sendRequest('http://localhost:8080/api/admin/add-product-to-sale', 'POST',
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: ' + token,
            },
            JSON.stringify({
                productId,
                title,
                description,
                price: inputState.price,
                startTime: inputState.startTime,
                endTime: inputState.endTime,
                amount: inputState.amount,
            }),
        );

        if (data.success === true) {
            setStatusHandler('satista')
        }
    }

    const activateProductHandler = () => {
        if (showActivationProductDetails === false) {
            setShowActivationProductDetails(true);
        } else {
            activateProduct();
        }
    };

    const removeFromSale = () => {
        const data = sendRequest('http://localhost:8080/api/admin/remove-product-from-sale/' + productId, 'PUT',
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer: ' + token,
        }
        );
        if(data.success === true) {
            console.log("RemoveFromSale is SUCCESS");
        }
    };

    const cancelActivation = () => {
        setShowActivationProductDetails(false);
    };

    if (isLoading) {
        <LoadingSpinner asOverlay />
    }

    if (haveError) {
        return (
            <h2>Error: {haveError} </h2>
        );
    }

    return (
        <li className={classes.itemCustom}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div><span>Satış durumu: {statusHandler} </span></div>
                </header>
                <p>{description}</p>
                {showActivationProductDetails && <div className={classes.details}>
                    <label>Miktar: </label>
                    <input onChange={inputHandler} value={inputState.amount} name='amount'></input> <br />
                    <label>Start Time: </label>
                    <input onChange={inputHandler} value={inputState.startTime} name='startTime'></input> <br />
                    <label>End Time: </label>
                    <input onChange={inputHandler} value={inputState.endTime} name='endTime'></input> <br />
                    <label>Fiyat: </label>
                    <input onChange={inputHandler} value={inputState.price} name='price'></input> <br />
                    <button onClick={activateProductHandler}>Onayla</button>
                    <button onClick={cancelActivation}>İptal</button>
                </div>}
                <div className={classes.actionsCustom}>
                    {status === 'satis disi' && <button style={{ backgroundColor: 'green', color: 'white' }} onClick={activateProductHandler}>Satışa Sun</button>}
                    {status !== 'satis disi' && <button style={{ backgroundColor: 'red', color: 'white' }} onClick={removeFromSale} >Satıştan Çek</button>}
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;