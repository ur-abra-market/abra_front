import { Dispatch } from "redux";

export type RegisterParamsType={
  email?: string
  password?: string
  route?: string
  token?:string
}
export type RegisterResponseType={
  result: string
}
export type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}