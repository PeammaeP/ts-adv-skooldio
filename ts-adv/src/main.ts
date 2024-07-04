import { Currency } from './currency'

const myCurrencies = new Currency(['THB','JPY','USD'])

const main = async () => { 
    await myCurrencies.convert('USD','THB',2).then(console.log)
    await myCurrencies.convert('USD','THB',3).then(console.log)
    await myCurrencies.convert('USD','THB',1).then(console.log)
    await myCurrencies.convert('USD','THB',4).then(console.log)
}

main()