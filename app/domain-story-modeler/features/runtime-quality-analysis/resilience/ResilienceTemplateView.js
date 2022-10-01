// 'use-strict';
import { ResilienceEnvironmentEnum, ResilienceTemplate } from '../classes/resilience/ResilienceTemplate';
import { VERIFICATION_MODAL_NOTIFICATION, RESILIENCE_FAULT_TYPE_INFO, RESILIENCE_SCENARIO_NAME_INFO, RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO, SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO, SERVICE_TIME_TO_FAILURE_INFO } from '../RuntimeAnalysisConstants';
import { saveResilienceTemplate } from './saveResilienceTemplate';
import { createDisabledGenerateBtn } from '../generateTemplateObject';


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

const confirmGenerationOfResilienceTemplate = (getConfirmation) => {
    let topLevelModal = document.getElementById('modal_resilience_content');

    let confirmationModal = document.createElement('div');

    confirmationModal.id = 'confirmationModal';
    confirmationModal.classList.add('confirmation-modal');

    let confirmationModalContent = document.createElement('div');

    confirmationModalContent.id = 'confirmationModalContent';
    confirmationModalContent.classList.add('confirmation-modal-content');

    let confirmationModalContentButtonContainer = document.createElement('div');
    confirmationModalContentButtonContainer.id = 'confirmationModalContentButtonContainer';
    confirmationModalContentButtonContainer.classList.add('btn-container-parent');

    let confirmation__btn = document.createElement('div');
    let abort__btn = document.createElement('div');

    let information_text = document.createElement('p');
    information_text.innerText = VERIFICATION_MODAL_NOTIFICATION;
    information_text.classList.add('info-text');

    confirmation__btn.id = 'verification_btn';
    abort__btn.id = 'abort_btn';

    confirmation__btn.classList.add('btn');
    confirmation__btn.classList.add('btn-primary');

    abort__btn.classList.add('btn');
    abort__btn.classList.add('btn-secondary');

    confirmation__btn.innerText = 'Bestätigen';
    abort__btn.innerText = 'Abbrechen';

    confirmation__btn.addEventListener('click', () => {
        console.log('Waiting for approvement...');
        getConfirmation();
    });

    abort__btn.addEventListener('click', () => {
        console.log('User does not approve to generation!');
        confirmationModal.style.display = 'none';
    })

    confirmationModalContent.appendChild(information_text);
    confirmationModalContent.appendChild(confirmationModalContentButtonContainer);
    confirmationModalContentButtonContainer.appendChild(confirmation__btn);
    confirmationModalContentButtonContainer.appendChild(abort__btn);
    confirmationModal.appendChild(confirmationModalContent);

    topLevelModal.appendChild(confirmationModal);
    confirmationModal.style.display = 'block';

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

    let resilienceServiceFailureTemplateContentInputContainer = document.createElement('div');
    resilienceServiceFailureTemplateContentInputContainer.id = `resilienceServiceFailureTemplateContentInputContainer_${selectedID}`;
    resilienceServiceFailureTemplateContentInputContainer.classList.add('input__container');

    let resilienceServiceAmount = document.createElement('input');
    resilienceServiceAmount.id = `resilienceServiceAmount_${selectedID}`;
    resilienceServiceAmount.type = 'number';
    resilienceServiceAmount.placeholder = 'Give a number for total failing services (min. 1)...';
    resilienceServiceAmount.disabled = true;
    resilienceServiceAmount.value = 1;
    
    let resilienceServiceAmount__info = document.createElement('i');
    resilienceServiceAmount__info.classList.add('bi');
    resilienceServiceAmount__info.classList.add('bi-info-circle');
    
    let resilienceServiceAmountLabelContainer = document.createElement('div');

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
    timeOfServiceFailure.type = 'text';

    let timeOfServiceFailure__label = document.createElement('label');
    timeOfServiceFailure__label.id = 'timeOfServiceFailure__label';
    timeOfServiceFailure__label.setAttribute('for', `timeOfServiceFailure_${selectedID}`);
    timeOfServiceFailure__label.innerText = 'Time shutdown occurs';
    timeOfServiceFailure__label.classList.add('label-padding');
    
    let timeOfServiceFailure__label_info = document.createElement('i');
    timeOfServiceFailure__label_info.classList.add('bi');
    timeOfServiceFailure__label_info.classList.add('bi-info-circle');
    
    let timeOfServiceFailureLabelContainer = document.createElement('div');

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
        resilienceServiceAmount.disabled = false;
    })
    
    let randomServiceSelectionCheckBox__label = document.createElement('label');
    randomServiceSelectionCheckBox__label.classList.add('form-check-label');
    randomServiceSelectionCheckBox__label.setAttribute('for', `randomServiceSelectionCheckBox_${selectedID}`);
    randomServiceSelectionCheckBox__label.innerText = 'No';
    
    let randomizedServiceSelection__label_info = document.createElement('i');
    randomizedServiceSelection__label_info.classList.add('bi');
    randomizedServiceSelection__label_info.classList.add('bi-info-circle');
    
    let randomizedServiceSelectionLabelContainer = document.createElement('div');

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.id = 'checkBoxContainerFaultType';
    checkBoxContainer.classList.add('checkbox-child');

    let faultTypeCheckBox = document.createElement('input');
    faultTypeCheckBox.id = `faultTypeCheckBox_${selectedID}`;
    faultTypeCheckBox.type = 'checkbox';
    faultTypeCheckBox.classList.add('form-check-input');

    let faultTypeCheckBox__label = document.createElement('label');
    faultTypeCheckBox__label.classList.add('form-check-label');
    faultTypeCheckBox__label.setAttribute('for', `faultTypeCheckBox_${selectedID}`);
    faultTypeCheckBox__label.innerText = 'Service shutdown';
    
    let faultTypeLabelContainer = document.createElement('div');
    
    let faultTypeCheckBox__label_info = document.createElement('i');
    faultTypeCheckBox__label_info.classList.add('bi');
    faultTypeCheckBox__label_info.classList.add('bi-info-circle');

    let faultTypeCheckBoxContainer__label = document.createElement('label');
    faultTypeCheckBoxContainer__label.classList.add('form-check-label');
    faultTypeCheckBoxContainer__label.classList.add('label-padding');
    faultTypeCheckBoxContainer__label.setAttribute('for', 'checkBoxContainerFaultType');
    faultTypeCheckBoxContainer__label.innerText = 'Type of Failure (*)';

    let resilienceScenarioName = document.createElement('input');
    resilienceScenarioName.id = `resilienceScenarioName_${selectedID}`;
    resilienceScenarioName.type = 'text';
    resilienceScenarioName.placeholder = 'Describe your scenario shortly...';

    let resilienceScenarioName__label = document.createElement('label');
    resilienceScenarioName__label.innerText = 'Scenario Description (*)';
    resilienceScenarioName__label.setAttribute("for", `resilienceScenarioName_${selectedID}`);
    resilienceScenarioName__label.classList.add('label-padding');
    
    let resilienceScenarioNameLabelContainer = document.createElement('div');
    
    let resilienceScenarioName__label_info = document.createElement('i');
    resilienceScenarioName__label_info.classList.add('bi');
    resilienceScenarioName__label_info.classList.add('bi-info-circle');

    let resilienceScenarioName__invalid = document.createElement('p');
    resilienceScenarioName__invalid.id = `resilienceScenarioName__invalid_${selectedID}`;
    resilienceScenarioName__invalid.innerText = RESILIENCE_SCENARIO_NAME_INFO;
    resilienceScenarioName__invalid.classList.add('error-info');
    resilienceScenarioName__invalid.style.display = 'none';

    let resilienceTemplateModal = document.createElement('div');
    resilienceTemplateModal.classList.add('modal_resilience');
    resilienceTemplateModal.id = `modal_resilience_${selectedID}`;

    let resilienceTemplateContent = document.createElement('div');
    resilienceTemplateContent.id = `modal_resilience_content_${selectedID}`;
    resilienceTemplateContent.classList.add('modal_resilience_content');

    let resilienceTemplateContentInputContainer = document.createElement('div');
    resilienceTemplateContentInputContainer.id = 'input__container';
    resilienceTemplateContentInputContainer.classList.add('input__container');

    let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');
    resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

    let resilienceScenarioEnvironmentSelect = document.createElement('select');
    resilienceScenarioEnvironmentSelect.id = `resilienceScenarioEnvironmentTypeSelect_${selectedID}`;

    for (const [key, value] of Object.entries(ResilienceEnvironmentEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioEnvironmentSelect.appendChild(optionItem);
    }

    let resilienceScenarioEnvironment__label = document.createElement('label');
    resilienceScenarioEnvironment__label.innerText = 'Execution Context (*)';
    resilienceScenarioEnvironment__label.setAttribute("for", `resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
    resilienceScenarioEnvironment__label.classList.add('label-padding');
    
    let resilienceScenarioEnvironmentLabelContainer = document.createElement('div');
    
    let resilienceScenarioEnvironment__label_info = document.createElement('i');
    resilienceScenarioEnvironment__label_info.classList.add('bi');
    resilienceScenarioEnvironment__label_info.classList.add('bi-info-circle');

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
    
    let executionContext__label_info = document.createElement('i');
    executionContext__label_info.classList.add('bi');
    executionContext__label_info.classList.add('bi-info-circle');
    
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

    let faultTypeCheckBox__invalid = document.createElement('p');
    faultTypeCheckBox__invalid.id = `faultTypeCheckBox__invalid_${selectedID}`;
    faultTypeCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;
    faultTypeCheckBox__invalid.classList.add('error-info');
    faultTypeCheckBox__invalid.style.display = 'none';


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
    
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label);
    timeOfServiceFailureLabelContainer.appendChild(timeOfServiceFailure__label_info);
    
    randomizedServiceSelectionLabelContainer.appendChild(checkBoxContainer__label);
    randomizedServiceSelectionLabelContainer.appendChild(randomizedServiceSelection__label_info);
    
    resilienceScenarioNameLabelContainer.appendChild(resilienceScenarioName__label);
    resilienceScenarioNameLabelContainer.appendChild(resilienceScenarioName__label_info);
    
    faultTypeLabelContainer.appendChild(faultTypeCheckBoxContainer__label);
    faultTypeLabelContainer.appendChild(faultTypeCheckBox__label_info);
    
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info);
    
    executionContextLabelContainer.appendChild(executionContextScheduleParentContainer__label);
    executionContextLabelContainer.appendChild(executionContext__label_info);
    
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmountLabelContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount__invalid);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(randomizedServiceSelectionLabelContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainerRandom);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailureLabelContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__invalid);
    
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);
    
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioNameLabelContainer);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__invalid);
    
    resilienceTemplateContentInputContainer.appendChild(faultTypeLabelContainer);
    checkBoxContainer.appendChild(faultTypeCheckBox__label);
    checkBoxContainer.appendChild(faultTypeCheckBox);
    resilienceTemplateContentInputContainer.appendChild(checkBoxContainer);
    resilienceTemplateContentInputContainer.appendChild(faultTypeCheckBox__invalid);
    
    
    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox__label);
    executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox);
    
    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox__label);
    executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox);
    
    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOfficeHours);
    executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOffHours);
    
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentLabelContainer);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentSelect);
    resilienceTemplateContentInputContainer.appendChild(executionContextLabelContainer);
    resilienceTemplateContentInputContainer.appendChild(executionContextScheduleParentContainer);
    
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateContentInputContainer);
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceServiceFailureTemplateContentInputContainer);
    
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

