export interface IBaseResponse<R> {
  ok: boolean;
  result: R;
  detail: 'string';
  error: 'string';
  error_code: 0;
}
