<template>
  <div class="g-content-c p-module">
    <div class="g-form-layout-m">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Form-item label="权限角色名称" prop="name">
          <Input v-model="formValidate.name" :maxlength="30" placeholder="角色名称(英文)"></Input>
        </Form-item>
        <Form-item label="权限角色描述" prop="desc">
          <Input v-model="formValidate.desc" placeholder="描述"></Input>
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
import { apiDoRoleAdd } from '@/api'

export default {
  data() {
    return {
      formValidate: {
        name: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
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
      const resInfo = await apiDoRoleAdd(params)
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
