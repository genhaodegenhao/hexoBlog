/**
 * author:shimin.chen.wb;
 * time:2017/7/20;
 * description:分配角色组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var DistributionRole = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken:window.sessionStorage.getItem('loginToken'),
            isDisable:true,
            userId:this.props.location.state.userId,//从修改页传递
            userName:this.props.location.state.userName,
            correspondingRoleName:'',
            correspondingRoleNameList:[],
            mockdata:false  //是否使用mock数据
        };
    },
    componentDidMount: function() {
        var parmes = {
            userId:this.state.userId,
            userName:this.state.userName
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/toAddUserRole',
                async:false,
                data:parmes,
                headers: {
                    'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        this.setState({correspondingRoleNameList:data.roleInfo});
                        this.setState({correspondingRoleName:data.roleInfo[0].roleId});
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        } else {
            var correspondingRoleNameList = require('../../json/correspondin-role-name-list.json');
            if(correspondingRoleNameList.flag) {
                this.setState({correspondingRoleNameList:correspondingRoleNameList.reault});
            }
        }
    },
    /**
     * [selectOnchange 下拉框change事件]
     */
    selectOnchange:function(event) {
        this.setState({correspondingRoleName:event.target.value});
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
            userId:this.state.userId,
            roleId:this.state.correspondingRoleName 
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/addUserRole',
                data:parmes,
                headers: {
                    'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        alert('提交成功！');
                    }else {
                        alert('提交失败！');
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            var successData = require('../../json/success.json');
            if(successData.flag) {
                alert('提交成功！');
            }
        }
    },
    render: function() {
        return ( 
            <div className="resource-inf-wrapper">
                <h3>新增用户角色</h3>
                <div className="resource-inf-form">
                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>用户:
                        </label>
                        <input type="text" value={this.state.userId} disabled={this.state.isDisable} />
                    </div>
                    <div className="resource-url">
                        <label>
                            <span style={{color: 'red'}}>*</span>用户名称:
                        </label>
                        <input type="text" value={this.state.userName} disabled={this.state.isDisable} />
                    </div>

                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>角色id(对应角色名称):
                        </label>
                        <select name="roleIdSelect" onChange={this.selectOnchange}>
                            {
                                this.state.correspondingRoleNameList.map((item, rowIndex) => {
                                    return (
                                        <option key={rowIndex} value={item.roleId}>{item.name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="btn-box">
                    <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                </div>
            </div>
        );
    }
});


export default DistributionRole;