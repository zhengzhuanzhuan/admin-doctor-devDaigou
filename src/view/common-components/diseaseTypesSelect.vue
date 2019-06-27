<template>
	<Select
		class="second-select"
		:placeholder="placeholderText"
		ref="remoteSelect"
		v-model="secondSelectValue"
		:multiple="isMultiple"
		:clearable="!isMultiple"
		filterable
		remote
		:remote-method="remoteMethod"
		@on-change="handleDiseaseSelect"
		:loading="loading">
		<Option v-for="option in secondOptions" :value="option.paramId" :key="option.paramId">{{option.paramName}}</Option>
	</Select>
</template>

<script>
	import { debounce } from '@/libs/businessUtil'

	export default {
		name: 'disease-types-select',
		props: {
			isMultiple: {
				type: Boolean,
				default: false
			},
			showIcd: {
				type: Boolean,
				default: false
			},
			secondValue: {
				type: Array,
				default: function () {
					return []
				}
			},
			placeholderText: {
				type: String,
				default: '查找需要添加的疾病'
			}
		},
		data () {
			return {
				secondOptions: [],
				secondOptionsObj: {},
				secondSelectValue: this.isMultiple ? [] : '',
				loading: false,
				secondSelectedArr: []
			}
		},
		methods: {
			handleDiseaseSelect () {
				this.$emit('diseaseChosen')
			},
			async queryMethod (query) {
				query = query.split('|')[0]
				this.loading = true
				const res = await this.$API.diseaseManage.newList({ icdName: query }).catch(e => {
					this.loading = false
				})
				this.secondOptions = []
				// iview 中，会根据query的值和option中的文字，再筛选一遍，导致输入 助记码时，虽然后端数据不为空，但当输入框内容不为空时，下拉框选项仍然是无数据
				res.data.forEach(item => {
					item.paramId = item.diseaseId
					item.paramName = `${item.icdName}|${item.zjm}|${item.icd}`
					this.secondOptionsObj[item.paramId] = item
				})
				this.secondOptions = res.data
				this.loading = false
			},
			remoteMethod (query) {
				if (query !== '') {
					const debounceAjax = debounce(this.queryMethod, 500)
					debounceAjax(query)
				} else {
					this.secondOptions = []
				}
			},
			/**
			 * @description 供父组件调用
			 * @return {{firstData: *, secondData: Array}}
			 */
			getSelectedData () {
				const res = {
					secondData: this.isMultiple ? [] : {}
				}
				if (this.isMultiple) {
					this.secondSelectValue.forEach(item => {
						res.secondData.push(this.secondOptionsObj[item])
					})
				} else {
					res.secondData = this.secondOptionsObj[this.secondSelectValue] || ''
				}
				// 去除加上的助记码
				if (res.secondData) {
					if (res.secondData instanceof Array) {
						res.secondData.forEach(item => {
							if (typeof item !== 'string') {
								item.paramName = item.paramName.split('|')[0]
							}
						})
					} else {
						if (res.secondData.paramName) {
							res.secondData.paramName = res.secondData.paramName.split('|')[0]
						}
					}
				}
				return res
			},
			setQueryNull () {
				this.$refs.remoteSelect.setQuery(null)
			}
		}
	}
</script>

<style lang="less">
	.second-select > .ivu-select-selection {
		height: auto;
		max-height: 200px;
		overflow-y: auto;
	}
</style>
