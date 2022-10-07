import { saveLoadTestTemplateToLocalStorage } from './saveLoadtestTemplate';
import { getNodeRectElementAndSetColor } from '../util/util';
import {
    INVALID_RAMP_UP_TIME,
    INFO_DESCRIPTION,
    INFO_DURATION,
    INFO_NUMBER_USERS,
    INFO_RAMP_UP_TIME, LOADTEST_DURATION_INFO, LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO
} from '../RuntimeAnalysisConstants';
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
    
    let loadTestDescriptionLabelContainer = document.createElement('div');
    loadTestDescriptionLabelContainer.classList.add('label-container');

    let loadTestDescription__label = document.createElement('label');
    loadTestDescription__label.innerText = 'Describe your load test';
    loadTestDescription__label.classList.add('label-padding');
    loadTestDescription__label.setAttribute('for', 'loadTestDescription__input');
    
    let loadTestDescription__label_info = document.createElement('i');
    loadTestDescription__label_info.classList.add('bi');
    loadTestDescription__label_info.classList.add('bi-info-circle');
    loadTestDescription__label_info.classList.add('toolTip');
    
    loadTestDescription__label_info.addEventListener('mouseover', () => {
        loadTestDescription__label_info_text.style.display = 'block';
    });
    
    loadTestDescription__label_info.addEventListener('mouseleave', () => {
        loadTestDescription__label_info_text.style.display = 'none';
    });
    
    let loadTestDescription__label_info_text = document.createElement('span');
    loadTestDescription__label_info_text.classList.add('tooltipText');
    loadTestDescription__label_info_text.innerText = INFO_DESCRIPTION;
    
    let durationLabelContainer = document.createElement('div');
    durationLabelContainer.classList.add('label-container');

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
    
    let duration__label_info = document.createElement('i');
    duration__label_info.classList.add('bi');
    duration__label_info.classList.add('bi-info-circle');
    duration__label_info.classList.add('toolTip');
    
    duration__label_info.addEventListener('mouseover', () => {
        duration__label_info_text.style.display = 'block';
    });
    
    duration__label_info.addEventListener('mouseleave', () => {
        duration__label_info_text.style.display = 'none';
    });
    
    let duration__label_info_text = document.createElement('span');
    duration__label_info_text.classList.add('tooltipText');
    duration__label_info_text.innerText = INFO_DURATION;
    
    let numberOfSimulatedRequestsLabelContainer = document.createElement('div');
    numberOfSimulatedRequestsLabelContainer.classList.add('label-container');

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
    
    let numberOfSimulatedRequests__label_info = document.createElement('i');
    numberOfSimulatedRequests__label_info.classList.add('bi');
    numberOfSimulatedRequests__label_info.classList.add('bi-info-circle');
    numberOfSimulatedRequests__label_info.classList.add('toolTip');
    
    numberOfSimulatedRequests__label_info.addEventListener('mouseover', () => {
        numberOfSimulatedRequests__label_info_text.style.display = 'block';    
    });
    
    numberOfSimulatedRequests__label_info.addEventListener('mouseleave', () => {
        numberOfSimulatedRequests__label_info_text.style.display = 'none';
    });
    
    let numberOfSimulatedRequests__label_info_text = document.createElement('span');
    numberOfSimulatedRequests__label_info_text.classList.add('tooltipText');
    numberOfSimulatedRequests__label_info_text.innerText = INFO_NUMBER_USERS;
    
    let rampUpTimeLabelContainer = document.createElement('div');
    rampUpTimeLabelContainer.classList.add('label-container');
    
    let rampUpTime__input = document.createElement('input');
    rampUpTime__input.id = `rampUpTime__input_${selectedID}`;
    rampUpTime__input.placeholder = 'Please give a time in minutes';
    rampUpTime__input.type = 'number';
    
    let rampUpTime__input__label = document.createElement('label');
    rampUpTime__input__label.setAttribute('for', `rampUpTime__input_${selectedID}`);
    rampUpTime__input__label.classList.add('label-padding');
    rampUpTime__input__label.innerText = 'Ramp up time of user requests (*)';
    
    let rampUpTime__input__label_info = document.createElement('i');
    rampUpTime__input__label_info.classList.add('bi');
    rampUpTime__input__label_info.classList.add('bi-info-circle');
    rampUpTime__input__label_info.classList.add('toolTip');
    
    rampUpTime__input__label_info.addEventListener('mouseover', () => {
        rampUpTime__input__label_info_text.style.display = 'block';
    });
    
    rampUpTime__input__label_info.addEventListener('mouseleave', () => {
        rampUpTime__input__label_info_text.style.display = 'none';
    });
    
    let rampUpTime__input__label_info_text = document.createElement('span');
    rampUpTime__input__label_info_text.classList.add('tooltipText');
    rampUpTime__input__label_info_text.innerText = INFO_RAMP_UP_TIME;
    
    let rampUpTime__input__invalid = document.createElement('p');
    rampUpTime__input__invalid.id = `rampUpTime__input__invalid_${selectedID}`;
    rampUpTime__input__invalid.innerText = INVALID_RAMP_UP_TIME;
    rampUpTime__input__invalid.classList.add('error-info');
    
    
    loadTestDescriptionLabelContainer.appendChild(loadTestDescription__label);
    loadTestDescriptionLabelContainer.appendChild(loadTestDescription__label_info);
    loadTestDescriptionLabelContainer.appendChild(loadTestDescription__label_info_text);
    
    durationLabelContainer.appendChild(duration__label);
    durationLabelContainer.appendChild(duration__label_info);
    durationLabelContainer.appendChild(duration__label_info_text);
    
    numberOfSimulatedRequestsLabelContainer.appendChild(numberOfSimulatedRequests__label);
    numberOfSimulatedRequestsLabelContainer.appendChild(numberOfSimulatedRequests__label_info);
    numberOfSimulatedRequestsLabelContainer.appendChild(numberOfSimulatedRequests__label_info_text);
    
    rampUpTimeLabelContainer.appendChild(rampUpTime__input__label);
    rampUpTimeLabelContainer.appendChild(rampUpTime__input__label_info);
    rampUpTimeLabelContainer.appendChild(rampUpTime__input__label_info_text);

    loadTestTemplatInputContainer__left.appendChild(loadTestDescriptionLabelContainer);
    loadTestTemplatInputContainer__left.appendChild(loadTestDescription__input);
    
    loadTestTemplatInputContainer__left.appendChild(rampUpTimeLabelContainer);
    loadTestTemplatInputContainer__left.appendChild(rampUpTime__input);
    loadTestTemplatInputContainer__left.appendChild(rampUpTime__input__invalid);

    loadTestTemplatInputContainer__right.appendChild(durationLabelContainer);
    loadTestTemplatInputContainer__right.appendChild(duration__input);
    loadTestTemplatInputContainer__right.appendChild(duration__input__invalid);
    loadTestTemplatInputContainer__right.appendChild(numberOfSimulatedRequestsLabelContainer);
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
    getNodeRectElementAndSetColor(selectedID, false);
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