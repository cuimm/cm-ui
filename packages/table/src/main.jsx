import {isFunction} from '@src/utils/types'
import {currencyFormatter} from '@src/utils/currency'
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'

export default {
  name: 'CmTable',
  components: {
    ElTable,
    ElTableColumn,
  },
  inheritAttrs: false,
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
        label: column.label,
        showOverflowTooltip: true,
        ...column
      }
      return (
          <el-table-column
            key={columnKey}
            {...{attrs: attrs}}
          >
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
              formatter={this.renderCell(column).bind(this)}
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
    renderCell(column) {
      return (row, tableColumn, cellValue, index) => {
        if (column.formatter && isFunction(column.formatter)) {
          cellValue = column.formatter(row, tableColumn, cellValue, index)
        }
        if (column.format === 'currency') {
          const {fractionSize = 2, symbol = '¥'} = column.currencyOptions || {}
          cellValue = currencyFormatter(cellValue, fractionSize, symbol)
        }
        return cellValue
      }
    },
    formatCellValue(column, cellValue) {
      let iCellValue = cellValue
      const format = column.format
      if (format === 'currency') {
        const {fractionSize = 2, symbol = '¥'} = column.currencyOptions || {}
        iCellValue = currencyFormatter(cellValue, fractionSize, symbol)
      }
      return iCellValue
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
