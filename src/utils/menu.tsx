import { MdOutlineVideoSettings } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { PiStudentBold } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { SideBarMenuItem } from '~/interfaces/menu'
import { CgNotes } from 'react-icons/cg'

export const sideBarMenu: SideBarMenuItem[] = [
  {
    id: 1,
    icons: <MdOutlineVideoSettings />,
    text: 'Courses',
    path: '/courses'
  },
  {
    id: 2,
    icons: <FaChalkboardTeacher />,
    text: 'Instructors',
    path: '/instructors'
  },
  {
    id: 3,
    icons: <PiStudentBold />,
    text: 'Users',
    path: '/users'
  },
  {
    id: 4,
    icons: <CgNotes />,
    text: 'Blogs',
    path: '/blogs'
  },
  {
    id: 5,
    icons: <IoMdSettings />,
    text: 'Settings',
    path: '/settings'
  }
]
