import { format, addSeconds } from 'date-fns';

export function formatSecondsToMMSS(seconds) {
  const date = addSeconds(new Date(0), seconds);
  return format(date, 'mm:ss');
}