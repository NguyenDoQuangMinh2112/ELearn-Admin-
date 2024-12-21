import classNames from 'classnames/bind'
import styles from './User.module.scss'
import { getAllUserAPI } from '~/apis/dashboard'
import { useEffect, useState } from 'react'
import { tableInterfaceUserColumn } from '~/interfaces/table'
import Table, { TableColum } from '~/components/Table/Table'
import Button from '~/components/Button'
import { TbTrash } from 'react-icons/tb'
import moment from 'moment'
const cx = classNames.bind(styles)

const User = () => {
  const [users, setUsers] = useState<tableInterfaceUserColumn[]>([])
  const columns: TableColum<tableInterfaceUserColumn>[] = [
    { key: '_id', title: '#' },

    {
      key: 'fullName',
      title: 'FullName',
      renderRow: (row: any) => row.fullName
    },
    {
      key: 'email',
      title: 'Email',
      renderRow: (row: any) => row.email
    },
    {
      key: 'createdAt',
      title: 'Created At',
      renderRow: (row: any) => moment(row.createdAt).format('DD/MM/YYYY')
    },

    {
      key: 'action',
      title: 'Actions',
      renderRow: (row: any) => (
        <div className={cx('actions')}>
          <Button className={cx('deleteBtn')}>
            <TbTrash color="red" size={20} />
          </Button>
        </div>
      )
    }
  ]

  const fetchListUser = async () => {
    const res = await getAllUserAPI()
    if (res.statusCode === 200) {
      setUsers(res.data)
    }
  }

  useEffect(() => {
    fetchListUser()
  }, [])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('cardHead')}>
        <div className={cx('')}>
          <h5>List users</h5>
        </div>
      </div>
      <div className={cx('cardBody')}>
        <Table columns={columns} rows={users} />
      </div>
    </div>
  )
}

export default User
