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
      }, {
        label: '班级',
        prop: 'class_code',
      }, {
        label: '成绩',
        prop: 'score',
      }, {
        label: '操作',
      }],
      data: [
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
