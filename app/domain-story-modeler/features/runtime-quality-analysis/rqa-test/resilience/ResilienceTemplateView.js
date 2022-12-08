// 'use-strict';
import {
  INVALID_RESPONSE_MEASURE,
  INFO_ENVIRONMENT_INFORMATION,
  INFO_EXECUTION_CONTEXT,
  INFO_TYPE_OF_FAILURE,
  INFO_ACCURACY,
  INFO_RESPONSE_MEASURE,
  INFO_REPITITION,
  RESILIENCE_FAULT_TYPE_INFO,
  RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO,
  SERVICE_FAILURE_AMOUNT_INFO,
  SERVICE_TIME_TO_FAILURE_INFO
} from '../../util/RuntimeAnalysisConstants';
import { saveResilienceTemplate } from './saveResilienceTemplate';
import { createDisabledGenerateBtn } from '../../util/generateTemplateObject';
import { getNodeName, getNodeRectElementAndSetColor } from '../../util/util';
import { existingLoadTestsView } from '../performance/ExistingLoadTestsView';

/**
 * Get Elements
 */
let elementContainer = document.getElementById('runtimeAnalysisSummaryContainer');
let modal__container = document.getElementById('modal__container');


const checkIfTemplateComplete = (selectedID) => {
  let accuracyElement = document.getElementById(`accuracy_${selectedID}`);
  let accuracy = accuracyElement.value;

  if (!accuracy <= 0) {
    getNodeRectElementAndSetColor(selectedID, false, 'failure');
  }
};

const createButtonContainer = (selectedID) => {

  let modal_resilience_content = document.getElementById(`modal_resilience_content_${selectedID}`);
  let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

  let resilienceTemplateBtnContainerParent = document.createElement('div');

  let resilienceTemplateView__btn__close = document.createElement('button');
  let resilienceTemplateView__btn__save = document.createElement('button');

  resilienceTemplateBtnContainerParent.id = 'resilienceTemplateBtnContainerParent';

  resilienceTemplateView__btn__close.innerText = 'Close';
  resilienceTemplateView__btn__save.innerText = 'Save';

  resilienceTemplateView__btn__close.classList.add('btn');
  resilienceTemplateView__btn__close.classList.add('btn-secondary');
  resilienceTemplateView__btn__close.classList.add('custom-btn');

  resilienceTemplateView__btn__save.classList.add('btn');
  resilienceTemplateView__btn__save.classList.add('btn-primary');
  resilienceTemplateView__btn__save.classList.add('custom-btn');

  resilienceTemplateBtnContainerParent.classList.add('btn-container-parent');

  /**
     * Listeners
     */
  resilienceTemplateView__btn__close.addEventListener('click', () => {
    resilienceTemplateModal.style.display = 'none';
    checkIfTemplateComplete(selectedID);
  });

  resilienceTemplateView__btn__save.addEventListener('click', () => {
    saveResilienceTemplate(selectedID);
  });

  /**
     * Append children to container
     */
  resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__save);
  resilienceTemplateBtnContainerParent.appendChild(resilienceTemplateView__btn__close);

  modal_resilience_content.appendChild(resilienceTemplateBtnContainerParent);
};

/**
 * Creates new template view for resilience tests with a unique ID
 * For every new resilience scenario a new template is created
 * @param {} selectedID
 */
export function createResilienceTemplateView(selectedID) {

  let getModalContainer = document.getElementById('existingLoadTests__modal__container');

  /**
     * Create html elements
     */
  let header = document.createElement('h3');
  header.innerText = 'Resilience Scenario';
  header.classList.add('template-header');

  let resilienceTemplateModal = document.createElement('div');
  resilienceTemplateModal.classList.add('modal_resilience');
  resilienceTemplateModal.id = `modal_resilience_${selectedID}`;

  let resilienceTemplateContent = document.createElement('div');
  resilienceTemplateContent.id = `modal_resilience_content_${selectedID}`;
  resilienceTemplateContent.classList.add('modal_resilience_content');

  let resilienceTemplateViewContainer__left = document.createElement('div');
  resilienceTemplateViewContainer__left.id = 'resilienceTemplateViewContainer__left';
  resilienceTemplateViewContainer__left.classList.add('input__container');

  let resilienceTemplateContentInputTopLevelContainer = document.createElement('div');
  resilienceTemplateContentInputTopLevelContainer.id = 'input__top__container';

  let resilienceTemplateViewContainer__right = document.createElement('div');
  resilienceTemplateViewContainer__right.id = `resilienceTemplateViewContainer__right_${selectedID}`;
  resilienceTemplateViewContainer__right.classList.add('input__container');

  let artifactDescriptor = document.createElement('p');
  artifactDescriptor.classList.add('label-padding');
  artifactDescriptor.innerText = 'Artifact';

  let artifactValue = document.createElement('p');
  artifactValue.classList.add('label-padding');
  artifactValue.innerText = getNodeName(selectedID);

  let artifactValueContainer = document.createElement('div');
  artifactValueContainer.classList.add('checkbox-child');

  let stimulusOccurrence__select = document.createElement('select');
  stimulusOccurrence__select.id = `stimulusOccurrence__select_${selectedID}`;

  let option_stimulus_once = document.createElement('option');
  option_stimulus_once.key = 'Once';
  option_stimulus_once.text = 'Once';

  let option_stimulus_twice_an_hour = document.createElement('option');
  option_stimulus_twice_an_hour.key = 'More than once';
  option_stimulus_twice_an_hour.text = 'More than once';

  let option_randomly = document.createElement('option');
  option_randomly.key = 'Randomly';
  option_randomly.text = 'Randomly';

  stimulusOccurrence__select.appendChild(option_stimulus_once);
  stimulusOccurrence__select.appendChild(option_stimulus_twice_an_hour);
  stimulusOccurrence__select.appendChild(option_randomly);

  let stimulusRepitition__info = document.createElement('i');
  stimulusRepitition__info.classList.add('bi');
  stimulusRepitition__info.classList.add('bi-info-circle');
  stimulusRepitition__info.classList.add('toolTip');

  stimulusRepitition__info.addEventListener('mouseover', () => {
    stimulusRepitition__info_text.style.display = 'block';
  });

  stimulusRepitition__info.addEventListener('mouseleave', () => {
    stimulusRepitition__info_text.style.display = 'none';
  });

  let stimulusRepitition__info_text = document.createElement('span');
  stimulusRepitition__info_text.classList.add('tooltipText');
  stimulusRepitition__info_text.id = `stimulusRepitition_${selectedID}_info_text`;
  stimulusRepitition__info_text.innerText = INFO_REPITITION;

  let stimulusRepititionLabelContainer = document.createElement('div');
  stimulusRepititionLabelContainer.classList.add('label-container');

  let stimulusRepitition__label = document.createElement('label');
  stimulusRepitition__label.classList.add('label-padding');
  stimulusRepitition__label.id = 'stimulusRepitition__label';
  stimulusRepitition__label.setAttribute('for', `stimulusRepitition_${selectedID}`);
  stimulusRepitition__label.innerText = 'How often does the stimulus occur? (*)';

  let stimulusRepitition__invalid = document.createElement('p');
  stimulusRepitition__invalid.innerText = SERVICE_FAILURE_AMOUNT_INFO;
  stimulusRepitition__invalid.id = `stimulusRepitition__invalid_${selectedID}`;
  stimulusRepitition__invalid.classList.add('error-info');
  stimulusRepitition__invalid.style.display = 'none';

  let accuracyChildContainer = document.createElement('div');
  accuracyChildContainer.classList.add('checkbox-child');

  let accuracyLabelContainer = document.createElement('div');
  accuracyLabelContainer.classList.add('label-container');


  let accuracy = document.createElement('input');
  accuracy.id = `accuracy_${selectedID}`;
  accuracy.type = 'range';
  accuracy.min = '0';
  accuracy.max = '100';
  accuracy.value = '0';
  accuracy.step = '1';

  let accuracyCurrentValue = document.createElement('span');
  accuracyCurrentValue.classList.add('accuracy');
  accuracyCurrentValue.innerText = accuracy.value + '%';

  accuracy.addEventListener('change', () => {
    accuracyCurrentValue.innerText = accuracy.value + '%';
  });

  let accuracy__label = document.createElement('label');
  accuracy__label.id = 'accuracy__label';
  accuracy__label.setAttribute('for', `accuracy_${selectedID}`);
  accuracy__label.innerText = 'Confidence of Results (*)';

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
  accuracy__label_info_text.id = `accuracy__label_info_text_${selectedID}_info_text`;
  accuracy__label_info_text.innerText = INFO_ACCURACY;

  let accuracy__invalid = document.createElement('p');
  accuracy__invalid.innerText = SERVICE_TIME_TO_FAILURE_INFO;
  accuracy__invalid.id = `accuracy__invalid_${selectedID}`;
  accuracy__invalid.classList.add('error-info');
  accuracy__invalid.style.display = 'none';

  let checkBoxContainer = document.createElement('div');
  checkBoxContainer.id = 'checkBoxContainerstimulus';
  checkBoxContainer.classList.add('checkbox-parent');

  let stimulusSelection__labelContainer = document.createElement('div');
  stimulusSelection__labelContainer.classList.add('label-container');

  let stimulusSelectionChildContainer = document.createElement('div');
  stimulusSelectionChildContainer.classList.add('checkbox-child');

  let stimulusSelection__info = document.createElement('i');
  stimulusSelection__info.classList.add('bi');
  stimulusSelection__info.classList.add('bi-info-circle');
  stimulusSelection__info.classList.add('toolTip');

  stimulusSelection__info.addEventListener('mouseover', () => {
    stimulusSelection__info_text.style.display = 'block';
  });

  stimulusSelection__info.addEventListener('mouseleave', () => {
    stimulusSelection__info_text.style.display = 'none';
  });

  let stimulusSelection__info_text = document.createElement('span');
  stimulusSelection__info_text.classList.add('tooltipText');
  stimulusSelection__info_text.id = `stimulusRepitition_${selectedID}_info_text`;
  stimulusSelection__info_text.innerText = INFO_TYPE_OF_FAILURE;

  let stimulusSelectionElement = document.createElement('select');
  stimulusSelectionElement.id = `stimulusSelectionElement_${selectedID}`;

  let stimulusSelection__label = document.createElement('label');
  stimulusSelection__label.setAttribute('for', `stimulusSelectionElement_${selectedID}`);
  stimulusSelection__label.classList.add('form-check-label');
  stimulusSelection__label.innerText = 'Stimulus (*)';

  let selection__noResponse = document.createElement('option');
  selection__noResponse.key = 'no__response';
  selection__noResponse.text = 'Unavailable';

  let selection__otherThan = document.createElement('option');
  selection__otherThan.key = 'other__than';
  selection__otherThan.text = 'Failed request';

  let selection__laterThan = document.createElement('option');
  selection__laterThan.key = 'later__than';
  selection__laterThan.text = 'Late response';

  stimulusSelectionElement.appendChild(selection__noResponse);
  stimulusSelectionElement.appendChild(selection__otherThan);
  stimulusSelectionElement.appendChild(selection__laterThan);

  let resilienceScenarioEnvironmentSelect = document.createElement('select');
  resilienceScenarioEnvironmentSelect.id = `resilienceScenarioEnvironmentTypeSelect_${selectedID}`;

  let option_no = document.createElement('option');
  option_no.key = 'No';
  option_no.text = 'No';
  option_no.selected = 'true';

  let option_yes = document.createElement('option');
  option_yes.key = 'Yes';
  option_yes.text = 'Yes';

  resilienceScenarioEnvironmentSelect.addEventListener('change', () => {
    if (resilienceScenarioEnvironmentSelect.value == 'Yes') {
      environment_select_information_container.style.display = 'block';
      executionContextInformation_container.style.display = 'none';
    } else {
      environment_select_information_container.style.display = 'none';
      executionContextInformation_container.style.display = 'block';
    }
  });

  let environment_select_information_container = document.createElement('div');
  environment_select_information_container.id = `environment_select_information_container_${selectedID}`;
  environment_select_information_container.style.display = 'none';

  let user_information = document.createElement('p');
  user_information.classList.add('caution-text');
  user_information.innerText = 'Caution: Your scenario will be executed in the production environment. '
        + 'This may lead to users experiencing the selected stimulus, at least for the duration you specified';

  resilienceScenarioEnvironmentSelect.appendChild(option_no);
  resilienceScenarioEnvironmentSelect.appendChild(option_yes);

  let resilienceScenarioEnvironment__label = document.createElement('label');
  resilienceScenarioEnvironment__label.innerText = 'Do you want your users to notice the stimulus? (*)';
  resilienceScenarioEnvironment__label.setAttribute('for', `resilienceScenarioEnvironmentTypeSelect_${selectedID}`);
  resilienceScenarioEnvironment__label.classList.add('label-padding');

  let resilienceScenarioEnvironmentLabelContainer = document.createElement('div');
  resilienceScenarioEnvironmentLabelContainer.classList.add('label-container');

  let resilienceScenarioEnvironment__label_info = document.createElement('i');
  resilienceScenarioEnvironment__label_info.classList.add('bi');
  resilienceScenarioEnvironment__label_info.classList.add('bi-info-circle');
  resilienceScenarioEnvironment__label_info.classList.add('toolTip');

  resilienceScenarioEnvironment__label_info.addEventListener('mouseover', () => {
    resilienceScenarioEnvironment__label_info_text.style.display = 'block';
  });

  resilienceScenarioEnvironment__label_info.addEventListener('mouseleave', () => {
    resilienceScenarioEnvironment__label_info_text.style.display = 'none';
  });

  let resilienceScenarioEnvironment__label_info_text = document.createElement('span');
  resilienceScenarioEnvironment__label_info_text.classList.add('tooltipText');
  resilienceScenarioEnvironment__label_info_text.innerText = INFO_EXECUTION_CONTEXT;

  let resilienceScenarioEnvironmentType__invalid = document.createElement('p');
  resilienceScenarioEnvironmentType__invalid.id = `resilienceScenarioEnvironmentType__invalid_${selectedID}`;
  resilienceScenarioEnvironmentType__invalid.innerText = RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO;
  resilienceScenarioEnvironmentType__invalid.classList.add('error-info');
  resilienceScenarioEnvironmentType__invalid.style.display = 'none';

  let existingLoadTests__container = document.createElement('div');
  existingLoadTests__container.id = `existingLoadTests__container_${selectedID}`;
  existingLoadTests__container.style.display = 'block';
  existingLoadTests__container.classList.add('checkbox-parent');

  let existingLoadTests__label__container = document.createElement('div');
  existingLoadTests__label__container.classList.add('label-container');

  let existingLoadTests__child__container = document.createElement('div');
  existingLoadTests__child__container.classList.add('checkbox-child');

  let existingLoadTests__button__container = document.createElement('div');
  existingLoadTests__button__container.classList.add('checkbox-child');

  let existingLoadTests__button = document.createElement('button');
  existingLoadTests__button.id = `existingLoadTests__button_${selectedID}`;
  existingLoadTests__button.classList.add('btn');
  existingLoadTests__button.classList.add('btn-primary');
  existingLoadTests__button.innerText = 'Show loadtests';
  existingLoadTests__button.disabled = true;

  existingLoadTests__button.addEventListener('click', () => {
    console.log('Open existing load tests...');
    getModalContainer.style.display = 'block';
  });

  let existingLoadTests__input = document.createElement('input');
  existingLoadTests__input.id = `existingLoadTests__input_${selectedID}`;
  existingLoadTests__input.type = 'checkbox';
  existingLoadTests__input.classList.add('form-check-input');

  existingLoadTests__input.addEventListener('click', () => {
    if (existingLoadTests__input.checked) {
      existingLoadTests__button.disabled = false;
    } else {
      existingLoadTests__button.disabled = true;
    }
  });

  let existingLoadTests__input__label = document.createElement('label');
  existingLoadTests__input__label.setAttribute('for', `existingLoadTests__input_${selectedID}`);
  existingLoadTests__input__label.classList.add('form-check-label');
  existingLoadTests__input__label.innerText = 'Use existing loadtests';

  let executionContextInformation_container = document.createElement('div');
  executionContextInformation_container.id = `executionContextInformation_container_${selectedID}`;
  executionContextInformation_container.style.display = 'block';

  let executionContextScheduleContainerOfficeHours = document.createElement('div');
  executionContextScheduleContainerOfficeHours.id = 'executionContextScheduleContainerOfficeHours';
  executionContextScheduleContainerOfficeHours.classList.add('checkbox-child');

  let executionContextScheduleContainerOffHours = document.createElement('div');
  executionContextScheduleContainerOffHours.id = 'executionContextScheduleContainerOffHours';
  executionContextScheduleContainerOffHours.classList.add('checkbox-child');

  let executionContextScheduleParentContainer = document.createElement('div');
  executionContextScheduleParentContainer.id = 'executionContextScheduleParentContainer';
  executionContextScheduleParentContainer.classList.add('checkbox-parent');

  let executionContextScheduleParentContainer__label = document.createElement('label');
  executionContextScheduleParentContainer__label.id = 'executionContextScheduleParentContainer__label';
  executionContextScheduleParentContainer__label.innerText = 'Select a time slot for your scenario';
  executionContextScheduleParentContainer__label.setAttribute('for', 'executionContextScheduleParentContainer');
  executionContextScheduleParentContainer__label.classList.add('form-check-label');
  executionContextScheduleParentContainer__label.classList.add('label-padding');

  let executionContextLabelContainer = document.createElement('div');
  executionContextLabelContainer.classList.add('label-container');

  let executionContext__label_info = document.createElement('i');
  executionContext__label_info.classList.add('bi');
  executionContext__label_info.classList.add('bi-info-circle');
  executionContext__label_info.classList.add('toolTip');

  executionContext__label_info.addEventListener('mouseover', () => {
    executionContext__label_info_text.style.display = 'block';
  });

  executionContext__label_info.addEventListener('mouseleave', () => {
    executionContext__label_info_text.style.display = 'none';
  });

  let executionContext__label_info_text = document.createElement('span');
  executionContext__label_info_text.classList.add('tooltipText');
  executionContext__label_info_text.innerText = INFO_ENVIRONMENT_INFORMATION;

  let executionContextWorkingHoursCheckBox = document.createElement('input');
  executionContextWorkingHoursCheckBox.id = `executionContextWorkingHoursCheckBox_${selectedID}`;
  executionContextWorkingHoursCheckBox.type = 'checkbox';
  executionContextWorkingHoursCheckBox.classList.add('form-check-input');
  executionContextWorkingHoursCheckBox.classList.add('label-padding');

  let executionContextWorkingHoursCheckBox__label = document.createElement('label');
  executionContextWorkingHoursCheckBox__label.id = 'executionContextWorkingHoursCheckBox__label';
  executionContextWorkingHoursCheckBox__label.innerText = 'Office Hours 08:00 am to 16:00 pm';
  executionContextWorkingHoursCheckBox__label.classList.add('form-check-label');
  executionContextWorkingHoursCheckBox__label.setAttribute('for', `executionContextWorkingHoursCheckBox_${selectedID}`);

  let executionContextOffWorkingHoursCheckBox = document.createElement('input');
  executionContextOffWorkingHoursCheckBox.id = `executionContextOffWorkingHoursCheckBox_${selectedID}`;
  executionContextOffWorkingHoursCheckBox.type = 'checkbox';
  executionContextOffWorkingHoursCheckBox.classList.add('form-check-input');
  executionContextOffWorkingHoursCheckBox.classList.add('label-padding');

  let executionContextOffWorkingHoursCheckBox__label = document.createElement('label');
  executionContextOffWorkingHoursCheckBox__label.id = 'executionContextOffWorkingHoursCheckBox__label';
  executionContextOffWorkingHoursCheckBox__label.innerText = 'Off Schedule after 16:00 pm';
  executionContextOffWorkingHoursCheckBox__label.classList.add('form-check-label');
  executionContextOffWorkingHoursCheckBox__label.setAttribute('for', `executionContextOffWorkingHoursCheckBox_${selectedID}`);

  let stimulusCheckBox__invalid = document.createElement('p');
  stimulusCheckBox__invalid.id = `stimulusCheckBox__invalid_${selectedID}`;
  stimulusCheckBox__invalid.innerText = RESILIENCE_FAULT_TYPE_INFO;
  stimulusCheckBox__invalid.classList.add('error-info');
  stimulusCheckBox__invalid.style.display = 'none';

  let responseMeasureCheckboxContainer = document.createElement('div');
  responseMeasureCheckboxContainer.classList.add('checkbox-parent');

  let responseMeasure__invalid = document.createElement('p');
  responseMeasure__invalid.id = `responseMeasure__invalid_${selectedID}`;
  responseMeasure__invalid.innerText = INVALID_RESPONSE_MEASURE;
  responseMeasure__invalid.classList.add('error-info');
  responseMeasure__invalid.style.display = 'none';

  let responseMeasureCheckBoxLabelContainer = document.createElement('div');
  responseMeasureCheckBoxLabelContainer.classList.add('label-container');

  let responseMeasureCheckboxLabel = document.createElement('label');
  responseMeasureCheckboxLabel.innerText = 'Response Measure (*)';
  responseMeasureCheckboxLabel.classList.add('label-padding');

  let responseMeasureCheckboxLabel__info = document.createElement('i');
  responseMeasureCheckboxLabel__info.classList.add('bi');
  responseMeasureCheckboxLabel__info.classList.add('bi-info-circle');
  responseMeasureCheckboxLabel__info.classList.add('toolTip');

  responseMeasureCheckboxLabel__info.addEventListener('mouseover', () => {
    responseMeasureCheckboxLabel__info_text.style.display = 'block';
  });

  responseMeasureCheckboxLabel__info.addEventListener('mouseleave', () => {
    responseMeasureCheckboxLabel__info_text.style.display = 'none';
  });

  let responseMeasureCheckboxLabel__info_text = document.createElement('span');
  responseMeasureCheckboxLabel__info_text.classList.add('tooltipText');
  responseMeasureCheckboxLabel__info_text.innerText = INFO_RESPONSE_MEASURE;

  /**
     * Button group for Response Times in Response Measure
     */
  let responseMeasureBtn__group = document.createElement('div');
  responseMeasureBtn__group.setAttribute('data-toggle', 'buttons');
  responseMeasureBtn__group.classList.add('btn-group');
  responseMeasureBtn__group.classList.add('btn-group-toggle');

  let satisfied__input = document.createElement('button');
  satisfied__input.type = 'button';
  satisfied__input.name = 'options';
  satisfied__input.setAttribute('aria-pressed', 'false');
  satisfied__input.id = `satisfied__option__key_${selectedID}`;
  satisfied__input.innerText = 'Satisfied';
  satisfied__input.classList.add('btn');
  satisfied__input.classList.add('btn-outline-primary');
  satisfied__input.classList.add('btn-group-btn');
  satisfied__input.disabled = true;

  satisfied__input.addEventListener('click', () => {
    console.log(satisfied__input.ariaPressed);
    tolerated__input.classList.remove('active');
    frustrated__input.classList.remove('active');
  });

  let tolerated__input = document.createElement('button');
  tolerated__input.type = 'button';
  tolerated__input.name = 'options';
  tolerated__input.setAttribute('aria-pressed', 'false');
  tolerated__input.id = `tolerated__input__option__key_${selectedID}`;
  tolerated__input.innerText = 'Tolerated';
  tolerated__input.classList.add('btn');
  tolerated__input.classList.add('btn-outline-primary');
  tolerated__input.classList.add('btn-group-btn');
  tolerated__input.disabled = true;

  tolerated__input.addEventListener('click', () => {
    satisfied__input.classList.remove('active');
    frustrated__input.classList.remove('active');
  });

  let frustrated__input = document.createElement('button');
  frustrated__input.type = 'button';
  frustrated__input.name = 'options';
  frustrated__input.setAttribute('aria-pressed', 'false');
  frustrated__input.id = `frustrated__input__option__key_${selectedID}`;
  frustrated__input.innerText = 'Frustrated';
  frustrated__input.classList.add('btn');
  frustrated__input.classList.add('btn-outline-primary');
  frustrated__input.classList.add('btn-group-btn');
  frustrated__input.disabled = true;

  frustrated__input.addEventListener('click', () => {
    satisfied__input.classList.remove('active');
    tolerated__input.classList.remove('active');
  });

  let responseTime__label = document.createElement('label');
  responseTime__label.classList.add('form-check-label');
  responseTime__label.setAttribute('for', `satisfied__option__key_${selectedID}`);
  responseTime__label.innerText = 'Response time';
  responseTime__label.classList.add('text-disabled');

  responseMeasureBtn__group.appendChild(satisfied__input);
  responseMeasureBtn__group.appendChild(tolerated__input);
  responseMeasureBtn__group.appendChild(frustrated__input);

  let responseMeasureResponseTimeCheckboxContainerChild = document.createElement('div');
  responseMeasureResponseTimeCheckboxContainerChild.classList.add('checkbox-child');

  let recoveryBtn__group = document.createElement('div');
  recoveryBtn__group.setAttribute('data-toggle', 'buttons');
  recoveryBtn__group.classList.add('btn-group');
  recoveryBtn__group.classList.add('btn-group-toggle');

  let satisfied__input__recovery = document.createElement('button');
  satisfied__input__recovery.type = 'button';
  satisfied__input__recovery.name = 'options';
  satisfied__input__recovery.setAttribute('aria-pressed', 'false');
  satisfied__input__recovery.id = `satisfied__recovery__option__key_${selectedID}`;
  satisfied__input__recovery.innerText = 'Satisfied';
  satisfied__input__recovery.classList.add('btn');
  satisfied__input__recovery.classList.add('btn-outline-primary');
  satisfied__input__recovery.classList.add('btn-group-btn');
  satisfied__input__recovery.disabled = false;

  satisfied__input__recovery.addEventListener('click', () => {
    tolerated__input__recovery.classList.remove('active');
    frustrated__input__recovery.classList.remove('active');
  });

  let tolerated__input__recovery = document.createElement('button');
  tolerated__input__recovery.type = 'button';
  tolerated__input__recovery.name = 'options';
  tolerated__input__recovery.setAttribute('aria-pressed', 'false');
  tolerated__input__recovery.id = `tolerate__recovery__option__key_${selectedID}`;
  tolerated__input__recovery.innerText = 'Tolerated';
  tolerated__input__recovery.classList.add('btn');
  tolerated__input__recovery.classList.add('btn-outline-primary');
  tolerated__input__recovery.classList.add('btn-group-btn');
  tolerated__input__recovery.disabled = false;

  tolerated__input__recovery.addEventListener('click', () => {
    satisfied__input__recovery.classList.remove('active');
    frustrated__input__recovery.classList.remove('active');
  });

  let frustrated__input__recovery = document.createElement('button');
  frustrated__input__recovery.type = 'button';
  frustrated__input__recovery.name = 'options';
  frustrated__input__recovery.setAttribute('aria-pressed', 'false');
  frustrated__input__recovery.id = `frustrated__recovery__option__key_${selectedID}`;
  frustrated__input__recovery.innerText = 'Frustrated';
  frustrated__input__recovery.classList.add('btn');
  frustrated__input__recovery.classList.add('btn-outline-primary');
  frustrated__input__recovery.classList.add('btn-group-btn');
  frustrated__input__recovery.disabled = false;

  frustrated__input__recovery.addEventListener('click', () => {
    satisfied__input__recovery.classList.remove('active');
    tolerated__input__recovery.classList.remove('active');
  });

  let recoveryTime__label = document.createElement('label');
  recoveryTime__label.classList.add('form-check-label');
  recoveryTime__label.setAttribute('for', `satisfied__input__recovery__${selectedID}`);
  recoveryTime__label.innerText = 'Recovery time';
  recoveryTime__label.classList.add('text-enabled');

  recoveryBtn__group.appendChild(satisfied__input__recovery);
  recoveryBtn__group.appendChild(tolerated__input__recovery);
  recoveryBtn__group.appendChild(frustrated__input__recovery);

  let responseMeasureRecoveryTimeCheckboxContainerChild = document.createElement('div');
  responseMeasureRecoveryTimeCheckboxContainerChild.classList.add('checkbox-child');

  let errorRatesChildContainer = document.createElement('div');
  errorRatesChildContainer.classList.add('checkbox-child');

  let errorRates__btn__group = document.createElement('div');
  errorRates__btn__group.setAttribute('data-toggle', 'buttons');
  errorRates__btn__group.classList.add('btn-group');
  errorRates__btn__group.classList.add('btn-group-toggle');

  let errorRates__input__none = document.createElement('button');
  errorRates__input__none.type = 'button';
  errorRates__input__none.name = 'options';
  errorRates__input__none.setAttribute('aria-pressed', 'false');
  errorRates__input__none.id = `errorRates__input__none_${selectedID}`;
  errorRates__input__none.innerText = 'None';
  errorRates__input__none.classList.add('btn');
  errorRates__input__none.classList.add('btn-outline-primary');
  errorRates__input__none.classList.add('btn-group-btn');
  errorRates__input__none.disabled = true;

  errorRates__input__none.addEventListener('click', () => {
    errorRates__input__low.classList.remove('active');
    errorRates__input__medium.classList.remove('active');
    errorRates__input__high.classList.remove('active');
  });

  let errorRates__input__low = document.createElement('button');
  errorRates__input__low.type = 'button';
  errorRates__input__low.name = 'options';
  errorRates__input__low.setAttribute('aria-pressed', 'false');
  errorRates__input__low.id = `errorRates__input_low_${selectedID}`;
  errorRates__input__low.innerText = 'Low';
  errorRates__input__low.classList.add('btn');
  errorRates__input__low.classList.add('btn-outline-primary');
  errorRates__input__low.classList.add('btn-group-btn');
  errorRates__input__low.disabled = true;

  errorRates__input__low.addEventListener('click', () => {
    errorRates__input__none.classList.remove('active');
    errorRates__input__medium.classList.remove('active');
    errorRates__input__high.classList.remove('active');
  });

  let errorRates__input__medium = document.createElement('button');
  errorRates__input__medium.type = 'button';
  errorRates__input__medium.name = 'options';
  errorRates__input__medium.setAttribute('aria-pressed', 'false');
  errorRates__input__medium.id = `errorRates__input_medium_${selectedID}`;
  errorRates__input__medium.innerText = 'Medium';
  errorRates__input__medium.classList.add('btn');
  errorRates__input__medium.classList.add('btn-outline-primary');
  errorRates__input__medium.classList.add('btn-group-btn');
  errorRates__input__medium.disabled = true;

  errorRates__input__medium.addEventListener('click', () => {
    errorRates__input__none.classList.remove('active');
    errorRates__input__low.classList.remove('active');
    errorRates__input__high.classList.remove('active');
  });

  let errorRates__input__high = document.createElement('button');
  errorRates__input__high.type = 'button';
  errorRates__input__high.name = 'options';
  errorRates__input__high.setAttribute('aria-pressed', false);
  errorRates__input__high.id = `errorRates__input_high_${selectedID}`;
  errorRates__input__high.innerText = 'High';
  errorRates__input__high.classList.add('btn');
  errorRates__input__high.classList.add('btn-outline-primary');
  errorRates__input__high.classList.add('btn-group-btn');
  errorRates__input__high.disabled = true;

  errorRates__input__high.addEventListener('click', () => {
    errorRates__input__none.classList.remove('active');
    errorRates__input__low.classList.remove('active');
    errorRates__input__medium.classList.remove('active');
  });

  let errorRates__input__label = document.createElement('label');
  errorRates__input__label.classList.add('form-check-label');
  errorRates__input__label.setAttribute('for', `satisfied__input__recovery__${selectedID}`);
  errorRates__input__label.innerText = 'Error rates';
  errorRates__input__label.classList.add('text-disabled');

  errorRates__btn__group.appendChild(errorRates__input__none);
  errorRates__btn__group.appendChild(errorRates__input__low);
  errorRates__btn__group.appendChild(errorRates__input__medium);
  errorRates__btn__group.appendChild(errorRates__input__high);

  stimulusSelectionElement.addEventListener('change', () => {
    if (stimulusSelectionElement.value === 'Unavailable') {
      satisfied__input__recovery.disabled = !satisfied__input__recovery.disabled;
      tolerated__input__recovery.disabled = !tolerated__input__recovery.disabled;
      frustrated__input__recovery.disabled = !frustrated__input__recovery.disabled;
      recoveryTime__label.classList.remove('text-disabled');
      recoveryTime__label.classList.add('text-enabled');

      errorRates__input__none.disabled = true;
      errorRates__input__low.disabled = true;
      errorRates__input__medium.disabled = true;
      errorRates__input__high.disabled = true;
      errorRates__input__label.classList.remove('text-enabled');
      errorRates__input__label.classList.add('text-disabled');

      satisfied__input.disabled = true;
      tolerated__input.disabled = true;
      frustrated__input.disabled = true;
      responseTime__label.classList.remove('text-enabled');
      responseTime__label.classList.add('text-disabled');

    } else if (stimulusSelectionElement.value === 'Failed request') {
      errorRates__input__none.disabled = !errorRates__input__none.disabled;
      errorRates__input__low.disabled = !errorRates__input__low.disabled;
      errorRates__input__medium.disabled = !errorRates__input__medium.disabled;
      errorRates__input__high.disabled = !errorRates__input__high.disabled;
      errorRates__input__label.classList.remove('text-disabled');
      errorRates__input__label.classList.add('text-enabled');

      satisfied__input__recovery.disabled = true;
      tolerated__input__recovery.disabled = true;
      frustrated__input__recovery.disabled = true;
      recoveryTime__label.classList.remove('text-enabled');
      recoveryTime__label.classList.add('text-disabled');

      satisfied__input.disabled = true;
      tolerated__input.disabled = true;
      frustrated__input.disabled = true;
      responseTime__label.classList.remove('text-enabled');
      responseTime__label.classList.add('text-disabled');

    } else if (stimulusSelectionElement.value === 'Late response') {
      errorRates__input__none.disabled = true;
      errorRates__input__low.disabled = true;
      errorRates__input__medium.disabled = true;
      errorRates__input__high.disabled = true;
      errorRates__input__label.classList.remove('text-enabled');
      errorRates__input__label.classList.add('text-disabled');

      satisfied__input__recovery.disabled = true;
      tolerated__input__recovery.disabled = true;
      frustrated__input__recovery.disabled = true;
      recoveryTime__label.classList.remove('text-enabled');
      recoveryTime__label.classList.add('text-disabled');

      satisfied__input.disabled = !satisfied__input.disabled;
      tolerated__input.disabled = !tolerated__input.disabled;
      frustrated__input.disabled = !frustrated__input.disabled;
      responseTime__label.classList.remove('text-disabled');
      responseTime__label.classList.add('text-enabled');
    }
  });

  /**
     * This is probably going to be the summary view for all resilience scenarios
     */
  let resilienceTemplateView__btn__open = document.createElement('button');
  resilienceTemplateView__btn__open.id = selectedID;
  resilienceTemplateView__btn__open.innerText = 'Resilience Scenario ' + selectedID;

  // elementContainer.appendChild(resilienceTemplateView__btn__open);
  resilienceTemplateView__btn__open.classList.add('btn');
  resilienceTemplateView__btn__open.classList.add('btn-primary');

  // Opens the resilience template (summary) view
  resilienceTemplateView__btn__open.addEventListener('click', () => {
    resilienceTemplateModal.style.display = 'block';
  });

  /**
     * Appending all child nodes to parent container, i.e., template view
     */
  modal__container.appendChild(resilienceTemplateModal);
  resilienceTemplateModal.appendChild(resilienceTemplateContent);
  resilienceTemplateContent.appendChild(header);
  resilienceTemplateContent.appendChild(resilienceTemplateContentInputTopLevelContainer);

  existingLoadTests__button__container.appendChild(existingLoadTests__button);

  existingLoadTests__child__container.appendChild(existingLoadTests__input__label);
  existingLoadTests__child__container.appendChild(existingLoadTests__input);

  environment_select_information_container.appendChild(user_information);

  stimulusRepititionLabelContainer.appendChild(stimulusRepitition__label);
  stimulusRepititionLabelContainer.appendChild(stimulusRepitition__info);
  stimulusRepititionLabelContainer.appendChild(stimulusRepitition__info_text);

  stimulusSelection__labelContainer.appendChild(stimulusSelection__label);
  stimulusSelection__labelContainer.appendChild(stimulusSelection__info);
  stimulusSelection__labelContainer.appendChild(stimulusSelection__info_text);

  accuracyLabelContainer.appendChild(accuracy__label);
  accuracyLabelContainer.appendChild(accuracy__label_info);
  accuracyLabelContainer.appendChild(accuracyCurrentValue);
  accuracyLabelContainer.appendChild(accuracy__label_info_text);

  accuracyChildContainer.appendChild(accuracyLabelContainer);
  accuracyChildContainer.appendChild(accuracy);

  errorRatesChildContainer.appendChild(errorRates__input__label);
  errorRatesChildContainer.appendChild(errorRates__btn__group);

  resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label);
  resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info);
  resilienceScenarioEnvironmentLabelContainer.appendChild(resilienceScenarioEnvironment__label_info_text);

  executionContextLabelContainer.appendChild(executionContextScheduleParentContainer__label);
  executionContextLabelContainer.appendChild(executionContext__label_info);
  executionContextLabelContainer.appendChild(executionContext__label_info_text);

  responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel);
  responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel__info);
  responseMeasureCheckBoxLabelContainer.appendChild(responseMeasureCheckboxLabel__info_text);

  responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseTime__label);
  responseMeasureResponseTimeCheckboxContainerChild.appendChild(responseMeasureBtn__group);

  responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(recoveryTime__label);
  responseMeasureRecoveryTimeCheckboxContainerChild.appendChild(recoveryBtn__group);

  responseMeasureCheckboxContainer.appendChild(responseMeasureRecoveryTimeCheckboxContainerChild);
  responseMeasureCheckboxContainer.appendChild(responseMeasureResponseTimeCheckboxContainerChild);
  responseMeasureCheckboxContainer.appendChild(errorRatesChildContainer);

  artifactValueContainer.appendChild(artifactDescriptor);
  artifactValueContainer.appendChild(artifactValue);

  stimulusSelectionChildContainer.appendChild(stimulusSelection__labelContainer);
  stimulusSelectionChildContainer.appendChild(stimulusSelectionElement);

  checkBoxContainer.appendChild(stimulusSelectionChildContainer);

  executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox__label);
  executionContextScheduleContainerOfficeHours.appendChild(executionContextWorkingHoursCheckBox);

  executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox__label);
  executionContextScheduleContainerOffHours.appendChild(executionContextOffWorkingHoursCheckBox);

  executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOfficeHours);
  executionContextScheduleParentContainer.appendChild(executionContextScheduleContainerOffHours);
  executionContextScheduleParentContainer.appendChild(existingLoadTests__child__container);
  executionContextScheduleParentContainer.appendChild(existingLoadTests__button__container);

  executionContextInformation_container.appendChild(executionContextLabelContainer);
  executionContextInformation_container.appendChild(executionContextScheduleParentContainer);

  // this goes right
  resilienceTemplateViewContainer__right.appendChild(stimulusRepititionLabelContainer);
  resilienceTemplateViewContainer__right.appendChild(stimulusOccurrence__select);
  resilienceTemplateViewContainer__right.appendChild(stimulusRepitition__invalid);

  resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentLabelContainer);
  resilienceTemplateViewContainer__right.appendChild(resilienceScenarioEnvironmentSelect);
  resilienceTemplateViewContainer__right.appendChild(environment_select_information_container);
  resilienceTemplateViewContainer__right.appendChild(executionContextInformation_container);


  // this goes left
  resilienceTemplateViewContainer__left.appendChild(artifactValueContainer);
  resilienceTemplateViewContainer__left.appendChild(checkBoxContainer);
  resilienceTemplateViewContainer__left.appendChild(stimulusCheckBox__invalid);

  resilienceTemplateViewContainer__left.appendChild(accuracyChildContainer);

  resilienceTemplateViewContainer__left.appendChild(responseMeasureCheckBoxLabelContainer);
  resilienceTemplateViewContainer__left.appendChild(responseMeasureCheckboxContainer);
  resilienceTemplateViewContainer__left.appendChild(responseMeasure__invalid);

  resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__left);
  resilienceTemplateContentInputTopLevelContainer.appendChild(resilienceTemplateViewContainer__right);

  existingLoadTestsView(selectedID);
  createButtonContainer(selectedID);
  resilienceTemplateModal.style.display = 'block';

  /**
     * Check if ggenerate button already exists, create otherwise.
     */
  let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

  if (!getGenerateAndPush__btn) {
    createDisabledGenerateBtn();
  }
}


/**
 * Creates a resilience template from a selected node;
 * @param {} selectedID
 */
export const createResilienceTemplate = (selectedID) => {

  let resilienceTemplateModal = document.getElementById(`modal_resilience_${selectedID}`);

  if (resilienceTemplateModal) {
    resilienceTemplateModal.style.display = 'block';
  } else {
    createResilienceTemplateView(selectedID);
  }
};

