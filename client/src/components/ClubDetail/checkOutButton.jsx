import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import mercadopago from 'mercadopago';



const CheckOutButton = ({price}) => {
    
    function createCheckoutButton(preference) {
        var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        document.getElementById("checkout-btn").innerHTML = "";
        document.querySelector("#checkout-btn").appendChild(script);
    }
  const [preferenceId, setPreferenceId] = useState("")
    
     useEffect(() => {
      createCheckoutButton(preferenceId)
        
    }, [preferenceId]);
  
   const handleClick = async () => {

        try{
            const mpResponse = axios.post('/checkout', {price})
            setPreferenceId(mpResponse.data.id)
        
        } catch(err){console.log(err)}

    }  

    return (
        <>
        
        <div id={'checkout'} onClick={handleClick}>Pagar con MercadoPago</div>
        <div id={'checkout-btn'} ></div>
        
        
        </>
    );
}

export default CheckOutButton;
