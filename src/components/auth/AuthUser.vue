<template>
  <div class="container">
        <div class="row justify-content-center px-2">
            <div class="col-xs-6 col-md-4 rounded shadow-lg text-center mt-5 pb-2">
                <div class="row justify-content-between mb-3">
                    <div  class="col p-2 rounded-top auth active">
                        <h6>Login</h6>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col-12 form-floating">
                        <input v-model="username" type="text" class="form-control" id="floatingInput1" >
                        <label for="floatingInput1">Username</label>
                    </div> 
                    <div class="col-12 form-floating">
                        <input v-model="password" type="password" class="form-control" id="floatingInput2" >
                        <label for="floatingInput2">Password</label>
                    </div>
                </div>
                
                <div v-if="err!=''" class="alert alert-danger">{{err}}</div>
                <div v-if="msg!=''" class="alert alert-success">{{msg}}</div> 
                 
                <button v-else @click="loginUser" class="btn btn-primary">login</button> 
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            username:"",
            password:"",
            url:"http://localhost:8888/auth/",
            msg:"",
            err:"",
        }
    },
    methods:{
        // registerUser(){
        //     if(this.username===""||this.password===""||this.confirm_password===""){
        //         this.err="Veuillez remplir tous les champs"
        //         return
        //     }
        //     if(this.password!==this.confirm_password){
        //         this.err="Password doesn't match"
        //         return
        //     }
        //     axios.post(this.url+"register",{
        //         username:this.username,
        //         password:this.password
        //     })
        //     .then(res=>{
        //         console.log(res.data);
        //         this.err=""
        //         this.msg="registered successfully"
        //     })
        //     .catch(err=>{
        //         this.msg=""
        //         this.err=err.response.data
        //         })
        // },
        loginUser(){
            if(this.username===""||this.password===""){
                this.err="Veuillez remplir tous les champs"
                return
            }
            axios.post(this.url+"login",{
                username:this.username,
                password:this.password
            })
            .then(res=>{
                console.log(res.data);
                this.err=""
                this.msg="Login successfully"
                sessionStorage.setItem("id",res.data._id)
                sessionStorage.setItem("nom",res.data.username)
                this.$router.push('/')
            })
            .catch(err=>{
                this.msg=""
                this.err=err.response.data
                })
        },
    },
    mounted(){
        if(sessionStorage.getItem('id')!==null){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .active{
        background: rgb(239, 107, 41);
        color: white;
    }
    .alert{
        margin-top: 15px;
    }
    button{float: right;margin: 15px 0;}
</style>