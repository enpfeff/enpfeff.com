<template>
  <div>
    <en-header />
    <about></about>
    <image-parallax></image-parallax>
    <resume></resume>
    <contact></contact>
  </div>
</template>

<script>
import enHeader from '@/components/header';
import about from '@/components/about';
import contact from '@/components/contact';
import resume from '@/components/resume';
import imageParallax from '@/components/imageParallax';
export default {
    name: 'landing',
    components: {
        enHeader,
        about,
        contact,
        resume,
        imageParallax
    },
    data() {
        return {};
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
