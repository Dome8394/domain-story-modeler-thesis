import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util';
import { setupTemplateObject } from '../classes/setupTemplateObject';


export const saveLoadTestTemplateToLocalStorage = (selectedID) => {
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)

    let getDescriptionInputElement = document.getElementById(`loadTestDescription__input_${selectedID}`);
    let getDescriptionValue = getDescriptionInputElement.value;

    let getDurationInputElement = document.getElementById(`duration__input_${selectedID}`);
    let getDurationValue = getDurationInputElement.value;

    let getNumberOfSimulatedRequestsInputElement = document.getElementById(`numberOfSimulatedRequests__input_${selectedID}`);
    let getNumberOfSimulatedRequestsValue = getNumberOfSimulatedRequestsInputElement.value;

    if (verifyLoadTestTemplate(getDurationValue, getNumberOfSimulatedRequestsValue, selectedID)) {
        
        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }
        
        let serviceName = getNodeName(selectedID);
        
        /**
         * This is probably not necessary for the future...
         */
        if (serviceName === '') {
            console.log('Please give the node a proper name that matches the architectural mapping!');
            return;
        }
        
        const newLoadTestTemplateObj = new LoadTestTemplate(
            getDescriptionValue,
            serviceName,
            getDurationValue,
            getNumberOfSimulatedRequestsValue);
            
        setupTemplateObject(newLoadTestTemplateObj, 'LOADTEST');
        
        if (!getSummaryView) {
            createSummaryView(newLoadTestTemplateObj);
        } else {
            createNewSummaryForTemplate(newLoadTestTemplateObj);
        }

        getLoadTestTemplateModal.style.display = 'none';

    }


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