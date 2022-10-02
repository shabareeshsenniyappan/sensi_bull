import axios from "axios";

export const instrumentCall = async () => {
  let result = await axios
    .get("https://prototype.sbulltech.com/api/v2/instruments")
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e;
    });
  return result;
};

export const quotesCall = async (symbol) => {
  let result = await axios
    .get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e;
    });
  return result;
};
