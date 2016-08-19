<template>
	<div class="main">
		dsadsa
	</div>

</template>
<script>
    import editorgroup from './components/music.vue';

    export default {
        data: function() {
            return {
                setoffset: '',
                componentdata: store,
                curtype: '',
                editBtnTxt: '编辑'
            }
        },
        computed: {
            setoffsetleft: function(){
                return this.setoffset.left;
            }
        },
        components: {
//          editorbtngroup,
//          editorsetcarousel,
//          editorcarousel,
//          editorsetcube,
//          editorcube,
//          editorsetgroup,
//          editorgroup
			musicF,
        },
        ready: function(){
        },
        methods: {
            editFn: function(index, e){
                $(e.target).siblings('.cover-page').toggleClass('none');
                if($(e.target).siblings('.cover-page').hasClass('none')){
                    this.$set('componentdata.data['+index+'].editBtnTxt', ' 取消编辑');
                }else{
                    this.$set('componentdata.data['+index+'].editBtnTxt', ' 编辑');
                }
            },
            editModuleFn: function(e){
                var one = $(e.target).parents('.component-pc-one');
                one.addClass('editing');
                one.siblings('.component-pc-one').removeClass('editing');
            }
        }
    }
</script>

<style>

</style>