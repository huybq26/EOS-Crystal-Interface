export default function exportJsonFile(exportObj, exportName) {
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
} // create a new element with a tag and add attribute href and donwload to that a tag. No need to link to the server.
