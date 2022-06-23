const colsToRows = (...columns) => {

    columns = columns.filter(x => x !== undefined)

    // Pre-condition: All arrays are same length
    const
        rowLength = columns.length,
        colLength = columns[0].length;

    const retArr = [];

    for (let c = 0; c < colLength; c++) {
        const row = [];
        for (let r = 0; r < rowLength; r++) {
            row.push(columns[r][c]);
        }
        retArr.push(row)
    }
    return retArr;
};

const confIntZip = (cycle, ci, bound) => cycle.map((x, i) => bound === "lb" ? x - ci[i] : /* ub */ x + ci[i]);

export {colsToRows, confIntZip}