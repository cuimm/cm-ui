export const tableColumns = [
  {
    label: '时间',
    key: 'datetime',
    align: 'center',
    children: [
      {
        label: '日期',
        prop: 'date',
        render(h, value) {
          return <span style="color: red">{value}</span>
        },
      },
      {
        label: '时间',
        prop: 'time',
        formatter: (row, column, cellValue) => {
          return cellValue.split(':').slice(0, 2).join(':')
        },
      }
    ],
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '省份',
    prop: 'province',
  },
  {
    label: '市区',
    prop: 'city',
  },
  {
    label: '地址',
    prop: 'address',
  },
  {
    label: '邮编',
    prop: 'zip',
  },
  {
    label: '人气值',
    prop: 'popularity',
    format: 'currency',
    currencyOptions: {
      fractionSize: 0,
      symbol: '',
    },
  },
]

export const tableData = [
  {
    date: '2016-05-03',
    time: '12:00:00',
    name: '张晚晚',
    province: '北京',
    city: '朝阳区',
    address: '北京市朝阳区青年路 2368 弄',
    zip: 600200,
    popularity: 890020,
  },
  {
    date: '2016-05-02',
    time: '12:00:00',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
    popularity: 890020,
  },
  {
    date: '2016-05-04',
    time: '12:00:00',
    name: '李小明',
    province: '广东',
    city: '深圳市',
    address: '广东省深圳市腾讯大厦',
    zip: 800900,
    popularity: 890020,
  },
  {
    date: '2016-05-01',
    time: '12:00:00',
    name: '赵晓刀',
    province: '广东省',
    city: '广州市',
    address: '广东省广州市 590 弄',
    zip: 590120,
    popularity: 890020,
  },
  {
    date: '2016-05-08',
    time: '12:00:00',
    name: '刘亦菲',
    province: '上海',
    city: '浦东区',
    address: '上海市浦东区金沙江路 1518 弄',
    zip: 320900,
    popularity: 890020,
  },
  {
    date: '2016-05-06',
    time: '12:00:00',
    name: '钱多多',
    province: '北京',
    city: '海淀区',
    address: '北京海淀区 4807 弄',
    zip: 480770,
    popularity: 890020,
  },
  {
    date: '2016-05-07',
    time: '12:00:00',
    name: '赵丽颖',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 809229,
    popularity: 890020,
  }
]
