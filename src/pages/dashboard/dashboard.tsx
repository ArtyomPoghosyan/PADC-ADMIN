import { ChartBar, DoughnutBar, LineBar } from "@components/charts";
import dashboardStyle from "./dashboard.module.css";

export const DashBoard: React.FC = () => {

    return (
        <div className={dashboardStyle.dashboard_container}>
            <div className={dashboardStyle.bar_doughnut_continer}>
                <ChartBar />
                <DoughnutBar />
            </div>
            <div className={dashboardStyle.lineBar_container}>
                <LineBar />
            </div>
        </div>
    )
}