import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_KEY =
const BASE_URL = import.meta.env.VITE_BASE_URL;
const KEY_API = import.meta.env.VITE_KEY;

export const getInfoCoinCap = createAsyncThunk(
  "table/get",
  async (param, thynkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}/assets`, {
            headers: {
                'Authorization': `Bearer ${KEY_API}`,
                'accept' : 'application/json'
            },
            params: {
                // limit: 10
            }
        });

    //   console.log('Данные из API: ',response.data.data);
      return response.data.data;
    } catch (error) {
      return thynkAPI.rejectWithValue(error);
    }
  },
);
