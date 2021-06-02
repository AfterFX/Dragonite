import http from "../http-common";
import authHeader from './auth-header'

class RenderBattleResult {
  loadBattle() {
    return http.get("/battle", { headers: authHeader() });
  }

  attack(data){
    return http.put( "/battle", data, { headers: authHeader() });
  }
}

export default new RenderBattleResult();