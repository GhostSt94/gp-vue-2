<template>
    <div class="container pt-4">
        <i @click="goHome" class="fa-solid fa-arrow-left-long float-start text-secondary back m-2"></i>
        <h4 class="ms-5">Liste des Clients <i class="fa-solid fa-plus btn btn-outline-primary rounded-pill ms-1" @click="goToAddPage"></i></h4>
        <div class="row pt-3">
            <div @click="goToDetails(cl._id)" v-for="cl in clients" :key="cl._id" class="col-3 m-2 p-2 bg-white rounded shadow-sm client">
                {{cl.nom}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            clients:[]
        }
    },
    methods:{
        goHome(){
            this.$router.push("/")
        },
        goToAddPage(){
            this.$router.push("/ajouter/client")
        },
        goToDetails(id){
            this.$router.push(`/clients/${id}`)
        },
        getClientsAll(){
            axios.get('http://localhost:8888/clients')
            .then(res=>{this.clients=res.data})
            .catch(err=>console.log(err))
        }
    },
    mounted(){
        if(sessionStorage.getItem('id')===null){
            this.$router.push('/auth')
        }
        this.getClientsAll()
    }
}
</script>

<style scoped>
    .client{
        color:grey;
    }
    .client:hover{
        cursor: pointer;color: rgb(239, 107, 41);font-weight: bold;
    }
</style>