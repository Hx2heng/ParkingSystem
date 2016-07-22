var React = require('react');
var ParkingItem = require('./ParkingItem');

module.exports = React.createClass({

	render:function(){
		//申请单
		var nowOrder=this.props.nowOrder;
		//是否显示
		var styleObj ={
			display:this.props.isShow?'block':'none',
		}
		//日期显示
		function addDate(date,days){ 
		      var d=new Date(date); 
		      d.setDate(d.getDate()+days); 
		      var m=d.getMonth()+1; 
		      return d.getFullYear()+'/'+m+'/'+d.getDate(); 
		    } 
		var nextDay = addDate(nowOrder.date,1);


		console.log('table:',nowOrder);
		var carList = [];
		if(nowOrder.parkingSpaces){
			for(var i=0;i<nowOrder.parkingSpaces.length;i++){
				var item = <ParkingItem key={i} parkingSpaceId={nowOrder.parkingSpaces[i].parkingSpaceId} parkedTimes={nowOrder.parkingSpaces[i].parkedTimes} carType={nowOrder.carType} nowOrder={nowOrder}/>
				carList.push(item);
			}
		}

		//console.log(styleObj.display);
		return (
			<div className = "row"  style={styleObj}>
				<div className="col-md-12 col-sm-12 parking-table">
					<div className="table-responsive" >
					  <table className="table table-bordered" id="parkingTable">
					  	<thead>
					  		<tr>
					    		<th colSpan="17">预约日期：{nowOrder.date}</th>
					    		<th colSpan="2">{nextDay}</th>
					    	</tr>
				    	</thead>
					  	<tbody>
					  		<tr>
								<th>{this.props.carType}</th>
								<th>8:00</th>
								<th>9:00</th>
								<th>10:00</th>
								<th>11:00</th>
								<th>12:00</th>
								<th>14:00</th>
								<th>15:00</th>
								<th>16:00</th>
								<th>17:00</th>
								<th>18:00</th>
								<th>19:00</th>
								<th>20:00</th>
								<th>21:00</th>
								<th>22:00</th>
								<th>23:00</th>
								<th>00:00</th>
								<th>01:00</th>
								<th>02:00</th>
					  		</tr>

					    	{carList}
				    	</tbody>
					  </table>
					</div>
				</div>
			</div>

			)
	}
})