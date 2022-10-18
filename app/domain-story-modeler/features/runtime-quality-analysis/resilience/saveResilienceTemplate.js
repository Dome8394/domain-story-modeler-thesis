import { ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util/util';
import { setupTemplateObject } from '../classes/setupTemplateObject';
import { getNodeRectElementAndSetColor } from '../util/util';
import { createToastNotification } from '../util/notifications';


export const saveResilienceTemplate = (selectedID) => {
    
    const preparedLoadTestPeakLoadOne = {
        "artifact": getNodeName(selectedID),
        "stimulus":
        {
            "Type": "Peak Load",
            "Load profile": "Medium (4x reference value)"
        },
        "environment": {
            "Context": "During office hours between 08:00 am and 16:00 pm",
            "Duration": "5 hours"
        },
        "Response Measure": {
            "Response times below": "5 milliseconds"
        }
    
    };
    
    const preparedLoadTestPeakLoadTwo = {
        "artifact": getNodeName(selectedID),
        "stimulus":
        {
            "Type": "Constant Load",
            "Load profile": "High (6x reference value)"
        },
        "environment": {
            "Context": "After office hours between 16:00 pm and 08:00 am",
            "Duration": "14 hours"
        },
        "Response Measure": {
            "Response times below": "2 milliseconds"
        }
    
    };

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
    let accuracyElement = document.getElementById(`accuracy_${selectedID}`);
    let getDuration = accuracyElement.value;

    let getStimulusSelectElement = document.getElementById(`stimulusSelectionElement_${selectedID}`);
    let getStimulus = getStimulusSelectElement.value;
    
    let getAccuracySlider = document.getElementById(`accuracy_${selectedID}`);
    let getAccuracy = getAccuracySlider.value;
    
    // TODO add verification for button group
    let getRecoveryTime__satisfiedBtn = document.getElementById(`satisfied__recovery__option__key_${selectedID}`);
    let getRecoveryTime__satisfied = getRecoveryTime__satisfiedBtn.ariaPressed;
    console.log(getRecoveryTime__satisfiedBtn.textContent);
    
    let getRecoveryTime__toleratedBtn = document.getElementById(`tolerate__recovery__option__key_${selectedID}`);
    let getRecoveryTime__tolerated = getRecoveryTime__toleratedBtn.ariaPressed;
    
    let getRecoveryTime__frustratedBtn = document.getElementById(`frustrated__recovery__option__key_${selectedID}`);
    let getRecoveryTime__frustrated = getRecoveryTime__frustratedBtn.ariaPressed;
    
    let getResponseTime__satisfiedBtn = document.getElementById(`satisfied__option__key_${selectedID}`);
    let getResponseTime__satisfied = getResponseTime__satisfiedBtn.ariaPressed;
    
    let getResponseTime__toleratedBtn = document.getElementById(`tolerated__input__option__key_${selectedID}`);
    let getResponseTime__tolerated = getResponseTime__toleratedBtn.ariaPressed;
    
    let getResponseTime__frustratedBtn = document.getElementById(`frustrated__input__option__key_${selectedID}`);
    let getResponseTime__frustrated = getResponseTime__frustratedBtn.ariaPressed;
    
    let getErrorRates__noneBtn = document.getElementById(`errorRates__input__none_${selectedID}`);
    let getErrorRates__none = getErrorRates__noneBtn.ariaPressed;
    
    let getErrorRates__lowBtn = document.getElementById(`errorRates__input_low_${selectedID}`);
    let getErrorRates__low = getErrorRates__lowBtn.ariaPressed;
    
    let getErrorRates__mediumBtn = document.getElementById(`errorRates__input_medium_${selectedID}`);
    let getErrorRates__medium = getErrorRates__mediumBtn.ariaPressed;
    
    let getErrorRates__highBtn = document.getElementById(`errorRates__input_high_${selectedID}`);
    let getErrorRates__high = getErrorRates__highBtn.ariaPressed;
    

    if (verifyMandatory(
        selectedID,
        getRecoveryTime__satisfied,
        getRecoveryTime__tolerated,
        getRecoveryTime__frustrated,
        getResponseTime__satisfied,
        getResponseTime__tolerated,
        getResponseTime__frustrated,
        getErrorRates__none,
        getErrorRates__low,
        getErrorRates__medium,
        getErrorRates__high,
        getStimulus,
        getDuration,
        getAccuracy,
        executionEnvironment)) {

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

            let getLoadTestCheckboxOneElement = document.getElementById(`loadTestOneCheckbox__input_${selectedID}`);
            let getLoadTestCheckboxOneChecked = getLoadTestCheckboxOneElement.checked;

            let getLoadTestCheckBoxTwoElement = document.getElementById(`loadTestTwoCheckbox__input_${selectedID}`);
            let getLoadTestCheckboxTwoChecked = getLoadTestCheckBoxTwoElement.checked;

            if (getLoadTestCheckboxOneChecked && getLoadTestCheckboxTwoChecked) {
                environmentContext['Load Test'] = [
                    {
                        "Load Test One": preparedLoadTestPeakLoadOne
                    },
                    {
                        "Load Test Two": preparedLoadTestPeakLoadTwo
                    }
                ]
            } else if (getLoadTestCheckboxOneChecked) {
                environmentContext['Load Test'] = [
                    {
                        "Load Test One": preparedLoadTestPeakLoadOne
                    }
                ]
            } else {
                environmentContext['Load Test'] = [
                    {
                        "Load Test Two": preparedLoadTestPeakLoadTwo
                    }
                ]
            }
        }

        if (getStimulus === 'No response') {
            stimulus = {
                "Type": "No response"
            }
            responseMeasure = {
                "Recovery Time below": getRecoveryTime + ' milliseconds'
            }
        } else if (getStimulus === 'Failed request') {
            stimulus = {
                "Type": "Failed request",
                "Fault object": { "Test": "XXXXX" },
                "Error rate": getErrorRates__none.textContent || getErrorRates__low.textContent || getErrorRates__medium.textContent || getErrorRates__high.textContent
            }
        } else if (getStimulus === 'Late response') {
            stimulus = {
                "Type": "Response arrives late"
            }
            responseMeasure = {
                "Response Time below": getResponseTime + ' milliseconds'
            }
        }

        let environment =
        {
            "Environment": scenarioEnvironment,
            "Stimulus repetition": getStimulusRepetition,
            "Context": environmentContext
        };

        stimulus["Duration"] = getDuration + ' %';

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

        getNodeRectElementAndSetColor(selectedID, true, 'Resilience Template');
        createToastNotification("Your specification has been saved!", 'success');
        resilienceTemplateModal.style.display = 'none';
    }

}


const verifyMandatory = (
    selectedID,
    getRecoveryTime__satisfied,
    getRecoveryTime__tolerated,
    getRecoveryTime__frustrated,
    getResponseTime__satisfied,
    getResponseTime__tolerated,
    getResponseTime__frustrated,
    getErrorRates__none,
    getErrorRates__low,
    getErrorRates__medium,
    getErrorRates__high,
    getStimulus,
    durationProvided,
    getAccuracy,
    environmentSelected
) => {

    if (getStimulus && durationProvided && environmentSelected && (getAccuracy > 0)
        || (getRecoveryTime__satisfied || getRecoveryTime__tolerated || getRecoveryTime__frustrated) 
        || (getResponseTime__satisfied || getResponseTime__tolerated || getResponseTime__frustrated)
        || (getErrorRates__none || getErrorRates__low || getErrorRates__medium || getErrorRates__high)) {
        
        if (environmentSelected === 'No') {
            let getExistingLoadTestsCheckboxElement = document.getElementById(`existingLoadTests__input_${selectedID}`);
            let getExistingLoadTestsChecked = getExistingLoadTestsCheckboxElement.checked;

            if (getExistingLoadTestsChecked) {
                
                let getLoadTestCheckboxOneElement = document.getElementById(`loadTestOneCheckbox__input_${selectedID}`);
                let getLoadTestCheckboxOneChecked = getLoadTestCheckboxOneElement.checked;

                let getLoadTestCheckBoxTwoElement = document.getElementById(`loadTestTwoCheckbox__input_${selectedID}`);
                let getLoadTestCheckboxTwoChecked = getLoadTestCheckBoxTwoElement.checked;
                
                if (getLoadTestCheckboxOneChecked || getLoadTestCheckboxTwoChecked) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    console.log("Mandatory fields are missing");
    return false;
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
    let accuracyElement = document.getElementById(`accuracy_${selectedID}`);
    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);

    // let responseMeasureResponseTimeCheckBoxElement = document.getElementById(`responseMeasureCheckbox_${selectedID}`);
    let getResponseMeasureResponseTimeInputElement = document.getElementById(`responseMeasureResponseTimeInput_${selectedID}`);

    // let responseMeasureRecoveryTimeCheckBoxElement = document.getElementById(`responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    let getResponseMeasureRecoveryTimeInputElement = document.getElementById(`responseMeasureRecoveryTimeInput_${selectedID}`);
    /**
     * Get error msg elements
     */
    // let resilienceServiceAmount__invalidElement = document.getElementById(`resilienceServiceAmount__invalid_${selectedID}`);
    let accuracy__invalidElement = document.getElementById(`accuracy__invalid_${selectedID}`);
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
    //     accuracy__invalidElement.style.display = 'block';
    //     accuracyElement.style.borderColor = 'red';
    // } else {
    //     accuracy__invalidElement.style.display = 'none';
    //     accuracyElement.style.borderColor = 'springgreen';
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
