<template>
  <div class="page-link"> {{link}}  </div>
</template>

<script>
export default {
  name: "Link",
  props: [
      'link'
  ]
}
</script>

<style scoped>

.page-link {
  display: inline-block;
  text-align: center;
  align-items: center;
  margin: auto;
  background: transparent;
  border: transparent;
  position: relative;
  color: #f6ce0d;
  transition: all 0.8s ease;
}

.page-link:after {
  display: block;
  content: "";
  position: absolute;
  height: 1px;
  background-color: wheat;
  width: 0;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
}

.page-link:hover:after {
  width: 90%;
}
</style>