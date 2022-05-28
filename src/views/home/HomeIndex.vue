<template>
  <a-affix class="add-button" :offset-bottom="0">
    <a-button size="large" type="primary" shape="circle">
      <template #icon>
        <Icon icon="PlusOutlined" />
      </template>
    </a-button>
  </a-affix>
  <a-calendar v-model:value="value">
    <template #headerRender="{ value: current, onChange }">
      <div style="padding: 10px">
        <a-row justify="end" align="middle">
          <a-col>
            <a-select size="small" :dropdown-match-select-width="false" class="my-year-select"
              :value="String(current.year())" @change="
                (newYear: any) => {
                  onChange(current.year(newYear));
                }
              ">
              <a-select-option v-for="val in getYears(current)" :key="String(val)" class="year-item">
                {{ val }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <a-select size="small" :dropdown-match-select-width="false" :value="String(current.month())" @change="
              (selectedMonth: any) => {
                onChange(current.month(parseInt(String(selectedMonth), 10)));
              }
            ">
              <a-select-option v-for="(val, index) in getMonths(current)" :key="String(index)" class="month-item">
                {{ val }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
    </template>

    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
  </a-calendar>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { Icon } from '@/util/icon'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const value = ref<Dayjs>()

const getListData = (value: Dayjs) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ]
      break
    default:
  }
  return listData || []
}

const getMonths = (value: any) => {
  const localeData = value.localeData()
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)))
  }
  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}
</script>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.add-button {
  height: 0px;
  position: absolute;
  bottom: 100px;
  right: 100px;
  z-index: 999;
}
</style>
