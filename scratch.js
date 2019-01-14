//store

class Store {
    constructor(){
        this.state = {
            status: 1
        }

        this.listeners = []
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
}

const  newStore = new Store
newStore.getState()
const unsub = newStore.subscribe(()=>{console.log("Listener Triggered")})
newStore.triggerListeners()