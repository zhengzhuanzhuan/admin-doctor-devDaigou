<template>
	<div class="analysis-condition">
		<Card :bordered="false" dis-hover class="lf-layout top-wrapper margin-bottom-8" v-if="type === 1">
			<span class="lf-layout-left" style="margin-top: 5px;">快速分析模板</span>
			<div class="lf-layout-right top-tags">
				<Tag v-for="(item, index) in templateArray"
					 :class="{'with-border': item.id !== chosenTemplateId, 'ivu-tag-checked': item.id === chosenTemplateId}"
					 :key="item.id"
					 :name="item.id"
					 :checkable="item.id !== chosenTemplateId"
					 closable
					 :color="item.id === chosenTemplateId ? 'primary' : 'default'"
					 @on-close="handleTemplateDelete(item.id, index)"
					 @click.native="handleTagChoose(item)"
				>{{item.templateName}}</Tag>
			</div>
		</Card>
		<Card :bordered="false" dis-hover class="margin-top-8 padding0">
			<Collapse v-model="collapseValue">
				<Panel name="1">
					分析条件
					<div slot="content">
						<div class="lf-layout">
							<span class="lf-layout-left black text-align-right margin-top-8">科室</span>
							<Tree class="lf-layout-right org-tree" :data="orgArray" ref="orgTree" multiple show-checkbox></Tree>
						</div>
						<div class="lf-layout" v-if='type !== 3'>
							<span class="lf-layout-left black text-align-right">医生</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataDoctorArray.length"
										:indeterminate="indeterminateDoctor"
										:value="checkAllDoctor"
										@click.prevent.native="handleCheckAll('Doctor')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllDoctor}" @click="toggleShowAll('Doctor')" v-show="dataDoctorArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupDoctor" @on-change="checkAllGroupChange('Doctor', $event)" v-show="isShowAllDoctor" class="special-group">
										<Checkbox v-for="item in dataDoctorArray" :key="item.userId" :label="item.userId">{{item.realName || '暂无真实姓名'}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">性别</span>
							<div class="lf-layout-right">
								<Checkbox
									:indeterminate="indeterminateSex"
									:value="checkAllSex"
									@click.prevent.native="handleCheckAll('Sex')">全部</Checkbox>
								<CheckboxGroup v-model="checkAllGroupSex" @on-change="checkAllGroupChange('Sex', $event)" class="inline-block-layout">
									<Checkbox v-for="item in dataSexArray" :key="item" :label="item">{{item}}</Checkbox>
								</CheckboxGroup>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">年龄</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall-special">
									<Checkbox
										:disabled="!dataAgeArray.length"
										:indeterminate="indeterminateAge"
										:value="checkAllAge"
										@click.prevent.native="handleCheckAll('Age')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllAge}" @click="toggleShowAll('Age')" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupAge" @on-change="checkAllGroupChange('Age', $event)" class="special-tags" v-show="isShowAllAge">
										<Tag type="border" closable v-for="(item, index) in dataAgeArray" :key="item" @on-close="handleDelete('Age', index)">
											<Checkbox :key="item" :label="`${item}`">{{item}}岁</Checkbox>
										</Tag>
										<div class="add-wrapper add-wrapper-special">
											<Input search enter-button="添加" placeholder="起年龄-止年龄" v-model.trim="addAgeValue" @on-search="handleAdd('Age')" />
										</div>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 3">
							<span class="lf-layout-left black text-align-right">随访类型</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataFotypeArray.length"
										:indeterminate="indeterminateFotype"
										:value="checkAllFotype"
										@click.prevent.native="handleCheckAll('Fotype')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllFotype}" @click="toggleShowAll('Fotype')" v-show="dataFotypeArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupFotype" @on-change="checkAllGroupChange('Fotype', $event)" v-show="isShowAllFotype" class="special-group">
										<Checkbox v-for="(item, index) in dataFotypeArray" :key="index" :label="item.planTypeId">{{item.planTypeName}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 3">
							<span class="lf-layout-left black text-align-right">随访方案</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataFollschemeArray.length"
										:indeterminate="indeterminateFollscheme"
										:value="checkAllFollscheme"
										@click.prevent.native="handleCheckAll('Follscheme')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllFollscheme}" @click="toggleShowAll('Follscheme')" v-show="dataFollschemeArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupFollscheme" @on-change="checkAllGroupChange('Follscheme', $event)" v-show="isShowAllFollscheme" class="special-group">
										<Checkbox v-for="(item, index) in dataFollschemeArray" :key="index" :label="item.schemeId">{{item.schemeName}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout">
							<span class="lf-layout-left black text-align-right">疾病名称</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataDiseaseArray.length"
										:indeterminate="indeterminateDisease"
										:value="checkAllDisease"
										@click.prevent.native="handleCheckAll('Disease')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllDisease}" @click="toggleShowAll('Disease')" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupDisease" @on-change="checkAllGroupChange('Disease', $event)" v-show="isShowAllDisease" class="margin-top-8 special-tags">
										<Tag type="border" closable v-for="(item, index) in dataDiseaseArray" :key="item" @on-close="handleDelete('Disease', index)">
											<Checkbox :key="item" :label="item"></Checkbox>
										</Tag>
										<div class="add-wrapper">
											<disease-types-select :show-icd="true" ref="diseaseRef"></disease-types-select>
											<Button @click="handleAdd('Disease')" type="primary" class="add-wrapper-btn">添加</Button>
										</div>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">用药不良反应</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall-special">
									<Checkbox
										:disabled="!dataDrugArray.length"
										:indeterminate="indeterminateDrug"
										:value="checkAllDrug"
										@click.prevent.native="handleCheckAll('Drug')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllDrug}" @click="toggleShowAll('Drug')" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupDrug" @on-change="checkAllGroupChange('Drug', $event)" class="special-tags" v-show="isShowAllDrug">
										<Tag type="border" closable v-for="(item, index) in dataDrugArray" :key="item" @on-close="handleDelete('Drug', index)">
											<Checkbox :key="item" :label="item"></Checkbox>
										</Tag>
										<div class="add-wrapper add-wrapper-special">
											<Input search enter-button="添加" placeholder="输入需要添加的不良反应" v-model.trim="addDrugValue" @on-search="handleAdd('Drug')" />
										</div>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">用药处方</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall-special">
									<Checkbox
										:disabled="!dataPrescriptionArray.length"
										:indeterminate="indeterminatePrescription"
										:value="checkAllPrescription"
										@click.prevent.native="handleCheckAll('Prescription')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllPrescription}" @click="toggleShowAll('Prescription')" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupPrescription" @on-change="checkAllGroupChange('Prescription', $event)" class="special-tags" v-show="isShowAllPrescription">
										<Tag type="border" closable v-for="(item, index) in dataPrescriptionArray" :key="item" @on-close="handleDelete('Prescription', index)">
											<Checkbox :key="item" :label="item"></Checkbox>
										</Tag>
										<div class="add-wrapper add-wrapper-special">
											<Input search enter-button="添加" placeholder="输入需要添加的不良反应" v-model.trim="addPrescriptionValue" @on-search="handleAdd('Prescription')" />
										</div>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">用药依从性</span>
							<div class="lf-layout-right">
								<Checkbox
									:indeterminate="indeterminateRate"
									:value="checkAllRate"
									@click.prevent.native="handleCheckAll('Rate')">全部</Checkbox>
								<CheckboxGroup v-model="checkAllGroupRate" @on-change="checkAllGroupChange('Rate', $event)" class="inline-block-layout">
									<Checkbox v-for="item in dataRateArray" :key="item" :label="item">{{item}}</Checkbox>
								</CheckboxGroup>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 1">
							<span class="lf-layout-left black text-align-right">治疗效果</span>
							<div class="lf-layout-right">
								<Checkbox
									:indeterminate="indeterminateEffect"
									:value="checkAllEffect"
									@click.prevent.native="handleCheckAll('Effect')">全部</Checkbox>
								<CheckboxGroup v-model="checkAllGroupEffect" @on-change="checkAllGroupChange('Effect', $event)" class="inline-block-layout">
									<Checkbox v-for="item in dataEffectArray" :key="item" :label="item">{{item}}</Checkbox>
								</CheckboxGroup>
							</div>
						</div>
							<div class="lf-layout" v-if="type === 3">
							<span class="lf-layout-left black text-align-right">采集情况</span>
							<div class="lf-layout-right">
								<Checkbox
									:indeterminate="indeterminateCollect"
									:value="checkAllCollect"
									@click.prevent.native="handleCheckAll('Collect')">全部</Checkbox>
								<CheckboxGroup v-model="checkAllGroupCollect" @on-change="checkAllGroupChange('Collect', $event)" class="inline-block-layout">
									<Checkbox v-for="(item, index) in dataCollectArray" :key="index" :label="index">{{item}}</Checkbox>
								</CheckboxGroup>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 3">
							<span class="lf-layout-left black text-align-right">通话状态</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataCallstatusArray.length"
										:indeterminate="indeterminateCallstatus"
										:value="checkAllCallstatus"
										@click.prevent.native="handleCheckAll('Callstatus')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllCallstatus}" @click="toggleShowAll('Callstatus')" v-show="dataCallstatusArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupCallstatus" @on-change="checkAllGroupChange('Callstatus', $event)" v-show="isShowAllCallstatus" class="special-group">
										<Checkbox v-for="(item, index) in dataCallstatusArray" :key="index" :label="item.paramCode">{{item.paramName}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout">
							<span class="lf-layout-left black text-align-right">随访时间</span>
							<div class="lf-layout-right">
								<date-time-picker :timeBegin.sync="dateBegin"  :timeEnd.sync="dateEnd" :is-default-today="true"></date-time-picker>
							</div>
						</div>
						<!--异常指标块有的-->
						<div class="lf-layout" v-if="type === 2">
							<span class="lf-layout-left black text-align-right">方案名称</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataSchemeArray.length"
										:indeterminate="indeterminateScheme"
										:value="checkAllScheme"
										@click.prevent.native="handleCheckAll('Scheme')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllScheme}" @click="toggleShowAll('Scheme')" v-show="dataSchemeArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupScheme" @on-change="checkAllGroupChange('Scheme', $event)" v-show="isShowAllScheme" class="special-group">
										<Checkbox v-for="item in dataSchemeArray" :key="item.schemeId" :label="item.schemeId">{{item.schemeName}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<div class="lf-layout" v-if="type === 2">
							<span class="lf-layout-left black text-align-right">异常指标</span>
							<div class="lf-layout-right">
								<div class="lf-layout-right-checkall">
									<Checkbox
										:disabled="!dataIndexArray.length"
										:indeterminate="indeterminateIndex"
										:value="checkAllIndex"
										@click.prevent.native="handleCheckAll('Index')">全部</Checkbox>
									<Icon type="ios-arrow-forward" :class="{'icon-rotate': isShowAllIndex}" @click="toggleShowAll('Index')" v-show="dataIndexArray.length" />
								</div>
								<transition name="fade">
									<CheckboxGroup v-model="checkAllGroupIndex" @on-change="checkAllGroupChange('Index', $event)" v-show="isShowAllIndex" class="special-group">
										<Checkbox v-for="(item, index) in dataIndexArray" :key="index" :label="item.targetId">{{item.targetName}}</Checkbox>
									</CheckboxGroup>
								</transition>
							</div>
						</div>
						<Divider/>
						<div>
							<Button type="primary" class="margin-right-24" style="width: 104px;" @click="handleSearch">分析</Button>
							<Button type="primary" @click="showModal=true;templateName=''" v-if="type === 1">保存分析条件</Button>
						</div>
					</div>
				</Panel>
			</Collapse>
		</Card>
		<!--分析模板 名称输入弹框-->
		<Modal
			v-model="showModal"
			:mask-closable="false"
			title="分析条件的模板名称">
			<Input placeholder="请输入需要保存的分析条件名称" v-model.trim="templateName"/>
			<div slot="footer">
				<Button type="primary" @click="handleTemplateSave">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { formatToTreeData } from '@/libs/businessUtil'
import DiseaseTypesSelect from './diseaseTypesSelect'
import DateTimePicker from './dateTimePicker'
export default {
    name: 'analysisCondition',
    components: { DateTimePicker, DiseaseTypesSelect },
    props: {
    	// 父组件类型  1:治疗情况， 2:异常指标
        type: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
        	userId: sessionStorage.getItem('rsysUserId'),
        	templateArray: [],
					chosenTemplateId: '',
					orgArray: [],
					collapseValue: '1',
					// 医生
					dataDoctorArray: [],
					indeterminateDoctor: false,
					checkAllDoctor: false,
					checkAllGroupDoctor: [],
					// 性别
					dataSexArray: ['男', '女'],
					indeterminateSex: false,
					checkAllSex: true,
					checkAllGroupSex: ['男', '女'],
					// 采集情况
					dataCollectArray: ['未采集', '部分采集', '完整采集'],
					indeterminateCollect: false,
					checkAllCollect: true,
					checkAllGroupCollect: [0, 1, 2],
					// 随访类型
					dataFotypeArray: [],
					indeterminateFotype: false,
					checkAllFotype: false,
					checkAllGroupFotype: [],
					isShowAllFotype: true,
					// 随访方案
					dataFollschemeArray: [],
					indeterminateFollscheme: false,
					checkAllFollscheme: false,
					checkAllGroupFollscheme: [],
					isShowAllFollscheme: true,
					// 通话状态
					dataCallstatusArray: [],
					indeterminateCallstatus: false,
					checkAllCallstatus: false,
					checkAllGroupCallstatus: [],
					isShowAllCallstatus: true,
					// 年龄 Age
					addAgeValue: '',
					dataAgeArray: [],
					indeterminateAge: false,
					checkAllAge: false,
					checkAllGroupAge: [],
					// 疾病
					dataDiseaseArray: [],
					indeterminateDisease: false,
					checkAllDisease: false,
					checkAllGroupDisease: [],
					// 用药不良反应
					addDrugValue: '',
					dataDrugArray: [],
					indeterminateDrug: false,
					checkAllDrug: false,
					checkAllGroupDrug: [],
					// 用药处方Prescription
					addPrescriptionValue: '',
					dataPrescriptionArray: [],
					indeterminatePrescription: false,
					checkAllPrescription: false,
					checkAllGroupPrescription: [],
					// 用药依从性 Rate
					dataRateArray: ['规律', '间断', '不服用'],
					indeterminateRate: false,
					checkAllRate: true,
					checkAllGroupRate: ['规律', '间断', '不服用'],
					// 治疗效果 Effect
					dataEffectArray: ['有效', '一般', '无效'],
					indeterminateEffect: false,
					checkAllEffect: true,
					checkAllGroupEffect: ['有效', '一般', '无效'],
					// 随访时间
					dateBegin: '',
					dateEnd: '',
					showModal: false,
					templateName: '',
					// 全部 是否展开
					isShowAllDoctor: true,
					isShowAllAge: true,
					isShowAllDisease: true,
					isShowAllDrug: true,
					isShowAllPrescription: true,
					dbOrgData: [],
					// type 2 异常指标 data
					// 方案名称
					dataSchemeArray: [],
					indeterminateScheme: false,
					checkAllScheme: false,
					checkAllGroupScheme: [],
					isShowAllScheme: true,
					// 异常指标
					dataIndexArray: [],
					indeterminateIndex: false,
					checkAllIndex: false,
					checkAllGroupIndex: [],
					isShowAllIndex: true
        }
    },
    methods: {
    	/**
		 * @description 选中 模板
		 */
			handleTagChoose (item) {
				this.chosenTemplateId = item.id
				this.formatTemplateData(item.analysisCondition)
				this.handleSearch('auto')
			},
			formatTemplateData (allDataString) {
				const dbData = JSON.parse(allDataString)
				this.formatTreeData(dbData.organizationIds.split(','))
				let mapArraySplit = [
					{
						self: 'Doctor',
						db: 'userIds'
					}
				]
				if (this.type === 1) {
					mapArraySplit = [
						...mapArraySplit,
						{
							self: 'Sex',
							db: 'gender'
						},
						{
							self: 'Rate',
							db: 'medicationCompliance'
						},
						{
							self: 'Effect',
							db: 'treatmentEffect'
						}
					]
				} else if (this.type === 2) {
					mapArraySplit = [
						...mapArraySplit,
						{
							self: 'Scheme',
							db: 'schemeId'
						},
						{
							self: 'Index',
							db: 'targetId'
						}
						]
				}
				mapArraySplit.forEach(item => {
					this[`checkAllGroup${item.self}`] = dbData[item.db] ? dbData[item.db].split(',') : []
				})
				let mapArrayFormat = [
					{
						self: 'Disease',
						db: 'icds'
					}
				]
				if (this.type === 1) {
					mapArrayFormat = [
						...mapArrayFormat,
						{
							self: 'Age',
							db: 'age'
						},
						{
							self: 'Drug',
							db: 'adverseDrugReactions'
						},
						{
							self: 'Prescription',
							db: 'analysisOfDrugPrescription'
						}
					]
				}
				mapArrayFormat.forEach(item => {
					const tempArr = this.formatToArray(dbData[item.db])
					this[`checkAllGroup${item.self}`] = tempArr.chosenArr
					this[`data${item.self}Array`] = tempArr.allArr
				})
				this.dateBegin = dbData.followupTime.split(',')[0]
				this.dateEnd = dbData.followupTime.split(',')[1]
				// 全部 的样式处理
				this.checkAllGroupChange('Doctor', this.checkAllGroupDoctor)
				let checkAllArr = []
				if (this.type === 1) {
					checkAllArr = ['Doctor', 'Disease', 'Sex', 'Age', 'Drug', 'Prescription', 'Rate', 'Effect']
				} else if (this.type === 2) {
					checkAllArr = ['Doctor', 'Disease', 'Scheme', 'Index']
				}
				checkAllArr.forEach(item => {
					this.checkAllGroupChange(item, this[`checkAllGroup${item}`])
				})
			},
			formatToArray (dbString) {
				const dbArr = dbString ? dbString.split(',') : []
				const resObj = {
					allArr: [],
					chosenArr: []
				}
				dbArr.forEach(item => {
					const temp = item.split('|')
					resObj.allArr.push(temp[0])
					if (temp[1] === '1') {
						resObj.chosenArr.push(temp[0])
					}
				})
				return resObj
			},
			formatTreeData (chosenArr = []) {
				this.orgArray = formatToTreeData({
					shouldGetParentNameArr: true,
					baseArr: this.dbOrgData,
					parentIdName: 'parentId',
					idName: 'organizationId',
					sortName: 'sort',
					expand: true,
					childrenFn: function (item) {
						return {
							organizationId: item.organizationId,
							title: item.name,
							parentId: item.parentId,
							sort: item.sort,
							expand: true,
							description: item.description,
							children: []
						}
					},
					selectedArray: chosenArr,
					selectJudgeName: 'organizationId'
				})
			},
			/**
			 * @description 异常指标 ，根据所选方案获取
			 */
			async getTargetIndex () {
				if (this.type === 2) {
					const indexRes = await this.$API.schemeManage.relatedSchemeIndexList({ userId: this.userId, schemeIds: this.checkAllGroupScheme.join(',') })
					this.dataIndexArray = indexRes.data
				}
			},
        async getOptionsData () {
        	// 科室数据
        	const resOrg = await this.$API.organizeManage.orgAuthList({ userId: this.userId })
					this.dbOrgData = resOrg.data || []
					// 医生(关联的用户)
					if (this.type === 1 || this.type === 2) {
						const doctorData = await this.$API.userManage.relatedUserList({ userId: this.userId, isRelation: 1, limit: 10000 })
						this.dataDoctorArray = doctorData.data
						// 当前登录用户
						this.dataDoctorArray.push({
							userId: sessionStorage.getItem('rsysUserId'),
							realName: sessionStorage.getItem('rsysUserRealName')
						})
					}
					// 方案, 指标
					if (this.type === 2) {
        		const schemeRes = await this.$API.schemeManage.relatedSchemeList({ userId: this.userId })
						this.dataSchemeArray = schemeRes.data
					}
					if (this.type === 3) {
						// 随访类型
        		const followTypeRes = await this.$API.followManage.followType({ limit: 9999, pager: 1 })
						this.dataFotypeArray = followTypeRes.data
						// 通话状态
						const callStatusRes = await this.$API.followManage.callStatus({ paramTypeCode: 'callStatus', limit: 9999 })
						this.dataCallstatusArray = callStatusRes.data
					}
        },
        /**
		 * @description 全部按钮方法
		 */
        handleCheckAll (type) {
        	if (type === 'Scheme') {
						this.getTargetIndex()
					}
        	const checkAllName = `checkAll${type}`
            const indeterminateName = `indeterminate${type}`
            if (this[indeterminateName]) {
							this[checkAllName] = false
            } else {
							this[checkAllName] = !this[checkAllName]
            }
            this[indeterminateName] = false
					if (this[checkAllName]) {
						if (type === 'Doctor') {
							const doctorIds = []
							this.dataDoctorArray.forEach(item => {
								doctorIds.push(item.userId)
							})
							this[`checkAllGroup${type}`] = doctorIds
						} else if (type === 'Scheme') {
							const SchemeIds = []
							this.dataSchemeArray.forEach(item => {
								SchemeIds.push(item.schemeId)
							})
							this[`checkAllGroup${type}`] = SchemeIds
						} else if (type === 'Index') {
							const IndexIds = []
							this.dataIndexArray.forEach(item => {
								IndexIds.push(item.targetId)
							})
							this[`checkAllGroup${type}`] = IndexIds
						} else if (type === 'Fotype') {
							this.dataFotypeArray.forEach(item => {
								this[`checkAllGroup${type}`].push(item.planTypeId)
							})
							this.handleFollowSchemes(this[`checkAllGroup${type}`])
						} else if (type === 'Follscheme') {
							this.dataFollschemeArray.forEach(item => {
								this[`checkAllGroup${type}`].push(item.schemeId)
							})
						} else if (type === 'Callstatus') {
							this.dataCallstatusArray.forEach(item => {
								this[`checkAllGroup${type}`].push(item.paramCode)
							})
						} else if (type === 'Collect') {
							this.dataCollectArray.forEach((item, index) => {
								this[`checkAllGroup${type}`].push(index)
							})
						} else {
							this[`checkAllGroup${type}`] = JSON.parse(JSON.stringify(this[`data${type}Array`]))
						}
					} else {
        		if (type === 'Fotype') {
							this.handleFollowSchemes()
        		}
        		this[`checkAllGroup${type}`] = []
        	}
        },
        /**
		 * @description 选择后对 全部 项的样式影响处理
		 */
        checkAllGroupChange (type, data) {
            if (data.length === this[`data${type}Array`].length && data.length !== 0) {
                this[`indeterminate${type}`] = false
                this[`checkAll${type}`] = true
            } else if (data.length > 0) {
                this[`indeterminate${type}`] = true
                this[`checkAll${type}`] = false
            } else {
                this[`indeterminate${type}`] = false
                this[`checkAll${type}`] = false
						}
						if (type === 'Fotype') {
							this.handleFollowSchemes(data)
						}
						if (type === 'Scheme') {
            	this.getTargetIndex()
						}
				},
				// 根据随访类型id获取随访方案
				async handleFollowSchemes (data = []) {
					this.checkAllGroupFollscheme = []
					if (data.length) {
						const res = await this.$API.followCollect.followSchemes({
							activeIds: data.join(),
							userId: this.userId
						})
						this.dataFollschemeArray = res.data
					} else {
						this.dataFollschemeArray = []
					}
				},
        /**
		 * @description 条件中的  添加按钮处理
		 */
        handleAdd (type) {
        	let inputVal = type === 'Disease' ? this.$refs.diseaseRef.getSelectedData().secondData.paramName : this[`add${type}Value`]
            if (inputVal) {
                if (this[`data${type}Array`].includes(inputVal)) {
                    this.$Message.warning('该选项已添加！')
                    return false
                }
                if (type === 'Age') {
                	if (!/\d(-)\d+$/g.test(inputVal)) {
                        this.$Message.warning('格式不正确！')
                        return false
                    } else {
                		const AgeArr = inputVal.split('-')
                		if ((AgeArr[0] - 0) >= (AgeArr[1] - 0)) {
                            this.$Message.warning('起始年龄需小于终止年龄！')
                            return false
                        }
                    }
                }
                this[`data${type}Array`].push(inputVal)
                if (type === 'Disease') {
                    this.$refs.diseaseRef.setQueryNull()
                } else {
                    this[`add${type}Value`] = ''
                }
                // 全选 样式的设置
							  if (this[`checkAllGroup${type}`].length) {
									this[`indeterminate${type}`] = true
								} else {
									this[`indeterminate${type}`] = false
								}
							  this[`checkAll${type}`] = false
            }
        },
        /**
		 * @description 条件中的 tag close
		 */
        handleDelete (type, index) {
        	const arrItem = this[`data${type}Array`][index]
        	this[`data${type}Array`].splice(index, 1)
					if (!this[`data${type}Array`].length) {
						this[`indeterminate${type}`] = false
						this[`checkAll${type}`] = false
						this[`checkAllGroup${type}`] = []
					} else {
        		const chosenIndex = this[`checkAllGroup${type}`].indexOf(arrItem)
        		if (chosenIndex !== -1) {
							this[`checkAllGroup${type}`].splice(chosenIndex, 1)
						}
					}
					if (!this[`checkAllGroup${type}`].length) {
						this[`indeterminate${type}`] = false
						this[`checkAll${type}`] = false
					}
        },
        /**
		 * @description  展开收缩
		 */
        toggleShowAll (type) {
            this[`isShowAll${type}`] = !this[`isShowAll${type}`]
        },
			/**
			 * @description 转换成后端所需的JSon字符串
			 */
			getSearchJsonString () {
				const analysisCondition = {}
				const orgTreeSelected = this.$refs.orgTree.getCheckedNodes()
				const orgIds = []
				orgTreeSelected.forEach(item => {
					orgIds.push(item.organizationId)
				})
				if (this.type === 1 || this.type === 2 || this.type === 3) {
					analysisCondition.organizationIds = orgIds.join(',')
					analysisCondition.icds = this.formatToString(this.dataDiseaseArray, this.checkAllGroupDisease)
					analysisCondition.followupTime = `${this.dateBegin},${this.dateEnd}`
				}
				if (this.type === 1) {
					analysisCondition.userIds = this.checkAllGroupDoctor.join(',')
					analysisCondition.gender = this.checkAllGroupSex.join(',')
					analysisCondition.age = this.formatToString(this.dataAgeArray, this.checkAllGroupAge)
					analysisCondition.adverseDrugReactions = this.formatToString(this.dataDrugArray, this.checkAllGroupDrug)
					analysisCondition.analysisOfDrugPrescription = this.formatToString(this.dataPrescriptionArray, this.checkAllGroupPrescription)
					analysisCondition.medicationCompliance = this.checkAllGroupRate.join(',')
					analysisCondition.treatmentEffect = this.checkAllGroupEffect.join(',')
				} else if (this.type === 2) {
					analysisCondition.userIds = this.checkAllGroupDoctor.join(',')
					analysisCondition.schemeId = this.checkAllGroupScheme.join(',')
					analysisCondition.targetId = this.checkAllGroupIndex.join(',')
				} else if (this.type === 3) {
					// 通话状态
					analysisCondition.callStatus = this.checkAllGroupCallstatus.join(',')
					// 采集状态
					analysisCondition.resultStatus = this.checkAllGroupCollect.join(',')
					analysisCondition.schemeId = this.checkAllGroupFollscheme.join(',')
				}
				return JSON.stringify(analysisCondition)
			},
        /**
		 * @description 保存模板
		 */
        async handleTemplateSave () {
        	if (!this.templateName) {
        		this.$Message.warning('模板名称不能为空！')
                return false
            }
            const postData = {
        		    userId: this.userId,
                templateName: this.templateName,
                templateAscription: this.type
            }
            postData.analysisCondition = this.getSearchJsonString()
					  if (this.type === 2) {
        		  postData.id = this.templateArray[0] ? this.templateArray[0].id : ''
						}
					  const methodName = postData.id ? 'update' : 'create'
            await this.$API.Treatment[methodName](postData)
            this.showModal = false
					  if (this.type === 1) {
							this.getTemplateList('refresh')
						}
        },
        /**
		 * @description 转换成 create接口所需的数据格式
		 * @param allArray
		 * @param chosenArray
		 */
        formatToString (allArray, chosenArray) {
            const resArr = []
            allArray.forEach(item => {
                if (chosenArray.includes(item)) {
                    resArr.push(`${item}|1`)
                } else {
                    resArr.push(`${item}|0`)
                }
            })
            return resArr.join(',')
        },
        /**
		 * @description 删除模板
		 */
        handleTemplateDelete (id, index) {
            this.$Modal.confirm({
                title: '删除提示',
                content: '确定要删除该模板吗?',
                onOk: async () => {
                	  await this.$API.Treatment.delete({ id: id })
									  this.templateArray.splice(index, 1)
                }
            })
        },
        async getTemplateList (type) {
            const res = await this.$API.Treatment.templateList({ userId: this.userId, ascription: this.type })
            this.templateArray = res.data
					  if (this.templateArray.length) {
            	this.chosenTemplateId = this.templateArray[0].id
							if (type === 'init') {
								this.chosenTemplateId = this.templateArray[0].id
								this.handleTagChoose(this.templateArray[0])
							} else {
								this.chosenTemplateId = this.templateArray[this.templateArray.length - 1].id
							}
						} else {
            	this.formatTreeData()
						}
        },
			/**
			 * @description 分析 按钮
			 */
			handleSearch (type = 'click') {
				this.$emit('search', this.getSearchJsonString())
				if (this.type === 2 && type !== 'auto') { // 用户点击分析时才保存条件
					this.templateName = '异常指标分析模板'
					this.handleTemplateSave()
				}
			}
    },
    mounted () {
    	if (this.type === 1 || this.type === 2) {
				this.getOptionsData().then(res => {
						this.getTemplateList('init')
				})
    	} else {
				this.getOptionsData().then(res => {
					this.formatTreeData()
				})
			}
    }
}
</script>

<style lang="less">
	.analysis-condition{
		.ivu-divider-horizontal{
			margin: 16px 0;
		}
		.top-wrapper{
			.ivu-card-body{
				min-height: 64px;
			}
		}
		.inline-block-layout{
			display: inline-block;
			margin-left: 16px;
		}
		.lf-layout {
			margin-bottom: 16px;
			transition: all ease-in-out 0.5s;
			.ivu-tag {
				margin: 0;
			}
			.ivu-checkbox-group-item {
				margin-right: 24px;
			}
			.ivu-checkbox{
				margin-right: 8px;
			}
			.top-tags{
				padding-bottom: 0;
				.ivu-tag{
					height: 32px;
					line-height: 32px;
					padding: 0 16px;
					margin-right: 24px;
				}
				.ivu-tag-default{
					background-color: white;
				}
				.ivu-tag-primary{
					.ivu-tag-text{
						color: white;
					}
				}
			}
			&-right{
				padding-bottom: 5px;
				.ivu-checkbox-group{
					margin-left: 24px;
				}
				.special-group {
					margin-left: 0;
					margin-top: 8px;
				}
				.special-tags{
					.ivu-tag{
						margin-right: 24px;
						height: 26px;
						line-height: 26px;
						margin-bottom: 8px;
						.ivu-checkbox-group-item{
							margin-right: 0;
						}
						.ivu-icon-ios-close{
							margin-left: 4px !important;
							background-color: #f2f2f2;
							padding: 1px;
							top: -2px;
						}
					}
				}
				.add-wrapper {
					.ivu-input {
						padding: 1px 7px;
						height: 26px;
					}
					.ivu-input-search{
						background-color: #f2f2f2 !important;
						color: #666666 !important;
						border-color: #dcdee2 !important;
						padding: 0 15px !important;
					}
				}
				.add-wrapper-special {
					position: relative;
					top: 9px;
				}
				.ivu-icon {
					cursor: pointer;
					transition: transform ease-in-out .2s;
				}
				.icon-rotate {
					transform: rotate(90deg);
				}
			}
		}
		.margin-bottom-8{
			margin-bottom: 8px;
		}
		.org-tree {
			max-height: 25vh;
			overflow: auto;
			.ivu-checkbox{
				margin-right: 0;
			}
		}
	}
	.padding0 {
		.ivu-card-body {
			padding: 0;
		}
		.ivu-collapse{
			border: 1px;
		}
		.ivu-collapse-item .ivu-collapse-header{
			background-color: white;
			height: 48px;
			line-height: 48px;
			> i.ivu-icon {
				margin-right: 4px;
			}
		}
	}
	.add-wrapper {
		display: inline-block;
		.second-select {
			width: 160px;
			.ivu-select-selection {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-right: 0;
			}
			input {
				text-align: left;
				height: 26px;
				line-height: 26px;
			}
		}
		.add-wrapper-btn{
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			padding: 3.5px 15px;
			border: 1px solid #dcdee2;
			color: #666666;
			border-left: 0;
		}
		.add-wrapper-btn:focus {
			box-shadow: none;
		}
		.ivu-btn{
			background-color: #f2f2f2;
		}
	}
</style>
