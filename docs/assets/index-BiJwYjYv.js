(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();function I(t){const e=t.startsWith("/")?t:`/${t}`;return e==="/"?"/LushaiTravels/":`${"/LushaiTravels/".replace(/\/$/,"")}${e}`}function O(t){const e="/LushaiTravels/".replace(/\/$/,"");return e?t===e||t===`${e}/`?"/":t.startsWith(`${e}/`)?t.slice(e.length)||"/":t||"/":t||"/"}const k={get:t=>{try{return JSON.parse(localStorage.getItem(t))}catch{return null}},set:(t,e)=>localStorage.setItem(t,JSON.stringify(e)),remove:t=>localStorage.removeItem(t)};function A(){return k.get("lt_user")}function ie(t){k.set("lt_user",t)}function te(){k.remove("lt_user"),window.router.navigate("/")}function _(){return!!A()}function Be(t){var a;const e=k.get("lt_users")||[];if(e.find(r=>r.email===t.email))throw new Error("Email already registered");const i={...t,id:Date.now(),role:"user",createdAt:new Date().toISOString(),avatar:(a=t.fullName)==null?void 0:a.charAt(0).toUpperCase()};return e.push(i),k.set("lt_users",e),ie(i),i}function ae(t){var r;const e=k.get("lt_users")||[];if(e.find(s=>s.email===t.email))throw new Error("Email already registered");const i={...t,id:Date.now(),role:"host",status:"pending",createdAt:new Date().toISOString(),avatar:(r=t.name)==null?void 0:r.charAt(0).toUpperCase()};e.push(i),k.set("lt_users",e);const a=k.get("lt_listings")||[];return a.push({...t.listing,hostId:i.id,status:"pending",id:`listing-${Date.now()}`}),k.set("lt_listings",a),ie(i),i}function Te(t,e){const a=(k.get("lt_users")||[]).find(r=>r.email===t&&r.password===e);if(!a)throw new Error("Invalid email or password");return ie(a),a}function Z(t){return(k.get("lt_reviews")||[]).filter(i=>i.listingId===t)}function fe(t){const e=k.get("lt_reviews")||[],i={...t,id:Date.now(),createdAt:new Date().toISOString()};return e.unshift(i),k.set("lt_reviews",e),i}function Me(t){const e=k.get("lt_bookings")||[],i={...t,id:`LT-${Date.now()}`,status:"confirmed",createdAt:new Date().toISOString()};return e.unshift(i),k.set("lt_bookings",e),k.set("lt_last_booking",i),i}function Ae(){const t=A();return t?(k.get("lt_bookings")||[]).filter(i=>i.userId===t.id):[]}function Pe(){return k.get("lt_last_booking")}function se(){return k.get("lt_wishlist")||[]}function be(t){const e=se(),i=e.indexOf(t);return i===-1?e.push(t):e.splice(i,1),k.set("lt_wishlist",e),e.includes(t)}function xe(t){return se().includes(t)}function u(t,e="",i="success"){let a=document.querySelector(".toast");a||(a=document.createElement("div"),a.className="toast",document.body.appendChild(a)),a.className=`toast ${i}`,a.innerHTML=`<div class="toast-title">${i==="success"?"✅":"❌"} ${t}</div>${e?`<div class="toast-msg">${e}</div>`:""}`,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),4e3)}function S(t){return Array.from({length:5},(e,i)=>`<span style="color:${i<Math.round(t)?"#fbbf24":"#334155"};font-size:0.9rem">★</span>`).join("")}function we(t){return t.length?(t.reduce((e,i)=>e+i.rating,0)/t.length).toFixed(1):0}function de(){window.scrollTo({top:0,behavior:"smooth"})}function ce(){var s,o,d;const t=document.getElementById("navbar-container"),e=A(),i=I;t.innerHTML=`
    <nav id="navbar">
      <div class="container nav-inner">
        <a href="${i("/")}" class="nav-logo" data-link>Lushai<span>Trips</span></a>
        <div class="nav-links">
          <a href="${i("/")}" data-link>Home</a>
          <a href="${i("/discover")}" data-link>Discover</a>
          <a href="${i("/stays")}" data-link>Stays</a>
          <a href="${i("/guides")}" data-link>Guides</a>
          <a href="${i("/transport")}" data-link>Transport</a>
          <a href="${i("/surprise")}" data-link>🎲 Surprise Me</a>
        </div>
        <div class="nav-cta">
          ${e?`
            <div class="nav-avatar" id="nav-user-btn" title="${e.fullName||e.name}">${e.avatar||"👤"}</div>
          `:`
            <a href="${i("/login")}" class="btn btn-secondary btn-sm" data-link>Log in</a>
            <a href="${i("/signup-user")}" class="btn btn-primary btn-sm" data-link>Sign up</a>
          `}
          <div class="nav-hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="${i("/")}" data-link>🏠 Home</a>
      <a href="${i("/discover")}" data-link>🗺️ Discover</a>
      <a href="${i("/stays")}" data-link>🏡 Stays</a>
      <a href="${i("/guides")}" data-link>👨‍🏫 Guides</a>
      <a href="${i("/transport")}" data-link>🚗 Transport</a>
      <a href="${i("/surprise")}" data-link>🎲 Surprise Me</a>
      <div style="height:1px;background:var(--glass-border);margin:8px 0"></div>
      ${e?`
        <a href="${i("/profile")}" data-link>👤 My Profile</a>
        ${e.role==="host"?`<a href="${i("/host-dashboard")}" data-link>🏠 Host Dashboard</a>`:""}
        <a href="#" id="mobile-logout">🚪 Log out</a>
      `:`
        <a href="${i("/login")}" data-link>Log in</a>
        <a href="${i("/signup-user")}" class="btn btn-primary" data-link style="text-align:center">Sign up</a>
      `}
    </div>
  `,window.addEventListener("scroll",()=>{var n;(n=document.getElementById("navbar"))==null||n.classList.toggle("scrolled",window.scrollY>30)}),(s=document.getElementById("hamburger"))==null||s.addEventListener("click",()=>{var n;(n=document.getElementById("mobile-menu"))==null||n.classList.toggle("open")}),(o=document.getElementById("nav-user-btn"))==null||o.addEventListener("click",()=>{var c;const n=document.createElement("div");n.style.cssText="position:fixed;top:70px;right:24px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:8px;z-index:2000;min-width:180px;animation:fadeIn 0.2s ease",n.innerHTML=`
      <a href="${i("/profile")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">👤 My Profile</a>
      ${(e==null?void 0:e.role)==="host"?`<a href="${i("/host-dashboard")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏠 Host Dashboard</a>`:`<a href="${i("/host-signup-stay")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏡 Become a Host</a>`}
      <div style="height:1px;background:var(--glass-border);margin:4px 0"></div>
      <button id="dd-logout" style="width:100%;padding:10px 14px;border-radius:8px;background:none;color:#f87171;text-align:left;font-size:0.9rem;cursor:pointer;border:none">🚪 Log out</button>
    `,document.body.appendChild(n),n.querySelectorAll("[data-link]").forEach(p=>{p.addEventListener("click",m=>{m.preventDefault(),window.router.navigate(p.getAttribute("href")),n.remove()})}),setTimeout(()=>document.addEventListener("click",()=>n.remove(),{once:!0}),100),(c=n.querySelector("#dd-logout"))==null||c.addEventListener("click",()=>{te()})}),(d=document.getElementById("mobile-logout"))==null||d.addEventListener("click",n=>{n.preventDefault(),te()});const a=O(location.pathname);document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(n=>{const c=n.getAttribute("href");if(!c||c==="#")return;O(new URL(c,window.location.origin).pathname)===a&&n.classList.add("active")})}function Ce(){const t=document.getElementById("footer-container"),e=I;t.innerHTML=`
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
  `}const He="modulepreload",je=function(t){return"/LushaiTravels/"+t},pe={},De=function(e,i,a){let r=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(i.map(n=>{if(n=je(n),n in pe)return;pe[n]=!0;const c=n.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":He,c||(m.as="script"),m.crossOrigin="",m.href=n,d&&m.setAttribute("nonce",d),document.head.appendChild(m),c)return new Promise((v,x)=>{m.addEventListener("load",v),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${n}`)))})}))}function s(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return r.then(o=>{for(const d of o||[])d.status==="rejected"&&s(d.reason);return e().catch(s)})},Re="/LushaiTravels/".replace(/\/$/,""),f=t=>`${Re}${t}`,N=[{id:"vantawng-falls",name:"Vantawng Falls",tagline:"India's tallest waterfall in Mizoram",type:"waterfall",tags:["adventure","nature","waterfall"],difficulty:"Moderate",district:"Serchhip",lat:23.0932,lng:92.7534,rating:4.8,reviews:124,coverImage:f("/images/2018080738-1024x576.jpg"),images:[f("/images/2018080738-1024x576.jpg"),f("/images/2019072384.jpg"),f("/images/View-of-Vantawng-Waterfall-Cover-Photo-840x425.jpg")],description:"Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India. Surrounded by lush subtropical forests and mist, this is a must-visit for nature lovers and adventure seekers alike.",highlights:["750-ft plunge pool","Jungle trek","Wildlife sightings","Photography paradise"],bestTime:"October – March",nearbyAttractions:["Serchhip town","Tuirial River","Local bamboo villages"],duration:"1-2 days",category:"adventure"},{id:"phawngpui-peak",name:"Phawngpui Peak",tagline:"Blue Mountain — the highest point in Mizoram",type:"mountain",tags:["adventure","trekking","scenic"],difficulty:"Hard",district:"Lawngtlai",lat:22.4869,lng:93.0248,rating:4.9,reviews:87,coverImage:f("/images/Website-Blog-Image-Size-26.jpg"),images:[f("/images/Website-Blog-Image-Size-26.jpg"),f("/images/Website-Blog-Image-Size-29.jpg"),f("/images/Website-Feature-Image-Size-10.jpg")],description:"Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar across rolling blue-hazed ridges. The national park here protects rare orchids, Himalayan black bears, and hollock gibbons.",highlights:["Sunrise panoramas","Rare orchid species","Wildlife viewing","Cloud sea views"],bestTime:"November – February",nearbyAttractions:["Phawngpui National Park","Sangau border outpost"],duration:"2-3 days",category:"adventure"},{id:"tam-dil-lake",name:"Tam Dil Lake",tagline:"Mirror-still lake in a pine-forested valley",type:"lake",tags:["relaxation","nature","lake"],difficulty:"Easy",district:"Saitual",lat:23.6177,lng:92.8894,rating:4.6,reviews:93,coverImage:f("/images/tamdil-lake-mizoram.jpeg"),images:[f("/images/tamdil-lake-mizoram.jpeg"),f("/images/2019072338-1024x576.jpg"),f("/images/2019072384-1-olw9h396o5jhwh510ctk9bwfep94no9o510c4tj0ju.jpg")],description:"Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for a peaceful picnic, boating, or simply relaxing in nature. The calm waters reflect the surrounding hills like a mirror at dawn, making it a favourite for photographers.",highlights:["Boating","Picnic spots","Pine forest walks","Photography"],bestTime:"Year-round (best Sep – Mar)",nearbyAttractions:["Saitual town","Kelkang","Aizawl (85 km)"],duration:"1 day",category:"relaxation"},{id:"reiek-tlang",name:"Reiek Tlang",tagline:"Rolling hills with traditional Mizo heritage village",type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Mamit",lat:23.7152,lng:92.5694,rating:4.5,reviews:78,coverImage:f("/images/caption.jpg"),images:[f("/images/caption.jpg"),f("/images/caption%20(1).jpg"),f("/images/reiek-tlang-view-point-ailawng-mammit-tourist-attraction-XPHYubeNTg.jpg")],description:"Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village, walking trails, and breathtaking hillside views. Sunrise here is particularly magical with layers of hills fading into the horizon.",highlights:["Traditional Mizo village","Hiking trails","Sunrise views","Cultural exhibits"],bestTime:"October – April",nearbyAttractions:["Aizawl","Hmuifang","Durtlang Hills"],duration:"1 day",category:"culture"},{id:"palak-dil",name:"Palak Dil Lake",tagline:"Mizoram's largest natural lake, ringed by jungle",type:"lake",tags:["nature","wildlife","relaxation"],difficulty:"Easy",district:"Saiha",lat:22.1627,lng:92.9261,rating:4.7,reviews:56,coverImage:f("/images/626bdb1307952_Palak%20lake.jpg"),images:[f("/images/626bdb1307952_Palak%20lake.jpg"),f("/images/626bdb1b5a442_PALAK%20lake%202.jpg"),f("/images/palak-lake-aizawl-mizoram-1-attr-hero.jpeg")],description:"Palak Dil, Mizoram's largest natural lake, lies in the remote Saiha district near the Myanmar border. The lake is surrounded by dense subtropical forest and is a prime migratory bird watching destination. The silence here is extraordinary.",highlights:["Bird watching","Boat rides","Wildlife","Remote wilderness"],bestTime:"November – February",nearbyAttractions:["Saiha town","Phawngpui (nearby)"],duration:"2 days",category:"relaxation"},{id:"champhai",name:"Champhai Valley",tagline:"The fruit bowl of Mizoram with stunning valley views",type:"valley",tags:["nature","culture","relaxation"],difficulty:"Easy",district:"Champhai",lat:23.4692,lng:93.3224,rating:4.6,reviews:102,coverImage:f("/images/Paddy-fields-at-Champhai-Mizoram.webp"),images:[f("/images/Paddy-fields-at-Champhai-Mizoram.webp"),f("/images/House-in-a-paddy-field-in-Champhai.webp"),f("/images/1694632131_sweeping_meadows_at_champhai.jpg.webp"),f("/images/6054f244a637b2d8c9a63aa0c66b7056_1000x1000.jpg"),f("/images/62addaa694e9f_Champhai%20Zawl.jpg")],description:'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar. The valley is dotted with fruit orchards, paddy fields, and dramatic ridgeline sunsets. Its border town character adds a unique cultural flavour.',highlights:["Valley views","Fruit orchards","Museum","Myanmar border"],bestTime:"October – March",nearbyAttractions:["Rih Dil Lake (Myanmar)","Murlen National Park","Tamdil"],duration:"2-3 days",category:"relaxation"},{id:"murlen-national-park",name:"Murlen National Park",tagline:"One of Northeast India's finest biodiversity hotspots",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Moderate",district:"Champhai",lat:23.65,lng:93.35,rating:4.8,reviews:43,coverImage:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",images:["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80","https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80"],description:"Murlen National Park, spanning over 100 sq km of pristine forest, is home to leopards, clouded leopards, gibbons, hornbills, and over 150 bird species. Trekking through its silent, ancient forests is a transformative experience.",highlights:["Leopard habitat","Hornbill spotting","Jungle camping","Bird watching"],bestTime:"November – April",nearbyAttractions:["Champhai","Phawngpui Peak"],duration:"2-3 days",category:"adventure"},{id:"hmuifang",name:"Hmuifang Hill Resort",tagline:"Cloud-kissed hill with Aizawl valley panoramas",type:"hill",tags:["relaxation","nature","scenic"],difficulty:"Easy",district:"Aizawl",lat:23.5,lng:92.79,rating:4.4,reviews:67,coverImage:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",images:["https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"],description:`Just 54 km from Aizawl, Hmuifang is a hill station known as "Mizoram's Shimla." The hilltop resort offers stunning views of the surrounding valleys and the Tlawng River below. Pine forests, cool mountain air, and misty mornings make it ideal for relaxation.`,highlights:["Valley panoramas","Pine forest","Cool climate","Birding"],bestTime:"October – March",nearbyAttractions:["Aizawl","Reiek Tlang","Durtlang"],duration:"1 day",category:"relaxation"},{id:"lengteng-wildlife",name:"Lengteng Wildlife Sanctuary",tagline:"Rare wildlife in Mizoram's remote northeast",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Hard",district:"Champhai",lat:23.85,lng:93.4,rating:4.6,reviews:29,coverImage:"https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80",images:["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80"],description:"The Lengteng Wildlife Sanctuary covers 60 sq km of pristine high-altitude forest, sheltering some of Mizoram's rarest species. The journey itself — through remote villages and winding mountain roads — is half the adventure.",highlights:["Rare hornbills","Pristine forest","Remote trails","Camping"],bestTime:"November – March",nearbyAttractions:["Champhai","Murlen National Park"],duration:"2-3 days",category:"adventure"},{id:"lunglei",name:"Lunglei Hills",tagline:`The "Bridge of the Rocks" — Mizoram's southern capital`,type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Lunglei",lat:22.8917,lng:92.7349,rating:4.3,reviews:58,coverImage:"https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80",images:["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80","https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"],description:'Lunglei, the second largest city in Mizoram, sits dramatically on a ridge above verdant valleys. The name means "bridge of rocks." Explore local bazaars, colonial-era churches, and the sweeping viewpoints overlooking the Tlawng river basin.',highlights:["Rock viewpoints","Local markets","Heritage churches","Valley walks"],bestTime:"October – April",nearbyAttractions:["Saikuti Beach","Khawbung","Vantawng Falls (3 hrs)"],duration:"1-2 days",category:"culture"},{id:"aizawl-city",name:"Aizawl City",tagline:"The hilltop capital — where Mizoram's heart beats",type:"city",tags:["culture","food","relaxation"],difficulty:"Easy",district:"Aizawl",lat:23.7271,lng:92.7176,rating:4.5,reviews:211,coverImage:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",images:["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],description:"Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India's most unique capital cities. Explore the old market (Bara Bazar), taste Mizo cuisine, visit the state museum, and experience the warmth of Mizo hospitality.",highlights:["Bara Bazar","Mizo cuisine","State Museum","Durtlang Hills"],bestTime:"Year-round",nearbyAttractions:["Reiek Tlang","Hmuifang","Tam Dil Lake"],duration:"2-3 days",category:"culture"},{id:"tuipui-river",name:"Tuipui River",tagline:"Pristine river valley for kayaking and fishing",type:"river",tags:["adventure","nature","water"],difficulty:"Moderate",district:"Saiha",lat:22.05,lng:92.9,rating:4.4,reviews:32,coverImage:"https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80",images:["https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"],description:"The Tuipui River flows through the remotest district of Mizoram, creating stunning gorges, crystal-clear pools, and beaches. This is one of the best spots in Northeast India for river kayaking, fishing, and wild camping.",highlights:["Kayaking","Fishing","Wild camping","Gorge walks"],bestTime:"November – March",nearbyAttractions:["Saiha","Palak Dil Lake","Phawngpui"],duration:"2-3 days",category:"adventure"}],qe=[{id:"all",label:"All",icon:"🗺️"},{id:"adventure",label:"Adventure",icon:"🧗"},{id:"relaxation",label:"Relaxation",icon:"🌿"},{id:"culture",label:"Culture",icon:"🏛️"},{id:"wildlife",label:"Wildlife",icon:"🦅"},{id:"budget",label:"Budget",icon:"💰"}];function Ne(){const t=I,e=N.slice(0,6);return`
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
          <a href="${t("/surprise")}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${t("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
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
        <a href="${t("/surprise")}" class="btn btn-primary btn-lg" data-link>🎲 Try Surprise Me</a>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="section">
      <div class="container">
        <div class="section-label">🗺️ Top Picks</div>
        <div class="flex-between" style="margin-bottom:40px;flex-wrap:wrap;gap:16px">
          <h2 class="section-title" style="margin:0">Featured Destinations</h2>
          <a href="${t("/discover")}" class="btn btn-outline" data-link>View All →</a>
        </div>
        <div class="grid-3">
          ${e.map(i=>`
            <div class="card destination-card animate-in" data-href="/destination/${i.id}">
              <div class="card-img-wrap">
                <img src="${i.coverImage}" alt="${i.name}" loading="lazy" />
                <div class="card-badge">${i.type.toUpperCase()}</div>
                <div class="card-rating">${S(i.rating)} <span>${i.rating}</span></div>
              </div>
              <div class="card-body">
                <h4 class="card-title">${i.name}</h4>
                <div class="card-meta" style="margin-bottom:10px">📍 ${i.district} &nbsp;•&nbsp; ⏱ ${i.duration}</div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${i.tagline}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${i.tags.map(a=>`<span class="tag">${a}</span>`).join("")}
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
          ${[{icon:"🎲",step:"1",title:"Discover or Surprise",desc:"Browse 50+ destinations or hit Surprise Me and let us pick the perfect trip for you."},{icon:"📅",step:"2",title:"Book Your Stay",desc:"Choose from verified homestays, lodges, and campsites. Book guides and transport in one place."},{icon:"🌄",step:"3",title:"Explore Mizoram",desc:"Show up, follow your itinerary, and experience Northeast India's best-kept secret."}].map(i=>`
            <div class="card card-body text-center animate-in">
              <div style="font-size:3rem;margin-bottom:16px">${i.icon}</div>
              <div style="width:32px;height:32px;background:var(--emerald-700);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;margin:0 auto 16px">${i.step}</div>
              <h4 style="margin-bottom:10px">${i.title}</h4>
              <p style="font-size:0.9rem">${i.desc}</p>
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
          <a href="${t("/stays")}" class="btn btn-outline" data-link>All Stays →</a>
        </div>
        <div class="grid-3" id="home-stays-grid"></div>
      </div>
    </section>

    <!-- Services Strip -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <h2 class="text-center" style="margin-bottom:40px">Everything You Need</h2>
        <div class="grid-4">
          ${[{icon:"🏡",title:"Homestays",desc:"Authentic Mizo homes",href:"/stays"},{icon:"👨‍🏫",title:"Local Guides",desc:"Expert local experts",href:"/guides"},{icon:"🚗",title:"Transport",desc:"Cars, bikes & more",href:"/transport"},{icon:"⭐",title:"Reviews",desc:"Real verified stays",href:"/stays"}].map(i=>`
            <a href="${t(i.href)}" class="card card-body text-center" data-link style="cursor:pointer">
              <div style="font-size:2.5rem;margin-bottom:12px">${i.icon}</div>
              <h4 style="margin-bottom:6px">${i.title}</h4>
              <p style="font-size:0.85rem">${i.desc}</p>
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
          <a href="${t("/host-signup-stay")}" class="btn btn-primary btn-lg" data-link>🏡 List Your Stay</a>
          <a href="${t("/host-signup-guide")}" class="btn btn-secondary btn-lg" data-link>👨‍🏫 Become a Guide</a>
          <a href="${t("/host-signup-transport")}" class="btn btn-secondary btn-lg" data-link>🚗 List Transport</a>
        </div>
      </div>
    </section>
  `}function Ge(){const t=document.querySelector(".hero-bg");if(t){const e="/LushaiTravels/".replace(/\/$/,"");t.style.backgroundImage=`url('${e}/images/digilife-siaha-2cM78THYc4w-unsplash.jpg')`}document.querySelectorAll("[data-href]").forEach(e=>{e.addEventListener("click",()=>window.router.navigate(e.dataset.href))}),De(async()=>{const{stays:e}=await Promise.resolve().then(()=>_e);return{stays:e}},void 0).then(({stays:e})=>{const i=document.getElementById("home-stays-grid");i&&(i.innerHTML=e.slice(0,3).map(a=>`
      <div class="card stay-card animate-in" data-href="/stay/${a.id}">
        <div class="card-img-wrap">
          <img src="${a.coverImage}" alt="${a.name}" loading="lazy" />
          <div class="card-badge">${a.type.toUpperCase()}</div>
          ${a.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
          <div class="card-rating">${S(a.rating)} <span>${a.rating}</span></div>
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
          ${qe.map(t=>`<div class="chip ${t.id==="all"?"active":""}" data-cat="${t.id}">${t.icon} ${t.label}</div>`).join("")}
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
  `}function Fe(){var t;Q(),Ue(),document.querySelectorAll(".chip[data-cat]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".chip[data-cat]").forEach(i=>i.classList.remove("active")),e.classList.add("active"),J=e.dataset.cat,Q()})}),(t=document.getElementById("discover-search"))==null||t.addEventListener("input",e=>{U=e.target.value.toLowerCase(),Q()})}function Ve(){return N.filter(t=>{const e=J==="all"||t.category===J||t.tags.includes(J),i=!U||t.name.toLowerCase().includes(U)||t.district.toLowerCase().includes(U)||t.type.toLowerCase().includes(U);return e&&i})}function Q(){const t=Ve(),e=document.getElementById("destinations-grid"),i=document.getElementById("results-count");if(i&&(i.textContent=`${t.length} Destination${t.length!==1?"s":""}`),!!e){if(!t.length){e.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">😕 No destinations found. Try a different filter.</div>';return}e.innerHTML=t.map(a=>Oe(a)).join(""),e.querySelectorAll("[data-href]").forEach(a=>{a.addEventListener("click",()=>window.router.navigate(a.dataset.href))})}}function Ue(){const t=N.filter(i=>i.reviews<50),e=document.getElementById("hidden-gems-grid");e&&(e.innerHTML=t.slice(0,4).map(i=>`
    <div class="card" data-href="/destination/${i.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:160px">
        <img src="${i.coverImage}" alt="${i.name}" loading="lazy" />
        <div class="card-badge">💎 HIDDEN GEM</div>
      </div>
      <div class="card-body" style="padding:14px">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px">${i.name}</div>
        <div style="font-size:0.8rem;color:var(--text-muted)">📍 ${i.district}</div>
      </div>
    </div>
  `).join(""),e.querySelectorAll("[data-href]").forEach(i=>{i.addEventListener("click",()=>window.router.navigate(i.dataset.href))}))}function Oe(t){const e={Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[t.difficulty]||"#94a3b8";return`
    <div class="card destination-card animate-in" data-href="/destination/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        <div class="card-rating">${S(t.rating)} <span>${t.rating} (${t.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${t.name}</h4>
        <div class="card-meta" style="margin-bottom:10px">
          📍 ${t.district} &nbsp;•&nbsp; ⏱ ${t.duration} &nbsp;•&nbsp;
          <span style="color:${e};font-weight:600">${t.difficulty}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${t.tagline}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;color:var(--text-muted)">
          <span>🌤 Best: ${t.bestTime}</span>
          <span class="btn btn-outline btn-sm">Explore →</span>
        </div>
      </div>
    </div>
  `}const X=[{id:"itin-1",destinationId:"vantawng-falls",days:1,title:"1-Day: Vantawng Falls Trail",category:"adventure",stayId:"vantawng-lodge",plan:[{day:1,activities:["7 AM: Arrive Thenzawl","9 AM: Trek to Vantawng Falls (750ft drop!)","12 PM: Picnic lunch near the falls","2 PM: Village walk & bamboo crafts","5 PM: Sunset from ridge viewpoint","7 PM: Mizo dinner at Vantawng Lodge"]}]},{id:"itin-2",destinationId:"phawngpui-peak",days:3,title:"3-Day: Blue Mountain Summit",category:"adventure",stayId:null,plan:[{day:1,activities:["Drive to Lawngtlai (8 hrs from Aizawl)","Base camp setup","Sunset from lower ridge","Campfire dinner"]},{day:2,activities:["5 AM: Summit attempt (2,157m)","10 AM: Myanmar panorama at peak","Afternoon: Wildlife trail","Stargazing night"]},{day:3,activities:["Dawn photography","Rare orchid walk with guide","Return journey","Buy Puan textile souvenirs"]}]},{id:"itin-3",destinationId:"tam-dil-lake",days:1,title:"1-Day: Tam Dil Lake Escape",category:"relaxation",stayId:"tamdil-lakehouse",plan:[{day:1,activities:["9 AM: Drive from Aizawl (2 hrs)","11 AM: Morning boat ride on the lake","1 PM: Lakeside picnic lunch","3 PM: Pine forest walk","5 PM: Golden hour on the lake","7 PM: Return or stay overnight"]}]},{id:"itin-4",destinationId:"champhai",days:2,title:"2-Day: Champhai Valley & Myanmar Views",category:"relaxation",stayId:"champhai-farmstay",plan:[{day:1,activities:["Morning: Drive to Champhai (157 km)","Afternoon: Farm visit & fruit picking","Evening: Myanmar border viewpoint sunset","Night: Traditional Mizo dinner with family"]},{day:2,activities:["Dawn: Valley fog photography","Morning: Champhai museum & market","Afternoon: Murlen National Park entry","Evening: Return to Aizawl"]}]},{id:"itin-5",destinationId:"reiek-tlang",days:1,title:"1-Day: Reiek Heritage Village",category:"culture",stayId:"bamboo-haven",plan:[{day:1,activities:["8 AM: Depart Aizawl","9:30 AM: Reiek traditional village walk","11 AM: Mizo cultural exhibits","1 PM: Lunch at village café","3 PM: Hilltop panoramic viewpoint","5 PM: Return or Bamboo Haven overnight"]}]},{id:"itin-6",destinationId:"palak-dil",days:2,title:"2-Day: Palak Dil & Saiha Wilderness",category:"wildlife",stayId:null,plan:[{day:1,activities:["Early morning departure from Aizawl","Afternoon: Arrive Saiha","Evening: Palak Dil lake sunset cruise","Night: Forest lodge stay"]},{day:2,activities:["5 AM: Bird watching (migratory species)","Morning: Jungle trail with local guide","Afternoon: Return journey"]}]}],P=[{id:"bamboo-haven",name:"Bamboo Haven Homestay",type:"Homestay",host:{name:"Liana Hnamte",avatar:"LH",phone:"+91 98765 43210",since:"2022"},location:"Reiek Village, Mamit District",lat:23.7152,lng:92.5694,price:1800,maxGuests:4,rooms:2,rating:4.9,reviews:47,coverImage:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",images:["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80","https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80","https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"],amenities:["WiFi","Parking","Home-cooked Food","Hot Water","Valley View","Bonfire"],description:"Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience. Wake up to misty valley views, eat home-cooked Mizo meals, and fall asleep to the sounds of the forest. Our family has lived here for generations.",about:"Liana and her family offer warm Mizo hospitality in their traditional home.",nearbyAttractions:["Reiek Heritage Village (5 min)","Hmuifang (45 min)","Aizawl (35 km)"],checkIn:"14:00",checkOut:"11:00",rules:["No smoking inside","Quiet hours after 10 PM","No outside food","Pets on request"],topRated:!0,verified:!0,tags:["hidden-gem","budget-friendly"]},{id:"champhai-farmstay",name:"Champhai Valley Farmstay",type:"Homestay",host:{name:"Mimi Lalhmangaihi",avatar:"ML",phone:"+91 65432 10987",since:"2022"},location:"Champhai, Champhai District",lat:23.4692,lng:93.3224,price:1500,maxGuests:4,rooms:2,rating:4.6,reviews:54,coverImage:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",images:["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80","https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],amenities:["Organic Farm","Home-cooked Food","Fruit Picking","Valley View","Parking","Hot Water"],description:"Experience life on a working Mizo farm in the fruit bowl of Champhai. Pick fresh oranges, help with the harvest, cook traditional recipes, and fall asleep looking at Myanmar across the valley. The most authentic rural Mizoram experience.",about:"Mimi's family has farmed this land for 3 generations. She loves sharing Mizo culture through food.",nearbyAttractions:["Myanmar border viewpoint","Champhai museum","Murlen National Park (2 hrs)"],checkIn:"14:00",checkOut:"11:00",rules:["Farm work is optional but encouraged","Organic produce only","Early breakfast at 7 AM"],topRated:!1,verified:!0,tags:["farm-experience","budget-friendly"]},{id:"tamdil-lakehouse",name:"Tam Dil Lakehouse",type:"Hotel",host:{name:"Robert Lalthanmawia",avatar:"RL",phone:"+91 54321 09876",since:"2020"},location:"Tam Dil, Saitul District",lat:23.6177,lng:92.8894,price:3200,maxGuests:2,rooms:1,rating:4.9,reviews:89,coverImage:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],amenities:["Lakefront Room","Kayaking","WiFi","AC","Restaurant","Hot Water","Parking","Sunrise View"],description:"Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram's most romantic stay. The floor-to-ceiling windows reflect the lake, the pine forest, and the stars. Breakfast is served on your private deck.",about:"Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.",nearbyAttractions:["Tam Dil Lake (on property)","Tam Dil sanctuary","Saitul (30 min)"],checkIn:"15:00",checkOut:"11:00",rules:["Adults only","No loud parties","Checkout strictly at 11 AM"],topRated:!0,verified:!0,tags:["romantic","lakefront","premium"]}],_e=Object.freeze(Object.defineProperty({__proto__:null,stays:P},Symbol.toStringTag,{value:"Module"})),Ye=[{id:"all",label:"✨ Any Vibe",icon:"🎲"},{id:"adventure",label:"🧗 Adventure"},{id:"relaxation",label:"🌿 Relaxation"},{id:"culture",label:"🏛️ Culture"},{id:"wildlife",label:"🦅 Wildlife"},{id:"budget",label:"💰 Budget"}];let K="all",ee=!1;function Je(){return`
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
          ${Ye.map(t=>`<div class="chip ${t.id==="all"?"active":""}" data-filter="${t.id}">${t.label}</div>`).join("")}
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
  `}function Ke(){var t,e;document.querySelectorAll(".chip[data-filter]").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".chip[data-filter]").forEach(a=>a.classList.remove("active")),i.classList.add("active"),K=i.dataset.filter})}),(t=document.getElementById("dice-btn"))==null||t.addEventListener("click",me),(e=document.getElementById("reroll-btn"))==null||e.addEventListener("click",me)}function me(){if(ee)return;ee=!0;const t=document.getElementById("rolling"),e=document.getElementById("surprise-result"),i=document.getElementById("dice-btn");e.classList.remove("show"),t.classList.remove("hidden"),i.style.animation="spin 0.5s linear infinite",setTimeout(()=>{var d,n;t.classList.add("hidden"),i.style.animation="float 3s ease-in-out infinite";const a=K==="all"?N:N.filter(c=>c.category===K||c.tags.includes(K)),r=a[Math.floor(Math.random()*a.length)]||N[0],s=X.find(c=>c.destinationId===r.id)||X[Math.floor(Math.random()*X.length)],o=P.find(c=>c.id===(s==null?void 0:s.stayId))||P[Math.floor(Math.random()*P.length)];document.getElementById("result-card").innerHTML=Ze(r,s,o),e.classList.add("show"),(d=document.getElementById("book-result-btn"))==null||d.addEventListener("click",()=>{window.router.navigate(`/stay/${o.id}`)}),(n=document.getElementById("view-dest-btn"))==null||n.addEventListener("click",()=>{window.router.navigate(`/destination/${r.id}`)}),ee=!1},1800)}function Ze(t,e,i){return`
    <img src="${t.coverImage}" alt="${t.name}" class="result-img" />
    <div class="result-body text-left">
      <div class="duration-badge">📅 ${(e==null?void 0:e.days)||1}-Day Trip • ${t.district} District</div>
      <h2 style="margin-bottom:8px">${(e==null?void 0:e.title)||t.name+" Adventure"}</h2>
      <p style="margin-bottom:20px">${t.description.slice(0,160)}…</p>

      <h4 style="margin-bottom:12px">📍 Your Itinerary</h4>
      <ul class="itinerary-list">
        ${((e==null?void 0:e.plan)||[]).flatMap(a=>a.activities.slice(0,3).map(r=>`<li><span class="day-badge">Day ${a.day}</span> ${r}</li>`)).slice(0,6).join("")}
      </ul>

      ${i?`
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:24px">
          <div style="font-size:0.8rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🏡 Suggested Stay</div>
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${i.coverImage}" style="width:72px;height:72px;border-radius:12px;object-fit:cover" />
            <div>
              <div style="font-weight:700;margin-bottom:4px">${i.name}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${i.type} • ${i.location}</div>
              <div style="color:var(--emerald-400);font-weight:700;margin-top:4px">₹${i.price.toLocaleString()}/night</div>
            </div>
          </div>
        </div>
      `:""}

      <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
        ${t.highlights.map(a=>`<span class="tag">✓ ${a}</span>`).join("")}
      </div>
      <button class="btn btn-outline mt-16" id="view-dest-btn">View Destination Details</button>
    </div>
  `}function Qe(t){const e=I,i=N.find(o=>o.id===t);if(!i)return'<div class="page-hero container"><h1>Destination not found</h1></div>';const a=P.filter(o=>o.location.toLowerCase().includes(i.district.toLowerCase())).slice(0,2),r=Z(`dest-${t}`),s=we(r);return`
    <!-- Gallery Hero -->
    <div style="padding-top:76px">
      <div class="gallery container" style="margin-top:20px">
        <div class="gallery-main" onclick="openLightbox(0,'${t}')">
          <img src="${i.images[0]}" alt="${i.name}" />
        </div>
        ${i.images.slice(1,3).map((o,d)=>`
          <div class="gallery-thumb" onclick="openLightbox(${d+1},'${t}')">
            <img src="${o}" alt="${i.name} ${d+2}" />
          </div>
        `).join("")}
        ${i.images[3]?`
          <div class="gallery-thumb gallery-more" data-more="📷 View all" onclick="openLightbox(3,'${t}')">
            <img src="${i.images[3]}" alt="more" />
          </div>`:""}
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <!-- Left: Info -->
        <div>
          <!-- Title -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px">
            <h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">${i.name}</h1>
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;width:46px;height:46px;font-size:1.3rem;cursor:pointer;flex-shrink:0;transition:var(--transition)">${xe(`dest-${t}`)?"❤️":"🤍"}</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:20px">
            <div style="display:flex;gap:4px;align-items:center">${S(i.rating)} <strong>${i.rating}</strong> <span style="color:var(--text-muted)">(${i.reviews} reviews)</span></div>
            <span style="color:var(--text-dim)">•</span>
            <span>📍 ${i.district} District</span>
            <span style="color:var(--text-dim)">•</span>
            <span>⏱ ${i.duration}</span>
            <span style="color:var(--text-dim)">•</span>
            <span style="color:${{Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[i.difficulty]}">● ${i.difficulty}</span>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:12px">About this Place</h3>
          <p style="margin-bottom:24px">${i.description}</p>

          <!-- Highlights -->
          <h3 style="margin-bottom:16px">✨ Highlights</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${i.highlights.map(o=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${o}</span></div>`).join("")}
          </div>

          <!-- Best time & Nearby -->
          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🌤</div>
              <div style="font-weight:700;margin-bottom:4px">Best Time to Visit</div>
              <div style="color:var(--text-muted)">${i.bestTime}</div>
            </div>
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🗺️</div>
              <div style="font-weight:700;margin-bottom:4px">Nearby Attractions</div>
              <ul style="list-style:none;color:var(--text-muted);font-size:0.9rem">${i.nearbyAttractions.map(o=>`<li>• ${o}</li>`).join("")}</ul>
            </div>
          </div>

          <!-- Map -->
          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="dest-map" class="map-container" style="margin-bottom:32px"></div>

          <!-- Tags -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
            ${i.tags.map(o=>`<span class="tag">${o}</span>`).join("")}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${s>0?`⭐ ${s} · `:""}${r.length} Review${r.length!==1?"s":""}</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>

          <div id="reviews-list">
            ${r.length?r.map(o=>ke(o)).join(""):'<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>'}
          </div>

          <!-- Write Review (hidden) -->
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input" id="star-input">
                ${[5,4,3,2,1].map(o=>`<input type="radio" name="rating" id="r${o}" value="${o}"><label for="r${o}">★</label>`).join("")}
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
            <h3 style="margin-bottom:24px">🏡 Stays Near ${i.name}</h3>
            <div class="grid-2">
              ${a.map(o=>`
                <div class="card" data-href="/stay/${o.id}" style="cursor:pointer">
                  <div class="card-img-wrap" style="height:160px"><img src="${o.coverImage}" alt="${o.name}" loading="lazy" /></div>
                  <div class="card-body">
                    <div style="font-weight:700">${o.name}</div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px">
                      <span class="price" style="font-size:1rem">₹${o.price.toLocaleString()}<span>/night</span></span>
                      <span>${S(o.rating)} ${o.rating}</span>
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
            <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Find stays, guides, and transport for ${i.name}.</div>
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
  `}function Xe(t){var r,s,o,d,n,c;const e=N.find(p=>p.id===t);if(!e)return;setTimeout(()=>{const p=document.getElementById("dest-map");if(!p||p._leaflet_id)return;const m=L.map("dest-map").setView([e.lat,e.lng],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(m),L.marker([e.lat,e.lng]).addTo(m).bindPopup(`<b>${e.name}</b><br>${e.district} District`).openPopup()},100);const i=e.images;let a=0;window.openLightbox=p=>{a=p,document.getElementById("lb-img").src=i[a],document.getElementById("lightbox").classList.add("open")},(r=document.getElementById("lb-close"))==null||r.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(s=document.getElementById("lb-prev"))==null||s.addEventListener("click",()=>{a=(a-1+i.length)%i.length,document.getElementById("lb-img").src=i[a]}),(o=document.getElementById("lb-next"))==null||o.addEventListener("click",()=>{a=(a+1)%i.length,document.getElementById("lb-img").src=i[a]}),(d=document.getElementById("wishlist-btn"))==null||d.addEventListener("click",()=>{const p=document.getElementById("wishlist-btn"),m=be(`dest-${t}`);p.textContent=m?"❤️":"🤍",u(m?"Added to Wishlist":"Removed from Wishlist")}),(n=document.getElementById("write-review-btn"))==null||n.addEventListener("click",()=>{if(!_()){u("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(c=document.getElementById("submit-review-btn"))==null||c.addEventListener("click",()=>{var b,y,g;const p=parseInt(((b=document.querySelector('input[name="rating"]:checked'))==null?void 0:b.value)||0),m=(g=(y=document.getElementById("review-text"))==null?void 0:y.value)==null?void 0:g.trim();if(!p){u("Please select a rating","","error");return}if(!m){u("Please write your review","","error");return}const v=A();fe({listingId:`dest-${t}`,rating:p,text:m,userName:v.fullName||v.name,userAvatar:v.avatar}),u("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden");const x=Z(`dest-${t}`);document.getElementById("reviews-list").innerHTML=x.map(h=>ke(h)).join("")}),document.querySelectorAll("[data-href]").forEach(p=>{p.addEventListener("click",()=>window.router.navigate(p.dataset.href))})}function ke(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${S(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Visit</span>
    </div>
  `}function et(){return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🏡 Where to Stay</div>
        <h1>Stays in Mizoram</h1>
        <p style="max-width:600px;margin-bottom:32px">Handpicked homestays, lodges, and camps. Every host is verified and every experience is authentic.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${["All","Homestay","Hotel","Lodge","Camping"].map((t,e)=>`<div class="chip ${e===0?"active":""}" data-type="${t.toLowerCase()}">${t}</div>`).join("")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="stays-grid"></div>
      </div>
    </section>
  `}function tt(){let t="all";const e=()=>{const i=t==="all"?P:P.filter(a=>a.type.toLowerCase()===t);document.getElementById("stays-grid").innerHTML=i.map(it).join(""),document.querySelectorAll("[data-href]").forEach(a=>a.addEventListener("click",()=>window.router.navigate(a.dataset.href)))};e(),document.querySelectorAll(".chip[data-type]").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".chip[data-type]").forEach(a=>a.classList.remove("active")),i.classList.add("active"),t=i.dataset.type,e()})})}function it(t){return`
    <div class="card stay-card" data-href="/stay/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        ${t.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);backdrop-filter:blur(8px);padding:4px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
        <div class="card-rating">${S(t.rating)} <span>${t.rating} (${t.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${t.name}</h4>
        <div class="card-meta" style="margin-bottom:8px">📍 ${t.location}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.amenities.slice(0,3).map(e=>`<span class="tag" style="font-size:0.72rem">${e}</span>`).join("")}
          ${t.amenities.length>3?`<span class="tag" style="font-size:0.72rem">+${t.amenities.length-3} more</span>`:""}
        </div>
        <div class="flex-between">
          <span class="price">₹${t.price.toLocaleString()}<span>/night</span></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">👥 Max ${t.maxGuests}</span>
        </div>
      </div>
    </div>
  `}function at(t){const e=P.find(r=>r.id===t);if(!e)return'<div class="page-hero container"><h1>Stay not found</h1></div>';const i=Z(t),a=we(i);return`
    <div style="padding-top:76px">
      <!-- Gallery -->
      <div class="container" style="margin-top:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:6px">${e.name}</h1>
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:0.9rem;color:var(--text-muted)">
              ${S(a>0?a:e.rating)} <strong style="color:var(--text)">${a>0?a:e.rating}</strong>
              <span>(${i.length||e.reviews} reviews)</span> •
              <span>📍 ${e.location}</span> •
              ${e.verified?'<span style="color:var(--emerald-400)">✅ Verified</span>':""}
              ${e.topRated?'<span class="top-rated-badge">🔥 Top Rated</span>':""}
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:8px 16px;color:var(--text);cursor:pointer;font-size:0.9rem">${xe(t)?"❤️ Saved":"🤍 Save"}</button>
          </div>
        </div>

        <!-- Photo Gallery -->
        <div class="gallery" style="margin-bottom:0">
          <div class="gallery-main" onclick="openStayLightbox(0)"><img src="${e.images[0]}" alt="${e.name}" /></div>
          ${e.images.slice(1,3).map((r,s)=>`<div class="gallery-thumb" onclick="openStayLightbox(${s+1})"><img src="${r}" alt="${e.name}" /></div>`).join("")}
          ${e.images[3]?`<div class="gallery-thumb gallery-more" data-more="📷 All photos" onclick="openStayLightbox(3)"><img src="${e.images[3]}" alt="more" /></div>`:""}
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
              <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-600),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.3rem;flex-shrink:0">${e.host.avatar}</div>
              <div>
                <div style="font-weight:700;font-size:1rem">${e.type} hosted by ${e.host.name}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Hosting since ${e.host.since} · ${e.rooms} room${e.rooms>1?"s":""} · Up to ${e.maxGuests} guests</div>
              </div>
            </div>

            <h3 style="margin-bottom:12px">About this place</h3>
            <p style="margin-bottom:28px">${e.description}</p>

            <h3 style="margin-bottom:16px">🛎 Amenities</h3>
            <div class="amenities-grid" style="margin-bottom:32px">
              ${e.amenities.map(r=>`<div class="amenity-item"><span class="amenity-icon">${{WiFi:"📶",Parking:"🅿️","Home-cooked Food":"🍛","Breakfast Included":"🥐","Hot Water":"🚿","Valley View":"🌄",Bonfire:"🔥","Waterfall View":"💦","Guide Service":"🧭","Tents Provided":"⛺",Campfire:"🔥","Meals Included":"🍽️","Mountain Guide":"🧗",Stargazing:"🔭","Trekking Gear":"🎒","Organic Farm":"🌱","Fruit Picking":"🍊",Kayaking:"🚣",AC:"❄️",Restaurant:"🍴","Sunrise View":"🌅",Lakefront:"💧"}[r]||"✓"}</span><span class="amenity-label">${r}</span></div>`).join("")}
            </div>

            <h3 style="margin-bottom:16px">📅 Availability & Rules</h3>
            <div class="grid-2" style="margin-bottom:32px">
              <div class="card card-body">
                <div style="font-weight:700;margin-bottom:12px">Check-in / Check-out</div>
                <div style="color:var(--text-muted);font-size:0.9rem">Check-in: <strong style="color:var(--text)">${e.checkIn}</strong></div>
                <div style="color:var(--text-muted);font-size:0.9rem;margin-top:6px">Check-out: <strong style="color:var(--text)">${e.checkOut}</strong></div>
              </div>
              <div class="card card-body">
                <div style="font-weight:700;margin-bottom:12px">House Rules</div>
                <ul style="list-style:none;font-size:0.85rem;color:var(--text-muted)">
                  ${e.rules.map(r=>`<li style="margin-bottom:4px">• ${r}</li>`).join("")}
                </ul>
              </div>
            </div>

            <h3 style="margin-bottom:16px">📍 Location</h3>
            <div id="stay-map" class="map-container" style="margin-bottom:32px"></div>
            <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px">📍 ${e.location}</p>
            <div style="margin-bottom:32px">
              ${e.nearbyAttractions.map(r=>`<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">→ ${r}</div>`).join("")}
            </div>

            <!-- Reviews -->
            <div class="divider-h"></div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
              <h3>${a>0?`⭐ ${a} · `:`⭐ ${e.rating} · `}${i.length||e.reviews} Reviews</h3>
              <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
            </div>
            <div id="reviews-list">
              ${i.length?i.map(r=>re(r)).join(""):rt()}
            </div>
            <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
              <h4 style="margin-bottom:20px">Share Your Experience</h4>
              <div class="form-group">
                <label class="form-label">Rating</label>
                <div class="star-input">${[5,4,3,2,1].map(r=>`<input type="radio" name="rating" id="r${r}" value="${r}"><label for="r${r}">★</label>`).join("")}</div>
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
                <span class="price" style="font-size:1.6rem">₹${e.price.toLocaleString()}</span>
                <span style="color:var(--text-muted)">/night</span>
                <div style="display:flex;gap:4px;margin-top:6px">${S(a>0?a:e.rating)} <span style="font-size:0.85rem;color:var(--text-muted)">${i.length||e.reviews} reviews</span></div>
              </div>
              <div class="booking-dates">
                <div class="booking-date-field"><label>CHECK-IN</label><input type="date" id="checkin-date" /></div>
                <div class="booking-date-field"><label>CHECK-OUT</label><input type="date" id="checkout-date" /></div>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Guests</label>
                <select class="form-select" id="guests-count">
                  ${Array.from({length:e.maxGuests},(r,s)=>`<option value="${s+1}">${s+1} guest${s>0?"s":""}</option>`).join("")}
                </select>
              </div>
              <div id="price-breakdown" style="margin-bottom:16px"></div>
              <button class="btn btn-primary w-full" id="book-now-btn" style="justify-content:center;font-size:1rem;padding:16px">Reserve & Pay →</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px">🔒 Secured by Razorpay · You won't be charged yet</p>

              <div class="divider-h"></div>
              <div style="font-weight:700;margin-bottom:12px">Contact Host</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${e.host.phone}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">💬 Usually replies within 2 hours</div>
            </div>
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
  `}function st(t){var c,p,m,v,x,b,y;const e=P.find(g=>g.id===t);if(!e)return;const i=new Date,a=new Date(i);a.setDate(a.getDate()+1);const r=g=>g.toISOString().split("T")[0],s=document.getElementById("checkin-date"),o=document.getElementById("checkout-date");s&&(s.value=r(i)),o&&(o.value=r(a));const d=()=>{const g=new Date(s==null?void 0:s.value),h=new Date(o==null?void 0:o.value),w=Math.max(1,Math.round((h-g)/864e5)),$=w*e.price,z=document.getElementById("price-breakdown");z&&(z.innerHTML=`
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>₹${e.price.toLocaleString()} × ${w} night${w>1?"s":""}</span><span>₹${(w*e.price).toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>Service fee</span><span>₹${Math.round($*.05).toLocaleString()}</span>
      </div>
      <div style="height:1px;background:var(--glass-border);margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:700">
        <span>Total</span><span>₹${Math.round($*1.05).toLocaleString()}</span>
      </div>
    `)};d(),s==null||s.addEventListener("change",d),o==null||o.addEventListener("change",d),(c=document.getElementById("book-now-btn"))==null||c.addEventListener("click",()=>{var E;const g=s==null?void 0:s.value,h=o==null?void 0:o.value,w=(E=document.getElementById("guests-count"))==null?void 0:E.value;if(!g||!h){u("Please select dates","","error");return}const $=Math.max(1,Math.round((new Date(h)-new Date(g))/864e5)),z=Math.round($*e.price*1.05);window.router.navigate(`/book/${t}?checkin=${g}&checkout=${h}&guests=${w}&total=${z}`)});let n=0;window.openStayLightbox=g=>{n=g,document.getElementById("lb-img").src=e.images[n],document.getElementById("lightbox").classList.add("open")},(p=document.getElementById("lb-close"))==null||p.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(m=document.getElementById("lb-prev"))==null||m.addEventListener("click",()=>{n=(n-1+e.images.length)%e.images.length,document.getElementById("lb-img").src=e.images[n]}),(v=document.getElementById("lb-next"))==null||v.addEventListener("click",()=>{n=(n+1)%e.images.length,document.getElementById("lb-img").src=e.images[n]}),(x=document.getElementById("wishlist-btn"))==null||x.addEventListener("click",()=>{const g=document.getElementById("wishlist-btn"),h=be(t);g.textContent=h?"❤️ Saved":"🤍 Save",u(h?"Added to Wishlist!":"Removed from Wishlist")}),setTimeout(()=>{const g=document.getElementById("stay-map");if(!g||g._leaflet_id)return;const h=L.map("stay-map").setView([e.lat,e.lng],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(h),L.marker([e.lat,e.lng]).addTo(h).bindPopup(`<b>${e.name}</b>`).openPopup()},100),(b=document.getElementById("write-review-btn"))==null||b.addEventListener("click",()=>{if(!_()){u("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(y=document.getElementById("submit-review-btn"))==null||y.addEventListener("click",()=>{var $,z,E;const g=parseInt((($=document.querySelector('input[name="rating"]:checked'))==null?void 0:$.value)||0),h=(E=(z=document.getElementById("review-text"))==null?void 0:z.value)==null?void 0:E.trim();if(!g||!h){u("Please fill all fields","","error");return}const w=A();fe({listingId:t,rating:g,text:h,userName:w.fullName||w.name,userAvatar:w.avatar}),u("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden"),document.getElementById("reviews-list").innerHTML=Z(t).map(B=>re(B)).join("")})}function re(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${S(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Guest</span>
    </div>
  `}function rt(t){return[{userName:"Priya Sharma",userAvatar:"P",rating:5,text:"Absolutely magical experience! The host was so welcoming and the views were breathtaking. Will definitely come back.",createdAt:"2026-01-15T00:00:00Z"},{userName:"Rahul Das",userAvatar:"R",rating:4,text:"Beautiful location and authentic Mizo food. A bit remote but that's the charm! Highly recommended for nature lovers.",createdAt:"2026-02-20T00:00:00Z"}].map(i=>re(i)).join("")}const oe=[{id:"guide-zova",name:"Zova Lalchhuanawma",avatar:"ZL",title:"Expert Trekking & Wildlife Guide",experience:"10 years",languages:["English","Mizo","Hindi"],specialties:["Phawngpui Trek","Wildlife Spotting","Bird Watching","Photography Tours"],rating:4.9,reviews:88,price:1,priceUnit:"per day",location:"Aizawl (covers all districts)",phone:"+91 98765 11111",email:"zova.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",images:["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"],bio:"Born and raised in the highlands of Mizoram, Zova has led over 300 trekking expeditions across the Lushai Hills. He's passionate about protecting Mizoram's biodiversity and sharing it with travellers. A certified wilderness first responder and birding enthusiast.",certifications:["First Aid Certified","Wildlife Institute of India","Ministry of Tourism Certified"],verified:!0,available:!0,tags:["trekking","wildlife","birding"]},{id:"guide-mary",name:"Mary Vanlalruati",avatar:"MV",title:"Cultural & Heritage Tour Guide",experience:"7 years",languages:["English","Mizo","Hindi","Bengali"],specialties:["Aizawl City Tours","Mizo Culture","Traditional Weaving","Village Walks"],rating:4.8,reviews:62,price:1200,priceUnit:"per day",location:"Aizawl",phone:"+91 87654 22222",email:"mary.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",images:["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80","https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],bio:"Mary holds a Master's degree in Mizo history and has been sharing her culture with visitors for 7 years. She can take you deep into the soul of Mizo traditions — from bamboo weaving to traditional music, from ancient rituals to modern Aizawl.",certifications:["Ministry of Tourism Certified","Heritage Interpreter (INTACH)"],verified:!0,available:!0,tags:["culture","heritage","city-tour"]},{id:"guide-rema",name:"Rema Chhakchhuak",avatar:"RC",title:"Adventure Sports & River Guide",experience:"5 years",languages:["English","Mizo"],specialties:["River Kayaking","Rappelling","Jungle Camping","Night Trekking"],rating:4.7,reviews:41,price:1800,priceUnit:"per day",location:"Serchhip / South Mizoram",phone:"+91 76543 33333",email:"rema.guide@lushaitrips.com",coverImage:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",images:["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80","https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"],bio:"Rema is the go-to guide for adrenaline seekers in Mizoram. He specialises in river kayaking on the pristine Tuipui and Tlawng rivers, rappelling near Vantawng Falls, and multi-day jungle camping expeditions.",certifications:["Swift Water Rescue Certified","Wilderness First Aid","Adventure Tourism Certified"],verified:!0,available:!0,tags:["adventure","kayaking","camping"]}],ne=[{id:"transport-raj",name:"Raj Mizoram Travels",owner:"Rajesh Chhakchhuak",avatar:"RC",type:"Car & SUV Rental",vehicles:[{name:"Toyota Innova Crysta",capacity:7,price:3500,priceUnit:"per day (fuel incl.)"},{name:"Maruti Ertiga",capacity:7,price:2500,priceUnit:"per day (fuel incl.)"},{name:"Mahindra Bolero",capacity:9,price:3e3,priceUnit:"per day (fuel incl.)"}],rating:4.8,reviews:76,phone:"+91 98765 44444",email:"raj.travels@lushaitrips.com",location:"Aizawl (airport pickup available)",coverImage:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",images:["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80"],description:"Raj Mizoram Travels offers reliable, comfortable transport across Mizoram's mountain roads with experienced local drivers who know every route. Airport pickup, multi-day hire, and custom itinerary drops available.",features:["Airport Pickup","AC Vehicles","Experienced Drivers","Night Driving","All Districts"],verified:!0,available:!0},{id:"transport-zara",name:"Zara Mountain Bikes",owner:"Zaramsanga Colney",avatar:"ZC",type:"Motorcycle & Bike Rental",vehicles:[{name:"Royal Enfield Himalayan",capacity:2,price:1800,priceUnit:"per day"},{name:"Honda CB350",capacity:2,price:1400,priceUnit:"per day"},{name:"Mountain Bicycle",capacity:1,price:400,priceUnit:"per day"}],rating:4.6,reviews:38,phone:"+91 87654 55555",email:"zara.bikes@lushaitrips.com",location:"Aizawl",coverImage:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",images:["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80"],description:"Explore Mizoram the way it was meant to be explored — on two wheels. Our fleet of well-maintained Royal Enfields and Honda bikes are ideal for the winding mountain roads of Mizoram. Helmets, riding gear, and maps provided.",features:["Helmets Included","Riding Gear","Route Maps","Breakdown Assistance","Delivery to Hotel"],verified:!0,available:!0},{id:"transport-lal",name:"Lal Shared Sumo Service",owner:"Lalbiakzuala",avatar:"LB",type:"Shared Sumo / Van",vehicles:[{name:"Tata Sumo (Shared)",capacity:10,price:350,priceUnit:"per seat per route"},{name:"Force Traveller Van",capacity:16,price:4500,priceUnit:"per day (private)"}],rating:4.4,reviews:55,phone:"+91 76543 66666",email:"lal.sumo@lushaitrips.com",location:"Aizawl (all major routes)",coverImage:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",images:["https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],description:"Budget-friendly shared Sumo services connect all major towns and tourist spots. Perfect for solo travellers or groups on a budget. Private van hire also available for custom tours and group trips.",features:["Budget Friendly","All Major Routes","Daily Departures","Group Discounts","Private Option"],verified:!0,available:!0}];function ot(){return`
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
          <a href="${I("/host-signup-guide")}" class="btn btn-primary btn-lg" data-link>Register as a Guide</a>
        </div>
      </div>
    </section>
  `}function nt(){const t=document.getElementById("guides-grid");t&&(t.innerHTML=oe.map(e=>`
    <div class="card" data-href="/guide/${e.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:240px">
        <img src="${e.coverImage}" alt="${e.name}" loading="lazy" style="object-position:top" />
        ${e.verified?'<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">✅ VERIFIED</div>':""}
        <div class="card-rating">${S(e.rating)} <span>${e.rating} (${e.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${e.name}</h4>
        <div style="font-size:0.85rem;color:var(--emerald-400);font-weight:600;margin-bottom:6px">${e.title}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">📍 ${e.location} &nbsp;•&nbsp; 🗓 ${e.experience}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${e.languages.map(i=>`<span class="tag" style="font-size:0.72rem">🗣 ${i}</span>`).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${e.specialties.slice(0,2).map(i=>`<span class="tag">${i}</span>`).join("")}
        </div>
        <div class="flex-between">
          <span class="price" style="font-size:1.1rem">₹${e.price.toLocaleString()}<span>/${e.priceUnit.split(" ")[1]}</span></span>
          <span class="btn btn-outline btn-sm">View & Book</span>
        </div>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-href]").forEach(e=>e.addEventListener("click",()=>window.router.navigate(e.dataset.href))))}function lt(t){const e=oe.find(i=>i.id===t);return e?`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${e.coverImage}" alt="${e.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${e.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${e.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${S(e.rating)} <strong>${e.rating}</strong> <span style="color:var(--text-muted)">(${e.reviews} reviews)</span></div>
                <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${e.location} &nbsp;•&nbsp; 🗓 ${e.experience} experience</div>
              </div>
            </div>
            <div class="divider-h"></div>
            <h3 style="margin-bottom:12px">About ${e.name}</h3>
            <p style="margin-bottom:24px">${e.bio}</p>
            <h3 style="margin-bottom:16px">🎯 Specialties</h3>
            <div class="amenities-grid" style="margin-bottom:28px">
              ${e.specialties.map(i=>`<div class="amenity-item"><span class="amenity-icon">🏔</span><span class="amenity-label">${i}</span></div>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">🗣 Languages</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
              ${e.languages.map(i=>`<span class="tag">${i}</span>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">📜 Certifications</h3>
            <div style="margin-bottom:32px">
              ${e.certifications.map(i=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--glass-border)"><span style="color:var(--emerald-400)">✅</span><span style="font-size:0.9rem;color:var(--text-muted)">${i}</span></div>`).join("")}
            </div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
              <h4 style="margin-bottom:16px">📸 Gallery</h4>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
                ${e.images.slice(1).map((i,a)=>`<img src="${i}" alt="${e.name} ${a+2}" style="width:100%;height:130px;object-fit:cover;border-radius:var(--radius-sm)" />`).join("")}
              </div>
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div class="booking-price"><span class="price" style="font-size:1.6rem">₹${e.price.toLocaleString()}</span><span style="color:var(--text-muted)">/${e.priceUnit}</span></div>
              <div class="form-group mt-16"><label class="form-label">Select Date</label><input type="date" class="form-input" id="guide-date" /></div>
              <div class="form-group"><label class="form-label">Trip Type</label>
                <select class="form-select" id="guide-trip">
                  ${e.specialties.map(i=>`<option>${i}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Group Size</label>
                <select class="form-select" id="guide-group">
                  ${[1,2,3,4,5,6].map(i=>`<option value="${i}">${i} person${i>1?"s":""}</option>`).join("")}
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
  `:'<div class="page-hero container"><h1>Guide not found</h1></div>'}function dt(t){var r;const e=oe.find(s=>s.id===t);if(!e)return;const i=new Date().toISOString().split("T")[0],a=document.getElementById("guide-date");a&&(a.value=i),(r=document.getElementById("book-guide-btn"))==null||r.addEventListener("click",()=>{var d;const s=(d=document.getElementById("guide-date"))==null?void 0:d.value,o=e.price;window.router.navigate(`/book/guide-${t}?date=${s}&total=${o}&type=guide&name=${encodeURIComponent(e.name)}`)})}function ct(){return`
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
          <a href="${I("/host-signup-transport")}" class="btn btn-primary btn-lg" data-link>List Your Transport</a>
        </div>
      </div>
    </section>
  `}function pt(){const t=document.getElementById("transport-grid");t&&(t.innerHTML=ne.map(e=>`
    <div class="card" data-href="/transport/${e.id}" style="cursor:pointer">
      <div class="card-img-wrap">
        <img src="${e.coverImage}" alt="${e.name}" loading="lazy" />
        <div class="card-badge">${e.type.toUpperCase()}</div>
        <div class="card-rating">${S(e.rating)} <span>${e.rating} (${e.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${e.name}</h4>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">👤 ${e.owner} &nbsp;•&nbsp; 📍 ${e.location}</div>
        <div style="margin-bottom:14px">
          ${e.vehicles.slice(0,2).map(i=>`
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--glass-border)">
              <span style="color:var(--text-muted)">🚗 ${i.name}</span>
              <span style="color:var(--emerald-400);font-weight:600">₹${i.price.toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${e.features.slice(0,3).map(i=>`<span class="tag" style="font-size:0.72rem">${i}</span>`).join("")}
        </div>
        <span class="btn btn-outline btn-sm w-full" style="justify-content:center">View & Book</span>
      </div>
    </div>
  `).join(""),t.querySelectorAll("[data-href]").forEach(e=>e.addEventListener("click",()=>window.router.navigate(e.dataset.href))))}function mt(t){const e=ne.find(i=>i.id===t);return e?`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${e.name}</h1>
                ${e.verified?'<span style="color:var(--emerald-400);font-size:0.85rem">✅ Verified Provider</span>':""}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${S(e.rating)} <strong>${e.rating}</strong> <span style="color:var(--text-muted)">(${e.reviews} reviews)</span></div>
              <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${e.location} &nbsp;•&nbsp; 👤 ${e.owner}</div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;border-radius:var(--radius);overflow:hidden">
              ${e.images.map((i,a)=>`<img src="${i}" alt="${e.name}" style="width:100%;height:180px;object-fit:cover;${a===0?"grid-column:1/3;height:260px":""}" loading="lazy" />`).join("")}
            </div>

            <h3 style="margin-bottom:12px">About this Service</h3>
            <p style="margin-bottom:28px">${e.description}</p>

            <h3 style="margin-bottom:16px">🚗 Available Vehicles</h3>
            <div style="margin-bottom:32px">
              ${e.vehicles.map(i=>`
                <div class="card card-body" style="margin-bottom:12px;padding:20px">
                  <div class="flex-between">
                    <div>
                      <div style="font-weight:700;margin-bottom:4px">${i.name}</div>
                      <div style="font-size:0.85rem;color:var(--text-muted)">👥 Up to ${i.capacity} passengers</div>
                    </div>
                    <div style="text-align:right">
                      <div class="price" style="font-size:1.1rem">₹${i.price.toLocaleString()}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted)">${i.priceUnit}</div>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

            <h3 style="margin-bottom:16px">✨ Features</h3>
            <div class="amenities-grid">
              ${e.features.map(i=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${i}</span></div>`).join("")}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:4px">Book Transport</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">Select vehicle and dates</div>
              <div class="form-group">
                <label class="form-label">Vehicle</label>
                <select class="form-select" id="vehicle-select">
                  ${e.vehicles.map(i=>`<option value="${i.price}">${i.name} — ₹${i.price.toLocaleString()} ${i.priceUnit}</option>`).join("")}
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
  `:'<div class="page-hero container"><h1>Not found</h1></div>'}function ut(t){var o;const e=ne.find(d=>d.id===t);if(!e)return;const i=new Date,a=new Date(i);a.setDate(a.getDate()+1);const r=d=>d.toISOString().split("T")[0];document.getElementById("pickup-date").value=r(i),document.getElementById("dropoff-date").value=r(a);const s=()=>{var x,b,y;const d=parseInt(((x=document.getElementById("vehicle-select"))==null?void 0:x.value)||0),n=new Date((b=document.getElementById("pickup-date"))==null?void 0:b.value),c=new Date((y=document.getElementById("dropoff-date"))==null?void 0:y.value),p=Math.max(1,Math.round((c-n)/864e5)),m=d*p,v=document.getElementById("transport-total");return v&&(v.innerHTML=`<div class="flex-between"><span>₹${d.toLocaleString()} × ${p} day${p>1?"s":""}</span><strong style="color:var(--text)">₹${m.toLocaleString()}</strong></div>`),m};s(),["vehicle-select","pickup-date","dropoff-date"].forEach(d=>{var n;return(n=document.getElementById(d))==null?void 0:n.addEventListener("change",s)}),(o=document.getElementById("book-transport-btn"))==null||o.addEventListener("click",()=>{const d=s();window.router.navigate(`/book/${t}?total=${d}&type=transport&name=${encodeURIComponent(e.name)}`)})}const gt="rzp_test_SXRQlAUuikOAUn";function vt(t,e){var m,v,x,b;const i=e.get("checkin")||"",a=e.get("checkout")||"",r=e.get("guests")||"1",s=parseInt(e.get("total")||2e3),o=e.get("type")||"stay",d=e.get("name")?decodeURIComponent(e.get("name")):"",c=P.find(y=>y.id===t)||{name:d||t,coverImage:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",type:o},p=i&&a?Math.max(1,Math.round((new Date(a)-new Date(i))/864e5)):1;return`
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
                <a href="${I("/login")}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
              </div>
            `}

            

            <h3 style="margin-bottom:20px">Your Information</h3>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="pay-name" placeholder="Your full name" value="${((m=A())==null?void 0:m.fullName)||((v=A())==null?void 0:v.name)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="pay-email" placeholder="email@example.com" value="${((x=A())==null?void 0:x.email)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="pay-phone" placeholder="+91 98765 43210" value="${((b=A())==null?void 0:b.phone)||""}" />
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
                ${i?`
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">📅 ${new Date(i+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short"})} → ${new Date(a+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px">👥 ${r} guest${r>1?"s":""} · ${p} night${p>1?"s":""}</div>
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
  `}function ht(t,e){var c;const i=parseInt(e.get("total")||2e3),a=e.get("checkin")||"",r=e.get("checkout")||"",s=e.get("guests")||"1",o=e.get("type")||"stay",d=e.get("name")?decodeURIComponent(e.get("name")):t,n=P.find(p=>p.id===t);(c=document.getElementById("pay-btn"))==null||c.addEventListener("click",()=>{var g,h,w,$,z,E,B;if(!_()){u("Please log in first","","error");return}const p=(h=(g=document.getElementById("pay-name"))==null?void 0:g.value)==null?void 0:h.trim(),m=($=(w=document.getElementById("pay-email"))==null?void 0:w.value)==null?void 0:$.trim(),v=(E=(z=document.getElementById("pay-phone"))==null?void 0:z.value)==null?void 0:E.trim();if(!p||!m||!v){u("Please fill all fields","","error");return}const b={userId:A().id,listingId:t,listingName:(n==null?void 0:n.name)||d,listingType:o,checkin:a,checkout:r,guests:s,total:i,guestName:p,guestEmail:m,guestPhone:v,notes:((B=document.getElementById("pay-notes"))==null?void 0:B.value)||""},y={key:gt,amount:i*100,currency:"INR",name:"LushaiTrips",description:(n==null?void 0:n.name)||d,image:"https://via.placeholder.com/100x100/065f46/ffffff?text=LT",prefill:{name:p,email:m,contact:v},theme:{color:"#059669"},handler:function(M){const H=Me({...b,razorpayPaymentId:M.razorpay_payment_id});u("Payment Successful! 🎉",`Ref: ${H.id}`),setTimeout(()=>window.router.navigate("/booking-confirmed"),800)},modal:{ondismiss:()=>u("Payment cancelled","","error")}};try{new Razorpay(y).open()}catch{u("Razorpay not loaded","Please check your internet connection","error")}})}function yt(){var i;const t=I,e=Pe();return`
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
            <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:800"><span>Total Paid</span><span style="color:var(--emerald-400)">₹${(i=e.total)==null?void 0:i.toLocaleString()}</span></div>
          </div>
        `:""}

        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:20px;margin-bottom:32px;text-align:left">
          <div style="font-weight:700;margin-bottom:12px">📋 What happens next?</div>
          ${["📧 Confirmation sent to your email","📞 Host will contact you within 24 hours","🗺️ Your itinerary is ready in My Bookings","⭐ After your stay, leave a review to help others"].map(a=>`<div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">${a}</div>`).join("")}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="${t("/profile")}" class="btn btn-primary btn-lg" data-link>View My Bookings</a>
          <a href="${t("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore More</a>
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

        <div class="auth-switch mt-16">Don't have an account? <a href="${I("/signup-user")}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${I("/host-signup-stay")}" data-link>Register your property →</a></div>
      </div>
    </div>
  `}function xt(){var t,e,i;(t=document.getElementById("login-btn"))==null||t.addEventListener("click",()=>{var s,o,d;const a=(o=(s=document.getElementById("login-email"))==null?void 0:s.value)==null?void 0:o.trim(),r=(d=document.getElementById("login-password"))==null?void 0:d.value;if(!a||!r){u("Please fill all fields","","error");return}try{Te(a,r),u("Welcome back! 👋"),setTimeout(()=>window.router.navigate("/"),500)}catch(n){u(n.message,"","error")}}),(e=document.getElementById("login-password"))==null||e.addEventListener("keydown",a=>{var r;a.key==="Enter"&&((r=document.getElementById("login-btn"))==null||r.click())}),(i=document.getElementById("google-btn"))==null||i.addEventListener("click",()=>{u("Google login coming soon!","Use email login for now.")})}function wt(){return`
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
        <div class="auth-switch mt-16">Already have an account? <a href="${I("/login")}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${I("/host-signup-stay")}" data-link>Register as Host →</a></div>
      </div>
    </div>
  `}function kt(){var t,e,i;(t=document.getElementById("signup-btn"))==null||t.addEventListener("click",()=>{var n,c,p,m,v,x,b,y;const a=(c=(n=document.getElementById("su-name"))==null?void 0:n.value)==null?void 0:c.trim(),r=(m=(p=document.getElementById("su-email"))==null?void 0:p.value)==null?void 0:m.trim(),s=(x=(v=document.getElementById("su-phone"))==null?void 0:v.value)==null?void 0:x.trim(),o=(b=document.getElementById("su-password"))==null?void 0:b.value,d=(y=document.getElementById("su-confirm"))==null?void 0:y.value;if(!a||!r||!s||!o){u("Please fill all fields","","error");return}if(o!==d){u("Passwords do not match","","error");return}if(o.length<8){u("Password must be at least 8 characters","","error");return}try{Be({fullName:a,email:r,phone:s,password:o}),u("Account created! Welcome 🎉"),setTimeout(()=>window.router.navigate("/discover"),600)}catch(g){u(g.message,"","error")}}),(e=document.getElementById("google-signup-btn"))==null||e.addEventListener("click",()=>u("Google signup coming soon!")),(i=document.getElementById("phone-signup-btn"))==null||i.addEventListener("click",()=>u("OTP signup coming soon!"))}let T=1;const W=5,l={};let C=[];const $t=["Basic Info","Property","Stay Details","Photos","Rules & Submit"];function Lt(){return`
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
          <button class="btn btn-secondary" id="prev-btn" style="${T===1?"visibility:hidden":""}">← Back</button>
          <div style="color:var(--text-dim);font-size:0.85rem;align-self:center">Step ${T} of ${W}</div>
          <button class="btn btn-primary" id="next-btn">${T===W?"🚀 Submit Listing":"Next →"}</button>
        </div>
      </div>
    </div>
  `}function $e(){return Array.from({length:W},(t,e)=>{const i=e+1;return`
      <div class="step ${i<T?"done":i===T?"active":""}">
        <div class="step-wrapper">
          <div class="step-circle">${i<T?"✓":i}</div>
          <div class="step-label">${$t[e]}</div>
        </div>
      </div>
      ${i<W?'<div class="step-line"></div>':""}
    `}).join("")}function Le(t){switch(t){case 1:return`
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
      <div id="photo-count" style="margin-top:10px;font-size:0.85rem;color:var(--text-muted)">${C.length>0?C.length+" photo(s) uploaded":"No photos uploaded yet"}</div>`;case 5:return`
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
      </label>`}}function zt(t){var e,i,a,r,s,o,d,n,c,p,m,v,x,b,y,g,h,w,$,z,E,B,M,H,D,R,q,j,F;switch(t){case 1:l.name=(i=(e=document.getElementById("h-name"))==null?void 0:e.value)==null?void 0:i.trim(),l.email=(r=(a=document.getElementById("h-email"))==null?void 0:a.value)==null?void 0:r.trim(),l.phone=(o=(s=document.getElementById("h-phone"))==null?void 0:s.value)==null?void 0:o.trim(),l.password=(d=document.getElementById("h-password"))==null?void 0:d.value;const Y=(n=document.getElementById("h-confirm"))==null?void 0:n.value;return!l.name||!l.email||!l.phone||!l.password?(u("Please fill all required fields","","error"),!1):l.password!==Y?(u("Passwords do not match","","error"),!1):l.password.length<8?(u("Password must be 8+ characters","","error"),!1):!0;case 2:return l.propName=(p=(c=document.getElementById("h-prop-name"))==null?void 0:c.value)==null?void 0:p.trim(),l.propType=(m=document.querySelector('input[name="prop-type"]:checked'))==null?void 0:m.value,l.address=(x=(v=document.getElementById("h-address"))==null?void 0:v.value)==null?void 0:x.trim(),l.district=(b=document.getElementById("h-district"))==null?void 0:b.value,l.mapsLink=(g=(y=document.getElementById("h-maps"))==null?void 0:y.value)==null?void 0:g.trim(),!l.propName||!l.propType||!l.address||!l.district?(u("Please fill all required fields","","error"),!1):!0;case 3:return l.rooms=(h=document.getElementById("h-rooms"))==null?void 0:h.value,l.maxGuests=(w=document.getElementById("h-guests"))==null?void 0:w.value,l.price=($=document.getElementById("h-price"))==null?void 0:$.value,l.amenities=[...document.querySelectorAll('input[name="amenity"]:checked')].map(G=>G.value),l.description=(E=(z=document.getElementById("h-description"))==null?void 0:z.value)==null?void 0:E.trim(),l.nearby=(M=(B=document.getElementById("h-nearby"))==null?void 0:B.value)==null?void 0:M.trim(),!l.rooms||!l.maxGuests||!l.price||!l.description?(u("Please fill all required fields","","error"),!1):!0;case 4:return C.length<3?(u("Please upload at least 3 photos","","error"),!1):(l.images=C,!0);case 5:return l.checkIn=(H=document.getElementById("h-checkin"))==null?void 0:H.value,l.checkOut=(D=document.getElementById("h-checkout"))==null?void 0:D.value,l.rules=(q=(R=document.getElementById("h-rules"))==null?void 0:R.value)==null?void 0:q.trim(),l.cancellation=(j=document.getElementById("h-cancel"))==null?void 0:j.value,(F=document.getElementById("h-agree"))!=null&&F.checked?!0:(u("Please agree to Terms & Conditions","","error"),!1)}}function ue(t){T=t,document.getElementById("stepper").innerHTML=$e(),document.getElementById("step-container").innerHTML=Le(t),document.getElementById("prev-btn").style.visibility=t===1?"hidden":"visible",document.getElementById("next-btn").textContent=t===W?"🚀 Submit Listing":"Next →",ze(t),window.scrollTo({top:0,behavior:"smooth"})}function ze(t){var e;t===4&&((e=document.getElementById("photo-input"))==null||e.addEventListener("change",i=>{[...i.target.files].forEach(r=>{const s=new FileReader;s.onload=o=>{var m;C.push(o.target.result);const d=document.getElementById("photo-preview"),n=document.getElementById("photo-count"),c=document.createElement("div");c.className="upload-img-wrap";const p=C.length-1;c.innerHTML=`<img src="${o.target.result}" alt="upload" />${p===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img" data-idx="${p}">✕</button>`,d==null||d.appendChild(c),n&&(n.textContent=C.length+" photo(s) uploaded"),(m=c.querySelector(".remove-img"))==null||m.addEventListener("click",v=>{C.splice(p,1),c.remove(),n&&(n.textContent=C.length+" photo(s) uploaded")})},s.readAsDataURL(r)})}))}function Ee(){var t,e;C=[],ze(1),(t=document.getElementById("next-btn"))==null||t.addEventListener("click",()=>{var i,a;zt(T)&&(T===W?Et():(ue(T+1),(i=document.getElementById("next-btn"))==null||i.addEventListener("click",()=>{}),(a=document.getElementById("prev-btn"))==null||a.addEventListener("click",()=>{}),Ee()))}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{T>1&&ue(T-1)})}function Et(){var t,e;try{ae({name:l.name,email:l.email,phone:l.phone,password:l.password,avatar:(t=l.name)==null?void 0:t.charAt(0).toUpperCase(),listing:{name:l.propName,type:l.propType,address:l.address,district:l.district,rooms:l.rooms,maxGuests:l.maxGuests,price:l.price,amenities:l.amenities,description:l.description,images:l.images,checkIn:l.checkIn,checkOut:l.checkOut,rules:(e=l.rules)==null?void 0:e.split(`
`).filter(Boolean),cancellation:l.cancellation}}),T=1,C=[],u("Listing submitted for review! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(i){u(i.message,"","error")}}let V=[];function It(){return`
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
              ${["1 year","2 years","3 years","4 years","5 years","6 years","7 years","8 years","9 years","10+ years"].map(t=>`<option>${t}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Languages Spoken *</label>
            <div class="check-group">
              ${["English","Mizo","Hindi","Bengali","Assamese","Manipuri"].map(t=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-lang" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join("")}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Specialties * <span style="font-size:0.8rem;color:var(--text-dim)">(select all that apply)</span></label>
            <div class="check-group" style="flex-wrap:wrap">
              ${["Trekking","Bird Watching","Wildlife Spotting","Photography Tours","Village Walks","Cultural Tours","River Kayaking","Night Trekking","Jungle Camping","Cycling Tours","Heritage Walks","Botanical Walks"].map(t=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-spec" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Your Base Location *</label>
            <select class="form-select" id="g-location">
              <option value="">Select district</option>
              ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip","Saitual","Hnahthial","Khawzawl"].map(t=>`<option>${t}</option>`).join("")}
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
  `}function St(){var t,e;V=[],(t=document.getElementById("g-photos"))==null||t.addEventListener("change",i=>{[...i.target.files].forEach(a=>{const r=new FileReader;r.onload=s=>{var n,c;V.push(s.target.result);const o=document.createElement("div");o.className="upload-img-wrap";const d=V.length-1;o.innerHTML=`<img src="${s.target.result}" alt="upload" />${d===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>':""}<button class="remove-img">✕</button>`,(n=document.getElementById("g-photo-preview"))==null||n.appendChild(o),(c=o.querySelector(".remove-img"))==null||c.addEventListener("click",()=>{V.splice(d,1),o.remove()})},r.readAsDataURL(a)})}),(e=document.getElementById("submit-guide-btn"))==null||e.addEventListener("click",()=>{var b,y,g,h,w,$,z,E,B,M,H,D,R,q,j,F,Y;const i=(y=(b=document.getElementById("g-name"))==null?void 0:b.value)==null?void 0:y.trim(),a=(h=(g=document.getElementById("g-email"))==null?void 0:g.value)==null?void 0:h.trim(),r=($=(w=document.getElementById("g-phone"))==null?void 0:w.value)==null?void 0:$.trim(),s=(z=document.getElementById("g-password"))==null?void 0:z.value,o=(B=(E=document.getElementById("g-title"))==null?void 0:E.value)==null?void 0:B.trim(),d=(H=(M=document.getElementById("g-bio"))==null?void 0:M.value)==null?void 0:H.trim(),n=(D=document.getElementById("g-price"))==null?void 0:D.value,c=(R=document.getElementById("g-location"))==null?void 0:R.value,p=(q=document.getElementById("g-exp"))==null?void 0:q.value,m=[...document.querySelectorAll('input[name="g-lang"]:checked')].map(G=>G.value),v=[...document.querySelectorAll('input[name="g-spec"]:checked')].map(G=>G.value),x=(F=(j=document.getElementById("g-certs"))==null?void 0:j.value)==null?void 0:F.split(`
`).filter(Boolean);if(!i||!a||!r||!s||!o||!d||!n||!c||!p||!m.length||!v.length){u("Please fill all required fields","","error");return}if(!((Y=document.getElementById("g-agree"))!=null&&Y.checked)){u("Please agree to Terms","","error");return}try{ae({name:i,email:a,phone:r,password:s,avatar:i.charAt(0).toUpperCase(),listing:{type:"guide",title:o,experience:p,languages:m,specialties:v,price:n,location:c,bio:d,certifications:x,images:V}}),u("Guide application submitted! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(G){u(G.message,"","error")}})}function Bt(){return`
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
              ${["Car & SUV Rental","Motorcycle & Bike Rental","Shared Sumo / Van","Private Van Hire","Airport Transfer","Tempo Traveller"].map(t=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="radio" name="t-type" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Base Location *</label>
            <select class="form-select" id="t-location">
              <option value="">Select district</option>
              ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip"].map(t=>`<option>${t}</option>`).join("")}
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
              ${["Airport Pickup","AC Vehicles","Night Driving","Driver Provided","Fuel Included","All Districts","Breakdown Assistance","Child Seats","Helmets Included","Riding Gear","Route Maps","Delivery to Hotel"].map(t=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="t-feat" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join("")}
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
  `}let ge=1;function Ie(t){return`
    <div class="card card-body" style="padding:20px;margin-bottom:16px;${t>0?"position:relative":""}">
      ${t>0?'<button class="remove-img" style="position:absolute;top:12px;right:12px;width:24px;height:24px" onclick="this.parentElement.remove()">✕</button>':""}
      <div style="font-weight:700;margin-bottom:16px;font-size:0.9rem;color:var(--emerald-400)">Vehicle ${t+1}</div>
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
  `}function Tt(){var e,i,a,r;let t=[];(e=document.getElementById("add-vehicle-btn"))==null||e.addEventListener("click",()=>{ge++,document.getElementById("vehicles-container").insertAdjacentHTML("beforeend",Ie(ge-1))}),(i=document.getElementById("t-photos"))==null||i.addEventListener("change",s=>{[...s.target.files].forEach(o=>{const d=new FileReader;d.onload=n=>{var p,m;t.push(n.target.result);const c=document.createElement("div");c.className="upload-img-wrap",c.innerHTML=`<img src="${n.target.result}" alt="v" /><button class="remove-img">✕</button>`,(p=document.getElementById("t-photo-preview"))==null||p.appendChild(c),(m=c.querySelector(".remove-img"))==null||m.addEventListener("click",()=>{t.splice(t.indexOf(n.target.result),1),c.remove()})},d.readAsDataURL(o)})}),(a=document.getElementById("t-license"))==null||a.addEventListener("change",s=>{s.target.files[0]&&(document.getElementById("t-license-preview").textContent="✅ "+s.target.files[0].name)}),(r=document.getElementById("submit-transport-btn"))==null||r.addEventListener("click",()=>{var b,y,g,h,w,$,z,E,B,M,H,D,R,q;const s=(y=(b=document.getElementById("t-name"))==null?void 0:b.value)==null?void 0:y.trim(),o=(h=(g=document.getElementById("t-email"))==null?void 0:g.value)==null?void 0:h.trim(),d=($=(w=document.getElementById("t-phone"))==null?void 0:w.value)==null?void 0:$.trim(),n=(z=document.getElementById("t-password"))==null?void 0:z.value,c=(B=(E=document.getElementById("t-biz"))==null?void 0:E.value)==null?void 0:B.trim(),p=(M=document.querySelector('input[name="t-type"]:checked'))==null?void 0:M.value,m=(H=document.getElementById("t-location"))==null?void 0:H.value,v=(R=(D=document.getElementById("t-desc"))==null?void 0:D.value)==null?void 0:R.trim(),x=[...document.querySelectorAll('input[name="t-feat"]:checked')].map(j=>j.value);if(!s||!o||!d||!n||!c||!p||!m||!v){u("Please fill all required fields","","error");return}if(!((q=document.getElementById("t-agree"))!=null&&q.checked)){u("Please agree to Terms","","error");return}try{ae({name:s,email:o,phone:d,password:n,avatar:s.charAt(0).toUpperCase(),listing:{type:"transport",name:c,serviceType:p,location:m,description:v,features:x,images:t}}),u("Transport listing submitted! 🎉","We'll review within 48 hours."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(j){u(j.message,"","error")}})}function Mt(){const t=I,e=A();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;const i=Ae(),a=se(),r=P.filter(s=>a.includes(s.id));return`
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
          <button class="tab-btn active" data-tab="bookings">📅 My Bookings (${i.length})</button>
          <button class="tab-btn" data-tab="wishlist">❤️ Wishlist (${r.length})</button>
          <button class="tab-btn" data-tab="account">👤 Account</button>
        </div>

        <!-- Bookings -->
        <div id="tab-bookings">
          ${i.length?i.map(s=>{var o;return`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${s.listingName}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${s.checkin?new Date(s.checkin+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):new Date(s.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Ref: <strong style="color:var(--emerald-400)">${s.id}</strong></div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:700;font-size:1.1rem;color:var(--emerald-400)">₹${(o=s.total)==null?void 0:o.toLocaleString()}</div>
                <span class="badge badge-approved">✅ Confirmed</span>
              </div>
            </div>
          `}).join(""):`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🏕️</div>
              <h3 style="margin-bottom:12px">No bookings yet</h3>
              <p style="margin-bottom:24px">Start exploring Mizoram's hidden gems!</p>
              <a href="${t("/discover")}" class="btn btn-primary" data-link>Discover Destinations</a>
            </div>
          `}
        </div>

        <!-- Wishlist -->
        <div id="tab-wishlist" class="hidden">
          ${r.length?`
            <div class="grid-3">${r.map(s=>`
              <div class="card" data-href="/stay/${s.id}" style="cursor:pointer">
                <div class="card-img-wrap"><img src="${s.coverImage}" alt="${s.name}" loading="lazy" /><div class="card-rating">${S(s.rating)} ${s.rating}</div></div>
                <div class="card-body"><h4 class="card-title">${s.name}</h4><div class="price">₹${s.price.toLocaleString()}<span>/night</span></div></div>
              </div>`).join("")}
            </div>`:`
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🤍</div>
              <h3 style="margin-bottom:12px">Your wishlist is empty</h3>
              <p style="margin-bottom:24px">Save stays you love while browsing</p>
              <a href="${t("/stays")}" class="btn btn-primary" data-link>Browse Stays</a>
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
                <a href="${t("/host-signup-stay")}" class="btn btn-outline btn-sm" data-link>🏡 List Stay</a>
                <a href="${t("/host-signup-guide")}" class="btn btn-outline btn-sm" data-link>🧭 List Guide</a>
                <a href="${t("/host-signup-transport")}" class="btn btn-outline btn-sm" data-link>🚗 List Transport</a>
              </div>`:""}
          </div>
        </div>
      </div>
    </section>
  `}function At(){var e;(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{te()});const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(i=>{i.addEventListener("click",()=>{var a;t.forEach(r=>r.classList.remove("active")),i.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(r=>r.classList.add("hidden")),(a=document.getElementById(`tab-${i.dataset.tab}`))==null||a.classList.remove("hidden")})}),document.querySelectorAll("[data-href]").forEach(i=>i.addEventListener("click",()=>window.router.navigate(i.dataset.href)))}function Pt(){const t=I,e=A();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;if(e.role!=="host")return`<div class="page-hero container"><h1>Host access only. <a href="${t("/host-signup-stay")}" data-link style="color:var(--emerald-400)">Become a Host →</a></h1></div>`;const i=(k.get("lt_listings")||[]).filter(s=>s.hostId===e.id),a=(k.get("lt_bookings")||[]).filter(s=>i.some(o=>o.id===s.listingId)),r=a.reduce((s,o)=>s+(o.total||0)*.9,0);return`
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
          ${[{icon:"🏠",label:"Active Listings",value:i.length},{icon:"📅",label:"Total Bookings",value:a.length},{icon:"💰",label:"Total Earnings",value:`₹${Math.round(r).toLocaleString()}`},{icon:"⭐",label:"Avg Rating",value:"4.8"}].map(s=>`
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
          ${i.length?i.map(s=>{var o,d,n;return`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${s.name||((o=s.listing)==null?void 0:o.name)||"Unnamed Listing"}</div>
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
              <a href="${t(s.href)}" class="card card-body text-center" data-link style="cursor:pointer">
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
  `}function Ct(){const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(e=>{e.addEventListener("click",()=>{var i;t.forEach(a=>a.classList.remove("active")),e.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(a=>a.classList.add("hidden")),(i=document.getElementById(`tab-${e.dataset.tab}`))==null||i.classList.remove("hidden")})})}const ve={"/":{render:Ne,init:Ge,footer:!0},"/discover":{render:We,init:Fe,footer:!0},"/surprise":{render:Je,init:Ke,footer:!0},"/stays":{render:et,init:tt,footer:!0},"/guides":{render:ot,init:nt,footer:!0},"/transport":{render:ct,init:pt,footer:!0},"/booking-confirmed":{render:yt,init:ft,footer:!1},"/login":{render:bt,init:xt,footer:!1},"/signup-user":{render:wt,init:kt,footer:!1},"/host-signup-stay":{render:Lt,init:Ee,footer:!1},"/host-signup-guide":{render:It,init:St,footer:!1},"/host-signup-transport":{render:Bt,init:Tt,footer:!1},"/profile":{render:Mt,init:At,footer:!0},"/host-dashboard":{render:Pt,init:Ct,footer:!0}};function Ht(t){if(ve[t])return{route:ve[t],params:{}};if(t.startsWith("/destination/")){const e=t.slice(13);return{route:{render:()=>Qe(e),init:()=>Xe(e),footer:!0},params:{id:e}}}if(t.startsWith("/stay/")){const e=t.slice(6);return{route:{render:()=>at(e),init:()=>st(e),footer:!0},params:{id:e}}}if(t.startsWith("/guide/")){const e=t.slice(7);return{route:{render:()=>lt(e),init:()=>dt(e),footer:!0},params:{id:e}}}if(t.startsWith("/transport/")){const e=t.slice(11);return{route:{render:()=>mt(e),init:()=>ut(e),footer:!0},params:{id:e}}}if(t.startsWith("/book/")){const e=t.slice(6);return{route:{render:()=>null,init:()=>null,footer:!1,booking:e},params:{id:e}}}return{route:{render:()=>`<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px"><div><div style="font-size:5rem;margin-bottom:16px">🗺️</div><h1 style="margin-bottom:12px">Page Not Found</h1><p style="margin-bottom:24px;color:var(--text-muted)">Looks like this trail doesn't exist.</p><a href="${I("/")}" class="btn btn-primary" data-link>Back to Home</a></div></div>`,init:()=>{},footer:!0},params:{}}}function jt(t){const e=t.trim(),i=e.indexOf("?"),a=i>=0?e.slice(0,i):e,r=i>=0?e.slice(i):"",s="/LushaiTravels/".replace(/\/$/,"");return!!s&&(a===s||a.startsWith(`${s}/`))?a+r:I(a)+r}async function Se(t){const e=jt(t),i=new URL(e,window.location.origin);history.pushState({},"",i.pathname+i.search+i.hash),await le(O(i.pathname),i.searchParams)}async function le(t,e=new URLSearchParams){var s;const i=document.getElementById("page-content"),a=document.getElementById("footer-container");if(t.startsWith("/book/")){const o=t.slice(6);i.innerHTML=vt(o,e),a.innerHTML="",ce(),he(),ht(o,e),de();return}const{route:r}=Ht(t);ce(),i.innerHTML=r.render()||"",r.footer?Ce():a.innerHTML="",he(),(s=r.init)==null||s.call(r),de()}function he(){document.querySelectorAll("[data-link]").forEach(t=>{t.removeEventListener("click",ye),t.addEventListener("click",ye)})}function ye(t){t.preventDefault();const e=t.currentTarget.getAttribute("href");e&&e!=="#"&&Se(e)}window.router={navigate:Se};window.addEventListener("popstate",()=>{le(O(location.pathname),new URLSearchParams(location.search))});le(O(location.pathname),new URLSearchParams(location.search));
