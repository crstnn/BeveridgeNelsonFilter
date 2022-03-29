(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,a){e.exports=a(132)},120:function(e,t,a){},132:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(38),i=a.n(l),c=(a(120),a(58),a(53)),o=a.n(c),s=a(69),u=a(5),d=a(21),m=a(22),p=a(29),h=a(26),f=a(30),g=a(198),y=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"We will guide you through the steps to perform trend-cycle decomposition on either (i) a time series of your choosing to be pasted into a field or (ii) a time series from the Federal Reserve Economic Database (FRED) using its mnemonic. Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV."),r.a.createElement("p",null,"Choose the source of the time series you would like to proceed with:")),r.a.createElement(g.a,{variant:"contained",style:v.button,onClick:this.continue},"Proceed with my own time series"),r.a.createElement("br",null))}}]),t}(n.Component),v={button:{margin:20}},E=y,b=a(176),C=a(199),x=a(193),k=a(194),S=a(189),w=a(195),D=a(196),j=a(206),O=a(192),B=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){var t=a.props.getResults;e.preventDefault(),t(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement(b.a,{style:{fontSize:"x-large"}},"BN Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block",paddingBottom:"50px"}},r.a.createElement(C.a,{container:!0,alignItems:"center",justifyContent:"space-evenly",spacing:4},r.a.createElement(C.a,{item:!0,xs:8},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(k.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(S.a,{label:"Signal-to-Noise Ratio (Delta)",title:"Signal-to-Noise Ratio according to benchmark KMW approach",onChange:a("deltaSelect"),defaultValue:t.deltaSelect},r.a.createElement(w.a,{value:0},"Fixed Delta"),r.a.createElement(w.a,{value:1},"Maximize Amplitude-to-Noise Ratio"),r.a.createElement(w.a,{value:2},"Minimize Stochastic Trend Volatility")))),r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:50}},r.a.createElement(D.a,{label:"Fixed Delta",type:"number",title:"Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'",onChange:a("fixedDelta"),defaultValue:t.fixedDelta,disabled:0!==t.deltaSelect}))),r.a.createElement(C.a,{item:!0,xs:7},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:250}},r.a.createElement(k.a,null,"Iterative Dynamic Demeaning"),r.a.createElement(S.a,{label:"Iterative Dynamic Demeaning",onChange:a("demean"),defaultValue:t.demean},r.a.createElement(w.a,{value:"sm"},"Static Demeaning"),r.a.createElement(w.a,{value:"dm"},"Dynamic Demeaning")))),r.a.createElement(C.a,{item:!0,xs:5},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:100}},r.a.createElement(D.a,{label:"Manual Rolling Window",type:"number",title:"Only necessary when the rolling window is not set to automatic. Must be an integer",onChange:a("window"),defaultValue:t.window,disabled:t.isAutomaticWindow||"sm"===t.demean}))),r.a.createElement(C.a,{item:!0,xs:12},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:450}},r.a.createElement(j.a,{label:"Iterative Backcasting",title:"When unselected backcasting is based on unconditional mean\r (original KMW approach)",control:r.a.createElement(O.a,{onChange:n("iterativeBackcasting"),checked:t.iterativeBackcasting})}))))),r.a.createElement("br",null),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.continue},"Get Trend Decomposition"),r.a.createElement("br",null))}}]),t}(n.Component),I={button:{margin:20}},F=B,L=a(207),N=a(12),T=a(185),W=a(187),R=a(188);var A=function(e){var t=r.a.useState(new Date("2014-08-18T21:11:54")),a=Object(N.a)(t,2),n=a[0],l=a[1];return r.a.createElement("div",null,r.a.createElement(T.b,{dateAdapter:R.a},r.a.createElement(W.a,{label:"Time Series Start Date",inputFormat:"dd/MM/yyyy",value:n,onChange:function(e){l(e)},disabled:e.isDisabled,renderInput:function(e){return r.a.createElement(D.a,e)}})))},M=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange,l=e.getState;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(b.a,{style:{fontSize:"x-large"}},"Time Series Input and Transformations"),r.a.createElement("p",null,"Enter or paste in your chosen time series below.",r.a.createElement("br",null),"Each line must contain a numerical value. The next observation must start on the next line (and so on). For example, pasting a time series from a CSV will achieve the appropriate formatting.")),r.a.createElement("div",null,r.a.createElement(x.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(D.a,{multiline:!0,rows:20,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),placeholder:"e.g.\r\n101.2\r\n104.8\r\n102.4\r\n...",defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(b.a,{light:!0,title:"This option does not make alterations to the data but changes the display on the x-axis",style:{fontSize:"large"}},"X-Axis Display"),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:200},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(k.a,null,"Data Frequency"),r.a.createElement(S.a,{title:"Time-series frequency",onChange:a("periodicity"),defaultValue:t.periodicity},r.a.createElement(w.a,{value:"y"},"Yearly"),r.a.createElement(w.a,{value:"q"},"Quarterly"),r.a.createElement(w.a,{value:"m"},"Monthly"),r.a.createElement(w.a,{value:"f"},"Fortnightly"),r.a.createElement(w.a,{value:"w"},"Weekly"),r.a.createElement(w.a,{value:"d"},"Daily"),r.a.createElement(w.a,{value:"h"},"Hourly"),r.a.createElement(w.a,{value:"m"},"By The Minute"),r.a.createElement(w.a,{value:0},"Undated/Unspecified")))),r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(A,{isDisabled:0===l("periodicity")}))),r.a.createElement(b.a,{light:!0},r.a.createElement(x.a,{variant:"standard"},r.a.createElement(j.a,{label:r.a.createElement(L.a,{style:V.headingFormControlLabel},"Pre-Analysis Transformations"),title:"Transformations are applied in the order below and are done prior to the BN Filter run",control:r.a.createElement(O.a,{onChange:n("transform"),checked:t.transform})}))),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard"},r.a.createElement(j.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(O.a,{size:"small",onChange:n("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:320}},r.a.createElement(k.a,null,"Differencing Method"),r.a.createElement(S.a,{title:"Differencing method applied",onChange:a("dCode"),defaultValue:t.dCode,disabled:!t.transform},r.a.createElement(w.a,{value:"nd"},"No Differencing (Levels)"),r.a.createElement(w.a,{value:"d1"},"1st Difference"),r.a.createElement(w.a,{value:"d4"},"4th Difference (Ideal for Quarterly Data)"),r.a.createElement(w.a,{value:"d12"},"12th Difference (Ideal for Monthly Data)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:320}},r.a.createElement(k.a,null,"Computed Percentages"),r.a.createElement(S.a,{title:"Percentage multiple applied",onChange:a("pCode"),defaultValue:t.pCode,disabled:!t.transform},r.a.createElement(w.a,{value:"np"},"No Change"),r.a.createElement(w.a,{value:"p1"},"Multiply by 100"),r.a.createElement(w.a,{value:"p4"},"Multiply by 400 (Annualised Quarterly Rate)"),r.a.createElement(w.a,{value:"p12"},"Multiply by 1200 (Annualised Monthly Rate)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(g.a,{variant:"contained",style:V.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:V.button,onClick:this.continue},"Continue"))))))}}]),t}(n.Component),V={button:{margin:30},headingFormControlLabel:{fontSize:"large"}},_=M,P=a(104),U=a.n(P),z=a(105),Y=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return J.colsToRows(["cycle"].concat(e.cycle),["conf_int_lower_bound"].concat(e.cycleCILB),["conf_int_upper_bound"].concat(e.cycleCIUB))}},{key:"getPlot",value:function(){var e=this.props.plotPageValues,t=Array.from({length:e.cycle.length},function(e,t){return t+1});return r.a.createElement(U.a,{layout:{autosize:!0},data:[{x:t,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},{x:t,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"},{x:t,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}]})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",null,this.getPlot()),r.a.createElement(z.CSVLink,{filename:"BNF_cycle.csv",data:this.getCSVData()},"Download as CSV")),r.a.createElement(g.a,{variant:"contained",style:q.button,onClick:this.back},"Back"))}}]),t}(n.Component),q={button:{margin:40}},H=Y,K=a(108),Q=a(190),Z=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,unprocessedY:"",y:[],fixedDelta:.1,deltaSelect:2,demean:"sm",iterativeBackcasting:!0,isAutomaticWindow:!1,window:40,periodicity:"q",dateObj:Object(),transform:!1,dCode:"nd",pCode:"np",takeLog:!1,cycle:[],cycleCI:[],cycleCILB:[],cycleCIUB:[],loading:!0},a.loading=!0,a.baseBackendURL="https://bn-filtering.herokuapp.com",a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.handleChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.value))}},a.getState=function(e){return a.state[e]},a.setCycle=function(e){return function(t){a.setState(Object(u.a)({},e,t))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.checked))}},a.getResults=Object(s.a)(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),console.log(n),r=[["window",a.state.window],["delta_select",a.state.deltaSelect],["fixed_delta",a.state.fixedDelta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean],["processed_y",n],["transform",a.state.transform],["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]].reduce(function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},"?"),console.log(a.baseBackendURL+"/user-specified-time-series"+r),a.setState({loading:!0},Object(s.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(a.baseBackendURL+"/user-specified-time-series"+r).then(function(e){if(200!==e.status)throw a.setState({loading:null}),new Error("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e),a.setState({cycle:e.cycle.map(function(e){return Number(e)}),cycleCI:e.ci.map(function(e){return Number(e)})}),a.setState({loading:!1,cycleCILB:t.confIntZip(a.state.cycle,a.state.cycleCI,"lb"),cycleCIUB:t.confIntZip(a.state.cycle,a.state.cycleCI,"ub")})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 5:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.step,a=this.state,n=a.y,l=a.unprocessedY,i=a.fixedDelta,c=a.deltaSelect,o=a.demean,s=a.iterativeBackcasting,u=a.isAutomaticWindow,d=a.window,m=a.periodicity,p=a.dateObj,h=a.transform,f=a.dCode,g=a.pCode,y=a.takeLog,v=a.cycle,b=a.cycleCILB,C=a.cycleCIUB,x={y:n,unprocessedY:l,fixedDelta:i,deltaSelect:c,demean:o,iterativeBackcasting:s,isAutomaticWindow:u,window:d,transform:h,dCode:f,pCode:g,takeLog:y},k={y:n,cycle:v,cycleCILB:b,cycleCIUB:C,periodicity:m,dateObj:p};return r.a.createElement(r.a.Fragment,null,function(){switch(t){case 2:return r.a.createElement(_,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getState:e.getState,values:x});case 3:return r.a.createElement(r.a.Fragment,null,function(){if(null===e.state.loading)return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(Q.a,{variant:"filled",severity:"error",onClose:function(){e.setState({loading:!1})}},"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."))}(),r.a.createElement(F,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getResults:e.getResults,values:x}));case 4:return r.a.createElement(r.a.Fragment,null,!0===e.state.loading?r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(K.a,{height:75,width:75,color:"grey"})):!1===e.state.loading?r.a.createElement(H,{prevStep:e.prevStep,handleChange:e.handleChange,plotPageValues:k}):void e.prevStep());default:return r.a.createElement(E,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);Z.confIntZip=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},Z.colsToRows=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=t.length,r=t[0].length,l=[],i=0;i<r;i++){for(var c=[],o=0;o<n;o++)c.push(t[o][i]);l.push(c)}return l};var J=Z;var G=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),".")),r.a.createElement(J,null))},X=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,186)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),X()},58:function(e,t,a){}},[[115,3,2]]]);
//# sourceMappingURL=main.ee41395e.chunk.js.map