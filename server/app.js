// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const {
  dateFormatValidator,
  stockSymbolValidator,
} = require("./utils/helperFunctions");
const makeApiCall = require("./utils/makeApiCall");
const NodeCache = require("node-cache");

const cache = new NodeCache();
const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
  console.log(`Info : api/fetchStockData`);
  console.log(`Info : Receieved Data ${JSON.stringify(req.body)}`);
  const { stockSymbol, selectedDate } = req.body;

  if (
    !stockSymbol ||
    typeof stockSymbol !== "string" ||
    !stockSymbolValidator(stockSymbol) ||
    !selectedDate ||
    !dateFormatValidator(selectedDate)
  ) {
    console.log(`Error : Invalid Request ${JSON.stringify(req.body)}`);
    return res.status(400).json({ error: "Invalid request body" });
  }

  const cachedData = cache.get(`${stockSymbol}/${selectedDate}`);
  if (cachedData) {
    console.log("Info : Data found in cache.");
    return res.json({results:cachedData});
  }

  try {
    console.log("Info : polygon API Calling");
    const requestPram = {
      url: `${process.env.POLYGON_END_POINT}/v1/open-close/${stockSymbol}/${selectedDate}?adjusted=true`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.POLYGON_API_KEY}`,
      },
    };


    const response = await makeApiCall(
      requestPram.url,
      requestPram.method,
      null,
      requestPram.headers
    );
    console.log(response);
    if (response.status === 200) {
      const data = {
        open:response.data.open,
        close:response.data.close,
        high:response.data.high,
        low:response.data.low,
        volume:response.data.volume,
        symbol:response.data.symbol,
        date:response.data.from
      };
      cache.set(`${stockSymbol}/${selectedDate}`, data);
      res.status(200).json({results:data});
    } else {
      console.log(`Error : ${JSON.stringify(response)}`);
      res
        .status(response.status)
        .json({ message: "Failed to fetch stock details" });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Error : Match not found");
      res.status(404).json({ message: "Match not found" });
    } else {
      console.log(`Error : Polygon API call failed ${error}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
