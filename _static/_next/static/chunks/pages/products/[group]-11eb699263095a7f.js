(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[907],{8805:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/products/[group]",function(){return i(9067)}])},3643:function(e,t,i){"use strict";i.d(t,{Z:function(){return f}});var s=i(5893),r=i(7294),d=i(9332),c=i(1934),a=i(5675),n=i.n(a),l=i(3746),o=i(1649),u=i(5105),p=i(4312),h=i(7863),g=i(5518),x=i(1099),m=i.n(x);let _=e=>{let[t,i]=(0,r.useState)(!0),[d,a]=(0,r.useState)({id:"",title:"",description:"",pattern_id:"",retail_price:"",wholesale_price:"",photo_url:"",group_id:""}),[u,p]=(0,r.useState)(!1),x=(0,o.I0)(),{productAdded:_,allProducts:j,currentProductGroup:f,prodShow:v,currentProductId:b,editShow:N,add2AllShow:y}=(0,o.v9)(l.TP),{isAuthenticated:w,isAdmin:C,loading:D}=(0,o.v9)(l.Gb),[k,P]=(0,r.useState)(0);(0,r.useEffect)(()=>{0==j.length&&x((0,h.t2)()),P(f.findIndex(e=>e.id===b))},[]),(0,r.useEffect)(()=>{if(v&&""!=b){let t=j.find(t=>t.id===e.pid)||{id:"",title:"",description:"",pattern_id:"",retail_price:"",wholesale_price:"",photo_url:"",group_id:""};a(t)}!1===v&&x((0,h.fF)(""))},[b,v,j,_]),(0,r.useEffect)(()=>{""!=b&&f.length>0&&P(f.findIndex(e=>e.id===b))},[b,f]);let S=()=>{p(!0)},T=()=>{k>=1&&(x((0,h.fF)(f[k-1].id)),a({...f[k-1]}))},E=()=>{k<f.length-1&&(x((0,h.fF)(f[k+1].id)),a({...f[k+1]}))},Z=e=>{x((0,h.Hl)(e)),x((0,h.t2)())},I=e=>{x((0,h.kw)(e))};return(0,s.jsx)(s.Fragment,{children:""!=d.id&&(0,s.jsxs)("div",{style:{visibility:v?"visible":"hidden"},className:m().productDetailsContainer,children:[(0,s.jsxs)("div",{className:m().productPager,children:[(0,s.jsxs)("button",{className:k>0?m().active:m().disabled,onClick:()=>T(),children:[" ",(0,s.jsx)("span",{className:"glyphicon glyphicon-arrow-left"}),g.tq?"":"Previous Product"]}),(0,s.jsxs)("span",{className:"grouptitle",children:["Group: ",c[parseInt(d.group_id)-1].title]}),(0,s.jsxs)("button",{className:k<f.length-1?m().active:m().disabled,onClick:()=>E(),children:[g.tq?"":"Next Product",(0,s.jsx)("span",{className:"glyphicon glyphicon-arrow-right"})]})]}),!0===C?(0,s.jsxs)("div",{className:m().adminbtn,children:[(0,s.jsx)("button",{onClick:()=>{window.confirm("Are you sure you want to delete this product?")&&Z(d.id)},children:"Delete This Product"}),(0,s.jsxs)("button",{onClick:()=>I(d.id.toString()),children:["Edit This Product ",d.id]}),(0,s.jsxs)("span",{children:["index: ",e.pin," - Name: ",d.title," - Desc: ",d.description," - pathern: ",d.pattern_id,"Retail: ",d.retail_price," - Wholesale ",d.wholesale_price]})]}):(0,s.jsx)(s.Fragment,{}),(0,s.jsxs)("div",{className:m().productdetails,children:[(0,s.jsx)("div",{className:m().productImgContainer,children:(0,s.jsx)(n(),{src:u?"/static/colors1.jpg":"/static/"+d.photo_url,onError:S,className:"media-object ".concat(m().prdimg),width:150,height:150,alt:"Thai Sarong Orataiphathai"})}),(0,s.jsxs)("div",{className:m().productDescContainer,children:[(0,s.jsxs)("p",{className:m().productTitle,children:["Product Name: ",d.title]}),(0,s.jsx)("p",{children:d.description})]})]})]},d.id)})},j=e=>{let[t,i]=(0,r.useState)("1"),a=(0,d.useRouter)(),{productAdded:u,allProducts:g,currentProductId:x,currentProductGroup:m,loading:j,prodShow:f}=(0,o.v9)(l.TP),{isAdmin:v}=(0,o.v9)(l.Gb),b=(0,o.I0)();(0,r.useEffect)(()=>{0==g.length&&b((0,h.t2)())},[]);let N=e=>{i(e),b((0,h.Ff)([...g.filter(t=>t.group_id==e)])),a.push("/products/".concat(e,"/#divider1"))},y=()=>{b((0,h.Cy)())};return(0,s.jsxs)("div",{className:"bg-black",children:[j&&(0,s.jsx)("div",{className:"text-white loading",children:"Loading..."}),(0,s.jsxs)(p.Z,{name:"productPage",show:f,modalClosed:()=>b((0,h.J6)()),modalHeight:"600",children:[(0,s.jsx)("button",{type:"button",className:"btn btn-link",onClick:()=>b((0,h.J6)()),children:"X"}),(0,s.jsx)(_,{prodShow:f,pid:x})]}),(0,s.jsx)("div",{id:"menu-box",children:(0,s.jsx)("ul",{className:"category-list",children:c.map(e=>(0,s.jsx)("li",{className:t===e.id?"category-btn activeted":"category-btn",children:(0,s.jsxs)("div",{className:"menu-cat",onClick:()=>N(e.id),children:[(0,s.jsx)("span",{className:"menu-header",children:e.title}),(0,s.jsx)(n(),{className:"img-class",src:e.url,alt:e.title,width:175,height:175})]})},"cat".concat(e.id)))})}),v&&(0,s.jsx)("div",{className:"",children:(0,s.jsx)("div",{className:"border-white border-solid rounded cursor-pointer flex bg-orange-700 border-1 h-9 text-center w-60 justify-center items-center align-middle",onClick:y,children:"Add New Product"})}),(0,s.jsx)("div",{id:"divider1",className:"bg-black strike",children:(0,s.jsx)(n(),{src:"/static/divider1.svg",className:"img-responsive",width:"500",height:"50",alt:"orataiphathai Thai Sarong"})})]})};var f=(0,u.h)(j)},7880:function(e,t,i){"use strict";var s=i(5893),r=i(7294),d=i(8934),c=i(8683);let a=()=>{let[e,t]=(0,r.useState)(!1),{currentLanguage:i}=(0,r.useContext)(c.Z),{t:a}=(0,d.Z)(i),n=()=>{t(!e)};return(0,s.jsx)("div",{className:"mainbody",dir:"he"==i?"rtl":"ltr",children:(0,s.jsxs)("div",{className:"container desc",children:[(0,s.jsx)("div",{className:"panel-body",children:(0,s.jsxs)("div",{className:e?"text-long":"text-short",onClick:n,children:[(0,s.jsxs)("p",{children:[a("products:body1")," "]}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:[a("products:body2")," "]}),(0,s.jsxs)("li",{children:[a("products:body3")," "]}),(0,s.jsxs)("li",{children:[a("products:body4")," "]})]})]})}),(0,s.jsxs)("div",{className:"panel-body",children:[(0,s.jsxs)("span",{children:[a("products:body5")," "]}),(0,s.jsxs)("h1",{className:"container centertext desc",children:[a("products:contact")," "]})]})]})})};t.Z=a},9067:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return f}});var s=i(5893),r=i(4943),d=i(7294),c=i(5675),a=i.n(c),n=i(8683),l=i(7863),o=i(3746),u=i(1649),p=i(8934),h=i(5105);let g=e=>{let[t,i]=(0,d.useState)([]),[r,c]=(0,d.useState)(0),{currentLanguage:h}=(0,d.useContext)(n.Z),{productAdded:g,allProducts:x,prodShow:m}=(0,u.v9)(o.TP),_=(0,u.I0)(),{t:j}=(0,p.Z)(h);(0,d.useEffect)(()=>{0==x.length&&_((0,l.t2)()),""!=e.groupid&&x.length>0&&(i([...x.filter(t=>t.group_id==e.groupid)]),_((0,l.Ff)([...x.filter(t=>t.group_id==e.groupid)])))},[]),(0,d.useEffect)(()=>{i([...x.filter(t=>t.group_id==e.groupid)]),_((0,l.Ff)([...x.filter(t=>t.group_id==e.groupid)]))},[e.groupid,x]),(0,d.useEffect)(()=>{g&&(_((0,l.t2)()),_((0,l.if)()))},[g]);let f=e=>{_((0,l.fF)(e)),c(t.findIndex(t=>t.id==e)),_((0,l.Sz)())};return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"prod-btns-container",children:(0,s.jsxs)("div",{className:"group-container",children:[(0,s.jsxs)("h2",{className:"group-title",children:[j("products:description".concat(e.groupid))," "]}),(0,s.jsx)("div",{className:"button-group",id:"the2nd-menu",children:t.map((e,t)=>(0,s.jsxs)("div",{className:"productMenuButton",onClick:()=>f(e.id),children:[(0,s.jsx)("span",{children:e.title}),(0,s.jsx)(a(),{width:100,height:100,src:"/static/"+e.photo_url,alt:"Thai Sarong-"+e.title,sizes:"10vw"})]},e.id))})]})})})};var x=(0,h.h)(g),m=i(7880),_=i(3643),j=i(1163);function f(){let e=(0,j.useRouter)();return(0,s.jsx)(r.Z,{title:"Order Your Orataiphathai Thai Sarong Products",description:"Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability.",children:(0,s.jsxs)("div",{className:"bg-black",children:[(0,s.jsx)(m.Z,{}),(0,s.jsx)(_.Z,{}),(0,s.jsx)(x,{groupid:e.query.group||1})]})})}},1099:function(e){e.exports={productDetailsContainer:"productDisplay_productDetailsContainer__sYzp3",productDetails:"productDisplay_productDetails__vQoRq",adminbtn:"productDisplay_adminbtn__LoPmr",grouptitle:"productDisplay_grouptitle__xoHB9",productTitle:"productDisplay_productTitle__C8eGl",productPager:"productDisplay_productPager__Z2fdJ",disabled:"productDisplay_disabled__TAxli",productdetails:"productDisplay_productdetails__kIekH",productImgContainer:"productDisplay_productImgContainer__XW08D",prdimg:"productDisplay_prdimg__mXuWZ",productDescContainer:"productDisplay_productDescContainer__V30oD"}},1163:function(e,t,i){e.exports=i(6885)}},function(e){e.O(0,[445,518,943,774,888,179],function(){return e(e.s=8805)}),_N_E=e.O()}]);