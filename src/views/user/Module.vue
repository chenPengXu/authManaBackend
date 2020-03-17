<template>
  <div class="g-content-c p-module">
    <div class="g-form-layout-m">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="模块名称" prop="name">
          <Input v-model="formValidate.name" :maxlength="30" placeholder="名称需与前端路由定义中一致(英文)"></Input>
        </Form-item>
        <Form-item label="模块路径" prop="path">
          <Input v-model="formValidate.path" :maxlength="30" placeholder="路径需与前端路由定义中一致"></Input>
        </Form-item>
        <Form-item label="模块描述" prop="desc">
          <Input v-model="formValidate.desc" placeholder="描述"></Input>
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
import { apiDoModuleAdd } from '@/api'

export default {
  data() {
    return {
      formValidate: {
        name: '',
        path: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路径不能为空', trigger: 'blur' }
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
      const resInfo = await apiDoModuleAdd(params)
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
