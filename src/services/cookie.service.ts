const refreshToken = 'csrf_refresh_token';
const accesToken = 'csrf_access_token';

const getCookie = (name: any): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
const getRefreshToken = (): string | undefined => {
  return getCookie(refreshToken);
};
const getAccesToken = (): string | undefined => {
  return getCookie(accesToken);
};
const cookieService = {
  getRefreshToken,
  getAccesToken,
};

export default cookieService;
