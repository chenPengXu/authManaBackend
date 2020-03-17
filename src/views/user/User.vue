<template>
  <div class="g-content-c p-user-ist">
    <div class="g-form-layout-m">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Form-item label="管理用户名称" prop="name">
          <Input v-model="formValidate.name" :maxlength="30" placeholder="名称(英文)"></Input>
        </Form-item>
        <Form-item label="密码设置" prop="pwd">
          <Input v-model="formValidate.pwd" placeholder="密码"></Input>
        </Form-item>
        <Form-item label="角色ID" prop="roleId">
          <Input v-model="formValidate.roleId" placeholder="角色ID"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit()">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
      <div class="role-tip">
        <p>1. 添加角色； 2. 添加用户； 3. 将用户赋与角色；</p>
        <p>4. 添加模块； 5. 权限设置中将角色与模块关联</p>
      </div>
    </div>
  </div>
</template>
<script>
import { apiDoUserAdd } from '@/api'

export default {
  data() {
    return {
      formValidate: {
        name: '',
        pwd: '',
        roleId: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.doAdd()
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset() {
      this.$refs['formValidate'].resetFields()
    },
    async doAdd() {
      const params = {
        ...this.formValidate
      }
      const resInfo = await apiDoUserAdd(params)
      if (resInfo.ret) {
        this.$Message.success('提交成功!')
        this.handleReset()
      } else {
        this.$Message.error('添加失败!')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .role-tip
    font-size 12px
    color #999
</style>
