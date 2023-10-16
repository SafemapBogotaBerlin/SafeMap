import { formatTimeDifference } from "../src/services/formatTime"

describe('Testd for format time difference', () => {

  it("Should format current timestamp", () => {
    const now = Date.now();
    expect(formatTimeDifference(now)).toEqual('Added just now');
  });

  it('Should format 3 hours 3 minutes ago', () => {
    const now = Date.now()
    const threeHours = 3 * 60 * 60 * 1000;
    const threeMinutes = 3*60*1000
    const threeHoursAndMinutesAgo = now-threeHours-threeMinutes
    expect(formatTimeDifference(threeHoursAndMinutesAgo)).toEqual('Added 3 hours and 3 minutes ago');

  })

})