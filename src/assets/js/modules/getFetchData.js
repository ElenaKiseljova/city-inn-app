import axios from 'axios';

const CODE_SUCCESS = 200;
const TEXT_SUCCESS = 'success';

// Разные API для теста и бой
const URL_API =
  window.location.host.indexOf('city-inn.com.ua') > 0
    ? `${process.env.VUE_APP_CITY_IN_API}/api`
    : process.env.VUE_APP_FIREBASE_RTDB;

// Запрос для firebase должен расширение файла включать, иначе CORS ошибка выпадает (так решила эту проблему)
let fileExtension = URL_API.indexOf('firebase') > 0 ? '.json' : '';

/** Удалить в финале СТАРТ */
// const replaceLineBreakSymbolsForJsonValidFormat = (text) => {
//   const changedText = text.replace(/\r\n/g, '\\r\\n');

//   return changedText;
// };
/** Удалить в финале КОНЕЦ */

const getFetchData = async (url) => {
  try {
    const response = await axios.get(`${URL_API}${url}${fileExtension}`);

    /** Удалить в финале СТАРТ */
    console.log(url, response);
    /** Удалить в финале КОНЕЦ */

    if (response.status !== CODE_SUCCESS) {
      const message = `Error: ${
        response.statusText || 'Something went wrong...'
      }`;

      throw new Error(message);
    }

    if (!response.data || response.data.status !== TEXT_SUCCESS) {
      const message = `Error: ${
        response.data?.error || 'No part of page data'
      }`;

      throw new Error(message);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getFetchData;
