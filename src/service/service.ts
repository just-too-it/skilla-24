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

  const url = `${import.meta.env.VITE_API_URL}/mango/getList?${params.toString()}`;

  return await axios.post(
    url,
    {},
    { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` } }
  );
};
