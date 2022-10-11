import { getNodeName } from "../util/util";

export const existingLoadTestsView = (selectedID) => {
    let getModalContainer = document.getElementById('existingLoadTests__modal__container');

    let existingLoadTests__modal__content = document.createElement('div');
    existingLoadTests__modal__content.classList.add('confirmation-modal-content')

    let parentContainer = document.createElement('div');
    parentContainer.classList.add('checkbox-parent');

    let preTagOne = document.createElement('pre');
    preTagOne.style.overflow = 'visible';
    
    let loadTestOneConfirm__btn = document.createElement('button');
    loadTestOneConfirm__btn.classList.add('btn');
    loadTestOneConfirm__btn.classList.add('btn-primary');
    loadTestOneConfirm__btn.classList.add('custom-btn');
    loadTestOneConfirm__btn.innerText = 'Use Loadtest 1';
    
    let loadTestTwoConfirm__btn = document.createElement('button');
    loadTestTwoConfirm__btn.classList.add('btn');
    loadTestTwoConfirm__btn.classList.add('btn-primary');
    loadTestTwoConfirm__btn.classList.add('custom-btn');
    loadTestTwoConfirm__btn.innerText = 'Use Loadtest 2';
    
    let useBothConfirm__btn = document.createElement('button');
    useBothConfirm__btn.classList.add('btn');
    useBothConfirm__btn.classList.add('btn-primary');
    useBothConfirm__btn.classList.add('custom-btn');
    useBothConfirm__btn.innerText = 'Use both';
    
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
    let preparedLoadTestPeakLoadOne = {
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

    let preparedLoadTestPeakLoadTwo = {
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
    parentContainer.appendChild(loadTestOneConfirm__btn);
    parentContainer.appendChild(preTagTwo);
    parentContainer.appendChild(loadTestTwoConfirm__btn);
    existingLoadTests__modal__content.appendChild(parentContainer);
    existingLoadTests__modal__content.appendChild(button__container);
    getModalContainer.appendChild(existingLoadTests__modal__content);

    // getModalContainer.style.display = 'block';
}