export class ResilienceTemplate {
    constructor(scenarioName, faultType, injectionType, executionEnvironment, services, timeToFailure, 
        numberOfInstancesAffected, randomization) {
        this.scenarioName = scenarioName;
        this.faultType = faultType;
        this.injectionType = injectionType;
        this.executionEnvironment = executionEnvironment;
        this.services = services;
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