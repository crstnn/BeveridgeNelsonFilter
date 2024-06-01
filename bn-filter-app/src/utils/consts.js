export const MODEL_QUERY_PARAMS = [
    'mnemonicFRED',
    'startDate',
    'endDate',
    'frequency',
    'delta',
    'deltaSelect',
    'demean',
    'iterativeBackcasting',
    'rollingWindow',
    'displayConfInt',
    'transform'
];

export const MODEL_PARAMS = [
    'mnemonic',
    'startDateFRED',
    'endDateFRED',
    'frequencyFRED',
    'delta',
    'deltaSelect',
    'demean',
    'iterativeBackcasting',
    'rollingWindow',
    'displayConfInterval',
    'transform'
];

export const TRANSFORMATION_PARAMS = [
    'pCode',
    'dCode',
    'takeLog',
];

export const TRANSFORMATION_QUERY_PARAMS = TRANSFORMATION_PARAMS;

export const NO_TRANSFORMATION_KEY_VALUES = {
    'pCode': 'np',
    'dCode': 'nd',
    'takeLog': false,
};

export const PARAMETERS_STEP = 3;
export const LOADING_STEP = 4;

export const FRED = 'FRED';
export const USER = 'USER';