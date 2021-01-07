<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="querryInfo.querry"
            @click="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="uname"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="真实姓名" prop="user_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.gender" @userStateChanged(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                icon="el-icon-setting"
                type="warning"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="querryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主题 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
      var checkEmail=(rule,value,cb)=>{
          const regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if(regEmail.test(value)) {return cb()}
          cb(new Error('请输入合法邮箱'))
      }
      
    return {
      querryInfo: {
        querry: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
      },
      addFormRules:{
          username:[
              {
                  required:true,
                  message:'请输入用户名',
                  trigger:'blur'
              },
                  { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
              
          ],
          password:[
              {
                  required:true,
                  message:'请输入密码',
                  trigger:'blur'
              },
                  { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
              
          ],
          email:[
              {
                  required:true,
                  message:'请输入邮箱',
                  trigger:'blur',

              },
              {
                  validator:checkEmail,
                  trigger:'blur'
              }
          ],
          mobile:[
              {
                  required:true,
                  message:'请输入手机号',
                  trigger:'blur'
              },
          ],
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.axios.get("/users");
      if (res.code !== 200) return this.$message.error("登录失败");

      this.userlist = res.info;
      //   let n=res.info
      //   let arr=[]
      //   n.forEach((val,index,val_arr)=>{
      //              console.log(val.uname);

      //             arr.push(val.uname)
      //             //console.log(this.userlist)
      //       });
      //     this.userlist=arr;
      // console.log(this.userlist)
    },
    //   监听page改变
    handleSizeChange(newSize) {
      console.log(newSize);
      this.querryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值
    handleCurrentChange(newPage) {
      this.querryInfo.pagenum = newPage;
    },
    userStateChanged(userinfo) {
      console.log(userinfo);
    },
  },
};
</script>
<style scoped>
</style>