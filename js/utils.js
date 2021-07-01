HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},NexT.utils={wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(e=>{var t=$(e),a=t.attr("data-src")||t.attr("src"),n=t.wrap(`<a class="fancybox fancybox.image" href="${a}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?n.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?n.attr("data-fancybox","group").attr("rel","group"):n.attr("data-fancybox","default").attr("rel","default");var o=t.attr("title")||t.attr("alt");o&&(n.append(`<p class="image-caption">${o}</p>`),n.attr("title",o).attr("data-caption",o))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{let t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCopyCode:function(){document.querySelectorAll("figure.highlight").forEach(e=>{const t=document.createElement("div");e.wrap(t),t.classList.add("highlight-container"),t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-clipboard"></i></div>');var a=e.parentNode.querySelector(".copy-btn");a.addEventListener("click",e=>{var t=e.currentTarget,a=[...t.parentNode.querySelectorAll(".code .line")].map(e=>e.innerText).join("\n"),n=document.createElement("textarea");n.style.top=window.scrollY+"px",n.style.position="absolute",n.style.opacity="0",n.readOnly=!0,n.value=a,document.body.append(n);const o=document.getSelection(),r=o.rangeCount>0&&o.getRangeAt(0);n.select(),n.setSelectionRange(0,a.length),n.readOnly=!1;var i=document.execCommand("copy");CONFIG.copycode.show_result&&(t.querySelector("i").className=i?"fa fa-check":"fa fa-times"),n.blur(),t.blur(),r&&(o.removeAllRanges(),o.addRange(r)),document.body.removeChild(n)}),a.addEventListener("mouseleave",e=>{setTimeout(()=>{e.target.querySelector("i").className="fa fa-clipboard"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);let a=Number(e.width),n=Number(e.height);a&&n&&(e.parentNode.style.paddingTop=n/a*100+"%")}})},registerScrollPercent:function(){var e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{if(e||t){var a=document.querySelector(".container").offsetHeight,n=window.innerHeight,o=a>n?a-n:document.body.scrollHeight-n,r=Math.min(100*window.scrollY/o,100);e&&(e.classList.toggle("back-to-top-on",window.scrollY>50),e.querySelector("span").innerText=Math.round(r)+"%"),t&&(t.style.width=r.toFixed(2)+"%")}}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();var t=e.currentTarget;if(!t.classList.contains("active")){[...t.parentNode.children].forEach(e=>{e.classList.remove("active")}),t.classList.add("active");var a=document.getElementById(t.querySelector("a").getAttribute("href").replace("#",""));[...a.parentNode.children].forEach(e=>{e.classList.remove("active")}),a.classList.add("active"),a.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){var t=e.split(":")[1],a=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(a,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item").forEach(e=>{var t=e.querySelector("a[href]");if(t){var a=t.pathname===location.pathname||t.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(t.pathname)&&location.pathname.startsWith(t.pathname);e.classList.toggle("menu-item-active",t.hostname===location.hostname&&(a||n))}})},registerLangSelect:function(){let e=document.querySelector(".lang-select");e&&(e.value=CONFIG.page.lang,e.addEventListener("change",()=>{let t=e.options[e.selectedIndex];document.querySelector(".lang-select-label span").innerText=t.text;let a=t.dataset.href;window.pjax?window.pjax.loadUrl(a):window.location.href=a}))},registerSidebarTOC:function(){const e=document.querySelectorAll(".post-toc li"),t=[...e].map(e=>{var t=e.querySelector("a.nav-link"),a=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));return t.addEventListener("click",e=>{e.preventDefault();var t=a.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:t+10})}),a});var a=document.querySelector(".post-toc-wrap");!function n(o){o=Math.floor(o+1e4);let r=new IntersectionObserver((r,i)=>{let c=document.documentElement.scrollHeight+100;if(c>o)return i.disconnect(),void n(c);let l=function(e){let a=0,n=e[a];if(n.boundingClientRect.top>0)return a=t.indexOf(n.target),0===a?0:a-1;for(;a<e.length;a++){if(!(e[a].boundingClientRect.top<=0))return t.indexOf(n.target);n=e[a]}return t.indexOf(n.target)}(r);!function(e){if(!e.classList.contains("active-current")){document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),e.classList.add("active","active-current");for(var t=e.parentNode;!t.matches(".post-toc");)t.matches("li")&&t.classList.add("active"),t=t.parentNode;window.anime({targets:a,duration:200,easing:"linear",scrollTop:a.scrollTop-a.offsetHeight/2+e.getBoundingClientRect().top-a.getBoundingClientRect().top})}}(e[l])},{rootMargin:o+"px 0px -100% 0px",threshold:0});t.forEach(e=>{e&&r.observe(e)})}(document.documentElement.scrollHeight)},hasMobileUA:function(){let e=navigator.userAgent;return/iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g.test(e)},isTablet:function(){return window.screen.width<992&&window.screen.width>767&&this.hasMobileUA()},isMobile:function(){return window.screen.width<767&&this.hasMobileUA()},isDesktop:function(){return!this.isTablet()&&!this.isMobile()},supportsPDFs:function(){let e=navigator.userAgent,t=e.includes("irefox")&&parseInt(e.split("rv:")[1].split(".")[0],10)>18,a=void 0!==navigator.mimeTypes["application/pdf"],n=/iphone|ipad|ipod/i.test(e.toLowerCase());return t||a&&!n},initSidebarDimension:function(){var e=document.querySelector(".sidebar-nav"),t="none"!==e.style.display?e.offsetHeight:0,a=CONFIG.sidebar.offset||12,n=CONFIG.back2top.enable&&CONFIG.back2top.sidebar?document.querySelector(".back-to-top").offsetHeight:0,o=2*CONFIG.sidebar.padding+t+n;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(o+=2*a-22);var r=document.body.offsetHeight-o+"px";document.querySelector(".site-overview-wrap").style.maxHeight=r,document.querySelector(".post-toc-wrap").style.maxHeight=r},updateSidebarPosition:function(){var e=document.querySelector(".sidebar-nav"),t=document.querySelector(".post-toc");if(t?(e.style.display="",e.classList.add("motion-element"),document.querySelector(".sidebar-nav-toc").click()):(e.style.display="none",e.classList.remove("motion-element"),document.querySelector(".sidebar-nav-overview").click()),NexT.utils.initSidebarDimension(),this.isDesktop()&&"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme){var a=CONFIG.page.sidebar;"boolean"!=typeof a&&(a="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t),a&&window.dispatchEvent(new Event("sidebar:show"))}},getScript:function(e,t,a){if(a)t();else{var n=document.createElement("script");n.onload=n.onreadystatechange=function(e,a){(a||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n=void 0,!a&&t&&setTimeout(t,0))},n.src=e,document.head.appendChild(n)}},loadComments:function(e,t){if(!CONFIG.comments.lazyload||!e)return void t();let a=new IntersectionObserver((e,a)=>{e[0].isIntersecting&&(t(),a.disconnect())});return a.observe(e),a}};