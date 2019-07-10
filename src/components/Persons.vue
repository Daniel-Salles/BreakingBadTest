<template>
    <div class="persons">
        <div class="container">
            <div v-if="!searchOn()" class="persons-header">
                <div class="title">
                <h1>Personagens</h1>
                </div>
                <div class="person-filter">
                    <h2 class="items-filter">filtre por:</h2>
                    <button @click="filter(0)" :class="activeSuccess" class="btn btn-success items-filter">Vivo</button>
                    <button @click="filter(1)" :class="activeWarning" class="btn btn-warning items-filter">Morto</button>
                    <button @click="filter(2)" :class="activeNeutral" class="btn btn-neutral items-filter">Todos</button>
                </div>
            </div>
            <h1 v-if="searchOn()" class="search-text">Você pesquisou por: "{{this.$store.state.search_text}}"</h1>
            <div class="person-body"> 
            <div v-for="person in this.$store.state.page_persons" v-bind:key="person.char_id" class="person">
                <img :src="person.img" alt="name" class="img"/>
                <img :src="img" alt="degradê" class="img"/>
                <span class="badge" :class="person.status">{{person.status}}</span>
                <div class="description">
                <h2>{{person.name}}</h2>
                <div class="custom-flex">
                <font-awesome-icon icon="star"/><p class="data">{{person.birthday}}</p>
                </div>
                <div class="custom-flex">
                <p class="occupation" v-for="item in person.occupation" :key="item"> {{item}} </p>
                </div>
                </div>
            </div>
            </div>
            <div class="generic-footer">
                <a class="cursor-pointer" @click="filterPages(item)" v-for="item in this.pagination" :key="item">{{item}}</a>
            </div>/
        </div>
        
    </div>
</template>
<script>
import img from '../assets/img/degrade.png'
export default {
  data() {
    this.retrievePersons();
    return {
        quant_pages:null,
        actual_page:null,
        persons: null,
        filter_persons: null,
        img: img,
        activeSuccess: "",
        activeWarning: "",
        activeNeutral: "btn-active",
        pagination: null
    };
  },
  methods: {
    searchOn(){
        return this.$store.state.search_on;
    },
    retrievePersons() {
      this.$brba.get("/characters").then(res => {
        this.persons = res.data;
        this.filter_persons = res.data;
        this.quant_pages = Math.trunc(res.data.length / 8);
        if(res.data.length % 8>0){
            this.quant_pages += 1;
        }
        this.actual_page = 1;
        this.filterPages();
        this.retrievePagination();
      }).catch(err => {
          this.flashMessage.show({
            status: "error",
            title: "Ocorreu um erro inesperado, aguarde alguns minutos, e tente novamente"
          });
      });
    },
    filter(tipo){
        this.$store.state.search_on = false;
        if (tipo==0) {
        this.activeSuccess = "btn-active";
        this.activeWarning = "";
        this.activeNeutral = "";
            this.filter_persons = this.persons.filter(this.filterAlive);
        } else if (tipo==1) {
        this.activeSuccess = "";
        this.activeWarning = "btn-active";
        this.activeNeutral = "";
            this.filter_persons = this.persons.filter(this.filterDead);
        } else {
        this.activeSuccess = "";
        this.activeWarning = "";
        this.activeNeutral = "btn-active";
            this.filter_persons = this.persons;
        }
        this.quant_pages = Math.trunc(this.filter_persons.length / 8);
        
        if(this.filter_persons.length % 8>1){
            this.quant_pages += 1;
        }
        this.filterPages();
        this.retrievePagination();
    },
    filterPages(item = null){
        if(item!=null){
            this.actual_page = item;
        }
        this.$store.state.page_persons = [];
        for (let index = (this.actual_page*8)-8; index < this.filter_persons.length-1 && index < this.actual_page*8; index++) {
            this.$store.state.page_persons.push(this.filter_persons[index]);
        }
    },
    filterAlive(value){
        return value.status == "Alive";
    },
    filterDead(value){
        return value.status == "Deceased" || value.status == "Presumed dead" ;
    },
    retrievePagination(){
        this.pagination = []
        for (let index = 1; index < this.quant_pages+1; index++) {
            this.pagination.push(index);
        }
    }
  }
};
</script>