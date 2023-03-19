import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "../slices/login/login-Slice";
import userReducer from "../slices/user/user-Slice";
import projectReducer from "../slices/project/project-Slice";
import vacancieReducer from "../slices/vacancies/vacancie-Slice";
import trainingReducer from "../slices/training/training-Slice";
import currentTraining from "../slices/training/current-Training-Slice";
import editCurrentTraining from "../slices/training/edit-Training-Slice";
import addTraining from "../slices/training/add-Training-Slice";
import currentVacancie from "../slices/vacancies/current-Vacancie-Slice";
import editCurrentVacancie from "../slices/vacancies/edit-Vacancie-Slice";
import addVacancie from "../slices/vacancies/add-Vacancie-slice";
import currentProject from "../slices/project/current-Projet-Slice";
import editCurrentProject from "../slices/project/edit-Project-Slice";
import addProject from "../slices/project/add-Project-Slice";

export const Store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        project:projectReducer,
        vacancie:vacancieReducer,
        training:trainingReducer,
        currentTraining:currentTraining,
        editCurrentTraining:editCurrentTraining,
        addTraining:addTraining,
        currentVacancie:currentVacancie,
        editcurrentVacnacie:editCurrentVacancie,
        addVacancie:addVacancie,
        currentProject:currentProject,
        editCurrentProject:editCurrentProject,
        addProject:addProject
    },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;