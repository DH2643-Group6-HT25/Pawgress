import React, { useState } from 'react'
import {
  MyCard,
  CardHeader,
  CardTitle,
  CardIcon,
  InsideCardContainer,
} from './CardComponents'
import styled from 'styled-components'
import plusIcon from '../assets/icons/plus.svg'
import trashIcon from '../assets/icons/remove.svg'
import { Formik, Form, Field } from 'formik'
import type { TodoObject } from '../models/todo/type'

/* ---------- styles first ---------- */
const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0 0 0;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: auto;
`
const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  font-family: ${(props) => props.theme.fonts.pixel};
  font-size: 1rem;
`
const TodoName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`
const DeleteButton = styled.button`
  background: none;
  border: 2px solid ${(p) => p.theme.colors.black};
  border-radius: 10px;
  padding: 6px 10px;
  display: grid;
  place-items: center;
  min-width: 56px;
  min-height: 40px;
  cursor: pointer;
  user-select: none;
  &:hover { opacity: 0.9; }
`
const Empty = styled.div`
  opacity: 0.7;
  margin-top: 8px;
  font-family: ${(p) => p.theme.fonts.pixel};
`
const CardFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding-top: 16px;
  gap: 12px;
`
const FooterButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.pixel};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
`
const Input = styled(Field)`
  flex: 1;
  padding: 8px 10px;
  border: 2px solid ${(p) => p.theme.colors.black};
  border-radius: 10px;
  background: #fff;
  font-family: ${(p) => p.theme.fonts.pixel};
  font-size: 1rem;
`
const Save = styled.button`
  padding: 8px 12px;
  border: 2px solid ${(p) => p.theme.colors.black};
  border-radius: 10px;
  background: #fff;
  font-family: ${(p) => p.theme.fonts.pixel};
`
const Back = styled.button`
  padding: 8px 12px;
  border: 2px solid ${(p) => p.theme.colors.black};
  border-radius: 10px;
  background: ${(p) => p.theme.colors.light_grey};
  font-family: ${(p) => p.theme.fonts.pixel};
`

/* ---------- props (no required reorder props) ---------- */
type Props = {
  todos: TodoObject[]
  loading: boolean
  addTodo: (name: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
  // optional to avoid breaking callers that still pass them
  reorderLocal?: (from: number, to: number) => void
  reorderTodosBulk?: (items: { id: string; order: number }[]) => void
}

const ToDoListCard: React.FC<Props> = ({
  todos,
  loading,
  addTodo,
  deleteTodo,
  completeTodo,
}) => {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <MyCard primary style={{ left: '100px' }}>
      <CardHeader>
        <CardTitle>TODO</CardTitle>
      </CardHeader>

      <InsideCardContainer style={{ flexDirection: 'column' }}>
        {!isAdding && !loading && todos.length === 0 && (
          <Empty>no todos yet</Empty>
        )}

        <TodoList>
          {todos.map((t) => (
            <TodoItem key={t.id}>
              <Checkbox
                aria-label={`complete ${t.name}`}
                onChange={() => completeTodo(t.id)}
              />
              <TodoName>{t.name}</TodoName>
              <DeleteButton
                type="button"
                aria-label={`delete ${t.name}`}
                title="Delete"
                onClick={() => deleteTodo(t.id)}
              >
                <CardIcon src={trashIcon} alt="Delete" />
              </DeleteButton>
            </TodoItem>
          ))}
        </TodoList>

        <CardFooter>
          {isAdding ? (
            <Formik
              initialValues={{ text: '' }}
              validate={(v) => (!v.text.trim() ? { text: 'Required' } : {})}
              onSubmit={async (values, { resetForm }) => {
                await addTodo(values.text.trim())
                resetForm()
                setIsAdding(false)
              }}
            >
              {({ isSubmitting, errors }) => (
                <Form style={{ display: 'flex', gap: 12, width: '100%' }}>
                  <Input as={Field} name="text" placeholder="Your todo..." autoFocus />
                  <Save type="submit" disabled={isSubmitting || !!errors.text}>Save</Save>
                  <Back type="button" onClick={() => setIsAdding(false)}>Go back</Back>
                </Form>
              )}
            </Formik>
          ) : (
            <FooterButton type="button" onClick={() => setIsAdding(true)}>
              <CardIcon src={plusIcon} alt="Add" style={{ marginRight: 6 }} /> Add
            </FooterButton>
          )}
        </CardFooter>
      </InsideCardContainer>
    </MyCard>
  )
}

export default ToDoListCard

