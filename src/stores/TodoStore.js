import { v4 as uuidv4 } from 'uuid'
import { types as t } from 'mobx-state-tree'
import { prettyPrint } from './utils'

const state = {
  list: [
    {
      id: uuidv4(),
      title: 'potato'
    }
  ]
}

const TodoModel = t
  .model('TodoModel', {
    id: t.string,
    title: t.string,
    isCompleted: t.optional(t.boolean, false),
    isFavorite: t.optional(t.boolean, false)
  })
  .actions(self => ({
    toggleCompleted() {
      self.isCompleted = !self.isCompleted
    },
    toggleFavorite() {
      self.isFavorite = !self.isFavorite
    }
  }))

const TodoListModel = t
  .model('TodoListModel', {
    list: t.array(TodoModel)
  })
  .views(self => ({
    get favoriteList() {
      return self.list.filter(item => item.isFavorite)
    }
  }))
  .actions(store => ({
    add(title) {
      store.list.unshift({
        id: uuidv4(),
        title
      })
    }
  }))

const todoList = TodoListModel.create()

todoList.add('el 1')
todoList.add('el 2')
todoList.add('el 3')
todoList.add('el 4')

todoList.list[0].toggleCompleted()
todoList.list[2].toggleFavorite()
todoList.list[1].toggleFavorite()
prettyPrint(todoList.favoriteList)

console.log('-------------------')
