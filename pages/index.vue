<template>
  <div>
        <section class="dashboard">
          <header>
            <div>
              <h1>Общая аналитика</h1>
            </div>
            <div>
              <span class="date-input">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 6V8H19V6H5ZM7 12H17V14H7V12ZM14 16H7V18H14V16Z" fill="#0043C4"/>
                </svg>

                <input type="date" placeholder="Выберите дату" />
              </span>
              <button class="btn btn-primary">Применить</button>
            </div>
            <div>
              <button @click="generateStats" class="btn btn-generate-stats">Изменить данные</button>
            </div>
          </header>
          <div class="dashboard-cards-grid">
          <div class="dashboard-card" style="grid-column: span 6;">
            <div class="dashboard-card-content" style="border-right: 1px solid #DDDDDD;" v-if="$store.state.stats.orders">
              Заказов
              <div class="large-number">{{ formatNumber($store.state.stats.orders) }}</div>
              <div :class="$store.state.stats.ordersChange>0?'positive':'negative'">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.666656 6.00002L1.60666 6.94002L5.33332 3.22002V11.3334H6.66666V3.22002L10.3867 6.94669L11.3333 6.00002L5.99999 0.666687L0.666656 6.00002Z" fill="currentColor"/>
                </svg> {{ formatNumber($store.state.stats.ordersChange, true) }}%
              </div>
            </div>
            <div class="dashboard-card-content" style="border-right: 1px solid #DDDDDD;" v-if="$store.state.stats.income">
              Выручка
              <div class="large-number">{{ formatNumber($store.state.stats.income) }}<span> руб.</span></div>
              <div :class="$store.state.stats.incomeChange>0?'positive':'negative'">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.666656 6.00002L1.60666 6.94002L5.33332 3.22002V11.3334H6.66666V3.22002L10.3867 6.94669L11.3333 6.00002L5.99999 0.666687L0.666656 6.00002Z" fill="currentColor"/>
              </svg> {{ formatNumber($store.state.stats.incomeChange, true) }}%
              </div>
            </div>
            <div class="dashboard-card-content" v-if="$store.state.stats.production">
              Выработка
              <div class="large-number">{{ formatNumber($store.state.stats.production) }}<span> чел./час</span></div>
              <div :class="$store.state.stats.productionChange>0?'positive':'negative'">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.666656 6.00002L1.60666 6.94002L5.33332 3.22002V11.3334H6.66666V3.22002L10.3867 6.94669L11.3333 6.00002L5.99999 0.666687L0.666656 6.00002Z" fill="currentColor"/>
              </svg> {{ formatNumber($store.state.stats.productionChange, true) }}%
              </div>
            </div>
          </div>
          <div class="dashboard-card" style="grid-column: span 6; grid-row: span 2;">
            <div class="dashboard-card-content">
              <div class="title">Эффективность сотрудников</div>
              <div class="subtitle">Прогресс по выработкам с общими показателями</div>
              <div id="chart" style="width:600px; height:400px;"></div>
            </div>
          </div>
          <div class="dashboard-card" style="grid-column: span 3; grid-row: 2;">
            <div class="dashboard-card-content">
              card
            </div>
          </div>
          <div class="dashboard-card" style="grid-column: span 3; grid-row: 2;">
            <div class="dashboard-card-content">
              card
            </div>
          </div>
          </div>

        </section>

  </div>

</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import store from "../store/index"
import {actions} from '../store';
import echarts from 'echarts';

const renderChart = async (element) => {
  const chart = echarts.init(element, null, {renderer: 'svg'});

  const xAxisData = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const data1 = [];
  const data2 = [];
  for (let i = 0; i < 12; i++) {
    data1.push((Math.random() * 400).toFixed(2));
    data2.push((Math.random() * 100).toFixed(2));
  }

  const options = {
    tooltip: {},
    xAxis: {
      data: xAxisData,
      axisLine: {onZero: true},
      splitLine: {show: false},
      splitArea: {show: false}
    },
    yAxis: {
      inverse: false,
      splitArea: {show: false}
    },
    grid: {
      left: 100
    },
    series: [
      {
        name: 'bar',
        type: 'bar',
        stack: 'one',
        color: '#2F80ED',
        data: data1
      },
      {
        name: 'bar2',
        type: 'bar',
        stack: 'one',
        color: '#F2C94C',
        data: data2
      }
    ]
  };

  chart.setOption(options);
};

export default {
  layout: 'default',
  mounted() {
    this.$store.dispatch(actions.LOAD_STATS);
    if (this.$store.state.stats.orders === undefined){
      this.$store.dispatch(actions.GENERATE_STATS);
    }
    renderChart(this.$el.querySelector("#chart"));
  },
  methods: {
    generateStats: function(){
      this.$store.dispatch(actions.GENERATE_STATS);
    },
    formatNumber: function(number, sign){
      return (sign && number > 0?'+':'') + new Intl.NumberFormat('ru-RU').format(number)
    }
  },
  components: {
    Loading,
    Sidebar,
    AppLogo
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/common';

  .btn{
    padding: 12px 15px;
    line-height: 1;
    outline: none;
    border: solid 2px $primary-color;
    border-radius: 10px;
  }
  .btn-primary{
    background: $primary-color;
    color: $text-on-primary-color;
  }

  .dashboard{
    padding: 40px;
    header {
      display: flex;
      height: 40px;
      margin-bottom: 56px;
      div{
        padding-right: 45px;
      }
      h1 {
        font-weight: bold;
        font-size: 32px;
        line-height: 37px;
      }

      .btn-generate-stats{
        color: $primary-color;
        background: transparent;
        border: solid 2px $primary-color;
        border-radius: 10px;
      }
    }
    .dashboard-cards-grid{
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: auto 1fr repeat(4, auto);
      gap: 30px;
      .dashboard-card {
        display: flex;
        flex-direction: row;
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
        border-radius: 10px;

        .dashboard-card-content {
          padding: 20px 30px;
          flex-grow: 1;
        }
      }
    }
  }

  .positive{
    color: $positive-color;
  }
  .negative{
    color: $negative-color;
    svg{
      transform: rotate(180deg);
    }
  }
  .large-number{
    color: $large-numbers-color;
    font-size: 42px;
    line-height: 49px;
    font-weight: bold;
    span{
      color: $large-numbers-label-color;
      font-size: 12px;
      line-height: 14px;
      font-weight: normal;
    }
  }

  .title {
    font-size: 14px;
    line-height: 16px;
    color: $text-color;
  }

  .subtitle {
    font-size: 12px;
    line-height: 14px;
    color: $subtitle-color;
  }

  .links {
    padding-top: 15px;
  }

  .date-input{
    display: inline-block;
    background: #ffffff;
    border: 1px solid #DDDDDD;
    border-radius: 10px;
    height: 40px;
    padding: 5px 8px;
    vertical-align: middle;
    svg, input{
      display: inline-block;
      vertical-align: middle;
      margin: 0;
    }
    input{
      border: 0;
      outline: none;
    }
  }
</style>

