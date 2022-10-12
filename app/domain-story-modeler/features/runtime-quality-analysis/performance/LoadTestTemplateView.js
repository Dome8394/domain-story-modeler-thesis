import { saveLoadTestTemplateToLocalStorage } from './saveLoadtestTemplate';
import { getNodeName, getNodeRectElementAndSetColor } from '../util/util';
import {
    INFO_DESCRIPTION,
    INFO_DURATION,
    INFO_NUMBER_USERS,
    LOADTEST_DURATION_INFO, LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO
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

    createAndAppendLoadTestInputFields(selectedID);
    loadTestTemplateModalContent.appendChild(ruler);
    createAndAppendResultViewMetrics(selectedID);
    createButtonContainer(selectedID);
}

const checkIfTemplateComplete = (selectedID) => {
    
    let getDuration__input = document.getElementById(`duration__input_${selectedID}`);
    let getDurationValue = getDuration__input.value;
    
    console.log(getDurationValue);
    
    let getResponseTime__input = document.getElementById(`responseTime__input_${selectedID}`);
    let getResponseTimeValue = getResponseTime__input.checked;
    
    let getPercentileNinety__input = document.getElementById(`percentileNinety__input_${selectedID}`);
    let getNinetyPercentileValue = getPercentileNinety__input.checked;
    
    let getPercentileNinetyFive__input = document.getElementById(`percentileNinetyFive__input_${selectedID}`);
    let getNinetyFivePercentileValue = getPercentileNinetyFive__input.checked;
    
    if (!getDurationValue || (!getResponseTimeValue && !getNinetyPercentileValue && !getNinetyFivePercentileValue)) {
        console.log("Test...");
        getNodeRectElementAndSetColor(selectedID, false, 'Loadtest Template');
    }
    
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
    stimulusContainer__label.classList.add('label-padding');
    stimulusContainer__label.innerText = 'Stimulus (*)';
    
    let stimulusParentContainer = document.createElement('div');
    stimulusParentContainer.classList.add('checkbox-parent');
    
    let stimulusLoadPeakChildContainer = document.createElement('div');
    stimulusLoadPeakChildContainer.classList.add('checkbox-child');
    
    let stimulusLoadPeak__checkbox = document.createElement('input');
    stimulusLoadPeak__checkbox.type = 'checkbox';
    stimulusLoadPeak__checkbox.classList.add('form-check-input');
    stimulusLoadPeak__checkbox.id = `stimulusLoadPeak__checkbox_${selectedID}`;
    
    stimulusLoadPeak__checkbox.addEventListener('click', () => {
        if (stimulusLoadPeak__checkbox.checked) {
            showLoadDesign('LOAD_PEAK', selectedID); 
        } else {
            hideLoadDesign('LOAD_PEAK', selectedID);
        }
        stimulusContinuous__checkbox.disabled = !stimulusContinuous__checkbox.disabled;
        stimulusConstant__checkbox.disabled = !stimulusConstant__checkbox.disabled;
    });
    
    let stimulusLoadPeak__label = document.createElement('label');
    stimulusLoadPeak__label.setAttribute('for', `stimulusLoadPeak__checkbox_${selectedID}`);
    stimulusLoadPeak__label.classList.add('form-check-label');
    stimulusLoadPeak__label.innerText = 'Load Peak';
    
    let stimulusConstantLoadChildContainer = document.createElement('div');
    stimulusConstantLoadChildContainer.classList.add('checkbox-child');
    
    let stimulusConstant__checkbox = document.createElement('input');
    stimulusConstant__checkbox.type = 'checkbox';
    stimulusConstant__checkbox.classList.add('form-check-input');
    stimulusConstant__checkbox.id = `stimulusConstant__checkbox_${selectedID}`;
    
    stimulusConstant__checkbox.addEventListener('click', () => {
        if (stimulusConstant__checkbox.checked) {
            showLoadDesign('CONSTANT_LOAD', selectedID);
        } else {
            hideLoadDesign('CONSTANT_LOAD', selectedID);
        }
        stimulusContinuous__checkbox.disabled = !stimulusContinuous__checkbox.disabled;
        stimulusLoadPeak__checkbox.disabled = !stimulusLoadPeak__checkbox.disabled;
    });
    
    let stimulusConstantLoad__label = document.createElement('label');
    stimulusConstantLoad__label.setAttribute('for', `stimulusConstant__checkbox_${selectedID}`)
    stimulusConstantLoad__label.classList.add('form-check-label');
    stimulusConstantLoad__label.innerText = 'Constant Load';
    
    let stimulusContinuousLoadChildContainer = document.createElement('div');
    stimulusContinuousLoadChildContainer.classList.add('checkbox-child');
    
    let stimulusContinuous__checkbox = document.createElement('input');
    stimulusContinuous__checkbox.type = 'checkbox';
    stimulusContinuous__checkbox.classList.add('form-check-input');
    stimulusContinuous__checkbox.id = `stimulusContinuous__checkbox_${selectedID}`;
    
    stimulusContinuous__checkbox.addEventListener('click', () => {
        if(stimulusContinuous__checkbox.checked) {
            showLoadDesign('CONTINUOUS_LOAD', selectedID);
        } else {
            hideLoadDesign('CONTINUOUS_LOAD', selectedID);
        }
        stimulusLoadPeak__checkbox.disabled = !stimulusLoadPeak__checkbox.disabled;
        stimulusConstant__checkbox.disabled = !stimulusConstant__checkbox.disabled;
    })

    let stimulusContinuous__label = document.createElement('label');
    stimulusContinuous__label.setAttribute('for', `stimulusContinuous__checkbox_${selectedID}`);
    stimulusContinuous__label.classList.add('form-check-label');
    stimulusContinuous__label.innerText = 'Continuous Load';
    
    let stimulusResponseTimesChildContainer = document.createElement('div');
    stimulusResponseTimesChildContainer.classList.add('checkbox-child');
    stimulusResponseTimesChildContainer.id = `stimulusResponseTimesChildContainer_${selectedID}`;
    
    let stimulusResponseTimeChildContainer__label__container = document.createElement('div');
    stimulusResponseTimeChildContainer__label__container.classList.add('label-container');
    
    let stimulusResponseTimeChildContainer__label = document.createElement('label');
    stimulusResponseTimeChildContainer__label.setAttribute('for', `stimulusResponseTimesChildContainer_${selectedID}`);
    stimulusResponseTimeChildContainer__label.classList.add('label-padding');
    stimulusResponseTimeChildContainer__label.innerText = 'Response Measure (*)';
    
    let stimulusResponseTimes__input = document.createElement('input');
    stimulusResponseTimes__input.id = `stimulusResponseTimes__input_${selectedID}`;
    stimulusResponseTimes__input.placeholder = 'E.g., 3000 ms';
    stimulusResponseTimes__input.type = 'number';
    stimulusResponseTimes__input.style.height = '20px';
    stimulusResponseTimes__input.style.width = '135px';
    
    let stimulusResponseTimes__label = document.createElement('label');
    stimulusResponseTimes__label.setAttribute('for', `stimulusResponseTimes__input_${selectedID}`);
    stimulusResponseTimes__label.classList.add('form-check-label');
    stimulusResponseTimes__label.innerText = "Response Time's below";
    
    let stimulusResponseTimesReferenceValue__label = document.createElement('p');
    stimulusResponseTimesReferenceValue__label.classList.add('reference-values');
    stimulusResponseTimesReferenceValue__label.innerText = 'approx. < 4000 ms';
    
    let environmentInformationParentContainer = document.createElement('div');
    environmentInformationParentContainer.id = `environmentInformationParentContainer_${selectedID}`;
    environmentInformationParentContainer.classList.add('checkbox-parent');
    
    let environmentInformation__label__container = document.createElement('div');
    environmentInformation__label__container.classList.add('label-container');
    
    let environmentInformation__label = document.createElement('label');
    environmentInformation__label.classList.add('label-padding');
    environmentInformation__label.setAttribute('for', `environmentInformationParentContainer_${selectedID}`);
    environmentInformation__label.innerText = 'Environment Information (*)';
    
    let durationChildContainer = document.createElement('div');
    durationChildContainer.classList.add('checkbox-child');

    let durationLabelContainer = document.createElement('div');
    durationLabelContainer.classList.add('label-container');

    let duration__input = document.createElement('input');
    duration__input.id = `duration__input_${selectedID}`;
    duration__input.placeholder = 'E.g., 25 (minutes)';
    duration__input.type = 'number';
    duration__input.style.height = '20px';

    let duration__input__invalid = document.createElement('p');
    duration__input__invalid.id = `duration__input__invalid_${selectedID}`;
    duration__input__invalid.innerText = LOADTEST_DURATION_INFO;
    duration__input__invalid.classList.add('error-info');

    let duration__label = document.createElement('label');
    duration__label.setAttribute('for', `duration__input_${selectedID}`);
    duration__label.innerText = 'How long do you want the loadtest to run (in minutes)? (*)';
    duration__label.style.marginTop = '5%';

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


    
    
    /**
     * Appending child nodes
     */
    environmentInformation__label__container.appendChild(environmentInformation__label);
    
    durationLabelContainer.appendChild(duration__label);
    durationLabelContainer.appendChild(duration__label_info);
    durationLabelContainer.appendChild(duration__label_info_text);

    durationChildContainer.appendChild(duration__input);
    durationChildContainer.appendChild(duration__input__invalid);
    
    artifactValueContainer.appendChild(artifactDescriptor);
    artifactValueContainer.appendChild(artifactValue);
    
    stimulusLabelContainer.appendChild(stimulusContainer__label);
    stimulusResponseTimeChildContainer__label__container.appendChild(stimulusResponseTimeChildContainer__label);
    
    stimulusConstantLoadChildContainer.appendChild(stimulusConstantLoad__label);
    stimulusConstantLoadChildContainer.appendChild(stimulusConstant__checkbox);
    
    stimulusLoadPeakChildContainer.appendChild(stimulusLoadPeak__label);
    stimulusLoadPeakChildContainer.appendChild(stimulusLoadPeak__checkbox);
    
    stimulusContinuousLoadChildContainer.appendChild(stimulusContinuous__label);
    stimulusContinuousLoadChildContainer.appendChild(stimulusContinuous__checkbox);
    
    stimulusResponseTimesChildContainer.appendChild(stimulusResponseTimes__label);
    stimulusResponseTimesChildContainer.appendChild(stimulusResponseTimes__input);
    
    stimulusParentContainer.appendChild(stimulusLoadPeakChildContainer);
    stimulusParentContainer.appendChild(stimulusContinuousLoadChildContainer);
    stimulusParentContainer.appendChild(stimulusConstantLoadChildContainer);
    
    loadTestTemplatInputContainer__left.appendChild(artifactValueContainer);
    
    loadTestTemplatInputContainer__left.appendChild(stimulusLabelContainer);
    loadTestTemplatInputContainer__left.appendChild(stimulusParentContainer);
    loadTestTemplatInputContainer__left.appendChild(durationLabelContainer);
    loadTestTemplatInputContainer__left.appendChild(durationChildContainer);
    
    loadTestTemplatInputContainer__right.appendChild(stimulusResponseTimeChildContainer__label__container);
    loadTestTemplatInputContainer__right.appendChild(stimulusResponseTimesChildContainer);
    loadTestTemplatInputContainer__right.appendChild(stimulusResponseTimesReferenceValue__label);
    
    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__left);
    loadTestTemplateModalContentTopLevelInputContainer.appendChild(loadTestTemplatInputContainer__right);
    getLoadTestTemplateModalContent.appendChild(loadTestTemplateModalContentTopLevelInputContainer)

    if (!getGenerateAndPush__btn) {
        createDisabledGenerateBtn();
    }

    getLoadTestTemplateModal.style.display = 'block';
}

const hideLoadDesign = (type, selectedID) => {
    switch(type) {
        case 'LOAD_PEAK':
            let getLoadPeakContainer = document.getElementById(`loadPeakContainer_${selectedID}`);
            getLoadPeakContainer.remove();
            break;
        case 'CONTINUOUS_LOAD':
            let getContinousLoadContainer = document.getElementById(`continuousLoadContainer_${selectedID}`);
            getContinousLoadContainer.remove();
            break;
        case 'CONSTANT_LOAD':
            let getConstantLoadContainer = document.getElementById(`constantLoadContainer_${selectedID}`);
            getConstantLoadContainer.remove();
            break;
        default:
            console.log("No matching type to hide!");
    }
}

const showLoadDesign = (type, selectedID) => {
    switch(type) {
        case 'LOAD_PEAK':
            createLoadPeakInformationTemplate(selectedID);
            break;
        case 'CONTINUOUS_LOAD':
            createContinuousLoadInformationTemplate(selectedID);
            break;
        case 'CONSTANT_LOAD':
            createConstantLoadInformationTemplate(selectedID);
            break;
        default:
            console.log("No matching type to show!");
            break;
    }
}

const createConstantLoadInformationTemplate = (selectedID) => {
    let getTopContainer = document.getElementById(`loadTestTemplatInputContainer__right_${selectedID}`);
    
    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.id = `constantLoadContainer_${selectedID}`;
    loadTestTemplatInputContainer__right.classList.add('checkbox-parent');
    
    let constantLoad__container = document.createElement('div');
    constantLoad__container.id = `constantLoad__container_${selectedID}`;
    
    let constantLoad__container__label__container = document.createElement('div');
    constantLoad__container__label__container.classList.add('label-container');
    
    let constantLoad__container__label = document.createElement('label');
    constantLoad__container__label.setAttribute('for', `constantLoad__container_${selectedID}`);
    constantLoad__container__label.innerText = 'Load Design Constant Load (*)';
    constantLoad__container__label.classList.add('label-padding');
    
    let numberActiveUsers__child__container = document.createElement('div');
    numberActiveUsers__child__container.classList.add('checkbox-child');

    let numberActiveUsers__label__container = document.createElement('div');
    numberActiveUsers__label__container.classList.add('label-container');

    let numberActiveUsers__input = document.createElement('select');
    numberActiveUsers__input.id = `numberActiveUsers__input_${selectedID}`;

    let option_medium = document.createElement('option');
    option_medium.key = 'medium';
    option_medium.text = 'Medium (2x reference value)';

    let option_high = document.createElement('option');
    option_high.key = 'high';
    option_high.text = 'High (4x reference value)';

    let option_veryHigh = document.createElement('option');
    option_veryHigh.key = 'veryHigh';
    option_veryHigh.text = 'Very High (6x reference value)';

    numberActiveUsers__input.appendChild(option_medium);
    numberActiveUsers__input.appendChild(option_high);
    numberActiveUsers__input.appendChild(option_veryHigh);

    let numberActiveUsers__label = document.createElement('label');
    numberActiveUsers__label.setAttribute('for', `numberActiveUsers__input_${selectedID}`);
    numberActiveUsers__label.innerText = 'How much load would you like to simulate?';

    let numberActiveUsers__reference__value = document.createElement('p');
    numberActiveUsers__reference__value.classList.add('reference-values');
    numberActiveUsers__reference__value.innerText = 'approx. < 5000 requests/hour';
    
    constantLoad__container__label__container.appendChild(constantLoad__container__label);
    numberActiveUsers__label__container.appendChild(numberActiveUsers__label);
    numberActiveUsers__child__container.appendChild(numberActiveUsers__input);
    
    constantLoad__container.appendChild(numberActiveUsers__label__container);
    constantLoad__container.appendChild(numberActiveUsers__child__container);
    constantLoad__container.appendChild(numberActiveUsers__reference__value);
    
    loadTestTemplatInputContainer__right.appendChild(constantLoad__container__label__container);
    loadTestTemplatInputContainer__right.appendChild(constantLoad__container);
    getTopContainer.appendChild(loadTestTemplatInputContainer__right);
}

const createContinuousLoadInformationTemplate = (selectedID) => {
    let getTopContainer = document.getElementById(`loadTestTemplatInputContainer__right_${selectedID}`);
    
    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.id = `continuousLoadContainer_${selectedID}`;
    loadTestTemplatInputContainer__right.classList.add('checkbox-parent');
    
    let containerContinuousLoad = document.createElement('div');
    containerContinuousLoad.id = `containerContinuousLoad_${selectedID}`;
    
    let containerContinuousLoad__label__container = document.createElement('div');
    containerContinuousLoad__label__container.classList.add('label-container');
    
    let containerContinuousLoad__label = document.createElement('label');
    containerContinuousLoad__label.innerText = 'Load Design Continuous Load (*)';
    containerContinuousLoad__label.classList.add('label-padding');
    containerContinuousLoad__label.setAttribute('for', `containerContinuousLoad_${selectedID}`);
    
    let continousLoadChild__container = document.createElement('div');
    continousLoadChild__container.classList.add('checkbox-child');
    
    let continousLoad__label__container = document.createElement('div');
    continousLoad__label__container.classList.add('label-container');
    
    let continuousLoadProfile__child__container = document.createElement('div');
    continuousLoadProfile__child__container.classList.add('checkbox-child');

    let continuousLoadProfile__label__container = document.createElement('div');
    continuousLoadProfile__label__container.classList.add('label-container');

    let continuousLoadProfile__input = document.createElement('select');
    continuousLoadProfile__input.id = `continuousLoadProfile__input_${selectedID}`;

    let option_medium = document.createElement('option');
    option_medium.key = 'medium';
    option_medium.text = 'Medium (2x reference value)';

    let option_high = document.createElement('option');
    option_high.key = 'high';
    option_high.text = 'High (4x reference value)';

    let option_veryHigh = document.createElement('option');
    option_veryHigh.key = 'veryHigh';
    option_veryHigh.text = 'Very High (6x reference value)';

    continuousLoadProfile__input.appendChild(option_medium);
    continuousLoadProfile__input.appendChild(option_high);
    continuousLoadProfile__input.appendChild(option_veryHigh);

    let continuousLoadProfile__label = document.createElement('label');
    continuousLoadProfile__label.setAttribute('for', `continuousLoadProfile__input_${selectedID}`);
    continuousLoadProfile__label.innerText = 'How much load would you like to simulate?';

    let continuousLoadProfile__reference__value = document.createElement('p');
    continuousLoadProfile__reference__value.classList.add('reference-values');
    continuousLoadProfile__reference__value.innerText = 'approx. < 5000 requests/hour';

    
    let continuousLoadDuration__input = document.createElement('input');
    continuousLoadDuration__input.id = `continuousLoadDuration__input_${selectedID}`;
    continuousLoadDuration__input.type = 'number';
    continuousLoadDuration__input.placeholder = 'E.g., 20';
    
    let continousLoad__label = document.createElement('label');
    continousLoad__label.classList.add('form-check-label');
    continousLoad__label.setAttribute('for', `continuousLoadDuration__input_${selectedID}`);
    continousLoad__label.innerText = 'Duration of Increase (*)';
    
    /**
     * Appending child nodes
     */
    
    continuousLoadProfile__label__container.appendChild(continuousLoadProfile__label);
    continuousLoadProfile__child__container.appendChild(continuousLoadProfile__input);
    
    containerContinuousLoad__label__container.appendChild(containerContinuousLoad__label);
    
    continousLoad__label__container.appendChild(continousLoad__label);
    
    continousLoadChild__container.appendChild(continousLoad__label__container);
    continousLoadChild__container.appendChild(continuousLoadDuration__input);
    continousLoadChild__container.appendChild(continuousLoadProfile__label__container);
    continousLoadChild__container.appendChild(continuousLoadProfile__child__container);
    
    containerContinuousLoad.appendChild(continousLoadChild__container);
    
    loadTestTemplatInputContainer__right.appendChild(containerContinuousLoad__label__container);
    loadTestTemplatInputContainer__right.appendChild(containerContinuousLoad);
    
    getTopContainer.appendChild(loadTestTemplatInputContainer__right);
}

const createLoadPeakInformationTemplate = (selectedID) => {
    
    let getTopContainer = document.getElementById(`loadTestTemplatInputContainer__right_${selectedID}`);
    
    let loadTestTemplatInputContainer__right = document.createElement('div');
    loadTestTemplatInputContainer__right.id = `loadPeakContainer_${selectedID}`;
    loadTestTemplatInputContainer__right.classList.add('checkbox-parent');
    
    let containerLoadPeak = document.createElement('div');
    containerLoadPeak.id = `containerLoadPeak_${selectedID}`;
    
    let containerLabel__label__container = document.createElement('div');
    containerLabel__label__container.classList.add('label-container');
    
    let container__label = document.createElement('label');
    container__label.setAttribute('for', `containerLoadPeak_${selectedID}`);
    container__label.classList.add('label-padding');
    container__label.innerText = 'Load Design Peak Load (*)';
    
    let peakLoadChild__container = document.createElement('div');
    peakLoadChild__container.classList.add('checkbox-child');
    
    let peakLoad__label__container = document.createElement('div');
    peakLoad__label__container.classList.add('label-container');
    
    let peakLoad__input = document.createElement('select');
    peakLoad__input.id = `peakLoad__input_${selectedID}`;
    
    let option_medium = document.createElement('option');
    option_medium.key = 'medium';
    option_medium.text = 'Medium (2x reference value)';

    let option_high = document.createElement('option');
    option_high.key = 'high';
    option_high.text = 'High (4x reference value)';

    let option_veryHigh = document.createElement('option');
    option_veryHigh.key = 'veryHigh';
    option_veryHigh.text = 'Very High (6x reference value)';

    peakLoad__input.appendChild(option_medium);
    peakLoad__input.appendChild(option_high);
    peakLoad__input.appendChild(option_veryHigh);
    
    let peakLoad__label = document.createElement('label');
    peakLoad__label.setAttribute('for', `peakLoad__input_${selectedID}`);
    peakLoad__label.classList.add('form-check-label');
    peakLoad__label.style.marginTop = '2%';
    peakLoad__label.innerText = 'Peak Load at (*)';
    
    let peakLoad__reference = document.createElement('p');
    peakLoad__reference.classList.add('reference-values');
    peakLoad__reference.innerText = 'Peak at approx. 5000 requests/hour';
    
    let timeToPeakLoadChild__container = document.createElement('div');
    timeToPeakLoadChild__container.classList.add('checkbox-child');
    
    let timeToPeakLoad__label__container = document.createElement('div');
    timeToPeakLoad__label__container.classList.add('label-container');
    
    let timeToPeakLoad__input = document.createElement('input');
    timeToPeakLoad__input.id = `timeToPeakLoad__input_${selectedID}`;
    timeToPeakLoad__input.type = 'number';
    timeToPeakLoad__input.placeholder = 'E.g., 10';
    timeToPeakLoad__input.style.width = '135px';
    timeToPeakLoad__input.style.height = '20px';
    
    let timeToPeakLoad__label = document.createElement('label');
    timeToPeakLoad__label.setAttribute('for', `timeToPeakLoad__input_${selectedID}`);
    timeToPeakLoad__label.innerText = 'Time until Peak (in minutes) (*)';
    
    /**
     * Appending child nodes
     */
    containerLabel__label__container.appendChild(container__label);
    
    timeToPeakLoad__label__container.appendChild(timeToPeakLoad__label);
    
    timeToPeakLoadChild__container.appendChild(timeToPeakLoad__label__container);
    timeToPeakLoadChild__container.appendChild(timeToPeakLoad__input);
    
    peakLoad__label__container.appendChild(peakLoad__label);
    
    peakLoadChild__container.appendChild(peakLoad__input);
    
    containerLoadPeak.appendChild(peakLoad__label__container);
    containerLoadPeak.appendChild(peakLoadChild__container);
    containerLoadPeak.appendChild(peakLoad__reference);
    containerLoadPeak.appendChild(timeToPeakLoadChild__container);
    loadTestTemplatInputContainer__right.appendChild(containerLabel__label__container);
    loadTestTemplatInputContainer__right.appendChild(containerLoadPeak);
    getTopContainer.appendChild(loadTestTemplatInputContainer__right);
}

const createAndAppendResultViewMetrics = (selectedID) => {
    let getLoadTestTemplateModalContent = document.getElementById(`loadTestTemplateModalContent_${selectedID}`);
    
    let resultViewTopContainer = document.createElement('div');
    resultViewTopContainer.classList.add('input__container');
    
    let resultViewMetricsContainer = document.createElement('div');
    resultViewMetricsContainer.id = `resultViewMetricsContainer_${selectedID}`;
    resultViewMetricsContainer.classList.add('checkbox-parent');
    resultViewMetricsContainer.classList.add('result-view-container');
    
    let resultViewMetrics__label = document.createElement('label');
    resultViewMetrics__label.setAttribute('for', `resultViewMetricsContainer_${selectedID}`);
    resultViewMetrics__label.innerText = 'Metrics you would like to include in the Result (*)';
    resultViewMetrics__label.classList.add('form-check-label');
    resultViewMetrics__label.classList.add('label-padding');
    
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
    
    percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__label);
    percentileNinetyFiveChildContainer.appendChild(percentileNinetyFive__input);
    
    percentileNinetyChildContainer.appendChild(percentileNinety__label);
    percentileNinetyChildContainer.appendChild(percentileNinety__input);
    
    resultViewMetricsContainer.appendChild(responseTimeChildContainer);
    resultViewMetricsContainer.appendChild(percentileNinetyChildContainer);
    resultViewMetricsContainer.appendChild(percentileNinetyFiveChildContainer);
    resultViewTopContainer.appendChild(resultViewMetrics__label)
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