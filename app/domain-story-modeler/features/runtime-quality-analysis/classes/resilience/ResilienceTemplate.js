export class ResilienceTemplate {


    constructor(
        artifact,
        stimulus = [],
        environment = [],
        responseMeasure
    ) {
        this.artifact = artifact;
        this.stimulus = stimulus;
        this.environment = environment;
        this.responseMeasure = responseMeasure;
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