import { createCookie } from "@remix-run/node";

export const authCookie = createCookie('auth_token', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7, 
    sameSite: 'lax',
    path: '/'
  });
  
  export const timeStampCookie = createCookie('timestamp', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/'
  })

  export const imageCookie = createCookie('timestamp', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/'
  })

  export const tenantCookie = createCookie('tenant', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/'
  })


export async function getCookie(cookiesHeader: string | null, cookie: ReturnType<typeof createCookie>) {
  if (!cookiesHeader) return null;
  const parsedCookies = await cookie.parse(cookiesHeader);
  return parsedCookies;
}

export async function setCookie(value: string, cookie: ReturnType<typeof createCookie>) {
  return await cookie.serialize(value);
}  