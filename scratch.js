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
const addNameAction = (name) => ({
    type:ADD_NAME,
    name:name
})

const myAction = addNameAction("Utkarsh")
const myAction2 = addNameAction("Kristoff")
const myAction3 = addNameAction("Sanjay")
const myAction4 = addNameAction("Rom")
const myAction5 = addNameAction("Leo")

//Reducer:

const namer = (state = [], action)=>{
    if(action.type === ADD_NAME){
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
newStore.dispatcher(myAction4)
console.log(newStore.getState())
newStore.dispatcher(myAction5)
console.log(newStore.getState())