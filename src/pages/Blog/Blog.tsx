import classNames from 'classnames/bind'
import styles from './Blog.module.scss'

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { getAllBlogsAPI } from '~/apis/dashboard'
import Button from '~/components/Button'
import Table, { TableColum } from '~/components/Table/Table'
import { tableInterfaceBlogColumn } from '~/interfaces/table'
import { checkLengthDescription } from '~/utils/helper'

const cx = classNames.bind(styles)

const Blog = () => {
  const [blogs, setBlogs] = useState<tableInterfaceBlogColumn[]>([])
  const columns: TableColum<tableInterfaceBlogColumn>[] = [
    { key: '_id', title: '#' },
    {
      key: 'banner',
      title: 'Banner',
      renderRow: (row: any) => <img className={cx('banner')} src={row.banner} alt="Blog Banner" />
    },
    {
      key: 'title',
      title: 'Title',
      renderRow: (row: any) => (
        <div className={cx('title')} title={row.title}>
          {checkLengthDescription(row.title, 40)}
        </div>
      )
    },
    {
      key: 'author',
      title: 'Author',
      renderRow: (row: any) => row.author.fullName
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

  const fetchListBlog = async () => {
    const res = await getAllBlogsAPI()
    if (res.statusCode === 200) {
      setBlogs(res.data)
    }
  }

  useEffect(() => {
    fetchListBlog()
  }, [])
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>List blogs</h2>
      <Table columns={columns} rows={blogs} />
    </div>
  )
}

export default Blog
