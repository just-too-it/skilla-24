export interface CallsParams {
  dateStart: string;
  dateEnd: string;
  callType: number | string;
}

export interface Call {
  id: number;
  in_out: number;
  date: string;
  person_avatar: string;
  person_name: string;
  from_number: string;
  source?: string;
  estimation: Rating;
  time: number;
  record: string;
  partnership_id: string;
}

export interface CallsResponse {
  total_rows: number;
  results: Call[];
}

export interface RecordParams {
  record: string;
  partnershipId: string;
}

export interface AudioRecord {
  [key: string]: string;
}

export enum Rating {
  BAD = 'Плохо',
  GOOD = 'Хорошо',
  EXCELLENT = 'Отлично',
}
