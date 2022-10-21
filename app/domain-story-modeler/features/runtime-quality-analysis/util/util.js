import { createToastNotification } from './notifications';

/**
 * Retrieves the name of the currently selected node on which a test will be
 * modeled.
 * 
 * @param {} selectedID 
 */
export const getNodeName = (selectedID) => {
    let nodeName = $(`[data-element-id=${selectedID}]`).get(0);
    return nodeName.children[0].textContent;
}

export const getNodeRectElementAndSetColor = (selectedID, specified, type) => {
    let getNode = $(`[data-element-id=${selectedID}`).get(0);
    let rectElement = getNode.children[1];
    
    let unspecifiedColorHighlight = 'rgb(210 24 24)';
    
    if (specified) {
        rectElement.style.strokeOpacity = 1;
        rectElement.style.strokeWidth = '1px';
        rectElement.style.stroke = 'rgb(49 156 35)';
    } else {
        createToastNotification("You did not provide all information in the template!", type)
        if (!(rectElement.style.stroke == unspecifiedColorHighlight)) {
            rectElement.style.strokeOpacity = 1;
            rectElement.style.strokeWidth = '1px';
            rectElement.style.stroke = 'rgb(210 24 24)';
        }
    }
}



// const confirmGenerationOfResilienceTemplate = (getConfirmation) => {
//     let topLevelModal = document.getElementById('modal_resilience_content');

//     let confirmationModal = document.createElement('div');

//     confirmationModal.id = 'confirmationModal';
//     confirmationModal.classList.add('confirmation-modal');

//     let confirmationModalContent = document.createElement('div');

//     confirmationModalContent.id = 'confirmationModalContent';
//     confirmationModalContent.classList.add('confirmation-modal-content');

//     let confirmationModalContentButtonContainer = document.createElement('div');
//     confirmationModalContentButtonContainer.id = 'confirmationModalContentButtonContainer';
//     confirmationModalContentButtonContainer.classList.add('btn-container-parent');

//     let confirmation__btn = document.createElement('div');
//     let abort__btn = document.createElement('div');

//     let information_text = document.createElement('p');
//     information_text.innerText = VERIFICATION_MODAL_NOTIFICATION;
//     information_text.classList.add('info-text');

//     confirmation__btn.id = 'verification_btn';
//     abort__btn.id = 'abort_btn';

//     confirmation__btn.classList.add('btn');
//     confirmation__btn.classList.add('btn-primary');

//     abort__btn.classList.add('btn');
//     abort__btn.classList.add('btn-secondary');

//     confirmation__btn.innerText = 'Bestätigen';
//     abort__btn.innerText = 'Abbrechen';

//     confirmation__btn.addEventListener('click', () => {
//         console.log('Waiting for approvement...');
//         getConfirmation();
//     });

//     abort__btn.addEventListener('click', () => {
//         console.log('User does not approve to generation!');
//         confirmationModal.style.display = 'none';
//     })

//     confirmationModalContent.appendChild(information_text);
//     confirmationModalContent.appendChild(confirmationModalContentButtonContainer);
//     confirmationModalContentButtonContainer.appendChild(confirmation__btn);
//     confirmationModalContentButtonContainer.appendChild(abort__btn);
//     confirmationModal.appendChild(confirmationModalContent);

//     topLevelModal.appendChild(confirmationModal);
//     confirmationModal.style.display = 'block';

// }
