import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const KEY_API = import.meta.env.VITE_KEY;

export const getInfoCoinCap = createAsyncThunk(
  "table/get",
  async (_, thynkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/assets`, {
        headers: {
          Authorization: `Bearer ${KEY_API}`,
          accept: "application/json",
        },
        params: {},
      });

      return response.data.data;
    } catch (error) {
      return thynkAPI.rejectWithValue(error);
    }
  },
);

export const getCoinHistory = createAsyncThunk(
  "table/getHistory",
  async ({ id, interval }, thynkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/assets/${id}/history`, {
        headers: {
          Authorization: `Bearer ${KEY_API}`,
          accept: "application/json",
        },
        params: {
          interval: interval,
        },
      });
      return response.data.data;
    } catch (error) {
      return thynkAPI.rejectWithValue(error);
    }
  },
);
