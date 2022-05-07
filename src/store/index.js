import { createStore } from 'vuex'
import clients from "./models/clients";
import projects from "./models/projects";

export default createStore({
    modules:{clients,projects}
})



