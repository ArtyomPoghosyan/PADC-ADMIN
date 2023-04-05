import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooks";
import { ISuccessResponse } from "@models/common";

export const SuccessResponse: React.FC<ISuccessResponse> = (props:ISuccessResponse) => {

    const { navigate, isLoading, isSuccess, defaultState } = props;
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                dispatch(defaultState())
                navigation(`/${navigate}`)
            }, 1000);

    }, [isSuccess])

    if (isSuccess) {
        return (
            <div style={{ position: "absolute", left: "50%", top: "30%", zIndex: "9999" }}>
                <div className="SucessContainer">
                    <div className="w3-modal-icon w3-modal-success animate">
                        <span className="w3-modal-line w3-modal-tip animateSuccessTip"></span>
                        <span className="w3-modal-line w3-modal-long animateSuccessLong"></span>
                        <div className="w3-modal-placeholder"></div>
                        <div className="w3-modal-fix"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div style={{ position: "absolute", left: "50%", top: "40%", zIndex: "99" }}>
                <p style={{ width: "200px", height: "200px" }}><Spin /></p>
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}