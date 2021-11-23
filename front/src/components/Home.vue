<script setup>
import ky from 'ky';
import { ref, reactive } from 'vue'

const base = "http://localhost:8000"
const tasks = ref([])
const newTask = reactive({  // v-modelの値と合わせる。
  title: ''
})

async function getTasks(){
  try{
    const res = await ky(`${base}/tasks`);
    tasks.value = await res.json()
  } catch(err){
    console.error('🔥', err)
  }
}

async function postTask(){
  try {
    const data = await ky.post(`${base}/tasks`, {
      json: {
        title: newTask.title
      }
    }).json();

    // 作成のために入力したフォームをクリア
    newTask.title = ''
    // タスク一覧を更新するため作成したタスクを現在のタスクに追加
    tasks.value.push(data)
  } catch (err) {
    console.error('🔥',err)
  }
}

async function deleteTasks(id){
  try {
    await ky.delete(`${base}/tasks/${id}`)
    // 表示されているタスク一覧から削除したタスクをfilterで除外
    // その除外したタスク一覧をリアクティブに現在のタスク一覧に反映。
    tasks.value = tasks.value.filter(task => task.id != id)
  } catch (error) {
    console.error('🔥',err);
  }
}

(async () => {
  await getTasks()
})()

</script>

<template>
  <!-- 新規作成フォーム -->
  <div class="form-control">
    <label class="label">
      <span class="label-text">新規作成</span>
    </label>
    <div class="flex space-x-2">
      <input type="text" v-model="newTask.title" placeholder="タイトルを入力してください。" class="w-full input input-bordered"> 
      <button class="btn btn-primary" @click="postTask">新規作成</button>
    </div>
  </div>
  <!-- 一覧 -->
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th> 
          <th>タイトル</th> 
          <th>完了/未完了</th>
          <th></th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="task in tasks" :key="task">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td> 
          <td>{{ task.done }}</td>
          <td>
            <button class="btn btn-outline btn-circle" @click="deleteTasks(task.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
