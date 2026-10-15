import axios from "axios";
import { serverApi } from "../../lib/config";

import { Occasion } from "../../lib/types/occasion";

export default class OccasionService {
  async getOccasions(): Promise<Occasion[]> {
    const result = await axios.get(`${serverApi}/occasion/all`);

    return result.data.result;
  }
}
