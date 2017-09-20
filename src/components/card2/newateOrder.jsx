/**
 * description:新ate订单组件;
 */
import React from 'react';
import $ from 'jquery';
import '../../assets/Style/home/card.css';
import utils from '../../assets/js/common/common.js';
import { Select } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
const Option = Select.Option;

var newateOrder = React.createClass({
    /**
     * [getInitialState 初始化状态]
     */
    getInitialState: function() {
        return {
            loginToken: window.sessionStorage.getItem('loginToken'),
            bgUrlVal: "www.99bill.com",
            channelTypeVal: "",
            memberMarkVal: "",
            merchantCodeVal: "",
            orderAmountVal: "",
            orderTypeVal: "",
            outOrderTypeVal: "",
            outTradeNoVal: "",
            pageUrlVal: "",
            subMerchantNameVal: "",
            strObj:""
        };
    },
    componentDidMount: function(){
        this.orderEvent();
    },
    /**
     * 商户会员号修改
     */
    merchantCodeChange: function(event){
        this.setState({merchantCodeVal: event.target.value});
    },
    /**
     * 渠道类型
     */
    channelTypeChange: function(value){
        this.setState({channelTypeVal: `${value}`});
    },
    /**
     * 订单类型1
     */
    orderTypeChange: function(value){
        this.setState({orderTypeVal: `${value}`});
    },
    /**
     * 订单总金额
     */
    orderAmountChange: function(event){
        this.setState({orderAmountVal: event.target.value});
    },
    /**
     * 订单类型2
     */
    outOrderTypeChange: function(value){
        this.setState({outOrderTypeVal: `${value}`});
    },
    /**
     * 子商户名称
     */
    subMerchantNameChange: function(event){
        this.setState({subMerchantNameVal: event.target.value});
    },
    /**
     * 用户标识
     */
    memberMarkChange: function(event){
        this.setState({memberMarkVal: event.target.value});
    },
    /**
     * 外部订单号
     */
    outTradeNoChange: function(event){
        this.setState({outTradeNoVal: event.target.value});
    },
    /**
     * 后台通知URL
     */
    bgUrlChange: function(event){
        this.setState({bgUrlVal: event.target.value});
    },
    /**
     * 前台通知URL
     */
    pageUrlChange: function(event){
        this.setState({pageUrlVal: event.target.value});
    },
    /**
     * 下单
     */
    orderEvent: function(event){
        let parmes = {
            "bgUrl": this.state.bgUrlVal,
            "channelType": this.state.channelTypeVal,
            "memberMark": this.state.memberMarkVal,
            "merchantCode": this.state.merchantCodeVal,
            "orderAmount": this.state.orderAmountVal,
            "orderType": this.state.orderTypeVal,
            "outOrderType": this.state.outOrderTypeVal,
            "outTradeNo": this.state.outTradeNoVal,
            "pageUrl": this.state.pageUrlVal,
            "subMerchantName": this.state.subMerchantNameVal
        };
        let that = this;
        $.ajax({
            type: 'get',
            url: utils.baseUrl + '/intra/order/order',
            data: parmes,
            dataType: 'json',
            headers: {
                'Authorization': this.state.loginToken
            },
            success: function(result) {
                if (result.errCode == "00") {
                    console.log(result.dataMap);
                    that.setState({functionCode: result.functionCode});
                    that.setState({resultCode: result.resultCode});
                    let str = "{";
                    for(var i in result.dataMap){
                        str += i + "=" + result.dataMap[i] + ",";
                    }
                    let newstr=str.substring(0,str.length-1) + "}";
                    that.setState({
                        strObj: newstr,
                    });

                    //alert(result.errMsg);
                } else {
                    let msg = "处理结果："+result.errMsg;
                    let returnVal = window.confirm(msg);
                }
            },
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }
        });
    },
    render: function() {
        return (
            <div className="card-wrapper card-input">
                <table>
                    <tbody>
                    <tr>
                        <td><Input onChange={this.merchantCodeChange} placeholder="10011484027"/>商户会员号</td>
                        <td>
                            <Select defaultValue="10" style={{ width: 120 }} onSelect={this.channelTypeChange}>
                                <Option value="10">B扫C</Option>
                                <Option value="11">直接账户支付</Option>
                                <Option value="12">实体卡支付</Option>
                                <Option value="13">线下C扫B</Option>
                                <Option value="14">线上C扫B</Option>
                                <Option value="15">会员扫码转账</Option>
                                <Option value="16">理财申购</Option>
                                <Option value="17">理财转让</Option>
                                <Option value="18">转账</Option>
                                <Option value="19">一卡通退卡</Option>
                                <Option value="20">信用卡还款</Option>
                                <Option value="21">SDK</Option>
                                <Option value="22">分期商城</Option>
                                <Option value="24">中银通</Option>
                                <Option value="25">支付账户充值</Option>
                                <Option value="26">支付账户提现</Option>
                                <Option value="27">代理保险</Option>
                                <Option value="28">商户线下支付</Option>
                            </Select>渠道类型
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Select defaultValue="手机充值" style={{ width: 120 }} onChange={this.orderTypeChange}>
                                <Option value="110001">手机充值</Option>
                                <Option value="110002">买电影票</Option>
                                <Option value="110003">一卡通充值</Option>
                                <Option value="110004">信用卡还款</Option>
                                <Option value="110005">员工贷缴费</Option>
                                <Option value="110006">万达电商购物</Option>
                                <Option value="120001">PIC-B扫C</Option>
                                <Option value="130001">PIC-C扫B</Option>
                                <Option value="130002">RMB-C扫B</Option>
                                <Option value="140001">PIC快钱卡</Option>
                                <Option value="140002">传统POS-快钱卡</Option>
                                <Option value="150001">理财申购</Option>
                                <Option value="150002">理财转让</Option>
                                <Option value="160001">信用还款</Option>
                                <Option value="170001">快易付</Option>
                                <Option value="180001">商城分期</Option>
                                <Option value="190001">权益包</Option>
                                <Option value="240001">中银通充值</Option>
                                <Option value="240004">中银通透传支付</Option>
                                <Option value="250001">支付账户充值</Option>
                                <Option value="260001">支付账户提现</Option>
                                <Option value="270001">代理保险_网金平台</Option>
                                <Option value="280001">万达电商购物</Option>
                            </Select>订单类型
                        </td>
                        <td><Input onChange={this.orderAmountChange} placeholder="10000"/>订单总金额(单位:分)</td>
                    </tr>
                    <tr>
                        <td>
                            <Select defaultValue="普通消费（默认）" style={{ width: 120 }} onChange={this.outOrderTypeChange} >
                                <Option value="10">普通消费（默认）</Option>
                                <Option value="11">电商</Option>
                                <Option value="12">话费充值</Option>
                                <Option value="13">水电煤缴费</Option>
                                <Option value="14">游戏币充值</Option>
                                <Option value="15">商超</Option>
                                <Option value="16">加油</Option>
                                <Option value="17">餐饮</Option>
                                <Option value="18">娱乐</Option>
                                <Option value="19">公交</Option>
                            </Select>订单类型
                        </td>
                        <td><Input onChange={this.subMerchantNameChange} placeholder="h5统一支付test"/>子账户名称</td>
                    </tr>
                    <tr>
                        <td><Input onChange={this.memberMarkChange} placeholder="18918031287"/>用户标识</td>
                        <td><Input onChange={this.outTradeNoChange} placeholder="16003682"/>外部订单号(不能重复)</td>
                    </tr>
                    <tr>
                        <td><Input onChange={this.bgUrlChange} placeholder="www.99bill.com"/>后台通知URL</td>
                        <td><Input onChange={this.pageUrlChange} placeholder="www.99bill.com"/>前台通知URL</td>
                    </tr>
                    <tr><td className="td-center" colSpan="2"><Button onClick={this.orderEvent}>下单</Button></td></tr>
                    </tbody>
                </table>
                <table className="table-result">
                    <tbody>
                        <tr><td>返回结果resultCode : 0未知结果,1处理成功2,处理失败</td></tr>
                        <tr>
                            <td>functionCode:{this.state.functionCode},resultCode:{this.state.resultCode},{this.state.strObj}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

export default newateOrder;