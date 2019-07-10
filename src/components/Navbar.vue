<template>
<div class="navbar">
  <nav>
      <div class="logo">
          <a class="cursor-pointer" @click="personsPage()"><img class="imagem" :src="src" alt="logo breaking bad"></a>
      </div>
      <ul>
        <div class="flex flex-item">
        <li>
          <a :class="activeLink('persons')" class="cursor-pointer" @click="personsPage()">Personagens</a>
        </li>
        <li>
          <a :class="activeLink('episodes')" href="#/episodes">Episodios</a>
        </li>
        <li>
          <a :class="activeLink('suggestions')" href="#/suggestions">Sugestões</a>
        </li>
        </div>
        <li class="flex">
          <input type="text" class="custon-input" v-model="name" placeholder="Pesquise os personagens"/><font-awesome-icon v-if="!searchOn()" @click="searchPerson()" id="lupa" icon="search"/><font-awesome-icon v-if="searchOn()" @click="cancelSearch()" id="close" icon="times"/>
        </li>
      </ul>
  </nav>
  </div>
</template>
<script>
import img from '../assets/img/logo.png'
export default {
  data(){
    return{
      name:null,
      personActive:null,
      episodesActive:null,
      contactActive:null,
      src:img
    }
  },
  methods: {
    searchOn(){
        return this.$store.state.search_on;
    },
    searchPerson(){
      this.name = this.name==null?'':this.name;
      this.$brba.get("/characters?name="+this.name).then(res => {
        this.$store.state.page_persons = res.data;
        this.$store.state.search_on = true;
        this.$store.state.search_text = this.name;
        this.$router.push({ name: 'persons' });
      }).catch(err => {
          this.flashMessage.show({
            status: "error",
            title: "Ocorreu um erro inesperado, aguarde alguns minutos, e tente novamente"
          });
      });;
    },
    cancelSearch(){
      this.name=null;
        this.$store.state.search_on = false;
        this.$store.state.search_text = this.name;
        this.$router.go()
    },
    activeLink(namePath){
      return this.$route.name==namePath?'active':null;
    },
    personsPage(){
      this.$router.push({name:'persons'})
      this.$router.go()
    }
  }
}
</script>