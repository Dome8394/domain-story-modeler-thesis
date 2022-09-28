import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util';


export const saveLoadTestTemplateToLocalStorage = (selectedID) => {
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)

    let getDescriptionInputElement = document.getElementById('loadTestDescription__input');
    let getDescriptionValue = getDescriptionInputElement.value;

    let getDurationInputElement = document.getElementById('duration__input');
    let getDurationValue = getDurationInputElement.value;

    let getNumberOfSimulatedRequestsInputElement = document.getElementById('numberOfSimulatedRequests__input');
    let getNumberOfSimulatedRequestsValue = getNumberOfSimulatedRequestsInputElement.value;

    if (verifyLoadTestTemplate(getDurationValue, getNumberOfSimulatedRequestsValue)) {
        
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
        
        console.log(getNumberOfSimulatedRequestsValue);

        const newLoadTestTemplateObj = new LoadTestTemplate(
            getDescriptionValue,
            serviceName,
            getDurationValue,
            getNumberOfSimulatedRequestsValue);
            
        localStorage.setItem('loadTestTemplateObj', newLoadTestTemplateObj);
        console.log(newLoadTestTemplateObj);
        if (!getSummaryView) {
            createSummaryView(newLoadTestTemplateObj);
        } else {
            createNewSummaryForTemplate(newLoadTestTemplateObj);
        }

        getLoadTestTemplateModal.style.display = 'none';

    }


}


const verifyLoadTestTemplate = (loadTestDuration, numberSelectedRequests) => {
    let getDurationInputElement = document.getElementById('duration__input');
    let getLoadTestDuration__invalid = document.getElementById('duration__input__invalid');

    let getNumberOfSimulatedRequestsInputElement = document.getElementById('numberOfSimulatedRequests__input');
    let getNumberOfSimulatedRequests__input__invalid = document.getElementById('numberOfSimulatedRequests__input__invalid');

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