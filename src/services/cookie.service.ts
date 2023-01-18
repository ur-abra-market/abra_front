const refreshToken = 'csrf_refresh_token';
const accesToken = 'csrf_access_token';

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function getRefreshToken() {
  return getCookie(refreshToken);
}
function getAccesToken() {
  return getCookie(accesToken);
}
const cookieService = {
  getRefreshToken,
  getAccesToken,
};

export default cookieService;
