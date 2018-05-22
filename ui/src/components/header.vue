<template>
  <div id="header">
    <v-container class="container" fill-height>
      <v-layout row align-center>
        <v-flex text-xs-center>
          <div class="en-title">Developer.</div>
          <div class="subtext">sub text</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
    name: 'enHeader',
    data() {
        return {};
    }
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web');

#header {
  background: url("https://assets.enpfeff.com/background-2.jpg");
  background-size: cover;
  /*max-height: 700px;*/
  height: 500px;
  width: 100%;
}

#header:before {

   content: '';

   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   background-image: linear-gradient(to bottom right, #222, #424242);
   opacity: .4;
}

.subtext {
  color: #fff;

}

.container {
  max-width: 700px;
}

.en-title {
  color: #fff;
  font-family: 'Titillium Web', sans-serif;
  font-size: 9vh;
}
</style>
