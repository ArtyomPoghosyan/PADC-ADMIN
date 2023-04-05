import { useAppDispatch } from "@hooks/hooks";
import { IResponse } from "@models/common";
import { Result, Spin } from "antd";
import { useEffect, useState } from "react";

export const Response: React.FC<IResponse> = (props:IResponse) => {
    const dispatch = useAppDispatch();
    console.log(props)
    const { isLoading, isSuccess, error } = props.data
    const [errorTitle, setErrorTitle] = useState("");

    useEffect(() => {
        if (error || isSuccess) {
            setTimeout(() => {
                dispatch(props.defaultState())
            }, 3000);
            setErrorTitle(error)
        }
    }, [error, isSuccess]);

    if (isSuccess) {
        return <Result
            status="success"
            title="Success" />
    }

    if (error) {
        return <Result
            status="403"
            title={errorTitle} />
    }

    if (isLoading) {
        return <p><Spin /> </p>
    }

    return (
        <div>

        </div>
    )
};