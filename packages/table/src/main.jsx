import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import {isFunction, isNumber} from '@src/utils/types'
import {currencyFormatter} from '@src/utils/currency'
import {FORMAT_ENUMS} from './config'

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
    allowSelection: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Object,
      default: () => {
      },
    },
  },
  methods: {
    renderSelectionColumn(h) { // eslint-disable-line
      if (this.allowSelection) {
        return (
            <el-table-column
                key="cm_table_selection"
                type="selection"
                fixed="left"
                align="center"
                width="55"
                reserve-selection
            />)
      }
    },
    renderColumns(h, columns) {
      const iColumns = []
      for (let index = 0; index < columns.length; index++) {
        let iColumn
        const columnSetting = columns[index]
        const columnKey = this.genColumnKey(columnSetting, index)
        if (columnSetting.children && columnSetting.children.length) {
          iColumn = this.renderMultiColumn(h, columnSetting, columnKey)
        } else {
          iColumn = this.renderColumn(h, columnSetting, columnKey)
        }
        iColumns.push(iColumn)
      }
      return iColumns
    },
    renderMultiColumn(h, columnSetting, columnKey) {
      const children = this.renderColumns(h, columnSetting.children)
      const attrs = {
        label: columnSetting.label,
        showOverflowTooltip: true,
        ...columnSetting
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
    renderColumn(h, columnSetting, columnKey) {
      const scopedSlots = this.renderScopeSlots(h, columnSetting, columnKey)
      const filters = columnSetting.filter && columnSetting.filter.enabled !== false && columnSetting.filter.filters || null
      const filteredValue = this.getFilteredValue(columnSetting)
      return (
          <el-table-column
              key={columnKey}
              column-key={columnSetting.filter && columnSetting.filter.enabled !== false && columnSetting.filter.key ? columnSetting.filter.key : columnSetting.prop}
              prop={columnSetting.prop}
              label={columnSetting.label}
              show-overflow-tooltip
              formatter={this.renderCell(columnSetting).bind(this)}
              filters={filters}
              filter-multiple={columnSetting.filter && columnSetting.filter.multiple}
              filtered-value={filteredValue}
              {
                ...{
                  attrs: columnSetting
                }
              }
              scopedSlots={scopedSlots}
          >

          </el-table-column>
      )
    },
    renderScopeSlots(h, columnSetting, columnKey) {
      if (columnSetting.render) {
        return {
          default: scope => {
            if (columnSetting.render) {
              return columnSetting.render(h, scope.row[columnSetting.prop], scope.row, columnSetting, columnKey)
            }
          }
        }
      }
      return null
    },
    renderCell(columnSetting) {
      return (row, tableColumn, cellValue, index) => {
        if (columnSetting.formatter && isFunction(columnSetting.formatter)) {
          cellValue = columnSetting.formatter(row, tableColumn, cellValue, index)
        }
        return this.formatCellValue(columnSetting, cellValue)
      }
    },
    formatCellValue(columnSetting, cellValue) {
      let iCellValue = cellValue
      const format = columnSetting.format || {}
      if (format.enum === FORMAT_ENUMS.CURRENCY) {
        const {fractionSize = 2, symbol = '¥'} = format.options || {}
        iCellValue = currencyFormatter(cellValue, fractionSize, symbol)
      } else if (format.enum === FORMAT_ENUMS.PERCENTAGE && isNumber(cellValue)) {
        const fractionSize = format.options.fractionSize || 2
        iCellValue = `${(Number(cellValue) * 100).toFixed(fractionSize)}%`
      }
      return iCellValue
    },
    onSelectionChange(selection) {
      this.$emit('update:selection', selection)
    },
    onFilterChange(filters) {
      const iFilters = {}
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const targetColumnSetting = this.columns.find(columnSetting => {
            if (columnSetting.filter && columnSetting.filter.enabled !== false) {
              if (columnSetting.filter.key === key || columnSetting.prop === key) {
                return true
              }
            }
            return false
          })
          if (targetColumnSetting && targetColumnSetting.filter && !targetColumnSetting.filter.multiple && filters[key] && typeof(filters[key][0]) !== 'undefined') {
            iFilters[key] = filters[key][0]
          } else {
            iFilters[key] = filters[key]
          }
        }
      }
      this.$emit('filter-change', iFilters)
    },
    getFilteredValue(columnSetting) {
      let filteredValue = []
      if (columnSetting.filter && columnSetting.filter.enabled !== false) {
        const filterKey = columnSetting.filter.key || columnSetting.prop
        if (this.filter[filterKey]) {
          if (!Array.isArray(this.filter[filterKey])) {
            filteredValue = [this.filter[filterKey]]
          } else {
            filteredValue = this.filter[filterKey]
          }
        }
      }
      return filteredValue
    },
    genColumnKey(columnSetting, index) {
      const columnKey = columnSetting.key ? columnSetting.key : columnSetting.prop ? columnSetting.prop : index
      return 'cm_table' + '_' + columnKey + '_' + index
    },
  },
  render(h) {
    return (
        <div class="cm-table">
          <el-table
              ref="table"
              data={this.data}
              stripe={true}
              on-selection-change={this.onSelectionChange}
              on-filter-change={this.onFilterChange}
              {
                ...{
                  attrs: Object.assign({}, this.$attrs, this.$props) // 兼容el-table的props
                }
              }
          >
            {this.renderSelectionColumn(h)}
            {this.renderColumns(h, this.columns)}
          </el-table>
        </div>
    )
  }
}
