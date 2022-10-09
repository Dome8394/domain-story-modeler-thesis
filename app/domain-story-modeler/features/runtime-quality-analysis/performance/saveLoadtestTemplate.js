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

    let getResponseTimeElement = document.getElementById(`stimulusResponseTimes__input_${selectedID}`);
    let getResponseTime = getResponseTimeElement.value;

    let getDurationInputElement = document.getElementById(`duration__input_${selectedID}`);
    let getDurationValue = getDurationInputElement.value;

    let getNumberActiveUsersElement = document.getElementById(`numberActiveUsers__input_${selectedID}`);
    let getNumberActiveUsers = getNumberActiveUsersElement.value;


    if (verifyMandatory(
        getLoadPeakChecked,
        getContinuousLoadChecked,
        getDurationValue,
        getResponseTime,
        getNumberActiveUsers)) {

        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }

        let artifact = getNodeName(selectedID);
        let stimulus;

        let responseMeasure = {
            "Response times below": getResponseTime + 'milliseconds'
        };

        let environment = {
            "Duration": getDurationValue + 'minutes'
        };

        if (getLoadPeakChecked) {
            let getLoadPeakInput = document.getElementById(`peakLoad__input_${selectedID}`);
            let getLoadPeak = getLoadPeakInput.value;
            stimulus = {
                "Type": "Peak load",
                "Number active users": getNumberActiveUsers,
                "Peak Load at": getLoadPeak + 'requests/hour'
            }
        } else if (getContinuousLoadChecked) {
            let getContinuousLoadInput = document.getElementById(`continuousLoadDuration__input_${selectedID}`);
            let getContinuousLoad = getContinuousLoadInput.value;
            stimulus = {
                "Type": "Continuous Load",
                "Number active users": getNumberActiveUsers,
                "Duration of Increase": getContinuousLoad + 'minutes'
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
            responseMeasure
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
    loadPeakChecked,
    continuousLoadChecked,
    duration,
    responseTime,
    numberActiveUsers) => {


    if ((loadPeakChecked || continuousLoadChecked) && duration && responseTime && numberActiveUsers) {
        return true;
    }

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