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
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    renderColumns(h, columns) {
      const iColumns = []
      for (let index = 0; index < columns.length; index++) {
        let iColumn
        const column = columns[index]
        const columnKey = column.key ? column.key : column.prop ? column.prop : index + '_' + index
        if (column.children && column.children.length) {
          iColumn = this.renderMultiColumn(h, column, columnKey)
        } else {
          iColumn = this.renderColumn(h, column, columnKey)
        }
        iColumns.push(iColumn)
      }
      return iColumns
    },
    renderMultiColumn(h, column, columnKey) {
      const children = this.renderColumns(h, column.children)
      const attrs = {
        key: columnKey,
        label: column.label,
        showOverflowTooltip: true,
        ...column
      }
      return (
          <el-table-column {...{attrs: attrs}}>
            {children}
          </el-table-column>
      )
    },
    renderColumn(h, column, columnKey) {
      const scopedSlots = this.renderScopeSlots(h, column, columnKey)
      return (
          <el-table-column
              key={columnKey}
              prop={column.prop}
              label={column.label}
              show-overflow-tooltip
              {
                ...{
                  attrs: column
                }
              }
              scopedSlots={scopedSlots}
          >

          </el-table-column>
      )
    },
    renderScopeSlots(h, column, columnKey) {
      if (column.render) {
        return {
          default: scope => {
            if (column.render) {
              return column.render(h, scope.row[column.prop], scope.row, column, columnKey)
            }
          }
        }
      }
      return null
    },
  },
  render(h) {
    return (
        <div class="cm-table">
          <el-table
              ref="table"
              data={this.data}
              stripe={true}
              {
                ...{
                  attrs: Object.assign({}, this.$attrs, this.$props) // 兼容el-table的props
                }
              }
          >
            {this.renderColumns(h, this.columns)}
          </el-table>
        </div>
    )
  }
}
