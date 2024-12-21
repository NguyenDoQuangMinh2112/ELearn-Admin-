import classNames from 'classnames/bind'
import styles from './Instructor.module.scss'
import Table, { TableColum } from '~/components/Table/Table'
import { tableInterfaceInstructorColumn } from '~/interfaces/table'
import Button from '~/components/Button'
import { TbTrash } from 'react-icons/tb'
import { createTeacherAPI, getInstructorsAPI } from '~/apis/dashboard'
import moment from 'moment'

import { useEffect, useState } from 'react'
import Modal from '~/components/Modal/Modal'
import Input from '~/components/Input/Input'
import { toast } from 'react-toastify'
import Spinner from '~/components/Spinner/Spinner'
const cx = classNames.bind(styles)

const Instructor = () => {
  const [instructors, setInstructors] = useState<tableInterfaceInstructorColumn[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: ''
  })
  const columns: TableColum<tableInterfaceInstructorColumn>[] = [
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

  const fetchListStudent = async () => {
    const res = await getInstructorsAPI()
    if (res.statusCode === 200) {
      setInstructors(res.data)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleCreateNewTeacher = async () => {
    try {
      const res = await createTeacherAPI(formData)
      if (res.statusCode === 201) {
        toast.success('Created new teacher!')
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchListStudent()
  }, [])
  return (
    <div className={cx('wrapper')}>
      {isShowModal && (
        <Modal title="Create new teacher" isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
          <Input
            className={cx('input')}
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
          <Input
            className={cx('input')}
            id="fullName"
            label="Full name"
            value={formData.fullName}
            placeholder="Enter full name"
            onChange={handleInputChange}
          />
          <Input
            className={cx('input')}
            id="password"
            label="Password"
            value={formData.password}
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />

          <Button className={cx('addTeacherBtn')} onClick={handleCreateNewTeacher}>
            {isLoading ? <Spinner color="#fff" /> : 'Add'}
          </Button>
        </Modal>
      )}
      <div className={cx('cardHead')}>
        <div className={cx('')}>
          <h5>List instructors</h5>
        </div>

        <Button className={cx('createNewTeacherBtn')} classNameTitle={cx('title')} onClick={() => setIsShowModal(true)}>
          Create teacher
        </Button>
      </div>
      <div className={cx('cardBody')}>
        <Table columns={columns} rows={instructors} />
      </div>
    </div>
  )
}

export default Instructor
