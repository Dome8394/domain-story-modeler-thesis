
export const createAnalysisResultsView = () => {
    let getResultsBtnContainer = document.getElementById('analysisResults');
    let getModalContainer = document.getElementById('modal__results__container');
    
    let results__btn = document.createElement('button');
    results__btn.classList.add('btn');
    results__btn.classList.add('btn-success');
    results__btn.classList.add('custom-btn');
    results__btn.innerText = 'Show results';
    
    let results__close__btn = document.createElement('button');
    results__close__btn.classList.add('btn');
    results__close__btn.classList.add('btn-secondary');
    results__close__btn.classList.add('custom-btn');
    results__close__btn.innerText = 'Close';
    
    results__close__btn.addEventListener('click', () => {
        results__modal.style.display = 'none';
    });
    
    results__btn.addEventListener('click', () => {
        results__modal.style.display = 'block';
    });
    
    let results__modal = document.createElement('div');
    results__modal.id = 'results_modal';
    results__modal.classList.add('modal__container');
    
    let results__modal__content = document.createElement('div');
    results__modal__content.id = 'results__modal__content';
    results__modal__content.classList.add('modal__container__content');
    
    let resultsView__container = document.createElement('div');
    resultsView__container.id = 'resultsView__container';
    
    let summary__header__container = document.createElement('div');
    summary__header__container.id = 'summary__header__container';
    summary__header__container.classList.add('label-container');
    
    /**
     * Resilience related HTML elements
     */
    // TODO
    
    /**
     * Loadtests related HTML elements
     */
    let summary__header__loadtests__text = document.createElement('p');
    summary__header__loadtests__text.innerText = 'Loadtests Results';
    
    let summary__loadtests = document.createElement('span');
    
    let summary__loadtests__container = document.createElement('div');
    summary__loadtests__container.id = 'summary__loadtests__container';

    let stimulus__loadtests__type = document.createElement('span');
    stimulus__loadtests__type.classList.add('underline');
    
    let stimulus__loadtests__activeUsers = document.createElement('span');
    stimulus__loadtests__activeUsers.classList.add('underline');
    
    let stimulus__loadtests__artifact = document.createElement('span');
    stimulus__loadtests__artifact.classList.add('underline');
    
    let stimulus__loadtests__duration = document.createElement('span');
    stimulus__loadtests__duration.classList.add('underline');

    /**
     * CAUTION: This block of code is only necessary for the prototype. 
     * The reason behind this is, that we currently am not able to process
     * the tests and provide real results. Therefore, mock results are prepared
     * as answers to the specified tests
     */
    const results = localStorage.getItem('runtimeQualityAnalysis');
    const parsedResults = JSON.parse(results);

    if (parsedResults) {

        /**
         * Check loadtest results
         */
        if (parsedResults.loadtest) {
            const loadtest = parsedResults.loadtest[0];

            for (const [key, value] of Object.entries(loadtest)) {
                console.log(`${key}: ${value}`);
                if(key === 'artifact') {
                    stimulus__loadtests__artifact.innerText = value;
                }
                if (key === 'stimulus') {
                    for (const [innerKey, innerValue] of Object.entries(loadtest.stimulus)) {
                        if (innerKey === 'Type') {
                            stimulus__loadtests__type.innerText = innerValue;
                        }
                        if (innerKey === 'Number active users') {
                            stimulus__loadtests__activeUsers.innerText = innerValue;
                        }
                    }
                }
                
                if(key === 'environment') {
                    for(const [innerKey, innerValue] of Object.entries(loadtest.environment)) {
                        if(innerKey === 'Duration') {
                            stimulus__loadtests__duration.innerText = innerValue;
                        }
                    }
                }
            }
        }

        if (parsedResults.resiliencetest) { 
            //TODO 
        }
    }
    
    summary__loadtests.innerText = 'We executed the ' + stimulus__loadtests__type.textContent + ' test for the artifact ' + 
        stimulus__loadtests__artifact.textContent + ' with the tool JMeter. You specified the load to be ' 
        + stimulus__loadtests__activeUsers.textContent + ' whereas the reference value is set to be approx. 5000 requests an hour.'
        + ' The test took ' + stimulus__loadtests__duration.textContent + '.' 
        +  '';

    summary__header__container.appendChild(summary__header__loadtests__text);
    summary__loadtests__container.appendChild(summary__loadtests);
    resultsView__container.appendChild(summary__loadtests__container);
    
    results__modal__content.appendChild(resultsView__container);
    results__modal__content.appendChild(results__close__btn);
    results__modal.appendChild(results__modal__content);
    getModalContainer.appendChild(results__modal);
    getResultsBtnContainer.appendChild(results__btn);
};

/**
 * Pulls the analysis results from the message queue
 */
const pullResultsFromQueue = () => {
    // TODO
}