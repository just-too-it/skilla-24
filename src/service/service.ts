import axios from 'axios';
import { CallsParams } from './types';

export const getCallsAPI = async ({
  dateStart,
  dateEnd,
  callType,
}: CallsParams) => {
  const params = new URLSearchParams();

  if (dateStart) params.append('date_start', dateStart);
  if (dateEnd) params.append('date_end', dateEnd);
  if (callType !== '') params.append('in_out', callType === 1 ? '1' : '0');

  return await axios.post(
    `${import.meta.env.VITE_API_URL}/mango/getList`,
    {},
    {
      params: params,
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    }
  );
};
