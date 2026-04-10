(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const Fs="modulepreload",Ws=function(t){return"/LushaiTrips/"+t},Kr={},Gt=function(e,r,i){let s=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),o=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(r.map(l=>{if(l=Ws(l),l in Kr)return;Kr[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":Fs,c||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),c)return new Promise((h,p)=>{d.addEventListener("load",h),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(n){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n}return s.then(n=>{for(const o of n||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};function z(t){const e=t.startsWith("/")?t:`/${t}`;return e==="/"?"/LushaiTrips/":`${"/LushaiTrips/".replace(/\/$/,"")}${e}`}function lt(t){const e="/LushaiTrips/".replace(/\/$/,"");return e?t===e||t===`${e}/`?"/":t.startsWith(`${e}/`)?t.slice(e.length)||"/":t||"/":t||"/"}const O={get:t=>{try{return JSON.parse(localStorage.getItem(t))}catch{return null}},set:(t,e)=>localStorage.setItem(t,JSON.stringify(e)),remove:t=>localStorage.removeItem(t)};function X(){return O.get("lt_user")}function Fe(t){O.set("lt_user",t)}function vr(){O.remove("lt_user"),window.router.navigate("/")}function ct(){return!!X()}function Gs(t){var i;const e=O.get("lt_users")||[];if(e.find(s=>s.email===t.email))throw new Error("Email already registered");const r={...t,id:Date.now(),role:"user",createdAt:new Date().toISOString(),avatar:(i=t.fullName)==null?void 0:i.charAt(0).toUpperCase()};return e.push(r),O.set("lt_users",e),Fe(r),r}function Vs(t,e){const i=(O.get("lt_users")||[]).find(s=>s.email===t&&s.password===e);if(!i)throw new Error("Invalid email or password");return Fe(i),i}async function yr(){try{const{getCurrentUser:t}=await Gt(async()=>{const{getCurrentUser:r}=await Promise.resolve().then(()=>qr);return{getCurrentUser:r}},void 0),e=await t();return e?Fe(e):O.remove("lt_user"),e}catch(t){return console.warn("[refreshUserCache]",t.message),null}}function Mt(t){return(O.get("lt_reviews")||[]).filter(r=>r.listingId===t)}function Ui(t){const e=O.get("lt_reviews")||[],r={...t,id:Date.now(),createdAt:new Date().toISOString()};return e.unshift(r),O.set("lt_reviews",e),r}function Ks(t){const e=O.get("lt_bookings")||[],r={...t,id:`LT-${Date.now()}`,status:"confirmed",createdAt:new Date().toISOString()};return e.unshift(r),O.set("lt_bookings",e),O.set("lt_last_booking",r),r}function Js(){const t=X();return t?(O.get("lt_bookings")||[]).filter(r=>r.userId===t.id):[]}function Ys(){return O.get("lt_last_booking")}function Br(){return O.get("lt_wishlist")||[]}function Mi(t){const e=Br(),r=e.indexOf(t);return r===-1?e.push(t):e.splice(r,1),O.set("lt_wishlist",e),e.includes(t)}function Di(t){return Br().includes(t)}function E(t,e="",r="success"){let i=document.querySelector(".toast");i||(i=document.createElement("div"),i.className="toast",document.body.appendChild(i)),i.className=`toast ${r}`,i.innerHTML=`<div class="toast-title">${r==="success"?"✅":"❌"} ${t}</div>${e?`<div class="toast-msg">${e}</div>`:""}`,i.classList.add("show"),setTimeout(()=>i.classList.remove("show"),4e3)}function F(t){return Array.from({length:5},(e,r)=>`<span style="color:${r<Math.round(t)?"#fbbf24":"#334155"};font-size:0.9rem">★</span>`).join("")}function Hi(t){return t.length?(t.reduce((e,r)=>e+r.rating,0)/t.length).toFixed(1):0}function Jr(){window.scrollTo({top:0,behavior:"smooth"})}function Yr(){var a,n,o;const t=document.getElementById("navbar-container"),e=X(),r=z;t.innerHTML=`
    <nav id="navbar">
      <div class="container nav-inner">
        <a href="${r("/")}" class="nav-logo" data-link>Lushai<span>Trips</span></a>
        <div class="nav-links">
          <a href="${r("/")}" data-link>Home</a>
          <a href="${r("/discover")}" data-link>Discover</a>
          <a href="${r("/stays")}" data-link>Stays</a>
          <a href="${r("/guides")}" data-link>Guides</a>
          <a href="${r("/transport")}" data-link>Transport</a>
          <a href="${r("/surprise")}" data-link>🎲 Surprise Me</a>
        </div>
        <div class="nav-cta">
          ${e?`
            <div class="nav-avatar" id="nav-user-btn" title="${e.fullName||e.name}">${e.avatar||"👤"}</div>
          `:`
            <a href="${r("/login")}" class="btn btn-secondary btn-sm" data-link>Log in</a>
            <a href="${r("/signup-user")}" class="btn btn-primary btn-sm" data-link>Sign up</a>
          `}
          <div class="nav-hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="${r("/")}" data-link>🏠 Home</a>
      <a href="${r("/discover")}" data-link>🗺️ Discover</a>
      <a href="${r("/stays")}" data-link>🏡 Stays</a>
      <a href="${r("/guides")}" data-link>👨‍🏫 Guides</a>
      <a href="${r("/transport")}" data-link>🚗 Transport</a>
      <a href="${r("/surprise")}" data-link>🎲 Surprise Me</a>
      <div style="height:1px;background:var(--glass-border);margin:8px 0"></div>
      ${e?`
        <a href="${r("/profile")}" data-link>👤 My Profile</a>
        ${e.role==="host"?`<a href="${r("/host-dashboard")}" data-link>🏠 Host Dashboard</a>`:""}
        <a href="#" id="mobile-logout">🚪 Log out</a>
      `:`
        <a href="${r("/login")}" data-link>Log in</a>
        <a href="${r("/signup-user")}" class="btn btn-primary" data-link style="text-align:center">Sign up</a>
      `}
    </div>
  `,window.addEventListener("scroll",()=>{var l;(l=document.getElementById("navbar"))==null||l.classList.toggle("scrolled",window.scrollY>30)}),(a=document.getElementById("hamburger"))==null||a.addEventListener("click",()=>{var l;(l=document.getElementById("mobile-menu"))==null||l.classList.toggle("open")}),(n=document.getElementById("nav-user-btn"))==null||n.addEventListener("click",()=>{var c;const l=document.createElement("div");l.style.cssText="position:fixed;top:70px;right:24px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:8px;z-index:2000;min-width:180px;animation:fadeIn 0.2s ease",l.innerHTML=`
      <a href="${r("/profile")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">👤 My Profile</a>
      ${(e==null?void 0:e.role)==="host"?`<a href="${r("/host-dashboard")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏠 Host Dashboard</a>`:`<a href="${r("/host-signup-stay")}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏡 Become a Host</a>`}
      <div style="height:1px;background:var(--glass-border);margin:4px 0"></div>
      <button id="dd-logout" style="width:100%;padding:10px 14px;border-radius:8px;background:none;color:#f87171;text-align:left;font-size:0.9rem;cursor:pointer;border:none">🚪 Log out</button>
    `,document.body.appendChild(l),l.querySelectorAll("[data-link]").forEach(u=>{u.addEventListener("click",d=>{d.preventDefault(),window.router.navigate(u.getAttribute("href")),l.remove()})}),setTimeout(()=>document.addEventListener("click",()=>l.remove(),{once:!0}),100),(c=l.querySelector("#dd-logout"))==null||c.addEventListener("click",()=>{vr()})}),(o=document.getElementById("mobile-logout"))==null||o.addEventListener("click",l=>{l.preventDefault(),vr()});const i=lt(location.pathname);document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(l=>{const c=l.getAttribute("href");if(!c||c==="#")return;lt(new URL(c,window.location.origin).pathname)===i&&l.classList.add("active")})}function Xs(){const t=document.getElementById("footer-container"),e=z;t.innerHTML=`
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
            <a href="${e("/about")}" class="footer-link" data-link>About LushaiTrips</a>
            <a href="${e("/travel-tips")}" class="footer-link" data-link>Travel Tips</a>
            <a href="${e("/safety-guide")}" class="footer-link" data-link>Safety Guide</a>
            <a href="${e("/contact")}" class="footer-link" data-link>Contact Us</a>
            <a href="${e("/privacy-policy")}" class="footer-link" data-link>Privacy Policy</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 LushaiTrips. Made with 💚 in Mizoram, India. | Payments secured by <strong>Razorpay</strong> | Maps by <strong>Leaflet</strong></p>
        </div>
      </div>
    </footer>
  `}const Zs="/LushaiTrips/".replace(/\/$/,""),A=t=>`${Zs}${t}`,We=[{id:"vantawng-falls",name:"Vantawng Falls",tagline:"India's tallest waterfall in Mizoram",type:"waterfall",tags:["adventure","nature","waterfall"],difficulty:"Moderate",district:"Serchhip",lat:23.0932,lng:92.7534,rating:4.8,reviews:124,coverImage:A("/images/2018080738-1024x576.jpg"),images:[A("/images/2018080738-1024x576.jpg"),A("/images/2019072384.jpg"),A("/images/View-of-Vantawng-Waterfall-Cover-Photo-840x425.jpg")],description:"Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India. Surrounded by lush subtropical forests and mist, this is a must-visit for nature lovers and adventure seekers alike.",highlights:["750-ft plunge pool","Jungle trek","Wildlife sightings","Photography paradise"],bestTime:"October – March",nearbyAttractions:["Serchhip town","Tuirial River","Local bamboo villages"],duration:"1-2 days",category:"adventure"},{id:"phawngpui-peak",name:"Phawngpui Peak",tagline:"Blue Mountain — the highest point in Mizoram",type:"mountain",tags:["adventure","trekking","scenic"],difficulty:"Hard",district:"Lawngtlai",lat:22.4869,lng:93.0248,rating:4.9,reviews:87,coverImage:A("/images/Website-Blog-Image-Size-26.jpg"),images:[A("/images/Website-Blog-Image-Size-26.jpg"),A("/images/Website-Blog-Image-Size-29.jpg"),A("/images/Website-Feature-Image-Size-10.jpg")],description:"Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar across rolling blue-hazed ridges. The national park here protects rare orchids, Himalayan black bears, and hollock gibbons.",highlights:["Sunrise panoramas","Rare orchid species","Wildlife viewing","Cloud sea views"],bestTime:"November – February",nearbyAttractions:["Phawngpui National Park","Sangau border outpost"],duration:"2-3 days",category:"adventure"},{id:"tam-dil-lake",name:"Tam Dil Lake",tagline:"Mirror-still lake in a pine-forested valley",type:"lake",tags:["relaxation","nature","lake"],difficulty:"Easy",district:"Saitual",lat:23.6177,lng:92.8894,rating:4.6,reviews:93,coverImage:A("/images/tamdil-lake-mizoram.jpeg"),images:[A("/images/tamdil-lake-mizoram.jpeg"),A("/images/2019072338-1024x576.jpg"),A("/images/2019072384-1-olw9h396o5jhwh510ctk9bwfep94no9o510c4tj0ju.jpg")],description:"Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for a peaceful picnic, boating, or simply relaxing in nature. The calm waters reflect the surrounding hills like a mirror at dawn, making it a favourite for photographers.",highlights:["Boating","Picnic spots","Pine forest walks","Photography"],bestTime:"Year-round (best Sep – Mar)",nearbyAttractions:["Saitual town","Kelkang","Aizawl (85 km)"],duration:"1 day",category:"relaxation"},{id:"reiek-tlang",name:"Reiek Tlang",tagline:"Rolling hills with traditional Mizo heritage village",type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Mamit",lat:23.7152,lng:92.5694,rating:4.5,reviews:78,coverImage:A("/images/caption.jpg"),images:[A("/images/caption.jpg"),A("/images/caption%20(1).jpg"),A("/images/reiek-tlang-view-point-ailawng-mammit-tourist-attraction-XPHYubeNTg.jpg")],description:"Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village, walking trails, and breathtaking hillside views. Sunrise here is particularly magical with layers of hills fading into the horizon.",highlights:["Traditional Mizo village","Hiking trails","Sunrise views","Cultural exhibits"],bestTime:"October – April",nearbyAttractions:["Aizawl","Hmuifang","Durtlang Hills"],duration:"1 day",category:"culture"},{id:"palak-dil",name:"Palak Dil Lake",tagline:"Mizoram's largest natural lake, ringed by jungle",type:"lake",tags:["nature","wildlife","relaxation"],difficulty:"Easy",district:"Saiha",lat:22.1627,lng:92.9261,rating:4.7,reviews:56,coverImage:A("/images/626bdb1307952_Palak%20lake.jpg"),images:[A("/images/626bdb1307952_Palak%20lake.jpg"),A("/images/626bdb1b5a442_PALAK%20lake%202.jpg"),A("/images/palak-lake-aizawl-mizoram-1-attr-hero.jpeg")],description:"Palak Dil, Mizoram's largest natural lake, lies in the remote Saiha district near the Myanmar border. The lake is surrounded by dense subtropical forest and is a prime migratory bird watching destination. The silence here is extraordinary.",highlights:["Bird watching","Boat rides","Wildlife","Remote wilderness"],bestTime:"November – February",nearbyAttractions:["Saiha town","Phawngpui (nearby)"],duration:"2 days",category:"relaxation"},{id:"champhai",name:"Champhai Valley",tagline:"The fruit bowl of Mizoram with stunning valley views",type:"valley",tags:["nature","culture","relaxation"],difficulty:"Easy",district:"Champhai",lat:23.4692,lng:93.3224,rating:4.6,reviews:102,coverImage:A("/images/Paddy-fields-at-Champhai-Mizoram.webp"),images:[A("/images/Paddy-fields-at-Champhai-Mizoram.webp"),A("/images/House-in-a-paddy-field-in-Champhai.webp"),A("/images/1694632131_sweeping_meadows_at_champhai.jpg.webp"),A("/images/6054f244a637b2d8c9a63aa0c66b7056_1000x1000.jpg"),A("/images/62addaa694e9f_Champhai%20Zawl.jpg")],description:'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar. The valley is dotted with fruit orchards, paddy fields, and dramatic ridgeline sunsets. Its border town character adds a unique cultural flavour.',highlights:["Valley views","Fruit orchards","Museum","Myanmar border"],bestTime:"October – March",nearbyAttractions:["Rih Dil Lake (Myanmar)","Murlen National Park","Tamdil"],duration:"2-3 days",category:"relaxation"},{id:"murlen-national-park",name:"Murlen National Park",tagline:"One of Northeast India's finest biodiversity hotspots",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Moderate",district:"Champhai",lat:23.65,lng:93.35,rating:4.8,reviews:43,coverImage:A("/images/1557675360_murlen-national-park.jpg"),images:[A("/images/murlen-national-park-murlen-champhai-national-parks-egyj5j72xi.avif"),A("/images/murlen-national-park-murlen-champhai-national-parks-3zntx71lgy.avif"),A("/images/Website-Blog-Image-Size-23.jpg"),A("/images/Website-Blog-Image-Size-24.jpg"),A("/images/1557675360_murlen-national-park.jpg")],description:"Murlen National Park, spanning over 100 sq km of pristine forest, is home to leopards, clouded leopards, gibbons, hornbills, and over 150 bird species. Trekking through its silent, ancient forests is a transformative experience.",highlights:["Leopard habitat","Hornbill spotting","Jungle camping","Bird watching"],bestTime:"November – April",nearbyAttractions:["Champhai","Phawngpui Peak"],duration:"2-3 days",category:"adventure"},{id:"hmuifang",name:"Hmuifang Hill",tagline:"Cloud-kissed hill with Aizawl valley panoramas",type:"hill",tags:["relaxation","nature","scenic"],difficulty:"Easy",district:"Aizawl",lat:23.5,lng:92.79,rating:4.4,reviews:67,coverImage:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",images:["https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"],description:`Just 54 km from Aizawl, Hmuifang is a hill station known as "Mizoram's Shimla." The hilltop resort offers stunning views of the surrounding valleys and the Tlawng River below. Pine forests, cool mountain air, and misty mornings make it ideal for relaxation.`,highlights:["Valley panoramas","Pine forest","Cool climate","Birding"],bestTime:"October – March",nearbyAttractions:["Aizawl","Reiek Tlang","Durtlang"],duration:"1 day",category:"relaxation"},{id:"lunglei",name:"Lunglei Hills",tagline:`The "Bridge of the Rocks" — Mizoram's southern capital`,type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Lunglei",lat:22.8917,lng:92.7349,rating:4.3,reviews:58,coverImage:"https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80",images:["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80","https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"],description:'Lunglei, the second largest city in Mizoram, sits dramatically on a ridge above verdant valleys. The name means "bridge of rocks." Explore local bazaars, colonial-era churches, and the sweeping viewpoints overlooking the Tlawng river basin.',highlights:["Rock viewpoints","Local markets","Heritage churches","Valley walks"],bestTime:"October – April",nearbyAttractions:["Saikuti Beach","Khawbung","Vantawng Falls (3 hrs)"],duration:"1-2 days",category:"culture"},{id:"aizawl-city",name:"Aizawl City",tagline:"The hilltop capital — where Mizoram's heart beats",type:"city",tags:["culture","food","relaxation"],difficulty:"Easy",district:"Aizawl",lat:23.7271,lng:92.7176,rating:4.5,reviews:211,coverImage:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",images:["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],description:"Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India's most unique capital cities. Explore the old market (Bara Bazar), taste Mizo cuisine, visit the state museum, and experience the warmth of Mizo hospitality.",highlights:["Bara Bazar","Mizo cuisine","State Museum","Durtlang Hills"],bestTime:"Year-round",nearbyAttractions:["Reiek Tlang","Hmuifang","Tam Dil Lake"],duration:"2-3 days",category:"culture"},{id:"tuipui-river",name:"Tuipui River",tagline:"Pristine river valley for kayaking and fishing",type:"river",tags:["adventure","nature","water"],difficulty:"Moderate",district:"Saiha",lat:22.05,lng:92.9,rating:4.4,reviews:32,coverImage:"https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80",images:["https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"],description:"The Tuipui River flows through the remotest district of Mizoram, creating stunning gorges, crystal-clear pools, and beaches. This is one of the best spots in Northeast India for river kayaking, fishing, and wild camping.",highlights:["Kayaking","Fishing","Wild camping","Gorge walks"],bestTime:"November – March",nearbyAttractions:["Saiha","Palak Dil Lake","Phawngpui"],instagramReels:["https://www.instagram.com/reel/DSASkvPEpFI/?igsh=dTNkZ2xoNThsempo"],duration:"2-3 days",category:"adventure"},{id:"castle-of-bawinu-beino",name:"Castle of Bawinu/Beino",tagline:"Mizoram's hidden grand canyon carved by the Kolodyne River",type:"canyon",tags:["sightseeing","adventure","wildlife","nature watching","vacation"],difficulty:"Hard",district:"Saiha",lat:22.3101,lng:92.8232,rating:0,reviews:0,coverImage:A("/images/626bcef048b4e_Beino-Caslte-(1).jpg"),images:[A("/images/626bcef048b4e_Beino-Caslte-(1).jpg"),A("/images/124.jpg"),A("/images/cover.jpg"),A('/images/hg5yhb.jpg"')],description:"Castle of Bawinu or Beino is a lesser-explored geological wonder on the Kolodyne (Kaladan or Chhimpuitui) River, often called the Grand Canyon of Mizoram. Towering rock formations rise dramatically beside crystal-clear water, creating a striking landscape for boat journeys, hiking, photography, and wildlife watching. The route is challenging and the formation is best visited in the dry season, with access commonly arranged from Lomasu to Saphaw by motorboat and with the help of a knowledgeable local guide.",highlights:["Grand canyon-like rock formations","Motorboat journey on the Kolodyne","Wildlife and bird watching","Spectacular reflections and photography"],bestTime:"February - May",nearbyAttractions:["Lomasu","Saphaw","Lungdar","Tuidang"],duration:"1-2 days",category:"adventure",quickFacts:[{label:"Altitude",value:"54 mts"},{label:"From Aizawl",value:"325 kms"},{label:"Nearest Tourist Lodge",value:"81.4 kms"},{label:"Walking Distance",value:"20 minutes away"},{label:"Weather Forecast",value:"23oC, Clouds"}]}],Qs=[{id:"all",label:"All",icon:"🗺️"},{id:"adventure",label:"Adventure",icon:"🧗"},{id:"relaxation",label:"Relaxation",icon:"🌿"},{id:"culture",label:"Culture",icon:"🏛️"},{id:"wildlife",label:"Wildlife",icon:"🦅"},{id:"budget",label:"Budget",icon:"💰"}],ea=new Set(["lengteng-wildlife"]);function ta(){const t=z,e=We.filter(i=>!ea.has(i.id)).slice(0,6);return`
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" style="background-image:linear-gradient(rgba(10,22,40,0.55), rgba(10,22,40,0.78)), url('/LushaiTrips/images/digilife-siaha-2cM78THYc4w-unsplash.jpg')"></div>
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
          <div class="stat-item"><div class="stat-num">15+</div><div class="stat-label">Destinations</div></div>
          <div class="stat-item"><div class="stat-num">50+</div><div class="stat-label">Happy Travelers</div></div>
          <div class="stat-item"><div class="stat-num">10+</div><div class="stat-label">Verified Hosts</div></div>
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
                <div class="card-rating">${F(i.rating)} <span>${i.rating}</span></div>
              </div>
              <div class="card-body">
                <h4 class="card-title">${i.name}</h4>
                <div class="card-meta" style="margin-bottom:10px">📍 ${i.district} &nbsp;•&nbsp; ⏱ ${i.duration}</div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${i.tagline}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${i.tags.map(s=>`<span class="tag">${s}</span>`).join("")}
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
  `}function ra(){document.querySelectorAll("[data-href]").forEach(t=>{t.addEventListener("click",()=>window.router.navigate(t.dataset.href))}),Gt(async()=>{const{stays:t}=await Promise.resolve().then(()=>ca);return{stays:t}},void 0).then(({stays:t})=>{const e=document.getElementById("home-stays-grid");e&&(e.innerHTML=t.slice(0,3).map(r=>`
      <div class="card stay-card animate-in" data-href="/stay/${r.id}">
        <div class="card-img-wrap">
          <img src="${r.coverImage}" alt="${r.name}" loading="lazy" />
          <div class="card-badge">${r.type.toUpperCase()}</div>
          ${r.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
          <div class="card-rating">${F(r.rating)} <span>${r.rating}</span></div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${r.name}</h4>
          <div class="card-meta" style="margin-bottom:8px">📍 ${r.location}</div>
          <div class="flex-between">
            <span class="price">₹${r.price.toLocaleString()}<span>/night</span></span>
            <span style="font-size:0.8rem;color:var(--text-muted)">👥 up to ${r.maxGuests}</span>
          </div>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".stay-card[data-href]").forEach(r=>{r.addEventListener("click",()=>window.router.navigate(r.dataset.href))}))})}let Bt="all",Xe="";const ia=new Set(["lengteng-wildlife"]);function qi(){return We.filter(t=>!ia.has(t.id))}function sa(){return`
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
          ${Qs.map(t=>`<div class="chip ${t.id==="all"?"active":""}" data-cat="${t.id}">${t.icon} ${t.label}</div>`).join("")}
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
  `}function aa(){var t;ir(),oa(),document.querySelectorAll(".chip[data-cat]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".chip[data-cat]").forEach(r=>r.classList.remove("active")),e.classList.add("active"),Bt=e.dataset.cat,ir()})}),(t=document.getElementById("discover-search"))==null||t.addEventListener("input",e=>{Xe=e.target.value.toLowerCase(),ir()})}function na(){return qi().filter(t=>{const e=Bt==="all"||t.category===Bt||t.tags.includes(Bt),r=!Xe||t.name.toLowerCase().includes(Xe)||t.district.toLowerCase().includes(Xe)||t.type.toLowerCase().includes(Xe);return e&&r})}function ir(){const t=na(),e=document.getElementById("destinations-grid"),r=document.getElementById("results-count");if(r&&(r.textContent=`${t.length} Destination${t.length!==1?"s":""}`),!!e){if(!t.length){e.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">😕 No destinations found. Try a different filter.</div>';return}e.innerHTML=t.map(i=>la(i)).join(""),e.querySelectorAll("[data-href]").forEach(i=>{i.addEventListener("click",()=>window.router.navigate(i.dataset.href))})}}function oa(){const t=qi().filter(r=>r.reviews<50),e=document.getElementById("hidden-gems-grid");e&&(e.innerHTML=t.slice(0,4).map(r=>`
    <div class="card" data-href="/destination/${r.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:160px">
        <img src="${r.coverImage}" alt="${r.name}" loading="lazy" />
        <div class="card-badge">💎 HIDDEN GEM</div>
      </div>
      <div class="card-body" style="padding:14px">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px">${r.name}</div>
        <div style="font-size:0.8rem;color:var(--text-muted)">📍 ${r.district}</div>
      </div>
    </div>
  `).join(""),e.querySelectorAll("[data-href]").forEach(r=>{r.addEventListener("click",()=>window.router.navigate(r.dataset.href))}))}function la(t){const e={Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[t.difficulty]||"#94a3b8";return`
    <div class="card destination-card animate-in" data-href="/destination/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        <div class="card-rating">${F(t.rating)} <span>${t.rating} (${t.reviews})</span></div>
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
  `}const sr=[{id:"itin-1",destinationId:"vantawng-falls",days:1,title:"1-Day: Vantawng Falls Trail",category:"adventure",stayId:"vantawng-lodge",plan:[{day:1,activities:["7 AM: Arrive Thenzawl","9 AM: Trek to Vantawng Falls (750ft drop!)","12 PM: Picnic lunch near the falls","2 PM: Village walk & bamboo crafts","5 PM: Sunset from ridge viewpoint","7 PM: Mizo dinner at Vantawng Lodge"]}]},{id:"itin-2",destinationId:"phawngpui-peak",days:3,title:"3-Day: Blue Mountain Summit",category:"adventure",stayId:null,plan:[{day:1,activities:["Drive to Lawngtlai (8 hrs from Aizawl)","Base camp setup","Sunset from lower ridge","Campfire dinner"]},{day:2,activities:["5 AM: Summit attempt (2,157m)","10 AM: Myanmar panorama at peak","Afternoon: Wildlife trail","Stargazing night"]},{day:3,activities:["Dawn photography","Rare orchid walk with guide","Return journey","Buy Puan textile souvenirs"]}]},{id:"itin-3",destinationId:"tam-dil-lake",days:1,title:"1-Day: Tam Dil Lake Escape",category:"relaxation",stayId:"tamdil-lakehouse",plan:[{day:1,activities:["9 AM: Drive from Aizawl (2 hrs)","11 AM: Morning boat ride on the lake","1 PM: Lakeside picnic lunch","3 PM: Pine forest walk","5 PM: Golden hour on the lake","7 PM: Return or stay overnight"]}]},{id:"itin-4",destinationId:"champhai",days:2,title:"2-Day: Champhai Valley & Myanmar Views",category:"relaxation",stayId:"champhai-farmstay",plan:[{day:1,activities:["Morning: Drive to Champhai (157 km)","Afternoon: Farm visit & fruit picking","Evening: Myanmar border viewpoint sunset","Night: Traditional Mizo dinner with family"]},{day:2,activities:["Dawn: Valley fog photography","Morning: Champhai museum & market","Afternoon: Murlen National Park entry","Evening: Return to Aizawl"]}]},{id:"itin-5",destinationId:"reiek-tlang",days:1,title:"1-Day: Reiek Heritage Village",category:"culture",stayId:"bamboo-haven",plan:[{day:1,activities:["8 AM: Depart Aizawl","9:30 AM: Reiek traditional village walk","11 AM: Mizo cultural exhibits","1 PM: Lunch at village café","3 PM: Hilltop panoramic viewpoint","5 PM: Return or Bamboo Haven overnight"]}]},{id:"itin-6",destinationId:"palak-dil",days:2,title:"2-Day: Palak Dil & Saiha Wilderness",category:"wildlife",stayId:null,plan:[{day:1,activities:["Early morning departure from Aizawl","Afternoon: Arrive Saiha","Evening: Palak Dil lake sunset cruise","Night: Forest lodge stay"]},{day:2,activities:["5 AM: Bird watching (migratory species)","Morning: Jungle trail with local guide","Afternoon: Return journey"]}]}],ne=[{id:"bamboo-haven",name:"Bamboo Haven Homestay",type:"Homestay",host:{name:"Liana Hnamte",avatar:"LH",phone:"+91 98765 43210",since:"2022"},location:"Reiek Village, Mamit District",lat:23.7152,lng:92.5694,price:1800,maxGuests:4,rooms:2,rating:4.9,reviews:47,coverImage:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",images:["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80","https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80","https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"],amenities:["WiFi","Parking","Home-cooked Food","Hot Water","Valley View","Bonfire"],description:"Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience. Wake up to misty valley views, eat home-cooked Mizo meals, and fall asleep to the sounds of the forest. Our family has lived here for generations.",about:"Liana and her family offer warm Mizo hospitality in their traditional home.",nearbyAttractions:["Reiek Heritage Village (5 min)","Hmuifang (45 min)","Aizawl (35 km)"],checkIn:"14:00",checkOut:"11:00",rules:["No smoking inside","Quiet hours after 10 PM","No outside food","Pets on request"],topRated:!0,verified:!0,tags:["hidden-gem","budget-friendly"]},{id:"champhai-farmstay",name:"Champhai Valley Farmstay",type:"Homestay",host:{name:"Mimi Lalhmangaihi",avatar:"ML",phone:"+91 65432 10987",since:"2022"},location:"Champhai, Champhai District",lat:23.4692,lng:93.3224,price:1500,maxGuests:4,rooms:2,rating:4.6,reviews:54,coverImage:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",images:["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80","https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],amenities:["Organic Farm","Home-cooked Food","Fruit Picking","Valley View","Parking","Hot Water"],description:"Experience life on a working Mizo farm in the fruit bowl of Champhai. Pick fresh oranges, help with the harvest, cook traditional recipes, and fall asleep looking at Myanmar across the valley. The most authentic rural Mizoram experience.",about:"Mimi's family has farmed this land for 3 generations. She loves sharing Mizo culture through food.",nearbyAttractions:["Myanmar border viewpoint","Champhai museum","Murlen National Park (2 hrs)"],checkIn:"14:00",checkOut:"11:00",rules:["Farm work is optional but encouraged","Organic produce only","Early breakfast at 7 AM"],topRated:!1,verified:!0,tags:["farm-experience","budget-friendly"]},{id:"tamdil-lakehouse",name:"Tam Dil Lakehouse",type:"Hotel",host:{name:"Robert Lalthanmawia",avatar:"RL",phone:"+91 54321 09876",since:"2020"},location:"Tam Dil, Saitul District",lat:23.6177,lng:92.8894,price:3200,maxGuests:2,rooms:1,rating:4.9,reviews:89,coverImage:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],amenities:["Lakefront Room","Kayaking","WiFi","AC","Restaurant","Hot Water","Parking","Sunrise View"],description:"Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram's most romantic stay. The floor-to-ceiling windows reflect the lake, the pine forest, and the stars. Breakfast is served on your private deck.",about:"Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.",nearbyAttractions:["Tam Dil Lake (on property)","Tam Dil sanctuary","Saitul (30 min)"],checkIn:"15:00",checkOut:"11:00",rules:["Adults only","No loud parties","Checkout strictly at 11 AM"],topRated:!0,verified:!0,tags:["romantic","lakefront","premium"]}],Fi=ne.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,max_guests:t.maxGuests,top_rated:t.topRated})),ca=Object.freeze(Object.defineProperty({__proto__:null,seedStays:Fi,stays:ne},Symbol.toStringTag,{value:"Module"})),da=new Set(["lengteng-wildlife"]),ua=[{id:"all",label:"✨ Any Vibe",icon:"🎲"},{id:"adventure",label:"🧗 Adventure"},{id:"relaxation",label:"🌿 Relaxation"},{id:"culture",label:"🏛️ Culture"},{id:"wildlife",label:"🦅 Wildlife"},{id:"budget",label:"💰 Budget"}];let Nt="all",ar=!1;function ha(){return We.filter(t=>!da.has(t.id))}function pa(){return`
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
          ${ua.map(t=>`<div class="chip ${t.id==="all"?"active":""}" data-filter="${t.id}">${t.label}</div>`).join("")}
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
  `}function ma(){var t,e;document.querySelectorAll(".chip[data-filter]").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".chip[data-filter]").forEach(i=>i.classList.remove("active")),r.classList.add("active"),Nt=r.dataset.filter})}),(t=document.getElementById("dice-btn"))==null||t.addEventListener("click",Xr),(e=document.getElementById("reroll-btn"))==null||e.addEventListener("click",Xr)}function Xr(){if(ar)return;ar=!0;const t=document.getElementById("rolling"),e=document.getElementById("surprise-result"),r=document.getElementById("dice-btn");e.classList.remove("show"),t.classList.remove("hidden"),r.style.animation="spin 0.5s linear infinite",setTimeout(()=>{var l,c;t.classList.add("hidden"),r.style.animation="float 3s ease-in-out infinite";const i=ha(),s=Nt==="all"?i:i.filter(u=>u.category===Nt||u.tags.includes(Nt)),a=s[Math.floor(Math.random()*s.length)]||i[0]||We[0],n=sr.find(u=>u.destinationId===a.id)||sr[Math.floor(Math.random()*sr.length)],o=ne.find(u=>u.id===(n==null?void 0:n.stayId))||ne[Math.floor(Math.random()*ne.length)];document.getElementById("result-card").innerHTML=ga(a,n,o),e.classList.add("show"),(l=document.getElementById("book-result-btn"))==null||l.addEventListener("click",()=>{window.router.navigate(`/stay/${o.id}`)}),(c=document.getElementById("view-dest-btn"))==null||c.addEventListener("click",()=>{window.router.navigate(`/destination/${a.id}`)}),ar=!1},1800)}function ga(t,e,r){return`
    <img src="${t.coverImage}" alt="${t.name}" class="result-img" />
    <div class="result-body text-left">
      <div class="duration-badge">📅 ${(e==null?void 0:e.days)||1}-Day Trip • ${t.district} District</div>
      <h2 style="margin-bottom:8px">${(e==null?void 0:e.title)||t.name+" Adventure"}</h2>
      <p style="margin-bottom:20px">${t.description.slice(0,160)}…</p>

      <h4 style="margin-bottom:12px">📍 Your Itinerary</h4>
      <ul class="itinerary-list">
        ${((e==null?void 0:e.plan)||[]).flatMap(i=>i.activities.slice(0,3).map(s=>`<li><span class="day-badge">Day ${i.day}</span> ${s}</li>`)).slice(0,6).join("")}
      </ul>

      ${r?`
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:24px">
          <div style="font-size:0.8rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🏡 Suggested Stay</div>
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${r.coverImage}" style="width:72px;height:72px;border-radius:12px;object-fit:cover" />
            <div>
              <div style="font-weight:700;margin-bottom:4px">${r.name}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${r.type} • ${r.location}</div>
              <div style="color:var(--emerald-400);font-weight:700;margin-top:4px">₹${r.price.toLocaleString()}/night</div>
            </div>
          </div>
        </div>
      `:""}

      <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
        ${t.highlights.map(i=>`<span class="tag">✓ ${i}</span>`).join("")}
      </div>
      <button class="btn btn-outline mt-16" id="view-dest-btn">View Destination Details</button>
    </div>
  `}function fa(t){if(!t)return"";try{const e=new URL(t);if(!e.hostname.includes("instagram.com"))return"";if(e.pathname.endsWith("/embed"))return t;const r=e.pathname.match(/^\/(reel|p)\/([^/?#]+)/);return r?`https://www.instagram.com/${r[1]}/${r[2]}/embed`:""}catch{return""}}function va(t=[],e="Instagram Reel"){return t.map((r,i)=>typeof r=="string"?{url:r,title:`${e} ${i+1}`,thumbnail:""}:{url:(r==null?void 0:r.url)||"",title:(r==null?void 0:r.title)||`${e} ${i+1}`,thumbnail:(r==null?void 0:r.thumbnail)||""}).map(r=>({...r,embedUrl:fa(r.url)})).filter(r=>r.embedUrl)}function ya(t){var o;const e=z,r=We.find(l=>l.id===t);if(!r)return'<div class="page-hero container"><h1>Destination not found</h1></div>';const i=ne.filter(l=>l.location.toLowerCase().includes(r.district.toLowerCase())).slice(0,2),s=Mt(`dest-${t}`),a=Hi(s),n=va(r.instagramReels,`${r.name} Reel`);return`
    <!-- Gallery Hero -->
    <div style="padding-top:76px">
      <div class="gallery container" style="margin-top:20px">
        <div class="gallery-main" onclick="openLightbox(0,'${t}')">
          <img src="${r.images[0]}" alt="${r.name}" />
        </div>
        ${r.images.slice(1,3).map((l,c)=>`
          <div class="gallery-thumb" onclick="openLightbox(${c+1},'${t}')">
            <img src="${l}" alt="${r.name} ${c+2}" />
          </div>
        `).join("")}
        ${r.images[3]?`
          <div class="gallery-thumb gallery-more" data-more="📷 View all" onclick="openLightbox(3,'${t}')">
            <img src="${r.images[3]}" alt="more" />
          </div>`:""}
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px">
            <h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">${r.name}</h1>
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;width:46px;height:46px;font-size:1.3rem;cursor:pointer;flex-shrink:0;transition:var(--transition)">${Di(`dest-${t}`)?"❤️":"🤍"}</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:20px">
            <div style="display:flex;gap:4px;align-items:center">${F(r.rating)} <strong>${r.rating}</strong> <span style="color:var(--text-muted)">(${r.reviews} reviews)</span></div>
            <span style="color:var(--text-dim)">•</span>
            <span>📍 ${r.district} District</span>
            <span style="color:var(--text-dim)">•</span>
            <span>⏱ ${r.duration}</span>
            <span style="color:var(--text-dim)">•</span>
            <span style="color:${{Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[r.difficulty]}">● ${r.difficulty}</span>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:12px">About this Place</h3>
          <p style="margin-bottom:24px">${r.description}</p>

          ${n.length?`
            <h3 style="margin-bottom:16px">Instagram Reels</h3>
            <div class="instagram-reels-grid" style="margin-bottom:32px">
              ${n.map((l,c)=>`
                <button
                  type="button"
                  class="card instagram-reel-card"
                  data-instagram-reel-trigger
                  data-reel-embed="${l.embedUrl}"
                  data-reel-title="${l.title||`${r.name} Reel ${c+1}`}"
                  aria-label="Play ${l.title||`${r.name} Reel ${c+1}`}"
                >
                  <div class="instagram-reel-poster-wrap">
                    <img
                      class="instagram-reel-poster"
                      src="${l.thumbnail||r.images[Math.min(c,r.images.length-1)]||r.coverImage}"
                      alt="${l.title||`${r.name} Reel ${c+1}`}"
                      loading="lazy"
                    />
                    <span class="instagram-reel-play" aria-hidden="true">▶</span>
                    <span class="instagram-reel-badge">Instagram Reel</span>
                  </div>
                  <div class="instagram-reel-meta">
                    <div class="instagram-reel-title">${l.title||`${r.name} Reel ${c+1}`}</div>
                    <div class="instagram-reel-hint">Tap to play here</div>
                  </div>
                </button>
              `).join("")}
            </div>
          `:""}

          ${(o=r.quickFacts)!=null&&o.length?`
            <h3 style="margin-bottom:16px">Quick Facts</h3>
            <div class="grid-2" style="margin-bottom:32px">
              ${r.quickFacts.map(l=>`
                <div class="card card-body">
                  <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">${l.label}</div>
                  <div style="font-weight:700;font-size:1.05rem">${l.value}</div>
                </div>
              `).join("")}
            </div>
          `:""}

          <h3 style="margin-bottom:16px">✨ Highlights</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${r.highlights.map(l=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${l}</span></div>`).join("")}
          </div>

          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🌤</div>
              <div style="font-weight:700;margin-bottom:4px">Best Time to Visit</div>
              <div style="color:var(--text-muted)">${r.bestTime}</div>
            </div>
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🗺️</div>
              <div style="font-weight:700;margin-bottom:4px">Nearby Attractions</div>
              <ul style="list-style:none;color:var(--text-muted);font-size:0.9rem">${r.nearbyAttractions.map(l=>`<li>• ${l}</li>`).join("")}</ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="dest-map" class="map-container" style="margin-bottom:32px"></div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
            ${r.tags.map(l=>`<span class="tag">${l}</span>`).join("")}
          </div>

          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${a>0?`⭐ ${a} · `:""}${s.length} Review${s.length!==1?"s":""}</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>

          <div id="reviews-list">
            ${s.length?s.map(l=>Wi(l)).join(""):'<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>'}
          </div>

          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input" id="star-input">
                ${[5,4,3,2,1].map(l=>`<input type="radio" name="rating" id="r${l}" value="${l}"><label for="r${l}">★</label>`).join("")}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience..."></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>

          ${i.length?`
            <div class="divider-h"></div>
            <h3 style="margin-bottom:24px">🏡 Stays Near ${r.name}</h3>
            <div class="grid-2">
              ${i.map(l=>`
                <div class="card" data-href="/stay/${l.id}" style="cursor:pointer">
                  <div class="card-img-wrap" style="height:160px"><img src="${l.coverImage}" alt="${l.name}" loading="lazy" /></div>
                  <div class="card-body">
                    <div style="font-weight:700">${l.name}</div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px">
                      <span class="price" style="font-size:1rem">₹${l.price.toLocaleString()}<span>/night</span></span>
                      <span>${F(l.rating)} ${l.rating}</span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          `:""}
        </div>

        <div>
          <div class="booking-widget">
            <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:12px">🌄 Plan a Trip Here</div>
            <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Find stays, guides, and transport for ${r.name}.</div>
            <a href="${e("/stays")}" class="btn btn-primary w-full" data-link style="justify-content:center;margin-bottom:12px">🏡 Browse Stays</a>
            <a href="${e("/guides")}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:12px">🧑‍🏫 Hire a Guide</a>
            <a href="${e("/transport")}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:20px">🚗 Book Transport</a>
            <a href="${e("/surprise")}" class="btn btn-amber w-full" data-link style="justify-content:center">🎲 Surprise Me</a>
            <div class="divider-h"></div>
            <div style="font-size:0.85rem;color:var(--text-muted);text-align:center">🔒 Secure payments via Razorpay</div>
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

    <div class="lightbox" id="instagram-reel-modal">
      <button class="lightbox-close" id="instagram-reel-close">✕</button>
      <div class="instagram-reel-modal-dialog">
        <iframe
          id="instagram-reel-player"
          class="instagram-reel-modal-frame"
          src=""
          title="Instagram Reel"
          loading="lazy"
          allowfullscreen
          scrolling="no"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  `}function ba(t){var o,l,c,u,d,h,p;const e=We.find(m=>m.id===t);if(!e)return;setTimeout(()=>{const m=document.getElementById("dest-map");if(!m||m._leaflet_id)return;const g=L.map("dest-map").setView([e.lat,e.lng],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(g),L.marker([e.lat,e.lng]).addTo(g).bindPopup(`<b>${e.name}</b><br>${e.district} District`).openPopup()},100);const r=e.images;let i=0;window.openLightbox=m=>{i=m,document.getElementById("lb-img").src=r[i],document.getElementById("lightbox").classList.add("open")},(o=document.getElementById("lb-close"))==null||o.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(l=document.getElementById("lb-prev"))==null||l.addEventListener("click",()=>{i=(i-1+r.length)%r.length,document.getElementById("lb-img").src=r[i]}),(c=document.getElementById("lb-next"))==null||c.addEventListener("click",()=>{i=(i+1)%r.length,document.getElementById("lb-img").src=r[i]});const s=document.getElementById("instagram-reel-modal"),a=document.getElementById("instagram-reel-player"),n=()=>{s==null||s.classList.remove("open"),a&&(a.src="",a.title="Instagram Reel")};document.querySelectorAll("[data-instagram-reel-trigger]").forEach(m=>{m.addEventListener("click",()=>{const g=m.dataset.reelEmbed;!g||!a||!s||(a.src=g,a.title=m.dataset.reelTitle||"Instagram Reel",s.classList.add("open"))})}),(u=document.getElementById("instagram-reel-close"))==null||u.addEventListener("click",n),s==null||s.addEventListener("click",m=>{m.target===s&&n()}),(d=document.getElementById("wishlist-btn"))==null||d.addEventListener("click",()=>{const m=document.getElementById("wishlist-btn"),g=Mi(`dest-${t}`);m.textContent=g?"❤️":"🤍",E(g?"Added to Wishlist":"Removed from Wishlist")}),(h=document.getElementById("write-review-btn"))==null||h.addEventListener("click",()=>{if(!ct()){E("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(p=document.getElementById("submit-review-btn"))==null||p.addEventListener("click",()=>{var x,f,w;const m=parseInt(((x=document.querySelector('input[name="rating"]:checked'))==null?void 0:x.value)||0,10),g=(w=(f=document.getElementById("review-text"))==null?void 0:f.value)==null?void 0:w.trim();if(!m){E("Please select a rating","","error");return}if(!g){E("Please write your review","","error");return}const v=X();Ui({listingId:`dest-${t}`,rating:m,text:g,userName:v.fullName||v.name,userAvatar:v.avatar}),E("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden");const b=Mt(`dest-${t}`);document.getElementById("reviews-list").innerHTML=b.map(R=>Wi(R)).join("")}),document.querySelectorAll("[data-href]").forEach(m=>{m.addEventListener("click",()=>window.router.navigate(m.dataset.href))})}function Wi(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${F(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Visit</span>
    </div>
  `}function Vt(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(r[i[s]]=t[i[s]]);return r}function wa(t,e,r,i){function s(a){return a instanceof r?a:new r(function(n){n(a)})}return new(r||(r=Promise))(function(a,n){function o(u){try{c(i.next(u))}catch(d){n(d)}}function l(u){try{c(i.throw(u))}catch(d){n(d)}}function c(u){u.done?a(u.value):s(u.value).then(o,l)}c((i=i.apply(t,e||[])).next())})}const xa=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class Nr extends Error{constructor(e,r="FunctionsError",i){super(e),this.name=r,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class ka extends Nr{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Zr extends Nr{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Qr extends Nr{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var br;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(br||(br={}));class _a{constructor(e,{headers:r={},customFetch:i,region:s=br.Any}={}){this.url=e,this.headers=r,this.region=s,this.fetch=xa(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return wa(this,arguments,void 0,function*(r,i={}){var s;let a,n;try{const{headers:o,method:l,body:c,signal:u,timeout:d}=i;let h={},{region:p}=i;p||(p=this.region);const m=new URL(`${this.url}/${r}`);p&&p!=="any"&&(h["x-region"]=p,m.searchParams.set("forceFunctionRegion",p));let g;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(h["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(h["Content-Type"]="application/json",g=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?g=JSON.stringify(c):g=c;let v=u;d&&(n=new AbortController,a=setTimeout(()=>n.abort(),d),u?(v=n.signal,u.addEventListener("abort",()=>n.abort())):v=n.signal);const b=yield this.fetch(m.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),o),body:g,signal:v}).catch(R=>{throw new ka(R)}),x=b.headers.get("x-relay-error");if(x&&x==="true")throw new Zr(b);if(!b.ok)throw new Qr(b);let f=((s=b.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),w;return f==="application/json"?w=yield b.json():f==="application/octet-stream"||f==="application/pdf"?w=yield b.blob():f==="text/event-stream"?w=b:f==="multipart/form-data"?w=yield b.formData():w=yield b.text(),{data:w,error:null,response:b}}catch(o){return{data:null,error:o,response:o instanceof Qr||o instanceof Zr?o.context:void 0}}finally{a&&clearTimeout(a)}})}}const Gi=3,ei=t=>Math.min(1e3*2**t,3e4),Sa=[520,503],Vi=["GET","HEAD","OPTIONS"];var Ea=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function ti(t,e){return new Promise(r=>{if(e!=null&&e.aborted){r();return}const i=setTimeout(()=>{e==null||e.removeEventListener("abort",s),r()},t);function s(){clearTimeout(i),r()}e==null||e.addEventListener("abort",s)})}function Ta(t,e,r,i){return!(!i||r>=Gi||!Vi.includes(t)||!Sa.includes(e))}var $a=class{constructor(t){var e,r,i,s,a;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(i=t.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(s=t.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(a=t.retry)!==null&&a!==void 0?a:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const n=this.headers.get("Accept");n==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!n||n==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let a=(async()=>{let n=0;for(;;){const c=new Headers(r.headers);n>0&&c.set("X-Retry-Count",String(n));let u;try{u=await i(r.url.toString(),{method:r.method,headers:c,body:JSON.stringify(r.body),signal:r.signal})}catch(d){if((d==null?void 0:d.name)==="AbortError"||(d==null?void 0:d.code)==="ABORT_ERR"||!Vi.includes(r.method))throw d;if(r.retryEnabled&&n<Gi){const h=ei(n);n++,await ti(h,r.signal);continue}throw d}if(Ta(r.method,u.status,n,r.retryEnabled)){var o,l;const d=(o=(l=u.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,h=d!==null?Math.max(0,parseInt(d,10)||0)*1e3:ei(n);await u.text(),n++,await ti(h,r.signal);continue}return await r.processResponse(u)}})();return this.shouldThrowOnError||(a=a.catch(n=>{var o;let l="",c="",u="";const d=n==null?void 0:n.cause;if(d){var h,p,m,g;const x=(h=d==null?void 0:d.message)!==null&&h!==void 0?h:"",f=(p=d==null?void 0:d.code)!==null&&p!==void 0?p:"";l=`${(m=n==null?void 0:n.name)!==null&&m!==void 0?m:"FetchError"}: ${n==null?void 0:n.message}`,l+=`

Caused by: ${(g=d==null?void 0:d.name)!==null&&g!==void 0?g:"Error"}: ${x}`,f&&(l+=` (${f})`),d!=null&&d.stack&&(l+=`
${d.stack}`)}else{var v;l=(v=n==null?void 0:n.stack)!==null&&v!==void 0?v:""}const b=this.url.toString().length;return(n==null?void 0:n.name)==="AbortError"||(n==null?void 0:n.code)==="ABORT_ERR"?(u="",c="Request was aborted (timeout or manual cancellation)",b>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${b} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((d==null?void 0:d.name)==="HeadersOverflowError"||(d==null?void 0:d.code)==="UND_ERR_HEADERS_OVERFLOW")&&(u="",c="HTTP headers exceeded server limits (typically 16KB)",b>this.urlLengthLimit&&(c+=`. Your request URL is ${b} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=n==null?void 0:n.name)!==null&&o!==void 0?o:"FetchError"}: ${n==null?void 0:n.message}`,details:l,hint:c,code:u},data:null,count:null,status:0,statusText:""}})),a.then(t,e)}async processResponse(t){var e=this;let r=null,i=null,s=null,a=t.status,n=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();h===""||(e.headers.get("Accept")==="text/csv"||e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?i=h:i=JSON.parse(h))}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),d=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");u&&d&&d.length>1&&(s=parseInt(d[1])),e.isMaybeSingle&&Array.isArray(i)&&(i.length>1?(r={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,s=null,a=406,n="Not Acceptable"):i.length===1?i=i[0]:i=null)}else{const u=await t.text();try{r=JSON.parse(u),Array.isArray(r)&&t.status===404&&(i=[],r=null,a=200,n="OK")}catch{t.status===404&&u===""?(a=204,n="No Content"):r={message:u}}if(r&&e.shouldThrowOnError)throw new Ea(r)}return{success:r===null,error:r,data:i,count:s,status:a,statusText:n}}returns(){return this}overrideTypes(){return this}},Aa=class extends $a{select(t){let e=!1;const r=(t??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:i,referencedTable:s=i}={}){const a=s?`${s}.order`:"order",n=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${n?`${n},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const i=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(i,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:i=r}={}){const s=typeof i>"u"?"offset":`${i}.offset`,a=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(s,`${t}`),this.url.searchParams.set(a,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:i=!1,wal:s=!1,format:a="text"}={}){var n;const o=[t?"analyze":null,e?"verbose":null,r?"settings":null,i?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(n=this.headers.get("Accept"))!==null&&n!==void 0?n:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const ri=new RegExp("[,()]");var ze=class extends Aa{eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(i=>typeof i=="string"&&ri.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(i=>typeof i=="string"&&ri.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:i}={}){let s="";i==="plain"?s="pl":i==="phrase"?s="ph":i==="websearch"&&(s="w");const a=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${s}fts${a}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const i=r?`${r}.or`:"or";return this.url.searchParams.append(i,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},Ia=class{constructor(t,{headers:e={},schema:r,fetch:i,urlLengthLimit:s=8e3,retry:a}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=i,this.urlLengthLimit=s,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:i}=e??{},s=r?"HEAD":"GET";let a=!1;const n=(t??"*").split("").map(c=>/\s/.test(c)&&!a?"":(c==='"'&&(a=!a),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",n),i&&l.append("Prefer",`count=${i}`),new ze({method:s,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var i;const s="POST",{url:a,headers:n}=this.cloneRequestState();if(e&&n.append("Prefer",`count=${e}`),r||n.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);a.searchParams.set("columns",l.join(","))}}return new ze({method:s,url:a,headers:n,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:i,defaultToNull:s=!0}={}){var a;const n="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),s||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((u,d)=>u.concat(Object.keys(d)),[]);if(c.length>0){const u=[...new Set(c)].map(d=>`"${d}"`);o.searchParams.set("columns",u.join(","))}}return new ze({method:n,url:o,headers:l,schema:this.schema,body:t,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const i="PATCH",{url:s,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new ze({method:i,url:s,headers:a,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:i,headers:s}=this.cloneRequestState();return t&&s.append("Prefer",`count=${t}`),new ze({method:r,url:i,headers:s,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function dt(t){"@babel/helpers - typeof";return dt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},dt(t)}function Ra(t,e){if(dt(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(dt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Pa(t){var e=Ra(t,"string");return dt(e)=="symbol"?e:e+""}function Ca(t,e,r){return(e=Pa(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function ii(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function $t(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?ii(Object(r),!0).forEach(function(i){Ca(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ii(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}var La=class Ki{constructor(e,{headers:r={},schema:i,fetch:s,timeout:a,urlLengthLimit:n=8e3,retry:o}={}){this.url=e,this.headers=new Headers(r),this.schemaName=i,this.urlLengthLimit=n;const l=s??globalThis.fetch;a!==void 0&&a>0?this.fetch=(c,u)=>{const d=new AbortController,h=setTimeout(()=>d.abort(),a),p=u==null?void 0:u.signal;if(p){if(p.aborted)return clearTimeout(h),l(c,u);const m=()=>{clearTimeout(h),d.abort()};return p.addEventListener("abort",m,{once:!0}),l(c,$t($t({},u),{},{signal:d.signal})).finally(()=>{clearTimeout(h),p.removeEventListener("abort",m)})}return l(c,$t($t({},u),{},{signal:d.signal})).finally(()=>clearTimeout(h))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Ia(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new Ki(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:i=!1,get:s=!1,count:a}={}){var n;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const u=p=>p!==null&&typeof p=="object"&&(!Array.isArray(p)||p.some(u)),d=i&&Object.values(r).some(u);d?(o="POST",c=r):i||s?(o=i?"HEAD":"GET",Object.entries(r).filter(([p,m])=>m!==void 0).map(([p,m])=>[p,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([p,m])=>{l.searchParams.append(p,m)})):(o="POST",c=r);const h=new Headers(this.headers);return d?h.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&h.set("Prefer",`count=${a}`),new ze({method:o,url:l,headers:h,schema:this.schemaName,body:c,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Oa{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const i=r.versions;if(i&&i.node){const s=i.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const ja="2.103.0",za=`realtime-js/${ja}`,Ba="1.0.0",Ji="2.0.0",Na=Ji,Ua=1e4,Ma=100,ye={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Yi={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},wr={connecting:"connecting",closing:"closing",closed:"closed"};class Da{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,i;const s=(i=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(e){var r,i;const s=(i=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&i!==void 0?i:{},n=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,r,i){var s,a;const n=e.topic,o=(s=e.ref)!==null&&s!==void 0?s:"",l=(a=e.join_ref)!==null&&a!==void 0?a:"",c=e.payload.event,u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},d=Object.keys(u).length===0?"":JSON.stringify(u);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(n.length>255)throw new Error(`topic length ${n.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`metadata length ${d.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+n.length+c.length+d.length,p=new ArrayBuffer(this.HEADER_LENGTH+h);let m=new DataView(p),g=0;m.setUint8(g++,this.KINDS.userBroadcastPush),m.setUint8(g++,l.length),m.setUint8(g++,o.length),m.setUint8(g++,n.length),m.setUint8(g++,c.length),m.setUint8(g++,d.length),m.setUint8(g++,r),Array.from(l,b=>m.setUint8(g++,b.charCodeAt(0))),Array.from(o,b=>m.setUint8(g++,b.charCodeAt(0))),Array.from(n,b=>m.setUint8(g++,b.charCodeAt(0))),Array.from(c,b=>m.setUint8(g++,b.charCodeAt(0))),Array.from(d,b=>m.setUint8(g++,b.charCodeAt(0)));var v=new Uint8Array(p.byteLength+i.byteLength);return v.set(new Uint8Array(p),0),v.set(new Uint8Array(i),p.byteLength),v.buffer}decode(e,r){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return r(i)}if(typeof e=="string"){const i=JSON.parse(e),[s,a,n,o,l]=i;return r({join_ref:s,ref:a,topic:n,event:o,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),i=r.getUint8(0),s=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,s)}}_decodeUserBroadcast(e,r,i){const s=r.getUint8(1),a=r.getUint8(2),n=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+s));l=l+s;const u=i.decode(e.slice(l,l+a));l=l+a;const d=i.decode(e.slice(l,l+n));l=l+n;const h=e.slice(l,e.byteLength),p=o===this.JSON_ENCODING?JSON.parse(i.decode(h)):h,m={type:this.BROADCAST_EVENT,event:u,payload:p};return n>0&&(m.meta=JSON.parse(d)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>r.includes(i)))}}var C;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(C||(C={}));const si=(t,e,r={})=>{var i;const s=(i=r.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((a,n)=>(a[n]=Ha(n,t,e,s),a),{}):{}},Ha=(t,e,r,i)=>{const s=e.find(o=>o.name===t),a=s==null?void 0:s.type,n=r[t];return a&&!i.includes(a)?Xi(a,n):xr(n)},Xi=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return Ga(e,r)}switch(t){case C.bool:return qa(e);case C.float4:case C.float8:case C.int2:case C.int4:case C.int8:case C.numeric:case C.oid:return Fa(e);case C.json:case C.jsonb:return Wa(e);case C.timestamp:return Va(e);case C.abstime:case C.date:case C.daterange:case C.int4range:case C.int8range:case C.money:case C.reltime:case C.text:case C.time:case C.timestamptz:case C.timetz:case C.tsrange:case C.tstzrange:return xr(e);default:return xr(e)}},xr=t=>t,qa=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Fa=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},Wa=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},Ga=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,i=t[r];if(t[0]==="{"&&i==="}"){let a;const n=t.slice(1,r);try{a=JSON.parse("["+n+"]")}catch{a=n?n.split(","):[]}return a.map(o=>Xi(e,o))}return t},Va=t=>typeof t=="string"?t.replace(" ","T"):t,Zi=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var st=t=>typeof t=="function"?t:function(){return t},Ka=typeof self<"u"?self:null,Be=typeof window<"u"?window:null,se=Ka||Be||globalThis,Ja="2.0.0",Ya=1e4,Xa=1e3,ae={connecting:0,open:1,closing:2,closed:3},W={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},oe={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},kr={longpoll:"longpoll",websocket:"websocket"},Za={complete:4},_r="base64url.bearer.phx.",At=class{constructor(t,e,r,i){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(i=>i.status===t).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},Qi=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Qa=class{constructor(t,e,r){this.state=W.closed,this.topic=t,this.params=st(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new At(this,oe.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Qi(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=W.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=W.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=W.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=W.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new At(this,oe.leave,st({}),this.timeout).send(),this.state=W.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(oe.reply,(i,s)=>{this.trigger(this.replyEventName(s),i)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=W.closed,this.bindings=[]}onClose(t){this.on(oe.close,t)}onError(t){return this.on(oe.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new At(this,t,function(){return e},r);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=W.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(oe.close,"leave")},r=new At(this,oe.leave,st({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,i){return this.topic!==t?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=W.joining,this.joinPush.resend(t))}trigger(t,e,r,i){let s=this.onMessage(t,e,r,i);if(e&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter(n=>n.event===t&&this.filterBindings(n,e,r));for(let n=0;n<a.length;n++)a[n].callback(s,r,i||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===W.closed}isErrored(){return this.state===W.errored}isJoined(){return this.state===W.joined}isJoining(){return this.state===W.joining}isLeaving(){return this.state===W.leaving}},Dt=class{static request(t,e,r,i,s,a,n){if(se.XDomainRequest){let o=new se.XDomainRequest;return this.xdomainRequest(o,t,e,i,s,a,n)}else if(se.XMLHttpRequest){let o=new se.XMLHttpRequest;return this.xhrRequest(o,t,e,r,i,s,a,n)}else{if(se.fetch&&se.AbortController)return this.fetchRequest(t,e,r,i,s,a,n);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,i,s,a,n){let o={method:t,headers:r,body:i},l=null;return s&&(l=new AbortController,setTimeout(()=>l.abort(),s),o.signal=l.signal),se.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>n&&n(c)).catch(c=>{c.name==="AbortError"&&a?a():n&&n(null)}),l}static xdomainRequest(t,e,r,i,s,a,n){return t.timeout=s,t.open(e,r),t.onload=()=>{let o=this.parseJSON(t.responseText);n&&n(o)},a&&(t.ontimeout=a),t.onprogress=()=>{},t.send(i),t}static xhrRequest(t,e,r,i,s,a,n,o){t.open(e,r,!0),t.timeout=a;for(let[l,c]of Object.entries(i))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===Za.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},n&&(t.ontimeout=n),t.send(s),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var i in t){if(!Object.prototype.hasOwnProperty.call(t,i))continue;let s=e?`${e}[${i}]`:i,a=t[i];typeof a=="object"?r.push(this.serialize(a,s)):r.push(encodeURIComponent(s)+"="+encodeURIComponent(a))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},en=t=>{let e="",r=new Uint8Array(t),i=r.byteLength;for(let s=0;s<i;s++)e+=String.fromCharCode(r[s]);return btoa(e)},Re=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(_r)&&(this.authToken=atob(e[1].slice(_r.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=ae.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+kr.websocket),"$1/"+kr.longpoll)}endpointURL(){return Dt.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=ae.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===ae.open||this.readyState===ae.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:i,messages:s}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else r=0;switch(r){case 200:s.forEach(a=>{setTimeout(()=>this.onmessage({data:a}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=ae.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=en(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},t.join(`
`),()=>this.onerror("timeout"),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(t,e,r){for(let s of this.reqs)s.abort();this.readyState=ae.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(t,e,r,i,s){let a,n=()=>{this.reqs.delete(a),i()};a=Dt.request(t,this.endpointURL(),e,r,this.timeout,n,o=>{this.reqs.delete(a),this.isActive()&&s(o)}),this.reqs.add(a)}},tn=class Ze{constructor(e,r={}){let i=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,s=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=Ze.syncState(this.state,s,a,n),this.pendingDiffs.forEach(l=>{this.state=Ze.syncDiff(this.state,l,a,n)}),this.pendingDiffs=[],o()}),this.channel.on(i.diff,s=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=Ze.syncDiff(this.state,s,a,n),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return Ze.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,i,s){let a=this.clone(e),n={},o={};return this.map(a,(l,c)=>{r[l]||(o[l]=c)}),this.map(r,(l,c)=>{let u=a[l];if(u){let d=c.metas.map(g=>g.phx_ref),h=u.metas.map(g=>g.phx_ref),p=c.metas.filter(g=>h.indexOf(g.phx_ref)<0),m=u.metas.filter(g=>d.indexOf(g.phx_ref)<0);p.length>0&&(n[l]=c,n[l].metas=p),m.length>0&&(o[l]=this.clone(u),o[l].metas=m)}else n[l]=c}),this.syncDiff(a,{joins:n,leaves:o},i,s)}static syncDiff(e,r,i,s){let{joins:a,leaves:n}=this.clone(r);return i||(i=function(){}),s||(s=function(){}),this.map(a,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let u=e[o].metas.map(h=>h.phx_ref),d=c.metas.filter(h=>u.indexOf(h.phx_ref)<0);e[o].metas.unshift(...d)}i(o,c,l)}),this.map(n,(o,l)=>{let c=e[o];if(!c)return;let u=l.metas.map(d=>d.phx_ref);c.metas=c.metas.filter(d=>u.indexOf(d.phx_ref)<0),s(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,r){return r||(r=function(i,s){return s}),this.map(e,(i,s)=>r(i,s))}static map(e,r){return Object.getOwnPropertyNames(e).map(i=>r(i,e[i]))}static clone(e){return JSON.parse(JSON.stringify(e))}},It={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,i,s,a,n]=JSON.parse(t);return e({join_ref:r,ref:i,topic:s,event:a,payload:n})}},binaryEncode(t){let{join_ref:e,ref:r,event:i,topic:s,payload:a}=t,n=this.META_LENGTH+e.length+r.length+s.length+i.length,o=new ArrayBuffer(this.HEADER_LENGTH+n),l=new DataView(o),c=0;l.setUint8(c++,this.KINDS.push),l.setUint8(c++,e.length),l.setUint8(c++,r.length),l.setUint8(c++,s.length),l.setUint8(c++,i.length),Array.from(e,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(r,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(s,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(i,d=>l.setUint8(c++,d.charCodeAt(0)));var u=new Uint8Array(o.byteLength+a.byteLength);return u.set(new Uint8Array(o),0),u.set(new Uint8Array(a),o.byteLength),u.buffer},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),i=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,i);case this.KINDS.reply:return this.decodeReply(t,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,i)}},decodePush(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=e.getUint8(3),n=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(t.slice(n,n+i));n=n+i;let l=r.decode(t.slice(n,n+s));n=n+s;let c=r.decode(t.slice(n,n+a));n=n+a;let u=t.slice(n,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:u}},decodeReply(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=e.getUint8(3),n=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(o,o+i));o=o+i;let c=r.decode(t.slice(o,o+s));o=o+s;let u=r.decode(t.slice(o,o+a));o=o+a;let d=r.decode(t.slice(o,o+n));o=o+n;let h=t.slice(o,t.byteLength),p={status:d,response:h};return{join_ref:l,ref:c,topic:u,event:oe.reply,payload:p}},decodeBroadcast(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=this.HEADER_LENGTH+2,n=r.decode(t.slice(a,a+i));a=a+i;let o=r.decode(t.slice(a,a+s));a=a+s;let l=t.slice(a,t.byteLength);return{join_ref:null,ref:null,topic:n,event:o,payload:l}}},rn=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||Ya,this.transport=e.transport||se.WebSocket||Re,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=e.sessionStorage||se&&se.sessionStorage,this.establishedConnections=0,this.defaultEncoder=It.encode.bind(It),this.defaultDecoder=It.decode.bind(It),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Re?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;Be&&Be.addEventListener&&(Be.addEventListener("pagehide",i=>{this.conn&&(this.disconnect(),r=this.connectClock)}),Be.addEventListener("pageshow",i=>{r===this.connectClock&&(r=null,this.connect())}),Be.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=i=>e.rejoinAfterMs?e.rejoinAfterMs(i):[1e3,2e3,5e3][i-1]||1e4,this.reconnectAfterMs=i=>e.reconnectAfterMs?e.reconnectAfterMs(i):[10,50,100,150,200,250,500,1e3,2e3][i-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(i,s,a)=>{console.log(`${i}: ${s}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=st(e.params||{}),this.endPoint=`${t}/${kr.websocket}`,this.vsn=e.vsn||Ja,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Qi(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken}getLongPollTransport(){return Re}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=Dt.appendParams(Dt.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=st(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Re?this.connectWithFallback(Re,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(s=>{s.ref===e&&(this.off([i]),t(Date.now()-r))});return!0}transportName(t){switch(t){case Re:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${_r}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,i=!0,s,a,n=this.transportName(t),o=l=>{this.log("transport",`falling back to ${n}...`,l),this.off([s,a]),i=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${n}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),a=this.onError(l=>{this.log("transport","error",l),i&&!r&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!i){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Xa,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,r||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===ae.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(oe.error)})}connectionState(){switch(this.conn&&this.conn.readyState){case ae.connecting:return"connecting";case ae.open:return"open";case ae.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new Qa(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:i,ref:s,join_ref:a}=t;this.log("push",`${e} ${r} (${a}, ${s})`,i)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:i,payload:s,ref:a,join_ref:n}=e;if(a&&a===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${r} ${i} ${a&&"("+a+")"||""}`.trim(),s);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(r,i,s,n)&&l.trigger(i,s,a,n)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,i])=>{try{i(...e)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class at{constructor(e,r){const i=an(r);this.presence=new tn(e.getChannel(),i),this.presence.onJoin((s,a,n)=>{const o=at.onJoinPayload(s,a,n);e.getChannel().trigger("presence",o)}),this.presence.onLeave((s,a,n)=>{const o=at.onLeavePayload(s,a,n);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return at.transformState(this.presence.state)}static transformState(e){return e=sn(e),Object.getOwnPropertyNames(e).reduce((r,i)=>{const s=e[i];return r[i]=Ut(s),r},{})}static onJoinPayload(e,r,i){const s=ai(r),a=Ut(i);return{event:"join",key:e,currentPresences:s,newPresences:a}}static onLeavePayload(e,r,i){const s=ai(r),a=Ut(i);return{event:"leave",key:e,currentPresences:s,leftPresences:a}}}function Ut(t){return t.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function sn(t){return JSON.parse(JSON.stringify(t))}function an(t){return(t==null?void 0:t.events)&&{events:t.events}}function ai(t){return t!=null&&t.metas?Ut(t):[]}var ni;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(ni||(ni={}));class nn{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new at(this.channel.channelAdapter,r)}}class on{constructor(e,r,i){const s=ln(i);this.channel=e.getSocket().channel(r,s),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,i){let s;try{s=this.channel.push(e,r,i)}catch{throw`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`}if(this.channel.pushBuffer.length>Ma){const a=this.channel.pushBuffer.shift();a.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${a.event}`,a.payload())}return s}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===ye.joined}isJoined(){return this.state===ye.joined}isJoining(){return this.state===ye.joining}isClosed(){return this.state===ye.closed}isLeaving(){return this.state===ye.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function ln(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}var oi;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(oi||(oi={}));var Me;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(Me||(Me={}));var le;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(le||(le={}));class nt{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},i){var s,a;if(this.topic=e,this.params=r,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new on(this.socket.socketAdapter,e,this.params),this.presence=new nn(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Zi(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((a=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,r=this.timeout){var i,s,a;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:n,presence:o,private:l}}=this.params,c=(s=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(p=>p.filter))!==null&&s!==void 0?s:[],u=!!this.bindings[Me.PRESENCE]&&this.bindings[Me.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,d={},h={broadcast:n,presence:Object.assign(Object.assign({},o),{enabled:u}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(d.access_token=this.socket.accessTokenValue),this._onError(p=>{e==null||e(le.CHANNEL_ERROR,p)}),this._onClose(()=>e==null?void 0:e(le.CLOSED)),this.updateJoinPayload(Object.assign({config:h},d)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:p})=>{if(this.socket._isManualToken()||this.socket.setAuth(),p===void 0){e==null||e(le.SUBSCRIBED);return}this._updatePostgresBindings(p,e)}).receive("error",p=>{this.state=ye.errored,e==null||e(le.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(p).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(le.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var i;const s=this.bindings.postgres_changes,a=(i=s==null?void 0:s.length)!==null&&i!==void 0?i:0,n=[];for(let o=0;o<a;o++){const l=s[o],{filter:{event:c,schema:u,table:d,filter:h}}=l,p=e&&e[o];if(p&&p.event===c&&nt.isFilterValueEqual(p.schema,u)&&nt.isFilterValueEqual(p.table,d)&&nt.isFilterValueEqual(p.filter,h))n.push(Object.assign(Object.assign({},l),{id:p.id}));else{this.unsubscribe(),this.state=ye.errored,r==null||r(le.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=n,this.state!=ye.errored&&r&&r(le.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,i){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),a=e===Me.PRESENCE||e===Me.POSTGRES_CHANGES;if(s&&a)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,i)}async httpSend(e,r,i={}){var s;if(r==null)return Promise.reject("Payload is required for httpSend()");const a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const n={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:r,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,n,(s=i.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,r={}){var i,s;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:n}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:n,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=r.timeout)!==null&&i!==void 0?i:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var n,o,l;const c=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(n=this.params)===null||n===void 0?void 0:n.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,i){const s=new AbortController,a=setTimeout(()=>s.abort(),i),n=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(a),n}_on(e,r,i){const s=e.toLocaleLowerCase(),a=this.channelAdapter.on(e,i),n={type:s,filter:r,callback:i,ref:a};return this.bindings[s]?this.bindings[s].push(n):this.bindings[s]=[n],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,i)=>{var s,a,n,o,l,c,u;const d=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(d,i))return!1;const h=(s=this.bindings[d])===null||s===void 0?void 0:s.find(p=>p.ref===e.ref);if(!h)return!0;if(["broadcast","presence","postgres_changes"].includes(d))if("id"in h){const p=h.id,m=(a=h.filter)===null||a===void 0?void 0:a.event;return p&&((n=r.ids)===null||n===void 0?void 0:n.includes(p))&&(m==="*"||(m==null?void 0:m.toLocaleLowerCase())===((o=r.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const p=(c=(l=h==null?void 0:h.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return p==="*"||p===((u=r==null?void 0:r.event)===null||u===void 0?void 0:u.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===d})}_notThisChannelEvent(e,r){const{close:i,error:s,leave:a,join:n}=Yi;return r&&[i,s,a,n].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,i)=>{if(typeof r=="object"&&"ids"in r){const s=r.data,{schema:a,table:n,commit_timestamp:o,type:l,errors:c}=s;return Object.assign(Object.assign({},{schema:a,table:n,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(s))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const i of e.bindings[r])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=si(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=si(e.columns,e.old_record)),r}}class cn{constructor(e,r){this.socket=new rn(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,i,s=1e4){return new Promise(a=>{setTimeout(()=>a("timeout"),s),this.socket.disconnect(()=>{e(),a("ok")},r,i)})}push(e){this.socket.push(e)}log(e,r,i){this.socket.log(e,r,i)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==wr.connecting}isDisconnecting(){return this.socket.connectionState()==wr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const dn={HEARTBEAT_INTERVAL:25e3},un=[1e3,2e3,5e3,1e4],hn=1e4,pn=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class mn{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Da,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=a=>a?(...n)=>a(...n):(...n)=>fetch(...n),!(!((i=r==null?void 0:r.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const s=this._initializeOptions(r);this.socketAdapter=new cn(e,s),this.httpEndpoint=Zi(e),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const e=this.channels.map(async i=>{const s=await i.unsubscribe();return i.teardown(),s}),r=await Promise.all(e);return this.disconnect(),r}log(e,r,i){this.socketAdapter.log(e,r,i)}connectionState(){return this.socketAdapter.connectionState()||wr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const i=`realtime:${e}`,s=this.getChannels().find(a=>a.topic===i);if(s)return s;{const a=new nt(`realtime:${e}`,r,this);return this.channels.push(a),a}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic)}async _performAuth(e=null){let r,i=!1;if(e)r=e,i=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),r=this.accessTokenValue}else r=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(s=>{const a={access_token:r,version:za};r&&s.updateJoinPayload(a),s.joinedOnce&&s.channelAdapter.isJoined()&&s.channelAdapter.push(Yi.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,i)=>{r=="sent"&&this._setAuthSafely(),e&&e(r,i)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const i=new Blob([pn],{type:"application/javascript"});r=URL.createObjectURL(i)}return r}_initializeOptions(e){var r,i,s,a,n,o,l,c,u;this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null;const d={};d.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:Ua,d.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:dn.HEARTBEAT_INTERVAL,d.transport=(n=e==null?void 0:e.transport)!==null&&n!==void 0?n:Oa.getWebSocketConstructor(),d.params=e==null?void 0:e.params,d.logger=e==null?void 0:e.logger,d.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),d.reconnectAfterMs=(o=e==null?void 0:e.reconnectAfterMs)!==null&&o!==void 0?o:g=>un[g-1]||hn;let h,p;const m=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Na;switch(m){case Ba:h=(g,v)=>v(JSON.stringify(g)),p=(g,v)=>v(JSON.parse(g));break;case Ji:h=this.serializer.encode.bind(this.serializer),p=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${d.vsn}`)}if(d.vsn=m,d.encode=(c=e==null?void 0:e.encode)!==null&&c!==void 0?c:h,d.decode=(u=e==null?void 0:e.decode)!==null&&u!==void 0?u:p,d.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,d.params=Object.assign(Object.assign({},d.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,d.autoSendHeartbeat=!this.worker}return d}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var ut=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function gn(t,e,r){const i=new URL(e,t);if(r)for(const[s,a]of Object.entries(r))a!==void 0&&i.searchParams.set(s,a);return i.toString()}async function fn(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function vn(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:i,query:s,body:a,headers:n}){const o=gn(t.baseUrl,i,s),l=await fn(t.auth),c=await e(o,{method:r,headers:{...a?{"Content-Type":"application/json"}:{},...l,...n},body:a?JSON.stringify(a):void 0}),u=await c.text(),d=(c.headers.get("content-type")||"").includes("application/json"),h=d&&u?JSON.parse(u):u;if(!c.ok){const p=d?h:void 0,m=p==null?void 0:p.error;throw new ut((m==null?void 0:m.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:m==null?void 0:m.type,icebergCode:m==null?void 0:m.code,details:p})}return{status:c.status,headers:c.headers,data:h}}}}function Rt(t){return t.join("")}var yn=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:Rt(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Rt(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Rt(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Rt(t.namespace)}`}),!0}catch(e){if(e instanceof ut&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof ut&&r.status===409)return;throw r}}};function Pe(t){return t.join("")}var bn=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Pe(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof ut&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof ut&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},wn=class{constructor(t){var i;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=vn({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(i=t.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new yn(this.client,e),this.tableOps=new bn(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}},Kt=class extends Error{constructor(t,e="storage",r,i){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=i}};function Jt(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Sr=class extends Kt{constructor(t,e,r,i="storage"){super(t,i,e,r),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},es=class extends Kt{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const xn=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),kn=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Er=t=>{if(Array.isArray(t))return t.map(r=>Er(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,i])=>{const s=r.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[s]=Er(i)}),e},_n=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t);function ht(t){"@babel/helpers - typeof";return ht=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ht(t)}function Sn(t,e){if(ht(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(ht(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function En(t){var e=Sn(t,"string");return ht(e)=="symbol"?e:e+""}function Tn(t,e,r){return(e=En(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function li(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function S(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?li(Object(r),!0).forEach(function(i){Tn(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):li(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}const ci=t=>{var e;return t.msg||t.message||t.error_description||(typeof t.error=="string"?t.error:(e=t.error)===null||e===void 0?void 0:e.message)||JSON.stringify(t)},$n=async(t,e,r,i)=>{if(t!==null&&typeof t=="object"&&typeof t.json=="function"){const s=t;let a=parseInt(s.status,10);Number.isFinite(a)||(a=500),s.json().then(n=>{const o=(n==null?void 0:n.statusCode)||(n==null?void 0:n.code)||a+"";e(new Sr(ci(n),a,o,i))}).catch(()=>{const n=a+"";e(new Sr(s.statusText||`HTTP ${a} error`,a,n,i))})}else e(new es(ci(t),t,i))},An=(t,e,r,i)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!i)return S(S({},s),r);if(kn(i)){var a;const n=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(n))l.toLowerCase()==="content-type"&&(o=c);s.headers=In(n,"Content-Type",(a=o)!==null&&a!==void 0?a:"application/json"),s.body=JSON.stringify(i)}else s.body=i;return e!=null&&e.duplex&&(s.duplex=e.duplex),S(S({},s),r)};function In(t,e,r){const i=S({},t);for(const s of Object.keys(i))s.toLowerCase()===e.toLowerCase()&&delete i[s];return i[e]=r,i}async function Ke(t,e,r,i,s,a,n){return new Promise((o,l)=>{t(r,An(e,i,s,a)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(n==="vectors"){const u=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!u||!u.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>$n(c,l,i,n))})}function ts(t="storage"){return{get:async(e,r,i,s)=>Ke(e,"GET",r,i,s,void 0,t),post:async(e,r,i,s,a)=>Ke(e,"POST",r,s,a,i,t),put:async(e,r,i,s,a)=>Ke(e,"PUT",r,s,a,i,t),head:async(e,r,i,s)=>Ke(e,"HEAD",r,S(S({},i),{},{noResolveJson:!0}),s,void 0,t),remove:async(e,r,i,s,a)=>Ke(e,"DELETE",r,s,a,i,t)}}const Rn=ts("storage"),{get:pt,post:ee,put:Tr,head:Pn,remove:Ur}=Rn,J=ts("vectors");var Ge=class{constructor(t,e={},r,i="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=Object.fromEntries(Object.entries(e).map(([s,a])=>[s.toLowerCase(),a])),this.fetch=xn(r),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=S(S({},this.headers),{},{[t.toLowerCase()]:e}),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(Jt(r))return{data:null,error:r};throw r}}},Cn=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e}then(t,e){return this.execute().then(t,e)}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Jt(e))return{data:null,error:e};throw e}}};let rs;rs=Symbol.toStringTag;var Ln=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[rs]="BlobDownloadBuilder",this.promise=null}asStream(){return new Cn(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Jt(e))return{data:null,error:e};throw e}}};const On={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},di={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var jn=class extends Ge{constructor(t,e={},r,i){super(t,e,i,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,i){var s=this;return s.handleOperation(async()=>{let a;const n=S(S({},di),i);let o=S(S({},s.headers),t==="POST"&&{"x-upsert":String(n.upsert)});const l=n.metadata;typeof Blob<"u"&&r instanceof Blob?(a=new FormData,a.append("cacheControl",n.cacheControl),l&&a.append("metadata",s.encodeMetadata(l)),a.append("",r)):typeof FormData<"u"&&r instanceof FormData?(a=r,a.has("cacheControl")||a.append("cacheControl",n.cacheControl),l&&!a.has("metadata")&&a.append("metadata",s.encodeMetadata(l))):(a=r,o["cache-control"]=`max-age=${n.cacheControl}`,o["content-type"]=n.contentType,l&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!n.duplex&&(n.duplex="half")),i!=null&&i.headers&&(o=S(S({},o),i.headers));const c=s._removeEmptyFolders(e),u=s._getFinalPath(c),d=await(t=="PUT"?Tr:ee)(s.fetch,`${s.url}/object/${u}`,a,S({headers:o},n!=null&&n.duplex?{duplex:n.duplex}:{}));return{path:c,id:d.Id,fullPath:d.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,i){var s=this;const a=s._removeEmptyFolders(t),n=s._getFinalPath(a),o=new URL(s.url+`/object/upload/sign/${n}`);return o.searchParams.set("token",e),s.handleOperation(async()=>{let l;const c=S(S({},di),i),u=S(S({},s.headers),{"x-upsert":String(c.upsert)});return typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",c.cacheControl)):(l=r,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType),{path:a,fullPath:(await Tr(s.fetch,o.toString(),l,{headers:u})).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(t);const s=S({},r.headers);e!=null&&e.upsert&&(s["x-upsert"]="true");const a=await ee(r.fetch,`${r.url}/object/upload/sign/${i}`,{},{headers:s}),n=new URL(r.url+a.url),o=n.searchParams.get("token");if(!o)throw new Kt("No token returned by API");return{signedUrl:n.toString(),path:t,token:o}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var i=this;return i.handleOperation(async()=>await ee(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:i.headers}))}async copy(t,e,r){var i=this;return i.handleOperation(async()=>({path:(await ee(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(t,e,r){var i=this;return i.handleOperation(async()=>{let s=i._getFinalPath(t);const a=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let n=await ee(i.fetch,`${i.url}/object/sign/${s}`,S({expiresIn:e},a?{transform:r.transform}:{}),{headers:i.headers});const o=new URLSearchParams;r!=null&&r.download&&o.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&o.set("cacheNonce",String(r.cacheNonce));const l=o.toString(),c=a&&n.signedURL.includes("/object/sign/")?n.signedURL.replace("/object/sign/","/render/image/sign/"):n.signedURL;return{signedUrl:encodeURI(`${i.url}${c}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var i=this;return i.handleOperation(async()=>{const s=await ee(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:t},{headers:i.headers}),a=new URLSearchParams;r!=null&&r.download&&a.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&a.set("cacheNonce",String(r.cacheNonce));const n=a.toString();return s.map(o=>S(S({},o),{},{signedUrl:o.signedURL?encodeURI(`${i.url}${o.signedURL}${n?`&${n}`:""}`):null}))})}download(t,e,r){const i=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",s=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const a=s.toString(),n=this._getFinalPath(t),o=()=>pt(this.fetch,`${this.url}/${i}/${n}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new Ln(o,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>Er(await pt(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await Pn(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(Jt(s)){var i;const a=s instanceof Sr?s.status:s instanceof es?(i=s.originalError)===null||i===void 0?void 0:i.status:void 0;if(a!==void 0&&[400,404].includes(a))return{data:!1,error:s}}throw s}}getPublicUrl(t,e){const r=this._getFinalPath(t),i=new URLSearchParams;e!=null&&e.download&&i.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce));const s=i.toString(),a=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${r}`)+(s?`?${s}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await Ur(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async list(t,e,r){var i=this;return i.handleOperation(async()=>{const s=S(S(S({},On),e),{},{prefix:t||""});return await ee(i.fetch,`${i.url}/object/list/${i.bucketId}`,s,{headers:i.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const i=S({},t);return await ee(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,i,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const zn="2.103.0",xt={"X-Client-Info":`storage-js/${zn}`};var Bn=class extends Ge{constructor(t,e={},r,i){const s=new URL(t);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const a=s.href.replace(/\/$/,""),n=S(S({},xt),e);super(a,n,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await pt(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await pt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await ee(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await Tr(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await ee(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Ur(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Nn=class extends Ge{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=S(S({},xt),e);super(i,s,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await ee(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const i=r.toString(),s=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await pt(e.fetch,s,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Ur(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!_n(t))throw new Kt("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new wn({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(r,{get(s,a){const n=s[a];return typeof n!="function"?n:async(...o)=>{try{return{data:await n.apply(s,o),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},Un=class extends Ge{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=S(S({},xt),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await J.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await J.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},Mn=class extends Ge{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=S(S({},xt),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Dn=class extends Ge{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=S(S({},xt),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await J.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},Hn=class extends Dn{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new qn(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},qn=class extends Un{constructor(t,e,r,i){super(t,e,i),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new Fn(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},Fn=class extends Mn{constructor(t,e,r,i,s){super(t,e,s),this.vectorBucketName=r,this.indexName=i}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,S(S({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},Wn=class extends Bn{constructor(t,e={},r,i){super(t,e,r,i)}from(t){return new jn(this.url,this.headers,t,this.fetch)}get vectors(){return new Hn(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Nn(this.url+"/iceberg",this.headers,this.fetch)}};const is="2.103.0",Ne=30*1e3,$r=3,nr=$r*Ne,Gn="http://localhost:9999",Vn="supabase.auth.token",Kn={"X-Client-Info":`gotrue-js/${is}`},Ar="X-Supabase-Api-Version",ss={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Jn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Yn=10*60*1e3;class mt extends Error{constructor(e,r,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=i}}function k(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class Xn extends mt{constructor(e,r,i){super(e,r,i),this.name="AuthApiError",this.status=r,this.code=i}}function Zn(t){return k(t)&&t.name==="AuthApiError"}class Se extends mt{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class ue extends mt{constructor(e,r,i,s){super(e,i,s),this.name=r,this.status=i}}class K extends ue{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Pt(t){return k(t)&&t.name==="AuthSessionMissingError"}class Ce extends ue{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ct extends ue{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Lt extends ue{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Qn(t){return k(t)&&t.name==="AuthImplicitGrantRedirectError"}class ui extends ue{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class eo extends ue{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ir extends ue{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function or(t){return k(t)&&t.name==="AuthRetryableFetchError"}class hi extends ue{constructor(e,r,i){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=i}}class Rr extends ue{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Ht="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),pi=` 	
\r=`.split(""),to=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<pi.length;e+=1)t[pi[e].charCodeAt(0)]=-2;for(let e=0;e<Ht.length;e+=1)t[Ht[e].charCodeAt(0)]=e;return t})();function mi(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;r(Ht[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;r(Ht[i]),e.queuedBits-=6}}function as(t,e,r){const i=to[t];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function gi(t){const e=[],r=n=>{e.push(String.fromCodePoint(n))},i={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},a=n=>{so(n,i,r)};for(let n=0;n<t.length;n+=1)as(t.charCodeAt(n),s,a);return e.join("")}function ro(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function io(t,e){for(let r=0;r<t.length;r+=1){let i=t.charCodeAt(r);if(i>55295&&i<=56319){const s=(i-55296)*1024&65535;i=(t.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}ro(i,e)}}function so(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let i=1;i<6;i+=1)if(!(t>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function De(t){const e=[],r={queue:0,queuedBits:0},i=s=>{e.push(s)};for(let s=0;s<t.length;s+=1)as(t.charCodeAt(s),r,i);return new Uint8Array(e)}function ao(t){const e=[];return io(t,r=>e.push(r)),new Uint8Array(e)}function $e(t){const e=[],r={queue:0,queuedBits:0},i=s=>{e.push(s)};return t.forEach(s=>mi(s,r,i)),mi(null,r,i),e.join("")}function no(t){return Math.round(Date.now()/1e3)+t}function oo(){return Symbol("auth-callback")}const q=()=>typeof window<"u"&&typeof document<"u",xe={tested:!1,writable:!1},ns=()=>{if(!q())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(xe.tested)return xe.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),xe.tested=!0,xe.writable=!0}catch{xe.tested=!0,xe.writable=!1}return xe.writable};function lo(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,a)=>{e[a]=s})}catch{}return r.searchParams.forEach((i,s)=>{e[s]=i}),e}const os=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),co=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",Ue=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},ke=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return r}},H=async(t,e)=>{await t.removeItem(e)};class Yt{constructor(){this.promise=new Yt.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}Yt.promiseConstructor=Promise;function Ot(t){const e=t.split(".");if(e.length!==3)throw new Rr("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!Jn.test(e[i]))throw new Rr("JWT not in base64url format");return{header:JSON.parse(gi(e[0])),payload:JSON.parse(gi(e[1])),signature:De(e[2]),raw:{header:e[0],payload:e[1]}}}async function uo(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function ho(t,e){return new Promise((i,s)=>{(async()=>{for(let a=0;a<1/0;a++)try{const n=await t(a);if(!e(a,null,n)){i(n);return}}catch(n){if(!e(a,n)){s(n);return}}})()})}function po(t){return("0"+t.toString(16)).substr(-2)}function mo(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=r.length;let s="";for(let a=0;a<56;a++)s+=r.charAt(Math.floor(Math.random()*i));return s}return crypto.getRandomValues(e),Array.from(e,po).join("")}async function go(t){const r=new TextEncoder().encode(t),i=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(i);return Array.from(s).map(a=>String.fromCharCode(a)).join("")}async function fo(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await go(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Le(t,e,r=!1){const i=mo();let s=i;r&&(s+="/PASSWORD_RECOVERY"),await Ue(t,`${e}-code-verifier`,s);const a=await fo(i);return[a,i===a?"plain":"s256"]}const vo=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function yo(t){const e=t.headers.get(Ar);if(!e||!e.match(vo))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function bo(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function wo(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const xo=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Oe(t){if(!xo.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function lr(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const i=r.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ko(t,e){return new Proxy(t,{get:(r,i,s)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const a=i.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,i,s)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,i,s)}})}function fi(t){return JSON.parse(JSON.stringify(t))}const _e=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),_o=[502,503,504];async function vi(t){var e;if(!co(t))throw new Ir(_e(t),0);if(_o.includes(t.status))throw new Ir(_e(t),t.status);let r;try{r=await t.json()}catch(a){throw new Se(_e(a),a)}let i;const s=yo(t);if(s&&s.getTime()>=ss["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?i=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(i=r.error_code),i){if(i==="weak_password")throw new hi(_e(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new K}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((a,n)=>a&&typeof n=="string",!0))throw new hi(_e(r),t.status,r.weak_password.reasons);throw new Xn(_e(r),t.status||500,i)}const So=(t,e,r,i)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(i),Object.assign(Object.assign({},s),r))};async function _(t,e,r,i){var s;const a=Object.assign({},i==null?void 0:i.headers);a[Ar]||(a[Ar]=ss["2024-01-01"].name),i!=null&&i.jwt&&(a.Authorization=`Bearer ${i.jwt}`);const n=(s=i==null?void 0:i.query)!==null&&s!==void 0?s:{};i!=null&&i.redirectTo&&(n.redirect_to=i.redirectTo);const o=Object.keys(n).length?"?"+new URLSearchParams(n).toString():"",l=await Eo(t,e,r+o,{headers:a,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function Eo(t,e,r,i,s,a){const n=So(e,i,s,a);let o;try{o=await t(r,Object.assign({},n))}catch(l){throw console.error(l),new Ir(_e(l),0)}if(o.ok||await vi(o),i!=null&&i.noResolveJson)return o;try{return await o.json()}catch(l){await vi(l)}}function Q(t){var e;let r=null;Ao(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=no(t.expires_in)));const i=(e=t.user)!==null&&e!==void 0?e:t;return{data:{session:r,user:i},error:null}}function yi(t){const e=Q(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,i)=>r&&typeof i=="string",!0)&&(e.data.weak_password=t.weak_password),e}function be(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function To(t){return{data:t,error:null}}function $o(t){const{action_link:e,email_otp:r,hashed_token:i,redirect_to:s,verification_type:a}=t,n=Vt(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:r,hashed_token:i,redirect_to:s,verification_type:a},l=Object.assign({},n);return{data:{properties:o,user:l},error:null}}function bi(t){return t}function Ao(t){return t.access_token&&t.refresh_token&&t.expires_in}const cr=["global","local","others"];class Io{constructor({url:e="",headers:r={},fetch:i}){this.url=e,this.headers=r,this.fetch=os(i),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,r=cr[0]){if(cr.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${cr.join(", ")}`);try{return await _(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(k(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,r={}){try{return await _(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:be})}catch(i){if(k(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:r}=e,i=Vt(e,["options"]),s=Object.assign(Object.assign({},i),r);return"newEmail"in i&&(s.new_email=i==null?void 0:i.newEmail,delete s.newEmail),await _(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:$o,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(k(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await _(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:be})}catch(r){if(k(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,i,s,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await _(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&i!==void 0?i:"",per_page:(a=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:bi});if(u.error)throw u.error;const d=await u.json(),h=(n=u.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(k(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Oe(e);try{return await _(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:be})}catch(r){if(k(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){Oe(e);try{return await _(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:be})}catch(i){if(k(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,r=!1){Oe(e);try{return await _(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:be})}catch(i){if(k(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){Oe(e.userId);try{const{data:r,error:i}=await _(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:i}}catch(r){if(k(r))return{data:null,error:r};throw r}}async _deleteFactor(e){Oe(e.userId),Oe(e.id);try{return{data:await _(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(k(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,i,s,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await _(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&i!==void 0?i:"",per_page:(a=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:bi});if(u.error)throw u.error;const d=await u.json(),h=(n=u.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(k(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await _(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(k(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await _(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(k(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await _(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(k(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await _(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(k(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await _(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(k(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await _(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:i=>{var s;return{data:{providers:(s=i==null?void 0:i.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(r){if(k(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await _(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(k(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await _(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(k(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await _(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(k(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await _(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(k(r))return{data:null,error:r};throw r}}}function wi(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}const ie={debug:!!(globalThis&&ns()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class ls extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class xi extends ls{}async function Ro(t,e,r){ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",t,e);const i=new globalThis.AbortController;let s;e>0&&(s=setTimeout(()=>{i.abort(),ie.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",t)},e)),await Promise.resolve();try{return await globalThis.navigator.locks.request(t,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:i.signal},async a=>{if(a){clearTimeout(s),ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",t,a.name);try{return await r()}finally{ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",t,a.name)}}else{if(e===0)throw ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",t),new xi(`Acquiring an exclusive Navigator LockManager lock "${t}" immediately failed`);if(ie.debug)try{const n=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(n,null,"  "))}catch(n){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",n)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(s),await r()}})}catch(a){if(e>0&&clearTimeout(s),(a==null?void 0:a.name)==="AbortError"&&e>0){if(i.signal.aborted)return ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",t),console.warn(`@supabase/gotrue-js: Lock "${t}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(t,{mode:"exclusive",steal:!0},async n=>{if(n){ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",t,n.name);try{return await r()}finally{ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",t,n.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r()}));throw ie.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",t),new xi(`Lock "${t}" was released because another request stole it`)}throw a}}function Po(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function cs(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function Co(t){return parseInt(t,16)}function Lo(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Oo(t){var e;const{chainId:r,domain:i,expirationTime:s,issuedAt:a=new Date,nonce:n,notBefore:o,requestId:l,resources:c,scheme:u,uri:d,version:h}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(n&&n.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${n}`);if(!d)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const p=cs(t.address),m=u?`${u}://${i}`:i,g=t.statement?`${t.statement}
`:"",v=`${m} wants you to sign in with your Ethereum account:
${p}

${g}`;let b=`URI: ${d}
Version: ${h}
Chain ID: ${r}${n?`
Nonce: ${n}`:""}
Issued At: ${a.toISOString()}`;if(s&&(b+=`
Expiration Time: ${s.toISOString()}`),o&&(b+=`
Not Before: ${o.toISOString()}`),l&&(b+=`
Request ID: ${l}`),c){let x=`
Resources:`;for(const f of c){if(!f||typeof f!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${f}`);x+=`
- ${f}`}b+=x}return`${v}
${b}`}class N extends Error{constructor({message:e,code:r,cause:i,name:s}){var a;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(a=s??(i instanceof Error?i.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=r}}class qt extends N{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function jo({error:t,options:e}){var r,i,s;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new N({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new N({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((i=a.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new N({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new N({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new N({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new N({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new N({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new N({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const n=window.location.hostname;if(ds(n)){if(a.rp.id!==n)return new N({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new N({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new N({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new N({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new N({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function zo({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new N({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new N({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const i=window.location.hostname;if(ds(i)){if(r.rpId!==i)return new N({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new N({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new N({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new N({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Bo{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const No=new Bo;function Uo(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:i}=t,s=Vt(t,["challenge","user","excludeCredentials"]),a=De(e).buffer,n=Object.assign(Object.assign({},r),{id:De(r.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:a,user:n});if(i&&i.length>0){o.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:De(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Mo(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,i=Vt(t,["challenge","allowCredentials"]),s=De(e).buffer,a=Object.assign(Object.assign({},i),{challenge:s});if(r&&r.length>0){a.allowCredentials=new Array(r.length);for(let n=0;n<r.length;n++){const o=r[n];a.allowCredentials[n]=Object.assign(Object.assign({},o),{id:De(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function Do(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:$e(new Uint8Array(t.response.attestationObject)),clientDataJSON:$e(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Ho(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,i=t.getClientExtensionResults(),s=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:$e(new Uint8Array(s.authenticatorData)),clientDataJSON:$e(new Uint8Array(s.clientDataJSON)),signature:$e(new Uint8Array(s.signature)),userHandle:s.userHandle?$e(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function ds(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function ki(){var t,e;return!!(q()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function qo(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new qt("Browser returned unexpected credential type",e)}:{data:null,error:new qt("Empty credential response",e)}}catch(e){return{data:null,error:jo({error:e,options:t})}}}async function Fo(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new qt("Browser returned unexpected credential type",e)}:{data:null,error:new qt("Empty credential response",e)}}catch(e){return{data:null,error:zo({error:e,options:t})}}}const Wo={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Go={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ft(...t){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),i={};for(const s of t)if(s)for(const a in s){const n=s[a];if(n!==void 0)if(Array.isArray(n))i[a]=n;else if(r(n))i[a]=n;else if(e(n)){const o=i[a];e(o)?i[a]=Ft(o,n):i[a]=Ft(n)}else i[a]=n}return i}function Vo(t,e){return Ft(Wo,t,e||{})}function Ko(t,e){return Ft(Go,t,e||{})}class Jo{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:i,signal:s},a){var n;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=s??No.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:u}=o.webauthn.credential_options.publicKey;if(!u.name){const d=i;if(d)u.name=`${u.id}:${d}`;else{const p=(await this.client.getUser()).data.user,m=((n=p==null?void 0:p.user_metadata)===null||n===void 0?void 0:n.name)||(p==null?void 0:p.email)||(p==null?void 0:p.id)||"User";u.name=`${u.id}:${m}`}}u.displayName||(u.displayName=u.name)}switch(o.webauthn.type){case"create":{const u=Vo(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:d,error:h}=await qo({publicKey:u,signal:c});return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:h}}case"request":{const u=Ko(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:d,error:h}=await Fo(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:u,signal:c}));return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:h}}}}catch(o){return k(o)?{data:null,error:o}:{data:null,error:new Se("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:i}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new mt("rpId is required for WebAuthn authentication")};try{if(!ki())return{data:null,error:new Se("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:i},signal:s},{request:a});if(!n)return{data:null,error:o};const{webauthn:l}=n;return this._verify({factorId:e,challengeId:n.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:i,credential_response:l.credential_response}})}catch(n){return k(n)?{data:null,error:n}:{data:null,error:new Se("Unexpected error in authenticate",n)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new mt("rpId is required for WebAuthn registration")};try{if(!ki())return{data:null,error:new Se("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this._enroll({friendlyName:e});if(!n)return await this.client.mfa.listFactors().then(u=>{var d;return(d=u.data)===null||d===void 0?void 0:d.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(u=>u?this.client.mfa.unenroll({factorId:u==null?void 0:u.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:n.id,friendlyName:n.friendly_name,webauthn:{rpId:r,rpOrigins:i},signal:s},{create:a});return l?this._verify({factorId:n.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(n){return k(n)?{data:null,error:n}:{data:null,error:new Se("Unexpected error in register",n)}}}}Po();const Yo={url:Gn,storageKey:Vn,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Kn,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function _i(t,e,r){return await r()}const je={};class gt{get jwks(){var e,r;return(r=(e=je[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){je[this.storageKey]=Object.assign(Object.assign({},je[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=je[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){je[this.storageKey]=Object.assign(Object.assign({},je[this.storageKey]),{cachedAt:e})}constructor(e){var r,i,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},Yo),e);if(this.storageKey=a.storageKey,this.instanceID=(r=gt.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,gt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&q()){const n=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(n),this.logDebugMessages&&console.trace(n)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new Io({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=os(a.fetch),this.lock=a.lock||_i,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock?this.lock=a.lock:this.persistSession&&q()&&(!((i=globalThis==null?void 0:globalThis.navigator)===null||i===void 0)&&i.locks)?this.lock=Ro:this.lock=_i,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Jo(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:ns()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=wi(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=wi(this.memoryStorage)),q()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(n){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",n)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async n=>{this._debug("received broadcast notification from other tab or client",n);try{await this._notifyAllSubscribers(n.data.event,n.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}a.skipAutoInitialize||this.initialize().catch(n=>{this._debug("#initialize()","error",n)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${is}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let r={},i="none";if(q()&&(r=lo(window.location.href),this._isImplicitGrantCallback(r)?i="implicit":await this._isPKCECallback(r)&&(i="pkce")),q()&&this.detectSessionInUrl&&i!=="none"){const{data:s,error:a}=await this._getSessionFromURL(r,i);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),Qn(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:n,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",n,"redirect type",o),await this._saveSession(n),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return k(r)?this._returnResult({error:r}):this._returnResult({error:new Se("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,i,s;try{const a=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:Q}),{data:n,error:o}=a;if(o||!n)return this._returnResult({data:{user:null,session:null},error:o});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(k(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var r,i,s;try{let a;if("email"in e){const{email:u,password:d,options:h}=e;let p=null,m=null;this.flowType==="pkce"&&([p,m]=await Le(this.storage,this.storageKey)),a=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:u,password:d,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:p,code_challenge_method:m},xform:Q})}else if("phone"in e){const{phone:u,password:d,options:h}=e;a=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:d,data:(i=h==null?void 0:h.data)!==null&&i!==void 0?i:{},channel:(s=h==null?void 0:h.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:Q})}else throw new Ct("You must provide either an email or phone number and a password");const{data:n,error:o}=a;if(o||!n)return await H(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let r;if("email"in e){const{email:a,password:n,options:o}=e;r=await _(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:yi})}else if("phone"in e){const{phone:a,password:n,options:o}=e;r=await _(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:yi})}else throw new Ct("You must provide either an email or phone number and a password");const{data:i,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!i||!i.session||!i.user){const a=new Ce;return this._returnResult({data:{user:null,session:null},error:a})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:s})}catch(r){if(k(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,i,s,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,i,s,a,n,o,l,c,u,d,h;let p,m;if("message"in e)p=e.message,m=e.signature;else{const{chain:g,wallet:v,statement:b,options:x}=e;let f;if(q())if(typeof v=="object")f=v;else{const B=window;if("ethereum"in B&&typeof B.ethereum=="object"&&"request"in B.ethereum&&typeof B.ethereum.request=="function")f=B.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(x!=null&&x.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");f=v}const w=new URL((r=x==null?void 0:x.url)!==null&&r!==void 0?r:window.location.href),R=await f.request({method:"eth_requestAccounts"}).then(B=>B).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!R||R.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=cs(R[0]);let $=(i=x==null?void 0:x.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!$){const B=await f.request({method:"eth_chainId"});$=Co(B)}const U={domain:w.host,address:T,statement:b,uri:w.href,version:"1",chainId:$,nonce:(s=x==null?void 0:x.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(n=(a=x==null?void 0:x.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&n!==void 0?n:new Date,expirationTime:(o=x==null?void 0:x.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=x==null?void 0:x.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=x==null?void 0:x.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(u=x==null?void 0:x.signInWithEthereum)===null||u===void 0?void 0:u.resources};p=Oo(U),m=await f.request({method:"personal_sign",params:[Lo(p),T]})}try{const{data:g,error:v}=await _(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:p,signature:m},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:Q});if(v)throw v;if(!g||!g.session||!g.user){const b=new Ce;return this._returnResult({data:{user:null,session:null},error:b})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:v})}catch(g){if(k(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var r,i,s,a,n,o,l,c,u,d,h,p;let m,g;if("message"in e)m=e.message,g=e.signature;else{const{chain:v,wallet:b,statement:x,options:f}=e;let w;if(q())if(typeof b=="object")w=b;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))w=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(f!=null&&f.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");w=b}const R=new URL((r=f==null?void 0:f.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in w&&w.signIn){const T=await w.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},f==null?void 0:f.signInWithSolana),{version:"1",domain:R.host,uri:R.href}),x?{statement:x}:null));let $;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")$=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)$=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in $&&"signature"in $&&(typeof $.signedMessage=="string"||$.signedMessage instanceof Uint8Array)&&$.signature instanceof Uint8Array)m=typeof $.signedMessage=="string"?$.signedMessage:new TextDecoder().decode($.signedMessage),g=$.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in w)||typeof w.signMessage!="function"||!("publicKey"in w)||typeof w!="object"||!w.publicKey||!("toBase58"in w.publicKey)||typeof w.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${R.host} wants you to sign in with your Solana account:`,w.publicKey.toBase58(),...x?["",x,""]:[""],"Version: 1",`URI: ${R.href}`,`Issued At: ${(s=(i=f==null?void 0:f.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((a=f==null?void 0:f.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${f.signInWithSolana.notBefore}`]:[],...!((n=f==null?void 0:f.signInWithSolana)===null||n===void 0)&&n.expirationTime?[`Expiration Time: ${f.signInWithSolana.expirationTime}`]:[],...!((o=f==null?void 0:f.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${f.signInWithSolana.chainId}`]:[],...!((l=f==null?void 0:f.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${f.signInWithSolana.nonce}`]:[],...!((c=f==null?void 0:f.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${f.signInWithSolana.requestId}`]:[],...!((d=(u=f==null?void 0:f.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||d===void 0)&&d.length?["Resources",...f.signInWithSolana.resources.map($=>`- ${$}`)]:[]].join(`
`);const T=await w.signMessage(new TextEncoder().encode(m),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=T}}try{const{data:v,error:b}=await _(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:$e(g)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Q});if(b)throw b;if(!v||!v.session||!v.user){const x=new Ce;return this._returnResult({data:{user:null,session:null},error:x})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:b})}catch(v){if(k(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const r=await ke(this.storage,`${this.storageKey}-code-verifier`),[i,s]=(r??"").split("/");try{if(!i&&this.flowType==="pkce")throw new eo;const{data:a,error:n}=await _(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:Q});if(await H(this.storage,`${this.storageKey}-code-verifier`),n)throw n;if(!a||!a.session||!a.user){const o=new Ce;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:s??null}),error:n})}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(e){try{const{options:r,provider:i,token:s,access_token:a,nonce:n}=e,o=await _(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:s,access_token:a,nonce:n,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:Q}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const u=new Ce;return this._returnResult({data:{user:null,session:null},error:u})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(k(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,i,s,a,n;try{if("email"in e){const{email:o,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await Le(this.storage,this.storageKey));const{error:d}=await _(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:d})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:u}=await _(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(n=l==null?void 0:l.channel)!==null&&n!==void 0?n:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u})}throw new Ct("You must provide either an email or phone number.")}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var r,i;try{let s,a;"options"in e&&(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo,a=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:n,error:o}=await _(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:s,xform:Q});if(o)throw o;if(!n)throw new Error("An error occurred on token verification.");const l=n.session,c=n.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(s){if(k(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(e){var r,i,s,a,n;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await Le(this.storage,this.storageKey));const c=await _(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(r=e.options)===null||r===void 0?void 0:r.redirectTo)!==null&&i!==void 0?i:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:To});return!((a=c.data)===null||a===void 0)&&a.url&&q()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:i}=e;if(i)throw i;if(!r)throw new K;const{error:s}=await _(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(e){if(k(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const r=`${this.url}/resend`;if("email"in e){const{email:i,type:s,options:a}=e,{error:n}=await _(this.fetch,"POST",r,{headers:this.headers,body:{email:i,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:n})}else if("phone"in e){const{phone:i,type:s,options:a}=e,{data:n,error:o}=await _(this.fetch,"POST",r,{headers:this.headers,body:{phone:i,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:n==null?void 0:n.message_id},error:o})}throw new Ct("You must provide either an email or phone number and a type")}catch(r){if(k(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await i,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=r();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await ke(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<nr:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const n=await ke(this.userStorage,this.storageKey+"-user");n!=null&&n.user?e.user=n.user:e.user=lr()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const n={value:this.suppressGetSessionWarning};e.user=ko(e.user,n),n.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await _(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:be}):await this._useSession(async r=>{var i,s,a;const{data:n,error:o}=r;if(o)throw o;return!(!((i=n.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new K}:await _(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0,xform:be})})}catch(r){if(k(r))return Pt(r)&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r))}async _updateUser(e,r={}){try{return await this._useSession(async i=>{const{data:s,error:a}=i;if(a)throw a;if(!s.session)throw new K;const n=s.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await Le(this.storage,this.storageKey));const{data:c,error:u}=await _(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:n.access_token,xform:be});if(u)throw u;return n.user=c.user,await this._saveSession(n),await this._notifyAllSubscribers("USER_UPDATED",n),this._returnResult({data:{user:n.user},error:null})})}catch(i){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new K;const r=Date.now()/1e3;let i=r,s=!0,a=null;const{payload:n}=Ot(e.access_token);if(n.exp&&(i=n.exp,s=i<=r),s){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:i-r,expires_at:i},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(r){if(k(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async r=>{var i;if(!e){const{data:n,error:o}=r;if(o)throw o;e=(i=n.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new K;const{data:s,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(k(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){try{if(!q())throw new Lt("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Lt(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new ui("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Lt("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new ui("No code detected.");const{data:x,error:f}=await this._exchangeCodeForSession(e.code);if(f)throw f;const w=new URL(window.location.href);return w.searchParams.delete("code"),window.history.replaceState(window.history.state,"",w.toString()),{data:{session:x.session,redirectType:null},error:null}}const{provider_token:i,provider_refresh_token:s,access_token:a,refresh_token:n,expires_in:o,expires_at:l,token_type:c}=e;if(!a||!o||!n||!c)throw new Lt("No session defined in URL");const u=Math.round(Date.now()/1e3),d=parseInt(o);let h=u+d;l&&(h=parseInt(l));const p=h-u;p*1e3<=Ne&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${d}s`);const m=h-d;u-m>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",m,h,u):u-m<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",m,h,u);const{data:g,error:v}=await this._getUser(a);if(v)throw v;const b={provider_token:i,provider_refresh_token:s,access_token:a,expires_in:d,expires_at:h,refresh_token:n,token_type:c,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:b,redirectType:e.type},error:null})}catch(i){if(k(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const r=await ke(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&r)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a&&!Pt(a))return this._returnResult({error:a});const n=(i=s.session)===null||i===void 0?void 0:i.access_token;if(n){const{error:o}=await this.admin.signOut(n,e);if(o&&!(Zn(o)&&(o.status===404||o.status===401||o.status===403)||Pt(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await H(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const r=oo(),i={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,i),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async r=>{var i,s;try{const{data:{session:a},error:n}=r;if(n)throw n;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),Pt(a)?console.warn(a):console.error(a)}})}async resetPasswordForEmail(e,r={}){let i=null,s=null;this.flowType==="pkce"&&([i,s]=await Le(this.storage,this.storageKey,!0));try{return await _(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(a){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:r,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;try{const{data:i,error:s}=await this._useSession(async a=>{var n,o,l,c,u;const{data:d,error:h}=a;if(h)throw h;const p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(n=e.options)===null||n===void 0?void 0:n.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await _(this.fetch,"GET",p,{headers:this.headers,jwt:(u=(c=d.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(s)throw s;return q()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if(k(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var i;try{const{error:s,data:{session:a}}=r;if(s)throw s;const{options:n,provider:o,token:l,access_token:c,nonce:u}=e,d=await _(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=a==null?void 0:a.access_token)!==null&&i!==void 0?i:void 0,body:{provider:o,id_token:l,access_token:c,nonce:u,link_identity:!0,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:Q}),{data:h,error:p}=d;return p?this._returnResult({data:{user:null,session:null},error:p}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new Ce}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:p}))}catch(s){if(await H(this.storage,`${this.storageKey}-code-verifier`),k(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var i,s;const{data:a,error:n}=r;if(n)throw n;return await _(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{const i=Date.now();return await ho(async s=>(s>0&&await uo(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await _(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Q})),(s,a)=>{const n=200*Math.pow(2,s);return a&&or(a)&&Date.now()+n-i<Ne})}catch(i){if(this._debug(r,"error",i),k(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",i),q()&&!r.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,r;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const s=await ke(this.storage,this.storageKey);if(s&&this.userStorage){let n=await ke(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!n&&(n={user:s.user},await Ue(this.userStorage,this.storageKey+"-user",n)),s.user=(e=n==null?void 0:n.user)!==null&&e!==void 0?e:lr()}else if(s&&!s.user&&!s.user){const n=await ke(this.storage,this.storageKey+"-user");n&&(n!=null&&n.user)?(s.user=n.user,await H(this.storage,this.storageKey+"-user"),await Ue(this.storage,this.storageKey,s)):s.user=lr()}if(this._debug(i,"session from storage",s),!this._isValidSession(s)){this._debug(i,"session is not valid"),s!==null&&await this._removeSession();return}const a=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<nr;if(this._debug(i,`session has${a?"":" not"} expired with margin of ${nr}s`),a){if(this.autoRefreshToken&&s.refresh_token){const{error:n}=await this._callRefreshToken(s.refresh_token);n&&(console.error(n),or(n)||(this._debug(i,"refresh failed with a non-retryable error, removing the session",n),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:n,error:o}=await this._getUser(s.access_token);!o&&(n!=null&&n.user)?(s.user=n.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(n){console.error("Error getting user data:",n),this._debug(i,"error getting user data, skipping SIGNED_IN notification",n)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(i,"error",s),console.error(s);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var r,i;if(!e)throw new K;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new Yt;const{data:a,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!a.session)throw new K;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(s,"error",a),k(a)){const n={data:null,error:a};return or(a)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(n),n}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(a),a}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,r,i=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",r,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:r});const a=[],n=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,r)}catch(l){a.push(l)}});if(await Promise.all(n),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await H(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},e),i=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&r.user&&await Ue(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const a=fi(s);await Ue(this.storage,this.storageKey,a)}else{const s=fi(r);await Ue(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await H(this.storage,this.storageKey),await H(this.storage,this.storageKey+"-code-verifier"),await H(this.storage,this.storageKey+"-user"),this.userStorage&&await H(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&q()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ne);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:i}}=r;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((i.expires_at*1e3-e)/Ne);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${Ne}ms, refresh threshold is ${$r} ticks`),s<=$r&&await this._callRefreshToken(i.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof ls)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!q()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,i){const s=[`provider=${encodeURIComponent(r)}`];if(i!=null&&i.redirectTo&&s.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&s.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[a,n]=await Le(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(n)}`});s.push(o.toString())}if(i!=null&&i.queryParams){const a=new URLSearchParams(i.queryParams);s.push(a.toString())}return i!=null&&i.skipBrowserRedirect&&s.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;return a?this._returnResult({data:null,error:a}):await _(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token})})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var i,s;const{data:a,error:n}=r;if(n)return this._returnResult({data:null,error:n});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await _(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(i=a==null?void 0:a.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const n=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Do(e.webauthn.credential_response):Ho(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await _(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:n,headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const n=await _(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token});if(n.error)return n;const{data:o}=n;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Uo(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Mo(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(e){const{data:r,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:i}=await this.getUser();if(i)return{data:null,error:i};const s={all:[],phone:[],totp:[],webauthn:[]};for(const a of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])s.all.push(a),a.status==="verified"&&s[a.factor_type].push(a);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,i,s,a;if(e)try{const{payload:p}=Ot(e);let m=null;p.aal&&(m=p.aal);let g=m;const{data:{user:v},error:b}=await this.getUser(e);if(b)return this._returnResult({data:null,error:b});((i=(r=v==null?void 0:v.factors)===null||r===void 0?void 0:r.filter(w=>w.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(g="aal2");const f=p.amr||[];return{data:{currentLevel:m,nextLevel:g,currentAuthenticationMethods:f},error:null}}catch(p){if(k(p))return this._returnResult({data:null,error:p});throw p}const{data:{session:n},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Ot(n.access_token);let c=null;l.aal&&(c=l.aal);let u=c;((a=(s=n.user.factors)===null||s===void 0?void 0:s.filter(p=>p.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(u="aal2");const h=l.amr||[];return{data:{currentLevel:c,nextLevel:u,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:i},error:s}=r;return s?this._returnResult({data:null,error:s}):i?await _(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new K})})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async i=>{const{data:{session:s},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new K});const n=await _(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&q()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(k(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,r){try{return await this._useSession(async i=>{const{data:{session:s},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new K});const n=await _(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&q()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(k(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:i}=e;return i?this._returnResult({data:null,error:i}):r?await _(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new K})})}catch(e){if(k(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:i},error:s}=r;return s?this._returnResult({data:null,error:s}):i?(await _(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new K})})}catch(r){if(k(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let i=r.keys.find(o=>o.kid===e);if(i)return i;const s=Date.now();if(i=this.jwks.keys.find(o=>o.kid===e),i&&this.jwks_cached_at+Yn>s)return i;const{data:a,error:n}=await _(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(n)throw n;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=s,i=a.keys.find(o=>o.kid===e),!i)?null:i}async getClaims(e,r={}){try{let i=e;if(!i){const{data:p,error:m}=await this.getSession();if(m||!p.session)return this._returnResult({data:null,error:m});i=p.session.access_token}const{header:s,payload:a,signature:n,raw:{header:o,payload:l}}=Ot(i);r!=null&&r.allowExpired||bo(a.exp);const c=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!c){const{error:p}=await this.getUser(i);if(p)throw p;return{data:{claims:a,header:s,signature:n},error:null}}const u=wo(s.alg),d=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,d,n,ao(`${o}.${l}`)))throw new Rr("Invalid JWT signature");return{data:{claims:a,header:s,signature:n},error:null}}catch(i){if(k(i))return this._returnResult({data:null,error:i});throw i}}}gt.nextInstanceID={};const Xo=gt,Zo="2.103.0";let Qe="";typeof Deno<"u"?Qe="deno":typeof document<"u"?Qe="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Qe="react-native":Qe="node";const Qo={"X-Client-Info":`supabase-js-${Qe}/${Zo}`},el={headers:Qo},tl={schema:"public"},rl={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},il={};function ft(t){"@babel/helpers - typeof";return ft=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ft(t)}function sl(t,e){if(ft(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(ft(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function al(t){var e=sl(t,"string");return ft(e)=="symbol"?e:e+""}function nl(t,e,r){return(e=al(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Si(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Si(Object(r),!0).forEach(function(i){nl(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Si(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}const ol=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),ll=()=>Headers,cl=(t,e,r)=>{const i=ol(r),s=ll();return async(a,n)=>{var o;const l=(o=await e())!==null&&o!==void 0?o:t;let c=new s(n==null?void 0:n.headers);return c.has("apikey")||c.set("apikey",t),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),i(a,j(j({},n),{},{headers:c}))}};function dl(t){return t.endsWith("/")?t:t+"/"}function ul(t,e){var r,i;const{db:s,auth:a,realtime:n,global:o}=t,{db:l,auth:c,realtime:u,global:d}=e,h={db:j(j({},l),s),auth:j(j({},c),a),realtime:j(j({},u),n),storage:{},global:j(j(j({},d),o),{},{headers:j(j({},(r=d==null?void 0:d.headers)!==null&&r!==void 0?r:{}),(i=o==null?void 0:o.headers)!==null&&i!==void 0?i:{})}),accessToken:async()=>""};return t.accessToken?h.accessToken=t.accessToken:delete h.accessToken,h}function hl(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(dl(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var pl=class extends Xo{constructor(t){super(t)}},ml=class{constructor(t,e,r){var i,s;this.supabaseUrl=t,this.supabaseKey=e;const a=hl(t);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const n=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:tl,realtime:il,auth:j(j({},rl),{},{storageKey:n}),global:el},l=ul(r??{},o);if(this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(u,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=cl(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(j({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(u=>this.realtime.setAuth(u)).catch(u=>console.warn("Failed to set initial Realtime auth token:",u)),this.rest=new La(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Wn(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new _a(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:i}=await t.auth.getSession();return(e=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:i,userStorage:s,storageKey:a,flowType:n,lock:o,debug:l,throwOnError:c},u,d){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new pl({url:this.authUrl.href,headers:j(j({},h),u),storageKey:a,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:i,userStorage:s,flowType:n,lock:o,debug:l,throwOnError:c,fetch:d,hasCustomAuthorizationHeader:Object.keys(this.headers).some(p=>p.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new mn(this.realtimeUrl.href,j(j({},t),{},{params:j(j({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const gl=(t,e,r)=>new ml(t,e,r);function fl(){if(typeof window<"u")return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}fl()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const us="https://icgjldvgvtesoehtoinf.supabase.co",Pr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",I=gl(us,Pr,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),hs=4e3,vl=1500;function Mr(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function yl(t=""){const e={apikey:Pr};return t?e.Authorization=`Bearer ${t}`:e.Authorization=`Bearer ${Pr}`,e}async function bl(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok)throw new Error(e&&(e.message||e.msg)||"Supabase request failed.");return e}async function Dr(t,e,{accessToken:r="",timeoutMs:i=hs}={}){const s=`${us}/rest/v1/${t}?${e.toString()}`,a=await Mr(fetch(s,{headers:yl(r)}),i,`${t} request timed out.`),n=await bl(a);return Array.isArray(n)?n:[]}async function wl(t,e){const r=new URLSearchParams({select:"*",host_id:`eq.${e}`,status:"eq.approved",order:"created_at.desc"});return Dr(t,r)}async function xl(t,e){const{data:r,error:i}=await Mr(I.from(t).select("*").eq("host_id",e).order("created_at",{ascending:!1}),hs,`${t} request timed out.`);if(i)throw i;return r||[]}async function kl(){const{data:t}=await I.auth.getSession();return t.session}async function ps(){const{data:{user:t}}=await I.auth.getUser();if(!t)return null;const{data:e}=await I.from("profiles").select("*").eq("id",t.id).single();return e?{...t,...e}:t}async function _l({email:t,password:e,fullName:r,phone:i}){const{data:s,error:a}=await I.auth.signUp({email:t,password:e,options:{data:{full_name:r}}});if(a)throw a;return s.user&&await I.from("profiles").upsert({id:s.user.id,full_name:r,phone:i,role:"user"}),s}async function ms({email:t,password:e}){const{data:r,error:i}=await I.auth.signInWithPassword({email:t,password:e});if(i)throw i;return r}async function Sl(){const{error:t}=await I.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/LushaiTrips/"}});if(t)throw t}async function El(){const{error:t}=await I.auth.signOut();t&&console.warn("[signOut]",t.message)}async function Tl(t){const{error:e}=await I.auth.signInWithOtp({phone:t});if(e)throw e}async function $l(t,e,r={}){var n;const{data:i,error:s}=await I.auth.verifyOtp({phone:t,token:e,type:"sms"});if(s)throw s;const a=i==null?void 0:i.user;return a&&await I.from("profiles").upsert({id:a.id,phone:t,full_name:r.full_name||((n=a.user_metadata)==null?void 0:n.full_name)||"",role:"user"}),i}async function Al(t="all"){let e=I.from("destinations").select("*").order("rating",{ascending:!1});t&&t!=="all"&&(e=e.eq("category",t));const{data:r,error:i}=await e;if(i)throw i;return r||[]}async function Il(t){const{data:e,error:r}=await I.from("destinations").select("*").eq("id",t).single();if(r)throw r;return e}async function gs(t="all"){let e=I.from("stays").select("*").eq("status","approved").order("top_rated",{ascending:!1});t&&t!=="all"&&(e=e.ilike("type",t));const{data:r,error:i}=await e;if(i)throw i;return r||[]}async function Rl(t){const{data:e,error:r}=await I.from("stays").select("*").eq("id",t).single();if(r)throw r;return e}async function fs(){const{data:t,error:e}=await I.from("guides").select("*").eq("status","approved").order("rating",{ascending:!1});if(e)throw e;return t||[]}async function vs(t){const{data:e,error:r}=await I.from("guides").select("*").eq("id",t).single();if(r)throw r;return e}async function ys(){const t=new URLSearchParams({select:"*",status:"eq.approved",order:"rating.desc"});return Dr("transport",t)}async function bs(t){const e=new URLSearchParams({select:"*",id:`eq.${t}`,status:"eq.approved",limit:"1"}),r=await Dr("transport",e);if(!r.length)throw new Error("Transport listing not found.");return r[0]}async function Pl(t){const{data:{user:e}}=await I.auth.getUser();if(!e)throw new Error("You must be logged in to book");const r={user_id:e.id,listing_id:t.listingId,listing_name:t.listingName,listing_type:t.listingType,checkin:t.checkin||null,checkout:t.checkout||null,guests:parseInt(t.guests)||1,total:t.total,guest_name:t.guestName,guest_email:t.guestEmail,guest_phone:t.guestPhone,notes:t.notes||"",payment_id:t.razorpayPaymentId||null,status:"confirmed"},{data:i,error:s}=await I.from("bookings").insert(r).select().single();if(s)throw s;return localStorage.setItem("lt_last_booking",JSON.stringify(i)),i}async function Cl(){const{data:{user:t}}=await I.auth.getUser();if(!t)return[];const{data:e,error:r}=await I.from("bookings").select("*").eq("user_id",t.id).order("created_at",{ascending:!1});if(r)throw r;return e||[]}function Ll(){try{return JSON.parse(localStorage.getItem("lt_last_booking"))}catch{return null}}async function ws(t){const{data:{user:e}}=await I.auth.getUser();if(!e)throw new Error("Not logged in");const{data:r,error:i}=await I.from("stays").insert({...t,host_id:e.id,status:"approved"}).select().single();if(i)throw i;return r}async function Ol(t){var n,o;const e=(t==null?void 0:t.host_id)||null,r={...t};delete r.host_id;const i=e||((o=(n=(await I.auth.getUser()).data)==null?void 0:n.user)==null?void 0:o.id)||null;if(!i)throw new Error("Not logged in");const{data:s,error:a}=await I.from("guides").insert({...r,host_id:i,status:"approved"}).select().single();if(a)throw a;return s}async function jl(t){const{data:{user:e}}=await I.auth.getUser();if(!e)throw new Error("Not logged in");const{data:r,error:i}=await I.from("transport").insert({...t,host_id:e.id,status:"approved"}).select().single();if(i)throw i;return r}async function xs(t,e="guide-images"){const r=t.type.includes("png")?"png":"jpg",i=`${Date.now()}-${Math.random().toString(36).slice(2)}.${r}`,{data:s,error:a}=await I.storage.from(e).upload(i,t,{contentType:t.type,upsert:!0});if(a)throw new Error(`Image upload failed: ${a.message}`);const{data:n}=I.storage.from(e).getPublicUrl(s.path);return n.publicUrl}async function zl(t,e="guide-images"){try{const i=await(await fetch(t)).blob();return xs(i,e)}catch(r){throw new Error(`Image upload failed: ${r.message}`)}}async function ks(t=null){var l,c,u,d,h;const e=t||((c=(l=(await I.auth.getUser()).data)==null?void 0:l.user)==null?void 0:c.id)||null;if(!e)return{stays:[],guides:[],transport:[]};const r=await Mr(I.auth.getSession(),vl,"Session lookup timed out.").catch(()=>null),i=((h=(d=(u=r==null?void 0:r.data)==null?void 0:u.session)==null?void 0:d.user)==null?void 0:h.id)===e,s=async p=>{if(i)try{return await xl(p,e)}catch(m){console.warn(`[host-listings] ${p} auth read failed, falling back to public rows:`,m.message)}try{return await wl(p,e)}catch(m){return console.warn(`[host-listings] ${p} public read failed:`,m.message),[]}},[a,n,o]=await Promise.all([s("stays"),s("guides"),s("transport")]);return{stays:a,guides:n,transport:o}}async function Bl(t){const{data:e,error:r}=await I.from("reviews").select("*").eq("listing_id",t).order("created_at",{ascending:!1});return r?[]:e||[]}async function Nl({listingId:t,listingType:e,rating:r,comment:i}){const{data:{user:s}}=await I.auth.getUser();if(!s)throw new Error("Login required");const a=await ps(),{data:n,error:o}=await I.from("reviews").insert({user_id:s.id,listing_id:t,listing_type:e,rating:r,comment:i,reviewer_name:(a==null?void 0:a.full_name)||"Guest"}).select().single();if(o)throw o;return n}function Hr(){try{return JSON.parse(localStorage.getItem("lt_wishlist"))||[]}catch{return[]}}function Ul(t){const e=Hr(),r=e.indexOf(t);return r===-1?e.push(t):e.splice(r,1),localStorage.setItem("lt_wishlist",JSON.stringify(e)),e.includes(t)}function Ml(t){return Hr().includes(t)}const qr=Object.freeze(Object.defineProperty({__proto__:null,addReview:Nl,createBooking:Pl,fetchDestinationById:Il,fetchDestinations:Al,fetchGuideById:vs,fetchGuides:fs,fetchReviews:Bl,fetchStayById:Rl,fetchStays:gs,fetchTransport:ys,fetchTransportById:bs,getCurrentUser:ps,getHostListings:ks,getLastBooking:Ll,getSession:kl,getUserBookings:Cl,getWishlist:Hr,insertGuide:Ol,insertStay:ws,insertTransport:jl,isWishlisted:Ml,sendPhoneOtp:Tl,signInEmail:ms,signInGoogle:Sl,signOut:El,signUpEmail:_l,supabase:I,toggleWishlist:Ul,uploadFileToStorage:xs,uploadImageToStorage:zl,verifyPhoneOtp:$l},Symbol.toStringTag,{value:"Module"}));function Dl(){return`
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
        <div id="stays-grid" class="grid-3">
          <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading stays…</div>
        </div>
      </div>
    </section>
  `}async function Hl(){let t="all",e=Fi;const r=document.getElementById("stays-grid"),i=s=>{if(!r)return;const a=t==="all"?s:s.filter(n=>{var o;return((o=n.type)==null?void 0:o.toLowerCase())===t});r.innerHTML=a.length?a.map(ql).join(""):'<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No stays found.</div>',r.querySelectorAll("[data-href]").forEach(n=>n.addEventListener("click",()=>window.router.navigate(n.dataset.href)))};i(e),document.querySelectorAll(".chip[data-type]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".chip[data-type]").forEach(a=>a.classList.remove("active")),s.classList.add("active"),t=s.dataset.type,i(e)})});try{const s=new Promise((n,o)=>setTimeout(()=>o(new Error("timeout")),8e3)),a=await Promise.race([gs(),s]);a&&a.length&&(e=a,i(e))}catch(s){console.warn("[stays] Live fetch failed, showing seed data:",s.message)}}function ql(t){var e,r;return`
    <div class="card stay-card" data-href="/stay/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.cover_image}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${(e=t.type)==null?void 0:e.toUpperCase()}</div>
        ${t.top_rated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);backdrop-filter:blur(8px);padding:4px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
        <div class="card-rating">${F(t.rating)} <span>${t.rating} (${t.reviews_count})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${t.name}</h4>
        <div class="card-meta" style="margin-bottom:8px">📍 ${t.location}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${(t.amenities||[]).slice(0,3).map(i=>`<span class="tag" style="font-size:0.72rem">${i}</span>`).join("")}
          ${(t.amenities||[]).length>3?`<span class="tag" style="font-size:0.72rem">+${t.amenities.length-3} more</span>`:""}
        </div>
        <div class="flex-between">
          <span class="price">₹${(r=t.price)==null?void 0:r.toLocaleString()}<span>/night</span></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">👥 Max ${t.max_guests}</span>
        </div>
      </div>
    </div>
  `}function Fl(t){return'<div id="stay-detail-container" style="padding-top:76px;min-height:80vh;display:flex;align-items:center;justify-content:center"><div class="spinner" style="font-size:1.5rem">Loading...</div></div>'}function Wl(t){var h,p,m,g,v,b,x;const e=document.getElementById("stay-detail-container"),r=ne.find(f=>f.id===t);if(!r){e.innerHTML='<div class="page-hero container"><h1>Stay not found</h1></div>';return}const i=Mt(t),s=Hi(i);e.innerHTML=`
    <!-- Gallery -->
    <div class="container" style="margin-top:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h1 style="font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:6px">${r.name}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:0.9rem;color:var(--text-muted)">
            ${F(s>0?s:r.rating)} <strong style="color:var(--text)">${s>0?s:r.rating}</strong>
            <span>(${i.length||r.reviews} reviews)</span> •
            <span>📍 ${r.location}</span> •
            ${r.verified?'<span style="color:var(--emerald-400)">✅ Verified</span>':""}
            ${r.topRated?'<span class="top-rated-badge">🔥 Top Rated</span>':""}
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:8px 16px;color:var(--text);cursor:pointer;font-size:0.9rem">${Di(t)?"❤️ Saved":"🤍 Save"}</button>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="gallery" style="margin-bottom:0">
        <div class="gallery-main" onclick="openStayLightbox(0)"><img src="${r.images[0]}" alt="${r.name}" /></div>
        ${r.images.slice(1,3).map((f,w)=>`<div class="gallery-thumb" onclick="openStayLightbox(${w+1})"><img src="${f}" alt="${r.name}" /></div>`).join("")}
        ${r.images[3]?`<div class="gallery-thumb gallery-more" data-more="📷 All photos" onclick="openStayLightbox(3)"><img src="${r.images[3]}" alt="more" /></div>`:""}
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
            <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-600),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.3rem;flex-shrink:0">${r.host.avatar||"H"}</div>
            <div>
              <div style="font-weight:700;font-size:1rem">${r.type} hosted by ${r.host.name||r.host.full_name||"Host"}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Hosting since ${r.host.since||new Date().getFullYear()} · ${r.rooms} room${r.rooms>1?"s":""} · Up to ${r.maxGuests} guests</div>
            </div>
          </div>

          <h3 style="margin-bottom:12px">About this place</h3>
          <p style="margin-bottom:28px">${r.description}</p>

          <h3 style="margin-bottom:16px">🛎 Amenities</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${(r.amenities||[]).map(f=>`<div class="amenity-item"><span class="amenity-icon">${{WiFi:"📶",Parking:"🅿️","Home-cooked Food":"🍛","Breakfast Included":"🥐","Hot Water":"🚿","Valley View":"🌄",Bonfire:"🔥","Waterfall View":"💦","Guide Service":"🧭","Tents Provided":"⛺",Campfire:"🔥","Meals Included":"🍽️","Mountain Guide":"🧗",Stargazing:"🔭","Trekking Gear":"🎒","Organic Farm":"🌱","Fruit Picking":"🍊",Kayaking:"🚣",AC:"❄️",Restaurant:"🍴","Sunrise View":"🌅",Lakefront:"💧"}[f]||"✓"}</span><span class="amenity-label">${f}</span></div>`).join("")}
          </div>

          <h3 style="margin-bottom:16px">📅 Availability & Rules</h3>
          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">Check-in / Check-out</div>
              <div style="color:var(--text-muted);font-size:0.9rem">Check-in: <strong style="color:var(--text)">${r.checkIn||"14:00"}</strong></div>
              <div style="color:var(--text-muted);font-size:0.9rem;margin-top:6px">Check-out: <strong style="color:var(--text)">${r.checkOut||"11:00"}</strong></div>
            </div>
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">House Rules</div>
              <ul style="list-style:none;font-size:0.85rem;color:var(--text-muted)">
                ${(r.rules||[]).map(f=>`<li style="margin-bottom:4px">• ${f}</li>`).join("")}
              </ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="stay-map" class="map-container" style="margin-bottom:32px"></div>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px">📍 ${r.location}</p>
          <div style="margin-bottom:32px">
            ${(r.nearbyAttractions||[]).map(f=>`<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">→ ${f}</div>`).join("")}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${s>0?`⭐ ${s} · `:`⭐ ${r.rating} · `}${i.length||r.reviews} Reviews</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>
          <div id="reviews-list">
            ${i.length?i.map(f=>Cr(f)).join(""):Gl()}
          </div>
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input">${[5,4,3,2,1].map(f=>`<input type="radio" name="rating" id="r${f}" value="${f}"><label for="r${f}">★</label>`).join("")}</div>
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
              <span class="price" style="font-size:1.6rem">₹${r.price.toLocaleString()}</span>
              <span style="color:var(--text-muted)">/night</span>
              <div style="display:flex;gap:4px;margin-top:6px">${F(s>0?s:r.rating)} <span style="font-size:0.85rem;color:var(--text-muted)">${i.length||r.reviews} reviews</span></div>
            </div>
            <div class="booking-dates">
              <div class="booking-date-field"><label>CHECK-IN</label><input type="date" id="checkin-date" /></div>
              <div class="booking-date-field"><label>CHECK-OUT</label><input type="date" id="checkout-date" /></div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Guests</label>
              <select class="form-select" id="guests-count">
                ${Array.from({length:r.maxGuests||2},(f,w)=>`<option value="${w+1}">${w+1} guest${w>0?"s":""}</option>`).join("")}
              </select>
            </div>
            <div id="price-breakdown" style="margin-bottom:16px"></div>
            <button class="btn btn-primary w-full" id="reserve-btn" style="justify-content:center;font-size:1rem;padding:16px">Reserve & Pay →</button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px">🔒 Secured by Razorpay · You won't be charged yet</p>

            <div class="divider-h"></div>
            <div style="font-weight:700;margin-bottom:12px">Contact Host</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${r.host.phone||"+91 00000 00000"}</div>
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
  `,e.style.display="block";const a=new Date,n=new Date(a);n.setDate(n.getDate()+1);const o=f=>f.toISOString().split("T")[0],l=document.getElementById("checkin-date"),c=document.getElementById("checkout-date");l&&(l.value=o(a)),c&&(c.value=o(n));const u=()=>{const f=new Date(l==null?void 0:l.value),w=new Date(c==null?void 0:c.value),R=Math.max(1,Math.round((w-f)/864e5)),T=R*r.price,$=document.getElementById("price-breakdown");$&&($.innerHTML=`
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>₹${r.price.toLocaleString()} × ${R} night${R>1?"s":""}</span><span>₹${(R*r.price).toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>Service fee</span><span>₹${Math.round(T*.05).toLocaleString()}</span>
      </div>
      <div style="height:1px;background:var(--glass-border);margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:700">
        <span>Total</span><span>₹${Math.round(T*1.05).toLocaleString()}</span>
      </div>
    `)};u(),l==null||l.addEventListener("change",u),c==null||c.addEventListener("change",u),(h=document.getElementById("reserve-btn"))==null||h.addEventListener("click",()=>{var U;const f=l==null?void 0:l.value,w=c==null?void 0:c.value,R=(U=document.getElementById("guests-count"))==null?void 0:U.value;if(!f||!w){E("Please select dates","","error");return}const T=Math.max(1,Math.round((new Date(w)-new Date(f))/864e5)),$=Math.round(T*r.price*1.05);window.router.navigate(`/book/${t}?checkin=${f}&checkout=${w}&guests=${R}&total=${$}`)});let d=0;window.openStayLightbox=f=>{d=f,document.getElementById("lb-img").src=r.images[d],document.getElementById("lightbox").classList.add("open")},(p=document.getElementById("lb-close"))==null||p.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(m=document.getElementById("lb-prev"))==null||m.addEventListener("click",()=>{d=(d-1+r.images.length)%r.images.length,document.getElementById("lb-img").src=r.images[d]}),(g=document.getElementById("lb-next"))==null||g.addEventListener("click",()=>{d=(d+1)%r.images.length,document.getElementById("lb-img").src=r.images[d]}),(v=document.getElementById("wishlist-btn"))==null||v.addEventListener("click",()=>{const f=document.getElementById("wishlist-btn"),w=Mi(t);f.textContent=w?"❤️ Saved":"🤍 Save",E(w?"Added to Wishlist!":"Removed from Wishlist")}),setTimeout(()=>{const f=document.getElementById("stay-map");if(!f||f._leaflet_id)return;const w=L.map("stay-map").setView([r.lat,r.lng],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(w),L.marker([r.lat,r.lng]).addTo(w).bindPopup(`<b>${r.name}</b>`).openPopup()},100),(b=document.getElementById("write-review-btn"))==null||b.addEventListener("click",()=>{if(!ct()){E("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(x=document.getElementById("submit-review-btn"))==null||x.addEventListener("click",()=>{var T,$,U;const f=parseInt(((T=document.querySelector('input[name="rating"]:checked'))==null?void 0:T.value)||0),w=(U=($=document.getElementById("review-text"))==null?void 0:$.value)==null?void 0:U.trim();if(!f||!w){E("Please fill all fields","","error");return}const R=X();Ui({listingId:t,rating:f,text:w,userName:R.fullName||R.name,userAvatar:R.avatar}),E("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden"),document.getElementById("reviews-list").innerHTML=Mt(t).map(B=>Cr(B)).join("")})}function Cr(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${F(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Guest</span>
    </div>
  `}function Gl(t){return[{userName:"Priya Sharma",userAvatar:"P",rating:5,text:"Absolutely magical experience! The host was so welcoming and the views were breathtaking. Will definitely come back.",createdAt:"2026-01-15T00:00:00Z"},{userName:"Rahul Das",userAvatar:"R",rating:4,text:"Beautiful location and authentic Mizo food. A bit remote but that's the charm! Highly recommended for nature lovers.",createdAt:"2026-02-20T00:00:00Z"}].map(r=>Cr(r)).join("")}const Xt=[],Zt=[{id:"transport-zara",name:"Zara Mountain Bikes",owner:"Zaramsanga Colney",avatar:"ZC",type:"Motorcycle & Bike Rental",vehicles:[{name:"Royal Enfield Himalayan",capacity:2,price:1800,priceUnit:"per day"},{name:"Honda CB350",capacity:2,price:1400,priceUnit:"per day"},{name:"Mountain Bicycle",capacity:1,price:400,priceUnit:"per day"}],rating:4.6,reviews:38,phone:"+91 87654 55555",email:"zara.bikes@lushaitrips.com",location:"Aizawl",coverImage:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",images:["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80"],description:"Explore Mizoram the way it was meant to be explored - on two wheels. Our fleet of well-maintained Royal Enfields and Honda bikes are ideal for the winding mountain roads of Mizoram. Helmets, riding gear, and maps provided.",features:["Helmets Included","Riding Gear","Route Maps","Breakdown Assistance","Delivery to Hotel"],verified:!0,available:!0},{id:"transport-lal",name:"Lal Shared Sumo Service",owner:"Lalbiakzuala",avatar:"LB",type:"Shared Sumo / Van",vehicles:[{name:"Tata Sumo (Shared)",capacity:10,price:350,priceUnit:"per seat per route"},{name:"Force Traveller Van",capacity:16,price:4500,priceUnit:"per day (private)"}],rating:4.4,reviews:55,phone:"+91 76543 66666",email:"lal.sumo@lushaitrips.com",location:"Aizawl (all major routes)",coverImage:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",images:["https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],description:"Budget-friendly shared Sumo services connect all major towns and tourist spots. Perfect for solo travellers or groups on a budget. Private van hire also available for custom tours and group trips.",features:["Budget Friendly","All Major Routes","Daily Departures","Group Discounts","Private Option"],verified:!0,available:!0}];Xt.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,price_unit:t.priceUnit}));Zt.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,owner_name:t.owner}));const Lr=new Map,Vl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",_s=6e3,Kl=new Set(["guide-zova","guide-mary","guide-rema"]);function Ss(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function vt(t){const e=Array.isArray(t.images)?t.images.filter(Boolean):[],r=t.cover_image||t.coverImage||e[0]||Vl;return{id:t.id,name:t.name||"Local Guide",title:t.title||"Local Guide",experience:t.experience||"Experienced guide",languages:Array.isArray(t.languages)?t.languages:[],specialties:Array.isArray(t.specialties)?t.specialties:[],rating:Number(t.rating||0),reviews:Number(t.reviews_count||t.reviews||0),price:Number(t.price||0),priceUnit:t.price_unit||t.priceUnit||"per day",location:t.location||"Mizoram",phone:t.phone||"",email:t.email||"",coverImage:r,images:e.length?e:[r],bio:t.bio||"This guide profile will be updated soon.",certifications:Array.isArray(t.certifications)?t.certifications:[],verified:t.verified!==!1,available:t.available!==!1,tags:Array.isArray(t.tags)?t.tags:[]}}function yt(t){return!!(t!=null&&t.id)&&!Kl.has(t.id)}function Ei(t){return Lr.clear(),t.forEach(e=>Lr.set(e.id,e)),t}function Jl(t){return Xt.find(e=>yt(e)&&e.id===t)||null}function Es(t){const e=t.priceUnit.replace(/^per\s+/i,""),r=t.rating>0?t.rating.toFixed(1):"New",i=t.reviews||0;return`
    <a href="${z(`/guide/${t.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap" style="height:240px">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" style="object-position:top" />
        ${t.verified?'<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">VERIFIED</div>':""}
        <div class="card-rating">${F(t.rating)} <span>${r} (${i})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${t.name}</h4>
        <div style="font-size:0.85rem;color:var(--emerald-400);font-weight:600;margin-bottom:6px">${t.title}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">Location: ${t.location} &nbsp;|&nbsp; Experience: ${t.experience}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${t.languages.map(s=>`<span class="tag" style="font-size:0.72rem">${s}</span>`).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${t.specialties.slice(0,2).map(s=>`<span class="tag">${s}</span>`).join("")}
        </div>
        <div class="flex-between">
          <span class="price" style="font-size:1.1rem">Rs ${t.price.toLocaleString()}<span>/${e}</span></span>
          <span class="btn btn-outline btn-sm">View & Book</span>
        </div>
      </div>
    </a>
  `}function Ts(t){return[t.coverImage,...t.images].filter((e,r,i)=>e&&i.indexOf(e)===r)}function Yl(t){const e=Ts(t);return`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${t.coverImage}" alt="${t.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${t.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${t.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${F(t.rating)} <strong>${t.rating>0?t.rating.toFixed(1):"New"}</strong> <span style="color:var(--text-muted)">(${t.reviews} reviews)</span></div>
                <div style="font-size:0.9rem;color:var(--text-muted)">Location: ${t.location} &nbsp;|&nbsp; Experience: ${t.experience}</div>
              </div>
            </div>
            <div class="divider-h"></div>
            <h3 style="margin-bottom:12px">About ${t.name}</h3>
            <p style="margin-bottom:24px">${t.bio}</p>
            <h3 style="margin-bottom:16px">Specialties</h3>
            <div class="amenities-grid" style="margin-bottom:28px">
              ${t.specialties.map(r=>`<div class="amenity-item"><span class="amenity-icon">+</span><span class="amenity-label">${r}</span></div>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">Languages</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
              ${t.languages.map(r=>`<span class="tag">${r}</span>`).join("")}
            </div>
            <h3 style="margin-bottom:16px">Certifications</h3>
            <div style="margin-bottom:32px">
              ${t.certifications.length?t.certifications.map(r=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--glass-border)"><span style="color:var(--emerald-400)">OK</span><span style="font-size:0.9rem;color:var(--text-muted)">${r}</span></div>`).join(""):'<div style="font-size:0.9rem;color:var(--text-muted)">No certifications listed yet.</div>'}
            </div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
              <h4 style="margin-bottom:16px">Gallery</h4>
              ${e.length?`
                  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
                    ${e.map((r,i)=>`
                      <button
                        type="button"
                        onclick="openGuideLightbox(${i})"
                        style="padding:0;border:none;background:none;cursor:pointer;overflow:hidden;border-radius:var(--radius-sm);position:relative"
                        aria-label="Open ${t.name} gallery image ${i+1}"
                      >
                        <img src="${r}" alt="${t.name} gallery image ${i+1}" style="width:100%;height:130px;object-fit:cover;display:block;transition:transform 0.3s ease" />
                        ${i===0?'<span style="position:absolute;left:10px;bottom:10px;background:rgba(15,23,42,0.82);color:#fff;padding:4px 8px;border-radius:999px;font-size:0.72rem;font-weight:700">Profile</span>':""}
                      </button>
                    `).join("")}
                  </div>
                `:'<div style="font-size:0.9rem;color:var(--text-muted)">Photos will appear here after the guide uploads them.</div>'}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div class="booking-price"><span class="price" style="font-size:1.6rem">Rs ${t.price.toLocaleString()}</span><span style="color:var(--text-muted)">/${t.priceUnit}</span></div>
              <div class="form-group mt-16"><label class="form-label">Select Date</label><input type="date" class="form-input" id="guide-date" /></div>
              <div class="form-group"><label class="form-label">Trip Type</label>
                <select class="form-select" id="guide-trip">
                  ${t.specialties.map(r=>`<option>${r}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Group Size</label>
                <select class="form-select" id="guide-group">
                  ${[1,2,3,4,5,6].map(r=>`<option value="${r}">${r} person${r>1?"s":""}</option>`).join("")}
                </select>
              </div>
              <button class="btn btn-primary w-full" id="book-guide-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Guide</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">Phone: ${t.phone||"Available after booking"}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Email: ${t.email||"Available after booking"}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="lightbox" id="guide-lightbox">
        <button class="lightbox-close" id="guide-lb-close">✕</button>
        <button class="lightbox-prev" id="guide-lb-prev">‹</button>
        <img id="guide-lb-img" src="" alt="Guide gallery" />
        <button class="lightbox-next" id="guide-lb-next">›</button>
      </div>
    </div>
  `}function Xl(t){t.querySelectorAll("[data-link]").forEach(e=>{e.dataset.guideBound!=="true"&&(e.dataset.guideBound="true",e.addEventListener("click",r=>{r.preventDefault(),window.router.navigate(e.getAttribute("href"))}))})}function Zl(){const t=z;return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Expert Local Guides</div>
        <h1>Hire a Guide</h1>
        <p style="max-width:600px;margin-bottom:32px">Every guide is certified, locally born, and passionately knowledgeable about Mizoram's terrain, culture, and wildlife.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="guides-grid">
          ${Xt.filter(yt).map(vt).map(Es).join("")}
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Guide</div>
          <h2 style="margin-bottom:12px">Are You a Local Expert?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join LushaiTrips as a certified guide. Share your knowledge of Mizoram's hidden trails, wildlife, and culture.</p>
          <a href="${t("/host-signup-guide")}" class="btn btn-primary btn-lg" data-link>Register as a Guide</a>
        </div>
      </div>
    </section>
  `}async function Ql(){const t=document.getElementById("guides-grid");if(!t)return;let e=[];try{const r=await Ss(fs(),_s,"Guide list request timed out.");e=Ei(r.filter(yt).map(vt))}catch(r){console.warn("[guides] falling back to static data:",r.message)}if(e.length||(e=Ei(Xt.filter(yt).map(vt))),!e.length){t.innerHTML='<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No guides available yet.</div></div>';return}t.innerHTML=e.map(Es).join(""),Xl(t)}function ec(t){return`
    <div id="guide-detail-root" data-guide-id="${t}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading guide profile...</div>
      </div>
    </div>
  `}async function tc(t){var o,l,c,u,d;const e=document.getElementById("guide-detail-root");if(!e)return;let r=null;try{const h=await Ss(vs(t),_s,"Guide profile request timed out.");yt(h)&&(r=vt(h))}catch(h){console.warn("[guide-detail] falling back to static data:",h.message)}if(!r){const h=Jl(t);h&&(r=vt(h))}if(!r){e.innerHTML='<div class="page-hero container"><h1>Guide not found</h1></div>';return}Lr.set(r.id,r),e.outerHTML=Yl(r);const i=Ts(r);let s=0;window.openGuideLightbox=h=>{var m;s=h;const p=document.getElementById("guide-lb-img");p&&(p.src=i[s]),(m=document.getElementById("guide-lightbox"))==null||m.classList.add("open")},(o=document.getElementById("guide-lb-close"))==null||o.addEventListener("click",()=>{var h;(h=document.getElementById("guide-lightbox"))==null||h.classList.remove("open")}),(l=document.getElementById("guide-lb-prev"))==null||l.addEventListener("click",()=>{s=(s-1+i.length)%i.length;const h=document.getElementById("guide-lb-img");h&&(h.src=i[s])}),(c=document.getElementById("guide-lb-next"))==null||c.addEventListener("click",()=>{s=(s+1)%i.length;const h=document.getElementById("guide-lb-img");h&&(h.src=i[s])}),(u=document.getElementById("guide-lightbox"))==null||u.addEventListener("click",h=>{var p,m;((p=h.target)==null?void 0:p.id)==="guide-lightbox"&&((m=document.getElementById("guide-lightbox"))==null||m.classList.remove("open"))});const a=new Date().toISOString().split("T")[0],n=document.getElementById("guide-date");n&&(n.value=a),(d=document.getElementById("book-guide-btn"))==null||d.addEventListener("click",()=>{var m;const h=(m=document.getElementById("guide-date"))==null?void 0:m.value,p=r.price;window.router.navigate(`/book/guide-${r.id}?date=${h}&total=${p}&type=guide&name=${encodeURIComponent(r.name)}`)})}const Wt=new Map,rc="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",$s=6e3,As="lt_recent_transport",Is=new Set(["transport-raj"]),ic=new Set(["raj mizoram travels","grace travels"]);function Rs(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function sc(t){return{name:(t==null?void 0:t.name)||"Vehicle",capacity:Number((t==null?void 0:t.capacity)||1),price:Number((t==null?void 0:t.price)||0),priceUnit:(t==null?void 0:t.price_unit)||(t==null?void 0:t.priceUnit)||"per day"}}function He(t){const e=Array.isArray(t==null?void 0:t.images)?t.images.filter(Boolean):[],r=(t==null?void 0:t.cover_image)||(t==null?void 0:t.coverImage)||e[0]||rc,i=Array.isArray(t==null?void 0:t.vehicles)?t.vehicles.map(sc).filter(s=>s.name):[];return{id:t==null?void 0:t.id,name:(t==null?void 0:t.name)||"Transport Service",owner:(t==null?void 0:t.owner_name)||(t==null?void 0:t.owner)||"Transport Partner",type:(t==null?void 0:t.type)||"Transport",vehicles:i,rating:Number((t==null?void 0:t.rating)||0),reviews:Number((t==null?void 0:t.reviews_count)||(t==null?void 0:t.reviews)||0),phone:(t==null?void 0:t.phone)||"",email:(t==null?void 0:t.email)||"",location:(t==null?void 0:t.location)||"Mizoram",coverImage:r,images:e.length?e:[r],description:(t==null?void 0:t.description)||"Transport details will be added soon.",features:Array.isArray(t==null?void 0:t.features)?t.features:[],verified:(t==null?void 0:t.verified)!==!1,available:(t==null?void 0:t.available)!==!1}}function ac(t=""){return String(t).trim().replace(/\s+/g," ").toLowerCase()}function Fr(t){return!(t!=null&&t.id)||Is.has(t.id)?!1:!ic.has(ac(t.name))}function nc(t){if(!Array.isArray(t))return[];const e=t.filter(Fr);return e.length!==t.length&&O.set(As,e),e}function Ti(t){return Wt.clear(),t.forEach(e=>Wt.set(e.id,e)),t}function Wr(){return nc(O.get(As)).map(He).filter(Fr)}function Or(t,e=[]){const r=new Map;return[...t,...e].forEach(i=>{!Fr(i)||r.has(i.id)||r.set(i.id,i)}),[...r.values()]}function oc(t){return Is.has(t)?null:Zt.find(e=>e.id===t)||null}function Ps(t){const e=t.rating>0?t.rating.toFixed(1):"New",r=t.reviews||0;return`
    <a href="${z(`/transport/${t.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        <div class="card-rating">${F(t.rating)} <span>${e} (${r})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${t.name}</h4>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">Owner: ${t.owner} &nbsp;|&nbsp; Location: ${t.location}</div>
        <div style="margin-bottom:14px">
          ${t.vehicles.slice(0,2).map(i=>`
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--glass-border)">
              <span style="color:var(--text-muted)">${i.name}</span>
              <span style="color:var(--emerald-400);font-weight:600">Rs ${i.price.toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.features.slice(0,3).map(i=>`<span class="tag" style="font-size:0.72rem">${i}</span>`).join("")}
        </div>
        <span class="btn btn-outline btn-sm w-full" style="justify-content:center">View & Book</span>
      </div>
    </a>
  `}function lc(t){return`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${t.name}</h1>
                ${t.verified?'<span style="color:var(--emerald-400);font-size:0.85rem">Verified Provider</span>':""}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${F(t.rating)} <strong>${t.rating>0?t.rating.toFixed(1):"New"}</strong> <span style="color:var(--text-muted)">(${t.reviews} reviews)</span></div>
              <div style="font-size:0.9rem;color:var(--text-muted)">Location: ${t.location} &nbsp;|&nbsp; Owner: ${t.owner}</div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;border-radius:var(--radius);overflow:hidden">
              ${t.images.map((e,r)=>`<img src="${e}" alt="${t.name}" style="width:100%;height:180px;object-fit:cover;${r===0?"grid-column:1/3;height:260px":""}" loading="lazy" />`).join("")}
            </div>

            <h3 style="margin-bottom:12px">About this Service</h3>
            <p style="margin-bottom:28px">${t.description}</p>

            <h3 style="margin-bottom:16px">Available Vehicles</h3>
            <div style="margin-bottom:32px">
              ${t.vehicles.length?t.vehicles.map(e=>`
                  <div class="card card-body" style="margin-bottom:12px;padding:20px">
                    <div class="flex-between">
                      <div>
                        <div style="font-weight:700;margin-bottom:4px">${e.name}</div>
                        <div style="font-size:0.85rem;color:var(--text-muted)">Up to ${e.capacity} passengers</div>
                      </div>
                      <div style="text-align:right">
                        <div class="price" style="font-size:1.1rem">Rs ${e.price.toLocaleString()}</div>
                        <div style="font-size:0.8rem;color:var(--text-muted)">${e.priceUnit}</div>
                      </div>
                    </div>
                  </div>
                `).join(""):'<div style="font-size:0.9rem;color:var(--text-muted)">Vehicle details will appear here shortly.</div>'}
            </div>

            <h3 style="margin-bottom:16px">Features</h3>
            <div class="amenities-grid">
              ${t.features.map(e=>`<div class="amenity-item"><span class="amenity-icon">OK</span><span class="amenity-label">${e}</span></div>`).join("")}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:4px">Book Transport</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">Select vehicle and dates</div>
              <div class="form-group">
                <label class="form-label">Vehicle</label>
                <select class="form-select" id="vehicle-select">
                  ${t.vehicles.map(e=>`<option value="${e.price}">${e.name} - Rs ${e.price.toLocaleString()} ${e.priceUnit}</option>`).join("")}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Pickup Date</label><input type="date" class="form-input" id="pickup-date" /></div>
              <div class="form-group"><label class="form-label">Drop-off Date</label><input type="date" class="form-input" id="dropoff-date" /></div>
              <div class="form-group"><label class="form-label">Pickup Location</label><input type="text" class="form-input" id="pickup-loc" placeholder="e.g. Aizawl Airport" /></div>
              <div id="transport-total" style="background:var(--glass);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;font-size:0.9rem;color:var(--text-muted)">Select vehicle and dates to see total</div>
              <button class="btn btn-primary w-full" id="book-transport-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Now -></button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">Phone: ${t.phone||"Available after booking"}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Email: ${t.email||"Available after booking"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function cc(t){t.querySelectorAll("[data-link]").forEach(e=>{e.dataset.transportBound!=="true"&&(e.dataset.transportBound="true",e.addEventListener("click",r=>{r.preventDefault(),window.router.navigate(e.getAttribute("href"))}))})}function dc(){const t=z;return`
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Get Around Mizoram</div>
        <h1>Book Transport</h1>
        <p style="max-width:600px;margin-bottom:32px">From airport pickups to multi-day SUV hire and Royal Enfield adventures - we've got every journey covered.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="transport-grid">
          ${Or(Wr(),Zt.map(He)).map(Ps).join("")}
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Transport</div>
          <h2 style="margin-bottom:12px">Have a Vehicle to List?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join our transport network and earn by connecting travellers with reliable rides across Mizoram.</p>
          <a href="${t("/host-signup-transport")}" class="btn btn-primary btn-lg" data-link>List Your Transport</a>
        </div>
      </div>
    </section>
  `}async function uc(){const t=document.getElementById("transport-grid");if(!t)return;const e=Wr();let r=[];try{const i=await Rs(ys(),$s,"Transport list request timed out.");r=Ti(Or(i.map(He),e))}catch(i){console.warn("[transport] falling back to static data:",i.message)}if(r.length||(r=Ti(Or(e,Zt.map(He)))),!r.length){t.innerHTML='<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No transport listings available yet.</div></div>';return}t.innerHTML=r.map(Ps).join(""),cc(t)}function hc(t){return`
    <div id="transport-detail-root" data-transport-id="${t}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading transport details...</div>
      </div>
    </div>
  `}async function pc(t){var o;const e=document.getElementById("transport-detail-root");if(!e)return;let r=Wt.get(t)||null;if(!r)try{const l=await Rs(bs(t),$s,"Transport profile request timed out.");r=He(l)}catch(l){console.warn("[transport-detail] falling back to static data:",l.message)}if(r||(r=Wr().find(l=>l.id===t)||null),!r){const l=oc(t);l&&(r=He(l))}if(!r){e.innerHTML='<div class="page-hero container"><h1>Transport listing not found</h1></div>';return}Wt.set(r.id,r),e.outerHTML=lc(r);const i=new Date,s=new Date(i);s.setDate(s.getDate()+1);const a=l=>l.toISOString().split("T")[0];document.getElementById("pickup-date").value=a(i),document.getElementById("dropoff-date").value=a(s);const n=()=>{var m,g,v;const l=parseInt(((m=document.getElementById("vehicle-select"))==null?void 0:m.value)||0,10),c=new Date((g=document.getElementById("pickup-date"))==null?void 0:g.value),u=new Date((v=document.getElementById("dropoff-date"))==null?void 0:v.value),d=Math.max(1,Math.round((u-c)/864e5)),h=l*d,p=document.getElementById("transport-total");return p&&(p.innerHTML=`<div class="flex-between"><span>Rs ${l.toLocaleString()} x ${d} day${d>1?"s":""}</span><strong style="color:var(--text)">Rs ${h.toLocaleString()}</strong></div>`),h};n(),["vehicle-select","pickup-date","dropoff-date"].forEach(l=>{var c;(c=document.getElementById(l))==null||c.addEventListener("change",n)}),(o=document.getElementById("book-transport-btn"))==null||o.addEventListener("click",()=>{const l=n();window.router.navigate(`/book/${t}?total=${l}&type=transport&name=${encodeURIComponent(r.name)}`)})}const mc="rzp_test_SXRQlAUuikOAUn";function gc(t,e){var d,h,p,m;const r=e.get("checkin")||"",i=e.get("checkout")||"",s=e.get("guests")||"1",a=parseInt(e.get("total")||2e3),n=e.get("type")||"stay",o=e.get("name")?decodeURIComponent(e.get("name")):"",c=ne.find(g=>g.id===t)||{name:o||t,coverImage:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",type:n},u=r&&i?Math.max(1,Math.round((new Date(i)-new Date(r))/864e5)):1;return`
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
            ${ct()?"":`
              <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px">⚠️ Login Required</div>
                <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px">Please log in to complete your booking.</div>
                <a href="${z("/login")}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
              </div>
            `}

            

            <h3 style="margin-bottom:20px">Your Information</h3>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="pay-name" placeholder="Your full name" value="${((d=X())==null?void 0:d.fullName)||((h=X())==null?void 0:h.name)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="pay-email" placeholder="email@example.com" value="${((p=X())==null?void 0:p.email)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="pay-phone" placeholder="+91 98765 43210" value="${((m=X())==null?void 0:m.phone)||""}" />
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
                ${["UPI / GPay / PhonePe","Debit / Credit Card","Net Banking","Wallets"].map(g=>`<div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">✓</span>${g}</div>`).join("")}
              </div>
            </div>

            <button class="btn btn-primary btn-lg w-full" id="pay-btn" style="justify-content:center;font-size:1.1rem" ${ct()?"":'disabled style="opacity:0.5;cursor:not-allowed;justify-content:center;font-size:1.1rem"'}>
              ${`🔒 Pay ₹${a.toLocaleString()} with Razorpay`}
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
                ${r?`
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">📅 ${new Date(r+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short"})} → ${new Date(i+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px">👥 ${s} guest${s>1?"s":""} · ${u} night${u>1?"s":""}</div>
                `:""}
                <div class="divider-h" style="margin:16px 0"></div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Subtotal</span><span>₹${Math.round(a/1.05).toLocaleString()}</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Service fee (5%)</span><span>₹${Math.round(a-a/1.05).toLocaleString()}</span>
                </div>
                <div class="divider-h" style="margin:12px 0"></div>
                <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.1rem">
                  <span>Total</span><span class="text-emerald">₹${a.toLocaleString()}</span>
                </div>
                <div style="margin-top:12px;font-size:0.8rem;color:var(--text-muted);text-align:center">🛡 Free cancellation within 24 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function fc(t,e){var c;const r=parseInt(e.get("total")||2e3),i=e.get("checkin")||"",s=e.get("checkout")||"",a=e.get("guests")||"1",n=e.get("type")||"stay",o=e.get("name")?decodeURIComponent(e.get("name")):t,l=ne.find(u=>u.id===t);(c=document.getElementById("pay-btn"))==null||c.addEventListener("click",()=>{var v,b,x,f,w,R,T;if(!ct()){E("Please log in first","","error");return}const u=(b=(v=document.getElementById("pay-name"))==null?void 0:v.value)==null?void 0:b.trim(),d=(f=(x=document.getElementById("pay-email"))==null?void 0:x.value)==null?void 0:f.trim(),h=(R=(w=document.getElementById("pay-phone"))==null?void 0:w.value)==null?void 0:R.trim();if(!u||!d||!h){E("Please fill all fields","","error");return}const m={userId:X().id,listingId:t,listingName:(l==null?void 0:l.name)||o,listingType:n,checkin:i,checkout:s,guests:a,total:r,guestName:u,guestEmail:d,guestPhone:h,notes:((T=document.getElementById("pay-notes"))==null?void 0:T.value)||""},g={key:mc,amount:r*100,currency:"INR",name:"LushaiTrips",description:(l==null?void 0:l.name)||o,image:"https://via.placeholder.com/100x100/065f46/ffffff?text=LT",prefill:{name:u,email:d,contact:h},theme:{color:"#059669"},handler:function($){const U=Ks({...m,razorpayPaymentId:$.razorpay_payment_id});E("Payment Successful! 🎉",`Ref: ${U.id}`),setTimeout(()=>window.router.navigate("/booking-confirmed"),800)},modal:{ondismiss:()=>E("Payment cancelled","","error")}};try{new Razorpay(g).open()}catch{E("Razorpay not loaded","Please check your internet connection","error")}})}function vc(){var r;const t=z,e=Ys();return`
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
            <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:800"><span>Total Paid</span><span style="color:var(--emerald-400)">₹${(r=e.total)==null?void 0:r.toLocaleString()}</span></div>
          </div>
        `:""}

        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:20px;margin-bottom:32px;text-align:left">
          <div style="font-weight:700;margin-bottom:12px">📋 What happens next?</div>
          ${["📧 Confirmation sent to your email","📞 Host will contact you within 24 hours","🗺️ Your itinerary is ready in My Bookings","⭐ After your stay, leave a review to help others"].map(i=>`<div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">${i}</div>`).join("")}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="${t("/profile")}" class="btn btn-primary btn-lg" data-link>View My Bookings</a>
          <a href="${t("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore More</a>
        </div>
      </div>
    </div>
  `}function yc(){}const bc=12e3,$i=5e3;function dr(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function wc(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function Ai(t){var e,r;t&&Fe({id:t.id,email:t.email||"",full_name:((e=t.user_metadata)==null?void 0:e.full_name)||((r=t.user_metadata)==null?void 0:r.name)||"",phone:t.phone||"",role:"user"})}function xc(){return`
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub">Log in to manage your bookings and trips</p>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="login-email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="login-password" placeholder="********" />
        </div>

        <div style="text-align:right;margin-bottom:20px">
          <a href="#" style="font-size:0.85rem;color:var(--emerald-400)">Forgot password?</a>
        </div>

        <button class="btn btn-primary w-full" id="login-btn" style="justify-content:center;padding:14px">Log In</button>

        <div class="auth-switch mt-16">Don't have an account? <a href="${z("/signup-user")}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${z("/host-signup-stay")}" data-link>Register your property -></a></div>
      </div>
    </div>
  `}function kc(){var t,e;(t=document.getElementById("login-btn"))==null||t.addEventListener("click",async()=>{var a,n,o;const r=(n=(a=document.getElementById("login-email"))==null?void 0:a.value)==null?void 0:n.trim(),i=(o=document.getElementById("login-password"))==null?void 0:o.value;if(!r||!i){E("Please fill all fields","","error");return}const s=document.getElementById("login-btn");s&&(s.disabled=!0,s.textContent="Signing in...");try{s&&(s.textContent="Checking account...");const{user:l}=await dr(ms({email:r,password:i}),bc,"Login timed out. Please try again.");Ai(l),s&&(s.textContent="Loading your account..."),await dr(yr(),$i,"Profile sync timed out."),E("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}catch(l){if(wc(l))try{const{getSession:c}=await Gt(async()=>{const{getSession:d}=await Promise.resolve().then(()=>qr);return{getSession:d}},void 0),u=await dr(c(),$i,"Login timed out. Please try again.");if(u){Ai(u.user),yr().catch(d=>{console.warn("[login] background profile sync failed:",(d==null?void 0:d.message)||d)}),E("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}}catch(c){console.warn("[login] timeout verification failed:",(c==null?void 0:c.message)||c)}try{Vs(r,i),E("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}catch{E((l==null?void 0:l.message)||"Invalid email or password","","error")}}finally{s&&(s.disabled=!1,s.textContent="Log In")}}),(e=document.getElementById("login-password"))==null||e.addEventListener("keydown",r=>{var i;r.key==="Enter"&&((i=document.getElementById("login-btn"))==null||i.click())})}function _c(){return`
    <div class="auth-page">
      <div class="auth-card" style="max-width:520px">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-sub">Join thousands exploring Mizoram's hidden gems</p>

        <button class="social-btn" id="phone-signup-btn">Sign up with Phone OTP</button>

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

        <button class="btn btn-primary w-full" id="signup-btn" style="justify-content:center;padding:14px">Create Account</button>
        <div class="auth-switch mt-16">Already have an account? <a href="${z("/login")}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${z("/host-signup-stay")}" data-link>Register as Host -></a></div>
      </div>
    </div>
  `}function Sc(){var t,e;(t=document.getElementById("signup-btn"))==null||t.addEventListener("click",()=>{var o,l,c,u,d,h,p,m;const r=(l=(o=document.getElementById("su-name"))==null?void 0:o.value)==null?void 0:l.trim(),i=(u=(c=document.getElementById("su-email"))==null?void 0:c.value)==null?void 0:u.trim(),s=(h=(d=document.getElementById("su-phone"))==null?void 0:d.value)==null?void 0:h.trim(),a=(p=document.getElementById("su-password"))==null?void 0:p.value,n=(m=document.getElementById("su-confirm"))==null?void 0:m.value;if(!r||!i||!s||!a){E("Please fill all fields","","error");return}if(a!==n){E("Passwords do not match","","error");return}if(a.length<8){E("Password must be at least 8 characters","","error");return}try{Gs({fullName:r,email:i,phone:s,password:a}),E("Account created! Welcome"),setTimeout(()=>window.router.navigate("/discover"),600)}catch(g){E(g.message,"","error")}}),(e=document.getElementById("phone-signup-btn"))==null||e.addEventListener("click",()=>E("OTP signup coming soon!"))}let Y=1;const qe=5,y={};let te=[];const Ec=["Basic Info","Property","Stay Details","Photos","Rules & Submit"];function Tc(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:700px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Property</h2>
          <p style="color:var(--text-muted)">Join our trusted network of Mizoram hosts</p>
        </div>

        <!-- Stepper -->
        <div class="stepper" id="stepper">${Cs()}</div>

        <!-- Steps -->
        <div class="card card-body" style="padding:40px" id="step-container">
          ${Ls(1)}
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:24px">
          <button class="btn btn-secondary" id="prev-btn" style="${Y===1?"visibility:hidden":""}">← Back</button>
          <div style="color:var(--text-dim);font-size:0.85rem;align-self:center">Step ${Y} of ${qe}</div>
          <button class="btn btn-primary" id="next-btn">${Y===qe?"🚀 Submit Listing":"Next →"}</button>
        </div>
      </div>
    </div>
  `}function Cs(){return Array.from({length:qe},(t,e)=>{const r=e+1;return`
      <div class="step ${r<Y?"done":r===Y?"active":""}">
        <div class="step-wrapper">
          <div class="step-circle">${r<Y?"✓":r}</div>
          <div class="step-label">${Ec[e]}</div>
        </div>
      </div>
      ${r<qe?'<div class="step-line"></div>':""}
    `}).join("")}function Ls(t){switch(t){case 1:return`
      <h3 style="margin-bottom:24px">👤 Step 1: Basic Information</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Your Full Name *</label><input type="text" class="form-input" id="h-name" placeholder="E.g. Liana Hnamte" value="${y.name||""}" /></div>
        <div class="form-group"><label class="form-label">Phone Number *</label><input type="tel" class="form-input" id="h-phone" placeholder="+91 98765 43210" value="${y.phone||""}" /></div>
      </div>
      <div class="form-group"><label class="form-label">Email Address *</label><input type="email" class="form-input" id="h-email" placeholder="you@example.com" value="${y.email||""}" /></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="h-password" placeholder="Min 8 characters" /></div>
        <div class="form-group"><label class="form-label">Confirm Password *</label><input type="password" class="form-input" id="h-confirm" placeholder="Repeat password" /></div>
      </div>
      </div>`;case 2:return`
      <h3 style="margin-bottom:24px">🏠 Step 2: Property Information</h3>
      <div class="form-group"><label class="form-label">Property Name *</label><input type="text" class="form-input" id="h-prop-name" placeholder="E.g. Bamboo Haven Homestay" value="${y.propName||""}" /></div>
      <div class="form-group">
        <label class="form-label">Property Type *</label>
        <div class="check-group" id="prop-type-group">
          ${["Homestay","Hotel","Camping","Lodge","Farmstay","Guesthouse"].map(e=>`
            <label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:8px">
              <input type="radio" name="prop-type" value="${e}" ${y.propType===e?"checked":""} style="accent-color:var(--emerald-500)" />
              ${e}
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group"><label class="form-label">Full Address *</label><textarea class="form-textarea" id="h-address" placeholder="Village, District, PIN code" style="min-height:80px">${y.address||""}</textarea></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">District *</label>
          <select class="form-select" id="h-district">
            <option value="">Select District</option>
            ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip","Saitual","Hnahthial","Khawzawl"].map(e=>`<option ${y.district===e?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Google Maps Link <span style="font-size:0.8rem;color:var(--text-dim)">(optional)</span></label><input type="url" class="form-input" id="h-maps" placeholder="https://maps.google.com/..." value="${y.mapsLink||""}" /></div>
      </div>`;case 3:return`
      <h3 style="margin-bottom:24px">🛏️ Step 3: Stay Details</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Number of Rooms *</label><input type="number" class="form-input" id="h-rooms" min="1" max="50" placeholder="e.g. 3" value="${y.rooms||""}" /></div>
        <div class="form-group"><label class="form-label">Max Guests *</label><input type="number" class="form-input" id="h-guests" min="1" max="50" placeholder="e.g. 6" value="${y.maxGuests||""}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">Price per Night (₹) *</label>
        <input type="number" class="form-input" id="h-price" min="500" placeholder="e.g. 2000" value="${y.price||""}" />
        <span class="form-hint">Platform takes 10% commission. You receive 90%.</span>
      </div>
      <div class="form-group">
        <label class="form-label">Amenities</label>
        <div class="check-group" style="flex-wrap:wrap">
          ${["WiFi","Parking","Home-cooked Food","Breakfast Included","Hot Water","Valley View","Bonfire","AC","Private Bathroom","Kitchen Access","Laundry","Waterfall View","Farm Access","Stargazing"].map(e=>`
            <label class="check-item">
              <input type="checkbox" name="amenity" value="${e}" ${(y.amenities||[]).includes(e)?"checked":""} />
              <label>${e}</label>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">About Your Place *</label>
        <textarea class="form-textarea" id="h-description" placeholder="Describe what makes your place special — views, atmosphere, what guests will love…" style="min-height:140px">${y.description||""}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Nearby Attractions</label>
        <input type="text" class="form-input" id="h-nearby" placeholder="e.g. Vantawng Falls (2 km), Thenzawl market" value="${y.nearby||""}" />
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
      <div id="photo-count" style="margin-top:10px;font-size:0.85rem;color:var(--text-muted)">${te.length>0?te.length+" photo(s) uploaded":"No photos uploaded yet"}</div>`;case 5:return`
      <h3 style="margin-bottom:24px">📜 Step 5: Rules & Submission</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Check-in Time *</label><input type="time" class="form-input" id="h-checkin" value="${y.checkIn||"14:00"}" /></div>
        <div class="form-group"><label class="form-label">Check-out Time *</label><input type="time" class="form-input" id="h-checkout" value="${y.checkOut||"11:00"}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">House Rules</label>
        <textarea class="form-textarea" id="h-rules" placeholder="e.g. No smoking inside&#10;Quiet hours after 10 PM&#10;No outside guests after 9 PM&#10;Pets on request" style="min-height:120px">${y.rules||""}</textarea>
        <span class="form-hint">One rule per line</span>
      </div>
      <div class="form-group">
        <label class="form-label">Cancellation Policy</label>
        <select class="form-select" id="h-cancel">
          <option value="flexible" ${y.cancellation==="flexible"?"selected":""}>Flexible — Full refund 24 hours before</option>
          <option value="moderate" ${y.cancellation==="moderate"?"selected":""}>Moderate — Full refund 5 days before</option>
          <option value="strict" ${y.cancellation==="strict"?"selected":""}>Strict — 50% refund up to 1 week before</option>
        </select>
      </div>
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px;margin-bottom:20px">
        <div style="font-weight:700;margin-bottom:12px">✅ What happens after submission?</div>
        ${["Our team reviews your listing within 24–48 hours","We verify your ID and property photos","Once approved, your listing goes live on LushaiTrips","You receive 90% of every booking directly to your account"].map(e=>`<div style="display:flex;gap:10px;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">→</span>${e}</div>`).join("")}
      </div>
      <label class="check-item" style="margin-bottom:20px">
        <input type="checkbox" id="h-agree" />
        <label style="font-size:0.9rem">I agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Host Terms & Conditions</a> and confirm all information is accurate.</label>
      </label>`}}function $c(t){var e,r,i,s,a,n,o,l,c,u,d,h,p,m,g,v,b,x,f,w,R,T,$,U,B,he,pe,me,ge;switch(t){case 1:y.name=(r=(e=document.getElementById("h-name"))==null?void 0:e.value)==null?void 0:r.trim(),y.email=(s=(i=document.getElementById("h-email"))==null?void 0:i.value)==null?void 0:s.trim(),y.phone=(n=(a=document.getElementById("h-phone"))==null?void 0:a.value)==null?void 0:n.trim(),y.password=(o=document.getElementById("h-password"))==null?void 0:o.value;const we=(l=document.getElementById("h-confirm"))==null?void 0:l.value;return!y.name||!y.email||!y.phone||!y.password?(E("Please fill all required fields","","error"),!1):y.password!==we?(E("Passwords do not match","","error"),!1):y.password.length<8?(E("Password must be 8+ characters","","error"),!1):!0;case 2:return y.propName=(u=(c=document.getElementById("h-prop-name"))==null?void 0:c.value)==null?void 0:u.trim(),y.propType=(d=document.querySelector('input[name="prop-type"]:checked'))==null?void 0:d.value,y.address=(p=(h=document.getElementById("h-address"))==null?void 0:h.value)==null?void 0:p.trim(),y.district=(m=document.getElementById("h-district"))==null?void 0:m.value,y.mapsLink=(v=(g=document.getElementById("h-maps"))==null?void 0:g.value)==null?void 0:v.trim(),!y.propName||!y.propType||!y.address||!y.district?(E("Please fill all required fields","","error"),!1):!0;case 3:return y.rooms=(b=document.getElementById("h-rooms"))==null?void 0:b.value,y.maxGuests=(x=document.getElementById("h-guests"))==null?void 0:x.value,y.price=(f=document.getElementById("h-price"))==null?void 0:f.value,y.amenities=[...document.querySelectorAll('input[name="amenity"]:checked')].map(M=>M.value),y.description=(R=(w=document.getElementById("h-description"))==null?void 0:w.value)==null?void 0:R.trim(),y.nearby=($=(T=document.getElementById("h-nearby"))==null?void 0:T.value)==null?void 0:$.trim(),!y.rooms||!y.maxGuests||!y.price||!y.description?(E("Please fill all required fields","","error"),!1):!0;case 4:return te.length<3?(E("Please upload at least 3 photos","","error"),!1):(y.images=te,!0);case 5:return y.checkIn=(U=document.getElementById("h-checkin"))==null?void 0:U.value,y.checkOut=(B=document.getElementById("h-checkout"))==null?void 0:B.value,y.rules=(pe=(he=document.getElementById("h-rules"))==null?void 0:he.value)==null?void 0:pe.trim(),y.cancellation=(me=document.getElementById("h-cancel"))==null?void 0:me.value,(ge=document.getElementById("h-agree"))!=null&&ge.checked?!0:(E("Please agree to Terms & Conditions","","error"),!1)}}function Ii(t){Y=t,document.getElementById("stepper").innerHTML=Cs(),document.getElementById("step-container").innerHTML=Ls(t),document.getElementById("prev-btn").style.visibility=t===1?"hidden":"visible",document.getElementById("next-btn").textContent=t===qe?"🚀 Submit Listing":"Next →",Os(t),window.scrollTo({top:0,behavior:"smooth"})}function Os(t){var e;t===4&&((e=document.getElementById("photo-input"))==null||e.addEventListener("change",r=>{[...r.target.files].forEach(i=>{const s=new FileReader;s.onload=a=>{const n=new Image;n.onload=()=>{var b;const o=document.createElement("canvas");let{width:l,height:c}=n;const u=800;l>c&&l>u?(c*=u/l,l=u):c>u&&(l*=u/c,c=u),o.width=l,o.height=c,o.getContext("2d").drawImage(n,0,0,l,c);const h=o.toDataURL("image/jpeg",.8);te.push(h);const p=document.getElementById("photo-preview"),m=document.getElementById("photo-count"),g=document.createElement("div");g.className="upload-img-wrap";const v=te.length-1;g.innerHTML=`<img src="${h}" alt="upload" />${v===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img" data-idx="${v}">✕</button>`,p==null||p.appendChild(g),m&&(m.textContent=te.length+" photo(s) uploaded"),(b=g.querySelector(".remove-img"))==null||b.addEventListener("click",x=>{te.splice(v,1),g.remove(),m&&(m.textContent=te.length+" photo(s) uploaded")})},n.src=a.target.result},s.readAsDataURL(i)})}))}function js(){var t,e;te=[],Os(1),(t=document.getElementById("next-btn"))==null||t.addEventListener("click",()=>{var r,i;$c(Y)&&(Y===qe?Ac():(Ii(Y+1),(r=document.getElementById("next-btn"))==null||r.addEventListener("click",()=>{}),(i=document.getElementById("prev-btn"))==null||i.addEventListener("click",()=>{}),js()))}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{Y>1&&Ii(Y-1)})}async function Ac(){var e,r;const t=document.getElementById("next-btn");t&&(t.disabled=!0,t.textContent="⏳ Submitting…");try{const{supabase:i}=await Gt(async()=>{const{supabase:a}=await Promise.resolve().then(()=>qr);return{supabase:a}},void 0),{data:{session:s}}=await i.auth.getSession();if(!s){const{data:a,error:n}=await i.auth.signUp({email:y.email,password:y.password,options:{data:{full_name:y.name}}});if(n)throw n;const{data:o}=await i.auth.getSession();if(!o.session)throw new Error("Email is already registered. Please log in first, or use a different email.");a.user&&await i.from("profiles").upsert({id:a.user.id,full_name:y.name,phone:y.phone,role:"user"})}await yr(),await ws({name:y.propName,type:y.propType,location:y.address,district:y.district,price:parseInt(y.price),rooms:parseInt(y.rooms),max_guests:parseInt(y.maxGuests),amenities:y.amenities||[],description:y.description,images:y.images||[],cover_image:((e=y.images)==null?void 0:e[0])||"",check_in:y.checkIn,check_out:y.checkOut,rules:((r=y.rules)==null?void 0:r.split(`
`).filter(Boolean))||[],verified:!0,top_rated:!1}),Y=1,te=[],E("Listing live! 🎉","Your stay is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(i){E(i.message||"Submission failed","","error"),t&&(t.disabled=!1,t.textContent="🚀 Submit Listing")}}let Je=[],fe=[],et=0;const ur=15e3,Ic=6e4,Rc=6e4,Pc=3e4,Ae="https://icgjldvgvtesoehtoinf.supabase.co",Cc="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",Ri="lt_recent_guides";function tt(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Lc(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function Oc(){return fe.filter(Boolean).length}function zs(){return et}function jr(t,e="var(--text-muted)"){const r=document.getElementById("g-photo-status");r&&(r.textContent=t,r.style.color=e)}function G(t,e="var(--text-muted)"){const r=document.getElementById("g-submit-status");r&&(r.textContent=t,r.style.color=e)}function Ee(t,e=""){const r=document.getElementById("g-photo-loader"),i=document.getElementById("g-photo-loader-text");!r||!i||(r.style.display=t?"flex":"none",i.textContent=e)}function jt(){const t=zs(),e=Oc();if(t>0){Ee(!0,`Preparing ${t} photo(s)...`),jr(`${e} photo(s) ready, ${t} still preparing...`,"var(--emerald-400)");return}Ee(!1),jr(e?`${e} photo(s) ready to upload.`:"No photos selected yet.",e?"var(--emerald-400)":"var(--text-muted)")}function Qt(t){return typeof(t==null?void 0:t.message)=="string"?t.message.toLowerCase():""}function jc(t){const e=Qt(t);return e.includes("already registered")||e.includes("user already registered")}function zc(t){const e=Qt(t);return e.includes("invalid login credentials")||e.includes("invalid email or password")}function Pi(t){const e=Qt(t);return e.includes("email not confirmed")||e.includes("confirm your email")}function Bc(t){const e=Qt(t);return e.includes("rate limit")||e.includes("too many requests")}function ce(t,e=!0){const r=document.getElementById("submit-guide-btn");r&&(r.disabled=e,r.textContent=t)}function Bs(){return`sb-${new URL(Ae).hostname.split(".")[0]}-auth-token`}function Nc(){try{return JSON.parse(localStorage.getItem(Bs()))}catch{return null}}function Ns(t){t&&localStorage.setItem(Bs(),JSON.stringify(t))}function bt(t){var r,i;const e=(t==null?void 0:t.user)||t;e&&Fe({id:e.id,email:e.email||"",full_name:((r=e.user_metadata)==null?void 0:r.full_name)||((i=e.user_metadata)==null?void 0:i.name)||"",phone:e.phone||"",role:"user"})}function kt(t=""){const e={apikey:Cc};return t&&(e.Authorization=`Bearer ${t}`),e}async function _t(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok){const r=(e==null?void 0:e.msg)||(e==null?void 0:e.message)||"Supabase request failed.";throw new Error(r)}return e}async function hr(t,e){const r=await fetch(`${Ae}/auth/v1/token?grant_type=password`,{method:"POST",headers:{...kt(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),i=await _t(r);return Ns(i),bt(i),i}async function Uc(t,e,r){const i=await fetch(`${Ae}/auth/v1/signup`,{method:"POST",headers:{...kt(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,data:{full_name:r}})}),s=await _t(i);return s!=null&&s.access_token?(Ns(s),bt(s)):s!=null&&s.user&&bt(s.user),s}async function Mc(t,e,r){const i=t.type.includes("png")?"png":"jpg",s=`${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,a=`${Ae}/storage/v1/object/${e}/${s}`,n=await fetch(a,{method:"POST",headers:{...kt(r),"Content-Type":t.type,"x-upsert":"true"},body:t});return await _t(n),`${Ae}/storage/v1/object/public/${e}/${s}`}async function Dc(t,e){const r=await fetch(`${Ae}/rest/v1/guides`,{method:"POST",headers:{...kt(e),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)}),i=await _t(r);return Array.isArray(i)?i[0]:i}function Ci(t){if(!(t!=null&&t.id))return;const e=O.get(Ri),r=Array.isArray(e)?e:[],i=[t,...r.filter(s=>(s==null?void 0:s.id)!==t.id)];O.set(Ri,i.slice(0,8))}function Hc(t,e="guide-photo.jpg"){return new Promise((r,i)=>{t.toBlob(s=>{if(!s){i(new Error("Could not prepare the selected image."));return}const a=e.replace(/\.[^.]+$/,"").replace(/[^a-z0-9-_]+/gi,"-").toLowerCase()||"guide-photo";r(new File([s],`${a}.jpg`,{type:"image/jpeg"}))},"image/jpeg",.78)})}async function qc(t){return new Promise((e,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(`Could not read ${t.name}.`)),i.onload=s=>{const a=new Image;a.onerror=()=>r(new Error(`Could not process ${t.name}.`)),a.onload=async()=>{try{const n=document.createElement("canvas");let{width:o,height:l}=a;const c=800;o>l&&o>c?(l*=c/o,o=c):l>c&&(o*=c/l,l=c),n.width=Math.max(1,Math.round(o)),n.height=Math.max(1,Math.round(l)),n.getContext("2d").drawImage(a,0,0,n.width,n.height);const u=n.toDataURL("image/jpeg",.72),d=await Hc(n,t.name);e({preview:u,preparedFile:d})}catch(n){r(n)}},a.src=s.target.result},i.readAsDataURL(t)})}function Fc(t){const e=document.createElement("div");return e.className="upload-img-wrap",e.style.background="rgba(255,255,255,0.03)",e.style.border="1px solid var(--glass-border)",e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="8px",e.innerHTML=`
    <div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div>
    <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;line-height:1.35">${t}</div>
  `,e}function Wc(t,e,r){t.style.background="",t.style.border="",t.style.display="",t.style.flexDirection="",t.style.alignItems="",t.style.justifyContent="",t.style.padding="",t.innerHTML=`<img src="${e}" alt="upload" />${r===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>':""}<button class="remove-img">x</button>`}async function Gc(t,e){const r=new URLSearchParams({select:"*",email:`eq.${t}`,phone:`eq.${e}`,order:"created_at.desc",limit:"1"}),i=await fetch(`${Ae}/rest/v1/guides?${r.toString()}`,{headers:kt()}),s=await _t(i);return Array.isArray(s)&&s[0]||null}async function Vc({name:t,email:e,password:r,phone:i}){var a,n,o,l,c,u;const s=Nc();if(s!=null&&s.access_token&&((n=(a=s==null?void 0:s.user)==null?void 0:a.email)==null?void 0:n.toLowerCase())===e.toLowerCase())return G("Using your active session...","var(--emerald-400)"),ce("Using active session..."),bt(s),{userId:s.user.id,accessToken:s.access_token};G("Signing you in...","var(--emerald-400)"),ce("Signing in...");try{const d=await tt(hr(e,r),ur,"Login timed out. Please try again.");if((o=d==null?void 0:d.user)!=null&&o.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token}}catch(d){if(Pi(d))throw new Error("This account exists but is not confirmed yet. Check your email, then log in and submit the guide form again.");if(!zc(d))throw d}G("Creating your guide account...","var(--emerald-400)"),ce("Creating account...");try{const d=await tt(Uc(e,r,t),Ic,"Sign-up timed out. Please try again in a moment.");if((l=d==null?void 0:d.user)!=null&&l.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token};G("Finishing sign-in...","var(--emerald-400)"),ce("Finishing sign-in...");const h=await tt(hr(e,r),ur,"Login timed out. Please try again.");if((c=h==null?void 0:h.user)!=null&&c.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}catch(d){if(jc(d)){G("Account already exists. Signing you in...","var(--emerald-400)"),ce("Signing you in...");const h=await tt(hr(e,r),ur,"Login timed out. Please try again.");if((u=h==null?void 0:h.user)!=null&&u.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}throw Bc(d)?new Error("Too many signup emails were requested. Please wait a few minutes, or log in first and then submit the guide form."):Pi(d)?new Error("Your account needs email confirmation before guide registration can continue. Confirm the email, log in, then submit again."):d}throw new Error("We could not create an active guide account session. Please log in again and retry.")}function Kc(){return`
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

          <div class="form-group"><label class="form-label">Professional Title *</label><input type="text" class="form-input" id="g-title" placeholder="e.g. Expert Trekking &amp; Wildlife Guide" /></div>

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
          <h3 style="margin-bottom:16px">📸 Profile &amp; Gallery Photos <span style="font-size:0.85rem;font-weight:400;color:var(--text-dim)">(optional)</span></h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:16px">Upload a profile photo and photos from your trips (you can also add these later)</p>
          <div class="upload-zone" onclick="document.getElementById('g-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">📷</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">First photo = profile photo • JPG or PNG</div>
            <input type="file" id="g-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div id="g-photo-loader" style="display:none;align-items:center;gap:12px;margin-top:12px;padding:12px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.18);border-radius:12px">
            <div class="loading-spinner" style="width:22px;height:22px;border-width:2px;margin:0"></div>
            <div id="g-photo-loader-text" style="font-size:0.85rem;color:var(--emerald-300)">Preparing photos...</div>
          </div>
          <div id="g-photo-status" class="form-hint" style="margin-top:10px">No photos selected yet.</div>
          <div class="upload-preview" id="g-photo-preview" style="margin-top:12px"></div>

          <label class="check-item" style="margin-bottom:24px;margin-top:16px">
            <input type="checkbox" id="g-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Guide Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-guide-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Guide Application 🧭</button>
          <div id="g-submit-status" class="form-hint" style="margin-top:12px;text-align:center">Ready to submit your guide profile.</div>
        </div>
      </div>
    </div>
  `}function Jc(){var t,e;Je=[],fe=[],et=0,Ee(!1),jt(),G("Ready to submit your guide profile."),(t=document.getElementById("g-photos"))==null||t.addEventListener("change",async r=>{const i=[...r.target.files];if(!i.length)return;const s=document.getElementById("g-photo-preview");et+=i.length,jt(),i.forEach(async a=>{var l;const n=fe.length;fe.push(null),Je[n]=null;const o=Fc(a.name);s==null||s.appendChild(o);try{const{preview:c,preparedFile:u}=await qc(a);Je[n]=c,fe[n]=u,Wc(o,c,n),(l=o.querySelector(".remove-img"))==null||l.addEventListener("click",()=>{Je[n]=null,fe[n]=null,o.remove(),jt()})}catch(c){Je[n]=null,fe[n]=null,o.remove(),E(c.message||`Could not prepare ${a.name}.`,"","error")}finally{et=Math.max(0,et-1),jt()}})}),(e=document.getElementById("submit-guide-btn"))==null||e.addEventListener("click",async()=>{var v,b,x,f,w,R,T,$,U,B,he,pe,me,ge,we,M,Z;const r=(b=(v=document.getElementById("g-name"))==null?void 0:v.value)==null?void 0:b.trim(),i=(f=(x=document.getElementById("g-email"))==null?void 0:x.value)==null?void 0:f.trim(),s=(R=(w=document.getElementById("g-phone"))==null?void 0:w.value)==null?void 0:R.trim(),a=(T=document.getElementById("g-password"))==null?void 0:T.value,n=(U=($=document.getElementById("g-title"))==null?void 0:$.value)==null?void 0:U.trim(),o=(he=(B=document.getElementById("g-bio"))==null?void 0:B.value)==null?void 0:he.trim(),l=(pe=document.getElementById("g-price"))==null?void 0:pe.value,c=(me=document.getElementById("g-location"))==null?void 0:me.value,u=(ge=document.getElementById("g-exp"))==null?void 0:ge.value,d=[...document.querySelectorAll('input[name="g-lang"]:checked')].map(P=>P.value),h=[...document.querySelectorAll('input[name="g-spec"]:checked')].map(P=>P.value),p=(M=(we=document.getElementById("g-certs"))==null?void 0:we.value)==null?void 0:M.split(`
`).filter(Boolean),m=(Z=document.getElementById("g-agree"))==null?void 0:Z.checked;let g="starting";if(!r||!i||!s||!a||!n||!o||!l||!c||!u||!d.length||!h.length){E("Please fill all required fields","","error");return}if(!m){E("Please agree to the Guide Terms","","error");return}if(zs()>0){E("Please wait for photos to finish preparing.","","error");return}ce("Submitting..."),G("Starting guide registration...","var(--emerald-400)");try{g="auth";const P=await Vc({name:r,email:i,password:a,phone:s});G("Loading your account...","var(--emerald-400)"),bt({user:{id:P.userId,email:i,user_metadata:{full_name:r},phone:s}});const re=fe.filter(Boolean);let D=[];if(re.length>0){g="upload",ce("Uploading photos..."),G(`Uploading ${re.length} photo(s)...`,"var(--emerald-400)"),Ee(!0,`Uploading 1 of ${re.length} photo(s)...`);for(const[Tt,Ve]of re.entries()){Ee(!0,`Uploading ${Tt+1} of ${re.length} photo(s)...`);const Vr=await Promise.race([Mc(Ve,"guide-images",P.accessToken).catch(rr=>(console.warn("[Guide] image upload failed (skipping):",rr.message),null)),new Promise(rr=>setTimeout(()=>{console.warn("[Guide] upload timeout, skipping image"),rr(null)},Pc))]);Vr&&D.push(Vr)}Ee(!1),jr(D.length===re.length?`${D.length} photo(s) uploaded successfully.`:`${D.length} of ${re.length} photo(s) uploaded.`,D.length?"var(--emerald-400)":"var(--text-muted)")}ce("Saving profile..."),G("Saving your guide profile...","var(--emerald-400)"),g="save";const tr=await tt(Dc({host_id:P.userId,name:r,title:n,experience:u,languages:d,specialties:h,price:parseInt(l),location:c,bio:o,certifications:p,images:D,cover_image:D[0]||"",phone:s,email:i,verified:!0,available:!0,status:"approved"},P.accessToken),Rc,"Saving guide profile timed out. Please retry.");Ci(tr),G("Guide profile created successfully.","var(--emerald-400)"),E("Guide application live! 🎉","Your profile is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(P){if(console.error("[Guide Signup] ERROR:",P),Ee(!1),Lc(P)){try{const D=g==="save"?await Gc(i,s):null;if(D){Ci(D),G("Guide profile saved successfully.","var(--emerald-400)"),E("Guide application submitted","Your profile was saved. Redirecting to dashboard."),setTimeout(()=>window.router.navigate("/host-dashboard"),800);return}}catch(D){console.warn("[Guide Signup] timeout verification failed:",(D==null?void 0:D.message)||D)}G(g==="auth"?"Account setup took too long. If this email already has an account, log in first and then submit the guide form.":g==="upload"?"Photo upload took too long. Try fewer or smaller photos, then submit again.":g==="save"?"Saving your guide profile took too long. Please retry in a moment.":"The request took too long. Please retry in a moment.","#f87171")}else G(P.message||"Guide registration failed.","#f87171");E(P.message||"Submission failed. Please try again.","","error"),ce("Submit Guide Application 🧭",!1)}})}let Ye=[],ve=[],rt=0,pr=1;const mr=15e3,Yc=6e4,Xc=6e4,Zc=3e4,Ie="https://icgjldvgvtesoehtoinf.supabase.co",Qc="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",Li="lt_recent_transport";function it(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function ed(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function td(){return ve.filter(Boolean).length}function Us(){return rt}function zr(t,e="var(--text-muted)"){const r=document.getElementById("t-photo-status");r&&(r.textContent=t,r.style.color=e)}function V(t,e="var(--text-muted)"){const r=document.getElementById("t-submit-status");r&&(r.textContent=t,r.style.color=e)}function Te(t,e=""){const r=document.getElementById("t-photo-loader"),i=document.getElementById("t-photo-loader-text");!r||!i||(r.style.display=t?"flex":"none",i.textContent=e)}function zt(){const t=Us(),e=td();if(t>0){Te(!0,`Preparing ${t} photo(s)...`),zr(`${e} photo(s) ready, ${t} still preparing...`,"var(--emerald-400)");return}Te(!1),zr(e?`${e} photo(s) ready to upload.`:"No photos selected yet.",e?"var(--emerald-400)":"var(--text-muted)")}function er(t){return typeof(t==null?void 0:t.message)=="string"?t.message.toLowerCase():""}function rd(t){const e=er(t);return e.includes("already registered")||e.includes("user already registered")}function id(t){const e=er(t);return e.includes("invalid login credentials")||e.includes("invalid email or password")}function Oi(t){const e=er(t);return e.includes("email not confirmed")||e.includes("confirm your email")}function sd(t){const e=er(t);return e.includes("rate limit")||e.includes("too many requests")}function de(t,e=!0){const r=document.getElementById("submit-transport-btn");r&&(r.disabled=e,r.textContent=t)}function Ms(){return`sb-${new URL(Ie).hostname.split(".")[0]}-auth-token`}function ad(){try{return JSON.parse(localStorage.getItem(Ms()))}catch{return null}}function Ds(t){t&&localStorage.setItem(Ms(),JSON.stringify(t))}function wt(t){var r,i;const e=(t==null?void 0:t.user)||t;e&&Fe({id:e.id,email:e.email||"",full_name:((r=e.user_metadata)==null?void 0:r.full_name)||((i=e.user_metadata)==null?void 0:i.name)||"",phone:e.phone||"",role:"user"})}function St(t=""){const e={apikey:Qc};return t&&(e.Authorization=`Bearer ${t}`),e}async function Et(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok){const r=(e==null?void 0:e.msg)||(e==null?void 0:e.message)||"Supabase request failed.";throw new Error(r)}return e}async function gr(t,e){const r=await fetch(`${Ie}/auth/v1/token?grant_type=password`,{method:"POST",headers:{...St(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),i=await Et(r);return Ds(i),wt(i),i}async function nd(t,e,r){const i=await fetch(`${Ie}/auth/v1/signup`,{method:"POST",headers:{...St(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,data:{full_name:r}})}),s=await Et(i);return s!=null&&s.access_token?(Ds(s),wt(s)):s!=null&&s.user&&wt(s.user),s}async function od(t,e,r){const i=t.type.includes("png")?"png":"jpg",s=`${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,a=`${Ie}/storage/v1/object/${e}/${s}`,n=await fetch(a,{method:"POST",headers:{...St(r),"Content-Type":t.type,"x-upsert":"true"},body:t});return await Et(n),`${Ie}/storage/v1/object/public/${e}/${s}`}async function ld(t,e){const r=await fetch(`${Ie}/rest/v1/transport`,{method:"POST",headers:{...St(e),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)}),i=await Et(r);return Array.isArray(i)?i[0]:i}function ji(t){if(!(t!=null&&t.id))return;const e=O.get(Li),r=Array.isArray(e)?e:[],i=[t,...r.filter(s=>(s==null?void 0:s.id)!==t.id)];O.set(Li,i.slice(0,8))}async function cd(t,e){const r=new URLSearchParams({select:"*",email:`eq.${t}`,phone:`eq.${e}`,order:"created_at.desc",limit:"1"}),i=await fetch(`${Ie}/rest/v1/transport?${r.toString()}`,{headers:St()}),s=await Et(i);return Array.isArray(s)&&s[0]||null}async function dd({name:t,email:e,password:r,phone:i}){var a,n,o,l,c,u;const s=ad();if(s!=null&&s.access_token&&((n=(a=s==null?void 0:s.user)==null?void 0:a.email)==null?void 0:n.toLowerCase())===e.toLowerCase())return V("Using your active session...","var(--emerald-400)"),de("Using active session..."),wt(s),{userId:s.user.id,accessToken:s.access_token};V("Signing you in...","var(--emerald-400)"),de("Signing in...");try{const d=await it(gr(e,r),mr,"Login timed out. Please try again.");if((o=d==null?void 0:d.user)!=null&&o.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token}}catch(d){if(Oi(d))throw new Error("This account exists but is not confirmed yet. Check your email, then log in and submit the transport form again.");if(!id(d))throw d}V("Creating your transport account...","var(--emerald-400)"),de("Creating account...");try{const d=await it(nd(e,r,t),Yc,"Sign-up timed out. Please try again in a moment.");if((l=d==null?void 0:d.user)!=null&&l.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token};V("Finishing sign-in...","var(--emerald-400)"),de("Finishing sign-in...");const h=await it(gr(e,r),mr,"Login timed out. Please try again.");if((c=h==null?void 0:h.user)!=null&&c.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}catch(d){if(rd(d)){V("Account already exists. Signing you in...","var(--emerald-400)"),de("Signing you in...");const h=await it(gr(e,r),mr,"Login timed out. Please try again.");if((u=h==null?void 0:h.user)!=null&&u.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}throw sd(d)?new Error("Too many signup emails were requested. Please wait a few minutes, or log in first and then submit the transport form."):Oi(d)?new Error("Your account needs email confirmation before transport registration can continue. Confirm the email, log in, then submit again."):d}throw new Error("We could not create an active transport account session. Please log in again and retry.")}function ud(t,e="transport-photo.jpg"){return new Promise((r,i)=>{t.toBlob(s=>{if(!s){i(new Error("Could not prepare the selected image."));return}const a=e.replace(/\.[^.]+$/,"").replace(/[^a-z0-9-_]+/gi,"-").toLowerCase()||"transport-photo";r(new File([s],`${a}.jpg`,{type:"image/jpeg"}))},"image/jpeg",.78)})}async function hd(t){return new Promise((e,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(`Could not read ${t.name}.`)),i.onload=s=>{const a=new Image;a.onerror=()=>r(new Error(`Could not process ${t.name}.`)),a.onload=async()=>{try{const n=document.createElement("canvas");let{width:o,height:l}=a;const c=800;o>l&&o>c?(l*=c/o,o=c):l>c&&(o*=c/l,l=c),n.width=Math.max(1,Math.round(o)),n.height=Math.max(1,Math.round(l)),n.getContext("2d").drawImage(a,0,0,n.width,n.height);const u=n.toDataURL("image/jpeg",.72),d=await ud(n,t.name);e({preview:u,preparedFile:d})}catch(n){r(n)}},a.src=s.target.result},i.readAsDataURL(t)})}function pd(t){const e=document.createElement("div");return e.className="upload-img-wrap",e.style.background="rgba(255,255,255,0.03)",e.style.border="1px solid var(--glass-border)",e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="8px",e.innerHTML=`
    <div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div>
    <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;line-height:1.35">${t}</div>
  `,e}function md(t,e,r){t.style.background="",t.style.border="",t.style.display="",t.style.flexDirection="",t.style.alignItems="",t.style.justifyContent="",t.style.padding="",t.innerHTML=`<img src="${e}" alt="upload" />${r===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img">x</button>`}function Hs(t){return`
    <div class="card card-body" data-vehicle-row style="padding:20px;margin-bottom:16px;${t>0?"position:relative":""}">
      ${t>0?'<button class="remove-img" type="button" data-remove-vehicle style="position:absolute;top:12px;right:12px;width:24px;height:24px">x</button>':""}
      <div style="font-weight:700;margin-bottom:16px;font-size:0.9rem;color:var(--emerald-400)">Vehicle ${t+1}</div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Vehicle Name *</label><input type="text" class="form-input" data-vehicle-field="name" placeholder="e.g. Toyota Innova Crysta" /></div>
        <div class="form-group"><label class="form-label">Passenger Capacity *</label><input type="number" class="form-input" data-vehicle-field="capacity" min="1" max="30" placeholder="e.g. 7" /></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Price (INR) *</label><input type="number" class="form-input" data-vehicle-field="price" placeholder="e.g. 3500" /></div>
        <div class="form-group"><label class="form-label">Price Unit</label>
          <select class="form-select" data-vehicle-field="price_unit"><option>per day (fuel incl.)</option><option>per day (fuel extra)</option><option>per km</option><option>per seat per route</option></select>
        </div>
      </div>
    </div>
  `}function gd(t){var a,n,o,l,c;const e=((n=(a=t.querySelector('[data-vehicle-field="name"]'))==null?void 0:a.value)==null?void 0:n.trim())||"",r=((o=t.querySelector('[data-vehicle-field="capacity"]'))==null?void 0:o.value)||"",i=((l=t.querySelector('[data-vehicle-field="price"]'))==null?void 0:l.value)||"",s=((c=t.querySelector('[data-vehicle-field="price_unit"]'))==null?void 0:c.value)||"per day (fuel incl.)";return{name:e,capacity:r,price:i,priceUnit:s}}function fd(){const t=[...document.querySelectorAll("[data-vehicle-row]")],e=[];for(const r of t){const i=gd(r);if(i.name||i.capacity||i.price){if(!i.name||!i.capacity||!i.price)throw new Error("Please complete each vehicle entry or remove the incomplete row.");e.push({name:i.name,capacity:parseInt(i.capacity,10),price:parseInt(i.price,10),price_unit:i.priceUnit})}}if(!e.length)throw new Error("Please add at least one vehicle with its pricing details.");return e}function vd(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Transport</h2>
          <p style="color:var(--text-muted)">Connect travelers with reliable rides across Mizoram's mountain roads</p>
        </div>

        <div class="card card-body" style="padding:40px">
          <h3 style="margin-bottom:24px">Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="t-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="t-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="t-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="t-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">Business Details</h3>

          <div class="form-group"><label class="form-label">Business / Service Name *</label><input type="text" class="form-input" id="t-biz" placeholder="e.g. Aizawl Adventure Transport" /></div>

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
          <h3 style="margin-bottom:16px">Your Vehicles</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:20px">Add details for each vehicle you offer</p>

          <div id="vehicles-container">
            ${Hs(0)}
          </div>
          <button class="btn btn-outline btn-sm" id="add-vehicle-btn" type="button" style="margin-bottom:28px">+ Add Another Vehicle</button>

          <div class="form-group">
            <label class="form-label">Features & Services</label>
            <div class="check-group" style="flex-wrap:wrap">
              ${["Airport Pickup","AC Vehicles","Night Driving","Driver Provided","Fuel Included","All Districts","Breakdown Assistance","Child Seats","Helmets Included","Riding Gear","Route Maps","Delivery to Hotel"].map(t=>`<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="t-feat" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join("")}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Description *</label><textarea class="form-textarea" id="t-desc" placeholder="Describe your service - coverage areas, experience, and what makes you reliable." style="min-height:120px"></textarea></div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">Vehicle Photos</h3>
          <div class="upload-zone" onclick="document.getElementById('t-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">CAR</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Vehicle Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">Min 2 photos - exterior and interior - JPG or PNG</div>
            <input type="file" id="t-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div id="t-photo-loader" style="display:none;align-items:center;gap:12px;margin-top:12px;padding:12px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.18);border-radius:12px">
            <div class="loading-spinner" style="width:22px;height:22px;border-width:2px;margin:0"></div>
            <div id="t-photo-loader-text" style="font-size:0.85rem;color:var(--emerald-300)">Preparing photos...</div>
          </div>
          <div id="t-photo-status" class="form-hint" style="margin-top:10px">No photos selected yet.</div>
          <div class="upload-preview" id="t-photo-preview" style="margin-top:12px"></div>

          <div class="divider-h"></div>
          <div class="form-group">
            <label class="form-label">Driving License / RC Book * <span style="font-size:0.8rem;color:var(--text-dim)">(upload document)</span></label>
            <div class="upload-zone" onclick="document.getElementById('t-license').click()" style="padding:20px">
              <div style="font-size:1.5rem;margin-bottom:6px">DOC</div>
              <div style="font-size:0.9rem;font-weight:600">Upload License / RC</div>
              <input type="file" id="t-license" accept=".jpg,.png,.pdf" style="display:none" />
            </div>
            <div id="t-license-preview" style="font-size:0.85rem;color:var(--emerald-400);margin-top:6px"></div>
          </div>

          <label class="check-item" style="margin-bottom:24px">
            <input type="checkbox" id="t-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Transport Partner Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-transport-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Transport Listing</button>
          <div id="t-submit-status" class="form-hint" style="margin-top:12px;text-align:center">Ready to submit your transport listing.</div>
        </div>
      </div>
    </div>
  `}function yd(){var t,e,r,i,s;Ye=[],ve=[],rt=0,pr=1,Te(!1),zt(),V("Ready to submit your transport listing."),(t=document.getElementById("add-vehicle-btn"))==null||t.addEventListener("click",()=>{pr+=1;const a=document.getElementById("vehicles-container");a==null||a.insertAdjacentHTML("beforeend",Hs(pr-1))}),(e=document.getElementById("vehicles-container"))==null||e.addEventListener("click",a=>{var o;const n=a.target.closest("[data-remove-vehicle]");n&&((o=n.closest("[data-vehicle-row]"))==null||o.remove())}),(r=document.getElementById("t-photos"))==null||r.addEventListener("change",async a=>{const n=[...a.target.files];if(!n.length)return;const o=document.getElementById("t-photo-preview");rt+=n.length,zt(),n.forEach(async l=>{var d;const c=ve.length;ve.push(null),Ye[c]=null;const u=pd(l.name);o==null||o.appendChild(u);try{const{preview:h,preparedFile:p}=await hd(l);Ye[c]=h,ve[c]=p,md(u,h,c),(d=u.querySelector(".remove-img"))==null||d.addEventListener("click",()=>{Ye[c]=null,ve[c]=null,u.remove(),zt()})}catch(h){Ye[c]=null,ve[c]=null,u.remove(),E(h.message||`Could not prepare ${l.name}.`,"","error")}finally{rt=Math.max(0,rt-1),zt()}})}),(i=document.getElementById("t-license"))==null||i.addEventListener("change",a=>{a.target.files[0]&&(document.getElementById("t-license-preview").textContent=`Selected: ${a.target.files[0].name}`)}),(s=document.getElementById("submit-transport-btn"))==null||s.addEventListener("click",async()=>{var b,x,f,w,R,T,$,U,B,he,pe,me,ge,we;const a=(x=(b=document.getElementById("t-name"))==null?void 0:b.value)==null?void 0:x.trim(),n=(w=(f=document.getElementById("t-email"))==null?void 0:f.value)==null?void 0:w.trim(),o=(T=(R=document.getElementById("t-phone"))==null?void 0:R.value)==null?void 0:T.trim(),l=($=document.getElementById("t-password"))==null?void 0:$.value,c=(B=(U=document.getElementById("t-biz"))==null?void 0:U.value)==null?void 0:B.trim(),u=(he=document.querySelector('input[name="t-type"]:checked'))==null?void 0:he.value,d=(pe=document.getElementById("t-location"))==null?void 0:pe.value,h=(ge=(me=document.getElementById("t-desc"))==null?void 0:me.value)==null?void 0:ge.trim(),p=[...document.querySelectorAll('input[name="t-feat"]:checked')].map(M=>M.value),m=(we=document.getElementById("t-agree"))==null?void 0:we.checked;let g=[],v="starting";if(!a||!n||!o||!l||!c||!u||!d||!h){E("Please fill all required fields","","error");return}try{g=fd()}catch(M){E(M.message,"","error");return}if(!m){E("Please agree to the Transport Partner Terms","","error");return}if(Us()>0){E("Please wait for photos to finish preparing.","","error");return}de("Submitting..."),V("Starting transport registration...","var(--emerald-400)");try{v="auth";const M=await dd({name:a,email:n,password:l,phone:o});V("Loading your account...","var(--emerald-400)"),wt({user:{id:M.userId,email:n,user_metadata:{full_name:a},phone:o}});const Z=ve.filter(Boolean);let P=[];if(Z.length>0){v="upload",de("Uploading photos..."),V(`Uploading ${Z.length} photo(s)...`,"var(--emerald-400)"),Te(!0,`Uploading 1 of ${Z.length} photo(s)...`);for(const[D,tr]of Z.entries()){Te(!0,`Uploading ${D+1} of ${Z.length} photo(s)...`);const Tt=await Promise.race([od(tr,"transport-images",M.accessToken).catch(Ve=>(console.warn("[Transport] image upload failed (skipping):",Ve.message),null)),new Promise(Ve=>setTimeout(()=>{console.warn("[Transport] upload timeout, skipping image"),Ve(null)},Zc))]);Tt&&P.push(Tt)}Te(!1),zr(P.length===Z.length?`${P.length} photo(s) uploaded successfully.`:`${P.length} of ${Z.length} photo(s) uploaded.`,P.length?"var(--emerald-400)":"var(--text-muted)")}v="save",de("Saving listing..."),V("Saving your transport listing...","var(--emerald-400)");const re=await it(ld({host_id:M.userId,name:c,owner_name:a,type:u,location:d,description:h,features:p,images:P,cover_image:P[0]||"",phone:o,email:n,vehicles:g,verified:!0,available:!0,status:"approved"},M.accessToken),Xc,"Saving transport listing timed out. Please retry.");ji(re),V("Transport listing created successfully.","var(--emerald-400)"),E("Transport listing live!","Your listing is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(M){if(console.error("[Transport Signup] ERROR:",M),Te(!1),ed(M)){try{const P=v==="save"?await cd(n,o):null;if(P){ji(P),V("Transport listing saved successfully.","var(--emerald-400)"),E("Transport listing submitted","Your listing was saved. Redirecting to dashboard."),setTimeout(()=>window.router.navigate("/host-dashboard"),800);return}}catch(P){console.warn("[Transport Signup] timeout verification failed:",(P==null?void 0:P.message)||P)}V(v==="auth"?"Account setup took too long. If this email already has an account, log in first and then submit the transport form.":v==="upload"?"Photo upload took too long. Try fewer or smaller photos, then submit again.":v==="save"?"Saving your transport listing took too long. Please retry in a moment.":"The request took too long. Please retry in a moment.","#f87171")}else V(M.message||"Transport registration failed.","#f87171");E(M.message||"Submission failed. Please try again.","","error"),de("Submit Transport Listing",!1)}})}function bd(){const t=z,e=X();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;const r=Js(),i=Br(),s=ne.filter(a=>i.includes(a.id));return`
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
          <button class="tab-btn active" data-tab="bookings">📅 My Bookings (${r.length})</button>
          <button class="tab-btn" data-tab="wishlist">❤️ Wishlist (${s.length})</button>
          <button class="tab-btn" data-tab="account">👤 Account</button>
        </div>

        <!-- Bookings -->
        <div id="tab-bookings">
          ${r.length?r.map(a=>{var n;return`
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${a.listingName}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${a.checkin?new Date(a.checkin+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):new Date(a.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Ref: <strong style="color:var(--emerald-400)">${a.id}</strong></div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:700;font-size:1.1rem;color:var(--emerald-400)">₹${(n=a.total)==null?void 0:n.toLocaleString()}</div>
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
          ${s.length?`
            <div class="grid-3">${s.map(a=>`
              <div class="card" data-href="/stay/${a.id}" style="cursor:pointer">
                <div class="card-img-wrap"><img src="${a.coverImage}" alt="${a.name}" loading="lazy" /><div class="card-rating">${F(a.rating)} ${a.rating}</div></div>
                <div class="card-body"><h4 class="card-title">${a.name}</h4><div class="price">₹${a.price.toLocaleString()}<span>/night</span></div></div>
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
  `}function wd(){var e;(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{vr()});const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(r=>{r.addEventListener("click",()=>{var i;t.forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(s=>s.classList.add("hidden")),(i=document.getElementById(`tab-${r.dataset.tab}`))==null||i.classList.remove("hidden")})}),document.querySelectorAll("[data-href]").forEach(r=>r.addEventListener("click",()=>window.router.navigate(r.dataset.href)))}const xd=1e4,kd="lt_recent_guides",_d="lt_recent_transport";function Sd(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function ot(t,e){const i=(Array.isArray(t==null?void 0:t.vehicles)?t.vehicles:[])[0]||null,s=Number(e==="transport"?(i==null?void 0:i.price)||0:(t==null?void 0:t.price)||0);return{id:t==null?void 0:t.id,type:e,name:(t==null?void 0:t.name)||"Untitled Listing",location:(t==null?void 0:t.location)||(t==null?void 0:t.district)||"Mizoram",coverImage:(t==null?void 0:t.cover_image)||(Array.isArray(t==null?void 0:t.images)?t.images[0]:"")||"",price:s,priceLabel:e==="transport"?(i==null?void 0:i.price_unit)||(i==null?void 0:i.priceUnit)||"starting price":e==="guide"?(t==null?void 0:t.price_unit)||"per day":"per night",status:(t==null?void 0:t.status)||"approved",rating:Number((t==null?void 0:t.rating)||0)}}function Ed(t){const e=t.status==="pending"?"Under Review":"Live",r=t.status==="pending"?"badge badge-pending":"badge badge-approved",i=t.type.charAt(0).toUpperCase()+t.type.slice(1),s=t.price>0?`Rs ${t.price.toLocaleString()} ${t.priceLabel}`:"Price pending",a=t.rating>0?t.rating.toFixed(1):"New";return`
    <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
      ${t.coverImage?`<img src="${t.coverImage}" alt="${t.name}" style="width:80px;height:60px;border-radius:8px;object-fit:cover;flex-shrink:0" />`:""}
      <div style="flex:1;min-width:220px">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
          <div style="font-weight:700">${t.name}</div>
          <span class="tag" style="font-size:0.68rem">${i}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Location: ${t.location}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${s} · Rating: ${a}</div>
      </div>
      <span class="${r}">${e}</span>
    </div>
  `}function Td(t){const e=O.get(kd),r=O.get(_d),i=Array.isArray(e)?e.filter(a=>(a==null?void 0:a.host_id)===t.id):[],s=Array.isArray(r)?r.filter(a=>(a==null?void 0:a.host_id)===t.id):[];return[...i.map(a=>ot(a,"guide")),...s.map(a=>ot(a,"transport"))]}function fr(t,e,r=""){const i=document.getElementById("stat-listings"),s=document.getElementById("stat-earnings");if(i&&(i.textContent=e.length.toString()),s&&(s.textContent="Rs 0"),!e.length){t.innerHTML=`
      <div style="text-align:center;padding:60px;color:var(--text-muted)">
        <div style="font-size:4rem;margin-bottom:16px">🏠</div>
        <h3 style="margin-bottom:12px">No listings yet</h3>
        <p style="margin-bottom:24px">Your stay, guide, or transport listing will appear here once it is saved.</p>
        ${r?`<div style="font-size:0.82rem;color:var(--text-dim)">${r}</div>`:""}
      </div>
    `;return}t.innerHTML=`
    ${r?`<div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:14px">${r}</div>`:""}
    ${e.map(Ed).join("")}
  `}function $d(){const t=z,e=X();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;const r=e.full_name||e.name||e.email||"Host",i=r.charAt(0).toUpperCase();return`
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          ${e.avatar_url?`<img src="${e.avatar_url}" alt="${r}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid var(--emerald-500)" />`:`<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800">${i}</div>`}
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">Host Dashboard</h1>
            <div style="color:var(--text-muted)">Welcome back, ${r} · <span class="badge badge-approved">Active Host</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div class="grid-4" style="margin-bottom:40px">
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">🏠</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-listings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Active Listings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">📅</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-bookings">0</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Bookings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">💰</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-earnings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Earnings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">⭐</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px">4.8</div><div style="font-size:0.85rem;color:var(--text-muted)">Avg Rating</div></div>
        </div>

        <div class="tabs" id="host-tabs">
          <button class="tab-btn active" data-tab="listings">🏠 Listings</button>
          <button class="tab-btn" data-tab="add">+ Add New</button>
        </div>

        <div id="tab-listings">
          <div style="text-align:center;padding:40px;color:var(--text-muted)">Loading listings...</div>
        </div>

        <div id="tab-add" class="hidden">
          <div class="grid-3">
            ${[{icon:"🏡",title:"Add Stay",desc:"List a homestay, hotel, lodge, or camping site",href:"/host-signup-stay"},{icon:"🧭",title:"Register as Guide",desc:"Offer trekking, wildlife, or cultural tour services",href:"/host-signup-guide"},{icon:"🚗",title:"List Transport",desc:"Cars, bikes, SUVs, shared Sumo or vans",href:"/host-signup-transport"}].map(s=>`
              <a href="${t(s.href)}" class="card card-body text-center" data-link style="cursor:pointer">
                <div style="font-size:3rem;margin-bottom:16px">${s.icon}</div>
                <h4 style="margin-bottom:8px">${s.title}</h4>
                <p style="font-size:0.9rem;margin-bottom:20px">${s.desc}</p>
                <span class="btn btn-primary btn-sm" style="margin:0 auto">Get Started -></span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `}async function Ad(){const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(s=>{s.addEventListener("click",()=>{var a;t.forEach(n=>n.classList.remove("active")),s.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(n=>n.classList.add("hidden")),(a=document.getElementById(`tab-${s.dataset.tab}`))==null||a.classList.remove("hidden")})});const e=X(),r=document.getElementById("tab-listings");if(!r||!(e!=null&&e.id))return;const i=Td(e);i.length&&fr(r,i,"Showing your recent submissions while live listings load.");try{const{stays:s,guides:a,transport:n}=await Sd(ks(e.id),xd,"Loading your listings timed out."),o=[...s.map(l=>ot(l,"stay")),...a.map(l=>ot(l,"guide")),...n.map(l=>ot(l,"transport"))];fr(r,o)}catch(s){if(console.error("Host dashboard error:",s),i.length){fr(r,i,"Live listings are taking longer than expected, so recent saved submissions are shown for now.");return}r.innerHTML=`
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        <div style="font-size:1rem;margin-bottom:8px">Could not load listings.</div>
        <div style="font-size:0.85rem">${s.message||"Please refresh and try again."}</div>
      </div>
    `}}function Id(){const t=z;return`
    <!-- Hero -->
    <section style="min-height:60vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1) 0%,var(--emerald-900) 60%,var(--bg2) 100%);padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 60% 40%,rgba(16,185,129,0.13),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">🌿 Our Story</div>
        <h1 style="font-size:clamp(2.4rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          About <span class="gradient-text">LushaiTrips</span>
        </h1>
        <p style="font-size:1.2rem;color:var(--text-muted);max-width:620px;line-height:1.8">
          Born in the misty hills of Mizoram, LushaiTrips is a homegrown platform built for curious travelers who dare to go beyond the beaten path — and for the local communities who call these hills home.
        </p>
        <div style="display:flex;gap:16px;margin-top:40px;flex-wrap:wrap">
          <a href="${t("/discover")}" class="btn btn-primary btn-lg" data-link>🗺️ Explore Destinations</a>
          <a href="${t("/contact")}" class="btn btn-secondary btn-lg" data-link>💬 Get In Touch</a>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center" class="about-split">
          <div>
            <div class="section-label">🎯 Our Mission</div>
            <h2 style="margin-bottom:20px">Putting Mizoram<br>On The Map</h2>
            <p style="color:var(--text-muted);line-height:1.9;margin-bottom:18px">
              Mizoram has always been one of India's best-kept secrets — lush forests, serene lakes, misty mountain peaks and the warmest people you'll ever meet. Yet it has long been overlooked by mainstream travel platforms.
            </p>
            <p style="color:var(--text-muted);line-height:1.9;margin-bottom:18px">
              We started LushaiTrips to change that. Our mission is simple: connect adventurous travelers with the authentic experiences, local hosts, and hidden gems of the Lushai Hills — all in one place.
            </p>
            <p style="color:var(--text-muted);line-height:1.9">
              Every booking you make directly supports a local homestay owner, a village guide, or a Mizo family running their own small business. <strong style="color:var(--text)">That's travel with purpose.</strong>
            </p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            ${[{num:"20+",label:"Hidden Destinations"},{num:"50+",label:"Happy Travelers"},{num:"15+",label:"Verified Local Hosts"},{num:"4.8★",label:"Average Rating"}].map(e=>`
              <div class="card card-body text-center" style="padding:32px 20px">
                <div style="font-size:2rem;font-weight:900;color:var(--emerald-400);margin-bottom:8px">${e.num}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">${e.label}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label text-center">💚 What We Stand For</div>
        <h2 class="text-center" style="margin-bottom:48px">Our Core Values</h2>
        <div class="grid-3">
          ${[{icon:"🌱",title:"Community First",desc:"We partner only with local hosts, guides, and service providers — ensuring every rupee you spend stays in the community."},{icon:"🔒",title:"Trust & Safety",desc:"Every listing on LushaiTrips is manually verified. We vet hosts, review feedback, and maintain quality standards you can rely on."},{icon:"🗺️",title:"Authentic Experiences",desc:"No cookie-cutter tours. We curate raw, real Mizoram — from hidden waterfalls to dawn treks with village elders."},{icon:"📱",title:"Simple & Accessible",desc:"Planning a trip shouldn't be complicated. We built a platform that works for first-time visitors and seasoned adventurers alike."},{icon:"♻️",title:"Responsible Tourism",desc:"We promote eco-conscious travel practices, low-impact activities, and respect for Mizoram's fragile ecosystems."},{icon:"💛",title:"Made in Mizoram",desc:"We are not a distant startup — we are your neighbours. Our team lives and breathes these hills, roads, and seasons."}].map(e=>`
            <div class="card card-body animate-in">
              <div style="font-size:2.5rem;margin-bottom:16px">${e.icon}</div>
              <h4 style="margin-bottom:10px">${e.title}</h4>
              <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.7">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section">
      <div class="container">
        <div class="section-label text-center">👥 The Team</div>
        <h2 class="text-center" style="margin-bottom:16px">People Behind LushaiTrips</h2>
        <p class="text-center" style="color:var(--text-muted);max-width:520px;margin:0 auto 48px;line-height:1.8">
          A small, passionate team of Mizoram natives, tech enthusiasts, and travel obsessives who believe the Northeast deserves the spotlight.
        </p>
        <div class="grid-3">
          ${[{emoji:"🧑‍💻",name:"Isak Roluahpuia",role:"Founder & Developer",desc:"A Mizo developer who built LushaiTrips from the ground up — because he got lost trying to find a homestay in Phawngpui and decided to fix that."},{emoji:"🏔️",name:"Zosangliana",role:"Head of Destinations",desc:"A trekking enthusiast who has mapped every trail in the Lushai Hills. He personally scouts and verifies every destination on the platform."},{emoji:"📸",name:"Lalmuanpuii",role:"Content & Photography",desc:"A visual storyteller capturing Mizoram's beauty one frame at a time — her shots are what make you instantly book a trip."}].map(e=>`
            <div class="card card-body text-center animate-in">
              <div style="font-size:4rem;margin-bottom:16px">${e.emoji}</div>
              <h4 style="margin-bottom:4px">${e.name}</h4>
              <div style="font-size:0.8rem;color:var(--emerald-400);font-weight:600;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.05em">${e.role}</div>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Ready to Explore Mizoram?</h2>
        <p style="margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;color:var(--text-muted)">
          Let's get you planning your next great adventure in the Lushai Hills.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${t("/surprise")}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${t("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .about-split { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
    </style>
  `}function Rd(){}function Pd(){const t=z;return`
    <!-- Hero -->
    <section style="min-height:55vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1),var(--emerald-900) 50%,var(--bg2));padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.12),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">&#x1F9ED; Traveler&apos;s Guide</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Travel Tips for <span class="gradient-text">Mizoram</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:600px;line-height:1.8">
          Everything first-time and returning visitors need to know before heading into the beautiful, mysterious Lushai Hills.
        </p>
      </div>
    </section>

    <!-- Quick Tips Banner -->
    <section style="background:var(--emerald-900);padding:24px 0;border-top:1px solid var(--glass-border);border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center">
          ${["Carry rain gear year-round","Expect limited signal in remote areas","Carry cash &mdash; ATMs are scarce outside Aizawl","Pack sturdy trekking shoes","Learn a few Mizo words &mdash; locals love it!","Sundays are quiet &mdash; most shops closed"].map(e=>`
            <span style="font-size:0.88rem;color:var(--emerald-200);display:flex;align-items:center;gap:6px">${e}</span>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Best Time to Visit -->
    <section class="section">
      <div class="container">
        <div class="section-label">&#x1F4C5; Planning Your Trip</div>
        <h2 style="margin-bottom:40px">Best Time to Visit Mizoram</h2>
        <div class="grid-4">
          ${[{season:"October &ndash; February",icon:"&#x2744;&#xFE0F;",label:"Best Season",color:"#10b981",desc:"Cool, clear skies. Perfect for trekking, sightseeing, and exploring all districts. Temperatures range from 11&deg;C to 24&deg;C."},{season:"March &ndash; May",icon:"&#x1F338;",label:"Good Season",color:"#f59e0b",desc:"Lush and warm before the rains. Anthurium and cherry blossoms bloom. Slightly humid but still very pleasant."},{season:"June &ndash; September",icon:"&#x1F327;&#xFE0F;",label:"Monsoon",color:"#6366f1",desc:"Heavy rainfall makes roads slippery. Waterfalls are dramatic and forests are lush green. For adventurous souls only."},{season:"Chapchar Kut (March)",icon:"&#x1F389;",label:"Festival Season",color:"#ec4899",desc:"Mizoram's biggest cultural festival. Traditional dances, food, and community celebrations across the state."}].map(e=>`
            <div class="card card-body animate-in" style="border-top:3px solid ${e.color}">
              <div style="font-size:2.2rem;margin-bottom:12px">${e.icon}</div>
              <div style="font-size:0.75rem;font-weight:700;color:${e.color};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">${e.label}</div>
              <h4 style="margin-bottom:10px;font-size:0.95rem">${e.season}</h4>
              <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.7">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Getting There -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">&#x2708;&#xFE0F; Getting There</div>
        <h2 style="margin-bottom:40px">How to Reach Mizoram</h2>
        <div class="grid-3">
          ${[{icon:"&#x2708;&#xFE0F;",title:"By Air",desc:"Lengpui Airport (AJL) near Aizawl has direct flights from Kolkata, Delhi, and Imphal via IndiGo, Air India, and SpiceJet. The airport is about 32km from the city centre."},{icon:"&#x1F682;",title:"By Train",desc:"Bairabi Railway Station (at the Assam-Mizoram border) is the closest railhead. From there, take a taxi or shared cab to Aizawl (~180km). Trains from Guwahati connect here."},{icon:"&#x1F68D;",title:"By Road",desc:"Well-connected by NH-306 from Silchar, Assam. State buses and private taxis operate regularly from Silchar, Guwahati, and Shillong. Expect scenic mountain roads."}].map(e=>`
            <div class="card card-body animate-in">
              <div style="font-size:2.5rem;margin-bottom:16px">${e.icon}</div>
              <h4 style="margin-bottom:12px">${e.title}</h4>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.8">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Inner Line Permit -->
    <section class="section" style="background:linear-gradient(135deg,rgba(245,158,11,0.08),var(--bg1))">
      <div class="container">
        <div style="max-width:780px;margin:0 auto">
          <div style="display:flex;align-items:flex-start;gap:24px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius);padding:32px">
            <div style="font-size:3rem;flex-shrink:0">&#x1F4CB;</div>
            <div>
              <h3 style="margin-bottom:12px;color:var(--amber)">Inner Line Permit (ILP)</h3>
              <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">
                <strong style="color:var(--text)">Indian citizens</strong> require an Inner Line Permit (ILP) to visit Mizoram. It is issued free of cost.
              </p>
              <ul style="color:var(--text-muted);line-height:2;padding-left:20px;margin-bottom:16px">
                <li>Apply online at <strong style="color:var(--text)">mizoram.gov.in</strong> or in person at Mizoram House offices in Delhi, Kolkata, Guwahati, or Silchar</li>
                <li>Valid for 15 days (extendable up to 6 months)</li>
                <li>Foreign nationals require a Protected Area Permit (PAP) &mdash; obtain from the Ministry of Home Affairs</li>
                <li>Always carry printed copies plus national ID proof</li>
              </ul>
              <a href="https://mizoram.gov.in" target="_blank" rel="noreferrer" class="btn btn-secondary btn-sm">&#x1F310; Visit Official Site &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Tips -->
    <section class="section">
      <div class="container">
        <div class="section-label">&#x1F4A1; Practical Essentials</div>
        <h2 style="margin-bottom:40px">Tips for a Smooth Trip</h2>
        <div class="grid-3">
          ${[{icon:"&#x1F4B5;",title:"Money &amp; ATMs",tips:["Carry enough cash &mdash; many rural areas have no ATMs","SBI and Axis Bank ATMs in Aizawl are most reliable","UPI accepted at bigger hotels and restaurants","Inform your bank before travelling to avoid card blocks"]},{icon:"&#x1F4F6;",title:"Connectivity",tips:["Airtel and Jio have the best coverage in Mizoram","BSNL works in remote areas where others fail","Download offline maps (Maps.me or Google Maps offline)","Satellite rentals available for deep jungle treks"]},{icon:"&#x1F37D;&#xFE0F;",title:"Food &amp; Drink",tips:["Vawksa rep (smoked pork) is a must-try Mizo dish","Bai (leafy greens with soda) is a local staple","Most restaurants serve Mizo, Indian and Chinese food","Always drink boiled or bottled water outside towns"]},{icon:"&#x1F3E8;",title:"Accommodation",tips:["Book at least a week in advance during Oct&ndash;Feb","Homestays offer the most authentic experience","Most stays include dinner and breakfast","LushaiTrips verified stays have 24h support"]},{icon:"&#x1F54C;",title:"Culture &amp; Customs",tips:["Mizoram is predominantly Christian &mdash; dress modestly","Sundays are quiet &mdash; plan grocery shopping on Saturday","Photography in villages requires permission","Always ask before entering someone's home"]},{icon:"&#x1FA7A;",title:"Health &amp; Meds",tips:["Carry basic first-aid and personal medicines","Malaria prophylaxis advised for jungle stays","Altitude sickness unlikely but stay hydrated","Nearest good hospital is at Aizawl Civil Hospital"]}].map(e=>`
            <div class="card card-body animate-in">
              <div style="font-size:2.2rem;margin-bottom:14px">${e.icon}</div>
              <h4 style="margin-bottom:14px">${e.title}</h4>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
                ${e.tips.map(r=>`<li style="font-size:0.85rem;color:var(--text-muted);display:flex;gap:8px;line-height:1.5"><span style="color:var(--emerald-400);flex-shrink:0">&#x2713;</span>${r}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Packing List -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">&#x1F392; What to Pack</div>
        <h2 style="margin-bottom:40px">The Mizoram Packing Checklist</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
          ${[{category:"&#x1F455; Clothing",items:["Light cotton clothes (Oct&ndash;May)","Warm layers &amp; jacket (Nov&ndash;Feb)","Waterproof rain jacket","Comfortable trekking pants","Quick-dry towel"]},{category:"&#x1F45F; Footwear &amp; Gear",items:["Sturdy trekking shoes/boots","Flip-flops or sandals","Waterproof daypack","UV protection sunglasses","Trekking poles (optional)"]},{category:"&#x1F48A; Medical &amp; Safety",items:["Personal medications","ORS sachets (hydration)","Insect repellent (DEET)","Hand sanitizer","Small first-aid kit"]},{category:"&#x1F4F1; Tech &amp; Documents",items:["Offline map downloaded","Portable charger (powerbank)","Indian ID proof","Printed ILP permit copy","Multi-plug adapter"]}].map(e=>`
            <div class="card card-body">
              <div style="font-size:1rem;font-weight:700;color:var(--emerald-400);margin-bottom:14px">${e.category}</div>
              ${e.items.map(r=>`<div style="font-size:0.85rem;color:var(--text-muted);padding:6px 0;border-bottom:1px solid var(--glass-border);display:flex;gap:8px"><span>&bull;</span>${r}</div>`).join("")}
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">All Set to Go?</h2>
        <p style="margin-bottom:32px;color:var(--text-muted);max-width:480px;margin-left:auto;margin-right:auto">
          Explore Mizoram&apos;s best destinations, book your stay, hire a local guide &mdash; all in one place.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${t("/surprise")}" class="btn btn-amber btn-lg" data-link>&#x1F3B2; Surprise Me</a>
          <a href="${t("/discover")}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
      </div>
    </section>
  `}function Cd(){}function Ld(){const t=z;return`
    <!-- Hero -->
    <section style="min-height:55vh;display:flex;align-items:center;background:linear-gradient(135deg,#0f1a16 0%,#0d2318 50%,#0f1a16 100%);padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.1),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">🛡️ Stay Safe Out There</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Mizoram <span class="gradient-text">Safety Guide</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:600px;line-height:1.8">
          Mizoram is one of India's safest states — but like any adventure destination, smart preparation ensures you have a smooth, worry-free experience.
        </p>
        <div style="display:flex;gap:20px;margin-top:36px;flex-wrap:wrap">
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:10px 20px;font-size:0.88rem;color:var(--emerald-300)">
            🏆 Ranked one of India's Top 5 Safest States
          </div>
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:10px 20px;font-size:0.88rem;color:var(--emerald-300)">
            💚 Low crime rate, high community spirit
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Contacts -->
    <section style="background:linear-gradient(135deg,rgba(239,68,68,0.08),var(--bg1));padding:48px 0;border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <h3 style="text-align:center;margin-bottom:32px;color:var(--text)">🆘 Emergency Contacts</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:900px;margin:0 auto">
          ${[{icon:"🚔",label:"Mizoram Police",num:"100"},{icon:"🚒",label:"Fire Service",num:"101"},{icon:"🚑",label:"Ambulance",num:"102"},{icon:"🏥",label:"National Emergency",num:"112"},{icon:"📞",label:"Tourist Helpline",num:"1800-345-3699"},{icon:"🌲",label:"Forest Dept. (Aizawl)",num:"0389-232-5000"}].map(e=>`
            <div class="card card-body text-center" style="border:1px solid rgba(239,68,68,0.2)">
              <div style="font-size:2rem;margin-bottom:8px">${e.icon}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:6px">${e.label}</div>
              <div style="font-size:1.4rem;font-weight:900;color:#f87171">${e.num}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- General Safety -->
    <section class="section">
      <div class="container">
        <div class="section-label">🔐 General Safety</div>
        <h2 style="margin-bottom:40px">Staying Safe in Mizoram</h2>
        <div class="grid-3">
          ${[{icon:"👮",title:"Law & Order",desc:"Mizoram consistently ranks among the safest Indian states with low violent crime. The Mizoram Police are approachable and helpful to tourists. Keep local police station numbers handy when heading to remote areas."},{icon:"🌃",title:"Night Safety",desc:"Aizawl and major towns are very safe at night. Avoid isolated mountain trails after dark. In villages, inform your host of your plans. Carry a torch/flashlight when walking unlit paths."},{icon:"👰",title:"Women Travelers",desc:"Mizoram is one of the safest destinations for solo women travelers in India. The Mizo culture is deeply respectful. Basic precautions apply — share your itinerary with someone you trust and avoid late solo treks."},{icon:"📲",title:"Stay Connected",desc:"Share your daily itinerary with family or friends. Save emergency contacts offline. WhatsApp location sharing is a simple but effective safety net. Check in regularly when in remote areas."},{icon:"🎒",title:"Valuables",desc:"Petty theft is minimal but always lock your accommodation and use hotel safes for passports and cash. Don't display expensive cameras or jewelry on crowded market days. Keep copies of documents in cloud storage."},{icon:"🚗",title:"Road Safety",desc:"Mountain roads can be narrow and winding. Only hire experienced local drivers. Avoid night driving on mountain roads. Roads can close due to landslides during monsoon — always check conditions before travelling."}].map(e=>`
            <div class="card card-body animate-in">
              <div style="font-size:2.2rem;margin-bottom:16px">${e.icon}</div>
              <h4 style="margin-bottom:10px">${e.title}</h4>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Health & Medical -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">🩺 Health & Medical</div>
        <h2 style="margin-bottom:40px">Health Precautions</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start" class="safety-grid">
          <div>
            <h4 style="margin-bottom:20px;color:var(--emerald-400)">Before You Travel</h4>
            ${[{icon:"💉",tip:"Consult your doctor about vaccinations — Hepatitis A, Typhoid, and Tetanus are generally recommended for travel to Northeast India."},{icon:"🦟",tip:"Malaria is present in some forested areas. Take prophylaxis if staying in jungle camps. Use DEET-based insect repellent."},{icon:"📋",tip:"Carry adequate supplies of all prescription medications. Medical stores in remote areas may not stock specific brands."},{icon:"🏥",tip:"Get travel medical insurance that covers emergency evacuation — the nearest major hospitals may be hours away from remote sites."}].map(e=>`
              <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start">
                <div style="font-size:1.8rem;flex-shrink:0">${e.icon}</div>
                <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7;margin:0">${e.tip}</p>
              </div>
            `).join("")}
          </div>
          <div>
            <h4 style="margin-bottom:20px;color:var(--emerald-400)">While You're There</h4>
            ${[{icon:"💧",tip:"Always drink boiled or bottled water. Avoid ice at small roadside eateries. Carry a water purification bottle for long treks."},{icon:"🍱",tip:"Street food is generally safe in Mizoram. Eat freshly cooked food. Avoid raw vegetables or salads unless you know the source."},{icon:"☀️",tip:"Sun exposure can be intense at higher altitudes. Use SPF 50+ sunscreen, wear a hat, and stay hydrated — especially on treks."},{icon:"🌡️",tip:"Altitude change while moving between districts can cause mild headaches or fatigue. Rest, hydrate, and acclimatize gradually."}].map(e=>`
              <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start">
                <div style="font-size:1.8rem;flex-shrink:0">${e.icon}</div>
                <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7;margin:0">${e.tip}</p>
              </div>
            `).join("")}
          </div>
        </div>
        <div style="margin-top:32px;background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
          <h4 style="margin-bottom:12px">🏥 Key Hospitals in Mizoram</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">
            ${[{name:"Aizawl Civil Hospital",loc:"Aizawl (Main)",phone:"0389-232-1060"},{name:"Zoram Medical College",loc:"Falkawn, Aizawl",phone:"0389-232-5000"},{name:"Lawngtlai District Hospital",loc:"South Mizoram",phone:"03835-22003"},{name:"Lunglei Civil Hospital",loc:"Lunglei District",phone:"03372-322-400"}].map(e=>`
              <div style="font-size:0.83rem">
                <div style="font-weight:700;color:var(--text);margin-bottom:2px">${e.name}</div>
                <div style="color:var(--text-muted)">${e.loc} · ${e.phone}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <!-- Trekking Safety -->
    <section class="section">
      <div class="container">
        <div class="section-label">🥾 Adventure Safety</div>
        <h2 style="margin-bottom:40px">Trekking & Outdoor Safety</h2>
        <div class="grid-4">
          ${[{icon:"🗺️",title:"Always Carry a Map",desc:"Download offline maps before heading into the hills. Many trails are unmarked and GPS signal can be weak in dense forest cover."},{icon:"🧭",title:"Hire Local Guides",desc:"For any trek beyond 5km into the wilderness, hire a LushaiTrips verified local guide. They know alternate routes, weather patterns, and emergency procedures."},{icon:"🌤️",title:"Check Weather",desc:"Mountain weather changes rapidly. Check forecasts at accuweather.com before heading out. Do not trek alone during monsoon season (June–Sept)."},{icon:"📣",title:"Tell Someone",desc:"Always inform your homestay host or a friend about your trekking plan — route, estimated return time, and who to call if you don't check in."}].map(e=>`
            <div class="card card-body animate-in">
              <div style="font-size:2rem;margin-bottom:14px">${e.icon}</div>
              <h4 style="margin-bottom:10px;font-size:0.95rem">${e.title}</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);line-height:1.7">${e.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Cultural Safety -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">🕊️ Cultural Etiquette</div>
        <h2 style="margin-bottom:32px">Respecting Local Culture</h2>
        <div style="max-width:780px;margin:0 auto;display:flex;flex-direction:column;gap:16px">
          ${[{do:!0,text:"Dress modestly, especially when visiting churches or entering villages. Avoid sleeveless or revealing clothing in rural areas."},{do:!0,text:"Ask permission before taking photographs of locals, their homes, or during religious events. Most Mizos are happy to pose — just ask first."},{do:!0,text:"Remove your shoes before entering homes and some guesthouses — watch for cues or ask your host."},{do:!1,text:"Do not consume alcohol in dry zones or offer it to locals without knowing whether they drink. Mizoram has a strong church community."},{do:!1,text:"Do not make comments disrespecting Mizo culture, Christianity, or local customs. The community is close-knit and proud of their heritage."},{do:!1,text:"Do not litter, pick wildflowers, or disturb wildlife in protected areas. Always carry your trash out of trekking sites."}].map(e=>`
            <div style="display:flex;gap:16px;align-items:flex-start;background:var(--glass);border:1px solid var(--glass-border);border-left:3px solid ${e.do?"var(--emerald-500)":"#f87171"};border-radius:var(--radius);padding:16px 20px">
              <div style="font-size:1.2rem;flex-shrink:0">${e.do?"✅":"❌"}</div>
              <p style="margin:0;font-size:0.9rem;color:var(--text-muted);line-height:1.7">${e.text}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Have Questions About Safety?</h2>
        <p style="margin-bottom:32px;color:var(--text-muted);max-width:480px;margin-left:auto;margin-right:auto">
          Our team is from Mizoram and happy to answer any concerns about your trip — just reach out.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${t("/contact")}" class="btn btn-primary btn-lg" data-link>💬 Contact Us</a>
          <a href="${t("/travel-tips")}" class="btn btn-secondary btn-lg" data-link>📖 Travel Tips</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .safety-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `}function Od(){}function jd(){return`
    <!-- Hero -->
    <section style="min-height:50vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1),var(--emerald-900) 50%,var(--bg2));padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.12),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1;text-align:center">
        <div class="section-label">📬 We'd Love to Hear From You</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Contact <span class="gradient-text">LushaiTrips</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:560px;margin:0 auto;line-height:1.8">
          Got questions, feedback, or partnership ideas? We're a small team and we actually read every message — reach out and we'll get back to you fast.
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start" class="contact-split">

          <!-- Info -->
          <div>
            <div class="section-label">📡 Reach Us</div>
            <h2 style="margin-bottom:32px">Get In Touch</h2>
            <div style="display:flex;flex-direction:column;gap:24px">
              ${[{icon:"📧",title:"Email",detail:"hello@lushaitrips.com",sub:"We reply within 24 hours on weekdays",href:"mailto:hello@lushaitrips.com"},{icon:"📱",title:"WhatsApp",detail:"+91 98620 XXXXX",sub:"Quickest way to reach us for travel queries",href:"#"},{icon:"📍",title:"Office",detail:"Aizawl, Mizoram 796001, India",sub:"Walk-in visits by appointment only",href:"#"},{icon:"🕐",title:"Support Hours",detail:"Mon–Sat: 9am – 7pm IST",sub:"Sundays: Limited — we observe the Sabbath 🙏",href:null}].map(t=>`
                <div style="display:flex;gap:20px;align-items:flex-start">
                  <div style="width:48px;height:48px;border-radius:12px;background:var(--emerald-900);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">${t.icon}</div>
                  <div>
                    <div style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">${t.title}</div>
                    ${t.href&&t.href!=="#"?`<a href="${t.href}" style="font-weight:700;font-size:1rem;color:var(--emerald-400);text-decoration:none">${t.detail}</a>`:`<div style="font-weight:700;font-size:1rem;color:var(--text)">${t.detail}</div>`}
                    <div style="font-size:0.83rem;color:var(--text-muted);margin-top:2px">${t.sub}</div>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Social -->
            <div style="margin-top:40px">
              <div style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px">Follow Us</div>
              <div style="display:flex;gap:12px">
                ${[{icon:"📘",label:"Facebook",href:"#"},{icon:"📸",label:"Instagram",href:"#"},{icon:"🐦",label:"Twitter / X",href:"#"},{icon:"▶️",label:"YouTube",href:"#"}].map(t=>`
                  <a href="${t.href}" title="${t.label}" style="width:44px;height:44px;background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-800)';this.style.borderColor='var(--emerald-600)'" onmouseout="this.style.background='var(--glass)';this.style.borderColor='var(--glass-border)'">${t.icon}</a>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <div class="card card-body" style="padding:40px">
              <h3 style="margin-bottom:8px">Send Us a Message</h3>
              <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:28px">We'll reply to your email within one business day.</p>
              <form id="contact-form" style="display:flex;flex-direction:column;gap:18px">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                  <div>
                    <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">First Name *</label>
                    <input id="contact-first" type="text" required placeholder="Lalremruata" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                  </div>
                  <div>
                    <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Last Name</label>
                    <input id="contact-last" type="text" placeholder="Pachuau" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                  </div>
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Email Address *</label>
                  <input id="contact-email" type="email" required placeholder="you@example.com" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Subject</label>
                  <select id="contact-subject" style="width:100%;background:var(--bg2);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box">
                    <option value="">Select a topic…</option>
                    <option value="booking">Booking Help</option>
                    <option value="hosting">Become a Host</option>
                    <option value="refund">Refund / Cancellation</option>
                    <option value="safety">Safety Concern</option>
                    <option value="partnership">Partnership / Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Your Message *</label>
                  <textarea id="contact-message" required rows="5" placeholder="Tell us how we can help…" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;box-sizing:border-box"></textarea>
                </div>
                <button type="submit" id="contact-submit" class="btn btn-primary" style="width:100%;justify-content:center">
                  📨 Send Message
                </button>
                <div id="contact-success" style="display:none;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:14px;text-align:center;font-size:0.9rem;color:var(--emerald-400)">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label text-center">❓ Common Questions</div>
        <h2 class="text-center" style="margin-bottom:40px">Frequently Asked Questions</h2>
        <div style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px" id="faq-list">
          ${[{q:"How do I book a stay on LushaiTrips?",a:"Browse stays on our platform, click the listing you like, choose your dates and number of guests, and complete the booking form. You'll receive a confirmation email and the host's contact details."},{q:"Can I cancel my booking?",a:"Yes. Our standard cancellation policy allows free cancellation up to 72 hours before check-in. After that, a 50% cancellation charge applies. Each host may also have additional policies listed on their page."},{q:"I'm a host — how do I list my property?",a:'Click "Become a Host" in the navigation, choose your listing type (stay, guide, or transport), fill out the details, and our team will review and approve your listing within 2 business days.'},{q:"Is LushaiTrips safe for solo women travelers?",a:"Mizoram is one of the safest states in India for solo women travelers. All our hosts are verified, and we include safety tips and emergency contact information in every booking confirmation."},{q:"What payment methods do you accept?",a:"We accept all major UPI apps (PhonePe, GPay, Paytm), debit/credit cards, and net banking via Razorpay. International cards (Visa, Mastercard) are also accepted."},{q:"Do I need an Inner Line Permit?",a:"Yes — Indian citizens must obtain a free ILP before visiting Mizoram. You can apply at mizoram.gov.in or at Mizoram House offices in major cities. Foreign nationals need a Protected Area Permit from the MHA."}].map((t,e)=>`
            <div class="faq-item" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);overflow:hidden">
              <button class="faq-toggle" data-idx="${e}" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:none;border:none;color:var(--text);font-size:0.95rem;font-weight:600;cursor:pointer;text-align:left;gap:12px">
                <span>${t.q}</span>
                <span class="faq-arrow" style="font-size:1rem;flex-shrink:0;transition:transform 0.25s">▼</span>
              </button>
              <div class="faq-body" style="display:none;padding:0 22px 18px;font-size:0.88rem;color:var(--text-muted);line-height:1.8">${t.a}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .contact-split { grid-template-columns: 1fr !important; }
      }
    </style>
  `}function zd(){var t;(t=document.getElementById("contact-form"))==null||t.addEventListener("submit",e=>{e.preventDefault();const r=document.getElementById("contact-submit");r.disabled=!0,r.textContent="⏳ Sending…",setTimeout(()=>{document.getElementById("contact-success").style.display="block",document.getElementById("contact-form").reset(),r.disabled=!1,r.textContent="📨 Send Message"},1200)}),document.querySelectorAll(".faq-toggle").forEach(e=>{e.addEventListener("click",()=>{const r=e.nextElementSibling,i=e.querySelector(".faq-arrow"),s=r.style.display==="block";document.querySelectorAll(".faq-body").forEach(a=>a.style.display="none"),document.querySelectorAll(".faq-arrow").forEach(a=>a.style.transform=""),s||(r.style.display="block",i.style.transform="rotate(180deg)")})}),document.querySelectorAll("#contact-form input, #contact-form textarea, #contact-form select").forEach(e=>{e.addEventListener("focus",()=>e.style.borderColor="var(--emerald-500)"),e.addEventListener("blur",()=>e.style.borderColor="var(--glass-border)")})}function Bd(){const t=z;return`
    <!-- Hero -->
    <section style="padding:120px 0 60px;background:linear-gradient(135deg,var(--bg1),var(--bg2));border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div class="section-label">🔒 Legal</div>
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:16px">Privacy Policy</h1>
        <p style="color:var(--text-muted);font-size:0.95rem">Last updated: <strong style="color:var(--text)">April 6, 2026</strong></p>
        <p style="color:var(--text-muted);max-width:580px;margin-top:12px;line-height:1.8">
          Your privacy matters to us. This policy explains what data LushaiTrips collects, how we use it, and how we protect it. We keep this plain-language — no legalese.
        </p>
      </div>
    </section>

    <!-- Table of Contents -->
    <section style="padding:32px 0;background:var(--bg2);border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          ${["Information We Collect","How We Use Your Data","Data Sharing","Cookies","Data Security","Your Rights","Third-Party Services","Children's Privacy","Changes to Policy","Contact"].map((r,i)=>`
            <a href="#section-${i+1}" style="font-size:0.83rem;background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:6px 14px;color:var(--text-muted);text-decoration:none;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-900)';this.style.color='var(--emerald-300)'" onmouseout="this.style.background='var(--glass)';this.style.color='var(--text-muted)'">${i+1}. ${r}</a>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container">
        <div style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:48px">

          <!-- Intro box -->
          <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px">
            <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.8;margin:0">
              <strong style="color:var(--emerald-400)">TL;DR:</strong> We collect only what's needed to run the platform. We never sell your data. You can request deletion at any time. We use Supabase for authentication and Razorpay for payments — both are industry-grade secure platforms.
            </p>
          </div>

          <!-- Sections -->
          ${[{id:1,icon:"📊",title:"Information We Collect",content:`
                <p>We collect the following types of information when you use LushaiTrips:</p>
                <h4 style="margin:20px 0 10px;font-size:1rem">📌 Information You Provide</h4>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">Account Info</strong> — Name, email address, and profile picture when you sign up via email or Google OAuth.</li>
                  <li><strong style="color:var(--text)">Booking Info</strong> — Check-in dates, guest count, and contact details when making a reservation.</li>
                  <li><strong style="color:var(--text)">Host Info</strong> — Property details, pricing, photos, ID documents, and bank account information for verified hosts.</li>
                  <li><strong style="color:var(--text)">Messages & Reviews</strong> — Any messages sent through our platform or reviews you leave for hosts.</li>
                </ul>
                <h4 style="margin:20px 0 10px;font-size:1rem">📌 Information Collected Automatically</h4>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">Device & Browser Data</strong> — IP address, browser type, operating system, and referring URL (via standard server logs).</li>
                  <li><strong style="color:var(--text)">Usage Data</strong> — Pages visited, time spent, clicks, and navigation patterns to improve our service.</li>
                  <li><strong style="color:var(--text)">Cookies</strong> — Session cookies for authentication; analytics cookies for understanding traffic (see Section 4).</li>
                </ul>
              `},{id:2,icon:"⚙️",title:"How We Use Your Data",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We use your information to:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li>Create and manage your LushaiTrips account</li>
                  <li>Process bookings and facilitate payments via Razorpay</li>
                  <li>Connect you with hosts, guides, and transport providers</li>
                  <li>Send booking confirmations, receipts, and trip reminders by email</li>
                  <li>Let you review your experiences and help other travelers</li>
                  <li>Respond to customer support messages and enquiries</li>
                  <li>Improve platform features based on usage patterns</li>
                  <li>Detect and prevent fraud or platform abuse</li>
                  <li>Send optional newsletters and destination updates (opt-out any time)</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">We will never use your data for purposes beyond the above without obtaining your explicit consent first.</p>
              `},{id:3,icon:"🤝",title:"Data Sharing",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px"><strong style="color:var(--text)">We do not sell your personal data.</strong> Full stop.</p>
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We share data only in these limited circumstances:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">With Hosts:</strong> When you book a stay or guide, we share your name and contact number with the host to coordinate your trip.</li>
                  <li><strong style="color:var(--text)">With Razorpay:</strong> Your payment information is processed directly by Razorpay (PCI DSS Level 1 compliant). We do not store your card details.</li>
                  <li><strong style="color:var(--text)">With Supabase:</strong> Our backend database and auth provider (SOC 2 Type II certified). Your data is encrypted at rest and in transit.</li>
                  <li><strong style="color:var(--text)">Legal Requirements:</strong> We may disclose data if required by law, court order, or to protect the safety of users or the public.</li>
                </ul>
              `},{id:4,icon:"🍪",title:"Cookies",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We use cookies for the following purposes:</p>
                <div style="display:flex;flex-direction:column;gap:12px">
                  ${[{type:"Essential Cookies",desc:"Required for authentication and keeping you logged in. Cannot be disabled.",required:!0},{type:"Analytics Cookies",desc:"Help us understand how visitors use the site (page views, session duration). Used only in aggregate. Can be opted out.",required:!1},{type:"Preference Cookies",desc:"Remember your settings such as preferred language or filters. Optional.",required:!1}].map(r=>`
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:14px 18px;gap:16px">
                      <div>
                        <div style="font-weight:700;font-size:0.9rem;margin-bottom:4px">${r.type}</div>
                        <div style="font-size:0.83rem;color:var(--text-muted);line-height:1.6">${r.desc}</div>
                      </div>
                      <div style="flex-shrink:0;font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:50px;background:${r.required?"rgba(239,68,68,0.15)":"rgba(16,185,129,0.15)"};color:${r.required?"#f87171":"var(--emerald-400)"}">${r.required?"Required":"Optional"}</div>
                    </div>
                  `).join("")}
                </div>
              `},{id:5,icon:"🔐",title:"Data Security",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We take security seriously and implement the following measures:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li>All data is transmitted over <strong style="color:var(--text)">HTTPS/TLS encryption</strong></li>
                  <li>Passwords are hashed using industry-standard bcrypt algorithms — we never store plaintext passwords</li>
                  <li>Supabase encrypts all data at rest using AES-256</li>
                  <li>Google OAuth login means we never handle your Google password</li>
                  <li>Payment data is handled exclusively by Razorpay — we store only transaction IDs, not card details</li>
                  <li>Access to production databases is restricted to core team members on a need-to-know basis</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">Despite these measures, no internet transmission can be 100% secure. If you discover a security vulnerability, please report it responsibly to <strong style="color:var(--text)">security@lushaitrips.com</strong>.</p>
              `},{id:6,icon:"⚖️",title:"Your Rights",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">Under applicable Indian and international data protection laws, you have the right to:</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  ${[{icon:"👁️",right:"Access your data",desc:"Request a copy of all personal data we hold about you"},{icon:"✏️",right:"Correct your data",desc:"Update inaccurate or incomplete personal information"},{icon:"🗑️",right:"Delete your data",desc:"Request deletion of your account and associated data"},{icon:"📦",right:"Data portability",desc:"Receive your data in a machine-readable format"},{icon:"🚫",right:"Withdraw consent",desc:"Opt out of marketing emails or optional data processing"},{icon:"📩",right:"Lodge a complaint",desc:"Contact us or your national data protection authority"}].map(r=>`
                    <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:14px">
                      <div style="font-size:1.2rem;margin-bottom:6px">${r.icon}</div>
                      <div style="font-weight:700;font-size:0.88rem;margin-bottom:4px">${r.right}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${r.desc}</div>
                    </div>
                  `).join("")}
                </div>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:20px">To exercise any of these rights, email us at <strong style="color:var(--text)">privacy@lushaitrips.com</strong>. We will respond within 30 days.</p>
              `},{id:7,icon:"🔗",title:"Third-Party Services",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">LushaiTrips uses the following trusted third-party services:</p>
                <div style="display:flex;flex-direction:column;gap:10px">
                  ${[{name:"Supabase",purpose:"Authentication, database, and file storage",link:"https://supabase.com/privacy"},{name:"Razorpay",purpose:"Payment processing",link:"https://razorpay.com/privacy/"},{name:"Google OAuth",purpose:"Social login via Google accounts",link:"https://policies.google.com/privacy"},{name:"Leaflet / OpenStreetMap",purpose:"Map rendering (no personal data shared)",link:"https://www.openstreetmap.org/privacy"}].map(r=>`
                    <div style="display:flex;justify-content:space-between;align-items:center;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:12px 16px;gap:12px;flex-wrap:wrap">
                      <div>
                        <div style="font-weight:700;font-size:0.9rem">${r.name}</div>
                        <div style="font-size:0.8rem;color:var(--text-muted)">${r.purpose}</div>
                      </div>
                      <a href="${r.link}" target="_blank" rel="noreferrer" style="font-size:0.78rem;color:var(--emerald-400);text-decoration:none;white-space:nowrap">Privacy Policy →</a>
                    </div>
                  `).join("")}
                </div>
              `},{id:8,icon:"🧒",title:"Children's Privacy",content:`
                <p style="color:var(--text-muted);line-height:1.8">LushaiTrips is not intended for children under the age of <strong style="color:var(--text)">18 years</strong>. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <strong style="color:var(--text)">privacy@lushaitrips.com</strong> and we will take immediate steps to remove the data.</p>
              `},{id:9,icon:"📝",title:"Changes to This Policy",content:`
                <p style="color:var(--text-muted);line-height:1.8">We may update this Privacy Policy from time to time. When we do, we will:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px;margin-top:12px">
                  <li>Update the "Last Updated" date at the top of this page</li>
                  <li>Send an email notification to registered users if the changes are significant</li>
                  <li>Post a notice on the LushaiTrips homepage for 30 days if changes are material</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">Continued use of the platform after changes are posted constitutes acceptance of the updated policy.</p>
              `},{id:10,icon:"📬",title:"Contact",content:`
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">For any privacy-related queries, requests, or concerns:</p>
                <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
                  <p style="font-weight:700;font-size:1rem;margin-bottom:10px">LushaiTrips — Privacy Team</p>
                  <p style="color:var(--text-muted);font-size:0.9rem;line-height:2">
                    📧 Email: <strong style="color:var(--text)">privacy@lushaitrips.com</strong><br>
                    📍 Address: Aizawl, Mizoram 796001, India<br>
                    🕐 Response time: Within 30 calendar days
                  </p>
                </div>
              `}].map(r=>`
            <div id="section-${r.id}" style="scroll-margin-top:90px">
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                <div style="width:44px;height:44px;border-radius:12px;background:var(--emerald-900);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${r.icon}</div>
                <h2 style="font-size:1.4rem;margin:0">${r.id}. ${r.title}</h2>
              </div>
              <div style="padding-left:60px;color:var(--text-muted);font-size:0.9rem;line-height:1.8">
                ${r.content}
              </div>
              ${r.id<10?'<div style="height:1px;background:var(--glass-border);margin-top:48px"></div>':""}
            </div>
          `).join("")}

        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section style="padding:48px 0;background:var(--bg2);border-top:1px solid var(--glass-border)">
      <div class="container text-center">
        <p style="color:var(--text-muted);margin-bottom:20px">Questions about your privacy?</p>
        <a href="${t("/contact")}" class="btn btn-primary" data-link>📬 Contact Our Privacy Team</a>
      </div>
    </section>
  `}function Nd(){}const zi={"/":{render:ta,init:ra,footer:!0},"/discover":{render:sa,init:aa,footer:!0},"/surprise":{render:pa,init:ma,footer:!0},"/stays":{render:Dl,init:Hl,footer:!0},"/guides":{render:Zl,init:Ql,footer:!0},"/transport":{render:dc,init:uc,footer:!0},"/booking-confirmed":{render:vc,init:yc,footer:!1},"/login":{render:xc,init:kc,footer:!1},"/signup-user":{render:_c,init:Sc,footer:!1},"/host-signup-stay":{render:Tc,init:js,footer:!1},"/host-signup-guide":{render:Kc,init:Jc,footer:!1},"/host-signup-transport":{render:vd,init:yd,footer:!1},"/profile":{render:bd,init:wd,footer:!0},"/host-dashboard":{render:$d,init:Ad,footer:!0},"/about":{render:Id,init:Rd,footer:!0},"/travel-tips":{render:Pd,init:Cd,footer:!0},"/safety-guide":{render:Ld,init:Od,footer:!0},"/contact":{render:jd,init:zd,footer:!0},"/privacy-policy":{render:Bd,init:Nd,footer:!0}};function Ud(t){if(zi[t])return{route:zi[t],params:{}};if(t.startsWith("/destination/")){const e=t.slice(13);return{route:{render:()=>ya(e),init:()=>ba(e),footer:!0},params:{id:e}}}if(t.startsWith("/stay/")){const e=t.slice(6);return{route:{render:()=>Fl(),init:()=>Wl(e),footer:!0},params:{id:e}}}if(t.startsWith("/guide/")){const e=t.slice(7);return{route:{render:()=>ec(e),init:()=>tc(e),footer:!0},params:{id:e}}}if(t.startsWith("/transport/")){const e=t.slice(11);return{route:{render:()=>hc(e),init:()=>pc(e),footer:!0},params:{id:e}}}if(t.startsWith("/book/")){const e=t.slice(6);return{route:{render:()=>null,init:()=>null,footer:!1,booking:e},params:{id:e}}}return{route:{render:()=>`<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px"><div><div style="font-size:5rem;margin-bottom:16px">🗺️</div><h1 style="margin-bottom:12px">Page Not Found</h1><p style="margin-bottom:24px;color:var(--text-muted)">Looks like this trail doesn't exist.</p><a href="${z("/")}" class="btn btn-primary" data-link>Back to Home</a></div></div>`,init:()=>{},footer:!0},params:{}}}function Md(t){const e=t.trim(),r=e.indexOf("?"),i=r>=0?e.slice(0,r):e,s=r>=0?e.slice(r):"",a="/LushaiTrips/".replace(/\/$/,"");return!!a&&(i===a||i.startsWith(`${a}/`))?i+s:z(i)+s}async function qs(t){const e=Md(t),r=new URL(e,window.location.origin);history.pushState({},"",r.pathname+r.search+r.hash),await Gr(lt(r.pathname),r.searchParams)}async function Gr(t,e=new URLSearchParams){var a;const r=document.getElementById("page-content"),i=document.getElementById("footer-container");if(t.startsWith("/book/")){const n=t.slice(6);r.innerHTML=gc(n,e),i.innerHTML="",Yr(),Bi(),fc(n,e),Jr();return}const{route:s}=Ud(t);Yr(),r.innerHTML=s.render()||"",s.footer?Xs():i.innerHTML="",Bi(),(a=s.init)==null||a.call(s),Jr()}function Bi(){document.querySelectorAll("[data-link]").forEach(t=>{t.removeEventListener("click",Ni),t.addEventListener("click",Ni)})}function Ni(t){t.preventDefault();const e=t.currentTarget.getAttribute("href");e&&e!=="#"&&qs(e)}window.router={navigate:qs};window.addEventListener("popstate",()=>{Gr(lt(location.pathname),new URLSearchParams(location.search))});Gr(lt(location.pathname),new URLSearchParams(location.search));
