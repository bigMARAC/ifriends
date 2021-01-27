<template>
  <v-card class="mx-auto my-3" max-width="400">
    <v-img height="250" :src="`${p[i].img}`"></v-img>

    <v-card-title>{{ p[i].nome }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text">{{ p[i].turma }}</div>
      </v-row>

      <div class="mt-5">{{ p[i].bio }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text class="text-center">
      <v-chip class="ma-2" color="#FB4836" text-color="white" label>
        Matemática
      </v-chip>
      <v-chip class="ma-2" color="#33A1FF" text-color="white" label>
        Física
      </v-chip>
      <v-chip class="ma-2" color="#45864A" text-color="white" label>
        Biologia
      </v-chip>
    </v-card-text>

    <v-card-actions class="px-5">
      <v-row class="my-2 justify-center">
        <v-col cols="3">
          <v-btn large v-on:click="i++" elevation="5">
            <v-icon color="primary">mdi-thumb-down</v-icon></v-btn
          >
        </v-col>
        <v-col cols="3">
          <v-btn @click="match" v-on:click="i++" large elevation="5">
            <v-icon color="primary">mdi-thumb-up</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
    <v-footer padless class="mt-7">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>MaracTech</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      i: 0,
      p: [
        {
          nome: "WhatsApp Junior",
          turma: "IA18",
          bio:
            "whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 ",
          img: "https://i.redd.it/2t96qnhl65p51.jpg",
        },
        {
          nome: "Pedro",
          turma: "THA18",
          bio:
            "Bom dia Pedro Bom dia Pedro Bom dia Pedro Bom dia Pedro Bom dia Pedro",
          img:
            "https://cdn.folhape.com.br/img/pc/450/450/dn_arquivo/2020/01/pedro-1-1.jpg",
        },
        {
          nome: "Julio Santini Bianco",
          turma: "IA18",
          bio:
            "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
          img:
            "https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2020/08/whatsapp-image-2020-08-27-at-143843.jpeg",
        },
      ],
    };
  },
  methods: {
    match() {},
  },
});
</script>

<style>
</style>