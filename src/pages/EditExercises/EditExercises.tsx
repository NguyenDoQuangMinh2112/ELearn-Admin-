import Button from '~/components/Button'
import Input from '~/components/Input/Input'

import styles from './EditExercises.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import Spinner from '~/components/Spinner/Spinner'
import { IoMdAdd } from 'react-icons/io'
import Select from '~/components/Input/Select'
import { createAnswerAPI } from '~/apis/chapter'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)

const EditExercises = () => {
  const { idL } = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    chapterNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, correctAnswer: value }))
  }

  const handleEditExercise = async () => {
    const correctAnswer = formData.correctAnswer.trim()

    if (!correctAnswer) {
      alert('Please select a correct answer.')
      setIsLoading(false)
      return
    }
    const payload = {
      quizId: idL,
      question: formData.question,
      options: [formData.option1, formData.option2, formData.option3, formData.option4],
      correct_answer: formData.correctAnswer
    }

    try {
      setIsLoading(true)
      const res = await createAnswerAPI(payload)
      if (res.statusCode === 200) {
        setIsLoading(false)
        toast.success(res.message)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const options = [
    { label: formData.option1, value: formData.option1 },
    { label: formData.option2, value: formData.option2 },
    { label: formData.option3, value: formData.option3 },
    { label: formData.option4, value: formData.option4 }
  ].filter((option) => option.value.trim() !== '')
  return (
    <div style={{ padding: '20px 0 10px 30px' }}>
      <h2>Edit Exercises</h2>

      <Input
        id="question"
        label="Question"
        placeholder="Add your question here"
        value={formData.question}
        onChange={handleInputChange}
      />
      <Input
        id="option1"
        label="Choice 1"
        placeholder="Enter your first choice"
        value={formData.option1}
        onChange={handleInputChange}
      />
      <Input
        id="option2"
        label="Choice 2"
        placeholder="Enter your second choice"
        value={formData.option2}
        onChange={handleInputChange}
      />
      <Input
        id="option3"
        label="Choice 3"
        placeholder="Enter your third choice"
        value={formData.option3}
        onChange={handleInputChange}
      />
      <Input
        id="option4"
        label="Choice 4"
        placeholder="Enter your fourth choice"
        value={formData.option4}
        onChange={handleInputChange}
      />

      <Select
        options={options}
        selectedValue={formData.correctAnswer}
        onChange={handleSelectChange}
        placeholder="Select correct answer"
        text="Answer"
        className={cx('select-form')}
      />

      <Input id="explain" label="Explain Question" placeholder="Enter your explain" />

      {/* <Input
        id="chapterNumber"
        label="Order"
        type="number"
        placeholder="Order"
        value={formData.chapterNumber}
        onChange={handleInputChange}
      /> */}

      <div className={cx('action')}>
        <Button
          className={cx('saveBtn')}
          leftIcon={!isLoading && <IoMdAdd size={20} color="white" />}
          onClick={handleEditExercise}
        >
          {isLoading ? <Spinner color="#fff" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default EditExercises
