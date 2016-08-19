<template>
    <div class="modal fade {{wantu.moduleshow?'in':''}}" v-show='wantu.moduleshow'>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" @click='moduleFn'><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">图片列表</h4>
            </div>
            <div class="modal-body">
                图片列表
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default"  @click='moduleFn'>关闭</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade {{wantu.moduleshow?'in':''}}" v-show='wantu.moduleshow'></div>
    
</template>



<script>
    export default {
        props: ['wantu'],
        ready: function() {

        },
        methods: {
            moduleFn: function() {

                this.$set('wantu.moduleshow', false)
            }
        }
    }
</script>
<style>
    .modal.fade.in {
        display: block;
    }
</style>