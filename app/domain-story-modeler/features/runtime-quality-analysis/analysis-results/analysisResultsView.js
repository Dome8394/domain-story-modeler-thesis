
export const createAnalysisResultsView = () => {
    let getSummaryContainer = document.getElementById('runtimeAnalysisSummaryContainer');
    let getResultsModal = document.getElementById('results_modal');
    
    let results__close__btn = document.createElement('button');
    results__close__btn.classList.add('btn');
    results__close__btn.classList.add('btn-secondary');
    results__close__btn.classList.add('custom-btn');
    results__close__btn.innerText = 'Close';
    
    let results__btn__container = document.createElement('div');
    
    let breakEle = document.createElement('br');
    
    let results__btn = document.createElement('button');
    results__btn.id = 'results__btn';
    results__btn.classList.add('btn');
    results__btn.classList.add('btn-success');
    results__btn.classList.add('custom-button');
    results__btn.innerText = 'Show results';

    results__btn.addEventListener('click', () => {
        getResultsModal.style.display = 'block';
        console.log(getResultsModal);
        console.log(document.getElementById('results__modal__content'));
    });
    
    results__close__btn.addEventListener('click', () => {
        getResultsModal.style.display = 'none';
    });
    
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
    
    let stimulus__loadtests__responseMeasure = document.createElement('span');
    stimulus__loadtests__responseMeasure.classList.add('underline');
    
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
                
                if(key === 'responseMeasure') {
                    for(const [innerKey, innerValue] of Object.entries(loadtest.responseMeasure)) {
                        stimulus__loadtests__responseMeasure.innerText = innerValue;
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
    
    let summar__loadtests__results = document.createElement('span');
    summar__loadtests__results.innerText = 'The threshold of expected response times was defined to be below ' + stimulus__loadtests__responseMeasure
    + '.' + ' The calculated average response time of the loadtests was 2x faster than the specified threshold! Therefore, your system responded within the specified threshold!';


    summary__header__container.appendChild(summary__header__loadtests__text);
    summary__loadtests__container.appendChild(summary__loadtests);
    summary__loadtests__container.appendChild(breakEle);
    summary__loadtests__container.appendChild(breakEle);
    resultsView__container.appendChild(summary__loadtests__container);
    
    results__modal__content.appendChild(resultsView__container);
    results__modal__content.appendChild(results__close__btn);
    results__btn__container.appendChild(results__btn);
    getResultsModal.appendChild(results__modal__content);
    getSummaryContainer.appendChild(results__btn__container);
};

/**
 * Pulls the analysis results from the message queue
 */
const pullResultsFromQueue = () => {
    // TODO
}