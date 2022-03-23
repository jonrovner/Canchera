import React, {useEffect} from 'react';

const CheckOutButton = () => {

    function createCheckoutButton(preference) {
        var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        document.getElementById("checkout-btn").innerHTML = "";
        document.querySelector("#checkout-btn").appendChild(script);
      }


  

    return (
        <div id={'checkout-btn'}>Pagar con MercadoPago
            
        </div>
    );
}

export default CheckOutButton;
