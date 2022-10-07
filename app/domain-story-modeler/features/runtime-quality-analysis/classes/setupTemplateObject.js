export const setupTemplateObject = (templateObject, type) => {
    
    let existingRuntimeQualityAnalysis = localStorage.getItem('runtimeQualityAnalysis');
    let parsedExistingRuntimeQualityAnalysis = JSON.parse(existingRuntimeQualityAnalysis);
    
    if (!existingRuntimeQualityAnalysis) {
        
        console.log("Object does not exists");
        
        let runtimeQualityAnalysisObj = {
            resiliencetest: [],
            loadtest: [],
            monitoringspec: []
        }
        
        switch(type) {
            case 'RESILIENCE':
                runtimeQualityAnalysisObj.resiliencetest.push(templateObject);
                break;
            case 'LOADTEST':
                runtimeQualityAnalysisObj.loadtest.push(templateObject);
                break;
            case 'MONITORING':
                runtimeQualityAnalysisObj.monitoringspec.push(templateObject);
                break;
            default:
                console.log("No matching category!");
                break;
        }
        localStorage.setItem('runtimeQualityAnalysis', JSON.stringify(runtimeQualityAnalysisObj));
        
    } else {
        switch (type) {
            case 'RESILIENCE':
                parsedExistingRuntimeQualityAnalysis.resiliencetest.push(templateObject);
                break;
            case 'LOADTEST':
                parsedExistingRuntimeQualityAnalysis.loadtest.push(templateObject);
                break;
            case 'MONITORING':
                parsedExistingRuntimeQualityAnalysis.monitoringspec.push(templateObject);
                break;
            default:
                console.log("No matching category!");
                break;
        }
        localStorage.setItem('runtimeQualityAnalysis', JSON.stringify(parsedExistingRuntimeQualityAnalysis));
    }
    
}