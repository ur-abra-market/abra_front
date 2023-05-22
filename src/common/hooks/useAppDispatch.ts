import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/createStore';

export const useAppDispatch: () => AppDispatch = useDispatch;
