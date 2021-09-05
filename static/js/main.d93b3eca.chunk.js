(this["webpackJsonprickythedeveloper-website"]=this["webpackJsonprickythedeveloper-website"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var i=n(3),r=n.n(i),o=n(8),s=n.n(o),a=(n(13),n(14),n(4)),c=n(1),u=n(2),h=n(6),l=n(5);function d(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}var p=function(){function t(e,n){Object(c.a)(this,t),this.x=e,this.y=n}return Object(u.a)(t,[{key:"magnitude",get:function(){return d({x:0,y:0},this)}},{key:"normalised",get:function(){var e=this.magnitude;return new t(this.x/e,this.y/e)}},{key:"angle",get:function(){return function(t){if(0===t.x)return t.y>0?Math.PI/2:-Math.PI/2;var e=Math.atan(t.y/t.x);return t.x>0?e:e+(t.y>0?1:-1)*Math.PI}(this)}},{key:"vectorTo",value:function(e){return new t(e.x-this.x,e.y-this.y)}},{key:"scaled",value:function(e){return new t(this.x*e,this.y*e)}},{key:"withMagnitude",value:function(t){return this.normalised.scaled(t)}}],[{key:"sum",value:function(){for(var e={x:0,y:0},n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];for(var o=0,s=i;o<s.length;o++){var a=s[o];e.x+=a.x,e.y+=a.y}return new t(e.x,e.y)}},{key:"zero",value:function(){return new t(0,0)}},{key:"distanceBetween",value:function(t,e){return d(t,e)}}]),t}(),f=6371e3,b=6*Math.pow(10,24),v=n.p+"static/media/rocket.e9629d5d.svg",g=n(0),y={},j=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state=y,i}return Object(u.a)(n,[{key:"render",value:function(){var t=Object(a.a)({backgroundColor:"#7774",borderRadius:10,padding:10},this.props.style);return Object(g.jsxs)("div",{style:t,children:[Object(g.jsx)("div",{children:"Speed: ".concat(this.props.speed)}),Object(g.jsx)("div",{children:"Height: ".concat(this.props.height)}),Object(g.jsx)("div",{children:"x: ".concat(Math.round(this.props.rocketPosition.x))}),Object(g.jsx)("div",{children:"y: ".concat(Math.round(this.props.rocketPosition.y))})]})}}]),n}(r.a.Component),k=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var t=Object(a.a)({width:"".concat(2*this.props.arrowOuterRadius,"px"),height:"".concat(20,"px"),transform:"rotateZ(".concat(180*-this.props.angularPosition/Math.PI,"deg)")},this.props.style),e=this.props.arrowOuterRadius-this.props.arrowInnerRadius,n={width:"".concat(e,"px"),height:"".concat(20,"px"),left:"".concat(this.props.arrowOuterRadius+this.props.arrowInnerRadius,"px"),position:"absolute"};return Object(g.jsx)("div",{style:t,children:Object(g.jsxs)("svg",{style:n,viewBox:"0 0 756 273",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[Object(g.jsx)("title",{children:"arrow"}),Object(g.jsx)("g",{id:"arrow",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",children:Object(g.jsx)("path",{d:"M36.5,135.5 L719.5,135.5 M718.847561,135.5 L532.152439,243.5 M718.847561,135.5 L532.152439,28.5",id:"Combined-Shape",stroke:"#fff",strokeWidth:"50"})})]})})}}]),n}(r.a.Component);function m(t,e){return t+(e-t)*Math.random()}function O(t,e){e.sort((function(t,e){return e-t}));var n=t;return e.forEach((function(t){n=function(t,e){return t.slice(0,e).concat(t.slice(e+1,t.length))}(n,t)})),n}var w=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).particleInterval=void 0,i.state={particleStates:[],particles:[],missingIndices:[]},i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.particleInterval=setInterval(this.rollForward.bind(this),30)}},{key:"componentWillUnmount",value:function(){this.particleInterval&&clearInterval(this.particleInterval)}},{key:"rollForward",value:function(){this.updateMissingIndices(),this.cleanParticleStates(),this.addParticlesStates(),this.updateParticleStates(),this.updateParticles()}},{key:"updateMissingIndices",value:function(){var t=this,e=[];this.state.particleStates.forEach((function(n,i){var r=t.props.config.existenceFunction(n.time),o=1-t.props.config.existenceFunction(n.time+30)/r;Math.random()<o&&e.push(i)})),this.setState({missingIndices:e})}},{key:"cleanParticleStates",value:function(){this.setState((function(t){return{particleStates:O(t.particleStates,t.missingIndices),missingIndices:[]}}))}},{key:"addParticlesStates",value:function(){for(var t=this.props.config.numberOfParticles-this.state.particles.length,e=this.props.config.numberOfParticles*(30/this.props.config.particleDurationEstimate),n=[],i=0;i<Math.min(t,e);i++)n.push({id:Math.random(),position:this.props.config.initialPosition(),time:0});this.setState((function(t){return{particleStates:t.particleStates.concat(n)}}))}},{key:"updateParticleStates",value:function(){var t=this;this.setState((function(e){return{particleStates:e.particleStates.map((function(e){return{id:e.id,position:t.props.config.updatePosition(e.position,30),time:e.time+30}}))}}))}},{key:"findIndexOfParticleState",value:function(t){for(var e=0;e<this.state.particleStates.length;e++)if(this.state.particleStates[e].id===t)return e;throw new Error("Could not find particle state with id ".concat(t))}},{key:"updateParticles",value:function(){var t=this,e=this.state.particleStates.map((function(e){return t.generateParticle(e)}));this.setState({particles:e})}},{key:"generateParticle",value:function(t){var e=this.props.config.generateParticleComponent(t.time);return Object(g.jsx)("div",{style:{position:"absolute",left:t.position.x,top:t.position.y,transform:"translate(-50%, -50%)"},children:e},t.id)}},{key:"render",value:function(){var t=Object(a.a)({},this.props.style);return Object(g.jsx)("div",{style:t,children:this.state.particles})}}]),n}(r.a.Component);var x=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var t=13*(1-this.props.lifecycle),e=function(t){var e=0+255*t;return"rgba(255, ".concat(e,", ").concat(e,")")}(this.props.lifecycle),n=Object(a.a)({width:t,height:t,borderRadius:t/2,backgroundColor:e},this.props.style);return Object(g.jsx)("div",{style:n})}}]),n}(r.a.Component);var S=250,M=function(t,e){return{x:t.x,y:t.y+.6*e}},P=function(t){return{position:"absolute",bottom:12,width:10,transform:"rotateZ(".concat(180*-t/Math.PI,"deg)")}},I=function(t){return(S-t)/S},T=function(t){return Object(g.jsx)(x,{lifecycle:t/S})},F=function(){return{x:10*Math.random(),y:20*Math.random()}},C=function(t){return{numberOfParticles:60*t,particleDurationEstimate:S,existenceFunction:I,generateParticleComponent:T,updatePosition:M,initialPosition:F}},D=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var t,e=Object(a.a)({alignItems:"center",justifyContent:"center",display:"flex",objectFit:"contain"},this.props.style);return Object(g.jsxs)("div",{className:"rocket",style:e,children:[Object(g.jsx)("img",{src:v,style:{maxWidth:"100%",maxHeight:"100%"}}),Object(g.jsx)(j,{speed:Math.round(this.props.rocket.state.velocity.magnitude),height:Math.round((t=this.props.rocket,t.state.position.magnitude-f)),rocketPosition:this.props.rocket.state.position,style:{position:"absolute",width:"120px",top:"50%",left:"100%",transform:"translate(10px, -50%)"}}),Object(g.jsx)(k,{arrowInnerRadius:180,arrowOuterRadius:280,angularPosition:this.props.rocket.state.velocity.angle-this.props.rocket.state.angularPosition+Math.PI/2,style:{position:"absolute"}}),Object(g.jsx)(w,{style:Object(a.a)(Object(a.a)({},P(this.props.rocket.thrustDirection)),{},{left:"15%"}),config:C(this.props.rocket.thrustStrength)}),Object(g.jsx)(w,{style:Object(a.a)(Object(a.a)({},P(this.props.rocket.thrustDirection)),{},{right:"15%"}),config:C(this.props.rocket.thrustStrength)})]})}}]),n}(r.a.Component),R=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={stars:null},i}return Object(u.a)(n,[{key:"render",value:function(){var t=this,e=Object(a.a)({},this.props.style);return Object(g.jsx)("div",{style:e,ref:function(e){if(e&&null===t.state.stars){for(var n=e.clientWidth,i=e.clientHeight,r=[],o=t.props.density*n*i/1e4,s=0;s<o;s++){var a=m(t.props.minSize,t.props.maxSize);r.push(Object(g.jsx)("div",{style:{position:"absolute",top:Math.random()*i,left:Math.random()*n,width:a,height:a,borderRadius:a/2,backgroundColor:"rgba(255, 255, 255, ".concat(m(.3,.7),")")}},s))}t.setState({stars:r})}},children:this.state.stars})}}]),n}(r.a.Component),E={height:0,rocketImageAngle:0};var q,L=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state=E,i}return Object(u.a)(n,[{key:"render",value:function(){t=this.state.height;var t,e={position:"absolute",backgroundColor:"#940",top:"50%",width:"100%",height:"100%",transform:"translate(0, ".concat(175+this.state.height,"px)"),borderTop:"5px solid black"},n={position:"absolute",height:"".concat(350,"px"),top:"50%",left:"50%",transform:"\n\t\t\t\ttranslate(-50%, -50%) \n\t\t\t\trotateZ(".concat(this.state.rocketImageAngle,"deg)\n\t\t\t")};return Object(g.jsxs)("div",{className:"pilot-view",style:{backgroundColor:"red",width:"100%",height:"100%"},children:[Object(g.jsx)(R,{density:.5,minSize:1,maxSize:10,style:{height:"100%",width:"100%"}}),Object(g.jsx)("div",{className:"land",style:e}),Object(g.jsx)(D,{rocket:this.props.rocket,style:n})]})}}],[{key:"getDerivedStateFromProps",value:function(t){return{height:t.rocket.state.position.magnitude-f,rocketImageAngle:180*(-t.rocket.state.angularPosition+t.rocket.state.position.angle)/Math.PI}}}]),n}(r.a.Component),N=6.67408*Math.pow(10,-11),A=function(){function t(){Object(c.a)(this,t),this.bodies=[]}return Object(u.a)(t,[{key:"setBodies",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.bodies=e}},{key:"calculateForces",value:function(){var t=this;return this.bodies.map((function(e,n){for(var i=new p(0,0),r=0;r<t.bodies.length;r++)if(n!==r){var o=t.bodies[r],s=e.state.position.vectorTo(o.state.position),a=N*e.state.mass*o.state.mass/Math.pow(s.magnitude,2),c=s.withMagnitude(a);i=p.sum(i,c)}return i}))}},{key:"rollForward",value:function(t){for(var e=this.calculateForces(),n=0;n<this.bodies.length;n++){for(var i=this.bodies[n],r=i.getNewState(t,p.sum(e[n],i.additionalForce),i.additionalTorque),o=!1,s=0;s<this.bodies.length;s++)if(n!==s){var a=this.bodies[s];if(void 0!==a.boundaryFunction)for(var c=0;c<i.testPoints.length;c++){var u=p.sum(r.position,i.testPoints[c]),h=a.state.position.vectorTo(u);if(a.boundaryFunction(h)){o=!0;break}}}o?i.collisionHandler&&i.collisionHandler():i.state=r}}}]),t}(),z=function(){function t(){Object(c.a)(this,t),this.state={mass:1e3,angularMomentOfInertia:1e3,position:p.zero(),velocity:p.zero(),angularPosition:0,angularVelocity:0},this.canMove=!0,this.testPoints=[],this.collisionHandler=void 0,this.boundaryFunction=void 0}return Object(u.a)(t,[{key:"getNewState",value:function(t,e,n){var i=e.scaled(1/this.state.mass),r=n/this.state.angularMomentOfInertia,o=p.sum(this.state.velocity.scaled(t),i.scaled(.5*Math.pow(t,2))),s=i.scaled(t),a=this.state.angularVelocity*t+.5*r*Math.pow(t,2),c=r*t;return{mass:this.state.mass,angularMomentOfInertia:this.state.angularMomentOfInertia,position:p.sum(this.state.position,o),velocity:p.sum(this.state.velocity,s),angularPosition:this.state.angularPosition+a,angularVelocity:this.state.angularVelocity+c}}}]),t}(),B=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this)).state.mass=b,t.boundaryFunction=function(t){return t.magnitude<f},t.canMove=!1,t}return Object(u.a)(n,[{key:"additionalForce",get:function(){return p.zero()}},{key:"additionalTorque",get:function(){return 0}}]),n}(z),H=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this))._thrustStrength=0,t._thrustDirection=0,t.state.mass=1e3,t.state.angularMomentOfInertia=Math.pow(10,6),t.state.position=new p(0,6371300),t.state.velocity=p.zero(),t.state.angularPosition=Math.PI/2,t.boundaryFunction=function(t){return t.x>-5&&t.x<5&&t.y>-5&&t.y<5},t.testPoints=[new p(-5,-5),new p(-5,5),new p(5,5),new p(5,-5)],t}return Object(u.a)(n,[{key:"additionalForce",get:function(){return this.thrust}},{key:"thrust",get:function(){return this.rocketDirection.scaled(2e4*this.thrustStrength)}},{key:"thrustStrength",get:function(){return this._thrustStrength},set:function(t){if(t<0)throw new Error("thrustStrength cannot be less than 0");if(t>1)throw new Error("thrustStrength cannot be greater than 1");this._thrustStrength=t}},{key:"additionalTorque",get:function(){return 20*this.thrust.magnitude*-Math.sin(this.thrustDirection)}},{key:"thrustDirection",get:function(){return this._thrustDirection},set:function(t){if(t<-Math.PI/2)throw new Error("torqueStrength cannot be less than -pi/2");if(t>Math.PI/2)throw new Error("torqueStrength cannot be greater than pi/2");this._thrustDirection=t}},{key:"rocketDirection",get:function(){var t=Math.cos(this.state.angularPosition),e=Math.sin(this.state.angularPosition);return new p(t,e)}}]),n}(z);!function(t){t[t.up=0]="up",t[t.down=1]="down"}(q||(q={}));var K=function(){function t(){Object(c.a)(this,t),this.keyStates={}}return Object(u.a)(t,[{key:"addKey",value:function(t,e,n,i){var r=this;t in Object.keys(this.keyStates)||(this.keyStates[t]=q.up,document.addEventListener("keydown",(function(n){n.key===t&&(r.keyStates[t]!==q.down?(r.keyStates[t]=q.down,e&&e(n)):i&&i(n))})),document.addEventListener("keyup",(function(e){e.key===t&&r.keyStates[t]!==q.up&&(r.keyStates[t]=q.up,n&&n(e))})))}}]),t}(),W={blue:{xLight:"#A4CCFF",light:"#45A5FF",mediumLight:"#1080FF",medium:"#0900FF",mediumDark:"#0700BD",dark:"#05008F",xDark:"#030056"}},_=W.blue.light,V=W.blue.medium,U={isTouched:!1},Z=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state=U,i}return Object(u.a)(n,[{key:"render",value:function(){var t=this,e=Object(a.a)({borderRadius:10,padding:10,backgroundColor:this.state.isTouched?V:_,margin:"auto",color:"white"},this.props.style);return Object(g.jsx)("div",{style:e,onClick:this.props.onClick,onTouchStart:function(){t.props.onTouchStart&&t.props.onTouchStart(),t.setState({isTouched:!0})},onTouchEnd:function(){t.props.onTouchEnd&&t.props.onTouchEnd(),t.setState({isTouched:!1})},children:this.props.children})}}]),n}(r.a.Component),J={rocketPosition:new p(0,f),simulationIsRunning:!1},G=function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).simulator=void 0,i.simulatorInterval=void 0,i.earth=new B,i.rocket=new H,i.simulator=new A,i.simulator.setBodies(i.rocket,i.earth),i.state=J,i.rocket.collisionHandler=function(){i.rocket.state.velocity.magnitude<10?i.rocket.state.velocity=p.zero():i.rocket.canMove=!1},i.addKeyboardListeners(),i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.setState({simulationIsRunning:!0}),this.simulatorInterval=setInterval((function(){t.state.simulationIsRunning&&(t.simulator.rollForward(.01),t.setState({rocketPosition:t.rocket.state.position}))}),10)}},{key:"componentWillUnmount",value:function(){this.simulatorInterval&&clearInterval(this.simulatorInterval)}},{key:"addKeyboardListeners",value:function(){var t=this,e=new K;e.addKey("ArrowUp",(function(){t.setFullThrust()}),(function(){t.setNoThrust()})),e.addKey("ArrowLeft",(function(){t.setTorqueAnticlockwise()}),(function(){t.setNoTorque()})),e.addKey("ArrowRight",(function(){t.setTorqueClockwise()}),(function(){t.setNoTorque()}))}},{key:"setFullThrust",value:function(){this.rocket.thrustStrength=1}},{key:"setNoThrust",value:function(){this.rocket.thrustStrength=0}},{key:"setTorqueAnticlockwise",value:function(){this.rocket.thrustDirection=-Math.PI/10}},{key:"setTorqueClockwise",value:function(){this.rocket.thrustDirection=Math.PI/10}},{key:"setNoTorque",value:function(){this.rocket.thrustDirection=0}},{key:"resetSimulation",value:function(){this.rocket=new H,this.earth=new B,this.simulator.setBodies(this.rocket,this.earth)}},{key:"pauseSimulation",value:function(){this.setState((function(t){return{simulationIsRunning:!t.simulationIsRunning}}))}},{key:"render",value:function(){var t=this,e={position:"absolute",display:"flex",flexDirection:"row",gap:"10px"};return Object(g.jsxs)("div",{className:"simulator-screen",style:{width:"100%",height:"100%"},children:[Object(g.jsx)(L,{rocket:this.rocket}),Object(g.jsxs)("div",{style:Object(a.a)(Object(a.a)({},e),{top:"10px",left:"10px"}),children:[Object(g.jsx)(Z,{style:{top:0,left:0},onClick:function(){t.resetSimulation()},children:"Reset"}),Object(g.jsx)(Z,{style:{top:0,left:100},onClick:function(){t.pauseSimulation()},children:this.state.simulationIsRunning?"Pause":"Resume"})]}),Object(g.jsxs)("div",{style:Object(a.a)(Object(a.a)({},e),{bottom:"10px",right:"10px"}),children:[Object(g.jsx)(Z,{onTouchStart:this.setTorqueAnticlockwise.bind(this),onTouchEnd:this.setNoTorque.bind(this),children:"Left"}),Object(g.jsx)(Z,{onTouchStart:this.setFullThrust.bind(this),onTouchEnd:this.setNoThrust.bind(this),children:"Thrust"}),Object(g.jsx)(Z,{onTouchStart:this.setTorqueClockwise.bind(this),onTouchEnd:this.setNoTorque.bind(this),children:"Right"})]})]})}}]),n}(r.a.Component);var Q=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)("div",{id:"content",children:Object(g.jsx)(G,{})})})},X=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,o=e.getLCP,s=e.getTTFB;n(t),i(t),r(t),o(t),s(t)}))};s.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(Q,{})}),document.getElementById("root")),X()}},[[16,1,2]]]);
//# sourceMappingURL=main.d93b3eca.chunk.js.map