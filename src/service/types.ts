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
  from_number: string;
  source?: string;
  estimation?: string;
  time: number;
}

export interface CallsResponse {
  total_rows: number;
  results: Call[];
}
