// search for courses by name
import fs from 'fs';
import axios from 'axios';
import { ICourseModel } from '../models/Course';
// import Promotion, { PromotionStatus } from '../models/Promotion';

/**
 * Given a country name, return it's currency code
 *
 * @param countryName
 * @returns currency code
 * @throws Error if country name is not found
 */
export const getCurrencyCode = async (countryName: string): Promise<string> => {
    const data = fs.readFileSync('src/data/country-currency.json', 'utf8');
    const currencies = JSON.parse(data);

    for (const currency of currencies) {
        if (currency.CountryCode.lowerCase() === countryName.toLowerCase()) {
            return currency.Code;
        }
    }

    const defaultCountry = await axios
        .get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_RATE_LKEY}/latest/USD`)
        .then((res) => {
            return res.data.country_code;
        })
        .catch((error) => {
            console.error(error);
            return 'us';
        });

    return defaultCountry.toUpperCase();
};

export const getCurrencyRate = async (baseCurrency: string, currencyCode: string): Promise<number> => {
    const API_URL = `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_RATE_LKEY}/pair/${baseCurrency}/${currencyCode}`;

    try {
        const response = await axios.get(API_URL);
        return response.data.conversion_rate;
    } catch (error) {
        console.error('Error fetching currency rate:', error);
        throw new Error('Could not fetch currency rate');
    }
};

export const getCurrencyRateFromCache = async (currencyCode: string, baseCurrency: string): Promise<number> => {
    const data = fs.readFileSync('src/media/currency-rates.json', 'utf8');
    const currencyRates = JSON.parse(data);
    if (currencyRates[currencyCode]) {
        return currencyRates[currencyCode];
    } else {
        return await getCurrencyRate(currencyCode, baseCurrency);
    }
};
