import { Express } from "express";
import request from "supertest";

export const login = async (
  app: Express,
  login: string,
  password?: string | number,
) => {
  const response = await request(app)
    .post(`/user/login`)
    .send({ 
      email: login || 'rafaelds.89@gmail.com',
      password: password,
    });

  return response;
};

export const createUser = async (
  app: Express,
  payload: {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    birthday: Date;
  }
) => {
  const userAdmin = await login(app, 'rafaelds.89@gmail.com', '123456');

  const response = await request(app)
    .post(`/user`)
    .set("Content-Type", "application/json")
    .set("Authorization", userAdmin.body.token)
    .send(payload);

  return response;
};

export const createPhone = async (
  app: Express,
  type: string,
  number: string,
  userId: string,
  token: string
) => {
  const response = await request(app)
    .post(`/phone/`)
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send({
      type,
      number,
      userId
    });

  return response;
};