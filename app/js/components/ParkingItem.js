var React = require('react');
var ParkingCell = require('./ParkingCell');
module.exports = React.createClass({
	getInitialState:function() {
	    return {
	          isSelecteds:[],
	          carType:1,
	    };
	},
	componentWillReceiveProps :function(nextProps){
		var isSelecteds = nextProps.parkedTimes;
		var carType = nextProps.carType;
		this.setState({
			isSelecteds:isSelecteds,
			carType:carType
		});
	},
	componentWillMount:function(){
		var isSelecteds = this.props.parkedTimes;
		var carType = this.props.carType;
		this.setState({
			isSelecteds:isSelecteds,
			carType:carType
		});
	},
	componentDidMount:function(){
		this.setIsSelected(this.state.isSelecteds);
	},
	setIsSelected:function(cells){
		
		for(var i=0;i<cells.length;i++){
			$(this.refs.items).find('td').eq(cells[i]-1).addClass('isSelected');
		} 
	},
	empty:function(){},
	mouseMove:function(i,e){
		this.setSelectingCell(e,this.state.carType,i);
	},
	setSelectingCell:function(e,carType,i){
		var $this = this;
		var td = e.target;
		var id = i;
		var cells = $(this.refs.items).find('td');

		cells.removeClass('isSelecting');
		if((id+carType-1)>42){//跨天
			selectState(false);
		}
		else if(this.isOccupy(id,carType)){//占用已预约时间
			selectState(false);
		}
		else{//可以
			selectState(true);
		}
		function selectState(canSelect){
			if(canSelect){
				for(var i=0;i<carType;i++){
					cells.eq(id+i-1).addClass('isSelecting');
				}
			}
			else{
				for(var i=0;i<carType;i++){
					cells.eq(id+i-1).addClass('isBanSelect');
				}
			}
		}
	},
	isOccupy:function(id,carType){
		for(var i=0;i<carType;i++){
			var newId = i+id;
			if(this.isOneOfArray(newId,this.state.isSelecteds)){
				return true;
				break;
			}
		}
	},
	mouseLeave:function(e){
		var td = e.target;
		$(this.refs.items).find('td').removeClass('isSelecting isBanSelect');
	},
	mouseClick:function(i,e){
		e.stopPropagation();
		var td = e.target;
		var id = i;
		var carType = this.state.carType;
		if((id+carType-1)>42){//跨天
			alert('跨天');
		}
		else if(this.isOccupy(id,carType)){//占用已预约时间
			alert('该时段已经被预约。');
		}
		else{//可以
			var newOrder={};
			newOrder.date = this.props.nowOrder.date;
			newOrder.parkingSpaceId = this.props.parkingSpaceId;
			newOrder.linkMan = this.props.nowOrder.linkMan;
			newOrder.linkNum = this.props.nowOrder.linkNum;
			newOrder.carNum = this.props.nowOrder.carNum;
			newOrder.carTypeId = this.props.nowOrder.carTypeId;
			newOrder.parkedTimes = [];
			for(var i=0;i<carType;i++){
				newOrder.parkedTimes.push(id+i);
			}
			var r=confirm("确定预约此段时间吗？(时间："+newOrder.date+"车位："+newOrder.parkingSpaceId+"时间段："+newOrder.parkedTimes);
			if (r==true)
			{
			  console.log("You pressed OK!",newOrder)
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

	},
	isOneOfArray:function(i,array){
		for(var x=0;x<array.length;x++){
			if(array[x]==i){
				return true;
				break;
			}
		}
	},
	render:function(){
		var cells = [];
		for(var i=1;i<43;i++){
			cells.push(i);
		}
		return (
			<tr ref="items">
				<th>车位{this.props.parkingSpaceId}</th>
				{
					cells.map(function(item,i){
						if(this.isOneOfArray((i+1),this.state.isSelecteds)){
							return (<ParkingCell key={i}/>);
						}
						else{
							return (<ParkingCell key={i} onClick={this.mouseClick.bind(this,i+1)} onMouseMove={this.mouseMove.bind(this,i+1)} onMouseLeave={this.mouseLeave} />);
						}	
					},this)
				}
			</tr>
			)
	}
})