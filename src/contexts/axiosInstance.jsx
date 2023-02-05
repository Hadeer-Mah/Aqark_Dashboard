import axios from "axios";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "https://qaym-3kark2-ziadsindion.pythonanywhere.com/",
});

axiosInstance.interceptors.request.use(async (config) => {
  console.log(config);
  if (config.url === "api/users/login/") {
    return config;
  }


  if (config.url === "api/users/register/" || config.url === "api/users/request-reset-password/" || config.url === 'api/users/reset-password/') {
    
    console.log("condition basseed");
    console.log(config);
    return config;
  }
  let accessToken = localStorage.getItem("accesstoken");
  let decodedAccess = jwtDecode(accessToken);

  let refreshToken = localStorage.getItem("refreshtoken");
  let decodedRefresh = jwtDecode(refreshToken);

  // expired
  if (decodedAccess.exp * 1000 > Date.now()) {
    console.log("access expired");
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log(config);
    return config;
  }
  if (
    decodedAccess.exp * 1000 < Date.now() &&
    decodedRefresh.exp * 1000 > Date.now()
  ) {
    try {
      console.log("access expired but refresh not");
      const { data } = await axios({
        url: "https://qaym-3kark2-ziadsindion.pythonanywhere.com/api/token/refresh/",
        method: "post",
        data: {
          refresh: `${refreshToken}`,
        },
      });
      console.log(data);
      localStorage.setItem("accesstoken", data.access);
    } catch (err) {}
  }
  if (
    decodedAccess.exp * 1000 < Date.now() &&
    decodedRefresh.exp * 1000 < Date.now()
  ) {
    console.log("both expired");
    localStorage.clear();
    window.location.reload();
  }
});

export default axiosInstance;
