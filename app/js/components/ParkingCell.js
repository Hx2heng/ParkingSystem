var React = require('react');

module.exports=React.createClass({
	render:function(){
		return (
			<td onMouseLeave={this.props.mouseLeave} onMouseMove={this.props.mouseMove} onClick={this.props.mouseClick} data-id={this.props.cellId}>
				
			</td>
			)
	}
})