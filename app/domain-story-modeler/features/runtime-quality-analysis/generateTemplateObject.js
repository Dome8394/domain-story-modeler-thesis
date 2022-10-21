import { createAnalysisResultsView } from './analysis-results/analysisResultsView';
import { createToastNotification } from './util/notifications';

export const createDisabledGenerateBtn = () => {
    let generateButtonContainer = document.createElement('div');
    let getSummaryContainer = document.getElementById('runtimeAnalysisSummaryContainer');
    generateButtonContainer.id = 'generateButtonContainer';
    
    let generateAndPush__btn = document.createElement('button');
    generateAndPush__btn.innerText = 'Execute';
    generateAndPush__btn.classList.add('btn');
    generateAndPush__btn.classList.add('btn-primary');
    generateAndPush__btn.classList.add('custom-button');
    generateAndPush__btn.disabled = true;
    generateAndPush__btn.id = 'generateAndPush__btn';

    generateAndPush__btn.addEventListener('click', () => {
        console.log("Create object from template and push to queue...");
        createToastNotification("Congrats! Your test is about to be executed. Wait for your results to arrive!", "success");
        setTimeout(() => {
            createAnalysisResultsView();
        }, 5000)
    });
    
    generateButtonContainer.appendChild(generateAndPush__btn)
    getSummaryContainer.appendChild(generateButtonContainer);
}

export const pushToQueue = () => {
    setTimeout(() => {
        console.log("Pushing to queue...");
        
    }, 5000);
}