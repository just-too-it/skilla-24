import axios from 'axios';
import { CallsParams, RecordParams } from './types';

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

export const getRecordAPI = async ({ record, partnershipId }: RecordParams) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/mango/getRecord`,
    {},
    {
      params: {
        record,
        partnership_id: partnershipId,
      },
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
        'Content-Transfer-Encoding': 'binary',
        'Content-Disposition': 'filename=record.mp3',
      },
    }
  );
};
