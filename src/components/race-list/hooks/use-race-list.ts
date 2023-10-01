import { useEffect, useMemo, useState } from "react";
import { useGetRacersQuery } from "./use-get-racers-query";
import { RaceStatusesEnum } from "../enums/race-statuses-enum";
import { generateRacerWinLikelihoodCalculator } from "../helpers/generate-race-likehood";

export const useRaceList = () => {
  const { queryFn, racers, setRacers, isLoading } = useGetRacersQuery();

  const [raceStatus, setRaceStatus] = useState<RaceStatusesEnum>(
    RaceStatusesEnum.NOT_YET_RUN
  );

  const orderedRacersByLikelihood = () => {
    if (racers.length === 0) return [];

    const orderedRacers = [...racers];
    orderedRacers.sort((a, b) => {
      if (a.likelihood === undefined) return 1;
      if (b.likelihood === undefined) return -1;

      return b.likelihood - a.likelihood;
    });
    return orderedRacers;
  };

  const startRace = () => {
    setRaceStatus(RaceStatusesEnum.IN_PROGRESS);

    racers.forEach((racer) => {
      const calculatePositions = generateRacerWinLikelihoodCalculator();

      calculatePositions((likelihood) => {
        setRacers((prevRacers) => {
          const racerIndex = prevRacers.findIndex(
            (prevRacer) => prevRacer.name === racer.name
          );
          const newRacers = [...prevRacers];
          newRacers[racerIndex] = {
            ...newRacers[racerIndex],
            likelihood,
          };
          return newRacers;
        });
      });
    });
  };

  const getRacers = () => {
    setRaceStatus(RaceStatusesEnum.NOT_YET_RUN);
    queryFn();
  };

  useEffect(() => {
    if (racers.length === 0) return setRaceStatus(RaceStatusesEnum.NOT_YET_RUN);

    if (racers.every((racer) => racer.likelihood > 0)) {
      setRaceStatus(RaceStatusesEnum.ALL_CALCULATED);
    }
  }, [racers]);

  return {
    orderedRacersByLikelihood,
    startRace,
    getRacers,
    raceStatus,
    racers,
    isLoading,
  };
};
