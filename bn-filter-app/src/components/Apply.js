import {useNavigate, useSearchParams} from "react-router-dom";
import {keyValueArraysToObject, maybeConvertStringToBool, maybeConvertStringToNumber} from "../utils/utils";
import {DateAbstract} from "../utils/date";
import {FRED, LOADING_STEP, MODEL_QUERY_PARAMS, PARAMETERS_STEP} from "../utils/consts";

const Apply = ({getResults, cancelLoading, handlers}) => {
    const {setState} = handlers;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const queryParamValues = MODEL_QUERY_PARAMS
        .map(x => searchParams.get(x))
        .map(maybeConvertStringToBool)
        .map(maybeConvertStringToNumber)
        .map(DateAbstract.maybeConvertStringToDate);
    const queryParams = keyValueArraysToObject(MODEL_QUERY_PARAMS, queryParamValues);

    console.log(queryParams);


    // set loading page
    setState({
        step: LOADING_STEP,
        isLoading: true,
        dataInputType: FRED,
        ...queryParams,
    });

    navigate('/'); // base

    const onFetchErrorCallback = () => {
        setState({PARAMETERS_STEP});
        cancelLoading();
    }

    getResults(() => 0, () => null, onFetchErrorCallback)();
}

export default Apply;
