import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path'
import { response } from 'express';
import * as utils from '../utils/utils.js'
dotenv.config();

let baseUrl = process.env.PHOENIX_API_URL
const username = '';
const configPath = path.join(process.env.HOME || process.env.USERPROFILE, '.phoenix', 'phoenix.conf');
const configs = utils.readConfigFile(configPath)
const httpPassword = configs["http-password"];
const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${username}:${httpPassword}`).toString('base64')
};
export const getBalance = async () => {
  const url = 'http://127.0.0.1:9740/getbalance';
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}

export const payInvoice = async (amountSat, invoice) => {
  const url = 'http://127.0.0.1:9740/payinvoice';
  const data = new URLSearchParams();
  if (amountSat) {
    data.append('amountSat', amountSat);
  }
  data.append('invoice', invoice);


  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data;

  } catch (error) {
    console.error("Error paying invoice", error)
    throw error
  }
}

export const getNodeInfo = async () => {
  const url = 'http://127.0.0.1:9740/getinfo';
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}

export const createInvoice = async (description, amountSat, externalId, webhookUrl) => {
  const url = 'http://127.0.0.1:9740/createinvoice';
  const data = new URLSearchParams();
  data.append('description', description);
  data.append('amountSat', amountSat);
  data.append('extranlID', externalId);
  data.append('webhookUrl', webhookUrl);

  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
}

export const getIncomingPayments = async (from, to, limit, offset, all) => {
  const url = 'http://127.0.0.1:9740/payments/incoming';
  const params = {
    from: from,
    to: to,
    limit: limit,
    offset: offset,
    all: all
  }

  try {
    const response = await axios.get(url, {  params, headers });
    return response.data
  } catch (error) {
    console.error('Error fetching payments:', error);
  }
}


export const getOutgoingPayments = async (from, to, limit, offset, all) => {
  const url = 'http://127.0.0.1:9740/payments/outgoing';
  const params = {
    from: from,
    to: to,
    limit: limit,
    offset: offset,
    all: all
  }

  try {
    const response = await axios.get(url, {  params, headers });
    return response.data
  } catch (error) {
    console.error('Error fetching payments:', error);
  }

}

export const payOffer = async (amountSat, offer, message) => {
  const url = 'http://127.0.0.1:9740/payoffer';
  let data = new URLSearchParams();
  data.append('amountSat', amountSat);
  data.append('offer', offer);
  data.append('message', message);

  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data;
  } catch (error) {
    console.error('Error paying offer:', error);
  }
};

export const payLnAddress = async (amountSat, lnAddress, message) => {
  const url = 'http://127.0.0.1:9740/paylnaddress';
  let data = new URLSearchParams();
  data.append('amountSat', amountSat);
  data.append('address', lnAddress);
  data.append('message', message);

  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data;
  } catch (error) {
    console.error('Error paying LN address:', error);
  }
};


export const getOffer = async () => {
  const url = 'http://127.0.0.1:9740/getoffer';
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
}

export const listIncomingAndOutgoing = async () => {
  const url1 = 'http://127.0.0.1:9740/payments/incoming?all=true&limit=1000000';
  const url2 = 'http://127.0.0.1:9740/payments/outgoing?all=true&limit=1000000';

  try {
    const response1 = await axios.get(url1, { headers });
    const response2 = await axios.get(url2, { headers });
    // const date = new Date(response1.data[0].createdAt);
    // return date.toString();
    
    // return [ ...response1.data, ...response2.data ]

    let data = [ ...response1.data, ...response2.data ];

    return data.sort((a,b) => b.createdAt - a.createdAt)
    // return response1.data;
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }

}

export const decodeOffer = async (offer) => {
  const url = 'http://127.0.0.1:9740/decodeoffer';
  let data = new URLSearchParams();
  data.append('offer', offer);
  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data;
  } catch (error) {
    console.error('Error decoding offer', error);
    return response.data;
  }
}

export const decodeInvoice = async (invoice) => {
  const url = 'http://127.0.0.1:9740/decodeinvoice';
  let data = new URLSearchParams();
  data.append('invoice', invoice);
  try {
    const response = await axios.post(url, data.toString(), { headers });
    return response.data;
  } catch (error) {
    console.error('Error decoding offer', error);
    throw error;
  }
}