import axios from 'axios';

/* Dev */
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/* Prod */

/* export const api = axios.create({
  baseURL: ,
}) */
