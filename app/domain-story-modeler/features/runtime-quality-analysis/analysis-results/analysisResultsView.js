
export const createAnalysisResultsView = () => {
    let getResultsBtnContainer = document.getElementById('analysisResults');
    let getModalContainer = document.getElementById('modal__results__container');
    
    let results__btn = document.createElement('button');
    results__btn.classList.add('btn');
    results__btn.classList.add('btn-primary');
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
    results__modal.classList.add('modal__container');
    
    let results__modal__content = document.createElement('div');
    results__modal__content.classList.add('modal__container__content');
    
    let resultsView__container = document.createElement('div');

    let summary__loadtests__container = document.createElement('div');

    let summary__header = document.createElement('p');
    let stimulus__loadtests__type;
    let stimulus__loadtests__activeUsers;
    let stimulus__loadtests__artifact;

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
                    stimulus__loadtests__artifact = value;
                }
                if (key === 'stimulus') {
                    for (const [innerKey, innerValue] of Object.entries(loadtest.stimulus)) {
                        if (innerKey === 'Type') {
                            stimulus__loadtests__type = innerValue;
                        }
                        if (innerKey === 'Number active users') {
                            stimulus__loadtests__activeUsers = innerValue;
                        }
                    }
                }
            }
        }

        if (parsedResults.resiliencetest) { }
    }
    
    summary__header.innerText = 'We executed the ' + stimulus__loadtests__type + 'test for the artifact' + 
        stimulus__loadtests__artifact + ' with the tool JMeter. You specified the load to be ' 
        + stimulus__loadtests__activeUsers + '.';

    summary__loadtests__container.appendChild(summary__header);
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