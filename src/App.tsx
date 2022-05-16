import React from 'react';
import {useSelector} from "react-redux";
import {Counter} from "./components/Counter/Counter";
import {CounterInterface} from "./components/CoounterInterface/CounterInterface";
import {StateType} from "./bll/counterReducer";
import {AppStateType} from "./bll/store";

import s from './App.module.css';


function App() {

    const counter = useSelector<AppStateType, StateType>(state => state.counter)
    const logicInput = counter.maxValue < 0 || counter.startValue < 0 || counter.startValue > counter.maxValue || counter.maxValue === counter.startValue

    return (
        <div className={s.grid}>
            {counter.editCounter ?
                <CounterInterface
                    disabledValue={logicInput}
                    logicInput={logicInput}
                />
                : <Counter
                    disabledValue={counter.count === counter.maxValue}
                    logicInput={logicInput}
                />
            }
        </div>
    );
}

export default App;
