import CmTable from '@packages/table/index.js';

const components = [
  CmTable,
];

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  CmTable,
}
