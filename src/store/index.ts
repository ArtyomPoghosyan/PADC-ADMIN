import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "../feature/login/loginSlice";
import userReducer from "../feature/user/userSlice";
import projectReducer from "../feature/project/projectSlice";
import vacancieReducer from "../feature/vacancies/vacancieSlice";
import trainingReducer from "../feature/training/trainingSlice";
import currentTraining from "../feature/training/currentTrainingPageSlice";
import editCurrentTraining from "../feature/training/editCurrentTrainingApi";
import addTraining from "../feature/training/addTrainingPageSlice";
import currentVacancie from "../feature/vacancies/currentVacanciePageSlice";
import editCurrentVacancie from "../feature/vacancies/editCurrentVacancieSlice";
import addVacancie from "../feature/vacancies/addVacanciePageslice";

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
        addVacancie:addVacancie
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