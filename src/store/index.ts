import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "@slices/login/login";
import userReducer from "@slices/users/users";
import projectReducer from "@slices/projects/projects";
import vacancieReducer from "@slices/vacancies/vacancies";
import trainingReducer from "@slices/trainings/trainings";
import currentTraining from "@slices/trainings/current-trainings";
import editCurrentTraining from "@slices/trainings/edit-trainings";
import addTraining from "@slices/trainings/add-trainings";
import currentVacancie from "@slices/vacancies/current-vacancies";
import editCurrentVacancie from "@slices/vacancies/edit-vacancies";
import addVacancie from "@slices/vacancies/add-vacancies";
import currentProject from "@slices/projects/current-projets";
import editCurrentProject from "../slices/projects/edit-projects";
import addProject from "@slices/projects/add-projects";
import CurrentUser from "@slices/users/current-users";
import deleteProject from "@slices/projects/delete-projects";
import deleteTraining from "@slices/trainings/delete-trainings";
import deleteVacancie from "@slices/vacancies/delete-vacancies";
import contactRequest from "@slices/contact-request/contact-request";
import currentContact from '@slices/contact-request/current-contact';

export const Store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        project: projectReducer,
        deleteProject: deleteProject,
        vacancie: vacancieReducer,
        training: trainingReducer,
        deleteTraining: deleteTraining,
        currentTraining: currentTraining,
        editCurrentTraining: editCurrentTraining,
        addTraining: addTraining,
        currentVacancie: currentVacancie,
        deleteVacancie: deleteVacancie,
        editcurrentVacnacie: editCurrentVacancie,
        addVacancie: addVacancie,
        currentProject: currentProject,
        editCurrentProject: editCurrentProject,
        addProject: addProject,
        currentUser: CurrentUser,
        contactRequest: contactRequest,
        currentContact: currentContact

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