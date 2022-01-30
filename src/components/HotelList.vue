<template>
 <div id="main">
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <div class="px-3">
          <h4 class="mb-4">Filter</h4> 
          <div class="widget mb-3">
            <label>Filter by hotel name</label>
            <input type="text" placeholder="" class="form-control" />
          </div>
          <div class="widget mb-3">
            <label>Filter by rating</label>
            <ul class="list-group list-none">
              <li><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fa fa-star"></i></a><a href="#" class="text-primary"><i class="fa fa-star"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fa fa-star"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
          <a class="navbar-brand text-primary font-weight-bold" @click="backtohome">Travolta</a>
          <div class="d-flex">
            <button class="btn bg-transparent border-0 d-block d-md-none mr-2 text-primary" onclick="openNav()"><i class="fas fa-filter"></i></button>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">My Booking</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Sign in</a>
              </li>

            </ul>
          </div>
          </div>
        </nav>
      <section class="my-5 tarang" >
          <div class="container">
            <div class="row">
                <div class="col-md-3 d-none d-md-block">
                  <div class="card">
                    <div class="card-body">
                    <h4 class="mb-4">Filter</h4>
                    <div class="widget mb-3">
                      <div class="row">
                        <div class="search-wrapper panel-heading col-sm-12" >
                            <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
                        </div>
                      </div>
                    </div>
                    <div class="widget mb-3">
                      <label>Filter by rating</label>
                      <ul class="list-group list-none" data-tag="channelList" >
                        <li><a href="javascript:void(0)" class="text-primary" @click="filterbyrating(5)" ><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
                        <li><a href="javascript:void(0)" class="text-primary" @click="filterbyrating(4)"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
                        <li><a href="javascript:void(0)" class="text-primary" @click="filterbyrating(3)"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
                        <li><a href="javascript:void(0)" class="text-primary" @click="filterbyrating(2)"><i class="fa fa-star"></i><i class="fa fa-star"></i></a></li>
                        <li><a href="javascript:void(0)" class="text-primary" @click="filterbyrating(1)"><i class="fa fa-star"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                </div>
                <div class="col-md-9">
                  <h6 v-if="!resultQuery.length">No results Founds</h6>
                  <span><b>{{resultQuery.length}} Hotel Founds</b></span>
                  <div class="card mb-3" v-for="hotel in resultQuery" :key="hotel.id" >
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-3" >
                          <img src="../../images/hotel-image.jpg" class="img-fluid rounded">
                        </div>
                        <div class="col-md-9">
                          <div class="d-flex justify-content-between align-items-center mt-2">
                            <div>
                              <h6><a href="#" class="link" >{{hotel.name}}</a></h6>
                              <ul class="list-group list-none mb-3">
                                <li>
                                  <star-rating v-model="hotel.hotel_rating" :star-size=25 :show-rating="false" :round-start-rating="false" read-only></star-rating>
                                </li>
                              </ul>
                              <p class="m-0"><i class="fas fa-map-marker-alt mr-2 text-primary" ></i>{{hotel.address}}, {{hotel.state}}, {{hotel.country_code}}</p>
                            </div>
                            <div><a href="#" class="btn btn-primary">Show Details</a></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </section>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import resources from '../json/hotellist.json'
import { mapState } from "vuex";

export default {
  name: "App",
  name: 'HotelList',
  components: {
  StarRating,
  resources,
  },
  data() {
    return {
      searchQuery: "",
      ratingFilter : -1,
      start:0,
      limit:10,
      tarang:1,
      tempArray:[],
      array2:[],
      resources:resources,

    };

  },
  mounted() {
  let context = this;
  context.datalimit();
  if(this.$store.getters.rating != 'undefined') 
    context.filterbyrating(this.$store.getters.rating, true);
  $(window).on('scroll', function() {
          if ($(window).scrollTop() >= $(
            '.tarang').offset().top + $('.tarang').
              outerHeight() - window.innerHeight) {
              context.calculation();
          }
      });
  },
  computed: {
    resultQuery() {
      return this.tempArray.filter(hotel=>(hotel.name.startsWith(this.searchQuery?this.searchQuery : "")) && (this.ratingFilter === -1 || hotel.hotel_rating === this.ratingFilter))
    },
    ...mapState({
      mapFilter: state => state.rating,
      }),
      rating(){
        return this.$store.getters.rating;
    },  
  },
  watch:{
    resources:function(){
      let id = this.resources.length;
      setTimeout(function() {
          document.getElementById('message-' + id).scrollIntoView();
      }, 10);
    },
  },
  methods:{
    filterbyrating(rating,isNotAddRating){
      
      if (rating && this.ratingFilter != Number(rating)) {
        if(!isNotAddRating)
        console.log("here in rating filter");
        this.$store.commit('resultFilter',rating)
        this.ratingFilter = Number(rating);
        this.$router.push({name:'HotelList',params:{rating:rating}})
        
        
      }else{
        this.ratingFilter = -1;
        // window.localStorage.setItem("rating", 'undefined');
        this.$router.push({name:'HotelList'})
      }
      console.log("after if else rating",this.ratingFilter)
    },
    resultFilter: function(event) {
     
      console.log("here");
      alert(event.target.value)
      this.$store.commit('resultFilter', event.target.value)
    },
    
    addMessage: function(){
      let id = this.resources.length + 1;
      this.resources.push({ id: id, text: 'message'});
    },
    datalimit(){
      this.tempArray = this.resources.slice(this.start,this.limit);
    },
    calculation(){
      let context = this;
      context.tarang++;
      context.start = context.tempArray.length + 1;
      let newlimit = context.limit*context.tarang;
      let newArr = context.resources.slice(context.start,newlimit);
      context.tempArray = context.tempArray.concat(newArr);
    },
    backtohome(){
      this.$router.push('/hotel_search')
    }
  },

};
</script>





      




                

