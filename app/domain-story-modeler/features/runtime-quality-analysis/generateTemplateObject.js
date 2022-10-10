import { createAnalysisResultsView } from './analysis-results/analysisResultsView';
let elementContainer = document.getElementById('runtimeAnalysisSummaryContainer');

export const createDisabledGenerateBtn = () => {
    let generateButtonContainer = document.createElement('div');
    generateButtonContainer.id = 'generateButtonContainer';
    
    let generateAndPush__btn = document.createElement('button');
    generateAndPush__btn.innerText = 'Generate & Push';
    generateAndPush__btn.classList.add('btn');
    generateAndPush__btn.classList.add('btn-primary');
    generateAndPush__btn.disabled = true;
    generateAndPush__btn.id = 'generateAndPush__btn';

    generateAndPush__btn.addEventListener('click', () => {
        console.log("Create object from template and push to queue...");
        // generateResilienceScenarioTemplate();
        createAnalysisResultsView();
    });
    
    generateButtonContainer.appendChild(generateAndPush__btn)
    elementContainer.appendChild(generateButtonContainer);
}

export const pushToQueue = () => {
    setTimeout(() => {
        console.log("Pushing to queue...");
        
    }, 5000);
}