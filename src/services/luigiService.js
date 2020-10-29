import http from "../http-common";

const sendLuigi = data => {
    return http.post("/luigi", data);
  };

  const getDataSources = () => {
    return http.get("/dataSources");
  };


export { sendLuigi, getDataSources };

