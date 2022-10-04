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
 * Information text constants for resilience templates
 */
export const INFO_SCENARIO_DESC = 'Describe your scenario with a few words. This is optional.';
export const INFO_TYPE_OF_FAILURE = 'The type of failure describes what you would like to do with this element. Currently, there is only a "service shutdown"' + 
'available. A service shutdown tells dqualizer that the services which comprises this domain story element will terminate in order to observe how the application behaves' + 
'in a scenario where a service is no longer available. The checkbox "other than" describes a failure where the responds of the service is altered. The checkbox' + 
' "later than" describes a failure where the reponse of the service is delayed by a given threshold.';
export const INFO_EXECUTION_CONTEXT = 'The execution context describes in which environment you would like to execute the scenario. You can' + 
'decide between production, staging, and testing. Production is the environment with the highest risk. You should communicate with your technical expert before you select the production environment as this'+ 
' may affect your users. Testing and staging are the most secure environments and do not affect your users.';
export const INFO_ENVIRONMENT_INFORMATION = 'You can provide additional information about the environment in which you would like to execute this scenario.' + 
'The application may behave differently when running a resilience scenario during office hours than a scenario that is executed at midnight for example (off schedule).';
export const INFO_FAILING_INSTANCES = 'If there are more than one running instances that comprise this domain story element, you can select a particular instance' + 
' that you would like to terminate for this scenario. If it does not matter to you which particular instance terminates, you do not need to select a particular instance ID.' + 
'Note that, if you would like to select a particular instance ID, you need to check the randomization checkbox below.';
export const INFO_RANDOMIZATION = 'By default, Dqualizer selects a random service ID for termination only if there are more than one instance IDs available.' + 
' If you would like, to select a particular instance ID, check the box below.';
export const INFO_TIME_OF_SHUTDOWN = 'You can provide the time at which the service terminates in minutes. The time is calculated from the start of the scenario.' + 
'For instance, if you would like the service to terminate after 10 minutes, simply type in the value 10 in the input field.';


/**
 * Information text constants for loadtest templates
 */

export const INFO_DESCRIPTION = '';
export const INFO_DURATION = '';
export const INFO_NUMBER_USERS = '';
export const INFO_RAMP_UP_TIME = '';