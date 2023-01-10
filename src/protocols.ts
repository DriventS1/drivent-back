import { number, string } from "joi";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

//Regra de Negócio
export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type Activity = {
  id: number,
  name: string,
  capacity: number,
  startsAt: Date,
  endsAt: Date,
  dateId: number,
  localId: number,
  createdAt: Date,
  updatedAt: Date
};
