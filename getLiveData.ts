import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

let getRawStockAPI = async () => {
  const url = `https://www.etoro.com/sapi/userstats/risk/UserName/OutSmartNSDQ/Contribution?client_request_id=${uuidv4()}`;
  let rawStockAPI: any;

  fetch(url).then((response: any) =>
    response
      .json()
      .then((data: any) => ({
        data: data,
        status: response.status,
      }))
      .then((res: any) => {
        console.log(res.data);
        rawStockAPI = res.data;
      })
  );

  return await rawStockAPI;
};
getRawStockAPI();
export default getRawStockAPI;
