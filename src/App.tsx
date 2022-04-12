import React, {useState} from 'react';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import {CounterInterface} from "./components/CoounterInterface/CounterInterface";


function App() {

    const [startValue, setStartValue] = useState(1);
    const [maxValue, setMaxValue] = useState(5);
    const [counter, setCounter] = useState(startValue);
    const [editMode, setEditMode] = useState(false);
    const [editCounter, setEditCounter] = useState(false)

    const onIncrement = () => {
        setCounter(counter => counter + 1)
    }
    const onReset = () => {
        setCounter(startValue)
    }

    const logicInput = maxValue < 0 || startValue < 0 || startValue > maxValue || maxValue === startValue

    return (
        <div className={s.grid}>
            {editCounter ?
                <CounterInterface
                    startValue={startValue}
                    maxValue={maxValue}
                    setCounter={setCounter}
                    setMaxValue={setMaxValue}
                    setStartValue={setStartValue}
                    disabledValue={logicInput}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    logicInput={logicInput}
                    setEditCounter={setEditCounter}
                />
                : <Counter
                    disabledValue={counter === maxValue}
                    counter={counter}
                    maxValue={maxValue}
                    onIncrement={onIncrement}
                    onReset={onReset}
                    editMode={editMode}
                    logicInput={logicInput}
                    setEditCounter={setEditCounter}
                />
            }
        </div>
    );
}

export default App;
