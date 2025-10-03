import type { RootState } from '../models'
import type { TodoObject } from '../models/todo/type'

interface DashboardState {
  todos: Array<TodoObject>
  currentUser: string
  petName: string
  petHealth: number
  petColor: string
}

export function mapStateToDashboardProps(state: RootState): DashboardState {
  return {
    todos: state.todo.todoList,
    currentUser: state.user.userID ?? '',
    petName: state.pet.name ?? 'PetName',
    petHealth: state.pet.health ?? 0,
    petColor: state.pet.color,
  }
}
