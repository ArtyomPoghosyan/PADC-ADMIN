import { Button } from "antd";
import { useState } from "react";

export const ButtonLoading = (props) => {     
    return (
        <div>
            <Button style={{width:"250px"}}  type={props.type} htmlType={props.htmlType} loading={props.loading}>
                Edit
            </Button>
        </div>
    )
}


