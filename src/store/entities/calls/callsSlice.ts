import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  AudioRecord,
  Call,
  CallsParams,
  CallsResponse,
} from '../../../pages/Calls/types';
import { getCalls, getAudioRecord } from '../../action-creators/calls';

export interface CallsState {
  data: Call[];
  status: 'loading' | 'success' | 'error';
  error: string;
  params: CallsParams;
  audioRecords: AudioRecord;
  statusAudio: 'loading' | 'success' | 'error';
}

const initialState: CallsState = {
  data: [],
  status: 'loading',
  error: '',
  params: {
    callType: '',
    dateStart: '',
    dateEnd: '',
    sortBy: null,
    order: null,
  },
  audioRecords: {},
  statusAudio: 'loading',
};

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<Partial<CallsParams>>) {
      state.params = { ...state.params, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCalls.fulfilled,
      (state, action: PayloadAction<CallsResponse>) => {
        state.data = action.payload.results;
        state.status = 'success';
      }
    );
    builder.addCase(getCalls.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      getCalls.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.data = [];
        state.status = 'error';
        state.error = action.payload as string;
      }
    );
    builder.addCase(
      getAudioRecord.fulfilled,
      (state, action: PayloadAction<AudioRecord>) => {
        const { record, audioUrl } = action.payload;

        state.audioRecords[record] = audioUrl;
        state.statusAudio = 'success';
      }
    );
    builder.addCase(getAudioRecord.pending, (state) => {
      state.statusAudio = 'loading';
    });
    builder.addCase(
      getAudioRecord.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.statusAudio = 'error';
        state.error = action.payload as string;
      }
    );
  },
});

export const { setParams } = callsSlice.actions;

export default callsSlice.reducer;
