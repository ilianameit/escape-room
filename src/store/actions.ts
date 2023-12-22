import { createAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../const/const';

export const redirectToRoute = createAction<AppRoutes>('redirectToRoute');
