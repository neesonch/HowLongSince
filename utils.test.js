import { convertSecondsToTimer, getSecondsSinceTimeStamp } from "./utils";


it('getSecondsSinceTimeStamp returns 0 when given current time stamp', () => {
    expect(getSecondsSinceTimeStamp(Math.floor(Date.now()/1000))).toBe(0);
});



it('convertSecondsToTimer returns the expected values when given a unix time stamp', () => {
    // 31626061 is 2 January 1971 01:01:01 - i.e., 1 year, 1 day, 1 hour, 1 minute, and 1 second after start of Unix time -
    const expected = {
        timerYears: 1,
        timerDays: 1,
        timerHours: 1,
        timerMinutes: 1,
        timerSeconds: 1
    };
    expect(convertSecondsToTimer(31626061)).toEqual(expected);
});