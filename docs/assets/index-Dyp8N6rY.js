(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();function B(i){const e=i.startsWith("/")?i:`/${i}`;return e==="/"?"/LushaiTravels/":`${"/LushaiTravels/".replace(/\/$/,"")}${e}`}function O(i){const e="/LushaiTravels/".replace(/\/$/,"");return e?i===e||i===`${e}/`?"/":i.startsWith(`${e}/`)?i.slice(e.length)||"/":i||"/":i||"/"}const k={get:i=>{try{return JSON.parse(localStorage.getItem(i))}catch{return null}},set:(i,e)=>localStorage.setItem(i,JSON.stringify(e)),remove:i=>localStorage.removeItem(i)};function P(){return k.get("lt_user")}function ae(i){k.set("lt_user",i)}function te(){k.remove("lt_user"),window.router.navigate("/")}function _(){return!!P()}function Be(i){var a;const e=k.get("lt_users")||[];if(e.find(o=>o.email===i.email))throw new Error("Email already registered");const t={...i,id:Date.now(),role:"user",createdAt:new Date().toISOString(),avatar:(a=i.fullName)==null?void 0:a.charAt(0).toUpperCase()};return e.push(t),k.set("lt_users",e),ae(t),t}function se(i){var o;const e=k.get("lt_users")||[];if(e.find(s=>s.email===i.email))throw new Error("Email already registered");const t={...i,id:Date.now(),role:"host",status:"pending",createdAt:new Date().toISOString(),avatar:(o=i.name)==null?void 0:o.charAt(0).toUpperCase()};e.push(t),k.set("lt_users",e);const a=k.get("lt_listings")||[];return a.push({...i.listing,hostId:t.id,status:"pending",id:`listing-${Date.now()}`}),k.set("lt_listings",a),ae(t),t}function Te(i,e){const a=(k.get("lt_users")||[]).find(o=>o.email===i&&o.password===e);if(!a)throw new Error("Invalid email or password");return ae(a),a}function Z(i){return(k.get("lt_reviews")||[]).filter(t=>t.listingId===i)}function fe(i){const e=k.get("lt_reviews")||[],t={...i,id:Date.now(),createdAt:new Date().toISOString()};return e.unshift(t),k.set("lt_reviews",e),t}function Me(i){const e=k.get("lt_bookings")||[],t={...i,id:`LT-${Date.now()}`,status:"confirmed",createdAt:new Date().toISOString()};return e.unshift(t),k.set("lt_bookings",e),k.set("lt_last_booking",t),t}function Ae(){const i=P();return i?(k.get("lt_bookings")||[]).filter(t=>t.userId===i.id):[]}function Pe(){return k.get("lt_last_booking")}function re(){return k.get("lt_wishlist")||[]}function be(i){const e=re(),t=e.indexOf(i);return t===-1?e.push(i):e.splice(t,1),k.set("lt_wishlist",e),e.includes(i)}function xe(i){return re().includes(i)}function g(i,e="",t="success"){let a=document.querySelector(".toast");a||(a=document.createElement("div"),a.className="toast",document.body.appendChild(a)),a.className=`toast ${t}`,a.innerHTML=`<div class="toast-title">${t==="success"?"✅":"❌"} ${i}</div>${e?`<div class="toast-msg">${e}</div>`:""}`,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),4e3)}function T(i){return Array.from({length:5},(e,t)=>`<span style="color:${t<Math.round(i)?"#fbbf24":"#334155"};font-size:0.9rem">★</span>`).join("")}function we(i){return i.length?(i.reduce((e,t)=>e+t.rating,0)/i.length).toFixed(1):0}function de(){window.scrollTo({top:0,behavior:"smooth"})}function ce(){var s,r,d;const i=document.getElementById("navbar-container"),e=P(),t=B;i.innerHTML=`
    <nav id="navbar">
      <div class="container nav-inner">
        <a href="${t("/")}" class="nav-logo" data-link>Lushai<span>Trips</span></a>
        <div class="nav-links">
          <a href="${t("/")}" data-link>Home</a>
          <a href="${t("/discover")}" data-link>Discover</a>
          <a href="${t("/stays")}" data-link>Stays</a>
          <a href="${t("/guides")}" data-link>Guides</a>
          <a href="${t("/transport")}" data-link>Transport</a>
          <a href="${t("/surprise")}" data-link>🎲 Surprise Me</a>
        </div>
        <div class="nav-cta">
          ${e?`
            <div class="nav-avatar" id="nav-user-btn" title="${e.fullName||e.name}">${e.avatar||"👤"}</div>
          `:`
            <a href="${t("/login")}" class="btn btn-secondary btn-sm" data-link>Log in</a>
            <a href="${t("/signup-user")}" class="btn btn-primary btn-sm" data-link>Sign up</a>
          `}
          <div class="nav-hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="${t("/")}" data-link>🏠 Home</a>
      <a href="${t("/discover")}" data-link>🗺️ Discover</a>
      <a href="${t("/stays")}" data-link>🏡 Stays</a>
      <a href="${t("/guides")}" data-link>👨‍🏫 Guides</a>
      <a href="${t("/transport")}" data-link>🚗 Transport</a>
      <a href="${t("/surprise")}" data-link>🎲 Surprise Me</a>
      <div style="height:1px;background:var(--glass-border);margin:8px 0"></div>
      ${e?`
        <a href="${t("/profile")}" data-link>👤 My Profile</a>
        ${e.role==="host"?`<a href="${t("/host-dashboard")}" data-link>🏠 Host Dashboard</a>`:""}
        <a href="#" id="mobile-logout">🚪 Log out</a>
      `:`
        <a href="${t("/login")}" data-link>Log in</a>
        <a href="${t("/signup-user")}" class="btn btn-primary" data-link style="text-align:center">Sign up</a>
      `}
    </div>
  `,window.addEventListener("scroll",()=>{var n;(n=document.getElementById("navbar"))==null||n.classList.toggle("scrolled",window.scrollY>30)}),(s=document.getElementById("hamburger"))==null||s.addEventListener("click",()=>{var n;(n=document.getElementById("mobile-menu"))==null||n.classList.toggle("open")}),(r=document.getElementById("nav-user-btn"))==null||r.addEventListener("click",()=>{var c;const n=document.createElement("div");n.style.cssText="position:fixed;top:70px;right:24px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:8px;z-index:2000;min-width:180px;animation:fadeIn 0.2s ease",n.innerHTML=`
      <a href="${t("/profile")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">👤 My Profile</a>
      ${(e==null?void 0:e.role)==="host"?`<a href="${t("/host-dashboard")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏠 Host Dashboard</a>`:`<a href="${t("/host-signup-stay")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏡 Become a Host</a>`}
      <div style="height:1px;background:var(--glass-border);margin:4px 0"></div>
      <button id="dd-logout" style="width:100%;padding:10px 14px;border-radius:8px;background:none;color:#f87171;text-align:left;font-size:0.9rem;cursor:pointer;border:none">🚪 Log out</button>
    `,document.body.appendChild(n),n.querySelectorAll("[data-link]").forEach(p=>{p.addEventListener("click",m=>{m.preventDefault(),window.router.navigate(p.getAttribute("href")),n.remove()})}),setTimeout(()=>document.addEventListener("click",()=>n.remove(),{once:!0}),100),(c=n.querySelector("#dd-logout"))==null||c.addEventListener("click",()=>{te()})}),(d=document.getElementById("mobile-logout"))==null||d.addEventListener("click",n=>{n.preventDefault(),te()});const a=O(location.pathname);document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(n=>{const c=n.getAttribute("href");if(!c||c==="#")return;O(new URL(c,window.location.origin).pathname)===a&&n.classList.add("active")})}function He(){const i=document.getElementById("footer-container"),e=B;i.innerHTML=`
    <footer id="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">LushaiTrips</div>
            <p style="font-size:0.9rem;color:var(--text-dim);max-width:280px;margin-bottom:20px">Discover, plan, and randomly explore Mizoram's hidden gems. The Northeast's most exciting travel platform.</p>
            <div style="display:flex;gap:12px">
              <a href="#" style="width:38px;height:38px;background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-800)'" onmouseout="this.style.background='var(--glass)'">📘</a>
              <a href="#" style="width:38px;height:38px;background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-800)'" onmouseout="this.style.background='var(--glass)'">📸</a>
              <a href="#" style="width:38px;height:38px;background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-800)'" onmouseout="this.style.background='var(--glass)'">🐦</a>
            </div>
          </div>
          <div>
            <div class="footer-heading">Explore</div>
            <a href="${e("/discover")}" class="footer-link" data-link>All Destinations</a>
            <a href="${e("/stays")}" class="footer-link" data-link>Homestays & Hotels</a>
            <a href="${e("/guides")}" class="footer-link" data-link>Local Guides</a>
            <a href="${e("/transport")}" class="footer-link" data-link>Transport</a>
            <a href="${e("/surprise")}" class="footer-link" data-link>🎲 Surprise Me</a>
          </div>
          <div>
            <div class="footer-heading">Host</div>
            <a href="${e("/host-signup-stay")}" class="footer-link" data-link>List Your Stay</a>
            <a href="${e("/host-signup-guide")}" class="footer-link" data-link>Register as Guide</a>
            <a href="${e("/host-signup-transport")}" class="footer-link" data-link>List Transport</a>
            <a href="${e("/host-dashboard")}" class="footer-link" data-link>Host Dashboard</a>
          </div>
          <div>
            <div class="footer-heading">Company</div>
            <a href="#" class="footer-link">About Mizoram</a>
            <a href="#" class="footer-link">Travel Tips</a>
            <a href="#" class="footer-link">Safety Guide</a>
            <a href="#" class="footer-link">Contact Us</a>
            <a href="#" class="footer-link">Privacy Policy</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 LushaiTrips. Made with 💚 in Mizoram, India. | Payments secured by <strong>Razorpay</strong> | Maps by <strong>Leaflet</strong></p>
        </div>
      </div>
    </footer>
  `}const je="modulepreload",Ce=function(i){return"/LushaiTravels/"+i},pe={},De=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),d=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));o=Promise.allSettled(t.map(n=>{if(n=Ce(n),n in pe)return;pe[n]=!0;const c=n.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":je,c||(m.as="script"),m.crossOrigin="",m.href=n,d&&m.setAttribute("nonce",d),document.head.appendChild(m),c)return new Promise((h,x)=>{m.addEventListener("load",h),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${n}`)))})}))}function s(r){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=r,window.dispatchEvent(d),!d.defaultPrevented)throw r}return o.then(r=>{for(const d of r||[])d.status==="rejected"&&s(d.reason);return e().catch(s)})},Re="/LushaiTravels/".replace(/\/$/,""),f=i=>`${Re}${i}`,N=[{id:"vantawng-falls",name:"Vantawng Falls",tagline:"India's tallest waterfall in Mizoram",type:"waterfall",tags:["adventure","nature","waterfall"],difficulty:"Moderate",district:"Serchhip",lat:23.0932,lng:92.7534,rating:4.8,reviews:124,coverImage:f("/images/2018080738-1024x576.jpg"),images:[f("/images/2018080738-1024x576.jpg"),f("/images/2019072384.jpg"),f("/images/View-of-Vantawng-Waterfall-Cover-Photo-840x425.jpg")],description:"Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India. Surrounded by lush subtropical forests and mist, this is a must-visit for nature lovers and adventure seekers alike.",highlights:["750-ft plunge pool","Jungle trek","Wildlife sightings","Photography paradise"],bestTime:"October – March",nearbyAttractions:["Serchhip town","Tuirial River","Local bamboo villages"],duration:"1-2 days",category:"adventure"},{id:"phawngpui-peak",name:"Phawngpui Peak",tagline:"Blue Mountain — the highest point in Mizoram",type:"mountain",tags:["adventure","trekking","scenic"],difficulty:"Hard",district:"Lawngtlai",lat:22.4869,lng:93.0248,rating:4.9,reviews:87,coverImage:f("/images/Website-Blog-Image-Size-26.jpg"),images:[f("/images/Website-Blog-Image-Size-26.jpg"),f("/images/Website-Blog-Image-Size-29.jpg"),f("/images/Website-Feature-Image-Size-10.jpg")],description:"Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar across rolling blue-hazed ridges. The national park here protects rare orchids, Himalayan black bears, and hollock gibbons.",highlights:["Sunrise panoramas","Rare orchid species","Wildlife viewing","Cloud sea views"],bestTime:"November – February",nearbyAttractions:["Phawngpui National Park","Sangau border outpost"],duration:"2-3 days",category:"adventure"},{id:"tam-dil-lake",name:"Tam Dil Lake",tagline:"Mirror-still lake in a pine-forested valley",type:"lake",tags:["relaxation","nature","lake"],difficulty:"Easy",district:"Saitual",lat:23.6177,lng:92.8894,rating:4.6,reviews:93,coverImage:f("/images/tamdil-lake-mizoram.jpeg"),images:[f("/images/tamdil-lake-mizoram.jpeg"),f("/images/2019072338-1024x576.jpg"),f("/images/2019072384-1-olw9h396o5jhwh510ctk9bwfep94no9o510c4tj0ju.jpg")],description:"Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for a peaceful picnic, boating, or simply relaxing in nature. The calm waters reflect the surrounding hills like a mirror at dawn, making it a favourite for photographers.",highlights:["Boating","Picnic spots","Pine forest walks","Photography"],bestTime:"Year-round (best Sep – Mar)",nearbyAttractions:["Saitual town","Kelkang","Aizawl (85 km)"],duration:"1 day",category:"relaxation"},{id:"reiek-tlang",name:"Reiek Tlang",tagline:"Rolling hills with traditional Mizo heritage village",type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Mamit",lat:23.7152,lng:92.5694,rating:4.5,reviews:78,coverImage:f("/images/caption.jpg"),images:[f("/images/caption.jpg"),f("/images/caption%20(1).jpg"),f("/images/reiek-tlang-view-point-ailawng-mammit-tourist-attraction-XPHYubeNTg.jpg")],description:"Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village, walking trails, and breathtaking hillside views. Sunrise here is particularly magical with layers of hills fading into the horizon.",highlights:["Traditional Mizo village","Hiking trails","Sunrise views","Cultural exhibits"],bestTime:"October – April",nearbyAttractions:["Aizawl","Hmuifang","Durtlang Hills"],duration:"1 day",category:"culture"},{id:"palak-dil",name:"Palak Dil Lake",tagline:"Mizoram's largest natural lake, ringed by jungle",type:"lake",tags:["nature","wildlife","relaxation"],difficulty:"Easy",district:"Saiha",lat:22.1627,lng:92.9261,rating:4.7,reviews:56,coverImage:f("/images/626bdb1307952_Palak%20lake.jpg"),images:[f("/images/626bdb1307952_Palak%20lake.jpg"),f("/images/626bdb1b5a442_PALAK%20lake%202.jpg"),f("/images/palak-lake-aizawl-mizoram-1-attr-hero.jpeg")],description:"Palak Dil, Mizoram's largest natural lake, lies in the remote Saiha district near the Myanmar border. The lake is surrounded by dense subtropical forest and is a prime migratory bird watching destination. The silence here is extraordinary.",highlights:["Bird watching","Boat rides","Wildlife","Remote wilderness"],bestTime:"November – February",nearbyAttractions:["Saiha town","Phawngpui (nearby)"],duration:"2 days",category:"relaxation"},{id:"champhai",name:"Champhai Valley",tagline:"The fruit bowl of Mizoram with stunning valley views",type:"valley",tags:["nature","culture","relaxation"],difficulty:"Easy",district:"Champhai",lat:23.4692,lng:93.3224,rating:4.6,reviews:102,coverImage:f("/images/Paddy-fields-at-Champhai-Mizoram.webp"),images:[f("/images/Paddy-fields-at-Champhai-Mizoram.webp"),f("/images/House-in-a-paddy-field-in-Champhai.webp"),f("/images/1694632131_sweeping_meadows_at_champhai.jpg.webp"),f("/images/6054f244a637b2d8c9a63aa0c66b7056_1000x1000.jpg"),f("/images/62addaa694e9f_Champhai%20Zawl.jpg")],description:'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar. The valley is dotted with fruit orchards, paddy fields, and dramatic ridgeline sunsets. Its border town character adds a unique cultural flavour.',highlights:["Valley views","Fruit orchards","Museum","Myanmar border"],bestTime:"October – March",nearbyAttractions:["Rih Dil Lake (Myanmar)","Murlen National Park","Tamdil"],duration:"2-3 days",category:"relaxation"},{id:"murlen-national-park",name:"Murlen National Park",tagline:"One of Northeast India's finest biodiversity hotspots",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Moderate",district:"Champhai",lat:23.65,lng:93.35,rating:4.8,reviews:43,coverImage:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",images:["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80","https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80"],description:"Murlen National Park, spanning over 100 sq km of pristine forest, is home to leopards, clouded leopards, gibbons, hornbills, and over 150 bird species. Trekking through its silent, ancient forests is a transformative experience.",highlights:["Leopard habitat","Hornbill spotting","Jungle camping","Bird watching"],bestTime:"November – April",nearbyAttractions:["Champhai","Phawngpui Peak"],duration:"2-3 days",category:"adventure"},{id:"hmuifang",name:"Hmuifang Hill Resort",tagline:"Cloud-kissed hill with Aizawl valley panoramas",type:"hill",tags:["relaxation","nature","scenic"],difficulty:"Easy",district:"Aizawl",lat:23.5,lng:92.79,rating:4.4,reviews:67,coverImage:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",images:["https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"],description:`Just 54 km from Aizawl, Hmuifang is a hill station known as "Mizoram's Shimla." The hilltop resort offers stunning views of the surrounding valleys and the Tlawng River below. Pine forests, cool mountain air, and misty mornings make it ideal for relaxation.`,highlights:["Valley panoramas","Pine forest","Cool climate","Birding"],bestTime:"October – March",nearbyAttractions:["Aizawl","Reiek Tlang","Durtlang"],duration:"1 day",category:"relaxation"},{id:"lengteng-wildlife",name:"Lengteng Wildlife Sanctuary",tagline:"Rare wildlife in Mizoram's remote northeast",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Hard",district:"Champhai",lat:23.85,lng:93.4,rating:4.6,reviews:29,coverImage:"https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80",images:["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80"],description:"The Lengteng Wildlife Sanctuary covers 60 sq km of pristine high-altitude forest, sheltering some of Mizoram's rarest species. The journey itself — through remote villages and winding mountain roads — is half the adventure.",highlights:["Rare hornbills","Pristine forest","Remote trails","Camping"],bestTime:"November – March",nearbyAttractions:["Champhai","Murlen National Park"],duration:"2-3 days",category:"adventure"},{id:"lunglei",name:"Lunglei Hills",tagline:`The "Bridge of the Rocks" — Mizoram's southern capital`,type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Lunglei",lat:22.8917,lng:92.7349,rating:4.3,reviews:58,coverImage:"https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80",images:["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80","https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"],description:'Lunglei, the second largest city in Mizoram, sits dramatically on a ridge above verdant valleys. The name means "bridge of rocks." Explore local bazaars, colonial-era churches, and the sweeping viewpoints overlooking the Tlawng river basin.',highlights:["Rock viewpoints","Local markets","Heritage churches","Valley walks"],bestTime:"October – April",nearbyAttractions:["Saikuti Beach","Khawbung","Vantawng Falls (3 hrs)"],duration:"1-2 days",category:"culture"},{id:"aizawl-city",name:"Aizawl City",tagline:"The hilltop capital — where Mizoram's heart beats",type:"city",tags:["culture","food","relaxation"],difficulty:"Easy",district:"Aizawl",lat:23.7271,lng:92.7176,rating:4.5,reviews:211,coverImage:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",images:["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],description:"Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India's most unique capital cities. Explore the old market (Bara Bazar), taste Mizo cuisine, visit the state museum, and experience the warmth of Mizo hospitality.",highlights:["Bara Bazar","Mizo cuisine","State Museum","Durtlang Hills"],bestTime:"Year-round",nearbyAttractions:["Reiek Tlang","Hmuifang","Tam Dil Lake"],duration:"2-3 days",category:"culture"},{id:"tuipui-river",name:"Tuipui River",tagline:"Pristine river valley for kayaking and fishing",type:"river",tags:["adventure","nature","water"],difficulty:"Moderate",district:"Saiha",lat:22.05,lng:92.9,rating:4.4,reviews:32,coverImage:"https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80",images:["https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"],description:"The Tuipui River flows through the remotest district of Mizoram, creating stunning gorges, crystal-clear pools, and beaches. This is one of the best spots in Northeast India for river kayaking, fishing, and wild camping.",highlights:["Kayaking","Fishing","Wild camping","Gorge walks"],bestTime:"November – March",nearbyAttractions:["Saiha","Palak Dil Lake","Phawngpui"],duration:"2-3 days",category:"adventure"}],qe=[{id:"all",label:"All",icon:"🗺️"},{id:"adventure",label:"Adventure",icon:"🧗"},{id:"relaxation",label:"Relaxation",icon:"🌿"},{id:"culture",label:"Culture",icon:"🏛️"},{id:"wildlife",label:"Wildlife",icon:"🦅"},{id:"budget",label:"Budget",icon:"💰"}];function Ne(){const i=B,e=N.slice(0,6);return`
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="hero-glow"></div>
      <div class="hero-glow2"></div>
      <div class="container hero-content" style="padding-top:100px">
        <div class="hero-badge">🌿 Mizoram #1 Discovery Platform</div>
        <h1 class="hero-title">Explore <span class="gradient-text">Mizoram's</span><br>Hidden Gems</h1>
        <p class="hero-subtitle">Don't know where to go? Let the app decide. Discover waterfalls, mountain peaks, and secret lakes across the Lushai Hills.</p>
        <div class="hero-actions">
          <a href="${i("/surprise")}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${i("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">50+</div><div class="stat-label">Destinations</div></div>
          <div class="stat-item"><div class="stat-num">200+</div><div class="stat-label">Happy Travelers</div></div>
          <div class="stat-item"><div class="stat-num">15+</div><div class="stat-label">Verified Hosts</div></div>
          <div class="stat-item"><div class="stat-num">4.8★</div><div class="stat-label">Avg Rating</div></div>
        </div>
      </div>
      <div style="position:absolute;bottom:30px;left:50%;transform:translateX(-50%);animation:float 2s ease-in-out infinite;color:var(--text-muted);font-size:1.5rem">↓</div>
    </section>

    <!-- Surprise Strip -->
    <section class="surprise-section section-sm">
      <div class="container text-center">
        <div class="section-label">✨ Our Unique Feature</div>
        <h2 style="margin-bottom:12px">Don't Plan. Just Go.</h2>
        <p style="max-width:500px;margin:0 auto 32px">One tap — get a destination, itinerary, and stay suggestion instantly.</p>
        <a href="${i("/surprise")}" class="btn btn-primary btn-lg" data-link>🎲 Try Surprise Me</a>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="section">
      <div class="container">
        <div class="section-label">🗺️ Top Picks</div>
        <div class="flex-between" style="margin-bottom:40px;flex-wrap:wrap;gap:16px">
          <h2 class="section-title" style="margin:0">Featured Destinations</h2>
          <a href="${i("/discover")}" class="btn btn-outline" data-link>View All →</a>
        </div>
        <div class="grid-3">
          ${e.map(t=>`
            <div class="card destination-card animate-in" data-href="/destination/${t.id}">
              <div class="card-img-wrap">
                <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
                <div class="card-badge">${t.type.toUpperCase()}</div>
                <div class="card-rating">${T(t.rating)} <span>${t.rating}</span></div>
              </div>
              <div class="card-body">
                <h4 class="card-title">${t.name}</h4>
                <div class="card-meta" style="margin-bottom:10px">📍 ${t.district} &nbsp;•&nbsp; ⏱ ${t.duration}</div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${t.tagline}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${t.tags.map(a=>`<span class="tag">${a}</span>`).join("")}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" style="background:var(--bg2)">
      <div class="container text-center">
        <div class="section-label">🚀 Simple Process</div>
        <h2 style="margin-bottom:48px">How LushaiTrips Works</h2>
        <div class="grid-3">
          ${[{icon:"🎲",step:"1",title:"Discover or Surprise",desc:"Browse 50+ destinations or hit Surprise Me and let us pick the perfect trip for you."},{icon:"📅",step:"2",title:"Book Your Stay",desc:"Choose from verified homestays, lodges, and campsites. Book guides and transport in one place."},{icon:"🌄",step:"3",title:"Explore Mizoram",desc:"Show up, follow your itinerary, and experience Northeast India's best-kept secret."}].map(t=>`
            <div class="card card-body text-center animate-in">
              <div style="font-size:3rem;margin-bottom:16px">${t.icon}</div>
              <div style="width:32px;height:32px;background:var(--emerald-700);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;margin:0 auto 16px">${t.step}</div>
              <h4 style="margin-bottom:10px">${t.title}</h4>
              <p style="font-size:0.9rem">${t.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Top Stays Preview -->
    <section class="section">
      <div class="container">
        <div class="section-label">🏡 Top Rated</div>
        <div class="flex-between" style="margin-bottom:40px;flex-wrap:wrap;gap:16px">
          <h2 style="margin:0">Loved by Travelers</h2>
          <a href="${i("/stays")}" class="btn btn-outline" data-link>All Stays →</a>
        </div>
        <div class="grid-3" id="home-stays-grid"></div>
      </div>
    </section>

    <!-- Services Strip -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <h2 class="text-center" style="margin-bottom:40px">Everything You Need</h2>
        <div class="grid-4">
          ${[{icon:"🏡",title:"Homestays",desc:"Authentic Mizo homes",href:"/stays"},{icon:"👨‍🏫",title:"Local Guides",desc:"Expert local experts",href:"/guides"},{icon:"🚗",title:"Transport",desc:"Cars, bikes & more",href:"/transport"},{icon:"⭐",title:"Reviews",desc:"Real verified stays",href:"/stays"}].map(t=>`
            <a href="${i(t.href)}" class="card card-body text-center" data-link style="cursor:pointer">
              <div style="font-size:2.5rem;margin-bottom:12px">${t.icon}</div>
              <h4 style="margin-bottom:6px">${t.title}</h4>
              <p style="font-size:0.85rem">${t.desc}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Have a Stay or Service to List?</h2>
        <p style="margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto">Join our curated network of Mizoram hosts. List your homestay, guide service, or transport.</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${i("/host-signup-stay")}" class="btn btn-primary btn-lg" data-link>🏡 List Your Stay</a>
          <a href="${i("/host-signup-guide")}" class="btn btn-secondary btn-lg" data-link>👨‍🏫 Become a Guide</a>
          <a href="${i("/host-signup-transport")}" class="btn btn-secondary btn-lg" data-link>🚗 List Transport</a>
        </div>
      </div>
    </section>
  `}function Ge(){const i=document.querySelector(".hero-bg");i&&(i.style.backgroundImage="url('/LushaiTravels/images/digilife-siaha-2cM78THYc4w-unsplash.jpg')"),document.querySelectorAll("[data-href]").forEach(e=>{e.addEventListener("click",()=>window.router.navigate(e.dataset.href))}),De(async()=>{const{stays:e}=await Promise.resolve().then(()=>_e);return{stays:e}},void 0).then(({stays:e})=>{const t=document.getElementById("home-stays-grid");t&&(t.innerHTML=e.slice(0,3).map(a=>`
      <div class="card stay-card animate-in" data-href="/stay/${a.id}">
        <div class="card-img-wrap">
          <img src="${a.coverImage}" alt="${a.name}" loading="lazy" />
          <div class="card-badge">${a.type.toUpperCase()}</div>
          ${a.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
          <div class="card-rating">${T(a.rating)} <span>${a.rating}</span></div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${a.name}</h4>
          <div class="card-meta" style="margin-bottom:8px">📍 ${a.location}</div>
          <div class="flex-between">
            <span class="price">₹${a.price.toLocaleString()}<span>/night</span></span>
            <span style="font-size:0.8rem;color:var(--text-muted)">👥 up to ${a.maxGuests}</span>
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".stay-card[data-href]").forEach(a=>{a.addEventListener("click",()=>window.router.navigate(a.dataset.href))}))})}let J="all",U="";function We(){return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🗺️ All Destinations</div>
        <h1>Discover Mizoram</h1>
        <p style="max-width:600px;margin-bottom:32px">Waterfalls, mountain peaks, hidden lakes, wildlife sanctuaries and cultural heartlands — explore them all.</p>
        <div style="position:relative;max-width:500px">
          <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-dim);font-size:1.1rem">🔍</span>
          <input type="text" id="discover-search" class="form-input" placeholder="Search destinations…" style="padding-left:44px;border-radius:50px" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Category filter chips -->
        <div class="filter-chips" id="cat-filters" style="justify-content:flex-start;margin-bottom:40px">
          ${qe.map(i=>`<div class="chip ${i.id==="all"?"active":""}" data-cat="${i.id}">${i.icon} ${i.label}</div>`).join("")}
        </div>

        <!-- Hidden Gems -->
        <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-lg);padding:28px;margin-bottom:48px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
            <span style="font-size:1.5rem">💎</span>
            <div>
              <div style="font-weight:700;font-size:1.1rem">Hidden Gems</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Off the beaten path — few tourists, maximum magic</div>
            </div>
          </div>
          <div class="grid-4" id="hidden-gems-grid"></div>
        </div>

        <!-- All Destinations Grid -->
        <div class="flex-between" style="margin-bottom:24px">
          <h3 id="results-count">All Destinations</h3>
        </div>
        <div class="grid-3" id="destinations-grid"></div>
      </div>
    </section>
  `}function Fe(){var i;Q(),Ue(),document.querySelectorAll(".chip[data-cat]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".chip[data-cat]").forEach(t=>t.classList.remove("active")),e.classList.add("active"),J=e.dataset.cat,Q()})}),(i=document.getElementById("discover-search"))==null||i.addEventListener("input",e=>{U=e.target.value.toLowerCase(),Q()})}function Ve(){return N.filter(i=>{const e=J==="all"||i.category===J||i.tags.includes(J),t=!U||i.name.toLowerCase().includes(U)||i.district.toLowerCase().includes(U)||i.type.toLowerCase().includes(U);return e&&t})}function Q(){const i=Ve(),e=document.getElementById("destinations-grid"),t=document.getElementById("results-count");if(t&&(t.textContent=`${i.length} Destination${i.length!==1?"s":""}`),!!e){if(!i.length){e.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">😕 No destinations found. Try a different filter.</div>';return}e.innerHTML=i.map(a=>Oe(a)).join(""),e.querySelectorAll("[data-href]").forEach(a=>{a.addEventListener("click",()=>window.router.navigate(a.dataset.href))})}}function Ue(){const i=N.filter(t=>t.reviews<50),e=document.getElementById("hidden-gems-grid");e&&(e.innerHTML=i.slice(0,4).map(t=>`
    <div class="card" data-href="/destination/${t.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:160px">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">💎 HIDDEN GEM</div>
      </div>
      <div class="card-body" style="padding:14px">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px">${t.name}</div>
        <div style="font-size:0.8rem;color:var(--text-muted)">📍 ${t.district}</div>
      </div>
    </div>
  `).join(""),e.querySelectorAll("[data-href]").forEach(t=>{t.addEventListener("click",()=>window.router.navigate(t.dataset.href))}))}function Oe(i){const e={Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[i.difficulty]||"#94a3b8";return`
    <div class="card destination-card animate-in" data-href="/destination/${i.id}">
      <div class="card-img-wrap">
        <img src="${i.coverImage}" alt="${i.name}" loading="lazy" />
        <div class="card-badge">${i.type.toUpperCase()}</div>
        <div class="card-rating">${T(i.rating)} <span>${i.rating} (${i.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${i.name}</h4>
        <div class="card-meta" style="margin-bottom:10px">
          📍 ${i.district} &nbsp;•&nbsp; ⏱ ${i.duration} &nbsp;•&nbsp;
          <span style="color:${e};font-weight:600">${i.difficulty}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${i.tagline}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;color:var(--text-muted)">
          <span>🌤 Best: ${i.bestTime}</span>
          <span class="btn btn-outline btn-sm">Explore →</span>
        </div>
      </div>
    </div>
  `}const X=[{id:"itin-1",destinationId:"vantawng-falls",days:1,title:"1-Day: Vantawng Falls Trail",category:"adventure",stayId:"vantawng-lodge",plan:[{day:1,activities:["7 AM: Arrive Thenzawl","9 AM: Trek to Vantawng Falls (750ft drop!)","12 PM: Picnic lunch near the falls","2 PM: Village walk & bamboo crafts","5 PM: Sunset from ridge viewpoint","7 PM: Mizo dinner at Vantawng Lodge"]}]},{id:"itin-2",destinationId:"phawngpui-peak",days:3,title:"3-Day: Blue Mountain Summit",category:"adventure",stayId:null,plan:[{day:1,activities:["Drive to Lawngtlai (8 hrs from Aizawl)","Base camp setup","Sunset from lower ridge","Campfire dinner"]},{day:2,activities:["5 AM: Summit attempt (2,157m)","10 AM: Myanmar panorama at peak","Afternoon: Wildlife trail","Stargazing night"]},{day:3,activities:["Dawn photography","Rare orchid walk with guide","Return journey","Buy Puan textile souvenirs"]}]},{id:"itin-3",destinationId:"tam-dil-lake",days:1,title:"1-Day: Tam Dil Lake Escape",category:"relaxation",stayId:"tamdil-lakehouse",plan:[{day:1,activities:["9 AM: Drive from Aizawl (2 hrs)","11 AM: Morning boat ride on the lake","1 PM: Lakeside picnic lunch","3 PM: Pine forest walk","5 PM: Golden hour on the lake","7 PM: Return or stay overnight"]}]},{id:"itin-4",destinationId:"champhai",days:2,title:"2-Day: Champhai Valley & Myanmar Views",category:"relaxation",stayId:"champhai-farmstay",plan:[{day:1,activities:["Morning: Drive to Champhai (157 km)","Afternoon: Farm visit & fruit picking","Evening: Myanmar border viewpoint sunset","Night: Traditional Mizo dinner with family"]},{day:2,activities:["Dawn: Valley fog photography","Morning: Champhai museum & market","Afternoon: Murlen National Park entry","Evening: Return to Aizawl"]}]},{id:"itin-5",destinationId:"reiek-tlang",days:1,title:"1-Day: Reiek Heritage Village",category:"culture",stayId:"bamboo-haven",plan:[{day:1,activities:["8 AM: Depart Aizawl","9:30 AM: Reiek traditional village walk","11 AM: Mizo cultural exhibits","1 PM: Lunch at village café","3 PM: Hilltop panoramic viewpoint","5 PM: Return or Bamboo Haven overnight"]}]},{id:"itin-6",destinationId:"palak-dil",days:2,title:"2-Day: Palak Dil & Saiha Wilderness",category:"wildlife",stayId:null,plan:[{day:1,activities:["Early morning departure from Aizawl","Afternoon: Arrive Saiha","Evening: Palak Dil lake sunset cruise","Night: Forest lodge stay"]},{day:2,activities:["5 AM: Bird watching (migratory species)","Morning: Jungle trail with local guide","Afternoon: Return journey"]}]}],j=[{id:"bamboo-haven",name:"Bamboo Haven Homestay",type:"Homestay",host:{name:"Liana Hnamte",avatar:"LH",phone:"+91 98765 43210",since:"2022"},location:"Reiek Village, Mamit District",lat:23.7152,lng:92.5694,price:1800,maxGuests:4,rooms:2,rating:4.9,reviews:47,coverImage:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",images:["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80","https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80","https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"],amenities:["WiFi","Parking","Home-cooked Food","Hot Water","Valley View","Bonfire"],description:"Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience. Wake up to misty valley views, eat home-cooked Mizo meals, and fall asleep to the sounds of the forest. Our family has lived here for generations.",about:"Liana and her family offer warm Mizo hospitality in their traditional home.",nearbyAttractions:["Reiek Heritage Village (5 min)","Hmuifang (45 min)","Aizawl (35 km)"],checkIn:"14:00",checkOut:"11:00",rules:["No smoking inside","Quiet hours after 10 PM","No outside food","Pets on request"],topRated:!0,verified:!0,tags:["hidden-gem","budget-friendly"]},{id:"champhai-farmstay",name:"Champhai Valley Farmstay",type:"Homestay",host:{name:"Mimi Lalhmangaihi",avatar:"ML",phone:"+91 65432 10987",since:"2022"},location:"Champhai, Champhai District",lat:23.4692,lng:93.3224,price:1500,maxGuests:4,rooms:2,rating:4.6,reviews:54,coverImage:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",images:["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80","https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],amenities:["Organic Farm","Home-cooked Food","Fruit Picking","Valley View","Parking","Hot Water"],description:"Experience life on a working Mizo farm in the fruit bowl of Champhai. Pick fresh oranges, help with the harvest, cook traditional recipes, and fall asleep looking at Myanmar across the valley. The most authentic rural Mizoram experience.",about:"Mimi's family has farmed this land for 3 generations. She loves sharing Mizo culture through food.",nearbyAttractions:["Myanmar border viewpoint","Champhai museum","Murlen National Park (2 hrs)"],checkIn:"14:00",checkOut:"11:00",rules:["Farm work is optional but encouraged","Organic produce only","Early breakfast at 7 AM"],topRated:!1,verified:!0,tags:["farm-experience","budget-friendly"]},{id:"tamdil-lakehouse",name:"Tam Dil Lakehouse",type:"Hotel",host:{name:"Robert Lalthanmawia",avatar:"RL",phone:"+91 54321 09876",since:"2020"},location:"Tam Dil, Saitul District",lat:23.6177,lng:92.8894,price:3200,maxGuests:2,rooms:1,rating:4.9,reviews:89,coverImage:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],amenities:["Lakefront Room","Kayaking","WiFi","AC","Restaurant","Hot Water","Parking","Sunrise View"],description:"Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram's most romantic stay. The floor-to-ceiling windows reflect the lake, the pine forest, and the stars. Breakfast is served on your private deck.",about:"Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.",nearbyAttractions:["Tam Dil Lake (on property)","Tam Dil sanctuary","Saitul (30 min)"],checkIn:"15:00",checkOut:"11:00",rules:["Adults only","No loud parties","Checkout strictly at 11 AM"],topRated:!0,verified:!0,tags:["romantic","lakefront","premium"]}],_e=Object.freeze(Object.defineProperty({__proto__:null,stays:j},Symbol.toStringTag,{value:"Module"})),Ye=[{id:"all",label:"✨ Any Vibe",icon:"🎲"},{id:"adventure",label:"🧗 Adventure"},{id:"relaxation",label:"🌿 Relaxation"},{id:"culture",label:"🏛️ Culture"},{id:"wildlife",label:"🦅 Wildlife"},{id:"budget",label:"💰 Budget"}];let K="all",ee=!1;function Je(){return`
    <section class="page-hero text-center">
      <div class="container">
        <div class="hero-badge" style="justify-content:center">🎲 Our Signature Feature</div>
        <h1>Surprise Me</h1>
        <p class="hero-subtitle" style="margin:0 auto">Don't know where to go? Let LushaiTrips pick your perfect Mizoram adventure — destination, itinerary, and stay included.</p>
      </div>
    </section>

    <section class="section">
      <div class="container text-center">
        <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Filter by vibe (optional)</p>
        <div class="filter-chips" id="surprise-filters">
          ${Ye.map(i=>`<div class="chip ${i.id==="all"?"active":""}" data-filter="${i.id}">${i.label}</div>`).join("")}
        </div>

        <button class="dice-btn" id="dice-btn" title="Surprise Me!">🎲</button>
        <p style="color:var(--text-muted);margin-top:-16px;margin-bottom:32px">Tap the dice to discover</p>

        <!-- Rolling animation -->
        <div id="rolling" class="hidden">
          <div class="loading-spinner"></div>
          <p style="margin-top:16px;color:var(--text-muted);animation:pulse-glow 1s infinite">Finding your perfect trip…</p>
        </div>

        <!-- Result -->
        <div class="surprise-result" id="surprise-result">
          <div class="result-card" id="result-card"></div>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
            <button class="btn btn-secondary" id="reroll-btn">🎲 Try Another</button>
            <button class="btn btn-primary" id="book-result-btn">Book This Trip →</button>
          </div>
        </div>
      </div>
    </section>
  `}function Ke(){var i,e;document.querySelectorAll(".chip[data-filter]").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".chip[data-filter]").forEach(a=>a.classList.remove("active")),t.classList.add("active"),K=t.dataset.filter})}),(i=document.getElementById("dice-btn"))==null||i.addEventListener("click",me),(e=document.getElementById("reroll-btn"))==null||e.addEventListener("click",me)}function me(){if(ee)return;ee=!0;const i=document.getElementById("rolling"),e=document.getElementById("surprise-result"),t=document.getElementById("dice-btn");e.classList.remove("show"),i.classList.remove("hidden"),t.style.animation="spin 0.5s linear infinite",setTimeout(()=>{var d,n;i.classList.add("hidden"),t.style.animation="float 3s ease-in-out infinite";const a=K==="all"?N:N.filter(c=>c.category===K||c.tags.includes(K)),o=a[Math.floor(Math.random()*a.length)]||N[0],s=X.find(c=>c.destinationId===o.id)||X[Math.floor(Math.random()*X.length)],r=j.find(c=>c.id===(s==null?void 0:s.stayId))||j[Math.floor(Math.random()*j.length)];document.getElementById("result-card").innerHTML=Ze(o,s,r),e.classList.add("show"),(d=document.getElementById("book-result-btn"))==null||d.addEventListener("click",()=>{window.router.navigate(`/stay/${r.id}`)}),(n=document.getElementById("view-dest-btn"))==null||n.addEventListener("click",()=>{window.router.navigate(`/destination/${o.id}`)}),ee=!1},1800)}function Ze(i,e,t){return`
    <img src="${i.coverImage}" alt="${i.name}" class="result-img" />
    <div class="result-body text-left">
      <div class="duration-badge">📅 ${(e==null?void 0:e.days)||1}-Day Trip • ${i.district} District</div>
      <h2 style="margin-bottom:8px">${(e==null?void 0:e.title)||i.name+" Adventure"}</h2>
      <p style="margin-bottom:20px">${i.description.slice(0,160)}…</p>

      <h4 style="margin-bottom:12px">📍 Your Itinerary</h4>
      <ul class="itinerary-list">
        ${((e==null?void 0:e.plan)||[]).flatMap(a=>a.activities.slice(0,3).map(o=>`<li><span class="day-badge">Day ${a.day}</span> ${o}</li>`)).slice(0,6).join("")}
      </ul>

      ${t?`
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:24px">
          <div style="font-size:0.8rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🏡 Suggested Stay</div>
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${t.coverImage}" style="width:72px;height:72px;border-radius:12px;object-fit:cover" />
            <div>
              <div style="font-weight:700;margin-bottom:4px">${t.name}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${t.type} • ${t.location}</div>
              <div style="color:var(--emerald-400);font-weight:700;margin-top:4px">₹${t.price.toLocaleString()}/night</div>
            </div>
          </div>
        </div>
      `:""}

      <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
        ${i.highlights.map(a=>`<span class="tag">✓ ${a}</span>`).join("")}
      </div>
      <button class="btn btn-outline mt-16" id="view-dest-btn">View Destination Details</button>
    </div>
  `}function Qe(i){const e=B,t=N.find(r=>r.id===i);if(!t)return'<div class="page-hero container"><h1>Destination not found</h1></div>';const a=j.filter(r=>r.location.toLowerCase().includes(t.district.toLowerCase())).slice(0,2),o=Z(`dest-${i}`),s=we(o);return`
    <!-- Gallery Hero -->
    <div style="padding-top:76px">
      <div class="gallery container" style="margin-top:20px">
        <div class="gallery-main" onclick="openLightbox(0,'${i}')">
          <img src="${t.images[0]}" alt="${t.name}" />
        </div>
        ${t.images.slice(1,3).map((r,d)=>`
          <div class="gallery-thumb" onclick="openLightbox(${d+1},'${i}')">
            <img src="${r}" alt="${t.name} ${d+2}" />
          </div>
        `).join("")}
        ${t.images[3]?`
          <div class="gallery-thumb gallery-more" data-more="📷 View all" onclick="openLightbox(3,'${i}')">
            <img src="${t.images[3]}" alt="more" />
          </div>`:""}
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <!-- Left: Info -->
        <div>
          <!-- Title -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px">
            <h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">${t.name}</h1>
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;width:46px;height:46px;font-size:1.3rem;cursor:pointer;flex-shrink:0;transition:var(--transition)">${xe(`dest-${i}`)?"❤️":"🤍"}</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:20px">
            <div style="display:flex;gap:4px;align-items:center">${T(t.rating)} <strong>${t.rating}</strong> <span style="color:var(--text-muted)">(${t.reviews} reviews)</span></div>
            <span style="color:var(--text-dim)">•</span>
            <span>📍 ${t.district} District</span>
            <span style="color:var(--text-dim)">•</span>
            <span>⏱ ${t.duration}</span>
            <span style="color:var(--text-dim)">•</span>
            <span style="color:${{Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[t.difficulty]}">● ${t.difficulty}</span>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:12px">About this Place</h3>
          <p style="margin-bottom:24px">${t.description}</p>

          <!-- Highlights -->
          <h3 style="margin-bottom:16px">✨ Highlights</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${t.highlights.map(r=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${r}</span></div>`).join("")}
          </div>

          <!-- Best time & Nearby -->
          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🌤</div>
              <div style="font-weight:700;margin-bottom:4px">Best Time to Visit</div>
              <div style="color:var(--text-muted)">${t.bestTime}</div>
            </div>
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🗺️</div>
              <div style="font-weight:700;margin-bottom:4px">Nearby Attractions</div>
              <ul style="list-style:none;color:var(--text-muted);font-size:0.9rem">${t.nearbyAttractions.map(r=>`<li>• ${r}</li>`).join("")}</ul>
            </div>
          </div>

          <!-- Map -->
          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="dest-map" class="map-container" style="margin-bottom:32px"></div>

          <!-- Tags -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
            ${t.tags.map(r=>`<span class="tag">${r}</span>`).join("")}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${s>0?`⭐ ${s} · `:""}${o.length} Review${o.length!==1?"s":""}</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>

          <div id="reviews-list">
            ${o.length?o.map(r=>ke(r)).join(""):'<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>'}
          </div>

          <!-- Write Review (hidden) -->
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input" id="star-input">
                ${[5,4,3,2,1].map(r=>`<input type="radio" name="rating" id="r${r}" value="${r}"><label for="r${r}">★</label>`).join("")}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience…"></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>

          <!-- Nearby Stays -->
          ${a.length?`
            <div class="divider-h"></div>
            <h3 style="margin-bottom:24px">🏡 Stays Near ${t.name}</h3>
            <div class="grid-2">
              ${a.map(r=>`
                <div class="card" data-href="/stay/${r.id}" style="cursor:pointer">
                  <div class="card-img-wrap" style="height:160px"><img src="${r.coverImage}" alt="${r.name}" loading="lazy" /></div>
                  <div class="card-body">
                    <div style="font-weight:700">${r.name}</div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px">
                      <span class="price" style="font-size:1rem">₹${r.price.toLocaleString()}<span>/night</span></span>
                      <span>${T(r.rating)} ${r.rating}</span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          `:""}
        </div>

        <!-- Right: Quick actions -->
        <div>
          <div class="booking-widget">
            <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:12px">🌄 Plan a Trip Here</div>
            <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Find stays, guides, and transport for ${t.name}.</div>
            <a href="${e("/stays")}" class="btn btn-primary w-full" data-link style="justify-content:center;margin-bottom:12px">🏡 Browse Stays</a>
            <a href="${e("/guides")}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:12px">👨‍🏫 Hire a Guide</a>
            <a href="${e("/transport")}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:20px">🚗 Book Transport</a>
            <a href="${e("/surprise")}" class="btn btn-amber w-full" data-link style="justify-content:center">🎲 Surprise Me</a>
            <div class="divider-h"></div>
            <div style="font-size:0.85rem;color:var(--text-muted);text-align:center">🔒 Secure payments via Razorpay</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <button class="lightbox-close" id="lb-close">✕</button>
      <button class="lightbox-prev" id="lb-prev">‹</button>
      <img id="lb-img" src="" alt="Gallery" />
      <button class="lightbox-next" id="lb-next">›</button>
    </div>
  `}function Xe(i){var o,s,r,d,n,c;const e=N.find(p=>p.id===i);if(!e)return;setTimeout(()=>{const p=document.getElementById("dest-map");if(!p||p._leaflet_id)return;const m=L.map("dest-map").setView([e.lat,e.lng],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(m),L.marker([e.lat,e.lng]).addTo(m).bindPopup(`<b>${e.name}</b><br>${e.district} District`).openPopup()},100);const t=e.images;let a=0;window.openLightbox=p=>{a=p,document.getElementById("lb-img").src=t[a],document.getElementById("lightbox").classList.add("open")},(o=document.getElementById("lb-close"))==null||o.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(s=document.getElementById("lb-prev"))==null||s.addEventListener("click",()=>{a=(a-1+t.length)%t.length,document.getElementById("lb-img").src=t[a]}),(r=document.getElementById("lb-next"))==null||r.addEventListener("click",()=>{a=(a+1)%t.length,document.getElementById("lb-img").src=t[a]}),(d=document.getElementById("wishlist-btn"))==null||d.addEventListener("click",()=>{const p=document.getElementById("wishlist-btn"),m=be(`dest-${i}`);p.textContent=m?"❤️":"🤍",g(m?"Added to Wishlist":"Removed from Wishlist")}),(n=document.getElementById("write-review-btn"))==null||n.addEventListener("click",()=>{if(!_()){g("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(c=document.getElementById("submit-review-btn"))==null||c.addEventListener("click",()=>{var b,y,z;const p=parseInt(((b=document.querySelector('input[name="rating"]:checked'))==null?void 0:b.value)||0),m=(z=(y=document.getElementById("review-text"))==null?void 0:y.value)==null?void 0:z.trim();if(!p){g("Please select a rating","","error");return}if(!m){g("Please write your review","","error");return}const h=P();fe({listingId:`dest-${i}`,rating:p,text:m,userName:h.fullName||h.name,userAvatar:h.avatar}),g("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden");const x=Z(`dest-${i}`);document.getElementById("reviews-list").innerHTML=x.map(I=>ke(I)).join("")}),document.querySelectorAll("[data-href]").forEach(p=>{p.addEventListener("click",()=>window.router.navigate(p.dataset.href))})}function ke(i){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${i.userAvatar||((e=i.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${i.userName}</div>
          <div class="review-date">${new Date(i.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${T(i.rating)}</div>
      </div>
      <p class="review-text">${i.text}</p>
      <span class="verified-badge">✅ Verified Visit</span>
    </div>
  `}function et(){return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🏡 Where to Stay</div>
        <h1>Stays in Mizoram</h1>
        <p style="max-width:600px;margin-bottom:32px">Handpicked homestays, lodges, and camps. Every host is verified and every experience is authentic.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${["All","Homestay","Hotel","Lodge","Camping"].map((i,e)=>`<div class="chip ${e===0?"active":""}" data-type="${i.toLowerCase()}">${i}</div>`).join("")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="stays-grid"></div>
      </div>
    </section>
  `}function tt(){let i="all";const e=()=>{const t=i==="all"?j:j.filter(a=>a.type.toLowerCase()===i);document.getElementById("stays-grid").innerHTML=t.length?t.map(it).join(""):'<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No stays found.</div>',document.querySelectorAll("[data-href]").forEach(a=>a.addEventListener("click",()=>window.router.navigate(a.dataset.href)))};e(),document.querySelectorAll(".chip[data-type]").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".chip[data-type]").forEach(a=>a.classList.remove("active")),t.classList.add("active"),i=t.dataset.type,e()})})}function it(i){return`
    <div class="card stay-card" data-href="/stay/${i.id}">
      <div class="card-img-wrap">
        <img src="${i.coverImage}" alt="${i.name}" loading="lazy" />
        <div class="card-badge">${i.type.toUpperCase()}</div>
        ${i.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);backdrop-filter:blur(8px);padding:4px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
        <div class="card-rating">${T(i.rating)} <span>${i.rating} (${i.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${i.name}</h4>
        <div class="card-meta" style="margin-bottom:8px">📍 ${i.location}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${i.amenities.slice(0,3).map(e=>`<span class="tag" style="font-size:0.72rem">${e}</span>`).join("")}
          ${i.amenities.length>3?`<span class="tag" style="font-size:0.72rem">+${i.amenities.length-3} more</span>`:""}
        </div>
        <div class="flex-between">
          <span class="price">₹${i.price.toLocaleString()}<span>/night</span></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">👥 Max ${i.maxGuests}</span>
        </div>
      </div>
    </div>
  `}function at(i){return'<div id="stay-detail-container" style="padding-top:76px;min-height:80vh;display:flex;align-items:center;justify-content:center"><div class="spinner" style="font-size:1.5rem">Loading...</div></div>'}function st(i){var h,x,b,y,z,I,M;const e=document.getElementById("stay-detail-container"),t=j.find(u=>u.id===i);if(!t){e.innerHTML='<div class="page-hero container"><h1>Stay not found</h1></div>';return}const a=Z(i),o=we(a);e.innerHTML=`
    <!-- Gallery -->
    <div class="container" style="margin-top:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h1 style="font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:6px">${t.name}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:0.9rem;color:var(--text-muted)">
            ${T(o>0?o:t.rating)} <strong style="color:var(--text)">${o>0?o:t.rating}</strong>
            <span>(${a.length||t.reviews} reviews)</span> •
            <span>📍 ${t.location}</span> •
            ${t.verified?'<span style="color:var(--emerald-400)">✅ Verified</span>':""}
            ${t.topRated?'<span class="top-rated-badge">🔥 Top Rated</span>':""}
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:8px 16px;color:var(--text);cursor:pointer;font-size:0.9rem">${xe(i)?"❤️ Saved":"🤍 Save"}</button>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="gallery" style="margin-bottom:0">
        <div class="gallery-main" onclick="openStayLightbox(0)"><img src="${t.images[0]}" alt="${t.name}" /></div>
        ${t.images.slice(1,3).map((u,v)=>`<div class="gallery-thumb" onclick="openStayLightbox(${v+1})"><img src="${u}" alt="${t.name}" /></div>`).join("")}
        ${t.images[3]?`<div class="gallery-thumb gallery-more" data-more="📷 All photos" onclick="openStayLightbox(3)"><img src="${t.images[3]}" alt="more" /></div>`:""}
      </div>
      <div style="margin-bottom:4px;margin-top:6px">
        <span style="font-size:0.75rem;color:var(--emerald-400);background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);padding:3px 10px;border-radius:50px">📸 Real Photos Verified</span>
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <!-- LEFT -->
        <div>
          <!-- Host Info -->
          <div style="display:flex;align-items:center;gap:16px;padding:24px 0;border-bottom:1px solid var(--glass-border);margin-bottom:28px">
            <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-600),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.3rem;flex-shrink:0">${t.host.avatar||"H"}</div>
            <div>
              <div style="font-weight:700;font-size:1rem">${t.type} hosted by ${t.host.name||t.host.full_name||"Host"}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Hosting since ${t.host.since||new Date().getFullYear()} · ${t.rooms} room${t.rooms>1?"s":""} · Up to ${t.maxGuests} guests</div>
            </div>
          </div>

          <h3 style="margin-bottom:12px">About this place</h3>
          <p style="margin-bottom:28px">${t.description}</p>

          <h3 style="margin-bottom:16px">🛎 Amenities</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${(t.amenities||[]).map(u=>`<div class="amenity-item"><span class="amenity-icon">${{WiFi:"📶",Parking:"🅿️","Home-cooked Food":"🍛","Breakfast Included":"🥐","Hot Water":"🚿","Valley View":"🌄",Bonfire:"🔥","Waterfall View":"💦","Guide Service":"🧭","Tents Provided":"⛺",Campfire:"🔥","Meals Included":"🍽️","Mountain Guide":"🧗",Stargazing:"🔭","Trekking Gear":"🎒","Organic Farm":"🌱","Fruit Picking":"🍊",Kayaking:"🚣",AC:"❄️",Restaurant:"🍴","Sunrise View":"🌅",Lakefront:"💧"}[u]||"✓"}</span><span class="amenity-label">${u}</span></div>`).join("")}
          </div>

          <h3 style="margin-bottom:16px">📅 Availability & Rules</h3>
          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">Check-in / Check-out</div>
              <div style="color:var(--text-muted);font-size:0.9rem">Check-in: <strong style="color:var(--text)">${t.checkIn||"14:00"}</strong></div>
              <div style="color:var(--text-muted);font-size:0.9rem;margin-top:6px">Check-out: <strong style="color:var(--text)">${t.checkOut||"11:00"}</strong></div>
            </div>
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">House Rules</div>
              <ul style="list-style:none;font-size:0.85rem;color:var(--text-muted)">
                ${(t.rules||[]).map(u=>`<li style="margin-bottom:4px">• ${u}</li>`).join("")}
              </ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="stay-map" class="map-container" style="margin-bottom:32px"></div>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px">📍 ${t.location}</p>
          <div style="margin-bottom:32px">
            ${(t.nearbyAttractions||[]).map(u=>`<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">→ ${u}</div>`).join("")}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${o>0?`⭐ ${o} · `:`⭐ ${t.rating} · `}${a.length||t.reviews} Reviews</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>
          <div id="reviews-list">
            ${a.length?a.map(u=>ie(u)).join(""):rt()}
          </div>
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input">${[5,4,3,2,1].map(u=>`<input type="radio" name="rating" id="r${u}" value="${u}"><label for="r${u}">★</label>`).join("")}</div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience…"></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>
        </div>

        <!-- RIGHT: Booking Widget -->
        <div>
          <div class="booking-widget">
            <div class="booking-price">
              <span class="price" style="font-size:1.6rem">₹${t.price.toLocaleString()}</span>
              <span style="color:var(--text-muted)">/night</span>
              <div style="display:flex;gap:4px;margin-top:6px">${T(o>0?o:t.rating)} <span style="font-size:0.85rem;color:var(--text-muted)">${a.length||t.reviews} reviews</span></div>
            </div>
            <div class="booking-dates">
              <div class="booking-date-field"><label>CHECK-IN</label><input type="date" id="checkin-date" /></div>
              <div class="booking-date-field"><label>CHECK-OUT</label><input type="date" id="checkout-date" /></div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Guests</label>
              <select class="form-select" id="guests-count">
                ${Array.from({length:t.maxGuests||2},(u,v)=>`<option value="${v+1}">${v+1} guest${v>0?"s":""}</option>`).join("")}
              </select>
            </div>
            <div id="price-breakdown" style="margin-bottom:16px"></div>
            <button class="btn btn-primary w-full" id="reserve-btn" style="justify-content:center;font-size:1rem;padding:16px">Reserve & Pay →</button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px">🔒 Secured by Razorpay · You won't be charged yet</p>

            <div class="divider-h"></div>
            <div style="font-weight:700;margin-bottom:12px">Contact Host</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${t.host.phone||"+91 00000 00000"}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">💬 Usually replies within 2 hours</div>
          </div>
        </div>
      </div>
    </div>

    <div class="lightbox" id="lightbox">
      <button class="lightbox-close" id="lb-close">✕</button>
      <button class="lightbox-prev" id="lb-prev">‹</button>
      <img id="lb-img" src="" alt="Gallery" />
      <button class="lightbox-next" id="lb-next">›</button>
    </div>
  `,e.style.display="block";const s=new Date,r=new Date(s);r.setDate(r.getDate()+1);const d=u=>u.toISOString().split("T")[0],n=document.getElementById("checkin-date"),c=document.getElementById("checkout-date");n&&(n.value=d(s)),c&&(c.value=d(r));const p=()=>{const u=new Date(n==null?void 0:n.value),v=new Date(c==null?void 0:c.value),w=Math.max(1,Math.round((v-u)/864e5)),E=w*t.price,$=document.getElementById("price-breakdown");$&&($.innerHTML=`
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>₹${t.price.toLocaleString()} × ${w} night${w>1?"s":""}</span><span>₹${(w*t.price).toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>Service fee</span><span>₹${Math.round(E*.05).toLocaleString()}</span>
      </div>
      <div style="height:1px;background:var(--glass-border);margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:700">
        <span>Total</span><span>₹${Math.round(E*1.05).toLocaleString()}</span>
      </div>
    `)};p(),n==null||n.addEventListener("change",p),c==null||c.addEventListener("change",p),(h=document.getElementById("reserve-btn"))==null||h.addEventListener("click",()=>{var S;const u=n==null?void 0:n.value,v=c==null?void 0:c.value,w=(S=document.getElementById("guests-count"))==null?void 0:S.value;if(!u||!v){g("Please select dates","","error");return}const E=Math.max(1,Math.round((new Date(v)-new Date(u))/864e5)),$=Math.round(E*t.price*1.05);window.router.navigate(`/book/${i}?checkin=${u}&checkout=${v}&guests=${w}&total=${$}`)});let m=0;window.openStayLightbox=u=>{m=u,document.getElementById("lb-img").src=t.images[m],document.getElementById("lightbox").classList.add("open")},(x=document.getElementById("lb-close"))==null||x.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(b=document.getElementById("lb-prev"))==null||b.addEventListener("click",()=>{m=(m-1+t.images.length)%t.images.length,document.getElementById("lb-img").src=t.images[m]}),(y=document.getElementById("lb-next"))==null||y.addEventListener("click",()=>{m=(m+1)%t.images.length,document.getElementById("lb-img").src=t.images[m]}),(z=document.getElementById("wishlist-btn"))==null||z.addEventListener("click",()=>{const u=document.getElementById("wishlist-btn"),v=be(i);u.textContent=v?"❤️ Saved":"🤍 Save",g(v?"Added to Wishlist!":"Removed from Wishlist")}),setTimeout(()=>{const u=document.getElementById("stay-map");if(!u||u._leaflet_id)return;const v=L.map("stay-map").setView([t.lat,t.lng],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(v),L.marker([t.lat,t.lng]).addTo(v).bindPopup(`<b>${t.name}</b>`).openPopup()},100),(I=document.getElementById("write-review-btn"))==null||I.addEventListener("click",()=>{if(!_()){g("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(M=document.getElementById("submit-review-btn"))==null||M.addEventListener("click",()=>{var E,$,S;const u=parseInt(((E=document.querySelector('input[name="rating"]:checked'))==null?void 0:E.value)||0),v=(S=($=document.getElementById("review-text"))==null?void 0:$.value)==null?void 0:S.trim();if(!u||!v){g("Please fill all fields","","error");return}const w=P();fe({listingId:i,rating:u,text:v,userName:w.fullName||w.name,userAvatar:w.avatar}),g("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden"),document.getElementById("reviews-list").innerHTML=Z(i).map(C=>ie(C)).join("")})}function ie(i){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${i.userAvatar||((e=i.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${i.userName}</div>
          <div class="review-date">${new Date(i.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${T(i.rating)}</div>
      </div>
      <p class="review-text">${i.text}</p>
      <span class="verified-badge">✅ Verified Guest</span>
    </div>
  `}function rt(i){return[{userName:"Priya Sharma",userAvatar:"P",rating:5,text:"Absolutely magical experience! The host was so welcoming and the views were breathtaking. Will definitely come back.",createdAt:"2026-01-15T00:00:00Z"},{userName:"Rahul Das",userAvatar:"R",rating:4,text:"Beautiful location and authentic Mizo food. A bit remote but that's the charm! Highly recommended for nature lovers.",createdAt:"2026-02-20T00:00:00Z"}].map(t=>ie(t)).join("")}const oe=[{id:"guide-zova",name:"Zova Lalchhuanawma",avatar:"ZL",title:"Expert Trekking & Wildlife Guide",experience:"10 years",languages:["English","Mizo","Hindi"],specialties:["Phawngpui Trek","Wildlife Spotting","Bird Watching","Photography Tours"],rating:4.9,reviews:88,price:1,priceUnit:"per day",location:"Aizawl (covers all districts)",phone:"+91 98765 11111",email:"zova.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",images:["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"],bio:"Born and raised in the highlands of Mizoram, Zova has led over 300 trekking expeditions across the Lushai Hills. He's passionate about protecting Mizoram's biodiversity and sharing it with travellers. A certified wilderness first responder and birding enthusiast.",certifications:["First Aid Certified","Wildlife Institute of India","Ministry of Tourism Certified"],verified:!0,available:!0,tags:["trekking","wildlife","birding"]},{id:"guide-mary",name:"Mary Vanlalruati",avatar:"MV",title:"Cultural & Heritage Tour Guide",experience:"7 years",languages:["English","Mizo","Hindi","Bengali"],specialties:["Aizawl City Tours","Mizo Culture","Traditional Weaving","Village Walks"],rating:4.8,reviews:62,price:1200,priceUnit:"per day",location:"Aizawl",phone:"+91 87654 22222",email:"mary.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",images:["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80","https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],bio:"Mary holds a Master's degree in Mizo history and has been sharing her culture with visitors for 7 years. She can take you deep into the soul of Mizo traditions — from bamboo weaving to traditional music, from ancient rituals to modern Aizawl.",certifications:["Ministry of Tourism Certified","Heritage Interpreter (INTACH)"],verified:!0,available:!0,tags:["culture","heritage","city-tour"]},{id:"guide-rema",name:"Rema Chhakchhuak",avatar:"RC",title:"Adventure Sports & River Guide",experience:"5 years",languages:["English","Mizo"],specialties:["River Kayaking","Rappelling","Jungle Camping","Night Trekking"],rating:4.7,reviews:41,price:1800,priceUnit:"per day",location:"Serchhip / South Mizoram",phone:"+91 76543 33333",email:"rema.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",images:["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80","https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"],bio:"Rema is the go-to guide for adrenaline seekers in Mizoram. He specialises in river kayaking on the pristine Tuipui and Tlawng rivers, rappelling near Vantawng Falls, and multi-day jungle camping expeditions.",certifications:["Swift Water Rescue Certified","Wilderness First Aid","Adventure Tourism Certified"],verified:!0,available:!0,tags:["adventure","kayaking","camping"]}],ne=[{id:"transport-raj",name:"Raj Mizoram Travels",owner:"Rajesh Chhakchhuak",avatar:"RC",type:"Car & SUV Rental",vehicles:[{name:"Toyota Innova Crysta",capacity:7,price:3500,priceUnit:"per day (fuel incl.)"},{name:"Maruti Ertiga",capacity:7,price:2500,priceUnit:"per day (fuel incl.)"},{name:"Mahindra Bolero",capacity:9,price:3e3,priceUnit:"per day (fuel incl.)"}],rating:4.8,reviews:76,phone:"+91 98765 44444",email:"raj.travels@lushaitrips.com",location:"Aizawl (airport pickup available)",coverImage:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",images:["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80"],description:"Raj Mizoram Travels offers reliable, comfortable transport across Mizoram's mountain roads with experienced local drivers who know every route. Airport pickup, multi-day hire, and custom itinerary drops available.",features:["Airport Pickup","AC Vehicles","Experienced Drivers","Night Driving","All Districts"],verified:!0,available:!0},{id:"transport-zara",name:"Zara Mountain Bikes",owner:"Zaramsanga Colney",avatar:"ZC",type:"Motorcycle & Bike Rental",vehicles:[{name:"Royal Enfield Himalayan",capacity:2,price:1800,priceUnit:"per day"},{name:"Honda CB350",capacity:2,price:1400,priceUnit:"per day"},{name:"Mountain Bicycle",capacity:1,price:400,priceUnit:"per day"}],rating:4.6,reviews:38,phone:"+91 87654 55555",email:"zara.bikes@lushaitrips.com",location:"Aizawl",coverImage:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",images:["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80"],description:"Explore Mizoram the way it was meant to be explored — on two wheels. Our fleet of well-maintained Royal Enfields and Honda bikes are ideal for the winding mountain roads of Mizoram. Helmets, riding gear, and maps provided.",features:["Helmets Included","Riding Gear","Route Maps","Breakdown Assistance","Delivery to Hotel"],verified:!0,available:!0},{id:"transport-lal",name:"Lal Shared Sumo Service",owner:"Lalbiakzuala",avatar:"LB",type:"Shared Sumo / Van",vehicles:[{name:"Tata Sumo (Shared)",capacity:10,price:350,priceUnit:"per seat per route"},{name:"Force Traveller Van",capacity:16,price:4500,priceUnit:"per day (private)"}],rating:4.4,reviews:55,phone:"+91 76543 66666",email:"lal.sumo@lushaitrips.com",location:"Aizawl (all major routes)",coverImage:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",images:["https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],description:"Budget-friendly shared Sumo services connect all major towns and tourist spots. Perfect for solo travellers or groups on a budget. Private van hire also available for custom tours and group trips.",features:["Budget Friendly","All Major Routes","Daily Departures","Group Discounts","Private Option"],verified:!0,available:!0}];function ot(){return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">👨‍🏫 Expert Local Guides</div>
        <h1>Hire a Guide</h1>
        <p style="max-width:600px;margin-bottom:32px">Every guide is certified, locally born, and passionately knowledgeable about Mizoram's terrain, culture, and wildlife.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="guides-grid"></div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">🧭</div>
          <h2 style="margin-bottom:12px">Are You a Local Expert?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join LushaiTrips as a certified guide. Share your knowledge of Mizoram's hidden trails, wildlife, and culture.</p>
          <a href="${B("/host-signup-guide")}" class="btn btn-primary btn-lg" data-link>Register as a Guide</a>
        </div>
      </div>
    </section>
  `}function nt(){const i=document.getElementById("guides-grid");i&&(i.innerHTML=oe.map(e=>`
    <div class="card" data-href="/guide/${e.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:240px">
        <img src="${e.coverImage}" alt="${e.name}" loading="lazy" style="object-position:top" />
        ${e.verified?'<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">✅ VERIFIED</div>':""}
        <div class="card-rating">${T(e.rating)} <span>${e.rating} (${e.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${e.name}</h4>
        <div style="font-size:0.85rem;color:var(--emerald-400);font-weight:600;margin-bottom:6px">${e.title}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">📍 ${e.location} &nbsp;•&nbsp; 🗓 ${e.experience}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${e.languages.map(t=>`<span class="tag" style="font-size:0.72rem">🗣 ${t}</span>`).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${e.specialties.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="flex-between">
          <span class="price" style="font-size:1.1rem">₹${e.price.toLocaleString()}<span>/${e.priceUnit.split(" ")[1]}</span></span>
          <span class="btn btn-outline btn-sm">View & Book</span>
        </div>
      </div>
    </div>
  `).join(""),i.querySelectorAll("[data-href]").forEach(e=>e.addEventListener("click",()=>window.router.navigate(e.dataset.href))))}function lt(i){const e=oe.find(t=>t.id===i);return e?`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${e.coverImage}" alt="${e.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${e.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${e.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${T(e.rating)} <strong>${e.rating}</strong> <span style="color:var(--text-muted)">(${e.reviews} reviews)</span></div>
                <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${e.location} &nbsp;•&nbsp; 🗓 ${e.experience} experience</div>
              </div>
            </div>
            <div class="divider-h"></div>
            <h3 style="margin-bottom:12px">About ${e.name}</h3>
            <p style="margin-bottom:24px">${e.bio}</p>
            <h3 style="margin-bottom:16px">🎯 Specialties</h3>
            <div class="amenities-grid" style="margin-bottom:28px">
              ${e.specialties.map(t=>`<div class="amenity-item"><span class="amenity-icon">🏔</span><span class="amenity-label">${t}</span></div>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">🗣 Languages</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
              ${e.languages.map(t=>`<span class="tag">${t}</span>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">📜 Certifications</h3>
            <div style="margin-bottom:32px">
              ${e.certifications.map(t=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--glass-border)"><span style="color:var(--emerald-400)">✅</span><span style="font-size:0.9rem;color:var(--text-muted)">${t}</span></div>`).join("")}
            </div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
              <h4 style="margin-bottom:16px">📸 Gallery</h4>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
                ${e.images.slice(1).map((t,a)=>`<img src="${t}" alt="${e.name} ${a+2}" style="width:100%;height:130px;object-fit:cover;border-radius:var(--radius-sm)" />`).join("")}
              </div>
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div class="booking-price"><span class="price" style="font-size:1.6rem">₹${e.price.toLocaleString()}</span><span style="color:var(--text-muted)">/${e.priceUnit}</span></div>
              <div class="form-group mt-16"><label class="form-label">Select Date</label><input type="date" class="form-input" id="guide-date" /></div>
              <div class="form-group"><label class="form-label">Trip Type</label>
                <select class="form-select" id="guide-trip">
                  ${e.specialties.map(t=>`<option>${t}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Group Size</label>
                <select class="form-select" id="guide-group">
                  ${[1,2,3,4,5,6].map(t=>`<option value="${t}">${t} person${t>1?"s":""}</option>`).join("")}
                </select>
              </div>
              <button class="btn btn-primary w-full" id="book-guide-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Guide →</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">🔒 Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${e.phone}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">📧 ${e.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `:'<div class="page-hero container"><h1>Guide not found</h1></div>'}function dt(i){var o;const e=oe.find(s=>s.id===i);if(!e)return;const t=new Date().toISOString().split("T")[0],a=document.getElementById("guide-date");a&&(a.value=t),(o=document.getElementById("book-guide-btn"))==null||o.addEventListener("click",()=>{var d;const s=(d=document.getElementById("guide-date"))==null?void 0:d.value,r=e.price;window.router.navigate(`/book/guide-${i}?date=${s}&total=${r}&type=guide&name=${encodeURIComponent(e.name)}`)})}function ct(){return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🚗 Get Around Mizoram</div>
        <h1>Book Transport</h1>
        <p style="max-width:600px;margin-bottom:32px">From airport pickups to multi-day SUV hire and Royal Enfield adventures — we've got every journey covered.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="transport-grid"></div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">🚌</div>
          <h2 style="margin-bottom:12px">Have a Vehicle to List?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join our transport network and earn by connecting travellers with reliable rides across Mizoram.</p>
          <a href="${B("/host-signup-transport")}" class="btn btn-primary btn-lg" data-link>List Your Transport</a>
        </div>
      </div>
    </section>
  `}function pt(){const i=document.getElementById("transport-grid");i&&(i.innerHTML=ne.map(e=>`
    <div class="card" data-href="/transport/${e.id}" style="cursor:pointer">
      <div class="card-img-wrap">
        <img src="${e.coverImage}" alt="${e.name}" loading="lazy" />
        <div class="card-badge">${e.type.toUpperCase()}</div>
        <div class="card-rating">${T(e.rating)} <span>${e.rating} (${e.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${e.name}</h4>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">👤 ${e.owner} &nbsp;•&nbsp; 📍 ${e.location}</div>
        <div style="margin-bottom:14px">
          ${e.vehicles.slice(0,2).map(t=>`
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--glass-border)">
              <span style="color:var(--text-muted)">🚗 ${t.name}</span>
              <span style="color:var(--emerald-400);font-weight:600">₹${t.price.toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${e.features.slice(0,3).map(t=>`<span class="tag" style="font-size:0.72rem">${t}</span>`).join("")}
        </div>
        <span class="btn btn-outline btn-sm w-full" style="justify-content:center">View & Book</span>
      </div>
    </div>
  `).join(""),i.querySelectorAll("[data-href]").forEach(e=>e.addEventListener("click",()=>window.router.navigate(e.dataset.href))))}function mt(i){const e=ne.find(t=>t.id===i);return e?`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${e.name}</h1>
                ${e.verified?'<span style="color:var(--emerald-400);font-size:0.85rem">✅ Verified Provider</span>':""}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${T(e.rating)} <strong>${e.rating}</strong> <span style="color:var(--text-muted)">(${e.reviews} reviews)</span></div>
              <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${e.location} &nbsp;•&nbsp; 👤 ${e.owner}</div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;border-radius:var(--radius);overflow:hidden">
              ${e.images.map((t,a)=>`<img src="${t}" alt="${e.name}" style="width:100%;height:180px;object-fit:cover;${a===0?"grid-column:1/3;height:260px":""}" loading="lazy" />`).join("")}
            </div>

            <h3 style="margin-bottom:12px">About this Service</h3>
            <p style="margin-bottom:28px">${e.description}</p>

            <h3 style="margin-bottom:16px">🚗 Available Vehicles</h3>
            <div style="margin-bottom:32px">
              ${e.vehicles.map(t=>`
                <div class="card card-body" style="margin-bottom:12px;padding:20px">
                  <div class="flex-between">
                    <div>
                      <div style="font-weight:700;margin-bottom:4px">${t.name}</div>
                      <div style="font-size:0.85rem;color:var(--text-muted)">👥 Up to ${t.capacity} passengers</div>
                    </div>
                    <div style="text-align:right">
                      <div class="price" style="font-size:1.1rem">₹${t.price.toLocaleString()}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted)">${t.priceUnit}</div>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

            <h3 style="margin-bottom:16px">✨ Features</h3>
            <div class="amenities-grid">
              ${e.features.map(t=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${t}</span></div>`).join("")}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:4px">Book Transport</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">Select vehicle and dates</div>
              <div class="form-group">
                <label class="form-label">Vehicle</label>
                <select class="form-select" id="vehicle-select">
                  ${e.vehicles.map(t=>`<option value="${t.price}">${t.name} — ₹${t.price.toLocaleString()} ${t.priceUnit}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Pickup Date</label><input type="date" class="form-input" id="pickup-date" /></div>
              <div class="form-group"><label class="form-label">Drop-off Date</label><input type="date" class="form-input" id="dropoff-date" /></div>
              <div class="form-group"><label class="form-label">Pickup Location</label><input type="text" class="form-input" id="pickup-loc" placeholder="e.g. Aizawl Airport" /></div>
              <div id="transport-total" style="background:var(--glass);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;font-size:0.9rem;color:var(--text-muted)">Select vehicle and dates to see total</div>
              <button class="btn btn-primary w-full" id="book-transport-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Now →</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">🔒 Razorpay Secured</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${e.phone}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">📧 ${e.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `:'<div class="page-hero container"><h1>Not found</h1></div>'}function ut(i){var r;const e=ne.find(d=>d.id===i);if(!e)return;const t=new Date,a=new Date(t);a.setDate(a.getDate()+1);const o=d=>d.toISOString().split("T")[0];document.getElementById("pickup-date").value=o(t),document.getElementById("dropoff-date").value=o(a);const s=()=>{var x,b,y;const d=parseInt(((x=document.getElementById("vehicle-select"))==null?void 0:x.value)||0),n=new Date((b=document.getElementById("pickup-date"))==null?void 0:b.value),c=new Date((y=document.getElementById("dropoff-date"))==null?void 0:y.value),p=Math.max(1,Math.round((c-n)/864e5)),m=d*p,h=document.getElementById("transport-total");return h&&(h.innerHTML=`<div class="flex-between"><span>₹${d.toLocaleString()} × ${p} day${p>1?"s":""}</span><strong style="color:var(--text)">₹${m.toLocaleString()}</strong></div>`),m};s(),["vehicle-select","pickup-date","dropoff-date"].forEach(d=>{var n;return(n=document.getElementById(d))==null?void 0:n.addEventListener("change",s)}),(r=document.getElementById("book-transport-btn"))==null||r.addEventListener("click",()=>{const d=s();window.router.navigate(`/book/${i}?total=${d}&type=transport&name=${encodeURIComponent(e.name)}`)})}const gt="rzp_test_SXRQlAUuikOAUn";function vt(i,e){var m,h,x,b;const t=e.get("checkin")||"",a=e.get("checkout")||"",o=e.get("guests")||"1",s=parseInt(e.get("total")||2e3),r=e.get("type")||"stay",d=e.get("name")?decodeURIComponent(e.get("name")):"",c=j.find(y=>y.id===i)||{name:d||i,coverImage:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",type:r},p=t&&a?Math.max(1,Math.round((new Date(a)-new Date(t))/864e5)):1;return`
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <h1 style="font-size:clamp(1.5rem,3vw,2.2rem)">Complete Your Booking</h1>
        <p style="color:var(--text-muted)">You're almost there — secure your trip now.</p>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 400px;gap:40px;align-items:start">
          <!-- Left: Payment form -->
          <div>
            ${_()?"":`
              <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px">⚠️ Login Required</div>
                <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px">Please log in to complete your booking.</div>
                <a href="${B("/login")}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
              </div>
            `}

            

            <h3 style="margin-bottom:20px">Your Information</h3>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="pay-name" placeholder="Your full name" value="${((m=P())==null?void 0:m.fullName)||((h=P())==null?void 0:h.name)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="pay-email" placeholder="email@example.com" value="${((x=P())==null?void 0:x.email)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="pay-phone" placeholder="+91 98765 43210" value="${((b=P())==null?void 0:b.phone)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Special Requests</label>
                <input type="text" class="form-input" id="pay-notes" placeholder="e.g. early check-in, dietary needs" />
              </div>
            </div>

            <div class="divider-h"></div>
            <h3 style="margin-bottom:16px">Payment Method</h3>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px;margin-bottom:28px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <span style="font-size:1.5rem">🔒</span>
                <div>
                  <div style="font-weight:700">Secure Payment via Razorpay</div>
                  <div style="font-size:0.85rem;color:var(--text-muted)">Your payment info is never stored on our servers</div>
                </div>
              </div>
              <div style="display:flex;gap:16px;flex-wrap:wrap">
                ${["UPI / GPay / PhonePe","Debit / Credit Card","Net Banking","Wallets"].map(y=>`<div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">✓</span>${y}</div>`).join("")}
              </div>
            </div>

            <button class="btn btn-primary btn-lg w-full" id="pay-btn" style="justify-content:center;font-size:1.1rem" ${_()?"":'disabled style="opacity:0.5;cursor:not-allowed;justify-content:center;font-size:1.1rem"'}>
              ${`🔒 Pay ₹${s.toLocaleString()} with Razorpay`}
            </button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:10px">By booking, you agree to our Terms & Conditions and Cancellation Policy.</p>
          </div>

          <!-- Right: Summary card -->
          <div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-lg);overflow:hidden;position:sticky;top:100px">
              <img src="${c.coverImage}" alt="${c.name}" style="width:100%;height:200px;object-fit:cover" />
              <div style="padding:24px">
                <div style="font-size:0.75rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">${c.type||"Stay"}</div>
                <h4 style="margin-bottom:8px">${c.name}</h4>
                ${t?`
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">📅 ${new Date(t+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short"})} → ${new Date(a+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px">👥 ${o} guest${o>1?"s":""} · ${p} night${p>1?"s":""}</div>
                `:""}
                <div class="divider-h" style="margin:16px 0"></div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Subtotal</span><span>₹${Math.round(s/1.05).toLocaleString()}</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Service fee (5%)</span><span>₹${Math.round(s-s/1.05).toLocaleString()}</span>
                </div>
                <div class="divider-h" style="margin:12px 0"></div>
                <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.1rem">
                  <span>Total</span><span class="text-emerald">₹${s.toLocaleString()}</span>
                </div>
                <div style="margin-top:12px;font-size:0.8rem;color:var(--text-muted);text-align:center">🛡 Free cancellation within 24 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function ht(i,e){var c;const t=parseInt(e.get("total")||2e3),a=e.get("checkin")||"",o=e.get("checkout")||"",s=e.get("guests")||"1",r=e.get("type")||"stay",d=e.get("name")?decodeURIComponent(e.get("name")):i,n=j.find(p=>p.id===i);(c=document.getElementById("pay-btn"))==null||c.addEventListener("click",()=>{var z,I,M,u,v,w,E;if(!_()){g("Please log in first","","error");return}const p=(I=(z=document.getElementById("pay-name"))==null?void 0:z.value)==null?void 0:I.trim(),m=(u=(M=document.getElementById("pay-email"))==null?void 0:M.value)==null?void 0:u.trim(),h=(w=(v=document.getElementById("pay-phone"))==null?void 0:v.value)==null?void 0:w.trim();if(!p||!m||!h){g("Please fill all fields","","error");return}const b={userId:P().id,listingId:i,listingName:(n==null?void 0:n.name)||d,listingType:r,checkin:a,checkout:o,guests:s,total:t,guestName:p,guestEmail:m,guestPhone:h,notes:((E=document.getElementById("pay-notes"))==null?void 0:E.value)||""},y={key:gt,amount:t*100,currency:"INR",name:"LushaiTrips",description:(n==null?void 0:n.name)||d,image:"https://via.placeholder.com/100x100/065f46/ffffff?text=LT",prefill:{name:p,email:m,contact:h},theme:{color:"#059669"},handler:function($){const S=Me({...b,razorpayPaymentId:$.razorpay_payment_id});g("Payment Successful! 🎉",`Ref: ${S.id}`),setTimeout(()=>window.router.navigate("/booking-confirmed"),800)},modal:{ondismiss:()=>g("Payment cancelled","","error")}};try{new Razorpay(y).open()}catch{g("Razorpay not loaded","Please check your internet connection","error")}})}function yt(){var t;const i=B,e=Pe();return`
    <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 60px">
      <div style="max-width:600px;width:100%;text-align:center">
        <div style="font-size:5rem;margin-bottom:16px;animation:float 2s ease-in-out infinite">✅</div>
        <h1 style="font-size:2.5rem;margin-bottom:12px;background:linear-gradient(135deg,var(--emerald-400),var(--amber-400));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Booking Confirmed!</h1>
        <p style="font-size:1.1rem;color:var(--text-muted);margin-bottom:32px">Your Mizoram adventure is locked in. Get ready for an unforgettable experience. 🌄</p>

        ${e?`
          <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-xl);padding:32px;margin-bottom:32px;text-align:left">
            <div style="font-size:0.75rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px">Booking Details</div>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem"><span style="color:var(--text-muted)">Booking ID</span><strong style="color:var(--emerald-400)">${e.id}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem"><span style="color:var(--text-muted)">Property</span><strong>${e.listingName}</strong></div>
            ${e.checkin?`<div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem"><span style="color:var(--text-muted)">Check-in</span><strong>${new Date(e.checkin+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"long"})}</strong></div>`:""}
            ${e.checkout?`<div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem"><span style="color:var(--text-muted)">Check-out</span><strong>${new Date(e.checkout+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"long"})}</strong></div>`:""}
            ${e.guests?`<div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem"><span style="color:var(--text-muted)">Guests</span><strong>${e.guests}</strong></div>`:""}
            <div style="height:1px;background:var(--glass-border);margin:16px 0"></div>
            <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:800"><span>Total Paid</span><span style="color:var(--emerald-400)">₹${(t=e.total)==null?void 0:t.toLocaleString()}</span></div>
          </div>
        `:""}

        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:20px;margin-bottom:32px;text-align:left">
          <div style="font-weight:700;margin-bottom:12px">📋 What happens next?</div>
          ${["📧 Confirmation sent to your email","📞 Host will contact you within 24 hours","🗺️ Your itinerary is ready in My Bookings","⭐ After your stay, leave a review to help others"].map(a=>`<div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">${a}</div>`).join("")}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="${i("/profile")}" class="btn btn-primary btn-lg" data-link>View My Bookings</a>
          <a href="${i("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore More</a>
        </div>
      </div>
    </div>
  `}function ft(){}function bt(){return`
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub">Log in to manage your bookings and trips</p>

        <button class="social-btn" id="google-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div class="divider"><span>or continue with email</span></div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="login-email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="login-password" placeholder="••••••••" />
        </div>

        <div style="text-align:right;margin-bottom:20px">
          <a href="#" style="font-size:0.85rem;color:var(--emerald-400)">Forgot password?</a>
        </div>

        <button class="btn btn-primary w-full" id="login-btn" style="justify-content:center;padding:14px">Log In</button>

        <div class="auth-switch mt-16">Don't have an account? <a href="${B("/signup-user")}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${B("/host-signup-stay")}" data-link>Register your property →</a></div>
      </div>
    </div>
  `}function xt(){var i,e,t;(i=document.getElementById("login-btn"))==null||i.addEventListener("click",()=>{var s,r,d;const a=(r=(s=document.getElementById("login-email"))==null?void 0:s.value)==null?void 0:r.trim(),o=(d=document.getElementById("login-password"))==null?void 0:d.value;if(!a||!o){g("Please fill all fields","","error");return}try{Te(a,o),g("Welcome back! 👋"),setTimeout(()=>window.router.navigate("/"),500)}catch(n){g(n.message,"","error")}}),(e=document.getElementById("login-password"))==null||e.addEventListener("keydown",a=>{var o;a.key==="Enter"&&((o=document.getElementById("login-btn"))==null||o.click())}),(t=document.getElementById("google-btn"))==null||t.addEventListener("click",()=>{g("Google login coming soon!","Use email login for now.")})}function wt(){return`
    <div class="auth-page">
      <div class="auth-card" style="max-width:520px">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-sub">Join thousands exploring Mizoram's hidden gems</p>

        <button class="social-btn" id="google-signup-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Sign up with Google
        </button>
        <button class="social-btn" id="phone-signup-btn">📱 Sign up with Phone OTP</button>

        <div class="divider"><span>or sign up with email</span></div>

        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="su-name" placeholder="Jane Doe" />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-input" id="su-phone" placeholder="+91 98765 43210" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" id="su-email" placeholder="you@example.com" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="su-password" placeholder="Min 8 characters" />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" id="su-confirm" placeholder="Repeat password" />
          </div>
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;margin-bottom:20px;font-size:0.8rem;color:var(--text-muted)">
          By signing up, you agree to our <a href="#" style="color:var(--emerald-400)">Terms of Service</a> and <a href="#" style="color:var(--emerald-400)">Privacy Policy</a>.
        </div>

        <button class="btn btn-primary w-full" id="signup-btn" style="justify-content:center;padding:14px">Create Account 🎲</button>
        <div class="auth-switch mt-16">Already have an account? <a href="${B("/login")}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${B("/host-signup-stay")}" data-link>Register as Host →</a></div>
      </div>
    </div>
  `}function kt(){var i,e,t;(i=document.getElementById("signup-btn"))==null||i.addEventListener("click",()=>{var n,c,p,m,h,x,b,y;const a=(c=(n=document.getElementById("su-name"))==null?void 0:n.value)==null?void 0:c.trim(),o=(m=(p=document.getElementById("su-email"))==null?void 0:p.value)==null?void 0:m.trim(),s=(x=(h=document.getElementById("su-phone"))==null?void 0:h.value)==null?void 0:x.trim(),r=(b=document.getElementById("su-password"))==null?void 0:b.value,d=(y=document.getElementById("su-confirm"))==null?void 0:y.value;if(!a||!o||!s||!r){g("Please fill all fields","","error");return}if(r!==d){g("Passwords do not match","","error");return}if(r.length<8){g("Password must be at least 8 characters","","error");return}try{Be({fullName:a,email:o,phone:s,password:r}),g("Account created! Welcome 🎉"),setTimeout(()=>window.router.navigate("/discover"),600)}catch(z){g(z.message,"","error")}}),(e=document.getElementById("google-signup-btn"))==null||e.addEventListener("click",()=>g("Google signup coming soon!")),(t=document.getElementById("phone-signup-btn"))==null||t.addEventListener("click",()=>g("OTP signup coming soon!"))}let A=1;const W=5,l={};let H=[];const $t=["Basic Info","Property","Stay Details","Photos","Rules & Submit"];function Lt(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:700px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Property</h2>
          <p style="color:var(--text-muted)">Join our trusted network of Mizoram hosts</p>
        </div>

        <!-- Stepper -->
        <div class="stepper" id="stepper">${$e()}</div>

        <!-- Steps -->
        <div class="card card-body" style="padding:40px" id="step-container">
          ${Le(1)}
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:24px">
          <button class="btn btn-secondary" id="prev-btn" style="${A===1?"visibility:hidden":""}">← Back</button>
          <div style="color:var(--text-dim);font-size:0.85rem;align-self:center">Step ${A} of ${W}</div>
          <button class="btn btn-primary" id="next-btn">${A===W?"🚀 Submit Listing":"Next →"}</button>
        </div>
      </div>
    </div>
  `}function $e(){return Array.from({length:W},(i,e)=>{const t=e+1;return`
      <div class="step ${t<A?"done":t===A?"active":""}">
        <div class="step-wrapper">
          <div class="step-circle">${t<A?"✓":t}</div>
          <div class="step-label">${$t[e]}</div>
        </div>
      </div>
      ${t<W?'<div class="step-line"></div>':""}
    `}).join("")}function Le(i){switch(i){case 1:return`
      <h3 style="margin-bottom:24px">👤 Step 1: Basic Information</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Your Full Name *</label><input type="text" class="form-input" id="h-name" placeholder="E.g. Liana Hnamte" value="${l.name||""}" /></div>
        <div class="form-group"><label class="form-label">Phone Number *</label><input type="tel" class="form-input" id="h-phone" placeholder="+91 98765 43210" value="${l.phone||""}" /></div>
      </div>
      <div class="form-group"><label class="form-label">Email Address *</label><input type="email" class="form-input" id="h-email" placeholder="you@example.com" value="${l.email||""}" /></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="h-password" placeholder="Min 8 characters" /></div>
        <div class="form-group"><label class="form-label">Confirm Password *</label><input type="password" class="form-input" id="h-confirm" placeholder="Repeat password" /></div>
      </div>
      </div>`;case 2:return`
      <h3 style="margin-bottom:24px">🏠 Step 2: Property Information</h3>
      <div class="form-group"><label class="form-label">Property Name *</label><input type="text" class="form-input" id="h-prop-name" placeholder="E.g. Bamboo Haven Homestay" value="${l.propName||""}" /></div>
      <div class="form-group">
        <label class="form-label">Property Type *</label>
        <div class="check-group" id="prop-type-group">
          ${["Homestay","Hotel","Camping","Lodge","Farmstay","Guesthouse"].map(e=>`
            <label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:8px">
              <input type="radio" name="prop-type" value="${e}" ${l.propType===e?"checked":""} style="accent-color:var(--emerald-500)" />
              ${e}
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group"><label class="form-label">Full Address *</label><textarea class="form-textarea" id="h-address" placeholder="Village, District, PIN code" style="min-height:80px">${l.address||""}</textarea></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">District *</label>
          <select class="form-select" id="h-district">
            <option value="">Select District</option>
            ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip","Saitual","Hnahthial","Khawzawl"].map(e=>`<option ${l.district===e?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Google Maps Link <span style="font-size:0.8rem;color:var(--text-dim)">(optional)</span></label><input type="url" class="form-input" id="h-maps" placeholder="https://maps.google.com/..." value="${l.mapsLink||""}" /></div>
      </div>`;case 3:return`
      <h3 style="margin-bottom:24px">🛏️ Step 3: Stay Details</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Number of Rooms *</label><input type="number" class="form-input" id="h-rooms" min="1" max="50" placeholder="e.g. 3" value="${l.rooms||""}" /></div>
        <div class="form-group"><label class="form-label">Max Guests *</label><input type="number" class="form-input" id="h-guests" min="1" max="50" placeholder="e.g. 6" value="${l.maxGuests||""}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">Price per Night (₹) *</label>
        <input type="number" class="form-input" id="h-price" min="500" placeholder="e.g. 2000" value="${l.price||""}" />
        <span class="form-hint">Platform takes 10% commission. You receive 90%.</span>
      </div>
      <div class="form-group">
        <label class="form-label">Amenities</label>
        <div class="check-group" style="flex-wrap:wrap">
          ${["WiFi","Parking","Home-cooked Food","Breakfast Included","Hot Water","Valley View","Bonfire","AC","Private Bathroom","Kitchen Access","Laundry","Waterfall View","Farm Access","Stargazing"].map(e=>`
            <label class="check-item">
              <input type="checkbox" name="amenity" value="${e}" ${(l.amenities||[]).includes(e)?"checked":""} />
              <label>${e}</label>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">About Your Place *</label>
        <textarea class="form-textarea" id="h-description" placeholder="Describe what makes your place special — views, atmosphere, what guests will love…" style="min-height:140px">${l.description||""}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Nearby Attractions</label>
        <input type="text" class="form-input" id="h-nearby" placeholder="e.g. Vantawng Falls (2 km), Thenzawl market" value="${l.nearby||""}" />
      </div>`;case 4:return`
      <h3 style="margin-bottom:8px">📸 Step 4: Photos</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem">High-quality photos get 3× more bookings. Minimum 3 photos required. First photo will be your cover image.</p>
      <div class="upload-zone" id="photo-upload-zone" onclick="document.getElementById('photo-input').click()">
        <div style="font-size:2.5rem;margin-bottom:12px">📷</div>
        <div style="font-weight:700;margin-bottom:6px">Upload Property Photos</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">JPG or PNG • Max 5MB each • Minimum 3 required</div>
        <div style="font-size:0.8rem;color:var(--emerald-400)">💡 Include: exterior, bedroom, bathroom, view, dining area</div>
        <input type="file" id="photo-input" multiple accept="image/*" style="display:none" />
      </div>
      <div class="upload-preview" id="photo-preview" style="margin-top:16px"></div>
      <div id="photo-count" style="margin-top:10px;font-size:0.85rem;color:var(--text-muted)">${H.length>0?H.length+" photo(s) uploaded":"No photos uploaded yet"}</div>`;case 5:return`
      <h3 style="margin-bottom:24px">📜 Step 5: Rules & Submission</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Check-in Time *</label><input type="time" class="form-input" id="h-checkin" value="${l.checkIn||"14:00"}" /></div>
        <div class="form-group"><label class="form-label">Check-out Time *</label><input type="time" class="form-input" id="h-checkout" value="${l.checkOut||"11:00"}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">House Rules</label>
        <textarea class="form-textarea" id="h-rules" placeholder="e.g. No smoking inside&#10;Quiet hours after 10 PM&#10;No outside guests after 9 PM&#10;Pets on request" style="min-height:120px">${l.rules||""}</textarea>
        <span class="form-hint">One rule per line</span>
      </div>
      <div class="form-group">
        <label class="form-label">Cancellation Policy</label>
        <select class="form-select" id="h-cancel">
          <option value="flexible" ${l.cancellation==="flexible"?"selected":""}>Flexible — Full refund 24 hours before</option>
          <option value="moderate" ${l.cancellation==="moderate"?"selected":""}>Moderate — Full refund 5 days before</option>
          <option value="strict" ${l.cancellation==="strict"?"selected":""}>Strict — 50% refund up to 1 week before</option>
        </select>
      </div>
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px;margin-bottom:20px">
        <div style="font-weight:700;margin-bottom:12px">✅ What happens after submission?</div>
        ${["Our team reviews your listing within 24–48 hours","We verify your ID and property photos","Once approved, your listing goes live on LushaiTrips","You receive 90% of every booking directly to your account"].map(e=>`<div style="display:flex;gap:10px;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">→</span>${e}</div>`).join("")}
      </div>
      <label class="check-item" style="margin-bottom:20px">
        <input type="checkbox" id="h-agree" />
        <label style="font-size:0.9rem">I agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Host Terms & Conditions</a> and confirm all information is accurate.</label>
      </label>`}}function zt(i){var e,t,a,o,s,r,d,n,c,p,m,h,x,b,y,z,I,M,u,v,w,E,$,S,C,R,q,D,F;switch(i){case 1:l.name=(t=(e=document.getElementById("h-name"))==null?void 0:e.value)==null?void 0:t.trim(),l.email=(o=(a=document.getElementById("h-email"))==null?void 0:a.value)==null?void 0:o.trim(),l.phone=(r=(s=document.getElementById("h-phone"))==null?void 0:s.value)==null?void 0:r.trim(),l.password=(d=document.getElementById("h-password"))==null?void 0:d.value;const Y=(n=document.getElementById("h-confirm"))==null?void 0:n.value;return!l.name||!l.email||!l.phone||!l.password?(g("Please fill all required fields","","error"),!1):l.password!==Y?(g("Passwords do not match","","error"),!1):l.password.length<8?(g("Password must be 8+ characters","","error"),!1):!0;case 2:return l.propName=(p=(c=document.getElementById("h-prop-name"))==null?void 0:c.value)==null?void 0:p.trim(),l.propType=(m=document.querySelector('input[name="prop-type"]:checked'))==null?void 0:m.value,l.address=(x=(h=document.getElementById("h-address"))==null?void 0:h.value)==null?void 0:x.trim(),l.district=(b=document.getElementById("h-district"))==null?void 0:b.value,l.mapsLink=(z=(y=document.getElementById("h-maps"))==null?void 0:y.value)==null?void 0:z.trim(),!l.propName||!l.propType||!l.address||!l.district?(g("Please fill all required fields","","error"),!1):!0;case 3:return l.rooms=(I=document.getElementById("h-rooms"))==null?void 0:I.value,l.maxGuests=(M=document.getElementById("h-guests"))==null?void 0:M.value,l.price=(u=document.getElementById("h-price"))==null?void 0:u.value,l.amenities=[...document.querySelectorAll('input[name="amenity"]:checked')].map(G=>G.value),l.description=(w=(v=document.getElementById("h-description"))==null?void 0:v.value)==null?void 0:w.trim(),l.nearby=($=(E=document.getElementById("h-nearby"))==null?void 0:E.value)==null?void 0:$.trim(),!l.rooms||!l.maxGuests||!l.price||!l.description?(g("Please fill all required fields","","error"),!1):!0;case 4:return H.length<3?(g("Please upload at least 3 photos","","error"),!1):(l.images=H,!0);case 5:return l.checkIn=(S=document.getElementById("h-checkin"))==null?void 0:S.value,l.checkOut=(C=document.getElementById("h-checkout"))==null?void 0:C.value,l.rules=(q=(R=document.getElementById("h-rules"))==null?void 0:R.value)==null?void 0:q.trim(),l.cancellation=(D=document.getElementById("h-cancel"))==null?void 0:D.value,(F=document.getElementById("h-agree"))!=null&&F.checked?!0:(g("Please agree to Terms & Conditions","","error"),!1)}}function ue(i){A=i,document.getElementById("stepper").innerHTML=$e(),document.getElementById("step-container").innerHTML=Le(i),document.getElementById("prev-btn").style.visibility=i===1?"hidden":"visible",document.getElementById("next-btn").textContent=i===W?"🚀 Submit Listing":"Next →",ze(i),window.scrollTo({top:0,behavior:"smooth"})}function ze(i){var e;i===4&&((e=document.getElementById("photo-input"))==null||e.addEventListener("change",t=>{[...t.target.files].forEach(o=>{const s=new FileReader;s.onload=r=>{var m;H.push(r.target.result);const d=document.getElementById("photo-preview"),n=document.getElementById("photo-count"),c=document.createElement("div");c.className="upload-img-wrap";const p=H.length-1;c.innerHTML=`<img src="${r.target.result}" alt="upload" />${p===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img" data-idx="${p}">✕</button>`,d==null||d.appendChild(c),n&&(n.textContent=H.length+" photo(s) uploaded"),(m=c.querySelector(".remove-img"))==null||m.addEventListener("click",h=>{H.splice(p,1),c.remove(),n&&(n.textContent=H.length+" photo(s) uploaded")})},s.readAsDataURL(o)})}))}function Ee(){var i,e;H=[],ze(1),(i=document.getElementById("next-btn"))==null||i.addEventListener("click",()=>{var t,a;zt(A)&&(A===W?Et():(ue(A+1),(t=document.getElementById("next-btn"))==null||t.addEventListener("click",()=>{}),(a=document.getElementById("prev-btn"))==null||a.addEventListener("click",()=>{}),Ee()))}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{A>1&&ue(A-1)})}function Et(){var i,e;try{se({name:l.name,email:l.email,phone:l.phone,password:l.password,avatar:(i=l.name)==null?void 0:i.charAt(0).toUpperCase(),listing:{name:l.propName,type:l.propType,address:l.address,district:l.district,rooms:l.rooms,maxGuests:l.maxGuests,price:l.price,amenities:l.amenities,description:l.description,images:l.images,checkIn:l.checkIn,checkOut:l.checkOut,rules:(e=l.rules)==null?void 0:e.split(`
`).filter(Boolean),cancellation:l.cancellation}}),A=1,H=[],g("Listing submitted for review! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(t){g(t.message,"","error")}}let V=[];function It(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">Register as a Guide</h2>
          <p style="color:var(--text-muted)">Share your knowledge of Mizoram's trails, culture, and wildlife</p>
        </div>

        <div class="card card-body" style="padding:40px">
          <h3 style="margin-bottom:24px">👤 Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="g-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="g-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="g-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="g-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">🧭 Guide Details</h3>

          <div class="form-group"><label class="form-label">Professional Title *</label><input type="text" class="form-input" id="g-title" placeholder="e.g. Expert Trekking & Wildlife Guide" /></div>

          <div class="form-group">
            <label class="form-label">Years of Experience *</label>
            <select class="form-select" id="g-exp">
              <option value="">Select experience</option>
              ${["1 year","2 years","3 years","4 years","5 years","6 years","7 years","8 years","9 years","10+ years"].map(i=>`<option>${i}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Languages Spoken *</label>
            <div class="check-group">
              ${["English","Mizo","Hindi","Bengali","Assamese","Manipuri"].map(i=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-lang" value="${i}" style="accent-color:var(--emerald-500)" />${i}</label>`).join("")}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Specialties * <span style="font-size:0.8rem;color:var(--text-dim)">(select all that apply)</span></label>
            <div class="check-group" style="flex-wrap:wrap">
              ${["Trekking","Bird Watching","Wildlife Spotting","Photography Tours","Village Walks","Cultural Tours","River Kayaking","Night Trekking","Jungle Camping","Cycling Tours","Heritage Walks","Botanical Walks"].map(i=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-spec" value="${i}" style="accent-color:var(--emerald-500)" />${i}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Your Base Location *</label>
            <select class="form-select" id="g-location">
              <option value="">Select district</option>
              ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip","Saitual","Hnahthial","Khawzawl"].map(i=>`<option>${i}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Price per Day (₹) *</label>
            <input type="number" class="form-input" id="g-price" min="500" placeholder="e.g. 1500" />
            <span class="form-hint">Recommended: ₹1,000–₹2,500/day for Mizoram guides</span>
          </div>

          <div class="form-group"><label class="form-label">Bio / About You *</label><textarea class="form-textarea" id="g-bio" placeholder="Tell travelers about yourself — your experience, passion, and what makes you a unique guide…" style="min-height:140px"></textarea></div>

          <div class="form-group">
            <label class="form-label">Certifications <span style="font-size:0.8rem;color:var(--text-dim)">(one per line)</span></label>
            <textarea class="form-textarea" id="g-certs" placeholder="e.g. Ministry of Tourism Certified&#10;First Aid Certified&#10;Wildlife Institute of India" style="min-height:80px"></textarea>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">📸 Profile & Gallery Photos</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:16px">Upload a clear profile photo and photos from your past guiding trips (min 2 photos)</p>
          <div class="upload-zone" onclick="document.getElementById('g-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">📷</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">First photo = profile photo • JPG or PNG</div>
            <input type="file" id="g-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div class="upload-preview" id="g-photo-preview" style="margin-top:12px"></div>

          <label class="check-item" style="margin-bottom:24px">
            <input type="checkbox" id="g-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Guide Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-guide-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Guide Application 🧭</button>
        </div>
      </div>
    </div>
  `}function St(){var i,e;V=[],(i=document.getElementById("g-photos"))==null||i.addEventListener("change",t=>{[...t.target.files].forEach(a=>{const o=new FileReader;o.onload=s=>{var n,c;V.push(s.target.result);const r=document.createElement("div");r.className="upload-img-wrap";const d=V.length-1;r.innerHTML=`<img src="${s.target.result}" alt="upload" />${d===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>':""}<button class="remove-img">✕</button>`,(n=document.getElementById("g-photo-preview"))==null||n.appendChild(r),(c=r.querySelector(".remove-img"))==null||c.addEventListener("click",()=>{V.splice(d,1),r.remove()})},o.readAsDataURL(a)})}),(e=document.getElementById("submit-guide-btn"))==null||e.addEventListener("click",()=>{var b,y,z,I,M,u,v,w,E,$,S,C,R,q,D,F,Y;const t=(y=(b=document.getElementById("g-name"))==null?void 0:b.value)==null?void 0:y.trim(),a=(I=(z=document.getElementById("g-email"))==null?void 0:z.value)==null?void 0:I.trim(),o=(u=(M=document.getElementById("g-phone"))==null?void 0:M.value)==null?void 0:u.trim(),s=(v=document.getElementById("g-password"))==null?void 0:v.value,r=(E=(w=document.getElementById("g-title"))==null?void 0:w.value)==null?void 0:E.trim(),d=(S=($=document.getElementById("g-bio"))==null?void 0:$.value)==null?void 0:S.trim(),n=(C=document.getElementById("g-price"))==null?void 0:C.value,c=(R=document.getElementById("g-location"))==null?void 0:R.value,p=(q=document.getElementById("g-exp"))==null?void 0:q.value,m=[...document.querySelectorAll('input[name="g-lang"]:checked')].map(G=>G.value),h=[...document.querySelectorAll('input[name="g-spec"]:checked')].map(G=>G.value),x=(F=(D=document.getElementById("g-certs"))==null?void 0:D.value)==null?void 0:F.split(`
`).filter(Boolean);if(!t||!a||!o||!s||!r||!d||!n||!c||!p||!m.length||!h.length){g("Please fill all required fields","","error");return}if(!((Y=document.getElementById("g-agree"))!=null&&Y.checked)){g("Please agree to Terms","","error");return}try{se({name:t,email:a,phone:o,password:s,avatar:t.charAt(0).toUpperCase(),listing:{type:"guide",title:r,experience:p,languages:m,specialties:h,price:n,location:c,bio:d,certifications:x,images:V}}),g("Guide application submitted! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(G){g(G.message,"","error")}})}function Bt(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Transport</h2>
          <p style="color:var(--text-muted)">Connect travelers with reliable rides across Mizoram's mountain roads</p>
        </div>

        <div class="card card-body" style="padding:40px">
          <h3 style="margin-bottom:24px">👤 Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="t-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="t-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="t-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="t-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">🚗 Business Details</h3>

          <div class="form-group"><label class="form-label">Business / Service Name *</label><input type="text" class="form-input" id="t-biz" placeholder="e.g. Raj Mizoram Travels" /></div>

          <div class="form-group">
            <label class="form-label">Service Type *</label>
            <div class="check-group">
              ${["Car & SUV Rental","Motorcycle & Bike Rental","Shared Sumo / Van","Private Van Hire","Airport Transfer","Tempo Traveller"].map(i=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="radio" name="t-type" value="${i}" style="accent-color:var(--emerald-500)" />${i}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Base Location *</label>
            <select class="form-select" id="t-location">
              <option value="">Select district</option>
              ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip"].map(i=>`<option>${i}</option>`).join("")}
            </select>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">🚘 Your Vehicles</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:20px">Add details for each vehicle you offer</p>

          <div id="vehicles-container">
            ${Ie(0)}
          </div>
          <button class="btn btn-outline btn-sm" id="add-vehicle-btn" style="margin-bottom:28px">+ Add Another Vehicle</button>

          <div class="form-group">
            <label class="form-label">Features & Services</label>
            <div class="check-group" style="flex-wrap:wrap">
              ${["Airport Pickup","AC Vehicles","Night Driving","Driver Provided","Fuel Included","All Districts","Breakdown Assistance","Child Seats","Helmets Included","Riding Gear","Route Maps","Delivery to Hotel"].map(i=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="t-feat" value="${i}" style="accent-color:var(--emerald-500)" />${i}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Description *</label><textarea class="form-textarea" id="t-desc" placeholder="Describe your service — coverage areas, experience, what makes you reliable…" style="min-height:120px"></textarea></div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">📸 Vehicle Photos</h3>
          <div class="upload-zone" onclick="document.getElementById('t-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">🚗</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Vehicle Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">Min 2 photos — exterior, interior • JPG or PNG</div>
            <input type="file" id="t-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div class="upload-preview" id="t-photo-preview" style="margin-top:12px"></div>

          <div class="divider-h"></div>
          <div class="form-group">
            <label class="form-label">Driving License / RC Book * <span style="font-size:0.8rem;color:var(--text-dim)">(upload document)</span></label>
            <div class="upload-zone" onclick="document.getElementById('t-license').click()" style="padding:20px">
              <div style="font-size:1.5rem;margin-bottom:6px">📄</div>
              <div style="font-size:0.9rem;font-weight:600">Upload License / RC</div>
              <input type="file" id="t-license" accept=".jpg,.png,.pdf" style="display:none" />
            </div>
            <div id="t-license-preview" style="font-size:0.85rem;color:var(--emerald-400);margin-top:6px"></div>
          </div>

          <label class="check-item" style="margin-bottom:24px">
            <input type="checkbox" id="t-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Transport Partner Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-transport-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Transport Listing 🚗</button>
        </div>
      </div>
    </div>
  `}let ge=1;function Ie(i){return`
    <div class="card card-body" style="padding:20px;margin-bottom:16px;${i>0?"position:relative":""}">
      ${i>0?'<button class="remove-img" style="position:absolute;top:12px;right:12px;width:24px;height:24px" onclick="this.parentElement.remove()">✕</button>':""}
      <div style="font-weight:700;margin-bottom:16px;font-size:0.9rem;color:var(--emerald-400)">Vehicle ${i+1}</div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Vehicle Name *</label><input type="text" class="form-input" placeholder="e.g. Toyota Innova Crysta" /></div>
        <div class="form-group"><label class="form-label">Passenger Capacity *</label><input type="number" class="form-input" min="1" max="30" placeholder="e.g. 7" /></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Price (₹) *</label><input type="number" class="form-input" placeholder="e.g. 3500" /></div>
        <div class="form-group"><label class="form-label">Price Unit</label>
          <select class="form-select"><option>per day (fuel incl.)</option><option>per day (fuel extra)</option><option>per km</option><option>per seat per route</option></select>
        </div>
      </div>
    </div>
  `}function Tt(){var e,t,a,o;let i=[];(e=document.getElementById("add-vehicle-btn"))==null||e.addEventListener("click",()=>{ge++,document.getElementById("vehicles-container").insertAdjacentHTML("beforeend",Ie(ge-1))}),(t=document.getElementById("t-photos"))==null||t.addEventListener("change",s=>{[...s.target.files].forEach(r=>{const d=new FileReader;d.onload=n=>{var p,m;i.push(n.target.result);const c=document.createElement("div");c.className="upload-img-wrap",c.innerHTML=`<img src="${n.target.result}" alt="v" /><button class="remove-img">✕</button>`,(p=document.getElementById("t-photo-preview"))==null||p.appendChild(c),(m=c.querySelector(".remove-img"))==null||m.addEventListener("click",()=>{i.splice(i.indexOf(n.target.result),1),c.remove()})},d.readAsDataURL(r)})}),(a=document.getElementById("t-license"))==null||a.addEventListener("change",s=>{s.target.files[0]&&(document.getElementById("t-license-preview").textContent="✅ "+s.target.files[0].name)}),(o=document.getElementById("submit-transport-btn"))==null||o.addEventListener("click",()=>{var b,y,z,I,M,u,v,w,E,$,S,C,R,q;const s=(y=(b=document.getElementById("t-name"))==null?void 0:b.value)==null?void 0:y.trim(),r=(I=(z=document.getElementById("t-email"))==null?void 0:z.value)==null?void 0:I.trim(),d=(u=(M=document.getElementById("t-phone"))==null?void 0:M.value)==null?void 0:u.trim(),n=(v=document.getElementById("t-password"))==null?void 0:v.value,c=(E=(w=document.getElementById("t-biz"))==null?void 0:w.value)==null?void 0:E.trim(),p=($=document.querySelector('input[name="t-type"]:checked'))==null?void 0:$.value,m=(S=document.getElementById("t-location"))==null?void 0:S.value,h=(R=(C=document.getElementById("t-desc"))==null?void 0:C.value)==null?void 0:R.trim(),x=[...document.querySelectorAll('input[name="t-feat"]:checked')].map(D=>D.value);if(!s||!r||!d||!n||!c||!p||!m||!h){g("Please fill all required fields","","error");return}if(!((q=document.getElementById("t-agree"))!=null&&q.checked)){g("Please agree to Terms","","error");return}try{se({name:s,email:r,phone:d,password:n,avatar:s.charAt(0).toUpperCase(),listing:{type:"transport",name:c,serviceType:p,location:m,description:h,features:x,images:i}}),g("Transport listing submitted! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(D){g(D.message,"","error")}})}function Mt(){const i=B,e=P();if(!e)return`<div class="page-hero container"><h1>Please <a href="${i("/login")}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;const t=Ae(),a=re(),o=j.filter(s=>a.includes(s.id));return`
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;flex-shrink:0">${e.avatar||"👤"}</div>
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${e.fullName||e.name}</h1>
            <div style="color:var(--text-muted);font-size:0.9rem">${e.email} · Member since ${new Date(e.createdAt).getFullYear()}</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn" style="margin-left:auto">🚪 Log Out</button>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div class="tabs" id="profile-tabs">
          <button class="tab-btn active" data-tab="bookings">📅 My Bookings (${t.length})</button>
          <button class="tab-btn" data-tab="wishlist">❤️ Wishlist (${o.length})</button>
          <button class="tab-btn" data-tab="account">👤 Account</button>
        </div>

        <!-- Bookings -->
        <div id="tab-bookings">
          ${t.length?t.map(s=>{var r;return`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${s.listingName}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${s.checkin?new Date(s.checkin+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):new Date(s.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Ref: <strong style="color:var(--emerald-400)">${s.id}</strong></div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:700;font-size:1.1rem;color:var(--emerald-400)">₹${(r=s.total)==null?void 0:r.toLocaleString()}</div>
                <span class="badge badge-approved">✅ Confirmed</span>
              </div>
            </div>
          `}).join(""):`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🏕️</div>
              <h3 style="margin-bottom:12px">No bookings yet</h3>
              <p style="margin-bottom:24px">Start exploring Mizoram's hidden gems!</p>
              <a href="${i("/discover")}" class="btn btn-primary" data-link>Discover Destinations</a>
            </div>
          `}
        </div>

        <!-- Wishlist -->
        <div id="tab-wishlist" class="hidden">
          ${o.length?`
            <div class="grid-3">${o.map(s=>`
              <div class="card" data-href="/stay/${s.id}" style="cursor:pointer">
                <div class="card-img-wrap"><img src="${s.coverImage}" alt="${s.name}" loading="lazy" /><div class="card-rating">${T(s.rating)} ${s.rating}</div></div>
                <div class="card-body"><h4 class="card-title">${s.name}</h4><div class="price">₹${s.price.toLocaleString()}<span>/night</span></div></div>
              </div>`).join("")}
            </div>`:`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🤍</div>
              <h3 style="margin-bottom:12px">Your wishlist is empty</h3>
              <p style="margin-bottom:24px">Save stays you love while browsing</p>
              <a href="${i("/stays")}" class="btn btn-primary" data-link>Browse Stays</a>
            </div>`}
        </div>

        <!-- Account -->
        <div id="tab-account" class="hidden">
          <div class="card card-body" style="max-width:500px">
            <h3 style="margin-bottom:24px">Account Information</h3>
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" value="${e.fullName||e.name||""}" readonly /></div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" value="${e.email||""}" readonly /></div>
            <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" value="${e.phone||""}" readonly /></div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">
              💡 To update your information, please contact us at <a href="mailto:support@lushaitrips.com" style="color:var(--emerald-400)">support@lushaitrips.com</a>
            </div>
            ${e.role!=="host"?`
              <div class="divider-h"></div>
              <h4 style="margin-bottom:12px">Become a Host</h4>
              <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:16px">List your property, guide service, or transport on LushaiTrips.</p>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <a href="${i("/host-signup-stay")}" class="btn btn-outline btn-sm" data-link>🏡 List Stay</a>
                <a href="${i("/host-signup-guide")}" class="btn btn-outline btn-sm" data-link>🧭 List Guide</a>
                <a href="${i("/host-signup-transport")}" class="btn btn-outline btn-sm" data-link>🚗 List Transport</a>
              </div>`:""}
          </div>
        </div>
      </div>
    </section>
  `}function At(){var e;(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{te()});const i=document.querySelectorAll(".tab-btn[data-tab]");i.forEach(t=>{t.addEventListener("click",()=>{var a;i.forEach(o=>o.classList.remove("active")),t.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(o=>o.classList.add("hidden")),(a=document.getElementById(`tab-${t.dataset.tab}`))==null||a.classList.remove("hidden")})}),document.querySelectorAll("[data-href]").forEach(t=>t.addEventListener("click",()=>window.router.navigate(t.dataset.href)))}function Pt(){const i=B,e=P();if(!e)return`<div class="page-hero container"><h1>Please <a href="${i("/login")}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;if(e.role!=="host")return`<div class="page-hero container"><h1>Host access only. <a href="${i("/host-signup-stay")}" data-link style="color:var(--emerald-400)">Become a Host →</a></h1></div>`;const t=(k.get("lt_listings")||[]).filter(s=>s.hostId===e.id),a=(k.get("lt_bookings")||[]).filter(s=>t.some(r=>r.id===s.listingId)),o=a.reduce((s,r)=>s+(r.total||0)*.9,0);return`
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800">${e.avatar}</div>
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">Host Dashboard</h1>
            <div style="color:var(--text-muted)">Welcome back, ${e.name} · <span class="${e.status==="pending"?"badge badge-pending":"badge badge-approved"}">${e.status==="pending"?"⏳ Pending Approval":"✅ Active Host"}</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        ${e.status==="pending"?`
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:24px;margin-bottom:32px">
            <div style="font-weight:700;font-size:1.1rem;margin-bottom:8px">⏳ Your listing is under review</div>
            <div style="color:var(--text-muted);font-size:0.9rem">Our team reviews new listings within 24–48 hours. You'll receive an email once approved. In the meantime, you can preview your listing below.</div>
          </div>
        `:""}

        <!-- Stats -->
        <div class="grid-4" style="margin-bottom:40px">
          ${[{icon:"🏠",label:"Active Listings",value:t.length},{icon:"📅",label:"Total Bookings",value:a.length},{icon:"💰",label:"Total Earnings",value:`₹${Math.round(o).toLocaleString()}`},{icon:"⭐",label:"Avg Rating",value:"4.8"}].map(s=>`
            <div class="card card-body text-center">
              <div style="font-size:2rem;margin-bottom:8px">${s.icon}</div>
              <div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px">${s.value}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${s.label}</div>
            </div>
          `).join("")}
        </div>

        <div class="tabs" id="host-tabs">
          <button class="tab-btn active" data-tab="listings">🏠 Listings</button>
          <button class="tab-btn" data-tab="bookings">📅 Bookings</button>
          <button class="tab-btn" data-tab="add">+ Add New</button>
        </div>

        <!-- Listings tab -->
        <div id="tab-listings">
          ${t.length?t.map(s=>{var r,d,n;return`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${s.name||((r=s.listing)==null?void 0:r.name)||"Unnamed Listing"}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📍 ${s.district||((d=s.listing)==null?void 0:d.location)||"—"}</div>
                <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">Price: ₹${s.price||((n=s.listing)==null?void 0:n.price)||"—"}/night</div>
              </div>
              <span class="${s.status==="pending"?"badge badge-pending":"badge badge-approved"}">${s.status==="pending"?"⏳ Under Review":"✅ Live"}</span>
            </div>
          `}).join(""):`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🏠</div>
              <h3 style="margin-bottom:12px">No listings yet</h3>
              <p style="margin-bottom:24px">Add your first property, guide service, or transport below.</p>
            </div>
          `}
        </div>

        <!-- Bookings tab -->
        <div id="tab-bookings" class="hidden">
          ${a.length?a.map(s=>`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1">
                <div style="font-weight:700;margin-bottom:4px">${s.listingName}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">👤 ${s.guestName} · 📞 ${s.guestPhone}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${s.checkin||"N/A"} → ${s.checkout||"N/A"} · 👥 ${s.guests||"—"} guests</div>
                <div style="font-size:0.75rem;color:var(--text-dim);margin-top:4px">Ref: ${s.id}</div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:700;color:var(--emerald-400)">₹${Math.round((s.total||0)*.9).toLocaleString()} <span style="font-size:0.75rem;color:var(--text-dim)">(your share)</span></div>
                <span class="badge badge-approved">✅ Confirmed</span>
              </div>
            </div>
          `).join(""):`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">📅</div>
              <h3 style="margin-bottom:12px">No bookings yet</h3>
              <p>Bookings will appear here once guests book your listing.</p>
            </div>
          `}
        </div>

        <!-- Add listing tab -->
        <div id="tab-add" class="hidden">
          <div class="grid-3">
            ${[{icon:"🏡",title:"Add Stay",desc:"List a homestay, hotel, lodge, or camping site",href:"/host-signup-stay"},{icon:"🧭",title:"Register as Guide",desc:"Offer trekking, wildlife, or cultural tour services",href:"/host-signup-guide"},{icon:"🚗",title:"List Transport",desc:"Cars, bikes, SUVs, shared Sumo or vans",href:"/host-signup-transport"}].map(s=>`
              <a href="${i(s.href)}" class="card card-body text-center" data-link style="cursor:pointer">
                <div style="font-size:3rem;margin-bottom:16px">${s.icon}</div>
                <h4 style="margin-bottom:8px">${s.title}</h4>
                <p style="font-size:0.9rem;margin-bottom:20px">${s.desc}</p>
                <span class="btn btn-primary btn-sm" style="margin:0 auto">Get Started →</span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function Ht(){const i=document.querySelectorAll(".tab-btn[data-tab]");i.forEach(e=>{e.addEventListener("click",()=>{var t;i.forEach(a=>a.classList.remove("active")),e.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(a=>a.classList.add("hidden")),(t=document.getElementById(`tab-${e.dataset.tab}`))==null||t.classList.remove("hidden")})})}const ve={"/":{render:Ne,init:Ge,footer:!0},"/discover":{render:We,init:Fe,footer:!0},"/surprise":{render:Je,init:Ke,footer:!0},"/stays":{render:et,init:tt,footer:!0},"/guides":{render:ot,init:nt,footer:!0},"/transport":{render:ct,init:pt,footer:!0},"/booking-confirmed":{render:yt,init:ft,footer:!1},"/login":{render:bt,init:xt,footer:!1},"/signup-user":{render:wt,init:kt,footer:!1},"/host-signup-stay":{render:Lt,init:Ee,footer:!1},"/host-signup-guide":{render:It,init:St,footer:!1},"/host-signup-transport":{render:Bt,init:Tt,footer:!1},"/profile":{render:Mt,init:At,footer:!0},"/host-dashboard":{render:Pt,init:Ht,footer:!0}};function jt(i){if(ve[i])return{route:ve[i],params:{}};if(i.startsWith("/destination/")){const e=i.slice(13);return{route:{render:()=>Qe(e),init:()=>Xe(e),footer:!0},params:{id:e}}}if(i.startsWith("/stay/")){const e=i.slice(6);return{route:{render:()=>at(),init:()=>st(e),footer:!0},params:{id:e}}}if(i.startsWith("/guide/")){const e=i.slice(7);return{route:{render:()=>lt(e),init:()=>dt(e),footer:!0},params:{id:e}}}if(i.startsWith("/transport/")){const e=i.slice(11);return{route:{render:()=>mt(e),init:()=>ut(e),footer:!0},params:{id:e}}}if(i.startsWith("/book/")){const e=i.slice(6);return{route:{render:()=>null,init:()=>null,footer:!1,booking:e},params:{id:e}}}return{route:{render:()=>`<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px"><div><div style="font-size:5rem;margin-bottom:16px">🗺️</div><h1 style="margin-bottom:12px">Page Not Found</h1><p style="margin-bottom:24px;color:var(--text-muted)">Looks like this trail doesn't exist.</p><a href="${B("/")}" class="btn btn-primary" data-link>Back to Home</a></div></div>`,init:()=>{},footer:!0},params:{}}}function Ct(i){const e=i.trim(),t=e.indexOf("?"),a=t>=0?e.slice(0,t):e,o=t>=0?e.slice(t):"",s="/LushaiTravels/".replace(/\/$/,"");return!!s&&(a===s||a.startsWith(`${s}/`))?a+o:B(a)+o}async function Se(i){const e=Ct(i),t=new URL(e,window.location.origin);history.pushState({},"",t.pathname+t.search+t.hash),await le(O(t.pathname),t.searchParams)}async function le(i,e=new URLSearchParams){var s;const t=document.getElementById("page-content"),a=document.getElementById("footer-container");if(i.startsWith("/book/")){const r=i.slice(6);t.innerHTML=vt(r,e),a.innerHTML="",ce(),he(),ht(r,e),de();return}const{route:o}=jt(i);ce(),t.innerHTML=o.render()||"",o.footer?He():a.innerHTML="",he(),(s=o.init)==null||s.call(o),de()}function he(){document.querySelectorAll("[data-link]").forEach(i=>{i.removeEventListener("click",ye),i.addEventListener("click",ye)})}function ye(i){i.preventDefault();const e=i.currentTarget.getAttribute("href");e&&e!=="#"&&Se(e)}window.router={navigate:Se};window.addEventListener("popstate",()=>{le(O(location.pathname),new URLSearchParams(location.search))});le(O(location.pathname),new URLSearchParams(location.search));
