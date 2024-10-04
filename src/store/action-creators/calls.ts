import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AudioRecord,
  CallsParams,
  CallsResponse,
  RecordParams,
} from '../../pages/Calls/types';
import { getCallsAPI, getRecordAPI } from '../../service/service';

export const getCalls = createAsyncThunk<CallsResponse, CallsParams>(
  'calls/getCalls',
  async (params, thunkAPI) => {
    try {
      const response = await getCallsAPI(params);
      return response.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getAudioRecord = createAsyncThunk<AudioRecord, RecordParams>(
  'calls/getRecord',
  async (params, thunkAPI) => {
    try {
      const { record } = params;
      const { data: audioBlob } = await getRecordAPI(params);
      const audioUrl = URL.createObjectURL(audioBlob);

      return { record, audioUrl };
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
