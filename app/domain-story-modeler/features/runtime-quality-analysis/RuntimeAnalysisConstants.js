export const EXPERIMENT_NAME = 'ChaosExperiment';
export const LOADTEST_NAME = 'Loadtest';
export const MONITORING_NAME = 'Monitoring';
export const SERVICE_DELAY_NAME = 'ServiceDelay';

export const SERVICE_FAILURE_NAME_INFO = 'Bitte geben Sie einen gültigen Service an!';
export const RESILIENCE_SCENARIO_NAME_INFO = 'Bitte geben Sie einen gültigen Namen an!';
export const RESILIENCE_SCENARIO_EXECUTION_ENVIRONMENT_INFO = 'Bitte geben Sie eine gültige Umgebung für das Szenario an!';
export const SERVICE_FAILURE_AMOUNT_INFO = 'Bitte geben Sie eine gültige Anzahl an!';
export const SERVICE_TIME_TO_FAILURE_INFO = 'Bitte geben Sie einen gültigen Zeitpunkt an!';
export const RESILIENCE_FAULT_TYPE_INFO = 'Bitte wähle Sie die Art des Fehlers aus!';

export const LOADTEST_DURATION_INFO = 'Please provide a valid number for the duration!';
export const LOADTEST_NUMBER_OF_SIMULATED_REQUESTS_INFO = 'Please provide a valid positive number!';

export const VERIFICATION_MODAL_NOTIFICATION = 'Wollen Sie wirklich dieses Template als Test erzeugen?';

/**
 * Invalid input for resiliencetest
 */
export const INVALID_RESPONSE_MEASURE = 'Please provide at least one response measure!';

/**
 * Invalid input for loadtests
 */
export const INVALID_RAMP_UP_TIME = 'Please provide a valid number!';

/**
 * Information text constants for resilience templates
 */
export const INFO_TYPE_OF_FAILURE = `The stimulus describes the behavior that you would like to simulate. For instance, "No response" leads to a missing signal of the corresponding process to simulate a situation where the process does not respond or does not exist.`;
export const INFO_EXECUTION_CONTEXT = `In order to receive meaningful results, you have the option to run the test in your productive environment where your users access your application. However, this may lead to negative impacts on your application. Therefor, you may opt for the option to run the test in a secure environment, but in that case you need to specify further information.`;
export const INFO_ENVIRONMENT_INFORMATION = `The information below define your environment in more detail as a means to be as close to your productive environment as possible. You may choose a time slot for your test as well as adding existing load tests, which simulate users that access your application.`;
export const INFO_REPITITION = `The repitition of the stimulus declares how often it will be executed during the test duration. By default the stimulus will be executed only once. For example, if you set the stimulus to be "No response", then only once will be process by terminated and removed from the application to simulate the specified behavior.`;
export const INFO_ACCURACY = `The accuracy defines how long the test will be executed. The higher the accuracy is, the longer the test will be executed. By default, a 100% accuracy is set to a test duration of 1 week. An accuracy of 1% relates to approximately 1 hour. An accuracy value of 0% is not possible. We advise to use at least 60% accuracy to receive meaningful results. With a value of 60% the test will run approximately 60 hours, i.e., two and a half days.`;
export const INFO_RESPONSE_MEASURE = `The response measure declares a hypothesis that you wish to be fulfilled. For instance, in case of a "No response" stimulus, you may declare the hypothesis to be that the recovery time is still toleratable in case of a missing response.`;


/**
 * Information text constants for loadtest templates
 */

export const INFO_DESCRIPTION = 'Describe your loadtest with a few words. This is optional.';
export const INFO_DURATION = 'The duration declares the total time for the loadtest in minutes.';
export const INFO_NUMBER_USERS = 'The number of users describes how many concurrent requests the application will be exposed to. In the best case, ' + 
'the number you provide is approximately the same according to the number of requests the application has to handle in production.';
export const INFO_RAMP_UP_TIME = 'The ramp up time defines how long the loadtest tool will take to reach the total amount of concurrent user requests.' + 
'For instance, if the number of concurrent user requests is 300 and the ramp up time is 10 minutes, then the loadtest tool will gradually increase the ' + 
'number of requests from 1 to 300 within a 10 minutes interval.';