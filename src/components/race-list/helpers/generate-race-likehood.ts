export function generateRacerWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning = Math.random();

  return (callback: (likelihood: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
}
