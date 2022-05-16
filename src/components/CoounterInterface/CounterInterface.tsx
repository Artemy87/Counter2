import React, {ChangeEvent, FC, useEffect} from 'react';
import s from './CounterInterface.module.css';
import {Button} from "@mui/material";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {
    setEditCounterAC,
    setEditModeAC,
    setMaxValueAC,
    setStartValueAC,
    StateType
} from "../../bll/counterReducer";

export const values = {
    maxCounterValue: 'MAX_COUNTER_VALUE',
    startCounterValue: 'START_COUNTER_VALUE'
}

export type CounterInterfacePropsType = {
    disabledValue: boolean
    logicInput: boolean
}

export const CounterInterface: FC<CounterInterfacePropsType> = (
    {
        disabledValue,
        logicInput
    }
) => {

    const counter = useSelector<AppStateType, StateType>(state => state.counter)

    const dispatch = useDispatch();

    useEffect(() => {
        let maxCounterAsString = localStorage.getItem(values.maxCounterValue)
        let startCounterAsString = localStorage.getItem(values.startCounterValue)
        if (maxCounterAsString && startCounterAsString) {
            let newMaxValue = JSON.parse(maxCounterAsString)
            let newStartValue = JSON.parse(startCounterAsString)
            dispatch(setMaxValueAC(newMaxValue))
            dispatch(setStartValueAC(newStartValue))
        }
    }, [dispatch])

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartValueAC(JSON.parse(e.currentTarget.value)))
        dispatch(setEditModeAC(true)) // setEditMode(true)
    }

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxValueAC(JSON.parse(e.currentTarget.value)))
        dispatch(setEditModeAC(true)) // setEditMode(true)
    }

    const onSetValuesHandler = () => {
        localStorage.setItem(values.maxCounterValue, JSON.stringify(counter.maxValue))
        localStorage.setItem(values.startCounterValue, JSON.stringify(counter.startValue))
        dispatch(setEditModeAC(false))
        dispatch(setEditCounterAC(false))
    }

    return (
        <div className={s.container}>
            <div className={s.values}>
                <div className={s.maxValue}>
                    <span>max value</span>
                    <SuperInputText
                        className={logicInput ? s.inputStyleRed : s.inputStyle}
                        type={'number'}
                        value={counter.maxValue}
                        onChange={onChangeMaxValueHandler}/>
                </div>
                <div className={s.startValue}>
                    <span>start value</span>
                    <SuperInputText
                        className={logicInput ? s.inputStyleRed : s.inputStyle}
                        type={'number'}
                        value={counter.startValue}
                        onChange={onChangeStartValueHandler}/>
                </div>
            </div>
            <div className={s.button}>
                <Button variant="contained" color="success" size="large"
                        disabled={disabledValue}
                        onClick={onSetValuesHandler}>set</Button>
            </div>
        </div>
    );
};