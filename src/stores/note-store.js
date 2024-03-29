import { defineStore, createPinia } from 'pinia'
import { getAllnotes, delNote, addNote, updateNote, uploadImage, deleteImage } from 'src/api/note'
import { userStore } from 'src/stores/user-store'
import { Notify } from 'quasar'
createPinia()
export const noteStore = defineStore('noteStore', {

  state () {

  },
  actions: {
    async getallnotes () {
      return await getAllnotes()
        .then((res) => {
          Notify.create('笔记获取成功')
          return res.data.data
        })
        .catch(e => {
          Notify.create('笔记获取失败')
        })
    },
    async delnote (id) {
      return await delNote({ id })
        .then(r => {
          Notify.create('笔记删除成功')
          return true
        })
        .catch(e => {
          Notify.create('笔记删除失败')
          return Promise.reject()
        })
    },
    async addnote (info) {
      return await addNote({ title: info.title, intro: info.intro })
        .then(r => {
          Notify.create('笔记添加成功')
          return true
        })
        .catch(e => {
          Notify.create('笔记添加失败: ' + e.data.msg)
          return false
        })
    },
    async updatenote (data) {
      return await updateNote(data)
        .then(r => {
          Notify.create('Note更新成功')
          return true
        })
        .catch(e => {
          Notify.create('Note更新失败: ' + e.data.msg)
          return false
        })
    },
    async uploadimage (formdata) {
      return await uploadImage(formdata)
        .then(r => {
          Notify.create('图片已上传')
          return r.data.data
        })
        .catch(e => {
          Notify.create('图片上传失败')
          return Promise.reject()
        })
    },
    async deleteimage (filename) {
      return await deleteImage({ filename })
        .then(r => {
          Notify.create('图片已删除')
          return r.data.filename
        })
        .catch(e => {
          Notify.create('图片删除失败')
          return Promise.reject()
        })
    }
  }
}
)
