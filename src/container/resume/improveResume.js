import React,{Component} from "react";
import {connect} from "react-redux";
import { NavBar,InputItem,TextareaItem,Button,WingBlank,WhiteSpace,Picker,List,Toast,Icon } from "antd-mobile";
import ChooseHeadImage from "../../components/choose-head-image/choose-head-image";
import {improveResumeAction} from "../../redux/user.redux";

const seasons = [
    {
        label: '男',
        value: '男',
    },
    {
        label: '女',
        value: '女',
    },
];

const educationals = [
    {
        label: '高中及以下',
        value: '高中及以下',
    },
    {
        label: '本科',
        value: '本科',
    },
    {
        label: '硕士',
        value: '硕士',
    },
    {
        label: '博士',
        value: '博士',
    },
];
  
@connect(state=>state.user,{
    improveResumeAction
})
class improveResume extends Component{
    constructor(props){
        super(props)
        this.state = {
            sex:["男"],
            username:"",
            age:"",
            title:"",
            money:"",
            experience:"",
            educational:"",
            school:"",
            personalAdvantages:"",
            workExperience:"",
        }
    }

    componentWillMount(){
        this.setState({
            sex:this.props.sex,
            username:this.props.username,
            age:this.props.age,
            title:this.props.title,
            money:this.props.money,
            experience:this.props.experience,
            educational:this.props.educational,
            school:this.props.school,
            personalAdvantages:this.props.personalAdvantages,
            workExperience:this.props.workExperience,
        })
    }

    changeHandle(key,v){
        this.setState({
            ...this.state,
            [key]: v
        })
    }

    saveHandle(){
        const info = Object.values(this.state);
        for(let i =0;i<info.length;i++){
            if(!info[i]){
                Toast.fail("信息不完整")
                return false;
            }
        }

        this.props.improveResumeAction(this.state,()=>{
            this.props.history.push("/user")
        });
    }

    render(){

        return (
            <div className="Info mt-45">
                {
                    this.props.username?(
                        <NavBar 
                            mode="dark"
                            icon={<Icon type="left"/>}
                            onLeftClick={() => this.props.history.push("/user")}
                        >编辑信息</NavBar>
                    ):(
                        <NavBar 
                            mode="dark"
                        >完善信息</NavBar>
                    )
                }
                {/* <ChooseHeadImage 
                    clickHandle={t=>{
                        this.setState({
                            ...this.state,
                            avatar: t.icon
                        })
                    }}
                    icon_path={this.state.avatar}
                ></ChooseHeadImage> */}
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                <InputItem 
                        type="text" 
                        placeholder="请输入您的姓名" 
                        className="ta-right"
                        onChange={v => this.changeHandle("username",v)}
                        value={this.state.username}
                    >姓名</InputItem>
                    <InputItem 
                        type="number" 
                        placeholder="请输入您的年龄" 
                        className="ta-right"
                        onChange={v => this.changeHandle("age",v)}
                        value={this.state.age}
                    >年龄</InputItem>
                    <Picker
                        title="选择性别"
                        extra="请选择"
                        cols={1}
                        data={seasons}
                        value={this.state.sex}
                        onChange={v => this.changeHandle("sex",v)}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <InputItem 
                        type="text" 
                        placeholder="请输入求职职位"
                        onChange={v => this.changeHandle("title",v)}
                        value={this.state.title}
                    >职位</InputItem>
                    <InputItem 
                        type="text" 
                        placeholder="请输入意向薪资"
                        onChange={v=> this.changeHandle("money",v)}
                        value={this.state.money}
                    >意向薪资</InputItem>
                    <InputItem
                        type="text"
                        placeholder="请输入工作经验年限"
                        onChange={v => this.changeHandle("experience", v)}
                        value={this.state.experience}
                        extra='年'
                    >工作经验</InputItem>
                    <Picker
                        title="选择学历"
                        extra="请选择"
                        cols={1}
                        data={educationals}
                        value={this.state.educational}
                        onChange={v => this.changeHandle("educational", v)}
                    >
                        <List.Item arrow="horizontal">学历</List.Item>
                    </Picker>
                    {/* <InputItem
                        type="text"
                        placeholder="学历"
                        onChange={v => this.changeHandle("educational", v)}
                        value={this.state.educational}
                    >学历</InputItem> */}
                    <InputItem
                        type="text"
                        placeholder="毕业院校"
                        onChange={v => this.changeHandle("school", v)}
                        value={this.state.school}
                    >毕业院校</InputItem>
                    <TextareaItem
                        title="个人优势：" 
                        placeholder="请输入个人优势"
                        rows={6} 
                        autoHeight
                        onChange={v => this.changeHandle("personalAdvantages",v)}
                        value={this.state.personalAdvantages}
                    ></TextareaItem>
                    <TextareaItem
                        title="工作经历："
                        placeholder="请输入工作经历"
                        rows={6}
                        autoHeight
                        onChange={v => this.changeHandle("workExperience", v)}
                        value={this.state.workExperience}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.saveHandle.bind(this)}>保存信息</Button>
                </WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
            </div>
        )
    }
}

export default improveResume