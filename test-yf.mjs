import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function test() {
  try {
    const quote = await yahooFinance.quote('DEEPAKNTR.NS');
    console.log("Currency:", quote.currency);
    console.log("Financial Currency:", quote.financialCurrency);
    console.dir(quote);
  } catch (error) {
    console.error("YF Error:", error.message || error);
  }
}

test();
