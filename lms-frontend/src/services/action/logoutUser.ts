
import { deleteCookies } from './deleteCookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


export const logoutUser = (router: AppRouterInstance) => {
   deleteCookies(['token', 'refreshToken']);
   router.push('/');
   router.refresh();
};