const refreshToken = 'csrf_refresh_token';
const accesToken = 'csrf_access_token';

const getCookie = (name: any) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
const getRefreshToken = () => {
  return getCookie(refreshToken);
};
const getAccesToken = () => {
  return getCookie(accesToken);
};
const cookieService = {
  getRefreshToken,
  getAccesToken,
};

export default cookieService;
