(()=>{"use strict";const t=document.getElementById("canvas"),e=t.getContext("2d"),i=t.getBoundingClientRect(),n=i.left,l=i.top,g=t.width,o=t.height;let s,r,a=!1;const h=[];function f(){e.clearRect(0,0,g,o);for(let n=0;n<h.length;n++)h[n].width?(i=h[n],e.fillStyle=i.fill,e.fillRect(i.x,i.y,i.width,i.height)):(t=h[n],e.fillStyle=t.fill,e.beginPath(),e.arc(t.x,t.y,t.r,0,2*Math.PI),e.closePath(),e.fill());var t,i}h.push({x:10,y:100,width:30,height:30,fill:"#444444",isDragging:!1}),h.push({x:80,y:100,width:30,height:30,fill:"#ff550d",isDragging:!1}),h.push({x:150,y:100,r:10,fill:"#800080",isDragging:!1}),h.push({x:200,y:100,r:10,fill:"#0c64e8",isDragging:!1}),t.onmousedown=function(t){t.preventDefault(),t.stopPropagation();const e=parseInt(t.clientX-n),i=parseInt(t.clientY-l);a=!1;for(let t=0;t<h.length;t++){var g=h[t];if(g.width)!a&&e>g.x&&e<g.x+g.width&&i>g.y&&i<g.y+g.height&&(a=!0,g.isDragging=!0);else{const t=g.x-e,n=g.y-i;!a&&t*t+n*n<g.r*g.r&&(a=!0,g.isDragging=!0)}}s=e,r=i},t.onmouseup=function(t){t.preventDefault(),t.stopPropagation(),a=!1;for(let t=0;t<h.length;t++)h[t].isDragging=!1},t.onmousemove=function(t){if(a){t.preventDefault(),t.stopPropagation();const e=parseInt(t.clientX-n),i=parseInt(t.clientY-l),g=e-s,o=i-r;for(let t=0;t<h.length;t++){const e=h[t];e.isDragging&&(e.x+=g,e.y+=o)}f(),s=e,r=i}},f()})();