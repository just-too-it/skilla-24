import dayjs from 'dayjs';

export const getTimeFromDate = (date: string) => dayjs(date).format('HH:mm');
