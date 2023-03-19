import { Button } from "antd";
import { useState } from "react";

export const ButtonLoading = (props) => {  
    
    return (
        <div>
            <Button style={{width:"110px"}}  type={props.type} htmlType={props.htmlType} loading={props.isLoading}>
                Edit
            </Button>
        </div>
    )
}


