// 'use-strict';
import { ResilienceEnvironmentEnum, ResilienceTemplate } from '../classes/ResilienceTemplate';
import { VERIFICATION_MODAL_NOTIFICATION, RESILIENCE_FAULT_TYPE_INFO, RESILIENCE_SCENARIO_NAME_INFO, RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO, SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO, SERVICE_TIME_TO_FAILURE_INFO } from '../RuntimeAnalysisConstants';
import { MockMapping } from '../mapping/MockMapping';


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
    // console.log(canvasItemsList);

    for (let i = 0; i < canvasItemsList.length; i++) {
        let SVGItemParent = canvasItemsList[i];
        // console.log("Shape id:", SVGItemParent.firstChild.getAttribute('data-element-id'));
    }
}


/**
 * Validates the resilience scenario template inputs if they have been entered by the user.
 * It does not validate the <it>correctness</it> of input data.
 */
const validateResilienceTemplateInput = () => {
    /**
     * Get HTML elements and their values
     */
    let resilienceServiceAmountElement = document.getElementById('resilienceServiceAmount');
    let resilienceServiceAmountElementValue = resilienceServiceAmountElement.value;

    let resilienceScenarioEnvironmentSelectElement = document.getElementById('resilienceScenarioEnvironmentTypeSelect');
    let resilienceScenarioEnvironmentSelectElementValue = resilienceScenarioEnvironmentSelectElement.value;

    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let timeOfServiceFailureElementValue = timeOfServiceFailureElement.value;

    let faultTypeCheckBoxElement = document.getElementById('faultTypeCheckBox');
    let faultTypeCheckBoxElementValue = faultTypeCheckBoxElement.value;


    /**
     * Get error msg elements
     */
    let resilienceServiceAmount__invalidElement = document.getElementById('resilienceServiceAmount__invalid');
    let timeOfServiceFailure__invalidElement = document.getElementById('timeOfServiceFailure__invalid');
    let faultTypeCheckBox__invalid = document.getElementById('faultTypeCheckBox__invalid');
    let resilienceScenarioEnvironmentType__invalid = document.getElementById('resilienceScenarioEnvironmentType__invalid');


    if (!faultTypeCheckBoxElementValue) {
        console.log("faultTypeCheckBoxElementValue is invalid!");
        faultTypeCheckBox__invalid.style.display = 'block';
        return false;
    }

    if (!resilienceServiceAmountElementValue) {
        console.log("resilienceServiceAmountElementValue is invalid");
        resilienceServiceAmount__invalidElement.style.display = 'block';
        return false;
    }

    if (!timeOfServiceFailureElementValue) {
        console.log("timeOfServiceFailureElementValue is invalid!");
        timeOfServiceFailure__invalidElement.style.display = 'block';
        return false;
    }

    if (!resilienceScenarioEnvironmentSelectElementValue) {
        console.log("resilienceScenarioEnvironmentSelectElementValue is invalid!");
        resilienceScenarioEnvironmentType__invalid.style.display = 'block';
        return false;
    }

    return true;
}

const saveResilienceScenarioTemplate = () => {
    let resilienceTemplateView__btn__generate = document.getElementById('resilienceTemplateView__btn__generate');

    let resilienceServiceAmountElement = document.getElementById('resilienceServiceAmount');
    let resilienceServiceAmountElementValue = resilienceServiceAmountElement.value;

    let resilienceScenarioEnvironmentSelectElement = document.getElementById('resilienceScenarioEnvironmentTypeSelect');
    let resilienceScenarioEnvironmentSelectElementValue = resilienceScenarioEnvironmentSelectElement.value;

    let timeOfServiceFailureElement = document.getElementById('timeOfServiceFailure');
    let timeOfServiceFailureElementValue = timeOfServiceFailureElement.value;

    let randomServiceSelectionCheckBox = document.getElementById('randomServiceSelectionCheckBox');
    let randomServiceSelectionCheckBoxValue = randomServiceSelectionCheckBox.checked;

    /**
     * The timeout simulates the saving process and serves only demonstration purposes.
     */
    setTimeout(() => {

        const newResilienceScenarioTemplate = new ResilienceTemplate(
            'test',
            'service failure',
            'application',
            resilienceScenarioEnvironmentSelectElementValue,
            'test',
            timeOfServiceFailureElementValue, resilienceServiceAmountElementValue, randomServiceSelectionCheckBoxValue || true);

        localStorage.setItem('resilienceTemplateObject', JSON.stringify(newResilienceScenarioTemplate));

        resilienceTemplateView__btn__generate.disabled = false;
    }, 2000);
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

/**
 * Retrieves the saved template object and pushes it to a message queue.
 * Queue is not yet implemented.
 */
const generateResilienceScenarioTemplate = () => {

    let userConfirmsToGeneration = false;

    const getConfirmation = () => {
        let getConfirmationModal = document.getElementById('confirmationModal');
        userConfirmsToGeneration = true;
        getConfirmationModal.style.display = 'none';

        if (userConfirmsToGeneration) {
            const resilienceTemplateObject = localStorage.getItem('resilienceTemplateObject');
            console.log("Retrieved object: ", JSON.parse(resilienceTemplateObject));
        }
    }

    confirmGenerationOfResilienceTemplate(getConfirmation);

}

/**
 * Creates the generate and push button on the view
 * if a new template is generated
 */
const createAndAppendGenerateButton = () => {

    let resilienceTemplateView__btn__generate = document.createElement('button');
    resilienceTemplateView__btn__generate.innerText = 'Generate & Push';
    resilienceTemplateView__btn__generate.classList.add('btn');
    resilienceTemplateView__btn__generate.classList.add('btn-primary');
    resilienceTemplateView__btn__generate.style.display = 'none';
    resilienceTemplateView__btn__generate.disabled = true;
    resilienceTemplateView__btn__generate.id = 'resilienceTemplateView__btn__generate';

    resilienceTemplateView__btn__generate.addEventListener('click', () => {
        console.log("Create object from template and push to queue...");
        generateResilienceScenarioTemplate();
    });

}

const createButtonContainer = (selectedID) => {

    let modal_resilience_content = document.getElementById(`modal_resilience_content_${selectedID}`);
    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    let resilienceTemplateBtnContainer = document.createElement('div');
    let resilienceTemplateBtnContainerParent = document.createElement('div');
    let resilienceTemplateBtnContainerChild = document.createElement('div');

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
        if (validateResilienceTemplateInput()) {
            console.log("Validated!");
            saveResilienceScenarioTemplate();
        } else {
            console.log("Resilience failure scenario is incomplete!");
        }
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
    resilienceServiceFailureTemplateContentInputContainer.id = 'resilienceServiceFailureTemplateContentInputContainer';
    resilienceServiceFailureTemplateContentInputContainer.classList.add('input__container');

    let resilienceServiceAmount = document.createElement('input');
    resilienceServiceAmount.id = 'resilienceServiceAmount';
    resilienceServiceAmount.type = 'number';
    resilienceServiceAmount.placeholder = 'Give a number for total failing services (min. 1)...';

    let resilienceServiceAmount__label = document.createElement('label');
    resilienceServiceAmount__label.classList.add('label-padding');
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    resilienceServiceAmount__label.setAttribute('for', 'resilienceServiceAmount');
    resilienceServiceAmount__label.innerText = 'Number of failing instances (*)';

    let resilienceServiceAmount__invalid = document.createElement('p');
    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    resilienceServiceAmount__invalid.id = 'resilienceServiceAmount__invalid';
    resilienceServiceAmount__invalid.classList.add('error-info');
    resilienceServiceAmount__invalid.style.display = 'none';

    let timeOfServiceFailure = document.createElement('input');
    timeOfServiceFailure.id = 'timeOfServiceFailure';
    timeOfServiceFailure.type = 'text';

    let timeOfServiceFailure__label = document.createElement('label');
    timeOfServiceFailure__label.id = 'timeOfServiceFailure__label';
    timeOfServiceFailure__label.setAttribute('for', 'timeOfServiceFailure');
    timeOfServiceFailure__label.innerText = 'Time shutdown occurs';
    timeOfServiceFailure__label.classList.add('label-padding');

    let timeOfServiceFailure__invalid = document.createElement('p');
    timeOfServiceFailure__invalid.innerText = SERVICE_TIME_TO_FAILURE_INFO;
    timeOfServiceFailure__invalid.id = 'timeOfServiceFailure__invalid';
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
    randomServiceSelectionCheckBox.id = 'randomServiceSelectionCheckBox';
    randomServiceSelectionCheckBox.type = 'checkbox';
    randomServiceSelectionCheckBox.classList.add('form-check-input');

    let randomServiceSelectionCheckBox__label = document.createElement('label');
    randomServiceSelectionCheckBox__label.classList.add('form-check-label');
    randomServiceSelectionCheckBox__label.setAttribute('for', 'randomServiceSelectionCheckBox');
    randomServiceSelectionCheckBox__label.innerText = 'Yes';

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.id = 'checkBoxContainerFaultType';
    checkBoxContainer.classList.add('checkbox-child');

    let faultTypeCheckBox = document.createElement('input');
    faultTypeCheckBox.id = 'faultTypeCheckBox';
    faultTypeCheckBox.type = 'checkbox';
    faultTypeCheckBox.classList.add('form-check-input');

    let faultTypeCheckBox__label = document.createElement('label');
    faultTypeCheckBox__label.classList.add('form-check-label');
    faultTypeCheckBox__label.setAttribute('for', 'faultTypeCheckBox');
    faultTypeCheckBox__label.innerText = 'Service shutdown';

    let faultTypeCheckBoxContainer__label = document.createElement('label');
    faultTypeCheckBoxContainer__label.classList.add('form-check-label');
    faultTypeCheckBoxContainer__label.classList.add('label-padding');
    faultTypeCheckBoxContainer__label.setAttribute('for', 'checkBoxContainerFaultType');
    faultTypeCheckBoxContainer__label.innerText = 'Type of Failure (*)';


    let resilienceScenarioName = document.createElement('input');
    resilienceScenarioName.id = 'resilienceScenarioName';
    resilienceScenarioName.type = 'text';
    resilienceScenarioName.placeholder = 'Describe your scenario shortly...';

    let resilienceScenarioName__label = document.createElement('label');
    resilienceScenarioName__label.innerText = 'Scenario Description (*)';
    resilienceScenarioName__label.setAttribute("for", 'resilienceScenarioName');
    resilienceScenarioName__label.classList.add('label-padding');

    let resilienceScenarioName__invalid = document.createElement('p');
    resilienceScenarioName__invalid.id = 'resilienceScenarioName__invalid';
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
    resilienceScenarioEnvironmentSelect.id = 'resilienceScenarioEnvironmentTypeSelect';

    for (const [key, value] of Object.entries(ResilienceEnvironmentEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioEnvironmentSelect.appendChild(optionItem);
    }

    let resilienceScenarioEnvironment__label = document.createElement('label');
    resilienceScenarioEnvironment__label.innerText = 'Execution Context (*)';
    resilienceScenarioEnvironment__label.setAttribute("for", 'resilienceScenarioEnvironmentSelect');
    resilienceScenarioEnvironment__label.classList.add('label-padding');

    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    resilienceScenarioEnvironmentType__invalid.id = 'resilienceScenarioEnvironmentType__invalid';
    resilienceScenarioEnvironmentType__invalid.innerText = RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO;
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';

    let faultTypeCheckBox__invalid = document.createElement('p');
    faultTypeCheckBox__invalid.id = 'faultTypeCheckBox__invalid';
    faultTypeCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;
    faultTypeCheckBox__invalid.classList.add('error-info');
    faultTypeCheckBox__invalid.style.display = 'none';


    /**
     * This is probably going to be the summary view for all resilience scenarios
     */
    let resilienceTemplateView__btn__open = document.createElement('button');
    resilienceTemplateView__btn__open.id = selectedID;
    resilienceTemplateView__btn__open.innerText = 'Resilience Scenario ' + selectedID;
    elementContainer.appendChild(resilienceTemplateView__btn__open);
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
    
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount__invalid);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainer__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainerRandom);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__invalid);
    
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);
    
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__invalid);
    
    resilienceTemplateContentInputContainer.appendChild(faultTypeCheckBoxContainer__label);
    checkBoxContainer.appendChild(faultTypeCheckBox__label);
    checkBoxContainer.appendChild(faultTypeCheckBox);
    resilienceTemplateContentInputContainer.appendChild(checkBoxContainer);
    resilienceTemplateContentInputContainer.appendChild(faultTypeCheckBox__invalid);
    
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentSelect);
    
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateContentInputContainer);
    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceServiceFailureTemplateContentInputContainer);
    
    createButtonContainer(selectedID);
    resilienceTemplateModal.style.display = 'block';
}

/**
 * Retrieves the name of the currently selected node on which a test will be
 * modeled.
 * 
 * @param {} selectedID 
 */
export const getNodeName = (selectedID) => {
    let nodeName = $(`[data-element-id=${selectedID}]`).get(0);
    console.log("Selecting the right child: ", nodeName.children[0].textContent);
    return nodeName.children[0].textContent;
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

    getNodeName(selectedID);

    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    if (resilienceTemplateModal) {
        console.log("Modal exists with id: ", resilienceTemplateModal.id);
        resilienceTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createResilienceTemplateView(selectedID);
    }
}

