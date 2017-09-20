/**
    添加权限配置
*/

import React, {Component} from 'react';
import $ from 'jquery';
import { Link,hashHistory } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import utils from '../../assets/js/common/common.js';
import '../../assets/Style/home/auth.css';

var AddAuthUrl = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken:window.sessionStorage.getItem("loginToken"),
            name:"",
            url:"",
            tokenType:"WEAK_TOKEN",
            reMark:""
        };
    },
    /**
     * [userNameChange 用户change事件]
     */
    userNameChange:function(event) {
        this.setState({name:event.target.value});
    },
    /**
     * [userUrlChange url change事件]
     */
    userUrlChange:function(event) {
        this.setState({url:event.target.value});
    },
    /**
     * [userTokenTypeChange 类型change事件]
     */
    userTokenTypeChange:function(event) {
        this.setState({tokenType:event.target.value});
    },
    /**
     * [useReMarkChange 备注change事件]
     */
    useReMarkChange:function(event) {
        this.setState({reMark:event.target.value});
    },
    
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
                loginToken:window.sessionStorage.getItem("loginToken"),
                name:this.state.name,
                url:this.state.url,
                tokenType:this.state.tokenType,
                reMark:this.state.reMark
        };
        // if(parmes.name === '') {
        //     alert('请输入名称！');
        //     return;
        // };
        if((parmes.url.indexOf("/coc-bill-api"))==-1) {
            alert('请输入正确的链接');
            return;
        };
        // if(parmes.tokenType === '') {
        //     alert('请选择权限类型！');
        //     return;
        // };
        $.ajax({
            url: utils.baseUrl +'/intra/authUrl/addAuth',
            type:'GET',
            data:parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(data) {
                if(data.errCode === '00') {
                    alert('提交成功！');
                    hashHistory.push('/success');
                }else {
                    alert('提交失败！');
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return ( 
            <div className="auth-inf-wrapper">
                <h3>添加权限配置</h3>
                <div className="auth-inf-form">
                    <div className="auth-name">
                        <div>
                            <label>
                                名称
                            </label>
                        </div>
                        <div>
                            <input value={this.state.name} className="form-control" type="text"  onChange={this.userNameChange} />
                        </div>
                    </div>
                    <div className="auth-url">
                        <div>
                            <label>
                                链接<span style={{color: 'red'}}>*必须以 "/coc-bill-api" 开头 。(例: /coc-bill-api/1.0/openIds )</span>
                            </label>
                        </div>
                        <div>
                            <input value={this.state.url} className="form-control" type="text"  onChange={this.userUrlChange} />
                        </div>
                    </div>
                    <div className="auth-type">
                        <div>
                            <label>
                                权限类型
                            </label>
                        </div>
                        <div>
                            <select value={this.state.tokenType}  onChange={this.userTokenTypeChange} className="form-control form-control1" id="">
                                <option value="WEAK_TOKEN">弱权限Token</option>
                                <option value="LOGIN_TOKEN">登录Token</option>
                                <option value="PAY_TOKEN">支付密码Token</option>
                                <option value="LOGIN_TOKEN_WHITE_LIST">登录Token白名单</option>
                                <option value="BUS_LOGIN_TOKEN">商户登录Token</option>
                            </select>
                        </div>
                    </div>
                    <div className="auth-remark">
                        <div>
                            <label>
                                备注
                            </label>
                        </div>
                        <div>
                            <input value={this.state.reMark} className="form-control" type="text"  onChange={this.useReMarkChange} />
                        </div>
                    </div>
                </div>
                <div className="auth-box">
                    <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                </div>
            </div>
        );
    }
});


export default AddAuthUrl;