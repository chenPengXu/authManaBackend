<template>
  <div class="g-content-c p-module">
    <div class="g-form-layout-m">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="角色ID" prop="roleId">
          <Input v-model="formValidate.roleId" :maxlength="30" placeholder="ID值请确认"></Input>
        </Form-item>
        <Form-item label="模块ID" prop="moduleId">
          <Input v-model="formValidate.moduleId" :maxlength="30" placeholder="ID值请确认"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit()">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script>
import { apiDoActionAdd } from '@/api'

export default {
  data() {
    return {
      formValidate: {
        roleId: '',
        moduleId: '',
      },
      ruleValidate: {
        roleId: [
          { required: true, message: 'ID值不能为空', trigger: 'blur' }
        ],
        moduleId: [
          { required: true, message: 'ID值不能为空', trigger: 'blur' }
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
      const resInfo = await apiDoActionAdd(params)
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
