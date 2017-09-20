/*
 * description:新增奖品信息;
 */
import React, {
	Component
} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var AddBonusMsg = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function () {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            activityCode: '',
            type: '',
            content: ''
        };
    },
    /**
     * [activityCodeChange 用户编号change事件]
     */
    activityCodeChange: function (event) {
        this.setState({
            activityCode: event.target.value
        });
    },
    /**
     * [typeChange 类型change事件]
     */
    typeChange: function (event) {
        this.setState({
            type: event.target.value
        });
    },
    /**
     * [contentChange 内容change事件]
     */
    contentChange: function (event) {
        this.setState({
            content: event.target.value
        });
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent: function (event) {
        var parmes = {
            activityCode: this.state.activityCode,
            type: this.state.type,
            content: this.state.content
        };
        if (parmes.activityCode === '') {
            alert('请输入用户编码！');
            return;
        }
        ;
        if (parmes.type === '') {
            alert('请输入类型！');
            return;
        }
        ;
        if (parmes.content === '') {
            alert('请输入内容！');
            return;
        }
        ;
        $.ajax({
            url: utils.baseUrl + '/intra/bonus/addBonusInfo',
            type: 'GET',
            data: parmes,
            headers: {
                'Authorization': this.state.loginToken
            },
            dataType: 'json',
            success: function (data) {
                if (data.errCode === '00') {
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
            error: function (xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
			<div className = "resource-inf-wrapper addPrize">
				<h3> 新增奖品信息 </h3>
				<div className = "resource-inf-form">
					<div className = "resource-name addBonus-name" >
						<label className = "prizeLabel" ><span style = {{color: 'red'}} > * </span>活动code: </label >
						<input type = "text" value = {this.state.activityCode} onChange = {this.activityCodeChange}/>
					</div>
					<div className = "resource-name addBonus-name" >
						<label className = "prizeLabel" ><span style = {{color: 'red'}}> * </span>奖品类型: </label>
						<input type = "text" value = {this.state.type} onChange = {this.typeChange}/>
					</div>

					<div className = "resource-url addBonus-text" >
						<label className = "prizeLabel" ><span style = {{color: 'red'}}> * </span>奖品规则内容(json格式): </label>
						<br/>
						<textarea name="content" cols="50" rows="10" value={this.state.content} onChange={this.contentChange}></textarea>
					</div>
				</div>
				<div className = "btn-box">
					<a href = "javascript:void(null)" onClick = {this.submitEvent}>提交 </a>
				</div>
			</div>
        );
    }
});



export default AddBonusMsg;