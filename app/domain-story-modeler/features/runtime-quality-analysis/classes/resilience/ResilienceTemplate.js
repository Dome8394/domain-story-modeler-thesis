export class ResilienceTemplate {


    constructor(scenarioDescription = 'Very basic resilience scenario', executionEnvironment, serviceName, timeToFailure,
        numberOfInstancesAffected = 1, randomization = true) {
        if (scenarioDescription === '') {
            this.scenarioDescription = 'Very basic resilience scenario';
        } else {
            this.scenarioDescription = scenarioDescription;
        }
        this.executionEnvironment = executionEnvironment;
        this.serviceName = serviceName;
        this.timeToFailure = timeToFailure;
        this.numberOfInstancesAffected = numberOfInstancesAffected;
        this.randomization = randomization;
    }

    getName() {
        return this.scenarioName;
    }
}

export const ResilienceInjectionTypesEnum = {
    APPLICATION: 'application',
    INFRASTRUCTURE: 'infrastructure'
}

export const ResilienceEnvironmentEnum = {
    PROD: 'production',
    TESTING: 'testing',
    STAGING: 'staging'
}

export const ResilienceFaultTypeEnum = {
    SERVICE_FAILURE: 'service failure',
    SERVICE_DELAY: 'service call delay'
}