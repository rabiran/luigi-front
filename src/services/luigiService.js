import http from "../http-common";

const sendLuigi = data => {
    return http.post("/luigi", data);
  };

export { sendLuigi };

