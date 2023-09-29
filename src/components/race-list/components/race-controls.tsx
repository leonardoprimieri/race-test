import { RacerModel } from "@/models/racer-model";
import { RaceStatusesEnum } from "../enums/race-statuses-enum";

type Props = {
  raceStatus: RaceStatusesEnum;
  racers: RacerModel[];
  isLoading: boolean;
  startRace: () => void;
  getRacers: () => void;
};

export const RaceControls = ({
  getRacers,
  isLoading,
  raceStatus,
  racers,
  startRace,
}: Props) => {
  return (
    <div className="flex gap-3 mt-6">
      <button
        disabled={isLoading || raceStatus === RaceStatusesEnum.IN_PROGRESS}
        className="bg-blue-600 p-3 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={getRacers}
      >
        {racers && racers.length ? "Refresh Racers" : "Get Racers"}
      </button>
      <button
        disabled={
          !racers.length ||
          isLoading ||
          raceStatus === RaceStatusesEnum.IN_PROGRESS ||
          raceStatus === RaceStatusesEnum.ALL_CALCULATED
        }
        className="bg-blue-600 p-3 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={startRace}
      >
        Start Race
      </button>
    </div>
  );
};
