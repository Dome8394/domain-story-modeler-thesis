import { LoadTestTemplate } from '../classes/performance/LoadTestTemplate';
import { createSummaryView, createNewSummaryForTemplate } from '../summaryView';
import { getNodeName } from '../util/util';
import { setupTemplateObject } from '../classes/setupTemplateObject';
import { getNodeRectElementAndSetColor } from '../util/util';


export const saveLoadTestTemplateToLocalStorage = (selectedID) => {
    let getGenerateAndPush__btn = document.getElementById('generateAndPush__btn');

    let getSummaryView = document.getElementById('summaryViewModal');

    let getLoadTestTemplateModal = document.getElementById(`loadTestTemplateModal_${selectedID}`)

    let getStimulusElement = document.getElementById(`stimulusSelectElement_${selectedID}`);
    let getStimulus = getStimulusElement.value;

    let getAccuracyElement = document.getElementById(`accuracy_slider_${selectedID}`);
    let getAccuracy = getAccuracyElement.value;

    let getResponseTime__satisfiedBtn = document.getElementById(`responseTimes__satisfiedBtn_${selectedID}`);
    let getResponseTime__satisfied = getResponseTime__satisfiedBtn.classList.contains('active');

    let getResponseTime__toleratedBtn = document.getElementById(`responseTimes__toleratedBtn_${selectedID}`);
    let getResponseTime__tolerated = getResponseTime__toleratedBtn.classList.contains('active');

    let getResponseTime__FrustratedBtn = document.getElementById(`responseTimes__frustratedBtn_${selectedID}`);
    let getResponseTime__frustrated = getResponseTime__FrustratedBtn.classList.contains('active');

    let getResultResponseTimeElement = document.getElementById(`responseTime__input_${selectedID}`);
    let getResultResponseTime = getResultResponseTimeElement.checked;

    let getResultNinetyPercentileElement = document.getElementById(`percentileNinety__input_${selectedID}`);
    let getResultNinetyPercentile = getResultNinetyPercentileElement.checked;

    let getResultNinetyFivePercentileElement = document.getElementById(`percentileNinetyFive__input_${selectedID}`);
    let getResultNinetyFivePercentile = getResultNinetyFivePercentileElement.checked;

    if (verifyMandatory(
        selectedID,
        getStimulus,
        getAccuracy,
        getResponseTime__satisfied,
        getResponseTime__tolerated,
        getResponseTime__frustrated,

        getResultResponseTime,
        getResultNinetyPercentile,
        getResultNinetyFivePercentile)) {

        if (getGenerateAndPush__btn.disabled) {
            getGenerateAndPush__btn.disabled = false;
        }

        let artifact = getNodeName(selectedID);
        let environment = {
            "Accuracy": getAccuracy + '%'
        };
        let stimulusType = getStimulus;
        let responseMeasure;
        let responseMeasureMeasure;
        let stimulus = {
            "Load Profile": stimulusType,
        };
        
        let stimulusLoadPeakType = 'Highest Load';
        let stimulusTimeToPeakType = 'Time to Highest Load';
        let stimulusTimeToPeakMeasure;
        let stimulusLoadPeakMeasure;
        let stimulusTypeIncrease = 'Type of Increase';
        let stimulusTypeIncreaseMeasure;
        let stimulusBaseLoadType = 'Base Load';
        let stimulusBaseLoadMeasure;
        let resultMetrics;
        
        switch (stimulusType) {
            case 'Load Peak':
                let getHighestLoad__highBtn = document.getElementById(`highestLoad__high__btn_${selectedID}`);
                let getHighestLoad__high = getHighestLoad__highBtn.classList.contains('active');

                let getHighestLoad__veryHighBtn = document.getElementById(`highestLoad__veryHigh__btn${selectedID}`);
                let getHighestLoad__veryHigh = getHighestLoad__veryHighBtn.classList.contains('active');

                let getHighestLoad__extremeBtn = document.getElementById(`load__extreme__btn${selectedID}`);
                let getHighestLoad__extreme = getHighestLoad__extremeBtn.classList.contains('active');

                let getTimeToHighest__slowBtn = document.getElementById(`load__low__btn_${selectedID}`);
                let getTimeToHighest__slow = getTimeToHighest__slowBtn.classList.contains('active');

                let getTimeToHighest__fastBtn = document.getElementById(`load__medium__btn_${selectedID}`);
                let getTimeToHighest__fast = getTimeToHighest__fastBtn.classList.contains('active');

                let getTimeToHighest__veryFastBtn = document.getElementById(`load__high__btn${selectedID}`);
                let getTimeToHighest__veryFast = getTimeToHighest__veryFastBtn.classList.contains('active');

                if (getHighestLoad__high) {
                    stimulusLoadPeakMeasure = getHighestLoad__highBtn.textContent;
                } else if (getHighestLoad__veryHigh) {
                    stimulusLoadPeakMeasure = getHighestLoad__veryHighBtn.textContent;
                } else if (getHighestLoad__extreme) {
                    stimulusLoadPeakMeasure = getHighestLoad__extremeBtn.textContent;
                }

                if (getTimeToHighest__slow) {
                    stimulusTimeToPeakMeasure = getTimeToHighest__slowBtn.textContent;
                } else if (getTimeToHighest__fast) {
                    stimulusTimeToPeakMeasure = getTimeToHighest__fastBtn.textContent;
                } else if (getTimeToHighest__veryFast) {
                    stimulusTimeToPeakMeasure = getTimeToHighest__veryFastBtn.textContent;
                }

                stimulus[stimulusLoadPeakType] = stimulusLoadPeakMeasure;
                stimulus[stimulusTimeToPeakType] = stimulusTimeToPeakMeasure;

                break;
            case 'Load Increase':
                let getTypeOfIncreaseElement = document.getElementById(`loadIncrease__select_${selectedID}`);
                let getTypeOfIncrease = getTypeOfIncreaseElement.value;
                stimulusTypeIncreaseMeasure = getTypeOfIncrease;
                
                stimulus[stimulusTypeIncrease] = stimulusTypeIncreaseMeasure;
                break;
            case 'Constant Load':
                let getBaseLoad__lowBtn = document.getElementById(`baseLoad__low__btn${selectedID}`);
                let getBaseLoad__low = getBaseLoad__lowBtn.classList.contains('active');

                let getBaseLoad__mediumBtn = document.getElementById(`baseLoad__medium__btn${selectedID}`);
                let getBaseLoad__medium = getBaseLoad__mediumBtn.classList.contains('active');

                let getBaseLoad__HighBtn = document.getElementById(`baseLoad__high__btn${selectedID}`);
                let getBaseLoad__High = getBaseLoad__HighBtn.classList.contains('active');
                
                if (getBaseLoad__low) {
                    stimulusBaseLoadMeasure = getBaseLoad__lowBtn.textContent;
                } else if (getBaseLoad__medium) {
                    stimulusBaseLoadMeasure = getBaseLoad__mediumBtn.textContent;
                } else if (getBaseLoad__High) {
                    stimulusBaseLoadMeasure = getBaseLoad__HighBtn.textContent;
                }
                stimulus = {
                    'Base Load': stimulusBaseLoadMeasure
                };
                break;
        }
        
        if (getResponseTime__satisfied) {
            responseMeasureMeasure = getResponseTime__satisfiedBtn.textContent;
        } else if (getResponseTime__tolerated) {
            responseMeasureMeasure = getResponseTime__toleratedBtn.textContent;
        } else if (getResponseTime__frustrated) {
            responseMeasureMeasure = getResponseTime__FrustratedBtn.textContent;
        }
        
        
        responseMeasure = {
            "Response times": responseMeasureMeasure
        }

        if (getResultResponseTime && getResultNinetyPercentile && getResultNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "Response Times",
                    "90th Percentile",
                    "95th Percentile"
                ]
            }
        } else if (getResultResponseTime && getResultNinetyPercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "Response Times",
                    "90th Percentile"
                ]
            }
        } else if (getResultResponseTime && getResultNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "Response Times",
                    "95th Percentile"
                ]
            }
        } else if (getResultNinetyPercentile && getResultNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "90th Percentile",
                    "95th Percentile"
                ]
            }
        } else if (getResultNinetyPercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "90th Percentile",
                ]
            }
        } else if (getResultNinetyFivePercentile) {
            resultMetrics = {
                "Result Metric includes": [
                    "95th Percentile",
                ]
            }
        } else if (getResultResponseTime) {
            resultMetrics = {
                "Result Metric includes": [
                   "Response Times"
                ]
            }
        }

        /**
         * This is probably not necessary for the future...
         */
        if (artifact === '') {
            console.log('Please give the node a proper name that matches the architectural mapping!');
            return;
        }

        console.log(resultMetrics);
        const newLoadTestTemplateObj = new LoadTestTemplate(
            artifact,
            stimulus,
            environment,
            responseMeasure,
            resultMetrics
        );

        setupTemplateObject(newLoadTestTemplateObj, 'LOADTEST');

        if (!getSummaryView) {
            createSummaryView(newLoadTestTemplateObj);
        } else {
            createNewSummaryForTemplate(newLoadTestTemplateObj);
        }

        getNodeRectElementAndSetColor(selectedID, true, 'Loadtest Template');
        getLoadTestTemplateModal.style.display = 'none';

    }


}

const verifyMandatory = (
    selectedID,
    stimulus,
    accuracy,
    responseTime__satisfied__checked,
    responseTime__tolerated__checked,
    responseTime__frustrated__checked,
    resultResponseTime__provided,
    resultNinetyPercentile__provided,
    resultNinetyFivePercentile__provided) => {


    if (stimulus && (accuracy > 0) &&
        (responseTime__satisfied__checked || responseTime__tolerated__checked || responseTime__frustrated__checked)
        && (resultResponseTime__provided || resultNinetyPercentile__provided || resultNinetyFivePercentile__provided)) {

        if (stimulus === 'Load Peak') {
            let getHighestLoad__highBtn = document.getElementById(`highestLoad__high__btn_${selectedID}`);
            let getHighestLoad__high = getHighestLoad__highBtn.classList.contains('active');

            let getHighestLoad__veryHighBtn = document.getElementById(`highestLoad__veryHigh__btn${selectedID}`);
            let getHighestLoad__veryHigh = getHighestLoad__veryHighBtn.classList.contains('active');

            let getHighestLoad__extremeBtn = document.getElementById(`load__extreme__btn${selectedID}`);
            let getHighestLoad__extreme = getHighestLoad__extremeBtn.classList.contains('active');

            let getTimeToHighest__slowBtn = document.getElementById(`load__low__btn_${selectedID}`);
            let getTimeToHighest__slow = getTimeToHighest__slowBtn.classList.contains('active');

            let getTimeToHighest__fastBtn = document.getElementById(`load__medium__btn_${selectedID}`);
            let getTimeToHighest__fast = getTimeToHighest__fastBtn.classList.contains('active');

            let getTimeToHighest__veryFastBtn = document.getElementById(`load__high__btn${selectedID}`);
            let getTimeToHighest__veryFast = getTimeToHighest__veryFastBtn.classList.contains('active');

            if ((getHighestLoad__high || getHighestLoad__veryHigh || getHighestLoad__extreme)
                && (getTimeToHighest__slow || getTimeToHighest__fast || getTimeToHighest__veryFast)) {
                console.log("Everything seems fine with your load test template!");
                return true;
            } else {
                return false;
            } 
        } else if (stimulus === 'Load Increase') {
            let getTypeOfIncreaseElement = document.getElementById(`loadIncrease__select_${selectedID}`);
            let getTypeOfIncrease = getTypeOfIncreaseElement.value;

            if (getTypeOfIncrease) {
                console.log("Everything seems fine with your load test template!");
                return true;
            } else {
                return false;
            }
        } else if (stimulus === 'Constant Load') {
            let getBaseLoad__lowBtn = document.getElementById(`baseLoad__low__btn${selectedID}`);
            let getBaseLoad__low = getBaseLoad__lowBtn.classList.contains('active');

            let getBaseLoad__mediumBtn = document.getElementById(`baseLoad__medium__btn${selectedID}`);
            let getBaseLoad__medium = getBaseLoad__mediumBtn.classList.contains('active');

            let getBaseLoad__HighBtn = document.getElementById(`baseLoad__high__btn${selectedID}`);
            let getBaseLoad__High = getBaseLoad__HighBtn.classList.contains('active');

            if (getBaseLoad__low || getBaseLoad__medium || getBaseLoad__High) {
                console.log("Everything seems fine with your load test template!");
                return true;
            } else {
                return false;
            }
        }

    }

    console.log("Mandatory fields are missing!");
    return false;
}