(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,a){e.exports=a(131)},119:function(e,t,a){},131:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(38),i=a.n(l),c=(a(119),a(58),a(54)),o=a.n(c),s=a(69),d=a(4),u=a(21),m=a(22),p=a(29),h=a(26),f=a(30),g=a(197),y=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"We will guide you through the steps to perform trend-cycle decomposition on either (i) a time series of your choosing to be pasted into a field or (ii) a time series from the Federal Reserve Economic Database (FRED) using its mnemonic. Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV.")),r.a.createElement(g.a,{variant:"contained",style:v.button,onClick:this.continue},"Continue"),r.a.createElement("br",null))}}]),t}(n.Component),v={button:{margin:20}},b=y,E=a(175),C=a(198),S=a(192),x=a(193),w=a(188),k=a(194),D=a(195),j=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){var t=a.props.getResults;e.preventDefault(),t(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement(E.a,{style:{fontSize:"x-large"}},"BN Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block",paddingBottom:"50px"}},r.a.createElement(C.a,{container:!0,alignItems:"center",justifyContent:"space-evenly",spacing:4},r.a.createElement(C.a,{item:!0,xs:8},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(x.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(w.a,{label:"Signal-to-Noise Ratio (Delta)",title:"Signal-to-Noise Ratio according to benchmark KMW approach",onChange:a("deltaSelect"),defaultValue:t.deltaSelect},r.a.createElement(k.a,{value:0},"Fixed Delta"),r.a.createElement(k.a,{value:1},"Maximize Amplitude-to-Noise Ratio"),r.a.createElement(k.a,{value:2},"Minimize Stochastic Trend Volatility")))),r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:50}},r.a.createElement(D.a,{label:"Fixed Delta",title:"Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'",onChange:a("fixedDelta"),defaultValue:t.fixedDelta,disabled:0!==t.deltaSelect}))),r.a.createElement(C.a,{item:!0,xs:7},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:250}},r.a.createElement(x.a,null,"Demeaning"),r.a.createElement(w.a,{label:"Iterative Dynamic Demeaning",onChange:a("demean"),defaultValue:t.demean},r.a.createElement(k.a,{value:"sm"},"Constant (Static Demeaning)"),r.a.createElement(k.a,{value:"dm"},"Dynamic Demeaning"),r.a.createElement(k.a,{value:"idm"},"Iterative Dynamic Demeaning")))),r.a.createElement(C.a,{item:!0,xs:5},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:100}},r.a.createElement(D.a,{label:"Rolling Window",type:"number",title:"Only necessary when the demeaning method is dynamic. Must be an integer",onChange:a("window"),defaultValue:t.window,disabled:t.isAutomaticWindow||"sm"===t.demean}))))),r.a.createElement("br",null),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.continue},"Get Trend Decomposition"),r.a.createElement("br",null))}}]),t}(n.Component),I={button:{margin:20}},O=j,B=a(207),F=a(190),L=a(205),N=a(12),A=a(184),P=a(186),T=a(187);var V=function(e){var t=r.a.useState(new Date("2014-08-18T21:11:54")),a=Object(N.a)(t,2),n=a[0],l=a[1];return r.a.createElement("div",null,r.a.createElement(A.b,{dateAdapter:T.a},r.a.createElement(P.a,{label:"Time Series Start Date",inputFormat:"dd/MM/yyyy",value:n,InputProps:{style:{width:220}},onChange:function(e){l(e)},disabled:e.isDisabled,renderInput:function(e){return r.a.createElement(D.a,e)}})))},R=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange,l=e.getState;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(E.a,{style:{fontSize:"x-large"}},"Data and Transformations"),r.a.createElement("p",null,"Enter or paste in your chosen time series below.",r.a.createElement("br",null),"Each line must contain a numerical value. The next observation must start on the next line (and so on). For example, pasting a time series from a CSV will achieve the appropriate formatting.")),r.a.createElement("div",null,r.a.createElement(S.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(D.a,{multiline:!0,rows:20,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),InputLabelProps:{shrink:!0},placeholder:"e.g."+new Array(100).join(" ")+"101.2"+new Array(100).join(" ")+"104.8"+new Array(100).join(" ")+"102.4"+new Array(100).join(" ")+"...",defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(E.a,{light:!0,title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Display Options"),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:250,paddingTop:4},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(V,{isDisabled:0===l("periodicity")})),r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(x.a,null,"Data Frequency"),r.a.createElement(w.a,{title:"Time-series frequency",onChange:a("periodicity"),defaultValue:t.periodicity},r.a.createElement(k.a,{value:"y"},"Yearly"),r.a.createElement(k.a,{value:"q"},"Quarterly"),r.a.createElement(k.a,{value:"m"},"Monthly"),r.a.createElement(k.a,{value:"w"},"Weekly"),r.a.createElement(k.a,{value:0},"Undated/Unspecified")))),r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(S.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(B.a,{label:"95% Confidence Intervals",title:"Choose to display 95% confidence intervals in graph output",control:r.a.createElement(F.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})})))),r.a.createElement(E.a,{light:!0},r.a.createElement(S.a,{variant:"standard"},r.a.createElement(B.a,{label:r.a.createElement(L.a,{style:W.headingFormControlLabel},"Pre-Analysis Transformations"),title:"Transformations are applied in the order below and are done prior to the BN Filter run",control:r.a.createElement(F.a,{onChange:n("transform"),checked:t.transform})}))),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(S.a,{variant:"standard"},r.a.createElement(B.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(F.a,{size:"small",onChange:n("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:330}},r.a.createElement(x.a,null,"Differencing Method"),r.a.createElement(w.a,{title:"Differencing method applied",onChange:a("dCode"),defaultValue:t.dCode,disabled:!t.transform},r.a.createElement(k.a,{value:"nd"},"No Differencing (Levels)"),r.a.createElement(k.a,{value:"d1"},"1 Period Difference"),r.a.createElement(k.a,{value:"d4"},"4 Period Difference (for Quarterly Data)"),r.a.createElement(k.a,{value:"d12"},"12 Period Difference (for Monthly Data)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(S.a,{variant:"standard",sx:{minWidth:330}},r.a.createElement(x.a,null,"Computed Percentages"),r.a.createElement(w.a,{title:"Percentage multiple applied",onChange:a("pCode"),defaultValue:t.pCode,disabled:!t.transform},r.a.createElement(k.a,{value:"np"},"No Change"),r.a.createElement(k.a,{value:"p1"},"Multiply by 100"),r.a.createElement(k.a,{value:"p4"},"Multiply by 400 (Annualized Quarterly Rate)"),r.a.createElement(k.a,{value:"p12"},"Multiply by 1200 (Annualized Monthly Rate)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(g.a,{variant:"contained",style:W.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:W.button,onClick:this.continue},"Continue"))))))}}]),t}(n.Component),W={button:{margin:30},headingFormControlLabel:{fontSize:"large"}},M=R,_=a(103),z=a.n(_),U=a(104),Y=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return K.colsToRows(["cycle"].concat(e.cycle),e.dispCycleCI?["conf_int_lower_bound"].concat(e.cycleCILB):void 0,e.dispCycleCI?["conf_int_upper_bound"].concat(e.cycleCIUB):void 0)}},{key:"getPlot",value:function(){var e=this.props.plotPageValues,t=Array.from({length:e.cycle.length},function(e,t){return t+1});return console.log(this.props),r.a.createElement(z.a,{layout:{autosize:!0},data:[{x:t,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},e.dispCycleCI?{x:t,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{},e.dispCycleCI?{x:t,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{}]})}},{key:"render",value:function(){var e=this.props.plotPageValues;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",null,this.getPlot(),"Delta: ",e.plotPageValues),r.a.createElement(U.CSVLink,{filename:"BNF_cycle.csv",data:this.getCSVData()},"Download as CSV")),r.a.createElement(g.a,{variant:"contained",style:q.button,onClick:this.back},"Back"))}}]),t}(n.Component),q={button:{margin:40}},H=Y,Q=a(107),Z=a(191),J=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,unprocessedY:"",y:[],fixedDelta:.1,deltaSelect:2,demean:"sm",iterativeBackcasting:!0,isAutomaticWindow:!1,window:40,periodicity:"q",dateObj:Object(),transform:!1,dCode:"nd",pCode:"np",takeLog:!1,cycle:[],dispCycleCI:!1,cycleCI:[],deltaCalc:void 0,cycleCILB:[],cycleCIUB:[],loading:!0},a.loading=!0,a.baseBackendURL="https://bn-filtering.herokuapp.com",a.bnfUserSpecifiedDataSlug="/bnf/user-specified-time-series",a.bnfFredDataSlug="/bnf/fred-time-series",a.fredDataSlug="/fred-time-series",a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.handleChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.value))}},a.getState=function(e){return a.state[e]},a.setCycle=function(e){return function(t){a.setState(Object(d.a)({},e,t))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.checked))}},a.getResults=Object(s.a)(o.a.mark(function e(){var n,r,l,i;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),console.log(n),r=function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},l=[["window",a.state.window],["delta_select",a.state.deltaSelect],["fixed_delta",a.state.fixedDelta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean],["processed_y",n]].concat([["transform",a.state.transform]].concat(a.state.transform?[["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]]:[])).reduce(r,"?"),i=a.baseBackendURL+a.userSpecifiedDataSlug+l,console.log(i),a.setState({loading:!0},Object(s.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(i).then(function(e){if(200!==e.status)throw a.setState({loading:null}),new Error("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var n=e.cycle.map(function(e){return Number(e)}),r=e.ci.map(function(e){return Number(e)}),l=Number(e.delta);a.setState({cycle:n,cycleCI:r,deltaCalc:l,cycleCILB:t.confIntZip(n,r,"lb"),cycleCIUB:t.confIntZip(n,r,"ub")})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 7:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.step,a=this.state,n=a.y,l=a.unprocessedY,i=a.fixedDelta,c=a.deltaSelect,o=a.demean,s=a.iterativeBackcasting,d=a.isAutomaticWindow,u=a.window,m=a.periodicity,p=a.dateObj,h=a.transform,f=a.dCode,g=a.pCode,y=a.takeLog,v=a.cycle,E=a.deltaCalc,C=a.dispCycleCI,S=a.cycleCILB,x=a.cycleCIUB,w={y:n,unprocessedY:l,periodicity:m,fixedDelta:i,deltaSelect:c,demean:o,iterativeBackcasting:s,isAutomaticWindow:d,window:u,transform:h,dCode:f,pCode:g,takeLog:y,dispCycleCI:C},k={y:n,cycle:v,deltaCalc:E,dispCycleCI:C,cycleCILB:S,cycleCIUB:x,periodicity:m,dateObj:p};return r.a.createElement(r.a.Fragment,null,function(){switch(t){case 2:return r.a.createElement(M,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getState:e.getState,values:w});case 3:return r.a.createElement(r.a.Fragment,null,function(){if(null===e.state.loading)return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(Z.a,{variant:"filled",severity:"error",onClose:function(){e.setState({loading:!1})}},"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."))}(),r.a.createElement(O,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getResults:e.getResults,values:w}));case 4:return r.a.createElement(r.a.Fragment,null,!0===e.state.loading?r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(Q.a,{height:75,width:75,color:"grey"})):!1===e.state.loading?r.a.createElement(H,{prevStep:e.prevStep,handleChange:e.handleChange,plotPageValues:k}):void e.prevStep());default:return r.a.createElement(b,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);J.confIntZip=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},J.colsToRows=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=(t=t.filter(function(e){return void 0!==e})).length,r=t[0].length,l=[],i=0;i<r;i++){for(var c=[],o=0;o<n;o++)c.push(t[o][i]);l.push(c)}return l};var K=J;var G=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),". Please note that this website is still in development so some features are yet to be implemented/completed.")),r.a.createElement(K,null))},X=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,185)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),X()},58:function(e,t,a){}},[[114,3,2]]]);
//# sourceMappingURL=main.3e04cd94.chunk.js.map