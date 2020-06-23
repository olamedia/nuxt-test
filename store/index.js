import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const mutations = {
  SET_STATS: "SET_STATS",
  SAVE_STATE: "SAVE_STATE",
  LOAD_STATE: "LOAD_STATE"
};

export const actions = {
  SET_STATS: "SET_STATS",
  GENERATE_STATS: "GENERATE_STATS",
  LOAD_STATS: "LOAD_STATS"
};

const generateNumbers = function(){
  return {
    orders: getRandomInt(1000, 90000),
    ordersChange: getRandomFloat(-10,10),
    income: getRandomInt(100000, 900000),
    incomeChange: getRandomFloat(-10,10),
    production: getRandomInt(1000, 50000),
    productionChange: getRandomFloat(-10,10)
  };
};

const getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

const getRandomInt = function(min, max) {
  return Math.floor(getRandomFloat(min, max));
};


const localStorageStateKey = 'store/state';

const saveState = function(state){
  localStorage.setItem(localStorageStateKey, JSON.stringify(state));
};

const loadState = function(state){
  let loadedState = localStorage.getItem(localStorageStateKey);
  loadedState = JSON.parse(loadedState);
  if (loadedState){
    Object.assign(state, loadedState);
  }
};


const store = () => new Vuex.Store({
  state: {
    apiToken: "",
    stats: {

    },
  },
  mutations: {
    [mutations.SET_STATS]: function(state, stats) {
      state.stats = stats;
      console.log('SET_STATS');
      console.log(stats);
      this.commit(mutations.SAVE_STATE)
    },
    [mutations.SAVE_STATE]: function(state, stats) {
      saveState(state);
    },
    [mutations.LOAD_STATE]: function(state, stats) {
      loadState(state);
    }
  },
  actions: {
    [actions.SET_STATS]: function(
      context,
      stats
    ) {
      this.commit(mutations.SET_STATS, stats);
    },
    [actions.GENERATE_STATS]: function() {
      console.log('GENERATE_STATS');
      this.commit(mutations.SET_STATS, generateNumbers());
    },
    [actions.LOAD_STATS]: function() {
      this.commit(mutations.LOAD_STATE)
    }
  },
  modules: {}
});

export default store;
