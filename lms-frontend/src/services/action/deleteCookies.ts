'use server';

import { cookies } from 'next/headers';

export const deleteCookies = (keys: string[]) => {
    console.log(keys)
   keys.forEach((key) => {
      cookies().delete(key);
   });
};