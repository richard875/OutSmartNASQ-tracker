import fetch from "node-fetch";

var getStockRaw = async () => {
  return await fetch(
    `https://finnhub.io/api/v1/quote?symbol=AAPL&token=c0fnrov48v6snribf4q0`
  ).then((data) => data.text());
};

getStockRaw().then((x) => console.log(x));
