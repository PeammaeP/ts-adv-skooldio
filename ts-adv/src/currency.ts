interface CurrencyResult<T extends string> {
    amount: number
    base: string
    date: string
    rates: Record<T , number> 
}

function cache(method : Function , context : unknown) {
    // @ts-ignore 
    return async function myFunc(this ,from : string,  to : string, amount : number) {
        const key = `${from}${to}` 

        if(this.caches[key]) return this.caches[key] * amount
        
        const result = await method.bind(this)(from , to , amount) 
        const rate = result.rates[to]
        this.caches[key] = rate / result.amount
    
        return rate
    } 
}

export class Currency<
    const Currencies extends readonly string[] = [] , 
    Values extends string = Extract<Currencies[keyof Currencies] , string>>{

    private api = "https://api.frankfurter.app";

    // caches to use in decorator ( inheritance )
    private caches : Record<string,number> = {}

    constructor(public currencies: Currencies) {
        this.currencies = currencies;
    }

    @cache
    async convert<To extends Values>(
            from : Values,  
            to : To, 
            amount : number) { 
        return await 
            fetch(`${this.api}/latest?from=${from}&to=${to}&amount=${amount}`)
            .then((x) => x.json() as unknown as CurrencyResult<To>)
    }

    get latest() { 
        return fetch(`${this.api}/latest`).then((x) => x.json())
    }
}