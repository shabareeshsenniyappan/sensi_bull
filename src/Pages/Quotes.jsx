import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuotesTable from "../Components/quotesTabel/QuotesTabel";
import { quotesCall } from "../service";

function Quotes() {
  let { symbol } = useParams();
  const [priceList, setpriceList] = useState([]);
  useEffect(() => {
    quotesCall(symbol).then((e) => {
      console.log(e?.payload);
      if (JSON.stringify(e?.payload[symbol]) !== JSON.stringify(priceList)) {
        setpriceList(e?.payload[symbol]);
      }
    });
  }, [symbol]);
  return (
    <div>
      <QuotesTable value={priceList} name={symbol} />
    </div>
  );
}

export default Quotes;
