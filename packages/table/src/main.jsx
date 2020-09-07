import ElTable from 'element-ui/lib/table';
import ElTableColumn from 'element-ui/lib/table-column';

export default {
  name: 'CmTable',
  components: {
    ElTable,
    ElTableColumn,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    renderColumn() {
      return (
          <el-table-column
            label="xxx"
          >
          </el-table-column>
      )
    },
  },
  render(h) {
    return (
        <el-table>
          {this.renderColumn(h)}
        </el-table>
    )
  },
}
