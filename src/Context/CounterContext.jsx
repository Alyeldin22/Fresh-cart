import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props){
    
    const[counter,setCounter]=useState(0);
    function changeCount(){
        setCounter(Math.random());
    }


    return <CounterContext.Provider value={ {counter  , changeCount} }>
       {props.children}
    </CounterContext.Provider>
}