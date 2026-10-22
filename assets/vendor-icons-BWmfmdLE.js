import{R as _,r as Ga}from"./vendor-react-vhtDNw-h.js";function Oe(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Va(e){if(Array.isArray(e))return e}function Xa(e){if(Array.isArray(e))return Oe(e)}function Ka(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Ja(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Mt(r.key),r)}}function qa(e,t,a){return t&&Ja(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function se(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Ye(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||a.return==null||a.return()}finally{if(s)throw i}}}}function h(e,t,a){return(t=Mt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Qa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Za(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function er(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function tr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function tt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?tt(Object(a),!0).forEach(function(r){h(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):tt(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function he(e,t){return Va(e)||Za(e,t)||Ye(e,t)||er()}function O(e){return Xa(e)||Qa(e)||Ye(e)||tr()}function ar(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Mt(e){var t=ar(e,"string");return typeof t=="symbol"?t:t+""}function ue(e){"@babel/helpers - typeof";return ue=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ue(e)}function Ye(e,t){if(e){if(typeof e=="string")return Oe(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Oe(e,t):void 0}}var at=function(){},He={},$t={},zt=null,Dt={mark:at,measure:at};try{typeof window<"u"&&(He=window),typeof document<"u"&&($t=document),typeof MutationObserver<"u"&&(zt=MutationObserver),typeof performance<"u"&&(Dt=performance)}catch{}var rr=He.navigator||{},rt=rr.userAgent,nt=rt===void 0?"":rt,$=He,x=$t,it=zt,ie=Dt;$.document;var M=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",Rt=~nt.indexOf("MSIE")||~nt.indexOf("Trident/"),we,nr=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,ir=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Wt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},or={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Ut=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],P="classic",te="duotone",Yt="sharp",Ht="sharp-duotone",Bt="chisel",Gt="etch",Vt="jelly",Xt="jelly-duo",Kt="jelly-fill",Jt="notdog",qt="notdog-duo",Qt="slab",Zt="slab-press",ea="thumbprint",ta="utility",aa="utility-duo",ra="utility-fill",na="whiteboard",sr="Classic",lr="Duotone",fr="Sharp",ur="Sharp Duotone",cr="Chisel",dr="Etch",mr="Jelly",vr="Jelly Duo",hr="Jelly Fill",pr="Notdog",gr="Notdog Duo",br="Slab",yr="Slab Press",xr="Thumbprint",wr="Utility",Sr="Utility Duo",Ar="Utility Fill",kr="Whiteboard",ia=[P,te,Yt,Ht,Bt,Gt,Vt,Xt,Kt,Jt,qt,Qt,Zt,ea,ta,aa,ra,na];we={},h(h(h(h(h(h(h(h(h(h(we,P,sr),te,lr),Yt,fr),Ht,ur),Bt,cr),Gt,dr),Vt,mr),Xt,vr),Kt,hr),Jt,pr),h(h(h(h(h(h(h(h(we,qt,gr),Qt,br),Zt,yr),ea,xr),ta,wr),aa,Sr),ra,Ar),na,kr);var Pr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},Ir={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},Er=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),Or={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},oa=["fak","fa-kit","fakd","fa-kit-duotone"],ot={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Fr=["kit"],Cr="kit",Nr="kit-duotone",jr="Kit",_r="Kit Duotone";h(h({},Cr,jr),Nr,_r);var Tr={kit:{"fa-kit":"fak"}},Lr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Mr={kit:{fak:"fa-kit"}},st={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Se,oe={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},$r=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],zr="classic",Dr="duotone",Rr="sharp",Wr="sharp-duotone",Ur="chisel",Yr="etch",Hr="jelly",Br="jelly-duo",Gr="jelly-fill",Vr="notdog",Xr="notdog-duo",Kr="slab",Jr="slab-press",qr="thumbprint",Qr="utility",Zr="utility-duo",en="utility-fill",tn="whiteboard",an="Classic",rn="Duotone",nn="Sharp",on="Sharp Duotone",sn="Chisel",ln="Etch",fn="Jelly",un="Jelly Duo",cn="Jelly Fill",dn="Notdog",mn="Notdog Duo",vn="Slab",hn="Slab Press",pn="Thumbprint",gn="Utility",bn="Utility Duo",yn="Utility Fill",xn="Whiteboard";Se={},h(h(h(h(h(h(h(h(h(h(Se,zr,an),Dr,rn),Rr,nn),Wr,on),Ur,sn),Yr,ln),Hr,fn),Br,un),Gr,cn),Vr,dn),h(h(h(h(h(h(h(h(Se,Xr,mn),Kr,vn),Jr,hn),qr,pn),Qr,gn),Zr,bn),en,yn),tn,xn);var wn="kit",Sn="kit-duotone",An="Kit",kn="Kit Duotone";h(h({},wn,An),Sn,kn);var Pn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},In={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Fe={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},En=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],sa=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat($r,En),On=["solid","regular","light","thin","duotone","brands","semibold"],la=[1,2,3,4,5,6,7,8,9,10],Fn=la.concat([11,12,13,14,15,16,17,18,19,20]),Cn=["aw","fw","pull-left","pull-right"],Nn=[].concat(O(Object.keys(In)),On,Cn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",oe.GROUP,oe.SWAP_OPACITY,oe.PRIMARY,oe.SECONDARY]).concat(la.map(function(e){return"".concat(e,"x")})).concat(Fn.map(function(e){return"w-".concat(e)})),jn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},T="___FONT_AWESOME___",Ce=16,fa="fa",ua="svg-inline--fa",W="data-fa-i2svg",Ne="data-fa-pseudo-element",_n="data-fa-pseudo-element-pending",Be="data-prefix",Ge="data-icon",lt="fontawesome-i2svg",Tn="async",Ln=["HTML","HEAD","STYLE","SCRIPT"],ca=["::before","::after",":before",":after"],da=(function(){try{return!0}catch{return!1}})();function ae(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[P]}})}var ma=f({},Wt);ma[P]=f(f(f(f({},{"fa-duotone":"duotone"}),Wt[P]),ot.kit),ot["kit-duotone"]);var Mn=ae(ma),je=f({},Or);je[P]=f(f(f(f({},{duotone:"fad"}),je[P]),st.kit),st["kit-duotone"]);var ft=ae(je),_e=f({},Fe);_e[P]=f(f({},_e[P]),Mr.kit);var Ve=ae(_e),Te=f({},Pn);Te[P]=f(f({},Te[P]),Tr.kit);ae(Te);var $n=nr,va="fa-layers-text",zn=ir,Dn=f({},Pr);ae(Dn);var Rn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ae=or,Wn=[].concat(O(Fr),O(Nn)),J=$.FontAwesomeConfig||{};function Un(e){var t=x.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Yn(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(x&&typeof x.querySelector=="function"){var Hn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Hn.forEach(function(e){var t=he(e,2),a=t[0],r=t[1],n=Yn(Un(a));n!=null&&(J[r]=n)})}var ha={styleDefault:"solid",familyDefault:P,cssPrefix:fa,replacementClass:ua,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};J.familyPrefix&&(J.cssPrefix=J.familyPrefix);var V=f(f({},ha),J);V.autoReplaceSvg||(V.observeMutations=!1);var m={};Object.keys(ha).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){V[e]=a,q.forEach(function(r){return r(m)})},get:function(){return V[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){V.cssPrefix=t,q.forEach(function(a){return a(m)})},get:function(){return V.cssPrefix}});$.FontAwesomeConfig=m;var q=[];function Bn(e){return q.push(e),function(){q.splice(q.indexOf(e),1)}}var Y=Ce,F={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Gn(e){if(!(!e||!M)){var t=x.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=x.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return x.head.insertBefore(t,r),e}}var Vn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ut(){for(var e=12,t="";e-- >0;)t+=Vn[Math.random()*62|0];return t}function X(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function Xe(e){return e.classList?X(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function pa(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Xn(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(pa(e[a]),'" ')},"").trim()}function pe(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Ke(e){return e.size!==F.size||e.x!==F.x||e.y!==F.y||e.rotate!==F.rotate||e.flipX||e.flipY}function Kn(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function Jn(e){var t=e.transform,a=e.width,r=a===void 0?Ce:a,n=e.height,i=n===void 0?Ce:n,o="";return Rt?o+="translate(".concat(t.x/Y-r/2,"em, ").concat(t.y/Y-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/Y,"em), calc(-50% + ").concat(t.y/Y,"em)) "),o+="scale(".concat(t.size/Y*(t.flipX?-1:1),", ").concat(t.size/Y*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var qn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
  --fa-font-utility-semibold: normal 600 1em/1 "Font Awesome 7 Utility";
  --fa-font-utility-duo-semibold: normal 600 1em/1 "Font Awesome 7 Utility Duo";
  --fa-font-utility-fill-semibold: normal 600 1em/1 "Font Awesome 7 Utility Fill";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function ga(){var e=fa,t=ua,a=m.cssPrefix,r=m.replacementClass,n=qn;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var ct=!1;function ke(){m.autoAddCss&&!ct&&(Gn(ga()),ct=!0)}var Qn={mixout:function(){return{dom:{css:ga,insertCss:ke}}},hooks:function(){return{beforeDOMElementCreation:function(){ke()},beforeI2svg:function(){ke()}}}},L=$||{};L[T]||(L[T]={});L[T].styles||(L[T].styles={});L[T].hooks||(L[T].hooks={});L[T].shims||(L[T].shims=[]);var E=L[T],ba=[],ya=function(){x.removeEventListener("DOMContentLoaded",ya),ce=1,ba.map(function(t){return t()})},ce=!1;M&&(ce=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),ce||x.addEventListener("DOMContentLoaded",ya));function Zn(e){M&&(ce?setTimeout(e,0):ba.push(e))}function re(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?pa(e):"<".concat(t," ").concat(Xn(r),">").concat(i.map(re).join(""),"</").concat(t,">")}function dt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Pe=function(t,a,r,n){var i=Object.keys(t),o=i.length,s=a,l,u,c;for(r===void 0?(l=1,c=t[i[0]]):(l=0,c=r);l<o;l++)u=i[l],c=s(c,t[u],u,t);return c};function xa(e){return O(e).length!==1?null:e.codePointAt(0).toString(16)}function mt(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function Le(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=mt(t);typeof E.hooks.addPack=="function"&&!n?E.hooks.addPack(e,mt(t)):E.styles[e]=f(f({},E.styles[e]||{}),i),e==="fas"&&Le("fa",t)}var Z=E.styles,ei=E.shims,wa=Object.keys(Ve),ti=wa.reduce(function(e,t){return e[t]=Object.keys(Ve[t]),e},{}),Je=null,Sa={},Aa={},ka={},Pa={},Ia={};function ai(e){return~Wn.indexOf(e)}function ri(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!ai(n)?n:null}var Ea=function(){var t=function(i){return Pe(Z,function(o,s,l){return o[l]=Pe(s,i,{}),o},{})};Sa=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=o})}return n}),Aa=t(function(n,i,o){if(n[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=o})}return n}),Ia=t(function(n,i,o){var s=i[2];return n[o]=o,s.forEach(function(l){n[l]=o}),n});var a="far"in Z||m.autoFetchSvg,r=Pe(ei,function(n,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!a&&(s="fas"),typeof o=="string"&&(n.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});ka=r.names,Pa=r.unicodes,Je=ge(m.styleDefault,{family:m.familyDefault})};Bn(function(e){Je=ge(e.styleDefault,{family:m.familyDefault})});Ea();function qe(e,t){return(Sa[e]||{})[t]}function ni(e,t){return(Aa[e]||{})[t]}function R(e,t){return(Ia[e]||{})[t]}function Oa(e){return ka[e]||{prefix:null,iconName:null}}function ii(e){var t=Pa[e],a=qe("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function z(){return Je}var Fa=function(){return{prefix:null,iconName:null,rest:[]}};function oi(e){var t=P,a=wa.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return ia.forEach(function(r){(e.includes(a[r])||e.some(function(n){return ti[r].includes(n)}))&&(t=r)}),t}function ge(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?P:a,n=Mn[r][e];if(r===te&&!e)return"fad";var i=ft[r][e]||ft[r][n],o=e in E.styles?e:null,s=i||o||null;return s}function si(e){var t=[],a=null;return e.forEach(function(r){var n=ri(m.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function vt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var ht=sa.concat(oa);function be(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=vt(e.filter(function(v){return ht.includes(v)})),o=vt(e.filter(function(v){return!ht.includes(v)})),s=i.filter(function(v){return n=v,!Ut.includes(v)}),l=he(s,1),u=l[0],c=u===void 0?null:u,d=oi(i),p=f(f({},si(o)),{},{prefix:ge(c,{family:d})});return f(f(f({},p),ci({values:e,family:d,styles:Z,config:m,canonical:p,givenPrefix:n})),li(r,n,p))}function li(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?Oa(n):{},o=R(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!Z.far&&Z.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var fi=ia.filter(function(e){return e!==P||e!==te}),ui=Object.keys(Fe).filter(function(e){return e!==P}).map(function(e){return Object.keys(Fe[e])}).flat();function ci(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,s=o===void 0?{}:o,l=e.config,u=l===void 0?{}:l,c=a===te,d=t.includes("fa-duotone")||t.includes("fad"),p=u.familyDefault==="duotone",v=r.prefix==="fad"||r.prefix==="fa-duotone";if(!c&&(d||p||v)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&fi.includes(a)){var y=Object.keys(s).find(function(w){return ui.includes(w)});if(y||u.autoFetchSvg){var b=Er.get(a).defaultShortPrefixId;r.prefix=b,r.iconName=R(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=z()||"fas"),r}var di=(function(){function e(){Ka(this,e),this.definitions={}}return qa(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),o[s]),Le(s,o[s]);var l=Ve[P][s];l&&Le(l,o[s]),Ea()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],s=o.prefix,l=o.iconName,u=o.icon,c=u[2];a[s]||(a[s]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(a[s][d]=u)}),a[s][l]=u}),a}}])})(),pt=[],B={},G={},mi=Object.keys(G);function vi(e,t){var a=t.mixoutsTo;return pt=e,B={},Object.keys(G).forEach(function(r){mi.indexOf(r)===-1&&delete G[r]}),pt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),ue(n[o])==="object"&&Object.keys(n[o]).forEach(function(s){a[o]||(a[o]={}),a[o][s]=n[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){B[o]||(B[o]=[]),B[o].push(i[o])})}r.provides&&r.provides(G)}),a}function Me(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=B[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function U(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=B[e]||[];n.forEach(function(i){i.apply(null,a)})}function D(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return G[e]?G[e].apply(null,t):void 0}function $e(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||z();if(t)return t=R(a,t)||t,dt(Ca.definitions,a,t)||dt(E.styles,a,t)}var Ca=new di,hi=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,U("noAuto")},pi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return M?(U("beforeI2svg",t),D("pseudoElements2svg",t),D("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Zn(function(){bi({autoReplaceSvgRoot:a}),U("watch",t)})}},gi={icon:function(t){if(t===null)return null;if(ue(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:R(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=ge(t[0]);return{prefix:r,iconName:R(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match($n))){var n=be(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||z(),iconName:R(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=z();return{prefix:i,iconName:R(i,t)||t}}}},I={noAuto:hi,config:m,dom:pi,parse:gi,library:Ca,findIconDefinition:$e,toHtml:re},bi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?x:a;(Object.keys(E.styles).length>0||m.autoFetchSvg)&&M&&m.autoReplaceSvg&&I.dom.i2svg({node:r})};function ye(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return re(r)})}}),Object.defineProperty(e,"node",{get:function(){if(M){var r=x.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function yi(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(Ke(o)&&a.found&&!r.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};n.style=pe(f(f({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function xi(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:o}),children:r}]}]}function wi(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function Qe(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,u=e.extra,c=e.watchable,d=c===void 0?!1:c,p=r.found?r:a,v=p.width,y=p.height,b=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(g){return u.classes.indexOf(g)===-1}).filter(function(g){return g!==""||!!g}).concat(u.classes).join(" "),w={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":i,class:b,role:u.attributes.role||"img",viewBox:"0 0 ".concat(v," ").concat(y)})};!wi(u.attributes)&&!u.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),d&&(w.attributes[W]="");var S=f(f({},w),{},{prefix:n,iconName:i,main:a,mask:r,maskId:l,transform:o,symbol:s,styles:f({},u.styles)}),A=r.found&&a.found?D("generateAbstractMask",S)||{children:[],attributes:{}}:D("generateAbstractIcon",S)||{children:[],attributes:{}},k=A.children,C=A.attributes;return S.children=k,S.attributes=C,s?xi(S):yi(S)}function gt(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[W]="");var u=f({},i.styles);Ke(n)&&(u.transform=Jn({transform:n,width:a,height:r}),u["-webkit-transform"]=u.transform);var c=pe(u);c.length>0&&(l.style=c);var d=[];return d.push({tag:"span",attributes:l,children:[t]}),d}function Si(e){var t=e.content,a=e.extra,r=f(f({},a.attributes),{},{class:a.classes.join(" ")}),n=pe(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var Ie=E.styles;function ze(e){var t=e[0],a=e[1],r=e.slice(4),n=he(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ae.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ae.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ae.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var Ai={found:!1,width:512,height:512};function ki(e,t){!da&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function De(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=z()),new Promise(function(r,n){if(a==="fa"){var i=Oa(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Ie[t]&&Ie[t][e]){var o=Ie[t][e];return r(ze(o))}ki(e,t),r(f(f({},Ai),{},{icon:m.showMissingIcons&&e?D("missingIconAbstract")||{}:{}}))})}var bt=function(){},Re=m.measurePerformance&&ie&&ie.mark&&ie.measure?ie:{mark:bt,measure:bt},K='FA "7.1.0"',Pi=function(t){return Re.mark("".concat(K," ").concat(t," begins")),function(){return Na(t)}},Na=function(t){Re.mark("".concat(K," ").concat(t," ends")),Re.measure("".concat(K," ").concat(t),"".concat(K," ").concat(t," begins"),"".concat(K," ").concat(t," ends"))},Ze={begin:Pi,end:Na},le=function(){};function yt(e){var t=e.getAttribute?e.getAttribute(W):null;return typeof t=="string"}function Ii(e){var t=e.getAttribute?e.getAttribute(Be):null,a=e.getAttribute?e.getAttribute(Ge):null;return t&&a}function Ei(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function Oi(){if(m.autoReplaceSvg===!0)return fe.replace;var e=fe[m.autoReplaceSvg];return e||fe.replace}function Fi(e){return x.createElementNS("http://www.w3.org/2000/svg",e)}function Ci(e){return x.createElement(e)}function ja(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?Fi:Ci:a;if(typeof e=="string")return x.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(ja(o,{ceFn:r}))}),n}function Ni(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var fe={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(ja(n),a)}),a.getAttribute(W)===null&&m.keepOriginalSource){var r=x.createComment(Ni(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~Xe(a).indexOf(m.replacementClass))return fe.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return re(s)}).join(`
`);a.setAttribute(W,""),a.innerHTML=o}};function xt(e){e()}function _a(e,t){var a=typeof t=="function"?t:le;if(e.length===0)a();else{var r=xt;m.mutateApproach===Tn&&(r=$.requestAnimationFrame||xt),r(function(){var n=Oi(),i=Ze.begin("mutate");e.map(n),i(),a()})}}var et=!1;function Ta(){et=!0}function We(){et=!1}var de=null;function wt(e){if(it&&m.observeMutations){var t=e.treeCallback,a=t===void 0?le:t,r=e.nodeCallback,n=r===void 0?le:r,i=e.pseudoElementsCallback,o=i===void 0?le:i,s=e.observeMutationsRoot,l=s===void 0?x:s;de=new it(function(u){if(!et){var c=z();X(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!yt(d.addedNodes[0])&&(m.searchPseudoElements&&o(d.target),a(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&o([d.target],!0),d.type==="attributes"&&yt(d.target)&&~Rn.indexOf(d.attributeName))if(d.attributeName==="class"&&Ii(d.target)){var p=be(Xe(d.target)),v=p.prefix,y=p.iconName;d.target.setAttribute(Be,v||c),y&&d.target.setAttribute(Ge,y)}else Ei(d.target)&&n(d.target)})}}),M&&de.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ji(){de&&de.disconnect()}function _i(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),a}function Ti(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=be(Xe(e));return n.prefix||(n.prefix=z()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=ni(n.prefix,e.innerText)||qe(n.prefix,xa(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function Li(e){var t=X(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function Mi(){return{iconName:null,prefix:null,transform:F,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function St(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=Ti(e),r=a.iconName,n=a.prefix,i=a.rest,o=Li(e),s=Me("parseNodeAttributes",{},e),l=t.styleParser?_i(e):[];return f({iconName:r,prefix:n,transform:F,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var $i=E.styles;function La(e){var t=m.autoReplaceSvg==="nest"?St(e,{styleParser:!1}):St(e);return~t.extra.classes.indexOf(va)?D("generateLayersText",e,t):D("generateSvgReplacementMutation",e,t)}function zi(){return[].concat(O(oa),O(sa))}function At(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!M)return Promise.resolve();var a=x.documentElement.classList,r=function(d){return a.add("".concat(lt,"-").concat(d))},n=function(d){return a.remove("".concat(lt,"-").concat(d))},i=m.autoFetchSvg?zi():Ut.concat(Object.keys($i));i.includes("fa")||i.push("fa");var o=[".".concat(va,":not([").concat(W,"])")].concat(i.map(function(c){return".".concat(c,":not([").concat(W,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=X(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=Ze.begin("onTree"),u=s.reduce(function(c,d){try{var p=La(d);p&&c.push(p)}catch(v){da||v.name==="MissingIcon"&&console.error(v)}return c},[]);return new Promise(function(c,d){Promise.all(u).then(function(p){_a(p,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(p){l(),d(p)})})}function Di(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;La(e).then(function(a){a&&_a([a],t)})}function Ri(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:$e(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:$e(n||{})),e(r,f(f({},a),{},{mask:n}))}}var Wi=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?F:r,i=a.symbol,o=i===void 0?!1:i,s=a.mask,l=s===void 0?null:s,u=a.maskId,c=u===void 0?null:u,d=a.classes,p=d===void 0?[]:d,v=a.attributes,y=v===void 0?{}:v,b=a.styles,w=b===void 0?{}:b;if(t){var S=t.prefix,A=t.iconName,k=t.icon;return ye(f({type:"icon"},t),function(){return U("beforeDOMElementCreation",{iconDefinition:t,params:a}),Qe({icons:{main:ze(k),mask:l?ze(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:S,iconName:A,transform:f(f({},F),n),symbol:o,maskId:c,extra:{attributes:y,styles:w,classes:p}})})}},Ui={mixout:function(){return{icon:Ri(Wi)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=At,a.nodeCallback=Di,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?x:r,i=a.callback,o=i===void 0?function(){}:i;return At(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,s=r.symbol,l=r.mask,u=r.maskId,c=r.extra;return new Promise(function(d,p){Promise.all([De(n,i),l.iconName?De(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var y=he(v,2),b=y[0],w=y[1];d([a,Qe({icons:{main:b,mask:w},prefix:i,iconName:n,transform:o,symbol:s,maskId:u,extra:c,watchable:!0})])}).catch(p)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,s=a.styles,l=pe(s);l.length>0&&(n.style=l);var u;return Ke(o)&&(u=D("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:n}}}},Yi={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return ye({type:"layer"},function(){U("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(O(i)).join(" ")},children:o}]})}}}},Hi={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,s=o===void 0?{}:o,l=r.styles,u=l===void 0?{}:l;return ye({type:"counter",content:a},function(){return U("beforeDOMElementCreation",{content:a,params:r}),Si({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(O(i))}})})}}}},Bi={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?F:n,o=r.classes,s=o===void 0?[]:o,l=r.attributes,u=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return ye({type:"text",content:a},function(){return U("beforeDOMElementCreation",{content:a,params:r}),gt({content:a,transform:f(f({},F),i),extra:{attributes:u,styles:d,classes:["".concat(m.cssPrefix,"-layers-text")].concat(O(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,s=null;if(Rt){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();o=u.width/l,s=u.height/l}return Promise.resolve([a,gt({content:a.innerHTML,width:o,height:s,transform:n,extra:i,watchable:!0})])}}},Ma=new RegExp('"',"ug"),kt=[1105920,1112319],Pt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),Ir),jn),Lr),Ue=Object.keys(Pt).reduce(function(e,t){return e[t.toLowerCase()]=Pt[t],e},{}),Gi=Object.keys(Ue).reduce(function(e,t){var a=Ue[t];return e[t]=a[900]||O(Object.entries(a))[0][1],e},{});function Vi(e){var t=e.replace(Ma,"");return xa(O(t)[0]||"")}function Xi(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(Ma,""),n=r.codePointAt(0),i=n>=kt[0]&&n<=kt[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function Ki(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(Ue[a]||{})[n]||Gi[a]}function It(e,t){var a="".concat(_n).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=X(e.children),o=i.filter(function(ne){return ne.getAttribute(Ne)===t})[0],s=$.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(zn),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(o&&!u)return e.removeChild(o),r();if(u&&d!=="none"&&d!==""){var p=s.getPropertyValue("content"),v=Ki(l,c),y=Vi(p),b=u[0].startsWith("FontAwesome"),w=Xi(s),S=qe(v,y),A=S;if(b){var k=ii(y);k.iconName&&k.prefix&&(S=k.iconName,v=k.prefix)}if(S&&!w&&(!o||o.getAttribute(Be)!==v||o.getAttribute(Ge)!==A)){e.setAttribute(a,A),o&&e.removeChild(o);var C=Mi(),g=C.extra;g.attributes[Ne]=t,De(S,v).then(function(ne){var Ha=Qe(f(f({},C),{},{icons:{main:ne,mask:Fa()},prefix:v,iconName:A,extra:g,watchable:!0})),xe=x.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(xe,e.firstChild):e.appendChild(xe),xe.outerHTML=Ha.map(function(Ba){return re(Ba)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Ji(e){return Promise.all([It(e,"::before"),It(e,"::after")])}function qi(e){return e.parentNode!==document.head&&!~Ln.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ne)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Qi=function(t){return!!t&&ca.some(function(a){return t.includes(a)})},Zi=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});r=r.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var n=se(r),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;if(Qi(o)){var s=ca.reduce(function(l,u){return l.replace(u,"")},o);s!==""&&s!=="*"&&a.add(s)}}}catch(l){n.e(l)}finally{n.f()}return a};function Et(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(M){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=se(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var s=se(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,c=Zi(u.selectorText),d=se(c),p;try{for(d.s();!(p=d.n()).done;){var v=p.value;r.add(v)}}catch(b){d.e(b)}finally{d.f()}}}catch(b){s.e(b)}finally{s.f()}}catch(b){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(b.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(b){n.e(b)}finally{n.f()}if(!r.size)return;var y=Array.from(r).join(", ");try{a=e.querySelectorAll(y)}catch{}}return new Promise(function(b,w){var S=X(a).filter(qi).map(Ji),A=Ze.begin("searchPseudoElements");Ta(),Promise.all(S).then(function(){A(),We(),b()}).catch(function(){A(),We(),w()})})}}var eo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Et,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?x:r;m.searchPseudoElements&&Et(n)}}},Ot=!1,to={mixout:function(){return{dom:{unwatch:function(){Ta(),Ot=!0}}}},hooks:function(){return{bootstrap:function(){wt(Me("mutationObserverCallbacks",{}))},noAuto:function(){ji()},watch:function(a){var r=a.observeMutationsRoot;Ot?We():wt(Me("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ft=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},ao={mixout:function(){return{parse:{transform:function(a){return Ft(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Ft(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),c="rotate(".concat(n.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},p={transform:"translate(".concat(o/2*-1," -256)")},v={outer:s,inner:d,path:p};return{tag:"g",attributes:f({},v.outer),children:[{tag:"g",attributes:f({},v.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),v.path)}]}]}}}},Ee={x:0,y:0,width:"100%",height:"100%"};function Ct(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function ro(e){return e.tag==="g"?e.children:[e]}var no={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?be(n.split(" ").map(function(o){return o.trim()})):Fa();return i.prefix||(i.prefix=z()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,s=a.maskId,l=a.transform,u=i.width,c=i.icon,d=o.width,p=o.icon,v=Kn({transform:l,containerWidth:d,iconWidth:u}),y={tag:"rect",attributes:f(f({},Ee),{},{fill:"white"})},b=c.children?{children:c.children.map(Ct)}:{},w={tag:"g",attributes:f({},v.inner),children:[Ct(f({tag:c.tag,attributes:f(f({},c.attributes),v.path)},b))]},S={tag:"g",attributes:f({},v.outer),children:[w]},A="mask-".concat(s||ut()),k="clip-".concat(s||ut()),C={tag:"mask",attributes:f(f({},Ee),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[y,S]},g={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:ro(p)},C]};return r.push(g,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(A,")")},Ee)}),{children:r,attributes:n}}}},io={provides:function(t){var a=!1;$.matchMedia&&(a=$.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},oo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},so=[Qn,Ui,Yi,Hi,Bi,eo,to,ao,no,io,oo];vi(so,{mixoutsTo:I});I.noAuto;var ee=I.config;I.library;I.dom;var $a=I.parse;I.findIconDefinition;I.toHtml;var lo=I.icon;I.layer;I.text;I.counter;function fo(e){return e=e-0,e===e}function za(e){return fo(e)?e:(e=e.replace(/[_-]+(.)?/g,(t,a)=>a?a.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}function uo(e){return e.charAt(0).toUpperCase()+e.slice(1)}var H=new Map,co=1e3;function mo(e){if(H.has(e))return H.get(e);const t={};let a=0;const r=e.length;for(;a<r;){const n=e.indexOf(";",a),i=n===-1?r:n,o=e.slice(a,i).trim();if(o){const s=o.indexOf(":");if(s>0){const l=o.slice(0,s).trim(),u=o.slice(s+1).trim();if(l&&u){const c=za(l);t[c.startsWith("webkit")?uo(c):c]=u}}}a=i+1}if(H.size===co){const n=H.keys().next().value;n&&H.delete(n)}return H.set(e,t),t}function Da(e,t,a={}){if(typeof t=="string")return t;const r=(t.children||[]).map(u=>Da(e,u)),n=t.attributes||{},i={};for(const[u,c]of Object.entries(n))switch(!0){case u==="class":{i.className=c;break}case u==="style":{i.style=mo(String(c));break}case u.startsWith("aria-"):case u.startsWith("data-"):{i[u.toLowerCase()]=c;break}default:i[za(u)]=c}const{style:o,"aria-label":s,...l}=a;return o&&(i.style=i.style?{...i.style,...o}:o),s&&(i["aria-label"]=s,i["aria-hidden"]="false"),e(t.tag,{...l,...i},...r)}var vo=Da.bind(null,_.createElement),Nt=(e,t)=>{const a=Ga.useId();return e||(t?a:void 0)},ho=class{constructor(e="react-fontawesome"){this.enabled=!1;let t=!1;try{t=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},po="searchPseudoElementsFullScan"in ee?"7.0.0":"6.0.0",go=Number.parseInt(po)>=7,Q="fa",N={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},bo={left:"fa-pull-left",right:"fa-pull-right"},yo={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},xo={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},j={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function wo(e){const t=ee.cssPrefix||ee.familyPrefix||Q;return t===Q?e:e.replace(new RegExp(`(?<=^|\\s)${Q}-`,"g"),`${t}-`)}function So(e){const{beat:t,fade:a,beatFade:r,bounce:n,shake:i,spin:o,spinPulse:s,spinReverse:l,pulse:u,fixedWidth:c,inverse:d,border:p,flip:v,size:y,rotation:b,pull:w,swapOpacity:S,rotateBy:A,widthAuto:k,className:C}=e,g=[];return C&&g.push(...C.split(" ")),t&&g.push(N.beat),a&&g.push(N.fade),r&&g.push(N.beatFade),n&&g.push(N.bounce),i&&g.push(N.shake),o&&g.push(N.spin),l&&g.push(N.spinReverse),s&&g.push(N.spinPulse),u&&g.push(N.pulse),c&&g.push(j.fixedWidth),d&&g.push(j.inverse),p&&g.push(j.border),v===!0&&g.push(j.flip),(v==="horizontal"||v==="both")&&g.push(j.flipHorizontal),(v==="vertical"||v==="both")&&g.push(j.flipVertical),y!=null&&g.push(xo[y]),b!=null&&b!==0&&g.push(yo[b]),w!=null&&g.push(bo[w]),S&&g.push(j.swapOpacity),go?(A&&g.push(j.rotateBy),k&&g.push(j.widthAuto),(ee.cssPrefix||ee.familyPrefix||Q)===Q?g:g.map(wo)):g}var Ao=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function jt(e){if(e)return Ao(e)?e:$a.icon(e)}function ko(e){return Object.keys(e)}var _t=new ho("FontAwesomeIcon"),Ra={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},Po=new Set(Object.keys(Ra)),Io=_.forwardRef((e,t)=>{const a={...Ra,...e},{icon:r,mask:n,symbol:i,title:o,titleId:s,maskId:l,transform:u}=a,c=Nt(l,!!n),d=Nt(s,!!o),p=jt(r);if(!p)return _t.error("Icon lookup is undefined",r),null;const v=So(a),y=typeof u=="string"?$a.transform(u):u,b=jt(n),w=lo(p,{...v.length>0&&{classes:v},...y&&{transform:y},...b&&{mask:b},symbol:i,title:o,titleId:d,maskId:c});if(!w)return _t.error("Could not find icon",p),null;const{abstract:S}=w,A={ref:t};for(const k of ko(a))Po.has(k)||(A[k]=a[k]);return vo(S[0],A)});Io.displayName="FontAwesomeIcon";var Lo={prefix:"fab",iconName:"react",icon:[512,512,[],"f41b","M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9-53.4 18.5-91.7 47.7-91.7 77.9 0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zM136.9 187.2c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zM115.7 320.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zM256 301.8a45.8 45.8 0 1 0 0-91.6 45.8 45.8 0 1 0 0 91.6z"]},Mo={prefix:"fab",iconName:"js",icon:[448,512,[],"f3b8","M0 32l0 448 448 0 0-448-448 0zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5L152 385.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5l0-143.1 42.1 0 0 143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43L301 382.1c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"]},Wa={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Tt=_.createContext&&_.createContext(Wa),Eo=["attr","size","title"];function Oo(e,t){if(e==null)return{};var a=Fo(e,t),r,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function Fo(e,t){if(e==null)return{};var a={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;a[r]=e[r]}return a}function me(){return me=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},me.apply(this,arguments)}function Lt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function ve(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?Lt(Object(a),!0).forEach(function(r){Co(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Lt(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function Co(e,t,a){return t=No(t),t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function No(e){var t=jo(e,"string");return typeof t=="symbol"?t:t+""}function jo(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ua(e){return e&&e.map((t,a)=>_.createElement(t.tag,ve({key:a},t.attr),Ua(t.child)))}function Ya(e){return t=>_.createElement(_o,me({attr:ve({},e.attr)},t),Ua(e.child))}function _o(e){var t=a=>{var{attr:r,size:n,title:i}=e,o=Oo(e,Eo),s=n||a.size||"1em",l;return a.className&&(l=a.className),e.className&&(l=(l?l+" ":"")+e.className),_.createElement("svg",me({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},a.attr,r,o,{className:l,style:ve(ve({color:e.color||a.color},a.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),i&&_.createElement("title",null,i),e.children)};return Tt!==void 0?_.createElement(Tt.Consumer,null,a=>t(a)):t(Wa)}function $o(e){return Ya({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"},child:[]}]})(e)}function zo(e){return Ya({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"},child:[]}]})(e)}export{Io as F,$o as S,zo as a,Lo as b,Mo as f};
