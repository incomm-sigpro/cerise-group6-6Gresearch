import axios from 'axios';

/* Dev */
export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

/* Prod */

/* export const api = axios.create({
  baseURL: ,
}) */
