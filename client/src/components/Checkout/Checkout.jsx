import React from 'react';
import {useSearchParams} from 'react-router-dom'

const Checkout = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    console.log(searchParams)

    return (
        <div>
        checkout        
        </div>
    );
}

export default Checkout;
