<template>
  <div class="seller">
    <p>seller</p>
    <p>seller</p>
    <p>seller</p>
    <p>seller</p>
    <p>seller</p>
  </div>

</template>
<script>
  export default {
    name:'seller',
    data(){
      return{

      }
    },
    methods:{
      getdata(){
        this.testData('seller').then((res)=>{
          console.log(res.data);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    created(){
      this.getdata()
    }
  }
</script>
<style></style>
