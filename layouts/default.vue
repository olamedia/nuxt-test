<template>
  <div>
    <div class="app">
      <div class="main">
        <Sidebar :data="menu">
          <nuxt/>
          <Loading></Loading>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from "../components/Loading";
  import Sidebar from "../components/Sidebar";
  export default {
    components: {Sidebar, Loading},
    data: function(){
      return {
        menu: {
          currentMenu: '/',
          pages: [
            {
              href: '/',
              title: '1',
              menu: [
                {
                  title: 'Общая аналитика',
                  href: '/',
                  icon: 'assets/icons/graph-active.svg'
                },
                {
                  title: 'Рефтинский филиал',
                  href: '/analytics/page2',
                  icon: 'assets/icons/graph.svg'
                },
                {
                  title: 'Конаковский филиал',
                  href: '/analytics/page3',
                  icon: 'assets/icons/graph.svg'
                }
              ]
            },
            {
              href: '/layout2',
              title: '2',
              menu: [
                {
                  title: 'Какой пункт по умолчанию',
                  href: '/other/page1',
                  icon: 'assets/icons/graph-active.svg'
                },
                {
                  title: 'Еще какой то пункт',
                  href: '/other/page2',
                  icon: 'assets/icons/graph.svg'
                },
                {
                  title: 'И еще',
                  href: '/other/page3',
                  icon: 'assets/icons/graph.svg'
                }
              ]
            }
          ],
        }
      }
    },
  }
</script>

<style lang="scss">
  @import '../assets/scss/common';
  .app{
    background: $default-color;
    color: $text-color;
    position: relative;
    z-index: 1;
  }
  .loader{
    z-index: 2;
  }
  .main{
    position: relative;
    z-index: 1;
    flex: 1 0 auto;
  }


html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

