class DateS extends Date {

    nextTimePeriod = () => { throw new Error("Child class must implement this method"); };

    getDateArray = len => {
        let currDate = this
        return Array.from({length: len}).map((_, idx) => {
            const retDate = idx === 0 ? currDate : currDate.nextTimePeriod();
            currDate = currDate.nextTimePeriod()
            return retDate
        })
    };

    static createDate = (key, date) => {
        switch (key) {
            case "y": return new YearlyDate(date)
            case "q": return new QuarterlyDate(date)
            case "m": return new MonthlyDate(date)
            case "w": return new WeeklyDate(date)
            default: throw new Error("Non-existent key");
        }
    };

    static getTruncatedDate = (date) => date.toJSON().slice(0, 10);
}

class WeeklyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new WeeklyDate(this);
        return new WeeklyDate(oldDate.setDate(this.getDate() + 7));
    };
}

class MonthlyDate extends DateS{
    nextTimePeriod = () => {
        const oldDate = new MonthlyDate(this);
        return new MonthlyDate(oldDate.setMonth(this.getMonth() + 1));
    };
}

class QuarterlyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new QuarterlyDate(this);
        return new QuarterlyDate(oldDate.setMonth(this.getMonth() + 4));
    };
}

class YearlyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new YearlyDate(this);
        return new YearlyDate(oldDate.setFullYear(this.getFullYear() + 1));
    };
}

export {DateS, WeeklyDate, MonthlyDate, QuarterlyDate, YearlyDate}
