<template>
    <div class="swiper-container" id="swiper{{gettime}}">
        <div class="swiper-wrapper">

            <template v-if="carouselData.length">
                <div class="swiper-slide" v-for="one in carouselData">
                    <img v-bind:src="one.url">
                </div>
            </template>

            <template v-else>
                <div class="swiper-slide">slider1</div>
                <div class="swiper-slide">slider2</div>
                <div class="swiper-slide">slider3</div>
            </template>

        </div>
    </div>
</template>

<script>
    import componentToPc from '../libs/common.js';
    export default {
        props: ['onedata'],
        data: function(){
            return {
                files: ['swiper-3.3.1.min.js','swiper-3.3.1.min.css'],
                carouselData: [],
                mySwiper: '',
                gettime: new Date().getTime()
            }
        },
        created: function(){
            componentToPc.loadFiles(this.files);
        },
        ready: function(){
            this.initSwiper();
        },
        computed: {
            carouselData: function(){
                var data = this.onedata;
                if(data&&data.data){
                    if(!data.data.length||data.data.length==1){
                        this.mySwiper.slideTo(0);
                        this.mySwiper.stopAutoplay();
                    }else{
                        this.mySwiper.startAutoplay();
                    }
                    return data.data;
                }else{
                    return [];
                }
            }
        },
        methods: {
            initSwiper: function(){
                var swiperObj = '#swiper'+this.gettime;
                this.mySwiper = new Swiper(swiperObj, {
                    autoplay: 3000//可选选项，自动滑动
                });
            }
        }
    }
</script>

<style>
    .swiper-slide{
        min-height: 200px;
        max-height: 300px;
        width: 100%;
        background: red;
    }
    .swiper-slide:nth-child(2){
        background: blue;
    }
    .swiper-slide:nth-child(3){
        background: yellow;
    }
</style>