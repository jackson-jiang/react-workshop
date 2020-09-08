import React from 'react';
import styles from './work.css';
import ProTable from '@ant-design/pro-table'
import {getProductData} from "@/services/product";

const ds = [
  {
    id: 1,
    name: '张三',
    age: 18,
    address: 'xxxxx'
  }
]
const columns =[
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '地址',
    dataIndex: 'address',
    hideInSearch: true
  },
]
export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page product/work</h1>
      <ProTable
        request={
          async params => {
            debugger
            const res = await getProductData(params)
            return {...res.data, success:true}
          }
        }
        columns={columns}
      ></ProTable>
    </div>
  );
}
