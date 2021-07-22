function getAllInmediateTransactions(stockPrices: number[]): number[][] {
    const prices = [...stockPrices]
    const { length } = prices
    const buys: number[] = []
    const sells: number[] = []

    buys.push(...prices.splice(0, 1))

    for (let i = 0; i < length; i++) {
        const haveSellsBePushed = buys.length === sells.length
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

function getAllPosibleProfits({
    buys,
    sells,
    transactionsAmount,
    profits = [],
    previousProfit = 0,
}: {
    buys: number[]
    sells: number[]
    transactionsAmount: number
    profits?: number[]
    previousProfit?: number
}) {
    sells.forEach((sell, sellIndex) => {
        buys.slice(0, sellIndex + 1).forEach(buy => {
            const newProfit = sell - buy + previousProfit

            profits.push(newProfit)

            if (transactionsAmount > 1) {
                getAllPosibleProfits({
                    buys: buys.slice(sellIndex + 1),
                    sells: sells.slice(sellIndex + 1),
                    previousProfit: newProfit,
                    profits,
                    transactionsAmount: transactionsAmount - 1,
                })
            }
        })
    })

    return profits
}

export default (stockPrices: number[], transactionsAmount: number) => {
    const [buys, sells] = getAllInmediateTransactions(stockPrices)
    const allPosibleProfits = getAllPosibleProfits({buys, sells, transactionsAmount})
    const [maximumProfit] = allPosibleProfits.sort((a, b) => b - a)

    return maximumProfit
}