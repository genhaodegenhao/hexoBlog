/**
 * author:shimin.chen.wb;
 * time:2017/7/18;
 * description:查询用户信息组件;
 */
import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import '../../assets/Style/home/add-resource-inf.css';
import utils from '../../assets/js/common/common.js';

var SearchUserMsg = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            userCode:'',
            userName:'',
            girdSource:[], //json文件数据，后期从接口获取
            totalNum:0,//总记录数
            pageNo:1,  //当前页
            pageSize:10, //每页显示的条数5条
            totalPage:'',//总页数
            mockdata:false //是否从mock取数据
        };
    },
    // 有实际请求使用ajax请求数据
    componentDidMount: function() {
        this.searchEvent();//初始化请求数据
    },
    /**
     * [resourceNameChange 用户编码change事件]
     */
    userCodeChange:function(event) {
        this.setState({userCode: event.target.value});
    },
    /**
     * [resourceNameChange 用户名称change事件]
     */
    userNameChange:function(event) {
        this.setState({userName: event.target.value});
    },
    /**
     * [searchEvent 查询事件]
     */
    searchEvent:function(event) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            parmes = {
            userCode:this.state.userCode,
            name:this.state.userName,
            pageSize:this.state.pageSize,
            pageNo:this.state.pageNo
        };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/userInfo',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //数据请求成功后将值放到state
                    if (data.errCode == '00') {
                        this.setState({girdSource:data.userInfoList.elements});
                        //pageInfo = result.pageBean;
                        // this.setState({totalData:data.userInfoList})
                        this.setState({totalNum:data.pageBean.totalNum});
                        this.setState({totalPage:data.pageBean.totalPages});
                        // this.pageClick(1);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    // console.error(this.props.source, status, err.toString());
                }.bind(this)
            });
        }else {
            var data = require('../../json/search-user.json');
            if(data.flag) {
                if(data.result.length) {
                    console.log('查询成功！');
                    this.setState({girdSource:data.result});
                }
            }
        }
    },
    /**
     * [deleteEvent 删除事件]
     */
    deleteEvent:function(event) {
        var loginToken =  window.sessionStorage.getItem('loginToken'),
            id = event.target.getAttribute('data-id'),
            parmes = {
                userId:id
            };
        if(!this.state.mockdata) {
            $.ajax({
                url: utils.baseUrl + '/intra/user/deleteUserInfo',
                type:'get',
                data:parmes,
                headers: {
                    'Authorization': loginToken
                },
                dataType: 'json',
                success: function(data) {
                    //删除成功，重新刷新列表
                    if(data.errCode === '00') {
                        alert('删除成功！');
                        this.searchEvent();
                    }else {
                        alert(data.errMsg);
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

    //点击翻页
    pageClick:function(pageNum) {
        var _this = this;
        if(pageNum != this.state.pageNo){
             _this.setState({pageNo:pageNum});
         };
        setTimeout(function(){
            _this.searchEvent();
        },300);
        
    },
    //上一步
    goPrevClick:function(){
        var _this = this;
        let cur = this.state.pageNo;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    },
    //下一步
    goNext:function(){
        var _this = this;
        let cur = _this.state.pageNo;
        //alert(cur+"==="+_this.state.totalPage)
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    },
    //跳转到指定页
    // goSwitchChange:function(e){
    //         // var _this= this;
    //         // _this.setState({goValue : e.target.value})
    //         // var value = e.target.value;
    //         // //alert(value+"==="+_this.state.totalPage)
    //         // if(!/^[1-9]\d*$/.test(value)){
    //         //     alert('页码只能输入大于1的正整数');
    //         // }else if(parseInt(value) > parseInt(_this.state.totalPage)){
    //         //     alert('没有这么多页');
    //         // }else{
    //         //     _this.pageClick(value);
    //         // }
    // },
    render: function() {
        return ( 
            <div className="resource-inf-wrapper">
                <h3>查询用户信息</h3>
                <div className="user-message clearfix">
                    <div className="user-code fl">
                        <label>用户编号:</label>
                        <input type="text" value={this.state.userCode} onChange={this.userCodeChange} />
                    </div>
                    <div className="user-name fl">
                        <label>用户名:</label>
                        <input type="text" value={this.state.userName} onChange={this.userNameChange} />
                    </div>
                    <div className="search-box fl">
                        <a href="javascript:void(null)" onClick={this.searchEvent}>查询</a>
                    </div>
                </div>
                <div className="user-table">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>用户id</th>
                                <th>用户编号(登录名)</th>
                                <th>密码</th>
                                <th>用户名</th>
                                <th>电话</th>
                                <th>E-mail</th>
                                <th>更新时间</th>
                                <th width="100">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdSource.map((item, rowIndex) => {
                                    item.updateDate = utils.formatCSTDate(item.updateDate,'yyyy-MM-dd hh:mm:ss');
                                    return (
                                        <tr key={rowIndex}>
                                            <td className="ell" title={item.userId}>{item.userId}</td>
                                            <td className="ell" title={item.userCode}>{item.userCode}</td>
                                            <td className="ell" title={item.password}>{item.password}</td>
                                            <td className="ell" title={item.name}>{item.name}</td>
                                            <td className="ell" title={item.telephone}>{item.telephone}</td>
                                            <td className="ell" title={item.email}>{item.email}</td>
                                            <td className="ell" title={item.updateDate}>{item.updateDate}</td>
                                            <td className="operating">
                                                <Link to={{pathname:"/html/modifyUserMsg", state:{data:item.userId}  }}><button className="btn-modify" data-id={item.userId}>修改</button></Link>
                                                <button className="btn-delete" data-id={item.userId} onClick={this.deleteEvent}>删除</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <PageComponent total={this.state.totalNum}
                          current={this.state.pageNo}
                          totalPage={this.state.totalPage}
                          pageClick={this.pageClick}
                          goPrev={this.goPrevClick}
                          goNext={this.goNext}/>
                </div>
            </div>
        );
    }
});


export default SearchUserMsg;