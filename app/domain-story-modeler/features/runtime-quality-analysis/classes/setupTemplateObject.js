export const setupTemplateObject = (templateObject, type) => {

  let existingRuntimeQualityAnalysis = localStorage.getItem('runtimeQualityAnalysis');
  let rqaDefinition;
  if (existingRuntimeQualityAnalysis) {
    rqaDefinition = JSON.parse(existingRuntimeQualityAnalysis);
  }
  else {
    console.log('Object does not exists');
    rqaDefinition = {
      version: 1.0,
      context: 'werkstattauftrag',
      environment: 'TEST',
      runtime_quality_analysis: {
        resilience: [],
        loadtests: [],
        monitoring: []
      },
    };
  }

  switch (type) {
  case 'RESILIENCE':
    rqaDefinition.runtime_quality_analysis.resilience.push(templateObject);
    break;
  case 'LOADTEST':
    rqaDefinition.runtime_quality_analysis.loadtests.push(templateObject);
    break;
  case 'MONITORING':
    rqaDefinition.runtime_quality_analysis.monitoring.push(templateObject);
    break;
  default:
    console.log('No matching category!');
    break;
  }


  localStorage.setItem('runtimeQualityAnalysis', JSON.stringify(rqaDefinition));

};
