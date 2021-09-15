<template>
  <section>
    <form action="">
      <label for=""></label>
      <input type="checkbox" />
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class Home extends Vue {
  @Getter("getSettings") getSettings: any;
  @Action("setSettings") setSettings: any;
}
</script>

<style scoped>
section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  height: 100vh;
}
</style>
