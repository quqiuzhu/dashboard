<template>
  <div class="app-home">
    <div class="app-header">
      <app-header></app-header>
    </div>
    <div class="app-content" :class="{hideSidebar:!sidebar.opened}">
      <sidebar class="app-sidebar"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>


<script>
import { Navbar, Sidebar, AppMain, AppHeader } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppHeader
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-home {
        position: absolute;
    		top: 0px;
    		bottom: 0px;
    		width: 100%;
        .app-header {
            position: absolute;
            height: 60px;
            top: 0;
            left: 0;
            right: 0;
      			background: #1d8ce0;
      			color:#fff;
            transition: all .16s ease-out;
        }
        .app-content {
            display: flex;
            position: absolute;
            top: 60px;
            right: 0;
            left: 0;
            bottom: 0px;
            overflow: hidden;
            &.hideSidebar {
                .app-sidebar {
                  flex:0 0 48px;
                  width: 48px;
                  overflow-y: scroll;
                  transition: all .16s ease-out;
                }
                .main-container {
                    flex:1;
                }
            }
            .app-sidebar {
                flex:0 0 230px;
                width: 230px;
                overflow-y: scroll;
                transition: all .16s ease-out;
            }
            .main-container {
              flex:1;
              overflow-y: scroll;
              padding: 20px;
            }
      }
  }
</style>
