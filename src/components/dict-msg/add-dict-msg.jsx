/**
 * author:shimin.chen.wb;
 * time:2017/8/1;
 * description:增加字典信息组件;
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var AddDictMsg = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            classCode:'',
            code:'',
            ordNum:'',
            userName:'',
            name:'',
            quickCode:'',
            scopeId:'',
            classCodeList:[],//代码分类列表
            mockdata:false //是否使用mock数据
        };
    },

    // 有实际请求使用ajax请求数据
    componentDidMount: function() {
        if(!this.state.mockdata) {
            $.ajax({
                type:'get',
                url: utils.baseUrl + '/intra/dict/getClassCode',
                headers: {
                       'Authorization': this.state.loginToken
                },
                dataType: 'json',
                success: function(data) {
                    if(data.errCode === '00') {
                        this.setState({classCodeList:data.dict_classCodeList});
                        this.setState({classCode: data.dict_classCodeList[0]});
                    }
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
     * [resourceNameChange 字典分类代码change事件]
     */
    classCodeChange:function(event) {
        this.setState({classCode: event.target.value});
    },
    /**
     * [userPsdChange 字典分类代码排序号change事件]
     */
    ordNumChange:function(event) {
        this.setState({ordNum: event.target.value});
    },
    /**
     * [resourceNameChange 代码code change事件]
     */
    codeChange:function(event) {
        this.setState({code: event.target.value});
    },
    /**
     * [userTelChange 字典分类名称change事件]
     */
    nameChange:function(event) {
        this.setState({name: event.target.value});
    },
    /**
     * [userEmailChange 助记代码quickCode change事件]
     */
    quickCodeChange:function(event) {
        this.setState({quickCode: event.target.value});
    },

    /**
     * [userEmailChange 层次类型字典下的scopeId change事件]
     */
    scopeIdChange:function(event) {
        this.setState({scopeId: event.target.value});
    },
    /**
     * [submitEvent 提交事件]
     */
    submitEvent:function(event) {
        var parmes = {
            classCode:this.state.classCode,
            ordNum:this.state.ordNum,
            code:this.state.code,
            name:this.state.name,
            quickCode:this.state.quickCode,
            scopeId:this.state.scopeId
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/dict/addDictCodeMap',
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
                        this.setState({classCode:''});
                        this.setState({code:''});
                        this.setState({ordNum:''});
                        this.setState({name:''});
                        this.setState({quickCode:''});
                        this.setState({scopeId:''});
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
                this.setState({classCode:''});
                this.setState({code:''});
                this.setState({ordNum:''});
                this.setState({name:''});
                this.setState({quickCode:''});
                this.setState({scopeId:''});
            }
        }
    },
    render: function() {
        return ( 
            <div className="resource-inf-wrapper">
                <h3>新增字典信息</h3>
                <div className="user-message modiy-user-msg modify-dict-msg clearfix">
                    <div className="resource-name">
                        <label><span style={{color:"red"}}>*</span>字典分类代码:</label>
                        <select name="classCode" onChange={this.classCodeChange}>
                            {
                                this.state.classCodeList.map((item, rowIndex) => {
                                    return (
                                        <option key={rowIndex} value={item}>{item}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="resource-name">
                        <label><span style={{color:"red"}}>*</span>字典分类代码排序号:</label>
                        <input type="text" value={this.state.ordNum} onChange={this.ordNumChange} />
                    </div>
                    <div className="resource-name">
                        <label><span style={{color:"red"}}>*</span>代码code:</label>
                        <input type="text" value={this.state.code} onChange={this.codeChange} />
                    </div>
                    <div className="resource-name">
                        <label><span style={{color:"red"}}>*</span>字典分类名称:</label>
                        <input type="text" value={this.state.name} onChange={this.nameChange} />
                    </div>
                    <div className="resource-name">
                        <label>助记代码quickCode:</label>
                        <input type="text" value={this.state.quickCode} onChange={this.quickCodeChange} />
                    </div>
                    <div className="resource-name">
                        <label>层次类型字典下的scopeId:</label>
                        <input type="text" value={this.state.scopeId} onChange={this.scopeIdChange} />
                    </div>
                    <div className="btn-box">
                        <a href="javascript:void(null)" onClick={this.submitEvent}>提交</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default AddDictMsg;