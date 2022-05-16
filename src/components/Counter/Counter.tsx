import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {IncorrectValueError} from "../IncorrectValueError/IncorrectValueError";
import {
    resetAC,
    setCounterAC,
    setEditCounterAC,
    StateType
} from "../../bll/counterReducer";
import {AppStateType} from "../../bll/store";
import s from './Counter.module.css';

export type CounterPropsType = {
    disabledValue: boolean
    logicInput: boolean
}

export const Counter: FC<CounterPropsType> = ({disabledValue, logicInput}) => {

    const counter = useSelector<AppStateType, StateType>(state => state.counter)

    const dispatch = useDispatch();

    const onSetCounterHandler = () => {
        dispatch(setCounterAC())
    }
    const onResetHandler = () => {
        dispatch(resetAC())
    }

    const onEditCounterHandler = () => {
        dispatch(setEditCounterAC(true))
    }

    return (
        <div className={s.container}>
            {logicInput
                ? <IncorrectValueError/>
                : counter.editMode ? <div>Enter! Set value!</div>
                    : <div className={counter.count !== counter.maxValue ? s.counter : s.counterRed}>
                        {counter.count}
                    </div>
            }

            <div className={s.buttons}>
                <Button variant="contained" size="large" color="success"
                        disabled={counter.editMode || disabledValue}
                        onClick={onSetCounterHandler}>inc</Button>
                <Button variant="contained" size="large" color="success"
                        onClick={onResetHandler}>reset</Button>
                <Button variant="contained" size="large" color="success"
                        onClick={onEditCounterHandler}>set</Button>
            </div>
        </div>
    );
};