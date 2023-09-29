import { api } from "@/api/axios";
import { RacerModel } from "@/models/racer-model";
import { AxiosResponse } from "axios";

export class RacersService {
  async getAll(): Promise<
    AxiosResponse<{
      racers: RacerModel[];
    }>
  > {
    return await api.get("/racers");
  }
}
