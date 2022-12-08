/* eslint-disable indent */
import { ResilienceTemplate } from '../../classes/resilience/ResilienceTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../../rqa-summary/summaryView';
import { getNodeName, getNodeRectElementAndSetColor } from '../../util/util';
import { setupTemplateObject } from '../../classes/setupTemplateObject';
import { createToastNotification } from '../../util/notifications';


export const saveResilienceTemplate = (selectedID) => {

    const preparedLoadTestPeakLoadOne = {
        'artifact': getNodeName(selectedID),
        'stimulus': [
            {
                'Type': 'Peak Load',
                'Load profile': 'Medium (4x reference value)'
            },
        ],
        'environment': {
            'Context': 'During office hours between 08:00 am and 16:00 pm',
            'Duration': '5 hours'
        },
        'Response Measure': {
            'Response times below': '5 milliseconds'
        }

    };

    const preparedLoadTestPeakLoadTwo = {
        'artifact': getNodeName(selectedID),
        'stimulus':
        {
            'Type': 'Constant Load',
            'Load profile': 'High (6x reference value)'
        },
        'environment': {
            'Context': 'After office hours between 16:00 pm and 08:00 am',
            'Duration': '14 hours'
        },
        'Response Measure': {
            'Response times below': '2 milliseconds'
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
        let stimulus;
        let stimulusType;
        let responseMeasure;
        let responseMeasureObject;
        // eslint-disable-next-line no-unused-vars

        if (executionEnvironment == 'Yes') {
            scenarioEnvironment = 'PROD';
            environmentContext = { 'NO_CONTEXT_INFORMATION': 'NO_CONTEXT_INFORMATION' };
        } else {
            scenarioEnvironment = 'TESTING';
            if (getExecutionContextWorkingHoursCheckBoxValue && getExecutionContextOffWorkingHoursCheckBoxValue) {
                environmentContext = {
                    'Execution during office hours': getExecutionContextWorkingHoursCheckBoxValue,
                };
            } else if (getExecutionContextOffWorkingHoursCheckBoxValue) {
                environmentContext = {
                    'Execution after office hours': getExecutionContextOffWorkingHoursCheckBoxValue,
                };
            } else if (getExecutionContextWorkingHoursCheckBoxValue) {
                environmentContext = {
                    'Execution during office hours': getExecutionContextWorkingHoursCheckBoxValue,
                    'Execution after office hours': getExecutionContextOffWorkingHoursCheckBoxValue,
                };
            }

            let getLoadTestCheckboxOneElement = document.getElementById(`loadTestOneCheckbox__input_${selectedID}`);
            let getLoadTestCheckboxOneChecked = getLoadTestCheckboxOneElement.checked;

            let getLoadTestCheckBoxTwoElement = document.getElementById(`loadTestTwoCheckbox__input_${selectedID}`);
            let getLoadTestCheckboxTwoChecked = getLoadTestCheckBoxTwoElement.checked;

            if (getLoadTestCheckboxOneChecked && getLoadTestCheckboxTwoChecked) {
                environmentContext['Load Test'] = [
                    {
                        'Load Test One': preparedLoadTestPeakLoadOne
                    },
                    {
                        'Load Test Two': preparedLoadTestPeakLoadTwo
                    }
                ];
            } else if (getLoadTestCheckboxOneChecked) {
                environmentContext['Load Test'] = [
                    {
                        'Load Test One': preparedLoadTestPeakLoadOne
                    }
                ];
            } else {
                environmentContext['Load Test'] = [
                    {
                        'Load Test Two': preparedLoadTestPeakLoadTwo
                    }
                ];
            }
        }

        let responseMeasureType;
        switch (getStimulus) {
            case 'Unavailable':
                responseMeasureType = 'Recovery time';

                if (getRecoveryTime__satisfiedBtn.classList.contains('active')) {
                    responseMeasureObject = getRecoveryTime__satisfiedBtn.textContent;
                } else if (getRecoveryTime__toleratedBtn.classList.contains('active')) {
                    responseMeasureObject = getRecoveryTime__toleratedBtn.textContent;
                } else if (getRecoveryTime__frustratedBtn.classList.contains('active')) {
                    responseMeasureObject = getRecoveryTime__frustratedBtn.textContent;
                }
                responseMeasure = {
                    'Recovery time': responseMeasureObject
                };
                break;

            case 'Failed request':
                responseMeasureType = 'Error rate';

                if (getErrorRates__noneBtn.classList.contains('active')) {
                    responseMeasureObject = getErrorRates__noneBtn.textContent;
                    console.log(responseMeasureObject);
                } else if (getErrorRates__lowBtn.classList.contains('active')) {
                    responseMeasureObject = getErrorRates__lowBtn.textContent;
                } else if (getErrorRates__mediumBtn.classList.contains('active')) {
                    responseMeasureObject = getErrorRates__mediumBtn.textContent;
                } else if (getErrorRates__highBtn.classList.contains('active')) {
                    responseMeasureObject = getErrorRates__highBtn.textContent;
                }
                responseMeasure = {
                    'Error rates': responseMeasureObject
                };
                break;

            case 'Late response':
                responseMeasureType = 'Response time';

                if (getResponseTime__satisfiedBtn.classList.contains('active')) {
                    responseMeasureObject = getResponseTime__satisfiedBtn.textContent;
                } else if (getResponseTime__toleratedBtn.classList.contains('active')) {
                    responseMeasureObject = getResponseTime__toleratedBtn.textContent;
                } else if (getResponseTime__frustratedBtn.classList.contains('active')) {
                    responseMeasureObject = getResponseTime__frustratedBtn.textContent;
                }
                responseMeasure = {
                    'Response time': responseMeasureObject
                };
                break;
            default:
                console.log('No matching stimuli');
                break;
        }

        stimulusType = getStimulus;

        stimulus = {
            'Type': stimulusType
        };

        let environment =
        {
            'Environment': scenarioEnvironment,
            'Stimulus repetition': getStimulusRepetition,
            'Context': environmentContext
        };

        stimulus['Confidence'] = getDuration + '%';

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
        createToastNotification('Your test has been saved! You may now execute your test!', 'success');
        resilienceTemplateModal.style.display = 'none';
    }

};


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
    getAccuracy,
    environmentSelected
) => {


    if (getStimulus && environmentSelected && (getAccuracy > 0)
        && ((getRecoveryTime__satisfied || getRecoveryTime__tolerated || getRecoveryTime__frustrated)
            || (getResponseTime__satisfied || getResponseTime__tolerated || getResponseTime__frustrated)
            || (getErrorRates__none || getErrorRates__low || getErrorRates__medium || getErrorRates__high))) {

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

    console.log('Mandatory fields are missing');
    return false;
};