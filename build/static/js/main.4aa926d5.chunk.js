(this.webpackJsonprainflow_web_app=this.webpackJsonprainflow_web_app||[]).push([[0],{187:function(e,a,t){e.exports=t.p+"static/media/rainflow_logo.7be95e03.png"},205:function(e,a,t){e.exports=t(359)},210:function(e,a,t){},359:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(18),l=t.n(o),c=(t(210),t(11)),i=t(23),s=t(56),u=t(58),m=t(387);function d(){var e=Object(n.useState)({width:"100vw",height:"100vh",latitude:14.5647642,longitude:120.9931652,zoom:4}),a=Object(c.a)(e,2),t=a[0],o=a[1];return r.a.createElement(u.b,Object.assign({mapboxApiAccessToken:"pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg"},t,{onViewportChange:function(e){return o(e)}}))}var p=function(){return r.a.createElement(m.a,null,r.a.createElement(d,null))},g=t(122),E=t.n(g),b=t(176),f=t(35),h=t.n(f),v=t(123),w=t.n(v),O=t(124),j=t.n(O),y=t(193),k=t(401),S=t(390),x=t(177),C=t.n(x),I=t(186),W=t(178),D=t.n(W),N=t(179),P=t.n(N),F=t(185),T=t.n(F),L=function(){var e=Object(n.useState)([]),a=Object(c.a)(e,2),o=a[0],l=a[1],i=Object(n.useState)([]),s=Object(c.a)(i,2),d=s[0],p=s[1],g=Object(n.useState)([]),f=Object(c.a)(g,2),v=f[0],O=f[1],x=Object(n.useState)(!1),W=Object(c.a)(x,2),N=(W[0],W[1]),F=Object(n.useState)(!0),L=Object(c.a)(F,2),R=(L[0],L[1]),q=Object(n.useState)(!1),A=Object(c.a)(q,2),H=A[0],_=A[1],J=Object(n.useState)(!1),Y=Object(c.a)(J,2),B=Y[0],Z=Y[1],z=function(){return Z(!1)},U=function(){return Z(!0)},V=[{dataField:"id",text:"Report ID"},{dataField:"createdAt",text:"Time "},{dataField:"latitude",text:"Latitude"},{dataField:"longitude",text:"Longitude"},{dataField:"rainfall_rate",text:"Rainfall Rate"},{dataField:"flood_depth",text:"Flood Depth"}];Object(n.useEffect)((function(){Q()}),[]);var M={noDataText:"No reports found.",withoutNoDataText:!0},Q=function(){var e=Object(b.a)(E.a.mark((function e(){var a,t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:_(!0),a=localStorage.getItem("userID"),t=localStorage.getItem("token"),h.a.get("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/report/user/".concat(a),{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){_(!1),console.log(e),console.log("Data: "+e.data),l(e.data.active),p(e.data.archive),console.log(!Object.keys(e.data.active).length),Object.keys(e.data).length||R(!0),console.log("Rows: "+JSON.stringify(e.data))}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G={onClick:function(e,a){console.log(a),O(a),$()}},$=function(){N(U)},K=function(){var e,a=C()(v.createdAt).format("DD MMM YYYY (dddd) HH:mm"),n=(v.latitude,v.longitude,"https://rainflow.live/api/uploads/reports/".concat(v.image));D.a.icon({iconUrl:t(278)});e=null!==v.image;var o={width:"22.5vw",height:"25vh",latitude:v.latitude,longitude:v.longitude,zoom:16};return r.a.createElement(k.a,{show:B,onHide:z},r.a.createElement(m.a,null,r.a.createElement(k.a.Header,{closeButton:!0},r.a.createElement(k.a.Title,null,r.a.createElement("div",null,r.a.createElement("h4",null,"Report ID ",v.id)),r.a.createElement("div",null,r.a.createElement("h5",null,a)))),r.a.createElement(k.a.Body,null,r.a.createElement("div",null,r.a.createElement("h6",null,"Location")),r.a.createElement("div",null,r.a.createElement(u.b,Object.assign({mapboxApiAccessToken:"pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg"},o),r.a.createElement(u.a,{latitude:v.latitude,longitude:v.longitude,offsetLeft:-20,offsetTop:-10},r.a.createElement(T.a,{style:{color:"#d50000"}})))),r.a.createElement("div",null,r.a.createElement("h6",null,"Rainfall Amount")," ",v.rainfall_rate),r.a.createElement("div",null,r.a.createElement("h6",null,"Flood Depth"),v.flood_depth),e?r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h6",null,"Image")),r.a.createElement("div",null,r.a.createElement(I.a,{src:n,fluid:!0}))):null),r.a.createElement(k.a.Footer,null,r.a.createElement(S.a,{variant:"secondary",onClick:z},"Close"))))};return r.a.createElement(m.a,{alignItems:"center"},H?r.a.createElement("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},r.a.createElement(P.a,{size:100,color:"#26c6da",loading:H})):r.a.createElement(m.a,null,r.a.createElement(y.a,{component:"h1",variant:"h4"},"Report History"),r.a.createElement(y.a,{component:"h5",variant:"h6"},"Active"),r.a.createElement(w.a,{keyField:"id",data:o,columns:V,pagination:j()(),rowEvents:G,options:M}),r.a.createElement(y.a,{component:"h5",variant:"h6"},"Archived"),r.a.createElement(w.a,{keyField:"id",data:d,columns:V,pagination:j()(),rowEvents:G,options:M})),B?r.a.createElement(K,null):null)},R=t(409),q=t(396),A=t(395),H=t(402),_=t(391),J=t(398),Y=t(403),B=t(36),Z=t.n(B),z=t(394),U=t(397),V=t(408),M=t(405);function Q(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://material-ui.com/"},"RainFLOW")," ",(new Date).getFullYear(),".")}function G(e){return r.a.createElement(M.a,Object.assign({elevation:6,variant:"filled"},e))}var $=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"},form:{width:"100%",marginTop:e.spacing(1),color:"#2196F3"},submit:{margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"}}})),K=function(e,a){var t=$();console.log("Props: "+e);var o=Object(n.useState)(""),l=Object(c.a)(o,2),i=l[0],s=l[1],u=Object(n.useState)(""),d=Object(c.a)(u,2),p=d[0],g=d[1],E=Object(n.useState)(!1),b=Object(c.a)(E,2),f=b[0],v=b[1],w=Object(n.useState)(!1),O=Object(c.a)(w,2),j=O[0],k=O[1],S=Object(n.useState)(!1),x=Object(c.a)(S,2),C=x[0],I=x[1],W=function(e,a){"clickaway"!==a&&(k(!1),I(!1))};return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:t.paper},r.a.createElement(R.a,{className:t.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Login"),r.a.createElement("form",{className:t.form,noValidate:!0},r.a.createElement(H.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0,onInput:function(e){return s(e.target.value)}}),r.a.createElement(H.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onInput:function(e){return g(e.target.value)}}),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,onClick:function(a){v(!0),a.preventDefault(),console.log("Username:",i,"Password: ",p),console.log(JSON.stringify({username:i,password:p})),h.a.post("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/users/login",{username:i,password:p}).then((function(a){console.log(a),v(!1),200===a.status&&(console.log("userID: "+a.data.data.userID),console.log("token: "+a.data.data.token),localStorage.setItem("userID",a.data.data.userID),localStorage.setItem("token",a.data.data.token),localStorage.setItem("username",a.data.data.username),e.handleLoggedIn(),e.history.push("/"))}),(function(e){v(!1),k(!0),console.log(e),console.log("Error Status Code: "+e)}))}},f?r.a.createElement(U.a,null):"Log In"),r.a.createElement(J.a,{container:!0},r.a.createElement(J.a,{item:!0,xs:!0},r.a.createElement(_.a,{href:"/forgot-password",variant:"body2"},"Forgot password?")),r.a.createElement(J.a,{item:!0},r.a.createElement(_.a,{href:"#",variant:"body2"},"Don't have an account? Sign Up"))))),r.a.createElement(Y.a,{mt:8},r.a.createElement(Q,null)),r.a.createElement(V.a,{open:j,autoHideDuration:6e3,onClose:W},r.a.createElement(G,{onClose:W,severity:"warning"},"Unable to log in using provided credentials.")),r.a.createElement(V.a,{open:C,autoHideDuration:6e3,onClose:W},r.a.createElement(G,{onClose:W,severity:"warning"},"Error!")))},X=t(399),ee=t(406);function ae(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://rainflow.live/"},"RainFLOW Network")," ",(new Date).getFullYear(),".")}var te=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}})),ne=function(){var e=te();return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(R.a,{className:e.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Sign up"),r.a.createElement("form",{className:e.form,noValidate:!0},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:12,sm:6},r.a.createElement(H.a,{autoComplete:"fname",name:"firstName",variant:"outlined",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0})),r.a.createElement(J.a,{item:!0,xs:12,sm:6},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"lname"})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email"})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(X.a,{control:r.a.createElement(ee.a,{value:"allowExtraEmails",color:"primary"}),label:"I want to receive inspiration, marketing promotions and updates via email."}))),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Sign Up"),r.a.createElement(J.a,{container:!0,justify:"flex-end"},r.a.createElement(J.a,{item:!0},r.a.createElement(_.a,{href:"#",variant:"body2"},"Already have an account? Sign in"))))),r.a.createElement(Y.a,{mt:5},r.a.createElement(ae,null)))},re=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Hello! About Test!"))};function oe(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://rainflow.live/"},"RainFLOW Network")," ",(new Date).getFullYear(),".")}function le(e){return r.a.createElement(M.a,Object.assign({elevation:6,variant:"filled"},e))}var ce=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),background:"linear-gradient(45deg, #00838f 30%, #4db6ac 90%)"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #00838f 30%, #4db6ac 90%)"}}})),ie=function(e){var a=ce(),t=Object(n.useState)(""),o=Object(c.a)(t,2),l=o[0],i=o[1],s=Object(n.useState)(""),u=Object(c.a)(s,2),d=u[0],p=u[1],g=Object(n.useState)(),E=Object(c.a)(g,2),b=E[0],f=E[1],v=Object(n.useState)(),w=Object(c.a)(v,2),O=w[0],j=w[1],k=Object(n.useState)(!1),S=Object(c.a)(k,2),x=S[0],C=S[1],I=Object(n.useState)(!1),W=Object(c.a)(I,2),D=W[0],N=W[1],P=Object(n.useState)(!1),F=Object(c.a)(P,2),T=F[0],L=F[1],_=Object(n.useState)(""),B=Object(c.a)(_,2),z=B[0],M=B[1],Q=Object(n.useState)(!1),G=Object(c.a)(Q,2),$=G[0],K=G[1],X=function(e,a){"clickaway"!==a&&(N(!1),L(!1),M(""))};return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(R.a,{className:a.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Reset Password"),r.a.createElement("form",{className:a.form,noValidate:!0},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"token",label:"token",name:"token",autoComplete:"off",onInput:function(e){return i(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,label:"Email Address",onInput:function(e){return p(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"password",label:"Password",name:"password",type:"password",autoComplete:"password",error:x,onInput:function(e){return f(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password1",label:"Enter Password Again",type:"password",id:"password1",autoComplete:"current-password1",error:x,onInput:function(e){j(e.target.value),console.log("Password: "+b+" Password1: "+e.target.value),e.target.value!==b?C(!0):C(!1)}}))),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,onClick:function(a){K(!0),a.preventDefault(),b!==O?(K(!1),L(!0),M("Passwords do not match!")):(console.log("email:",d,"Password: ",b,"Token: ",l),h.a.post("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/users/reset-password",{token:l,email:d,password:b}).then((function(a){console.log(a),K(!1),200===a.status&&(N(!0),e.history.push("/login"))}),(function(e){K(!1),M(e),L(!0),console.log(e),console.log("Error Status Code: "+e)})))}},$?r.a.createElement(U.a,null):"Reset Password")),r.a.createElement(V.a,{open:D,autoHideDuration:6e3,onClose:X},r.a.createElement(le,{onClose:X,severity:"success"},"Password has been succesfully reset! Please login using your new password.")),r.a.createElement(V.a,{open:T,autoHideDuration:6e3,onClose:X},r.a.createElement(le,{onClose:X,severity:"error"},z))),r.a.createElement(Y.a,{mt:5},r.a.createElement(oe,null)))};function se(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://rainflow.live/"},"RainFLOW Network")," ",(new Date).getFullYear(),".")}function ue(e){return r.a.createElement(M.a,Object.assign({elevation:6,variant:"filled"},e))}var me=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),background:"linear-gradient(45deg, #00838f 30%, #4db6ac 90%)"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #00838f 30%, #4db6ac 90%)"}}})),de=function(e){var a=Object(i.g)(),t=a.token_params,o=a.email_params,l=me(),s=Object(n.useState)(decodeURIComponent(t)),u=Object(c.a)(s,2),d=u[0],p=(u[1],Object(n.useState)(o)),g=Object(c.a)(p,2),E=g[0],b=(g[1],Object(n.useState)(!0)),f=Object(c.a)(b,2),v=f[0],w=(f[1],Object(n.useState)(!0)),O=Object(c.a)(w,2),j=O[0],k=(O[1],Object(n.useState)()),S=Object(c.a)(k,2),x=S[0],C=S[1],I=Object(n.useState)(),W=Object(c.a)(I,2),D=W[0],N=W[1],P=Object(n.useState)(!1),F=Object(c.a)(P,2),T=F[0],L=F[1],_=Object(n.useState)(!1),B=Object(c.a)(_,2),z=B[0],M=B[1],Q=Object(n.useState)(!1),G=Object(c.a)(Q,2),$=G[0],K=G[1],X=Object(n.useState)(""),ee=Object(c.a)(X,2),ae=ee[0],te=ee[1],ne=Object(n.useState)(!1),re=Object(c.a)(ne,2),oe=re[0],le=re[1],ce=function(e,a){"clickaway"!==a&&(M(!1),K(!1),te(""))};return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:l.paper},r.a.createElement(R.a,{className:l.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Reset Password"),r.a.createElement("form",{className:l.form,noValidate:!0},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"token",label:"token",name:"token",autoComplete:"off",disabled:v,defaultValue:d})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,label:"Email Address",disabled:j,defaultValue:E})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"password",label:"Password",name:"password",type:"password",autoComplete:"password",error:T,onInput:function(e){return C(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password1",label:"Enter Password Again",type:"password",id:"password1",autoComplete:"current-password1",error:T,onInput:function(e){N(e.target.value),console.log("Password: "+x+" Password1: "+e.target.value),e.target.value!==x?L(!0):L(!1)}}))),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:l.submit,onClick:function(a){le(!0),a.preventDefault(),x!==D?(le(!1),K(!0),te("Passwords do not match!")):(console.log("email:",E,"Password: ",x,"Token: ",d),h.a.post("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/users/reset-password",{token:d,email:E,password:x}).then((function(a){console.log(a),le(!1),200===a.status&&(M(!0),e.history.push("/login"))}),(function(e){le(!1),te(e),K(!0),console.log(e),console.log("Error Status Code: "+e)})))}},oe?r.a.createElement(U.a,null):"Reset Password")),r.a.createElement(V.a,{open:z,autoHideDuration:6e3,onClose:ce},r.a.createElement(ue,{onClose:ce,severity:"success"},"Password has been succesfully reset! Please login using your new password.")),r.a.createElement(V.a,{open:$,autoHideDuration:6e3,onClose:ce},r.a.createElement(ue,{onClose:ce,severity:"error"},ae))),r.a.createElement(Y.a,{mt:5},r.a.createElement(se,null)))},pe=t(281);function ge(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://rainflow.live/"},"RainFLOW Network")," ",(new Date).getFullYear(),".")}function Ee(e){return r.a.createElement(M.a,Object.assign({elevation:6,variant:"filled"},e))}var be=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),background:"linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)"}}})),fe=function(){var e=be(),a=Object(n.useState)(""),t=Object(c.a)(a,2),o=t[0],l=t[1],i=Object(n.useState)(!1),s=Object(c.a)(i,2),u=s[0],d=s[1],p=Object(n.useState)(!1),g=Object(c.a)(p,2),E=g[0],b=g[1],f=Object(n.useState)(!1),v=Object(c.a)(f,2),w=v[0],O=v[1],j=Object(n.useState)(!1),k=Object(c.a)(j,2),S=k[0],x=k[1],C=Object(n.useState)(!1),I=Object(c.a)(C,2),W=I[0],D=I[1],N=Object(n.useState)(""),P=Object(c.a)(N,2),F=P[0],T=P[1],L=function(e,a){"clickaway"!==a&&(x(!1),O(!1),D(!1),T(""))};return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(R.a,{className:e.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Forgot Password"),r.a.createElement("form",{className:e.form,noValidate:!0},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{error:u,variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",onInput:function(e){l(e.target.value),d(!pe.isEmail(e.target.value))}}))),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,onClick:function(e){b(!0),e.preventDefault(),pe.isEmail(o)?h.a.post("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/users/forgot-password",{email:o}).then((function(e){console.log(e),b(!1),200===e.status&&x(!0)}),(function(e){b(!1),O(!0),console.log(e),console.log("Error Status Code: "+e)})):(T("Invalid Email!"),b(!1),D(!0))}},E?r.a.createElement(U.a,null):"Send Email")),r.a.createElement(V.a,{open:w,autoHideDuration:6e3,onClose:L},r.a.createElement(Ee,{onClose:L,severity:"error"},"Error. Please try again.")),r.a.createElement(V.a,{open:S,autoHideDuration:6e3,onClose:L},r.a.createElement(Ee,{onClose:L,severity:"success"},"Email sent! Please check your inbox.")),r.a.createElement(V.a,{open:W,autoHideDuration:6e3,onClose:L},r.a.createElement(Ee,{onClose:L,severity:"error"},F))),r.a.createElement(Y.a,{mt:5},r.a.createElement(ge,null)))};function he(){return r.a.createElement(y.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://rainflow.live/"},"RainFLOW Network")," ",(new Date).getFullYear(),".")}function ve(e){return r.a.createElement(M.a,Object.assign({elevation:6,variant:"filled"},e))}var we=Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),background:"linear-gradient(45deg, #b71c1c 30%, #f44336 90%)"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),background:"linear-gradient(45deg, #b71c1c 30%, #f44336 90%)"}}})),Oe=function(e){var a=we(),t=Object(n.useState)(""),o=Object(c.a)(t,2),l=(o[0],o[1],Object(n.useState)("")),i=Object(c.a)(l,2),s=i[0],u=(i[1],Object(n.useState)()),d=Object(c.a)(u,2),p=d[0],g=d[1],E=Object(n.useState)(),b=Object(c.a)(E,2),f=b[0],v=b[1],w=Object(n.useState)(),O=Object(c.a)(w,2),j=O[0],k=O[1],S=Object(n.useState)(!1),x=Object(c.a)(S,2),C=x[0],I=x[1],W=Object(n.useState)(!1),D=Object(c.a)(W,2),N=D[0],P=D[1],F=Object(n.useState)(!1),T=Object(c.a)(F,2),L=T[0],_=T[1],B=Object(n.useState)(""),z=Object(c.a)(B,2),M=z[0],Q=z[1],G=Object(n.useState)(!1),$=Object(c.a)(G,2),K=$[0],X=$[1],ee=function(e,a){"clickaway"!==a&&(P(!1),_(!1),Q(""))};return r.a.createElement(m.a,{component:"main",maxWidth:"xs"},r.a.createElement(A.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(R.a,{className:a.avatar},r.a.createElement(Z.a,null)),r.a.createElement(y.a,{component:"h1",variant:"h5"},"Change Password"),r.a.createElement("form",{className:a.form,noValidate:!0},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"password",label:"Current Password",name:"password",type:"password",autoComplete:"password",onInput:function(e){return g(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,id:"password",label:"New Password",name:"password",type:"password",autoComplete:"password",error:C,onInput:function(e){return v(e.target.value)}})),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(H.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password1",label:"Enter Password Again",type:"password",id:"password1",autoComplete:"current-password1",error:C,onInput:function(e){k(e.target.value),e.target.value!==f?I(!0):I(!1)}}))),r.a.createElement(q.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,onClick:function(e){X(!0),e.preventDefault();var a=localStorage.getItem("token");f!==j?(X(!1),_(!0),Q("Passwords do not match!")):(console.log("email:",s,"Password: ",p,"Token: ",a),h.a.post("https://cors-anywhere.herokuapp.com/https://rainflow.live/api/users/change-password",{password:p,new_password:f},{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){console.log(e),X(!1),200===e.status&&P(!0)}),(function(e){X(!1),Q(e.response.data.message),_(!0),console.log(e),console.log("Error Status Code: "+e)})))}},K?r.a.createElement(U.a,null):"Reset Password")),r.a.createElement(V.a,{open:N,autoHideDuration:6e3,onClose:ee},r.a.createElement(ve,{onClose:ee,severity:"success"},"Password has been succesfully changed! Please login using your new password.")),r.a.createElement(V.a,{open:L,autoHideDuration:6e3,onClose:ee},r.a.createElement(ve,{onClose:ee,severity:"error"},M))),r.a.createElement(Y.a,{mt:5},r.a.createElement(he,null)))};var je=t(400),ye=t(407),ke=t(404),Se=t(187),xe=t.n(Se),Ce=t(393),Ie=t(190),We=t.n(Ie),De=t(191),Ne=function(e){var a=r.a.useState(localStorage.hasOwnProperty("user")),t=Object(c.a)(a,2),n=(t[0],t[1],r.a.useState(null)),o=Object(c.a)(n,2),l=o[0],i=o[1],s=Boolean(l);Boolean(localStorage.getItem("token")),localStorage.getItem("username");return r.a.createElement(ye.a,{bg:"dark",variant:"dark",expands:"lg"},r.a.createElement(ye.a.Brand,{href:"/"},r.a.createElement("img",{alt:"",src:xe.a,height:"30",className:"d-inline-block align-top"})),r.a.createElement(ke.a,{className:"mr-auto"},r.a.createElement(ke.a.Link,{href:"/"},"Home"),r.a.createElement(ke.a.Link,{href:"/dashboard"},"Dashboard"),r.a.createElement(ke.a.Link,{href:"/about"},"About"),r.a.createElement(ke.a.Link,{href:"/docs"},"Docs")),e.isLoggedin?r.a.createElement("div",null,r.a.createElement(Ce.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){i(e.currentTarget)},color:"inherit"},r.a.createElement(We.a,{style:{color:"white"}})),r.a.createElement(De.a,{id:"menu-appbar",anchorEl:l,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:s,onClose:function(){i(null)}},r.a.createElement(ke.a.Link,{href:"/report",style:{color:"black"}},"Reports"),r.a.createElement(ke.a.Link,{href:"/change-password",style:{color:"black"}},"Change Password"),r.a.createElement(ke.a.Link,{href:"/logout",style:{color:"black"}},"Logout"))):r.a.createElement(ke.a,null,r.a.createElement(ke.a.Link,{href:"/login"},"Login")," ",r.a.createElement(ke.a.Link,{href:"/register"},"Register")))},Pe=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(Ne,{isLoggedin:e.isLoggedin}),r.a.createElement(je.a,null,e.children))};function Fe(){var e=Object(n.useState)({width:"100vw",height:"100vh",latitude:14.5647642,longitude:120.9931652,zoom:4}),a=Object(c.a)(e,2),t=a[0],o=a[1];return r.a.createElement(u.b,Object.assign({mapboxApiAccessToken:"pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg"},t,{onViewportChange:function(e){return o(e)}}))}var Te=function(e){return r.a.createElement(Fe,null)},Le=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Hello! Docs Test!"))};var Re=function(e){var a=Object(n.useState)(Boolean(localStorage.getItem("token"))),t=Object(c.a)(a,2),o=t[0],l=t[1],u=Object(n.useState)(!1),m=Object(c.a)(u,2),d=(m[0],m[1],function(e){l(!0)});return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/mobile/map/:token_params",component:Te}),r.a.createElement(i.b,{component:function(){return r.a.createElement(Pe,{isLoggedin:o},r.a.createElement(i.b,{exact:!0,path:"/",component:p}),r.a.createElement(i.b,{exact:!0,path:"/register",component:ne}),r.a.createElement(i.b,{exact:!0,path:"/report",component:L}),r.a.createElement(i.b,{exact:!0,path:"/about",component:re}),r.a.createElement(i.b,{exact:!0,path:"/docs",component:Le}),r.a.createElement(i.b,{exact:!0,path:"/logout",component:function(){return localStorage.removeItem("token"),localStorage.removeItem("userID"),localStorage.removeItem("username"),l(!1),r.a.createElement(i.a,{to:"/"})}}),r.a.createElement(i.b,{path:"/dashboard",component:function(){return window.location.href="https://dashboard.rainflow.live",null}}),r.a.createElement(i.b,{path:"/reset-password/:token_params/:email_params",component:de}),r.a.createElement(i.b,{exact:!0,path:"/reset-password/",component:ie}),r.a.createElement(i.b,{exact:!0,path:"/forgot-password",component:fe}),r.a.createElement(i.b,{exact:!0,path:"/change-password",component:Oe}),r.a.createElement(i.b,{exact:!0,path:"/login",component:function(e){return r.a.createElement(K,Object.assign({},e,{handleLoggedIn:d}))}}))}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[205,1,2]]]);
//# sourceMappingURL=main.4aa926d5.chunk.js.map