import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const applyCoupen = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);

  return response.data;
};


const couponService = {
  applyCoupen,

};

export default couponService;
