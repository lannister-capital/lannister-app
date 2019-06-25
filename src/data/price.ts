import axios from 'axios'

const API_URL = "https://api.cryptonator.com/api/ticker/";

/**
 * Calls the cryptonator api to return price based on COIN and CURRENCY
 * @param coin 
 * @param currency 
 */
export async function getPrice(coin: string, currency: string ='EUR') {
    let url = API_URL + coin + '-' + currency;

    try {
        const response = await axios.get(url);;
        return (response.data.ticker.price);
    } catch (error) {
        // Maybe a helpful message to say that price isn't currently available
        return error;
    }
}
