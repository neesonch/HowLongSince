

export const getSecondsSinceTimeStamp = (unixSeconds) => {
    const currentUnixTime = getCurrentUnixTime();
    const secondsSinceTimeStamp = (currentUnixTime - unixSeconds)
    return secondsSinceTimeStamp;
};

// Needs test
export const getCurrentUnixTime = () => Math.floor(Date.now()/1000);


export const convertSecondsToTimer = (unixSeconds) => {
    const seconds = Number(unixSeconds);
    const timerYears = Math.floor(seconds / 31536000);
    const timerDays = Math.floor(seconds % 31536000 / 86400);
    const timerHours = Math.floor(seconds % 86400 / 3600);
    const timerMinutes = Math.floor(seconds % 3600 / 60);
    const timerSeconds = Math.floor(seconds % 3600 % 60);

    return {timerYears, timerDays, timerHours, timerMinutes, timerSeconds};
};

export const convertTimestampToTimer = (unixSeconds) => convertSecondsToTimer(getSecondsSinceTimeStamp(unixSeconds));
