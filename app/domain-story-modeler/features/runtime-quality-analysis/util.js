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