<template>
    <div class="custom-pc-editor-btn">
        <ul>
            123321
        </ul>
        
    </div>
</template>
<script>
    export default {
        props: ['componentdata'],
        ready: function(){

        },
        methods: {
            showFn: function(name, event){
                var tmp = {type:name};
                if(name=='cube'){
                    tmp.editBtnTxt = '编辑';
                }
                this.componentdata.data.push(tmp);
                this.componentdata.curIndex = this.componentdata.data.length-1;
            }
        }
    }
</script>
<style>
   body{
   background:red;
   }
</style>