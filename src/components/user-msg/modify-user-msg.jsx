/**
 * author:shimin.chen.wb;
 * time:2017/7/19;
 * description:修改用户信息组件;
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var ModifyUserMsg = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            userId:this.props.location.state.data,//从查询页传递
            userCode:'',
            userPsd:'',
            userName:'',
            userTel:'',
            userEmail:'',
            updateDate:'',
            createDate:'',
            girdSource:[], //json文件数据，后期从接口获取
            userRole:[],//用户角色信息
            isDisable:true,
            mockdata:false //是否使用mock数据
        };
    },

    // 有实际请求使用ajax请求数据
    componentDidMount: function() {
        var parmes = {
                userId:this.state.userId
            };
        if(!this.state.mockdata) {
            $.ajax({

                url: utils.baseUrl + '/intra/user/toUpdateUserInfo',
                data:parmes,
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        this.setState({userCode:data.userInfo.userCode});
                        this.setState({userPsd:data.userInfo.password});
                        this.setState({userName:data.userInfo.name});
                        this.setState({userTel:data.userInfo.telephone});
                        this.setState({userEmail:data.userInfo.email});
                        this.setState({createDate:data.userInfo.createDate});
                        this.setState({updateDate:data.userInfo.updateDate});
                        this.setState({girdSource:data.roleInfo});
                        this.setState({userRole:data.userRole});
                    }
                    this.setState({});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            var girdData = require('../../json/user-role.json');
            if(girdData.flag) {
                if(girdData.result.length) {
                    this.setState({girdSource:girdData.result});
                }
            }
        }
    },
    /**
     * [resourceNameChange 用户编码change事件]
     */
    userCodeChange:function(event) {
        this.setState({userCode: event.target.value});
    },
    /**
     * [userPsdChange 用户密码change事件]
     */
    userPsdChange:function(event) {
        this.setState({userPsd: event.target.value});
    },
    /**
     * [resourceNameChange 用户名称change事件]
     */
    userNameChange:function(event) {
        this.setState({userName: event.target.value});
    },
    /**
     * [userTelChange 用户电话change事件]
     */
    userTelChange:function(event) {
        this.setState({userTel: event.target.value});
    },
    /**
     * [userEmailChange 用户email change事件]
     */
    userEmailChange:function(event) {
        this.setState({userEmail: event.target.value});
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
            userId:this.state.userId,
            userCode:this.state.userCode,
            password:this.state.userPsd,
            name:this.state.userName,
            telephone:this.state.userTel,
            email:this.state.userEmail,
            createDate:this.state.createDate
        };
        if(parmes.password === '' || parmes.password === null) {
            alert('请输入用户密码！');
            return;
        };
        if(parmes.name === '' || parmes.name === null) {
            alert('请输入用户名！');
            return;
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/updateUserInfo',
                data:parmes,
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //数据请求成功后将值放到state
                    if(data.errCode === '00'){ 
                        alert('提交成功！');
                        // 提交成功值清空
                        this.setState({userCode:''});
                        this.setState({userPsd:''});
                        this.setState({userName:''});
                        this.setState({userTel:''});
                        this.setState({userEmail:''});
                    }else {
                        alert('提交失败！');
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            var successData = require('../../json/success.json');
            if(successData.flag) {
                alert('提交成功！');
                // 提交成功值清空
                this.setState({userCode:''});
                this.setState({userPsd:''});
                this.setState({userName:''});
                this.setState({userTel:''});
                this.setState({userEmail:''});
            }
        }
    },
    /**
     * [deleteEvent 删除角色事件]
     */
    deleteEvent:function(event) {
        var e = event,
            id = e.target.getAttribute('data-id'),
            parmes = {
                id:id
            };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/deleteUserRole',
                data:parmes,
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //删除成功，重新刷新列表
                    if(data.errCode === '00') {
                        alert('删除成功！');
                        this.componentDidMount();
                    }else{
                        alert('删除失败！');
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });

        } else {
            var successData = require('../../json/success.json');
            if(successData.flag) { 
                alert('删除成功！');
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
                <h3>修改用户信息</h3>
                <div className="user-message modiy-user-msg clearfix">
                    <div className="user-name fl">
                        <label><span style={{color:"red"}}>*</span>用户编号(登录名):</label>
                        <input type="text" value={this.state.userCode} disabled={this.state.isDisable} onChange={this.userCodeChange} />
                    </div>
                    <div className="user-name fl">
                        <label><span style={{color:"red"}}>*</span>密码:</label>
                        <span style={{position:'relative'}}>
                            <input type={passwordType} style={{padding:'0 20px 0 5px'}} value={this.state.userPsd} onChange={this.userPsdChange} />
                            <i className="password-show" onMouseOver={this.passwordMouseOver} onMouseOut={this.passwordMouseOut}></i>
                        </span>
                    </div>
                    <div className="user-code fl">
                        <label><span style={{color:"red"}}>*</span>用户名:</label>
                        <input type="text" value={this.state.userName} onChange={this.userNameChange} />
                    </div>
                    <div className="user-name fl">
                        <label>电话:</label>
                        <input type="text" value={this.state.userTel} onChange={this.userTelChange} />
                    </div>
                    <div className="user-name fl">
                        <label>E-mail:</label>
                        <input type="text" value={this.state.userEmail} onChange={this.userEmailChange} />
                    </div>
                    <div className="search-box fr">
                        <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                    </div>
                </div>
                <div className="user-table">
                    <div className="title">
                        <span>用户角色</span>
                        <Link to={{pathname:"/html/distributionRole", state:{userId:this.state.userId,userName:this.state.userName}  }} className="distribution-name">分配角色</Link>
                    </div>
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>用户id</th>
                                <th>用户名称</th>
                                <th>角色id</th>
                                <th>角色名称</th>
                                <th>更新时间</th>
                                <th width="100">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userRole.map((item, rowIndex) => {
                                    item.updateDate = utils.formatCSTDate(item.updateDate,'yyyy-MM-dd hh:mm:ss');
                                    return (
                                        <tr key={rowIndex}>
                                            <td className="ell" title={this.state.userId}>{this.state.userId}</td>
                                            <td className="ell" title={this.state.userCode}>{this.state.userCode}</td>
                                            <td className="ell" title={item.roleId}>{item.roleId}</td>
                                            {
                                                this.state.girdSource.map((obj,index) => {
                                                    if(obj.roleId === item.roleId) {
                                                        return (
                                                            <td key={index} className="ell" title={obj.name}>{obj.name}</td>
                                                        );
                                                    }
                                                })
                                            }
                                            <td className="ell" title={item.updateDate}>{item.updateDate}</td>
                                            <td className="operating">
                                                <button className="btn-delete" data-id={item.id} onClick={this.deleteEvent}>删除</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});


export default ModifyUserMsg;