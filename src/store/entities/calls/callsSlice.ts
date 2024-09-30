import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Call, CallsParams, CallsResponse } from '../../../service/types';
import { getCalls } from '../../action-creators/calls';

export interface CallsState {
  data: Call[];
  status: 'loading' | 'success' | 'error';
  error: string;

  params: CallsParams;
}

const initialState: CallsState = {
  data: [],
  status: 'loading',
  error: '',

  params: {
    callType: '',
    dateStart: '',
    dateEnd: '',
  },
};

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setParamsCallType(state, action: PayloadAction<string>) {
      state.params.callType = action.payload;
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
    builder.addCase(getCalls.rejected, (state, action: PayloadAction<any>) => {
      state.data = [];
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export const { setParamsCallType } = callsSlice.actions;

export default callsSlice.reducer;
