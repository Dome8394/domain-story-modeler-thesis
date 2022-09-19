import { getNodeName } from '../resilience/ResilienceScenarioTemplate';

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
    loadTestTemplateModalContent.id = 'loadTestTemplateModalContent';
    loadTestTemplateModalContent.classList.add(`modal_resilience_content`);
    
    let loadTestTemplateModalContentInputContainer = document.createElement('div');
    loadTestTemplateModalContentInputContainer.id = 'loadTestTemplateModalContentInputContainer';
    loadTestTemplateModalContentInputContainer.classList.add('input__container');
    
    let loadTestDescription__input = document.createElement('input');
    loadTestDescription__input.id = 'loadTestDescription__input';
    loadTestDescription__input.placeholder = 'Give a short description...';
    loadTestDescription__input.type = 'text';
    
    let loadTestDescription__label = document.createElement('label');
    loadTestDescription__label.innerText = 'Describe your load test';
    loadTestDescription__label.classList.add('label-padding');
    loadTestDescription__label.setAttribute('for', 'loadTestDescription__input')
    
    /**
     * Append child nodes to root container element
     */
    modal__container.appendChild(loadTestTemplateModal);
    loadTestTemplateModal.appendChild(loadTestTemplateModalContent);
    loadTestTemplateModalContent.appendChild(header);
    loadTestTemplateModalContent.appendChild(ruler);
    loadTestTemplateModalContent.appendChild(loadTestTemplateModalContentInputContainer);
    
    loadTestTemplateModalContentInputContainer.appendChild(loadTestDescription__label);
    loadTestTemplateModalContentInputContainer.appendChild(loadTestDescription__input);
    
    createButtonContainer(selectedID);
    loadTestTemplateModal.style.display = 'block';
}

const createButtonContainer = (selectedID) => {
    
    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent`);
    
    let loadTestTemplateButtonContainer = document.createElement('div');
    loadTestTemplateButtonContainer.classList.add('btn-container-parent');
    
    let loadTestTemplate__save_btn = document.createElement('button');
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
        // TODO
    });
    
    loadTestTemplate__close_btn.addEventListener('click', () => {
        getLoadTestTemplateModal.style.display = 'none';
    });
    
    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__save_btn);
    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__close_btn);
    
    getLoadTestTemplateModalContent.appendChild(loadTestTemplateButtonContainer);
    
    
}

/**
 * Creates the load test template view based on the selected node.
 */
export const createLoadTestTemplate = (selectedID) => {
    
    // let nodeName = getNodeName(selectedID);
    
    console.log(selectedID);

    let loadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`);

    if (loadTestTemplateModal) {
        console.log("Modal exists with id: ", loadTestTemplateModal.id);
        loadTestTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createLoadTestTemplateView(selectedID);
    }
}