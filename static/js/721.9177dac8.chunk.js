"use strict";(self.webpackChunkcash_app=self.webpackChunkcash_app||[]).push([[721],{9625:function(e,n,t){t(390);var r=t(2559);n.Z=function(e){var n=e.Name,t=e.Icon,c=e.Func;return(0,r.jsxs)("button",{className:"bg-[#f5f5f5] dark:bg-[#202020] text-black dark:text-white flex flex-row items-center justify-center p-[8px] w-[94%] rounded-full mt-[20px] font-xl",type:"button",onClick:c,children:[t,n]})}},3775:function(e,n,t){t(390);var r=t(2559);n.Z=function(e){var n=e.Name,t=e.Func;return(0,r.jsx)("button",{className:"flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl",style:{backgroundColor:"#00acee",color:"white"},type:"button",onClick:t,children:n})}},7513:function(e,n,t){t.d(n,{Ap:function(){return l},I8:function(){return s}});var r=t(1355),c=t(656),a=(0,r.ZF)({apiKey:"AIzaSyDqf0PFlXP0sZe2Ff-ncFhxbC2HwVtXyEM",authDomain:"video-ceedb.firebaseapp.com",projectId:"video-ceedb",storageBucket:"video-ceedb.appspot.com",messagingSenderId:"265928480230",appId:"1:265928480230:web:f9ec6678d345056b0a3227",measurementId:"G-LP51K47LK9"}),s=(0,c.v0)(),l=new c.hJ;n.ZP=a},5032:function(e,n,t){t(390);var r=t(2271),c=t(2559);n.Z=function(e){var n=e.header,t=e.handleBackBtnCLick,a=e.savebtn,s=e.nextbtn,l=e.savebtn2,o=e.cancelbtn,i=e.searchbar;return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("div",{className:" flex flex-row top-0 z-10 absolute w-full lg:border-b-[3px] border-[#f5f5f5] dark:border-[#202020] h-[50px] lg:h-[60px]",children:(0,c.jsxs)("div",{className:"w-full h-full relative items-center justify-around flex flex-row ",children:[t||o?(0,c.jsx)("button",{className:"flex flex-row cursor-pointer left-0 w-[42px] h-[42px] absolute ml-[4px] items-center hover:border-2 hover:text-[#00acee] border-[#00acee] justify-center hover:rounded-full",onClick:t,children:o||(0,c.jsx)(r.WmF,{fontSize:25})}):"",(0,c.jsx)("h2",{className:"font-medium text-xl",children:n}),a,l,i,s]})})})}},1721:function(e,n,t){t.r(n);var r=t(4165),c=t(5861),a=t(9439),s=t(390),l=t(7187),o=t(9134),i=t(1750),u=t(3011),f=t(7513),d=t(656),x=t(5545),h=t(5032),p=t(5400),m=t(3775),b=t(9625),v=t(2559);n.default=function(){var e=s.lazy((function(){return t.e(725).then(t.bind(t,725))})),n=(0,s.useState)(!1),g=(0,a.Z)(n,2),j=g[0],w=g[1],k=(0,i.I0)(),y=(0,x.s0)(),N=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k((0,u.h8)()),(0,d.rh)(f.I8,f.Ap).then((function(e){o.Z.post("/auth/google",{name:e.user.displayName,email:e.user.email,img:e.user.photoURL}).then((function(e){k((0,u.he)(e.data)),200===e.status&&y("/")}))})).catch((function(e){k((0,u.UR)()),console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar z-10 absolute h-[100dvh] w-full items-center justify-center",children:[(0,v.jsx)(h.Z,{header:"Sign up page",handleBackBtnCLick:function(e){e.preventDefault(),y("/signin")}}),(0,v.jsxs)("div",{className:"flex flex-col items-center justify-center w-full lg:w-1/2 overflow-scroll absolute px-[50px] hide-scrollbar",children:[(0,v.jsx)("text",{className:"text-[20px] font-base",children:"sign up to continue"}),(0,v.jsx)(b.Z,{Icon:(0,v.jsx)(l.JM8,{fontSize:25,className:"mr-4"}),Name:"Sign up with Google",Func:N}),(0,v.jsx)(m.Z,{Name:"Create Account",Func:function(){return w(!0)}}),(0,v.jsxs)("h2",{className:"font-base font-normal mt-6",style:{color:"#999"},children:["Already have an account?",(0,v.jsx)(p.rU,{to:"/signin",style:{color:"#00acee"},children:"Sign in"})]})]})]}),j&&(0,v.jsx)(s.Suspense,{children:(0,v.jsx)(e,{setToggleCreateAccount:w})})]})}}}]);
//# sourceMappingURL=721.9177dac8.chunk.js.map