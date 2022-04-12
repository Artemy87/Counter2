import React, {FC} from 'react';
import {Button} from "@mui/material";
import s from './Counter.module.css';
import {IncorrectValueError} from "../IncorrectValueError/IncorrectValueError";

export type CounterPropsType = {
    disabledValue: boolean
    counter: number
    maxValue: number
    onIncrement: () => void
    onReset: () => void
    editMode: boolean
    logicInput: boolean
    setEditCounter: (value:boolean) => void
}

export const Counter:FC<CounterPropsType> = (
    {
        disabledValue,
        counter,
        maxValue,
        onIncrement,
        onReset,
        editMode,
        logicInput,
        setEditCounter
    }
) => {

    const onIncrementHandler = () => {
        onIncrement()
    }
    const onResetHandler = () => {
        onReset()
    }

    const onClickEditCounterHandler = () => {
        setEditCounter(true)
    }

    return (
        <div className={s.container}>
            { logicInput
                ? <IncorrectValueError />
                : editMode ? <div>Enter! Set value!</div>
                : <div className={counter !== maxValue ? s.counter : s.counterRed}>{counter}</div>
            }

            <div className={s.buttons}>
                <Button variant="contained" size="large"  color="success"
                        disabled={editMode || disabledValue}
                        onClick={onIncrementHandler}>inc</Button>
                <Button variant="contained" size="large" color="success"
                        onClick={onResetHandler}>reset</Button>
                <Button variant="contained" size="large" color="success"
                        onClick={onClickEditCounterHandler}>set</Button>
            </div>
        </div>
    );
};