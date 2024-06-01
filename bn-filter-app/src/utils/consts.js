export const MODEL_QUERY_PARAMS = [
    'm',
    'sd',
    'ed',
    'f',
    'd',
    'ds',
    'dm',
    'ib',
    'rw',
    'dci',
    't'
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

export const TRANSFORMATION_QUERY_PARAMS = [
    'pCode',
    'dCode',
    'takeLog',
];


export const TRANSFORMATION_PARAMS = [
    'pc',
    'dc',
    'tl',
];


export const NO_TRANSFORMATION_KEY_VALUES = {
    'pCode': 'np',
    'dCode': 'nd',
    'takeLog': false,
};

export const PARAMETERS_STEP = 3;
export const LOADING_STEP = 4;

export const FRED = 'FRED';
export const USER = 'USER';