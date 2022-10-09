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
        responseMeasure
    ) {
        this.artifact = artifact;
        this.stimulus = stimulus;
        this.environment = environment;
        this.responseMeasure = responseMeasure;
    }
}