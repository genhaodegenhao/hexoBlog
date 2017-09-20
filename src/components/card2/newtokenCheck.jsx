/**
 * description:新验证token组件;
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import $ from 'jquery';
import '../../assets/Style/home/card.css';
import utils from '../../assets/js/common/common.js';
const FormItem = Form.Item;
var newTokenCheck = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            tokenVal: '',
            searchData: []
        };
    },
    /**
     * [token信息事件]
     */
    tokenValChange:function(event) {
        this.setState({tokenVal: event.target.value});
    },
    handleSubmit: function(){
        let parmes = {
            "tokenKey": this.state.tokenVal
        };
        if(parmes.tokenKey == ""){
            alert("token不可为空");
            return;
        }else {
            let that = this;
            $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/token/tokenQuery',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(result) {
                    if (result.errCode == "00") {
                        let arr = [];
                        arr.push(result.tokenMap);
                        that.setState({searchData: arr});
                    } else {
                        let msg = "处理结果："+result.errMsg;
                        let returnVal = window.confirm(msg);
                    }
                },
                error: function(xhr, status, err) {
                    console.error(this.props.source, status, err.toString());
                }
            });
        }
    },
    render: function() {
        return (
            <div>
                <div className="card-text">H5后台系统</div>
                <div className="card-box">
                    <Form className="query-form">
                        <FormItem>
                            token:<Input onChange={this.tokenValChange} />
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit} type="primary" className="login-form-button btn-query">
                                查询
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="user-table token-table">
                    <table cellSpacing="0">
                        <thead>
                        <tr>
                            <th>tokenType</th>
                            <th>用户名</th>
                            <th>membercode</th>
                            <th>userid</th>
                            <th>姓名</th>
                            <th>使用次数</th>
                            <th>授权url</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.searchData.map((item, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        <td title={item.tokenType}>{item.tokenType}</td>
                                        <td title={item.idContent}>{item.idContent}</td>
                                        <td title={item.memberCode}>{item.memberCode}</td>
                                        <td title={item.userId}>{item.userId}</td>
                                        <td title={item.name}>{item.name}</td>
                                        <td title={item.time}>{item.time}</td>
                                        <td title={item.url}>{item.url}</td>
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

export default newTokenCheck;