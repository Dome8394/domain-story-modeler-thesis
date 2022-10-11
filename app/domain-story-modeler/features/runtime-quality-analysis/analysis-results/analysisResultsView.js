
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
    
    let summary__header__resilience__text = document.createElement('p');
    summary__header__resilience__text.innerText = 'Resilience Results';
    
    let summary__resilience = document.createElement('span');
    
    let summary__resilience__container = document.createElement('div');
    summary__resilience__container.id = 'summary__resilience__container';
    
    let resilience__artifact;
    
    let stimulus__resilience__type;
    let stimulus__resilience__faultObject;
    let stimulus__resilience__expectedStatus;
    let environment__resilience__environment;
    let environment__resilience__stimuliRepetition;
    let environment__resilience__context;
    let responseMeasure__resilience__recoveryTime;
    let responseMeasure__resilience__responseTime;
    
    
    
    /**
     * Loadtests related HTML elements
     */
    let summary__header__loadtests__text = document.createElement('p');
    summary__header__loadtests__text.innerText = 'Loadtests Results';

    let summary__loadtests = document.createElement('span');

    let summary__loadtests__container = document.createElement('div');
    summary__loadtests__container.id = 'summary__loadtests__container';

    let stimulus__loadtests__type;

    let stimulus__loadtests__activeUsers;

    let stimulus__loadtests__artifact;

    let stimulus__loadtests__duration;

    let stimulus__loadtests__responseMeasure;

    let stimulus__loadtests__peakload;

    let stimulus__loadtests__durationIncrease;

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
                if (key === 'artifact') {
                    stimulus__loadtests__artifact = value;
                }
                if (key === 'stimulus') {
                    for (const [innerKey, innerValue] of Object.entries(loadtest.stimulus)) {
                        console.log(`${innerKey}: ${innerValue}`);
                        if (innerKey === 'Type') {
                            console.log(innerValue);
                            stimulus__loadtests__type = innerValue;
                        }

                        if (innerKey === 'Peak Load at') {
                            stimulus__loadtests__peakload = innerValue;
                        }

                        if (innerKey === 'Duration of Increase') {
                            stimulus__loadtests__durationIncrease = innerValue;
                        }

                        if (innerKey === 'Number active users') {
                            console.log(innerValue);
                            stimulus__loadtests__activeUsers = innerValue;
                        }
                    }
                }

                if (key === 'environment') {
                    for (const [innerKey, innerValue] of Object.entries(loadtest.environment)) {
                        if (innerKey === 'Duration') {
                            stimulus__loadtests__duration = innerValue;
                        }
                    }
                }

                if (key === 'responseMeasure') {
                    for (const [innerKey, innerValue] of Object.entries(loadtest.responseMeasure)) {
                        stimulus__loadtests__responseMeasure = innerValue;
                    }
                }
            }
        }

        if (parsedResults.resiliencetest) {
            const resilienceTest = parsedResults.resilience[0];
            
            for(const [key, value] of Object.entries(resilienceTest)) {
                console.log(`${key}: ${value}`);
                if(key === 'artifact') {
                    resilience__artifact = value;
                }
                if(key === 'stimulus') {
                    for(const [innerKey, innerValue] of Object.entries(resilienceTest.stimulus)) {
                        console.log(`${innerKey}: ${innerValue}`);
                        if(innerKey === 'Type') {}
                        if(innerKey === 'Fault object') {}
                        if(innerKey === 'Expected Status Code') {}
                        if(innerKey === 'Duration') {}
                    }
                }
                if(key === 'environment') {
                    for (const [innerKey, innerValue] of Object.entries(resilienceTest.environment)) {
                        console.log(`${innerKey}: ${innerValue}`);
                        if (innerKey === 'Environment') { }
                        if (innerKey === 'Stimulus repetition') { }
                        if (innerKey === 'Context') { 
                            // TODO: There is another level included here!
                        }
                    }
                }
                if(key === 'responseMeasure') {
                    for (const [innerKey, innerValue] of Object.entries(resilienceTest.responseMeasure)) {
                        console.log(`${innerKey}: ${innerValue}`);
                        if (innerKey === 'Response Time below') { }
                        if (innerKey === 'Recovery Time below') { }
                    }
                }
            }
        }
    }

    if (stimulus__loadtests__peakload) {
        summary__loadtests.innerHTML = `We executed the <strong>${stimulus__loadtests__type}</strong> test for the artifact
            <strong>${stimulus__loadtests__artifact}</strong> with the tool JMeter. \n You specified the load to be
            <strong>${stimulus__loadtests__activeUsers}</strong> whereas the reference value is set to be <strong>approx. 5000 requests</strong> an hour.
            The load has reached its peaked at <strong>${stimulus__loadtests__peakload}</strong>.
            The test took <strong>${stimulus__loadtests__duration}</strong>.`;
    } else {
        summary__loadtests.innerHTML = `We executed the <u class="underline">${stimulus__loadtests__type}</u> test for the artifact
            <strong>${stimulus__loadtests__artifact}</strong> with the tool JMeter. \n You specified the load to be
            <strong>${stimulus__loadtests__activeUsers}</strong> whereas the reference value is set to be <strong>approx. 5000 requests</strong> an hour.
            The load increased for <strong>${stimulus__loadtests__durationIncrease}</strong> and remained at this value for
            the residiual test time. The test took <strong>${stimulus__loadtests__duration}</strong>.`;
    }

    let summar__loadtests__results = document.createElement('span');

    summar__loadtests__results.innerHTML = `The threshold of expected response times was defined to be below <strong>${stimulus__loadtests__responseMeasure}</strong>. 
   <u class="underline"> The calculated average response time of the loadtests was 2x faster than the specified threshold!
    Therefore, your system responded within the specified threshold!</u>`;


    summary__header__container.appendChild(summary__header__loadtests__text);
    summary__loadtests__container.appendChild(summary__loadtests);
    summary__loadtests__container.appendChild(breakEle);
    summary__loadtests__container.appendChild(breakEle);
    summary__loadtests__container.appendChild(breakEle);
    summary__loadtests__container.appendChild(summar__loadtests__results);
    resultsView__container.appendChild(summary__header__container);
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