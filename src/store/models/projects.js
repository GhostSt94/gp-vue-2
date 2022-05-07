import axios from "axios";
export default {
    state : {
        projects:[],
        project:{}
    },

    getters : {
        getProjects:(state)=>state.projects,
        getProject:(state)=>state.project
    },
    
    mutations : {
        setProjects:(state,data)=>{state.projects=data},
        setProject:(state,data)=>{state.project=data}
    },
    
    actions : {
        async fetchAllProjects({commit}){
            const res=await axios.get("http://localhost:8888/projects");
            commit('setProjects',res.data)
        },
        async fetchProject({commit},id){
            const res=await axios.get(`http://localhost:8888/projects/${id}`)
            commit('setProject',res.data)
        }
    }
}