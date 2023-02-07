import React,{Component} from "react";
import { Result,WhiteSpace,Flex,List,Button,WingBlank,Modal } from "antd-mobile";
import { connect } from "react-redux";
import { Link,Redirect } from "react-router-dom";
import browserCookie from "browser-cookies"
import { logout} from "../../../redux/user.redux";  
import "./user.css";

@connect(state=>state.user,{
    logout,
})
class User extends Component{

    information(){
        this.props.history.push(this.props.type==="BOSS"?"/bossinfo":"/geniusinfo");
    }

    improveResume(){
        this.props.history.push("/improveResume");
    }

    logout(){
        Modal.alert("提示","您确定要退出登录吗？",[
            {
                text:"取消",
                onPress:()=>{}
            },
            {
                text:"确认",
                onPress:()=>{
                    browserCookie.erase("userId");
                    browserCookie.erase("type");
                    this.props.logout();
                }
            }
        ])
    }

    render(){
        const Item = List.Item;

        return (
            <div>
                {!this.props._id?<Redirect to={this.props.redirect}/>:null}
                <Result
                    img={
                        <Link to={this.props.type==="BOSS"?"/bossinfo":"/geniusinfo"}>
                            <img src={this.props.avatar} style={{width:"90%"}} alt=""/>
                        </Link>
                    }
                    title={
                        <Link to={this.props.type==="BOSS"?"/bossinfo":"/geniusinfo"}>{this.props.username}</Link>
                    }
                    message={(<div style={{padding:"0 20%"}}>
                                    <Flex>
                                        <Flex.Item>性别：{this.props.sex}</Flex.Item>
                                        <Flex.Item className="ta-right">年龄：{this.props.age}</Flex.Item>
                                    </Flex>
                                </div>
                            )}
                />
                
                <WhiteSpace />
                <List  className="my-list">
                    {this.props.type==="BOSS"?<Item extra={this.props.company}><i className="iconfont icon-gongsi00 fs-20 c-888"></i></Item>:null}
                    <Item extra={this.props.title}><i className="iconfont icon-gongsituandui fs-20 c-888"></i></Item>
                    <Item extra={this.props.money}><i className="iconfont icon-money fs-20 c-888"></i></Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item extra={this.props.type==="BOSS"?"职位简介":"个人简介"}>
                        <i className="iconfont icon-jianjie fs-20 c-888"></i>
                    </Item>
                </List>
                <div style={{color:"#888",textIndent:20,padding:"10px 15px",backgroundColor:"#fff",borderBottom:"1px solid #eee"}}>
                    {this.props.desc}
                </div>


                <WingBlank>
                    <Button 
                        // type="warning"
                        // className="modify-personal-information"
                        onClick={this.information.bind(this)}
                    >修改个人信息</Button>
                </WingBlank>

                <WingBlank>
                    <Button 
                        // type="warning"
                        // className="modify-personal-information"
                        onClick={this.improveResume.bind(this)}
                    >完善简历</Button>
                </WingBlank>


                <div className="exit-login">
                <WingBlank>
                    <Button 
                        type="warning"
                        onClick={this.logout.bind(this)}
                    >退出登录</Button>
                </WingBlank>
                </div>


                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}

export default User