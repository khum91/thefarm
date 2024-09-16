// This file contains type definitions for our data.
// It describes the shape of the data, and what data type each property should accept.

import { Date } from "mongoose";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type MincedForm = {
  _id: string;
  name: string;
  part: string;
  unit: 'kg' | 'gm'
  life: number;
  image: string;
};

export type AliveForm = {
  _id: string;
  tag: string;
  group: string;
  breed: string;
  color: string;
  age: number;
  weight: number;
};

export type AliveMarket = {
  _id: string;
  tag: {
    _id: string;
    tag: string;
    group: string;
    breed: string;
    color: string;
    age: number;
    weight: number;
  };
  price: number;
  image: string;
  status: 'active' | 'inactive'
};

export type meatMarket = {
  _id: string;
  item: {
    _id: string;
    name: string;
    part: string;
    unit: string;
    life: number;
    image: string;
  };
  killdate: Date
  price: number;
  status: 'active' | 'inactive'
};


export type BannerForm = {
  _id: string;
  name: string;
  link: string;
  image: string;
  status: 'active' | 'inactive'
};

export type noticeForm = {
  _id: string;
  name: string;
  date: Date;
  message: string;
  status: 'active' | 'inactive'
};

export type Population = {
  group: string;
  population: number;
};

export type ImageComponent = {
  name: string,
  msg?: string[] | undefined | null;
  imageUrl?: string | undefined | null
}


