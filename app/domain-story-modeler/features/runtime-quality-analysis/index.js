// 'use-strict';
import { ResilienceFaultTypeEnum, ResilienceInjectionTypesEnum, ResilienceEnvironmentEnum } from './classes/ResilienceTemplate';
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

/**
 * Creates the template view for service failures
 */
const createServiceFailureTemplate = () => {
    let modal_resilience_content = document.getElementById('modal_resilience_content');
    let resilienceTemplateContentInputTopLevelContainer = document.getElementById('input__top__container');

    let resilienceServiceFailureTemplateContentInputContainer = document.createElement('div');
    resilienceServiceFailureTemplateContentInputContainer.id = 'resilienceServiceDelayTemplateContentInputContainer';
    resilienceServiceFailureTemplateContentInputContainer.classList.add('input__container');

    let resilienceServiceUnderTest = document.createElement('select');
    let resilienceServiceUnderTest__label = document.createElement('label');

    resilienceServiceUnderTest.id = 'resilienceServiceFailureName';
    resilienceServiceUnderTest.placeholder = 'Wählen Sie einen Service aus...';

    resilienceServiceUnderTest__label.setAttribute("for", 'resilienceServiceFailureName');
    resilienceServiceUnderTest__label.innerText = 'Betroffene Services';

    /**
     * Hard-coded service names. In the end, the available services will be retrieved from 
     * the mapping specification
     */
    // for (const [key, value] of Object.entries(ResilienceFaultTypeEnum)) {
    //     let optionItem = document.createElement('option');
    //     optionItem.value = key;
    //     optionItem.text = value;
    //     resilienceScenarioFaultTypeSelect.appendChild(optionItem);
    // }

    for (const [key, value] of Object.entries(MockMapping)) {
        console.log("Mock Mapping holds: ");
        // console.log(`${key}: ${value}`);
        console.log(typeof key);
        if (key === 'AVAILABLE_SERVICES') {
            value.forEach((val, idx) => {
                console.log("Available services: ");
                console.log(`${val}: ${idx}`);
                let optionItem = document.createElement('option');
                optionItem.value = val;
                optionItem.text = val;
                resilienceServiceUnderTest.appendChild(optionItem);
            })
        }
    }

    resilienceServiceUnderTest__label.style.margin = '2% 0 0 0';

    modal_resilience_content.appendChild(resilienceServiceFailureTemplateContentInputContainer);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceUnderTest__label);
    resilienceServiceFailureTemplateContentInputContainer.appendChild(resilienceServiceUnderTest);

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
        console.log("Save content...");
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
    // resilienceTemplateModal.classList.add('templateId');
    resilienceTemplateContent.id = 'modal_resilience_content';
    // resilienceTemplateContent.classList.add('templateId');
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

    resilienceScenarioName__label.setAttribute("for", 'resilienceScenarioName');
    resilienceScenarioStart__label.setAttribute("for", 'resilienceScenarioStart');
    resilienceScenarioEnvironment__label.setAttribute("for", 'resilienceScenarioEnvironmentSelect');
    resilienceScenarioInjection__label.setAttribute("for", 'resilienceScenarioInjectionTypeSelect');
    resilienceScenarioFaultType__label.setAttribute("for", 'resilienceScenarioFaultTypeSelect');

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

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioInjection__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioInjectionTypeSelect);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioFaultType__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioFaultTypeSelect);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioStart);

    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironment__label);
    resilienceTemplateContentInputContainer.appendChild(resilienceScenarioEnvironmentSelect);

    resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateContentInputContainer);

    createButtonContainer();

}

export function test() {
    console.log("Das ist ein Test!!!!!!!!");
}