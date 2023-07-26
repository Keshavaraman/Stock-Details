
function dateFormatValidator(dateString) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(dateString);
}

function stockSymbolValidator(symbol) {
    const stockSymbolRegex = /^[A-Z0-9-]{1,10}$/; 
    return stockSymbolRegex.test(symbol);
  }

module.exports={dateFormatValidator,stockSymbolValidator}