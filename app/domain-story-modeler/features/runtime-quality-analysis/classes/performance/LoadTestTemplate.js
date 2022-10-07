export class LoadTestTemplate {
    
    /**
     * 
     * @param {*} loadTestDescription 
     * @param {*} serviceName 
     * @param {*} loadTestDuration 
     * @param {*} numberOfSimulatedRequests 
     */
    constructor(loadTestDescription, serviceName, loadTestDuration, numberOfSimulatedRequests) {
        if (loadTestDescription == '') {
            this.serviceName = 'Very basic loadtest';
        }
        this.serviceName = serviceName;
        this.loadTestDescription = loadTestDescription;
        this.loadTestDuration = loadTestDuration;
        this.numberOfSimulatedRequests = numberOfSimulatedRequests;
    }
}