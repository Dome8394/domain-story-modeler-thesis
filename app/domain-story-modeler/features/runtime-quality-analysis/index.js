// 'use-strict';
import { ResilienceInjectionTypesEnum, ResilienceEnvironmentEnum } from './classes/ResilienceTemplate';
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
    let resilienceScenarioInjectionTypeSelectElement = document.getElementById('resilienceScenarioInjectionTypeSelect');
    let resilienceScenarioEnvironmentSelectElement = document.getElementById('resilienceScenarioEnvironmentTypeSelect');
    
    let resilienceScenarioName__invalidElement = document.getElementById('resilienceScenarioName__invalid');
    let resilienceScenarioInjectionType__invalidElement = document.getElementById('resilienceScenarioInjectionType__invalid');
    let resilienceScenarioEnvironmentType__invalidElement = document.getElementById('resilienceScenarioEnvironmentType__invalid');
    
    let resilienceScenarioNameElementValue = resilienceScenarioNameElement.value;
    let resilienceScenarioInjectionTypeSelectElementValue = resilienceScenarioInjectionTypeSelectElement.value;
    let resilienceScenarioEnvironmentSelectElementValue = resilienceScenarioEnvironmentSelectElement.value; 
    
    if (!resilienceScenarioNameElementValue) {
        resilienceScenarioName__invalidElement.style.display = 'block';
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
    let resilienceServiceUnderTest = document.createElement('select');
    let resilienceServiceUnderTest__label = document.createElement('label');
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
    
    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.id = 'checkBoxContainerServiceFailure';
    checkBoxContainer.classList.add('checkbox-child');
    
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
    
    // This could be a check box which might be easier
    let resilienceRandomSelection__label = document.createElement('label');
    
    let resilienceServiceUnderTest__invalid = document.createElement('p');
    let resilienceServiceAmount__invalid = document.createElement('p');
    
    resilienceServiceFailureTemplateContentInputContainer.id = 'resilienceServiceFailureTemplateContentInputContainer';
    resilienceServiceFailureTemplateContentInputContainer.classList.add('input__container');
    
    resilienceServiceUnderTest__invalid.innerText = SERVICE_FAILURE_NAME_INFO;
    resilienceServiceAmount__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
    
    resilienceServiceUnderTest__invalid.classList.add('error-info');
    resilienceServiceAmount__invalid.classList.add('error-info');
    
    resilienceServiceUnderTest__invalid.id = 'resilienceServiceUnderTest__invalid';
    resilienceServiceAmount__invalid.id = 'resilienceServiceAmount__invalid';
    
    resilienceServiceUnderTest__invalid.style.display = 'none';
    resilienceServiceAmount__invalid.style.display = 'none';
    
    resilienceServiceAmount.id = 'resilienceServiceAmount';
    resilienceServiceAmount__label.id = 'resilienceServiceAmount__label';
    resilienceServiceUnderTest.id = 'resilienceServiceFailureName';
    resilienceServiceUnderTest__label.id = 'resilienceServiceFailureName__label';
    
    resilienceServiceAmount.type = 'number';
    
    resilienceServiceAmount.placeholder = 'Geben Sie an, wie viele Instanzen betroffen sind (mind. 1)...';

    resilienceServiceAmount__label.setAttribute('for', 'resilienceServiceAmount');
    resilienceServiceUnderTest__label.setAttribute("for", 'resilienceServiceFailureName');
    
    resilienceServiceAmount__label.innerText = 'Anzahl der betroffenen Service Instanzen (*)';
    resilienceServiceUnderTest__label.innerText = 'Betroffene Services (*)';

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
    
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(timeOfServiceFailure);
    
    checkBoxContainer.appendChild(randomServiceSelectionCheckBox__label);
    checkBoxContainer.appendChild(randomServiceSelectionCheckBox);
    
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainer__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(checkBoxContainer);
     
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
    
    resilienceTemplateBtnContainerParent.classList.add('btn-container-parent');


    /**
     * Listeners
     */
    resilienceTemplateView__btn__close.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'none';
    })

    resilienceTemplateView__btn__generate.addEventListener('click', () => {
        console.log("Create object from template and push to queue...");
    });
    
    resilienceTemplateView__btn__save.addEventListener('click', () => {
        if (validateResilienceScenarioTemplateInput() && validateResilienceServiceFailureTemplateInput()) {
            resilienceTemplateView__btn__generate.disabled = false;
            saveServiceFailureTemplate();
        } else {
            console.log('Resilience Scenario is incomplete!');
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
    faultTypeCheckBox__label.innerText = 'Service Ausfall';
    
    let faultTypeCheckBoxContainer__label = document.createElement('label');
    faultTypeCheckBoxContainer__label.classList.add('form-check-label');
    faultTypeCheckBoxContainer__label.classList.add('label-padding');
    faultTypeCheckBoxContainer__label.setAttribute('for', 'checkBoxContainerFaultType');
    faultTypeCheckBoxContainer__label.innerText = 'Art des Fehlers';
    
    let injectionTypeCheckBoxContainer__label = document.createElement('label');
    injectionTypeCheckBoxContainer__label.classList.add('form-check-label');
    injectionTypeCheckBoxContainer__label.classList.add('label-padding');
    injectionTypeCheckBoxContainer__label.setAttribute('for', 'injectionTypeCheckBoxContainerParent');
    injectionTypeCheckBoxContainer__label.innerText = 'Anwendungsebene';
    
    let injectionTypeCheckBoxContainerParent = document.createElement('div');
    injectionTypeCheckBoxContainerParent.id = 'injectionTypeCheckBoxContainerParent';
    
    let injectionTypeApplicationCheckBoxContainerChild = document.createElement('div');
    let injectionTypeInfrastructureCheckBoxContainerChild = document.createElement('div');
    injectionTypeApplicationCheckBoxContainerChild.classList.add('checkbox-child');
    injectionTypeInfrastructureCheckBoxContainerChild.classList.add('checkbox-child');
    
    let injectionTypeApplicationCheckBox = document.createElement('input');
    injectionTypeApplicationCheckBox.id = 'injectionTypeApplicationCheckBox';
    injectionTypeApplicationCheckBox.type = 'checkbox';
    injectionTypeApplicationCheckBox.classList.add('form-check-input');
    
    let injectionTypeApplicationCheckBox__label = document.createElement('label');
    injectionTypeApplicationCheckBox__label.classList.add('form-check-label');
    injectionTypeApplicationCheckBox__label.setAttribute('for', 'injectionTypeApplicationCheckBox');
    injectionTypeApplicationCheckBox__label.innerText = 'Applikation';
    
    let injectionTypeInfrastructureCheckBox = document.createElement('input');
    injectionTypeInfrastructureCheckBox.id = 'injectionTypeInfrastructureCheckBox';
    injectionTypeInfrastructureCheckBox.type = 'checkbox';
    injectionTypeInfrastructureCheckBox.classList.add('form-check-input');
    
    let injectionTypeInfrastructureCheckBox__label = document.createElement('label');
    injectionTypeInfrastructureCheckBox__label.classList.add('form-check-label');
    injectionTypeInfrastructureCheckBox__label.setAttribute('for', 'injectionTypeInfrastructureCheckBox');
    injectionTypeInfrastructureCheckBox__label.innerText = 'Infrastruktur';

    let resilienceScenarioEnvironmentSelect = document.createElement('select');
    
    let resilienceScenarioName__invalid = document.createElement('p');
    let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
    
    /**
     * Create html labels for input fields
     */
    let resilienceScenarioName__label = document.createElement('label');
    let resilienceScenarioStart__label = document.createElement('label');
    let resilienceScenarioEnvironment__label = document.createElement('label');


    /**
     * Adding event listeners
     */
    resilienceTemplateView__btn__open.addEventListener('click', () => {
        resilienceTemplateModal.style.display = 'block';
    });
    
    faultTypeCheckBox.addEventListener('click', () => {
        if (faultTypeCheckBox.checked) {
            createServiceFailureTemplate();
        }
        
        if(!faultTypeCheckBox.checked) {
            let resilienceServiceFailureTemplateContentInputContainerElement = document.getElementById('resilienceServiceFailureTemplateContentInputContainer');
            resilienceServiceFailureTemplateContentInputContainerElement.remove();
        }
    })

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

    resilienceScenarioEnvironmentSelect.id = 'resilienceScenarioEnvironmentTypeSelect';
    
    resilienceScenarioName__invalid.id = 'resilienceScenarioName__invalid';
    resilienceScenarioEnvironmentType__invalid.id = 'resilienceScenarioEnvironmentType__invalid';

    resilienceScenarioName.id = 'resilienceScenarioName';
    resilienceScenarioStart.id = 'resilienceScenarioStart';

    resilienceScenarioName.type = 'text';
    resilienceScenarioStart.type = 'text';

    resilienceScenarioName.placeholder = 'Geben Sie dem Szenario einen Namen...';
    resilienceScenarioStart.placeholder = 'Geben Sie wann das Szenario beginnen soll...';

    resilienceScenarioName__label.innerText = 'Name des Szenarios';
    resilienceScenarioStart__label.innerText = 'Startzeitpunkt des Szenarios';
    resilienceScenarioEnvironment__label.innerText = 'Ausführungskontext';
    
    resilienceScenarioName__invalid.innerText = 'Bitte geben Sie einen gültigen Namen an!';
    resilienceScenarioEnvironmentType__invalid.innerText = 'Bitte geben Sie eine gültige Umgebung für das Szenario an!';

    resilienceScenarioName__label.setAttribute("for", 'resilienceScenarioName');
    resilienceScenarioStart__label.setAttribute("for", 'resilienceScenarioStart');
    resilienceScenarioEnvironment__label.setAttribute("for", 'resilienceScenarioEnvironmentSelect');
    
    resilienceScenarioName__invalid.classList.add('error-info');
    resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
    
    resilienceScenarioName__invalid.style.display = 'none';
    resilienceScenarioEnvironmentType__invalid.style.display = 'none';

    resilienceScenarioName__label.style.margin = '2% 0 0 0';
    resilienceScenarioStart__label.style.margin = '2% 0 0 0';
    resilienceScenarioEnvironment__label.style.margin = '2% 0 0 0';

    /**
     * Appending all child nodes to parent container, i.e., template view
     */

    modal__container.appendChild(resilienceTemplateModal);
    resilienceTemplateModal.appendChild(resilienceTemplateContent);
    resilienceTemplateContent.appendChild(resilienceTemplateContentInputTopLevelContainer);
    
    injectionTypeApplicationCheckBoxContainerChild.appendChild(injectionTypeApplicationCheckBox__label);
    injectionTypeApplicationCheckBoxContainerChild.appendChild(injectionTypeApplicationCheckBox);
    injectionTypeCheckBoxContainerParent.appendChild(injectionTypeApplicationCheckBoxContainerChild);
    
    injectionTypeInfrastructureCheckBoxContainerChild.append(injectionTypeInfrastructureCheckBox__label);
    injectionTypeInfrastructureCheckBoxContainerChild.append(injectionTypeInfrastructureCheckBox);
    injectionTypeCheckBoxContainerParent.appendChild(injectionTypeInfrastructureCheckBoxContainerChild);
    
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioName__invalid);
    
    resilienceTemplateContentInputContainer.appendChild(injectionTypeCheckBoxContainer__label);
    resilienceTemplateContentInputContainer.appendChild(injectionTypeCheckBoxContainerParent);

    resilienceTemplateContentInputContainer.appendChild(faultTypeCheckBoxContainer__label);
    checkBoxContainer.appendChild(faultTypeCheckBox__label);
    checkBoxContainer.appendChild(faultTypeCheckBox);
    resilienceTemplateContentInputContainer.appendChild(checkBoxContainer);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentSelect);

    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateContentInputContainer);

    createButtonContainer();

}