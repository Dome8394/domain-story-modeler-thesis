// 'use-strict';
import { ResilienceEnvironmentEnum, ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { INVALID_RESPONSE_MEASURE, INFO_ENVIRONMENT_INFORMATION, INFO_EXECUTION_CONTEXT, INFO_SCENARIO_DESC, INFO_TYPE_OF_FAILURE, INFO_RANDOMIZATION, INFO_TIME_OF_SHUTDOWN, INFO_FAILING_INSTANCES, VERIFICATION_MODAL_NOTIFICATION, RESILIENCE_FAULT_TYPE_INFO, RESILIENCE_SCENARIO_NAME_INFO, RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO, SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO, SERVICE_TIME_TO_FAILURE_INFO } from '../RuntimeAnalysisConstants';
import { saveResilienceTemplate } from './saveResilienceTemplate';
import { createDisabledGenerateBtn } from '../generateTemplateObject';
import { getNodeName, getNodeRectElementAndSetColor } from '../util/util';

/**
 * Get Elements
 */
let elementContainer = document.getElementById('runtimeAnalysisSummaryContainer');
let modal__container = document.getElementById('modal__container');

/**
 * This should remove existing template views if the icon is removed from the canvas
 */
const clearRemovedRuntimeAnalysisViews = () => {
    let canvasItemsList = document.getElementsByClassName('djs-group');

    for (let i = 0; i < canvasItemsList.length; i++) {
        let SVGItemParent = canvasItemsList[i];
    }
}

const checkIfTemplateComplete = (selectedID) => { 
    let timeOfServiceFailureElement = document.getElementById(`timeOfServiceFailure_${selectedID}`);
    let timeOfServiceFailure = timeOfServiceFailureElement.value;
    
    let stimulusCheckBoxElement = document.getElementById(`stimulusCheckBox_${selectedID}`);
    let stimulusCheckBoxElementValue = stimulusCheckBoxElement.checked;
    console.log(timeOfServiceFailure);
    if (!timeOfServiceFailure || !stimulusCheckBoxElementValue) {
        getNodeRectElementAndSetColor(selectedID, false, 'Resilience Template');
    }
}

const createButtonContainer = (selectedID) => {

    let modal_resilience_content = document.getElementById(`modal_resilience_content_${selectedID}`);
    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    let resilienceTemplateBtnContainerParent = document.createElement('div');

    let resilienceTemplateView__btn__close = document.createElement('button');
    let resilienceTemplateView__btn__save = document.createElement('button');

    resilienceTemplateBtnContainerParent.id = 'resilienceTemplateBtnContainerParent';

    resilienceTemplateView__btn__close.innerText = 'Close';
    resilienceTemplateView__btn__save.innerText = 'Save';

    resilienceTemplateView__btn__close.classList.add('btn');
    resilienceTemplateView__btn__close.classList.add('btn-secondary');
    resilienceTemplateView__btn__close.classList.add('custom-btn');

    resilienceTemplateView__btn__save.classList.add('btn');
    resilienceTemplateView__btn__save.classList.add('btn-primary');
    resilienceTemplateView__btn__save.classList.add('custom-btn');

    resilienceTemplateBtnContainerParent.classList.add('btn-container-parent');

    /**
     * Listeners
     */
    resilienceTemplateView__btn__close.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'none';
        checkIfTemplateComplete(selectedID);
    })

    resilienceTemplateView__btn__save.addEventListener('click', () => {
        saveResilienceTemplate(selectedID);
    })

    /**
     * Append children to container
     */

    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__save);
    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__close);

    modal_resilience_content.appendChild(resilienceTemplateBtnContainerParent);
}

/**
 * Creates new template view for resilience tests with a unique ID
 * For every new resilience scenario a new template is created
 * @param {} selectedID 
 */
export function createResilienceTemplateView(selectedID) {

    /**
     * Create html elements
     */
    let header = document.createElement('h3');
    header.innerText = 'Resilience Scenario';
    header.classList.add('template-header');
    
    let resilienceTemplateModal = document.createElement('div');
    resilienceTemplateModal.classList.add('modal_resilience');
    resilienceTemplateModal.id = `modal_resilience_${selectedID}`;

    let resilienceTemplateContent = document.createElement('div');
    resilienceTemplateContent.id = `modal_resilience_content_${selectedID}`;
    resilienceTemplateContent.classList.add('modal_resilience_content');

    let resilienceTemplateViewContainer__left = document.createElement('div');
    resilienceTemplateViewContainer__left.id = 'resilienceTemplateViewContainer__left';
    resilienceTemplateViewContainer__left.classList.add('input__container');

    let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');
    resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

    let resilienceTemplateViewContainer__right = document.createElement('div');
    resilienceTemplateViewContainer__right.id = `resilienceTemplateViewContainer__right_${selectedID}`;
    resilienceTemplateViewContainer__right.classList.add('input__container');
    
    let artifactDescriptor = document.createElement('p');
    artifactDescriptor.classList.add('label-padding');
    artifactDescriptor.innerText = 'Artifact';
    
    let artifactValue = document.createElement('p');
    artifactValue.classList.add('label-padding');
    artifactValue.innerText = getNodeName(selectedID);
    
    let artifactValueContainer = document.createElement('div');
    artifactValueContainer.classList.add('checkbox-child');

    let resilienceServiceAmount = document.createElement('input');
    resilienceServiceAmount.id = `resilienceServiceAmount_${selectedID}`;
    resilienceServiceAmount.type = 'number';
    resilienceServiceAmount.placeholder = 'Give a number for total failing services (min. 1)...';
    resilienceServiceAmount.disabled = true;
    resilienceServiceAmount.value = 1;
    
    let resilienceServiceAmount__info = document.createElement('i');
    resilienceServiceAmount__info.classList.add('bi');
    resilienceServiceAmount__info.classList.add('bi-info-circle');
    resilienceServiceAmount__info.classList.add('toolTip');
    
    resilienceServiceAmount__info.addEventListener('mouseover', () => {
        resilienceServiceAmount__info_text.style.display = 'block';
    });
    
    resilienceServiceAmount__info.addEventListener('mouseleave', () => {
        resilienceServiceAmount__info_text.style.display = 'none';
    })
    
    let resilienceServiceAmount__info_text = document.createElement('span');
    resilienceServiceAmount__info_text.classList.add('tooltipText');
    resilienceServiceAmount__info_text.id = `resilienceServiceAmount_${selectedID}_info_text`
    resilienceServiceAmount__info_text.innerText = INFO_FAILING_INSTANCES;
    
    let resilienceServiceAmountLabelContainer = document.createElement('div');
    resilienceServiceAmountLabelContainer.classList.add('label-container');

    let resilienceServiceAmount__label = document.createElement('label');
    resilienceServiceAmount__label.classList.add('label-padding');
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    resilienceServiceAmount__label.setAttribute('for', `resilienceServiceAmount_${selectedID}`);
    resilienceServiceAmount__label.innerText = 'Number of failing instances (*)';

    let resilienceServiceAmount__invalid = document.createElement('p');
    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    resilienceServiceAmount__invalid.id = `resilienceServiceAmount__invalid_${selectedID}`;
    resilienceServiceAmount__invalid.classList.add('error-info');
    resilienceServiceAmount__invalid.style.display = 'none';

    let timeOfServiceFailure = document.createElement('input');
    timeOfServiceFailure.id = `timeOfServiceFailure_${selectedID}`;
    timeOfServiceFailure.type = 'number';
    timeOfServiceFailure.placeholder = 'E.g., 25'

    let timeOfServiceFailure__label = document.createElement('label');
    timeOfServiceFailure__label.id = 'timeOfServiceFailure__label';
    timeOfServiceFailure__label.setAttribute('for', `timeOfServiceFailure_${selectedID}`);
    timeOfServiceFailure__label.innerText = 'Time to failure in minutes (*)';
    timeOfServiceFailure__label.classList.add('label-padding');
    
    let timeOfServiceFailure__label_info = document.createElement('i');
    timeOfServiceFailure__label_info.classList.add('bi');
    timeOfServiceFailure__label_info.classList.add('bi-info-circle');
    timeOfServiceFailure__label_info.classList.add('toolTip');
    
    timeOfServiceFailure__label_info.addEventListener('mouseover', () => {
        timeOfServiceFailure__label_info_text.style.display = 'block';
    });
    
    timeOfServiceFailure__label_info.addEventListener('mouseleave', () => {
        timeOfServiceFailure__label_info_text.style.display = 'none';
    })
    
    let timeOfServiceFailure__label_info_text = document.createElement('span');
    timeOfServiceFailure__label_info_text.classList.add('tooltipText');
    timeOfServiceFailure__label_info_text.id = `timeOfServiceFailure__label_info_text_${selectedID}_info_text`
    timeOfServiceFailure__label_info_text.innerText = INFO_TIME_OF_SHUTDOWN;
    
    let timeOfServiceFailureLabelContainer = document.createElement('div');
    timeOfServiceFailureLabelContainer.classList.add('label-container');
    
    let timeOfServiceFailure__invalid = document.createElement('p');
    timeOfServiceFailure__invalid.innerText = SERVICE_TIME_TO_FAILURE_INFO;
    timeOfServiceFailure__invalid.id = `timeOfServiceFailure__invalid_${selectedID}`;
    timeOfServiceFailure__invalid.classList.add('error-info');
    timeOfServiceFailure__invalid.style.display = 'none';

    let checkBoxContainerRandom = document.createElement('div');
    checkBoxContainerRandom.id = 'checkBoxContainerRandomServiceFailure';
    checkBoxContainerRandom.classList.add('checkbox-child');

    let checkBoxContainer__label = document.createElement('label');
    checkBoxContainer__label.classList.add('form-check-label');
    checkBoxContainer__label.classList.add('label-padding');
    checkBoxContainer__label.setAttribute('for', 'checkBoxContainerServiceFailure');
    checkBoxContainer__label.innerText = 'Randomized selection of service instances';
    
    let randomServiceSelectionCheckBox = document.createElement('input');
    randomServiceSelectionCheckBox.id = `randomServiceSelectionCheckBox_${selectedID}`;
    randomServiceSelectionCheckBox.type = 'checkbox';
    randomServiceSelectionCheckBox.classList.add('form-check-input');
    
    randomServiceSelectionCheckBox.addEventListener('click', () => {
        resilienceServiceAmount.disabled = !resilienceServiceAmount.disabled;
    })
    
    let randomServiceSelectionCheckBox__label = document.createElement('label');
    randomServiceSelectionCheckBox__label.classList.add('form-check-label');
    randomServiceSelectionCheckBox__label.setAttribute('for', `randomServiceSelectionCheckBox_${selectedID}`);
    randomServiceSelectionCheckBox__label.innerText = 'No';
    
    let randomizedServiceSelection__label_info = document.createElement('i');
    randomizedServiceSelection__label_info.classList.add('bi');
    randomizedServiceSelection__label_info.classList.add('bi-info-circle');
    randomizedServiceSelection__label_info.classList.add('toolTip');
    
    randomizedServiceSelection__label_info.addEventListener('mouseover', () => {
        randomizedServiceSelection__label_info_text.style.display = 'block';
    });
    
    randomizedServiceSelection__label_info.addEventListener('mouseleave', () => {
        randomizedServiceSelection__label_info_text.style.display = 'none';
    });
    
    
    let randomizedServiceSelection__label_info_text = document.createElement('span');
    randomizedServiceSelection__label_info_text.classList.add('tooltipText');
    randomizedServiceSelection__label_info_text.innerText = INFO_RANDOMIZATION;
    
    let randomizedServiceSelectionLabelContainer = document.createElement('div');
    randomizedServiceSelectionLabelContainer.classList.add('label-container');

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.id = 'checkBoxContainerstimulus';
    checkBoxContainer.classList.add('checkbox-parent');
    
    let checkBoxContainerChildstimulusServiceShutdown = document.createElement('div');
    checkBoxContainerChildstimulusServiceShutdown.classList.add('checkbox-child');
    
    let checkBoxContainerChildstimulusOtherThan = document.createElement('div');
    checkBoxContainerChildstimulusOtherThan.classList.add('checkbox-child');
    
    let checkBoxContainerChildstimulusLaterThan = document.createElement('div');
    checkBoxContainerChildstimulusLaterThan.classList.add('checkbox-child');
    
    let stimulusOtherThanCheckbox = document.createElement('input');
    stimulusOtherThanCheckbox.id = `stimulusOtherThanCheckbox_${selectedID}`;
    stimulusOtherThanCheckbox.type = 'checkbox';
    stimulusOtherThanCheckbox.classList.add('form-check-input');
    stimulusOtherThanCheckbox.disabled = true;
    
    let stimulusOtherThanCheckbox__label = document.createElement('label');
    stimulusOtherThanCheckbox__label.classList.add('form-check-label');
    stimulusOtherThanCheckbox__label.setAttribute('for', `stimulusOtherThanCheckbox_${selectedID}`);
    stimulusOtherThanCheckbox__label.innerText = 'Other than';
    stimulusOtherThanCheckbox__label.style.color = 'grey';
    
    let stimulusLaterThanCheckbox = document.createElement('input');
    stimulusLaterThanCheckbox.id = `stimulusLaterThanCheckbox_${selectedID}`;
    stimulusLaterThanCheckbox.type = 'checkbox';
    stimulusLaterThanCheckbox.classList.add('form-check-input');
    stimulusLaterThanCheckbox.disabled = true;
    
    let stimulusLaterThanCheckbox__label = document.createElement('label');
    stimulusLaterThanCheckbox__label.classList.add('form-check-label');
    stimulusLaterThanCheckbox__label.setAttribute('for', `stimulusLaterThanCheckbox_${selectedID}`);
    stimulusLaterThanCheckbox__label.innerText = 'Later than';
    stimulusLaterThanCheckbox__label.style.color = 'grey';

    let stimulusCheckBox = document.createElement('input');
    stimulusCheckBox.id = `stimulusCheckBox_${selectedID}`;
    stimulusCheckBox.type = 'checkbox';
    stimulusCheckBox.classList.add('form-check-input');

    let stimulusCheckBox__label = document.createElement('label');
    stimulusCheckBox__label.classList.add('form-check-label');
    stimulusCheckBox__label.setAttribute('for', `stimulusCheckBox_${selectedID}`);
    stimulusCheckBox__label.innerText = 'Service shutdown';
    
    let stimulusLabelContainer = document.createElement('div');
    stimulusLabelContainer.classList.add('label-container');
    
    let stimulusCheckBox__label_info = document.createElement('i');
    stimulusCheckBox__label_info.classList.add('bi');
    stimulusCheckBox__label_info.classList.add('bi-info-circle');
    stimulusCheckBox__label_info.classList.add('toolTip');
    
    stimulusCheckBox__label_info.addEventListener('mouseover', () => {
        stimulusCheckBox__label_info_text.style.display = 'block';
    });
    
    stimulusCheckBox__label_info.addEventListener('mouseleave', () => {
        stimulusCheckBox__label_info_text.style.display = 'none';
    });
    
    let stimulusCheckBox__label_info_text = document.createElement('span');
    stimulusCheckBox__label_info_text.classList.add('tooltipText');
    stimulusCheckBox__label_info_text.innerText = INFO_TYPE_OF_FAILURE;

    let stimulusCheckBoxContainer__label = document.createElement('label');
    stimulusCheckBoxContainer__label.classList.add('form-check-label');
    stimulusCheckBoxContainer__label.classList.add('label-padding');
    stimulusCheckBoxContainer__label.setAttribute('for', 'checkBoxContainerstimulus');
    stimulusCheckBoxContainer__label.innerText = 'Stimulus (*)';

    let resilienceScenarioDescription = document.createElement('input');
    resilienceScenarioDescription.id = `resilienceScenarioDescription_${selectedID}`;
    resilienceScenarioDescription.type = 'text';
    resilienceScenarioDescription.placeholder = 'Describe your scenario shortly...';

    let resilienceScenarioDescription__label = document.createElement('label');
    resilienceScenarioDescription__label.innerText = 'Scenario Description';
    resilienceScenarioDescription__label.setAttribute("for", `resilienceScenarioDescription_${selectedID}`);
    resilienceScenarioDescription__label.classList.add('label-padding');
    
    let resilienceScenarioDescriptionLabelContainer = document.createElement('div');
    resilienceScenarioDescriptionLabelContainer.classList.add('label-container');
    
    let resilienceScenarioDescription__label_info = document.createElement('i');
    resilienceScenarioDescription__label_info.classList.add('bi');
    resilienceScenarioDescription__label_info.classList.add('bi-info-circle');
    resilienceScenarioDescription__label_info.classList.add('toolTip');
    
    resilienceScenarioDescription__label_info.addEventListener('mouseover', () => {
        resilienceScenarioDescription__label_info_text.style.display = 'block';
    });
    
    resilienceScenarioDescription__label_info.addEventListener('mouseleave', () => {
        resilienceScenarioDescription__label_info_text.style.display = 'none';
    });
    
    let resilienceScenarioDescription__label_info_text = document.createElement('span');
    resilienceScenarioDescription__label_info_text.classList.add('tooltipText');
    resilienceScenarioDescription__label_info_text.innerText = INFO_SCENARIO_DESC;

    let resilienceScenarioDescription__invalid = document.createElement('p');
    resilienceScenarioDescription__invalid.id = `resilienceScenarioDescription__invalid_${selectedID}`;
    resilienceScenarioDescription__invalid.innerText = RESILIENCE_SCENARIO_NAME_INFO;
    resilienceScenarioDescription__invalid.classList.add('error-info');
    resilienceScenarioDescription__invalid.style.display = 'none';

    let resilienceScenarioEnvironmentSelect = document.createElement('select');
    resilienceScenarioEnvironmentSelect.id = `resilienceScenarioEnvironmentTypeSelect_${selectedID}`;

    for (const [key, value] of Object.entries(ResilienceEnvironmentEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioEnvironmentSelect.appendChild(optionItem);
    }

    let resilienceScenarioEnvironment__label = document.createElement('label');
    resilienceScenarioEnvironment__label.innerText = 'Environment (*)';
    resilienceScenarioEnvironment__label.setAttribute("for", `resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
    resilienceScenarioEnvironment__label.classList.add('label-padding');
    
    let resilienceScenarioEnvironmentLabelContainer = document.createElement('div');
    resilienceScenarioEnvironmentLabelContainer.classList.add('label-container');
    
    let resilienceScenarioEnvironment__label_info = document.createElement('i');
    resilienceScenarioEnvironment__label_info.classList.add('bi');
    resilienceScenarioEnvironment__label_info.classList.add('bi-info-circle');
    resilienceScenarioEnvironment__label_info.classList.add('toolTip');
    
    resilienceScenarioEnvironment__label_info.addEventListener('mouseover', () => {
        resilienceScenarioEnvironment__label_info_text.style.display = 'block';
    });
    
    resilienceScenarioEnvironment__label_info.addEventListener('mouseleave', () => {
        resilienceScenarioEnvironment__label_info_text.style.display = 'none';
    });
    
    let resilienceScenarioEnvironment__label_info_text = document.createElement('span');
    resilienceScenarioEnvironment__label_info_text.classList.add('tooltipText');
    resilienceScenarioEnvironment__label_info_text.innerText = INFO_EXECUTION_CONTEXT;

    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    resilienceScenarioEnvironmentType__invalid.id = `resilienceScenarioEnvironmentType__invalid_${selectedID}`;
    resilienceScenarioEnvironmentType__invalid.innerText = RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO;
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';
    
    let executionContextScheduleContainerOfficeHours = document.createElement('div');
    executionContextScheduleContainerOfficeHours.id = 'executionContextScheduleContainerOfficeHours';
    executionContextScheduleContainerOfficeHours.classList.add('checkbox-child');
    
    let executionContextScheduleContainerOffHours = document.createElement('div');
    executionContextScheduleContainerOffHours.id = 'executionContextScheduleContainerOffHours';
    executionContextScheduleContainerOffHours.classList.add('checkbox-child');
    
    let executionContextScheduleParentContainer = document.createElement('div');
    executionContextScheduleParentContainer.id = 'executionContextScheduleParentContainer';
    executionContextScheduleParentContainer.classList.add('checkbox-parent');
    
    let executionContextScheduleParentContainer__label = document.createElement('label');
    executionContextScheduleParentContainer__label.id = 'executionContextScheduleParentContainer__label';
    executionContextScheduleParentContainer__label.innerText = 'Additional Environment Information';
    executionContextScheduleParentContainer__label.setAttribute('for', 'executionContextScheduleParentContainer');
    executionContextScheduleParentContainer__label.classList.add('form-check-label');
    executionContextScheduleParentContainer__label.classList.add('label-padding');
    
    let executionContextLabelContainer = document.createElement('div');
    executionContextLabelContainer.classList.add('label-container');
    
    let executionContext__label_info = document.createElement('i');
    executionContext__label_info.classList.add('bi');
    executionContext__label_info.classList.add('bi-info-circle');
    executionContext__label_info.classList.add('toolTip');
    
    executionContext__label_info.addEventListener('mouseover', () => {
        executionContext__label_info_text.style.display = 'block';
    });
    
    executionContext__label_info.addEventListener('mouseleave', () => {
        executionContext__label_info_text.style.display = 'none';
    });
    
    let executionContext__label_info_text = document.createElement('span');
    executionContext__label_info_text.classList.add('tooltipText');
    executionContext__label_info_text.innerText = INFO_ENVIRONMENT_INFORMATION;
    
    let executionContextWorkingHoursCheckBox = document.createElement('input');
    executionContextWorkingHoursCheckBox.id = `executionContextWorkingHoursCheckBox_${selectedID}`;
    executionContextWorkingHoursCheckBox.type = 'checkbox';
    executionContextWorkingHoursCheckBox.classList.add('form-check-input');
    executionContextWorkingHoursCheckBox.classList.add('label-padding');;
    
    let executionContextWorkingHoursCheckBox__label = document.createElement('label');
    executionContextWorkingHoursCheckBox__label.id = 'executionContextWorkingHoursCheckBox__label';
    executionContextWorkingHoursCheckBox__label.innerText = 'Office Hours 08:00 am to 16:00 pm';
    executionContextWorkingHoursCheckBox__label.classList.add('form-check-label')
    executionContextWorkingHoursCheckBox__label.setAttribute('for', `executionContextWorkingHoursCheckBox_${selectedID}`);
    
    let executionContextOffWorkingHoursCheckBox = document.createElement('input');
    executionContextOffWorkingHoursCheckBox.id = `executionContextOffWorkingHoursCheckBox_${selectedID}`;
    executionContextOffWorkingHoursCheckBox.type = 'checkbox';
    executionContextOffWorkingHoursCheckBox.classList.add('form-check-input');
    executionContextOffWorkingHoursCheckBox.classList.add('label-padding');

    let executionContextOffWorkingHoursCheckBox__label = document.createElement('label');
    executionContextOffWorkingHoursCheckBox__label.id = 'executionContextOffWorkingHoursCheckBox__label';
    executionContextOffWorkingHoursCheckBox__label.innerText = 'Off Schedule after 16:00 pm';
    executionContextOffWorkingHoursCheckBox__label.classList.add('form-check-label')
    executionContextOffWorkingHoursCheckBox__label.setAttribute('for', `executionContextOffWorkingHoursCheckBox_${selectedID}`);

    let stimulusCheckBox__invalid = document.createElement('p');
    stimulusCheckBox__invalid.id = `stimulusCheckBox__invalid_${selectedID}`;
    stimulusCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;
    stimulusCheckBox__invalid.classList.add('error-info');
    stimulusCheckBox__invalid.style.display = 'none';
    
    let responseMeasureCheckboxContainer = document.createElement('div');
    responseMeasureCheckboxContainer.classList.add('checkbox-parent');
    
    let responseMeasure__invalid = document.createElement('p');
    responseMeasure__invalid.id = `responseMeasure__invalid_${selectedID}`;
    responseMeasure__invalid.innerText = INVALID_RESPONSE_MEASURE;
    responseMeasure__invalid.classList.add('error-info');
    responseMeasure__invalid.style.display = 'none';
    
    let responseMeasureCheckBoxLabelContainer = document.createElement('div');
    responseMeasureCheckBoxLabelContainer.classList.add('label-container');
    
    let responseMeasureCheckboxLabel = document.createElement('label');
    responseMeasureCheckboxLabel.innerText = 'Response Measure (*)';
    responseMeasureCheckboxLabel.classList.add('label-padding');
    
    let responseMeasureCheckboxLabel__info = document.createElement('i');
    responseMeasureCheckboxLabel__info.classList.add('bi');
    responseMeasureCheckboxLabel__info.classList.add('bi-info-circle');
    responseMeasureCheckboxLabel__info.classList.add('toolTip');
    
    let responseMeasureResponseTimeCheckboxContainerChild = document.createElement('div');
    responseMeasureResponseTimeCheckboxContainerChild.classList.add('checkbox-child');
    
    let responseMeasureResponseTimeCheckbox = document.createElement('input');
    responseMeasureResponseTimeCheckbox.type = 'checkbox';
    responseMeasureResponseTimeCheckbox.id = `responseMeasureCheckbox_${selectedID}`;
    responseMeasureResponseTimeCheckbox.classList.add('form-check-input');
    responseMeasureResponseTimeCheckbox.classList.add('label-padding');
    
    responseMeasureResponseTimeCheckbox.addEventListener('click', () => {
        responseMeasureResponseTimeInput.disabled = !responseMeasureResponseTimeInput.disabled;
    });
    
    let responseMeasureResponseTimeInput = document.createElement('input');
    responseMeasureResponseTimeInput.id = `responseMeasureResponseTimeInput_${selectedID}`;
    responseMeasureResponseTimeInput.type = 'number';
    responseMeasureResponseTimeInput.placeholder = 'E.g., 1000 ms...';
    responseMeasureResponseTimeInput.disabled = true;
    responseMeasureResponseTimeInput.style.height = '20px';
    responseMeasureResponseTimeInput.style.width = '135px';
    
    let responseMeasureResponseTimeCheckbox__label = document.createElement('label');
    responseMeasureResponseTimeCheckbox__label.classList.add('form-check-label');
    responseMeasureResponseTimeCheckbox__label.setAttribute('for', `responseMeasureCheckbox_${selectedID}`)
    responseMeasureResponseTimeCheckbox__label.innerText = 'Response time';
    
    let responseTimeReferenceValue = document.createElement('p');
    responseTimeReferenceValue.classList.add('reference-values');
    responseTimeReferenceValue.innerText = '(approx. < 3000 ms)'
    
    let responseMeasureRecoveryTimeCheckboxContainerChild = document.createElement('div');
    responseMeasureRecoveryTimeCheckboxContainerChild.classList.add('checkbox-child');
    
    let responseMeasureRecoveryTimeCheckbox = document.createElement('input');
    responseMeasureRecoveryTimeCheckbox.type = 'checkbox';
    responseMeasureRecoveryTimeCheckbox.id = `responseMeasureRecoveryTimeCheckbox_${selectedID}`;
    responseMeasureRecoveryTimeCheckbox.classList.add('form-check-input');
    responseMeasureRecoveryTimeCheckbox.classList.add('label-padding');
    
    responseMeasureRecoveryTimeCheckbox.addEventListener('click', () => {
        responseMeasureRecoveryTimeInput.disabled = !responseMeasureRecoveryTimeInput.disabled;
    });
    
    let responseMeasureRecoveryTimeInput = document.createElement('input');
    responseMeasureRecoveryTimeInput.id = `responseMeasureRecoveryTimeInput_${selectedID}`;
    responseMeasureRecoveryTimeInput.type = 'number';
    responseMeasureRecoveryTimeInput.placeholder = 'E.g., 50000 ms';
    responseMeasureRecoveryTimeInput.disabled = true;
    responseMeasureRecoveryTimeInput.style.height = '20px';
    responseMeasureRecoveryTimeInput.style.width = '135px';
    
    let responseMeasureRecoveryTimeCheckbox__label = document.createElement('label');
    responseMeasureRecoveryTimeCheckbox__label.classList.add('form-check-label');
    responseMeasureRecoveryTimeCheckbox__label.setAttribute('for', `responseMeasureRecoveryTimeCheckbox_${selectedID}`);
    responseMeasureRecoveryTimeCheckbox__label.innerText = 'Recovery Time';
    
    let recoverTimeReferenceValue = document.createElement('p');
    recoverTimeReferenceValue.classList.add('reference-values');
    recoverTimeReferenceValue.innerText = '(approx. < 5 min)';

    /**
     * This is probably going to be the summary view for all resilience scenarios
     */
    let resilienceTemplateView__btn__open = document.createElement('button');
    resilienceTemplateView__btn__open.id = selectedID;
    resilienceTemplateView__btn__open.innerText = 'Resilience Scenario ' + selectedID;
    // elementContainer.appendChild(resilienceTemplateView__btn__open);
    resilienceTemplateView__btn__open.classList.add('btn');
    resilienceTemplateView__btn__open.classList.add('btn-primary');

    // Opens the resilience template (summary) view
    resilienceTemplateView__btn__open.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'block';
    });
    
    /**
     * Appending all child nodes to parent container, i.e., template view
     */
    modal__container.appendChild(resilienceTemplateModal);
    resilienceTemplateModal.appendChild(resilienceTemplateContent);
    resilienceTemplateContent.appendChild(header);
    resilienceTemplateContent.appendChild(resilienceTemplateContentInputTopLevelContainer);
    
    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__label);
    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__info);
    resilienceServiceAmountLabelContainer.appendChild(resilienceServiceAmount__info_text);
    
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label);
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label_info);
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label_info_text);
    
    randomizedServiceSelectionLabelContainer.appendChild(checkBoxContainer__label);
    randomizedServiceSelectionLabelContainer.appendChild(randomizedServiceSelection__label_info);
    randomizedServiceSelectionLabelContainer.appendChild(randomizedServiceSelection__label_info_text);
    
    resilienceScenarioDescriptionLabelContainer.appendChild(resilienceScenarioDescription__label);
    resilienceScenarioDescriptionLabelContainer.appendChild(resilienceScenarioDescription__label_info);
    resilienceScenarioDescriptionLabelContainer.appendChild(resilienceScenarioDescription__label_info_text);
    
    stimulusLabelContainer.appendChild(stimulusCheckBoxContainer__label);
    stimulusLabelContainer.appendChild(stimulusCheckBox__label_info);
    stimulusLabelContainer.appendChild(stimulusCheckBox__label_info_text);
    
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info);
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info_text);
    
    executionContextLabelContainer.appendChild(executionContextScheduleParentContainer__label);
    executionContextLabelContainer.appendChild(executionContext__label_info);
    executionContextLabelContainer.appendChild(executionContext__label_info_text);
    
    responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel);
    responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel__info);
    // TODO info text element
    
    responseMeasureCheckboxContainer.appendChild(responseMeasureResponseTimeCheckboxContainerChild);
    responseMeasureCheckboxContainer.appendChild(responseTimeReferenceValue);
    responseMeasureCheckboxContainer.appendChild(responseMeasureRecoveryTimeCheckboxContainerChild);
    responseMeasureCheckboxContainer.appendChild(recoverTimeReferenceValue);
    
    responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureResponseTimeCheckbox__label);
    responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureResponseTimeCheckbox);
    responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureResponseTimeInput);
    
    responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(responseMeasureRecoveryTimeCheckbox__label);
    responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(responseMeasureRecoveryTimeCheckbox);
    responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(responseMeasureRecoveryTimeInput);
    
    artifactValueContainer.appendChild(artifactDescriptor);
    artifactValueContainer.appendChild(artifactValue);
    
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);
    
    checkBoxContainerChildstimulusServiceShutdown.appendChild(stimulusCheckBox__label);
    checkBoxContainerChildstimulusServiceShutdown.appendChild(stimulusCheckBox);
    
    checkBoxContainerChildstimulusOtherThan.appendChild(stimulusOtherThanCheckbox__label);
    checkBoxContainerChildstimulusOtherThan.appendChild(stimulusOtherThanCheckbox);
    
    checkBoxContainerChildstimulusLaterThan.appendChild(stimulusLaterThanCheckbox__label);
    checkBoxContainerChildstimulusLaterThan.appendChild(stimulusLaterThanCheckbox);
    
    checkBoxContainer.appendChild(checkBoxContainerChildstimulusServiceShutdown);
    checkBoxContainer.appendChild(checkBoxContainerChildstimulusOtherThan);
    checkBoxContainer.appendChild(checkBoxContainerChildstimulusLaterThan);
    
    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox__label);
    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox);
    
    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox__label);
    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox);
    
    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOfficeHours);
    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOffHours);
    
    
    resilienceTemplateViewContainer__left.appendChild(artifactValueContainer);
    resilienceTemplateViewContainer__left.appendChild(resilienceScenarioDescriptionLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(resilienceScenarioDescription);
    resilienceTemplateViewContainer__left.appendChild(resilienceScenarioDescription__invalid);
    resilienceTemplateViewContainer__left.appendChild(stimulusLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(checkBoxContainer);
    resilienceTemplateViewContainer__left.appendChild(stimulusCheckBox__invalid);
    
    // this goes right
    resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentSelect);
    resilienceTemplateViewContainer__right.appendChild(executionContextLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(executionContextScheduleParentContainer);
    
    // this goes left
    resilienceTemplateViewContainer__left.appendChild(resilienceServiceAmountLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(resilienceServiceAmount);
    resilienceTemplateViewContainer__left.appendChild(resilienceServiceAmount__invalid);
    resilienceTemplateViewContainer__left.appendChild(randomizedServiceSelectionLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(checkBoxContainerRandom);
    resilienceTemplateViewContainer__left.appendChild(timeOfServiceFailureLabelContainer);
    resilienceTemplateViewContainer__left.appendChild(timeOfServiceFailure);
    resilienceTemplateViewContainer__left.appendChild(timeOfServiceFailure__invalid);
    
    resilienceTemplateViewContainer__right.appendChild(responseMeasureCheckBoxLabelContainer);
    resilienceTemplateViewContainer__right.appendChild(responseMeasureCheckboxContainer);
    resilienceTemplateViewContainer__right.appendChild(responseMeasure__invalid);
    
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__left);
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__right);
    
    createButtonContainer(selectedID);
    resilienceTemplateModal.style.display = 'block';
    
    /**
     * Check if ggenerate button already exists, create otherwise. 
     */
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');
    
    if (!getGenerateAndPush__btn) {
        createDisabledGenerateBtn();
    }
}

const removeResilienceTemplateForNode = (selectedID) => {
    let getNode = $(`[data-element-id=${selectedID}`).get(0);
    let getSummaryView = document.getElementById(selectedID);
    
    console.log("Found the following node: ", getNode);
    console.log("Found the following summary view: ", getSummaryView);
    
    getSummaryView.remove();
}

/**
 * Creates a resilience template from a selected node;
 * @param {} selectedID
 */
export const createResilienceTemplate = (selectedID) => {

    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    if (resilienceTemplateModal) {
        console.log("Modal exists with id: ", resilienceTemplateModal.id);
        resilienceTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createResilienceTemplateView(selectedID);
    }
}

