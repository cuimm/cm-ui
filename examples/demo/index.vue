<template>
  <div>
    <cm-table
      :columns="columns"
      :data="tableData"
      :allow-selection="true"
      :selection.sync="selection"
      :filter="filters"
      @filter-change="handleFilterChange"
    />
  </div>
</template>

<script>
import {tableColumns, tableData} from '../data/table'

export default {
  name: 'Demo',
  data() {
    return {
      columns: tableColumns,
      tableData: tableData,
      selection: [],
      filters: {province: '上海'},
    }
  },
  methods: {
    handleFilterChange(filters) {
      console.log('handleFilterChange', filters);
      this.filters = Object.assign(this.filters, filters)
    },
  },
}
</script>
