import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as m,i as f}from"./assets/vendor-77e16229.js";function h(t){const d=String(Math.floor(t/864e5)).padStart(2,"0"),i=String(Math.floor(t%864e5/36e5)).padStart(2,"0"),u=String(Math.floor(t%864e5%36e5/6e4)).padStart(2,"0"),l=String(Math.floor(t%864e5%36e5%6e4/1e3)).padStart(2,"0");return{days:d,hours:i,minutes:u,seconds:l}}const o=document.querySelector("button[data-start]"),a=document.querySelector("#datetime-picker"),p=document.querySelector("span[data-days]"),y=document.querySelector("span[data-hours]"),S=document.querySelector("span[data-minutes]"),b=document.querySelector("span[data-seconds]");let r;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],r.getTime()<Date.now?(o.disabled=!1,f.warning({position:"center",backgroundColor:"red",messageColor:"black",message:"Please choose a date in the future"})):o.disabled=!0}};m(a,g);function c({days:t,hours:e,minutes:n,seconds:s}){p.textContent=t,y.textContent=e,S.textContent=n,b.textContent=s}o.addEventListener("click",C);function C(){a.disabled=!0,o.disabled=!0;const t=setInterval(()=>{let e=r-Date.now();if(e<=0){a.disabled=!1,clearInterval(t),c({days:0,hours:0,minutes:0,seconds:0});return}const n=h(e);c(n)},1e3)}
//# sourceMappingURL=commonHelpers.js.map