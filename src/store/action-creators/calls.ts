import { createAsyncThunk } from '@reduxjs/toolkit';

import { CallsParams, CallsResponse } from '../../service/types';
import { getCallsAPI } from '../../service/service';

export const getCalls = createAsyncThunk<CallsResponse, CallsParams>(
  'calls/getCalls',
  async (params, thunkAPI) => {
    try {
      const response = await getCallsAPI(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
