(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{898:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),s=a(i(4)),n=a(i(27)),r=a(i(96)),l=a(i(23)),h=a(i(852));function a(t){return t&&t.__esModule?t:{default:t}}var p=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.state={isHovered:!1,isPressed:!1},i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"UNSAFE_componentWillReceiveProps",value:function(t){t.isHighlighted!==this.props.isHighlighted&&this.setState({isHovered:!1})}},{key:"componentDidMount",value:function(){if(this.props.invertOnPress){var t=r.default.findDOMNode(this),e=t.offsetWidth;t.style.width=e+"px",t.style.minWidth=e+"px",t.style.maxWidth=e+"px"}}},{key:"shouldComponentUpdate",value:function(t,e){return!(0,h.default)(this.props,t)||!(0,h.default)(this.state,e)}},{key:"onClick",value:function(t){this.props.preventClickThrough&&(t.preventDefault(),t.stopPropagation()),this.props.disabled||(this.props.isHighlighted||this.props.maintainHoverAfterClick||this.setState({isHovered:!1}),void 0!==this.props.clickCallback&&this.props.clickCallback(this))}},{key:"handleMouseEnter",value:function(){this.setState({isHovered:!0}),void 0!==this.props.onMouseInside&&this.props.onMouseInside(this)}},{key:"handleMouseLeave",value:function(t){t.preventDefault(),t.stopPropagation(),t.targetTouches&&this.onClick(),this.props.isHighlighted||this.setState({isHovered:!1})}},{key:"handleMouseDown",value:function(){this.setState({isPressed:!0})}},{key:"handleMouseUp",value:function(){this.setState({isPressed:!1})}},{key:"handleBlurFunction",value:function(){"function"==typeof this.props.onBlurFunction&&this.props.onBlurFunction()}},{key:"render",value:function(){var t=this.props.tooltipText,e={color:this.props.hoveredFontColor,fontWeight:this.props.hoveredFontWeight,opacity:this.props.hoveredFontOpacity+""},i={fontWeight:this.props.highlightedFontWeight,color:this.props.highlightedFontColor?this.props.highlightedFontColor:"",backgroundColor:this.props.activeBackgroundColor?this.props.activeBackgroundColor:""},o=this.props.invertStyle,n={fontWeight:this.props.mouseDownFontWeight,opacity:this.props.unHighLightedFontOpacity.toString()},r={opacity:this.props.disabledOpacity,cursor:"default"},h=Object.assign({},this.props.style,!this.state.isHovered&&!this.props.isHighlighted&&this.props.semiTransparentAsDefaultStyle&&!this.state.isPressed&&!this.props.disabled&&n,this.state.isHovered&&!this.props.disabled&&e,this.props.isHighlighted&&!this.props.disabled&&i,this.state.isPressed&&this.props.invertOnPress&&!this.props.disabled&&o,this.state.isPressed&&!this.props.invertOnPress&&!this.props.disabled&&{opacity:"0.5"},this.props.disabled&&r),a=s.default.Children.map(this.props.children,function(t){if(t&&t.props&&t.props.style&&t.props.style.fontWeight&&this.state.isHovered&&this.props.childHoveredFontWeight){var e=Object.assign({},t.props.style,{fontWeight:this.props.childHoveredFontWeight});return s.default.cloneElement(t,{style:e})}return t}.bind(this)),p=null,d=null;return this.props.childrenLeftOfTitle?p=a:d=a,s.default.createElement("div",{className:"suggestionListItem","data-title":t,tabIndex:"0","data-pagelanguage":l.default.LANGUAGE,id:this.props.id?this.props.id:"uiTextButton","data-cy":this.props.id?this.props.id:"uiTextButton","data-milestonesbuttontitle":this.props.mileStoneTitle,onClick:this.onClick.bind(this),fontFamily:this.props.fontFamily?this.props.fontFamily:"",style:h,onTouchStart:this.handleMouseDown.bind(this),onTouchEnd:this.handleMouseUp.bind(this),onTouchCancel:this.handleMouseUp.bind(this),onMouseEnter:this.handleMouseEnter.bind(this),onMouseLeave:this.handleMouseLeave.bind(this),onMouseUp:this.handleMouseUp.bind(this),onMouseOut:this.handleMouseUp.bind(this),onMouseDown:this.handleMouseDown.bind(this),onBlur:this.handleBlurFunction.bind(this)},p,this.props.title,d)}}]),e}(s.default.Component);e.default=p,p.propTypes={title:n.default.string,disabled:n.default.bool,disabledOpacity:n.default.string,isHighlighted:n.default.bool,semiTransparentAsDefaultStyle:n.default.bool,clickCallback:n.default.func,onMouseInside:n.default.func,hoveredFontWeight:n.default.number,childHoveredFontWeight:n.default.number,hoveredFontOpacity:n.default.number,unHighLightedFontOpacity:n.default.number,invertOnPress:n.default.bool,invertStyle:n.default.object,mouseDownFontWeight:n.default.number,childrenLeftOfTitle:n.default.bool,preventClickThrough:n.default.bool,maintainHoverAfterClick:n.default.bool,mileStoneTitle:n.default.string.isRequired,activeBackgroundColor:n.default.string,onBlurFunction:n.default.func,fontFamily:n.default.string,highlightedFontColor:n.default.string},p.defaultProps={title:"",highlightedFontColor:"",mileStoneTitle:"",disabled:!1,disabledOpacity:"0.5",isHighlighted:!1,semiTransparentAsDefaultStyle:!1,hoveredFontWeight:400,childHoveredFontWeight:700,highlightedFontWeight:700,unHighLightedFontOpacity:.6,hoveredFontOpacity:1,invertOnPress:!1,mouseDownFontWeight:700,childrenLeftOfTitle:!1,preventClickThrough:!0,activeBackgroundColor:"",maintainHoverAfterClick:!1,fontFamily:"",invertStyle:{backgroundColor:"black",borderColor:"black",WebkitFilter:"invert(100%)",filter:"invert(100%)",fontWeight:700},hoveredFontColor:"#ffffff"}}}]);