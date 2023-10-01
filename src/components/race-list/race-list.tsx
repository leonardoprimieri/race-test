import { RacerModel } from "@/models/racer-model";
import { RaceControls } from "./components/race-controls";
import { useRaceList } from "./hooks/use-race-list";

export const RaceList = () => {
  const {
    orderedRacersByLikehook,
    startRace,
    getRacers,
    raceStatus,
    racers,
    isLoading,
  } = useRaceList();

  const handleLikelihookLabel = (racer: RacerModel) => {
    if (!racer.likelihood) {
      return "Not yet calculated";
    }

    return racer.likelihood.toFixed(2);
  };

  return (
    <div className="p-3 flex items-center justify-center flex-col">
      <h1 className="text-5xl my-6 font-extrabold uppercase">Race App</h1>

      {!racers.length && (
        <div className="text-center">
          <p className="text-md font-bold">Get racers to start!</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center">
        {orderedRacersByLikehook().map((racer) => (
          <div
            key={racer.name}
            className="flex bg-blue-100 w-64 flex-col h-40 rounded-lg p-2 m-2"
          >
            <div className="text-center">
              <p className="text-md font-bold">{racer.name}</p>
            </div>
            <div className="flexitems-center flex-col mt-3">
              <div className="mr-2">Weight: {racer.weight}</div>
              <div className="mr-2">Length: {racer.length}</div>
            </div>
            <div className="mt-3">
              <p className="text-md font-bold">Likelihood to win:</p>
              <p>{handleLikelihookLabel(racer)}</p>
            </div>
          </div>
        ))}
      </div>
      <RaceControls
        getRacers={getRacers}
        isLoading={isLoading}
        raceStatus={raceStatus}
        racers={racers}
        startRace={startRace}
      />
      <h1 className="text-lg mt-6">Race Status: {raceStatus}</h1>
    </div>
  );
};
