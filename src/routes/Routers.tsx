import { Route, Routes } from "react-router-dom";
import { DashBoardPage } from "src/pages/dashBoardPage";
import { CurrentProjectPage } from "src/pages/projectPage/currentProjectPage";
import { AddTrainingPage } from "src/pages/trainingPage/addTrainingPage";
import { CurrentUserPage } from "src/pages/userPage/currentUserPage";
import { AddVacanciePage } from "src/pages/vacanciesPage/addVacanciesPage";
import { CurrentVacanciePage } from "src/pages/vacanciesPage/currentVacanciePage";
import { LoginPage } from "../pages/auth/login";
import { RegistrationPage } from "../pages/auth/registration";
import { MainPage } from "../pages/main";
import { ProjectPage } from "../pages/projectPage";
import { TrainingPage } from "../pages/trainingPage";
import {  CurrentTrainingPage } from "../pages/trainingPage/currentTrainingPage";
import { UserPage } from "../pages/userPage";
import { VacanciePage } from "../pages/vacanciesPage/allVacanciesPage";

export const Routers: React.FC = () => {
    return (
        <div>
            <Routes>

                <Route path="/" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="/" element={<MainPage />}>
                    <Route path="dashboard" element={<DashBoardPage />} />
                    <Route path="users" element={<UserPage />} />
                        <Route path="users/:id" element={<CurrentUserPage />} />
                    <Route path="trainings" element={<TrainingPage />} />
                        <Route path="trainings/:id" element={<CurrentTrainingPage />} />
                        <Route path="trainings/add" element={<AddTrainingPage />}/>
                    <Route path="projects" element={<ProjectPage />} />
                        <Route path="projects/:id" element={<CurrentProjectPage />} />
                    <Route path="vacancies" element={<VacanciePage />} />
                        <Route path="vacancies/:id" element={<CurrentVacanciePage />} />
                        <Route path="vacancies/add" element={<AddVacanciePage />} />

                </Route>
            </Routes>
        </div>
    )
}