import { MockMapping } from '../mapping/MockMapping';
import { saveLoadTestTemplateToLocalStorage } from './saveLoadtestTemplate';
import { LOADTEST_DURATION_INFO, LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO } from '../RuntimeAnalysisConstants';
import { createDisabledGenerateBtn } from '../generateTemplateObject';

/**
 * Get root container element
 */
let modal__container = document.getElementById('modal__container');

const createLoadTestTemplateView = (selectedID) => {

    /**
     * Create html elements
     */
    let header = document.createElement('h3');
    header.innerText = 'Loadtest Specification';
    header.classList.add('template-header');

    let ruler = document.createElement('hr');

    let loadTestTemplateModal = document.createElement('div');
    loadTestTemplateModal.id = `loadTestTemplateModal_${selectedID}`;
    loadTestTemplateModal.classList.add('modal_resilience');

    let loadTestTemplateModalContent = document.createElement('div');
    loadTestTemplateModalContent.id = `loadTestTemplateModalContent_${selectedID}`;
    loadTestTemplateModalContent.classList.add(`modal_resilience_content`);

    /**
     * Append child nodes to root container element
     */
    modal__container.appendChild(loadTestTemplateModal);
    loadTestTemplateModal.appendChild(loadTestTemplateModalContent);
    loadTestTemplateModalContent.appendChild(header);
    loadTestTemplateModalContent.appendChild(ruler);

    // loadTestTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer);
    createAndAppendLoadTestInputFields(selectedID);
    createButtonContainer(selectedID);
    // loadTestTemplateModal.style.display = 'block';
}

const createButtonContainer = (selectedID) => {

    console.log("Appending button container...");
    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);

    let loadTestTemplateButtonContainer = document.createElement('div');
    loadTestTemplateButtonContainer.classList.add('btn-container-parent');

    let loadTestTemplate__save_btn = document.createElement('button');
    loadTestTemplate__save_btn.id = 'loadTestTemplate__save_btn';
    loadTestTemplate__save_btn.innerText = 'Save';
    loadTestTemplate__save_btn.classList.add('btn');
    loadTestTemplate__save_btn.classList.add('btn-primary');
    loadTestTemplate__save_btn.classList.add('custom-btn');

    let loadTestTemplate__close_btn = document.createElement('button');
    loadTestTemplate__close_btn.innerText = 'Close';
    loadTestTemplate__close_btn.classList.add('btn');
    loadTestTemplate__close_btn.classList.add('btn-secondary');
    loadTestTemplate__close_btn.classList.add('custom-btn');

    loadTestTemplate__save_btn.addEventListener('click', () => {
        saveLoadTestTemplateToLocalStorage(selectedID);
    });

    loadTestTemplate__close_btn.addEventListener('click', () => {
        getLoadTestTemplateModal.style.display = 'none';
    });

    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__save_btn);
    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__close_btn);

    getLoadTestTemplateModalContent.appendChild(loadTestTemplateButtonContainer);
}

const createAndAppendLoadTestInputFields = (selectedID) => {

    console.log("Adding input fields...");
    
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);
    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)
    
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');
    
    let loadTestTemplateModalContentTopLevelInputContainer = document.createElement('div');
    loadTestTemplateModalContentTopLevelInputContainer.id = 'loadTestTemplateModalContentTopLevelInputContainer';
    loadTestTemplateModalContentTopLevelInputContainer.classList.add('input__top__container');

    let loadTestTemplatInputContainer__left = document.createElement('div');
    loadTestTemplatInputContainer__left.id = 'loadTestTemplatInputContainer__left';
    loadTestTemplatInputContainer__left.classList.add('input__container');

    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.classList.add('input__container');

    let loadTestDescription__input = document.createElement('input');
    loadTestDescription__input.id = `loadTestDescription__input_${selectedID}`;
    loadTestDescription__input.placeholder = 'Give a short description...';
    loadTestDescription__input.type = 'text';

    let loadTestDescription__label = document.createElement('label');
    loadTestDescription__label.innerText = 'Describe your load test';
    loadTestDescription__label.classList.add('label-padding');
    loadTestDescription__label.setAttribute('for', 'loadTestDescription__input')

    let duration__input = document.createElement('input');
    duration__input.id = `duration__input_${selectedID}`;
    duration__input.placeholder = 'Please give a duration in minutes';
    duration__input.type = 'number';

    let duration__input__invalid = document.createElement('p');
    duration__input__invalid.id = `duration__input__invalid_${selectedID}`;
    duration__input__invalid.innerText = LOADTEST_DURATION_INFO;
    duration__input__invalid.classList.add('error-info');

    let duration__label = document.createElement('label');
    duration__label.setAttribute('for', `duration__input_${selectedID}`);
    duration__label.classList.add('label-padding');
    duration__label.innerText = 'Duration of the Loadtest (*)';

    let numberOfSimulatedRequests__input = document.createElement('input');
    numberOfSimulatedRequests__input.id = `numberOfSimulatedRequests__input_${selectedID}`;
    numberOfSimulatedRequests__input.placeholder = 'Please give a number';
    numberOfSimulatedRequests__input.type = 'number';
    
    let numberOfSimulatedRequests__input__invalid = document.createElement('p');
    numberOfSimulatedRequests__input__invalid.id = `numberOfSimulatedRequests__input__invalid_${selectedID}`;
    numberOfSimulatedRequests__input__invalid.innerText = LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO;
    numberOfSimulatedRequests__input__invalid.classList.add('error-info');

    let numberOfSimulatedRequests__label = document.createElement('label');
    numberOfSimulatedRequests__label.setAttribute('for', `numberOfSimulatedRequests__input_${selectedID}`);
    numberOfSimulatedRequests__label.classList.add('label-padding');
    numberOfSimulatedRequests__label.innerText = 'Number of simulated Requests (*)';

    loadTestTemplatInputContainer__left.appendChild(loadTestDescription__label);
    loadTestTemplatInputContainer__left.appendChild(loadTestDescription__input);

    loadTestTemplatInputContainer__right.appendChild(duration__label);
    loadTestTemplatInputContainer__right.appendChild(duration__input);
    loadTestTemplatInputContainer__right.appendChild(duration__input__invalid);
    loadTestTemplatInputContainer__right.appendChild(numberOfSimulatedRequests__label);
    loadTestTemplatInputContainer__right.appendChild(numberOfSimulatedRequests__input);
    loadTestTemplatInputContainer__right.appendChild(numberOfSimulatedRequests__input__invalid);

    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__left);
    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__right);
    getLoadTestTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer)
    console.log(getLoadTestTemplateModalContent);
    
    if (!getGenerateAndPush__btn) {
        createDisabledGenerateBtn();
    }
    
    getLoadTestTemplateModal.style.display = 'block';
}

/**
 * Creates the load test template view based on the selected node.
 */
export const createLoadTestTemplate = (selectedID) => {
    
    
    let loadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);
    
    if (loadTestTemplateModal) {
        loadTestTemplateModal.style.display = 'block';
    } else {
        createLoadTestTemplateView(selectedID);
        console.log("Creating template...");
    }
}