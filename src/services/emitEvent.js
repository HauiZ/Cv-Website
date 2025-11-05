import axios from "../utils/axios.customize.js";

/** Gọi giống API khác, trả cấu trúc giống axios để dùng với useCustomMutation */
export const emitEvent = async (payload) => {
  const body = { event_ts: new Date().toISOString(), ...payload };
  // const res = await axios.post("/events/collect", body);
  // return res?.data?.message ? res : { ...res, data: { ...(res.data||{}), message: "Event logged" } };
  return await axios.post("/events/collect", body);
};
