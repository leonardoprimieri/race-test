import { RacerModel } from "@/models/racer-model";
import { RacersService } from "@/services/racers-service";
import { useState } from "react";

const racersService = new RacersService();

export const useGetRacersQuery = () => {
  const [racers, setRacers] = useState<RacerModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRacers = async () => {
    setIsLoading(true);

    const response = await racersService.getAll();

    setRacers(response.data.racers);
    setIsLoading(false);
  };

  return { racers, setRacers, queryFn: getRacers, isLoading };
};
