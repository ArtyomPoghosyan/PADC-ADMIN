import { Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks";

export const Response: React.FC<any> = (props) => {
    console.log("helo")
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, error } = props.data
    const [errors, setError] = useState("")
    useEffect(() => {
        if (error || isSuccess) {
            setTimeout(() => {
                console.log('asdfff')
                dispatch(props.defaultState())
            }, 3000);
            // console.log('privet putin')
            // dispatch(props.defaultState())
            setError(error)
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
            title={errors} />
    }

    if (isLoading) {
        return <p><Spin /> </p>
    }

    return (
        <div>

        </div>
    )
};