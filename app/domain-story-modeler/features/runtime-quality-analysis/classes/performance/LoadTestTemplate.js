export class LoadTestTemplate {
    
    /**
     * Builds a loadtest template object
     * @param {*} loadTestDescription 
     * @param {*} selectedHttpEndpoints 
     * @param {*} loadTestDuration 
     * @param {*} numberOfSimulatedRequests 
     */
    constructor(loadTestDescription = 'Very basic loadtest', selectedHttpEndpoints, loadTestDuration, numberOfSimulatedRequests) {
        this.loadTestDescription = loadTestDescription;
        this.selectedHttpEndpoints = selectedHttpEndpoints;
        this.loadTestDuration = loadTestDuration;
        this.numberOfSimulatedRequests = numberOfSimulatedRequests;
    }
}