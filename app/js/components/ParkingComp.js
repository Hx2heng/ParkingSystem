var React = require('react');
var InputArea = require('./InputArea.js');
var ParkingTable = require('./ParkingTable.js');
var Check = require('../public/check.js');
module.exports = React.createClass({
	mixins: [ Check ],
	getInitialState:function(){
		return {
			isTableShow:false,
			carTypeList:[],
			nowOrder:{},//当前选择日期（天）的车位预定数据
		}
	},
	componentDidMount:function(){
		var carTypeList=[
			{id:1,value:1,txt:'大型车'},
			{id:2,value:5,txt:'中形成'},
			{id:3,value:3,txt:'你麻痹'}
		];
		this.setState({
			carTypeList:carTypeList
		})
	},
	destineBtnClick:function(){
		var carNum = this.refs.inputArea.refs.carNum.value,
			linkMan = this.refs.inputArea.refs.linkMan.value,
			linkNum = this.refs.inputArea.refs.linkNum.value,
			date = this.refs.inputArea.refs.date.value,
			carTypeIndex = this.refs.inputArea.refs.carType.selectedIndex,
			carType = this.refs.inputArea.refs.carType.options[carTypeIndex].value-0,
			carTypeId = this.refs.inputArea.refs.carType.options[carTypeIndex].getAttribute("data-sId")-0;
			
			console.log(carTypeId);
		var isOk = this.checkInputForm(carNum,linkMan,linkNum,date,carType);
	 
		var $this = this ;
		if(isOk){
			console.log('加载中');
			var data ={
				date:date,
				carNum:carNum,
			};
			 // $.ajax({
			  // 	url:'',
			  // 	type:'post',
			  // 	data:JSON.stringify(data),
			  // 	success:function(res){
			  // 		alert('成功');
			  // 	}
			  // })
			var newOrder={
				carNum:carNum,
				linkMan:linkMan,
				linkNum:linkNum,
				date:date,
				carType:carType,
				carTypeId:carTypeId,
				parkingSpaces:[
					{parkingSpaceId:1,parkedTimes:[2,2,6,7,8,12],banTimes:[9,10]},
					{parkingSpaceId:2,parkedTimes:[]},
					{parkingSpaceId:3,parkedTimes:[1,2]},
		 			{parkingSpaceId:4,parkedTimes:[3,4,8,12,13,14]},
		 			{parkingSpaceId:5,parkedTimes:[2,6,12,13,17,18]},
				]
			};

			setTimeout(function(){
				if(!$this.state.isTableShow){
					$this.setState({
						isTableShow:true,
						carType:carType,
						nowOrder:newOrder
					});
				}
				else{
					$this.setState({
						carType:carType,
						nowOrder:newOrder
					});
				}
				console.log('加载完成');
			},200);
		}
		else{
			console.log('请完善表单');
			$this.setState({
				isTableShow:false,
				carType:0,
				nowOrder:{}
			});
		}
	},
	checkInputForm:function(carNum,linkMan,linkNum,date,carType){
		
		if(!this.carNumCheck(carNum)){
			alert('车牌号格式错误');
			return false
		}
		else if(!carType){
			alert('请选择车类型');
			return false
		}
		else if(!date){
			alert('请选择日期');
			return false
		}
		else if(!this.trim(linkMan)){
			alert('请输入联系人姓名');
			return false
		}else if(!this.phoneNumCheck(linkNum)){
			alert('请输入正确的手机号码');
			return false
		}
		else{
			return true
		}
	},
	render:function(){
		return (
			<div id="parking" className="">
				<div className="row">
					<div className="col-md-12">
						<form className="car-form">
							<InputArea ref="inputArea" destineBtnClick={this.destineBtnClick} carTypeList={this.state.carTypeList}/>

							<ParkingTable isShow={this.state.isTableShow} nowOrder={this.state.nowOrder} />
						</form>
					</div>
				</div>
			</div>

			)
	}
});