import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import successIcon from "../shared/images.ts/success.png"

export const SuccessResponse: React.FC<any> = (props) => {

    const {navigate,isLoading, isSuccess, defaultState } = props;
    const dispatch = useAppDispatch()
    const navigation= useNavigate()
    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                dispatch(defaultState())
                navigation(`/${navigate}`)
            }, 1000);

    }, [isSuccess])

    if (isSuccess) {
        return (
            <div style={{position:"absolute",left:"50%",top:"40%",zIndex:"99"}}>
                <p style={{width:"100px",height:"100px"}}><img src={successIcon} /></p>
            </div>
        )
    }

    if(isLoading){
        return (
            <div style={{position:"absolute",left:"50%",top:"40%",zIndex:"99"}}>
                <p style={{width:"200px",height:"200px"}}><Spin/></p>
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}