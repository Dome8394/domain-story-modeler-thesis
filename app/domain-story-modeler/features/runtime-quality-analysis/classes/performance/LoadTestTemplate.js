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
        stimulus,
        environment,
        responseMeasure,
        resultMetrics
    ) {
        this.artifact = artifact;
        this.stimulus = stimulus;
        this.environment = environment;
        this.responseMeasure = responseMeasure;
        this.resultMetrics = resultMetrics;
    }
}