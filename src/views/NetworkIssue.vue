<template>
  <div>
    <h1>Ohhh!</h1>
    <h3>
      It looks like you're experiencing some network issues, please click the
      back button and try again
    </h3>
    <route-link :to="{ name: 'event-list' }"
      >Or go back to the home page
    </route-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
