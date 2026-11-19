import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

type Props = { style?: React.CSSProperties; intro?: boolean; initialSplit?: number; artifactStartsCharged?: boolean; previewHybrid?: boolean }
const clamp = (x:number,a:number,b:number)=>Math.max(a,Math.min(b,x))
const wiggle = (x:number,y:number,power=0)=>x+(9+power*9)*Math.sin(y*.020)+(4+power*6)*Math.sin(y*.061+1.9)+5*Math.sin(y*.009+1.3)+power*5*Math.sin(y*.132+x*.011)
const edge = (x:number,power=0)=>Array.from({length:114},(_,i)=>(i?"L":"M")+wiggle(x,i*8,power).toFixed(1)+" "+i*8).join(" ")
const clip = (x:number,power=0)=>"M0 0 L"+wiggle(x,0,power)+" 0 "+Array.from({length:90},(_,i)=>"L"+wiggle(x,(i+1)*10,power).toFixed(1)+" "+(i+1)*10).join(" ")+" L0 900Z"
const clipRight=(x:number,power=0)=>"M1600 0 L"+wiggle(x,0,power)+" 0 "+Array.from({length:90},(_,i)=>"L"+wiggle(x,(i+1)*10,power).toFixed(1)+" "+(i+1)*10).join(" ")+" L1600 900Z"
const columns = [180,244,308,372,436,500,1068,1132,1196,1260,1324,1388]
const ripples = Array.from({length:62},(_,i)=>({x:(i*179+80)%1320,y:631+i*4.6,w:60+(i*47)%260}))
const dust = Array.from({length:88},(_,i)=>({x:(i*137.5+47)%1600,y:(i*91.3+24)%610,r:i%9?0.7:1.9}))


function Artifact({dark,charged,still,scope=""}:{dark:boolean;charged:boolean;still:boolean;scope?:string}){
 const id=scope+(dark?"relic":"sculpture")
 const ivory=dark?"#8f6267":"#faf1da"
 const edgeColor=dark?"#ff8b68":"#effff1"
 const core=dark?"#fa563f":"#a6e9ee"
 const muted=dark?"#221b27":"#3b5e6b"
 const transition=still?"none":"transform 1000ms cubic-bezier(.2,.78,.18,1), opacity 650ms ease"
 const left:React.CSSProperties={transformOrigin:"790px 480px",transform:charged?"translate(-42px,-14px) rotate(-19deg)":"translate(0px,0px) rotate(0deg)",transition}
 const right:React.CSSProperties={transformOrigin:"810px 480px",transform:charged?"translate(42px,-14px) rotate(19deg)":"translate(0px,0px) rotate(0deg)",transition}
 const center:React.CSSProperties={transformOrigin:"800px 484px",transform:charged?"scale(1.25) translateY(-9px)":"scale(1)",transition}
 return <g aria-hidden="true" transform="translate(800 485) scale(1.31) translate(-800 -485)">
  <defs>
   <radialGradient id={id+"aura"}><stop stopColor={core} stopOpacity={charged?".80":".35"}/><stop offset=".5" stopColor={core} stopOpacity=".16"/><stop offset="1" stopColor={core} stopOpacity="0"/></radialGradient>
   <linearGradient id={id+"shell"} x1="0" y1="0" x2="1" y2=".75"><stop stopColor={ivory}/><stop offset=".5" stopColor={muted}/><stop offset="1" stopColor={dark?"#0d0e18":"#e7f5e8"}/></linearGradient>
  </defs>
  <ellipse cx="800" cy="495" rx={charged?130:84} ry={charged?128:102} fill={"url(#"+id+"aura)"} style={{transition:still?"none":"all .8s ease"}}/>
  <ellipse cx="800" cy="591" rx="74" ry="11" fill={core} opacity={charged?".22":".10"}/>
  <g opacity={charged?.9:.38} style={{transition:still?"none":"opacity .7s ease"}}>
   <ellipse cx="800" cy="486" rx="83" ry="29" stroke={edgeColor} strokeWidth="1.4" fill="none" transform="rotate(-17 800 486)" strokeDasharray={dark?"180 30 68 23":"none"}/>
   <ellipse cx="800" cy="482" rx="61" ry="77" stroke={core} strokeWidth="1" fill="none" strokeOpacity=".52" transform="rotate(65 800 482)"/>
   <circle cx="719" cy="508" r="3.4" fill={edgeColor}/><circle cx="871" cy="456" r="2.4" fill={edgeColor}/>
  </g>
  <g style={left}>
   <path d="M797 405 L766 439 L759 493 L781 543 L797 562 L799 507Z" fill={"url(#"+id+"shell)"} stroke={dark?edgeColor:"#263f50"} strokeWidth="2.5" strokeOpacity=".77"/>
   <path d="M796 418 L778 452 L772 491 L789 532" fill="none" stroke={edgeColor} strokeOpacity=".53" strokeWidth="2"/>
   <path d="M771 440 L790 461 L766 488" fill="none" stroke={dark?"#170f19":"#6a8792"} strokeWidth={dark?5:1.3} strokeOpacity={dark?".93":".45"}/>
   {dark&&<path d="M765 482 L787 500 L778 524" stroke="#100c13" strokeWidth="5" fill="none"/>}
  </g>
  <g style={right}>
   <path d="M803 405 L834 439 L841 493 L819 543 L803 562 L801 507Z" fill={"url(#"+id+"shell)"} stroke={dark?edgeColor:"#263f50"} strokeWidth="2.5" strokeOpacity=".77"/>
   <path d="M804 418 L822 452 L828 491 L811 532" fill="none" stroke={edgeColor} strokeOpacity=".53" strokeWidth="2"/>
   <path d="M830 437 L812 465 L836 492" fill="none" stroke={dark?"#140f19":"#6a8792"} strokeWidth={dark?5:1.3} strokeOpacity={dark?".93":".45"}/>
   {dark&&<path d="M835 486 L815 502 L823 528" stroke="#100c13" strokeWidth="5" fill="none"/>}
  </g>
  <g style={center}>
   <path d="M800 428 L820 483 L800 536 L780 483Z" fill={core} fillOpacity={charged?".81":".39"} stroke={edgeColor} strokeWidth={charged?3:1.5}/>
   <path d="M800 428 L800 537 M781 483 H819" stroke={edgeColor} strokeOpacity=".5" strokeWidth="1.5"/>
   <path d="M800 428 L811 484 L800 535 L790 484Z" fill={dark?"#771b2c":"#fffbe9"} opacity={charged?".49":".31"}/>
  </g>
  {Array.from({length:8},(_,i)=>{
    const sx=800+Math.cos(i*Math.PI/4)*27,sy=484+Math.sin(i*Math.PI/4)*35
    const dx=Math.cos(i*Math.PI/4)*(dark?70:53),dy=Math.sin(i*Math.PI/4)*(dark?54:39)
    return <g key={i} style={{transform:charged?"translate("+dx+"px,"+dy+"px) rotate("+(i%2?38:-38)+"deg)":"translate(0px,0px)",transformOrigin:sx+"px "+sy+"px",transition:still?"none":"transform 1050ms cubic-bezier(.2,.8,.2,1)"}}>
      <path d={"M"+sx+" "+sy+" l"+(i%2?7:-9)+" -"+(8+i%3*3)+" l"+(11+i%3*3)+" "+(16+i%3*3)+"Z"} fill={dark?"#b45452":"#eff9ec"} fillOpacity={charged?".90":".1"}/>
    </g>
  })}
  <path d="M751 570 Q800 586 849 570" stroke={edgeColor} strokeWidth={charged?2:1} fill="none" opacity={charged?".76":".22"}/>
 </g>
}


function ConvergenceDetails({ still }: { still: boolean }) {
 return <g aria-hidden="true">
  <defs>
   <radialGradient id="parallel-convergence-halo"><stop stopColor="#ffe3a8" stopOpacity=".49"/><stop offset=".55" stopColor="#8bcbd0" stopOpacity=".13"/><stop offset="1" stopColor="#dca998" stopOpacity="0"/></radialGradient>
   <linearGradient id="parallel-convergence-fault" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffb78c"/><stop offset=".45" stopColor="#fff2c7"/><stop offset="1" stopColor="#9ed7db"/></linearGradient>
   <filter id="parallel-convergence-bloom" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <ellipse cx="800" cy="435" rx="365" ry="350" fill="url(#parallel-convergence-halo)"/>
  <g stroke="url(#parallel-convergence-fault)" fill="none" strokeLinecap="round">
   <path d="M 553 278 L 614 306 L 597 365 L 641 405 L 631 459 L 690 513" strokeWidth="16" opacity=".22" filter="url(#parallel-convergence-bloom)"/>
   <path d="M 553 278 L 614 306 L 597 365 L 641 405 L 631 459 L 690 513" strokeWidth="3.2" opacity=".82"/>
   <path d="M 1037 284 L 1002 325 L 1018 384 L 976 431 L 985 487 L 952 533" strokeWidth="12" opacity=".18" filter="url(#parallel-convergence-bloom)"/>
   <path d="M 1037 284 L 1002 325 L 1018 384 L 976 431 L 985 487 L 952 533" strokeWidth="2.4" opacity=".75"/>
   <path d="M 584 242 L 708 258 M 903 244 L 1010 259" strokeWidth="3.5" opacity=".60"/>
   <path d="M 450 665 L 1150 665 M 383 705 L 1217 705" strokeWidth="2" opacity=".20"/>
  </g>
  <g fill="none" stroke="#fce6ba">
   <ellipse cx="800" cy="199" rx="175" ry="57" strokeWidth="3.2" opacity=".66" strokeDasharray="200 24 58 22 120 14 42 20"/>
   <ellipse cx="800" cy="183" rx="190" ry="61" stroke="#b0e9de" strokeWidth="1.1" opacity=".46"/>
   <ellipse cx="800" cy="207" rx="131" ry="41" strokeWidth="1.3" opacity=".61"/>
   <path d="M 625 194 L 663 172 M 976 212 L 942 238" stroke="#b6e9e4" strokeWidth="3" opacity=".68"/>
  </g>
  <g>
   {Array.from({length:19},(_,i)=>{
    const x=220+(i*109)%1140
    const y=133+(i*71)%360
    const size=5+(i*13)%26
    const rotate=(i*37)%90-45
    return <g key={i} transform={"rotate("+rotate+" "+x+" "+y+")"}>
      <path d={"M"+x+" "+y+" l"+size+" -"+(size*.5)+" "+(size*.48)+" "+size+" -"+size+" "+(size*.7)+"Z"} fill={i%3===0?"#f5d5ae":i%3===1?"#80afb7":"#66545b"} stroke={i%4===0?"#ffe5b5":"none"} strokeWidth="1" opacity={i%4===0?".85":".63"}/>
    </g>
   })}
  </g>
  <g fill="none" stroke="#e8d3aa" strokeOpacity=".48">
   <path d="M 682 492 C 698 354 897 358 919 495" strokeWidth="1.5" strokeDasharray="8 12"/>
   <path d="M 714 523 Q 800 564 886 523" strokeWidth="3"/>
   <path d="M 667 490 C 663 367 942 365 938 489" stroke="#a1e4e4" strokeWidth="1.3" opacity=".56"/>
  </g>
  <g opacity=".70">
   <path d="M 800 600 L 880 900 H 720Z" fill="#ffd7a2" opacity=".10"/>
   {Array.from({length:15},(_,i)=><path key={i} d={"M"+(550+i*33)+" "+(668+i*13)+" h"+(75+(i*21)%180)} fill="none" stroke={i%3?"#f7c99e":"#a6d6d6"} opacity=".13" strokeWidth={i%5?1:2}/>)}
  </g>
  <g className={still?"":"parallel-orbit"} style={{transformOrigin:"800px 478px"}}>
    <ellipse cx="800" cy="478" rx="126" ry="36" fill="none" stroke="#e7e1c7" strokeOpacity=".65" strokeWidth="1.5" transform="rotate(-19 800 478)"/>
    <circle cx="928" cy="465" r="3.5" fill="#fff0c9"/>
  </g>
 </g>
}


function CinematicSky({ dark, hybrid, id }: { dark:boolean; hybrid:boolean; id:string }) {
 const glow = hybrid?"#ffe1a8":dark?"#fa7261":"#fff3db"
 const cloud = dark?"#070816":hybrid?"#23314b":"#ecfbef"
 return <g aria-hidden="true">
  <defs>
   <radialGradient id={id+"solar"} cx="50%" cy="50%" r="50%">
    <stop offset="0" stopColor={glow} stopOpacity={dark?".6":".53"}/>
    <stop offset=".33" stopColor={glow} stopOpacity=".16"/>
    <stop offset="1" stopColor={glow} stopOpacity="0"/>
   </radialGradient>
   <linearGradient id={id+"cloud"} x1="0" y1="0" x2=".25" y2="1">
    <stop offset="0" stopColor={cloud} stopOpacity="0"/>
    <stop offset=".47" stopColor={cloud} stopOpacity={dark?".25":".26"}/>
    <stop offset="1" stopColor={cloud} stopOpacity="0"/>
   </linearGradient>
   <linearGradient id={id+"sunshaft"} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={glow} stopOpacity=".28"/>
    <stop offset="1" stopColor={glow} stopOpacity="0"/>
   </linearGradient>
   <filter id={id+"cloudblur"} x="-30%" y="-50%" width="160%" height="200%">
    <feGaussianBlur stdDeviation="24"/>
   </filter>
  </defs>
  <circle cx={dark?1062:hybrid?869:765} cy={dark?270:hybrid?233:225} r={dark?330:410} fill={"url(#"+id+"solar)"}/>
  <g filter={"url(#"+id+"cloudblur)"} opacity={dark?".63":".66"}>
   <path d="M-120 240 Q180 105 580 175 T1220 128 T1790 207 L1730 259 Q1200 202 850 252 T-120 302Z" fill={"url(#"+id+"cloud)"}/>
   <path d="M-90 410 Q310 300 570 360 T1210 319 T1710 363 L1660 409 Q1150 383 800 421 T-90 468Z" fill={"url(#"+id+"cloud)"}/>
   <path d="M0 486 Q370 448 780 465 T1600 475 L1600 535 Q1000 490 640 523 T0 521Z" fill={glow} opacity=".16"/>
  </g>
  <path d={dark?"M1050 212 L675 900 H1380Z":"M786 170 L330 900 H1170Z"} fill={"url(#"+id+"sunshaft)"} opacity={dark?".22":".34"}/>
  <path d="M0 535 Q420 498 800 526 T1600 525" fill="none" stroke={glow} strokeOpacity={dark?".11":".23"} strokeWidth="4"/>
  <g opacity={dark?".31":".22"}>
    {[0,1,2,3,4,5].map(i=>{
      const x=52+i*302
      const height=54+(i*37)%93
      return <g key={i}>
       <path d={"M"+x+" 567 l"+(16+i%3*8)+" -"+height+" l"+(18+i%4*5)+" "+height+"Z"} fill={dark?"#110e1a":"#58747d"}/>
       <path d={"M"+(x+15)+" "+(567-height)+" v"+height} stroke={glow} strokeOpacity=".45" strokeWidth="1"/>
      </g>
    })}
  </g>
 </g>
}

function ArchitecturalForeground({dark,hybrid,id}:{dark:boolean;hybrid:boolean;id:string}) {
 const shade=hybrid?"#182f3d":dark?"#0a0e15":"#26444d"
 const gleam=hybrid?"#f2d8b0":dark?"#b9685f":"#f0f4dc"
 return <g aria-hidden="true">
   <g opacity=".78">
    <path d="M-20 395 L94 357 L166 719 L-20 761Z" fill={"url(#"+id+"stone2)"}/>
    <path d="M94 357 L141 390 L202 740 L166 719Z" fill={shade}/>
    <path d="M-20 381 L99 348 L146 375 L-20 422Z" fill={"url(#"+id+"stone)"} stroke={gleam} strokeOpacity=".3"/>
    <path d="M12 427 L103 400 L154 718" stroke={gleam} strokeOpacity=".19" strokeWidth="3" fill="none"/>
    <path d="M-20 752 L166 706 L218 745 L-20 819Z" fill={shade}/>
    <path d="M1434 358 L1620 398 L1620 766 L1391 721Z" fill={"url(#"+id+"stone2)"}/>
    <path d="M1391 721 L1434 358 L1462 387 L1434 745Z" fill={shade}/>
    <path d="M1413 350 L1620 385 L1620 429 L1371 380Z" fill={"url(#"+id+"stone)"} stroke={gleam} strokeOpacity=".3"/>
    <path d="M1480 402 L1600 430 L1600 723" stroke={gleam} strokeOpacity=".18" strokeWidth="3" fill="none"/>
    <path d="M1380 715 L1620 757 L1620 816 L1341 758Z" fill={shade}/>
   </g>
   <path d="M-40 820 L219 743 L281 900 H-40Z M1620 822 L1344 748 L1290 900 H1620Z" fill={shade} opacity=".65"/>
   <g fill="none" stroke={gleam} strokeOpacity={dark?".15":".24"}>
    <path d="M3 813 L199 762 M1405 754 L1600 797" strokeWidth="3"/>
    <path d="M-10 842 L224 784 M1380 784 L1620 844" strokeWidth="2"/>
   </g>
 </g>
}

const World=React.memo(function World({dark,charged,still,hybrid=false}:{dark:boolean;charged:boolean;still:boolean;hybrid?:boolean}){
 const id=hybrid?"convergence":dark?"decay":"paradise",face=hybrid?"#c4b2a4":dark?"#3b343c":"#d9dbcf",rim=hybrid?"#ffe6ba":dark?"#c07a6f":"#fff2dc",shade=hybrid?"#233b4b":dark?"#10131b":"#536f7d",light=hybrid?"#ffddae":dark?"#ff6455":"#fff6df"
 return <g>
  <defs>
   <linearGradient id={id+"sky"} x2="0" y2="1"><stop stopColor={hybrid?"#17263d":dark?"#060911":"#50737d"}/><stop offset=".63" stopColor={hybrid?"#7b7b7d":dark?"#67232d":"#bac6bf"}/><stop offset="1" stopColor={hybrid?"#a48078":dark?"#170d17":"#d4cfc0"}/></linearGradient>
   <radialGradient id={id+"sun"} cx={dark?"66%":"50%"} cy="40%" r="64%"><stop stopColor={light} stopOpacity={dark?".48":".73"}/><stop offset=".27" stopColor={light} stopOpacity=".14"/><stop offset="1" stopColor={light} stopOpacity="0"/></radialGradient>
   <linearGradient id={id+"stone"} x2="1" y2=".5"><stop stopColor={rim}/><stop offset=".45" stopColor={face}/><stop offset="1" stopColor={shade}/></linearGradient>
   <linearGradient id={id+"stone2"} x2="1" y2="0"><stop stopColor={shade}/><stop offset=".5" stopColor={rim}/><stop offset="1" stopColor={shade}/></linearGradient>
   <linearGradient id={id+"water"} x2="0" y2="1"><stop stopColor={hybrid?"#aa8a8b":dark?"#712a31":"#9baea8"}/><stop offset=".3" stopColor={hybrid?"#253845":dark?"#281623":"#375765"}/><stop offset="1" stopColor={hybrid?"#0a1221":dark?"#05060d":"#071a28"}/></linearGradient>
   <radialGradient id={id+"void"}><stop stopColor={hybrid?"#f8dcbb":dark?"#b74943":"#faffed"} stopOpacity=".55"/><stop offset=".56" stopColor={hybrid?"#557f84":dark?"#210d17":"#829ea3"}/><stop offset="1" stopColor={hybrid?"#1c3344":dark?"#060910":"#253e4b"}/></radialGradient>
   <filter id={id+"haze"}><feGaussianBlur stdDeviation="30"/></filter>

   <linearGradient id={id+"columnSurface"} x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stopColor={shade}/><stop offset=".15" stopColor={face}/>
    <stop offset=".35" stopColor={rim}/><stop offset=".52" stopColor={face}/>
    <stop offset=".83" stopColor={shade}/><stop offset="1" stopColor={shade}/>
   </linearGradient>
   <pattern id={id+"mineral"} patternUnits="userSpaceOnUse" width="74" height="90">
    <path d="M8 7 L17 38 L9 66 M48 2 L55 24 L50 52 L64 85 M27 12 L31 48 M3 82 L24 73"
       fill="none" stroke={dark?"#e8a0a0":"#5e706c"} strokeOpacity={dark?".18":".16"} strokeWidth=".8"/>
    <path d="M29 6 L30 48 L43 66 M58 38 L72 47" fill="none" stroke={rim} strokeOpacity=".18" strokeWidth=".6"/>
    <circle cx="21" cy="59" r="1.1" fill={shade} opacity=".22"/>
    <circle cx="63" cy="14" r=".8" fill={rim} opacity=".24"/>
   </pattern>
   <linearGradient id={id+"groundFalloff"} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={light} stopOpacity=".18"/>
    <stop offset=".45" stopColor={shade} stopOpacity=".16"/>
    <stop offset="1" stopColor="#020710" stopOpacity=".67"/>
   </linearGradient>
   <linearGradient id={id+"airHorizon"} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={light} stopOpacity="0"/>
    <stop offset=".55" stopColor={rim} stopOpacity={dark?".13":".21"}/>
    <stop offset="1" stopColor={light} stopOpacity="0"/>
   </linearGradient>

  </defs>
  <rect width="1600" height="900" fill={"url(#"+id+"sky)"}/>
  <rect width="1600" height="900" fill={"url(#"+id+"sun)"}/>
  <ellipse cx={dark?1040:800} cy="370" rx="390" ry="245" fill={light} opacity=".19" filter={"url(#"+id+"haze)"}/>
  <CinematicSky dark={dark} hybrid={hybrid} id={id}/>
  <g className={still?undefined:"parallel-drift"}>
  {dust.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={p.r} fill={light} opacity={.13+(i%4)*.12}/>)}
  </g>
  <path d="M0 567 Q270 536 470 557 T960 557 T1600 557 V690 H0Z" fill={shade} opacity=".32"/>
  <path d="M0 596 Q310 579 650 591 T1600 583 V700 H0Z" fill={face} opacity=".20"/>

  <g opacity={dark?".52":".63"}>
   <path d="M0 500 Q245 468 503 499 T970 495 T1600 506" fill="none" stroke={rim} strokeWidth="1.5" strokeOpacity=".30"/>
   <rect x="0" y="460" width="1600" height="169" fill={"url(#"+id+"airHorizon)"}/>
  </g>

  <g opacity=".69">
   {columns.map((x,i)=><g key={i} transform={dark&&(i===1||i===10)?"rotate("+(i===1?-6:7)+" "+x+" 552)":undefined}>
    <rect x={x} y="402" width="38" height="188" fill={"url(#"+id+"columnSurface)"} stroke={rim} strokeOpacity=".23"/>
    <rect x={x} y="402" width="38" height="188" fill={"url(#"+id+"mineral)"} opacity=".57"/>
    <path d={"M"+(x-6)+" 388 h50 v16 h-50Z M"+(x-8)+" 578 h54 v13 h-54Z"} fill={face}/>
    {[0,1,2,3].map(j=><path key={j} d={"M"+(x+6+j*8)+" 406 V578"} stroke={rim} strokeOpacity=".22"/>)}
   </g>)}
   <path d="M158 392 H560 L569 376 H164Z M1040 376 H1450 L1460 392 H1040Z" fill={"url(#"+id+"stone)"}/>
   <path d="M158 410 H565 M1040 410 H1455" stroke={rim} strokeWidth="4" opacity=".32"/>
  </g>
  <rect y="611" width="1600" height="289" fill={"url(#"+id+"water)"}/>
  <g className={still?undefined:"parallel-water"}>
  {ripples.map((v,i)=><path key={i} d={"M"+v.x+" "+v.y+" h"+v.w} stroke={i%3?rim:light} strokeOpacity={.025+(i%6)*.021} strokeWidth={i%9===0?2:1}/>)}
  </g>
  <path d="M800 622 L1220 900 H380Z" fill={light} opacity={dark?".055":".18"}/>
  <path d="M305 674 H1295 L1480 900 H120Z" fill={shade}/>
  <path d="M395 658 H1205 L1294 732 H306Z" fill={"url(#"+id+"stone2)"} stroke={rim} strokeOpacity=".30"/>
  <path d="M438 628 H1162 L1204 666 H396Z" fill={"url(#"+id+"stone)"} stroke={rim} strokeOpacity=".5"/>
  <path d="M466 609 H1134 L1172 630 H428Z" fill={shade}/>

  <path d="M329 700 H1271 L1398 900 H202Z" fill={"url(#"+id+"groundFalloff)"} opacity=".40"/>
  <path d="M472 633 H1128 L1155 645 H445Z" fill="#040a12" opacity=".28"/>
  <path d="M466 671 H1134" stroke={light} strokeOpacity=".16" strokeWidth="1.4"/>

  {Array.from({length:7},(_,i)=><path key={i} d={"M"+(355-i*37)+" "+(696+i*31)+" H"+(1245+i*37)} stroke={rim} strokeOpacity={i%2?".11":".27"} strokeWidth={i%2?1:3}/>)}
  {Array.from({length:19},(_,i)=><path key={i} d={"M"+(418+i*43)+" 673 L"+(205+i*64)+" 900"} stroke={rim} opacity=".08"/>)}
  <g>
   <path d="M513 613 L532 328 L651 297 V613Z" fill={"url(#"+id+"stone)"} stroke={rim} strokeOpacity=".37"/>
   <path d="M1087 613 L1068 328 L949 297 V613Z" fill={"url(#"+id+"stone2)"} stroke={rim} strokeOpacity=".37"/>
   {[0,1,2,3,4].map(i=><g key={i}><path d={"M"+(554+i*17)+" 348 V596"} stroke={rim} strokeWidth="3" opacity=".21"/><path d={"M"+(977+i*17)+" 348 V596"} stroke={rim} strokeWidth="3" opacity=".20"/></g>)}
   <path d="M627 626 V403 Q627 240 800 240 Q973 240 973 403 V626Z" fill={"url(#"+id+"void)"} stroke={shade} strokeWidth="61"/>
   <path d="M627 626 V403 Q627 240 800 240 Q973 240 973 403 V626" fill="none" stroke={rim} strokeWidth="9"/>
   <path d="M663 614 V400 Q663 279 800 279 Q937 279 937 400 V614" fill="none" stroke={light} strokeWidth="2" opacity=".25"/>

   <path d="M655 615 V401 Q655 277 800 277 Q945 277 945 401 V615"
     fill="none" stroke={light} strokeOpacity={dark?".085":".18"} strokeWidth="37"
     filter={"url(#"+id+"haze)"}/>
   <path d="M614 610 V403 Q614 229 800 229 Q986 229 986 403 V610"
     fill="none" stroke={shade} strokeOpacity=".55" strokeWidth="6"/>
   <path d="M647 616 V403 Q647 260 800 260 Q953 260 953 403 V616"
     fill="none" stroke={rim} strokeOpacity=".31" strokeWidth="2"/>
   <path d="M571 350 L621 325 L620 591 M1028 348 L976 326 L976 591"
     fill="none" stroke={shade} strokeOpacity=".40" strokeWidth="7"/>
   <path d="M565 353 L616 332 M1036 353 L983 332" fill="none" stroke={light} strokeOpacity=".30" strokeWidth="2"/>

   <path d="M501 331 L557 277 H1043 L1099 331Z" fill={"url(#"+id+"stone)"} stroke={rim} strokeOpacity=".54" strokeWidth="3"/>
   <path d="M531 319 H1069" stroke={light} opacity=".38" strokeWidth="5"/>
   <path d="M560 280 L618 260 H982 L1040 280Z" fill={shade}/>
   <path d="M601 261 H999 L966 239 H634Z" fill={face}/>
   <path d="M617 237 H983" stroke={rim} strokeWidth="4" opacity=".54"/>
   <path d="M540 613 H1060 L1081 637 H519Z" fill={face}/>
   <path d="M562 643 H1038" stroke={rim} opacity=".45" strokeWidth="3"/>

  <g opacity={dark?".45":".56"}>
   <path d="M537 350 L633 324 L633 603 H537Z" fill={"url(#"+id+"mineral)"}/>
   <path d="M963 324 L1065 350 V603 H963Z" fill={"url(#"+id+"mineral)"}/>
   <path d="M532 313 H1068 L1046 325 H554Z" fill={"url(#"+id+"mineral)"} opacity=".68"/>
  </g>

   
   {dark&&<g fill="none" stroke="#100d15" strokeWidth="8"><path d="M583 278 L613 308 L601 351 L627 379 L620 419 L651 458"/><path d="M983 300 L951 347 L968 395 L941 443 L955 487"/><path d="M647 241 L692 267 L725 255 L761 282"/></g>}
  </g>
  <g>
   <ellipse cx="800" cy="206" rx="152" ry="48" fill="none" stroke={shade} strokeWidth="32" opacity=".6"/>
   <ellipse cx="800" cy="193" rx="152" ry="48" fill="none" stroke={face} strokeWidth="21" strokeDasharray={dark?"313 26 57 25 68 42":undefined}/>
   <ellipse cx="800" cy="193" rx="152" ry="48" fill="none" stroke={light} strokeWidth="2" opacity=".62"/>
   <path d="M714 179 L742 152 H862 L887 179Z" fill={shade}/>
   <path d="M778 149 L800 106 L823 149" fill="none" stroke={rim} strokeWidth="3"/>
  </g>
  <path d="M237 321 L408 308 L422 332 L226 344Z M1196 302 L1371 308 L1387 331 L1181 321Z" fill={"url(#"+id+"stone)"} stroke={rim} strokeOpacity=".32"/>
  <path d="M263 342 L389 337 L378 356 L272 361Z M1219 326 L1356 334 L1342 352 L1235 348Z" fill={shade}/>
  {dark&&<g>
   {Array.from({length:22},(_,i)=>{const x=(i*149+105)%1470+20,y=(i*117+60)%470+135,s=6+(i*11)%17;return <path key={i} d={"M"+x+" "+y+" l"+s+" -"+s/3+" "+s/4+" "+s+" -"+s+" "+s/2+"Z"} fill={i%4?"#29222b":"#c46e5c"} opacity=".6" transform={"rotate("+(i*31)+" "+x+" "+y+")"}/>})}
   <path d="M202 585 Q243 507 235 470 M1263 589 Q1210 515 1227 460 M1111 641 Q1130 573 1113 531" fill="none" stroke="#383e35" strokeWidth="6" opacity=".6"/>
  </g>}
  <ArchitecturalForeground dark={dark} hybrid={hybrid} id={id}/>
  <Artifact dark={dark} charged={charged} still={still} scope={hybrid?"hybrid-":""}/>
  {hybrid&&<ConvergenceDetails still={still}/>}
  <ellipse cx="800" cy="666" rx="620" ry="75" fill={light} filter={"url(#"+id+"haze)"} opacity={dark?".05":".08"}/>
 </g>
})

/**
 * PARALLEL — THE REALITY ENGINE / Phase 1
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function ParallelReality({style,intro=true,initialSplit=44,artifactStartsCharged=false,previewHybrid=false}:Props){
 const root=useRef<HTMLDivElement>(null)
 const dragging=useRef<number|null>(null)
 const [entered,setEntered]=useState(!intro)
 const [split,setSplit]=useState(clamp(initialSplit,7,93))
 const [hint,setHint]=useState(true)
 const [artifactActive,setArtifactActive]=useState(artifactStartsCharged)
 const [motionOff,setMotionOff]=useState(false)
 const [parallax,setParallax]=useState([0,0])
 const moveFrame=useRef<number|null>(null)
 const pendingMove=useRef<{x:number;y:number;pointerType:string;dragging:boolean}|null>(null)
 const [exportState,setExportState]=useState<"idle"|"exporting"|"saved"|"error">("idle")
 const [fracturePower,setFracturePower]=useState(0)
 const fractureRef=useRef(0)
 const lastDrag=useRef({x:0,t:0})
 const decayFrame=useRef<number|null>(null)
 const [viewport,setViewport]=useState({width:1200,height:800})
 const [mergePhase,setMergePhase]=useState<"explore"|"implosion"|"flash"|"hybrid">(previewHybrid?"hybrid":"explore")
 const mergeTimers=useRef<number[]>([])
 useEffect(()=>{
  if(typeof window==="undefined")return
  const m=window.matchMedia("(prefers-reduced-motion: reduce)")
  const update=()=>setMotionOff(m.matches)
  update();m.addEventListener?.("change",update)
  return()=>m.removeEventListener?.("change",update)
 },[])
 useEffect(()=>{
  const el=root.current
  if(!el || typeof window==="undefined")return
  const measure=()=>{const r=el.getBoundingClientRect();if(r.width&&r.height)setViewport({width:r.width,height:r.height})}
  measure()
  if(typeof ResizeObserver==="undefined")return
  const observer=new ResizeObserver(measure)
  observer.observe(el)
  return ()=>observer.disconnect()
 },[])
 useEffect(()=>()=>{mergeTimers.current.forEach(t=>clearTimeout(t));if(moveFrame.current!==null&&typeof cancelAnimationFrame!=="undefined")cancelAnimationFrame(moveFrame.current);if(decayFrame.current!==null&&typeof cancelAnimationFrame!=="undefined")cancelAnimationFrame(decayFrame.current)},[])
 const startMerge=()=>{
   if(mergePhase!=="explore")return
   setHint(false)
   setArtifactActive(true)
   if(motionOff){setMergePhase("hybrid");return}
   fractureRef.current=0
   setFracturePower(0)
   setSplit(50)
   setMergePhase("implosion")
   mergeTimers.current.push(window.setTimeout(()=>setMergePhase("flash"),1240))
   mergeTimers.current.push(window.setTimeout(()=>setMergePhase("hybrid"),1860))
 }
 const saveHybridStill=async()=>{
  if(mergePhase!=="hybrid"||exportState==="exporting")return
  setExportState("exporting")
  let svgUrl:string|null=null
  try{
    const svg=root.current?.querySelector("svg")
    if(!svg)throw new Error("Scene not available")
    const snapshot=svg.cloneNode(true) as SVGSVGElement
    snapshot.setAttribute("xmlns","http://www.w3.org/2000/svg")
    snapshot.setAttribute("width","1600")
    snapshot.setAttribute("height","900")
    snapshot.removeAttribute("class")
    const payload=new XMLSerializer().serializeToString(snapshot)
    const svgBlob=new Blob([payload],{type:"image/svg+xml;charset=utf-8"})
    svgUrl=URL.createObjectURL(svgBlob)
    const artwork=new Image()
    const sourceUrl=svgUrl
    await new Promise<void>((resolve,reject)=>{
      artwork.onload=()=>resolve()
      artwork.onerror=()=>reject(new Error("Scene render failed"))
      artwork.src=sourceUrl
    })
    const canvas=document.createElement("canvas")
    canvas.width=2400
    canvas.height=1350
    const ctx=canvas.getContext("2d")
    if(!ctx)throw new Error("Canvas not supported")
    ctx.drawImage(artwork,0,0,2400,1350)
    const png=await new Promise<Blob>((resolve,reject)=>{
      canvas.toBlob(b=>b?resolve(b):reject(new Error("PNG export failed")),"image/png")
    })
    const downloadUrl=URL.createObjectURL(png)
    const anchor=document.createElement("a")
    anchor.href=downloadUrl
    anchor.download="PARALLEL_Convergence_2400x1350.png"
    anchor.style.display="none"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(()=>URL.revokeObjectURL(downloadUrl),3000)
    setExportState("saved")
  }catch(error){
    console.error("PARALLEL image capture:",error)
    setExportState("error")
  }finally{
    if(svgUrl)URL.revokeObjectURL(svgUrl)
  }
 }
 const restart=()=>{
   mergeTimers.current.forEach(t=>clearTimeout(t))
   mergeTimers.current=[]
   dragging.current=null
   if(decayFrame.current!==null){cancelAnimationFrame(decayFrame.current);decayFrame.current=null}
   fractureRef.current=0
   setFracturePower(0)
   setMergePhase("explore")
   setSplit(clamp(initialSplit,7,93))
   setArtifactActive(artifactStartsCharged)
   setParallax([0,0])
   setHint(true)
   setExportState("idle")
   setEntered(false)
 }
 const updateSplit=(clientX:number)=>{
  const r=root.current?.getBoundingClientRect()
  if(!r?.width)return
  const scale=Math.max(r.width/1600,r.height/900)
  const coordinate=800+(clientX-r.left-r.width/2)/scale
  setSplit(clamp(coordinate/16,7,93));setHint(false)
 }
 const onDown=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(!entered||mergePhase!=="explore"||(e.target as HTMLElement).closest("button"))return
  if(decayFrame.current!==null){cancelAnimationFrame(decayFrame.current);decayFrame.current=null}
  lastDrag.current={x:e.clientX,t:performance.now()}
  dragging.current=e.pointerId
  e.currentTarget.setPointerCapture(e.pointerId)
  updateSplit(e.clientX)
 }
 const onMove=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(!entered||mergePhase!=="explore")return
  const isDragging=dragging.current===e.pointerId
  if(!isDragging&&(motionOff||e.pointerType==="touch"))return
  pendingMove.current={x:e.clientX,y:e.clientY,pointerType:e.pointerType,dragging:isDragging}
  if(moveFrame.current!==null)return
  moveFrame.current=requestAnimationFrame(()=>{
    moveFrame.current=null
    const m=pendingMove.current
    pendingMove.current=null
    if(!m)return
    if(m.dragging){
      updateSplit(m.x)
      if(!motionOff){
        const now=performance.now()
        const dt=Math.max(now-lastDrag.current.t,12)
        const speed=Math.abs(m.x-lastDrag.current.x)/dt
        const power=clamp(speed*.62,0,1)
        fractureRef.current=Math.max(power,fractureRef.current*.76)
        setFracturePower(fractureRef.current)
        lastDrag.current={x:m.x,t:now}
      }
    }
    if(!motionOff&&m.pointerType!=="touch"){
      const r=root.current?.getBoundingClientRect()
      if(r?.width)setParallax([clamp((m.x-r.left)/r.width-.5,-.5,.5),clamp((m.y-r.top)/r.height-.5,-.5,.5)])
    }
  })
 }
 const onUp=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(dragging.current!==e.pointerId)return
  dragging.current=null
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)
  if(motionOff){fractureRef.current=0;setFracturePower(0);return}
  const settle=()=>{
    fractureRef.current*=.76
    const done=fractureRef.current<.012
    if(done)fractureRef.current=0
    setFracturePower(fractureRef.current)
    decayFrame.current=done?null:requestAnimationFrame(settle)
  }
  if(decayFrame.current!==null)cancelAnimationFrame(decayFrame.current)
  decayFrame.current=requestAnimationFrame(settle)
 }
 const x=split*16, line=edge(x,motionOff?0:fracturePower), mask=clip(x,motionOff?0:fracturePower),rightMask=clipRight(x,motionOff?0:fracturePower)
 const seamX=viewport.width/2+(x-800)*Math.max(viewport.width/1600,viewport.height/900)
 const offset=motionOff?undefined:"translate("+(-parallax[0]*15)+" "+(-parallax[1]*9)+")"
 const tiny:React.CSSProperties={font:"600 9px/1.9 Arial,sans-serif",letterSpacing:".2em"}
 return <div ref={root} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={()=>{if(!motionOff&&dragging.current===null)setParallax([0,0])}} style={{...style,position:"relative",width:"100%",height:"100%",minHeight:420,overflow:"hidden",isolation:"isolate",color:"#f6f3ea",background:"#050810",fontFamily:"Arial,sans-serif",userSelect:"none",WebkitUserSelect:"none",touchAction:entered?"none":"auto",cursor:entered&&mergePhase==="explore"?"ew-resize":"default"}}>
  <style>{`
    @keyframes parallel-scene-arrive {
      0% {opacity:.18;transform:scale(1.065)}
      45% {opacity:.84}
      100% {opacity:1;transform:scale(1)}
    }
    @keyframes parallel-atmosphere-drift {
      0%,100% {transform:translate(0px,0px);opacity:1}
      50% {transform:translate(9px,-8px);opacity:.76}
    }
    @keyframes parallel-water-glint {
      0%,100% {transform:translate(0px,0px);opacity:.83}
      50% {transform:translate(-4px,2px);opacity:1}
    }
    .parallel-world-enter {transform-origin:center;animation:parallel-scene-arrive 1250ms cubic-bezier(.16,.7,.2,1) both}
    .parallel-drift {animation:parallel-atmosphere-drift 20s ease-in-out infinite}
    .parallel-water {animation:parallel-water-glint 11s ease-in-out infinite}
    @keyframes parallel-crush-left {
      0% {transform:translate(0,0) scale(1);opacity:1}
      18% {transform:translate(-45px,0) scale(1.025);opacity:1}
      64% {transform:translate(135px,5px) scale(.91);opacity:1}
      100% {transform:translate(320px,22px) scale(.48);opacity:0}
    }
    @keyframes parallel-crush-right {
      0% {transform:translate(0,0) scale(1);opacity:1}
      18% {transform:translate(45px,0) scale(1.025);opacity:1}
      64% {transform:translate(-135px,-5px) scale(.91);opacity:1}
      100% {transform:translate(-320px,-22px) scale(.48);opacity:0}
    }
    @keyframes parallel-shock {
      0% {transform:translate(-50%,-50%) scale(.16);opacity:0}
      20% {opacity:.8}
      100% {transform:translate(-50%,-50%) scale(4.6);opacity:0}
    }
    @keyframes parallel-flash {
      0% {opacity:0} 15% {opacity:.94} 48% {opacity:.76} 100% {opacity:0}
    }
    @keyframes parallel-arrival {
      0% {opacity:0;transform:translate(-50%,22px)}
      100% {opacity:1;transform:translate(-50%,0px)}
    }
    @keyframes parallel-orbit-rotation {
      0% {transform:rotate(-4deg)} 50% {transform:rotate(4deg)} 100% {transform:rotate(-4deg)}
    }
    .parallel-crush-left,.parallel-crush-right {transform-origin:800px 450px}
    .parallel-crush-left {animation:parallel-crush-left 1.24s cubic-bezier(.6,.02,.5,1) both}
    .parallel-crush-right {animation:parallel-crush-right 1.24s cubic-bezier(.6,.02,.5,1) both}
    .parallel-orbit {animation:parallel-orbit-rotation 7s ease-in-out infinite}
    .parallel-merge-button:hover {background:rgba(255,235,206,.16) !important;border-color:rgba(255,240,225,.86) !important}
    .parallel-merge-button:focus-visible,.parallel-restart:focus-visible {outline:2px solid #fff3d8;outline-offset:5px}
    @media (prefers-reduced-motion:reduce) {
      .parallel-crush-left,.parallel-crush-right,.parallel-orbit,.parallel-world-enter,.parallel-drift,.parallel-water {animation:none !important}
      .parallel-merge-button,.parallel-restart {transition:none !important}
    }
`}</style>
  <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two synchronized monumental architectural worlds" className={entered&&!motionOff?"parallel-world-enter":undefined} style={{position:"absolute",width:"100%",height:"100%",inset:0,pointerEvents:"none"}}>
   <defs>
    <clipPath id="parallel-reality-cut"><path d={mask}/></clipPath>
    <clipPath id="parallel-reality-right"><path d={rightMask}/></clipPath>
    <linearGradient id="parallel-beam"><stop stopColor="#f76b59"/><stop offset=".5" stopColor="#fff8e7"/><stop offset="1" stopColor="#a9f3ff"/></linearGradient>
    <filter id="parallel-glow" x="-85%" y="-20%" width="270%" height="140%"><feGaussianBlur stdDeviation="12"/></filter>
   </defs>
   {mergePhase!=="hybrid"&&<g opacity={1} style={{transition:motionOff?"none":"opacity .35s ease"}}>
    <g clipPath="url(#parallel-reality-cut)" transform={offset}>
      <g className={mergePhase==="implosion"?"parallel-crush-left":undefined}><World dark={true} charged={mergePhase==="explore"?artifactActive:true} still={motionOff}/></g>
    </g>
    <g clipPath="url(#parallel-reality-right)" transform={offset}>
      <g className={mergePhase==="implosion"?"parallel-crush-right":undefined}><World dark={false} charged={mergePhase==="explore"?artifactActive:true} still={motionOff}/></g>
    </g>
   </g>}
   {(mergePhase==="flash"||mergePhase==="hybrid")&&<g opacity={mergePhase==="hybrid"?1:0} style={{transition:motionOff?"none":"opacity .8s ease"}}>
    <g transform={offset}><World dark={false} charged={true} hybrid={true} still={motionOff}/></g>
   </g>}
   {entered&&mergePhase==="explore"&&<>
    <path d={line} stroke="#ff5b4b" strokeOpacity={.28+fracturePower*.34} strokeWidth={54+fracturePower*30} fill="none" filter="url(#parallel-glow)"/>
    <path d={line} stroke="#9beaff" strokeOpacity={.27+fracturePower*.21} strokeWidth={18+fracturePower*14} fill="none" filter="url(#parallel-glow)"/>
    <path d={line} stroke="#070710" strokeOpacity=".57" strokeWidth="8" fill="none"/>
    <path d={line} stroke="#fff1da" strokeWidth={3+fracturePower*2.4} fill="none"/>
    {Array.from({length:42},(_,i)=>{const y=(i*47+20)%860+15;return <circle key={i} cx={wiggle(x,y,fracturePower)+Math.sin(i*8.2)*((i%4)+2)*5*(1+fracturePower)} cy={y} r={(i%8?1:2.6)*(1+fracturePower*.66)} fill={i%3?"#f4f2df":"#ff6a57"} opacity={.25+i%4*.12}/>})}
    <g transform={"translate("+x+" 451)"}><circle r={28+fracturePower*9} fill="#091019" fillOpacity=".3" stroke="#f0eee3" strokeOpacity=".7"/><circle r="17" stroke="#f0eee3" strokeOpacity=".35" fill="none"/><path d="M-10 0 H10 M0 -10 V10 M-36 0 H-29 M29 0 H36" stroke="#fff" strokeWidth="1.2"/></g>
   </>}
  </svg>
  <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(180deg,rgba(3,7,14,.4),transparent 31%,transparent 59%,rgba(2,5,12,.72))"}}/>
  <header style={{position:"absolute",left:0,right:0,top:0,zIndex:2,padding:"clamp(22px,3.3vw,53px)",display:"flex",justifyContent:"space-between",gap:14,pointerEvents:"none"}}>
   <div><div style={{font:"normal clamp(23px,2.2vw,34px) Georgia,serif",letterSpacing:"-.075em",lineHeight:1}}>PARALLEL<span style={{color:"#e67a68"}}>•</span></div><div style={{...tiny,letterSpacing:".27em",opacity:.75,marginTop:9}}>THE REALITY ENGINE</div></div>
   <div style={{...tiny,textAlign:"right",opacity:.76}}>{mergePhase==="hybrid"?"CONVERGENCE / 003":"EXPERIMENT / 001"}<div>{mergePhase==="hybrid"?"THE THIRD POSSIBILITY":"AN INTERACTIVE SPECULATION"}</div></div>
  </header>
  {mergePhase==="explore"&&<footer style={{position:"absolute",left:"clamp(22px,3.3vw,53px)",right:"clamp(22px,3.3vw,53px)",bottom:"clamp(22px,3.3vw,53px)",zIndex:2,display:"flex",justifyContent:"space-between",alignItems:"end",gap:20,pointerEvents:"none"}}>
   <div style={tiny}><div style={{color:"#ffb0a1"}}>01 / COLLAPSE</div><div>02 / UTOPIA</div><div style={{width:48,height:1,background:"#ffffff72",marginTop:10}}/></div>
   <div style={{...tiny,textAlign:"right",opacity:.82}}><div>EVERY WORLD IS POSSIBLE</div><div style={{opacity:.65}}>DRAG / TOUCH / ARROW KEYS</div></div>
  </footer>}
  {entered&&mergePhase==="explore"&&<div style={{position:"absolute",zIndex:4,top:"53.5%",left:"50%",transform:"translate(-50%,-50%)",display:"flex",alignItems:"center",flexDirection:"column",gap:0}}>
   <button type="button" title={artifactActive?"Reseal the artifact":"Transform the artifact"} aria-label={artifactActive?"Reseal the cross-reality artifact":"Activate the cross-reality artifact"} aria-pressed={artifactActive} onPointerDown={e=>e.stopPropagation()} onClick={()=>{setArtifactActive(v=>!v);setHint(false)}} style={{width:"clamp(148px,14vw,180px)",height:"clamp(200px,20vw,235px)",border:"1px solid transparent",outlineOffset:4,borderRadius:"50%",background:"transparent",cursor:"pointer",color:"#f4f4ec"}}/>
   <div aria-live="polite" style={{pointerEvents:"none",marginTop:"-5px",textAlign:"center",whiteSpace:"nowrap",font:"700 9px/1.6 Arial,sans-serif",letterSpacing:".20em",color:artifactActive?"#fce8d3":"#f2f1e8",textShadow:"0 2px 14px #000"}}>
     <div style={{fontSize:8,opacity:.63,marginBottom:4}}>ANOMALY / 001</div>
     {artifactActive?"RESONANCE UNBOUND":"TOUCH TO TRANSFORM"}
   </div>
  </div>}
  {entered&&mergePhase==="explore"&&<>
   <div style={{position:"absolute",top:"74%",left:"50%",transform:"translate(-50%,-50%)",zIndex:3,padding:"12px 17px",whiteSpace:"nowrap",pointerEvents:"none",font:"700 9px Arial,sans-serif",letterSpacing:".2em",background:"rgba(4,8,15,.5)",border:"1px solid #ffffff49",backdropFilter:"blur(8px)",opacity:hint?1:0,transition:motionOff?"none":"opacity .45s"}}>DRAG TO REWRITE REALITY</div>
   <div tabIndex={0} role="slider" aria-label="Reality fracture" aria-valuemin={7} aria-valuemax={93} aria-valuenow={Math.round(split)} aria-valuetext={Math.round(split)+" percent Collapse revealed"} onKeyDown={e=>{let d=0;if(e.key==="ArrowLeft"||e.key==="ArrowDown")d=-3;if(e.key==="ArrowRight"||e.key==="ArrowUp")d=3;if(e.key==="Home")d=-100;if(e.key==="End")d=100;if(d){e.preventDefault();setSplit(v=>clamp(v+d,7,93));setHint(false)}}} style={{position:"absolute",zIndex:4,left:seamX,top:"50%",width:45,height:70,transform:"translate(-50%,-50%)",background:"transparent",outlineOffset:5,cursor:"ew-resize"}}/>
  </>}

  {entered&&mergePhase==="explore"&&<button type="button" className="parallel-merge-button"
    onPointerDown={e=>e.stopPropagation()} onClick={startMerge}
    style={{position:"absolute",zIndex:5,bottom:"clamp(99px,14%,145px)",left:"50%",transform:"translateX(-50%)",
      minHeight:47,maxWidth:"calc(100% - 40px)",width:"max-content",padding:"14px clamp(18px,2.8vw,30px)",whiteSpace:"nowrap",
      background:"rgba(7,10,19,.63)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
      border:"1px solid rgba(255,236,212,.51)",borderRadius:1,
      color:"#fff0dc",font:"700 clamp(9px,1vw,11px)/1.4 Arial,sans-serif",letterSpacing:".2em",cursor:"pointer",
      boxShadow:"0 0 38px rgba(255,175,122,.13),0 13px 45px rgba(0,0,0,.20)",
      transition:motionOff?"none":"background .3s,border .3s"}}>
    <span style={{marginRight:14,color:"#f5af8a"}} aria-hidden="true">✧</span>MERGE THE IMPOSSIBLE<span style={{marginLeft:14,color:"#f5af8a"}} aria-hidden="true">↘↙</span>
  </button>}
  {entered&&mergePhase==="implosion"&&<div role="status" aria-live="polite"
    style={{position:"absolute",zIndex:7,left:"50%",top:"72%",transform:"translate(-50%,-50%)",
    whiteSpace:"nowrap",padding:"12px 20px",font:"700 10px Arial,sans-serif",letterSpacing:".22em",
    background:"rgba(13,13,20,.65)",color:"#fff5e6",border:"1px solid rgba(255,242,216,.45)",pointerEvents:"none"}}>
    REALITIES CONVERGING
  </div>}
  {entered&&mergePhase==="implosion"&&!motionOff&&<div aria-hidden="true"
    style={{position:"absolute",zIndex:4,top:"50%",left:"50%",width:220,height:220,
      border:"2px solid rgba(255,230,194,.85)",borderRadius:"50%",
      boxShadow:"0 0 90px 20px rgba(254,168,130,.3)",pointerEvents:"none",
      animation:"parallel-shock 1.22s ease-out both"}}/>}
  {entered&&mergePhase==="flash"&&<div aria-hidden="true"
    style={{position:"absolute",inset:0,zIndex:8,pointerEvents:"none",
      background:"radial-gradient(ellipse at 50% 48%,rgba(255,252,218,.98),rgba(245,195,151,.90) 31%,rgba(18,19,35,.95) 85%)",
      animation:motionOff?"none":"parallel-flash .67s ease-out both"}}/>}
  {entered&&mergePhase==="hybrid"&&<>
    <div aria-hidden="true" style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
      background:"linear-gradient(180deg,rgba(4,10,21,.10),transparent 42%,rgba(4,9,18,.15) 53%,rgba(3,9,17,.86) 100%)"}}/>
    <div role="status" aria-live="polite"
      style={{position:"absolute",zIndex:6,left:"50%",bottom:"clamp(28px,5.3%,68px)",
        transform:"translateX(-50%)",width:"calc(100% - 42px)",maxWidth:860,textAlign:"center",
        pointerEvents:"auto",color:"#fff0df",animation:motionOff?"none":"parallel-arrival 1.1s cubic-bezier(.15,.7,.23,1) both"}}>
      <div style={{...tiny,fontSize:9,letterSpacing:".35em",color:"#eed0a8",marginBottom:14}}>03 / CONVERGENCE — NEW EXISTENCE</div>
      <h2 style={{font:"normal clamp(25px,3.8vw,53px)/1.05 Georgia,serif",letterSpacing:"-.047em",
        margin:"0 auto 22px",maxWidth:835,textShadow:"0 4px 35px rgba(0,0,0,.7)"}}>
        YOU HAVE CREATED A REALITY <i>THAT NEVER EXISTED.</i>
      </h2>
      <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",alignItems:"center",gap:9}}>
        <button type="button" className="parallel-restart" onPointerDown={e=>e.stopPropagation()} onClick={restart}
          style={{background:"rgba(8,17,26,.58)",border:"1px solid rgba(255,230,204,.71)",color:"#fff0dc",
            padding:"12px 17px",letterSpacing:".16em",font:"700 9px Arial,sans-serif",cursor:"pointer",borderRadius:1,minHeight:43}}>
          ↺ &nbsp; RESTART
        </button>
        <button type="button" className="parallel-restart" disabled={exportState==="exporting"}
          onPointerDown={e=>e.stopPropagation()} onClick={saveHybridStill}
          aria-label="Save the resulting hybrid world as a 2400 by 1350 PNG image"
          style={{background:"rgba(8,17,26,.58)",border:"1px solid rgba(255,230,204,.71)",color:"#fff0dc",
            padding:"12px 17px",letterSpacing:".16em",font:"700 9px Arial,sans-serif",cursor:exportState==="exporting"?"progress":"pointer",borderRadius:1,minHeight:43,opacity:exportState==="exporting"?.66:1}}>
          ↓ &nbsp; {exportState==="exporting"?"RENDERING PNG":exportState==="saved"?"DOWNLOAD STARTED":"SAVE WORLD STILL"}
        </button>
      </div>
      {exportState==="error"&&<div role="alert" style={{marginTop:8,font:"500 10px Arial,sans-serif",color:"#ffbfaf"}}>Image export is unavailable in this browser.</div>}
    </div>
  </>}
  {!entered&&<div style={{position:"absolute",inset:0,zIndex:5,padding:"100px 24px",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:25,textAlign:"center",background:"linear-gradient(90deg,#050811c2,#05091171 50%,#050811b5)"}}>
   <div style={{...tiny,letterSpacing:".4em",opacity:.85}}>A STUDY IN ALTERNATE EXISTENCE</div>
   <h1 style={{margin:0,font:"normal clamp(38px,6.2vw,104px)/1.01 Georgia,serif",letterSpacing:"-.065em",textShadow:"0 9px 50px #0009",maxWidth:1200}}>REALITY IS ONLY<br/><i>A PERSPECTIVE.</i></h1>
   <div style={{height:52,width:1,background:"linear-gradient(#f1eee0b0,transparent)",marginTop:3}}/>
   <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setEntered(true)} style={{display:"flex",alignItems:"center",gap:18,padding:"15px 4px",border:0,borderBottom:"1px solid #eee7dca8",background:"transparent",color:"#f8f1e2",cursor:"pointer",font:"700 10px Arial,sans-serif",letterSpacing:".27em"}}>ENTER REALITY <span aria-hidden="true" style={{fontSize:22,fontWeight:300,lineHeight:0}}>↗</span></button>

  </div>}
 </div>
}
addPropertyControls(ParallelReality,{intro:{type:ControlType.Boolean,title:"Opening",defaultValue:true},initialSplit:{type:ControlType.Number,title:"Fracture",defaultValue:44,min:7,max:93,step:1},artifactStartsCharged:{type:ControlType.Boolean,title:"Artifact Charged",defaultValue:false},previewHybrid:{type:ControlType.Boolean,title:"Preview Hybrid",defaultValue:false}})
