<template lang="jade">
	<div>
		{{msg}}
	</div>
</template>

<script>
import CompA from './components/musicF.vue'
import CompB from './components/musicZ.vue'
export default {
  data () {
    return {
      msg: [
      0:'music1',
      1:'music2',
      2:'music3',
      3:'music4',
      4:'music5',
      5:'music6',
      ]
    }
  },
  components: {
    CompA,
    CompB,
  }
}
</script>

<style>
	body{
		background: red;
	}
	
</style>