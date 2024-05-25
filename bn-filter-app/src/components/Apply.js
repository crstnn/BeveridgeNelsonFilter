import {useNavigate, useSearchParams} from "react-router-dom";
import {keyValueArraysToObject, maybeConvertStringToBool, maybeConvertStringToNumber} from "../utils/utils";
import {FRED, LOADING_STEP, MODEL_QUERY_PARAMS} from "../utils/consts";

const Apply = ({handlers}) => {
    const {setState} = handlers;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const queryParamValues = MODEL_QUERY_PARAMS
        .map(x => searchParams.get(x))
        .map(maybeConvertStringToBool)
        .map(maybeConvertStringToNumber);
    const queryParams = keyValueArraysToObject(MODEL_QUERY_PARAMS, queryParamValues);

    console.log(queryParams)


    // set loading page
    setState({
        step: LOADING_STEP,
        isLoading: true,
        dataInputType: FRED,
        ...queryParams,
    });

    navigate('/') // base

    // TODO

    // setTimeout(() => {
    //     setState({
    //         step: 2,
    //     });
    // }, 5000)


}

export default Apply
