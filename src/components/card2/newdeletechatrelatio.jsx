/**
 * description:新删除微信关系组件;
 */
import React from 'react';
import $ from 'jquery';
import '../../assets/Style/home/card.css';
import utils from '../../assets/js/common/common.js';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
const Option = Select.Option;
var newDelChat = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            telVal: '',
            publicId: '99bill'
        };
    },
    /**
     * [手机号信息]
     */
    telValChange:function(event) {
        this.setState({telVal: event.target.value});
    },
    /**
     * [publicid信息]
     */
    handleChange: function(value) {
        this.setState({publicId: `${value}`});
    },
    /**
     * [删除事件]
     */
    delEvent: function(){
        let parmes = {
            "mobile": this.state.telVal,
            "publicId": this.state.publicId
        };
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(parmes.mobile == ""){
            alert("手机号不可为空");
            return;
        }else if(!myreg.test(parmes.mobile)){
            alert('请输入有效的手机号码！');
            return;
        }else {
            $.ajax({
                type: 'get',
                url: utils.baseUrl + '/intra/weixin/delBindAccount',
                data: parmes,
                dataType: 'json',
                headers: {
                    'Authorization': this.state.loginToken
                },
                success: function(result) {
                    console.log(result);
                    if (result.errCode == "00") {
                        alert(result.errMsg);
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
            <div className="card-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <td>注册手机号:</td>
                            <td><Input onChange={this.telValChange} /></td>
                            <td>publicid:</td>
                            <td>
                                <div>
                                    <Select defaultValue="99bill" style={{ width: 120 }} onChange={this.handleChange}>
                                        <Option value="99bill">99bill</Option>
                                        <Option value="kq">kq</Option>
                                    </Select>
                                </div>
                            </td>
                        </tr>
                        <tr><td className="td-center" colSpan="4"><Button onClick={this.delEvent}>删除</Button></td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

export default newDelChat;