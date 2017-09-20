/**
 * author:zishuai.xu;
 * time:2017/8/1;
 * description:新增菜单和修改菜单信息组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import '../../assets/Style/home/menu-info.css';
import utils from '../../assets/js/common/common.js';
import {hashHistory} from 'react-router'


var AddMenuInfo = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        var _this = this;
        var name,menuUrl,parentId,menuItem,menuOrder,isUpdate,menuId;
        try {
            name = this.props.location.state.name;
            menuUrl = this.props.location.state.menuUrl;
            parentId = this.props.location.state.parentId;
            menuItem = this.props.location.state.menuItem;
            menuOrder = this.props.location.state.menuOrder;
            isUpdate = this.props.location.state.isUpdate;
            menuId = this.props.location.state.menuId;
        } catch(e) {
            name = menuUrl = parentId = menuItem = menuOrder = menuId = '';
            isUpdate = false;
        }
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            name: name,
            menuUrl: menuUrl,
            parentId: parentId,
            menuItem: menuItem,
            menuOrder: menuOrder,
            parentMenuInfo: [],
            mockdata:false, //是否使用mock数据,
            isUpdate: isUpdate,
            menuId: menuId,
            pathname: _this.props.location.pathname

        };
    },

    /**
     * [componentWillMouint 组件将要mount时数据初始化]
     */
    componentWillMount: function () {
        console.log('will mount')
        this.initParentIds();
    },

    /**
     * [initParentIds 获取select菜单的所有option]
     */

    initParentIds: function () {
        var parmes = {
        };
        $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/menu/toUpdateMenuInfo?id=484',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(data) {
                    console.log(data);
                    try {
                         this.setState({
                            parentMenuInfo: [{menuId:'',name: '一级菜单#'},...data.parentMenuInfo]
                        })
                    } catch(e) {
                        alert('请重新登录！');
                        hashHistory.push({pathname:'/'})
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });

    },

    /**
     * [handleSubmit 处理当新添加menu的事件]
     */

    handleSubmit: function (e) {

        if(this.state.name.trim().length == 0 || this.state.menuUrl.trim().length == 0 || this.state.menuOrder.trim().length == 0) {

            alert('请输入正确的信息！信息不能为空！')
            return;
        }
        var parmes = {
            menuItem: this.state.menuItem,
            menuOrder: this.state.menuOrder,
            menuUrl: this.state.menuUrl,
            name: this.state.name,
            parentId: this.state.parentId
        };
        $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/menu/addMenuInfo',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(data) {
                   
                    if(data.errCode == "00") {
                        alert("提交成功！")
                    } else {
                        alert('提交失败！请重试')
                    } 
                    
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });

    },

    /**
     * [handleUpdate 处理更新menu的事件]
     */

    handleUpdate: function (e) {
        
        if(this.state.name.trim().length == 0 || this.state.menuUrl.trim().length == 0 || this.state.menuOrder.trim().length == 0) {
            alert('请输入正确的信息！信息不能为空！')
            return;
        }
        var timespan = (new Date).getTime();
        var parmes = {
            menuItem: this.state.menuItem,
            menuOrder: this.state.menuOrder,
            menuUrl: this.state.menuUrl,
            name: this.state.name,
            parentId: this.state.parentId,
            menuId: this.state.menuId,
            createDate: timespan
        };
        $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/menu/updateMenuInfo',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(data) {
                    console.log(data);
                    
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }.bind(this)
            });

    },
    /**
     * [handleNameChange 菜单名称change事件]
     */
    handleNameChange:function(event) {
        this.setState({name: event.target.value});
    },
    /**
     * [handleMenuUrlChange 菜单地址url change事件]
     */
    handleMenuUrlChange:function(event) {
        this.setState({menuUrl: event.target.value});
    },
    /**
     * [handleParentIdChange 处理parentid change的事件]
     */

    handleParentIdChange: function (event) {
        this.setState({parentId: event.target.value})
    },
    /**
     * [handleMenuItemChange 处理menuitem change的事件]
     */
    handleMenuItemChange: function (event) {
        this.setState({menuItem: event.target.value})
    },
    /**
     * [handleMenuOrderChange 处理menuorder change的事件]
     */
    handleMenuOrderChange: function (event) {
        this.setState({menuOrder: event.target.value})
    },
   
    render: function() {
        return ( 
            <div className="resource-inf-wrapper">
                <h3>{this.state.isUpdate?'修改菜单信息':'新新增菜单信息'}</h3>
                <div className="resource-inf-form">
                    <div className="resource-name menu-label-input">
                        <label>
                            <span style={{color: 'red'}}>*</span>菜单名称:
                        </label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div className="resource-name menu-label-input">
                        <label>
                            <span style={{color: 'red'}}>*</span>菜单url地址(一级菜单填写#):
                        </label>
                        <input placeholder="一级菜单填写#" type="text" value={this.state.menuUrl} onChange={this.handleMenuUrlChange} />
                    </div>
                    <div className="resource-name menu-label-input">
                        <label>
                            <span style={{color: 'red'}}>*</span>父级菜单id(对应菜单名称):
                        </label>
                        <select style={{width: '150px'}}  value={this.state.parentId} onChange={this.handleParentIdChange} >
                            {
                                this.state.parentMenuInfo.map((v,i) => {
                                    return (<option key={i} value={v.menuId}>{v.name}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="resource-name menu-label-input">
                        <label>
                            <span style={{color: 'red'}}>*</span>菜单级别:
                        </label>
                        <select style={{width: '150px'}} value={this.state.menuItem} onChange={this.handleMenuItemChange} >
                            <option value="1">一级菜单</option>
                            <option value="2">二级菜单</option>
                        </select>
                    </div>
                    <div className="resource-name menu-label-input">
                        <label>
                            <span style={{color: 'red'}}>*</span>菜单序号:
                        </label>
                        <input placeholder="比如1,2,3" type="text" value={this.state.menuOrder} onChange={this.handleMenuOrderChange} />
                    </div>
                </div>
                <div className="btn-box menu-btn-box">
                    <a href="javascript:void(null)" onClick={this.state.isUpdate?this.handleUpdate:this.handleSubmit}>提交</a>
                </div>
            </div>
        );
    }
});

export default AddMenuInfo;