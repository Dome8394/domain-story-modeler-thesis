import { saveLoadTestTemplateToLocalStorage } from './saveLoadtestTemplate';
import { getNodeName, getNodeRectElementAndSetColor } from '../../util/util';
import {
    INFO_ACCURACY,
    LOADTEST_DURATION_INFO, 
    INFO_RESPONSE_MEASURE,
    INFO_STIMULUS,
    INFO_LOAD_DESIGN,
    INFO_HIGHEST_LOAD,
    INFO_TIME_TO_HIGHEST_LOAD,
    INFO_TYPE_OF_INCREASE,
    INFO_BASE_LOAD,
    INFO_RESULT_METRICS
} from '../../util/RuntimeAnalysisConstants';
import { createDisabledGenerateBtn } from '../../util/generateTemplateObject';

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

    createAndAppendLoadTestInputFields(selectedID);
    loadTestTemplateModalContent.appendChild(ruler);
    createAndAppendResultViewMetrics(selectedID);
    createButtonContainer(selectedID);
}

const checkIfTemplateComplete = (selectedID) => {

    let getDuration__input = document.getElementById(`accuracy_slider_${selectedID}`);
    let getDurationValue = getDuration__input.value;

    let getResponseTime__input = document.getElementById(`responseTime__input_${selectedID}`);
    let getResponseTimeValue = getResponseTime__input.checked;

    let getPercentileNinety__input = document.getElementById(`percentileNinety__input_${selectedID}`);
    let getNinetyPercentileValue = getPercentileNinety__input.checked;

    let getPercentileNinetyFive__input = document.getElementById(`percentileNinetyFive__input_${selectedID}`);
    let getNinetyFivePercentileValue = getPercentileNinetyFive__input.checked;

    if (!getDurationValue || (!getResponseTimeValue && !getNinetyPercentileValue && !getNinetyFivePercentileValue)) {
        getNodeRectElementAndSetColor(selectedID, false, 'Loadtest Template');
    }
}

const createButtonContainer = (selectedID) => {

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
        checkIfTemplateComplete(selectedID);
    });

    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__save_btn);
    loadTestTemplateButtonContainer.appendChild(loadTestTemplate__close_btn);

    getLoadTestTemplateModalContent.appendChild(loadTestTemplateButtonContainer);
}

const createAndAppendLoadTestInputFields = (selectedID) => {

    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);
    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)

    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let loadTestTemplateModalContentTopLevelInputContainer = document.createElement('div');
    loadTestTemplateModalContentTopLevelInputContainer.id = `loadTestTemplateModalContentTopLevelInputContainer_${selectedID}`;
    loadTestTemplateModalContentTopLevelInputContainer.classList.add('input__top__container');

    let loadTestTemplatInputContainer__left = document.createElement('div');
    loadTestTemplatInputContainer__left.id = 'loadTestTemplatInputContainer__left';
    loadTestTemplatInputContainer__left.classList.add('input__container');

    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.id = `loadTestTemplatInputContainer__right_${selectedID}`;
    loadTestTemplatInputContainer__right.classList.add('input__container');

    let artifactDescriptor = document.createElement('p');
    artifactDescriptor.classList.add('label-padding');
    artifactDescriptor.innerText = 'Artifact';

    let artifactValue = document.createElement('p');
    artifactValue.classList.add('label-padding');
    artifactValue.innerText = getNodeName(selectedID);

    let artifactValueContainer = document.createElement('div');
    artifactValueContainer.classList.add('checkbox-child');

    let stimulusLabelContainer = document.createElement('div');
    stimulusLabelContainer.classList.add('label-container');
    stimulusLabelContainer.id = `stimulusLabelContainer_${selectedID}`;

    let stimulusContainer__label = document.createElement('label');
    stimulusContainer__label.setAttribute('for', `stimulusLabelContainer_${selectedID}`);
    stimulusContainer__label.innerText = 'Stimulus (*)';
    
    let stimulusSelection__info = document.createElement('i');
    stimulusSelection__info.classList.add('bi');
    stimulusSelection__info.classList.add('bi-info-circle');
    stimulusSelection__info.classList.add('toolTip');

    stimulusSelection__info.addEventListener('mouseover', () => {
        stimulusSelection__info_text.style.display = 'block';
    });

    stimulusSelection__info.addEventListener('mouseleave', () => {
        stimulusSelection__info_text.style.display = 'none';
    })

    let stimulusSelection__info_text = document.createElement('span');
    stimulusSelection__info_text.classList.add('tooltipText');
    stimulusSelection__info_text.id = `stimulusSelection__info_text_${selectedID}`
    stimulusSelection__info_text.innerText = INFO_STIMULUS;

    let stimulusParentContainer = document.createElement('div');
    stimulusParentContainer.classList.add('checkbox-parent');

    let stimulusLoadPeakChildContainer = document.createElement('div');
    stimulusLoadPeakChildContainer.classList.add('checkbox-child');

    let stimulusChildContainer = document.createElement('div');
    stimulusChildContainer.classList.add('checkbox-child');

    let stimulusSelectElement = document.createElement('select');
    stimulusSelectElement.id = `stimulusSelectElement_${selectedID}`;

    let optionLoadPeak = document.createElement('option');
    optionLoadPeak.key = 'loadpeak';
    optionLoadPeak.text = 'Load Peak';

    let optionConstantLoad = document.createElement('option');
    optionConstantLoad.key = 'constant';
    optionConstantLoad.text = 'Constant Load';
    
    let optionLoadIncrease = document.createElement('option');
    optionLoadIncrease.key = 'constant';
    optionLoadIncrease.text = 'Load Increase';

    stimulusSelectElement.appendChild(optionLoadPeak);
    stimulusSelectElement.appendChild(optionLoadIncrease);
    stimulusSelectElement.appendChild(optionConstantLoad);

    stimulusSelectElement.addEventListener('change', () => {
        switch (stimulusSelectElement.value) {
            case 'Load Peak':
                highestLoad__label.classList.remove('text-disabled');
                highestLoad__label.classList.add('text-enabled');
                highestLoad__high__btn.disabled = false;
                highestLoad__veryHigh__btn.disabled = false;
                highestLoad__extreme__btn.disabled = false;
                
                load__low__btn.disabled = false;
                load__medium__btn.disabled = false;
                load__high__btn.disabled = false;
                simulatedLoad__label.classList.add('text-enabled');
                simulatedLoad__label.classList.remove('text-disabled');
                
                loadIncrease__select.disabled = true;
                loadIncrease__label.classList.add('text-disabled');
                loadIncrease__label.classList.remove('text-enabled');
                break;
            case 'Constant Load':
                highestLoad__label.classList.remove('text-enabled');
                highestLoad__parentContainer__label.classList.add('text-disabled');
                highestLoad__label.classList.add('text-disabled');
                highestLoad__high__btn.disabled = true;
                highestLoad__veryHigh__btn.disabled = true;
                highestLoad__extreme__btn.disabled = true;
                
                baseLoad__label.classList.remove('text-disabled');
                baseLoad__label.classList.add('text-enabled');
                baseLoad__low__btn.disabled = false;
                baseLoad__medium__btn.disabled = false;
                baseLoad__high__btn.disabled = false;
                
                load__low__btn.disabled = true;
                load__medium__btn.disabled = true;
                load__high__btn.disabled = true;
                simulatedLoad__label.classList.remove('text-enabled');
                simulatedLoad__label.classList.add('text-disabled');
                
                loadIncrease__select.disabled = true;
                loadIncrease__label.classList.add('text-disabled');
                loadIncrease__label.classList.remove('text-enabled');
                break;
            case 'Load Increase':
                loadIncrease__select.disabled = false;
                loadIncrease__label.classList.remove('text-disabled');
                loadIncrease__label.classList.add('text-enabled');
                
                highestLoad__label.classList.remove('text-enabled');
                highestLoad__parentContainer__label.classList.add('text-disabled');
                highestLoad__label.classList.add('text-disabled');
                highestLoad__high__btn.disabled = true;
                highestLoad__veryHigh__btn.disabled = true;
                highestLoad__extreme__btn.disabled = true;
                
                load__low__btn.disabled = true;
                load__medium__btn.disabled = true;
                load__high__btn.disabled = true;
                simulatedLoad__label.classList.remove('text-enabled');
                simulatedLoad__label.classList.add('text-disabled');

                baseLoad__label.classList.remove('text-enabled');
                baseLoad__label.classList.add('text-disabled');
                baseLoad__low__btn.disabled = true;
                baseLoad__medium__btn.disabled = true;
                baseLoad__high__btn.disabled = true;
                break;
            default:
                break;
        }
    })

    let stimulusResponseTimesChildContainer = document.createElement('div');
    stimulusResponseTimesChildContainer.classList.add('checkbox-child');
    stimulusResponseTimesChildContainer.id = `stimulusResponseTimesChildContainer_${selectedID}`;
    
    let stimulusResponseTimes__child__label__container = document.createElement('div');
    stimulusResponseTimes__child__label__container.classList.add('label-container');

    let stimulusResponseTimeChildContainer__label__container = document.createElement('div');
    stimulusResponseTimeChildContainer__label__container.classList.add('label-container');

    let stimulusResponseTimeChildContainer__label = document.createElement('label');
    stimulusResponseTimeChildContainer__label.setAttribute('for', `stimulusResponseTimesChildContainer_${selectedID}`);
    stimulusResponseTimeChildContainer__label.classList.add('label-padding');
    stimulusResponseTimeChildContainer__label.innerText = 'Response Measure (*)';
    
    let stimulusResponseTime__info = document.createElement('i');
    stimulusResponseTime__info.classList.add('bi');
    stimulusResponseTime__info.classList.add('bi-info-circle');
    stimulusResponseTime__info.classList.add('toolTip');

    stimulusResponseTime__info.addEventListener('mouseover', () => {
        stimulusResponseTime__info_text.style.display = 'block';
    });

    stimulusResponseTime__info.addEventListener('mouseleave', () => {
        stimulusResponseTime__info_text.style.display = 'none';
    })

    let stimulusResponseTime__info_text = document.createElement('span');
    stimulusResponseTime__info_text.classList.add('tooltipText');
    stimulusResponseTime__info_text.id = `stimulusResponseTime__info_text_${selectedID}`
    stimulusResponseTime__info_text.innerText = INFO_RESPONSE_MEASURE;
    
    let responseTimes__btnGroup = document.createElement('div');
    responseTimes__btnGroup.setAttribute('data-toggle', 'buttons');
    responseTimes__btnGroup.classList.add('btn-group');
    responseTimes__btnGroup.classList.add('btn-group-toggle');
    
    let responseTimes__satisfiedBtn = document.createElement('div');
    responseTimes__satisfiedBtn.type = 'button';
    responseTimes__satisfiedBtn.name = 'options';
    responseTimes__satisfiedBtn.setAttribute('aria-pressed', 'false');
    responseTimes__satisfiedBtn.id = `responseTimes__satisfiedBtn_${selectedID}`;
    responseTimes__satisfiedBtn.innerText = 'Satisfied';
    responseTimes__satisfiedBtn.classList.add('btn');
    responseTimes__satisfiedBtn.classList.add('btn-outline-primary');
    responseTimes__satisfiedBtn.classList.add('btn-group-btn');
    responseTimes__satisfiedBtn.disabled = true;
    
    responseTimes__satisfiedBtn.addEventListener('click', () => {
        responseTimes__toleratedBtn.classList.remove('active');
        responseTimes__frustratedBtn.classList.remove('active');
    })
    
    let responseTimes__toleratedBtn = document.createElement('div');
    responseTimes__toleratedBtn.type = 'button';
    responseTimes__toleratedBtn.name = 'options';
    responseTimes__toleratedBtn.setAttribute('aria-pressed', 'false');
    responseTimes__toleratedBtn.id = `responseTimes__toleratedBtn_${selectedID}`;
    responseTimes__toleratedBtn.innerText = 'Tolerated';
    responseTimes__toleratedBtn.classList.add('btn');
    responseTimes__toleratedBtn.classList.add('btn-outline-primary');
    responseTimes__toleratedBtn.classList.add('btn-group-btn');
    responseTimes__toleratedBtn.disabled = true;
    
    responseTimes__toleratedBtn.addEventListener('click', () => {
        responseTimes__satisfiedBtn.classList.remove('active');
        responseTimes__frustratedBtn.classList.remove('active');
    });
    
    let responseTimes__frustratedBtn = document.createElement('div');
    responseTimes__frustratedBtn.type = 'button';
    responseTimes__frustratedBtn.name = 'options';
    responseTimes__frustratedBtn.setAttribute('aria-pressed', 'false');
    responseTimes__frustratedBtn.id = `responseTimes__frustratedBtn_${selectedID}`;
    responseTimes__frustratedBtn.innerText = 'Frustrated';
    responseTimes__frustratedBtn.classList.add('btn');
    responseTimes__frustratedBtn.classList.add('btn-outline-primary');
    responseTimes__frustratedBtn.classList.add('btn-group-btn');
    responseTimes__frustratedBtn.disabled = true;
    
    responseTimes__frustratedBtn.addEventListener('click', () => {
        responseTimes__toleratedBtn.classList.remove('active');
        responseTimes__satisfiedBtn.classList.remove('active');
    });
    
    responseTimes__btnGroup.appendChild(responseTimes__satisfiedBtn);
    responseTimes__btnGroup.appendChild(responseTimes__toleratedBtn);
    responseTimes__btnGroup.appendChild(responseTimes__frustratedBtn);
    
    let simulatedLoad__child__container = document.createElement('div');
    simulatedLoad__child__container.classList.add('checkbox-child');

    let simulatedLoad__label__container = document.createElement('div');
    simulatedLoad__label__container.classList.add('label-container');
    
    let simulatedLoad__btnGroup = document.createElement('div');
    simulatedLoad__btnGroup.setAttribute('data-toggle', 'buttons');
    simulatedLoad__btnGroup.classList.add('btn-group');
    simulatedLoad__btnGroup.classList.add('btn-group-toggle');
    
    let load__low__btn = document.createElement('button');
    load__low__btn.type = 'button';
    load__low__btn.name = 'options';
    load__low__btn.setAttribute('aria-pressed', 'false');
    load__low__btn.id = `load__low__btn_${selectedID}`;
    load__low__btn.innerText = 'Slow';
    load__low__btn.classList.add('btn');
    load__low__btn.classList.add('btn-outline-primary');
    load__low__btn.classList.add('btn-group-btn');
    load__low__btn.disabled = false;
    
    load__low__btn.addEventListener('click', () => {
        load__medium__btn.classList.remove('active');
        load__high__btn.classList.remove('active');
    })
    
    let load__medium__btn = document.createElement('button');
    load__medium__btn.type = 'button';
    load__medium__btn.name = 'options';
    load__medium__btn.setAttribute('aria-pressed', 'false');
    load__medium__btn.id = `load__medium__btn_${selectedID}`;
    load__medium__btn.innerText = 'Fast';
    load__medium__btn.classList.add('btn');
    load__medium__btn.classList.add('btn-outline-primary');
    load__medium__btn.classList.add('btn-group-btn');
    load__medium__btn.disabled = false;
    
    load__medium__btn.addEventListener('click', () => {
        load__low__btn.classList.remove('active');
        load__high__btn.classList.remove('active');
    })
    
    let load__high__btn = document.createElement('button');
    load__high__btn.type = 'button';
    load__high__btn.name = 'options';
    load__high__btn.setAttribute('aria-pressed', 'false');
    load__high__btn.id = `load__high__btn${selectedID}`;
    load__high__btn.innerText = 'Very Fast';
    load__high__btn.classList.add('btn');
    load__high__btn.classList.add('btn-outline-primary');
    load__high__btn.classList.add('btn-group-btn');
    load__high__btn.style.width = '130px';
    load__high__btn.disabled = false;
    
    load__high__btn.addEventListener('click', () => {
        load__low__btn.classList.remove('active');
        load__medium__btn.classList.remove('active');
    })
    
    simulatedLoad__btnGroup.appendChild(load__low__btn);
    simulatedLoad__btnGroup.appendChild(load__medium__btn);
    simulatedLoad__btnGroup.appendChild(load__high__btn);
    
    let simulatedLoad__label = document.createElement('label');
    simulatedLoad__label.setAttribute('for', `load__low__btn_${selectedID}`);
    simulatedLoad__label.innerText = 'Time to Highest Load (*)';
    simulatedLoad__label.classList.add('text-enabled');

    let timeToHighestLoad__info = document.createElement('i');
    timeToHighestLoad__info.classList.add('bi');
    timeToHighestLoad__info.classList.add('bi-info-circle');
    timeToHighestLoad__info.classList.add('toolTip');

    timeToHighestLoad__info.addEventListener('mouseover', () => {
        timeToHighestLoad__info_text.style.display = 'block';
    });

    timeToHighestLoad__info.addEventListener('mouseleave', () => {
        timeToHighestLoad__info_text.style.display = 'none';
    })

    let timeToHighestLoad__info_text = document.createElement('span');
    timeToHighestLoad__info_text.classList.add('tooltipText');
    timeToHighestLoad__info_text.id = `timeToHighestLoad__info_text_${selectedID}`
    timeToHighestLoad__info_text.innerText = INFO_TIME_TO_HIGHEST_LOAD;

    let simulatedLoad__reference__value = document.createElement('p');
    simulatedLoad__reference__value.classList.add('reference-values');
    simulatedLoad__reference__value.innerText = 'approx. Slow';
    
    let highestLoad__btnGroup = document.createElement('div');
    highestLoad__btnGroup.setAttribute('data-toggle', 'buttons');
    highestLoad__btnGroup.classList.add('btn-group');
    highestLoad__btnGroup.classList.add('btn-group-toggle');
    
    let highestLoad__high__btn = document.createElement('button');
    highestLoad__high__btn.type = 'button';
    highestLoad__high__btn.name = 'options';
    highestLoad__high__btn.setAttribute('aria-pressed', 'false');
    highestLoad__high__btn.id = `highestLoad__high__btn_${selectedID}`;
    highestLoad__high__btn.innerText = 'High';
    highestLoad__high__btn.classList.add('btn');
    highestLoad__high__btn.classList.add('btn-outline-primary');
    highestLoad__high__btn.classList.add('btn-group-btn');
    highestLoad__high__btn.disabled = false;
    
    highestLoad__high__btn.addEventListener('click', () => {
        highestLoad__veryHigh__btn.classList.remove('active');
        highestLoad__extreme__btn.classList.remove('active');
    });

    let highestLoad__veryHigh__btn = document.createElement('button');
    highestLoad__veryHigh__btn.type = 'button';
    highestLoad__veryHigh__btn.name = 'options';
    highestLoad__veryHigh__btn.setAttribute('aria-pressed', 'false');
    highestLoad__veryHigh__btn.id = `highestLoad__veryHigh__btn${selectedID}`;
    highestLoad__veryHigh__btn.innerText = 'Very High';
    highestLoad__veryHigh__btn.classList.add('btn');
    highestLoad__veryHigh__btn.classList.add('btn-outline-primary');
    highestLoad__veryHigh__btn.classList.add('btn-group-btn');
    highestLoad__veryHigh__btn.disabled = false;
    
    highestLoad__veryHigh__btn.addEventListener('click', () => {
        highestLoad__high__btn.classList.remove('active');
        highestLoad__extreme__btn.classList.remove('active');
    })

    let highestLoad__extreme__btn = document.createElement('button');
    highestLoad__extreme__btn.type = 'button';
    highestLoad__extreme__btn.name = 'options';
    highestLoad__extreme__btn.setAttribute('aria-pressed', 'false');
    highestLoad__extreme__btn.id = `load__extreme__btn${selectedID}`;
    highestLoad__extreme__btn.innerText = 'Extremely High';
    highestLoad__extreme__btn.classList.add('btn');
    highestLoad__extreme__btn.classList.add('btn-outline-primary');
    highestLoad__extreme__btn.classList.add('btn-group-btn');
    highestLoad__extreme__btn.disabled = false;
    highestLoad__extreme__btn.style.width = '130px';
    
    highestLoad__extreme__btn.addEventListener('click', () => {
        highestLoad__high__btn.classList.remove('active');
        highestLoad__veryHigh__btn.classList.remove('active');
    })
    
    highestLoad__btnGroup.appendChild(highestLoad__high__btn);
    highestLoad__btnGroup.appendChild(highestLoad__veryHigh__btn);
    highestLoad__btnGroup.appendChild(highestLoad__extreme__btn);
    
    let highestLoad__label__container = document.createElement('div');
    highestLoad__label__container.classList.add('label-container');
    
    let highestLoad__childContainer = document.createElement('div');
    highestLoad__childContainer.classList.add('checkbox-child');
    
    let highestLoad__label = document.createElement('label');
    highestLoad__label.setAttribute('for', `highestLoad__high__btn_${selectedID}`);
    highestLoad__label.classList.add('form-check-label');
    highestLoad__label.classList.add('text-enabled');
    highestLoad__label.innerText = 'Highest Load (*)';
    
    let highestLoad__occurence__child__container = document.createElement('div');
    highestLoad__occurence__child__container.classList.add('checkbox-child');
    
    let highestLoad__occurence__input = document.createElement('select');
    highestLoad__occurence__input.id = `highestLoad__occurence__input_${selectedID}`;
    highestLoad__occurence__input.disabled = false;
    
    let option__once = document.createElement('option');
    option__once.key = 'once';
    option__once.text = 'Once';
    
    let option__twice = document.createElement('option');
    option__twice.key = 'twice';
    option__twice.text = 'Twice';
    
    let option__unpredict = document.createElement('option');
    option__unpredict.key = 'unpredict';
    option__unpredict.text = 'Unpredictable';
    
    highestLoad__occurence__input.appendChild(option__once);
    highestLoad__occurence__input.appendChild(option__twice);
    highestLoad__occurence__input.appendChild(option__unpredict);
    
    let highestLoad__occurence__label = document.createElement('label');
    highestLoad__occurence__label.setAttribute('for', `highestLoad__occurence__input_${selectedID}`);
    highestLoad__occurence__label.classList.add('form-check-label');
    highestLoad__occurence__label.classList.add('text-disabled');
    highestLoad__occurence__label.innerText = 'Occurence of Peak (*)';
    
    let highestLoad__parentContainer = document.createElement('div');
    highestLoad__parentContainer.classList.add('checkbox-child');
    highestLoad__parentContainer.id = `highestLoad__parentContainer_${selectedID}`;
    
    let loadDesignParent__info = document.createElement('i');
    loadDesignParent__info.classList.add('bi');
    loadDesignParent__info.classList.add('bi-info-circle');
    loadDesignParent__info.classList.add('toolTip');

    loadDesignParent__info.addEventListener('mouseover', () => {
        loadDesignParent__info_text.style.display = 'block';
    });

    loadDesignParent__info.addEventListener('mouseleave', () => {
        loadDesignParent__info_text.style.display = 'none';
    })

    let loadDesignParent__info_text = document.createElement('span');
    loadDesignParent__info_text.classList.add('tooltipText');
    loadDesignParent__info_text.id = `loadDesignParent__info_text_${selectedID}`
    loadDesignParent__info_text.innerText = INFO_LOAD_DESIGN;
    
    let highestLoad__parentContainer__label__container = document.createElement('div');
    highestLoad__parentContainer__label__container.classList.add('label-container');

    let highestLoad__parentContainer__label = document.createElement('label');
    highestLoad__parentContainer__label.setAttribute('for', `highestLoad__parentContainer_${selectedID}`);
    highestLoad__parentContainer__label.classList.add('label-padding');
    highestLoad__parentContainer__label.innerText = 'Load Design (*)';
    
    let highestLoad__info = document.createElement('i');
    highestLoad__info.classList.add('bi');
    highestLoad__info.classList.add('bi-info-circle');
    highestLoad__info.classList.add('toolTip');

    highestLoad__info.addEventListener('mouseover', () => {
        highestLoad__info_text.style.display = 'block';
    });

    highestLoad__info.addEventListener('mouseleave', () => {
        highestLoad__info_text.style.display = 'none';
    })

    let highestLoad__info_text = document.createElement('span');
    highestLoad__info_text.classList.add('tooltipText');
    highestLoad__info_text.id = `highestLoad__info_text_${selectedID}`
    highestLoad__info_text.innerText = INFO_HIGHEST_LOAD;

    let stimulusResponseTimes__label = document.createElement('label');
    stimulusResponseTimes__label.setAttribute('for', `responseTimes__satisfiedBtn_${selectedID}`);
    stimulusResponseTimes__label.classList.add('form-check-label');
    stimulusResponseTimes__label.innerText = "Response times";
    
    let stimulusResponseTimes__info = document.createElement('i');
    stimulusResponseTimes__info.classList.add('bi');
    stimulusResponseTimes__info.classList.add('bi-info-circle');
    stimulusResponseTimes__info.classList.add('toolTip');

    stimulusResponseTimes__info.addEventListener('mouseover', () => {
        stimulusResponseTimes__info_text.style.display = 'block';
    })
    
    stimulusResponseTimes__info.addEventListener('mouseleave', () => {
        stimulusResponseTimes__info_text.style.display = 'none';
    })

    let stimulusResponseTimes__info_text = document.createElement('span');
    stimulusResponseTimes__info_text.classList.add('tooltipText');
    stimulusResponseTimes__info_text.id = `stimulusResponseTimes__info_text_${selectedID}`
    stimulusResponseTimes__info_text.innerText = 'Response times...';
    

    let stimulusResponseTimesReferenceValue__label = document.createElement('p');
    stimulusResponseTimesReferenceValue__label.classList.add('reference-values');
    stimulusResponseTimesReferenceValue__label.innerText = 'approx. Tolerated';

    let environmentInformationParentContainer = document.createElement('div');
    environmentInformationParentContainer.id = `environmentInformationParentContainer_${selectedID}`;
    environmentInformationParentContainer.classList.add('checkbox-parent');

    let environmentInformation__label__container = document.createElement('div');
    environmentInformation__label__container.classList.add('label-container');

    let environmentInformation__label = document.createElement('label');
    environmentInformation__label.classList.add('label-padding');
    environmentInformation__label.setAttribute('for', `environmentInformationParentContainer_${selectedID}`);
    environmentInformation__label.innerText = 'Environment Information (*)';

    let accuracyChildContainer = document.createElement('div');
    accuracyChildContainer.classList.add('checkbox-child');

    let accuracyLabelContainer = document.createElement('div');
    accuracyLabelContainer.classList.add('label-container');

    let accuracy_slider = document.createElement('input');
    accuracy_slider.id = `accuracy_slider_${selectedID}`;
    accuracy_slider.type = 'range';
    accuracy_slider.min = '0';
    accuracy_slider.max = '100';
    accuracy_slider.value = '0';
    accuracy_slider.step = '1';
    accuracy_slider.style.width = '59%';

    let accuracyCurrentValue = document.createElement('span');
    accuracyCurrentValue.classList.add('accuracy');
    accuracyCurrentValue.innerText = accuracy_slider.value + '%';

    accuracy_slider.addEventListener('change', () => {
        accuracyCurrentValue.innerText = accuracy_slider.value + '%';
    })

    let accuracy__input__invalid = document.createElement('p');
    accuracy__input__invalid.id = `accuracy__input__invalid_${selectedID}`;
    accuracy__input__invalid.innerText = LOADTEST_DURATION_INFO;
    accuracy__input__invalid.classList.add('error-info');

    let accuracy__label = document.createElement('label');
    accuracy__label.setAttribute('for', `duration__input_${selectedID}`);
    accuracy__label.innerText = 'Accuracy of Results (*)';

    let accuracy__label_info = document.createElement('i');
    accuracy__label_info.classList.add('bi');
    accuracy__label_info.classList.add('bi-info-circle');
    accuracy__label_info.classList.add('toolTip');

    accuracy__label_info.addEventListener('mouseover', () => {
        accuracy__label_info_text.style.display = 'block';
    });

    accuracy__label_info.addEventListener('mouseleave', () => {
        accuracy__label_info_text.style.display = 'none';
    });

    let accuracy__label_info_text = document.createElement('span');
    accuracy__label_info_text.classList.add('tooltipText');
    accuracy__label_info_text.innerText = INFO_ACCURACY;
    
    let containerConstantLoad__label__container = document.createElement('div');
    containerConstantLoad__label__container.classList.add('label-container');
    
    let loadIncrease__child__container = document.createElement('div');
    loadIncrease__child__container.classList.add('checkbox-child');
    
    let loadIncrease__select = document.createElement('select');
    loadIncrease__select.id = `loadIncrease__select_${selectedID}`;
    loadIncrease__select.disabled = true;
    
    let option__linear = document.createElement('option');
    option__linear.key = 'linear';
    option__linear.text = 'Linear';
    
    let option__quadratic = document.createElement('option');
    option__quadratic.key = 'quadratic';
    option__quadratic.text = 'Quadratic';
    
    let option__cubic = document.createElement('option');
    option__cubic.key = 'cubic';
    option__cubic.text = 'Cubic';
    
    loadIncrease__select.appendChild(option__linear);
    loadIncrease__select.appendChild(option__quadratic);
    loadIncrease__select.appendChild(option__cubic);
    
    let loadIncrease__label__container = document.createElement('div');
    loadIncrease__label__container.classList.add('label-container');
    
    let loadIncrease__label = document.createElement('label');
    loadIncrease__label.setAttribute('for', `highestLoad__occurence__input_${selectedID}`);
    loadIncrease__label.classList.add('form-check-label');
    loadIncrease__label.classList.add('text-disabled');
    loadIncrease__label.innerText = 'Type of Increase (*)';
    
    let loadIncrease__info = document.createElement('i');
    loadIncrease__info.classList.add('bi');
    loadIncrease__info.classList.add('bi-info-circle');
    loadIncrease__info.classList.add('toolTip');

    loadIncrease__info.addEventListener('mouseover', () => {
        loadIncrease__info_text.style.display = 'block';
    });

    loadIncrease__info.addEventListener('mouseleave', () => {
        loadIncrease__info_text.style.display = 'none';
    })

    let loadIncrease__info_text = document.createElement('span');
    loadIncrease__info_text.classList.add('tooltipText');
    loadIncrease__info_text.id = `loadIncrease__info_text_${selectedID}`
    loadIncrease__info_text.innerText = INFO_TYPE_OF_INCREASE;
    
    let baseLoad__label__container = document.createElement('div');
    baseLoad__label__container.classList.add('label-container');
    
    let baseLoad__container = document.createElement('div');
    baseLoad__container.classList.add('checkbox-child');
    
    let baseLoad__btnGroup = document.createElement('div');
    baseLoad__btnGroup.setAttribute('data-toggle', 'buttons');
    baseLoad__btnGroup.classList.add('btn-group');
    baseLoad__btnGroup.classList.add('btn-group-toggle');

    let baseLoad__low__btn = document.createElement('button');
    baseLoad__low__btn.type = 'button';
    baseLoad__low__btn.name = 'options';
    baseLoad__low__btn.setAttribute('aria-pressed', 'false');
    baseLoad__low__btn.id = `baseLoad__low__btn${selectedID}`;
    baseLoad__low__btn.innerText = 'Low';
    baseLoad__low__btn.classList.add('btn');
    baseLoad__low__btn.classList.add('btn-outline-primary');
    baseLoad__low__btn.classList.add('btn-group-btn');
    baseLoad__low__btn.disabled = true;

    baseLoad__low__btn.addEventListener('click', () => {
        baseLoad__medium__btn.classList.remove('active');
        baseLoad__high__btn.classList.remove('active');
    });

    let baseLoad__medium__btn = document.createElement('button');
    baseLoad__medium__btn.type = 'button';
    baseLoad__medium__btn.name = 'options';
    baseLoad__medium__btn.setAttribute('aria-pressed', 'false');
    baseLoad__medium__btn.id = `baseLoad__medium__btn${selectedID}`;
    baseLoad__medium__btn.innerText = 'Medium';
    baseLoad__medium__btn.classList.add('btn');
    baseLoad__medium__btn.classList.add('btn-outline-primary');
    baseLoad__medium__btn.classList.add('btn-group-btn');
    baseLoad__medium__btn.disabled = true;

    baseLoad__medium__btn.addEventListener('click', () => {
        baseLoad__low__btn.classList.remove('active');
        baseLoad__high__btn.classList.remove('active');
    })

    let baseLoad__high__btn = document.createElement('button');
    baseLoad__high__btn.type = 'button';
    baseLoad__high__btn.name = 'options';
    baseLoad__high__btn.setAttribute('aria-pressed', 'false');
    baseLoad__high__btn.id = `baseLoad__high__btn${selectedID}`;
    baseLoad__high__btn.innerText = 'High';
    baseLoad__high__btn.classList.add('btn');
    baseLoad__high__btn.classList.add('btn-outline-primary');
    baseLoad__high__btn.classList.add('btn-group-btn');
    baseLoad__high__btn.disabled = true;
    baseLoad__high__btn.style.width = '130px';

    baseLoad__high__btn.addEventListener('click', () => {
        baseLoad__low__btn.classList.remove('active');
        baseLoad__medium__btn.classList.remove('active');
    })

    baseLoad__btnGroup.appendChild(baseLoad__low__btn);
    baseLoad__btnGroup.appendChild(baseLoad__medium__btn);
    baseLoad__btnGroup.appendChild(baseLoad__high__btn);
    
    let baseLoad__label = document.createElement('label');
    baseLoad__label.setAttribute('for', `baseLoad__low__btn${selectedID}`);
    baseLoad__label.classList.add('form-check-label');
    baseLoad__label.classList.add('text-disabled');
    baseLoad__label.innerText = 'Base Load (*)';
    
    let baseLoad__info = document.createElement('i');
    baseLoad__info.classList.add('bi');
    baseLoad__info.classList.add('bi-info-circle');
    baseLoad__info.classList.add('toolTip');

    baseLoad__info.addEventListener('mouseover', () => {
        baseLoad__info_text.style.display = 'block';
    });

    baseLoad__info.addEventListener('mouseleave', () => {
        baseLoad__info_text.style.display = 'none';
    })

    let baseLoad__info_text = document.createElement('span');
    baseLoad__info_text.classList.add('tooltipText');
    baseLoad__info_text.id = `baseLoad__info_text_${selectedID}`
    baseLoad__info_text.innerText = INFO_BASE_LOAD;


    /**
     * Appending child nodes
     */
    environmentInformation__label__container.appendChild(environmentInformation__label);
    baseLoad__label__container.appendChild(baseLoad__label);
    baseLoad__label__container.appendChild(baseLoad__info);
    baseLoad__label__container.appendChild(baseLoad__info_text);
    baseLoad__container.appendChild(baseLoad__label__container);
    baseLoad__container.appendChild(baseLoad__btnGroup);
    
    simulatedLoad__label__container.appendChild(simulatedLoad__label);
    simulatedLoad__label__container.appendChild(timeToHighestLoad__info);
    simulatedLoad__label__container.appendChild(timeToHighestLoad__info_text);
    simulatedLoad__label__container.appendChild(simulatedLoad__reference__value);
    
    highestLoad__parentContainer__label__container.appendChild(highestLoad__parentContainer__label);
    highestLoad__parentContainer__label__container.appendChild(loadDesignParent__info);
    highestLoad__parentContainer__label__container.appendChild(loadDesignParent__info_text);
    
    highestLoad__label__container.appendChild(highestLoad__label);
    highestLoad__label__container.appendChild(highestLoad__info);
    highestLoad__label__container.appendChild(highestLoad__info_text);
    
    highestLoad__childContainer.appendChild(highestLoad__label__container);
    highestLoad__childContainer.appendChild(highestLoad__btnGroup);
    
    simulatedLoad__child__container.appendChild(simulatedLoad__label__container);
    simulatedLoad__child__container.appendChild(simulatedLoad__btnGroup);
    
    stimulusLabelContainer.appendChild(stimulusContainer__label);
    stimulusLabelContainer.appendChild(stimulusSelection__info);
    stimulusLabelContainer.appendChild(stimulusSelection__info_text);
    
    stimulusChildContainer.appendChild(stimulusLabelContainer);
    stimulusChildContainer.appendChild(stimulusSelectElement);

    accuracyLabelContainer.appendChild(accuracy__label);
    accuracyLabelContainer.appendChild(accuracy__label_info);
    accuracyLabelContainer.appendChild(accuracyCurrentValue);
    accuracyLabelContainer.appendChild(accuracy__label_info_text);

    accuracyChildContainer.appendChild(accuracyLabelContainer);
    accuracyChildContainer.appendChild(accuracy_slider);
    accuracyChildContainer.appendChild(accuracy__input__invalid);

    artifactValueContainer.appendChild(artifactDescriptor);
    artifactValueContainer.appendChild(artifactValue);

    stimulusResponseTimeChildContainer__label__container.appendChild(stimulusResponseTimeChildContainer__label);
    stimulusResponseTimeChildContainer__label__container.appendChild(stimulusResponseTime__info);
    stimulusResponseTimeChildContainer__label__container.appendChild(stimulusResponseTime__info_text);

    stimulusResponseTimes__child__label__container.appendChild(stimulusResponseTimes__label);
    
    stimulusResponseTimesChildContainer.appendChild(stimulusResponseTimes__child__label__container);
    stimulusResponseTimesChildContainer.appendChild(responseTimes__btnGroup);
    
    highestLoad__occurence__child__container.appendChild(highestLoad__occurence__label);
    highestLoad__occurence__child__container.appendChild(highestLoad__occurence__input);
    
    loadIncrease__label__container.appendChild(loadIncrease__label);
    loadIncrease__label__container.appendChild(loadIncrease__info); 
    loadIncrease__label__container.appendChild(loadIncrease__info_text);
    
    loadIncrease__child__container.appendChild(loadIncrease__label__container);
    loadIncrease__child__container.appendChild(loadIncrease__select);

    loadTestTemplatInputContainer__left.appendChild(artifactValueContainer);
    loadTestTemplatInputContainer__left.appendChild(stimulusChildContainer);
    loadTestTemplatInputContainer__left.appendChild(accuracyChildContainer);
    loadTestTemplatInputContainer__left.appendChild(stimulusResponseTimeChildContainer__label__container);
    loadTestTemplatInputContainer__left.appendChild(stimulusResponseTimesChildContainer);
    loadTestTemplatInputContainer__left.appendChild(stimulusResponseTimesReferenceValue__label);
    
    loadTestTemplatInputContainer__right.appendChild(highestLoad__parentContainer__label__container);
    loadTestTemplatInputContainer__right.appendChild(highestLoad__childContainer);
    
    loadTestTemplatInputContainer__right.appendChild(simulatedLoad__child__container);
    
    loadTestTemplatInputContainer__right.appendChild(loadIncrease__child__container);
    
    loadTestTemplatInputContainer__right.appendChild(baseLoad__container);
    

    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__left);
    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__right);
    getLoadTestTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer)

    if (!getGenerateAndPush__btn) {
        createDisabledGenerateBtn();
    }

    getLoadTestTemplateModal.style.display = 'block';
}


const createAndAppendResultViewMetrics = (selectedID) => {
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);

    let resultViewTopContainer = document.createElement('div');
    resultViewTopContainer.classList.add('input__container');

    let resultViewMetricsContainer = document.createElement('div');
    resultViewMetricsContainer.id = `resultViewMetricsContainer_${selectedID}`;
    resultViewMetricsContainer.classList.add('checkbox-parent');
    resultViewMetricsContainer.classList.add('result-view-container');

    let resultViewMetrics__label__container = document.createElement('div');
    resultViewMetrics__label__container.classList.add('label-container');
    
    let resultViewMetrics__label = document.createElement('label');
    resultViewMetrics__label.setAttribute('for', `resultViewMetricsContainer_${selectedID}`);
    resultViewMetrics__label.innerText = 'Metrics you would like to include in the Result (*)';
    resultViewMetrics__label.classList.add('form-check-label');
    resultViewMetrics__label.classList.add('label-padding');
    
    let resultViewMetrics__info = document.createElement('i');
    resultViewMetrics__info.classList.add('bi');
    resultViewMetrics__info.classList.add('bi-info-circle');
    resultViewMetrics__info.classList.add('toolTip');

    resultViewMetrics__info.addEventListener('mouseover', () => {
        resultViewMetrics__info_text.style.display = 'block';
    })

    resultViewMetrics__info.addEventListener('mouseleave', () => {
        resultViewMetrics__info_text.style.display = 'none';
    })

    let resultViewMetrics__info_text = document.createElement('span');
    resultViewMetrics__info_text.classList.add('tooltipText');
    resultViewMetrics__info_text.id = `resultViewMetrics__info_text_${selectedID}`
    resultViewMetrics__info_text.innerText = INFO_RESULT_METRICS;

    let responseTimeChildContainer = document.createElement('div');
    responseTimeChildContainer.classList.add('checkbox-child');

    let responseTimeLabelContainer = document.createElement('div');
    responseTimeLabelContainer.classList.add('label-container');

    let responseTime__input = document.createElement('input');
    responseTime__input.type = 'checkbox';
    responseTime__input.classList.add('form-check-input');
    responseTime__input.id = `responseTime__input_${selectedID}`;

    let responseTimeInput__label = document.createElement('label');
    responseTimeInput__label.setAttribute('for', `responseTime__input_${selectedID}`);
    responseTimeInput__label.innerText = 'Response Times';
    responseTimeInput__label.classList.add('form-check-label');

    responseTimeChildContainer.appendChild(responseTimeInput__label);
    responseTimeChildContainer.appendChild(responseTime__input);

    let percentileNinetyChildContainer = document.createElement('div');
    percentileNinetyChildContainer.classList.add('checkbox-child');

    let percentileNinety__input = document.createElement('input');
    percentileNinety__input.id = `percentileNinety__input_${selectedID}`;
    percentileNinety__input.type = 'checkbox';
    percentileNinety__input.classList.add('form-check-input');

    let percentileNinety__label = document.createElement('label');
    percentileNinety__label.setAttribute('for', `percentileNinety__input_${selectedID}`);
    percentileNinety__label.innerText = '90th Percentile';
    percentileNinety__label.classList.add('form-check-label');

    let percentileNinetyFiveChildContainer = document.createElement('div');
    percentileNinetyFiveChildContainer.classList.add('checkbox-child');

    let percentileNinetyFive__input = document.createElement('input');
    percentileNinetyFive__input.id = `percentileNinetyFive__input_${selectedID}`;
    percentileNinetyFive__input.type = 'checkbox';
    percentileNinetyFive__input.classList.add('form-check-input');

    let percentileNinetyFive__label = document.createElement('label');
    percentileNinetyFive__label.setAttribute('for', `percentileNinetyFive__input_${selectedID}`);
    percentileNinetyFive__label.innerText = '95th Percentile';
    percentileNinetyFive__label.classList.add('form-check-label');

    resultViewMetrics__label__container.appendChild(resultViewMetrics__label);
    resultViewMetrics__label__container.appendChild(resultViewMetrics__info);
    resultViewMetrics__label__container.appendChild(resultViewMetrics__info_text);
    
    percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__label);
    percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__input);

    percentileNinetyChildContainer.appendChild(percentileNinety__label);
    percentileNinetyChildContainer.appendChild(percentileNinety__input);

    resultViewMetricsContainer.appendChild(responseTimeChildContainer);
    resultViewMetricsContainer.appendChild(percentileNinetyChildContainer);
    resultViewMetricsContainer.appendChild(percentileNinetyFiveChildContainer);
    resultViewTopContainer.appendChild(resultViewMetrics__label__container)
    resultViewTopContainer.appendChild(resultViewMetricsContainer)

    getLoadTestTemplateModalContent.appendChild(resultViewTopContainer);
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