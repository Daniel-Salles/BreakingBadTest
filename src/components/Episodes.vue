<template>
    <div class="episodes">
        <div class="container">
            <div class="div-table">
                <div>
                    <div class="table-row" v-for="episode in this.$store.state.page_episodes" v-bind:key="episode.episode_id">
                        <div class="table-cell column-title">
                            <h1 >{{episode.title}}</h1>
                            <p >Temporada {{episode.season}} Episódio {{episode.episode}}</p>
                        </div>
                        <div class="table-cell column-date">
                            <p class="cell-font">Data de estreia:</p>
                            <p class="cell-font">{{episode.air_date}}</p>
                        </div>
                        <div class="table-cell column-persons">
                            <p class="cell-font item-person">Personagens:</p>
                            <p class="cell-font item-person" v-for="person in episode.characters" v-bind:key="person">
                                {{person}}
                            </p>
                        </div>
                    </div>
                </div>
            <div class="generic-footer">
                <a class="cursor-pointer" @click="filterPages(item)" v-for="item in this.pagination" :key="item">{{item}}</a>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    this.retrieveEpisodes()
    return {
        quant_pages:null,
        actual_page:null,
        episodes: null,
        filter_episodes: null,
        pagination: null
    };
  },
  methods: {
    retrieveEpisodes() {
      this.$brba.get("/episodes").then(res => {
        this.episodes = res.data;
        this.filter_episodes = res.data;
        this.quant_pages = Math.trunc(res.data.length / 6);
        if(res.data.length % 6>0){
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
    filterPages(item = null){
        if(item!=null){
            this.actual_page = item;
        }
        this.$store.state.page_episodes = [];
        for (let index = (this.actual_page*6)-6; index < this.filter_episodes.length-1 && index < this.actual_page*8; index++) {
            this.$store.state.page_episodes.push(this.filter_episodes[index]);
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
