export const getModelViewerHtml = (xml?: string) => {
  const workflowContent = xml
    ? 'const bpmnXML = `' + xml + '`'
    : `const file =
  window.location.search.split('?definition=').pop() || 'workflow.bpmn';
document.title = file;
const response = await fetch(file);
const bpmnXML = await response.text();`;

  const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BPMN</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/bpmn-js@8.9.1/dist/assets/diagram-js.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bpmn-js@8.9.1/dist/assets/bpmn-font/css/bpmn.css"
    />
  </head>
  <style>
    html,
    body,
    #canvas {
      height: 100%;
    }
  </style>
  <body>
    <div id="canvas"></div>
    <script src="https://unpkg.com/bpmn-js@8.9.1/dist/bpmn-modeler.development.js"></script>
    <script>
      (async () => {
        //
        ${workflowContent}
        //
        const viewer = new BpmnJS({ container: '#canvas' });
        try {
          await viewer.importXML(bpmnXML);
          viewer.get('canvas').zoom('fit-viewport');
        } catch (err) {
          console.error(err);
        }
      })();
    </script>
  </body>
</html>
`;
  return content;
};
