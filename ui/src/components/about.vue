<template>
  <div id="about">
    <v-container fill-height class="about-container">
      <v-layout row align-center justify-center wrap>
        <v-flex class="aboutme">
          Hi I'm <span class="bold">Ian Pfeffer</span>, a full stack developer with a speciality in <span class="bold">Front End</span> architecture and design.  Detail orientated, fun,
          daring are some adjectives my coworkers might say about me.  I currently work supporting <a target="_blank" class="bold" href="https://innate.ly">Innate.ly</a>, a
          start up where my
          passion for <span
          class="bold">UX Design</span>
          and <span class="bold">Development</span> converge.  Checkout my
          work history below or @ <a target="_blank" class="bold" href="https://www.linkedin.com/in/ian-pfeffer">LinkedIn</a>.  Outside of work I
          have a
          beautiful
          wife and two dogs.  I am a
          professional <span class="bold">Musician</span> in my spare time and try to be an amazing <span class="bold">Chef</span> when I can.
        </v-flex>
        <v-flex>
          <v-layout row justify-center>
            <img :src="'https://assets.enpfeff.com/me2.jpg'" height="300">
          </v-layout>
        </v-flex>

      </v-layout>


    </v-container>
  </div>

</template>

<script>
export default {
    name: 'about'
};
</script>

<style scoped>
  #about {
    background: #212121;
    width: 100%;
    color: #fafafa;
    padding-top: 100px;
  }

  .about-container {
    min-height: 500px;
  }

  .aboutme {
    width: 40%;
    font-size: 22px;
  }

  .bold {
    font-size: 28px;
    font-weight: 600;
    color: #fafafa;
    font-family: 'Titillium Web', sans-serif;
    letter-spacing: 2px;
  }

  a.bold {
    color: rgb(222, 149, 138);
    text-decoration: none;
    padding: 0;
    margin: 0;
  }

</style>
