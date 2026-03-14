var y8=((_)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(_,{get:($,Z)=>(typeof require<"u"?require:$)[Z]}):_)(function(_){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+_+'" is not supported')});var c2,G_,U3,C2,H3,Y3,A8,g2={},L3=[],w8=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function t0(_,$){for(var Z in $)_[Z]=$[Z];return _}function F3(_){var $=_.parentNode;$&&$.removeChild(_)}function E3(_,$,Z){var J,X,Y,j={};for(Y in $)Y=="key"?J=$[Y]:Y=="ref"?X=$[Y]:j[Y]=$[Y];if(arguments.length>2&&(j.children=arguments.length>3?c2.call(arguments,2):Z),typeof _=="function"&&_.defaultProps!=null)for(Y in _.defaultProps)j[Y]===void 0&&(j[Y]=_.defaultProps[Y]);return f2(_,j,J,X,null)}function f2(_,$,Z,J,X){var Y={type:_,props:$,key:Z,ref:J,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:X==null?++U3:X};return G_.vnode!=null&&G_.vnode(Y),Y}function m2(_){return _.children}function v2(_,$){this.props=_,this.context=$}function q2(_,$){if($==null)return _.__?q2(_.__,_.__.__k.indexOf(_)+1):null;for(var Z;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null)return Z.__e;return typeof _.type=="function"?q2(_):null}function D3(_){var $,Z;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,$=0;$<_.__k.length;$++)if((Z=_.__k[$])!=null&&Z.__e!=null){_.__e=_.__c.base=Z.__e;break}return D3(_)}}function X3(_){(!_.__d&&(_.__d=!0)&&C2.push(_)&&!u2.__r++||Y3!==G_.debounceRendering)&&((Y3=G_.debounceRendering)||H3)(u2)}function u2(){for(var _;u2.__r=C2.length;)_=C2.sort(function($,Z){return $.__v.__b-Z.__v.__b}),C2=[],_.some(function($){var Z,J,X,Y,j,V;$.__d&&(j=(Y=(Z=$).__v).__e,(V=Z.__P)&&(J=[],(X=t0({},Y)).__v=Y.__v+1,Q1(V,Y,X,Z.__n,V.ownerSVGElement!==void 0,Y.__h!=null?[j]:null,J,j==null?q2(Y):j,Y.__h),A3(J,Y),Y.__e!=j&&D3(Y)))})}function k3(_,$,Z,J,X,Y,j,V,N,O){var W,U,E,D,C,w,R,M=J&&J.__k||L3,H=M.length;for(Z.__k=[],W=0;W<$.length;W++)if((D=Z.__k[W]=(D=$[W])==null||typeof D=="boolean"?null:typeof D=="string"||typeof D=="number"||typeof D=="bigint"?f2(null,D,null,null,D):Array.isArray(D)?f2(m2,{children:D},null,null,null):D.__b>0?f2(D.type,D.props,D.key,null,D.__v):D)!=null){if(D.__=Z,D.__b=Z.__b+1,(E=M[W])===null||E&&D.key==E.key&&D.type===E.type)M[W]=void 0;else for(U=0;U<H;U++){if((E=M[U])&&D.key==E.key&&D.type===E.type){M[U]=void 0;break}E=null}Q1(_,D,E=E||g2,X,Y,j,V,N,O),C=D.__e,(U=D.ref)&&E.ref!=U&&(R||(R=[]),E.ref&&R.push(E.ref,null,D),R.push(U,D.__c||C,D)),C!=null?(w==null&&(w=C),typeof D.type=="function"&&D.__k!=null&&D.__k===E.__k?D.__d=N=C3(D,N,_):N=y3(_,D,E,M,C,N),O||Z.type!=="option"?typeof Z.type=="function"&&(Z.__d=N):_.value=""):N&&E.__e==N&&N.parentNode!=_&&(N=q2(E))}for(Z.__e=w,W=H;W--;)M[W]!=null&&(typeof Z.type=="function"&&M[W].__e!=null&&M[W].__e==Z.__d&&(Z.__d=q2(J,W+1)),P3(M[W],M[W]));if(R)for(W=0;W<R.length;W++)w3(R[W],R[++W],R[++W])}function C3(_,$,Z){var J,X;for(J=0;J<_.__k.length;J++)(X=_.__k[J])&&(X.__=_,$=typeof X.type=="function"?C3(X,$,Z):y3(Z,X,X,_.__k,X.__e,$));return $}function y3(_,$,Z,J,X,Y){var j,V,N;if($.__d!==void 0)j=$.__d,$.__d=void 0;else if(Z==null||X!=Y||X.parentNode==null)_:if(Y==null||Y.parentNode!==_)_.appendChild(X),j=null;else{for(V=Y,N=0;(V=V.nextSibling)&&N<J.length;N+=2)if(V==X)break _;_.insertBefore(X,Y),j=Y}return j!==void 0?j:X.nextSibling}function W3(_,$,Z){$[0]==="-"?_.setProperty($,Z):_[$]=Z==null?"":typeof Z!="number"||w8.test($)?Z:Z+"px"}function T2(_,$,Z,J,X){var Y;_:if($==="style")if(typeof Z=="string")_.style.cssText=Z;else{if(typeof J=="string"&&(_.style.cssText=J=""),J)for($ in J)Z&&$ in Z||W3(_.style,$,"");if(Z)for($ in Z)J&&Z[$]===J[$]||W3(_.style,$,Z[$])}else if($[0]==="o"&&$[1]==="n")Y=$!==($=$.replace(/Capture$/,"")),$=$.toLowerCase()in _?$.toLowerCase().slice(2):$.slice(2),_.l||(_.l={}),_.l[$+Y]=Z,Z?J||_.addEventListener($,Y?K3:j3,Y):_.removeEventListener($,Y?K3:j3,Y);else if($!=="dangerouslySetInnerHTML"){if(X)$=$.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if($!=="href"&&$!=="list"&&$!=="form"&&$!=="tabIndex"&&$!=="download"&&$ in _)try{_[$]=Z==null?"":Z;break _}catch(j){}typeof Z=="function"||(Z!=null&&(Z!==!1||$[0]==="a"&&$[1]==="r")?_.setAttribute($,Z):_.removeAttribute($))}}function j3(_){this.l[_.type+!1](G_.event?G_.event(_):_)}function K3(_){this.l[_.type+!0](G_.event?G_.event(_):_)}function Q1(_,$,Z,J,X,Y,j,V,N){var O,W,U,E,D,C,w,R,M,H,S,y=$.type;if($.constructor!==void 0)return null;Z.__h!=null&&(N=Z.__h,V=$.__e=Z.__e,$.__h=null,Y=[V]),(O=G_.__b)&&O($);try{_:if(typeof y=="function"){if(R=$.props,M=(O=y.contextType)&&J[O.__c],H=O?M?M.props.value:O.__:J,Z.__c?w=(W=$.__c=Z.__c).__=W.__E:(("prototype"in y)&&y.prototype.render?$.__c=W=new y(R,H):($.__c=W=new v2(R,H),W.constructor=y,W.render=b8),M&&M.sub(W),W.props=R,W.state||(W.state={}),W.context=H,W.__n=J,U=W.__d=!0,W.__h=[]),W.__s==null&&(W.__s=W.state),y.getDerivedStateFromProps!=null&&(W.__s==W.state&&(W.__s=t0({},W.__s)),t0(W.__s,y.getDerivedStateFromProps(R,W.__s))),E=W.props,D=W.state,U)y.getDerivedStateFromProps==null&&W.componentWillMount!=null&&W.componentWillMount(),W.componentDidMount!=null&&W.__h.push(W.componentDidMount);else{if(y.getDerivedStateFromProps==null&&R!==E&&W.componentWillReceiveProps!=null&&W.componentWillReceiveProps(R,H),!W.__e&&W.shouldComponentUpdate!=null&&W.shouldComponentUpdate(R,W.__s,H)===!1||$.__v===Z.__v){W.props=R,W.state=W.__s,$.__v!==Z.__v&&(W.__d=!1),W.__v=$,$.__e=Z.__e,$.__k=Z.__k,$.__k.forEach(function(v){v&&(v.__=$)}),W.__h.length&&j.push(W);break _}W.componentWillUpdate!=null&&W.componentWillUpdate(R,W.__s,H),W.componentDidUpdate!=null&&W.__h.push(function(){W.componentDidUpdate(E,D,C)})}W.context=H,W.props=R,W.state=W.__s,(O=G_.__r)&&O($),W.__d=!1,W.__v=$,W.__P=_,O=W.render(W.props,W.state,W.context),W.state=W.__s,W.getChildContext!=null&&(J=t0(t0({},J),W.getChildContext())),U||W.getSnapshotBeforeUpdate==null||(C=W.getSnapshotBeforeUpdate(E,D)),S=O!=null&&O.type===m2&&O.key==null?O.props.children:O,k3(_,Array.isArray(S)?S:[S],$,Z,J,X,Y,j,V,N),W.base=$.__e,$.__h=null,W.__h.length&&j.push(W),w&&(W.__E=W.__=null),W.__e=!1}else Y==null&&$.__v===Z.__v?($.__k=Z.__k,$.__e=Z.__e):$.__e=P8(Z.__e,$,Z,J,X,Y,j,N);(O=G_.diffed)&&O($)}catch(v){$.__v=null,(N||Y!=null)&&($.__e=V,$.__h=!!N,Y[Y.indexOf(V)]=null),G_.__e(v,$,Z)}}function A3(_,$){G_.__c&&G_.__c($,_),_.some(function(Z){try{_=Z.__h,Z.__h=[],_.some(function(J){J.call(Z)})}catch(J){G_.__e(J,Z.__v)}})}function P8(_,$,Z,J,X,Y,j,V){var N,O,W,U=Z.props,E=$.props,D=$.type,C=0;if(D==="svg"&&(X=!0),Y!=null){for(;C<Y.length;C++)if((N=Y[C])&&(N===_||(D?N.localName==D:N.nodeType==3))){_=N,Y[C]=null;break}}if(_==null){if(D===null)return document.createTextNode(E);_=X?document.createElementNS("http://www.w3.org/2000/svg",D):document.createElement(D,E.is&&E),Y=null,V=!1}if(D===null)U===E||V&&_.data===E||(_.data=E);else{if(Y=Y&&c2.call(_.childNodes),O=(U=Z.props||g2).dangerouslySetInnerHTML,W=E.dangerouslySetInnerHTML,!V){if(Y!=null)for(U={},C=0;C<_.attributes.length;C++)U[_.attributes[C].name]=_.attributes[C].value;(W||O)&&(W&&(O&&W.__html==O.__html||W.__html===_.innerHTML)||(_.innerHTML=W&&W.__html||""))}if(function(w,R,M,H,S){var y;for(y in M)y==="children"||y==="key"||y in R||T2(w,y,null,M[y],H);for(y in R)S&&typeof R[y]!="function"||y==="children"||y==="key"||y==="value"||y==="checked"||M[y]===R[y]||T2(w,y,R[y],M[y],H)}(_,E,U,X,V),W)$.__k=[];else if(C=$.props.children,k3(_,Array.isArray(C)?C:[C],$,Z,J,X&&D!=="foreignObject",Y,j,Y?Y[0]:Z.__k&&q2(Z,0),V),Y!=null)for(C=Y.length;C--;)Y[C]!=null&&F3(Y[C]);V||(("value"in E)&&(C=E.value)!==void 0&&(C!==_.value||D==="progress"&&!C)&&T2(_,"value",C,U.value,!1),("checked"in E)&&(C=E.checked)!==void 0&&C!==_.checked&&T2(_,"checked",C,U.checked,!1))}return _}function w3(_,$,Z){try{typeof _=="function"?_($):_.current=$}catch(J){G_.__e(J,Z)}}function P3(_,$,Z){var J,X;if(G_.unmount&&G_.unmount(_),(J=_.ref)&&(J.current&&J.current!==_.__e||w3(J,null,$)),(J=_.__c)!=null){if(J.componentWillUnmount)try{J.componentWillUnmount()}catch(Y){G_.__e(Y,$)}J.base=J.__P=null}if(J=_.__k)for(X=0;X<J.length;X++)J[X]&&P3(J[X],$,typeof _.type!="function");Z||_.__e==null||F3(_.__e),_.__e=_.__d=void 0}function b8(_,$,Z){return this.constructor(_,Z)}function b3(_,$,Z){var J,X,Y;G_.__&&G_.__(_,$),X=(J=typeof Z=="function")?null:Z&&Z.__k||$.__k,Y=[],Q1($,_=(!J&&Z||$).__k=E3(m2,null,[_]),X||g2,g2,$.ownerSVGElement!==void 0,!J&&Z?[Z]:X?null:$.firstChild?c2.call($.childNodes):null,Y,!J&&Z?Z:X?X.__e:$.firstChild,J),A3(Y,_)}c2=L3.slice,G_={__e:function(_,$){for(var Z,J,X;$=$.__;)if((Z=$.__c)&&!Z.__)try{if((J=Z.constructor)&&J.getDerivedStateFromError!=null&&(Z.setState(J.getDerivedStateFromError(_)),X=Z.__d),Z.componentDidCatch!=null&&(Z.componentDidCatch(_),X=Z.__d),X)return Z.__E=Z}catch(Y){_=Y}throw _}},U3=0,v2.prototype.setState=function(_,$){var Z;Z=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=t0({},this.state),typeof _=="function"&&(_=_(t0({},Z),this.props)),_&&t0(Z,_),_!=null&&this.__v&&($&&this.__h.push($),X3(this))},v2.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),X3(this))},v2.prototype.render=m2,C2=[],H3=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u2.__r=0,A8=0;var h2,H0,G3,y2=0,q1=[],V3=G_.__b,N3=G_.__r,O3=G_.diffed,B3=G_.__c,q3=G_.unmount;function U1(_,$){G_.__h&&G_.__h(H0,_,y2||$),y2=0;var Z=H0.__H||(H0.__H={__:[],__h:[]});return _>=Z.__.length&&Z.__.push({}),Z.__[_]}function u(_){return y2=1,M8(S3,_)}function M8(_,$,Z){var J=U1(h2++,2);return J.t=_,J.__c||(J.__=[Z?Z($):S3(void 0,$),function(X){var Y=J.t(J.__[0],X);J.__[0]!==Y&&(J.__=[Y,J.__[1]],J.__c.setState({}))}],J.__c=H0),J.__}function m(_,$){var Z=U1(h2++,3);!G_.__s&&M3(Z.__H,$)&&(Z.__=_,Z.__H=$,H0.__H.__h.push(Z))}function L(_){return y2=5,L0(function(){return{current:_}},[])}function L0(_,$){var Z=U1(h2++,7);return M3(Z.__H,$)&&(Z.__=_(),Z.__H=$,Z.__h=_),Z.__}function b(_,$){return y2=8,L0(function(){return _},$)}function S8(){q1.forEach(function(_){if(_.__P)try{_.__H.__h.forEach(R2),_.__H.__h.forEach(z1),_.__H.__h=[]}catch($){_.__H.__h=[],G_.__e($,_.__v)}}),q1=[]}G_.__b=function(_){H0=null,V3&&V3(_)},G_.__r=function(_){N3&&N3(_),h2=0;var $=(H0=_.__c).__H;$&&($.__h.forEach(R2),$.__h.forEach(z1),$.__h=[])},G_.diffed=function(_){O3&&O3(_);var $=_.__c;$&&$.__H&&$.__H.__h.length&&(q1.push($)!==1&&G3===G_.requestAnimationFrame||((G3=G_.requestAnimationFrame)||function(Z){var J,X=function(){clearTimeout(Y),z3&&cancelAnimationFrame(J),setTimeout(Z)},Y=setTimeout(X,100);z3&&(J=requestAnimationFrame(X))})(S8)),H0=void 0},G_.__c=function(_,$){$.some(function(Z){try{Z.__h.forEach(R2),Z.__h=Z.__h.filter(function(J){return!J.__||z1(J)})}catch(J){$.some(function(X){X.__h&&(X.__h=[])}),$=[],G_.__e(J,Z.__v)}}),B3&&B3(_,$)},G_.unmount=function(_){q3&&q3(_);var $=_.__c;if($&&$.__H)try{$.__H.__.forEach(R2)}catch(Z){G_.__e(Z,$.__v)}};var z3=typeof requestAnimationFrame=="function";function R2(_){var $=H0;typeof _.__c=="function"&&_.__c(),H0=$}function z1(_){var $=H0;_.__c=_.__(),H0=$}function M3(_,$){return!_||_.length!==$.length||$.some(function(Z,J){return Z!==_[J]})}function S3(_,$){return typeof $=="function"?$(_):$}var x3=function(_,$,Z,J){var X;$[0]=0;for(var Y=1;Y<$.length;Y++){var j=$[Y++],V=$[Y]?($[0]|=j?1:2,Z[$[Y++]]):$[++Y];j===3?J[0]=V:j===4?J[1]=Object.assign(J[1]||{},V):j===5?(J[1]=J[1]||{})[$[++Y]]=V:j===6?J[1][$[++Y]]+=V+"":j?(X=_.apply(V,x3(_,V,Z,["",null])),J.push(X),V[0]?$[0]|=2:($[Y-2]=0,$[Y]=X)):J.push(V)}return J},Q3=new Map,Q=function(_){var $=Q3.get(this);return $||($=new Map,Q3.set(this,$)),($=x3(this,$.get(_)||($.set(_,$=function(Z){for(var J,X,Y=1,j="",V="",N=[0],O=function(E){Y===1&&(E||(j=j.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?N.push(0,E,j):Y===3&&(E||j)?(N.push(3,E,j),Y=2):Y===2&&j==="..."&&E?N.push(4,E,0):Y===2&&j&&!E?N.push(5,0,!0,j):Y>=5&&((j||!E&&Y===5)&&(N.push(Y,0,j,X),Y=6),E&&(N.push(Y,E,0,X),Y=6)),j=""},W=0;W<Z.length;W++){W&&(Y===1&&O(),O(W));for(var U=0;U<Z[W].length;U++)J=Z[W][U],Y===1?J==="<"?(O(),N=[N],Y=3):j+=J:Y===4?j==="--"&&J===">"?(Y=1,j=""):j=J+j[0]:V?J===V?V="":j+=J:J==='"'||J==="'"?V=J:J===">"?(O(),Y=1):Y&&(J==="="?(Y=5,X=j,j=""):J==="/"&&(Y<5||Z[W][U+1]===">")?(O(),Y===3&&(N=N[0]),Y=N,(N=N[0]).push(2,0,Y),Y=0):J===" "||J==="\t"||J===`
`||J==="\r"?(O(),Y=2):j+=J),Y===3&&j==="!--"&&(Y=4,N=N[0])}return O(),N}(_)),$),arguments,[])).length>1?$:$[0]}.bind(E3);async function o_(_,$={}){let Z=await fetch(""+_,{...$,headers:{"Content-Type":"application/json",...$.headers}});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Unknown error"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function p2(_=10,$=null){let Z=`/timeline?limit=${_}`;if($)Z+=`&before=${$}`;return o_(Z)}async function I3(_,$=50,Z=0){return o_(`/hashtag/${encodeURIComponent(_)}?limit=${$}&offset=${Z}`)}async function T3(_,$=50,Z=0){return o_(`/search?q=${encodeURIComponent(_)}&limit=${$}&offset=${Z}`)}async function f3(_){return o_(`/thread/${_}`)}async function v3(_,$=!1){let Z=`/post/${_}?cascade=${$?"true":"false"}`;return o_(Z,{method:"DELETE"})}async function H1(_,$,Z=null,J=[],X=null){return o_(`/agent/${_}/message`,{method:"POST",body:JSON.stringify({content:$,thread_id:Z,media_ids:J,mode:X})})}async function R3(){return o_("/agents")}async function g3(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/status${$}`)}async function L1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/context${$}`)}async function F1(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/queue-state${$}`)}async function E1(_,$=null){let Z=await fetch("/agent/queue-remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to remove queued item"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function D1(_,$=null){let Z=await fetch("/agent/queue-steer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({row_id:_,chat_jid:$||void 0})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to steer queued item"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function X2(_=null){let $=_?`?chat_jid=${encodeURIComponent(_)}`:"";return o_(`/agent/models${$}`)}async function u3(_){let $=new FormData;$.append("file",_);let Z=await fetch("/media/upload",{method:"POST",body:$});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Upload failed"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function k1(_,$){let Z=await fetch("/agent/respond",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:_,outcome:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to respond"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function c3(_,$){let Z=await fetch("/agent/whitelist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pattern:_,description:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Failed to add to whitelist"}));throw Error(J.error||`HTTP ${Z.status}`)}return Z.json()}async function m3(_,$="thought"){let Z=`/agent/thought?turn_id=${encodeURIComponent(_)}&panel=${encodeURIComponent($)}`;return o_(Z)}async function h3(_,$,Z){return o_("/agent/thought/visibility",{method:"POST",body:JSON.stringify({turn_id:_,panel:$,expanded:Boolean(Z)})})}function z2(_){return`/media/${_}`}function p3(_){return`/media/${_}/thumbnail`}async function i2(_){let $=await fetch(`/media/${_}/info`);if(!$.ok)throw Error("Failed to get media info");return $.json()}async function l2(_="",$=2,Z=!1){let J=`/workspace/tree?path=${encodeURIComponent(_)}&depth=${$}&show_hidden=${Z?"1":"0"}`;return o_(J)}async function i3(_,$=20000,Z=null){let J=Z?`&mode=${encodeURIComponent(Z)}`:"",X=`/workspace/file?path=${encodeURIComponent(_)}&max=${$}${J}`;return o_(X)}async function l3(_){return o_("/workspace/attach",{method:"POST",body:JSON.stringify({path:_})})}async function C1(_,$="",Z={}){let J=new FormData;J.append("file",_);let X=new URLSearchParams;if($)X.set("path",$);if(Z.overwrite)X.set("overwrite","1");let Y=X.toString(),j=Y?`/workspace/upload?${Y}`:"/workspace/upload",V=await fetch(""+j,{method:"POST",body:J});if(!V.ok){let N=await V.json().catch(()=>({error:"Upload failed"})),O=Error(N.error||`HTTP ${V.status}`);throw O.status=V.status,O.code=N.code,O}return V.json()}async function n3(_,$,Z=""){let J=await fetch("/workspace/file",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$,content:Z})});if(!J.ok){let X=await J.json().catch(()=>({error:"Create failed"})),Y=Error(X.error||`HTTP ${J.status}`);throw Y.status=J.status,Y.code=X.code,Y}return J.json()}async function o3(_,$){let Z=await fetch("/workspace/rename",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,name:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Rename failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function d3(_,$){let Z=await fetch("/workspace/move",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:_,target:$})});if(!Z.ok){let J=await Z.json().catch(()=>({error:"Move failed"})),X=Error(J.error||`HTTP ${Z.status}`);throw X.status=Z.status,X.code=J.code,X}return Z.json()}async function r3(_){let $=`/workspace/file?path=${encodeURIComponent(_||"")}`;return o_($,{method:"DELETE"})}async function n2(_,$=!1){return o_("/workspace/visibility",{method:"POST",body:JSON.stringify({visible:Boolean(_),show_hidden:Boolean($)})})}function y1(_){return`/workspace/raw?path=${encodeURIComponent(_)}`}function s3(_,$=!1){return`/workspace/download?${`path=${encodeURIComponent(_||"")}&show_hidden=${$?"1":"0"}`}`}class A1{constructor(_,$){this.onEvent=_,this.onStatusChange=$,this.eventSource=null,this.reconnectTimeout=null,this.reconnectDelay=1000,this.status="disconnected",this.reconnectAttempts=0,this.cooldownUntil=0,this.connecting=!1}connect(){if(this.connecting)return;if(this.eventSource&&this.status==="connected")return;if(this.connecting=!0,this.eventSource)this.eventSource.close();this.eventSource=new EventSource("/sse/stream"),this.eventSource.onopen=()=>{this.connecting=!1,this.reconnectDelay=1000,this.reconnectAttempts=0,this.cooldownUntil=0,this.status="connected",this.onStatusChange("connected")},this.eventSource.onerror=()=>{this.connecting=!1,this.status="disconnected",this.onStatusChange("disconnected"),this.reconnectAttempts+=1,this.scheduleReconnect()},this.eventSource.addEventListener("connected",()=>{console.log("SSE connected"),this.onEvent("connected",{})}),this.eventSource.addEventListener("new_post",(_)=>{this.onEvent("new_post",JSON.parse(_.data))}),this.eventSource.addEventListener("new_reply",(_)=>{this.onEvent("new_reply",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_response",(_)=>{this.onEvent("agent_response",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_updated",(_)=>{this.onEvent("interaction_updated",JSON.parse(_.data))}),this.eventSource.addEventListener("interaction_deleted",(_)=>{this.onEvent("interaction_deleted",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_status",(_)=>{this.onEvent("agent_status",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_steer_queued",(_)=>{this.onEvent("agent_steer_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_queued",(_)=>{this.onEvent("agent_followup_queued",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_consumed",(_)=>{this.onEvent("agent_followup_consumed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_followup_removed",(_)=>{this.onEvent("agent_followup_removed",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request",(_)=>{this.onEvent("agent_request",JSON.parse(_.data))}),this.eventSource.addEventListener("workspace_update",(_)=>{this.onEvent("workspace_update",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_request_timeout",(_)=>{this.onEvent("agent_request_timeout",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft",(_)=>{this.onEvent("agent_draft",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_draft_delta",(_)=>{this.onEvent("agent_draft_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought",(_)=>{this.onEvent("agent_thought",JSON.parse(_.data))}),this.eventSource.addEventListener("agent_thought_delta",(_)=>{this.onEvent("agent_thought_delta",JSON.parse(_.data))}),this.eventSource.addEventListener("model_changed",(_)=>{this.onEvent("model_changed",JSON.parse(_.data))}),this.eventSource.addEventListener("ui_theme",(_)=>{this.onEvent("ui_theme",JSON.parse(_.data))})}scheduleReconnect(){if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout);let _=10,$=60000,Z=Date.now();if(this.reconnectAttempts>=_)this.cooldownUntil=Math.max(this.cooldownUntil,Z+$),this.reconnectAttempts=0;let J=Math.max(this.cooldownUntil-Z,0),X=Math.max(this.reconnectDelay,J);this.reconnectTimeout=setTimeout(()=>{console.log("Reconnecting SSE..."),this.connect()},X),this.reconnectDelay=Math.min(this.reconnectDelay*2,30000)}reconnectIfNeeded(){if(this.status==="connected")return;let _=Date.now();if(this.cooldownUntil&&_<this.cooldownUntil)return;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null;this.connect()}disconnect(){if(this.connecting=!1,this.eventSource)this.eventSource.close(),this.eventSource=null;if(this.reconnectTimeout)clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null}}function f0(_){if(typeof window>"u"||!window.localStorage)return null;try{return window.localStorage.getItem(_)}catch{return null}}function f_(_,$){if(typeof window>"u"||!window.localStorage)return;try{window.localStorage.setItem(_,$)}catch{}}function Q2(_,$=!1){let Z=f0(_);if(Z===null)return $;return Z==="true"}function U2(_,$=null){let Z=f0(_);if(Z===null)return $;let J=parseInt(Z,10);return Number.isFinite(J)?J:$}function e0({prefix:_="file",label:$,title:Z,onRemove:J,onClick:X,removeTitle:Y="Remove",icon:j="file"}){let V=`${_}-file-pill`,N=`${_}-file-name`,O=`${_}-file-remove`,W=j==="message"?Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`:Q`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`;return Q`
    <span class=${V} title=${Z||$} onClick=${X}>
      ${W}
      <span class=${N}>${$}</span>
      ${J&&Q`
        <button
          class=${O}
          onClick=${(U)=>{U.preventDefault(),U.stopPropagation(),J()}}
          title=${Y}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `}
    </span>
  `}var I8=[{name:"/model",description:"Select model or list available models"},{name:"/cycle-model",description:"Cycle to the next available model"},{name:"/thinking",description:"Show or set thinking level"},{name:"/cycle-thinking",description:"Cycle thinking level"},{name:"/theme",description:"Set UI theme (use /theme list for options)"},{name:"/tint",description:"Tint default light/dark UI (usage: /tint #hex or /tint off)"},{name:"/state",description:"Show current session state"},{name:"/stats",description:"Show session token and cost stats"},{name:"/context",description:"Show context window usage"},{name:"/last",description:"Show last assistant response"},{name:"/compact",description:"Manually compact the session"},{name:"/auto-compact",description:"Toggle auto-compaction"},{name:"/auto-retry",description:"Toggle auto-retry"},{name:"/abort",description:"Abort the current response"},{name:"/abort-retry",description:"Abort retry backoff"},{name:"/abort-bash",description:"Abort running bash command"},{name:"/shell",description:"Run a shell command and return output"},{name:"/bash",description:"Run a shell command and add output to context"},{name:"/queue",description:"Queue a follow-up message (one-at-a-time)"},{name:"/queue-all",description:"Queue a follow-up message (batch all)"},{name:"/steer",description:"Steer the current response"},{name:"/steering-mode",description:"Set steering mode (all|one)"},{name:"/followup-mode",description:"Set follow-up mode (all|one)"},{name:"/session-name",description:"Set or show the session name"},{name:"/new-session",description:"Start a new session"},{name:"/switch-session",description:"Switch to a session file"},{name:"/fork",description:"Fork from a previous message"},{name:"/forks",description:"List forkable messages"},{name:"/tree",description:"List the session tree"},{name:"/label",description:"Set or clear a label on a tree entry"},{name:"/labels",description:"List labeled entries"},{name:"/agent-name",description:"Set or show the agent display name"},{name:"/agent-avatar",description:"Set or show the agent avatar URL"},{name:"/user-name",description:"Set or show your display name"},{name:"/user-avatar",description:"Set or show your avatar URL"},{name:"/user-github",description:"Set name/avatar from GitHub profile"},{name:"/export-html",description:"Export session to HTML"},{name:"/passkey",description:"Manage passkeys (enrol/list/delete)"},{name:"/totp",description:"Show a TOTP enrolment QR code"},{name:"/qr",description:"Generate a QR code for text or URL"},{name:"/search",description:"Search notes and skills in the workspace"},{name:"/restart",description:"Restart the agent and stop subprocesses"},{name:"/commands",description:"List available commands"}];function T8({usage:_}){let $=Math.min(100,Math.max(0,_.percent||0)),Z=_.tokens,J=_.contextWindow,X=Z!=null?`Context: ${a3(Z)} / ${a3(J)} tokens (${$.toFixed(0)}%)`:`Context: ${$.toFixed(0)}%`,Y=7,j=2*Math.PI*7,V=$/100*j,N=$>90?"var(--context-red, #ef4444)":$>75?"var(--context-amber, #f59e0b)":"var(--context-green, #22c55e)";return Q`
        <span class="compose-context-pie icon-btn" title=${X}>
            <svg width="16" height="16" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke="var(--context-track, rgba(128,128,128,0.2))"
                    stroke-width="2.5" />
                <circle cx="10" cy="10" r=${7}
                    fill="none"
                    stroke=${N}
                    stroke-width="2.5"
                    stroke-dasharray=${`${V} ${j}`}
                    stroke-linecap="round"
                    transform="rotate(-90 10 10)" />
            </svg>
        </span>
    `}function a3(_){if(_==null)return"?";if(_>=1e6)return(_/1e6).toFixed(1)+"M";if(_>=1000)return(_/1000).toFixed(0)+"K";return String(_)}function t3({onPost:_,onFocus:$,searchMode:Z,onSearch:J,onEnterSearch:X,onExitSearch:Y,fileRefs:j=[],onRemoveFileRef:V,onClearFileRefs:N,messageRefs:O=[],onRemoveMessageRef:W,onClearMessageRefs:U,activeModel:E=null,modelUsage:D=null,thinkingLevel:C=null,supportsThinking:w=!1,contextUsage:R=null,notificationsEnabled:M=!1,notificationPermission:H="default",onToggleNotifications:S,onModelChange:y,onModelStateChange:v,activeEditorPath:p=null,onAttachEditorFile:l,onOpenFilePill:Y_,followupQueueItems:B_=[],onInjectQueuedFollowup:$_,onRemoveQueuedFollowup:N_,onMessageResponse:P_,isAgentActive:r=!1}){let[e,d]=u(""),[i,Z_]=u(""),[j_,J_]=u([]),[v_,X_]=u(!1),[q_,z_]=u([]),[L_,A_]=u(0),[F_,U_]=u(!1),[C_,u_]=u(!1),[w_,b_]=u(!1),[y_,h_]=u([]),[i_,M_]=u(!1),K_=L(null),B0=L(null),a_=L(null),P0=L(null),K0=L(0),F0=200,Q_=(z)=>{let T=new Set,n=[];for(let O_ of z||[]){if(typeof O_!=="string")continue;let D_=O_.trim();if(!D_||T.has(D_))continue;T.add(D_),n.push(D_)}return n},G0=()=>{let z=f0("piclaw_compose_history");if(!z)return[];try{let T=JSON.parse(z);if(!Array.isArray(T))return[];return Q_(T)}catch{return[]}},E0=(z)=>{f_("piclaw_compose_history",JSON.stringify(z))},x=L(G0()),__=L(-1),E_=L(""),V0=e.trim()||j_.length>0||j.length>0||O.length>0,O0=typeof window<"u"&&typeof navigator<"u"&&Boolean(navigator.geolocation)&&Boolean(window.isSecureContext),d_=typeof window<"u"&&typeof Notification<"u",v0=typeof window<"u"?Boolean(window.isSecureContext):!1,c_=d_&&v0&&H!=="denied",D0=H==="granted"&&M,m_=D0?"Disable notifications":"Enable notifications",t_=E||"",x_=w&&C?` (${C})`:"",n0=x_.trim()?`${C}`:"",_2=typeof D?.hint_short==="string"?D.hint_short.trim():"",R0=[n0||null,_2||null].filter(Boolean).join(" • "),W2=[t_?`Current model: ${t_}${x_}`:null,D?.plan?`Plan: ${D.plan}`:null,_2||null,D?.primary?.reset_description||null,D?.secondary?.reset_description||null].filter(Boolean),k0=C_?"Switching model…":W2.join(" • ")||`Current model: ${t_}${x_} (tap to open model picker)`,C0=(z)=>{if(!z||typeof z!=="object")return;let T=z.model??z.current;if(typeof v==="function")v({model:T??null,thinking_level:z.thinking_level??null,supports_thinking:z.supports_thinking,provider_usage:z.provider_usage??null});if(T&&typeof y==="function")y(T)},J0=(z)=>{let T=z||K_.current;if(!T)return;T.style.height="auto",T.style.height=`${T.scrollHeight}px`,T.style.overflowY="hidden"},g0=(z)=>{if(!z.startsWith("/")||z.includes(`
`)){U_(!1),z_([]);return}let T=z.toLowerCase().split(" ")[0];if(T.length<1){U_(!1),z_([]);return}let n=I8.filter((O_)=>O_.name.startsWith(T)||O_.name.replace(/-/g,"").startsWith(T.replace(/-/g,"")));if(n.length>0&&!(n.length===1&&n[0].name===T))z_(n),A_(0),U_(!0);else U_(!1),z_([])},y0=(z)=>{let T=e,n=T.indexOf(" "),O_=n>=0?T.slice(n):"",D_=z.name+O_;d(D_),U_(!1),z_([]),requestAnimationFrame(()=>{let l_=K_.current;if(!l_)return;let V_=D_.length;l_.selectionStart=V_,l_.selectionEnd=V_,l_.focus()})},R_=(z)=>{if(Z)Z_(z);else d(z),g0(z);requestAnimationFrame(()=>J0())},o0=(z)=>{let T=Z?i:e,n=T&&!T.endsWith(`
`)?`
`:"",O_=`${T}${n}${z}`.trimStart();R_(O_)},j2=(z)=>{let T=z?.command?.model_label;if(T)return T;let n=z?.command?.message;if(typeof n==="string"){let O_=n.match(/•\s+([^\n]+?)\s+\(current\)/);if(O_?.[1])return O_[1].trim()}return null},$2=async(z)=>{if(Z||C_)return;u_(!0);try{let T=await H1("default",z,null,[]),n=j2(T);C0({model:n??E??null,thinking_level:T?.command?.thinking_level,supports_thinking:T?.command?.supports_thinking});try{let O_=await X2();if(O_)C0(O_)}catch{}return _?.(),!0}catch(T){return console.error("Failed to switch model:",T),alert("Failed to switch model: "+T.message),!1}finally{u_(!1)}},d0=async()=>{await $2("/cycle-model")},r_=async(z)=>{if(!z||C_)return;if(await $2(`/model ${z}`))b_(!1)},z0=(z)=>{z.preventDefault(),z.stopPropagation(),b_((T)=>!T)},Q0=(z)=>{if(z==="queue"||z==="steer"||z==="auto")return z;return r?"queue":null},I_=async(z,T,n={})=>{let{includeMedia:O_=!0,includeFileRefs:D_=!0,includeMessageRefs:l_=!0,clearAfterSubmit:V_=!0,recordHistory:X0=!0}=n||{},h0=typeof z==="string"?z:z&&typeof z?.target?.value==="string"?z.target.value:e,S0=typeof h0==="string"?h0:"";if(!S0.trim()&&(O_?j_.length===0:!0)&&(D_?j.length===0:!0)&&(l_?O.length===0:!0))return;U_(!1),z_([]);let p0=O_?[...j_]:[],K2=D_?[...j]:[],G2=l_?[...O]:[],s_=S0.trim();if(X0&&s_){let S_=x.current,W0=Q_(S_.filter((s0)=>s0!==s_));if(W0.push(s_),W0.length>200)W0.splice(0,W0.length-200);x.current=W0,E0(W0),__.current=-1,E_.current=""}if(V_)d(""),J_([]),N?.(),U?.();(async()=>{try{let S_=[];for(let N0 of p0){let A0=await u3(N0);S_.push(A0.id)}let W0=K2.length?`Files:
${K2.map((N0)=>`- ${N0}`).join(`
`)}`:"",s0=G2.length?`Referenced messages:
${G2.map((N0)=>`- message:${N0}`).join(`
`)}`:"",n_=S_.length?`Images:
${S_.map((N0,A0)=>{let E2=p0[A0]?.name||`image-${A0+1}`;return`- attachment:${N0} (${E2})`}).join(`
`)}`:"",$0=[s_,W0,s0,n_].filter(Boolean).join(`

`),x0=await H1("default",$0,null,S_,Q0(T));if(P_?.(x0),x0?.command){C0({model:x0.command.model_label??E??null,thinking_level:x0.command.thinking_level,supports_thinking:x0.command.supports_thinking});try{let N0=await X2();if(N0)C0(N0)}catch{}}_?.()}catch(S_){console.error("Failed to post:",S_)}})()},e_=(z)=>{$_?.(z)},g_=(z)=>{if(z.isComposing)return;if(Z&&z.key==="Escape"){z.preventDefault(),Z_(""),Y?.();return}if(F_&&q_.length>0){let T=K_.current?.value??(Z?i:e);if(!String(T||"").startsWith("/"))U_(!1),z_([]);else{if(z.key==="ArrowDown"){z.preventDefault(),A_((n)=>(n+1)%q_.length);return}if(z.key==="ArrowUp"){z.preventDefault(),A_((n)=>(n-1+q_.length)%q_.length);return}if(z.key==="Tab"){z.preventDefault(),y0(q_[L_]);return}if(z.key==="Enter"&&!z.shiftKey){if(!(K_.current?.value??(Z?i:e)).includes(" ")){z.preventDefault();let D_=q_[L_];U_(!1),z_([]),I_(D_.name);return}}if(z.key==="Escape"){z.preventDefault(),U_(!1),z_([]);return}}}if(!Z&&(z.key==="ArrowUp"||z.key==="ArrowDown")&&!z.metaKey&&!z.ctrlKey&&!z.altKey&&!z.shiftKey){let T=K_.current;if(!T)return;let n=T.value||"",O_=T.selectionStart===0&&T.selectionEnd===0,D_=T.selectionStart===n.length&&T.selectionEnd===n.length;if(z.key==="ArrowUp"&&O_||z.key==="ArrowDown"&&D_){let l_=x.current;if(!l_.length)return;z.preventDefault();let V_=__.current;if(z.key==="ArrowUp"){if(V_===-1)E_.current=n,V_=l_.length-1;else if(V_>0)V_-=1;__.current=V_,R_(l_[V_]||"")}else{if(V_===-1)return;if(V_<l_.length-1)V_+=1,__.current=V_,R_(l_[V_]||"");else __.current=-1,R_(E_.current||""),E_.current=""}requestAnimationFrame(()=>{let X0=K_.current;if(!X0)return;let h0=X0.value.length;X0.selectionStart=h0,X0.selectionEnd=h0});return}}if(z.key==="Enter"&&!z.shiftKey&&(z.ctrlKey||z.metaKey)){z.preventDefault();let T=K_.current?.value??(Z?i:e);if(Z){if(T.trim())J?.(T.trim())}else I_(T,"steer");return}if(z.key==="Enter"&&!z.shiftKey){z.preventDefault();let T=K_.current?.value??(Z?i:e);if(Z){if(T.trim())J?.(T.trim())}else I_(T)}},_0=(z)=>{let T=Array.from(z||[]).filter((n)=>n&&n.type&&n.type.startsWith("image/"));if(!T.length)return;J_((n)=>[...n,...T])},U0=(z)=>{_0(z.target.files),z.target.value=""},b0=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),K0.current+=1,X_(!0)},u0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),K0.current=Math.max(0,K0.current-1),K0.current===0)X_(!1)},Y0=(z)=>{if(Z)return;if(z.preventDefault(),z.stopPropagation(),z.dataTransfer)z.dataTransfer.dropEffect="copy";X_(!0)},Z2=(z)=>{if(Z)return;z.preventDefault(),z.stopPropagation(),K0.current=0,X_(!1),_0(z.dataTransfer?.files||[])},M0=(z)=>{if(Z)return;let T=z.clipboardData?.items;if(!T||!T.length)return;let n=[];for(let O_ of T){if(O_.kind!=="file")continue;let D_=O_.getAsFile?.();if(D_)n.push(D_)}if(n.length>0)z.preventDefault(),_0(n)},c0=(z)=>{J_((T)=>T.filter((n,O_)=>O_!==z))},r0=()=>{if(!navigator.geolocation){alert("Geolocation is not available in this browser.");return}navigator.geolocation.getCurrentPosition((z)=>{let{latitude:T,longitude:n,accuracy:O_}=z.coords,D_=`${T.toFixed(5)}, ${n.toFixed(5)}`,l_=Number.isFinite(O_)?` ±${Math.round(O_)}m`:"",V_=`https://maps.google.com/?q=${T},${n}`,X0=`Location: ${D_}${l_} ${V_}`;o0(X0)},(z)=>{let T=z?.message||"Unable to retrieve location.";alert(`Location error: ${T}`)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};m(()=>{if(!w_)return;M_(!0),X2().then((z)=>{let T=Array.isArray(z?.models)?z.models.filter((n)=>typeof n==="string"&&n.trim().length>0):[];h_(T),C0(z)}).catch((z)=>{console.warn("Failed to load model list:",z),h_([])}).finally(()=>{M_(!1)})},[w_,E]),m(()=>{if(Z)b_(!1)},[Z]),m(()=>{if(!w_)return;let z=(T)=>{let n=a_.current,O_=P0.current,D_=T.target;if(n&&n.contains(D_))return;if(O_&&O_.contains(D_))return;b_(!1)};return document.addEventListener("pointerdown",z),()=>document.removeEventListener("pointerdown",z)},[w_]);let m0=(z)=>{let T=z.target.value;J0(z.target),R_(T)};return m(()=>{requestAnimationFrame(()=>J0())},[e,i,Z]),Q`
        <div class="compose-box">
            ${!Z&&B_.length>0&&Q`
                <div class="compose-queue-stack">
                    ${B_.map((z)=>{let T=typeof z?.content==="string"?z.content:"";if(!T.trim())return null;return Q`
                            <div class="compose-queue-stack-item" role="listitem">
                                <span class="compose-queue-stack-content" title=${T}>
                                    ${T}
                                </span>
                                <button
                                    class="compose-queue-stack-steer-btn"
                                    type="button"
                                    title="Inject queued follow-up as steer"
                                    onClick=${()=>e_(z)}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4 20h12a2 2 0 0 0 2-2V8" />
                                        <polyline points="14 12 18 8 22 12" />
                                    </svg>
                                    <span>Steer</span>
                                </button>
                                <button
                                    class="compose-queue-stack-close-btn"
                                    type="button"
                                    title="Cancel queued message"
                                    onClick=${()=>N_?.(z)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        `})}
                </div>
            `}
            <div
                class=${`compose-input-wrapper${v_?" drag-active":""}`}
                onDragEnter=${b0}
                onDragOver=${Y0}
                onDragLeave=${u0}
                onDrop=${Z2}
            >
                <div class="compose-input-main">
                    ${(j.length>0||j_.length>0||O.length>0)&&Q`
                        <div class="compose-file-refs">
                            ${O.map((z)=>{return Q`
                                    <${e0}
                                        key=${"msg-"+z}
                                        prefix="compose"
                                        label=${"msg:"+z}
                                        title=${"Message reference: "+z}
                                        removeTitle="Remove reference"
                                        icon="message"
                                        onRemove=${()=>W?.(z)}
                                    />
                                `})}
                            ${j.map((z)=>{let T=z.split("/").pop()||z;return Q`
                                    <${e0}
                                        prefix="compose"
                                        label=${T}
                                        title=${z}
                                        onClick=${()=>Y_?.(z)}
                                        removeTitle="Remove file"
                                        onRemove=${()=>V?.(z)}
                                    />
                                `})}
                            ${j_.map((z,T)=>{let n=z?.name||`image-${T+1}`;return Q`
                                    <${e0}
                                        key=${n+T}
                                        prefix="compose"
                                        label=${n}
                                        title=${n}
                                        removeTitle="Remove image"
                                        onRemove=${()=>c0(T)}
                                    />
                                `})}
                        </div>
                    `}
                    <textarea
                        ref=${K_}
                        placeholder=${Z?"Search (Enter to run)...":"Message (Enter to send, Shift+Enter for newline)..."}
                        value=${Z?i:e}
                        onInput=${m0}
                        onKeyDown=${g_}
                        onPaste=${M0}
                        onFocus=${$}
                        onClick=${$}
                        rows="1"
                    />
                    ${F_&&q_.length>0&&Q`
                        <div class="slash-autocomplete" ref=${B0}>
                            ${q_.map((z,T)=>Q`
                                <div
                                    key=${z.name}
                                    class=${`slash-item${T===L_?" active":""}`}
                                    onMouseDown=${(n)=>{n.preventDefault(),y0(z)}}
                                    onMouseEnter=${()=>A_(T)}
                                >
                                    <span class="slash-name">${z.name}</span>
                                    <span class="slash-desc">${z.description}</span>
                                </div>
                            `)}
                        </div>
                    `}
                    ${w_&&!Z&&Q`
                        <div class="compose-model-popup" ref=${a_}>
                            <div class="compose-model-popup-title">Select model</div>
                            <div class="compose-model-popup-menu" role="menu" aria-label="Model picker">
                                ${i_&&Q`
                                    <div class="compose-model-popup-empty">Loading models…</div>
                                `}
                                ${!i_&&y_.length===0&&Q`
                                    <div class="compose-model-popup-empty">No models available.</div>
                                `}
                                ${!i_&&y_.map((z)=>Q`
                                    <button
                                        key=${z}
                                        type="button"
                                        role="menuitem"
                                        class=${`compose-model-popup-item${E===z?" active":""}`}
                                        onClick=${()=>{r_(z)}}
                                        disabled=${C_}
                                    >
                                        ${z}
                                    </button>
                                `)}
                            </div>
                            <div class="compose-model-popup-actions">
                                <button
                                    type="button"
                                    class="compose-model-popup-btn"
                                    onClick=${()=>{d0()}}
                                    disabled=${C_}
                                >
                                    Next model
                                </button>
                            </div>
                        </div>
                    `}
                </div>
                <div class="compose-footer">
                    ${!Z&&E&&Q`
                    <div class="compose-meta-row">
                        ${!Z&&E&&Q`
                            <div class="compose-model-meta">
                                <button
                                    ref=${P0}
                                    type="button"
                                    class="compose-model-hint compose-model-hint-btn"
                                    title=${k0}
                                    aria-label="Open model picker"
                                    onClick=${z0}
                                    disabled=${C_}
                                >
                                    ${C_?"Switching…":t_}
                                </button>
                                <div class="compose-model-meta-subline">
                                    ${!C_&&R0&&Q`
                                        <span class="compose-model-usage-hint" title=${k0}>
                                            ${R0}
                                        </span>
                                    `}
                                </div>
                            </div>
                        `}
                    </div>
                    `}
                    <div class="compose-actions ${Z?"search-mode":""}">
                    ${!Z&&R&&R.percent!=null&&Q`
                        <${T8} usage=${R} />
                    `}
                    <button
                        class="icon-btn search-toggle"
                        onClick=${Z?Y:X}
                        title=${Z?"Close search":"Search"}
                    >
                        ${Z?Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        `:Q`
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        `}
                    </button>
                    ${O0&&!Z&&Q`
                        <button
                            class="icon-btn location-btn"
                            onClick=${r0}
                            title="Share location"
                            type="button"
                            disabled=${!1}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14 14 0 0 1 0 20a14 14 0 0 1 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </button>
                    `}
                    ${c_&&!Z&&Q`
                        <button
                            class=${`icon-btn notification-btn${D0?" active":""}`}
                            onClick=${S}
                            title=${m_}
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    `}
                    ${!Z&&Q`
                        ${p&&l&&Q`
                            <button
                                class="icon-btn attach-editor-btn"
                                onClick=${l}
                                title=${`Attach open file: ${p}`}
                                type="button"
                                disabled=${j.includes(p)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                            </button>
                        `}
                        <label class="icon-btn" title="Attach image">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <input type="file" accept="image/*" multiple hidden onChange=${U0} />
                        </label>
                        <button 
                            class="icon-btn send-btn" 
                            type="button"
                            onClick=${()=>{I_()}}
                            disabled=${!V0}
                            title="Send (Enter)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    `}
                </div>
            </div>
        </div>
        </div>
    `}var _4="piclaw_theme",b1="piclaw_tint",r2={bgPrimary:"#ffffff",bgSecondary:"#f7f9fa",bgHover:"#e8ebed",textPrimary:"#0f1419",textSecondary:"#536471",borderColor:"#eff3f4",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},f8={bgPrimary:"#000000",bgSecondary:"#16181c",bgHover:"#1d1f23",textPrimary:"#e7e9ea",textSecondary:"#71767b",borderColor:"#2f3336",accent:"#1d9bf0",accentHover:"#1a8cd8",danger:"#f4212e",success:"#00ba7c"},e3={default:{label:"Default",mode:"auto",light:r2,dark:f8},tango:{label:"Tango",mode:"light",light:{bgPrimary:"#f6f5f4",bgSecondary:"#efedeb",bgHover:"#e5e3e1",textPrimary:"#2e3436",textSecondary:"#5c6466",borderColor:"#d3d7cf",accent:"#3465a4",accentHover:"#2c5890",danger:"#cc0000",success:"#4e9a06"}},xterm:{label:"XTerm",mode:"dark",dark:{bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgHover:"#121212",textPrimary:"#d0d0d0",textSecondary:"#8a8a8a",borderColor:"#1f1f1f",accent:"#00a2ff",accentHover:"#0086d1",danger:"#ff5f5f",success:"#5fff87"}},monokai:{label:"Monokai",mode:"dark",dark:{bgPrimary:"#272822",bgSecondary:"#2f2f2f",bgHover:"#3a3a3a",textPrimary:"#f8f8f2",textSecondary:"#cfcfc2",borderColor:"#3e3d32",accent:"#f92672",accentHover:"#e81560",danger:"#f92672",success:"#a6e22e"}},"monokai-pro":{label:"Monokai Pro",mode:"dark",dark:{bgPrimary:"#2d2a2e",bgSecondary:"#363237",bgHover:"#403a40",textPrimary:"#fcfcfa",textSecondary:"#c1c0c0",borderColor:"#444046",accent:"#ff6188",accentHover:"#f74f7e",danger:"#ff4f5e",success:"#a9dc76"}},ristretto:{label:"Ristretto",mode:"dark",dark:{bgPrimary:"#2c2525",bgSecondary:"#362d2d",bgHover:"#403535",textPrimary:"#f4f1ef",textSecondary:"#cbbdb8",borderColor:"#4a3c3c",accent:"#ff9f43",accentHover:"#f28a2e",danger:"#ff5f56",success:"#a9dc76"}},dracula:{label:"Dracula",mode:"dark",dark:{bgPrimary:"#282a36",bgSecondary:"#303445",bgHover:"#3a3f52",textPrimary:"#f8f8f2",textSecondary:"#c5c8d6",borderColor:"#44475a",accent:"#bd93f9",accentHover:"#a87ded",danger:"#ff5555",success:"#50fa7b"}},catppuccin:{label:"Catppuccin",mode:"dark",dark:{bgPrimary:"#1e1e2e",bgSecondary:"#24273a",bgHover:"#2c2f41",textPrimary:"#cdd6f4",textSecondary:"#a6adc8",borderColor:"#313244",accent:"#89b4fa",accentHover:"#74a0f5",danger:"#f38ba8",success:"#a6e3a1"}},nord:{label:"Nord",mode:"dark",dark:{bgPrimary:"#2e3440",bgSecondary:"#3b4252",bgHover:"#434c5e",textPrimary:"#eceff4",textSecondary:"#d8dee9",borderColor:"#4c566a",accent:"#88c0d0",accentHover:"#78a9c0",danger:"#bf616a",success:"#a3be8c"}},gruvbox:{label:"Gruvbox",mode:"dark",dark:{bgPrimary:"#282828",bgSecondary:"#32302f",bgHover:"#3c3836",textPrimary:"#ebdbb2",textSecondary:"#bdae93",borderColor:"#3c3836",accent:"#d79921",accentHover:"#c28515",danger:"#fb4934",success:"#b8bb26"}},solarized:{label:"Solarized",mode:"auto",light:{bgPrimary:"#fdf6e3",bgSecondary:"#f5efdc",bgHover:"#eee8d5",textPrimary:"#586e75",textSecondary:"#657b83",borderColor:"#e0d8c6",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"},dark:{bgPrimary:"#002b36",bgSecondary:"#073642",bgHover:"#0b3c4a",textPrimary:"#eee8d5",textSecondary:"#93a1a1",borderColor:"#18424a",accent:"#268bd2",accentHover:"#1f78b3",danger:"#dc322f",success:"#859900"}},tokyo:{label:"Tokyo",mode:"dark",dark:{bgPrimary:"#1a1b26",bgSecondary:"#24283b",bgHover:"#2f3549",textPrimary:"#c0caf5",textSecondary:"#9aa5ce",borderColor:"#414868",accent:"#7aa2f7",accentHover:"#6b92e6",danger:"#f7768e",success:"#9ece6a"}},miasma:{label:"Miasma",mode:"dark",dark:{bgPrimary:"#1f1f23",bgSecondary:"#29292f",bgHover:"#33333a",textPrimary:"#e5e5e5",textSecondary:"#b4b4b4",borderColor:"#3d3d45",accent:"#c9739c",accentHover:"#b8618c",danger:"#e06c75",success:"#98c379"}},github:{label:"GitHub",mode:"auto",light:{bgPrimary:"#ffffff",bgSecondary:"#f6f8fa",bgHover:"#eaeef2",textPrimary:"#24292f",textSecondary:"#57606a",borderColor:"#d0d7de",accent:"#0969da",accentHover:"#0550ae",danger:"#cf222e",success:"#1a7f37"},dark:{bgPrimary:"#0d1117",bgSecondary:"#161b22",bgHover:"#21262d",textPrimary:"#c9d1d9",textSecondary:"#8b949e",borderColor:"#30363d",accent:"#2f81f7",accentHover:"#1f6feb",danger:"#f85149",success:"#3fb950"}},gotham:{label:"Gotham",mode:"dark",dark:{bgPrimary:"#0b0f14",bgSecondary:"#111720",bgHover:"#18212b",textPrimary:"#cbd6e2",textSecondary:"#9bb0c3",borderColor:"#1f2a37",accent:"#5ccfe6",accentHover:"#48b8ce",danger:"#d26937",success:"#2aa889"}}},v8=["--bg-primary","--bg-secondary","--bg-hover","--text-primary","--text-secondary","--border-color","--accent-color","--accent-hover","--accent-soft","--accent-soft-strong","--danger-color","--success-color","--search-highlight-color"],s2={theme:"default",tint:null},$4="light",w1=!1;function Z4(_){let $=String(_||"").trim().toLowerCase();if(!$)return"default";if($==="solarized-dark"||$==="solarized-light")return"solarized";if($==="github-dark"||$==="github-light")return"github";if($==="tokyo-night")return"tokyo";return $}function H2(_){if(!_)return null;let $=String(_).trim();if(!$)return null;let Z=$.startsWith("#")?$.slice(1):$;if(!/^[0-9a-fA-F]{3}$/.test(Z)&&!/^[0-9a-fA-F]{6}$/.test(Z))return null;let J=Z.length===3?Z.split("").map((Y)=>Y+Y).join(""):Z,X=parseInt(J,16);return{r:X>>16&255,g:X>>8&255,b:X&255,hex:`#${J.toLowerCase()}`}}function R8(_){if(!_||typeof document>"u")return null;let $=String(_).trim();if(!$)return null;let Z=document.createElement("div");if(Z.style.color="",Z.style.color=$,!Z.style.color)return null;let J=Z.style.color;try{if(document.body)Z.style.display="none",document.body.appendChild(Z),J=getComputedStyle(Z).color||Z.style.color,document.body.removeChild(Z)}catch{}let X=J.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!X)return null;let Y=parseInt(X[1],10),j=parseInt(X[2],10),V=parseInt(X[3],10);if(![Y,j,V].every((O)=>Number.isFinite(O)))return null;let N=`#${[Y,j,V].map((O)=>O.toString(16).padStart(2,"0")).join("")}`;return{r:Y,g:j,b:V,hex:N}}function J4(_){return H2(_)||R8(_)}function A2(_,$,Z){let J=Math.round(_.r+($.r-_.r)*Z),X=Math.round(_.g+($.g-_.g)*Z),Y=Math.round(_.b+($.b-_.b)*Z);return`rgb(${J} ${X} ${Y})`}function P1(_,$){return`rgba(${_.r}, ${_.g}, ${_.b}, ${$})`}function Y4(){if(typeof window>"u")return"light";try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function M1(_){return e3[_]||e3.default}function g8(_){return _.mode==="auto"?Y4():_.mode}function u8(_,$){let Z=M1(_);if($==="dark"&&Z.dark)return Z.dark;if($==="light"&&Z.light)return Z.light;return Z.dark||Z.light||r2}function c8(_,$,Z){let J=J4($);if(!J)return _;let X=H2(_.bgPrimary),Y=H2(_.bgSecondary),j=H2(_.bgHover),V=H2(_.borderColor);if(!X||!Y||!j||!V)return _;let O=H2(Z==="dark"?"#ffffff":"#000000");return{..._,bgPrimary:A2(X,J,0.08),bgSecondary:A2(Y,J,0.12),bgHover:A2(j,J,0.16),borderColor:A2(V,J,0.08),accent:J.hex,accentHover:O?A2(J,O,0.18):J.hex}}function m8(_,$){if(typeof document>"u")return;let Z=document.documentElement,J=_.accent,X=J4(J),Y=X?P1(X,$==="dark"?0.35:0.2):_.searchHighlight||_.searchHighlightColor,j=X?P1(X,$==="dark"?0.16:0.12):"rgba(29, 155, 240, 0.12)",V=X?P1(X,$==="dark"?0.28:0.2):"rgba(29, 155, 240, 0.2)",N={"--bg-primary":_.bgPrimary,"--bg-secondary":_.bgSecondary,"--bg-hover":_.bgHover,"--text-primary":_.textPrimary,"--text-secondary":_.textSecondary,"--border-color":_.borderColor,"--accent-color":J,"--accent-hover":_.accentHover||J,"--accent-soft":j,"--accent-soft-strong":V,"--danger-color":_.danger||r2.danger,"--success-color":_.success||r2.success,"--search-highlight-color":Y||"rgba(29, 155, 240, 0.2)"};Object.entries(N).forEach(([O,W])=>{if(W)Z.style.setProperty(O,W)})}function h8(){if(typeof document>"u")return;let _=document.documentElement;v8.forEach(($)=>_.style.removeProperty($))}function o2(_){if(typeof document>"u")return null;let $=document.querySelector(`meta[name="${_}"]`);if(!$)$=document.createElement("meta"),$.setAttribute("name",_),document.head.appendChild($);return $}function p8(_,$){if(typeof document>"u")return;let Z=o2("theme-color");if(Z&&_)Z.setAttribute("content",_);let J=o2("msapplication-TileColor");if(J&&_)J.setAttribute("content",_);let X=o2("msapplication-navbutton-color");if(X&&_)X.setAttribute("content",_);let Y=o2("apple-mobile-web-app-status-bar-style");if(Y)Y.setAttribute("content",$==="dark"?"black-translucent":"default")}function i8(){if(typeof window>"u")return;let _={...s2,mode:$4};window.dispatchEvent(new CustomEvent("piclaw-theme-change",{detail:_}))}function S1(_,$={}){if(typeof window>"u"||typeof document>"u")return;let Z=Z4(_?.theme||"default"),J=_?.tint?String(_.tint).trim():null,X=M1(Z),Y=g8(X),j=u8(Z,Y);s2={theme:Z,tint:J},$4=Y;let V=document.documentElement;V.dataset.theme=Y,V.dataset.colorTheme=Z,V.dataset.tint=J?String(J):"",V.style.colorScheme=Y;let N=j;if(Z==="default"&&J)N=c8(j,J,Y);if(Z==="default"&&!J)h8();else m8(N,Y);if(p8(N.bgPrimary,Y),i8(),$.persist!==!1)if(f_(_4,Z),J)f_(b1,J);else f_(b1,"")}function d2(){if(M1(s2.theme).mode!=="auto")return;S1(s2,{persist:!1})}function X4(){if(typeof window>"u")return()=>{};let _=Z4(f0(_4)||"default"),$=f0(b1),Z=$?$.trim():null;if(S1({theme:_,tint:Z},{persist:!1}),window.matchMedia&&!w1){let J=window.matchMedia("(prefers-color-scheme: dark)");if(J.addEventListener)J.addEventListener("change",d2);else if(J.addListener)J.addListener(d2);return w1=!0,()=>{if(J.removeEventListener)J.removeEventListener("change",d2);else if(J.removeListener)J.removeListener(d2);w1=!1}}return()=>{}}function W4(_){if(!_||typeof _!=="object")return;let $=_.chat_jid||_.chatJid;if($&&$!=="web:default")return;let Z=_.theme??_.name??_.colorTheme,J=_.tint??null;S1({theme:Z||"default",tint:J},{persist:!0})}function j4(){if(typeof document>"u")return"light";let _=document.documentElement?.dataset?.theme;if(_==="dark"||_==="light")return _;return Y4()}var a2=/#(\w+)/g,l8=new Set(["strong","em","b","i","u","s","br","p","ul","ol","li","blockquote","ruby","rt","rp"]),n8=new Set(["a","abbr","blockquote","br","code","div","em","hr","h1","h2","h3","h4","h5","h6","i","img","kbd","li","mark","ol","p","pre","ruby","rt","rp","s","span","strong","sub","sup","table","tbody","td","th","thead","tr","u","ul","math","semantics","mrow","mi","mn","mo","mtext","mspace","msup","msub","msubsup","mfrac","msqrt","mroot","mtable","mtr","mtd","annotation"]),o8=new Set(["class","style","title","role","aria-hidden","aria-label","aria-expanded","aria-live","data-mermaid","data-hashtag"]),d8={a:new Set(["href","target","rel"]),img:new Set(["src","alt","title"])},r8=new Set(["http:","https:","mailto:",""]);function K4(_){return String(_||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;")}function L2(_,$={}){if(!_)return null;let Z=String(_).trim();if(!Z)return null;if(Z.startsWith("#")||Z.startsWith("/"))return Z;if(Z.startsWith("data:")){if($.allowDataImage&&/^data:image\//i.test(Z))return Z;return null}if(Z.startsWith("blob:"))return Z;try{let J=new URL(Z,typeof window<"u"?window.location.origin:"http://localhost");if(!r8.has(J.protocol))return null;return J.href}catch{return null}}function G4(_,$={}){if(!_)return"";let Z=new DOMParser().parseFromString(_,"text/html"),J=[],X=Z.createTreeWalker(Z.body,NodeFilter.SHOW_ELEMENT),Y;while(Y=X.nextNode())J.push(Y);for(let j of J){let V=j.tagName.toLowerCase();if(!n8.has(V)){let O=j.parentNode;if(!O)continue;while(j.firstChild)O.insertBefore(j.firstChild,j);O.removeChild(j);continue}let N=d8[V]||new Set;for(let O of Array.from(j.attributes)){let W=O.name.toLowerCase(),U=O.value;if(W.startsWith("on")){j.removeAttribute(O.name);continue}if(W.startsWith("data-")||W.startsWith("aria-"))continue;if(N.has(W)||o8.has(W)){if(W==="href"){let E=L2(U);if(!E)j.removeAttribute(O.name);else if(j.setAttribute(O.name,E),V==="a"&&!j.getAttribute("rel"))j.setAttribute("rel","noopener noreferrer")}else if(W==="src"){let E=V==="img"&&typeof $.rewriteImageSrc==="function"?$.rewriteImageSrc(U):U,D=L2(E,{allowDataImage:V==="img"});if(!D)j.removeAttribute(O.name);else j.setAttribute(O.name,D)}continue}j.removeAttribute(O.name)}}return Z.body.innerHTML}function V4(_){if(!_)return _;let $=_.replace(/</g,"&lt;").replace(/>/g,"&gt;");return new DOMParser().parseFromString($,"text/html").documentElement.textContent}function t2(_,$=2){if(!_)return _;let Z=_;for(let J=0;J<$;J+=1){let X=V4(Z);if(X===Z)break;Z=X}return Z}function s8(_){if(!_)return{text:"",blocks:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=[],Y=!1,j=[];for(let V of Z){if(!Y&&V.trim().match(/^```mermaid\s*$/i)){Y=!0,j=[];continue}if(Y&&V.trim().match(/^```\s*$/)){let N=J.length;J.push(j.join(`
`)),X.push(`@@MERMAID_BLOCK_${N}@@`),Y=!1,j=[];continue}if(Y)j.push(V);else X.push(V)}if(Y)X.push("```mermaid"),X.push(...j);return{text:X.join(`
`),blocks:J}}function a8(_){if(!_)return _;return t2(_,5)}function t8(_){let $=new TextEncoder().encode(String(_||"")),Z="";for(let J of $)Z+=String.fromCharCode(J);return btoa(Z)}function e8(_){let $=atob(String(_||"")),Z=new Uint8Array($.length);for(let J=0;J<$.length;J+=1)Z[J]=$.charCodeAt(J);return new TextDecoder().decode(Z)}function _6(_,$){if(!_||!$||$.length===0)return _;return _.replace(/@@MERMAID_BLOCK_(\d+)@@/g,(Z,J)=>{let X=Number(J),Y=$[X]??"",j=a8(Y);return`<div class="mermaid-container" data-mermaid="${t8(j)}"><div class="mermaid-loading">Loading diagram...</div></div>`})}function N4(_){if(!_)return _;return _.replace(/<code>([\s\S]*?)<\/code>/gi,($,Z)=>{if(Z.includes(`
`))return`
\`\`\`
${Z}
\`\`\`
`;return`\`${Z}\``})}function O4(_){if(!_)return _;return _.replace(/&lt;([\s\S]*?)&gt;/g,($,Z)=>{let J=Z.trim(),X=J.startsWith("/"),Y=X?J.slice(1).trim():J,N=(Y.endsWith("/")?Y.slice(0,-1).trim():Y).split(/\s+/)[0]?.toLowerCase();if(!N||!l8.has(N))return $;if(N==="br")return X?"":"<br>";if(X)return`</${N}>`;return`<${N}>`})}function B4(_){if(!_)return _;let $=(Z)=>Z.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;").replace(/&amp;quot;/g,"&quot;").replace(/&amp;#39;/g,"&#39;").replace(/&amp;amp;/g,"&amp;");return _.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(Z,J)=>`<pre><code>${$(J)}</code></pre>`).replace(/<code>([\s\S]*?)<\/code>/g,(Z,J)=>`<code>${$(J)}</code>`)}function q4(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=(Y)=>Y.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&"),X;while(X=Z.nextNode()){if(!X.nodeValue)continue;let Y=J(X.nodeValue);if(Y!==X.nodeValue)X.nodeValue=Y}return $.body.innerHTML}function $6(_){if(!window.katex)return _;let $=(j)=>V4(j).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/<br\s*\/?\s*>/gi,`
`),Z=(j)=>{let V=[],N=j.replace(/<pre\b[^>]*>\s*<code\b[^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi,(O)=>{let W=V.length;return V.push(O),`@@CODE_BLOCK_${W}@@`});return N=N.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi,(O)=>{let W=V.length;return V.push(O),`@@CODE_INLINE_${W}@@`}),{html:N,blocks:V}},J=(j,V)=>{if(!V.length)return j;return j.replace(/@@CODE_(?:BLOCK|INLINE)_(\d+)@@/g,(N,O)=>{let W=Number(O);return V[W]??""})},X=Z(_),Y=X.html;return Y=Y.replace(/(^|\n|<br\s*\/?\s*>|<p>|<\/p>)\s*\$\$([\s\S]+?)\$\$\s*(?=\n|<br\s*\/?\s*>|<\/p>|$)/gi,(j,V,N)=>{try{let O=katex.renderToString($(N.trim()),{displayMode:!0,throwOnError:!1});return`${V}${O}`}catch(O){return`<span class="math-error" title="${K4(O.message)}">${j}</span>`}}),Y=Y.replace(/(^|[^\\$])\$(?!\s)([^\n$]+?)\$/g,(j,V,N)=>{if(/\s$/.test(N))return j;try{let O=katex.renderToString($(N),{displayMode:!1,throwOnError:!1});return`${V}${O}`}catch(O){return`${V}<span class="math-error" title="${K4(O.message)}">$${N}$</span>`}}),J(Y,X.blocks)}function Z6(_){if(!_)return _;let $=new DOMParser().parseFromString(_,"text/html"),Z=$.createTreeWalker($.body,NodeFilter.SHOW_TEXT),J=[],X;while(X=Z.nextNode())J.push(X);for(let Y of J){let j=Y.nodeValue;if(!j)continue;if(a2.lastIndex=0,!a2.test(j))continue;a2.lastIndex=0;let V=Y.parentElement;if(V&&(V.closest("a")||V.closest("code")||V.closest("pre")))continue;let N=j.split(a2);if(N.length<=1)continue;let O=$.createDocumentFragment();N.forEach((W,U)=>{if(U%2===1){let E=$.createElement("a");E.setAttribute("href","#"),E.className="hashtag",E.setAttribute("data-hashtag",W),E.textContent=`#${W}`,O.appendChild(E)}else O.appendChild($.createTextNode(W))}),Y.parentNode?.replaceChild(O,Y)}return $.body.innerHTML}function J6(_){if(!_)return _;let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=[],X=!1;for(let Y of Z){if(!X&&Y.trim().match(/^```(?:math|katex|latex)\s*$/i)){X=!0,J.push("$$");continue}if(X&&Y.trim().match(/^```\s*$/)){X=!1,J.push("$$");continue}J.push(Y)}return J.join(`
`)}function F2(_,$,Z={}){if(!_)return"";let J=J6(_),{text:X,blocks:Y}=s8(J),j=t2(X,2),N=N4(j).replace(/</g,"&lt;").replace(/>/g,"&gt;"),O=O4(N),W=window.marked?marked.parse(O,{headerIds:!1,mangle:!1}):O.replace(/\n/g,"<br>");return W=B4(W),W=q4(W),W=$6(W),W=Z6(W),W=_6(W,Y),W=G4(W,Z),W}function z4(_){if(!_)return"";let $=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`),Z=t2($,2),X=N4(Z).replace(/</g,"&lt;").replace(/>/g,"&gt;"),Y=O4(X),j=window.marked?marked.parse(Y):Y.replace(/\n/g,"<br>");return j=B4(j),j=q4(j),j=G4(j),j}async function e2(_){if(!window.beautifulMermaid)return;let{renderMermaid:$,THEMES:Z}=window.beautifulMermaid,X=j4()==="dark"?Z["tokyo-night"]:Z["github-light"],Y=_.querySelectorAll(".mermaid-container[data-mermaid]");for(let j of Y)try{let V=j.dataset.mermaid,N=e8(V||""),O=t2(N,2),W=await $(O,{...X,transparent:!0});j.innerHTML=W,j.removeAttribute("data-mermaid")}catch(V){console.error("Mermaid render error:",V);let N=document.createElement("pre");N.className="mermaid-error",N.textContent=`Diagram error: ${V.message}`,j.innerHTML="",j.appendChild(N),j.removeAttribute("data-mermaid")}}var Q4="PiClaw";function x1(_,$){let Z=_||"PiClaw",J=Z.charAt(0).toUpperCase(),X=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE","#85C1E2","#F8B195","#6C5CE7","#00B894","#FDCB6E","#E17055","#74B9FF","#A29BFE","#FD79A8","#00CEC9","#FFEAA7","#DFE6E9","#FF7675","#55EFC4","#81ECEC","#FAB1A0","#74B9FF","#A29BFE","#FD79A8"],Y=J.charCodeAt(0)%X.length,j=X[Y],V=Z.trim().toLowerCase(),N=typeof $==="string"?$.trim():"",W=(N?N:null)||(V==="PiClaw".toLowerCase()||V==="pi"?"/static/icon-192.png":null);return{letter:J,color:j,image:W}}function U4(_,$){if(!_)return"PiClaw";let Z=$[_]?.name||_;return Z?Z.charAt(0).toUpperCase()+Z.slice(1):"PiClaw"}function H4(_,$){if(!_)return null;let Z=$[_]||{};return Z.avatar_url||Z.avatarUrl||Z.avatar||null}function L4(_){if(!_)return null;if(typeof document<"u"){let Y=document.documentElement,j=Y?.dataset?.colorTheme||"",V=Y?.dataset?.tint||"",N=getComputedStyle(Y).getPropertyValue("--accent-color")?.trim();if(N&&(V||j&&j!=="default"))return N}let $=["#4ECDC4","#FF6B6B","#45B7D1","#BB8FCE","#FDCB6E","#00B894","#74B9FF","#FD79A8","#81ECEC","#FFA07A"],Z=String(_),J=0;for(let Y=0;Y<Z.length;Y+=1)J=(J*31+Z.charCodeAt(Y))%2147483647;let X=Math.abs(J)%$.length;return $[X]}function F4({status:_,draft:$,plan:Z,thought:J,pendingRequest:X,intent:Y,turnId:j,steerQueued:V,onPanelToggle:N}){let U=(X_)=>{if(!X_)return{text:"",totalLines:0,fullText:""};if(typeof X_==="string"){let A_=X_,F_=A_?A_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:A_,totalLines:F_,fullText:A_}}let q_=X_.text||"",z_=X_.fullText||X_.full_text||q_,L_=Number.isFinite(X_.totalLines)?X_.totalLines:z_?z_.replace(/\r\n/g,`
`).split(`
`).length:0;return{text:q_,totalLines:L_,fullText:z_}},E=160,D=(X_)=>{if(!X_)return 1;return Math.max(1,Math.ceil(X_.length/160))},C=(X_,q_,z_)=>{let L_=(X_||"").replace(/\r\n/g,`
`).replace(/\r/g,`
`);if(!L_)return{text:"",omitted:0,totalLines:Number.isFinite(z_)?z_:0,visibleLines:0};let A_=L_.split(`
`),F_=A_.length>q_?A_.slice(0,q_).join(`
`):L_,U_=Number.isFinite(z_)?z_:A_.reduce((w_,b_)=>w_+D(b_),0),C_=F_?F_.split(`
`).reduce((w_,b_)=>w_+D(b_),0):0,u_=Math.max(U_-C_,0);return{text:F_,omitted:u_,totalLines:U_,visibleLines:C_}},w=U(Z),R=U(J),M=U($),H=Boolean(w.text)||w.totalLines>0,S=Boolean(R.text)||R.totalLines>0,y=Boolean(M.fullText?.trim()||M.text?.trim());if(!_&&!y&&!H&&!S&&!X&&!Y)return null;let[v,p]=u(new Set),l=(X_)=>p((q_)=>{let z_=new Set(q_),L_=!z_.has(X_);if(L_)z_.add(X_);else z_.delete(X_);if(typeof N==="function")N(X_,L_);return z_});m(()=>{p(new Set)},[j]);let Y_=_?.turn_id||j,B_=L4(Y_),$_=V?"turn-dot turn-dot-queued":"turn-dot",N_=(X_)=>X_,P_=Boolean(_?.last_activity||_?.lastActivity),r=Y?.kind||"info",e=r==="warning"?"#f59e0b":r==="error"?"var(--danger-color)":r==="success"?"var(--success-color)":B_,d="",i=_?.title,Z_=_?.status;if(_?.type==="plan")d=i?`Planning: ${i}`:"Planning...";else if(_?.type==="tool_call")d=i?`Running: ${i}`:"Running tool...";else if(_?.type==="tool_status")d=i?`${i}: ${Z_||"Working..."}`:Z_||"Working...";else if(_?.type==="error")d=i||"Agent error";else d=i||Z_||"Working...";if(P_)d="Last activity just now";let j_=({panelTitle:X_,text:q_,fullText:z_,totalLines:L_,maxLines:A_,titleClass:F_,panelKey:U_})=>{let C_=v.has(U_),u_=z_||q_||"",w_=typeof A_==="number",b_=C_&&w_,y_=w_?C(u_,A_,L_):{text:u_||"",omitted:0,totalLines:Number.isFinite(L_)?L_:0};if(!u_&&!(Number.isFinite(y_.totalLines)&&y_.totalLines>0))return null;let h_=`agent-thinking-body${w_?" agent-thinking-body-collapsible":""}`,i_=w_?`--agent-thinking-collapsed-lines: ${A_};`:"";return Q`
            <div
                class="agent-thinking"
                data-expanded=${C_?"true":"false"}
                data-collapsible=${w_?"true":"false"}
                style=${B_?`--turn-color: ${B_};`:""}
            >
                <div class="agent-thinking-title ${F_||""}">
                    ${B_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${X_}
                    ${b_&&Q`
                        <button
                            class="agent-thinking-close"
                            aria-label=${`Close ${X_} panel`}
                            onClick=${()=>l(U_)}
                        >
                            ×
                        </button>
                    `}
                </div>
                <div
                    class=${h_}
                    style=${i_}
                    dangerouslySetInnerHTML=${{__html:z4(u_)}}
                />
                ${!C_&&y_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>l(U_)}>
                        ▸ ${y_.omitted} more lines
                    </button>
                `}
                ${C_&&y_.omitted>0&&Q`
                    <button class="agent-thinking-truncation" onClick=${()=>l(U_)}>
                        ▴ show less
                    </button>
                `}
            </div>
        `},J_=X?.tool_call?.title,v_=J_?`Awaiting approval: ${J_}`:"Awaiting approval";return Q`
        <div class="agent-status-panel">
            ${Y&&Q`
                <div
                    class="agent-thinking agent-thinking-intent"
                    aria-live="polite"
                    style=${e?`--turn-color: ${e};`:""}
                    title=${Y?.detail||""}
                >
                    <div class="agent-thinking-title intent">
                        ${e&&Q`<span class=${$_} aria-hidden="true"></span>`}
                        ${Y.title}
                    </div>
                    ${Y.detail&&Q`<div class="agent-thinking-body">${Y.detail}</div>`}
                </div>
            `}
            ${X&&Q`
                <div class="agent-status agent-status-request" aria-live="polite" style=${B_?`--turn-color: ${B_};`:""}>
                    <span class=${$_} aria-hidden="true"></span>
                    <div class="agent-status-spinner"></div>
                    <span class="agent-status-text">${v_}</span>
                </div>
            `}
            ${H&&j_({panelTitle:N_("Planning"),text:w.text,fullText:w.fullText,totalLines:w.totalLines,panelKey:"plan"})}
            ${S&&j_({panelTitle:N_("Thoughts"),text:R.text,fullText:R.fullText,totalLines:R.totalLines,maxLines:8,titleClass:"thought",panelKey:"thought"})}
            ${y&&j_({panelTitle:N_("Draft"),text:M.text,fullText:M.fullText,totalLines:M.totalLines,maxLines:8,titleClass:"thought",panelKey:"draft"})}
            ${_&&Q`
                <div class=${`agent-status${P_?" agent-status-last-activity":""}${_?.type==="error"?" agent-status-error":""}`} aria-live="polite" style=${B_?`--turn-color: ${B_};`:""}>
                    ${B_&&Q`<span class=${$_} aria-hidden="true"></span>`}
                    ${_?.type==="error"?Q`<span class="agent-status-error-icon" aria-hidden="true">⚠</span>`:!P_&&Q`<div class="agent-status-spinner"></div>`}
                    <span class="agent-status-text">${d}</span>
                </div>
            `}
        </div>
    `}function E4({request:_,onRespond:$}){if(!_)return null;let{request_id:Z,tool_call:J,options:X}=_,Y=J?.title||"Agent Request",j=J?.kind||"other",V=J?.rawInput||{},N=V.command||V.commands&&V.commands[0]||null,O=V.diff||null,W=V.fileName||V.path||null,U=J?.description||V.description||V.explanation||null,D=(Array.isArray(J?.locations)?J.locations:[]).map((H)=>H?.path).filter((H)=>Boolean(H)),C=Array.from(new Set([W,...D].filter(Boolean)));console.log("AgentRequestModal:",{request_id:Z,tool_call:J,options:X});let w=async(H)=>{try{await k1(Z,H),$()}catch(S){console.error("Failed to respond to agent request:",S)}},R=async()=>{try{await c3(Y,`Auto-approved: ${Y}`),await k1(Z,"approved"),$()}catch(H){console.error("Failed to add to whitelist:",H)}},M=X&&X.length>0;return Q`
        <div class="agent-request-modal">
            <div class="agent-request-content">
                <div class="agent-request-header">
                    <div class="agent-request-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="agent-request-title">${Y}</div>
                </div>
                ${(U||N||O||C.length>0)&&Q`
                    <div class="agent-request-body">
                        ${U&&Q`
                            <div class="agent-request-description">${U}</div>
                        `}
                        ${C.length>0&&Q`
                            <div class="agent-request-files">
                                <div class="agent-request-subtitle">Files</div>
                                <ul>
                                    ${C.map((H,S)=>Q`<li key=${S}>${H}</li>`)}
                                </ul>
                            </div>
                        `}
                        ${N&&Q`
                            <pre class="agent-request-command">${N}</pre>
                        `}
                        ${O&&Q`
                            <details class="agent-request-diff">
                                <summary>Proposed diff</summary>
                                <pre>${O}</pre>
                            </details>
                        `}
                    </div>
                `}
                <div class="agent-request-actions">
                    ${M?X.map((H)=>Q`
                            <button 
                                key=${H.optionId||H.id||String(H)}
                                class="agent-request-btn ${H.kind==="allow_once"||H.kind==="allow_always"?"primary":""}"
                                onClick=${()=>w(H.optionId||H.id||H)}
                            >
                                ${H.name||H.label||H.optionId||H.id||String(H)}
                            </button>
                        `):Q`
                        <button class="agent-request-btn primary" onClick=${()=>w("approved")}>
                            Allow
                        </button>
                        <button class="agent-request-btn" onClick=${()=>w("denied")}>
                            Deny
                        </button>
                        <button class="agent-request-btn always-allow" onClick=${R}>
                            Always Allow This
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}function D4({status:_}){if(_==="connected")return null;return Q`
        <div class="connection-status ${_}">
            ${_==="disconnected"?"Reconnecting...":_}
        </div>
    `}function k4(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;let J=new Date-$,X=J/1000,Y=86400000;if(J<Y){if(X<60)return"just now";if(X<3600)return`${Math.floor(X/60)}m`;return`${Math.floor(X/3600)}h`}if(J<5*Y){let N=$.toLocaleDateString(void 0,{weekday:"short"}),O=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${N} ${O}`}let j=$.toLocaleDateString(void 0,{month:"short",day:"numeric"}),V=$.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"});return`${j} ${V}`}function w2(_){if(!Number.isFinite(_))return"0";return Math.round(_).toLocaleString()}function l0(_){if(_<1024)return _+" B";if(_<1048576)return(_/1024).toFixed(1)+" KB";return(_/1048576).toFixed(1)+" MB"}function _1(_){let $=new Date(_);if(Number.isNaN($.getTime()))return _;return $.toLocaleString()}function C4({src:_,onClose:$}){return m(()=>{let Z=(J)=>{if(J.key==="Escape")$()};return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)},[$]),Q`
        <div class="image-modal" onClick=${$}>
            <img src=${_} alt="Full size" />
        </div>
    `}function Y6({mediaId:_}){let[$,Z]=u(null);if(m(()=>{i2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size,Y=X?l0(X):"";return Q`
        <a href=${z2(_)} download=${J} class="file-attachment" onClick=${(j)=>j.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${Y&&Q`<span class="file-size">${Y}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function $1({annotations:_}){if(!_)return null;let{audience:$,priority:Z,lastModified:J}=_,X=J?_1(J):null;return Q`
        <div class="content-annotations">
            ${$&&$.length>0&&Q`
                <span class="content-annotation">Audience: ${$.join(", ")}</span>
            `}
            ${typeof Z==="number"&&Q`
                <span class="content-annotation">Priority: ${Z}</span>
            `}
            ${X&&Q`
                <span class="content-annotation">Updated: ${X}</span>
            `}
        </div>
    `}function X6({block:_}){let $=_.title||_.name||_.uri,Z=_.description,J=_.size?l0(_.size):"",X=_.mime_type||"",Y=j6(X),j=L2(_.uri);return Q`
        <a
            href=${j||"#"}
            class="resource-link"
            target=${j?"_blank":void 0}
            rel=${j?"noopener noreferrer":void 0}
            onClick=${(V)=>V.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${Y}</span>
                    <div class="resource-link-title">${$}</div>
                </div>
                ${Z&&Q`<div class="resource-link-description">${Z}</div>`}
                <div class="resource-link-meta">
                    ${X&&Q`<span>${X}</span>`}
                    ${J&&Q`<span>${J}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `}function W6({block:_}){let[$,Z]=u(!1),J=_.uri||"Embedded resource",X=_.text||"",Y=Boolean(_.data),j=_.mime_type||"";return Q`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(V)=>{V.preventDefault(),V.stopPropagation(),Z(!$)}}>
                ${$?"▼":"▶"} ${J}
            </button>
            ${$&&Q`
                ${X&&Q`<pre class="resource-embed-content">${X}</pre>`}
                ${Y&&Q`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${j&&Q`<span class="resource-embed-blob-meta">${j}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(V)=>{V.preventDefault(),V.stopPropagation();let N=new Blob([Uint8Array.from(atob(_.data),(U)=>U.charCodeAt(0))],{type:j||"application/octet-stream"}),O=URL.createObjectURL(N),W=document.createElement("a");W.href=O,W.download=J.split("/").pop()||"resource",W.click(),URL.revokeObjectURL(O)}}>Download</button>
                    </div>
                `}
            `}
        </div>
    `}function j6(_){if(!_)return"\uD83D\uDCCE";if(_.startsWith("image/"))return"\uD83D\uDDBC️";if(_.startsWith("audio/"))return"\uD83C\uDFB5";if(_.startsWith("video/"))return"\uD83C\uDFAC";if(_.includes("pdf"))return"\uD83D\uDCC4";if(_.includes("zip")||_.includes("gzip"))return"\uD83D\uDDDC️";if(_.startsWith("text/"))return"\uD83D\uDCC4";return"\uD83D\uDCCE"}function K6({preview:_}){let $=L2(_.url),Z=L2(_.image,{allowDataImage:!0}),J=Z?`background-image: url('${Z}')`:"",X=_.site_name;if(!X&&$)try{X=new URL($).hostname}catch{X=$}return Q`
        <a
            href=${$||"#"}
            class="link-preview ${Z?"has-image":""}"
            target=${$?"_blank":void 0}
            rel=${$?"noopener noreferrer":void 0}
            onClick=${(Y)=>Y.stopPropagation()}
            style=${J}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${X||""}</div>
                <div class="link-preview-title">${_.title}</div>
                ${_.description&&Q`
                    <div class="link-preview-description">${_.description}</div>
                `}
            </div>
        </a>
    `}function G6(_,$){return typeof _==="string"?_:""}var V6=1800,N6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"></path>
    </svg>`,O6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>`,B6=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;async function q6(_){let $=typeof _==="string"?_:"";if(!$)return!1;if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText($),!0}catch{}try{let Z=document.createElement("textarea");Z.value=$,Z.setAttribute("readonly",""),Z.style.position="fixed",Z.style.opacity="0",Z.style.pointerEvents="none",document.body.appendChild(Z),Z.select(),Z.setSelectionRange(0,Z.value.length);let J=document.execCommand("copy");return document.body.removeChild(Z),J}catch{return!1}}function z6(_){if(!_)return()=>{};let $=Array.from(_.querySelectorAll("pre")).filter((Y)=>Y.querySelector("code"));if($.length===0)return()=>{};let Z=new Map,J=[],X=(Y,j)=>{let V=j||"idle";if(Y.dataset.copyState=V,V==="success")Y.innerHTML=O6,Y.setAttribute("aria-label","Copied"),Y.setAttribute("title","Copied"),Y.classList.add("is-success"),Y.classList.remove("is-error");else if(V==="error")Y.innerHTML=B6,Y.setAttribute("aria-label","Copy failed"),Y.setAttribute("title","Copy failed"),Y.classList.add("is-error"),Y.classList.remove("is-success");else Y.innerHTML=N6,Y.setAttribute("aria-label","Copy code"),Y.setAttribute("title","Copy code"),Y.classList.remove("is-success","is-error")};return $.forEach((Y)=>{let j=document.createElement("div");j.className="post-code-block",Y.parentNode?.insertBefore(j,Y),j.appendChild(Y);let V=document.createElement("button");V.type="button",V.className="post-code-copy-btn",X(V,"idle"),j.appendChild(V);let N=async(O)=>{O.preventDefault(),O.stopPropagation();let U=Y.querySelector("code")?.textContent||"",E=await q6(U);X(V,E?"success":"error");let D=Z.get(V);if(D)clearTimeout(D);let C=setTimeout(()=>{X(V,"idle"),Z.delete(V)},V6);Z.set(V,C)};V.addEventListener("click",N),J.push(()=>{V.removeEventListener("click",N);let O=Z.get(V);if(O)clearTimeout(O);if(j.parentNode)j.parentNode.insertBefore(Y,j),j.remove()})}),()=>{J.forEach((Y)=>Y())}}function Q6(_){if(!_)return{content:_,fileRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Files:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,fileRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O))X.push(O.replace(/^\s*-\s+/,"").trim());else if(!O.trim())break;else break}if(X.length===0)return{content:_,fileRefs:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,fileRefs:X}}function U6(_){if(!_)return{content:_,messageRefs:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Referenced messages:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,messageRefs:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let U=O.replace(/^\s*-\s+/,"").trim().match(/^message:(\S+)$/i);if(U)X.push(U[1])}else if(!O.trim())break;else break}if(X.length===0)return{content:_,messageRefs:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,messageRefs:X}}function H6(_){if(!_)return{content:_,attachments:[]};let Z=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`),J=-1;for(let O=0;O<Z.length;O+=1)if(Z[O].trim()==="Images:"&&Z[O+1]&&/^\s*-\s+/.test(Z[O+1])){J=O;break}if(J===-1)return{content:_,attachments:[]};let X=[],Y=J+1;for(;Y<Z.length;Y+=1){let O=Z[Y];if(/^\s*-\s+/.test(O)){let W=O.replace(/^\s*-\s+/,"").trim(),U=W.match(/^attachment:([^\s)]+)\s*(?:\((.+)\))?$/i)||W.match(/^attachment:([^\s]+)\s+(.+)$/i);if(U){let E=U[1],D=(U[2]||"").trim()||E;X.push({id:E,label:D,raw:W})}else X.push({id:null,label:W,raw:W})}else if(!O.trim())break;else break}if(X.length===0)return{content:_,attachments:[]};let j=Z.slice(0,J),V=Z.slice(Y),N=[...j,...V].join(`
`);return N=N.replace(/\n{3,}/g,`

`).trim(),{content:N,attachments:X}}function L6(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function F6(_,$){if(!_||!$)return _;let Z=String($).trim().split(/\s+/).filter(Boolean);if(Z.length===0)return _;let J=Z.map(L6).sort((W,U)=>U.length-W.length),X=new RegExp(`(${J.join("|")})`,"gi"),Y=new RegExp(`^(${J.join("|")})$`,"i"),j=new DOMParser().parseFromString(_,"text/html"),V=j.createTreeWalker(j.body,NodeFilter.SHOW_TEXT),N=[],O;while(O=V.nextNode())N.push(O);for(let W of N){let U=W.nodeValue;if(!U||!X.test(U)){X.lastIndex=0;continue}X.lastIndex=0;let E=W.parentElement;if(E&&E.closest("code, pre, script, style"))continue;let D=U.split(X).filter((w)=>w!=="");if(D.length===0)continue;let C=j.createDocumentFragment();for(let w of D)if(Y.test(w)){let R=j.createElement("mark");R.className="search-highlight-term",R.textContent=w,C.appendChild(R)}else C.appendChild(j.createTextNode(w));W.parentNode.replaceChild(C,W)}return j.body.innerHTML}function y4({post:_,onClick:$,onHashtagClick:Z,onMessageRef:J,onScrollToMessage:X,agentName:Y,agentAvatarUrl:j,userName:V,userAvatarUrl:N,userAvatarBackground:O,onDelete:W,isThreadReply:U,isThreadPrev:E,isThreadNext:D,isRemoving:C,highlightQuery:w,onFileRef:R}){let[M,H]=u(null),S=L(null),y=_.data,v=y.type==="agent_response",p=V||"You",l=v?Y||Q4:p,Y_=v?x1(Y,j):x1(p,N),B_=typeof O==="string"?O.trim().toLowerCase():"",$_=!v&&Y_.image&&(B_==="clear"||B_==="transparent"),N_=v&&Boolean(Y_.image),P_=`background-color: ${$_||N_?"transparent":Y_.color}`,r=y.content_meta,e=Boolean(r?.truncated),d=Boolean(r?.preview),i=e&&!d,Z_=e?{originalLength:Number.isFinite(r?.original_length)?r.original_length:y.content?y.content.length:0,maxLength:Number.isFinite(r?.max_length)?r.max_length:0}:null,j_=G6(y.content,y.link_previews),{content:J_,fileRefs:v_}=Q6(j_),{content:X_,messageRefs:q_}=U6(J_),{content:z_,attachments:L_}=H6(X_);j_=z_;let A_=Boolean(j_)&&!i,F_=typeof w==="string"?w.trim():"",U_=L0(()=>{if(!j_)return"";let x=F2(j_,Z);return F_?F6(x,F_):x},[j_,F_]),C_=(x,__)=>{x.stopPropagation(),H(z2(__))},u_=(x)=>{x.stopPropagation(),W?.(_)},w_=(x,__)=>{let E_=new Set;if(!x||__.length===0)return{content:x,usedIds:E_};return{content:x.replace(/attachment:([^\s)"']+)/g,(O0,d_,v0,q0)=>{let c_=d_.replace(/^\/+/,""),m_=__.find((x_)=>x_.name&&x_.name.toLowerCase()===c_.toLowerCase()&&!E_.has(x_.id))||__.find((x_)=>!E_.has(x_.id));if(!m_)return O0;if(E_.add(m_.id),q0.slice(Math.max(0,v0-2),v0)==="](")return`/media/${m_.id}`;return m_.name||"attachment"}),usedIds:E_}},b_=[],y_=[],h_=[],i_=[],M_=[],K_=[],B0=y.content_blocks||[],a_=y.media_ids||[],P0=0;if(B0.length>0)B0.forEach((x)=>{if(x?.type==="text"&&x.annotations)K_.push(x.annotations);if(x?.type==="resource_link")i_.push(x);else if(x?.type==="resource")M_.push(x);else if(x?.type==="file"){let __=a_[P0++];if(__)y_.push(__),h_.push({id:__,name:x?.name||x?.filename||x?.title})}else if(x?.type==="image"||!x?.type){let __=a_[P0++];if(__){let E_=typeof x?.mime_type==="string"?x.mime_type:void 0;b_.push({id:__,annotations:x?.annotations,mimeType:E_}),h_.push({id:__,name:x?.name||x?.filename||x?.title})}}});else if(a_.length>0)a_.forEach((x)=>{b_.push({id:x,annotations:null}),h_.push({id:x,name:null})});if(L_.length>0)L_.forEach((x)=>{if(!x?.id)return;let __=h_.find((E_)=>String(E_.id)===String(x.id));if(__&&!__.name)__.name=x.label});let{content:K0,usedIds:F0}=w_(j_,h_);j_=K0;let Q_=b_.filter(({id:x})=>!F0.has(x)),G0=y_.filter((x)=>!F0.has(x)),E0=L_.length>0?L_.map((x,__)=>({id:x.id||`attachment-${__+1}`,label:x.label||`attachment-${__+1}`})):h_.map((x,__)=>({id:x.id,label:x.name||`attachment-${__+1}`}));return m(()=>{if(!S.current)return;return e2(S.current),z6(S.current)},[U_]),Q`
        <div id=${`post-${_.id}`} class="post ${v?"agent-post":""} ${U?"thread-reply":""} ${E?"thread-prev":""} ${D?"thread-next":""} ${C?"removing":""}" onClick=${$}>
            <div class="post-avatar ${v?"agent-avatar":""} ${Y_.image?"has-image":""}" style=${P_}>
                ${Y_.image?Q`<img src=${Y_.image} alt=${l} />`:Y_.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${u_}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${l}</span>
                    <a class="post-time" href=${`#msg-${_.id}`} onClick=${(x)=>{if(x.preventDefault(),x.stopPropagation(),J)J(_.id)}}>${k4(_.timestamp)}</a>
                </div>
                ${i&&Z_&&Q`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${w2(Z_.originalLength)} chars
                            ${Z_.maxLength?Q` • Display limit: ${w2(Z_.maxLength)} chars`:""}
                        </div>
                    </div>
                `}
                ${d&&Z_&&Q`
                    <div class="post-content preview">
                        <div class="truncated-title">Preview truncated.</div>
                        <div class="truncated-meta">
                            Showing first ${w2(Z_.maxLength)} of ${w2(Z_.originalLength)} chars. Download full text below.
                        </div>
                    </div>
                `}
                ${(v_.length>0||q_.length>0||E0.length>0)&&Q`
                    <div class="post-file-refs">
                        ${q_.map((x)=>{let __=(E_)=>{if(E_.preventDefault(),E_.stopPropagation(),X)X(x);else{let V0=document.getElementById("post-"+x);if(V0)V0.scrollIntoView({behavior:"smooth",block:"center"}),V0.classList.add("post-highlight"),setTimeout(()=>V0.classList.remove("post-highlight"),2000)}};return Q`
                                <a href=${`#msg-${x}`} class="post-msg-pill-link" onClick=${__}>
                                    <${e0}
                                        prefix="post"
                                        label=${"msg:"+x}
                                        title=${"Message "+x}
                                        icon="message"
                                        onClick=${__}
                                    />
                                </a>
                            `})}
                        ${v_.map((x)=>{let __=x.split("/").pop()||x;return Q`
                                <${e0}
                                    prefix="post"
                                    label=${__}
                                    title=${x}
                                    onClick=${()=>R?.(x)}
                                />
                            `})}
                        ${E0.map((x)=>Q`
                            <${e0}
                                prefix="post"
                                label=${x.label}
                                title=${x.label}
                            />
                        `)}
                    </div>
                `}
                ${A_&&Q`
                    <div 
                        ref=${S}
                        class="post-content"
                        dangerouslySetInnerHTML=${{__html:U_}}
                        onClick=${(x)=>{if(x.target.classList.contains("hashtag")){x.preventDefault(),x.stopPropagation();let __=x.target.dataset.hashtag;if(__)Z?.(__)}else if(x.target.tagName==="IMG")x.preventDefault(),x.stopPropagation(),H(x.target.src)}}
                    />
                `}
                ${K_.length>0&&Q`
                    ${K_.map((x,__)=>Q`
                        <${$1} key=${__} annotations=${x} />
                    `)}
                `}
                ${Q_.length>0&&Q`
                    <div class="media-preview">
                        ${Q_.map(({id:x,mimeType:__})=>{let V0=typeof __==="string"&&__.toLowerCase().startsWith("image/svg")?z2(x):p3(x);return Q`
                                <img 
                                    key=${x} 
                                    src=${V0} 
                                    alt="Media" 
                                    loading="lazy"
                                    onClick=${(O0)=>C_(O0,x)}
                                />
                            `})}
                    </div>
                `}
                ${Q_.length>0&&Q`
                    ${Q_.map(({annotations:x},__)=>Q`
                        ${x&&Q`<${$1} key=${__} annotations=${x} />`}
                    `)}
                `}
                ${G0.length>0&&Q`
                    <div class="file-attachments">
                        ${G0.map((x)=>Q`
                            <${Y6} key=${x} mediaId=${x} />
                        `)}
                    </div>
                `}
                ${i_.length>0&&Q`
                    <div class="resource-links">
                        ${i_.map((x,__)=>Q`
                            <div key=${__}>
                                <${X6} block=${x} />
                                <${$1} annotations=${x.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${M_.length>0&&Q`
                    <div class="resource-embeds">
                        ${M_.map((x,__)=>Q`
                            <div key=${__}>
                                <${W6} block=${x} />
                                <${$1} annotations=${x.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${y.link_previews?.length>0&&Q`
                    <div class="link-previews">
                        ${y.link_previews.map((x,__)=>Q`
                            <${K6} key=${__} preview=${x} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${M&&Q`<${C4} src=${M} onClose=${()=>H(null)} />`}
    `}function A4({posts:_,hasMore:$,onLoadMore:Z,onPostClick:J,onHashtagClick:X,onMessageRef:Y,onScrollToMessage:j,onFileRef:V,emptyMessage:N,timelineRef:O,agents:W,user:U,onDeletePost:E,reverse:D=!0,removingPostIds:C,searchQuery:w}){let[R,M]=u(!1),H=L(null),S=typeof IntersectionObserver<"u",y=b(async()=>{if(!Z||!$||R)return;M(!0);try{await Z({preserveScroll:!0,preserveMode:"top"})}finally{M(!1)}},[$,R,Z]),v=b((r)=>{let{scrollTop:e,scrollHeight:d,clientHeight:i}=r.target,Z_=D?d-i-e:e,j_=Math.max(300,i);if(Z_<j_)y()},[D,y]);m(()=>{if(!S)return;let r=H.current,e=O?.current;if(!r||!e)return;let d=300,i=new IntersectionObserver((Z_)=>{for(let j_ of Z_){if(!j_.isIntersecting)continue;y()}},{root:e,rootMargin:`${d}px 0px ${d}px 0px`,threshold:0});return i.observe(r),()=>i.disconnect()},[S,$,Z,O,y]);let p=L(y);if(p.current=y,m(()=>{if(S)return;if(!O?.current)return;let{scrollTop:r,scrollHeight:e,clientHeight:d}=O.current,i=D?e-d-r:r,Z_=Math.max(300,d);if(i<Z_)p.current?.()},[S,_,$,D,O]),m(()=>{if(!O?.current)return;if(!$||R)return;let{scrollTop:r,scrollHeight:e,clientHeight:d}=O.current,i=D?e-d-r:r,Z_=Math.max(300,d);if(e<=d+1||i<Z_)p.current?.()},[_,$,R,D,O]),!_)return Q`<div class="loading"><div class="spinner"></div></div>`;if(_.length===0)return Q`
            <div class="timeline" ref=${O}>
                <div class="timeline-content">
                    <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary)">
                        ${N||"No messages yet. Start a conversation!"}
                    </div>
                </div>
            </div>
        `;let l=_.slice().sort((r,e)=>r.id-e.id),Y_=(r)=>{let e=r?.data?.thread_id;if(e===null||e===void 0||e==="")return null;let d=Number(e);return Number.isFinite(d)?d:null},B_=new Map;for(let r=0;r<l.length;r+=1){let e=l[r],d=Number(e?.id),i=Y_(e);if(i!==null){let Z_=B_.get(i)||{anchorIndex:-1,replyIndexes:[]};Z_.replyIndexes.push(r),B_.set(i,Z_)}else if(Number.isFinite(d)){let Z_=B_.get(d)||{anchorIndex:-1,replyIndexes:[]};Z_.anchorIndex=r,B_.set(d,Z_)}}let $_=new Map;for(let[r,e]of B_.entries()){let d=new Set;if(e.anchorIndex>=0)d.add(e.anchorIndex);for(let i of e.replyIndexes)d.add(i);$_.set(r,Array.from(d).sort((i,Z_)=>i-Z_))}let N_=l.map((r,e)=>{let d=Y_(r);if(d===null)return{hasThreadPrev:!1,hasThreadNext:!1};let i=$_.get(d);if(!i||i.length===0)return{hasThreadPrev:!1,hasThreadNext:!1};let Z_=i.indexOf(e);if(Z_<0)return{hasThreadPrev:!1,hasThreadNext:!1};return{hasThreadPrev:Z_>0,hasThreadNext:Z_<i.length-1}}),P_=Q`<div class="timeline-sentinel" ref=${H}></div>`;return Q`
        <div class="timeline ${D?"reverse":"normal"}" ref=${O} onScroll=${v}>
            <div class="timeline-content">
                ${D?P_:null}
                ${l.map((r,e)=>{let d=Boolean(r.data?.thread_id&&r.data.thread_id!==r.id),i=C?.has?.(r.id),Z_=N_[e]||{};return Q`
                    <${y4}
                        key=${r.id}
                        post=${r}
                        isThreadReply=${d}
                        isThreadPrev=${Z_.hasThreadPrev}
                        isThreadNext=${Z_.hasThreadNext}
                        isRemoving=${i}
                        highlightQuery=${w}
                        agentName=${U4(r.data?.agent_id,W||{})}
                        agentAvatarUrl=${H4(r.data?.agent_id,W||{})}
                        userName=${U?.name||U?.user_name}
                        userAvatarUrl=${U?.avatar_url||U?.avatarUrl||U?.avatar}
                        userAvatarBackground=${U?.avatar_background||U?.avatarBackground}
                        onClick=${()=>J?.(r)}
                        onHashtagClick=${X}
                        onMessageRef=${Y}
                        onScrollToMessage=${j}
                        onFileRef=${V}
                        onDelete=${E}
                    />
                `})}
                ${D?null:P_}
            </div>
        </div>
    `}class w4{extensions=new Map;register(_){this.extensions.set(_.id,_)}unregister(_){this.extensions.delete(_)}resolve(_){let $,Z=-1/0;for(let J of this.extensions.values()){if(J.placement!=="tabs")continue;if(!J.canHandle)continue;try{let X=J.canHandle(_);if(X===!1||X===0)continue;let Y=X===!0?0:typeof X==="number"?X:0;if(Y>Z)Z=Y,$=J}catch(X){console.warn(`[PaneRegistry] canHandle() error for "${J.id}":`,X)}}return $}list(){return Array.from(this.extensions.values())}getDockPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="dock")}getTabPanes(){return Array.from(this.extensions.values()).filter((_)=>_.placement==="tabs")}get(_){return this.extensions.get(_)}get size(){return this.extensions.size}}var p_=new w4;var Z1=null,I1=null;function P4(){if(I1)return Promise.resolve(I1);if(!Z1)Z1=import("/static/dist/editor.bundle.js").then((_)=>{return I1=_,_}).catch((_)=>{throw Z1=null,_});return Z1}class b4{container;context;real=null;disposed=!1;loadingEl;queuedDirtyCb=null;queuedSaveCb=null;queuedCloseCb=null;queuedViewStateCb=null;queuedViewState=null;constructor(_,$){this.container=_,this.context=$,this.loadingEl=document.createElement("div"),this.loadingEl.className="editor-pane",this.loadingEl.innerHTML=`
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `,_.appendChild(this.loadingEl),this.load()}escapeHtml(_){let $=document.createElement("div");return $.textContent=_,$.innerHTML}async load(){try{let _=await P4();if(this.disposed)return;if(this.loadingEl.parentNode)this.loadingEl.remove();if(this.real=new _.StandaloneEditorInstance(this.container,this.context),this.queuedDirtyCb&&this.real.onDirtyChange)this.real.onDirtyChange(this.queuedDirtyCb);if(this.queuedSaveCb&&this.real.onSaveRequest)this.real.onSaveRequest(this.queuedSaveCb);if(this.queuedCloseCb&&this.real.onClose)this.real.onClose(this.queuedCloseCb);if(this.queuedViewStateCb&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(this.queuedViewStateCb);if(this.queuedViewState&&typeof this.real.restoreViewState==="function")requestAnimationFrame(()=>this.real?.restoreViewState?.(this.queuedViewState))}catch(_){if(this.disposed)return;console.error("[editor-loader] Failed to load editor bundle:",_),this.loadingEl.querySelector(".editor-status").textContent="Failed to load editor. Check console for details."}}getContent(){return this.real?.getContent()}isDirty(){return this.real?.isDirty()||!1}setContent(_,$){if(this.real?.setContent)this.real.setContent(_,$)}focus(){this.real?.focus()}resize(){this.real?.resize?.()}dispose(){if(this.disposed)return;if(this.disposed=!0,this.real)this.real.dispose(),this.real=null;this.container.innerHTML="",this.queuedDirtyCb=null,this.queuedSaveCb=null,this.queuedCloseCb=null,this.queuedViewStateCb=null}onDirtyChange(_){if(this.queuedDirtyCb=_,this.real?.onDirtyChange)this.real.onDirtyChange(_)}onSaveRequest(_){if(this.queuedSaveCb=_,this.real?.onSaveRequest)this.real.onSaveRequest(_)}onClose(_){if(this.queuedCloseCb=_,this.real?.onClose)this.real.onClose(_)}onViewStateChange(_){if(this.queuedViewStateCb=_,this.real&&typeof this.real.onViewStateChange==="function")this.real.onViewStateChange(_)}restoreViewState(_){if(this.queuedViewState=_,this.real&&typeof this.real.restoreViewState==="function")this.real.restoreViewState(_)}getPath(){if(this.real&&typeof this.real.getPath==="function")return this.real.getPath();return this.context.path||""}setPath(_){if(this.real&&typeof this.real.setPath==="function")this.real.setPath(_)}}var T1={id:"editor",label:"Editor",icon:"edit",capabilities:["edit"],placement:"tabs",canHandle(_){if(!_.path)return!1;if(_.mode!=="edit")return!1;return 1},mount(_,$){return new b4(_,$)}};function f1(){P4().catch(()=>{})}class M4{container;disposed=!1;termEl;constructor(_,$){this.container=_,this.termEl=document.createElement("div"),this.termEl.className="terminal-pane-content",this.termEl.setAttribute("tabindex","0");let Z=document.createElement("div");Z.className="terminal-pane-header";let J=document.createElement("span");J.className="terminal-pane-title",J.textContent="Terminal";let X=document.createElement("span");X.className="terminal-pane-status",X.textContent="Not connected",Z.append(J,X);let Y=document.createElement("div");Y.className="terminal-pane-body",Y.innerHTML='<div class="terminal-placeholder">Terminal integration pending — xterm.js + WebSocket</div>',this.termEl.append(Z,Y),_.appendChild(this.termEl)}getContent(){return}isDirty(){return!1}focus(){this.termEl?.focus()}resize(){}dispose(){if(this.disposed)return;this.disposed=!0,this.termEl?.remove()}}var v1={id:"terminal",label:"Terminal",icon:"terminal",capabilities:["terminal"],placement:"dock",mount(_,$){return new M4(_,$)}};function S4(_){return String(_||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function E6(_,$){let Z=String(_||"").trim();if(!Z)return Z;if(/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(Z)||Z.startsWith("#")||Z.startsWith("data:")||Z.startsWith("blob:"))return Z;let J=Z.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/),X=J?.[1]||Z,Y=J?.[2]||"",j=J?.[3]||"",V=String($||"").split("/").slice(0,-1).join("/"),O=X.startsWith("/")?X:`${V?`${V}/`:""}${X}`,W=[];for(let E of O.split("/")){if(!E||E===".")continue;if(E===".."){if(W.length>0)W.pop();continue}W.push(E)}let U=W.join("/");return`${y1(U)}${Y}${j}`}function P2(_){return _?.preview||null}function D6(_){let $=P2(_);if(!$)return'<div class="workspace-preview-text">No preview available.</div>';if($.kind==="image"){let Z=$.url||($.path?y1($.path):"");return`
            <div class="workspace-preview-image">
                <img src="${S4(Z)}" alt="preview" />
            </div>
        `}if($.kind==="text"){if($.content_type==="text/markdown")return`<div class="workspace-preview-text">${F2($.text||"",null,{rewriteImageSrc:(J)=>E6(J,$.path||_?.path)})}</div>`;return`<pre class="workspace-preview-text"><code>${S4($.text||"")}</code></pre>`}if($.kind==="binary")return'<div class="workspace-preview-text">Binary file — download to view.</div>';return'<div class="workspace-preview-text">No preview available.</div>'}class R1{constructor(_,$){this.container=_,this.context=$,this.disposed=!1,this.host=document.createElement("div"),this.host.className="workspace-preview-render-host",this.host.tabIndex=0,this.container.appendChild(this.host),this.render()}render(){if(this.disposed)return;this.host.innerHTML=D6(this.context)}getContent(){let _=P2(this.context);return typeof _?.text==="string"?_.text:void 0}isDirty(){return!1}setContent(_,$){let Z=P2(this.context);if(Z&&Z.kind==="text"){if(Z.text=_,$!==void 0)Z.mtime=$}if(this.context.content=_,$!==void 0)this.context.mtime=$;this.render()}focus(){this.host?.focus?.()}dispose(){if(this.disposed)return;this.disposed=!0,this.host?.remove(),this.container.innerHTML=""}}var g1={id:"workspace-markdown-preview",label:"Workspace Markdown Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){let $=P2(_);if(_?.mode!=="view")return!1;if(!$||$.kind!=="text")return!1;return $.content_type==="text/markdown"?20:!1},mount(_,$){return new R1(_,$)}},u1={id:"workspace-preview-default",label:"Workspace Preview",icon:"preview",capabilities:["preview","readonly"],placement:"tabs",canHandle(_){if(_?.mode!=="view")return!1;return P2(_)||_?.path?1:!1},mount(_,$){return new R1(_,$)}};class x4{tabs=new Map;activeId=null;mruOrder=[];listeners=new Set;onChange(_){return this.listeners.add(_),()=>this.listeners.delete(_)}notify(){let _=this.getTabs(),$=this.activeId;for(let Z of this.listeners)try{Z(_,$)}catch{}}open(_,$){let Z=this.tabs.get(_);if(!Z)Z={id:_,label:$||_.split("/").pop()||_,path:_,dirty:!1,pinned:!1},this.tabs.set(_,Z);return this.activate(_),Z}activate(_){if(!this.tabs.has(_))return;this.activeId=_,this.mruOrder=[_,...this.mruOrder.filter(($)=>$!==_)],this.notify()}close(_){if(!this.tabs.get(_))return!1;if(this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_),this.activeId===_)this.activeId=this.mruOrder[0]||null;return this.notify(),!0}closeOthers(_){for(let[$,Z]of this.tabs)if($!==_&&!Z.pinned)this.tabs.delete($),this.mruOrder=this.mruOrder.filter((J)=>J!==$);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=_;this.notify()}closeAll(){for(let[_,$]of this.tabs)if(!$.pinned)this.tabs.delete(_),this.mruOrder=this.mruOrder.filter((Z)=>Z!==_);if(this.activeId&&!this.tabs.has(this.activeId))this.activeId=this.mruOrder[0]||null;this.notify()}setDirty(_,$){let Z=this.tabs.get(_);if(!Z||Z.dirty===$)return;Z.dirty=$,this.notify()}togglePin(_){let $=this.tabs.get(_);if(!$)return;$.pinned=!$.pinned,this.notify()}saveViewState(_,$){let Z=this.tabs.get(_);if(Z)Z.viewState=$}getViewState(_){return this.tabs.get(_)?.viewState}rename(_,$,Z){let J=this.tabs.get(_);if(!J)return;if(this.tabs.delete(_),J.id=$,J.path=$,J.label=Z||$.split("/").pop()||$,this.tabs.set($,J),this.mruOrder=this.mruOrder.map((X)=>X===_?$:X),this.activeId===_)this.activeId=$;this.notify()}getTabs(){return Array.from(this.tabs.values())}getActiveId(){return this.activeId}getActive(){return this.activeId?this.tabs.get(this.activeId)||null:null}get(_){return this.tabs.get(_)}get size(){return this.tabs.size}hasUnsaved(){for(let _ of this.tabs.values())if(_.dirty)return!0;return!1}getDirtyTabs(){return Array.from(this.tabs.values()).filter((_)=>_.dirty)}nextTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($+1)%_.length];this.activate(Z.id)}prevTab(){let _=this.getTabs();if(_.length<=1)return;let $=_.findIndex((J)=>J.id===this.activeId),Z=_[($-1+_.length)%_.length];this.activate(Z.id)}mruSwitch(){if(this.mruOrder.length>1)this.activate(this.mruOrder[1])}}var k_=new x4;var J1="workspaceExplorerScale",k6=["compact","default","comfortable"],C6=new Set(k6),y6={compact:{indentPx:14},default:{indentPx:16},comfortable:{indentPx:18}};function I4(_,$="default"){if(typeof _!=="string")return $;let Z=_.trim().toLowerCase();return C6.has(Z)?Z:$}function c1(){if(typeof window>"u")return{width:0,isTouch:!1};let _=Number(window.innerWidth)||0,$=Boolean(window.matchMedia?.("(pointer: coarse)")?.matches),Z=Boolean(window.matchMedia?.("(hover: none)")?.matches),J=Number(globalThis.navigator?.maxTouchPoints||0)>0;return{width:_,isTouch:$||J&&Z}}function A6(_={}){let $=Math.max(0,Number(_.width)||0);if(Boolean(_.isTouch))return"comfortable";if($>0&&$<1180)return"comfortable";return"default"}function w6(_,$={}){if(Boolean($.isTouch)&&_==="compact")return"default";return _}function m1(_={}){let $=A6(_),Z=_.stored?I4(_.stored,$):$;return w6(Z,_)}function T4(_){return y6[I4(_)]}var P6=60000,g4=(_)=>{if(!_||!_.name)return!1;if(_.path===".")return!1;return _.name.startsWith(".")};function u4(_,$,Z,J=0,X=[]){if(!Z&&g4(_))return X;if(!_)return X;if(X.push({node:_,depth:J}),_.type==="dir"&&_.children&&$.has(_.path))for(let Y of _.children)u4(Y,$,Z,J+1,X);return X}function f4(_,$,Z){if(!_)return"";let J=[],X=(Y)=>{if(!Z&&g4(Y))return;if(J.push(Y.type==="dir"?`d:${Y.path}`:`f:${Y.path}`),Y.children&&$?.has(Y.path))for(let j of Y.children)X(j)};return X(_),J.join("|")}function l1(_,$){if(!$)return null;if(!_)return $;if(_.path!==$.path||_.type!==$.type)return $;let Z=Array.isArray(_.children)?_.children:null,J=Array.isArray($.children)?$.children:null;if(!J)return _;let X=Z?new Map(Z.map((V)=>[V?.path,V])):new Map,Y=!Z||Z.length!==J.length,j=J.map((V)=>{let N=l1(X.get(V.path),V);if(N!==X.get(V.path))Y=!0;return N});return Y?{...$,children:j}:_}function p1(_,$,Z){if(!_)return _;if(_.path===$)return l1(_,Z);if(!Array.isArray(_.children))return _;let J=!1,X=_.children.map((Y)=>{let j=p1(Y,$,Z);if(j!==Y)J=!0;return j});return J?{..._,children:X}:_}var c4=4,h1=14,b6=8,M6=16;function m4(_){if(!_)return 0;if(_.type==="file"){let J=Math.max(0,Number(_.size)||0);return _.__bytes=J,J}let $=Array.isArray(_.children)?_.children:[],Z=0;for(let J of $)Z+=m4(J);return _.__bytes=Z,Z}function h4(_,$=0){let Z=Math.max(0,Number(_?.__bytes??_?.size??0)),J={name:_?.name||_?.path||".",path:_?.path||".",size:Z,children:[]};if(!_||_.type!=="dir"||$>=c4)return J;let X=Array.isArray(_.children)?_.children:[],Y=[];for(let V of X){let N=Math.max(0,Number(V?.__bytes??V?.size??0));if(N<=0)continue;if(V.type==="dir")Y.push({kind:"dir",node:V,size:N});else Y.push({kind:"file",name:V.name,path:V.path,size:N})}Y.sort((V,N)=>N.size-V.size);let j=Y;if(Y.length>h1){let V=Y.slice(0,h1-1),N=Y.slice(h1-1),O=N.reduce((W,U)=>W+U.size,0);V.push({kind:"other",name:`+${N.length} more`,path:`${J.path}/[other]`,size:O}),j=V}return J.children=j.map((V)=>{if(V.kind==="dir")return h4(V.node,$+1);return{name:V.name,path:V.path,size:V.size,children:[]}}),J}function v4(){if(typeof window>"u"||typeof document>"u")return!1;let{documentElement:_,body:$}=document,Z=_?.getAttribute?.("data-theme")?.toLowerCase?.()||"";if(Z==="dark")return!0;if(Z==="light")return!1;if(_?.classList?.contains("dark")||$?.classList?.contains("dark"))return!0;if(_?.classList?.contains("light")||$?.classList?.contains("light"))return!1;return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)}function p4(_,$,Z){let J=((_+Math.PI/2)*180/Math.PI+360)%360,X=Z?Math.max(30,70-$*10):Math.max(34,66-$*8),Y=Z?Math.min(70,45+$*5):Math.min(60,42+$*4);return`hsl(${J.toFixed(1)} ${X}% ${Y}%)`}function Y1(_,$,Z,J){return{x:_+Z*Math.cos(J),y:$+Z*Math.sin(J)}}function n1(_,$,Z,J,X,Y){let j=Math.PI*2-0.0001,V=Y-X>j?X+j:Y,N=Y1(_,$,J,X),O=Y1(_,$,J,V),W=Y1(_,$,Z,V),U=Y1(_,$,Z,X),E=V-X>Math.PI?1:0;return[`M ${N.x.toFixed(3)} ${N.y.toFixed(3)}`,`A ${J} ${J} 0 ${E} 1 ${O.x.toFixed(3)} ${O.y.toFixed(3)}`,`L ${W.x.toFixed(3)} ${W.y.toFixed(3)}`,`A ${Z} ${Z} 0 ${E} 0 ${U.x.toFixed(3)} ${U.y.toFixed(3)}`,"Z"].join(" ")}var i4={1:[26,46],2:[48,68],3:[70,90],4:[92,112]};function l4(_,$,Z){let J=[],X=[],Y=Math.max(0,Number($)||0),j=(V,N,O,W)=>{let U=Array.isArray(V?.children)?V.children:[];if(!U.length)return;let E=Math.max(0,Number(V.size)||0);if(E<=0)return;let D=O-N,C=N;U.forEach((w,R)=>{let M=Math.max(0,Number(w.size)||0);if(M<=0)return;let H=M/E,S=C,y=R===U.length-1?O:C+D*H;if(C=y,y-S<0.003)return;let v=i4[W];if(v){let p=p4(S,W,Z);if(J.push({key:w.path,path:w.path,label:w.name,size:M,color:p,depth:W,startAngle:S,endAngle:y,innerRadius:v[0],outerRadius:v[1],d:n1(120,120,v[0],v[1],S,y)}),W===1)X.push({key:w.path,name:w.name,size:M,pct:Y>0?M/Y*100:0,color:p})}if(W<c4)j(w,S,y,W+1)})};return j(_,-Math.PI/2,Math.PI*3/2,1),{segments:J,legend:X}}function i1(_,$){if(!_||!$)return null;if(_.path===$)return _;let Z=Array.isArray(_.children)?_.children:[];for(let J of Z){let X=i1(J,$);if(X)return X}return null}function n4(_,$,Z,J){if(!Z||Z<=0)return{segments:[],legend:[]};let X=i4[1];if(!X)return{segments:[],legend:[]};let Y=-Math.PI/2,j=Math.PI*3/2,V=p4(Y,1,J),O=`${$||"."}/[files]`;return{segments:[{key:O,path:O,label:_,size:Z,color:V,depth:1,startAngle:Y,endAngle:j,innerRadius:X[0],outerRadius:X[1],d:n1(120,120,X[0],X[1],Y,j)}],legend:[{key:O,name:_,size:Z,pct:100,color:V}]}}function R4(_,$=!1,Z=!1){if(!_)return null;let J=m4(_),X=h4(_,0),Y=X.size||J,{segments:j,legend:V}=l4(X,Y,Z);if(!j.length&&Y>0){let N=n4("[files]",X.path,Y,Z);j=N.segments,V=N.legend}return{root:X,totalSize:Y,segments:j,legend:V,truncated:$,isDarkTheme:Z}}function S6({payload:_}){if(!_)return null;let[$,Z]=u(null),[J,X]=u(_?.root?.path||"."),[Y,j]=u(()=>[_?.root?.path||"."]),[V,N]=u(!1);m(()=>{let $_=_?.root?.path||".";X($_),j([$_]),Z(null)},[_?.root?.path,_?.totalSize]),m(()=>{if(!J)return;N(!0);let $_=setTimeout(()=>N(!1),180);return()=>clearTimeout($_)},[J]);let O=L0(()=>{return i1(_.root,J)||_.root},[_?.root,J]),W=O?.size||_.totalSize||0,{segments:U,legend:E}=L0(()=>{let $_=l4(O,W,_.isDarkTheme);if($_.segments.length>0)return $_;if(W<=0)return $_;let N_=O?.children?.length?"Total":"[files]";return n4(N_,O?.path||_?.root?.path||".",W,_.isDarkTheme)},[O,W,_.isDarkTheme,_?.root?.path]),[D,C]=u(U),w=L(new Map),R=L(0);m(()=>{let $_=w.current,N_=new Map(U.map((d)=>[d.key,d])),P_=performance.now(),r=220,e=(d)=>{let i=Math.min(1,(d-P_)/220),Z_=i*(2-i),j_=U.map((J_)=>{let X_=$_.get(J_.key)||{startAngle:J_.startAngle,endAngle:J_.startAngle,innerRadius:J_.innerRadius,outerRadius:J_.innerRadius},q_=(U_,C_)=>U_+(C_-U_)*Z_,z_=q_(X_.startAngle,J_.startAngle),L_=q_(X_.endAngle,J_.endAngle),A_=q_(X_.innerRadius,J_.innerRadius),F_=q_(X_.outerRadius,J_.outerRadius);return{...J_,d:n1(120,120,A_,F_,z_,L_)}});if(C(j_),i<1)R.current=requestAnimationFrame(e)};if(R.current)cancelAnimationFrame(R.current);return R.current=requestAnimationFrame(e),w.current=N_,()=>{if(R.current)cancelAnimationFrame(R.current)}},[U]);let M=D.length?D:U,H=W>0?l0(W):"0 B",S=O?.name||"",v=(S&&S!=="."?S:"Total")||"Total",p=H,l=Y.length>1,Y_=($_)=>{if(!$_?.path)return;let N_=i1(_.root,$_.path);if(!N_||!Array.isArray(N_.children)||N_.children.length===0)return;j((P_)=>[...P_,N_.path]),X(N_.path),Z(null)},B_=()=>{if(!l)return;j(($_)=>{let N_=$_.slice(0,-1);return X(N_[N_.length-1]||_?.root?.path||"."),N_}),Z(null)};return Q`
        <div class="workspace-folder-starburst">
            <svg viewBox="0 0 240 240" class=${`workspace-folder-starburst-svg${V?" is-zooming":""}`} role="img"
                aria-label=${`Folder sizes for ${O?.path||_?.root?.path||"."}`}
                data-segments=${M.length}
                data-base-size=${W}>
                ${M.map(($_)=>Q`
                    <path
                        key=${$_.key}
                        d=${$_.d}
                        fill=${$_.color}
                        stroke="var(--bg-primary)"
                        stroke-width="1"
                        class=${`workspace-folder-starburst-segment${$?.key===$_.key?" is-hovered":""}`}
                        onMouseEnter=${()=>Z($_)}
                        onMouseLeave=${()=>Z(null)}
                        onTouchStart=${()=>Z($_)}
                        onTouchEnd=${()=>Z(null)}
                        onClick=${()=>Y_($_)}
                    >
                        <title>${$_.label} — ${l0($_.size)}</title>
                    </path>
                `)}
                <g
                    class=${`workspace-folder-starburst-center-hit${l?" is-drill":""}`}
                    onClick=${B_}
                    role="button"
                    aria-label="Zoom out"
                >
                    <circle
                        cx="120"
                        cy="120"
                        r="24"
                        fill="var(--bg-secondary)"
                        stroke="var(--border-color)"
                        stroke-width="1"
                        class="workspace-folder-starburst-center"
                    />
                    <text x="120" y="114" text-anchor="middle" class="workspace-folder-starburst-total-label">${v}</text>
                    <text x="120" y="130" text-anchor="middle" class="workspace-folder-starburst-total-value">${p}</text>
                </g>
            </svg>
            ${E.length>0&&Q`
                <div class="workspace-folder-starburst-legend">
                    ${E.slice(0,8).map(($_)=>Q`
                        <div key=${$_.key} class="workspace-folder-starburst-legend-item">
                            <span class="workspace-folder-starburst-swatch" style=${`background:${$_.color}`}></span>
                            <span class="workspace-folder-starburst-name" title=${$_.name}>${$_.name}</span>
                            <span class="workspace-folder-starburst-size">${l0($_.size)}</span>
                            <span class="workspace-folder-starburst-pct">${$_.pct.toFixed(1)}%</span>
                        </div>
                    `)}
                </div>
            `}
            ${_.truncated&&Q`
                <div class="workspace-folder-starburst-note">Preview is truncated by tree depth/entry limits.</div>
            `}
        </div>
    `}function x6({mediaId:_}){let[$,Z]=u(null);if(m(()=>{if(!_)return;i2(_).then(Z).catch(()=>{})},[_]),!$)return null;let J=$.filename||"file",X=$.metadata?.size?l0($.metadata.size):"";return Q`
        <a href=${z2(_)} download=${J} class="file-attachment"
            onClick=${(Y)=>Y.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${J}</span>
                ${X&&Q`<span class="file-size">${X}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `}function o4({onFileSelect:_,visible:$=!0,active:Z=void 0,onOpenEditor:J}){let[X,Y]=u(null),[j,V]=u(new Set(["."])),[N,O]=u(null),[W,U]=u(null),[E,D]=u(""),[C,w]=u(null),[R,M]=u(null),[H,S]=u(!0),[y,v]=u(!1),[p,l]=u(null),[Y_,B_]=u(()=>Q2("workspaceShowHidden",!1)),[$_,N_]=u(!1),[P_,r]=u(null),[e,d]=u(null),[i,Z_]=u(null),[j_,J_]=u(!1),[v_,X_]=u(null),[q_,z_]=u(()=>v4()),[L_,A_]=u(()=>m1({stored:f0(J1),...c1()})),F_=L(j),U_=L(""),C_=L(null),u_=L(0),w_=L(new Set),b_=L(null),y_=L(new Map),h_=L(_),i_=L(J),M_=L(null),K_=L(null),B0=L(null),a_=L(null),P0=L(null),K0=L(null),F0=L("."),Q_=L(null),G0=L({path:null,dragging:!1,startX:0,startY:0}),E0=L({path:null,dragging:!1,startX:0,startY:0}),x=L({path:null,timer:0}),__=L(!1),E_=L(0),V0=L(new Map),O0=L(null),d_=L(null),v0=L(null),q0=L(null),c_=L(Y_),D0=L($),m_=L(Z??$),t_=L(0),x_=L(i),n0=L($_),_2=L(P_),R0=L(null),W2=L({x:0,y:0}),k0=L(0),C0=L(null),J0=L(N),g0=L(W),y0=L(null),R_=L(null),o0=L(C);h_.current=_,i_.current=J,m(()=>{F_.current=j},[j]),m(()=>{c_.current=Y_},[Y_]),m(()=>{D0.current=$},[$]),m(()=>{m_.current=Z??$},[Z,$]),m(()=>{x_.current=i},[i]),m(()=>{if(typeof window>"u")return;let K=()=>{A_(m1({stored:f0(J1),...c1()}))};K();let q=()=>K(),F=()=>K(),k=(f)=>{if(!f||f.key===null||f.key===J1)K()};window.addEventListener("resize",q),window.addEventListener("focus",F),window.addEventListener("storage",k);let c=window.matchMedia?.("(pointer: coarse)"),o=window.matchMedia?.("(hover: none)"),a=(f,W_)=>{if(!f)return;if(f.addEventListener)f.addEventListener("change",W_);else if(f.addListener)f.addListener(W_)},s=(f,W_)=>{if(!f)return;if(f.removeEventListener)f.removeEventListener("change",W_);else if(f.removeListener)f.removeListener(W_)};return a(c,q),a(o,q),()=>{window.removeEventListener("resize",q),window.removeEventListener("focus",F),window.removeEventListener("storage",k),s(c,q),s(o,q)}},[]),m(()=>{let K=(q)=>{let F=q?.detail?.path;if(!F)return;let k=F.split("/"),c=[];for(let o=1;o<k.length;o++)c.push(k.slice(0,o).join("/"));if(c.length)V((o)=>{let a=new Set(o);a.add(".");for(let s of c)a.add(s);return a});O(F),requestAnimationFrame(()=>{let o=document.querySelector(`[data-path="${CSS.escape(F)}"]`);if(o)o.scrollIntoView({block:"nearest",behavior:"smooth"})})};return window.addEventListener("workspace-reveal-path",K),()=>window.removeEventListener("workspace-reveal-path",K)},[]),m(()=>{n0.current=$_},[$_]),m(()=>{_2.current=P_},[P_]),m(()=>{J0.current=N},[N]),m(()=>{g0.current=W},[W]),m(()=>{o0.current=C},[C]),m(()=>{if(typeof window>"u"||typeof document>"u")return;let K=()=>z_(v4());K();let q=window.matchMedia?.("(prefers-color-scheme: dark)"),F=()=>K();if(q?.addEventListener)q.addEventListener("change",F);else if(q?.addListener)q.addListener(F);let k=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;if(k?.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]}),document.body)k?.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme"]});return()=>{if(q?.removeEventListener)q.removeEventListener("change",F);else if(q?.removeListener)q.removeListener(F);k?.disconnect()}},[]),m(()=>{if(!W)return;let K=P0.current;if(!K)return;let q=requestAnimationFrame(()=>{try{K.focus(),K.select()}catch{}});return()=>cancelAnimationFrame(q)},[W]);let j2=async(K)=>{v(!0),w(null),M(null);try{let q=await i3(K,20000);w(q)}catch(q){w({error:q.message||"Failed to load preview"})}finally{v(!1)}};M_.current=j2;let $2=async()=>{if(!D0.current)return;try{let K=await l2("",1,c_.current),q=f4(K.root,F_.current,c_.current);if(q===U_.current){S(!1);return}if(U_.current=q,C_.current=K.root,!u_.current)u_.current=requestAnimationFrame(()=>{u_.current=0,Y((F)=>l1(F,C_.current)),S(!1)})}catch(K){l(K.message||"Failed to load workspace"),S(!1)}},d0=async(K)=>{if(!K)return;if(w_.current.has(K))return;w_.current.add(K);try{let q=await l2(K,1,c_.current);Y((F)=>p1(F,K,q.root))}catch(q){l(q.message||"Failed to load workspace")}finally{w_.current.delete(K)}};K_.current=d0;let r_=b(()=>{let K=N;if(!K)return".";let q=y_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[N]),z0=b((K)=>{let q=K?.closest?.(".workspace-row");if(!q)return null;let F=q.dataset.path,k=q.dataset.type;if(!F)return null;if(k==="dir")return F;if(F.includes("/")){let c=F.split("/");return c.pop(),c.join("/")||"."}return"."},[]),Q0=b((K)=>{return z0(K?.target||null)},[z0]),I_=b((K)=>{x_.current=K,Z_(K)},[]),e_=b(()=>{let K=x.current;if(K?.timer)clearTimeout(K.timer);x.current={path:null,timer:0}},[]),g_=b((K)=>{if(!K||K==="."){e_();return}let q=y_.current?.get(K);if(!q||q.type!=="dir"){e_();return}if(F_.current?.has(K)){e_();return}if(x.current?.path===K)return;e_();let F=setTimeout(()=>{x.current={path:null,timer:0},K_.current?.(K),V((k)=>{let c=new Set(k);return c.add(K),c})},600);x.current={path:K,timer:F}},[e_]),_0=b((K,q)=>{if(W2.current={x:K,y:q},k0.current)return;k0.current=requestAnimationFrame(()=>{k0.current=0;let F=R0.current;if(!F)return;let k=W2.current;F.style.transform=`translate(${k.x+12}px, ${k.y+12}px)`})},[]),U0=b((K)=>{if(!K)return;let F=(y_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F)return;d({path:K,label:F})},[]),b0=b(()=>{if(d(null),k0.current)cancelAnimationFrame(k0.current),k0.current=0;if(R0.current)R0.current.style.transform="translate(-9999px, -9999px)"},[]),u0=b((K)=>{if(!K)return".";let q=y_.current?.get(K);if(q&&q.type==="dir")return q.path;if(K==="."||!K.includes("/"))return".";let F=K.split("/");return F.pop(),F.join("/")||"."},[]),Y0=b(()=>{U(null),D("")},[]),Z2=b((K)=>{if(!K)return;let F=(y_.current?.get(K)?.name||K.split("/").pop()||K).trim();if(!F||K===".")return;U(K),D(F)},[]),M0=b(async()=>{let K=g0.current;if(!K)return;let q=(E||"").trim();if(!q){Y0();return}let F=y_.current?.get(K),k=(F?.name||K.split("/").pop()||K).trim();if(q===k){Y0();return}try{let o=(await o3(K,q))?.path||K,a=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(Y0(),l(null),window.dispatchEvent(new CustomEvent("workspace-file-renamed",{detail:{oldPath:K,newPath:o,type:F?.type||"file"}})),F?.type==="dir")V((s)=>{let f=new Set;for(let W_ of s)if(W_===K)f.add(o);else if(W_.startsWith(`${K}/`))f.add(`${o}${W_.slice(K.length)}`);else f.add(W_);return f});if(O(o),F?.type==="dir")w(null),v(!1),M(null);else M_.current?.(o);K_.current?.(a)}catch(c){l(c?.message||"Failed to rename file")}},[Y0,E]),c0=b(async(K)=>{let k=K||".";for(let c=0;c<50;c+=1){let a=`untitled${c===0?"":`-${c}`}.md`;try{let f=(await n3(k,a,""))?.path||(k==="."?a:`${k}/${a}`);if(k&&k!==".")V((W_)=>new Set([...W_,k]));O(f),l(null),K_.current?.(k),M_.current?.(f);return}catch(s){if(s?.status===409||s?.code==="file_exists")continue;l(s?.message||"Failed to create file");return}}l("Failed to create file (untitled name already in use).")},[]),r0=b((K)=>{if(K?.stopPropagation?.(),j_)return;let q=u0(J0.current);c0(q)},[j_,u0,c0]);m(()=>{if(typeof window>"u")return;let K=(q)=>{let F=q?.detail?.updates||[];if(!Array.isArray(F)||F.length===0)return;Y((s)=>{let f=s;for(let W_ of F){if(!W_?.root)continue;if(!f||W_.path==="."||!W_.path)f=W_.root;else f=p1(f,W_.path,W_.root)}if(f)U_.current=f4(f,F_.current,c_.current);return S(!1),f});let k=J0.current;if(Boolean(k)&&F.some((s)=>{let f=s?.path||"";if(!f||f===".")return!0;return k===f||k.startsWith(`${f}/`)||f.startsWith(`${k}/`)}))V0.current.clear();if(!k||!o0.current)return;let o=y_.current?.get(k);if(o&&o.type==="dir")return;if(F.some((s)=>{let f=s?.path||"";if(!f||f===".")return!0;return k===f||k.startsWith(`${f}/`)}))M_.current?.(k)};return window.addEventListener("workspace-update",K),()=>window.removeEventListener("workspace-update",K)},[]),b_.current=$2;let m0=L(()=>{if(typeof window>"u")return;let K=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),q=m_.current??D0.current,F=document.visibilityState!=="hidden"&&(q||K.matches&&D0.current);n2(F,c_.current).catch(()=>{})}).current,z=L(0),T=L(()=>{if(z.current)clearTimeout(z.current);z.current=setTimeout(()=>{z.current=0,m0()},250)}).current;m(()=>{if(D0.current)b_.current?.();T()},[$,Z]),m(()=>{b_.current(),m0();let K=setInterval(()=>b_.current(),P6),q=U2("previewHeight",null),F=Number.isFinite(q)?Math.min(Math.max(q,80),600):280;if(E_.current=F,B0.current)B0.current.style.setProperty("--preview-height",`${F}px`);let k=window.matchMedia("(min-width: 1024px) and (orientation: landscape)"),c=()=>T();if(k.addEventListener)k.addEventListener("change",c);else if(k.addListener)k.addListener(c);return document.addEventListener("visibilitychange",c),()=>{if(clearInterval(K),u_.current)cancelAnimationFrame(u_.current),u_.current=0;if(k.removeEventListener)k.removeEventListener("change",c);else if(k.removeListener)k.removeListener(c);if(document.removeEventListener("visibilitychange",c),z.current)clearTimeout(z.current),z.current=0;if(Q_.current)clearTimeout(Q_.current),Q_.current=null;n2(!1,c_.current).catch(()=>{})}},[]);let n=L0(()=>u4(X,j,Y_),[X,j,Y_]),O_=L0(()=>new Map(n.map((K)=>[K.node.path,K.node])),[n]),D_=L0(()=>T4(L_),[L_]);y_.current=O_;let V_=(N?y_.current.get(N):null)?.type==="dir";m(()=>{if(!N||!V_){X_(null),O0.current=null,d_.current=null;return}let K=N,q=`${Y_?"hidden":"visible"}:${N}`,F=V0.current,k=F.get(q);if(k?.root){F.delete(q),F.set(q,k);let a=R4(k.root,Boolean(k.truncated),q_);if(a)O0.current=a,d_.current=N,X_({loading:!1,error:null,payload:a});return}let c=O0.current,o=d_.current;X_({loading:!0,error:null,payload:o===N?c:null}),l2(N,b6,Y_).then((a)=>{if(J0.current!==K)return;let s={root:a?.root,truncated:Boolean(a?.truncated)};F.delete(q),F.set(q,s);while(F.size>M6){let W_=F.keys().next().value;if(!W_)break;F.delete(W_)}let f=R4(s.root,s.truncated,q_);O0.current=f,d_.current=N,X_({loading:!1,error:null,payload:f})}).catch((a)=>{if(J0.current!==K)return;X_({loading:!1,error:a?.message||"Failed to load folder size chart",payload:o===N?c:null})})},[N,V_,Y_,q_]);let X0=Boolean(C&&C.kind==="text"&&!V_&&(!C.size||C.size<=262144)),h0=X0?"Open in editor":C?.size>262144?"File too large to edit":"File is not editable";m(()=>{let K=v0.current;if(q0.current)q0.current.dispose(),q0.current=null;if(!K)return;if(K.innerHTML="",!N||V_||!C||C.error)return;let q={path:N,content:typeof C.text==="string"?C.text:void 0,mtime:C.mtime,size:C.size,preview:C,mode:"view"},F=p_.resolve(q)||p_.get("workspace-preview-default");if(!F)return;let k=F.mount(K,q);return q0.current=k,()=>{if(q0.current===k)k.dispose(),q0.current=null;K.innerHTML=""}},[N,V_,C]);let S0=(K)=>{let q=K?.target;if(q instanceof Element)return q;return q?.parentElement||null},p0=(K)=>{return Boolean(K?.closest?.(".workspace-node-icon, .workspace-label-text"))},K2=L((K)=>{if(R_.current)clearTimeout(R_.current),R_.current=null;let F=S0(K)?.closest?.("[data-path]");if(!F)return;let k=F.dataset.path;if(F.dataset.type==="dir"||!k)return;if(g0.current===k)Y0();i_.current?.(k)}).current,G2=L((K)=>{if(__.current){__.current=!1;return}let q=S0(K),F=q?.closest?.("[data-path]");if(a_.current?.focus?.(),!F)return;let k=F.dataset.path,c=F.dataset.type,o=Boolean(q?.closest?.(".workspace-caret")),a=Boolean(q?.closest?.("button"))||Boolean(q?.closest?.("a"))||Boolean(q?.closest?.("input")),s=J0.current===k,f=g0.current;if(f){if(f===k)return;Y0()}let W_=c==="file"&&y0.current===k&&!o&&!a;if(s&&!o&&!a&&k!=="."&&!W_){if(R_.current)clearTimeout(R_.current);R_.current=setTimeout(()=>{R_.current=null,Z2(k)},350);return}if(c==="dir"){if(y0.current=null,O(k),w(null),M(null),v(!1),!F_.current.has(k))K_.current?.(k);if(s&&!o)return;V((w0)=>{let T0=new Set(w0);if(T0.has(k))T0.delete(k);else T0.add(k);return T0})}else{y0.current=null,O(k);let T_=y_.current.get(k);if(T_)h_.current?.(T_.path,T_);M_.current?.(k)}}).current,s_=L(()=>{U_.current="",b_.current(),Array.from(F_.current||[]).filter((q)=>q&&q!==".").forEach((q)=>K_.current?.(q))}).current,S_=L(()=>{y0.current=null,O(null),w(null),M(null),v(!1)}).current,W0=L(()=>{B_((K)=>{let q=!K;if(typeof window<"u")f_("workspaceShowHidden",String(q));return c_.current=q,n2(!0,q).catch(()=>{}),U_.current="",b_.current?.(),Array.from(F_.current||[]).filter((k)=>k&&k!==".").forEach((k)=>K_.current?.(k)),q})}).current,s0=L((K)=>{if(S0(K)?.closest?.("[data-path]"))return;S_()}).current,n_=b(async(K)=>{if(!K)return;let q=K.split("/").pop()||K;if(!window.confirm(`Delete "${q}"? This cannot be undone.`))return;try{await r3(K);let k=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(J0.current===K)S_();K_.current?.(k),l(null)}catch(k){w((c)=>({...c||{},error:k.message||"Failed to delete file"}))}},[S_]),$0=b((K)=>{let q=a_.current;if(!q||!K||typeof CSS>"u"||typeof CSS.escape!=="function")return;q.querySelector(`[data-path="${CSS.escape(K)}"]`)?.scrollIntoView?.({block:"nearest"})},[]),x0=b((K)=>{let q=n;if(!q||q.length===0)return;let F=N?q.findIndex((k)=>k.node.path===N):-1;if(K.key==="ArrowDown"){K.preventDefault();let k=Math.min(F+1,q.length-1),c=q[k];if(!c)return;if(O(c.node.path),c.node.type!=="dir")h_.current?.(c.node.path,c.node),M_.current?.(c.node.path);else w(null),v(!1),M(null);$0(c.node.path);return}if(K.key==="ArrowUp"){K.preventDefault();let k=F<=0?0:F-1,c=q[k];if(!c)return;if(O(c.node.path),c.node.type!=="dir")h_.current?.(c.node.path,c.node),M_.current?.(c.node.path);else w(null),v(!1),M(null);$0(c.node.path);return}if(K.key==="ArrowRight"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&!j.has(k.node.path))K.preventDefault(),K_.current?.(k.node.path),V((c)=>new Set([...c,k.node.path]));return}if(K.key==="ArrowLeft"&&F>=0){let k=q[F];if(k?.node?.type==="dir"&&j.has(k.node.path))K.preventDefault(),V((c)=>{let o=new Set(c);return o.delete(k.node.path),o});return}if(K.key==="Enter"&&F>=0){K.preventDefault();let k=q[F];if(!k)return;let c=k.node.path;if(k.node.type==="dir"){if(!F_.current.has(c))K_.current?.(c);V((a)=>{let s=new Set(a);if(s.has(c))s.delete(c);else s.add(c);return s}),w(null),M(null),v(!1)}else h_.current?.(c,k.node),M_.current?.(c);return}if((K.key==="Delete"||K.key==="Backspace")&&F>=0){let k=q[F];if(!k||k.node.type==="dir")return;K.preventDefault(),n_(k.node.path);return}if(K.key==="Escape")K.preventDefault(),S_()},[S_,n_,j,n,$0,N]),N0=b((K)=>{let q=S0(K),F=q?.closest?.(".workspace-row");if(!F)return;let k=F.dataset.type,c=F.dataset.path;if(!c||c===".")return;if(g0.current===c)return;let o=K?.touches?.[0];if(!o)return;if(G0.current={path:p0(q)?c:null,dragging:!1,startX:o.clientX,startY:o.clientY},k!=="file")return;if(Q_.current)clearTimeout(Q_.current);Q_.current=setTimeout(()=>{if(Q_.current=null,G0.current?.dragging)return;n_(c)},600)},[n_]),A0=b(()=>{if(Q_.current)clearTimeout(Q_.current),Q_.current=null;let K=G0.current;if(K?.dragging&&K.path){let q=x_.current||r_(),F=C0.current;if(typeof F==="function")F(K.path,q)}G0.current={path:null,dragging:!1,startX:0,startY:0},t_.current=0,N_(!1),r(null),I_(null),e_(),b0()},[r_,b0,I_,e_]),V2=b((K)=>{let q=G0.current,F=K?.touches?.[0];if(!F||!q?.path){if(Q_.current)clearTimeout(Q_.current),Q_.current=null;return}let k=Math.abs(F.clientX-q.startX),c=Math.abs(F.clientY-q.startY),o=k>8||c>8;if(o&&Q_.current)clearTimeout(Q_.current),Q_.current=null;if(!q.dragging&&o)q.dragging=!0,N_(!0),r("move"),U0(q.path);if(q.dragging){K.preventDefault(),_0(F.clientX,F.clientY);let a=document.elementFromPoint(F.clientX,F.clientY),s=z0(a)||r_();if(x_.current!==s)I_(s);g_(s)}},[z0,r_,U0,_0,I_,g_]),E2=L((K)=>{K.preventDefault();let q=B0.current;if(!q)return;let F=K.clientY,k=E_.current||280,c=K.currentTarget;c.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let o=F,a=(f)=>{o=f.clientY;let W_=q.clientHeight-80,T_=Math.min(Math.max(k-(f.clientY-F),80),W_);q.style.setProperty("--preview-height",`${T_}px`),E_.current=T_},s=()=>{let f=q.clientHeight-80,W_=Math.min(Math.max(k-(o-F),80),f);E_.current=W_,c.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("previewHeight",String(Math.round(W_))),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",s)}).current,J2=L((K)=>{K.preventDefault();let q=B0.current;if(!q)return;let F=K.touches[0];if(!F)return;let k=F.clientY,c=E_.current||280,o=K.currentTarget;o.classList.add("dragging"),document.body.style.userSelect="none";let a=(f)=>{let W_=f.touches[0];if(!W_)return;f.preventDefault();let T_=q.clientHeight-80,w0=Math.min(Math.max(c-(W_.clientY-k),80),T_);q.style.setProperty("--preview-height",`${w0}px`),E_.current=w0},s=()=>{o.classList.remove("dragging"),document.body.style.userSelect="",f_("previewHeight",String(Math.round(E_.current||c))),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",s),document.removeEventListener("touchcancel",s)};document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",s),document.addEventListener("touchcancel",s)}).current,X1=async()=>{if(!N)return;try{let K=await l3(N);if(K.media_id)M(K.media_id)}catch(K){w((q)=>({...q||{},error:K.message||"Failed to attach"}))}},W1=async()=>{if(!N||V_)return;await n_(N)},Y2=(K)=>{return Array.from(K?.dataTransfer?.types||[]).includes("Files")},S2=b((K)=>{if(!Y2(K))return;if(K.preventDefault(),t_.current+=1,!n0.current)N_(!0);r("upload");let q=Q0(K)||r_();I_(q),g_(q)},[r_,Q0,I_,g_]),Z0=b((K)=>{if(!Y2(K))return;if(K.preventDefault(),K.dataTransfer)K.dataTransfer.dropEffect="copy";if(!n0.current)N_(!0);if(_2.current!=="upload")r("upload");let q=Q0(K)||r_();if(x_.current!==q)I_(q);g_(q)},[r_,Q0,I_,g_]),j1=b((K)=>{if(!Y2(K))return;if(K.preventDefault(),t_.current=Math.max(0,t_.current-1),t_.current===0)N_(!1),r(null),I_(null),e_()},[I_,e_]),N2=b(async(K,q=".")=>{let F=Array.from(K||[]);if(F.length===0)return;let k=q&&q!==""?q:".",c=k!=="."?k:"workspace root";J_(!0);try{let o=null;for(let a of F)try{o=await C1(a,k)}catch(s){let f=s?.status,W_=s?.code;if(f===409||W_==="file_exists"){let T_=a?.name||"file";if(!window.confirm(`"${T_}" already exists in ${c}. Overwrite?`))continue;o=await C1(a,k,{overwrite:!0})}else throw s}if(o?.path)y0.current=o.path,O(o.path),M_.current?.(o.path);K_.current?.(k)}catch(o){l(o.message||"Failed to upload file")}finally{J_(!1)}},[]),x2=b(async(K,q)=>{if(!K)return;let F=y_.current?.get(K);if(!F)return;let k=q&&q!==""?q:".",c=K.includes("/")?K.split("/").slice(0,-1).join("/")||".":".";if(k===c)return;try{let a=(await d3(K,k))?.path||K;if(F.type==="dir")V((s)=>{let f=new Set;for(let W_ of s)if(W_===K)f.add(a);else if(W_.startsWith(`${K}/`))f.add(`${a}${W_.slice(K.length)}`);else f.add(W_);return f});if(O(a),F.type==="dir")w(null),v(!1),M(null);else M_.current?.(a);K_.current?.(c),K_.current?.(k)}catch(o){l(o?.message||"Failed to move entry")}},[]);C0.current=x2;let I0=b(async(K)=>{if(!Y2(K))return;K.preventDefault(),t_.current=0,N_(!1),r(null),Z_(null),e_();let q=Array.from(K?.dataTransfer?.files||[]);if(q.length===0)return;let F=x_.current||Q0(K)||r_();await N2(q,F)},[r_,Q0,N2]),j0=b((K)=>{if(K?.stopPropagation?.(),j_)return;let q=K?.currentTarget?.dataset?.uploadTarget||".";F0.current=q,K0.current?.click()},[j_]),K1=b(()=>{if(j_)return;let K=J0.current,q=K?y_.current?.get(K):null;F0.current=q?.type==="dir"?q.path:".",K0.current?.click()},[j_]),D2=b((K)=>{if(!K||K.button!==0)return;let q=K.currentTarget;if(!q||!q.dataset)return;let F=q.dataset.path;if(!F||F===".")return;if(g0.current===F)return;let k=S0(K);if(k?.closest?.("button, a, input, .workspace-caret"))return;if(!p0(k))return;K.preventDefault(),E0.current={path:F,dragging:!1,startX:K.clientX,startY:K.clientY};let c=(a)=>{let s=E0.current;if(!s?.path)return;let f=Math.abs(a.clientX-s.startX),W_=Math.abs(a.clientY-s.startY),T_=f>4||W_>4;if(!s.dragging&&T_)s.dragging=!0,__.current=!0,N_(!0),r("move"),U0(s.path),_0(a.clientX,a.clientY),document.body.style.userSelect="none",document.body.style.cursor="grabbing";if(s.dragging){a.preventDefault(),_0(a.clientX,a.clientY);let w0=document.elementFromPoint(a.clientX,a.clientY),T0=z0(w0)||r_();if(x_.current!==T0)I_(T0);g_(T0)}},o=()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",o);let a=E0.current;if(a?.dragging&&a.path){let s=x_.current||r_(),f=C0.current;if(typeof f==="function")f(a.path,s)}E0.current={path:null,dragging:!1,startX:0,startY:0},t_.current=0,N_(!1),r(null),I_(null),e_(),b0(),document.body.style.userSelect="",document.body.style.cursor="",setTimeout(()=>{__.current=!1},0)};document.addEventListener("mousemove",c),document.addEventListener("mouseup",o)},[z0,r_,U0,_0,b0,I_,g_,e_]),a0=b(async(K)=>{let q=Array.from(K?.target?.files||[]);if(q.length===0)return;let F=F0.current||".";if(await N2(q,F),F0.current=".",K?.target)K.target.value=""},[N2]);return Q`
        <aside
            class=${`workspace-sidebar${$_?" workspace-drop-active":""}`}
            data-workspace-scale=${L_}
            ref=${B0}
            onDragEnter=${S2}
            onDragOver=${Z0}
            onDragLeave=${j1}
            onDrop=${I0}
        >
            <input type="file" multiple style="display:none" ref=${K0} onChange=${a0} />
            <div class="workspace-header">
                <span>Workspace</span>
                <div class="workspace-header-actions">
                    <button class="workspace-create" onClick=${r0} title="New file" disabled=${j_}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button class="workspace-refresh" onClick=${s_} title="Refresh">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6"
                                transform="rotate(75 12 12)" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                    </button>
                    <button
                        class=${`workspace-toggle-hidden${Y_?" active":""}`}
                        onClick=${W0}
                        title=${Y_?"Hide hidden files":"Show hidden files"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                            ${!Y_&&Q`<line x1="3" y1="3" x2="21" y2="21" />`}
                        </svg>
                    </button>
                </div>
            </div>
            <div class="workspace-tree" onClick=${s0}>
                ${j_&&Q`<div class="workspace-drop-hint">Uploading…</div>`}
                ${H&&Q`<div class="workspace-loading">Loading…</div>`}
                ${p&&Q`<div class="workspace-error">${p}</div>`}
                ${X&&Q`
                    <div
                        class="workspace-tree-list"
                        ref=${a_}
                        tabIndex="0"
                        onClick=${G2}
                        onDblClick=${K2}
                        onKeyDown=${x0}
                        onTouchStart=${N0}
                        onTouchEnd=${A0}
                        onTouchMove=${V2}
                        onTouchCancel=${A0}
                    >
                        ${n.map(({node:K,depth:q})=>{let F=K.type==="dir",k=K.path===N,c=K.path===W,o=F&&j.has(K.path),a=i&&K.path===i,s=Array.isArray(K.children)&&K.children.length>0?K.children.length:Number(K.child_count)||0;return Q`
                                <div
                                    key=${K.path}
                                    class=${`workspace-row${k?" selected":""}${a?" drop-target":""}`}
                                    style=${{paddingLeft:`${8+q*D_.indentPx}px`}}
                                    data-path=${K.path}
                                    data-type=${K.type}
                                    onMouseDown=${D2}
                                >
                                    <span class="workspace-caret" aria-hidden="true">
                                        ${F?o?Q`<svg viewBox="0 0 12 12"><polygon points="1,2 11,2 6,11"/></svg>`:Q`<svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>`:null}
                                    </span>
                                    <svg class=${`workspace-node-icon${F?" folder":""}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        aria-hidden="true">
                                        ${F?Q`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`:Q`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`}
                                    </svg>
                                    ${c?Q`
                                            <input
                                                class="workspace-rename-input"
                                                ref=${P0}
                                                value=${E}
                                                onInput=${(f)=>D(f?.target?.value||"")}
                                                onKeyDown=${(f)=>{if(f.key==="Enter")f.preventDefault(),M0();else if(f.key==="Escape")f.preventDefault(),Y0()}}
                                                onBlur=${Y0}
                                                onClick=${(f)=>f.stopPropagation()}
                                            />
                                        `:Q`<span class="workspace-label"><span class="workspace-label-text">${K.name}</span></span>`}
                                    ${F&&!o&&s>0&&Q`
                                        <span class="workspace-count">${s}</span>
                                    `}
                                    ${F&&Q`
                                        <button
                                            class="workspace-folder-upload"
                                            data-upload-target=${K.path}
                                            title="Upload files to this folder"
                                            onClick=${j0}
                                            disabled=${j_}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 8 12 3 17 8"/>
                                                <line x1="12" y1="3" x2="12" y2="15"/>
                                            </svg>
                                        </button>
                                    `}
                                </div>
                            `})}
                    </div>
                `}
            </div>
            ${N&&Q`
                <div class="workspace-preview-splitter-h" onMouseDown=${E2} onTouchStart=${J2}></div>
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${N}</span>
                        <div class="workspace-preview-actions">
                            <button class="workspace-create" onClick=${r0} title="New file" disabled=${j_}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            ${!V_&&Q`
                                <button
                                    class="workspace-download workspace-edit"
                                    onClick=${()=>X0&&i_.current?.(N,C)}
                                    title=${h0}
                                    disabled=${!X0}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                                <button
                                    class="workspace-download workspace-delete"
                                    onClick=${W1}
                                    title="Delete file"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            `}
                            ${V_?Q`
                                    <button class="workspace-download" onClick=${K1}
                                        title="Upload files to this folder" disabled=${j_}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 8 12 3 17 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                    </button>
                                    <a class="workspace-download" href=${s3(N,Y_)}
                                        title="Download folder as zip" onClick=${(K)=>K.stopPropagation()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </a>`:Q`<button class="workspace-download" onClick=${X1} title="Download">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>`}
                        </div>
                    </div>
                    ${y&&Q`<div class="workspace-loading">Loading preview…</div>`}
                    ${C?.error&&Q`<div class="workspace-error">${C.error}</div>`}
                    ${V_&&Q`
                        <div class="workspace-preview-text">Folder selected — create file, upload files, or download as zip.</div>
                        ${v_?.loading&&Q`<div class="workspace-loading">Loading folder size preview…</div>`}
                        ${v_?.error&&Q`<div class="workspace-error">${v_.error}</div>`}
                        ${v_?.payload&&v_.payload.segments?.length>0&&Q`
                            <${S6} payload=${v_.payload} />
                        `}
                        ${v_?.payload&&(!v_.payload.segments||v_.payload.segments.length===0)&&Q`
                            <div class="workspace-preview-text">No file size data available for this folder yet.</div>
                        `}
                    `}
                    ${C&&!C.error&&!V_&&Q`
                        <div class="workspace-preview-meta">
                            ${C.size?Q`<span>${l0(C.size)}</span>`:""}
                            ${C.mtime?Q`<span>${_1(C.mtime)}</span>`:""}
                            ${C.truncated?Q`<span>truncated</span>`:""}
                        </div>
                        <div class="workspace-preview-body" ref=${v0}></div>
                    `}
                    ${R&&Q`
                        <div class="workspace-download-card">
                            <${x6} mediaId=${R} />
                        </div>
                    `}
                </div>
            `}
            ${e&&Q`
                <div class="workspace-drag-ghost" ref=${R0}>${e.label}</div>
            `}
        </aside>
    `}function d4({tabs:_,activeId:$,onActivate:Z,onClose:J,onCloseOthers:X,onCloseAll:Y,onTogglePin:j,onTogglePreview:V,previewTabs:N,onToggleDock:O,dockVisible:W}){let[U,E]=u(null),D=L(null);m(()=>{if(!U)return;let H=(S)=>{if(S.type==="keydown"&&S.key!=="Escape")return;E(null)};return document.addEventListener("click",H),document.addEventListener("keydown",H),()=>{document.removeEventListener("click",H),document.removeEventListener("keydown",H)}},[U]),m(()=>{let H=(S)=>{if(S.ctrlKey&&S.key==="Tab"){if(S.preventDefault(),!_.length)return;let y=_.findIndex((v)=>v.id===$);if(S.shiftKey){let v=_[(y-1+_.length)%_.length];Z?.(v.id)}else{let v=_[(y+1)%_.length];Z?.(v.id)}return}if((S.ctrlKey||S.metaKey)&&S.key==="w"){let y=document.querySelector(".editor-pane");if(y&&y.contains(document.activeElement)){if(S.preventDefault(),$)J?.($)}}};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[_,$,Z,J]);let C=b((H,S)=>{if(H.button===1){H.preventDefault(),J?.(S);return}if(H.button===0)Z?.(S)},[Z,J]),w=b((H,S)=>{H.preventDefault(),E({id:S,x:H.clientX,y:H.clientY})},[]),R=b((H)=>{H.preventDefault(),H.stopPropagation()},[]),M=b((H,S)=>{H.preventDefault(),H.stopPropagation(),J?.(S)},[J]);if(m(()=>{if(!$||!D.current)return;let H=D.current.querySelector(".tab-item.active");if(H)H.scrollIntoView({block:"nearest",inline:"nearest",behavior:"smooth"})},[$]),!_.length)return null;return Q`
        <div class="tab-strip" ref=${D} role="tablist">
            ${_.map((H)=>Q`
                <div
                    key=${H.id}
                    class=${`tab-item${H.id===$?" active":""}${H.dirty?" dirty":""}${H.pinned?" pinned":""}`}
                    role="tab"
                    aria-selected=${H.id===$}
                    title=${H.path}
                    onMouseDown=${(S)=>C(S,H.id)}
                    onContextMenu=${(S)=>w(S,H.id)}
                >
                    ${H.pinned&&Q`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${H.label}</span>
                    <button
                        type="button"
                        class="tab-close"
                        onMouseDown=${R}
                        onClick=${(S)=>M(S,H.id)}
                        title=${H.dirty?"Unsaved changes":"Close"}
                        aria-label=${H.dirty?"Unsaved changes":`Close ${H.label}`}
                    >
                        ${H.dirty?Q`<span class="tab-dirty-dot" aria-hidden="true"></span>`:Q`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`}
                    </button>
                </div>
            `)}
            ${O&&Q`
                <div class="tab-strip-spacer"></div>
                <button
                    class=${`tab-strip-dock-toggle${W?" active":""}`}
                    onClick=${O}
                    title=${`${W?"Hide":"Show"} terminal (Ctrl+\`)`}
                    aria-label=${`${W?"Hide":"Show"} terminal`}
                    aria-pressed=${W?"true":"false"}
                >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 12 4 10 8 6 12 10 12 12"/>
                        <line x1="2" y1="14" x2="14" y2="14"/>
                    </svg>
                </button>
            `}
        </div>
        ${U&&Q`
            <div class="tab-context-menu" style=${{left:U.x+"px",top:U.y+"px"}}>
                <button onClick=${()=>{J?.(U.id),E(null)}}>Close</button>
                <button onClick=${()=>{X?.(U.id),E(null)}}>Close Others</button>
                <button onClick=${()=>{Y?.(),E(null)}}>Close All</button>
                <hr />
                <button onClick=${()=>{j?.(U.id),E(null)}}>
                    ${_.find((H)=>H.id===U.id)?.pinned?"Unpin":"Pin"}
                </button>
                ${V&&/\.(md|mdx|markdown)$/i.test(U.id)&&Q`
                    <hr />
                    <button onClick=${()=>{V(U.id),E(null)}}>
                        ${N?.has(U.id)?"Hide Preview":"Preview"}
                    </button>
                `}
            </div>
        `}
    `}var I6=400,o1=60,r4=220,d1="mdPreviewHeight";function T6(){try{let _=localStorage.getItem(d1),$=_?Number(_):NaN;return Number.isFinite($)&&$>=o1?$:r4}catch{return r4}}function s4({getContent:_,path:$,onClose:Z}){let[J,X]=u(""),[Y,j]=u(T6),V=L(null),N=L(null),O=L(""),W=L(_);return W.current=_,m(()=>{let D=()=>{let w=W.current?.()||"";if(w===O.current)return;O.current=w;try{let R=F2(w,null,{sanitize:!1});X(R)}catch{X('<p style="color:var(--text-secondary)">Preview unavailable</p>')}};D();let C=setInterval(D,I6);return()=>clearInterval(C)},[]),m(()=>{if(V.current&&J)e2(V.current).catch(()=>{})},[J]),Q`
        <div
            class="md-preview-splitter"
            onMouseDown=${(D)=>{D.preventDefault();let C=D.clientY,w=N.current?.offsetHeight||Y,R=N.current?.parentElement,M=R?R.offsetHeight*0.7:500,H=D.currentTarget;H.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let S=(v)=>{let p=Math.min(Math.max(w-(v.clientY-C),o1),M);j(p)},y=()=>{H.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="";try{localStorage.setItem(d1,String(Math.round(N.current?.offsetHeight||Y)))}catch{}document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",y)}}
            onTouchStart=${(D)=>{D.preventDefault();let C=D.touches[0];if(!C)return;let w=C.clientY,R=N.current?.offsetHeight||Y,M=N.current?.parentElement,H=M?M.offsetHeight*0.7:500,S=D.currentTarget;S.classList.add("dragging"),document.body.style.userSelect="none";let y=(p)=>{let l=p.touches[0];if(!l)return;p.preventDefault();let Y_=Math.min(Math.max(R-(l.clientY-w),o1),H);j(Y_)},v=()=>{S.classList.remove("dragging"),document.body.style.userSelect="";try{localStorage.setItem(d1,String(Math.round(N.current?.offsetHeight||Y)))}catch{}document.removeEventListener("touchmove",y),document.removeEventListener("touchend",v),document.removeEventListener("touchcancel",v)};document.addEventListener("touchmove",y,{passive:!1}),document.addEventListener("touchend",v),document.addEventListener("touchcancel",v)}}
        ></div>
        <div class="md-preview-panel" ref=${N} style=${{height:Y+"px"}}>
            <div class="md-preview-header">
                <span class="md-preview-title">Preview</span>
                <button class="md-preview-close" onClick=${Z} title="Close preview" aria-label="Close preview">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <line x1="4" y1="4" x2="12" y2="12"/>
                        <line x1="12" y1="4" x2="4" y2="12"/>
                    </svg>
                </button>
            </div>
            <div
                class="md-preview-body post-content"
                ref=${V}
                dangerouslySetInnerHTML=${{__html:J}}
            />
        </div>
    `}function a4({handleSseEvent:_,handleConnectionStatusChange:$,loadPosts:Z}){let J=L(_);J.current=_;let X=L($);X.current=$;let Y=L(Z);Y.current=Z,m(()=>{Y.current();let j=new A1((N,O)=>J.current(N,O),(N)=>X.current(N));j.connect();let V=()=>{j.reconnectIfNeeded()};return window.addEventListener("focus",V),document.addEventListener("visibilitychange",V),()=>{window.removeEventListener("focus",V),document.removeEventListener("visibilitychange",V),j.disconnect()}},[])}function t4(){let[_,$]=u(!1),[Z,J]=u("default"),X=L(!1);m(()=>{let N=Q2("notificationsEnabled",!1);if(X.current=N,$(N),typeof Notification<"u")J(Notification.permission)},[]),m(()=>{X.current=_},[_]);let Y=b(()=>{if(typeof Notification>"u")return Promise.resolve("denied");try{let N=Notification.requestPermission();if(N&&typeof N.then==="function")return N;return Promise.resolve(N)}catch{return Promise.resolve("default")}},[]),j=b(async()=>{if(typeof window>"u"||typeof Notification>"u")return;if(!window.isSecureContext){alert("Notifications require a secure context (HTTPS or installed app).");return}if(Notification.permission==="denied"){J("denied"),alert("Browser notifications are blocked. Enable them in your browser settings.");return}if(Notification.permission==="default"){let O=await Y();if(J(O||"default"),O!=="granted"){X.current=!1,$(!1),f_("notificationsEnabled","false");return}}let N=!X.current;X.current=N,$(N),f_("notificationsEnabled",String(N))},[Y]),V=b((N,O)=>{if(!X.current)return!1;if(typeof Notification>"u")return!1;if(Notification.permission!=="granted")return!1;try{let W=new Notification(N,{body:O});return W.onclick=()=>{try{window.focus()}catch{}},!0}catch{return!1}},[]);return{notificationsEnabled:_,notificationPermission:Z,toggleNotifications:j,notify:V}}var b2=(_)=>{let $=new Set;return(_||[]).filter((Z)=>{if(!Z||$.has(Z.id))return!1;return $.add(Z.id),!0})};function e4({preserveTimelineScroll:_,preserveTimelineScrollTop:$}){let[Z,J]=u(null),[X,Y]=u(!1),j=L(!1),V=L(null),N=L(!1),O=L(null),W=L(null);m(()=>{j.current=X},[X]),m(()=>{W.current=Z},[Z]);let U=b(async(C=null)=>{try{if(C){let w=await I3(C);J(w.posts),Y(!1)}else{let w=await p2(10);J(w.posts),Y(w.has_more)}}catch(w){console.error("Failed to load posts:",w)}},[]),E=b(async()=>{try{let C=await p2(10);J((w)=>{if(!w||w.length===0)return C.posts;return b2([...C.posts,...w])}),Y((w)=>w||C.has_more)}catch(C){console.error("Failed to refresh timeline:",C)}},[]),D=b(async(C={})=>{let w=W.current;if(!w||w.length===0)return;if(N.current)return;let{preserveScroll:R=!0,preserveMode:M="top",allowRepeat:H=!1}=C,S=(p)=>{if(!R){p();return}if(M==="top")$(p);else _(p)},v=w.slice().sort((p,l)=>p.id-l.id)[0]?.id;if(!Number.isFinite(v))return;if(!H&&O.current===v)return;N.current=!0,O.current=v;try{let p=await p2(10,v);if(p.posts.length>0)S(()=>{J((l)=>b2([...p.posts,...l||[]])),Y(p.has_more)});else Y(!1)}catch(p){console.error("Failed to load more posts:",p)}finally{N.current=!1}},[_,$]);return m(()=>{V.current=D},[D]),{posts:Z,setPosts:J,hasMore:X,setHasMore:Y,hasMoreRef:j,loadPosts:U,refreshTimeline:E,loadMore:D,loadMoreRef:V,loadingMoreRef:N,lastBeforeIdRef:O}}function _8(){let[_,$]=u(null),[Z,J]=u({text:"",totalLines:0}),[X,Y]=u(""),[j,V]=u({text:"",totalLines:0}),[N,O]=u(null),[W,U]=u(null),[E,D]=u(null),C=L(null),w=L(0),R=L(!1),M=L(""),H=L(""),S=L(null),y=L(null),v=L(null),p=L(null),l=L(!1),Y_=L(!1);return{agentStatus:_,setAgentStatus:$,agentDraft:Z,setAgentDraft:J,agentPlan:X,setAgentPlan:Y,agentThought:j,setAgentThought:V,pendingRequest:N,setPendingRequest:O,currentTurnId:W,setCurrentTurnId:U,steerQueuedTurnId:E,setSteerQueuedTurnId:D,lastAgentEventRef:C,lastSilenceNoticeRef:w,isAgentRunningRef:R,draftBufferRef:M,thoughtBufferRef:H,pendingRequestRef:S,stalledPostIdRef:y,currentTurnIdRef:v,steerQueuedTurnIdRef:p,thoughtExpandedRef:l,draftExpandedRef:Y_}}function $8({appShellRef:_,sidebarWidthRef:$,editorWidthRef:Z,dockHeightRef:J}){let X=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.clientX,D=$.current||280,C=W.currentTarget;C.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,R=(H)=>{w=H.clientX;let S=Math.min(Math.max(D+(H.clientX-E),160),600);U.style.setProperty("--sidebar-width",`${S}px`),$.current=S},M=()=>{let H=Math.min(Math.max(D+(w-E),160),600);$.current=H,C.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.cursor="",document.body.style.userSelect="",f_("sidebarWidth",String(Math.round(H))),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",M)}).current,Y=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=$.current||280,w=W.currentTarget;w.classList.add("dragging"),U.classList.add("sidebar-resizing"),document.body.style.userSelect="none";let R=(H)=>{let S=H.touches[0];if(!S)return;H.preventDefault();let y=Math.min(Math.max(C+(S.clientX-D),160),600);U.style.setProperty("--sidebar-width",`${y}px`),$.current=y},M=()=>{w.classList.remove("dragging"),U.classList.remove("sidebar-resizing"),document.body.style.userSelect="",f_("sidebarWidth",String(Math.round($.current||C))),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",M),document.removeEventListener("touchcancel",M)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",M),document.addEventListener("touchcancel",M)}).current,j=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.clientX,D=Z.current||$.current||280,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="col-resize",document.body.style.userSelect="none";let w=E,R=(H)=>{w=H.clientX;let S=Math.min(Math.max(D+(H.clientX-E),200),800);U.style.setProperty("--editor-width",`${S}px`),Z.current=S},M=()=>{let H=Math.min(Math.max(D+(w-E),200),800);Z.current=H,C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("editorWidth",String(Math.round(H))),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",M)}).current,V=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.touches[0];if(!E)return;let D=E.clientX,C=Z.current||$.current||280,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let R=(H)=>{let S=H.touches[0];if(!S)return;H.preventDefault();let y=Math.min(Math.max(C+(S.clientX-D),200),800);U.style.setProperty("--editor-width",`${y}px`),Z.current=y},M=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",f_("editorWidth",String(Math.round(Z.current||C))),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",M),document.removeEventListener("touchcancel",M)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",M),document.addEventListener("touchcancel",M)}).current,N=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.clientY,D=J?.current||200,C=W.currentTarget;C.classList.add("dragging"),document.body.style.cursor="row-resize",document.body.style.userSelect="none";let w=E,R=(H)=>{w=H.clientY;let S=Math.min(Math.max(D-(H.clientY-E),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${S}px`),J)J.current=S},M=()=>{let H=Math.min(Math.max(D-(w-E),100),window.innerHeight*0.5);if(J)J.current=H;C.classList.remove("dragging"),document.body.style.cursor="",document.body.style.userSelect="",f_("dockHeight",String(Math.round(H))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",R),document.addEventListener("mouseup",M)}).current,O=L((W)=>{W.preventDefault();let U=_.current;if(!U)return;let E=W.touches[0];if(!E)return;let D=E.clientY,C=J?.current||200,w=W.currentTarget;w.classList.add("dragging"),document.body.style.userSelect="none";let R=(H)=>{let S=H.touches[0];if(!S)return;H.preventDefault();let y=Math.min(Math.max(C-(S.clientY-D),100),window.innerHeight*0.5);if(U.style.setProperty("--dock-height",`${y}px`),J)J.current=y},M=()=>{w.classList.remove("dragging"),document.body.style.userSelect="",f_("dockHeight",String(Math.round(J?.current||C))),window.dispatchEvent(new CustomEvent("dock-resize")),document.removeEventListener("touchmove",R),document.removeEventListener("touchend",M),document.removeEventListener("touchcancel",M)};document.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("touchend",M),document.addEventListener("touchcancel",M)}).current;return{handleSplitterMouseDown:X,handleSplitterTouchStart:Y,handleEditorSplitterMouseDown:j,handleEditorSplitterTouchStart:V,handleDockSplitterMouseDown:N,handleDockSplitterTouchStart:O}}function Z8({onTabClosed:_}={}){let $=L(_);$.current=_;let[Z,J]=u(()=>k_.getTabs()),[X,Y]=u(()=>k_.getActiveId()),[j,V]=u(()=>k_.getTabs().length>0);m(()=>{return k_.onChange((y,v)=>{J(y),Y(v),V(y.length>0)})},[]);let[N,O]=u(()=>new Set),W=b((y)=>{O((v)=>{let p=new Set(v);if(p.has(y))p.delete(y);else p.add(y);return p})},[]),U=b((y)=>{O((v)=>{if(!v.has(y))return v;let p=new Set(v);return p.delete(y),p})},[]),E=b((y)=>{if(!y)return;let v={path:y,mode:"edit"};try{if(!p_.resolve(v)){if(!p_.get("editor")){console.warn(`[openEditor] No pane handler for: ${y}`);return}}}catch(p){console.warn(`[openEditor] paneRegistry.resolve() error for "${y}":`,p)}k_.open(y)},[]),D=b(()=>{let y=k_.getActiveId();if(y){let v=k_.get(y);if(v?.dirty){if(!window.confirm(`"${v.label}" has unsaved changes. Close anyway?`))return}k_.close(y),U(y),$.current?.(y)}},[U]),C=b((y)=>{let v=k_.get(y);if(v?.dirty){if(!window.confirm(`"${v.label}" has unsaved changes. Close anyway?`))return}k_.close(y),U(y),$.current?.(y)},[U]),w=b((y)=>{k_.activate(y)},[]),R=b((y)=>{let v=k_.getTabs().filter((Y_)=>Y_.id!==y&&!Y_.pinned),p=v.filter((Y_)=>Y_.dirty).length;if(p>0){if(!window.confirm(`${p} unsaved tab${p>1?"s":""} will be closed. Continue?`))return}let l=v.map((Y_)=>Y_.id);k_.closeOthers(y),l.forEach((Y_)=>{U(Y_),$.current?.(Y_)})},[U]),M=b(()=>{let y=k_.getTabs().filter((l)=>!l.pinned),v=y.filter((l)=>l.dirty).length;if(v>0){if(!window.confirm(`${v} unsaved tab${v>1?"s":""} will be closed. Continue?`))return}let p=y.map((l)=>l.id);k_.closeAll(),p.forEach((l)=>{U(l),$.current?.(l)})},[U]),H=b((y)=>{k_.togglePin(y)},[]),S=b(()=>{let y=k_.getActiveId();if(y)window.dispatchEvent(new CustomEvent("workspace-reveal-path",{detail:{path:y}}))},[]);return m(()=>{let y=(v)=>{let{oldPath:p,newPath:l,type:Y_}=v.detail||{};if(!p||!l)return;if(Y_==="dir"){for(let B_ of k_.getTabs())if(B_.path===p||B_.path.startsWith(`${p}/`)){let $_=`${l}${B_.path.slice(p.length)}`;k_.rename(B_.id,$_)}}else k_.rename(p,l)};return window.addEventListener("workspace-file-renamed",y),()=>window.removeEventListener("workspace-file-renamed",y)},[]),m(()=>{let y=(v)=>{if(k_.hasUnsaved())v.preventDefault(),v.returnValue=""};return window.addEventListener("beforeunload",y),()=>window.removeEventListener("beforeunload",y)},[]),{editorOpen:j,tabStripTabs:Z,tabStripActiveId:X,previewTabs:N,openEditor:E,closeEditor:D,handleTabClose:C,handleTabActivate:w,handleTabCloseOthers:R,handleTabCloseAll:M,handleTabTogglePin:H,handleTabTogglePreview:W,revealInExplorer:S}}function r1(_,$){try{if(typeof window>"u")return $;let Z=window.__PICLAW_SILENCE||{},J=`__PICLAW_SILENCE_${_.toUpperCase()}_MS`,X=Z[_]??window[J],Y=Number(X);return Number.isFinite(Y)?Y:$}catch{return $}}var s1=r1("warning",30000),J8=r1("finalize",120000),a1=r1("refresh",30000),Y8=30000;function X8(_){let $={};return(_?.agents||[]).forEach((Z)=>{$[Z.id]=Z}),$}function W8(){if(/iPad|iPhone/.test(navigator.userAgent))return!0;return navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}function j8(_=30000){let[,$]=u(0);m(()=>{let Z=setInterval(()=>$((J)=>J+1),_);return()=>clearInterval(Z)},[_])}function t1(_,$=160){let Z=String(_||"").replace(/\r\n/g,`
`);if(!Z)return 0;return Z.split(`
`).reduce((J,X)=>J+Math.max(1,Math.ceil(X.length/$)),0)}function M2(_,$){if(typeof window<"u")console.warn(`[app] API export missing: ${_}. Using fallback behavior.`);return async()=>$}var f6=T3,K8=v3,v6=R3,G8=m3,V8=h3,N8=g3,e1=typeof L1==="function"?L1:M2("getAgentContext",null),R6=typeof X2==="function"?X2:M2("getAgentModels",{current:null,models:[]}),g6=typeof F1==="function"?F1:M2("getAgentQueueState",{count:0}),u6=typeof D1==="function"?D1:M2("steerAgentQueueItem",{removed:!1,queued:"steer"}),c6=typeof E1==="function"?E1:M2("removeAgentQueueItem",{removed:!1});if(window.marked)marked.setOptions({breaks:!0,gfm:!0});p_.register(T1);p_.register(u1);p_.register(g1);f1();var m6=typeof localStorage<"u"&&localStorage.getItem("experimentalPanes")==="true";if(m6)p_.register(v1);function h6(){let[_,$]=u("disconnected"),[Z,J]=u(null),[X,Y]=u(null),[j,V]=u(!1),[N,O]=u([]),[W,U]=u([]),[E,D]=u(null),{agentStatus:C,setAgentStatus:w,agentDraft:R,setAgentDraft:M,agentPlan:H,setAgentPlan:S,agentThought:y,setAgentThought:v,pendingRequest:p,setPendingRequest:l,currentTurnId:Y_,setCurrentTurnId:B_,steerQueuedTurnId:$_,setSteerQueuedTurnId:N_,lastAgentEventRef:P_,lastSilenceNoticeRef:r,isAgentRunningRef:e,draftBufferRef:d,thoughtBufferRef:i,pendingRequestRef:Z_,stalledPostIdRef:j_,currentTurnIdRef:J_,steerQueuedTurnIdRef:v_,thoughtExpandedRef:X_,draftExpandedRef:q_}=_8(),[z_,L_]=u({}),[A_,F_]=u(null),[U_,C_]=u(null),[u_,w_]=u(!1),[b_,y_]=u(null),[h_,i_]=u(null),[M_,K_]=u([]),[B0,a_]=u(!1),P0=M_.length,K0=L(new Set),F0=L([]),Q_=L(new Set),G0=L({inFlight:!1,lastAttemptAt:0,turnId:null});K0.current=new Set(M_.map((G)=>G.row_id)),F0.current=M_;let{notificationsEnabled:E0,notificationPermission:x,toggleNotifications:__,notify:E_}=t4(),[V0,O0]=u(()=>new Set),[d_,v0]=u(()=>Q2("workspaceOpen",!0)),q0=L(null),{editorOpen:c_,tabStripTabs:D0,tabStripActiveId:m_,previewTabs:t_,openEditor:x_,closeEditor:n0,handleTabClose:_2,handleTabActivate:R0,handleTabCloseOthers:W2,handleTabCloseAll:k0,handleTabTogglePin:C0,handleTabTogglePreview:J0,revealInExplorer:g0}=Z8({onTabClosed:(G)=>q0.current?.(G)}),y0=L(null),R_=L(null);m(()=>{let G=y0.current;if(!G)return;if(R_.current)R_.current.dispose(),R_.current=null;let B=m_;if(!B)return;let A={path:B,mode:"edit"},P=p_.resolve(A)||p_.get("editor");if(!P){G.innerHTML='<div style="padding:2em;color:var(--text-secondary);text-align:center;">No editor available for this file.</div>';return}let g=P.mount(G,A);R_.current=g,g.onDirtyChange?.((h)=>{k_.setDirty(B,h)}),g.onSaveRequest?.(()=>{}),g.onClose?.(()=>{n0()});let I=k_.getViewState(B);if(I&&typeof g.restoreViewState==="function")requestAnimationFrame(()=>g.restoreViewState(I));if(typeof g.onViewStateChange==="function")g.onViewStateChange((h)=>{k_.saveViewState(B,h)});return requestAnimationFrame(()=>g.focus()),()=>{if(R_.current===g)g.dispose(),R_.current=null}},[m_,n0]);let[o0,j2]=u({name:"You",avatar_url:null,avatar_background:null}),$2=L(!1),d0=L(!1),r_=L(null),z0=L(0),Q0=L(0),I_=L({}),e_=L({name:null,avatar_url:null}),g_=L({currentHashtag:null,searchQuery:null}),_0=L(null),U0=L(null),b0=L(0),u0=L(0),Y0=L(0),Z2=L(null),M0=L(null),c0=L(null),r0=L(0),m0=L({title:null,avatarBase:null}),z=L(null),T=b(()=>{if(z.current)clearTimeout(z.current),z.current=null;D(null)},[]);j8(30000),m(()=>{return X4()},[]),m(()=>{f_("workspaceOpen",String(d_))},[d_]),m(()=>{return()=>{T()}},[T]),m(()=>{I_.current=z_||{}},[z_]),m(()=>{e_.current=o0||{name:"You",avatar_url:null,avatar_background:null}},[o0]);let n=b((G,B,A=null)=>{if(typeof document>"u")return;let P=(G||"").trim()||"PiClaw";if(m0.current.title!==P){document.title=P;let H_=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(H_&&H_.getAttribute("content")!==P)H_.setAttribute("content",P);m0.current.title=P}let g=document.getElementById("dynamic-favicon");if(!g)return;let I=g.getAttribute("data-default")||g.getAttribute("href")||"/favicon.ico",h=B||I,t=B?`${h}|${A||""}`:h;if(m0.current.avatarBase!==t){let H_=B?`${h}${h.includes("?")?"&":"?"}v=${A||Date.now()}`:h;g.setAttribute("href",H_),m0.current.avatarBase=t}},[]),O_=b((G)=>{if(!G)return;O((B)=>B.includes(G)?B:[...B,G])},[]),D_=b((G)=>{O((B)=>B.filter((A)=>A!==G))},[]);q0.current=D_;let l_=b(()=>{O([])},[]),V_=b((G,B=null,A="info",P=3000)=>{T(),D({title:G,detail:B||null,kind:A||"info"}),z.current=setTimeout(()=>{D((g)=>g?.title===G?null:g)},P)},[T]),X0=b((G)=>{if(typeof G!=="string")return;let B=G.trim();if(!B){V_("No file selected","Use a valid file path from a file pill.","warning");return}if(!c_){V_("Editor pane is not open","Open the editor pane to open files from pills.","warning");return}if(/^[a-z][a-z0-9+.-]*:/i.test(B)){V_("Cannot open external path from file pill","Use an in-workspace file path.","warning");return}let P={path:B,mode:"edit"};if(!p_.resolve(P)){V_("No editor available",`No editor can open: ${B}`,"warning");return}x_(B)},[c_,x_,V_]),h0=b(()=>{let G=m_;if(G)O_(G)},[m_,O_]),S0=b((G)=>{if(!G)return;U((B)=>B.includes(G)?B:[...B,G])},[]),p0=b(async(G)=>{let B=(P)=>{P.scrollIntoView({behavior:"smooth",block:"center"}),P.classList.add("post-highlight"),setTimeout(()=>P.classList.remove("post-highlight"),2000)},A=document.getElementById("post-"+G);if(A){B(A);return}try{let g=(await f3(G))?.thread?.[0];if(!g)return;Z0((I)=>{if(!I)return[g];if(I.some((h)=>h.id===g.id))return I;return[...I,g]}),requestAnimationFrame(()=>{setTimeout(()=>{let I=document.getElementById("post-"+G);if(I)B(I)},50)})}catch(P){console.error("[scrollToMessage] Failed to fetch message",G,P)}},[]),K2=b((G)=>{U((B)=>B.filter((A)=>A!==G))},[]),G2=b(()=>{U([])},[]),s_=b((G={})=>{let B=Date.now();if(P_.current=B,G.running)e.current=!0,a_((A)=>A?A:!0);if(G.clearSilence)r.current=0},[a_]),S_=b(()=>{if(c0.current)clearTimeout(c0.current),c0.current=null;r0.current=0},[]);m(()=>()=>{S_()},[S_]);let W0=b(()=>{S_(),w((G)=>{if(!G)return G;if(!(G.last_activity||G.lastActivity))return G;let{last_activity:B,lastActivity:A,...P}=G;return P})},[S_]),s0=b((G)=>{if(!G)return;S_();let B=Date.now();r0.current=B,w({type:G.type||"active",last_activity:!0}),c0.current=setTimeout(()=>{if(r0.current!==B)return;w((A)=>{if(!A||!(A.last_activity||A.lastActivity))return A;return null})},Y8)},[S_]),n_=b(()=>{e.current=!1,a_(!1),P_.current=null,r.current=0,d.current="",i.current="",Z_.current=null,M0.current=null,J_.current=null,v_.current=null,G0.current={inFlight:!1,lastAttemptAt:0,turnId:null},S_(),B_(null),N_(null),X_.current=!1,q_.current=!1},[S_,B_,N_,a_]),$0=b((G)=>{if(!G)return;if(J_.current===G)return;J_.current=G,G0.current={inFlight:!1,lastAttemptAt:0,turnId:G},B_(G),v_.current=null,N_(null),d.current="",i.current="",M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),Z_.current=null,M0.current=null,X_.current=!1,q_.current=!1},[B_,N_]),x0=b((G)=>{if(typeof document<"u"){let H_=typeof document.hasFocus==="function"?document.hasFocus():!0;if(!document.hidden&&H_)return}let B=M0.current;if(!B||!B.post)return;if(G&&B.turnId&&B.turnId!==G)return;let A=B.post;if(A.id&&Z2.current===A.id)return;let P=String(A?.data?.content||"").trim();if(!P)return;Z2.current=A.id||Z2.current,M0.current=null;let g=P.replace(/\s+/g," ").slice(0,200),I=I_.current||{},t=(A?.data?.agent_id?I[A.data.agent_id]:null)?.name||"Pi";E_(t,g)},[E_]),N0=b(async(G,B)=>{if(G!=="thought"&&G!=="draft")return;let A=J_.current;if(G==="thought"){if(X_.current=B,A)try{await V8(A,"thought",B)}catch(P){console.warn("Failed to update thought visibility:",P)}if(!B)return;try{let P=A?await G8(A,"thought"):null;if(P?.text)i.current=P.text;v((g)=>({...g||{text:"",totalLines:0},fullText:i.current||g?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:g?.totalLines||0}))}catch(P){console.warn("Failed to fetch full thought:",P)}return}if(q_.current=B,A)try{await V8(A,"draft",B)}catch(P){console.warn("Failed to update draft visibility:",P)}if(!B)return;try{let P=A?await G8(A,"draft"):null;if(P?.text)d.current=P.text;M((g)=>({...g||{text:"",totalLines:0},fullText:d.current||g?.fullText||"",totalLines:Number.isFinite(P?.total_lines)?P.total_lines:g?.totalLines||0}))}catch(P){console.warn("Failed to fetch full draft:",P)}},[]),A0=L(null),V2=b(()=>{let G=_0.current;if(!G)return;if(!(Math.abs(G.scrollTop)>150))G.scrollTop=0},[]);A0.current=V2;let E2=b((G)=>{let B=_0.current;if(!B||typeof G!=="function"){G?.();return}let{currentHashtag:A,searchQuery:P}=g_.current||{},g=!(P&&!A),I=g?B.scrollHeight-B.scrollTop:B.scrollTop;G(),requestAnimationFrame(()=>{let h=_0.current;if(!h)return;if(g){let t=Math.max(h.scrollHeight-I,0);h.scrollTop=t}else{let t=Math.max(h.scrollHeight-h.clientHeight,0),H_=Math.min(I,t);h.scrollTop=H_}})},[]),J2=b((G)=>{let B=_0.current;if(!B||typeof G!=="function"){G?.();return}let A=B.scrollTop;G(),requestAnimationFrame(()=>{let P=_0.current;if(!P)return;let g=Math.max(P.scrollHeight-P.clientHeight,0);P.scrollTop=Math.min(A,g)})},[]),X1="Queued as a follow-up (one-at-a-time).",W1="⁣",Y2=b((G)=>{if(!G||!Array.isArray(G))return G;let B=K0.current,A=new Set(B),P=F0.current;for(let I of P)if(I?.thread_id!=null)A.add(I.thread_id);let g=G.filter((I)=>{if(A.has(I?.id))return!1;if(I?.data?.is_bot_message){let h=I?.data?.content;if(h===X1||h===W1)return!1}return!0});return g.length===G.length?G:g},[]),{posts:S2,setPosts:Z0,hasMore:j1,setHasMore:N2,hasMoreRef:x2,loadPosts:I0,refreshTimeline:j0,loadMore:K1,loadMoreRef:D2}=e4({preserveTimelineScroll:E2,preserveTimelineScrollTop:J2}),a0=L0(()=>Y2(S2),[S2,M_,Y2]),K=b(()=>{let G=j_.current;if(!G)return;Z0((B)=>B?B.filter((A)=>A.id!==G):B),j_.current=null},[Z0]),{handleSplitterMouseDown:q,handleSplitterTouchStart:F,handleEditorSplitterMouseDown:k,handleEditorSplitterTouchStart:c,handleDockSplitterMouseDown:o,handleDockSplitterTouchStart:a}=$8({appShellRef:U0,sidebarWidthRef:b0,editorWidthRef:u0,dockHeightRef:Y0}),s=b(()=>{if(!e.current)return;e.current=!1,r.current=0,P_.current=null,J_.current=null,B_(null),X_.current=!1,q_.current=!1;let G=(d.current||"").trim();if(d.current="",i.current="",M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),Z_.current=null,M0.current=null,!G){w({type:"error",title:"Response stalled - No content received"});return}let A=`${G}${`

⚠️ Response may be incomplete - the model stopped responding`}`,P=Date.now(),g=new Date().toISOString(),I={id:P,timestamp:g,data:{type:"agent_response",content:A,agent_id:"default",is_local_stall:!0}};j_.current=P,Z0((h)=>h?b2([...h,I]):[I]),A0.current?.(),w(null)},[B_]);m(()=>{g_.current={currentHashtag:Z,searchQuery:X}},[Z,X]);let f=b(()=>{g6().then((G)=>{let B=Q_.current,A=Array.isArray(G?.items)?G.items.map((P)=>({...P})).filter((P)=>!B.has(P.row_id)):[];if(A.length){K_((P)=>{if(P.length===A.length&&P.every((g,I)=>g.row_id===A[I].row_id))return P;return A});return}B.clear(),K_((P)=>P.length===0?P:[])}).catch(()=>{K_((G)=>G.length===0?G:[])})},[K_]),W_=b(async()=>{try{let G=await e1();if(G)i_(G)}catch(G){console.warn("Failed to fetch agent context:",G)}},[]),T_=b(async()=>{try{let G=await N8("web:default");if(!G||G.status!=="active"||!G.data){if(d0.current){let{currentHashtag:P,searchQuery:g}=g_.current||{};if(!P&&!g)j0()}return d0.current=!1,n_(),w(null),M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),Z_.current=null,G??null}d0.current=!0;let B=G.data,A=B.turn_id||B.turnId;if(A)$0(A);if(s_({running:!0,clearSilence:!0}),W0(),w(B),G.thought&&G.thought.text)v((P)=>{if(P&&P.text&&P.text.length>=G.thought.text.length)return P;return i.current=G.thought.text,{text:G.thought.text,totalLines:G.thought.totalLines||0}});if(G.draft&&G.draft.text)M((P)=>{if(P&&P.text&&P.text.length>=G.draft.text.length)return P;return d.current=G.draft.text,{text:G.draft.text,totalLines:G.draft.totalLines||0}});return G}catch(G){return console.warn("Failed to fetch agent status:",G),null}},[n_,W0,s_,j0,$0]),w0=b(async()=>{if(!e.current)return null;if(Z_.current)return null;let G=J_.current||null,B=G0.current,A=Date.now();if(B.inFlight)return null;if(B.turnId===G&&A-B.lastAttemptAt<a1)return null;B.inFlight=!0,B.lastAttemptAt=A,B.turnId=G;try{let{currentHashtag:P,searchQuery:g}=g_.current||{};if(!P&&!g)await j0();return await f(),await T_()}finally{B.inFlight=!1}},[T_,f,j0]);m(()=>{let G=Math.min(1000,Math.max(100,Math.floor(s1/2))),B=setInterval(()=>{if(!e.current)return;if(Z_.current)return;let A=P_.current;if(!A)return;let P=Date.now(),g=P-A;if(g>=J8){w({type:"waiting",title:"Re-syncing after a quiet period…"}),w0();return}if(g>=s1){if(P-r.current>=a1){let I=Math.floor(g/1000);w({type:"waiting",title:`Waiting for model… No events for ${I}s`}),r.current=P,w0()}}},G);return()=>clearInterval(B)},[w0]);let T0=b((G)=>{if($(G),G!=="connected"){w(null),M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),Z_.current=null,n_();return}if(!$2.current){$2.current=!0,T_();return}let{currentHashtag:B,searchQuery:A}=g_.current;if(!B&&!A)j0();T_()},[n_,j0,T_]),O8=b(async(G)=>{J(G),Z0(null),await I0(G)},[I0]),B8=b(async()=>{J(null),Y(null),Z0(null),await I0()},[I0]),q8=b(async(G)=>{if(!G||!G.trim())return;Y(G.trim()),J(null),Z0(null);try{let B=await f6(G.trim());Z0(B.results),N2(!1)}catch(B){console.error("Failed to search:",B),Z0([])}},[]),z8=b(()=>{V(!0),Y(null),J(null),Z0([])},[]),Q8=b(()=>{V(!1),Y(null),I0()},[I0]),p6=b(()=>{},[]),U8=b(async(G)=>{if(!G)return;let B=G.id,A=a0?.filter((g)=>g?.data?.thread_id===B&&g?.id!==B).length||0;if(A>0){if(!window.confirm(`Delete this message and its ${A} replies?`))return}let P=(g)=>{if(!g.length)return;O0((h)=>{let t=new Set(h);return g.forEach((H_)=>t.add(H_)),t}),setTimeout(()=>{if(J2(()=>{Z0((h)=>h?h.filter((t)=>!g.includes(t.id)):h)}),O0((h)=>{let t=new Set(h);return g.forEach((H_)=>t.delete(H_)),t}),x2.current)D2.current?.({preserveScroll:!0,preserveMode:"top"})},180)};try{let g=await K8(B,A>0);if(g?.ids?.length)P(g.ids)}catch(g){let I=g?.message||"";if(A===0&&I.includes("Replies exist")){if(!window.confirm("Delete this message and its replies?"))return;let t=await K8(B,!0);if(t?.ids?.length)P(t.ids);return}console.error("Failed to delete post:",g),alert(`Failed to delete message: ${I}`)}},[a0,J2]),_3=b(async()=>{try{let G=await v6();L_(X8(G));let B=G?.user||{};j2((P)=>{let g=typeof B.name==="string"&&B.name.trim()?B.name.trim():"You",I=typeof B.avatar_url==="string"?B.avatar_url.trim():null,h=typeof B.avatar_background==="string"&&B.avatar_background.trim()?B.avatar_background.trim():null;if(P.name===g&&P.avatar_url===I&&P.avatar_background===h)return P;return{name:g,avatar_url:I,avatar_background:h}});let A=(G?.agents||[]).find((P)=>P.id==="default");if(A?.model)F_(A.model);n(A?.name,A?.avatar_url)}catch(G){console.warn("Failed to load agents:",G)}try{let G=await e1();if(G)i_(G)}catch{}},[n]);m(()=>{_3();let G=U2("sidebarWidth",null),B=Number.isFinite(G)?Math.min(Math.max(G,160),600):280;if(b0.current=B,U0.current)U0.current.style.setProperty("--sidebar-width",`${B}px`)},[_3]);let H8=B0||C!==null,$3=b((G)=>{if(!G||typeof G!=="object")return;let B=G.agent_id;if(!B)return;let{agent_name:A,agent_avatar:P}=G;if(!A&&P===void 0)return;let g=I_.current?.[B]||{id:B},I=g.name||null,h=g.avatar_url??g.avatarUrl??g.avatar??null,t=!1,H_=!1;if(A&&A!==g.name)I=A,H_=!0;if(P!==void 0){let i0=typeof P==="string"?P.trim():null,J3=typeof h==="string"?h.trim():null,B2=i0||null;if(B2!==(J3||null))h=B2,t=!0}if(!H_&&!t)return;if(L_((i0)=>{let B2={...i0[B]||{id:B}};if(H_)B2.name=I;if(t)B2.avatar_url=h;return{...i0,[B]:B2}}),B==="default")n(I,h,t?Date.now():null)},[n]),Z3=b((G)=>{if(!G||typeof G!=="object")return;let B=G.user_name??G.userName,A=G.user_avatar??G.userAvatar,P=G.user_avatar_background??G.userAvatarBackground;if(B===void 0&&A===void 0&&P===void 0)return;j2((g)=>{let I=typeof B==="string"&&B.trim()?B.trim():g.name||"You",h=A===void 0?g.avatar_url:typeof A==="string"&&A.trim()?A.trim():null,t=P===void 0?g.avatar_background:typeof P==="string"&&P.trim()?P.trim():null;if(g.name===I&&g.avatar_url===h&&g.avatar_background===t)return g;return{name:I,avatar_url:h,avatar_background:t}})},[]),G1=b((G)=>{if(!G||typeof G!=="object")return;let B=G.model??G.current;if(B!==void 0)F_(B);if(G.thinking_level!==void 0)C_(G.thinking_level??null);if(G.supports_thinking!==void 0)w_(Boolean(G.supports_thinking));if(G.provider_usage!==void 0)y_(G.provider_usage??null)},[]),k2=b(()=>{R6().then((G)=>{if(G)G1(G)}).catch(()=>{})},[G1]),L8=b((G)=>{let B=G?.row_id;if(B==null)return;Q_.current.add(B),K_((A)=>A.filter((P)=>P?.row_id!==B)),u6(B).then(()=>{f()}).catch((A)=>{console.warn("[queue] Failed to steer queued item:",A),V_("Failed to steer message","The queued message could not be sent as steering.","warning"),Q_.current.delete(B),f()})},[f,K_,V_]),F8=b((G)=>{let B=G?.row_id;if(B==null)return;Q_.current.add(B),K_((A)=>A.filter((P)=>P?.row_id!==B)),c6(B).then(()=>{f()}).catch((A)=>{console.warn("[queue] Failed to remove queued item:",A),V_("Failed to remove message","The queued message could not be removed.","warning"),Q_.current.delete(B),f()})},[f,K_,V_]),E8=b((G)=>{if(!G||typeof G!=="object")return;if(G?.queued==="followup"||G?.queued==="steer"){f();return}let B=G?.command;if(B&&typeof B==="object"&&(B?.queued_followup||B?.queued_steer))f()},[f]),V1=b(()=>{k2(),f()},[k2,f]);m(()=>{V1();let G=setInterval(()=>{k2(),f()},60000);return()=>clearInterval(G)},[V1,k2,f]);let N1=b((G,B)=>{let A=B?.turn_id;if($3(B),Z3(B),G==="ui_theme"){W4(B);return}if(G?.startsWith("agent_")){if(!(G==="agent_draft_delta"||G==="agent_thought_delta"||G==="agent_draft"||G==="agent_thought"))W0()}if(G==="connected"){w(null),M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),Z_.current=null,n_(),N8("web:default").then((t)=>{if(!t||t.status!=="active"||!t.data)return;let H_=t.data,i0=H_.turn_id||H_.turnId;if(i0)$0(i0);if(s_({clearSilence:!0}),s0(H_),t.thought&&t.thought.text)i.current=t.thought.text,v({text:t.thought.text,totalLines:t.thought.totalLines||0});if(t.draft&&t.draft.text)d.current=t.draft.text,M({text:t.draft.text,totalLines:t.draft.totalLines||0})}).catch((t)=>{console.warn("Failed to fetch agent status:",t)});let{currentHashtag:I,searchQuery:h}=g_.current||{};if(!I&&!h)j0();V1();return}if(G==="agent_status"){if(B.type==="done"||B.type==="error"){if(A&&J_.current&&A!==J_.current)return;if(B.type==="done"){x0(A||J_.current);let{currentHashtag:I,searchQuery:h}=g_.current||{};if(!I&&!h)j0();if(B.context_usage)i_(B.context_usage)}if(d0.current=!1,n_(),Q_.current.clear(),f(),M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null),B.type==="error")w({type:"error",title:B.title||"Agent error"}),setTimeout(()=>w(null),8000);else w(null)}else{if(A)$0(A);if(s_({running:!0,clearSilence:!0}),B.type==="thinking")d.current="",i.current="",M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0});r_.current=B,w((I)=>{if(I&&I.type===B.type&&I.title===B.title)return I;return B})}return}if(G==="agent_steer_queued"){if(A&&J_.current&&A!==J_.current)return;let I=A||J_.current;if(!I)return;v_.current=I,N_(I);return}if(G==="agent_followup_queued"){let I=B?.row_id,h=B?.content;if(I!=null&&typeof h==="string"&&h.trim())K_((t)=>{if(t.some((H_)=>H_?.row_id===I))return t;return[...t,{row_id:I,content:h,timestamp:B?.timestamp||null,thread_id:B?.thread_id??null}]});f();return}if(G==="agent_followup_consumed"){let I=B?.row_id;if(I!=null)K_((h)=>h.filter((t)=>t.row_id!==I));f(),j0();return}if(G==="agent_followup_removed"){let I=B?.row_id;if(I!=null)Q_.current.add(I),K_((h)=>h.filter((t)=>t.row_id!==I));f();return}if(G==="agent_draft_delta"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)$0(A);if(s_({running:!0,clearSilence:!0}),B?.reset)d.current="";if(B?.delta)d.current+=B.delta;let I=Date.now();if(!z0.current||I-z0.current>=100){z0.current=I;let h=d.current,t=t1(h);if(q_.current)M((H_)=>({text:H_?.text||"",totalLines:t,fullText:h}));else M({text:h,totalLines:t})}return}if(G==="agent_draft"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)$0(A);s_({running:!0,clearSilence:!0});let I=B.text||"",h=B.mode||(B.kind==="plan"?"replace":"append"),t=Number.isFinite(B.total_lines)?B.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(B.kind==="plan")if(h==="replace")S(I);else S((H_)=>(H_||"")+I);else if(!q_.current)d.current=I,M({text:I,totalLines:t});return}if(G==="agent_thought_delta"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)$0(A);if(s_({running:!0,clearSilence:!0}),B?.reset)i.current="";if(typeof B?.delta==="string")i.current+=B.delta;let I=Date.now();if(X_.current&&(!Q0.current||I-Q0.current>=100)){Q0.current=I;let h=i.current;v((t)=>({text:t?.text||"",totalLines:t1(h),fullText:h}))}return}if(G==="agent_thought"){if(A&&J_.current&&A!==J_.current)return;if(A&&!J_.current)$0(A);s_({running:!0,clearSilence:!0});let I=B.text||"",h=Number.isFinite(B.total_lines)?B.total_lines:I?I.replace(/\r\n/g,`
`).split(`
`).length:0;if(!X_.current)i.current=I,v({text:I,totalLines:h});return}if(G==="agent_request"){if(console.log("Agent request:",B),A&&J_.current&&A!==J_.current)return;if(A)$0(A);s_({running:!0,clearSilence:!0}),l(B),Z_.current=B;return}if(G==="agent_request_timeout"){if(console.log("Agent request timeout:",B),A&&J_.current&&A!==J_.current)return;l(null),Z_.current=null,n_(),w({type:"error",title:"Permission request timed out"});return}if(G==="model_changed"){if(B?.model!==void 0)F_(B.model);if(B?.thinking_level!==void 0)C_(B.thinking_level??null);if(B?.supports_thinking!==void 0)w_(Boolean(B.supports_thinking));e1().then((I)=>{if(I)i_(I)}).catch(()=>{});return}if(G==="workspace_update"){if(typeof window<"u")window.dispatchEvent(new CustomEvent("workspace-update",{detail:B}));return}let{currentHashtag:P,searchQuery:g}=g_.current;if(G==="agent_response")K(),M0.current={post:B,turnId:J_.current};if(!P&&!g&&(G==="new_post"||G==="agent_response"))Z0((I)=>{if(!I)return[B];if(I.some((h)=>h.id===B.id))return I;return[...I,B]}),A0.current?.();if(G==="interaction_updated")Z0((I)=>{if(!I)return I;if(!I.some((h)=>h.id===B.id))return I;return I.map((h)=>h.id===B.id?B:h)});if(G==="interaction_deleted"){let I=B?.ids||[];if(I.length){J2(()=>{Z0((H_)=>H_?H_.filter((i0)=>!I.includes(i0.id)):H_)});let{currentHashtag:h,searchQuery:t}=g_.current;if(x2.current&&!h&&!t)D2.current?.({preserveScroll:!0,preserveMode:"top"})}}},[n_,W0,D2,s_,x0,J2,j0,K,$0,s0,$3,Z3,k2,f,K_]);m(()=>{if(typeof window>"u")return;let G=window.__PICLAW_TEST_API||{};return G.emit=N1,G.reset=()=>{K(),n_(),w(null),M({text:"",totalLines:0}),S(""),v({text:"",totalLines:0}),l(null)},G.finalize=()=>s(),window.__PICLAW_TEST_API=G,()=>{if(window.__PICLAW_TEST_API===G)window.__PICLAW_TEST_API=void 0}},[n_,s,N1,K]),a4({handleSseEvent:N1,handleConnectionStatusChange:T0,loadPosts:I0}),m(()=>{if(!a0||a0.length===0)return;let G=location.hash;if(!G||!G.startsWith("#msg-"))return;let B=G.slice(5);p0(B),history.replaceState(null,"",location.pathname+location.search)},[a0,p0]);let O1=C!==null;m(()=>{if(_!=="connected")return;let B=setInterval(()=>{let{currentHashtag:A,searchQuery:P}=g_.current||{},g=!A&&!P;if(O1){if(g)j0();f(),T_(),W_()}else{if(g)j0();T_(),W_()}},O1?15000:60000);return()=>clearInterval(B)},[_,O1,T_,W_,f,j0]);let D8=b(()=>{v0((G)=>!G)},[]);m(()=>{if(!c_)return;if(typeof window>"u")return;let G=U0.current;if(!G)return;if(!u0.current){let B=U2("editorWidth",null),A=b0.current||280;u0.current=Number.isFinite(B)?B:A}if(G.style.setProperty("--editor-width",`${u0.current}px`),!Y0.current){let B=U2("dockHeight",null);Y0.current=Number.isFinite(B)?B:200}G.style.setProperty("--dock-height",`${Y0.current}px`)},[c_]);let O2=p_.getDockPanes().length>0,[B1,k8]=u(!1),I2=b(()=>k8((G)=>!G),[]);m(()=>{if(!O2)return;let G=(B)=>{if(B.ctrlKey&&B.key==="`")B.preventDefault(),I2()};return document.addEventListener("keydown",G),()=>document.removeEventListener("keydown",G)},[I2,O2]);let C8=Boolean($_&&$_===(C?.turn_id||Y_));return Q`
        <div class=${`app-shell${d_?"":" workspace-collapsed"}${c_?" editor-open":""}`} ref=${U0}>
            <${o4}
                onFileSelect=${O_}
                visible=${d_}
                active=${d_||c_}
                onOpenEditor=${x_}
            />
            <button
                class=${`workspace-toggle-tab${d_?" open":" closed"}`}
                onClick=${D8}
                title=${d_?"Hide workspace":"Show workspace"}
                aria-label=${d_?"Hide workspace":"Show workspace"}
            >
                <svg class="workspace-toggle-tab-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 3 11 8 6 13" />
                </svg>
            </button>
            <div class="workspace-splitter" onMouseDown=${q} onTouchStart=${F}></div>
            ${c_&&Q`
                <div class="editor-pane-container">
                    <${d4}
                        tabs=${D0}
                        activeId=${m_}
                        onActivate=${R0}
                        onClose=${_2}
                        onCloseOthers=${W2}
                        onCloseAll=${k0}
                        onTogglePin=${C0}
                        onTogglePreview=${J0}
                        previewTabs=${t_}
                        onToggleDock=${O2?I2:void 0}
                        dockVisible=${O2&&B1}
                    />
                    <div class="editor-pane-host" ref=${y0}></div>
                    ${m_&&t_.has(m_)&&Q`
                        <${s4}
                            getContent=${()=>R_.current?.getContent?.()}
                            path=${m_}
                            onClose=${()=>J0(m_)}
                        />
                    `}
                    ${O2&&B1&&Q`<div class="dock-splitter" onMouseDown=${o} onTouchStart=${a}></div>`}
                    ${O2&&Q`<div class=${`dock-panel${B1?"":" hidden"}`}>
                        <div class="dock-panel-header">
                            <span class="dock-panel-title">Terminal</span>
                            <button class="dock-panel-close" onClick=${I2} title="Hide terminal (Ctrl+\`)" aria-label="Hide terminal">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                    <line x1="4" y1="12" x2="12" y2="4"/>
                                    <polyline points="4 4 12 4 12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="dock-panel-body">
                            <div class="terminal-placeholder">Terminal integration pending - xterm.js + WebSocket</div>
                        </div>
                    </div>`}
                </div>
                <div class="editor-splitter" onMouseDown=${k} onTouchStart=${c}></div>
            `}
            <div class="container">
                ${X&&W8()&&Q`<div class="search-results-spacer"></div>`}
                ${(Z||X)&&Q`
                    <div class="hashtag-header">
                        <button class="back-btn" onClick=${B8}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        <span>${Z?`#${Z}`:`Search: ${X}`}</span>
                    </div>
                `}
                <${A4}
                    posts=${a0}
                    hasMore=${j1}
                    onLoadMore=${K1}
                    timelineRef=${_0}
                    onHashtagClick=${O8}
                    onMessageRef=${S0}
                    onScrollToMessage=${p0}
                    onFileRef=${X0}
                    onPostClick=${void 0}
                    onDeletePost=${U8}
                    emptyMessage=${Z?`No posts with #${Z}`:X?`No results for "${X}"`:void 0}
                    agents=${z_}
                    user=${o0}
                    reverse=${!(X&&!Z)}
                    removingPostIds=${V0}
                    searchQuery=${X}
                />
                <${F4}
                    status=${C}
                    draft=${R}
                    plan=${H}
                    thought=${y}
                    pendingRequest=${p}
                    intent=${E}
                    turnId=${Y_}
                    steerQueued=${C8}
                    onPanelToggle=${N0}
                />
                <${t3}
                    onPost=${()=>{I0(),V2()}}
                    onFocus=${V2}
                    searchMode=${j}
                    onSearch=${q8}
                    onEnterSearch=${z8}
                    onExitSearch=${Q8}
                    fileRefs=${N}
                    onRemoveFileRef=${D_}
                    onClearFileRefs=${l_}
                    messageRefs=${W}
                    onRemoveMessageRef=${K2}
                    onClearMessageRefs=${G2}
                    activeEditorPath=${m_}
                    onAttachEditorFile=${h0}
                    onOpenFilePill=${X0}
                    followupQueueCount=${P0}
                    followupQueueItems=${M_}
                    onInjectQueuedFollowup=${L8}
                    onRemoveQueuedFollowup=${F8}
                    onMessageResponse=${E8}
                    isAgentActive=${H8}
                    activeModel=${A_}
                    modelUsage=${b_}
                    thinkingLevel=${U_}
                    supportsThinking=${u_}
                    contextUsage=${h_}
                    notificationsEnabled=${E0}
                    notificationPermission=${x}
                    onToggleNotifications=${__}
                    onModelChange=${F_}
                    onModelStateChange=${G1}
                />
                <${D4} status=${_} />
                <${E4}
                    request=${p}
                    onRespond=${()=>{l(null),Z_.current=null}}
                />
            </div>
        </div>
    `}b3(Q`<${h6} />`,document.getElementById("app"));

//# debugId=6224287C14C2CDF764756E2164756E21
//# sourceMappingURL=app.bundle.js.map
