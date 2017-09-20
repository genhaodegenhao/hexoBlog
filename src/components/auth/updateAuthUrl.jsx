/**
    更新权限配置
*/

import React, {Component} from 'react';
import $ from 'jquery';
import { Link,hashHistory } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import utils from '../../assets/js/common/common.js';
import '../../assets/Style/home/auth.css';

var UpdateAuthUrl = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken:window.sessionStorage.getItem("loginToken"),
            authId: this.props.location.state.data,
            name:"",
            url:"",
            tokenType:"",
            reMark:"",
            status:"",
            crtTime:""
        };
    },
    componentDidMount:function(){
        var loginToken =  window.sessionStorage.getItem("loginToken");
        var parmes = {
             authId: this.state.authId
        };
        $.ajax({
            url: utils.baseUrl +'/intra/authUrl/getAuthUrl',
            type:'GET',
            data:parmes,
            dataType: 'json',
            headers: {
                'Authorization': loginToken
            },
            success: function(data) {
                if(data.errCode === '00') {
                    this.setState({
                        name: data.authUrlToken.name,
                        url: data.authUrlToken.url,
                        tokenType: data.authUrlToken.tokenType,
                        reMark: data.authUrlToken.reMark,
                        crtTime:data.authUrlToken.crtTime,
                        status:data.authUrlToken.status
                    });
                }else {
                    alert(data.errMsg);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
    },
    /**
     * [userNameChange 用户change事件]
     */
    userNameChange:function(event) {
        this.setState({name:event.target.value});
    },
    /**
     * [userTimeChange 时间change事件]
     */
    userTimeChange:function(event) {
        this.setState({crtTime:event.target.value});
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
     * [userChangeStatus 状态change事件]
     */
    userChangeStatus:function(event) {
        this.setState({status:event.target.value});
    },
    
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
                authId:this.state.authId,
                urlName:this.state.name,
                urlValue:this.state.url,
                tokenType:this.state.tokenType,
                reMark:this.state.reMark,
                status:this.state.status
        };
        // if(parmes.name === '') {
        //     alert('请输入名称！');
        //     return;
        // };
        // if(parmes.urlValue === '') {
        //     alert('请输入链接！');
        //     return;
        // };
        if((parmes.urlValue.indexOf("/coc-bill-api"))==-1) {
            alert('请输入正确的链接');
            return;
        };
        // if(parmes.tokenType === '') {
        //     alert('请选择权限类型！');
        //     return;
        // };
        $.ajax({
            url: utils.baseUrl +'/intra/authUrl/editUrlStaus',
            type:'GET',
            data:parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(data) {
                if(data.errCode === '00') {
                    alert('提交成功！');
                    hashHistory.push('/html/success');
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
                    <div className="auth-time">
                        <div>
                            <label>
                                创建时间
                            </label>
                        </div> 
                        <div>
                            <input type="text" disabled="disabled" value={utils.formatCSTDate(this.state.crtTime,"yyyy-M-d hh:mm:ss")} className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="auth-status">
                        <div>
                            <label>接口状态</label>
                        </div>
                        <div>
                            <select onChange={this.userChangeStatus} value={this.state.status} className="form-control form-control1" id="" >
                                <option value="" >全部</option>
                                <option value="0">停用</option>
                                <option value="1">启用</option>
                            </select>   
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


export default UpdateAuthUrl;