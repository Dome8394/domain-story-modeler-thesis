export class LoadTestTemplate {
    
    /**
     * 
     * @param {*} loadTestDescription 
     * @param {*} serviceName 
     * @param {*} selectedHttpEndpoints 
     * @param {*} loadTestDuration 
     * @param {*} numberOfSimulatedRequests 
     */
    constructor(loadTestDescription, rampUpTime, serviceName, loadTestDuration, numberOfSimulatedRequests) {
        if (loadTestDescription == '') {
            this.serviceName = 'Very basic loadtest';
        }
        this.serviceName = serviceName;
        this.rampUpTime = rampUpTime;
        this.loadTestDescription = loadTestDescription;
        this.loadTestDuration = loadTestDuration;
        this.numberOfSimulatedRequests = numberOfSimulatedRequests;
    }
}