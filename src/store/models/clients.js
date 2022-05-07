import axios from "axios";
export default {
    state : {
        clients:[]
    },

    getters : {
        getClients:(state)=>state.clients
    },
    
    mutations : {
        setClients:(state,data)=>{state.clients=data}
    },
    
    actions : {
        async fetchAllClients({commit}){
            const res=await axios.get("http://localhost:8888/clients");
            commit('setClients',res.data)
        }
    }
}