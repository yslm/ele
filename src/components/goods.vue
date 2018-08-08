<template>
  <div class="goods">
    <p>good</p>
    <p>good</p>
    <p>good</p>
    <p>good</p>
    <p>good</p>
  </div>
</template>
<script>
  export default {
    name:'goods',
    data(){
      return{

      }
    },
    methods:{
      getdata(){
        this.testData('goods').then((res)=>{
          console.log(res.data);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    created(){
      this.getdata()
    },
  }

</script>
<style></style>
