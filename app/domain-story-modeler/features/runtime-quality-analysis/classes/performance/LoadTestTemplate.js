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
      parametrization,
      responseMeasure,
      result_metrics
  ) {
    this.artifact = artifact;
    this.description = description;
    this.stimulus = stimulus;
    this.parametrization = parametrization;
    this.response_measure = responseMeasure;
    this.response_metrics = result_metrics;
  }
}


