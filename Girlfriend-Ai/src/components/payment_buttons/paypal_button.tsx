import { useEffect } from 'react';

interface PayPalButtonProps {
  userId: string;
  amount: string;
}

declare const paypal: any;

const PayPalButton: React.FC<PayPalButtonProps> = ({ userId, amount }) => {
  useEffect(() => {
    paypal.Buttons({
      createOrder: function (data: any, actions: any) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount // Use the actual amount
            },
            custom_id: userId // Pass the user ID
          }]
        });
      },
      onApprove: function (data: any, actions: any) {
        return actions.order.capture().then(function (details: any) {
          // console.log('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }, [userId, amount]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;