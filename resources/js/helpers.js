import { constant } from "lodash";

export const getAuthToken = () => {
    let data = localStorage.getItem('token');
    return data;
};

export const baseURL = 'https://cd59-124-253-214-103.ngrok.io';

// export const setAuthToken = (value) => {
//     let data = localStorage.setItem('token',value);
//     return data;
// };