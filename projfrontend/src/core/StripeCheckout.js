import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const StripeCheckout = ({ products, setReload = (f) => f, reload=undefined }) => {
    const initialValues = {
        loading: false,
        success: false,
        error: "",
        address: ""
    }
    const [data, setData] = useState(initialValues);
    const { user, token } = isAuthenticated();
    
    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount += p.price
        });
        return amount;
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-info rounded">Pay with Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning rounded">Signin</button>
            </Link>
        );
    }

    return(
        <div>
            <h2 className="text-white">Stripe Checkout Loaded! Amount: {getFinalAmount()}</h2>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;