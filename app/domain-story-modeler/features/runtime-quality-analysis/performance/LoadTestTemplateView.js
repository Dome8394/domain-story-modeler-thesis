import { getNodeName } from '../resilience/ResilienceTemplateView';
import { MockMapping } from '../mapping/MockMapping';
import { saveLoadTestTemplateToLocalStorage } from './saveLoadtestTemplate';
import { LOADTEST_DURATION_INFO, LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO } from '../RuntimeAnalysisConstants';
import { createDisabledGenerateBtn } from '../generateTemplateObject';

/**
 * Get root container element
 */
let modal__container = document.getElementById('modal__container');

const createLoadTestTemplateView = (selectedID, nodeName) => {

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
    loadTestTemplateModalContent.id = 'loadTestTemplateModalContent';
    loadTestTemplateModalContent.classList.add(`modal_resilience_content`);

    let loadTestTemplateModalContentTopLevelInputContainer = document.createElement('div');
    loadTestTemplateModalContentTopLevelInputContainer.id = 'loadTestTemplateModalContentTopLevelInputContainer';
    loadTestTemplateModalContentTopLevelInputContainer.classList.add('input__top__container');

    /**
     * Append child nodes to root container element
     */
    modal__container.appendChild(loadTestTemplateModal);
    loadTestTemplateModal.appendChild(loadTestTemplateModalContent);
    loadTestTemplateModalContent.appendChild(header);
    loadTestTemplateModalContent.appendChild(ruler);

    loadTestTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer);

    createAndAppendLoadTestInputFields(nodeName);
    createButtonContainer(selectedID);
    loadTestTemplateModal.style.display = 'block';
}

const createButtonContainer = (selectedID) => {

    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent`);

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
        saveLoadTestTemplateToLocalStorage();
    });

    loadTestTemplate__close_btn.addEventListener('click', () => {
        getLoadTestTemplateModal.style.display = 'none';
    });

    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__save_btn);
    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__close_btn);

    getLoadTestTemplateModalContent.appendChild(loadTestTemplateButtonContainer);
}

const createAndAppendMeasureEndpointsSelection = (nodeName) => {
    let getLoadTestTemplatInputContainer__left = document.getElementById('loadTestTemplatInputContainer__left');

    let availableMeasureEndpoints__select = document.createElement('select');
    availableMeasureEndpoints__select.id = 'availableMeasureEndpoints__select';

    let availableMeasureEndpoints__label = document.createElement('label');
    availableMeasureEndpoints__label.setAttribute('for', 'availableMeasureEndpoints__select');
    availableMeasureEndpoints__label.innerText = 'Select a measure endpoint (*)';
    availableMeasureEndpoints__label.classList.add('label-padding');

    for (const [key, value] of Object.entries(MockMapping)) {
        if (key === 'AVAILABLE_SERVICE_ENDPOINTS') {
            value.forEach((endpoint, idx) => {
                console.log(`key: ${endpoint}, value: ${idx} `);
                let optionItem = document.createElement('option');
                optionItem.value = endpoint;
                optionItem.text = endpoint;
                availableMeasureEndpoints__select.appendChild(optionItem);
            })
        }
    }

    console.log(getLoadTestTemplatInputContainer__left);

    getLoadTestTemplatInputContainer__left.appendChild(availableMeasureEndpoints__label);
    getLoadTestTemplatInputContainer__left.appendChild(availableMeasureEndpoints__select);


}

const createAndAppendLoadTestInputFields = (nodeName) => {

    let getLoadTestTemplateModalContentTopLevelInputContainer = document.getElementById('loadTestTemplateModalContentTopLevelInputContainer');

    let loadTestTemplatInputContainer__left = document.createElement('div');
    loadTestTemplatInputContainer__left.id = 'loadTestTemplatInputContainer__left';
    loadTestTemplatInputContainer__left.classList.add('input__container');

    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.classList.add('input__container');

    let loadTestDescription__input = document.createElement('input');
    loadTestDescription__input.id = 'loadTestDescription__input';
    loadTestDescription__input.placeholder = 'Give a short description...';
    loadTestDescription__input.type = 'text';

    let loadTestDescription__label = document.createElement('label');
    loadTestDescription__label.innerText = 'Describe your load test';
    loadTestDescription__label.classList.add('label-padding');
    loadTestDescription__label.setAttribute('for', 'loadTestDescription__input')

    let availableMeasureEndpoints__select = document.createElement('select');
    availableMeasureEndpoints__select.id = 'availableMeasureEndpoints__select';
    availableMeasureEndpoints__select.disabled = 'true';

    let availableMeasureEndpointsOptionItem = document.createElement('option');
    availableMeasureEndpointsOptionItem.value = 'api/test/1';
    availableMeasureEndpointsOptionItem.text = 'api/test/1';
    availableMeasureEndpoints__select.appendChild(availableMeasureEndpointsOptionItem);

    let availableMeasureEndpoints__label = document.createElement('label');
    availableMeasureEndpoints__label.setAttribute('for', 'availableMeasureEndpoints__select');
    availableMeasureEndpoints__label.innerText = 'Select a measure endpoint (*)';
    availableMeasureEndpoints__label.classList.add('label-padding');

    let duration__input = document.createElement('input');
    duration__input.id = 'duration__input';
    duration__input.placeholder = 'Please give a duration in minutes';
    duration__input.type = 'number';

    let duration__input__invalid = document.createElement('p');
    duration__input__invalid.id = 'duration__input__invalid';
    duration__input__invalid.innerText = LOADTEST_DURATION_INFO;
    duration__input__invalid.classList.add('error-info');

    let duration__label = document.createElement('label');
    duration__label.setAttribute('for', 'duration__input');
    duration__label.classList.add('label-padding');
    duration__label.innerText = 'Duration of the Loadtest (*)';

    let numberOfSimulatedRequests__input = document.createElement('input');
    numberOfSimulatedRequests__input.id = 'numberOfSimulatedRequests__input';
    numberOfSimulatedRequests__input.placeholder = 'Please give a number';
    numberOfSimulatedRequests__input.type = 'number';
    
    let numberOfSimulatedRequests__input__invalid = document.createElement('p');
    numberOfSimulatedRequests__input__invalid.id = 'numberOfSimulatedRequests__input__invalid';
    numberOfSimulatedRequests__input__invalid.innerText = LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO;
    numberOfSimulatedRequests__input__invalid.classList.add('error-info');

    let numberOfSimulatedRequests__label = document.createElement('label');
    numberOfSimulatedRequests__label.setAttribute('for', 'numberOfSimulatedRequests__input');
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

    getLoadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__left);
    createAndAppendMeasureEndpointsSelection(nodeName);
    getLoadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__right);
    createDisabledGenerateBtn();
}

/**
 * Creates the load test template view based on the selected node.
 */
export const createLoadTestTemplate = (selectedID) => {

    let nodeName = getNodeName(selectedID);

    console.log(selectedID);

    let loadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);

    if (loadTestTemplateModal) {
        console.log("Modal exists with id: ", loadTestTemplateModal.id);
        loadTestTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createLoadTestTemplateView(selectedID, nodeName);
    }
}