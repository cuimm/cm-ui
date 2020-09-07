import ElTable from 'element-ui/lib/table';
import ElTableColumn from 'element-ui/lib/table-column';

export default {
  name: 'CmTable',
  components: {
    ElTable,
    ElTableColumn,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    renderColumn() {
      const columns = [];
      this.columns.forEach(column => {
        columns.push(
          <el-table-column
            prop={column.prop}
            label={column.label}
          >
          </el-table-column>
        );
      });
      return columns;
    },
  },
  render(h) {
    return (
      <el-table
        data={this.data}
        stripe={this.stripe}
      >
        {this.renderColumn(h)}
      </el-table>
    )
  },
}
