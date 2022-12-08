import { createToastNotification } from '../util/notifications';

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
  let resilience__responseMeasure__errorRate;
  let resilience__environment__noContext;
  let resilience__environment__afterHours;
  let resilience__environment__duringHours;
  let resilience__stimulus__accuracy;

  let environment__resilience__environment;
  let environment__resilience__stimuliRepetition;
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

  let resilience__environment__existingTest;

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

              if (innerKey === 'Type of Increase') {
                loadtests__stimulus__typeOfIncrease = innerValue;
              }

              if (innerKey === 'Base Load') {
                loadtests__stimulus__baseLoad = innerValue;
              }
            }
          }

          if (key === 'environment') {
            for (const [innerKey, innerValue] of Object.entries(loadtest.environment)) {
              if (innerKey === 'Confidence') {
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
            for (const [innerKey, innerValue] of Object.entries(loadtest.resultMetrics)) {
              for (const [metricKey, metricValue] of Object.entries(innerValue)) {
                if (metricValue === 'Response Times') {
                  resultMetric__loadtests__responseTimes = metricValue;
                }

                if (metricValue === '90th Percentile') {
                  resultMetric__loadtests__ninetyPercentile = metricValue;
                }

                if (metricKey === '95th Percentile') {
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
          if (key === 'artifact') {
            resilience__artifact = value;
          }
          if (key === 'stimulus') {
            for (const [innerKey, innerValue] of Object.entries(resilienceTest.stimulus)) {
              if (innerKey === 'Type') {
                stimulus__resilience__type = innerValue;
              }
              if (innerKey === 'Confidence') {
                resilience__stimulus__accuracy = innerValue;
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
                for (const [contextKey, contextValue] of Object.entries(innerValue)) {
                  if (contextKey === 'NO_CONTEXT_INFORMATION') {
                    resilience__environment__noContext = contextValue;
                  }

                  if (contextKey === 'Execution after office hours') {
                    resilience__environment__afterHours = contextValue;
                  }

                  if (contextKey === 'Execution during office hours') {
                    resilience__environment__duringHours = contextValue;
                  }

                  if (contextKey === 'Load Test') {
                    resilience__environment__existingTest = true;
                  }
                }

              }
            }
          }
          if (key === 'responseMeasure') {
            for (const [innerKey, innerValue] of Object.entries(resilienceTest.responseMeasure)) {
              if (innerKey === 'Recovery time') {
                responseMeasure__resilience__recoveryTime = innerValue;
                responseMeasure__recoveryTime__keyValue = innerKey;
              }
              if (innerKey === 'Response time') {
                responseMeasure__resilience__responseTime = innerValue;
                responseMeasure__responseTime__keyValue = innerKey;
              }
              if (innerKey === 'Error rate') {
                resilience__responseMeasure__errorRate = innerValue;
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
            <strong>${loadtests__stimulus__responseMeasure}</strong> during the loadtest in order to be succesful.
            The test results should have an Confidence of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`;

  } else if (loadtests__stimulus__loadProfile === 'Load Increase') {
    summary__loadtests.innerHTML = `We executed the <u class="underline">${loadtests__stimulus__loadProfile}</u> test for the artifact
            <strong>${loadtests__stimulus__artifact}</strong> with the tool JMeter. \n You specified the type of increase to be
            <strong>${loadtests__stimulus__typeOfIncrease}</strong>. You stated that the request's response times should be 
            <strong>${loadtests__stimulus__responseMeasure}</strong> during the loadtest in order to be succesful.
            The test results should have an Confidence of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`;
  } else {
    summary__loadtests.innerHTML = `We executed the <strong>${loadtests__stimulus__loadProfile}</strong> test for the artifact
            <strong>${loadtests__stimulus__artifact}</strong> with the tool JMeter. \n You specified the base load to be
            <strong>${loadtests__stimulus__baseLoad}</strong>.
            You stated that the request's response times should be <strong>${loadtests__stimulus__responseMeasure}</strong> during the loadtest in order to be succesful.
            The test results should have an Confidence of <strong>${loadtests__stimulus__accuracy}</strong>.
            </br>
            </br>`;
  }

  if (loadtests__stimulus__loadProfile) {
    summary__header__container.appendChild(summary__header__loadtests__text);
    summary__loadtests__container.appendChild(summary__loadtests);
    summary__loadtests__container.appendChild(breakEle);
    summary__loadtests__container.appendChild(breakEle);

    let summary__loadtests__results = document.createElement('span');
    summary__loadtests__results.id = 'summary__loadtests__results';

    if (resultMetric__loadtests__responseTimes && resultMetric__loadtests__ninetyPercentile) {
      summary__loadtests__results.innerHTML = `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Requests that fall within the 90th Percentile had a satisfiable response time!
            Therefore, your system's specifications are satisfied!</u>`;
    } else if (resultMetric__loadtests__responseTimes && resultMetric__loadtests__ninetyFivePercentile) {
      summary__loadtests__results.innerHTML = `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Requests that fall within the 95th Percentile had a satisfiable response time!
            Therefore, your system's specifications are <strong>satisfied!</strong></u>`;
    } else if (resultMetric__loadtests__responseTimes) {
      console.log('This should be printed');
      summary__loadtests__results.innerHTML =
                `<u class="underline"> The calculated average response time of the load test was 2x faster than the specified threshold!
            Therefore, your system's specifications are <strong>satisfied!</strong></u>`;

    } else if (resultMetric__loadtests__ninetyPercentile) {
      summary__loadtests__results.innerHTML =
                `<u class="underline"> Requests that fall within the 90th Percentile had a satisfiable response time!
            Therefore, your system's specifications are still <strong>satisfied!</strong></u>`;
    } else if (resultMetric__loadtests__ninetyFivePercentile) {
      summary__loadtests__results.innerHTML =
                `<u class="underline"> Requests that fall within the 95th Percentile had a satisfiable response time!
            Therefore, your system's specifications are still <strong>satisfied!</strong></u>`;
    }

    summary__loadtests__container.appendChild(summary__loadtests__results);
    resultsView__container.appendChild(summary__header__container);
    resultsView__container.appendChild(summary__loadtests__container);

    localStorage.removeItem('runtimeQualityAnalysis');
  }

  if (stimulus__resilience__type) {
    let summary__resilience__results = document.createElement('span');


    if (resilience__environment__noContext) {

      summary__resilience.innerHTML = `We executed the resilience test with the stimulus <strong>${stimulus__resilience__type}</strong> 
            using Chaos Toolkit, in the environment <strong>${environment__resilience__environment}</strong>.
            You did not specify any further contextual information.
            The stimulus was repeated <strong>${environment__resilience__stimuliRepetition}</strong>.
            The test results should have an Confidence of <strong>${resilience__stimulus__accuracy}</strong>.
            As a hypothesis you stated the ${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue || 'Error rate')} 
            to be ${(responseMeasure__resilience__recoveryTime || responseMeasure__resilience__responseTime || resilience__responseMeasure__errorRate)}.
            </br>
            </br>`;

    } else if (resilience__environment__afterHours && resilience__environment__duringHours) {
      summary__resilience.innerHTML = `We executed the resilience test with the stimulus <strong>${stimulus__resilience__type}</strong> 
            using Chaos Toolkit, in the environment <strong>${environment__resilience__environment}</strong>.
            You stated that the test should be executed <strong>during and after office hours, i.e., from 08:00 am to 08:00 am the next day</strong>.
            You also added <strong>existing load tests to simulate real user behavior </strong>.
            The stimulus was repeated <strong>${environment__resilience__stimuliRepetition}</strong>. 
            The test results should have an Confidence of <strong>${resilience__stimulus__accuracy}</strong>.
            As a hypothesis you stated the ${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue || 'Error rate')} 
            to be ${(responseMeasure__resilience__recoveryTime || responseMeasure__resilience__responseTime || resilience__responseMeasure__errorRate)}.
            </br>
            </br>`;
    } else if (resilience__environment__afterHours) {
      summary__resilience.innerHTML = `We executed the resilience test with the stimulus <strong>${stimulus__resilience__type}</strong> 
            using Chaos Toolkit, in the environment <strong>${environment__resilience__environment}</strong>.
            You stated that the test should be executed <strong>during and after office hours, i.e., after 16:00 pm</strong>.
            You also added <strong>existing load tests to simulate real user behavior </strong>.
            The stimulus was repeated <strong>${environment__resilience__stimuliRepetition}</strong>. 
            The test results should have an Confidence of <strong>${resilience__stimulus__accuracy}</strong>.
            As a hypothesis you stated the ${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue || 'Error rate')} 
            to be ${(responseMeasure__resilience__recoveryTime || responseMeasure__resilience__responseTime || resilience__responseMeasure__errorRate)}.
            </br>
            </br>`;
    } else if (resilience__environment__duringHours) {
      summary__resilience.innerHTML = `We executed the resilience test with the stimulus <strong>${stimulus__resilience__type}</strong> 
            using Chaos Toolkit, in the environment <strong>${environment__resilience__environment}</strong>.
            You stated that the test should be executed <strong>during regular office hours, i.e., between 08:00 am and 16:00 pm</strong>.
            You also added <strong>existing load tests to simulate real user behavior </strong>.
            The stimulus was repeated <strong>${environment__resilience__stimuliRepetition}</strong>. 
            The test results should have an Confidence of <strong>${resilience__stimulus__accuracy}</strong>.
            As a hypothesis you stated the <strong>${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue || 'Error rate')}</strong>
            to be <strong>${(responseMeasure__resilience__recoveryTime || responseMeasure__resilience__responseTime || resilience__responseMeasure__errorRate)}</strong>.
            </br>
            </br>`;
    }

    if (resilience__responseMeasure__errorRate === 'Low' && resilience__environment__noContext) {
      summary__resilience__results.innerHTML = `Oh no. It looks like your actual error rate is above the threshold you specified! :-(
                    You specified the error rate to be ${resilience__responseMeasure__errorRate} which means that 5% of requests are allowed to fail
                    at most. However, the actual error rate was slightly higher at 6.25%.`;
    } else if (resilience__responseMeasure__errorRate != 'Low' && resilience__environment__noContext) {
      summary__resilience__results.innerHTML = `Congrats! The artifact's (${resilience__artifact}) error rate is below
                    the threshold you specified! The actual error rate was 4.2%! :-)`;
    } else {
      summary__resilience__results.innerHTML = `Sadly, your experiment was <u class="underline">not successfull</u>! 
            The hypothesis did not hold because the ${(responseMeasure__recoveryTime__keyValue || responseMeasure__responseTime__keyValue || 'Error rate')}
            was higher than the measure you specified. :-(`;
    }


    summary__header__resilience__container.appendChild(summary__header__resilience__text);
    summary__resilience__container.appendChild(summary__resilience);
    summary__resilience__container.appendChild(breakEle);
    summary__resilience__container.appendChild(summary__resilience__results);
    resultsView__container.appendChild(summary__header__resilience__container);
    resultsView__container.appendChild(summary__resilience__container);

    localStorage.removeItem('runtimeQualityAnalysis');
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

  createToastNotification('Your test results arrived!', 'success');


};