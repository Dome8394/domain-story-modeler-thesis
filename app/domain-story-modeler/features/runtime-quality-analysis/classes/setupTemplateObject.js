export const setupTemplateObject = (templateObject, type) => {
    
    let existingRuntimeQualityAnalysis = localStorage.getItem('runtimeQualityAnalysis');
    let parsedExistingRuntimeQualityAnalysis = JSON.parse(existingRuntimeQualityAnalysis);
    
    if (!existingRuntimeQualityAnalysis) {
        
        console.log("Object does not exists");
        
        let runtimeQualityAnalysisObj = {
            resilience: [],
            loadtest: [],
            monitoring: []
        }
        
        switch(type) {
            case 'RESILIENCE':
                runtimeQualityAnalysisObj.resilience.push(templateObject);
                break;
            case 'LOADTEST':
                runtimeQualityAnalysisObj.loadtest.push(templateObject);
                break;
            case 'MONITORING':
                runtimeQualityAnalysisObj.monitoring.push(templateObject);
                break;
            default:
                console.log("No matching category!");
                break;
        }
        localStorage.setItem('runtimeQualityAnalysis', JSON.stringify(runtimeQualityAnalysisObj));
        
    } else {
        switch (type) {
            case 'RESILIENCE':
                parsedExistingRuntimeQualityAnalysis.resilience.push(templateObject);
                break;
            case 'LOADTEST':
                parsedExistingRuntimeQualityAnalysis.loadtest.push(templateObject);
                break;
            case 'MONITORING':
                parsedExistingRuntimeQualityAnalysis.monitoring.push(templateObject);
                break;
            default:
                console.log("No matching category!");
                break;
        }
        localStorage.setItem('runtimeQualityAnalysis', JSON.stringify(parsedExistingRuntimeQualityAnalysis));
    }
    
}