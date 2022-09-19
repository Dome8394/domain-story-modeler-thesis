import { getNodeName } from '../resilience/ResilienceScenarioTemplate';

const createLoadTestTemplateView = (selectedID) => {
    // TODO!
    console.log("Create new load test...");
}

/**
 * Creates the load test template view based on the selected node.
 */
export const createLoadTestTemplate = (selectedID) => {
    
    // let nodeName = getNodeName(selectedID);

    let loadTestTemplateModal = document.getElementById(`modal_loadtest_${selectedID}`);

    if (loadTestTemplateModal) {
        console.log("Modal exists with id: ", loadTestTemplateModal.id);
        loadTestTemplateModal.style.display = 'block';
    } else {
        console.log("Create new modal...");
        createLoadTestTemplateView(selectedID);
    }
}