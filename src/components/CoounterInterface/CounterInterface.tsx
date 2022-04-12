import React, {ChangeEvent, FC, useEffect} from 'react';
import s from './CounterInterface.module.css';
import {Button} from "@mui/material";
import SuperInputText from "../c1-SuperInputText/SuperInputText";

export const values = {
    maxCounterValue: 'MAX_COUNTER_VALUE',
    startCounterValue: 'START_COUNTER_VALUE'
}

export type CounterInterfacePropsType = {
    startValue: number
    maxValue:number
    setCounter: (value:number) => void
    setMaxValue: (value:number) => void
    setStartValue: (value:number) => void
    disabledValue: boolean
    editMode: boolean
    setEditMode: (value:boolean) => void
    logicInput: boolean
    setEditCounter: (value: boolean) => void
}

export const CounterInterface:FC<CounterInterfacePropsType> = (
    {
        setCounter,
        startValue,
        maxValue,
        setStartValue,
        setMaxValue,
        disabledValue,
        editMode,
        setEditMode,
        logicInput,
        setEditCounter
    }
) => {

    useEffect(() => {
        let maxCounterAsString = localStorage.getItem(values.maxCounterValue)
        let startCounterAsString = localStorage.getItem(values.startCounterValue)
        if(maxCounterAsString && startCounterAsString) {
            let newMaxValue = JSON.parse(maxCounterAsString)
            let newStartValue = JSON.parse(startCounterAsString)
            setMaxValue(newMaxValue)
            setStartValue(newStartValue)
        }
    }, [])

    const onChangeStartValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setStartValue(JSON.parse(e.currentTarget.value))
        setEditMode(true)
    }

    const onChangeMaxValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setMaxValue(JSON.parse(e.currentTarget.value))
        setEditMode(true)
    }

    const onSetValuesHandler = () => {
        localStorage.setItem(values.maxCounterValue, JSON.stringify(maxValue))
        localStorage.setItem(values.startCounterValue, JSON.stringify(startValue))
        setCounter(startValue)
        setEditMode(false)
        setEditCounter(false)
    }

    return (
        <div className={s.container}>
            <div className={s.values}>
                <div className={s.maxValue}>
                    <span>max value</span>
                    <SuperInputText  className={logicInput ? s.inputStyleRed : s.inputStyle} type={'number'} value={maxValue} onChange={onChangeMaxValueHandler}/>
                </div>
                <div className={s.startValue}>
                    <span>start value</span>
                    <SuperInputText className={logicInput ? s.inputStyleRed : s.inputStyle} type={'number'} value={startValue} onChange={onChangeStartValueHandler}/>
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