import { combineReducers } from 'redux';
import ListExam from './ListExam';
import ListSubject from './ListSubject';
import detailExam from './detailExam';
import ListQuestion from './ListQuestion';
import ListAnswer from './ListAnswer';
import Login from './Login'

var TodoList = combineReducers({
    ListExam,ListSubject,detailExam,ListQuestion,ListAnswer,Login
})

export default TodoList;