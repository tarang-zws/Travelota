<template>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
        <a class="navbar-brand text-primary font-weight-bold" @click="Home">Travolta</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Booking</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sign In
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
         </div>
        </div>
      </nav>
      <section class="my-5">
         <form @submit.prevent="handleSubmit">
          <div class="container">
            <div class="row row-sm">
                <div class="col-sm-3 form-group">
                  <label>Destination</label><span class="text-danger">*</span>
                  <div class="autocomplete">
                  <input type="text" class="form-control form-control-readonly" :value="mapCity" id="divCountry" @click="toggleVisible" v-text="selectedItem ? selectedItem[filterby] : ''" readonly/>
                  <div class="placeholder" v-if="selectedItem == null" v-text="title"></div>
                  <button class="close" @click="selectedItem = null" v-if="selectedItem">x</button>
                  <div class="popover" v-show="visible">
                    <input type="text"
                      ref="input"
                      v-model="query"
                      @keydown.up="up"
                      @keydown.down="down"
                      @keydown.enter="selectItem"
                      :class="{ 'is-invalid': submitted && $v.mapCity.$error }"
                       id="txtCountry"
                      />
                      
                    <div class="options" ref="optionsList">
                      <ul >
                        <li v-for="(match, index) in matches"
                          :key="index"
                          :class="{ 'selected': (selected == index)}"
                          @click="itemClicked(match)"
                          v-text="match[filterby]"></li>
                      </ul>  
                    </div>

                  </div>
                  </div>
                    <div v-if="submitted && !$v.mapCity.required" style="color:red">Destination is required</div>
                  </div>
                <div class="col-sm-3 form-group">
                    <label>Check-in</label><span class="text-danger">*</span>
                    <datepicker
                      id="checkin_date"
                      input-class="form-control form-control-readonly"
                      :disabled-dates="DisabledDates"
                      @change="onChange()"
                      v-model="startdate"
                      :class="{ 'is-invalid': submitted && $v.startdate.$error }">
                    </datepicker>
                      
                    
                    <div v-if="submitted && !$v.startdate.required" style="color:red">Check-in date is required</div>
                    
                </div>
                <div class="col-sm-3 form-group">
                    <label>Check-out</label><span class="text-danger">*</span>
                    <datepicker
                      id="checkout_date"
                      input-class="form-control form-control-readonly"
                      :disabled-dates="disabledDates"
                      :open-date="new Date()"
                      v-model="enddate"
                      :class="{ 'is-invalid': submitted && $v.enddate.$error }"
                    > 
                    </datepicker>
                    <div v-if="submitted && !$v.enddate.required" style="color:red">Check-out date is required</div>
                </div>
                <div class="col-6 col-sm-1 form-group">
                    <label>Adult</label>
                    <input type="number" @input="changed" placeholder="" :value="mapAdult" id="adults" @click="selectAdults" class="form-control" min="1" />
                    <!-- <p>New value {{mapAdult}}</p> -->
                </div>
                <div class="col-6 col-sm-1 form-group">
                    <label>Children</label>
                    <input type="number" @input="changedChildren" :value="mapChildren" placeholder="" id="childrens" @click="selectChildren" class="form-control" :class="{ 'is-invalid': submitted && $v.childrens.$error }" min="0"/>
                     <!-- <p>New value {{msg1}}</p> -->
                    <div v-if="submitted && !$v.childrens.required" class="invalid-feedback">Check In is required</div> 
                </div>
                <!-- <div class="col-sm-1 form-group">
                    <button class="btn btn-primary btn-search btn-block"  style="margin-top: 31px;">Search</button>
                </div> -->
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" style="margin-top: 31px;">Search</button>
                </div>
            </div>
          </div>
          
      </form>
      </section>
      <section>
          <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="h4">Travel with <span class="text-primary">Travolta</span></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
          </div>
      
      </section>
  </body>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { mapState } from "vuex";

  export default {
    props: {
      items: {
        default: [],
        type: Array
      },
      filterby: {
        type: String
      },
      title: {
        default: '',
        type: String
      },
      shouldReset: {
        type: Boolean,
        default: true
      },
      
    },
    data() {
      return {
        itemHeight: 39,
        selectedItem: null,
        selected: 0,
        query: '',
        visible: false,
        startdate:'',
        enddate:'',
        errors:[],
        DisabledDates: {
        to: new Date(Date.now() - 8640000),
        },
        submitted: false
      };
      
    },

     validations: {
       startdate: { required },
       childrens: {required},
       mapCity: { required},
       enddate: { required },
    },
            
            
    methods: {
      changedCity: function(event) {
        debugger;
        // this.$store.commit('changedCity', event.target.value)
        alert(event.target.value);
        console.log("here in changed city");
      },
      changed: function(event) {
        this.$store.commit('changed', event.target.value)
      },
      changedChildren(event){
        
        this.$store.commit('changedChildren', event.target.value)
      },
      handleSubmit(e) {
          console.log("here in submit button");
          this.submitted = true;

          // stop here if form is invalid
          this.$v.$touch();
          
          if (this.$v.$invalid) {
            console.log("here in if",this.$v.$invalid);
            return;
          }
          else{
            // window.location.href = "/hotel_list"
            this.$router.push('/hotel_list')
            // console.log("Get item",JSON.parse(localStorage.getItem("children")));
          }
      },
      Home(){
        this.$router.push('/hotel_search')
      },
      selectChildren(){
        // localStorage.setItem('children',this.childrens);
      },
      selectAdults(){
        localStorage.setItem('Adults',this.adults);
        // this.$store.state.adults;
        // return $store.getters.flavor
      },
      seelectCheckindate(){
        localStorage.setItem('checkin_date',this.startdate);
      },

      toggleVisible() {
        this.visible = !this.visible;

        setTimeout(() => {
          this.$refs.input.focus();
        }, 50);
      },
      itemClicked(index) {
        this.$store.commit('changedCity', index.name)
        this.selected = index.id;
        this.selectItem();
      },
      selectItem() {
        if (!this.matches.length) {
          return;
        }

        this.selectedItem = this.matches[this.selected];
        this.visible = false;

        if (this.shouldReset) {
          this.query = '';
          this.selected = 0;
        }
        
        // this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)));
        // localStorage.setItem('selected',JSON.stringify(this.selectedItem));
      },
      up() {
        if (this.selected == 0) {
          return;
        }

        this.selected -= 1;
        this.scrollToItem();
      },
      down() {
        if (this.selected >= this.matches.length - 1) {
          return;
        }

        this.selected += 1;
        this.scrollToItem();
      },
      scrollToItem() {
        this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
      },
      format_date(value) {
            
            if (value) {
                return moment(String(value)).format("YYYYMMDD");
            }
        },
    },
    computed: {
      // adults:{
      //   get(){
      //     return this.$store.state.adults;
      //   },
      //   set(value){
      //       this.$store.commit('update value',value)
      //   }
      // },
      ...mapState({
      mapCity: state => state.selectedItem,
      mapAdult: state => state.adults,
      mapChildren: state => state.childrens,
      }),
      city(){
        return this.$store.getters.city;
      },
      flavor(){
        return this.$store.getters.flavor;
      },
      childrens(){
        return this.$store.getters.childrens;
      },
      matches() {
        this.$emit('change', this.query);

        if (this.query == '') {
          return [];
        }

        return this.items.filter((item) => item[this.filterby].toLowerCase().includes(this.query.toLowerCase()))
      },
      disabledDates() {
        let context = this;
        
        let disableDates = {
            to: context.startdate 
        }
        console.log(disableDates);
        return disableDates;
      },
      
    },
    components:{
      Datepicker
    },
    watch: {
      
      items: {
        handler() {
          localStorage.setItem('selected',JSON.stringify(this.children))
          
        },
        deep: true
      } 
    },
    
  }
</script>





