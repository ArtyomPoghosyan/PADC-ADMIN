import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "@slices/login/login";
import userReducer from "@slices/user/user";
import projectReducer from "@slices/project/project";
import vacancieReducer from "@slices/vacancies/vacancie";
import trainingReducer from "@slices/training/training";
import currentTraining from "@slices/training/current-training";
import editCurrentTraining from "@slices/training/edit-training";
import addTraining from "@slices/training/add-training";
import currentVacancie from "@slices/vacancies/current-vacancie";
import editCurrentVacancie from "@slices/vacancies/edit-vacancie";
import addVacancie from "@slices/vacancies/add-vacancie";
import currentProject from "@slices/project/current-projet";
import editCurrentProject from "../slices/project/edit-project";
import addProject from "@slices/project/add-project";
import CurrentUser from "@slices/user/current-user";
import deleteProject from "@slices/project/delete-project";
import deleteTraining from "@slices/training/delete-training";
import deleteVacancie from "@slices/vacancies/delete-vacancie";
import contactRequest from "@slices/contact-request/contact-request";
import currentContact from '@slices/contact-request/current-contact';

export const Store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        project:projectReducer,
        deleteProject:deleteProject,
        vacancie:vacancieReducer,
        training:trainingReducer,
        deleteTraining:deleteTraining,
        currentTraining:currentTraining,
        editCurrentTraining:editCurrentTraining,
        addTraining:addTraining,
        currentVacancie:currentVacancie,
        deleteVacancie:deleteVacancie,
        editcurrentVacnacie:editCurrentVacancie,
        addVacancie:addVacancie,
        currentProject:currentProject,
        editCurrentProject:editCurrentProject,
        addProject:addProject,
        currentUser:CurrentUser,
        contactRequest:contactRequest,
        currentContact:currentContact

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