(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,a){e.exports=a(132)},120:function(e,t,a){},132:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(38),i=a.n(l),c=(a(120),a(58),a(53)),o=a.n(c),s=a(69),u=a(5),m=a(21),d=a(22),p=a(29),h=a(26),f=a(30),g=a(198),v=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"We will guide you through the steps to perform trend-cycle composition, on either a time series of your choosing or a country's GDP from the Federal Reserve Economic Database (FRED). Note that there is additional information when hovering over the options in the subsequent pages."),r.a.createElement("p",null,"Choose the source of the time series you would like to proceed with:")),r.a.createElement(g.a,{variant:"contained",style:y.button,onClick:this.continue},"FRED time series"),r.a.createElement(g.a,{variant:"contained",style:y.button,onClick:this.continue},"My own time series"),r.a.createElement("br",null))}}]),t}(n.Component),y={button:{margin:20}},E=v,b=a(176),C=a(199),k=a(193),x=a(194),w=a(189),S=a(195),D=a(196),j=a(206),O=a(192),B=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){var t=a.props.getResults;e.preventDefault(),t(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement(b.a,{style:{fontSize:"x-large"}},"BN Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block",paddingBottom:"50px"}},r.a.createElement(C.a,{container:!0,alignItems:"center",justifyContent:"space-evenly",spacing:4},r.a.createElement(C.a,{item:!0,xs:8},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(x.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(w.a,{label:"Signal-to-Noise Ratio (Delta)",title:"Signal-to-Noise Ratio according to benchmark KMW approach",onChange:a("deltaSelect"),defaultValue:t.deltaSelect},r.a.createElement(S.a,{value:0},"Fixed Delta"),r.a.createElement(S.a,{value:1},"Maximise Amplitude-to-Noise Ratio"),r.a.createElement(S.a,{value:2},"Minimise Trend Shocks")))),r.a.createElement(C.a,{item:!0,xs:4},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:50}},r.a.createElement(D.a,{label:"Fixed Delta",type:"number",title:"Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'",onChange:a("fixedDelta"),defaultValue:t.fixedDelta,disabled:0!==t.deltaSelect}))),r.a.createElement(C.a,{item:!0,xs:12},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:450}},r.a.createElement(x.a,null,"Iterative Dynamic Demeaning"),r.a.createElement(w.a,{label:"Iterative Dynamic Demeaning",onChange:a("demean"),defaultValue:t.demean},r.a.createElement(S.a,{value:"sm"},"Static Demeaning"),r.a.createElement(S.a,{value:"dm"},"Dynamic Demeaning")))),r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:240}},r.a.createElement(j.a,{label:"Automatic Rolling Window or",title:"An algorithm is applied to make this automatic selection",disabled:"sm"===t.demean,control:r.a.createElement(O.a,{onChange:n("isAutomaticWindow"),checked:t.isAutomaticWindow})}))),r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:200}},r.a.createElement(D.a,{label:"Manual Rolling Window",type:"number",title:"Only necessary when the rolling window is not set to automatic. Must be an integer",onChange:a("window"),defaultValue:t.window,disabled:t.isAutomaticWindow||"sm"===t.demean}))),r.a.createElement(C.a,{item:!0,xs:12},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:450}},r.a.createElement(j.a,{label:"Iterative Backcasting",title:"When unselected backcasting is based on unconditional mean\r (original KMW approach)",control:r.a.createElement(O.a,{onChange:n("iterativeBackcasting"),checked:t.iterativeBackcasting})}))))),r.a.createElement("br",null),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:I.button,onClick:this.continue},"Get Trend Decomposition"),r.a.createElement("br",null))}}]),t}(n.Component),I={button:{margin:20}},W=B,F=a(207),L=a(12),A=a(185),N=a(187),R=a(188);var T=function(){var e=r.a.useState(new Date("2014-08-18T21:11:54")),t=Object(L.a)(e,2),a=t[0],n=t[1];return r.a.createElement("div",null,r.a.createElement(A.b,{dateAdapter:R.a},r.a.createElement(N.a,{label:"Time Series Start Date",inputFormat:"dd/MM/yyyy",value:a,onChange:function(e){n(e)},renderInput:function(e){return r.a.createElement(D.a,e)}})))},M=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(b.a,{style:{fontSize:"x-large"}},"Time Series Input and Transformations"),r.a.createElement("p",null,"Paste your chosen time series below.",r.a.createElement("br",null),"Each line must contain a numerical value. The next time-step must start on the next line (and so on). Pasting time series from a CSV will achieve the above.")),r.a.createElement("div",null,r.a.createElement(k.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(D.a,{multiline:!0,rows:20,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(b.a,{light:!0,title:"This option does not make alterations to the data but changes the display on the x-axis",style:{fontSize:"large"}},"X-Axis Display"),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:200},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:150}},r.a.createElement(x.a,null,"Data Frequency"),r.a.createElement(w.a,{title:"Time-series frequency",onChange:a("periodicity"),defaultValue:t.periodicity},r.a.createElement(S.a,{value:0},"Unspecified"),r.a.createElement(S.a,{value:"q"},"Quarterly"),r.a.createElement(S.a,{value:"m"},"Monthly"),r.a.createElement(S.a,{value:"f"},"Fortnightly"),r.a.createElement(S.a,{value:"w"},"Weekly"),r.a.createElement(S.a,{value:"d"},"Daily"),r.a.createElement(S.a,{value:"h"},"Hourly"),r.a.createElement(S.a,{value:"m"},"By The Minute")))),r.a.createElement(C.a,{item:!0,xs:6},r.a.createElement(T,null))),r.a.createElement(b.a,{light:!0},r.a.createElement(k.a,{variant:"standard"},r.a.createElement(j.a,{label:r.a.createElement(F.a,{style:P.headingFormControlLabel},"Pre-Analysis Transformations"),title:"Transformations are applied in the order below and are done prior to the BN Filter run",control:r.a.createElement(O.a,{onChange:n("transform"),checked:t.transform})}))),r.a.createElement(C.a,{container:!0,direction:"column",sx:{minHeight:340},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(k.a,{variant:"standard"},r.a.createElement(j.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(O.a,{size:"small",onChange:n("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:320}},r.a.createElement(x.a,null,"Differencing Method"),r.a.createElement(w.a,{title:"Differencing method applied",onChange:a("dCode"),defaultValue:t.dCode,disabled:!t.transform},r.a.createElement(S.a,{value:"nd"},"No Differencing (Levels)"),r.a.createElement(S.a,{value:"d1"},"1st Difference"),r.a.createElement(S.a,{value:"d4"},"4th Difference (Ideal for Quarterly Data)"),r.a.createElement(S.a,{value:"d12"},"12th Difference (Ideal for Monthly Data)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(k.a,{variant:"standard",sx:{minWidth:320}},r.a.createElement(x.a,null,"Computed Percentages"),r.a.createElement(w.a,{title:"Percentage multiple applied",onChange:a("pCode"),defaultValue:t.pCode,disabled:!t.transform},r.a.createElement(S.a,{value:"np"},"No Change"),r.a.createElement(S.a,{value:"p1"},"Multiply by 100"),r.a.createElement(S.a,{value:"p4"},"Multiply by 400 (Annualised Quarterly Rate)"),r.a.createElement(S.a,{value:"p12"},"Multiply by 1200 (Annualised Monthly Rate)")))),r.a.createElement(C.a,{item:!0,xs:3},r.a.createElement(g.a,{variant:"contained",style:P.button,onClick:this.back},"Back"),r.a.createElement(g.a,{variant:"contained",style:P.button,onClick:this.continue},"Continue"))))))}}]),t}(n.Component),P={button:{margin:30},headingFormControlLabel:{fontSize:"large"}},V=M,_=a(104),U=a.n(_),z=a(105),Y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return G.colsToRows(["cycle"].concat(e.cycle),["conf_int_lower_bound"].concat(e.cycleCILB),["conf_int_upper_bound"].concat(e.cycleCIUB))}},{key:"getPlot",value:function(){var e=this.props.plotPageValues,t=Array.from({length:e.cycle.length},function(e,t){return t+1});return r.a.createElement(U.a,{layout:{autosize:!0},data:[{x:t,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},{x:t,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"},{x:t,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}]})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",null,this.getPlot()),r.a.createElement(z.CSVLink,{filename:"BNF_cycle.csv",data:this.getCSVData()},"Download as CSV")),r.a.createElement(g.a,{variant:"contained",style:q.button,onClick:this.back},"Back"))}}]),t}(n.Component),q={button:{margin:40}},H=Y,K=a(108),Q=a(190),Z=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,unprocessedY:"",y:[],fixedDelta:"",deltaSelect:2,demean:"sm",iterativeBackcasting:!0,isAutomaticWindow:!0,window:"",periodicity:"q",dateObj:Object(),transform:!1,dCode:"nd",pCode:"np",takeLog:!1,cycle:[],cycleCI:[],cycleCILB:[],cycleCIUB:[],loading:!0},a.loading=!0,a.baseBackendURL="https://bn-filtering.herokuapp.com",a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.handleChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.value))}},a.setCycle=function(e){return function(t){a.setState(Object(u.a)({},e,t))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(u.a)({},e,t.target.checked))}},a.getResults=Object(s.a)(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.state.unprocessedY.replace(/(\r\n|\n|\r)/gm,",").split(",").filter(function(e){return""!==e}),console.log(n),r=[["window",a.state.window],["delta_select",a.state.deltaSelect],["fixed_delta",a.state.fixedDelta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean],["processed_y",n],["transform",a.state.transform],["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]].reduce(function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},"?"),console.log(a.baseBackendURL+"/user-specified-time-series"+r),a.setState({loading:!0},Object(s.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(a.baseBackendURL+"/user-specified-time-series"+r).then(function(e){if(200!==e.status)throw a.setState({loading:null}),new Error("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e),a.setState({cycle:e.cycle.map(function(e){return Number(e)}),cycleCI:e.ci.map(function(e){return Number(e)})}),a.setState({loading:!1,cycleCILB:t.confIntZip(a.state.cycle,a.state.cycleCI,"lb"),cycleCIUB:t.confIntZip(a.state.cycle,a.state.cycleCI,"ub")})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 5:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.state.step,a=this.state,n=a.y,l=a.unprocessedY,i=a.fixedDelta,c=a.deltaSelect,o=a.demean,s=a.iterativeBackcasting,u=a.isAutomaticWindow,m=a.window,d=a.periodicity,p=a.dateObj,h=a.transform,f=a.dCode,g=a.pCode,v=a.takeLog,y=a.cycle,b=a.cycleCILB,C=a.cycleCIUB,k={y:n,unprocessedY:l,fixedDelta:i,deltaSelect:c,demean:o,iterativeBackcasting:s,isAutomaticWindow:u,window:m,transform:h,dCode:f,pCode:g,takeLog:v},x={y:n,cycle:y,cycleCILB:b,cycleCIUB:C,periodicity:d,dateObj:p};return r.a.createElement(r.a.Fragment,null,function(){switch(t){case 2:return r.a.createElement(V,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,values:k});case 3:return r.a.createElement(r.a.Fragment,null,function(){if(null===e.state.loading)return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(Q.a,{variant:"filled",severity:"error",onClose:function(){e.setState({loading:!1})}},"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."))}(),r.a.createElement(W,{nextStep:e.nextStep,prevStep:e.prevStep,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,getResults:e.getResults,values:k}));case 4:return r.a.createElement(r.a.Fragment,null,!0===e.state.loading?r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(K.a,{height:75,width:75,color:"grey"})):!1===e.state.loading?r.a.createElement(H,{prevStep:e.prevStep,handleChange:e.handleChange,plotPageValues:x}):void e.prevStep());default:return r.a.createElement(E,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);Z.confIntZip=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},Z.colsToRows=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=t.length,r=t[0].length,l=[],i=0;i<r;i++){for(var c=[],o=0;o<n;o++)c.push(t[o][i]);l.push(c)}return l};var G=Z;var J=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),", which is based on the Beveridge-Nelson filter.")),r.a.createElement(G,null))},X=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,186)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),X()},58:function(e,t,a){}},[[115,3,2]]]);
//# sourceMappingURL=main.a3724e78.chunk.js.map