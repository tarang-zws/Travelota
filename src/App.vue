<template>
  <div id="app">
    <Autocomplete :items="customers"
      filterby="name"
      @change="onChange"
      @selected="customerSelected"/>
    <router-view/>    
  </div>

</template>

<script>

import customers from './assets/Destination';
import Autocomplete from './components/Autocomplete'
import HotelList from './components/HotelList.vue'


export default {
  name: 'App',
  mounted() {
    this.customers = customers;
    
  },
  data() {
    return {
      customers: [],
    };
  },
  methods: {
    customerSelected(customer) {
      console.log(`Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`);
    },
    onChange(value) {
      // do something with the current value
    }
  },
  components: {
    Autocomplete,
    HotelList,
  }
}
</script>


