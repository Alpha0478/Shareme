"use strict";(self.webpackChunkcash_app=self.webpackChunkcash_app||[]).push([[743],{5032:function(e,t,r){r(390);var n=r(2271),l=r(2559);t.Z=function(e){var t=e.header,r=e.handleBackBtnCLick,o=e.savebtn,s=e.nextbtn,a=e.savebtn2,c=e.cancelbtn,u=e.searchbar;return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:" flex flex-row top-0 z-10 absolute w-full lg:border-b-[3px] border-[#f5f5f5] dark:border-[#202020] h-[50px] lg:h-[60px]",children:(0,l.jsxs)("div",{className:"w-full h-full relative items-center justify-around flex flex-row ",children:[r||c?(0,l.jsx)("button",{className:"flex flex-row cursor-pointer left-0 w-[42px] h-[42px] absolute ml-[4px] items-center hover:border-2 hover:text-[#00acee] border-[#00acee] justify-center hover:rounded-full",onClick:r,children:c||(0,l.jsx)(n.WmF,{fontSize:25})}):"",(0,l.jsx)("h2",{className:"font-medium text-xl",children:t}),o,a,u,s]})})})}},743:function(e,t,r){r.r(t);var n=r(4165),l=r(5861),o=r(9439),s=r(390),a=r(9134),c=r(5545),u=r(5032),i=r(2559);t.default=function(){var e=(0,s.useState)(""),t=(0,o.Z)(e,2),r=t[0],d=t[1],f=(0,s.useState)(""),p=(0,o.Z)(f,2),x=p[0],h=p[1],m=(0,c.TH)().pathname,w=(0,c.s0)(),b=function(){h(""),d("")},v=function(){b(),document.querySelector("#password").value="",document.querySelector("#confirm_password").value="",r||x?r.toLocaleLowerCase()!==x.toLocaleLowerCase()?console.log("hello"):g():console.log("hello")},g=function(){var e=(0,l.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.Z.post(m,{password:r,confrimPassword:x});case 3:200===e.sent.status&&(console.log("hello"),w("/signin")),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),403===e.t0.response.status&&console.log("hello");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,i.jsxs)("div",{className:"flex flex-col top-0 overflow-scroll hide-scrollbar z-10 absolute h-screen w-full items-center justify-center",children:[(0,i.jsx)(u.Z,{header:"Sign Page",handleBackBtnCLick:function(e){e.preventDefault(),b(),w("/signin")}}),(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center w-full lg:w-1/2 overflow-scroll h-full hide-scrollbar",children:[(0,i.jsx)("text",{className:"font-base text-[20px]",children:"reset password"}),(0,i.jsxs)("form",{id:"signUp",children:[(0,i.jsx)("input",{id:"input",className:"p-[10px] bg-none rounded-[6px] w-full my-[5px] border-2 border-[#999] outline-none",type:"password",autoComplete:"true",placeholder:"new password",onChange:function(e){return d(e.target.value)}}),(0,i.jsx)("input",{id:"input",className:"p-[10px] bg-none rounded-[6px] w-full my-[5px] border-2 border-[#999] outline-none",type:"password",autoComplete:"true",placeholder:"confirm password",onChange:function(e){return h(e.target.value)}})]}),r&&x?(0,i.jsx)("button",{className:"flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl",style:{backgroundColor:"#00acee",color:"white"},type:"button",onClick:v,children:"Reset"}):(0,i.jsx)("button",{className:"flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl",style:{backgroundColor:"#999",color:"white"},type:"button",onClick:v,children:"incomplete details"})]})]})}}}]);
//# sourceMappingURL=743.fbd1d016.chunk.js.map