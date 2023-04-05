import { IButtonResponse } from "@models/common";
import { Button } from "antd";

export const ButtonLoading:React.FC<IButtonResponse> = (props:IButtonResponse) => {  
    return (
        <div>
            <Button style={{width:"250px"}}  type={props.type} htmlType={props.htmlType} loading={props.loading}>
                Edit
            </Button>
        </div>
    )
}


