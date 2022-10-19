import { createToastNotification } from "../util/notifications";

export const createAnalysisResultsView = () => {
    let getSummaryContainer = document.getElementById('runtimeAnalysisSummaryContainer');
    let getResultsModal = document.getElementById('results_modal');

    
    
    let breakEle = document.createElement('br');
    
    let results__modal__content = document.createElement('div');
    results__modal__content.id = 'results__modal__content';
    results__modal__content.classList.add('modal__container__content');

    let resultsView__container = document.createElement('div');
    resultsView__container.id = 'resultsView__container';

    let summary__header__container = document.createElement('div');
    summary__header__container.id = 'summary__header__container';
    summary__header__container.classList.add('label-container');
    
    let results__btn__container = document.createElement('div');
    results__btn__container.id = 'results__btn__container';
    
    let results__close__btn = document.createElement('button');
    results__close__btn.classList.add('btn');
    results__close__btn.classList.add('btn-secondary');
    results__close__btn.classList.add('custom-btn');
    results__close__btn.innerText = 'Close';
    
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
    
    results__btn__container.appendChild(results__btn);
    
    
    /**
     * Resilience related HTML elements
     */

    let summary__header__resilience__container = document.createElement('div');
    summary__header__resilience__container.classList.add('label-container');

    let summary__header__resilience__text = document.createElement('p');
    summary__header__resilience__text.innerText = 'Resilience Results';

    let summary__resilience = document.createElement('span');

    let summary__resilience__container = document.createElement('div');
    summary__resilience__container.id = 'summary__resilience__container';

    let resilience__artifact;

    let stimulus__resilience__type;
    let stimulus__resilience__faultObject;
    let stimulus__resilience__expectedStatus;
    let stimulus__resilience__duration;
    let environment__resilience__environment;
    let environment__resilience__stimuliRepetition;
    let environment__resilience__context;
    let responseMeasure__resilience__recoveryTime;
    let responseMeasure__recoveryTime__keyValue;
    let responseMeasure__resilience__responseTime;
    let responseMeasure__responseTime__keyValue;



    /**
     * Loadtests related HTML elements
     */
    let summary__header__loadtests__text = document.createElement('p');
    summary__header__loadtests__text.innerText = 'Loadtests Results';

    let summary__loadtests = document.createElement('span');

    let summary__loadtests__container = document.createElement('div');
    summary__loadtests__container.id = 'summary__loadtests__container';

    let loadtests__stimulus__loadProfile;
    
    let loadtests__stimulus__typeOfIncrease;
    
    let loadtests__stimulus__baseLoad;

    let loadtests__stimulus__artifact;

    let loadtests__stimulus__accuracy;

    let loadtests__stimulus__highestLoad;

    let loadtests__stimulus__responseMeasure;

    let loadtests__stimulus__timeToLoadPeak;

    let resultMetric__loadtests__responseTimes;

    let resultMetric__loadtests__ninetyPercentile;

    let resultMetric__loadtests__ninetyFivePercentile;

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
            console.log(loadtest);
            if (loadtest) {

                for (const [key, value] of Object.entries(loadtest)) {
                    if (key === 'artifact') {
                        loadtests__stimulus__artifact = value;
                    }
                    if (key === 'stimulus') {
                        for (const [innerKey, innerValue] of Object.entries(loadtest.stimulus)) {
                            if (innerKey === 'Highest Load') {
                                loadtests__stimulus__highestLoad = innerValue;
                            }

                            if (innerKey === 'Load Profile') {
                                loadtests__stimulus__loadProfile = innerValue;
                            }

                            if (innerKey === 'Time to Highest Load') {
                                loadtests__stimulus__timeToLoadPeak = innerValue;
                            }
                            
                            if(innerKey === 'Type of Increase') {
                                loadtests__stimulus__typeOfIncrease = innerValue;
                            }
                            
                            if(innerKey === 'Base Load') {
                                loadtests__stimulus__baseLoad = innerValue;
                            }
                        }
                    }

                    if (key === 'environment') {
                        for (const [innerKey, innerValue] of Object.entries(loadtest.environment)) {
                            if (innerKey === 'Accuracy') {
                                loadtests__stimulus__accuracy = innerValue;
                            }
                        }
                    }

                    if (key === 'responseMeasure') {
                        for (const [innerKey, innerValue] of Object.entries(loadtest.responseMeasure)) {
                            loadtests__stimulus__responseMeasure = innerValue;
                        }
                    }

                    if (key === 'resultMetrics') {
                        console.log("Metrics", loadtest.resultMetrics[0]);
                        for (const [innerKey, innerValue] of Object.entries(loadtest.resultMetrics)) {
                            for(const [metricKey, metricValue] of Object.entries(innerValue)) {
                                console.log(`${metricKey}: ${metricValue}`);
                                if (metricValue === "Response Times") {
                                    resultMetric__loadtests__responseTimes = metricValue;
                                }
    
                                if (metricValue === "90th Percentile") {
                                    resultMetric__loadtests__ninetyPercentile = metricValue;
                                }
    
                                if (metricKey === "95th Percentile") {
                                    resultMetric__loadtests__ninetyFivePercentile = metricValue;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (parsedResults.resiliencetest) {
            const resilienceTest = parsedResults.resiliencetest[0];
            if (resilienceTest) {
                for (const [key, value] of Object.entries(resilienceTest)) {
                    console.log(`${key}: ${value}`);
                    if (key === 'artifact') {
                        resilience__artifact = value;
                    }
                    if (key === 'stimulus') {
                        for (const [innerKey, innerValue] of Object.entries(resilienceTest.stimulus)) {
                            console.log(`${innerKey}: ${innerValue}`);
                            if (innerKey === 'Type') {
                                stimulus__resilience__type = innerValue;
                            }
                            if (innerKey === 'Fault object') {
                                stimulus__resilience__faultObject = innerValue;
                            }
                            if (innerKey === 'Expected Status Code') {
                                stimulus__resilience__expectedStatus = innerValue;
                            }
                            if (innerKey === 'Duration') {
                                stimulus__resilience__duration = innerValue;
                            }
                        }
                    }
                    if (key === 'environment') {
                        for (const [innerKey, innerValue] of Object.entries(resilienceTest.environment)) {
                            if (innerKey === 'Environment') {
                                environment__resilience__environment = innerValue;
                            }
                            if (innerKey === 'Stimulus repetition') {
                                environment__resilience__stimuliRepetition = innerValue;
                            }
                            if (innerKey === 'Context') {
                                console.log(JSON.stringify(innerValue));
                            }
                        }
                    }
                    if (key === 'responseMeasure') {
                        for (const [innerKey, innerValue] of Object.entries(resilienceTest.responseMeasure)) {
                            if (innerKey === 'Response Time below') {
                                responseMeasure__resilience__recoveryTime = innerValue;
                                responseMeasure__recoveryTime__keyValue = innerKey;
                            }
                            if (innerKey === 'Recovery Time below') {
                                responseMeasure__resilience__responseTime = innerValue;
                                responseMeasure__responseTime__keyValue = innerKey;
                            }
                        }
                    }
                }
            }
        }
    }

    if (loadtests__stimulus__loadProfile === 'Load Peak') {
        summary__loadtests.innerHTML = `We executed the <strong>${loadtests__stimulus__loadProfile}</strong> test for the artifact
            <strong>${loadtests__stimulus__artifact}</strong> with the tool JMeter. \n The load peak was set to
            <strong>${loadtests__stimulus__highestLoad}</strong>. The time until the peak is reached was set to 
            <strong>${loadtests__stimulus__timeToLoadPeak}</strong>. You stated that the request's response times should be 
            ${loadtests__stimulus__responseMeasure} during the loadtest in order to be succesful.
            The test results should have an Accuracy of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`;
            
    } else if (loadtests__stimulus__loadProfile === 'Load Increase') {
        summary__loadtests.innerHTML = `We executed the <u class="underline">${loadtests__stimulus__loadProfile}</u> test for the artifact
            <strong>${loadtests__stimulus__artifact}</strong> with the tool JMeter. \n You specified the type of increase to be
            <strong>${loadtests__stimulus__typeOfIncrease}</strong>. You stated that the request's response times should be 
            ${loadtests__stimulus__responseMeasure} during the loadtest in order to be succesful.
            The test results should have an Accuracy of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`;
    } else {
        summary__loadtests.innerHTML = `We executed the <strong>${loadtests__stimulus__loadProfile}</strong> test for the artifact
            <strong>${loadtests__stimulus__artifact}</strong> with the tool JMeter. \n You specified the base load to be
            <strong>${loadtests__stimulus__baseLoad}</strong>.
            You stated that the request's response times should be ${loadtests__stimulus__responseMeasure} during the loadtest in order to be succesful.
            The test results should have an Accuracy of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`
    }

    if (loadtests__stimulus__loadProfile) {
        summary__header__container.appendChild(summary__header__loadtests__text);
        summary__loadtests__container.appendChild(summary__loadtests);
        summary__loadtests__container.appendChild(breakEle);
        summary__loadtests__container.appendChild(breakEle);

        let summary__loadtests__results = document.createElement('span');
        summary__loadtests__results.id = `summary__loadtests__results`;
        
        console.log(resultMetric__loadtests__responseTimes);

        if (resultMetric__loadtests__responseTimes && resultMetric__loadtests__ninetyPercentile) {
            summary__loadtests__results.innerHTML = `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Requests that fall within the 90th Percentile had a satisfiable response time!
            Therefore, your system's specifications are satisfied!</u>`;
        } else if (resultMetric__loadtests__responseTimes && resultMetric__loadtests__ninetyFivePercentile) {
            summary__loadtests__results.innerHTML = `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Requests that fall within the 95th Percentile had a satisfiable response time!
            Therefore, your system's specifications are satisfied!</u>`;
        } else if (resultMetric__loadtests__responseTimes) {   
            console.log("This should be printed");  
            summary__loadtests__results.innerHTML = 
            `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Therefore, your system's specifications are satisfied!</u>`;
        
        } else if (resultMetric__loadtests__ninetyPercentile) {
            summary__loadtests__results.innerHTML =
            `<u class="underline"> Requests that fall within the 90th Percentile had a satisfiable response time!
            Therefore, your system's specifications are still fulfilled!</u>`;
        } else if (resultMetric__loadtests__ninetyFivePercentile) {
            summary__loadtests__results.innerHTML =
            `<u class="underline"> Requests that fall within the 95th Percentile had a satisfiable response time!
            Therefore, your system's specifications are still fulfilled!</u>`;
        } 

        summary__loadtests__container.appendChild(summary__loadtests__results);
        console.log(summary__loadtests__container);
        resultsView__container.appendChild(summary__header__container);
        resultsView__container.appendChild(summary__loadtests__container);
    }

    if (stimulus__resilience__type) {
        let summary__resilience__results = document.createElement('span');

        summary__resilience.innerHTML = `We executed the <strong>${stimulus__resilience__type}</strong> resilience test 
        with Chaos Toolkit in the environment <strong>${environment__resilience__environment}</strong> for <strong>${stimulus__resilience__duration}</strong>.
        The stimulus was repeated <strong>${environment__resilience__stimuliRepetition}</strong>. 
        As a response measure you specified the ${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue)} : ${(responseMeasure__resilience__recoveryTime || responseMeasure__resilience__responseTime)}.
        `;

        summary__resilience__results.innerHTML = `Your experiment was <u class="underline">not successfull</u>!`;

        summary__header__resilience__container.appendChild(summary__header__resilience__text);
        summary__resilience__container.appendChild(summary__resilience);
        summary__resilience__container.appendChild(breakEle);
        summary__resilience__container.appendChild(summary__resilience__results);
        resultsView__container.appendChild(summary__header__resilience__container);
        resultsView__container.appendChild(summary__resilience__container);
    }
    
    if (getSummaryContainer.children.length <= 2) {
        results__modal__content.appendChild(resultsView__container);
        results__modal__content.appendChild(results__close__btn);
        getResultsModal.appendChild(results__modal__content);
        getSummaryContainer.appendChild(results__btn__container);
    } else {
        results__modal__content.appendChild(resultsView__container);
        results__modal__content.appendChild(results__close__btn);
    }

    createToastNotification("Your test results arrived!", "success");
    

};

/**
 * Pulls the analysis results from the message queue
 */
const pullResultsFromQueue = () => {
    // TODO
}