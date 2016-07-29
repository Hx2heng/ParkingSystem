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
			carType:0,
			nowOrder:{},//当前选择日期（天）的车位预定数据
		}
	},
	componentDidMount:function(){
		var $this = this;
		var carTypeList=[
			{id:1,value:1,txt:'大型车'},
			{id:2,value:5,txt:'中形成'},
			{id:3,value:3,txt:'你麻痹'}
		];
		$this.setState({
			carTypeList:carTypeList
		})
		// $.ajax({
		// 	url:'../basics/truckTypeComboFind',
		// 	type:'post',
		// 	data:'',
		// 	success:function(res){
		// 		$this.setState({
		// 			carTypeList:res
		// 		})
		// 	}
		// })
		
	},
	destineBtnClick:function(){
		var form = this.getFormContent();
			
		var isOk = this.checkInputForm(form.carNum,form.linkMan,form.linkNum,form.date,form.carType);
	 
		var $this = this ;
		if(isOk){
			// console.log('加载中');
			//  $.ajax({
			//   	url:'../basics/findCarportSchedule',
			//   	type:'get',
			//   	data:form.date,
			//   	success:function(res){
			//   		var newOrder = res;
			//   		if(!$this.state.isTableShow){
			//   			$this.setState({
			//   				isTableShow:true,
			//   				carType:form.carType,
			//   				nowOrder:newOrder
			//   			});
			//   		}
			//   		else{
			//   			$this.setState({
			//   				carType:form.carType,
			//   				nowOrder:newOrder
			//   			});
			//   		}
			//   		console.log('加载完成');
			//   	}
			//   })
			

			setTimeout(function(){
				var newOrder={
					date:form.date,
					parkingSpaces:[
						{parkingSpaceId:1,parkingType:1,parkedTimes:[2,2,6,7,8,12],banTimes:[9,10]},
						{parkingSpaceId:2,parkingType:2,parkedTimes:[]},
						{parkingSpaceId:3,parkingType:1,parkedTimes:[1,2]},
				 		{parkingSpaceId:4,parkingType:3,parkedTimes:[3,4,8,12,13,14]},
				 		{parkingSpaceId:5,parkingType:2,parkedTimes:[2,6,12,13,17,18]},
					]
				};
				if(!$this.state.isTableShow){
					$this.setState({
						isTableShow:true,
						carType:form.carType,
						nowOrder:newOrder
					});
				}
				else{
					$this.setState({
						carType:form.carType,
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
	getFormContent:function(){
		return {
			carNum : this.refs.inputArea.refs.carNum.value,
			linkMan : this.refs.inputArea.refs.linkMan.value,
			linkNum : this.refs.inputArea.refs.linkNum.value,
			date : this.refs.inputArea.refs.date.value,
			carType : this.refs.inputArea.refs.carType.options[this.refs.inputArea.refs.carType.selectedIndex].value-0,
			carTypeId : this.refs.inputArea.refs.carType.options[this.refs.inputArea.refs.carType.selectedIndex].getAttribute("data-sId")-0,
			carTypeTxt : this.refs.inputArea.refs.carType.options[this.refs.inputArea.refs.carType.selectedIndex].innerHTML

		};
	},
	carTypeChange:function(){
		var carType = this.refs.inputArea.refs.carType.options[this.refs.inputArea.refs.carType.selectedIndex].value-0;
		this.setState({
			carType:carType
		});
	},
	dateChange:function(){
		if(!this.state.isTableShow){
			return
		}
		var date = this.refs.inputArea.refs.date.value;
		var $this = this;
		$.ajax({
		 	url:'../basics/findCarportSchedule',
		 	type:'get',
		 	data:date,
		 	success:function(res){
		 		var newOrder = res;
		 		$this.setState({
					nowOrder:newOrder
				});
		 		console.log('加载完成');
		 	}
		 })
		

		// setTimeout(function(){
		// 		var newOrder={
		// 			date:date,
		// 			parkingSpaces:[
		// 		 		{parkingSpaceId:1,parkedTimes:[2,6,12,13,17,18]},
		// 				{parkingSpaceId:2,parkedTimes:[2,2,6,7,8,12],banTimes:[9,10]},
		// 		 		{parkingSpaceId:3,parkedTimes:[3,4,8,12,13,14]},
		// 				{parkingSpaceId:4,parkedTimes:[]},
		// 				{parkingSpaceId:5,parkedTimes:[1,2]},
		// 			]
		// 		};
		// 		$this.setState({
		// 			nowOrder:newOrder
		// 		});
		// 	},200);

	},
	submit:function(order){
		var  form = this.getFormContent();
		var isOk = this.checkInputForm(form.carNum,form.linkMan,form.linkNum,form.date,form.carType);
		if(isOk){
			var newOrder = order;
			var fTrList = this.refs['table'].refs['firstRow'].getElementsByTagName('th');	
			var beginTimeTh = fTrList[newOrder.parkedTimes[0]];
			var endTimeTh = fTrList[newOrder.parkedTimes[newOrder.parkedTimes.length-1]+1];
			var beginTime = beginTimeTh.innerHTML;
			var endTime = endTimeTh?endTimeTh.innerHTML:'00:00';
			var r=confirm("确定预约此段时间吗？(时间："+newOrder.date+"车位："+newOrder.parkingSpaceId+"时间段："+beginTime+'~'+endTime);
			if (r==true)
			{
				// newOrder.carNum = form.carNum;
				// newOrder.linkMan = form.linkMan;
				// newOrder.linkNum = form.linkNum;
				// newOrder.carTypeId = form.carTypeId;
				
				var res ={"licenseNo":form.carNum,
						  "linkman":form.linkMan,
						  "linkphone":form.linkNum,
						  "carport":newOrder.parkingSpaceId,
						  "resDate":newOrder.date,
						  "beginTime":newOrder.date+' '+beginTime,
						  "endTime":newOrder.date+' '+endTime,
						  "timeCode":newOrder.parkedTimes,
						  "truckTypeId":form.carTypeId,
						  "truckTypeName":form.carTypeTxt,
						};
			    console.log("You pressed OK!",res);
			    append(res);
			  //React.unmountComponentAtNode(  document.getElementById('app') );
			  // $.ajax({
			  // 	url:'',
			  // 	type:'post',
			  // 	data:JSON.stringify(newOrder),
			  // 	success:function(res){
			  // 		alert('成功');
			  // 	}
			  // })
			}
			else
			{
			 console.log("You pressed Cancel!")
			}
		}
		else{
			console.log('请完善表单');
			return;
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
							<InputArea ref="inputArea" destineBtnClick={this.destineBtnClick} carTypeList={this.state.carTypeList} carTypeChange={this.carTypeChange} dateChange = {this.dateChange}/>

							<ParkingTable ref="table" isShow={this.state.isTableShow} nowOrder={this.state.nowOrder} carType={this.state.carType} submit={this.submit}/>
						</form>
					</div>
				</div>
			</div>

			)
	}
});