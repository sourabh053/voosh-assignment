import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import tasksReducer from './tasksSlice';
import alltasksReducer from './allTasksSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    allTasks: alltasksReducer,
  },
});

export default store;