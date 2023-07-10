import { LoadingStatusEnum } from 'common/types';

type NoticeType = 'error' | 'success' | null;
export interface IResponseNotice {
  noticeType: NoticeType;
  message: string | null;
}

export interface IAppSliceInitialState {
  isAppInitialized: boolean;
  initializedLoading: LoadingStatusEnum;
  loading: LoadingStatusEnum;
  responseNotice: IResponseNotice;
  isFeedbackOpen: boolean;
}
