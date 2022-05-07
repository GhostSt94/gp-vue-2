<template>
    <div class="container pt-4">
        <i @click="goHome" class="fa-solid fa-arrow-left-long float-start text-secondary back m-2"></i>
        <h4 class="ms-5">Liste des Clients <i class="fa-solid fa-plus btn btn-outline-primary rounded-pill ms-1" @click="goToAddPage"></i></h4>
        <div v-if="error===''" class="row pt-3">
            <div @click="goToDetails(cl._id)" v-for="cl in getClients" :key="cl._id" class="col-3 m-2 p-2 bg-white rounded shadow-sm client">
                {{cl.nom}}
            </div>
        </div>
        <div v-else>
            <h6 class="text-danger text-center">{{error}}</h6>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
    data(){
        return{
            error:""
        }
    },
    computed:mapGetters(['getClients']),
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
        ...mapActions(['fetchAllClients'])
    },
    mounted(){
        if(sessionStorage.getItem('id')===null){
            this.$router.push('/auth')
        }
        this.fetchAllClients().catch(err=>{
            this.error="Cannot find Client list"
            console.log(err)
        })
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