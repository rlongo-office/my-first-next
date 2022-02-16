import * as Types from '../types/rpg-types'
import { createContext, useContext, useState,useReducer } from 'react';
import creaturesData from '../data/collections/creatures.json'
import * as React from 'react'


interface AnyObject {
  [key: string]: any
}

type AppProviderProps = {
  children: React.ReactNode
}

export const initialState ={
    creatures:creatures,
    actors:[],
    testMessage:[],
    recordID:{creaturePageID:-1} //Decided on an object that holds all the relevant PageIDs
}
const AppContext = React.createContext<any | undefined>(undefined)

export const appReducer = (state=initialState, action) => {
    const {type, payload} = action
    //const {creatures,actors,testMessage,creatureID} = state
     switch(type){
         case Types.ADD_ACTOR:
             //Need to change the objID for this record
             let index = state.actors.length   //since we are 0 based, length actually gives us current position
             let newObjID = index + payload.name  //should be unique enough for our purposes
             payload._id["$oid"] = newObjID
             console.log(payload)
             return {...state,
                actors:[...actors,payload]
            }
         case Types.ADD_CREATURE:
            console.log("Add creature action type called in Reducer")
             return {
                ...state,
                testMessage:[...state?.testMessage,"ADD_CREATURE"]
            }
        case Types.SET_CREATURE_ID:
          console.log(payload)
            return{
                ...state,
                recordID:{
                  creaturePageID:payload
                }
            }
          default: return state;
     }
 };

function AppProvider({children}:AppProviderProps){
    const [creatures,setCreatures] = React.useState(creaturesData)
    const [actors,setActors] = React.useState([])
    const [creatuePageIDS, setCreaturePageIDS] = React.useState(-1)

    const value = React.useMemo(() => ({
      creatures,setCreatures,actors,setActors,creatuePageIDS,setCreaturePageIDS
    }), [creatures,actors,creatuePageIDS])

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    )
  
  }

export function useAppContext() {
    const store = useContext(AppContext)
    if (!store) {
      throw ('Store is not defined')
    }
    return store;
  }

  
  export default {initialState,appReducer,useAppContext,AppProvider};