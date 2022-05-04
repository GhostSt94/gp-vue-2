<template>
  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 mt-4 py-4 px-3 rounded shadow">
                <i @click="goHome" class="fa-solid fa-arrow-left-long float-start text-secondary back"></i>
                <h3 class="text-center p-2">Ajouter project</h3>
                <div class="form-floating mb-3">
                    <input v-model="project.nom" type="text" class="form-control" id="floatingInput1" >
                    <label for="floatingInput1">Nom</label>
                </div>
                <div class="row mb-3">
                    <div class="col-3 mb-3">
                        Client
                    </div>
                    <div class="col-9 mb-3">
                        <select v-model="project.client" class="form-select form-select-md">
                            <option value=""></option>
                            <option v-for="cl in clients" :key="cl._id" :value="cl.nom">{{cl.nom}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input v-model="project.date_debut" type="date" class="form-control" id="floatingInput3">
                            <label for="floatingInput3">Date debut</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input v-model="project.date_fin" type="date" class="form-control" id="floatingInput4" >
                            <label for="floatingInput4">Date fin</label>
                        </div>
                    </div>
                </div>  
                <div class="row my-4">
                    <div class="col-md-5">
                        <div class="row">
                            <div class="col-3">
                                Status
                            </div>
                            <div class="col-8">
                                <select v-model="project.status" class="form-select form-select-md">
                                    <option value="Prospecter">Prospecter</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Reception provisoir">Reception provisoir</option>
                                    <option value="Reception définitif">Reception définitif</option>
                                    <option value="Cloturer">Cloturer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="row">
                            <div class="col-md-4">
                                Type de commande
                            </div>
                            <div class="col-md-8">
                                <select @change="toggleGarantie" v-model="project.type_commande" class="form-select form-select-md">
                                    <option value="Marché">Marché</option>
                                    <option value="Bon de commande">Bon de commande</option>
                                    <option value="Marché cadre">Marché cadre</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input v-model="project.montant" type="number" class="form-control" min="0" step="100" id="floatingInput5" >
                            <label for="floatingInput3">Montant DH</label>
                        </div>
                    </div>
                    <div class="col">
                        <div v-if="show_garantie" class="form-floating mb-3">
                            <input v-model="project.garantie" type="number" class="form-control" min="0" step="100" id="floatingInput6">
                            <label for="floatingInput4">Garantie DH</label>
                        </div>
                    </div>
                </div>
                <div v-if="error!=''" class="alert alert-danger">{{error}}</div>
                <div class="float-end">
                    <i v-if="loading" class="fa-solid fa-circle-notch fa-spin mx-3"></i>
                    <button @click="addProject" class="btn btn-primary">Ajouter</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    data(){
        return{
            project:{
                nom:"",
                client:"",
                date_debut:null,
                date_fin:null,
                status:"",
                type_commande:"",
                montant:0,
                garantie:0,
            },
            error:'',
            loading:false,
            show_garantie:false,
            // 
            clients:[]
        }
    },
    methods:{
        goHome(){
            this.$router.push("/")
        },
        addProject(){
            var p=this.project
            if(p.nom===""||p.client===""||p.date_debut===null||p.date_fin===""||p.status===""||p.montant===0){
                this.error="rempliser tous les champs"
                return
            }
            if(this.show_garantie){
                if(p.garantie===0){
                    this.error="ajouter Garantie"
                }
            }
            // check if date debut < date fin
            if(new Date(p.date_fin).setHours(0,0,0,0)-new Date(p.date_debut).setHours(0,0,0,0)<=0){
                this.error="Date fin inférieur à date debut"
                return
            }
            this.loading=true
            this.error=""
            axios.post(`http://localhost:8888/projects`,this.project)
            .then(res=>{
                console.log(res.data);
                this.loading=false
                Swal.fire('Projet Ajouté')
                this.goHome()
            })
            .catch(err=>{
                console.log(err.response);
                this.loading=false
                this.error=err.response.data
            })
        },
        toggleGarantie(){
            if(this.project.type_commande==="Bon de commande"){
                this.show_garantie=true
            }else{
                this.show_garantie=false
            }
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

<style >
    .back:hover{
        cursor: pointer;
        color: black !important;
    }
</style>