import React, { useMemo, useState } from 'react'
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

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { TodoObject } from '../models/todo/type'

type Props = {
  todos: TodoObject[]
  loading: boolean
  addTodo: (name: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
  reorderLocal: (from: number, to: number) => void
  reorderTodosBulk: (items: { id: string; order: number }[]) => void
}

const ToDoListCard: React.FC<Props> = ({
  todos,
  loading,
  addTodo,
  deleteTodo,
  completeTodo,
  reorderLocal,
  reorderTodosBulk,
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const ids = useMemo(() => todos.map((t) => t.id), [todos])

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return

    if (over.id === 'trash') {
      deleteTodo(String(active.id))
      return
    }

    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(String(active.id))
      const newIndex = ids.indexOf(String(over.id))
      if (oldIndex < 0 || newIndex < 0) return

      reorderLocal(oldIndex, newIndex)

      const newList = arrayMove(todos, oldIndex, newIndex)
      const payload = newList.map((t, i) => ({ id: t.id, order: i }))
      reorderTodosBulk(payload)
    }
  }

  return (
    <MyCard primary style={{ left: '100px' }}>
      <CardHeader>
        <CardTitle>TODO</CardTitle>
      </CardHeader>

      <InsideCardContainer style={{ flexDirection: 'column' }}>
        {!isAdding && !loading && todos.length === 0 && (
          <Empty>no todos yet</Empty>
        )}

        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <TodoList>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {todos.map((t) => (
                <SortableTodo key={t.id} id={t.id}>
                  <TodoItem>
                    <Checkbox
                      aria-label={`complete ${t.name}`}
                      onChange={() => completeTodo(t.id)}
                    />
                    {t.name}
                  </TodoItem>
                </SortableTodo>
              ))}
            </SortableContext>
          </TodoList>

          <CardFooter>
            {isAdding ? (
              <Formik
                initialValues={{ text: '' }}
                validate={(v) => (!v.text.trim() ? { text: 'Required' } : {})}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await addTodo(values.text.trim())

                    resetForm()
                    setIsAdding(false)
                  } catch (e) {
                    console.error('SUBMIT FEL:', e)
                  }
                }}
              >
                {({ isSubmitting, errors }) => (
                  <Form style={{ display: 'flex', gap: 12, width: '100%' }}>
                    <Input
                      as={Field}
                      name="text"
                      placeholder="Your todo..."
                      autoFocus
                    />
                    <Save
                      type="submit"
                      disabled={isSubmitting || !!errors.text}
                    >
                      Save
                    </Save>
                    <Back type="button" onClick={() => setIsAdding(false)}>
                      Go back
                    </Back>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <FooterButton type="button" onClick={() => setIsAdding(true)}>
                  <CardIcon
                    src={plusIcon}
                    alt="Add"
                    style={{ marginRight: 6 }}
                  />{' '}
                  Add
                </FooterButton>
                <TrashDrop id="trash">
                  <CardIcon src={trashIcon} alt="Delete" />
                </TrashDrop>
              </>
            )}
          </CardFooter>
        </DndContext>
      </InsideCardContainer>
    </MyCard>
  )
}

export default ToDoListCard

/* ---------- Sortable wrapper ---------- */
function SortableTodo({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

/* ---------- styles ---------- */
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
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`
const Empty = styled.div`
  opacity: 0.7;
  margin-top: 8px;
  font-family: ${(p) => p.theme.fonts.pixel};
`
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
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
const TrashDrop = styled.div.attrs({ role: 'button' })`
  border: 2px dashed ${(p) => p.theme.colors.black};
  border-radius: 10px;
  padding: 6px 10px;
  display: grid;
  place-items: center;
  min-width: 56px;
  min-height: 40px;
  user-select: none;
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
