import { createToastNotification } from './notifications';

/**
 * Retrieves the name of the currently selected node on which a test will be
 * modeled.
 * 
 * @param {} selectedID 
 */
export const getNodeName = (selectedID) => {
    let nodeName = $(`[data-element-id=${selectedID}]`).get(0);
    return nodeName.children[0].textContent;
}

export const getNodeRectElementAndSetColor = (selectedID, specified, type) => {
    let getNode = $(`[data-element-id=${selectedID}`).get(0);
    let rectElement = getNode.children[1];
    
    let unspecifiedColorHighlight = 'rgb(210 24 24)';
    
    if (specified) {
        rectElement.style.strokeOpacity = 1;
        rectElement.style.strokeWidth = '1px';
        rectElement.style.stroke = 'rgb(49 156 35)';
    } else {
        createToastNotification("You did not provide all information in the template!", type)
        if (!(rectElement.style.stroke == unspecifiedColorHighlight)) {
            rectElement.style.strokeOpacity = 1;
            rectElement.style.strokeWidth = '1px';
            rectElement.style.stroke = 'rgb(210 24 24)';
        }
    }
}
