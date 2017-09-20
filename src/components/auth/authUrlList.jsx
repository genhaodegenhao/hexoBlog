/**
    查询权限列表
*/
import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageComponent from '../page/pageComponent.jsx';
import utils from '../../assets/js/common/common.js';
import '../../assets/Style/home/auth.css';

var AuthUrlList = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken:window.sessionStorage.getItem("loginToken"),
            url:'',
            tokenType:'',
            status:'',
            totalNum:'',//总记录数
            pageNo:1,  //当前页
            pageSize:10, //每页显示的条数10条
            totalPage:'',//总页数
            girdSource:[], //json文件数据，后期从接口获取
        };
    },

    userChangeUrl:function(event) {
        this.setState({url: event.target.value});
    },
    userChangeTokenType:function(event){
        var value = event.target.value;
        this.setState({
            tokenType: value,
        });
    },
    userChangeStatus: function(event) {
      var value = event.target.value;
      this.setState({
        status: value,
      });
    },
    /**
     * [searchEvent 搜索事件]
     */
    searchEvent:function(event) {
        var parmes = {
                loginToken:window.sessionStorage.getItem("loginToken"),
                url:this.state.url,
                status: this.state.status,
                tokenType: this.state.tokenType,
                pageNo:this.state.pageNo,
                pageSize:this.state.pageSize
        }
        $.ajax({
            type: "GET",
            url: utils.baseUrl +'/intra/authUrl/query',
            data: parmes,
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(data) {
                //data
                if (data.errCode == "00") {
                    this.setState({girdSource:data.authUrlList.elements});
                    this.setState({totalNum:data.pageBean.totalNum});
                    this.setState({totalPage:data.pageBean.totalPages});
                } else {
                    alert(data.errMsg)
                    var msg = "处理结果："+data.errMsg;
                    var returnVal = window.confirm(msg);
                }
            }.bind(this)
        });
    },
    // 删除资源
    deleteEvent: function(e,resource){
        var resId = e.target.getAttribute('data-id');
        var parmes = {
            authId: resId
        };
        $.ajax({
            type: "GET",
            url: utils.baseUrl +'/intra/authUrl/deleteAuth',
            data: parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(result) {
                if (result.errCode == "00") {
                    alert('删除成功');
                    this.searchEvent();
                } else {
                    var msg = "处理结果："+result.errMsg;
                    var returnVal = window.confirm(msg);
                }
            }.bind(this)
        });
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
    render: function() {
        return ( 
            <div className="auth-inf-wrapper">
                <h3>查询权限列表</h3>
                <div className="auth-inf-form">
                    <div className="auth-name">
                        <div>
                            <label>
                                链接
                            </label>
                        </div>
                        <div>
                            <input value={this.state.url} className="form-control" type="text"  onChange={this.userChangeUrl} />
                        </div>
                    </div>
                    <div className="auth-url">
                        <div>
                            <label>
                                权限类型
                            </label>
                        </div>
                        <div>
                            <select value={this.state.tokenType}  onChange={this.userChangeTokenType} className="form-control form-control1" id="">
                                <option value="" >全部</option>
                                <option value="WEAK_TOKEN">弱权限Token</option>
                                <option value="LOGIN_TOKEN">登录Token</option>
                                <option value="PAY_TOKEN">支付密码Token</option>
                                <option value="LOGIN_TOKEN_WHITE_LIST">登录Token白名单</option>
                                <option value="BUS_LOGIN_TOKEN">商户登录Token</option>
                            </select>
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
                    <a href="javascript:void(null)" onClick={this.searchEvent}>查询</a>
                </div>
                <div className="user-table">
                    <table cellSpacing="0">
                        <thead>
                        <tr>
                            <th>名称</th>
                            <th>链接</th>
                            <th>token类型</th>
                            <th>备注</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.girdSource.map((item, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        <td className="ell" title={item.name}>{item.name}</td>
                                        <td className="ell" title={item.url}>{item.url}</td>
                                        <td className="ell" title={item.tokenType}>{item.tokenType}</td>
                                        <td className="ell" title={item.reMark}>{item.reMark}</td>
                                        <td className="ell" title={utils.formatCSTDate(item.crtTime,"yyyy-MM-dd hh:mm:ss")}>{utils.formatCSTDate(item.crtTime,"yyyy-MM-dd hh:mm:ss")}</td>
                                        <td className="ell" title={item.status}>{item.status==0?"停用":"启用"}</td>
                                        <td className="operating">
                                            <Link to={{pathname:"/html/updateAuthUrl", state:{data:item.authId} }}><button className="btn-modify" data-id={item.authId}>修改</button></Link>
                                            <button className="btn-delete" data-id={item.authId} onClick={this.deleteEvent}>删除</button>
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


export default AuthUrlList;