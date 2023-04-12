export class LoadTestTemplate {

    /**
     * 
     * @param {*} loadTestDescription 
     * @param {*} serviceName 
     * @param {*} loadTestDuration 
     * @param {*} numberOfSimulatedRequests 
     */
    constructor(
        artifact,
        description,
        stimulus,
        environment,
        responseMeasure,
        resultMetrics
    ) {
        this.artifact = artifact;
        this.description = description;
        this.stimulus = stimulus;
        this.environment = environment;
        this.responseMeasure = responseMeasure;
        this.resultMetrics = resultMetrics;
    }
}


