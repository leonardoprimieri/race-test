export function generateRacerWinLikelihoodCalculator() {
  const delay = 2000 + Math.random() * 2000;
  const likelihoodOfRacerWinning = Math.random();

  return (callback: (likelihood: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
}
