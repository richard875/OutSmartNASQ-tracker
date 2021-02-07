import getRawStockAPI from "./getLiveData";

// console.log(data);
let printData = async () => {
  const data = await getRawStockAPI();
  console.log(data);
};
