export function formatTimeDifference(timestamp: number): string {
  const currentTime: number = Date.now();

  const timeDifferenceInMilliseconds: number = currentTime - timestamp;

  const hours: number = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60)
  );
  const minutes: number = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (hours >= 1) {
    return `Added ${hours} hour${hours > 1 ? 's' : ''}${
      minutes > 0
        ? ' and ' + minutes + ' minute' + (minutes > 1 ? 's' : '')
        : ''
    } ago`;
  } else if (minutes > 0) {
    return `Added ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Added just now';
  }
}
