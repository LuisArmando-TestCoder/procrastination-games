function getAllInmediateTransactions(stockPrices: number[]): number[][] {
    const prices = [...stockPrices]
    const {length} = prices
    const buys: number[] = []
    const sells: number[] = []

    buys.push(...prices.splice(0, 1))

    for (let i = 0; i < length; i++) {
        const haveSellsBePushed = buys.length === sells.length // can be deleted, and replaced continue 
        const haveBuysBePushed = buys.length > sells.length
        const price = prices[i]
        const lastBuy = buys[buys.length - 1]
        const lastSell = sells[sells.length - 1]

        if (haveBuysBePushed) {
            if (price < lastBuy) {
                buys[buys.length - 1] = price
            } else if (price > lastBuy) {
                sells.push(price)
            }
        } else if (haveSellsBePushed) {
            if (price > lastSell) {
                sells[sells.length - 1] = price
            } else if (price < lastSell) {
                buys.push(price)
            }
        }
    }

    return [buys, sells]
}

function getTransactionsProfit(buys: number[], sells: number[]) {
    const getSummation = (
        group: number[]
    ) => group.reduce((a: number, b: number) => a + b)
    const buysSummation = getSummation(buys)
    const sellsSummation = getSummation(sells)

    return sellsSummation - buysSummation
}

export default (stockPrices: number[], transactionsAmount: number) => {
    const [buys, sells] = getAllInmediateTransactions(stockPrices)
    const transactionsSummation = getTransactionsProfit(buys, sells)
    // still pending integrate k into max profit for transactions

    return transactionsSummation
}