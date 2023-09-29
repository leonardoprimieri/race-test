import { RacerModel } from "@/models/racer-model";
import { RacersService } from "@/services/racers-service";
import { useState } from "react";

const racersService = new RacersService();

export const useGetRacersQuery = () => {
  const [racers, setRacers] = useState<RacerModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRacers = async () => {
    setIsLoading(true);

    const racers = await racersService.getAll();

    setRacers(racers.data.racers);
    setIsLoading(false);
  };

  return { racers, setRacers, getRacers, isLoading };
};
