
export const formatPrice = (priceInCents: number) => {
  const dollars = priceInCents / 100;
  const satoshi = priceInCents * 10; // 10 satoshi per cent
  
  if (priceInCents < 100) {
    return {
      primary: `${priceInCents}¢`,
      secondary: `${satoshi.toLocaleString()} sats`
    };
  } else {
    return {
      primary: `$${dollars.toFixed(2)}`,
      secondary: `${satoshi.toLocaleString()} sats`
    };
  }
};
