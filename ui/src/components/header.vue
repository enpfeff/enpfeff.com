<template>
  <div id="header">
    <v-parallax src="https://assets.enpfeff.com/Dark_mountain_panorama-3.jpg" height="600">
      <v-layout row align-center>
        <v-flex text-xs-center>
          <div class="en-title">Developer.</div>
          <div class="subtext">sub text</div>
        </v-flex>
      </v-layout>
    </v-parallax>
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
