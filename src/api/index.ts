import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import ReactHook from "alova/react";

export const alovaInstance = createAlova({
  baseURL: "https://api.ecopaste.cn",
  statesHook: ReactHook,
  cacheFor: {
    GET: {
      mode: "restore",
      expire: 1000 * 60 * 10,
    },
  },
  requestAdapter: adapterFetch(),
  responded: (response) => response.json(),
});
