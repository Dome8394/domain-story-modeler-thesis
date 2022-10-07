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

    let numberOfInstancesElement = document.getElementById(`resilienceServiceAmount_${selectedID}`);
    let numberOfInstances = numberOfInstancesElement.value;

    let getResilienceScenarioDescriptionElement = document.getElementById(`resilienceScenarioDescription_${selectedID}`);
    let scenarioDescription = getResilienceScenarioDescriptionElement.value;

    let getResilienceScenarioExecutionEnvironmentElement = document.getElementById(`resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
    let executionEnvironment = getResilienceScenarioExecutionEnvironmentElement.value;

    let getExecutionContextWorkingHoursCheckBox = document.getElementById(`executionContextWorkingHoursCheckBox_${selectedID}`);
    let getExecutionContextWorkingHoursCheckBoxValue = getExecutionContextWorkingHoursCheckBox.checked;

    let getExecutionContextOffWorkingHoursCheckBox = document.getElementById(`executionContextOffWorkingHoursCheckBox_${selectedID}`);
    let getExecutionContextOffWorkingHoursCheckBoxValue = getExecutionContextOffWorkingHoursCheckBox.checked;

    let getRandomizedServiceSelectionCheckbox = document.getElementById(`randomServiceSelectionCheckBox_${selectedID}`);
    let randomizedServiceSelection = getRandomizedServiceSelectionCheckbox.checked;

    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let timeOfServiceFailure = timeOfServiceFailureElement.value;

    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);
    let stimulusCheckBoxElementValue = stimulusCheckBoxElement.checked;

    let getResponseMeasureResponseTimeCheckBoxElement = document.getElementById(`responseMeasureCheckbox_${selectedID}`);
    let getResponseMeasureResponseTimeCheckBoxValue = getResponseMeasureResponseTimeCheckBoxElement.checked;

    let getResponseMeasureResponseTimeInputElement = document.getElementById(`responseMeasureResponseTimeInput_${selectedID}`);
    let getResponseMeasureResponseTimeInputValue = getResponseMeasureResponseTimeInputElement.value;

    let getResponseMeasureRecoveryTimeCheckBoxElement = document.getElementById(`responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    let getResponseMeasureRecoveryTimeCheckBoxValue = getResponseMeasureRecoveryTimeCheckBoxElement.checked;

    let getResponseMeasureRecoveryTimeInputElement = document.getElementById(`responseMeasureRecoveryTimeInput_${selectedID}`);
    let getResponseMeasureRecoveryTimeInputValue = getResponseMeasureRecoveryTimeInputElement.value;
    
    console.log("Recovery time checkbox element: ", getResponseMeasureRecoveryTimeCheckBoxElement);
    console.log("Recovery time checkbox element value prior to verification: ", getResponseMeasureRecoveryTimeCheckBoxValue);

    if (verifyResilienceTemplate(numberOfInstances,
        timeOfServiceFailure,
        stimulusCheckBoxElementValue,
        getResponseMeasureResponseTimeCheckBoxValue,
        getResponseMeasureResponseTimeInputValue,
        getResponseMeasureRecoveryTimeCheckBoxValue,
        getResponseMeasureRecoveryTimeInputValue,
        selectedID)) {
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

        //TODO: check if this can be simplified with the checkbox state...
        if (randomizedServiceSelection === true) {
            randomizedServiceSelection = false;
        } else {
            randomizedServiceSelection = true;
        }


        let artifact = getNodeName(selectedID);
        let responseMeasure;
        let stimulus;
        let environment =
        {
            "Environment": executionEnvironment,
            "Execution during office hours": getExecutionContextWorkingHoursCheckBoxValue,
            "Execution after office hours": getExecutionContextOffWorkingHoursCheckBoxValue,
            "Instances": numberOfInstances,
            "Random Selection": randomizedServiceSelection
        };

        if (stimulusCheckBoxElementValue) {
            stimulus = {
                "Service Failure": true,
                "Time to Failure": timeOfServiceFailure
            };
        }

        if (getResponseMeasureResponseTimeInputValue) {

            responseMeasure = { "Response time": getResponseMeasureResponseTimeInputValue };
        }

        if (getResponseMeasureRecoveryTimeInputValue) {

            responseMeasure = { "Recovery time": getResponseMeasureRecoveryTimeInputValue };
        }

        if (getResponseMeasureResponseTimeInputValue && getResponseMeasureRecoveryTimeInputValue) {
            responseMeasure = {
                "Response time": getResponseMeasureResponseTimeInputValue,
                "Recovery time": getResponseMeasureRecoveryTimeInputValue
            };
        }


        const newResilienceScenarioTemplate = new ResilienceTemplate(
            artifact,
            stimulus,
            environment,
            responseMeasure,
            scenarioDescription,
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
    getResponseMeasureResponseTimeCheckBoxValue,
    getResponseTime,
    getResponseMeasureRecoveryTimeCheckBoxValue,
    getRecoveryTime,
    selectedID) => {

    console.log("Response time checkbox value: ", getResponseMeasureResponseTimeCheckBoxValue);
    console.log("Recovery time checkbox value: ", getResponseMeasureRecoveryTimeCheckBoxValue);
    
    /**
     * Get HTML elements and their values
     */
    let numberOfInstances = document.getElementById(`resilienceServiceAmount_${selectedID}`);
    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);

    let responseMeasureResponseTimeCheckBoxElement = document.getElementById(`responseMeasureCheckbox_${selectedID}`);
    let getResponseMeasureResponseTimeInputElement = document.getElementById(`responseMeasureResponseTimeInput_${selectedID}`);

    let responseMeasureRecoveryTimeCheckBoxElement = document.getElementById(`responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    let getResponseMeasureRecoveryTimeInputElement = document.getElementById(`responseMeasureRecoveryTimeInput_${selectedID}`);
    /**
     * Get error msg elements
     */
    let resilienceServiceAmount__invalidElement = document.getElementById(`resilienceServiceAmount__invalid_${selectedID}`);
    let timeOfServiceFailure__invalidElement = document.getElementById(`timeOfServiceFailure__invalid_${selectedID}`);
    let stimulusCheckBox__invalid = document.getElementById(`stimulusCheckBox__invalid_${selectedID}`);
    let responseMeasure__invalidElement = document.getElementById(`responseMeasure__invalid_${selectedID}`);

    if (!amountOfFailingInstances) {
        resilienceServiceAmount__invalidElement.style.display = 'block';
        numberOfInstances.style.borderColor = 'red';
    } else {
        resilienceServiceAmount__invalidElement.style.display = 'none';
        numberOfInstances.style.borderColor = 'springgreen';
    }

    if (!timeToFailure) {
        timeOfServiceFailure__invalidElement.style.display = 'block';
        timeOfServiceFailureElement.style.borderColor = 'red';
    } else {
        timeOfServiceFailure__invalidElement.style.display = 'none';
        timeOfServiceFailureElement.style.borderColor = 'springgreen';
    }

    if (getResponseMeasureResponseTimeCheckBoxValue === false && getResponseMeasureRecoveryTimeCheckBoxValue === false) {
        responseMeasure__invalidElement.style.display = 'block';
        responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'red';
        responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'red';
    } else {
        if (getResponseMeasureResponseTimeCheckBoxValue && getResponseMeasureRecoveryTimeCheckBoxValue) {
            responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'springgreen';
            responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'springgreen';

            if (getResponseTime) {
                getResponseMeasureResponseTimeInputElement.style.borderColor = 'springgreen';
            } else {
                getResponseMeasureResponseTimeInputElement.style.borderColor = 'red';
            }

            if (getRecoveryTime) {
                getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'springgreen';
            } else {
                getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'red';
            }
        }

        if (getResponseMeasureResponseTimeCheckBoxValue) {
            console.log("Testing...");
            responseMeasureResponseTimeCheckBoxElement.style.borderColor = 'springgreen';
            if (getResponseTime) {
                getResponseMeasureResponseTimeInputElement.style.borderColor = 'springgreen';
            } else {
                getResponseMeasureResponseTimeInputElement.style.borderColor = 'red';
            }
        } else if (getResponseMeasureRecoveryTimeCheckBoxValue) {
            responseMeasureRecoveryTimeCheckBoxElement.style.borderColor = 'springgreen';
            if (getRecoveryTime) {
                getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'springgreen';
            } else {
                getResponseMeasureRecoveryTimeInputElement.style.borderColor = 'red';
            }
        }
        
        responseMeasure__invalidElement.style.display = 'none';
    }

    if (!serviceFails) {
        stimulusCheckBox__invalid.style.display = 'block';
        stimulusCheckBoxElement.style.borderColor = 'red';
    } else {
        stimulusCheckBox__invalid.style.display = 'none';
        stimulusCheckBoxElement.style.borderColor = 'springgreen';
    }

    if (serviceFails && timeToFailure && amountOfFailingInstances && (getResponseTime || getRecoveryTime)) {
        return true;
    }

    return false;
}