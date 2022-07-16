class DateS extends Date {

    static createDate = (key, date) => {
        switch (key) {
            case "a":
                return new AnnualDate(date);
            case "q":
                return new QuarterlyDate(date);
            case "m":
                return new MonthlyDate(date);
            case "w":
                return new WeeklyDate(date);
            default:
                throw new Error("Non-existent key");
        }
    };

    static toFixedTwoDigits = d => d.toString().length === 1 ? '0' + d : d;

    static getTruncatedDate = (date) => `${date.getFullYear()}-${DateS.toFixedTwoDigits(date.getMonth() + 1)}-${DateS.toFixedTwoDigits(date.getDate())}`;

    nextTimePeriod = () => {
        throw new Error("Child class must implement this method");
    };

    getDateArray = len => {
        let currDate = this, retDate = this;
        return Array.from({length: len}).map(() => {
            retDate = currDate;
            currDate = currDate.nextTimePeriod();
            return retDate;
        })
    };
}

class WeeklyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new WeeklyDate(this);
        return new WeeklyDate(oldDate.setDate(this.getDate() + 7));
    };
}

class MonthlyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new MonthlyDate(this);
        return new MonthlyDate(oldDate.setMonth(this.getMonth() + 1));
    };
}

class QuarterlyDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new QuarterlyDate(this);
        return new QuarterlyDate(oldDate.setMonth(this.getMonth() + 3));
    };
}

class AnnualDate extends DateS {
    nextTimePeriod = () => {
        const oldDate = new AnnualDate(this);
        return new AnnualDate(oldDate.setFullYear(this.getFullYear() + 1));
    };
}

export {DateS, WeeklyDate, MonthlyDate, QuarterlyDate, AnnualDate}
