<style lang="less" scoped>
	.content{
		height: 100%;
		overflow: hidden;
		.record_header{
			padding: 16px;
		}
	}
	.index_result_wrapper{
		.el-tag{
			margin: 8px 8px 0 8px;
		}
	}
	.follow_person_wrapper{
		height: ~"calc(100% - 240px)";
		.follPass_message{
			height: 100%;
		}
	}
	.bottom-btns-wrapper{
		margin-top: 16px;
		text-align: right;
	}
	/deep/.record {
		&_dialog {
			.el-dialog__body {
				padding-top: 10px;
				border-top: 1px solid #dadada;
			}
		}
		&_box {
			.el-dialog__body {
				padding-top: 0;
			}
		}
		&_header {
			position: relative;
			&_name {
				margin: 5px 0;
				color: #409eff;
				font-size: 20px;
				font-weight: 400;
			}
			&_sexAndage {
				font-size: 12px;
				color: #666;
				margin: 0 20px;
			}
			.h4-wrapper{
				border: 1px solid #dbdbdb;
				border-right: 0;
			}
			h4:nth-last-child(2),
			h4:last-child
			{
				border-bottom: 0;
			}
			&_param {
				font-weight: 400;
				font-size: 13px;
				width: 50%;
				display: inline-block;
				margin: 0;
				border-bottom: 1px solid #e8e8e8;
				label{
					background-color: #f5f5f5;
					display: inline-block;
					padding: 8px 8px;
					width: 100px;
					border-right: 1px solid #e8e8e8;
				}
				span{
					display: inline-block;
					width: ~"calc(100% - 100px)";
					padding: 8px 0 8px 8px;
					border-right: 1px solid #dbdbdb;
				}
			}
			&_cancel {
				position: absolute;
				top: 0;
				right: 30px;
			}
		}
		&_opinion {
			/*border-top: 3px solid #eee;*/
			padding-top: 15px;
			> span {
				font-size: 14px;
				color: #409eff;
				font-weight: 700;
			}
			button {
				width: 100px;
				margin: 3px 0 16px 20px;
			}
			&_artificial{
				display: inline-block;
				margin-left: 20px;
				position: relative;
				.el-button{
					margin-right: 20px;
				}
			}
			&_artificial:before{
				content: '';
				width: 1px;
				height: 30px;
				background-color: #eee;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		&_content {
			&_table {
				height: ~"calc(100% - 181px)";
				.el-tabs__content{
					background-color: #f5f5f5;
					height: ~"calc(100% - 41px)";
					padding: 0;
					.el-tabs__item{
						padding: 0 16px;
					}
				}
				.el-tab-pane{
					height: 100%;
				}
				.vertial-tabs{
					height: 100%;
					.el-tabs__header{
						margin-right: 0;
					}
					.el-tabs__active-bar{
						display: none;
					}
					.el-tabs__item{
						padding-left: 16px;
						width: 120px;
						box-sizing: border-box;
						text-align: left;
						height: 34px;
						line-height: 34px;
					}
					.is-active{
						background-color: #e5e5e5;
					}
					.el-tabs__content{
						background-color: white;
						border-left: 1px solid #dadada;
						height: 100%;
						overflow: auto;
					}
					.el-tabs__nav-wrap::after{
						width: 0;
						z-index: -1;
					}
					.record_opinion{
						padding-top: 0;
						border-bottom: 1px solid #dadada;
						>span{
							display: block;
							color: #999999;
							font-size: 12px;
							padding: 8px;
						}
					}
				}
			}
			&_name {
				font-size: 16px;
				color: #409eff;
				margin-bottom: 5px;
				font-weight: 400;
				margin-top: 0;
			}
			&_link {
				display: inline-block;
				color: #666;
				margin: 0 0 0 40px;
				vertical-align: bottom;
				cursor: pointer;
				font-weight: 400;
				line-height: 18px;
				padding: 0 5px;
				background: #409eff;
				color: #fff;
				border-radius: 3px;
			}
			&_msg {
				font-size: 16px;
				color: #409eff;
				margin-bottom: 5px;
				font-weight: 400;
				margin-top: 10px;
			}
			&_box {
				max-height: 300px;
				overflow-y: auto;
				border-top: 2px solid #f1f1f1;
			}
			&_list {
				padding: 0;
				margin: 0;
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				border-bottom: 1px solid #dadada;
				padding-bottom: 15px;
				&_title{
					display: block;
					font-size: 14px;
					width: 100%;
					margin-left: 8px;
					/*margin-bottom: 8px;*/
					span:last-child{
						color: #333333;
						margin-left: 3px;
					}
				}
			}
			&_single {
				color: #409eff;
				font-size: 12px;
				width: 25%;
				margin-bottom: 5px;
				color: #f80;
			}
			&_text {
				color: #555;
			}
			&_content {
				display: flex;
				flex-wrap: wrap;
				padding-top: 10px;
				margin-top: 10px;
				padding-left: 0;
				> h6 {
					width: 100%;
					margin: 5px;
					color: #409eff;
				}
			}
			&_step {
				margin-top: 15px;
			}
			&_param {
				width: 50%;
				color: #333;
				font-size: 12px;
				margin-top: 5px;
			}
			&_audio {
				// max-height: 350px;
				overflow-y: auto;
				border: none;
				padding-bottom: 30px;
			}
			&_AI {
				display: flex;
				align-items: center;
				width: 60%;
				> span {
					display: block;
					width: 40px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 15px;
					color: #fff;
					border-radius: 50%;
					background-color: #f80;
					max-width: 60%;
					flex-shrink: 0;
				}
				> p {
					border-radius: 5px;
					background-color: #f3f3f3;
					margin-left: 15px;
					box-sizing: border-box;
					padding: 8px 15px;
					color: #333;
					position: relative;
					&::after {
						content: "";
						display: block;
						position: absolute;
						left: -15px;
						top: 50%;
						transform: translateY(-50%);
						height: 0;
						width: 0;
						border: 8px solid transparent;
						border-right-color: #f3f3f3;
					}
				}
			}
			&_patient {
				box-sizing: border-box;
				width: 100%;
				padding-left: 40%;
				display: flex;
				flex-direction: row-reverse;
				flex-wrap: wrap;
				align-items: center;
				> span {
					display: block;
					width: 40px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 15px;
					color: #fff;
					border-radius: 50%;
					background-color: #409eff;
					max-width: 60%;
					margin-left: 15px;
				}
				> div {
					box-sizing: border-box;
					margin-right: 55px;
					margin-top: 10px;
					background-color: #f1f1f1;
					border-radius: 5px;
					padding: 5px 10px;
				}
				> p {
					border-radius: 5px;
					background-color: #ffd6d6;
					box-sizing: border-box;
					padding: 8px 15px;
					color: #333;
					position: relative;
					margin-left: 100px;
					margin-bottom: 0;
					&::after {
						content: "";
						display: block;
						position: absolute;
						right: -15px;
						top: 50%;
						transform: translateY(-50%);
						height: 0;
						width: 0;
						border: 8px solid transparent;
						border-left-color: #ffd6d6;
					}
				}
			}
		}
		&_check {
			&_name {
				font-weight: 400;
				font-size: 14px;
				margin: 16px 0 0 8px;
				color: #333333;
			}
			&_text {
				font-size: 12px;
				margin: 3px 0;
				padding: 5px 8px 16px 8px;
				border-radius: 3px;
				border-bottom: 1px solid #dadada;
			}
		}
	}
	.follow_dialog{
		.record_header{
			padding: 0 0 16px 0;
		}
		.record_content{
			background-color: #f1f1f1;
			padding: 20px;
			ul{
				padding: 0;
				margin: 0;
			}
		}
		.follPass_message{
			/*max-height: 500px;*/
			overflow-y: auto;
			&_every{
				background-color: white;
				border: 1px solid #dcdfe6;
				margin-bottom: 20px;
				&_abnormal{
					border-color: red;
				}
				&_title{
					padding: 15px 10px;
					border-bottom: 1px solid #dcdfe6;
					h3{
						margin: 0;
					}
					div{
						margin-top: 3px;
						color: #999999;
					}
				}
				h4{
					margin: 1.33em 1.33em 1.33em 20px;
					.ivu-input-wrapper{
						width: 500px;
					}
					>div{
						display: inline-block;
						margin-left: 16px;
					}
				}
				.h4_with_border{
					border-bottom: 1px solid #dcdfe6;
					padding-bottom: 1.33em;
				}
			}
		}
	}
	.call-out-record{
		margin-bottom: 10px;
		position: relative;
		h5{
			color: #409eff;
			margin: 0 0 20px 0;
		}
		audio{
			height: 30px;
			float: left;
			margin-right: 10px;
		}
		span{
			margin: 0 5px;
		}
		&-per{
			height: 35px;
			line-height: 35px;
			margin-bottom: 10px;
		}
		.call-out-record-wrapper{
			max-height: 300px;
		}
		.is-collapse {
			height: 45px;
			overflow: hidden;
		}
		.el-button{
			position: absolute;
			bottom: 20px;
			left: 45%;
			padding: 4px 20px;
		}
	}
	/deep/.el-dialog{
		position: absolute;
		right: 190px;
		top: 25vh;
	}
</style>

<template>
	<div >
		<!-- 随访记录 -->
		<Drawer title="记录结果详情"
							 class="record_dialog padding0-drawer"
						   :mask-closable="false"
							 v-model="dialogVisible"
							 width="880"
							 >
			<div class="content" v-loading="fullscreenLoading">
				<!-- 个人信息 -->
				<div class="record_header">
					<h3 class="record_header_name">
						{{baseData.hzxm}}
						<span class="record_header_sexAndage">
                  {{baseData.hzxb === 1 ? '男':'女'}}/{{baseData.age}}岁
              </span>
						<!--<el-tag v-if="baseData.focus === 1">-->
							<!--{{baseData.focusTag}}-->
						<!--</el-tag>-->
					</h3>
					<div class="h4-wrapper">
						<h4 class="record_header_param">
							<label>联系电话</label>
							<span>{{baseData.jtdh}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>疾病分类</label>
							<span>{{patientOtherInfo.icdName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>所属方案</label>
							<span>{{patientOtherInfo.schemeName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>所属组织</label>
							<span>{{patientOtherInfo.organizationName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>通话状态</label>
							<span>{{patientOtherInfo.callStatus}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>随访时间</label>
							<span>{{patientOtherInfo.dateEnd}}</span>
						</h4>
					</div>
				</div>
				<el-tabs @tab-click="currentPartientInfo" v-model="currentTable" v-if="selectOptions.length" type="border-card" class="record_content_table">
					<el-tab-pane v-for="(item,index) in selectOptions" :key="index" :name="item.value+''"  :label="`第${index+1}次随访`">
						<el-tabs tab-position="left" class="vertial-tabs">
							<el-tab-pane label="随访结果">
								<div class="record_opinion">
									<span v-permission="$API.followRecord.updateDiseaseInfo">请根据患者采集的情况，及时对本次结果进行处理！</span>
									<el-button size="small" type="primary"
														 v-for="(clyj, clyjIndex) in clyjOptions"
														 :class="{'margin-left-8': clyjIndex===0}"
														 v-permission="$API.followRecord.updateDiseaseInfo"
														 :key="clyjIndex"
														 :disabled="(item.isResolved === true) || tabActive==1"
														 :icon="(item.resolvedState == clyj.paramCode)?'el-icon-check':''"
														 @click="submission(clyj.paramCode)">{{clyj.paramName}}</el-button>
									<div class="record_opinion_artificial" v-permission="$API.followRecord.saveFollow">
										<el-button size="small" @click="handleMenFollowBtn(item.id)">人工随访</el-button>
										<span>最后人工随访时间{{item.callHospitalDate}}</span>
									</div>
								</div>
								<div class="record_content_list index_result_wrapper">
									<div class="record_content_list_title">
										<span>采集情况：</span>
										<span>{{transformCjqkData[item.resultStatus]}}</span>
									</div>
									<el-tag v-for="(ite, indexFiled) in item.modelData" :key="indexFiled" :type="ite.isNormal==0?'danger':'success'" v-if="ite.fieldName">
										{{ite.fieldName}}：{{ite.fieldValue||'无'}}
									</el-tag>
								</div>
								<h4 class="record_check_name" >AI审核意见</h4>
								<p class="record_check_text" >{{item.vetRemark || '暂无意见'}}</p>
								<h4 class="record_check_name"  v-if="item.isArtificialCall == 1">人工呼叫意见</h4>
								<p class="record_check_text"  v-if="item.isArtificialCall == 1">{{item.callRemark || '暂无人工呼叫意见'}}</p>
								<h4 class="record_check_name">人工随访意见</h4>
								<p class="record_check_text">{{item.callHospitalRemark || '暂无人工随访意见'}}</p>
							</el-tab-pane>
							<!-- 循环遍历出所有的随访相关图标 -->
							<el-tab-pane label="指标图表" v-if="item.targetTab.length">
								<el-tabs v-model="item.targetClick" @tab-click="targetClick" >
									<el-tab-pane  v-for="ite in item.targetTab" :name="ite.name" :label="ite.name" :key="ite.name">
										<!--<line-chart :name="ite.name" v-if="ite.dataList.length>0" :chart-data="ite.dataList"></line-chart>-->
									</el-tab-pane>
								</el-tabs>
							</el-tab-pane>
							<el-tab-pane label="语音记录">
								<el-card v-show="item.callOutTableDataDoctor&&item.callOutTableDataDoctor.length" class="call-out-record">
									<h5>医院人工随访语音记录</h5>
									<div :class="{'call-out-record-wrapper':true, 'is-collapse': isCollapseFirst}">
										<div v-for="(hospItem, indexAudio) in item.callOutTableDataDoctor" :key="indexAudio" class="call-out-record-per">
											<audio :src="hospItem.wavUrl" controls="controls">
												Your browser does not support the audio element.
											</audio>
											<span>{{hospItem.adminName || '暂无外呼人'}}</span>
											<span>{{hospItem.throughTime || '暂无接通时间'}}</span>
											<span>随访</span>
										</div>
									</div>
									<div v-if="item.callOutTableDataDoctor&&item.callOutTableDataDoctor.length>1" style="height: 30px">
										<el-button v-show="isCollapseFirst" @click="isCollapseFirst=false" size="mini">更多</el-button>
										<el-button v-show="!isCollapseFirst" @click="isCollapseFirst=true" size="mini">收起</el-button>
									</div>
								</el-card>
								<el-card v-show="item.callOutTableDataRSYS&&item.callOutTableDataRSYS.length" class="call-out-record">
									<h5>认识医生人工随访语音记录</h5>
									<div :class="{'call-out-record-wrapper':true, 'is-collapse': isCollapseSecond}">
										<div v-for="(RSitem, indexMan) in item.callOutTableDataRSYS" :key="indexMan" class="call-out-record-per">
											<audio :src="RSitem.wavUrl" controls="controls">
												Your browser does not support the audio element.
											</audio>
											<span>认识医生外呼人员</span>
											<span>{{RSitem.throughTime || '暂无接通时间'}}</span>
											<span>随访</span>
										</div>
									</div>
									<template v-if="item.callOutTableDataRSYS&&item.callOutTableDataRSYS.length>1">
										<el-button v-show="isCollapseSecond" @click="isCollapseSecond=false" size="mini">更多</el-button>
										<el-button v-show="!isCollapseSecond" @click="isCollapseSecond=true" size="mini">收起</el-button>
									</template>
								</el-card>
								<el-card>
									<h5 style="color: #409eff;margin: 0 0 20px 0;">AI随访语音记录</h5>
									<el-alert
										v-if="!item.modelData.length"
										title="暂无相关数据"
										type="warning"
										:closable="false"
										show-icon>
									</el-alert>
									<el-tag  v-if="item.isArtificialCall">
										人工外呼
									</el-tag>
									<ul class="record_content_list record_content_audio">
										<template v-for="(ite, indexManCall) in item.modelData">
											<li :key="indexManCall" class="record_content_single record_content_AI" v-if="ite.isOld === 0">
												<span>AI</span>
												<p>{{ite.question}}</p>
											</li>
											<li :key="`${indexManCall}second`" class="record_content_single record_content_patient" v-if="ite.isOld === 0">
												<span>患者</span>
												<audio v-if="ite.audio" :src="ite.audio"  controls="controls" ></audio>
												<p v-else-if="ite.isArtificialCall == 1">此记录为人工呼叫，暂无录音</p>
												<p v-else>此记录暂无录音</p>
												<el-input
													style="width:300px"
													size="small"
													placeholder="暂无录音"
													v-model="ite.asr"
													:disabled="true">
												</el-input>
												<div v-if="ite.fieldName">
													指标：<el-tag v-if="ite.isNormal" type="primary">正常</el-tag>
													<el-tag v-else type="danger">不正常</el-tag>
													/ {{ite.fieldName}} : {{ite.fieldValue}}
												</div>
											</li>
										</template>
									</ul>
								</el-card>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
				</el-tabs>
			</div>
		</Drawer>
		<!-- 处理意见 -->
		<el-dialog
			v-if="clyjOptions.length"
			title="处理意见确认"
			:visible.sync="adviceCheckDialog"
			width="500px"
			custom-class="adviceModel">
      <span v-if="btnState!=''&&btnState=='2'">
        您选择的是"{{clyjOptions[0].paramName}}"，您确认不需要给患者({{baseData.hzxm}})任何提醒?
      </span>
			<span v-if="btnState!='2'">
        您选择的是{{btnState==0 ? clyjOptions[1].paramName : btnState==1 ? clyjOptions[2].paramName:''}}，患者将收到以下信息:
      </span>
			<br><br>
			<span v-if="btnState=='0'">
      【{{baseData.hzxm}},您好！根据您这次的随访结果，请务必遵从医嘱用药，并定期来医院门诊复诊。】
      </span>
			<span v-if="btnState=='1'" style="margin-top: 20px;">
      【{{baseData.hzxm}},您好！根据您这次的随访结果，建议您及时来医院门诊复诊。】
      </span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="adviceCheckDialog = false; btnState = ''">选错了</el-button>
        <el-button type="primary" @click="clyjBtn">{{btnState=='2'?'不需要':'确定'}}</el-button>
      </span>
		</el-dialog>
		<!--add by yugou 20181126 人工随访弹框-->
		<!--<Drawer class="record_dialog" title="就诊档案" :mask-closable="false" v-model="dialogVisible" width="55">-->
		<Drawer
			title="人工随访"
			class="record_dialog follow_dialog"
			:mask-closable="false"
			v-model="showFollow"
			width="880">
			<div class="content">
				<!-- 个人信息 -->
				<div class="record_header">
					<h3 class="record_header_name" style="padding-bottom: 16px">
						{{baseData.hzxm}}
						<span class="record_header_sexAndage">
							{{baseData.hzxb === 1 ? '男':'女'}}/{{baseData.age}}岁
						</span>
					</h3>
					<div class="h4-wrapper">
						<h4 class="record_header_param">
							<label>联系电话</label>
							<span>{{baseData.jtdh}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>疾病分类</label>
							<span>{{patientOtherInfo.icdName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>所属方案</label>
							<span>{{patientOtherInfo.schemeName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>所属组织</label>
							<span>{{patientOtherInfo.organizationName}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>通话状态</label>
							<span>{{patientOtherInfo.callStatus}}</span>
						</h4>
						<h4 class="record_header_param">
							<label>随访时间</label>
							<span>{{patientOtherInfo.dateEnd}}</span>
						</h4>
					</div>
					<el-button style="position: absolute;right: 0;top: -5px;" v-if="!canCallOut" @click="canCallOut=true">
						随访中...
					</el-button>
					<el-button type="primary" style="position: absolute;right: 0;top: -5px;" v-else @click="callOutModal=true" v-permission="$API.followRecord.manualOutbound">
						一键拨打
					</el-button>
				</div>
				<!--随访问题-->
				<div class="record_content follow_person_wrapper">
					<ul class="follPass_message">
						<template v-for="(item, index) in orderReplyQuestions">
							<li class="follPass_message_every" :key='index' v-show="item.fieldName" :class="{'follPass_message_every_abnormal':item.fieldValue===''|| (item.fieldValue &&!item.fieldValue.length)}">
								<div class="follPass_message_every_title">
									<h3>{{item.question}}</h3>
									<div>{{item.content}}</div>
								</div>
								<h4 class="h4_with_border">
									采集指标 | {{item.fieldName}}
									<!--<el-radio-group  style="display: inline-block;" v-if="item.optionValues" v-model="item.fieldValue" @change="labeChange(item)">-->
										<!--&lt;!&ndash;:disabled="!item.isArtificialCall"  判断都去掉了，待确认&ndash;&gt;-->
										<!--<el-radio v-for="(ite, index) in item.optionValues" :key="index" :label="ite">-->
											<!--<span>{{ite}}</span>-->
										<!--</el-radio>-->
									<!--</el-radio-group>-->
									<!--<el-input v-else v-model="item.fieldValue" placeholder="采集指标"></el-input>-->
									<div follPass_message_every_edit>
										<Input v-if="item.targetInfo === 'string'" v-model="item.fieldValue"></Input>
										<InputNumber v-else-if="item.targetInfo === 'digit'" :min="1" v-model="item.fieldValue"></InputNumber>
										<DatePicker v-else-if="item.targetInfo === 'datetime'" v-model="item.fieldValue" transfer format="yyyy-MM-dd HH:mm" type="datetime" confirm></DatePicker>
										<RadioGroup v-else v-model="item.fieldValue" class="result-wrap-radio-group" @on-change="labeChange(item)">
											<Radio v-for="opt in item.optionValues" :label="opt" :key="opt">
												{{opt}}
											</Radio>
										</RadioGroup>
									</div>
								</h4>
								<h4>
									是否正常
									<el-radio-group v-model="item.isNormal" >
										<el-radio label="1">
											<span>正常</span>
										</el-radio>
										<el-radio label="0">
											<span>不正常</span>
										</el-radio>
									</el-radio-group>
								</h4>
							</li>
						</template>
						<li>
							<div class="follPass_message_every_title">
								<h3>人工随访备注</h3>
								<el-input
									type="textarea"
									:autosize="{ minRows: 2, maxRows: 4}"
									placeholder="请输入内容"
									v-model="callHospitalRemark">
								</el-input>
							</div>
						</li>
					</ul>
				</div>
				<div class="bottom-btns-wrapper">
					<el-button @click="postMenFollow(0)">未接通</el-button>
					<el-button @click="postMenFollow(1)" type="primary">提交</el-button>
				</div>
			</div>
		</Drawer>
		<!--一键拨打弹框-->
		<el-dialog
			:visible.sync="callOutModal"
			width="300"
			center>
			<div style="margin-top: 20px; font-size: 16px;color: #999999">
				<label>外呼号码：</label>{{userCallPhone}}
			</div>
			<div style="margin-top: 15px; font-size: 18px;">
				<label>患者号码：</label>
				<el-input v-model="callOutPhone" placeholder="请输入患者号码" style="width: calc(100% - 100px);"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    <el-button @click="callOutModal = false">放弃拨打</el-button>
    <el-button type="primary" @click="handleCallOut">确定拨打</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	/**
	 * 随访记录
	 * @module followRecord
	 */
	import mixin from '@/assets/js/mixin'
	// import LineChart from './Chart';
	export default {
		components: {
			// LineChart
		},
		data () {
			return {
				isCollapseFirst: true,
				isCollapseSecond: true,
				// callOutTableDataRSYS: [],
				// callOutTableDataDoctor: [],
				userCallPhone: sessionStorage.getItem('rsysCallPhone'),
				callOutPhone: '',
				callOutModal: false,
				canCallOut: true,
				currentTable: '1', // 当前选中的次数
				baseData: {}, // 患者基本信息
				dialogVisible: false,
				fullscreenLoading: false, // 加载随访记录弹框时的全屏加载动画
				selectOptions: [
					{
						modelData: [],
						targetTab: [
							{
								name: null,
								dataList: []
							}
						]
					}
				], // 随访记录弹框 随访结果的第几次选择信息
				baseUrl: '', // 语音地址前缀
				adviceCheckDialog: false, // 选择处理意见后的确认弹框是否显示
				btnState: '', // 当前处理意见类型
				isResolved: '', // 是否可以点击 处理意见 的三个选项按钮
				resolvedState: '', // 处理意见 的三个选项按钮的选中num依次2,0,1
				showFollow: false,
				followDialogLoading: false,
				orderReplyQuestions: [],
				callHospitalRemark: '',
				currentVisitOrderId: '',
				clyjOptions: [] // 处理意见选项
			}
		},
		props: {
			patientId: {
				type: String,
				default: null
			},
			tabActive: {
				type: String,
				default: '1'
			},
			taskId: { // 3.0 版本的planId
				type: String,
				default: null
			},
			sfNumber: {
				type: String,
				default: null
			},
			visitOrderId: { // 3.0 版本的recordId
				type: String,
				default: ''
			},
			patientOtherInfo: {
				type: Object,
				default: function () {
					return {}
				}
			},
			transformCjqkData: { // 采集情况转换成文字
				type: Array,
				default: function () {
					return []
				}
			}
		},
		// 含getPatientInfo,handleislike两个方法
		mixins: [mixin],
		methods: {
			/**
			 * @description 一键外呼 提交
			 */
			async handleCallOut () {
				const postData = {
					recordId: this.currentVisitOrderId,
					callPhone: this.userCallPhone,
					mobile: this.callOutPhone
				}
				if (!this.userCallPhone) {
					this.$message({
						message: '外呼号码不能为空！',
						type: 'warning'
					})
					return false
				}
				if (!this.callOutPhone) {
					this.$message({
						message: '患者号码不能为空！',
						type: 'warning'
					})
					return false
				}
				if (!postData.recordId) {
					this.$message({
						message: '记录id不能为空！',
						type: 'warning'
					})
					return false
				}
				await this.$API.followRecord.manualOutbound(postData)
				this.canCallOut = false
				this.callOutModal = false
			},
			/**
			 * @description 一键外呼列表
			 */
			async getCallOutTableData () {
				this.selectOptions[this.currentTable - 1].callOutTableDataRSYS = []
				this.selectOptions[this.currentTable - 1].callOutTableDataDoctor = []
				const res = await this.$API.followRecord.calloutlist({ pager: 1, limit: 100, recordId: this.selectOptions[this.currentTable - 1].visitOrderId })
				res.data.forEach(item => {
					if (item.source === 1) {
						this.selectOptions[this.currentTable - 1].callOutTableDataDoctor.push(item)
					} else {
						this.selectOptions[this.currentTable - 1].callOutTableDataRSYS.push(item)
					}
				})
			},
			/**
			 * 切换弹框的显示
			 * @function toggleShowModal
			 */
			toggleShowModal () {
				this.dialogVisible = !this.dialogVisible
				if (this.dialogVisible) {
					this.$nextTick(() => {
						this.getCLYJData()
						this.getPatientInfo().then(res => {
							this.baseData = res.data
							this.callOutPhone = res.data.jtdh
							// 重新请求情况下清空选项数据集合
							this.selectOptions = []
							this.getResultInfo(this.sfNumber)
							this.currentTable = this.sfNumber + ''
							this.isCollapseFirst = true
							this.isCollapseSecond = true
						})
					})
				}
			},
			async getCLYJData () {
				if (!this.clyjOptions.length) {
					const resDiseaseInfo = await this.$API.systemParamManage.list({ paramTypeCode: 'diseaseInfo', limit: 999 })
					this.clyjOptions = resDiseaseInfo.data
				}
			},
			/**
			 *@function 点击table标签查看第几次随访
			 * @param {String} value
			 */
			currentPartientInfo (value) {
				this.targetTab = []
				const num = value.name
				if (!this.selectOptions[num - 1] || !this.selectOptions[num - 1].alreadyHave) {
					this.getResultInfo(num)
				}
			},
			/**
			 * @function 获取table对象的随访结果
			 * @param {Number} num 第几次随访
			 * @param {String} taskId 随访taskid
			 */
			getResultInfo (num) {
				this.fullscreenLoading = true
				// 再次请求情况下
				this.targetTab = []
				this.$API.followRecord.recordResult({
					num: num,
					planId: this.taskId
				})
					.then(resAll => {
						const res = resAll.data
						if (!res.count) {
							this.fullscreenLoading = false
							return false
						}
						// 随访次数拼接
						if (!this.selectOptions.length) {
							for (let i = 1; i <= res.count; i++) {
								this.selectOptions.push({
									value: i,
									label: '第' + i + '次',
									targetTab: [],
									targetClick: null,
									modelData: []
								})
							}
						}
						this.selectOptions[num - 1].id = res.recordinfo.recordId
						this.selectOptions[num - 1].callHospitalRemark = res.recordCall ? res.recordCall.callOutHospitalRemark : ''
						this.selectOptions[num - 1].callHospitalDate = res.recordCall ? res.recordCall.callOutDate : '' // add 1126 by yugou
						this.selectOptions[num - 1].status = res.recordinfo.status
						this.selectOptions[num - 1].remark = res.recordinfo.remark
						this.selectOptions[num - 1].resultStatus = res.recordinfo.resultStatus
						// 详情数据赋值
						this.selectOptions[num - 1].modelData = this.dataFormTarget(res.data)
						// console.log(this.selectOptions)
						// 标记是否拿过该次的数据,tab切换时判断使用
						this.selectOptions[num - 1].alreadyHave = true
						// target图表赋值
						if (this.targetTab.length) {
							this.selectOptions[num - 1].targetTab = this.targetTab
							this.selectOptions[num - 1].targetClick = this.targetTab[0].name
							this.targetClick({
								label: this.targetTab[0].name
							})
						}
						this.baseUrl = res.AIVOICURL
						this.fullscreenLoading = false
						// update 0810 原来取的是列表中的id/visitOrderId,但切换随访次数时，visitOrderId都是一个，不对
						this.selectOptions[num - 1].visitOrderId = res.recordinfo.recordId
						// AI意见vetRemark,处理意见diseaseInfo,是否人工isArtificialCall,人工意见callRemark--都在res.recordinfo中
						this.selectOptions[num - 1].vetRemark = res.recordinfo.vetRemark
						this.selectOptions[num - 1].isArtificialCall = res.recordinfo.isArtificialCall
						this.selectOptions[num - 1].callRemark = res.recordCall ? res.recordCall.callOutRemark : ''
						const diseaseInfo = res.recordinfo.diseaseInfo
						this.selectOptions[num - 1].resolvedState = diseaseInfo
						if (diseaseInfo === undefined || diseaseInfo === -1) {
							this.selectOptions[num - 1].isResolved = false
						} else {
							this.selectOptions[num - 1].isResolved = true
						}
						// this.getCallOutTableData() //todo 暂无一键外呼
					})
					.catch(error => {
						this.fullscreenLoading = false
						console.log(error)
					})
			},
			/**
			 * @function 图表table点击
			 * @return {type} {description}
			 */
			targetClick (val) {
				// todo
				// FollowRecord.getChartData({
				// 	hzxxId: this.patientId,
				// 	fieldName: val.label
				// }).then(res => {
				// 	for (const item of this.selectOptions) {
				// 		for (const ite of item.targetTab) {
				// 			if (ite.name = val.label) {
				// 				ite.dataList = res.data
				// 				return false
				// 			}
				// 		}
				// 	}
				// }).catch(err => {
				// 	console.log(err)
				// })
			},
			/**
			 * @function 对指标类型进行格式化处理
			 * @param  {type} data {description}
			 * @return {type} {description}
			 */
			dataFormTarget (data) {
				data.forEach(item => {
					// 查看当前指标是否为数值类型
					if (item.isNum) {
						this.targetTab.push(
							{
								name: item.fieldName,
								dataList: []
							}
						)
					}
					if (item.isNormal) {
						if (item.resultType) {
							item.resultType = ''
						} else {
							item.resultType = 'success'
						}
					} else if (!item.isNormal) {
						item.resultType = 'danger'
					}
				})
				return data
			},
			/**
			 * @function 处理意见按钮
			 * @param {event} ev 获取点击的按钮的内容
			 */
			submission (value) {
				this.adviceCheckDialog = true
				this.btnState = value
			},
			/**
			 *处理意见询问
			 *@function clyjBtn
			 */
			clyjBtn () {
				this.clyj(this.btnState)
			},
			/**
			 *处理意见
			 *@function clyj
			 *@param {String} visitOrderId perVisitOrderId
			 *@param {String} diseaseInfo diseaseInfo
			 */
			clyj (btnState) {
				// console.log(this.selectOptions);
				const visitOrderId = this.selectOptions[this.currentTable - 1] ? this.selectOptions[this.currentTable - 1].visitOrderId : ''
				if (!visitOrderId) {
					this.$message.error('记录id为空！')
					return false
				}
				// console.log(visitOrderId)
				// return false
				this.$API.followRecord.updateDiseaseInfo({
					recordId: visitOrderId,
					diseaseInfo: btnState
				})
					.then(res => {
						this.adviceCheckDialog = false
						// this.dialogVisible = false
						this.resolvedState = btnState
						if (btnState !== '2') { // 2是 自行处理
							this.$Message.success('短信发送成功！')
						}
						// 刷新列表数据
						this.$emit('refreshData')
					})
					.catch(error => {
						this.adviceCheckDialog = false
						console.log(error)
					})
			},
			/**
			 * @function 结果审核数据格式化
			 * @param  {type} data {description}
			 * @return {type} {description}
			 */
			dataForm (data) {
				try {
					// 数据遍历
					for (const item of data.replies) {
						// 格式化正常数值
						item.isNormal = !item.isNormal ? '0' : '1'
						item.targetInfo = 'string' // 选项类型，默认是string
						// const flag = 0
						// 判断是否属于非文本类型（是否拥有指标选项列表）
						if (item.targetOptions.length) {
							item.targetInfo = item.targetOptions[0].optionName
							// 选项列表格式化
							const optionArr = []
							const thresholdArr = []
							item.targetOptions.forEach(item => {
								optionArr.push(item.optionValues)
								if (item.thresholdValue) {
									thresholdArr.push(item.optionValues)
								}
							})
							item.optionValues = optionArr
							// 阈值列表格式化
							item.thresholdValue = thresholdArr
							// old part 处理多选情况
							// // 判断是否拥有用户选项
							// if (item.fieldValue) {
							// 	// 用户选项格式化
							// 	item.fieldValue = item.fieldValue.split(',')
							// } else {
							// 	// 用于判断是否采集到指标
							// 	item.abnormal = true
							// 	// 无用户选项则说明当前指标不正常
							// 	item.isNormal = '1'
							// 	// 用户指标列表赋值，解决类型校验报错
							// 	item.fieldValue = []
							// }
							// // 用户个人选项
							// const userOption = new Set([...item.fieldValue])
							// // 采集到的指标不属于已设置的指标预设数据中的一个，说明采集结果不正常（计算交集）
							// item.abnormal =
							// 	!(new Set([...item.optionValues].filter(i => userOption.has(i)))
							// 		.size > 0)
                            //
							// // 判断指标是否正常（出现阈值列表中的值说明结果不正常）
							// item.isNormal =
							// 	new Set([...item.thresholdValue].filter(i => userOption.has(i)))
							// 		.size > 0
							// 		? '0'
							// 		: '1'
						}
					}
				} catch (e) {
					console.log(e)
				}
				return data
			},
			/**
			 * @description 人工随访 按钮
			 */
			handleMenFollowBtn (id) {
				this.followDialogLoading = true
				this.currentVisitOrderId = id
				this.showFollow = true
				this.$API.followRecord.getFollowDetail({ recordId: id }).then(res => {
					this.orderReplyQuestions = this.dataForm(res.data).replies
					this.followDialogLoading = false
					this.callHospitalRemark = res.data.detail.callOutHospitalRemark
				}).catch(e => {
					this.followDialogLoading = false
					console.log(e)
				})
			},
			/**
			 * @description 提交 人工随访
			 */
			postMenFollow (submitType) {
				const postData = {
					replies: [],
					callOutHospitalRemark: submitType === 0 ? this.callHospitalRemark + '(未接通)' : this.callHospitalRemark,
					recordId: this.currentVisitOrderId,
					callStatus: submitType === 0 ? '' : 10
				}
				for (const item of this.orderReplyQuestions) {
					const copyData = JSON.parse(JSON.stringify(item))
					if (copyData.fieldValue instanceof Array) {
						copyData.fieldValue = copyData.fieldValue.join(',')
					}
					postData.replies.push(copyData)
				}
				// console.log(postData)
				// return false
				this.$API.followRecord.saveFollow(postData).then(res => {
					this.showFollow = false
					this.canCallOut = true
					this.getResultInfo(this.currentTable)
					// 刷新列表数据
					this.$emit('refreshData')
				})
			},
			/**
			 * @function 根据指标自动判断
			 * @param  {type} item {description}
			 * @return {type} {description}
			 */
			labeChange (item) {
				// 预警阈值遍历，用户选项遍历，只要用户选项存在阈值，展示为不正常
				if (item.thresholdValue.includes(item.fieldValue)) {
					item.isNormal = '0'
				} else {
					item.isNormal = '1'
				}
			}
		}
	}
</script>
