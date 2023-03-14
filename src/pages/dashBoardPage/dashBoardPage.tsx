import { ChartBar, DoughnutBar, LineBar } from "src/shared/Charts";
import dashboardStyle from "./dashBoardStyle.module.css";

export const DashBoardPage: React.FC = () => {

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