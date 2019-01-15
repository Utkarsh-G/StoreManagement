//store

class Store {
    constructor(reducer){
        this.state
        this.listeners = []
        this.reducer = reducer
    }



    getState(){
        return this.state
    }

    subscribe(callback) {
        this.listeners.push(callback)
        return ()=>{this.listeners=this.listeners.filter(listener => listener !== callback)}
    }

    triggerListeners(){
        this.listeners.forEach(listener => {
            listener();
        });
    }

    //Dispatcher calls reducer on current state and given action. And activates listeners
    dispatcher(action){
        this.state = this.reducer(this.state, action)
        this.triggerListeners()
        //console.log(`The new state is ${this.state}`)

    }
}



//Action: 
const ADD_NAME = 'ADD_NAME'
const myAction = { type: ADD_NAME, name: "Utkarsh"}
const myAction2 = { type: ADD_NAME, name: "Kristoff"}
const myAction3 = { type: ADD_NAME, name: "Sanjay"}
const myAction4 = { type: ADD_NAME, name: "Leo"}
const myAction5 = { type: ADD_NAME, name: "Andrew"}

//Reducer:

const namer = (state = [], action)=>{
    //console.log("Reducing")
    //console.log(`The old state is ${state} and action is ${action.type} and ${action.name}` )
    if(action.type === ADD_NAME){
        //console.log ("inside right action type")
        //console.log(state.concat([action.name]))
        return state.concat([action.name])
    }

    return state
}

const  newStore = new Store(namer)
newStore.getState()
const unsub = newStore.subscribe(()=>{console.log("Listener Triggered")})
newStore.triggerListeners()
console.log(newStore.getState())
newStore.dispatcher(myAction)
console.log(newStore.getState())
newStore.dispatcher(myAction2)
console.log(newStore.getState())
newStore.dispatcher(myAction3)
console.log(newStore.getState())