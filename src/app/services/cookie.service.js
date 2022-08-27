const refreshToken = "csrf_refresh_token";
const accesToken = "";

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
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
