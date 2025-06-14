
export const formatPrice = (priceInCents: number) => {
  const dollars = priceInCents / 100;
  const satoshi = priceInCents * 10; // 10 satoshi per cent
  
  if (priceInCents < 100) {
    return {
      primary: `${satoshi.toLocaleString()} sats`,
      secondary: `${priceInCents}¢`
    };
  } else {
    return {
      primary: `${satoshi.toLocaleString()} sats`,
      secondary: `$${dollars.toFixed(2)}`
    };
  }
};
