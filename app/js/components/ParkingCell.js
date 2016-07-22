var React = require('react');

module.exports=React.createClass({
	render:function(){
		return (
			<td 
			onMouseMove = {this.props.onMouseMove} 
			onMouseLeave = {this.props.onMouseLeave} 
			onClick = {this.props.onClick}>
			</td>
			)
	}
})