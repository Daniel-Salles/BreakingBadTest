<template>
    <div class="contact">
        <div class="container">
            <div class="form">
                <h1 class="text-center">Envie sua sugestão</h1>
                <input v-model="this.suggestion.author" class="input input-sm input-author" placeholder="Seu Nome" id="author" type="text"/>
                <textarea v-model="this.suggestion.message" class="input input-lg input-message" placeholder="Sua Mensagem" id="message" type=""/>
            </div>
            <button @click="sendSuggestion()" class="btn btn-lg btn-success btn-active">Enviar Sugestão</button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      suggestion:{
        author:null,
        message:null
      }
    };
  },
  methods: {
    sendSuggestion(){
      this.$sambatech.post("/breaking-bad/suggestions",this.suggestion).then(res => {
        this.suggestion.author=null
        this.suggestion.message=null
        this.flashMessage.show({
            status: "success",
            title: res.data
          });
        }).catch(err => {
          this.flashMessage.show({
            status: "error",
            title: "Ocorreu um erro inesperado, aguarde alguns minutos, e tente novamente",
          });
      });
    }
    }
  }
</script>
