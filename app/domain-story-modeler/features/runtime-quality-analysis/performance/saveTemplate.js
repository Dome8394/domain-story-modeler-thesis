import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';


export const saveLoadTestTemplateToLocalStorage = () => {
    let getHttpEndpointSelectElement = document.getElementById('availableMeasureEndpoints__select');
    let getSelectedHttpEndpoint = getHttpEndpointSelectElement.value;
    
    let getDescriptionInputElement = document.getElementById('loadTestDescription__input');
    let getDescriptionValue = getDescriptionInputElement.value;
    
    let getDurationInputElement = document.getElementById('duration__input');
    let getDurationValue = getDurationInputElement.value;
    
    let getNumberOfSimulatedRequestsInputElement = document.getElementById('numberOfSimulatedRequests__input');
    let getNumberOfSimulatedRequestsValue = getNumberOfSimulatedRequestsInputElement.value;
    
    if(verifyLoadTestTemplate( getSelectedHttpEndpoint, getDurationValue, getNumberOfSimulatedRequestsValue)) {
        console.log("Saving loadtest template...");
        const newLoadTestTemplateObj = new LoadTestTemplate(getDescriptionValue, getSelectedHttpEndpoint, getDurationValue, getNumberOfSimulatedRequestsValue);
        localStorage.setItem('loadTestTemplateObj', newLoadTestTemplateObj);
        console.log("New object stored: ", newLoadTestTemplateObj);
    }
    
}


const verifyLoadTestTemplate = (selectedHttpEndpoint, loadTestDuration, numberSelectedRequests) => {
    console.log("Verify template content...");
    
    if (!selectedHttpEndpoint) {
        console.log("selected endpoint is invalid");
    }
    
    if (!loadTestDuration) {
        console.log("Please give a duration in minutes!");
    }
    
    if (!numberSelectedRequests) {
        console.log("Please provide a number for simulated requests!");
        return false;
    }
    
    return true;
    
}