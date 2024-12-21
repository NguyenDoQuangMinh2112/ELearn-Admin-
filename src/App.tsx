import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import CourseDetail from './pages/CourseDetail/CourseDetail'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import AddChapter from './pages/AddChapter/AddChapter'
import AddLesson from './pages/AddLesson/AddLesson'
import EditLesson from './pages/EditLesson/EditLesson'
import AddExercise from './pages/AddExercise/AddExercise'
import Course from './pages/Course/Course'
import Instructor from './pages/Instructor/Instructor'
import EditCourse from './pages/EditCourse/EditCourse'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { authSelector } from './redux/auth/authSelectors'
import User from './pages/User/User'
import Blog from './pages/Blog/Blog'
const ProtectedRoute = () => {
  const { userInfo } = useSelector(authSelector)
  if (!userInfo) {
    return <Navigate to="/login" replace={true} />
  }

  return <Outlet />
}
function App() {
  return (
    <>
      <ToastContainer autoClose={1000} draggable />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="courses" element={<Course />} />
            <Route path="instructors" element={<Instructor />} />
            <Route path="users" element={<User />} />
            <Route path="blogs" element={<Blog />} />
          </Route>
        </Route>

        <Route path="course/:id" element={<CourseDetail />}>
          <Route path="" element={<EditCourse />} />
          <Route path="add-chapter" element={<AddChapter />} />
          <Route path="add-lesson" element={<AddLesson />} />
          <Route path="add-exercise" element={<AddExercise />} />
          <Route path=":idL/edit-lesson" element={<EditLesson />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
