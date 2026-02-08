import{r as l,d as x,j as o,e as u,f as b}from"./index-Dn3N4I-3.js";const v=()=>{const[n,s]=l.useState(!1),[a,c]=l.useState(!1),i=x();l.useEffect(()=>{const e=()=>{s(window.scrollY>300)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);const d=[{icon:"📄",label:"Download CV",action:()=>{u(),window.open("Bakr_Alhayek_CV.pdf","_blank")},color:"var(--accent-navy)"},{icon:"📚",label:"Google Scholar",action:()=>{b(),window.open("https://scholar.google.com/citations?user=8NUxSzEAAAAJ&hl=en&oi=ao","_blank")},color:"var(--accent-blue)"},{icon:"✉️",label:"Contact",action:()=>{i("/contact")},color:"var(--accent-navy)"}],t={container:{position:"fixed",right:"20px",bottom:"20px",zIndex:999,display:"flex",flexDirection:"column",gap:"12px",alignItems:"flex-end",opacity:n?1:0,transform:n?"translateY(0)":"translateY(20px)",transition:"all 0.3s ease",pointerEvents:n?"auto":"none"},toolButton:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",backgroundColor:"#FFFFFF",border:"2px solid var(--border-color)",borderRadius:"50px",boxShadow:"var(--shadow-md)",cursor:"pointer",transition:"all 0.2s ease",fontSize:"0.9rem",fontWeight:"500",color:"var(--text-primary)"},toolIcon:{fontSize:"1.2rem"},toolLabel:{maxWidth:a?"120px":"0",overflow:"hidden",whiteSpace:"nowrap",transition:"max-width 0.3s ease"},toggleButton:{width:"50px",height:"50px",borderRadius:"50%",backgroundColor:"var(--accent-navy)",color:"#FFFFFF",border:"none",boxShadow:"var(--shadow-lg)",cursor:"pointer",fontSize:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s ease"}};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        .quick-tool-btn:hover {
            transform: translateX(-5px) scale(1.05);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent-navy);
        }
        .quick-toggle-btn:hover {
            transform: scale(1.1) rotate(15deg);
            background-color: var(--accent-blue);
        }
        @media (max-width: 768px) {
            .quick-access-toolbar {
                right: 10px !important;
                bottom: 10px !important;
            }
        }
    `}),o.jsxs("div",{style:t.container,className:"quick-access-toolbar",children:[a&&d.map((e,p)=>o.jsxs("button",{style:t.toolButton,className:"quick-tool-btn",onClick:e.action,onMouseEnter:r=>r.currentTarget.style.borderColor=e.color,onMouseLeave:r=>r.currentTarget.style.borderColor="var(--border-color)",children:[o.jsx("span",{style:t.toolIcon,children:e.icon}),o.jsx("span",{style:t.toolLabel,children:e.label})]},p)),o.jsx("button",{style:t.toggleButton,className:"quick-toggle-btn",onClick:()=>c(!a),"aria-label":"Toggle quick access menu",children:a?"×":"⚡"})]})]})};export{v as default};
