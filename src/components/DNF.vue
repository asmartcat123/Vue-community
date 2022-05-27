<template>
  <div>
<div id="main"  style="width: 600px;height:400px;">

</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import option from '../echarts/option'

export default {
  name: "DNF",
  data(){
    return{
      option:option
    }
  },
  created() {
    this.getOption();

  },
  methods:{
    async getOption(){
      console.log("testing");
      const {data:res}=await this.$http.post("http://localhost:8081/getOption");
      if(option.yAxis.data.length==0) {
        res.forEach(item => {
          this.option.yAxis.data.push(item.profession);
          this.option.series[0].data.push(item.beforeNum);
          this.option.series[1].data.push(item.nowNum);
        })
      }
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option);

    }
  }
}
</script>

<style scoped>

</style>
