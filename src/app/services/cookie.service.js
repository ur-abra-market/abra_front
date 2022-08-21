const refreshToken = "csrf_refresh_token";

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
const cookieService = {
  getRefreshToken,
};
export default cookieService;
