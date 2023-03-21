import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/auth/login";
import { Registration } from "../pages/auth/registration";
import { DashBoard } from "../pages/dashboard";
import { MainPage } from "../pages/main";
import { AddProject, AllProjects, CurrentProject } from "../pages/project";
import { AddTraining, AllTrainings, CurrentTraining } from "../pages/training";
import { AllUsers, CurrentUser } from "../pages/user";
import { AddVacancie, CurrentVacancie } from "../pages/vacancies";
import { AllVacancies } from "../pages/vacancies/all-vacancies";

export const Routers: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="/" element={<MainPage />}>
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="users" element={<AllUsers />} />
                    <Route path="users/:id" element={<CurrentUser />} />
                    <Route path="trainings" element={<AllTrainings />} />
                    <Route path="trainings/:id" element={<CurrentTraining />} />
                    <Route path="trainings/add" element={<AddTraining />} />
                    <Route path="projects" element={<AllProjects />} />
                    <Route path="projects/:id" element={<CurrentProject />} />
                    <Route path="projects/add" element={<AddProject />} />
                    <Route path="vacancies" element={<AllVacancies />} />
                    <Route path="vacancies/:id" element={<CurrentVacancie />} />
                    <Route path="vacancies/add" element={<AddVacancie />} />

                </Route>
            </Routes>
        </div>
    )
}