<template>
    <div class="custom-pc-cube" v-bind:style="{width:onedata.setCubeW}">
        <ul id="cube{{gettime}}" class="clearfix">
            <li v-for="cube in cubeData" class="pull-left">
                <img v-bind:src="cube.url">
            </li>
        </ul>

    </div>
</template>

<script>
    import componentToPc from '../libs/common.js';
    export default {
        props: ['onedata'],
        data: function(){
            return {
                files: ['interact.min.js'],
                cubeData: [],
                gettime: new Date().getTime(),
                gridsterObj: ''
            }
        },
        created: function(){
            componentToPc.loadFiles(this.files);
        },
        ready: function(){

        },
        watch: {
            cubeData: function(){
                this.$nextTick(function(){
                    this.initCubeFn();
                });
            }
        },
        computed: {
            cubeData: function(){
                var data = this.onedata;
                if(data&&data.data){
                    return data.data;
                }else{
                    return [];
                }
            }
        },
        methods: {
            initCubeFn: function(){
                var obj = '#cube'+ this.gettime;
                interact(obj+' li')
                    .draggable({
                        max: 1,
                        // enable inertial throwing
                        inertia: true,
                        // keep the element within the area of it's parent
                        restrict: {
                            restriction: "parent",
                            endOnly: true,
                            elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
                        },
                        // enable autoScroll
                        autoScroll: true,

                        // call this function on every dragmove event
                        onmove: dragMoveListener,
                        // call this function on every dragend event
                        onend: function (event) {
                            console.log(event)
                        }
                    })
                    .resizable({
                        max: 1,
                        preserveAspectRatio: true,
                        edges: { left: true, right: true, bottom: true, top: true},
                        restrict: {
                            restriction: "parent",
                            endOnly: true,
                            elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
                        }
                    })
                    .on('resizemove', function (event) {
                        var target = event.target,
                                x = (parseFloat(target.getAttribute('data-x')) || 0),
                                y = (parseFloat(target.getAttribute('data-y')) || 0);

                        // update the element's style
                        target.style.width  = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.webkitTransform = target.style.transform =
                                'translate(' + x + 'px,' + y + 'px)';

                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    });

                function dragMoveListener (event) {
                    var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                            target.style.transform =
                                    'translate(' + x + 'px, ' + y + 'px)';

                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }

                // this is used later in the resizing and gesture demos
                window.dragMoveListener = dragMoveListener;
            }
        }
    }
</script>
<style>

</style>