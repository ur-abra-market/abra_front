const refreshToken = "csrf_refresh_token";

function getCookie() {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        refreshToken.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
const cookieService = {
  getCookie,
};
export default cookieService;
