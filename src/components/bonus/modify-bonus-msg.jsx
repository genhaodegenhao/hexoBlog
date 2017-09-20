/*
 * description:修改奖品信息;
 */
import React, {
	Component
} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var ModifyBonusMsg = React.createClass({
	/**
	 * [getInitialState 初始化状态]
	 */
	getInitialState: function() {
		return {
			loginToken: window.sessionStorage.getItem('loginToken'),
			id: this.props.location.state.data,
			activityCode: '',
			type: '',
			content: '',
			createDate:''
		};
	},
	componentDidMount: function() {
        var parmes = {
                id:this.state.id
           };
            $.ajax({
                url: utils.baseUrl + '/intra/bonus/toUpdateBonusInfo',
                data:parmes,
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        this.setState({activityCode:data.bonusInfo.activityCode});
                        this.setState({type:data.bonusInfo.type});
                        this.setState({content:data.bonusInfo.content});
                        this.setState({createDate:data.bonusInfo.createDate});
                        
                    }
                    this.setState({});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        
    },
	/**
	 * [activityCodeChange 编号change事件]
	 */
	activityCodeChange: function(event) {
		this.setState({
			activityCode: event.target.value
		});
	},
	/**
	 * [contentChange 內容change事件]
	 */
	contentChange: function(event) {
		this.setState({
			content: event.target.value
		});
	},
	/**
	 * [submitEvent 提交事件]
	 */
	submitEvent: function(event) {
		var parmes = {
			id:this.state.id,
			createDate:this.state.createDate,
			activityCode: this.state.activityCode,
			type: this.state.type,
			content: this.state.content
		};
		if(parmes.activityCode === '') {
			alert('请输入活动编码！');
			return;
		};
		if(parmes.content === '') {
			alert('请输入内容！');
			return;
		};
		$.ajax({
			url: utils.baseUrl + '/intra/bonus/updateBonusInfo',
			type: 'GET',
			data: parmes,
			headers: {
				'Authorization': this.state.loginToken
			},
			dataType: 'json',
			success: function(data) {
				if(data.errCode === '00') {
					alert('提交成功！');
					// 提交成功值清空
					this.setState({
						activityCode: ''
					});
					this.setState({
						type: ''
					});
					this.setState({
						content: ''
					});
				} else {
					alert('提交失败！');
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.source, status, err.toString());
			}.bind(this)
		});

	},
	render: function() {
		return(
			<div className="resource-inf-wrapper addPrize">
                <h3>修改奖品信息</h3>
                <div className="resource-inf-form">
                    <div className="resource-name">
                        <label className="prizeLabel">
                            <span style={{color: 'red'}}>*</span>活动code:
                        </label>
                        <input type="text" value={this.state.activityCode} onChange={this.activityCodeChange} />
                    </div>
                    <div className="resource-name">
                        <label className="prizeLabel">
                            <span style={{color: 'red'}}>*</span>奖品类型:
                        </label>
                        <input type="text" value={this.state.type} onChange={this.typeChange} disabled="disabled"/>
                    </div>

                    <div className="resource-url">
                        <label className="prizeLabel">
                            <span style={{color: 'red'}}>*</span>奖品规则内容(json格式):
                        </label>
                        <br/>
                        <textarea name="content" cols="50" rows="10" value={this.state.content} onChange={this.contentChange}></textarea>
                    </div>
                </div>
                <div className="btn-box">
                    <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                </div>
            </div>
		);
	}
})
export default ModifyBonusMsg;