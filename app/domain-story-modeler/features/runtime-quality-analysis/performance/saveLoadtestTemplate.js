import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util/util';
import { setupTemplateObject } from '../classes/setupTemplateObject';
import { getNodeRectElementAndSetColor } from '../util/util';


export const saveLoadTestTemplateToLocalStorage = (selectedID) => {
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)

    let getLoadPeakCheckbox = document.getElementById(`stimulusLoadPeak__checkbox_${selectedID}`);
    let getLoadPeakChecked = getLoadPeakCheckbox.checked;

    let getContinuousLoadCheckbox = document.getElementById(`stimulusContinuous__checkbox_${selectedID}`);
    let getContinuousLoadChecked = getContinuousLoadCheckbox.checked;
    
    let getConstantLoadCheckbox = document.getElementById(`stimulusConstant__checkbox_${selectedID}`);
    let getConstantLoadChecked = getConstantLoadCheckbox.checked;

    let getResponseTimeElement = document.getElementById(`stimulusResponseTimes__input_${selectedID}`);
    let getResponseTime = getResponseTimeElement.value;

    let getResultResponseTimesElement = document.getElementById(`responseTime__input_${selectedID}`);
    let getResultResponseTimes = getResultResponseTimesElement.checked;
    
    let getNinetyPercentileElement = document.getElementById(`percentileNinety__input_${selectedID}`);
    let getNinetPercentile = getNinetyPercentileElement.checked;
    
    let getNinetyFivePercentileElement = document.getElementById(`percentileNinetyFive__input_${selectedID}`);
    let getNinetyFivePercentile = getNinetyFivePercentileElement.checked;

    let getDurationElement = document.getElementById(`duration__input_${selectedID}`);
    let getDuration = getDurationElement.value;

    if (verifyMandatory(
        selectedID,
        getLoadPeakChecked,
        getContinuousLoadChecked,
        getConstantLoadChecked,
        getDuration,
        getResponseTime,
        getResultResponseTimes,
        getNinetPercentile,
        getNinetyFivePercentile)) {

        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }

        let artifact = getNodeName(selectedID);
        let stimulus;

        let responseMeasure = {
            "Response times below": getResponseTime + ' milliseconds'
        };

        let environment = {
            "Duration": getDuration + ' minutes'
        };

        if (getLoadPeakChecked) {
            let getLoadPeakInput = document.getElementById(`peakLoad__input_${selectedID}`);
            let getLoadPeak = getLoadPeakInput.value;
            stimulus = {
                "Type": "Peak Load",
                "Load profile": getLoadPeak + ' requests/hour'
            }
        } else if (getContinuousLoadChecked) {
            let getContinuousLoadDurationElement = document.getElementById(`continuousLoadDuration__input_${selectedID}`);
            let getContinuousLoadDuration = getContinuousLoadDurationElement.value;
            
            let getContinuousLoadProfileElement = document.getElementById(`continuousLoadProfile__input_${selectedID}`);
            let getContinuousLoadProfile = getContinuousLoadProfileElement.value;
            
            stimulus = {
                "Type": "Continuous Load",
                "Load profile": getContinuousLoadProfile + ' requests/hour',
                "Duration of Increase": getContinuousLoadDuration + ' minutes'
            }
        } else if(getConstantLoadChecked) {
            let getConstantLoadElement = document.getElementById(`numberActiveUsers__input_${selectedID}`);
            let getConstantLoad = getConstantLoadElement.value;
            stimulus = {
                "Type": "Constant Load",
                "Load profile": getConstantLoad + ' requests/hour'
            }
        }
        
        let resultMetrics;
        
        if (getResultResponseTimes && getNinetPercentile && getNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "Response Times" },
                    { "Metric": "90th Percentile" },
                    { "Metric": "95th Percentile" }
                ]
            }
        } else if (getResultResponseTimes && getNinetPercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "Response Times" },
                    { "Metric": "90th Percentile"}
                ]
            }
        } else if (getResultResponseTimes && getNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "Response Times" },
                    { "Metric": "95th Percentile" }
                ]
            }
        } else if (getNinetPercentile && getNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "90th Percentile" },
                    { "Metric": "95th Percentile" }
                ]
            }
        } else if (getNinetPercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "90th Percentile" },
                ]
            }
        } else if (getNinetyFivePercentile){
            resultMetrics = {
                "Result Metric includes": [
                    { "Metric": "90th Percentile" },
                ]
            }
        }

        /**
         * This is probably not necessary for the future...
         */
        if (artifact === '') {
            console.log('Please give the node a proper name that matches the architectural mapping!');
            return;
        }

        const newLoadTestTemplateObj = new LoadTestTemplate(
            artifact,
            stimulus,
            environment,
            responseMeasure,
            resultMetrics
        );

        setupTemplateObject(newLoadTestTemplateObj, 'LOADTEST');

        if (!getSummaryView) {
            createSummaryView(newLoadTestTemplateObj);
        } else {
            createNewSummaryForTemplate(newLoadTestTemplateObj);
        }

        getNodeRectElementAndSetColor(selectedID, true);
        getLoadTestTemplateModal.style.display = 'none';

    }


}

const verifyMandatory = (
    selectedID,
    loadPeakChecked,
    continuousLoadChecked,
    constantLoadChecked,
    duration,
    responseTime,
    resultResponseTimesChecked,
    resultNinetyPercentileChecked,
    resultNinetyFivePercentileChecked) => {


    if ((loadPeakChecked || continuousLoadChecked || constantLoadChecked) && duration && responseTime && (resultResponseTimesChecked || resultNinetyPercentileChecked || resultNinetyFivePercentileChecked)) {
        
        if (loadPeakChecked) {
            let getPeakLoadInput = document.getElementById(`peakLoad__input_${selectedID}`);
            let getPeakLoad = getPeakLoadInput.value;
            
            let getTimeToPeakInput = document.getElementById(`timeToPeakLoad__input_${selectedID}`);
            let getTimeToPeak = getTimeToPeakInput.value;
            
            if (getPeakLoad && getTimeToPeak) {
                return true;
            } else {
                return false;
            }
            
        } else if (continuousLoadChecked) {
            let getContinousIncreaseDurationElement = document.getElementById(`continuousLoadDuration__input_${selectedID}`);
            let getContinousIncrease = getContinousIncreaseDurationElement.value;
            
            if (!getContinousIncrease) {
                return false;
            }
            
        } else if (constantLoadChecked) {
            let getSimulatedLoadElement = document.getElementById(`numberActiveUsers__input_${selectedID}`);
            let getSimulatedLoad = getSimulatedLoadElement.value;
            
            if (!getSimulatedLoad) {
                return false;
            }
        }
        return true;
    }
    
    console.log("Mandatory fields are missing!");
    return false;
}

const verifyLoadTestTemplate = (loadTestDuration, numberSelectedRequests, selectedID) => {
    let getDurationInputElement = document.getElementById(`duration__input_${selectedID}`);

    let getLoadTestDuration__invalid = document.getElementById(`duration__input__invalid_${selectedID}`);

    let getNumberOfSimulatedRequestsInputElement = document.getElementById(`numberOfSimulatedRequests__input_${selectedID}`);
    let getNumberOfSimulatedRequests__input__invalid = document.getElementById(`numberOfSimulatedRequests__input__invalid_${selectedID}`);

    if (!loadTestDuration) {
        getLoadTestDuration__invalid.style.display = 'block';
        getDurationInputElement.style.borderColor = 'red';
    } else {
        getLoadTestDuration__invalid.style.display = 'none';
        getDurationInputElement.style.borderColor = 'springgreen';
    }

    if (!numberSelectedRequests) {
        getNumberOfSimulatedRequests__input__invalid.style.display = 'block';
        getNumberOfSimulatedRequestsInputElement.style.borderColor = 'red';
        return false;

    } else {
        getNumberOfSimulatedRequests__input__invalid.style.display = 'none';
        getNumberOfSimulatedRequestsInputElement.style.borderColor = 'springgreen';
    }

    return true;

}