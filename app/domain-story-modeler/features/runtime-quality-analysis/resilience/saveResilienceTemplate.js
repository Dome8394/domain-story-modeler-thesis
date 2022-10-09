import { ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util/util';
import { setupTemplateObject } from '../classes/setupTemplateObject';
import { getNodeRectElementAndSetColor } from '../util/util';

export const saveResilienceTemplate = (selectedID) => {
    /**
    * Get HTML elements and their values
    */
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    // stimulusRepetition
    let stimulusRepetitionSelectElement = document.getElementById(`stimulusOccurrence__select_${selectedID}`);
    let getStimulusRepetition = stimulusRepetitionSelectElement.value;

    let getResilienceScenarioExecutionEnvironmentElement = document.getElementById(`resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
    let executionEnvironment = getResilienceScenarioExecutionEnvironmentElement.value;

    let getExecutionContextWorkingHoursCheckBox = document.getElementById(`executionContextWorkingHoursCheckBox_${selectedID}`);
    let getExecutionContextWorkingHoursCheckBoxValue = getExecutionContextWorkingHoursCheckBox.checked;

    let getExecutionContextOffWorkingHoursCheckBox = document.getElementById(`executionContextOffWorkingHoursCheckBox_${selectedID}`);
    let getExecutionContextOffWorkingHoursCheckBoxValue = getExecutionContextOffWorkingHoursCheckBox.checked;

    // Duration
    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let getDuration = timeOfServiceFailureElement.value;

    // no response
    let getNoResponseCheckbox = document.getElementById(`stimulusCheckBox_${selectedID}`);
    let getNoResponse = getNoResponseCheckbox.checked;
    
    let getDifferentResponseCheckbox = document.getElementById(`stimulusOtherThanCheckbox_${selectedID}`);
    let getDifferentResponse = getDifferentResponseCheckbox.checked;
    
    let getLaterResponseCheckbox = document.getElementById(`stimulusLaterThanCheckbox_${selectedID}`);
    let getLaterResponse = getLaterResponseCheckbox.checked;
    
    let getResponseMeasureResponseTimeInputElement = document.getElementById(`responseMeasureResponseTimeInput_${selectedID}`);
    let getResponseTime = getResponseMeasureResponseTimeInputElement.value;

    let getResponseMeasureRecoveryTimeInputElement = document.getElementById(`responseMeasureRecoveryTimeInput_${selectedID}`);
    let getRecoveryTime = getResponseMeasureRecoveryTimeInputElement.value;
    

    if (verifyMandatory(
        getNoResponse,
        getDifferentResponse, 
        getLaterResponse,
        getDuration)) {
        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }

        /**
         * This is probably not necessary for the future...
         */
        if (artifact === '') {
            console.log('Please give the node a proper name that matches the architectural mapping!');
            return;
        }
        
        let scenarioEnvironment;
        let environmentContext;
        let artifact = getNodeName(selectedID);
        let responseMeasure;
        let stimulus;
        
        if (executionEnvironment == 'Yes') {
            scenarioEnvironment = 'PROD';
            environmentContext = { "NO_CONTEXT_INFORMATION": "NO_CONTEXT_INFORMATION" };
        } else {
            scenarioEnvironment = 'TESTING';
            if (getExecutionContextWorkingHoursCheckBoxValue && getExecutionContextOffWorkingHoursCheckBoxValue) {
                environmentContext = {
                    "Execution during office hours": getExecutionContextWorkingHoursCheckBoxValue,
                };
            } else if (getExecutionContextOffWorkingHoursCheckBoxValue) {
                environmentContext = {
                    "Execution after office hours": getExecutionContextOffWorkingHoursCheckBoxValue,
                };
            } else if (getExecutionContextWorkingHoursCheckBoxValue) {
                environmentContext = {
                    "Execution during office hours": getExecutionContextWorkingHoursCheckBoxValue,
                    "Execution after office hours": getExecutionContextOffWorkingHoursCheckBoxValue,
                };
            } else {
                console.log("Please provide additional environment information");
            }
        }
        
        if(getNoResponse) {
            stimulus = {
                "Type": "No response"
            }
            responseMeasure = {
                "Recovery Time below": getRecoveryTime + 'milliseconds'
            }
        } else if(getDifferentResponse) {
            stimulus = {
                "Type": "Different response object",
                "Fault object": { "Test": "XXXXX" },
                "Expected Status Code": 400
            }
        } else if(getLaterResponse) {
            stimulus = {
                "Type": "Response arrives late"
            }
            responseMeasure = {
                "Response Time below": getResponseTime + 'milliseconds'
            }
        }
        
        let environment =
        {
            "Environment": scenarioEnvironment,
            "Stimulus repetition": getStimulusRepetition,
            "Context": environmentContext
        };
        
        stimulus["Duration"] = getDuration;

        const newResilienceScenarioTemplate = new ResilienceTemplate(
            artifact,
            stimulus,
            environment,
            responseMeasure
        );

        setupTemplateObject(newResilienceScenarioTemplate, 'RESILIENCE');

        if (!getSummaryView) {
            createSummaryView(newResilienceScenarioTemplate);
        } else {
            createNewSummaryForTemplate(newResilienceScenarioTemplate);
        }

        getNodeRectElementAndSetColor(selectedID, true);

        resilienceTemplateModal.style.display = 'none';
    }

}


export const verifyResilienceTemplate = (
    amountOfFailingInstances,
    timeToFailure,
    serviceFails,
    // getResponseMeasureResponseTimeCheckBoxValue,
    getResponseTime,
    // getResponseMeasureRecoveryTimeCheckBoxValue,
    getRecoveryTime,
    selectedID) => {
    /**
     * Get HTML elements and their values
     */
    let numberOfInstances = document.getElementById(`resilienceServiceAmount_${selectedID}`);
    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);

    // let responseMeasureResponseTimeCheckBoxElement = document.getElementById(`responseMeasureCheckbox_${selectedID}`);
    let getResponseMeasureResponseTimeInputElement = document.getElementById(`responseMeasureResponseTimeInput_${selectedID}`);

    // let responseMeasureRecoveryTimeCheckBoxElement = document.getElementById(`responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    let getResponseMeasureRecoveryTimeInputElement = document.getElementById(`responseMeasureRecoveryTimeInput_${selectedID}`);
    /**
     * Get error msg elements
     */
    // let resilienceServiceAmount__invalidElement = document.getElementById(`resilienceServiceAmount__invalid_${selectedID}`);
    let timeOfServiceFailure__invalidElement = document.getElementById(`timeOfServiceFailure__invalid_${selectedID}`);
    let stimulusCheckBox__invalid = document.getElementById(`stimulusCheckBox__invalid_${selectedID}`);
    let responseMeasure__invalidElement = document.getElementById(`responseMeasure__invalid_${selectedID}`);

    // if (!amountOfFailingInstances) {
    //     resilienceServiceAmount__invalidElement.style.display = 'block';
    //     numberOfInstances.style.borderColor = 'red';
    // } else {
    //     resilienceServiceAmount__invalidElement.style.display = 'none';
    //     numberOfInstances.style.borderColor = 'springgreen';
    // }

    // if (!timeToFailure) {
    //     timeOfServiceFailure__invalidElement.style.display = 'block';
    //     timeOfServiceFailureElement.style.borderColor = 'red';
    // } else {
    //     timeOfServiceFailure__invalidElement.style.display = 'none';
    //     timeOfServiceFailureElement.style.borderColor = 'springgreen';
    // }

    // if (getResponseMeasureResponseTimeCheckBoxValue === false && getResponseMeasureRecoveryTimeCheckBoxValue === false) {
    //     responseMeasure__invalidElement.style.display = 'block';
    //     responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'red';
    //     responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'red';
    // } else {
    //     if (getResponseMeasureResponseTimeCheckBoxValue && getResponseMeasureRecoveryTimeCheckBoxValue) {
    //         responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'springgreen';
    //         responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'springgreen';

    //         if (getResponseTime) {
    //             getResponseMeasureResponseTimeInputElement.style.borderColor = 'springgreen';
    //         } else {
    //             getResponseMeasureResponseTimeInputElement.style.borderColor = 'red';
    //         }

    //         if (getRecoveryTime) {
    //             getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'springgreen';
    //         } else {
    //             getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'red';
    //         }
    //     }

    //     if (getResponseMeasureResponseTimeCheckBoxValue) {
    //         console.log("Testing...");
    //         responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'springgreen';
    //         if (getResponseTime) {
    //             getResponseMeasureResponseTimeInputElement.style.borderColor = 'springgreen';
    //         } else {
    //             getResponseMeasureResponseTimeInputElement.style.borderColor = 'red';
    //         }
    //     } else if (getResponseMeasureRecoveryTimeCheckBoxValue) {
    //         responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'springgreen';
    //         if (getRecoveryTime) {
    //             getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'springgreen';
    //         } else {
    //             getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'red';
    //         }
    //     }
        
    //     responseMeasure__invalidElement.style.display = 'none';
    // }

    // if (!serviceFails) {
    //     stimulusCheckBox__invalid.style.display = 'block';
    //     stimulusCheckBoxElement.style.borderColor = 'red';
    // } else {
    //     stimulusCheckBox__invalid.style.display = 'none';
    //     stimulusCheckBoxElement.style.borderColor = 'springgreen';
    // }

    // if (serviceFails && timeToFailure && amountOfFailingInstances && (getResponseTime || getRecoveryTime)) {
    //     return true;
    // }

    return true;
}

const verifyMandatory = (noResponseChecked, differentResponseChecked, laterResponseChecked, durationProvided) => {
    
    if ((noResponseChecked || differentResponseChecked || laterResponseChecked) && durationProvided) {
        return true;
    }
    
    return false;
}