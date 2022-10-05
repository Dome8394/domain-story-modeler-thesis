export class ResilienceTemplate {


    constructor(scenarioDescription, 
        executionEnvironment, 
        runTestDuringOfficeHours = false, 
        runTestAfterOfficeHours = false, 
        responseMeasure = [], 
        artifact,
        stimulus = [],
        timeToFailure,
        numberOfInstancesAffected = 1, 
        randomization) {
        if (scenarioDescription === '') {
            console.log(scenarioDescription);
            this.scenarioDescription = 'Very basic resilience scenario';
        } else {
            this.scenarioDescription = scenarioDescription;
        }
        this.executionEnvironment = executionEnvironment;
        this.runTestDuringOfficeHours = runTestDuringOfficeHours;
        this.runTestAfterOfficeHours = runTestAfterOfficeHours;
        this.artifact = artifact;
        this.stimulus = stimulus;
        this.responseMeasure = responseMeasure;
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