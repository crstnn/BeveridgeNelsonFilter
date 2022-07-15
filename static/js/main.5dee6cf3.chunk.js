(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,a){e.exports=a(141)},125:function(e,t,a){},141:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(43),i=a.n(l),o=(a(125),a(69),a(35)),c=a.n(o),s=a(50),u=a(60),d=a(4),m=a(17),p=a(23),h=a(20),g=a(18),f=a(19),b=a(213),v=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),a.props.nextStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"You will be guided through the steps to perform trend-cycle decomposition on either:"),r.a.createElement("ol",null,r.a.createElement("li",null,"A time series from the Federal Reserve Economic Database (FRED) using its mnemonic, or"),r.a.createElement("li",null,"A time series of your choosing, to be pasted into a field")),r.a.createElement("p",null,"Note that there is additional information provided when hovering over the options in the subsequent pages. The cycle is reported and can be downloaded as a CSV.")),r.a.createElement(b.a,{variant:"contained",style:y.button,onClick:this.continue},"Continue"),r.a.createElement("br",null))}}]),t}(n.Component),y={button:{margin:"30px 0 100px"}},E=v,C=a(194),D=a(214),x=a(211),F=a(219),j=a(209),w=a(212),S=a(206),k=a(223),O=a(15),I=a(210),R=function(e){return e.map(function(e){return r.a.createElement(I.a,{value:e.value},e.text)})},M=a(208),T=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"2px 20%"}},r.a.createElement(M.a,{variant:"filled",severity:"error",onClose:this.props.close},this.props.tagName))}}]),t}(n.Component),N=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(l)))).isDisabled={rollingWindow:function(){return"sm"===a.props.values.demean},delta:function(){return!1}},a.isError=function(e){return void 0!==a.props.errors[e]},a.isErrorDisplaying=function(e){return a.isError(e)&&!a.isDisabled[e]()},a.errorsDisplayedCount=function(){return Object.keys(a.props.errors).map(function(e){return a.isErrorDisplaying(e)}).filter(function(e){return e}).length},a.continue=function(e){e.preventDefault();var t=a.props,n=t.getResults,r=t.getFREDResults,l=t.values,i=t.cancelLoad;console.log("errors",a.errorsDisplayedCount()),0===a.errorsDisplayedCount()?("FRED"===l.dataInputType?r():"USER"===l.dataInputType&&n(),a.props.nextStep()):i()},a.back=function(e){e.preventDefault(),a.props.prevStep()},a.preAnalysisTransformations=function(){var e=a.props,t=e.values,n=e.handlers,l=n.handleChange,i=n.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(C.a,{style:{fontSize:"x-large"}},"Transformations")),r.a.createElement(D.a,{container:!0,direction:"column",justifyContent:"space-evenly",alignItems:"center",spacing:3},r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard"},r.a.createElement(F.a,{label:"Natural Logarithm",title:"Logarithm to the base of Euler's number",control:r.a.createElement(j.a,{size:"small",onChange:i("takeLog"),checked:t.takeLog,disabled:!t.transform})}))),r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(w.a,null,"Differencing Method"),r.a.createElement(S.a,{title:"Differencing method applied",onChange:l("dCode"),defaultValue:t.dCode,disabled:!t.transform},R(O.b.optionField.dCode.option)))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:350}},r.a.createElement(w.a,null,"Computed Percentages"),r.a.createElement(S.a,{title:"Multiple applied",onChange:l("pCode"),defaultValue:t.pCode,disabled:!t.transform},R(O.b.optionField.pCode.option))))))},a.bnFilterParameters=function(){var e=a.props,t=e.values,n=e.handlers,l=n.handleChange,i=n.handleNumberFieldChange,o=n.handleIntegerNumberFieldChange,c=a.props.errors;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"information"},r.a.createElement(C.a,{style:{fontSize:"x-large"}},"Filter Parameters")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(D.a,{container:!0,alignItems:"flex-start",justifyContent:"space-evenly",spacing:3},r.a.createElement(D.a,{item:!0,xs:8},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:300}},r.a.createElement(w.a,null,"Signal-to-Noise Ratio (Delta)"),r.a.createElement(S.a,{label:"Signal-to-Noise Ratio (Delta)",title:0===t.deltaSelect?"Signal-to-Noise Ratio according to user input":1===t.deltaSelect?"Signal-to-Noise Ratio according to benchmark KMW approach":2===t.deltaSelect?"Signal-to-Noise Ratio according to KMW refinement":void 0,onChange:l("deltaSelect"),defaultValue:t.deltaSelect},R(O.b.optionField.deltaSelect.option)))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:170}},r.a.createElement(k.a,{label:0===t.deltaSelect?"Fixed Delta":"Minimum Delta",title:0===t.deltaSelect?"Fixed delta for estimation":"Minimum threshold start point for grid search (with grid increments of 0.0005)",onChange:i("delta"),defaultValue:t.delta,disabled:a.isDisabled.delta(),error:a.isErrorDisplaying("delta"),helperText:a.isErrorDisplaying("delta")?c.delta:"\u200b"}))),r.a.createElement(D.a,{item:!0,xs:8},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:290}},r.a.createElement(w.a,null,"Demeaning"),r.a.createElement(S.a,{label:"Demeaning",title:"sm"===t.demean?"Estimate constant drift":"dm"===t.demean?"Estimate time-varying drift using rolling window":"idm"===t.demean?"Iteratively estimate time-varying drift removing cycle and using rolling window according to KMW refinement":void 0,onChange:l("demean"),defaultValue:t.demean},R(O.b.optionField.iterativeDynamicDemeaning.option)))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:170}},r.a.createElement(k.a,{label:"Rolling Window",title:"Only active when using dynamic demeaning",onChange:o("rollingWindow"),defaultValue:t.rollingWindow,disabled:a.isDisabled.rollingWindow(),error:a.isErrorDisplaying("rollingWindow"),helperText:a.isErrorDisplaying("rollingWindow")?c.rollingWindow:"\u200b"}))))))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},null===this.props.values.loading?r.a.createElement(T,{tagName:"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate (e.g. values of delta are not too small).",close:function(){e.props.handlers.handleChange("loading")({target:{value:!1}})}}):null,this.preAnalysisTransformations(),this.bnFilterParameters()),r.a.createElement(b.a,{variant:"outlined",style:A.button,onClick:this.back},"Back"),r.a.createElement(b.a,{variant:"contained",style:A.button,onClick:this.continue},"Get Trend Decomposition"))}}]),t}(n.Component),A={button:{margin:"0 20px 100px"}},q=N,B=a(216),P=a(226),L=a(225),W=a(224),_=a(205),U=a(102),V=a(203),Y=a(204);var z=function(e){var t=e.date;return r.a.createElement("div",null,r.a.createElement(U.a,{dateAdapter:Y.a},r.a.createElement(V.a,{label:e.label,inputFormat:"dd/MM/yyyy",value:t,minDate:e.minDate,maxDate:e.maxDate,InputProps:{style:{width:220}},onChange:function(t){e.updateDate({target:{value:t}})},disabled:e.isDisabled,renderInput:function(t){return r.a.createElement(k.a,Object.assign({},t,{title:e.title,InputLabelProps:{shrink:!0},inputProps:Object(u.a)({},t.inputProps,{placeholder:"DD/MM/YYYY"})}))}})))},H=function(e,t,a){return e.map(function(e,n){return"lb"===a?e-t[n]:e+t[n]})},K=function(e,t){return e+t[0].toString()+"="+t[1].toString()+"&"},Q=function(e){return e.reduce(K,"?")},G=a(73),J=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(l)))).state={mnemonic:a.props.values.mnemonic,isBadMnemonic:a.props.errors.mnemonic,loading:!1},a.createFilteredFrequencies=function(){var e=O.b.optionField.frequencyFRED.option.filter(function(e){return a.props.values.availableFrequencies.includes(e.value)});return R(e)},a.checkAvailability=function(){var e=Q([["fred_abbr",a.state.mnemonic]]),t=O.a.baseBackendURL+O.a.fredDataSlug+e;a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(t).then(function(e){if(200!==e.status)throw a.setState({isBadMnemonic:!0,loading:!1}),a.props.setErrorMessage("mnemonic","The mnemonic is not available"),new T("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var t=new Date(e.start_date),n=new Date(e.end_date);a.setState({loading:!1,isBadMnemonic:!1}),a.props.deleteErrorMessage("mnemonic"),a.props.handleChange("mnemonic")({target:{value:a.state.mnemonic}}),a.props.handleChange("startDateFRED")({target:{value:t}}),a.props.handleChange("endDateFRED")({target:{value:n}}),a.props.handleChange("minDate")({target:{value:t}}),a.props.handleChange("maxDate")({target:{value:n}}),a.props.handleChange("availableFrequencies")({target:{value:e.available_frequencies}}),a.props.handleChange("frequencyFRED")({target:{value:e.available_frequencies[0]}})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})))},a.mnemonicInput=function(){return r.a.createElement(D.a,{container:!0,direction:"column",sx:{minHeight:100},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0},r.a.createElement(L.a,{row:!0},r.a.createElement(Z,{variant:"outlined",label:"FRED mnemonic",title:"Press enter or click 'check' to check the availability of the mnemonic",color:void 0===a.props.errors.mnemonic&&""!==a.props.values.mnemonic?"success":null,placeholder:"e.g. GDPC1",sx:{width:250},error:void 0!==a.props.errors.mnemonic,onChange:function(e){return a.setState({mnemonic:e.target.value})},onKeyDown:function(e){return 13===e.keyCode?a.checkAvailability(e):null},defaultValue:a.state.mnemonic,InputProps:{endAdornment:a.state.loading?r.a.createElement(G.b,{height:30,width:30,color:"grey"}):null}}),r.a.createElement(X,{onClick:a.checkAvailability,variant:"outlined"},"Check")),r.a.createElement(W.a,null,void 0===a.props.errors.mnemonic&&""===a.props.values.mnemonic?"\u200b":void 0!==a.props.errors.mnemonic?a.props.errors.mnemonic:"The mnemonic is available")))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"Choose a ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://fred.stlouisfed.org/tags/series"},"FRED mnemonic")," and check its availability before continuing.")),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},this.mnemonicInput(),r.a.createElement(C.a,{light:!0,title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Options"),r.a.createElement(D.a,{container:!0,direction:"column",sx:{minHeight:350},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(z,{label:"Start Date",title:"Series' start date (inclusive). Determined by FRED",date:t.startDateFRED,minDate:t.minDate,maxDate:t.maxDate,updateDate:a("startDateFRED")})),r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(z,{label:"End Date",title:"Series' end date (inclusive). Determined by FRED",date:t.endDateFRED,minDate:t.minDate,maxDate:t.maxDate,updateDate:a("endDateFRED")})),r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(w.a,null,"Frequency"),r.a.createElement(S.a,{title:"Time-series frequency (default aggregation method: averaging)",onChange:a("frequencyFRED"),defaultValue:t.frequencyFRED},this.createFilteredFrequencies()))),r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(x.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(F.a,{label:"95% Confidence Intervals",title:"Choose to report 95% confidence intervals in graph and CSV",control:r.a.createElement(j.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})}))))))}}]),t}(n.Component),Z=Object(_.a)({root:{"& fieldset":{borderTopRightRadius:0,borderBottomRightRadius:0}}})(k.a),X=Object(_.a)({root:{borderTopLeftRadius:0,borderBottomLeftRadius:0,backgroundColor:"#ede8e8",borderColor:"#454545",color:"black"}})(b.a),$=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange,n=e.handleCheckboxChange;return r.a.createElement("div",null,r.a.createElement("div",{className:"information"},r.a.createElement("p",null,"Enter or paste in your chosen time series below. Each observation must start on the next line. Pasting a time series from a CSV will achieve the appropriate formatting.")),r.a.createElement(x.a,{variant:"standard",sx:{m:1,minWidth:300,paddingRight:2}},r.a.createElement(k.a,{multiline:!0,rows:16,label:"Time Series (y)",title:"Paste your chosen time series here",onChange:a("unprocessedY"),InputLabelProps:{shrink:!0},placeholder:"e.g."+new Array(100).join(" ")+"101.2"+new Array(100).join(" ")+"104.8"+new Array(100).join(" ")+"102.4"+new Array(100).join(" ")+"...",defaultValue:t.unprocessedY})),r.a.createElement("div",{style:{width:"450px",alignItems:"center",display:"inline-block"}},r.a.createElement(C.a,{light:!0,title:"This option does not make alterations to the data but changes the display of the graph output",style:{fontSize:"large"}},"Display Options"),r.a.createElement(D.a,{container:!0,direction:"column",sx:{minHeight:400,paddingTop:2},justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(z,{label:"Start Date",title:"Series' start date (inclusive). The end date is determined based on frequency",date:t.startDate,updateDate:this.props.handleChange("startDate"),isDisabled:"n"===t.frequency})),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{variant:"standard",sx:{minWidth:220}},r.a.createElement(w.a,null,"Frequency"),r.a.createElement(S.a,{title:"Time-series frequency",onChange:a("frequency"),defaultValue:t.frequency},R(O.b.optionField.frequencyManual.option)))),r.a.createElement(D.a,{item:!0,xs:4},r.a.createElement(x.a,{sx:{marginBottom:3,marginTop:2},variant:"standard"},r.a.createElement(F.a,{label:"95% Confidence Intervals",title:"Choose to display 95% confidence intervals in graph output",control:r.a.createElement(j.a,{size:"small",onChange:n("dispCycleCI"),checked:t.dispCycleCI})}))))))}}]),t}(n.Component),ee=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).toggleDataInputType=function(e){void 0!==a.props.errors.mnemonic&&"FRED"===a.props.valuesUserData.dataInputType&&a.props.deleteErrorMessage("mnemonic"),void 0!==a.props.errors.unprocessedY&&"USER"===a.props.valuesUserData.dataInputType&&a.props.deleteErrorMessage("unprocessedY"),a.props.handleChange("dataInputType")(e)},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.valuesUserData,a=e.errors,n=e.valuesFREDData,l=e.setErrorMessage,i=e.deleteErrorMessage,o=e.handleChange,c=e.handleCheckboxChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},r.a.createElement("div",{className:"information"},r.a.createElement(C.a,{style:{fontSize:"x-large"}},r.a.createElement(B.a,{color:"primary",value:t.dataInputType,exclusive:!0,onChange:this.toggleDataInputType},r.a.createElement(P.a,{value:"FRED"},"FRED Series"),r.a.createElement(P.a,{value:"USER"},"User Series")))),"USER"===t.dataInputType?r.a.createElement($,{handleChange:o,handleCheckboxChange:c,values:t}):"FRED"===t.dataInputType?r.a.createElement(J,{setErrorMessage:l,deleteErrorMessage:i,handleChange:o,handleCheckboxChange:c,values:n,errors:a}):void 0),r.a.createElement(D.a,{container:!0,direction:"column",justifyContent:"space-evenly",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:3},r.a.createElement(b.a,{variant:"outlined",style:te.button,onClick:this.props.prevStep},"Back"),r.a.createElement(b.a,{variant:"contained",style:te.button,onClick:this.props.nextStep},"Continue"))))}}]),t}(n.Component),te={button:{margin:"0 20px 100px"},headingFormControlLabel:{fontSize:"large"}},ae=a(99),ne=a.n(ae),re=a(100),le=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).fileName="BNF_cycle.csv",a.back=function(e){e.preventDefault(),a.props.prevStep()},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"getCSVData",value:function(){var e=this.props.plotPageValues;return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=(t=t.filter(function(e){return void 0!==e})).length,r=t[0].length,l=[],i=0;i<r;i++){for(var o=[],c=0;c<n;c++)o.push(t[c][i]);l.push(o)}return l}(["date"].concat(e.x),["original_y"].concat(e.y),["cycle"].concat(e.cycle),e.dispCycleCI?["conf_int_lower_bound"].concat(e.cycleCILB):void 0,e.dispCycleCI?["conf_int_upper_bound"].concat(e.cycleCIUB):void 0)}},{key:"getPlot",value:function(){var e=this.props.plotPageValues;return console.log(e.x),console.log(e.y),r.a.createElement(ne.a,{layout:{autosize:!0,xaxis:{automargin:!0},yaxis:{automargin:!0,tickangle:"auto"}},data:[{x:e.x,y:e.cycle,type:"scatter",mode:"lines+markers",marker:{color:"blue"},name:"cycle",showlegend:!1},e.dispCycleCI?{x:e.x,y:e.cycleCILB,fill:"tonexty",fillcolor:"rgba(0, 0, 0, 0)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{},e.dispCycleCI?{x:e.x,y:e.cycleCIUB,fill:"tonexty",fillcolor:"rgba(0,100,80,0.2)",line:{color:"transparent"},showlegend:!1,type:"scatter",hoverinfo:"skip"}:{}]})}},{key:"render",value:function(){var e=this.props.plotPageValues;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{minHeight:600}},r.a.createElement("div",null,this.getPlot(),r.a.createElement("p",null," Delta: ",e.deltaCalc.toFixed(4)," ")),r.a.createElement(re.CSVLink,{style:{textDecoration:"underline"},filename:this.fileName,data:this.getCSVData()},"Download as CSV")),r.a.createElement(b.a,{variant:"outlined",style:ie.button,onClick:this.back},"Back"))}}]),t}(n.Component),ie={button:{margin:"0 20px 100px"}},oe=le;var ce=function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",paddingTop:"30vh"}},r.a.createElement(G.a,{height:75,width:75,color:"grey"}))},se=a(32),ue=a(101),de=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){throw new Error("Child class must implement this method")},a.getDateArray=function(e){var t=Object(se.a)(Object(se.a)(a)),n=Object(se.a)(Object(se.a)(a));return Array.from({length:e}).map(function(){return n=t,t=t.nextTimePeriod(),n})},a}return Object(f.a)(t,e),t}(Object(ue.a)(Date));de.createDate=function(e,t){switch(e){case"a":return new ge(t);case"q":return new he(t);case"m":return new pe(t);case"w":return new me(t);default:throw new Error("Non-existent key")}},de.packWithZero=function(e){return 1===e.toString().length?"0"+e:e},de.getTruncatedDate=function(e){return"".concat(e.getFullYear(),"-").concat(de.packWithZero(e.getMonth()+1),"-").concat(de.packWithZero(e.getDate()))};var me=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(se.a)(Object(se.a)(a)));return new t(e.setDate(a.getDate()+7))},a}return Object(f.a)(t,e),t}(de),pe=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(se.a)(Object(se.a)(a)));return new t(e.setMonth(a.getMonth()+1))},a}return Object(f.a)(t,e),t}(de),he=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(se.a)(Object(se.a)(a)));return new t(e.setMonth(a.getMonth()+3))},a}return Object(f.a)(t,e),t}(de),ge=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).nextTimePeriod=function(){var e=new t(Object(se.a)(Object(se.a)(a)));return new t(e.setFullYear(a.getFullYear()+1))},a}return Object(f.a)(t,e),t}(de),fe=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={step:1,dataInputType:"FRED",mnemonic:"",unprocessedY:"",x:[],y:[],delta:O.b.freeText.delta.default,deltaSelect:2,demean:O.b.optionField.iterativeDynamicDemeaning.default,iterativeBackcasting:!0,rollingWindow:O.b.freeText.rollingWindow.default,frequency:O.b.optionField.frequencyManual.default,startDate:null,endDate:null,startDateFRED:null,minDate:null,maxDate:null,endDateFRED:null,availableFrequencies:[],frequencyFRED:O.b.optionField.frequencyFRED.default,transform:!0,dCode:O.b.optionField.dCode.default,pCode:O.b.optionField.pCode.default,takeLog:!1,cycle:[],dispCycleCI:!1,cycleCI:[],deltaCalc:void 0,cycleCILB:[],cycleCIUB:[],loading:!0,errorMessage:{}},a.nextStep=function(){var e=a.state.step;a.setState({step:e+1})},a.prevStep=function(){var e=a.state.step;a.setState({step:e-1})},a.cancelLoading=function(){a.setState({loading:null})},a.handleChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.value))}},a.handleCheckboxChange=function(e){return function(t){a.setState(Object(d.a)({},e,t.target.checked))}},a.setErrorMessage=function(e,t){a.setState({errorMessage:Object(u.a)({},a.state.errorMessage,Object(d.a)({},e,t))})},a.deleteErrorMessage=function(e){var t=Object(u.a)({},a.state);delete t.errorMessage[e],a.setState(t)},a.isEmptyString=function(e,t){return""===e&&(a.setErrorMessage(t,"must not be empty"),!0)},a.isNotANum=function(e,t){return!!isNaN(e)&&(a.setErrorMessage(t,"must be numeric"),!0)},a.isNotAnInt=function(e,t){return e%1!==0&&(a.setErrorMessage(t,"must be an integer"),!0)},a.isExceedsMinMax=function(e,t){return null!==O.b.freeText[t].min&&e<O.b.freeText[t].min?(a.setErrorMessage(t,"must be \u2265 ".concat(O.b.freeText[t].min)),!0):null!==O.b.freeText[t].max&&e>O.b.freeText[t].max&&(a.setErrorMessage(t,"must be \u2264 ".concat(O.b.freeText[t].max)),!0)},a.handleErrorField=function(e){return function(t,n){e&&a.deleteErrorMessage(t),a.setState(Object(d.a)({},t,n))}},a.validateField=function(e,t,n){var r=n.target.value,l=e.reduce(function(e,a){return!!e||(a(r,t)||e)},!1);a.handleErrorField(!l)(t,r)},a.handleNumberFieldChange=function(e){return function(t){a.validateField([a.isEmptyString,a.isNotANum,a.isExceedsMinMax],e,t)}},a.handleIntegerNumberFieldChange=function(e){return function(t){a.validateField([a.isEmptyString,a.isNotAnInt,a.isNotANum,a.isExceedsMinMax],e,t)}},a.bnfParamArr=function(){return[["window",a.state.rollingWindow],["delta_select",a.state.deltaSelect],["delta",a.state.delta],["ib",a.state.iterativeBackcasting],["demean",a.state.demean]].concat([["transform",a.state.transform]].concat(a.state.transform?[["p_code",a.state.pCode],["d_code",a.state.dCode],["take_log",a.state.takeLog]]:[]))},a.getResultsForFREDData=Object(s.a)(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=Q([["fred_abbr",a.state.mnemonic],["freq",a.state.frequencyFRED],["obs_start",de.getTruncatedDate(a.state.startDateFRED)],["obs_end",de.getTruncatedDate(a.state.endDateFRED)]].concat(a.bnfParamArr())),n=O.a.baseBackendURL+O.a.bnfFredDataSlug+t,console.log(n),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(n).then(function(e){if(200!==e.status)throw a.prevStep(),a.cancelLoading(),new T("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var t=e.cycle.map(function(e){return Number(e)}),n=e.ci.map(function(e){return Number(e)}),r=Number(e.delta);a.setState({x:e.dates,y:e.y,cycle:t,cycleCI:n,deltaCalc:r,cycleCILB:H(t,n,"lb"),cycleCIUB:H(t,n,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 4:case"end":return e.stop()}},e)})),a.getResultsForUserSpecifiedData=Object(s.a)(c.a.mark(function e(){var t,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.state.y=a.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm,",").split(",").filter(function(e){return""!==e}),t=Q([["processed_y",a.state.y]].concat(a.bnfParamArr())),n=O.a.baseBackendURL+O.a.bnfUserSpecifiedDataSlug+t,console.log(n),a.setState({loading:!0},Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch(n).then(function(e){if(200!==e.status)throw a.cancelLoading(),new T("bad status");return e}).then(function(e){return e.json()}).then(function(e){console.log("Success:",e);var t=e.cycle.map(function(e){return Number(e)}),n=e.ci.map(function(e){return Number(e)}),r=Number(e.delta);a.setState({x:"n"!==a.state.frequency?de.createDate(a.state.frequency,a.state.startDate).getDateArray(t.length).map(de.getTruncatedDate):Array.from({length:t.length},function(e,t){return t+1}),cycle:t,cycleCI:n,deltaCalc:r,cycleCILB:H(t,n,"lb"),cycleCIUB:H(t,n,"ub"),loading:!1})}).catch(function(e){console.log(e)});case 1:case"end":return e.stop()}},e)})));case 5:case"end":return e.stop()}},e)})),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.unprocessedY,n=t.startDate,l=t.endDate,i=t.frequency,o=t.dataInputType,c=t.dispCycleCI,s=this.state,u=s.startDateFRED,d=s.endDateFRED,m=s.minDate,p=s.maxDate,h=s.mnemonic,g=s.frequencyFRED,f=s.availableFrequencies,b={unprocessedY:a,startDate:n,endDate:l,frequency:i,dataInputType:o,dispCycleCI:c},v={startDateFRED:u,endDateFRED:d,minDate:m,maxDate:p,mnemonic:h,frequencyFRED:g,dataInputType:o,availableFrequencies:f,dispCycleCI:c},y=this.state,C=y.step,D=y.delta,x=y.deltaSelect,F=y.demean,j=y.iterativeBackcasting,w=y.rollingWindow,S=y.transform,k=y.dCode,O=y.pCode,I=y.takeLog,R=y.cycle,M=y.deltaCalc,T=y.errorMessage,N={unprocessedY:a,delta:D,deltaSelect:x,demean:F,iterativeBackcasting:j,rollingWindow:w,transform:S,dCode:k,pCode:O,takeLog:I,loading:y.loading,serverError:y.serverError,dataInputType:o},A={handleChange:this.handleChange,handleNumberFieldChange:this.handleNumberFieldChange,handleIntegerNumberFieldChange:this.handleIntegerNumberFieldChange,handleCheckboxChange:this.handleCheckboxChange,handleErrorField:this.handleErrorField},B=this.state,P={x:B.x,y:B.y,cycle:R,deltaCalc:M,dispCycleCI:c,cycleCILB:B.cycleCILB,cycleCIUB:B.cycleCIUB,frequency:i,startDate:n};return r.a.createElement(r.a.Fragment,null,function(){switch(C){case 2:return r.a.createElement(ee,{nextStep:e.nextStep,prevStep:e.prevStep,setErrorMessage:e.setErrorMessage,deleteErrorMessage:e.deleteErrorMessage,handleChange:e.handleChange,handleCheckboxChange:e.handleCheckboxChange,valuesUserData:b,valuesFREDData:v,errors:T});case 3:return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,{nextStep:e.nextStep,prevStep:e.prevStep,cancelLoad:e.cancelLoading,handlers:A,getResults:e.getResultsForUserSpecifiedData,getFREDResults:e.getResultsForFREDData,values:N,errors:T}));case 4:return r.a.createElement(r.a.Fragment,null,e.state.loading?ce():r.a.createElement(oe,{prevStep:e.prevStep,plotPageValues:P}));default:return r.a.createElement(E,{nextStep:e.nextStep,handleChange:e.handleChange})}}())}}]),t}(n.Component);var be={footer:{fontSize:"small",backgroundColor:"#F7F7F7",borderTop:"1px solid #E7E7E7",textAlign:"center",padding:"10px",marginTop:"10px",position:"fixed",overflowX:"hidden",left:"0",bottom:"0",width:"100%"},feature:{marginTop:"5px",fontSize:"x-small"}},ve=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"appHeader"},"BN Filter Trend-Cycle Decomposition"),r.a.createElement("div",{className:"information welcomeInformation"},r.a.createElement("p",null,"This tool performs trend-cycle decomposition. It is implemented using the Beveridge-Nelson filter method described in ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174"},"Kamber, Morley, and Wong"),".")),r.a.createElement(fe,null)),r.a.createElement("div",{style:be.footer},r.a.createElement("a",{href:"https://sites.google.com/site/guneskamber",rel:"noopener noreferrer",target:"_blank"},"Gunes Kamber"),"\xa0\xa0\xa0\xa0",r.a.createElement("a",{href:"https://sites.google.com/site/jamescmorley",rel:"noopener noreferrer",target:"_blank"},"James Morley"),"\xa0\xa0\xa0\xa0",r.a.createElement("a",{href:"https://sites.google.com/site/benjaminwongshijie",rel:"noopener noreferrer",target:"_blank"},"Benjamin Wong"),r.a.createElement("br",null),r.a.createElement("div",{style:be.feature},r.a.createElement("a",{href:"https://github.com/crstnn",rel:"noopener noreferrer",target:"_blank"},"@cristian"))))},ye=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,228)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ve,null)),document.getElementById("root")),ye()},15:function(e){e.exports={b:{optionField:{frequencyManual:{option:[{value:"w",text:"Weekly"},{value:"m",text:"Monthly"},{value:"q",text:"Quarterly"},{value:"a",text:"Annual"},{value:"n",text:"Undated/Unspecified"}],default:"q"},frequencyFRED:{option:[{value:"d",text:"Daily"},{value:"w",text:"Weekly"},{value:"b",text:"Bi-Weekly"},{value:"m",text:"Monthly"},{value:"q",text:"Quarterly"},{value:"sa",text:"Semiannual"},{value:"a",text:"Annual"}],default:""},iterativeDynamicDemeaning:{option:[{value:"sm",text:"Constant (Static Demeaning)"},{value:"dm",text:"Dynamic Demeaning"},{value:"idm",text:"Iterative Dynamic Demeaning"}],default:"sm"},deltaSelect:{option:[{value:0,text:"Fixed Delta"},{value:1,text:"Maximize Amplitude-to-Noise Ratio"},{value:2,text:"Minimize Stochastic Trend Volatility"}],default:0},dCode:{option:[{value:"nd",text:"No Differencing (Levels)"},{value:"d1",text:"1 Period Difference"},{value:"d4",text:"4 Period Difference (for Quarterly Data)"},{value:"d12",text:"12 Period Difference (for Monthly Data)"}],default:"nd"},pCode:{option:[{value:"np",text:"No Change"},{value:"p1",text:"Multiply by 100"},{value:"p4",text:"Multiply by 400 (Annualized Quarterly Rate)"},{value:"p12",text:"Multiply by 1200 (Annualized Monthly Rate)"}],default:"np"}},freeText:{delta:{default:.01,min:5e-4,max:null},rollingWindow:{default:40,min:26,max:500}}},a:{baseBackendURL:"https://bn-filtering.herokuapp.com",bnfUserSpecifiedDataSlug:"/bnf/user-specified-time-series",bnfFredDataSlug:"/bnf/fred-time-series",fredDataSlug:"/fred-time-series"}}},69:function(e,t,a){}},[[120,1,2]]]);
//# sourceMappingURL=main.5dee6cf3.chunk.js.map