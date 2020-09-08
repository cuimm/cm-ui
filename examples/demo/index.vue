<template>
  <div>
    <cm-table
      :columns="columns"
      :data="data"
      :stripe="true"
    />
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      columns: [{
        label: '姓名',
        prop: 'name',
      }, {
        label: '学号',
        prop: 'code',
      }, {
        label: '籍贯',
        prop: 'address',
      }, {
        label: '年龄',
        prop: 'age',
      }, {
        label: '性别',
        prop: 'gender',
      }, {
        label: '年级',
        prop: 'grade_code',
        render() {
          return (<span>高三</span>)
        },
        // eslint-disable-next-line no-unused-vars
        renderHeader: (h) => {
          return (<span style="color: red">选择年级</span>)
        },
      }, {
        label: '班级',
        prop: 'class_code',
      }, {
        label: '成绩',
        prop: 'score',
      }, {
        label: '操作',
        render() {
          return (
              <div>
                <button>点击</button>
                <button>click</button>
              </div>
          )
        },
      }],
      data: [
        {
          name: 'cuimm',
          code: 'S20078201045',
          address: '山东省济宁市疃里镇疃里疃里',
          age: 18,
          gender: 2,
          'grade_no': '10',
          'class_no': '3',
          'score': 100,
        },
        {
          name: 'cuimm',
          code: 'S20078201045',
          address: '山东',
          age: 18,
          gender: 2,
          'grade_no': '10',
          'class_no': '3',
          'score': 100,
        },
        {
          name: 'cuimm',
          code: 'S20078201045',
          address: '山东',
          age: 18,
          gender: 2,
          'grade_no': '10',
          'class_no': '3',
          'score': 100,
        },
      ],
    }
  },
}
</script>
