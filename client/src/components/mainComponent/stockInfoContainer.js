export default function StockInfoContainer({stockInfo}) {
  function changeDateFormat(inputDate) {
    const dateObj = new Date(inputDate);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return dateObj.toLocaleString('en-US', options);
  }
  return (
    <section
      className=" modal-dialog modal-dialog-centered justify-content-center"
      style={{ minHeight: "50vh" }}
    >
<div class="container  d-flex justify-content-center mt-5">
  <div class="table-responsive w-50">
    <table class="table table-bordered">
      <thead>
        
        <tr>
          <th style={{width:"100px"}}>Key Data</th>
          <th style={{width:"200px"}}>Value</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>Symbol</td>
          <td>{stockInfo.symbol}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{changeDateFormat(stockInfo.date)}</td>
        </tr>
        <tr>
          <td>Open</td>
          <td>{stockInfo.open}</td>
        </tr>
        <tr>
          <td>Close</td>
          <td>{stockInfo.close}</td>
        </tr>
        <tr>
          <td>High</td>
          <td>{stockInfo.high}</td>
        </tr>
        <tr>
          <td>Low</td>
          <td>{stockInfo.low}</td>
        </tr>
        <tr>
          <td>Volume</td>
          <td>{stockInfo.volume}</td>
        </tr>

      </tbody>
    </table>
  </div>
  </div>
    </section>
  );
}
