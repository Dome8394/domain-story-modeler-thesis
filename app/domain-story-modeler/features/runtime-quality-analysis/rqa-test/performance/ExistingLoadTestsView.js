import { getNodeName } from "../../util/util";

export const existingLoadTestsView = (selectedID) => {
    let getModalContainer = document.getElementById('existingLoadTests__modal__container');

    let existingLoadTests__modal__content = document.createElement('div');
    existingLoadTests__modal__content.classList.add('confirmation-modal-content')

    let parentContainer = document.createElement('div');
    parentContainer.classList.add('checkbox-parent');

    let preTagOne = document.createElement('pre');
    preTagOne.style.overflow = 'visible';
    
    let loadTestOneCheckbox__input = document.createElement('input');
    loadTestOneCheckbox__input.id = `loadTestOneCheckbox__input_${selectedID}`;
    loadTestOneCheckbox__input.type = 'checkbox';
    loadTestOneCheckbox__input.classList.add('form-check-input');
    
    let loadTestOneCheckbox__label = document.createElement('label');
    loadTestOneCheckbox__label.setAttribute('for', `loadTestOneCheckbox__input_${selectedID}`);
    loadTestOneCheckbox__label.classList.add('label-padding');
    loadTestOneCheckbox__label.innerText = 'Use Load Test 1';
    
    let loadTestTwoCheckbox__input = document.createElement('input');
    loadTestTwoCheckbox__input.id = `loadTestTwoCheckbox__input_${selectedID}`;
    loadTestTwoCheckbox__input.type = 'checkbox';
    loadTestTwoCheckbox__input.classList.add('form-check-input');
    
    let loadTestTwoCheckbox__label = document.createElement('label');
    loadTestTwoCheckbox__label.setAttribute('for', `loadTestTwoCheckbox__input_${selectedID}`);
    loadTestTwoCheckbox__label.classList.add('label-padding');
    loadTestTwoCheckbox__label.innerText = 'Use Load Test 2';
    
    let useBothConfirm__btn = document.createElement('button');
    useBothConfirm__btn.classList.add('btn');
    useBothConfirm__btn.classList.add('btn-primary');
    useBothConfirm__btn.classList.add('custom-btn');
    useBothConfirm__btn.innerText = 'Use both';
    
    useBothConfirm__btn.addEventListener('click', () => {
        loadTestOneCheckbox__input.checked = true;
        loadTestTwoCheckbox__input.checked = true;
    });
    
    let button__container = document.createElement('div');
    button__container.classList.add('btn-container-parent');
    
    let preTagTwo = document.createElement('pre');
    preTagOne.style.overflow = 'visible';

    let close__btn = document.createElement('button');
    close__btn.classList.add('btn');
    close__btn.classList.add('btn-secondary');
    close__btn.classList.add('custom-btn');
    close__btn.innerText = 'Close';

    close__btn.addEventListener('click', () => {
        getModalContainer.style.display = 'none';
    })

    /**
     * CAUTION: The set of loadtest defined in this file will be
     * provided by dqualizer in the future. For the purpose 
     * of testing this concept, we will prepare two loadtests that can be
     * used.
     */
    const preparedLoadTestPeakLoadOne = {
        "artifact": getNodeName(selectedID),
        "stimulus":
        {
            "Type": "Peak Load",
            "Load profile": "Medium (4x reference value)"
        },
        "environment": {
            "Context": "During office hours between 08:00 am and 16:00 pm",
            "Duration": "5 hours"
        },
        "Response Measure": {
            "Response times below": "5 milliseconds"
        }

    };

    const preparedLoadTestPeakLoadTwo = {
        "artifact": getNodeName(selectedID),
        "stimulus":
        {
            "Type": "Constant Load",
            "Load profile": "High (6x reference value)"
        },
        "environment": {
            "Context": "After office hours between 16:00 pm and 08:00 am",
            "Duration": "14 hours"
        },
        "Response Measure": {
            "Response times below": "2 milliseconds"
        }

    };
    

    let preparedLoadtestPeakString = JSON.stringify(preparedLoadTestPeakLoadOne, null, '\t');
    let preparedLoadtestConstantString = JSON.stringify(preparedLoadTestPeakLoadTwo, null, '\t');

    preTagOne.innerHTML = preparedLoadtestPeakString;
    preTagTwo.innerHTML = preparedLoadtestConstantString;

    button__container.appendChild(useBothConfirm__btn);
    button__container.appendChild(close__btn);
    
    parentContainer.appendChild(preTagOne);
    parentContainer.appendChild(loadTestOneCheckbox__label);
    parentContainer.appendChild(loadTestOneCheckbox__input);
    parentContainer.appendChild(preTagTwo);
    parentContainer.appendChild(loadTestTwoCheckbox__label);
    parentContainer.appendChild(loadTestTwoCheckbox__input);
    existingLoadTests__modal__content.appendChild(parentContainer);
    existingLoadTests__modal__content.appendChild(button__container);
    getModalContainer.appendChild(existingLoadTests__modal__content);

}