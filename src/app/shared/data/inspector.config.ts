export const inspectorConfig = {
  inputs: {
    custom: {
      type: 'text',
      group: 'data',
      index: 1,
      label: 'Custom data',
      attrs: {
        label: {
          'data-tooltip': 'An example of setting custom data via Inspector.'
        }
      }
    }
  },
  groups: {
    data: { 
      label: 'Data',
      'index': 1 
    }
  }
};
