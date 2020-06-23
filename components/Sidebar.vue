<template>
  <div class="container-with-sidebar" :class="!hidden?'':'menu-sidebar--hidden'">
    <div class="sidebar">
      <div class="icon-sidebar">
        <NuxtLink :to="'/'" class="logo">
          <div class="gradient">
            <div class="cutout"></div>
          </div>
        </NuxtLink>


        <nav>
          <ul>
            <li v-for="page in data.pages" :key="page.title">
              <a :href="page.href" :class="activeMenuHref === page.href?'active':''" v-on:click="openMenu(page, $event)">{{ page.title }}</a>
            </li>
          </ul>
        </nav>

      </div>
      <div class="menu-sidebar">

        <nav>
          <ul>
            <li v-for="page in currentMenu" :key="page.title">
              <NuxtLink :to="page.href" :class="activePageHref === page.href?'active':''" v-on:click.native="openPage(page, $event)">
                <span class="menu-sidebar-link-content">
                  <span class="menu-sidebar-icon"><img src="../static/icons/graph-active.svg" /></span>
                  <span class="menu-sidebar-text"> {{ page.title }}</span>
                </span>
              </NuxtLink>
            </li>
           </ul>
        </nav>

        <div class="menu-sidebar-close" v-on:click="toggleSidebarMenu">
          <span class="icon-close" :style="closeIconStyle"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.25H2.8725L7.065 1.0575L6 0L0 6L6 12L7.0575 10.9425L2.8725 6.75H12V5.25Z" fill="currentColor"/>
          </svg></span><span class="hide-when-closed"> Свернуть</span>
        </div>
      </div>
    </div>
    <div class="menu-with-sidebar-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Sidebar",
      data: function(){
        return {
          activeMenuHref: '/',
          activePageHref: '/',
          hidden: true,
          opened: false,
          currentMenu: []
        }
      },
      props: ['data'],
      computed: {
        closeIconStyle: function(){
          return this.opened?'transform: rotate(0deg);':'transform: rotate(180deg);';
        }
      },
      mounted() {

      },
      methods: {
        openPage(page, event){
          this.activePageHref = page.href;
        },
        openMenu(page, event){
          const menu = page.menu;
          this.activeMenuHref = page.href;
          if (event) {
            event.preventDefault()
          }
          this.opened = true;
          this.$el.classList.remove('menu-sidebar--closed')
          this.hidden = false;
          this.currentMenu = menu;
          this.$el.classList.remove('menu-sidebar--hidden');
          console.log('open menu', menu);
          console.log(this.closeIconStyle)
        },
        toggleSidebarMenu: function(){
          this.opened = !this.opened;
          this.hidden = false;
          this.$el.classList.toggle('menu-sidebar--closed')
          console.log(this.closeIconStyle)
        }
      }
    }
</script>


<style lang="scss">
  @import '../assets/scss/common';


  .menu-sidebar {
    position: relative;
    background: #0043C4; /* primary*/
    width: 300px;
    height: 100vh;
    overflow-y: hidden;
    overflow-x: hidden;
    box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.15);

    transition: width 500ms linear;
    .menu-sidebar-icon{
      display: inline-block;
      width: 34px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .menu-with-sidebar-content{
    height: 100vh;
    overflow-y: auto;
    z-index: 1;
    margin-left: 370px;
    transition: margin-left 500ms linear;
    position: relative;
    min-height: 100vh;
  }


  .sidebar-placeholder{
    width: 370px;
    flex: 0 0;
  }
  .container-with-sidebar{
    z-index: 1;
    position: relative;
    overflow-y: hidden;
  }

  .sidebar{
    z-index: 2;
    display: flex;
    flex-direction: row;
    font-family: 'Roboto', sans-serif;
    background: $primary-color;
    color: $text-on-primary-color;
    font-size: 14px;
    line-height: 16px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: hidden;
    overflow-x: hidden;
    .logo{
      display: inline-block;
      padding: 4px;
      .gradient{
        margin-bottom: 44px;
        position: relative;
        background: conic-gradient(#0158FF 45deg, #FF9132 45deg, #FF650E 180deg, #FDDD71 180deg, #FEB24C 315deg, #0158FF 315deg);
        width: 32px;
        height: 32px;
        border-radius: 16px;
        .cutout{
          position: absolute;
          top: 7px;
          left: 7px;
          width: 18px;
          height: 18px;
          background: #0043C4;
          border-radius: 9px;
        }
      }
    }
    a {
      color: inherit;
    }
    .icon-sidebar{
      background: $primary-color; /* primary*/
      width: 70px;
      height: 100vh;
      padding: 15px 15px 0 15px;
      overflow-y: hidden;
      box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.15);
        nav{
          ul{
            list-style: none;
            margin: 0;
            padding: 0;
            li{
              list-style: none;
              margin: 0;
              padding: 0;
              a{
                overflow: hidden;
                display: block;
                color: inherit;
                text-decoration: none;
                width: 40px;
                height: 40px;
                line-height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                text-align: center;
                margin-bottom: 15px;
                .extra{

                }
                &.active{
                  background: $primary-active-color;
                }
                &:hover{
                  background: $primary-hover-color;
                }
              }
            }
          }

      }
    }
    .menu-sidebar{

      nav {
        transition: padding 500ms linear;
        padding: 20px;
        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          li {
            list-style: none;
            margin: 0;
            padding: 0;

            a {
              overflow: hidden;
              display: block;
              color: inherit;
              text-decoration: none;
              height: 40px;
              line-height: 24px;
              border-radius: 10px;
              text-align: left;
              margin-bottom: 15px;
              padding: 8px;
              .menu-sidebar-link-content{
                display: inline-block;
                width: 370px;
                .menu-sidebar-text{
                  display: inline-block;
                  vertical-align: middle;
                  width: 300px;
                  opacity: 1;
                  transition: opacity 500ms linear;
                }
              }
              img, object{
                display: inline-block;
                color: #f2f2f2;
                width: 24px;
                height: 24px;
                vertical-align: middle;
              }
              &.active {
                background: $primary-active-color;
              }

              &:hover {
                background: {
                  color: $primary-hover-color;
                }
              }
            }
          }
        }
      }
      .menu-sidebar-close{
        .icon-close{
          color: #f2f2f2;
          display: inline-block;
          transform-origin: 50% 50%;
          transition: transform 500ms linear;
          transform: rotate(0deg);
        }
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        height: 50px;
        line-height: 50px;
        color: #ffffff;
        text-align: center;
      }
    }
  }

  .show-when-closed {
    display: none;
  }
  .menu-sidebar--closed{
    .menu-sidebar {
      width: 70px;
      transition: width 500ms linear;
      nav {
        padding: 20px 10px;
        ul li a {
          .menu-sidebar-link-content{
            .menu-sidebar-text {
              opacity: 0;
            }
          }
        }
      }
      .hide-when-closed{
        display: none;
      }
      .show-when-closed{
        display: unset;
      }
    }
    .menu-with-sidebar-content{
      margin-left: 140px;
    }
  }
  .menu-sidebar--hidden{
    .menu-sidebar {
      width: 0;
    }
    .menu-with-sidebar-content{
      margin-left: 70px;
    }
  }

</style>
