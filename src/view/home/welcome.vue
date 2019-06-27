<template>
	<div class="welcome"></div>
</template>

<script>
  export default {
    name: 'welcome',
		created () {
    	if (sessionStorage.getItem('rsysHasHomeAuth') === '1') {
				this.$router.push('home/homePage')
			}
		}
  }
</script>

<style scoped>
	.welcome{
		height: 100%;
		background-image: url("../../assets/images/welcome.png");
		background-size: contain;
		background-repeat: no-repeat;
		background-color: white;
	}
</style>
