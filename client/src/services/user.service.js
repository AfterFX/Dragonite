import http from "../http-common";
import authHeader from './auth-header';





class UserService {
  getPublicContent() {
    return http.get("user/all");
  }

  getUserBoard() {
    return http.get( "user/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get( "user/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get( "user/admin", { headers: authHeader() });
  }

  changeNickname(data) {
    return http.put( "user/changeUsername", data, { headers: authHeader() });
  }
}

export default new UserService();
