/**
 * author:shimin.chen.wb;
 * time:2017/7/21;
 * description:新增用户信息;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var AddUserInformation = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            userCode:'',
            password:'',
            userName:'',
            telPhone:'',
            email:'',
            passwordShow:false,//密码是否显示
            mockdata:false  //是否使用mock数据
        };
    },
    /**
     * [userCodeChange 用户编号change事件]
     */
    userCodeChange:function(event) {
        this.setState({userCode:event.target.value});
    },
    /**
     * [passwordChange 密码change事件]
     */
    passwordChange:function(event) {
        this.setState({password:event.target.value});
    },
    /**
     * [userNameChange 用户名change事件]
     */
    userNameChange:function(event) {
        this.setState({userName:event.target.value});
    },
    /**
     * [telPhoneChange 电话change事件]
     */
    telPhoneChange:function(event) {
        this.setState({telPhone:event.target.value});
    },
    /**
     * [emailChange 邮箱change事件]
     */
    emailChange:function(event) {
        this.setState({email:event.target.value});
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
                userCode:this.state.userCode,
                password:this.state.password,
                name:this.state.userName,
                telephone:this.state.telPhone,
                email:this.state.email
        };
        if(parmes.userCode === '') {
            alert('请输入用户编码！');
            return;
        };
        if(parmes.password === '') {
            alert('请输入用户密码！');
            return;
        };
        if(parmes.name === '') {
            alert('请输入用户名！');
            return;
        };
        if(!this.state.mockdata)
            $.ajax({
                url: utils.baseUrl + '/intra/user/addUserInfo',
                type:'GET',
                data:parmes,
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        alert('提交成功！');
                        // 提交成功值清空
                        this.setState({userCode:''});
                        this.setState({password:''});
                        this.setState({userName:''});
                        this.setState({telPhone:''});
                        this.setState({email:''});
                    }else {
                        alert('提交失败！');
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        else {
            var successData = require('../../json/success.json');
            if(successData.flag) { 
                alert('提交成功！');
                // 提交成功值清空
                this.setState({userCode:''});
                this.setState({password:''});
                this.setState({userName:''});
                this.setState({telPhone:''});
                this.setState({email:''});
            }
        }
    },
    /**
     * [passwordMouseOver 鼠标移上密码显示]
     */
    passwordMouseOver:function() {
        this.setState({passwordShow:true});
    },
    /**
     * [passwordMouseOut 鼠标移走密码显示]
     */
    passwordMouseOut:function() {
        this.setState({passwordShow:false});
    },
    render: function() {
        if (this.state.passwordShow) {
            var passwordType = 'show';
        }else {
            var passwordType = 'password';
        }
        return ( 
            <div className="resource-inf-wrapper">
                <h3>新增用户角色</h3>
                <div className="resource-inf-form">
                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>用户编号(登录名):
                        </label>
                        <input type="text" value={this.state.userCode} onChange={this.userCodeChange} />
                    </div>
                    <div className="resource-url">
                        <label>
                            <span style={{color: 'red'}}>*</span>密码:
                        </label>
                        <span style={{position:'relative'}}>
                            <input name="userPassword" type={passwordType} value={this.state.password} onChange={this.passwordChange} />
                            <i className="password-show" onMouseOver={this.passwordMouseOver} onMouseOut={this.passwordMouseOut}></i>
                        </span>
                    </div>

                    <div className="resource-name">
                        <label>
                            <span style={{color: 'red'}}>*</span>用户名:
                        </label>
                        <input type="text" value={this.state.userName} onChange={this.userNameChange} />
                    </div>

                    <div className="resource-name">
                        <label>电话:</label>
                        <input type="tel" value={this.state.telPhone} onChange={this.telPhoneChange} />
                    </div>
                    <div className="resource-name">
                        <label>E-mail:</label>
                        <input type="email" value={this.state.email} onChange={this.emailChange} />
                    </div>
                </div>
                <div className="btn-box">
                    <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                </div>
            </div>
        );
    }
});


export default AddUserInformation;