export const EXPERIMENT_NAME = 'ChaosExperiment';
export const LOADTEST_NAME = 'Loadtest';
export const MONITORING_NAME = 'Monitoring';
export const SERVICE_DELAY_NAME = 'ServiceDelay';

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
export const INFO_RESPONSE_MEASURE = `The response measure declares a hypothesis that you wish to be fulfilled. For instance, a hypothesis that declares the response times to be satisfied means that during the test, your application has to respond with a satisfiable response window.`;


/**
 * Information text constants for loadtest templates
 */

export const INFO_STIMULUS = `The stimulus specifies how the load should look like. For instance, a "Load peak" will lead to a massive spike in simulated users accessing the application in a secure environment whereas a "Load Increase" may lead to a slow in crease in users accessing the application.`;
export const INFO_LOAD_DESIGN = `The Load Design allows you to further design the simulated load depending on the selected stimulus. For instance, if you design a "Load Peak" stimulus, you will need to specify the final peak to be achieved and how long it takes to reach it.`;
export const INFO_HIGHEST_LOAD = `The highest load defines how many users you simulate at most, therefor, the higher you select this field, the more users your test will simulate.`;
export const INFO_TIME_TO_HIGHEST_LOAD = `The time to highest load defines the gradient to the peak load.`;
export const INFO_TYPE_OF_INCREASE = `The type of increase defines how the graph of the load looks like according to mathematical functions.`;
export const INFO_BASE_LOAD = `The base load is a number of simulated users that will be hold consistently for the duration of the test.`;
export const INFO_RESULT_METRICS = `You may check one or multiple of these fields to tell the system which metrics you would like to include in the final analysis results.`;