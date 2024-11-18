"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[688],{469:(e,a,i)=>{i.r(a),i.d(a,{default:()=>h});var s=i(43);const n=i.p+"static/media/hero-bg.a92401b33523a659566f.jpg",r=i.p+"static/media/option2.0ac8bd04e4973a4572c7.jpeg",t=i.p+"static/media/Github.3cb4c4d227b62c0ce00b.png",c=i.p+"static/media/LinkedIN.31c8c766c5740b92c863.png";var l=i(579);const o=e=>{let{href:a,src:i,alt:s,className:n}=e;return(0,l.jsx)("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":s,children:(0,l.jsx)("img",{src:i,alt:s,className:n,style:{width:"55px",height:"55px"}})})},d=()=>{const e=(0,s.useRef)(null),a=(0,s.useRef)(null);let i=[];const d=(0,s.useCallback)((()=>{const a=e.current;a.width=window.innerWidth,a.height=window.innerHeight,(e=>{i=Array.from({length:50},(()=>({x:Math.random()*e.width,y:Math.random()*e.height,vx:.1*(Math.random()-.5),vy:.1*(Math.random()-.5),radius:1.5*Math.random()+.5,opacity:.7*Math.random()+.5,connections:[]})))})(a)}),[]);return(0,s.useEffect)((()=>{const a=e.current,s=a.getContext("2d",{alpha:!0});let n;const r=()=>{i.forEach((e=>{e.x+=e.vx,e.y+=e.vy,e.x<0&&(e.x=a.width),e.x>a.width&&(e.x=0),e.y<0&&(e.y=a.height),e.y>a.height&&(e.y=0)})),s.clearRect(0,0,a.width,a.height),s.beginPath(),s.strokeStyle="rgba(0, 123, 255, 0.3)",s.lineWidth=.7,i.forEach((e=>{i.forEach((a=>{if(e!==a){const i=e.x-a.x,n=e.y-a.y;Math.sqrt(i*i+n*n)<100&&(s.moveTo(e.x,e.y),s.lineTo(a.x,a.y))}}))})),s.stroke(),i.forEach((e=>{s.beginPath(),s.arc(e.x,e.y,e.radius,0,2*Math.PI),s.fillStyle=`rgba(0, 123, 255, ${e.opacity})`,s.fill(),s.shadowBlur=15,s.shadowColor="rgba(0, 123, 255, 0.7)"})),n=requestAnimationFrame(r)};return d(),window.addEventListener("resize",d),r(),()=>{window.removeEventListener("resize",d),cancelAnimationFrame(n)}}),[d]),(0,l.jsxs)("section",{id:"hero",className:"hero-section",style:{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${n})`,backgroundPosition:"center center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},children:[(0,l.jsx)("canvas",{ref:a,className:"background-network-canvas"}),(0,l.jsx)("canvas",{ref:e,className:"neural-network-canvas"}),(0,l.jsx)("div",{className:"floating-elements",children:[...Array(12)].map(((e,a)=>(0,l.jsx)("div",{className:`floating-circle circle-${a+1}`,children:(0,l.jsx)("div",{className:"inner-circle"})},a)))}),(0,l.jsxs)("div",{className:"hero-content",children:[(0,l.jsxs)("div",{className:"hero-text",children:[(0,l.jsx)("h1",{className:"hero-title glitch-effect",children:"Hi, I'm Premchand Jalla"}),(0,l.jsxs)("div",{className:"title-scroll",children:[(0,l.jsx)("span",{children:"AI Developer"}),(0,l.jsx)("span",{children:"Application Developer"}),(0,l.jsx)("span",{children:"MLOps Engineer"}),(0,l.jsx)("span",{children:"Data Engineer"}),(0,l.jsx)("span",{children:"Full stack developer"})]}),(0,l.jsx)("p",{className:"hero-description",children:"I am a software engineer passionate about building AI solutions, with experience in application development and machine learning. I'm building AI solutions to make a positive impact in the world. Let's tune those hyperparameters and optimize for greatness! Turning ideas into reality, one line of code at a time."}),(0,l.jsxs)("div",{className:"hero-buttons",children:[(0,l.jsx)("a",{href:"/resume.pdf",className:"resume-button",download:!0,children:"Download Resume"}),(0,l.jsx)("div",{className:"social-links",children:(0,l.jsxs)(s.Suspense,{fallback:(0,l.jsx)("div",{children:"Loading..."}),children:[(0,l.jsx)(o,{href:"https://github.com/PremchandJalla",src:t,alt:"GitHub",className:"social-icon-img",th:!0}),(0,l.jsx)(o,{href:"https://www.linkedin.com/in/premchandjalla/",src:c,alt:"LinkedIn",className:"social-icon-img"})]})})]})]}),(0,l.jsx)("div",{className:"hero-image",children:(0,l.jsx)("div",{className:"profile-picture-container",children:(0,l.jsx)("img",{src:r,alt:"Profile",className:"profile-picture"})})})]})]})},h=s.memo(d)}}]);
//# sourceMappingURL=688.c754c322.chunk.js.map