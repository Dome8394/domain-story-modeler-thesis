import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';
import { createSummaryView } from '../summaryView';


export const saveLoadTestTemplateToLocalStorage = () => {
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');
    
    let getSummaryView = document.getElementById('summaryViewModal');
    
    let getHttpEndpointSelectElement = document.getElementById('availableMeasureEndpoints__select');
    let getSelectedHttpEndpoint = getHttpEndpointSelectElement.value;
    
    let getDescriptionInputElement = document.getElementById('loadTestDescription__input');
    let getDescriptionValue = getDescriptionInputElement.value;
    
    let getDurationInputElement = document.getElementById('duration__input');
    let getDurationValue = getDurationInputElement.value;
    
    let getNumberOfSimulatedRequestsInputElement = document.getElementById('numberOfSimulatedRequests__input');
    let getNumberOfSimulatedRequestsValue = getNumberOfSimulatedRequestsInputElement.value;
    
    if(verifyLoadTestTemplate(getDurationValue, getNumberOfSimulatedRequestsValue)) {
        console.log("Saving loadtest template...");
        const newLoadTestTemplateObj = new LoadTestTemplate(getDescriptionValue, getSelectedHttpEndpoint, getDurationValue, getNumberOfSimulatedRequestsValue);
        localStorage.setItem('loadTestTemplateObj', newLoadTestTemplateObj);
        console.log("New object stored: ", newLoadTestTemplateObj);
        getGenerateAndPush__btn.disabled = false;
        
    }
    
    console.log('');
    
    if (!getSummaryView) {
        createSummaryView();
    }
    
}


const verifyLoadTestTemplate = (loadTestDuration, numberSelectedRequests) => {
    console.log("Verify template content...");
    let getDurationInputElement = document.getElementById('duration__input');
    let getLoadTestDuration__invalid = document.getElementById('duration__input__invalid');
    
    let getNumberOfSimulatedRequestsInputElement = document.getElementById('numberOfSimulatedRequests__input');
    let getNumberOfSimulatedRequests__input__invalid = document.getElementById('numberOfSimulatedRequests__input__invalid');
    
    if (!loadTestDuration) {
        console.log("Please give a duration in minutes!");
        getLoadTestDuration__invalid.style.display = 'block';
        getDurationInputElement.style.borderColor = 'red';
    } else {
        getLoadTestDuration__invalid.style.display = 'none';
        getDurationInputElement.style.borderColor = 'springgreen';
    }
    
    if (!numberSelectedRequests) {
        console.log("Please provide a number for simulated requests!");
        getNumberOfSimulatedRequests__input__invalid.style.display = 'block';
        getNumberOfSimulatedRequestsInputElement.style.borderColor = 'red';
        return false;
        
    } else {
        getNumberOfSimulatedRequests__input__invalid.style.display = 'none';
        getNumberOfSimulatedRequestsInputElement.style.borderColor = 'springgreen';
    }
    
    return true;
    
}