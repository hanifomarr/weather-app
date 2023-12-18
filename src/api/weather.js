import axios from "axios";

const forecastEndpoint = (params) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${params.city_name}&days=${params.num_days}&aqi=no&alerts=no`;

const locationsEndpoint = (params) =>
  `http://api.weatherapi.com/v1/search.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${params.city_name}`;

export const callApi = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const fetchForecast = (params) => {
  return callApi(forecastEndpoint(params));
};

export const fetchLocation = (params) => {
  return callApi(locationsEndpoint(params));
};
