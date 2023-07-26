import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import StockInfoContainer from "./stockInfoContainer";
import { useDispatch, useSelector } from "react-redux";
import { stockDetails } from "../../redux/actions";

export default function Main() {
  const [symbol, setSymbol] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [stockInfo, setStockInfo] = useState({});
  const stockData = useSelector((state) => state.stockData);
  const dispatch = useDispatch();

  useEffect(() => {
    if(stockData.stockData && stockData.stockData.open){
    setStockInfo(stockData.stockData);
    setSymbol('');
    setSelectedDate(null);
    }
    else
    setStockInfo({});
  }, [stockData]);
  const onSearch = (e) => {
    e.preventDefault();
    var month = selectedDate.getMonth() +1;
    dispatch(stockDetails(symbol,selectedDate.getFullYear()+"-"+month.toString().padStart(2,'0')+"-"+selectedDate.getDate().toString().padStart(2,'0')));
  };

  return (
    <div>
      <header className="header">
        <h3>Trade Statistics</h3>
      </header>
      <form
        className="container p-4 w-80 mt-2 input-container"
        onSubmit={onSearch}
      >
        <div className="row">
          <div className="col-5">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="input1"
                placeholder="Enter ticker symbol of the stock/equity"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-5">
            <div className="form-group">
              <DatePicker
                className="form-control w-100"
                id="datePicker2"
                placeholderText="Select Date"
                dateFormat={"dd-MM-yyyy"}
                value={selectedDate}
                selected={selectedDate}
                maxDate={new Date()}
                onChange={(e) => {
                  console.log(e);
                  setSelectedDate(e);
                }}
                required
              />
            </div>
          </div>
          <div className="col-2">
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      {stockInfo != null &&  stockInfo.symbol ?
       (
        <StockInfoContainer stockInfo={stockInfo}/>
      ) : (
        <section
          className=" modal-dialog modal-dialog-centered justify-content-center"
          style={{ height: "50vh" }}
        >
          <figure className="text-center">
            <img
              src="./stockBackground.png"
              alt=""
              style={{ height: "100px" }}
            />
            <figcaption>
              <span>
                {
                  "Please enter the necessary information in the input fields to view stock details."
                }
              </span>
            </figcaption>
          </figure>
        </section>
      ) }
    </div>
  );
}
