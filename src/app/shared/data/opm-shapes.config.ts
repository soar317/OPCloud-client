export const opmShapesConfig = {
  things: {
    process: {
      jointBasicShape: 'Circle',
      supplement: {
        type: 'OPM.Process',
        size: { width: 6, height: 3 },
        attrs: {
          circle: { width: 50, height: 30, stroke: '#00008B', fill: '#DCDCDC', 'stroke-width': 2 },
          text: { text: 'Process', fill: 'black', 'font-weight': 600 }
        }
      }
    }
  }
  
};
