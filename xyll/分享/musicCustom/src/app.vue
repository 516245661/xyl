<template>

    <editorbtngroup :componentdata.sync="componentdata"></editorbtngroup>

    <div class="component-pc-content">
        <template v-for="onedata in componentdata.data">
            <div class="component-pc-one {{componentdata.curIndex == $index?'editing':''}} {{onedata.type}}-content clearfix" @click="editModuleFn">

                <div class="component-pc-one-con">

                    <editorcarousel v-if="onedata.type=='carousel'" :onedata.sync="onedata"></editorcarousel>
                    <editorcube v-if="onedata.type=='cube'" :onedata.sync="onedata"></editorcube>
                    <editorgroup v-if="onedata.type=='group'" :onedata.sync="onedata"></editorgroup>

                    <div class="cover-page"></div>
                    <div class="operate">
                        <div class="operate-btn-group">
                            <button type="button" class="btn btn-default">确定</button>
                            <button type="button" class="btn btn-primary">删除</button>
                        </div>
                    </div>
                    <div class="operate edit" v-if="onedata.type=='cube'" @click="editFn($index, $event)">{{onedata.editBtnTxt}}</div>
                </div>

                <div class="clearfix">
                    <div class="custom-set-area">
                        <editorsetcarousel v-if="onedata.type=='carousel'" :onedata.sync="onedata"></editorsetcarousel>
                        <editorsetcube v-if="onedata.type=='cube'" :onedata.sync="onedata"></editorsetcube>
                        <editorsetgroup v-if="onedata.type=='group'" :onedata.sync="onedata"></editorsetgroup>
                    </div>
                </div>
            </div>
        </template>
    </div>


</template>
<script>
    import store from './store.js';
    import editorbtngroup from './components/editorbtngroup.vue';
    import editorsetcarousel from './components/editorsetcarousel.vue';
    import editorcarousel from './components/editorcarousel.vue';
    import editorsetcube from './components/editorsetcube.vue';
    import editorcube from './components/editorcube.vue';
    import editorsetgroup from './components/editorsetgroup.vue';
    import editorgroup from './components/editorgroup.vue';

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
            editorbtngroup,
            editorsetcarousel,
            editorcarousel,
            editorsetcube,
            editorcube,
            editorsetgroup,
            editorgroup
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