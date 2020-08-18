export const sleep = (n: number) => new Promise((r) => setTimeout(r, n));

// export const img = (path: string) => `${path}`;

// export const msToTime = (d: number) => {
//   var seconds = Math.floor((d / 1000) % 60),
//     minutes = Math.floor((d / (1000 * 60)) % 60);

//   return minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds);
// };
