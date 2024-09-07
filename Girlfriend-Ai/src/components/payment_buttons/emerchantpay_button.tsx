import { useEffect } from 'react';

interface EmerchantPayButtonProps {
  userId: string;
  usagePurpose: string;
  selectedPlan: string;
}

const EmerchantPayButton: React.FC<EmerchantPayButtonProps> = async ({ userId, selectedPlan, usagePurpose }) => {
  const handleClick = async () => {
    let priceAmount = 0;
    if (selectedPlan === "100tokens") {
      priceAmount = 9.99;
    }
    if (selectedPlan === "450token") {
      priceAmount = 34.99;
    }
    if (selectedPlan === "650tokens") {
      priceAmount = 49.99;
    }
    if (selectedPlan === "1250tokens") {
      priceAmount = 99.99;
    }
    if (selectedPlan === "2600tokens") {
      priceAmount = 199.99;
    }
    if (selectedPlan === "4250tokens") {
      priceAmount = 299.99;
    }
    // make api call to /api/emp
    const response = await fetch('/api/emerchantpay', {
      method: 'POST',
      body: JSON.stringify({ userId, priceAmount, usagePurpose }),
    });

    // get the redirect url from the response
    const data = await response.json();
    window.location.href = data.redirectUrl;
  };

  return <button onClick={await handleClick}>Pay with Card</button>;
};

export default EmerchantPayButton;