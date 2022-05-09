<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light w-100 shadow-sm">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img src="@/assets/logo_devox.png">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link rounded" to="/ajouter/projet">Nouveau Projet</router-link>
                    <router-link class="nav-link rounded" to="/clients">Liste des Clients</router-link>
                    <router-link @click="logout" class="nav-link rounded" to="/">
                        Logout<i class="fa-solid fa-arrow-right-from-bracket ms-1"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name:"NavBar",
    methods:{
        logout(){
            sessionStorage.clear()
            location.reload()
        },
    },
}
</script>

<style>
    .navbar-brand img{
        width: 120px;
        height: 70px;
    }
    .nav-link:hover{
        background:rgb(239, 107, 41);
        color:white !important;
        font-size: bolder !important;
    }
</style>