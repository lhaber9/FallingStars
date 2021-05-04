export function pauseForMilliseconds(ms: number) : Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}


export type Optional<T> = T | null | undefined;
