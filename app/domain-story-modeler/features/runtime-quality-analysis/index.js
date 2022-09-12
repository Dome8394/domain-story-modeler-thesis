// 'use-strict';
import { ResilienceFaultTypeEnum, ResilienceInjectionTypesEnum, ResilienceEnvironmentEnum } from './classes/ResilienceTemplate';
import { SERVICE_FAILURE_AMOUNT_INFO, SERVICE_FAILURE_NAME_INFO } from './RuntimeAnalysisConstants';
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
    console.log(canvasItemsList);

    for (let i = 0; i < canvasItemsList.length; i++) {
        let SVGItemParent = canvasItemsList[i];
        console.log("Shape id:", SVGItemParent.firstChild.getAttribute('data-element-id'));
    }
}

const validateResilienceScenarioTemplateInput = () => {
    let resilienceScenarioNameElement = document.getElementById('resilienceScenarioName');
    let resilienceScenarioFaultTypeSelectElement = document.getElementById('resilienceScenarioFaultTypeSelect');
    let resilienceScenarioInjectionTypeSelectElement = document.getElementById('resilienceScenarioInjectionTypeSelect');
    let resilienceScenarioEnvironmentSelectElement = document.getElementById('resilienceScenarioEnvironmentTypeSelect');
    
    let resilienceScenarioName__invalidElement = document.getElementById('resilienceScenarioName__invalid');
    let resilienceScenarioFaultType__invalidElement = document.getElementById('resilienceScenarioFaultType__invalid');
    let resilienceScenarioInjectionType__invalidElement = document.getElementById('resilienceScenarioInjectionType__invalid');
    let resilienceScenarioEnvironmentType__invalidElement = document.getElementById('resilienceScenarioEnvironmentType__invalid');
    
    let resilienceScenarioNameElementValue = resilienceScenarioNameElement.value;
    let resilienceScenarioFaultTypeSelectElementValue = resilienceScenarioFaultTypeSelectElement.value;
    let resilienceScenarioInjectionTypeSelectElementValue = resilienceScenarioInjectionTypeSelectElement.value;
    let resilienceScenarioEnvironmentSelectElementValue = resilienceScenarioEnvironmentSelectElement.value; 
    
    if (!resilienceScenarioNameElementValue) {
        resilienceScenarioName__invalidElement.style.display = 'block';
        return false;
    }
    
    if(!resilienceScenarioFaultTypeSelectElementValue) {
        resilienceScenarioFaultType__invalidElement.style.display = 'block';
        return false;
    }
    
    if (!resilienceScenarioInjectionTypeSelectElementValue) {
        resilienceScenarioInjectionType__invalidElement.style.display = 'block';
        return false;
    }
    
    if (!resilienceScenarioEnvironmentSelectElementValue) {
        resilienceScenarioEnvironmentType__invalidElement.style.display = 'block';
        return false;
    }
    
    return true;
    
}


const validateResilienceServiceFailureTemplateInput = () => {
    let resilienceServiceNameElement = document.getElementById('resilienceServiceFailureName');
    let resilienceServiceAmountElement = document.getElementById('resilienceServiceAmount');
    let resilienceServiceUnderTest__invalidElement = document.getElementById('resilienceServiceUnderTest__invalid');
    let resilienceServiceAmount__invalidElement = document.getElementById('resilienceServiceAmount__invalid');
    
    let resilienceServiceElementValue = resilienceServiceNameElement.value;
    let resilienceServiceAmountElementValue = resilienceServiceAmountElement.value;
    
    
    if (!resilienceServiceElementValue) {
        console.log("resilienceServiceElementValue is valid");
        resilienceServiceUnderTest__invalidElement.style.display = 'block';
        return false;
    }
    
    if (!resilienceServiceAmountElementValue) {
        console.log("resilienceServiceAmountElementValue is valid");
        resilienceServiceAmount__invalidElement.style.display = 'block';
        return false;
    }
    
    return true;
}

const saveServiceFailureTemplate = () => {
    console.log('Save Resilience Service Failure Template ...');
}

/**
 * Creates the template view for service failures
 */
const createServiceFailureTemplate = () => {
    let modal_resilience_content = document.getElementById('modal_resilience_content');
    let resilienceTemplateContentInputTopLevelContainer = document.getElementById('input__top__container');

    /**
     * Create HTML elements
     */
    let resilienceServiceFailureTemplateContentInputContainer = document.createElement('div');
    let remove__btn__container = document.createElement('div');
    let remove__btn = document.createElement('button');
    let save__btn = document.createElement('button');
    let resilienceServiceUnderTest = document.createElement('select');
    let resilienceServiceUnderTest__label = document.createElement('label');
    let resilienceServiceAmount = document.createElement('input');
    let resilienceServiceAmount__label = document.createElement('label');
    // This could be a check box which might be easier
    let resilienceRandomSelection = document.createElement('select');
    let resilienceRandomSelection__label = document.createElement('label');
    
    let resilienceServiceUnderTest__invalid = document.createElement('p');
    let resilienceServiceAmount__invalid = document.createElement('p');
    
    resilienceServiceFailureTemplateContentInputContainer.id = 'resilienceServiceDelayTemplateContentInputContainer';
    resilienceServiceFailureTemplateContentInputContainer.classList.add('input__container');
    
    remove__btn.classList.add('btn');
    remove__btn.classList.add('btn-danger');
    
    save__btn.classList.add('btn');
    save__btn.classList.add('btn-primary');
    
    resilienceServiceUnderTest__invalid.innerText = SERVICE_FAILURE_NAME_INFO;
    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    
    resilienceServiceUnderTest__invalid.classList.add('error-info');
    resilienceServiceAmount__invalid.classList.add('error-info');
    
    resilienceServiceUnderTest__invalid.id = 'resilienceServiceUnderTest__invalid';
    resilienceServiceAmount__invalid.id = 'resilienceServiceAmount__invalid';
    
    resilienceServiceUnderTest__invalid.style.display = 'none';
    resilienceServiceAmount__invalid.style.display = 'none';
    
    remove__btn.innerText = 'Entfernen';
    save__btn.innerText = 'Speichern';

    resilienceServiceAmount.id = 'resilienceServiceAmount';
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    resilienceServiceUnderTest.id = 'resilienceServiceFailureName';
    resilienceServiceUnderTest__label.id = 'resilienceServiceFailureName__label';
    resilienceRandomSelection.id = 'resilienceRandomSelection';
    resilienceRandomSelection__label.id = 'resilienceRandomSelection__label';
    
    resilienceServiceAmount.type = 'number';
    
    resilienceServiceAmount.placeholder = 'Geben Sie an, wie viele Instanzen betroffen sind (mind. 1)...';

    resilienceServiceAmount__label.setAttribute('for', 'resilienceServiceAmount');
    resilienceRandomSelection__label.setAttribute('for', 'resilienceRandomSelection');
    resilienceServiceUnderTest__label.setAttribute("for", 'resilienceServiceFailureName');
    
    resilienceServiceAmount__label.innerText = 'Anzahl der betroffenen Service Instanzen (*)';
    resilienceServiceUnderTest__label.innerText = 'Betroffene Services (*)';
    resilienceRandomSelection__label.innerText = 'Randomisierte Auswahl von mehreren Services'

    /**
     * Hard-coded service names. In the end, the available services will be retrieved from 
     * the mapping specification
     */
    for (const [key, value] of Object.entries(MockMapping)) {
        if (key === 'AVAILABLE_SERVICES') {
            value.forEach((val, idx) => {
                let optionItem = document.createElement('option');
                optionItem.value = val;
                optionItem.text = val;
                resilienceServiceUnderTest.appendChild(optionItem);
            })
        }
    }
    
    let optionItemTrue = document.createElement('option');
    let optionItemFalse = document.createElement('option');
    
    optionItemTrue.value = 'true';
    optionItemTrue.text = 'true';
    optionItemFalse.value = 'false';
    optionItemFalse.text = 'false';
    
    resilienceRandomSelection.appendChild(optionItemTrue);
    resilienceRandomSelection.appendChild(optionItemFalse);
    
    /**
     * Removes the current service failure template
     */
    remove__btn.addEventListener('click', () => {
        resilienceServiceFailureTemplateContentInputContainer.remove();
    })
    
    save__btn.addEventListener('click', () => {
        if (validateResilienceServiceFailureTemplateInput()) {
            console.log('Resilience Service Failure Template is valid!');
            saveServiceFailureTemplate();
        }
    });

    /**
     * Margins
     */
    resilienceServiceUnderTest__label.style.margin = '2% 0 0 0';
    resilienceServiceAmount__label.style.margin = '2% 0 0 0';
    resilienceRandomSelection__label.style.margin = '2% 0 0 0';

    modal_resilience_content.appendChild(resilienceServiceFailureTemplateContentInputContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceUnderTest__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceUnderTest);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceUnderTest__invalid);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceAmount__invalid);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceRandomSelection__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceRandomSelection);
    
    remove__btn__container.appendChild(remove__btn);
    remove__btn__container.appendChild(save__btn);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(remove__btn__container);

    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceServiceFailureTemplateContentInputContainer);

}

/**
 * Creates the template view for service delays
 */
const createServiceDelayTemplate = () => {
    // todo...

}

const createButtonContainer = () => {

    let modal_resilience_content = document.getElementById('modal_resilience_content');
    let resilienceTemplateModal = document.getElementById('modal_resilience');

    let resilienceTemplateBtnContainer = document.createElement('div');
    let resilienceTemplateView__btn__close = document.createElement('button');
    let resilienceTemplateView__btn__save = document.createElement('button');

    resilienceTemplateView__btn__close.innerText = 'Schließen';
    resilienceTemplateView__btn__save.innerText = 'Speichern';

    resilienceTemplateView__btn__close.classList.add('btn');
    resilienceTemplateView__btn__close.classList.add('btn-secondary');

    resilienceTemplateView__btn__save.classList.add('btn');
    resilienceTemplateView__btn__save.classList.add('btn-primary');


    /**
     * Listeners
     */
    resilienceTemplateView__btn__close.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'none';
    })

    /**
     * In here, we create a new resilience template object
     */
    resilienceTemplateView__btn__save.addEventListener('click', () => {
        if (validateResilienceScenarioTemplateInput()) {
            saveServiceFailureTemplate();
        }
    })

    /**
     * Append children to container
     */
    modal_resilience_content.appendChild(resilienceTemplateBtnContainer);
    resilienceTemplateBtnContainer.appendChild(resilienceTemplateView__btn__save);
    resilienceTemplateBtnContainer.appendChild(resilienceTemplateView__btn__close);
}

/**
 * Creates new template view for resilience tests with a unique ID
 * For every new resilience scenario a new template is created
 * @param {} element 
 */
export function createResilienceTemplateView(element) {

    clearRemovedRuntimeAnalysisViews();

    /**
     * Create html elements
     */
    let resilienceTemplateModal = document.createElement('div');
    let resilienceTemplateContent = document.createElement('div');
    let resilienceTemplateContentInputContainer = document.createElement('div');

    let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');

    let resilienceTemplateView__btn__open = document.createElement('button');

    let resilienceScenarioName = document.createElement('input');
    let resilienceScenarioStart = document.createElement('input');

    let resilienceScenarioFaultTypeSelect = document.createElement('select');
    let resilienceScenarioInjectionTypeSelect = document.createElement('select');
    let resilienceScenarioEnvironmentSelect = document.createElement('select');
    
    let resilienceScenarioName__invalid = document.createElement('p');
    let resilienceScenarioFaultType__invalid = document.createElement('p');
    let resilienceScenarioInjectionType__invalid = document.createElement('p');
    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    
    /**
     * Create html labels for input fields
     */
    let resilienceScenarioName__label = document.createElement('label');
    let resilienceScenarioFaultType__label = document.createElement('label');
    let resilienceScenarioInjection__label = document.createElement('label');
    let resilienceScenarioStart__label = document.createElement('label');
    let resilienceScenarioEnvironment__label = document.createElement('label');


    /**
     * Adding event listeners
     */
    resilienceTemplateView__btn__open.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'block';
    });

    resilienceScenarioFaultTypeSelect.addEventListener('change', () => {
        let selectedFaultType = resilienceScenarioFaultTypeSelect.options[resilienceScenarioFaultTypeSelect.selectedIndex];
        console.log("Select fault type is: ", selectedFaultType.value);

        if (selectedFaultType.value === 'SERVICE_FAILURE') {
            createServiceFailureTemplate();
        } else if (selectedFaultType.value === 'SERVICE_DELAY') {
            createServiceDelayTemplate();
        }
    })

    /**
     * Create options for select elements
     */
    for (const [key, value] of Object.entries(ResilienceFaultTypeEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioFaultTypeSelect.appendChild(optionItem);
    }

    for (const [key, value] of Object.entries(ResilienceInjectionTypesEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioInjectionTypeSelect.appendChild(optionItem);
    }

    for (const [key, value] of Object.entries(ResilienceEnvironmentEnum)) {
        let optionItem = document.createElement('option');
        optionItem.value = key;
        optionItem.text = value;
        resilienceScenarioEnvironmentSelect.appendChild(optionItem);
    }

    /**
     * As the domain-story-modeler does not assign nor create unique IDs in a specific manner,
     * we will use the shape_id of a newly created element on the canvas
     */
    let templateId = element.id;

    resilienceTemplateModal.id = 'modal_resilience';
    resilienceTemplateContent.id = 'modal_resilience_content';
    resilienceTemplateContentInputContainer.id = 'input__container';
    resilienceTemplateContentInputContainer.classList.add('input__container');

    resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

    resilienceTemplateView__btn__open.id = templateId;
    resilienceTemplateView__btn__open.innerText = 'Resilience Szenario ' + templateId.toString();
    elementContainer.appendChild(resilienceTemplateView__btn__open);

    resilienceTemplateView__btn__open.classList.add('btn');
    resilienceTemplateView__btn__open.classList.add('btn-primary');

    resilienceScenarioFaultTypeSelect.id = 'resilienceScenarioFaultTypeSelect';
    resilienceScenarioInjectionTypeSelect.id = 'resilienceScenarioInjectionTypeSelect';
    resilienceScenarioEnvironmentSelect.id = 'resilienceScenarioEnvironmentTypeSelect';
    
    resilienceScenarioName__invalid.id = 'resilienceScenarioName__invalid';
    resilienceScenarioFaultType__invalid.id = 'resilienceScenarioFaultType__invalid';
    resilienceScenarioInjectionType__invalid.id = 'resilienceScenarioInjectionType__invalid';
    resilienceScenarioEnvironmentType__invalid.id = 'resilienceScenarioEnvironmentType__invalid';

    resilienceScenarioName.id = 'resilienceScenarioName';
    resilienceScenarioStart.id = 'resilienceScenarioStart';

    resilienceScenarioName.type = 'text';
    resilienceScenarioStart.type = 'text';

    resilienceScenarioName.placeholder = 'Geben Sie dem Szenario einen Namen...';
    resilienceScenarioStart.placeholder = 'Geben Sie wann das Szenario beginnen soll...';

    resilienceScenarioName__label.innerText = 'Name des Szenarios';
    resilienceScenarioStart__label.innerText = 'Startzeitpunkt des Szenarios';
    resilienceScenarioEnvironment__label.innerText = 'Umgebung des Szenarios';
    resilienceScenarioInjection__label.innerText = 'Injection Typ des Szenarios';
    resilienceScenarioFaultType__label.innerText = 'Typ des Fault Loads';
    
    resilienceScenarioName__invalid.innerText = 'Bitte geben Sie einen gültigen Namen an!';
    resilienceScenarioFaultType__invalid.innerText = 'Bitte geben Sie einen gültigen Fehler Typ an!';
    resilienceScenarioInjectionType__invalid.innerText = 'Bitte geben Sie einen Injektions-Typ an!';
    resilienceScenarioEnvironmentType__invalid.innerText = 'Bitte geben Sie eine gültige Umgebung für das Szenario an!';

    resilienceScenarioName__label.setAttribute("for", 'resilienceScenarioName');
    resilienceScenarioStart__label.setAttribute("for", 'resilienceScenarioStart');
    resilienceScenarioEnvironment__label.setAttribute("for", 'resilienceScenarioEnvironmentSelect');
    resilienceScenarioInjection__label.setAttribute("for", 'resilienceScenarioInjectionTypeSelect');
    resilienceScenarioFaultType__label.setAttribute("for", 'resilienceScenarioFaultTypeSelect');
    
    resilienceScenarioName__invalid.classList.add('error-info');
    resilienceScenarioFaultType__invalid.classList.add('error-info');
    resilienceScenarioInjectionType__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    
    resilienceScenarioName__invalid.style.display = 'none';
    resilienceScenarioFaultType__invalid.style.display = 'none';
    resilienceScenarioInjectionType__invalid.style.display = 'none';
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';

    resilienceScenarioName__label.style.margin = '2% 0 0 0';
    resilienceScenarioStart__label.style.margin = '2% 0 0 0';
    resilienceScenarioEnvironment__label.style.margin = '2% 0 0 0';
    resilienceScenarioInjection__label.style.margin = '2% 0 0 0';
    resilienceScenarioFaultType__label.style.margin = '2% 0 0 0';

    /**
     * Appending all child nodes to parent container, i.e., template view
     */

    modal__container.appendChild(resilienceTemplateModal);
    resilienceTemplateModal.appendChild(resilienceTemplateContent);
    resilienceTemplateContent.appendChild(resilienceTemplateContentInputTopLevelContainer);


    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__invalid);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioInjection__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioInjectionTypeSelect);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioInjectionType__invalid);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioFaultType__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioFaultTypeSelect);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioFaultType__invalid);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentSelect);

    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateContentInputContainer);

    createButtonContainer();

}