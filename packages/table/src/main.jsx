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
    renderColumnSlot(h, columnSetting) {
      if (columnSetting.render && typeof columnSetting.render === 'function') {
        return {
          default: scope => {
            return columnSetting.render(h, scope.row);
          }
        }
      }
    },
    renderColumnHeader(h, columnSetting) {
      return columnSetting.renderHeader ? columnSetting.renderHeader : null;
    },
    renderColumn(h) {
      const columns = [];
      this.columns.forEach((columnSetting, index) => {
        const columnKey = `${columnSetting.prop}_${index}`;
        const renderHeader = this.renderColumnHeader(h, columnSetting);
        const scopedSlots = this.renderColumnSlot(h, columnSetting);
        columns.push(
            <el-table-column
                key={columnKey}
                prop={columnSetting.prop}
                label={columnSetting.label}
                show-overflow-tooltip
                render-header={renderHeader}
                scopedSlots={scopedSlots}
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
