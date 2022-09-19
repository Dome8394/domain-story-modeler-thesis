// 'use-strict';
import { ResilienceEnvironmentEnum, ResilienceTemplate } from './classes/ResilienceTemplate';
import { VERIFICATION_MODAL_NOTIFICATION, RESILIENCE_FAULT_TYPE_INFO, RESILIENCE_SCENARIO_NAME_INFO, RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO, SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO, SERVICE_TIME_TO_FAILURE_INFO } from './RuntimeAnalysisConstants';
import { MockMapping } from './mapping/MockMapping';


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
    let resilienceServiceUnderTestElement = document.getElementById('resilienceServiceUnderTest');
    let resilienceServiceUnderTestElementValue = resilienceServiceUnderTestElement.value;

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
    let resilienceServiceUnderTest__invalidElement = document.getElementById('resilienceServiceUnderTest__invalid');
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

    if (!resilienceServiceUnderTestElementValue) {
        console.log("resilienceServiceElementValue is invalid");
        resilienceServiceUnderTest__invalidElement.style.display = 'block';
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
    
    let resilienceServiceUnderTestElement = document.getElementById('resilienceServiceUnderTest');
    let resilienceServiceUnderTestElementValue = resilienceServiceUnderTestElement.value;

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
            resilienceServiceUnderTestElementValue,
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

const createButtonContainer = (selectedID) => {

    let modal_resilience_content = document.getElementById(`modal_resilience_content_${selectedID}`);
    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

    let resilienceTemplateBtnContainer = document.createElement('div');
    let resilienceTemplateBtnContainerParent = document.createElement('div');
    let resilienceTemplateBtnContainerChild = document.createElement('div');
    let resilienceTemplateView__btn__close = document.createElement('button');
    let resilienceTemplateView__btn__save = document.createElement('button');
    let resilienceTemplateView__btn__generate = document.createElement('button');

    resilienceTemplateBtnContainerParent.id = 'resilienceTemplateBtnContainerParent';

    resilienceTemplateView__btn__close.innerText = 'Schließen';
    resilienceTemplateView__btn__save.innerText = 'Speichern';
    resilienceTemplateView__btn__generate.innerText = 'Generieren';

    resilienceTemplateView__btn__close.classList.add('btn');
    resilienceTemplateView__btn__close.classList.add('btn-secondary');

    resilienceTemplateView__btn__save.classList.add('btn');
    resilienceTemplateView__btn__save.classList.add('btn-primary');

    resilienceTemplateView__btn__generate.classList.add('btn');
    resilienceTemplateView__btn__generate.classList.add('btn-primary');
    resilienceTemplateView__btn__generate.disabled = true;
    resilienceTemplateView__btn__generate.id = 'resilienceTemplateView__btn__generate';

    resilienceTemplateBtnContainerParent.classList.add('btn-container-parent');


    /**
     * Listeners
     */
    resilienceTemplateView__btn__close.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'none';
    })

    resilienceTemplateView__btn__generate.addEventListener('click', () => {
        console.log("Create object from template and push to queue...");
        generateResilienceScenarioTemplate();
    });

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
    resilienceTemplateBtnContainerChild.appendChild(resilienceTemplateView__btn__generate);
    resilienceTemplateBtnContainer.appendChild(resilienceTemplateView__btn__save);
    resilienceTemplateBtnContainer.appendChild(resilienceTemplateView__btn__close);

    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateBtnContainer);
    resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateBtnContainerChild);

    modal_resilience_content.appendChild(resilienceTemplateBtnContainerParent);
}

/**
 * Creates new template view for resilience tests with a unique ID
 * For every new resilience scenario a new template is created
 * @param {} element 
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
    let resilienceServiceAmount__label = document.createElement('label');

    let timeOfServiceFailure = document.createElement('input');
    let timeOfServiceFailure__label = document.createElement('label');

    timeOfServiceFailure.id = 'timeOfServiceFailure';
    timeOfServiceFailure.type = 'text';

    timeOfServiceFailure__label.id = 'timeOfServiceFailure__label';
    timeOfServiceFailure__label.setAttribute('for', 'timeOfServiceFailure');
    timeOfServiceFailure__label.innerText = 'Zeitpunkt des Ausfalls';
    timeOfServiceFailure__label.classList.add('label-padding');

    let checkBoxContainerRandom = document.createElement('div');
    checkBoxContainerRandom.id = 'checkBoxContainerRandomServiceFailure';
    checkBoxContainerRandom.classList.add('checkbox-child');

    let checkBoxContainer__label = document.createElement('label');
    checkBoxContainer__label.classList.add('form-check-label');
    checkBoxContainer__label.classList.add('label-padding');
    checkBoxContainer__label.setAttribute('for', 'checkBoxContainerServiceFailure');
    checkBoxContainer__label.innerText = 'Randomisierte Service Auswahl';

    let randomServiceSelectionCheckBox = document.createElement('input');
    randomServiceSelectionCheckBox.id = 'randomServiceSelectionCheckBox';
    randomServiceSelectionCheckBox.type = 'checkbox';
    randomServiceSelectionCheckBox.classList.add('form-check-input');

    let randomServiceSelectionCheckBox__label = document.createElement('label');
    randomServiceSelectionCheckBox__label.classList.add('form-check-label');
    randomServiceSelectionCheckBox__label.setAttribute('for', 'randomServiceSelectionCheckBox');
    randomServiceSelectionCheckBox__label.innerText = 'Ja';
    
    let resilienceServiceAmount__invalid = document.createElement('p');
    let timeOfServiceFailure__invalid = document.createElement('p');

    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    timeOfServiceFailure__invalid.innerText = SERVICE_TIME_TO_FAILURE_INFO;
    
    resilienceServiceAmount__invalid.classList.add('error-info');
    timeOfServiceFailure__invalid.classList.add('error-info');
    
    resilienceServiceAmount__invalid.id = 'resilienceServiceAmount__invalid';
    timeOfServiceFailure__invalid.id = 'timeOfServiceFailure__invalid';
    
    resilienceServiceAmount.id = 'resilienceServiceAmount';
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    
    resilienceServiceAmount.type = 'number';

    resilienceServiceAmount.placeholder = 'Geben Sie an, wie viele Instanzen betroffen sind (mind. 1)...';

    resilienceServiceAmount__label.setAttribute('for', 'resilienceServiceAmount');
    
    resilienceServiceAmount__label.innerText = 'Anzahl der betroffenen Service Instanzen (*)';
    
    resilienceServiceAmount__invalid.style.display = 'none';
    timeOfServiceFailure__invalid.style.display = 'none';
    
    resilienceServiceAmount__label.style.margin = '2% 0 0 0';

    let resilienceTemplateModal = document.createElement('div');
    resilienceTemplateModal.classList.add('modal_resilience');
    let resilienceTemplateContent = document.createElement('div');
    let resilienceTemplateContentInputContainer = document.createElement('div');

    let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');

    let resilienceTemplateView__btn__open = document.createElement('button');

    let resilienceScenarioName = document.createElement('input');

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

    let resilienceScenarioEnvironmentSelect = document.createElement('select');

    let resilienceScenarioName__invalid = document.createElement('p');
    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    let faultTypeCheckBox__invalid = document.createElement('p');

    /**
     * Create html labels for input fields
     */
    let resilienceScenarioName__label = document.createElement('label');
    let resilienceScenarioEnvironment__label = document.createElement('label');

    /**
     * Adding event listeners
     */
    resilienceTemplateView__btn__open.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'block';
    });

    for (const [key, value] of Object.entries(ResilienceEnvironmentEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioEnvironmentSelect.appendChild(optionItem);
    }

    resilienceTemplateModal.id = `modal_resilience_${selectedID}`;
    resilienceTemplateContent.id = `modal_resilience_content_${selectedID}`;
    resilienceTemplateContent.classList.add('modal_resilience_content');
    resilienceTemplateContentInputContainer.id = 'input__container';
    resilienceTemplateContentInputContainer.classList.add('input__container');

    resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

    resilienceTemplateView__btn__open.id = selectedID;
    resilienceTemplateView__btn__open.innerText = 'Resilience Scenario ' + selectedID;
    elementContainer.appendChild(resilienceTemplateView__btn__open);

    resilienceTemplateView__btn__open.classList.add('btn');
    resilienceTemplateView__btn__open.classList.add('btn-primary');

    resilienceScenarioEnvironmentSelect.id = 'resilienceScenarioEnvironmentTypeSelect';

    resilienceScenarioName__invalid.id = 'resilienceScenarioName__invalid';
    resilienceScenarioEnvironmentType__invalid.id = 'resilienceScenarioEnvironmentType__invalid';
    faultTypeCheckBox__invalid.id = 'faultTypeCheckBox__invalid';

    resilienceScenarioName.id = 'resilienceScenarioName';

    resilienceScenarioName.type = 'text';

    resilienceScenarioName.placeholder = 'Describe your scenario shortly...';

    resilienceScenarioName__label.innerText = 'Scenario Description (*)';
    resilienceScenarioEnvironment__label.innerText = 'Execution Context (*)';

    resilienceScenarioName__invalid.innerText = RESILIENCE_SCENARIO_NAME_INFO;
    resilienceScenarioEnvironmentType__invalid.innerText = RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO;
    faultTypeCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;


    resilienceScenarioName__label.setAttribute("for", 'resilienceScenarioName');
    resilienceScenarioEnvironment__label.setAttribute("for", 'resilienceScenarioEnvironmentSelect');

    resilienceScenarioName__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    faultTypeCheckBox__invalid.classList.add('error-info');

    resilienceScenarioName__invalid.style.display = 'none';
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';
    faultTypeCheckBox__invalid.style.display = 'none';

    resilienceScenarioName__label.style.margin = '2% 0 0 0';
    resilienceScenarioEnvironment__label.style.margin = '2% 0 0 0';

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
    
    resilienceTemplateContent.appendChild(resilienceServiceFailureTemplateContentInputContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__invalid);

    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainerRandom.appendChild(randomServiceSelectionCheckBox);

    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainer__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainerRandom);
    
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

    createButtonContainer(selectedID);

}

const getNodeName = (selectedID) => {
    let canvasItemsList = document.getElementsByClassName('djs-group');
    let test = $(`[data-element-id=${selectedID}]`).get(0);
    console.log("Selecting the right child: ", test.children[0].textContent);
}

export const createResilienceTemplate = (selectedID) => {
    
    getNodeName(selectedID);
    
    console.log(selectedID);
    
    let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);
    
    if (resilienceTemplateModal) {
        console.log("Modal exists with id: ", resilienceTemplateModal.id);
        resilienceTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createResilienceTemplateView(selectedID);
    }
}

