class DateAbstract extends Date {

    static createDate = (key, date) => {
        switch (key) {
            case "a":
                return new AnnualDate(date);
            case "sa":
                return new SemiAnnualDate(date);
            case "q":
                return new QuarterlyDate(date);
            case "m":
                return new MonthlyDate(date);
            case "b":
                return new BiWeeklyDate(date);
            case "w":
                return new WeeklyDate(date);
            default:
                throw new Error("Non-existent key");
        }
    };

    static toFixedTwoDigits = d => d.toString().length === 1 ? '0' + d : d;

    static truncatedDate = date => `${date.getFullYear()}-${DateAbstract.toFixedTwoDigits(date.getMonth() + 1)}-${DateAbstract.toFixedTwoDigits(date.getDate())}`;

    static maybeConvertStringToDate = str => {
        if (typeof str === 'string' && /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/.test(str)) {
            const parsedDate = str.split("-").map(x => Number(x))
            return new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2])
        }
        return str;
    }

    nextTimePeriod = () => {
        throw new Error("Child class must implement this method");
    };

    getDateSeries = periods => {
        let currDate = this, retDate = this;
        return Array.from({length: periods}).map(() => {
            retDate = currDate;
            currDate = currDate.nextTimePeriod();
            return retDate;
        })
    };

    getDateSeriesUpToMaxDate = (maxDate) => {
        let currDate = this, retDate = this;
        const maximumDate = DateAbstract.maybeConvertStringToDate(maxDate);

        const series = [currDate];
        while (currDate <= maximumDate) {
            retDate = currDate;
            currDate = currDate.nextTimePeriod();
            series.push(retDate);
        }

        return series;
    };
}

class WeeklyDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new WeeklyDate(this);
        return new WeeklyDate(oldDate.setDate(this.getDate() + (7 * times)));
    };
}

class BiWeeklyDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new WeeklyDate(this);
        return new WeeklyDate(oldDate.setDate(this.getDate() + (14 * times)));
    };
}

class MonthlyDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new MonthlyDate(this);
        return new MonthlyDate(oldDate.setMonth(this.getMonth() + times));
    };
}

class QuarterlyDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new QuarterlyDate(this);
        return new QuarterlyDate(oldDate.setMonth(this.getMonth() + (3 * times)));
    };
}

class SemiAnnualDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new SemiAnnualDate(this);
        return new SemiAnnualDate(oldDate.setMonth(this.getMonth() + (6 * times)));
    };
}

class AnnualDate extends DateAbstract {
    nextTimePeriod = (times = 1) => {
        const oldDate = new AnnualDate(this);
        return new AnnualDate(oldDate.setFullYear(this.getFullYear() + times));
    };
}

export {DateAbstract, WeeklyDate, MonthlyDate, QuarterlyDate, AnnualDate}
