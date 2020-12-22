<template>
  <div>
    <cm-table
      :columns="columns"
      :data="tableData"
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
    }
  },
}
</script>
