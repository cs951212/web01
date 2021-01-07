<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="headerTitle">
        <img src="../assets/logo.png" alt="" />
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '70px' :'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 菜单 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router default-active="users">
            <!-- 一级菜单 -->
          <el-submenu index="1">
              <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span></template
            >
            <!-- 二级菜单 -->
            <el-menu-item index="users">
              <template slot="title"><i class="el-icon-menu"></i><span>用户列表</span></template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-unlock"></i>
              <span>权限管理</span> </template
            >
            <!-- 二级菜单 -->
            <el-menu-item index="2-1">
              <template slot="title"><i class="el-icon-menu"></i><span>角色列表</span> </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title"><i class="el-icon-menu"></i>
              <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
              <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-shopping-bag-1"></i>
              <span>商品管理</span>
              </template
            >
            <!-- 二级菜单 -->
            <el-menu-item index="3-1">
              <template slot="title"><i class="el-icon-menu"></i>
              <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title"><i class="el-icon-menu"></i>
              <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title"><i class="el-icon-menu"></i>
              <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
              <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-tickets"></i>
              <span>订单管理</span>
              </template
            >
            <!-- 二级菜单 -->
            <el-menu-item index="4-1">
              <template slot="title">选项</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
              <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
              </template
            >
            <!-- 二级菜单 -->
            <el-menu-item index="5-1">
              <template slot="title">选项4</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse:false
    }
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    }
  },
};
</script>
<style scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.el-aside {
  background-color: #333744;
  
}
.el-menu{
  border: 0;
}
.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
.headerTitle {
  height: 50px;
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.headerTitle > img {
  height: 100%;
}
.headerTitle > span {
  color: #fff;
  font-size: 20px;
  margin-left: 15px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>