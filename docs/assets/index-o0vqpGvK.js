(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const wa="modulepreload",xa=function(t){return"/LushaiTrips/"+t},mi={},_t=function(e,r,i){let s=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),o=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(r.map(l=>{if(l=xa(l),l in mi)return;mi[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":wa,c||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),c)return new Promise((h,p)=>{d.addEventListener("load",h),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(n){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n}return s.then(n=>{for(const o of n||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};function M(t){const e=t.startsWith("/")?t:`/${t}`;return e==="/"?"/LushaiTrips/":`${"/LushaiTrips/".replace(/\/$/,"")}${e}`}function pt(t){const e="/LushaiTrips/".replace(/\/$/,"");return e?t===e||t===`${e}/`?"/":t.startsWith(`${e}/`)?t.slice(e.length)||"/":t||"/":t||"/"}const N={get:t=>{try{return JSON.parse(localStorage.getItem(t))}catch{return null}},set:(t,e)=>localStorage.setItem(t,JSON.stringify(e)),remove:t=>localStorage.removeItem(t)};function se(){return N.get("lt_user")}function Ye(t){N.set("lt_user",t)}function Ir(){N.remove("lt_user"),window.router.navigate("/")}function mt(){return!!se()}function ka(t){var i;const e=N.get("lt_users")||[];if(e.find(s=>s.email===t.email))throw new Error("Email already registered");const r={...t,id:Date.now(),role:"user",createdAt:new Date().toISOString(),avatar:(i=t.fullName)==null?void 0:i.charAt(0).toUpperCase()};return e.push(r),N.set("lt_users",e),Ye(r),r}function _a(t,e){const i=(N.get("lt_users")||[]).find(s=>s.email===t&&s.password===e);if(!i)throw new Error("Invalid email or password");return Ye(i),i}async function Pr(){try{const{getCurrentUser:t}=await _t(async()=>{const{getCurrentUser:r}=await Promise.resolve().then(()=>ir);return{getCurrentUser:r}},void 0),e=await t();return e?Ye(e):N.remove("lt_user"),e}catch(t){return console.warn("[refreshUserCache]",t.message),null}}function Wt(t){return(N.get("lt_reviews")||[]).filter(r=>r.listingId===t)}function ns(t){const e=N.get("lt_reviews")||[],r={...t,id:Date.now(),createdAt:new Date().toISOString()};return e.unshift(r),N.set("lt_reviews",e),r}function Sa(t){const e=N.get("lt_bookings")||[],r={...t,id:`LT-${Date.now()}`,status:"confirmed",createdAt:new Date().toISOString()};return e.unshift(r),N.set("lt_bookings",e),N.set("lt_last_booking",r),r}function Ea(){const t=se();return t?(N.get("lt_bookings")||[]).filter(r=>r.userId===t.id):[]}function $a(){return N.get("lt_last_booking")}function ei(){return N.get("lt_wishlist")||[]}function os(t){const e=ei(),r=e.indexOf(t);return r===-1?e.push(t):e.splice(r,1),N.set("lt_wishlist",e),e.includes(t)}function ls(t){return ei().includes(t)}function S(t,e="",r="success"){let i=document.querySelector(".toast");i||(i=document.createElement("div"),i.className="toast",document.body.appendChild(i)),i.className=`toast ${r}`,i.innerHTML=`<div class="toast-title">${r==="success"?"✅":"❌"} ${t}</div>${e?`<div class="toast-msg">${e}</div>`:""}`,i.classList.add("show"),setTimeout(()=>i.classList.remove("show"),4e3)}function Y(t){return Array.from({length:5},(e,r)=>`<span style="color:${r<Math.round(t)?"#fbbf24":"#334155"};font-size:0.9rem">★</span>`).join("")}function cs(t){return t.length?(t.reduce((e,r)=>e+r.rating,0)/t.length).toFixed(1):0}function gi(){window.scrollTo({top:0,behavior:"smooth"})}function cr(){var a,n,o;const t=document.getElementById("navbar-container"),e=se(),r=M;t.innerHTML=`
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
    `,document.body.appendChild(l),l.querySelectorAll("[data-link]").forEach(u=>{u.addEventListener("click",d=>{d.preventDefault(),window.router.navigate(u.getAttribute("href")),l.remove()})}),setTimeout(()=>document.addEventListener("click",()=>l.remove(),{once:!0}),100),(c=l.querySelector("#dd-logout"))==null||c.addEventListener("click",()=>{Ir()})}),(o=document.getElementById("mobile-logout"))==null||o.addEventListener("click",l=>{l.preventDefault(),Ir()});const i=pt(location.pathname);document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(l=>{const c=l.getAttribute("href");if(!c||c==="#")return;pt(new URL(c,window.location.origin).pathname)===i&&l.classList.add("active")})}function Ta(){const t=document.getElementById("footer-container"),e=M;t.innerHTML=`
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
          <p>© 2026 LushaiTrips. Made with 💚 in Mizoram, India. | Maps by <strong>Leaflet</strong></p>
        </div>
      </div>
    </footer>
  `}const Aa=[{id:"vantawng-falls",name:"Vantawng Falls",tagline:"India's tallest waterfall in Mizoram",type:"waterfall",tags:["adventure","nature","waterfall"],difficulty:"Moderate",district:"Serchhip",lat:23.0932,lng:92.7534,rating:4.8,reviews:124,coverImage:"/images/2018080738-1024x576.jpg",images:["/images/2018080738-1024x576.jpg","/images/2019072384.jpg","/images/View-of-Vantawng-Waterfall-Cover-Photo-840x425.jpg"],description:"Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India. Surrounded by lush subtropical forests and mist, this is a must-visit for nature lovers and adventure seekers alike.",highlights:["750-ft plunge pool","Jungle trek","Wildlife sightings","Photography paradise"],bestTime:"October – March",nearbyAttractions:["Serchhip town","Tuirial River","Local bamboo villages"],duration:"1-2 days",category:"adventure"},{id:"phawngpui-peak",name:"Phawngpui Peak",tagline:"Blue Mountain — the highest point in Mizoram",type:"mountain",tags:["adventure","trekking","scenic"],difficulty:"Hard",district:"Lawngtlai",lat:22.4869,lng:93.0248,rating:4.9,reviews:87,coverImage:"/images/Website-Blog-Image-Size-26.jpg",images:["/images/Website-Blog-Image-Size-26.jpg","/images/Website-Blog-Image-Size-29.jpg","/images/Website-Feature-Image-Size-10.jpg"],description:"Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar across rolling blue-hazed ridges. The national park here protects rare orchids, Himalayan black bears, and hollock gibbons.",highlights:["Sunrise panoramas","Rare orchid species","Wildlife viewing","Cloud sea views"],bestTime:"November – February",nearbyAttractions:["Phawngpui National Park","Sangau border outpost"],duration:"2-3 days",category:"adventure"},{id:"tam-dil-lake",name:"Tam Dil Lake",tagline:"Mirror-still lake in a pine-forested valley",type:"lake",tags:["relaxation","nature","lake"],difficulty:"Easy",district:"Saitual",lat:23.6177,lng:92.8894,rating:4.6,reviews:93,coverImage:"/images/tamdil-lake-mizoram.jpeg",images:["/images/tamdil-lake-mizoram.jpeg","/images/2019072338-1024x576.jpg","/images/2019072384-1-olw9h396o5jhwh510ctk9bwfep94no9o510c4tj0ju.jpg"],description:"Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for a peaceful picnic, boating, or simply relaxing in nature. The calm waters reflect the surrounding hills like a mirror at dawn, making it a favourite for photographers.",highlights:["Boating","Picnic spots","Pine forest walks","Photography"],bestTime:"Year-round (best Sep – Mar)",nearbyAttractions:["Saitual town","Kelkang","Aizawl (85 km)"],duration:"1 day",category:"relaxation"},{id:"reiek-tlang",name:"Reiek Tlang",tagline:"Rolling hills with traditional Mizo heritage village",type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Mamit",lat:23.7152,lng:92.5694,rating:4.5,reviews:78,coverImage:"/images/caption.jpg",images:["/images/caption.jpg","/images/caption%20(1).jpg","/images/reiek-tlang-view-point-ailawng-mammit-tourist-attraction-XPHYubeNTg.jpg"],description:"Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village, walking trails, and breathtaking hillside views. Sunrise here is particularly magical with layers of hills fading into the horizon.",highlights:["Traditional Mizo village","Hiking trails","Sunrise views","Cultural exhibits"],bestTime:"October – April",nearbyAttractions:["Aizawl","Hmuifang","Durtlang Hills"],duration:"1 day",category:"culture"},{id:"palak-dil",name:"Palak Dil Lake",tagline:"Mizoram's largest natural lake, ringed by jungle",type:"lake",tags:["nature","wildlife","relaxation"],difficulty:"Easy",district:"Saiha",lat:22.1627,lng:92.9261,rating:4.7,reviews:56,coverImage:"/images/626bdb1307952_Palak%20lake.jpg",images:["/images/626bdb1307952_Palak%20lake.jpg","/images/626bdb1b5a442_PALAK%20lake%202.jpg","/images/palak-lake-aizawl-mizoram-1-attr-hero.jpeg"],description:"Palak Dil, Mizoram's largest natural lake, lies in the remote Saiha district near the Myanmar border. The lake is surrounded by dense subtropical forest and is a prime migratory bird watching destination. The silence here is extraordinary.",highlights:["Bird watching","Boat rides","Wildlife","Remote wilderness"],bestTime:"November – February",nearbyAttractions:["Saiha town","Phawngpui (nearby)"],duration:"2 days",category:"relaxation"},{id:"champhai",name:"Champhai Valley",tagline:"The fruit bowl of Mizoram with stunning valley views",type:"valley",tags:["nature","culture","relaxation"],difficulty:"Easy",district:"Champhai",lat:23.4692,lng:93.3224,rating:4.6,reviews:102,coverImage:"/images/Paddy-fields-at-Champhai-Mizoram.webp",images:["/images/Paddy-fields-at-Champhai-Mizoram.webp","/images/House-in-a-paddy-field-in-Champhai.webp","/images/1694632131_sweeping_meadows_at_champhai.jpg.webp","/images/6054f244a637b2d8c9a63aa0c66b7056_1000x1000.jpg","/images/62addaa694e9f_Champhai%20Zawl.jpg"],description:'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar. The valley is dotted with fruit orchards, paddy fields, and dramatic ridgeline sunsets. Its border town character adds a unique cultural flavour.',highlights:["Valley views","Fruit orchards","Museum","Myanmar border"],bestTime:"October – March",nearbyAttractions:["Rih Dil Lake (Myanmar)","Murlen National Park","Tamdil"],duration:"2-3 days",category:"relaxation"},{id:"murlen-national-park",name:"Murlen National Park",tagline:"One of Northeast India's finest biodiversity hotspots",type:"wildlife",tags:["wildlife","adventure","nature"],difficulty:"Moderate",district:"Champhai",lat:23.65,lng:93.35,rating:4.8,reviews:43,coverImage:"/images/1557675360_murlen-national-park.jpg",images:["/images/murlen-national-park-murlen-champhai-national-parks-egyj5j72xi.avif","/images/murlen-national-park-murlen-champhai-national-parks-3zntx71lgy.avif","/images/Website-Blog-Image-Size-23.jpg","/images/Website-Blog-Image-Size-24.jpg","/images/1557675360_murlen-national-park.jpg"],description:"Murlen National Park, spanning over 100 sq km of pristine forest, is home to leopards, clouded leopards, gibbons, hornbills, and over 150 bird species. Trekking through its silent, ancient forests is a transformative experience.",highlights:["Leopard habitat","Hornbill spotting","Jungle camping","Bird watching"],bestTime:"November – April",nearbyAttractions:["Champhai","Phawngpui Peak"],duration:"2-3 days",category:"adventure"},{id:"hmuifang",name:"Hmuifang Hill",tagline:"Cloud-kissed hill with Aizawl valley panoramas",type:"hill",tags:["relaxation","nature","scenic"],difficulty:"Easy",district:"Aizawl",lat:23.5,lng:92.79,rating:4.4,reviews:67,coverImage:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",images:["https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"],description:`Just 54 km from Aizawl, Hmuifang is a hill station known as "Mizoram's Shimla." The hilltop resort offers stunning views of the surrounding valleys and the Tlawng River below. Pine forests, cool mountain air, and misty mornings make it ideal for relaxation.`,highlights:["Valley panoramas","Pine forest","Cool climate","Birding"],bestTime:"October – March",nearbyAttractions:["Aizawl","Reiek Tlang","Durtlang"],duration:"1 day",category:"relaxation"},{id:"lunglei",name:"Lunglei Hills",tagline:`The "Bridge of the Rocks" — Mizoram's southern capital`,type:"hill",tags:["culture","nature","relaxation"],difficulty:"Easy",district:"Lunglei",lat:22.8917,lng:92.7349,rating:4.3,reviews:58,coverImage:"https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80",images:["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80","https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"],description:'Lunglei, the second largest city in Mizoram, sits dramatically on a ridge above verdant valleys. The name means "bridge of rocks." Explore local bazaars, colonial-era churches, and the sweeping viewpoints overlooking the Tlawng river basin.',highlights:["Rock viewpoints","Local markets","Heritage churches","Valley walks"],bestTime:"October – April",nearbyAttractions:["Saikuti Beach","Khawbung","Vantawng Falls (3 hrs)"],duration:"1-2 days",category:"culture"},{id:"aizawl-city",name:"Aizawl City",tagline:"The hilltop capital — where Mizoram's heart beats",type:"city",tags:["culture","food","relaxation"],difficulty:"Easy",district:"Aizawl",lat:23.7271,lng:92.7176,rating:4.5,reviews:211,coverImage:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",images:["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"],description:"Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India's most unique capital cities. Explore the old market (Bara Bazar), taste Mizo cuisine, visit the state museum, and experience the warmth of Mizo hospitality.",highlights:["Bara Bazar","Mizo cuisine","State Museum","Durtlang Hills"],bestTime:"Year-round",nearbyAttractions:["Reiek Tlang","Hmuifang","Tam Dil Lake"],duration:"2-3 days",category:"culture"},{id:"tuipui-river",name:"Tuipui River",tagline:"Pristine river valley for kayaking and fishing",type:"river",tags:["adventure","nature","water"],difficulty:"Moderate",district:"Saiha",lat:22.05,lng:92.9,rating:4.4,reviews:32,coverImage:"https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80",images:["https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"],description:"The Tuipui River flows through the remotest district of Mizoram, creating stunning gorges, crystal-clear pools, and beaches. This is one of the best spots in Northeast India for river kayaking, fishing, and wild camping.",highlights:["Kayaking","Fishing","Wild camping","Gorge walks"],bestTime:"November – March",nearbyAttractions:["Saiha","Palak Dil Lake","Phawngpui"],duration:"2-3 days",category:"adventure"},{id:"castle-of-bawinu-beino",name:"Castle of Bawinu/Beino",tagline:"Mizoram's hidden grand canyon carved by the Kolodyne River",type:"canyon",tags:["sightseeing","adventure","wildlife","nature watching","vacation"],difficulty:"Hard",district:"Saiha",lat:22.3101,lng:92.8232,rating:0,reviews:0,coverImage:"/images/626bcef048b4e_Beino-Caslte-(1).jpg",images:["/images/626bcef048b4e_Beino-Caslte-(1).jpg","/images/124.jpg","/images/cover.jpg",'/images/hg5yhb.jpg"'],description:"Castle of Bawinu or Beino is a lesser-explored geological wonder on the Kolodyne (Kaladan or Chhimpuitui) River, often called the Grand Canyon of Mizoram. Towering rock formations rise dramatically beside crystal-clear water, creating a striking landscape for boat journeys, hiking, photography, and wildlife watching. The route is challenging and the formation is best visited in the dry season, with access commonly arranged from Lomasu to Saphaw by motorboat and with the help of a knowledgeable local guide.",highlights:["Grand canyon-like rock formations","Motorboat journey on the Kolodyne","Wildlife and bird watching","Spectacular reflections and photography"],bestTime:"February - May",nearbyAttractions:["Lomasu","Saphaw","Lungdar","Tuidang"],duration:"1-2 days",category:"adventure",quickFacts:[{label:"Altitude",value:"54 mts"},{label:"From Aizawl",value:"325 kms"},{label:"Nearest Tourist Lodge",value:"81.4 kms"},{label:"Walking Distance",value:"20 minutes away"},{label:"Weather Forecast",value:"23oC, Clouds"}]},{id:"paithar-tlang",name:"Paithar Tlang",tagline:"Glimpse of Paithar Tlang",type:"hill",tags:["nature","sightseeing","hiking"],difficulty:"Moderate",district:"Lawngtlai",lat:22.5298,lng:92.8943,rating:0,reviews:0,coverImage:"",images:["images/IMG_8689.JPG.jpeg","images/IMG_8690.JPG.jpeg","images/IMG_8691.JPG.jpeg","images/IMG_8692.JPG.jpeg","images/IMG_8693.JPG.jpeg","images/IMG_8694.JPG.jpeg","images/IMG_8695.JPG.jpeg","images/IMG_8687.JPG.jpeg","images/IMG_8688.JPG.jpeg"],description:"Paithar Tlang is located in Paithar village in Lawngtlai District. It is about 15km from Lawngtlai town.",highlights:["Nature walks","Sightseeing","Hiking trails"],bestTime:"October - March",nearbyAttractions:["Lawngtlai town"],duration:"1-2 days",category:"adventure",quickFacts:[{label:"Altitude",value:"1302 mts"},{label:"From Aizawl",value:"263 kms"},{label:"Nearest Tourist Lodge",value:"20 kms"},{label:"Walking Distance",value:"60 minutes away"},{label:"Weather Forecast",value:"30oC, Clouds"}]}],Ia=[{id:"all",label:"All",icon:"🗺️"},{id:"adventure",label:"Adventure",icon:"🧗"},{id:"relaxation",label:"Relaxation",icon:"🌿"},{id:"culture",label:"Culture",icon:"🏛️"},{id:"wildlife",label:"Wildlife",icon:"🦉"},{id:"budget",label:"Budget",icon:"💰"}],Pa="/LushaiTrips/".replace(/\/$/,"");function fi(t){return t?/^(https?:)?\/\//.test(t)||t.startsWith("data:")?t:`${Pa}${t.startsWith("/")?t:`/${t}`}`:""}function Rr(t){return{...t,coverImage:fi(t.coverImage),images:Array.isArray(t.images)?t.images.map(e=>fi(e)):[]}}const ti=Aa.map(t=>Rr(t));w;function Qt(t,e){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(r[i[s]]=t[i[s]]);return r}function Ra(t,e,r,i){function s(a){return a instanceof r?a:new r(function(n){n(a)})}return new(r||(r=Promise))(function(a,n){function o(u){try{c(i.next(u))}catch(d){n(d)}}function l(u){try{c(i.throw(u))}catch(d){n(d)}}function c(u){u.done?a(u.value):s(u.value).then(o,l)}c((i=i.apply(t,e||[])).next())})}const Ca=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class ri extends Error{constructor(e,r="FunctionsError",i){super(e),this.name=r,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class La extends ri{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class vi extends ri{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class yi extends ri{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Cr;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(Cr||(Cr={}));class Oa{constructor(e,{headers:r={},customFetch:i,region:s=Cr.Any}={}){this.url=e,this.headers=r,this.region=s,this.fetch=Ca(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Ra(this,arguments,void 0,function*(r,i={}){var s;let a,n;try{const{headers:o,method:l,body:c,signal:u,timeout:d}=i;let h={},{region:p}=i;p||(p=this.region);const m=new URL(`${this.url}/${r}`);p&&p!=="any"&&(h["x-region"]=p,m.searchParams.set("forceFunctionRegion",p));let g;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(h["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(h["Content-Type"]="application/json",g=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?g=JSON.stringify(c):g=c;let v=u;d&&(n=new AbortController,a=setTimeout(()=>n.abort(),d),u?(v=n.signal,u.addEventListener("abort",()=>n.abort())):v=n.signal);const y=yield this.fetch(m.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),o),body:g,signal:v}).catch(z=>{throw new La(z)}),k=y.headers.get("x-relay-error");if(k&&k==="true")throw new vi(y);if(!y.ok)throw new yi(y);let f=((s=y.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),A;return f==="application/json"?A=yield y.json():f==="application/octet-stream"||f==="application/pdf"?A=yield y.blob():f==="text/event-stream"?A=y:f==="multipart/form-data"?A=yield y.formData():A=yield y.text(),{data:A,error:null,response:y}}catch(o){return{data:null,error:o,response:o instanceof yi||o instanceof vi?o.context:void 0}}finally{a&&clearTimeout(a)}})}}const ds=3,bi=t=>Math.min(1e3*2**t,3e4),ja=[520,503],us=["GET","HEAD","OPTIONS"];var Ba=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function wi(t,e){return new Promise(r=>{if(e!=null&&e.aborted){r();return}const i=setTimeout(()=>{e==null||e.removeEventListener("abort",s),r()},t);function s(){clearTimeout(i),r()}e==null||e.addEventListener("abort",s)})}function za(t,e,r,i){return!(!i||r>=ds||!us.includes(t)||!ja.includes(e))}var Na=class{constructor(t){var e,r,i,s,a;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(i=t.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(s=t.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(a=t.retry)!==null&&a!==void 0?a:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const n=this.headers.get("Accept");n==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!n||n==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let a=(async()=>{let n=0;for(;;){const c=new Headers(r.headers);n>0&&c.set("X-Retry-Count",String(n));let u;try{u=await i(r.url.toString(),{method:r.method,headers:c,body:JSON.stringify(r.body),signal:r.signal})}catch(d){if((d==null?void 0:d.name)==="AbortError"||(d==null?void 0:d.code)==="ABORT_ERR"||!us.includes(r.method))throw d;if(r.retryEnabled&&n<ds){const h=bi(n);n++,await wi(h,r.signal);continue}throw d}if(za(r.method,u.status,n,r.retryEnabled)){var o,l;const d=(o=(l=u.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,h=d!==null?Math.max(0,parseInt(d,10)||0)*1e3:bi(n);await u.text(),n++,await wi(h,r.signal);continue}return await r.processResponse(u)}})();return this.shouldThrowOnError||(a=a.catch(n=>{var o;let l="",c="",u="";const d=n==null?void 0:n.cause;if(d){var h,p,m,g;const k=(h=d==null?void 0:d.message)!==null&&h!==void 0?h:"",f=(p=d==null?void 0:d.code)!==null&&p!==void 0?p:"";l=`${(m=n==null?void 0:n.name)!==null&&m!==void 0?m:"FetchError"}: ${n==null?void 0:n.message}`,l+=`

Caused by: ${(g=d==null?void 0:d.name)!==null&&g!==void 0?g:"Error"}: ${k}`,f&&(l+=` (${f})`),d!=null&&d.stack&&(l+=`
${d.stack}`)}else{var v;l=(v=n==null?void 0:n.stack)!==null&&v!==void 0?v:""}const y=this.url.toString().length;return(n==null?void 0:n.name)==="AbortError"||(n==null?void 0:n.code)==="ABORT_ERR"?(u="",c="Request was aborted (timeout or manual cancellation)",y>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((d==null?void 0:d.name)==="HeadersOverflowError"||(d==null?void 0:d.code)==="UND_ERR_HEADERS_OVERFLOW")&&(u="",c="HTTP headers exceeded server limits (typically 16KB)",y>this.urlLengthLimit&&(c+=`. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=n==null?void 0:n.name)!==null&&o!==void 0?o:"FetchError"}: ${n==null?void 0:n.message}`,details:l,hint:c,code:u},data:null,count:null,status:0,statusText:""}})),a.then(t,e)}async processResponse(t){var e=this;let r=null,i=null,s=null,a=t.status,n=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();h===""||(e.headers.get("Accept")==="text/csv"||e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text"))?i=h:i=JSON.parse(h))}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),d=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");u&&d&&d.length>1&&(s=parseInt(d[1])),e.isMaybeSingle&&Array.isArray(i)&&(i.length>1?(r={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,s=null,a=406,n="Not Acceptable"):i.length===1?i=i[0]:i=null)}else{const u=await t.text();try{r=JSON.parse(u),Array.isArray(r)&&t.status===404&&(i=[],r=null,a=200,n="OK")}catch{t.status===404&&u===""?(a=204,n="No Content"):r={message:u}}if(r&&e.shouldThrowOnError)throw new Ba(r)}return{success:r===null,error:r,data:i,count:s,status:a,statusText:n}}returns(){return this}overrideTypes(){return this}},Ma=class extends Na{select(t){let e=!1;const r=(t??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:i,referencedTable:s=i}={}){const a=s?`${s}.order`:"order",n=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${n?`${n},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const i=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(i,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:i=r}={}){const s=typeof i>"u"?"offset":`${i}.offset`,a=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(s,`${t}`),this.url.searchParams.set(a,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:i=!1,wal:s=!1,format:a="text"}={}){var n;const o=[t?"analyze":null,e?"verbose":null,r?"settings":null,i?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(n=this.headers.get("Accept"))!==null&&n!==void 0?n:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const xi=new RegExp("[,()]");var Ue=class extends Ma{eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(i=>typeof i=="string"&&xi.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(i=>typeof i=="string"&&xi.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:i}={}){let s="";i==="plain"?s="pl":i==="phrase"?s="ph":i==="websearch"&&(s="w");const a=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${s}fts${a}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const i=r?`${r}.or`:"or";return this.url.searchParams.append(i,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},Ua=class{constructor(t,{headers:e={},schema:r,fetch:i,urlLengthLimit:s=8e3,retry:a}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=i,this.urlLengthLimit=s,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:i}=e??{},s=r?"HEAD":"GET";let a=!1;const n=(t??"*").split("").map(c=>/\s/.test(c)&&!a?"":(c==='"'&&(a=!a),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",n),i&&l.append("Prefer",`count=${i}`),new Ue({method:s,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var i;const s="POST",{url:a,headers:n}=this.cloneRequestState();if(e&&n.append("Prefer",`count=${e}`),r||n.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);a.searchParams.set("columns",l.join(","))}}return new Ue({method:s,url:a,headers:n,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:i,defaultToNull:s=!0}={}){var a;const n="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),s||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((u,d)=>u.concat(Object.keys(d)),[]);if(c.length>0){const u=[...new Set(c)].map(d=>`"${d}"`);o.searchParams.set("columns",u.join(","))}}return new Ue({method:n,url:o,headers:l,schema:this.schema,body:t,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const i="PATCH",{url:s,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new Ue({method:i,url:s,headers:a,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:i,headers:s}=this.cloneRequestState();return t&&s.append("Prefer",`count=${t}`),new Ue({method:r,url:i,headers:s,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function gt(t){"@babel/helpers - typeof";return gt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},gt(t)}function Da(t,e){if(gt(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(gt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ha(t){var e=Da(t,"string");return gt(e)=="symbol"?e:e+""}function qa(t,e,r){return(e=Ha(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function ki(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function Pt(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?ki(Object(r),!0).forEach(function(i){qa(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ki(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}var Fa=class hs{constructor(e,{headers:r={},schema:i,fetch:s,timeout:a,urlLengthLimit:n=8e3,retry:o}={}){this.url=e,this.headers=new Headers(r),this.schemaName=i,this.urlLengthLimit=n;const l=s??globalThis.fetch;a!==void 0&&a>0?this.fetch=(c,u)=>{const d=new AbortController,h=setTimeout(()=>d.abort(),a),p=u==null?void 0:u.signal;if(p){if(p.aborted)return clearTimeout(h),l(c,u);const m=()=>{clearTimeout(h),d.abort()};return p.addEventListener("abort",m,{once:!0}),l(c,Pt(Pt({},u),{},{signal:d.signal})).finally(()=>{clearTimeout(h),p.removeEventListener("abort",m)})}return l(c,Pt(Pt({},u),{},{signal:d.signal})).finally(()=>clearTimeout(h))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Ua(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new hs(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:i=!1,get:s=!1,count:a}={}){var n;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const u=p=>p!==null&&typeof p=="object"&&(!Array.isArray(p)||p.some(u)),d=i&&Object.values(r).some(u);d?(o="POST",c=r):i||s?(o=i?"HEAD":"GET",Object.entries(r).filter(([p,m])=>m!==void 0).map(([p,m])=>[p,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([p,m])=>{l.searchParams.append(p,m)})):(o="POST",c=r);const h=new Headers(this.headers);return d?h.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&h.set("Prefer",`count=${a}`),new Ue({method:o,url:l,headers:h,schema:this.schemaName,body:c,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Ga{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const i=r.versions;if(i&&i.node){const s=i.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Wa="2.103.0",Va=`realtime-js/${Wa}`,Ja="1.0.0",ps="2.0.0",Ka=ps,Ya=1e4,Xa=100,we={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},ms={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Lr={connecting:"connecting",closing:"closing",closed:"closed"};class Za{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,i;const s=(i=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(e){var r,i;const s=(i=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&i!==void 0?i:{},n=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,r,i){var s,a;const n=e.topic,o=(s=e.ref)!==null&&s!==void 0?s:"",l=(a=e.join_ref)!==null&&a!==void 0?a:"",c=e.payload.event,u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},d=Object.keys(u).length===0?"":JSON.stringify(u);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(n.length>255)throw new Error(`topic length ${n.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`metadata length ${d.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+n.length+c.length+d.length,p=new ArrayBuffer(this.HEADER_LENGTH+h);let m=new DataView(p),g=0;m.setUint8(g++,this.KINDS.userBroadcastPush),m.setUint8(g++,l.length),m.setUint8(g++,o.length),m.setUint8(g++,n.length),m.setUint8(g++,c.length),m.setUint8(g++,d.length),m.setUint8(g++,r),Array.from(l,y=>m.setUint8(g++,y.charCodeAt(0))),Array.from(o,y=>m.setUint8(g++,y.charCodeAt(0))),Array.from(n,y=>m.setUint8(g++,y.charCodeAt(0))),Array.from(c,y=>m.setUint8(g++,y.charCodeAt(0))),Array.from(d,y=>m.setUint8(g++,y.charCodeAt(0)));var v=new Uint8Array(p.byteLength+i.byteLength);return v.set(new Uint8Array(p),0),v.set(new Uint8Array(i),p.byteLength),v.buffer}decode(e,r){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return r(i)}if(typeof e=="string"){const i=JSON.parse(e),[s,a,n,o,l]=i;return r({join_ref:s,ref:a,topic:n,event:o,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),i=r.getUint8(0),s=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,s)}}_decodeUserBroadcast(e,r,i){const s=r.getUint8(1),a=r.getUint8(2),n=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+s));l=l+s;const u=i.decode(e.slice(l,l+a));l=l+a;const d=i.decode(e.slice(l,l+n));l=l+n;const h=e.slice(l,e.byteLength),p=o===this.JSON_ENCODING?JSON.parse(i.decode(h)):h,m={type:this.BROADCAST_EVENT,event:u,payload:p};return n>0&&(m.meta=JSON.parse(d)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>r.includes(i)))}}var B;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(B||(B={}));const _i=(t,e,r={})=>{var i;const s=(i=r.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((a,n)=>(a[n]=Qa(n,t,e,s),a),{}):{}},Qa=(t,e,r,i)=>{const s=e.find(o=>o.name===t),a=s==null?void 0:s.type,n=r[t];return a&&!i.includes(a)?gs(a,n):Or(n)},gs=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return sn(e,r)}switch(t){case B.bool:return en(e);case B.float4:case B.float8:case B.int2:case B.int4:case B.int8:case B.numeric:case B.oid:return tn(e);case B.json:case B.jsonb:return rn(e);case B.timestamp:return an(e);case B.abstime:case B.date:case B.daterange:case B.int4range:case B.int8range:case B.money:case B.reltime:case B.text:case B.time:case B.timestamptz:case B.timetz:case B.tsrange:case B.tstzrange:return Or(e);default:return Or(e)}},Or=t=>t,en=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},tn=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},rn=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},sn=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,i=t[r];if(t[0]==="{"&&i==="}"){let a;const n=t.slice(1,r);try{a=JSON.parse("["+n+"]")}catch{a=n?n.split(","):[]}return a.map(o=>gs(e,o))}return t},an=t=>typeof t=="string"?t.replace(" ","T"):t,fs=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var ct=t=>typeof t=="function"?t:function(){return t},nn=typeof self<"u"?self:null,De=typeof window<"u"?window:null,ce=nn||De||globalThis,on="2.0.0",ln=1e4,cn=1e3,de={connecting:0,open:1,closing:2,closed:3},Z={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},me={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},jr={longpoll:"longpoll",websocket:"websocket"},dn={complete:4},Br="base64url.bearer.phx.",Rt=class{constructor(t,e,r,i){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(i=>i.status===t).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},vs=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},un=class{constructor(t,e,r){this.state=Z.closed,this.topic=t,this.params=ct(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Rt(this,me.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new vs(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=Z.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=Z.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=Z.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=Z.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Rt(this,me.leave,ct({}),this.timeout).send(),this.state=Z.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(me.reply,(i,s)=>{this.trigger(this.replyEventName(s),i)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Z.closed,this.bindings=[]}onClose(t){this.on(me.close,t)}onError(t){return this.on(me.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new Rt(this,t,function(){return e},r);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Z.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(me.close,"leave")},r=new Rt(this,me.leave,ct({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,i){return this.topic!==t?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Z.joining,this.joinPush.resend(t))}trigger(t,e,r,i){let s=this.onMessage(t,e,r,i);if(e&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter(n=>n.event===t&&this.filterBindings(n,e,r));for(let n=0;n<a.length;n++)a[n].callback(s,r,i||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===Z.closed}isErrored(){return this.state===Z.errored}isJoined(){return this.state===Z.joined}isJoining(){return this.state===Z.joining}isLeaving(){return this.state===Z.leaving}},Vt=class{static request(t,e,r,i,s,a,n){if(ce.XDomainRequest){let o=new ce.XDomainRequest;return this.xdomainRequest(o,t,e,i,s,a,n)}else if(ce.XMLHttpRequest){let o=new ce.XMLHttpRequest;return this.xhrRequest(o,t,e,r,i,s,a,n)}else{if(ce.fetch&&ce.AbortController)return this.fetchRequest(t,e,r,i,s,a,n);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,i,s,a,n){let o={method:t,headers:r,body:i},l=null;return s&&(l=new AbortController,setTimeout(()=>l.abort(),s),o.signal=l.signal),ce.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>n&&n(c)).catch(c=>{c.name==="AbortError"&&a?a():n&&n(null)}),l}static xdomainRequest(t,e,r,i,s,a,n){return t.timeout=s,t.open(e,r),t.onload=()=>{let o=this.parseJSON(t.responseText);n&&n(o)},a&&(t.ontimeout=a),t.onprogress=()=>{},t.send(i),t}static xhrRequest(t,e,r,i,s,a,n,o){t.open(e,r,!0),t.timeout=a;for(let[l,c]of Object.entries(i))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===dn.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},n&&(t.ontimeout=n),t.send(s),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var i in t){if(!Object.prototype.hasOwnProperty.call(t,i))continue;let s=e?`${e}[${i}]`:i,a=t[i];typeof a=="object"?r.push(this.serialize(a,s)):r.push(encodeURIComponent(s)+"="+encodeURIComponent(a))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},hn=t=>{let e="",r=new Uint8Array(t),i=r.byteLength;for(let s=0;s<i;s++)e+=String.fromCharCode(r[s]);return btoa(e)},Oe=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(Br)&&(this.authToken=atob(e[1].slice(Br.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=de.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+jr.websocket),"$1/"+jr.longpoll)}endpointURL(){return Vt.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=de.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===de.open||this.readyState===de.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:i,messages:s}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else r=0;switch(r){case 200:s.forEach(a=>{setTimeout(()=>this.onmessage({data:a}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=de.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=hn(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},t.join(`
`),()=>this.onerror("timeout"),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(t,e,r){for(let s of this.reqs)s.abort();this.readyState=de.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(t,e,r,i,s){let a,n=()=>{this.reqs.delete(a),i()};a=Vt.request(t,this.endpointURL(),e,r,this.timeout,n,o=>{this.reqs.delete(a),this.isActive()&&s(o)}),this.reqs.add(a)}},pn=class rt{constructor(e,r={}){let i=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,s=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=rt.syncState(this.state,s,a,n),this.pendingDiffs.forEach(l=>{this.state=rt.syncDiff(this.state,l,a,n)}),this.pendingDiffs=[],o()}),this.channel.on(i.diff,s=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=rt.syncDiff(this.state,s,a,n),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return rt.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,i,s){let a=this.clone(e),n={},o={};return this.map(a,(l,c)=>{r[l]||(o[l]=c)}),this.map(r,(l,c)=>{let u=a[l];if(u){let d=c.metas.map(g=>g.phx_ref),h=u.metas.map(g=>g.phx_ref),p=c.metas.filter(g=>h.indexOf(g.phx_ref)<0),m=u.metas.filter(g=>d.indexOf(g.phx_ref)<0);p.length>0&&(n[l]=c,n[l].metas=p),m.length>0&&(o[l]=this.clone(u),o[l].metas=m)}else n[l]=c}),this.syncDiff(a,{joins:n,leaves:o},i,s)}static syncDiff(e,r,i,s){let{joins:a,leaves:n}=this.clone(r);return i||(i=function(){}),s||(s=function(){}),this.map(a,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let u=e[o].metas.map(h=>h.phx_ref),d=c.metas.filter(h=>u.indexOf(h.phx_ref)<0);e[o].metas.unshift(...d)}i(o,c,l)}),this.map(n,(o,l)=>{let c=e[o];if(!c)return;let u=l.metas.map(d=>d.phx_ref);c.metas=c.metas.filter(d=>u.indexOf(d.phx_ref)<0),s(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,r){return r||(r=function(i,s){return s}),this.map(e,(i,s)=>r(i,s))}static map(e,r){return Object.getOwnPropertyNames(e).map(i=>r(i,e[i]))}static clone(e){return JSON.parse(JSON.stringify(e))}},Ct={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,i,s,a,n]=JSON.parse(t);return e({join_ref:r,ref:i,topic:s,event:a,payload:n})}},binaryEncode(t){let{join_ref:e,ref:r,event:i,topic:s,payload:a}=t,n=this.META_LENGTH+e.length+r.length+s.length+i.length,o=new ArrayBuffer(this.HEADER_LENGTH+n),l=new DataView(o),c=0;l.setUint8(c++,this.KINDS.push),l.setUint8(c++,e.length),l.setUint8(c++,r.length),l.setUint8(c++,s.length),l.setUint8(c++,i.length),Array.from(e,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(r,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(s,d=>l.setUint8(c++,d.charCodeAt(0))),Array.from(i,d=>l.setUint8(c++,d.charCodeAt(0)));var u=new Uint8Array(o.byteLength+a.byteLength);return u.set(new Uint8Array(o),0),u.set(new Uint8Array(a),o.byteLength),u.buffer},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),i=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,i);case this.KINDS.reply:return this.decodeReply(t,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,i)}},decodePush(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=e.getUint8(3),n=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(t.slice(n,n+i));n=n+i;let l=r.decode(t.slice(n,n+s));n=n+s;let c=r.decode(t.slice(n,n+a));n=n+a;let u=t.slice(n,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:u}},decodeReply(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=e.getUint8(3),n=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(o,o+i));o=o+i;let c=r.decode(t.slice(o,o+s));o=o+s;let u=r.decode(t.slice(o,o+a));o=o+a;let d=r.decode(t.slice(o,o+n));o=o+n;let h=t.slice(o,t.byteLength),p={status:d,response:h};return{join_ref:l,ref:c,topic:u,event:me.reply,payload:p}},decodeBroadcast(t,e,r){let i=e.getUint8(1),s=e.getUint8(2),a=this.HEADER_LENGTH+2,n=r.decode(t.slice(a,a+i));a=a+i;let o=r.decode(t.slice(a,a+s));a=a+s;let l=t.slice(a,t.byteLength);return{join_ref:null,ref:null,topic:n,event:o,payload:l}}},mn=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||ln,this.transport=e.transport||ce.WebSocket||Oe,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=e.sessionStorage||ce&&ce.sessionStorage,this.establishedConnections=0,this.defaultEncoder=Ct.encode.bind(Ct),this.defaultDecoder=Ct.decode.bind(Ct),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Oe?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;De&&De.addEventListener&&(De.addEventListener("pagehide",i=>{this.conn&&(this.disconnect(),r=this.connectClock)}),De.addEventListener("pageshow",i=>{r===this.connectClock&&(r=null,this.connect())}),De.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=i=>e.rejoinAfterMs?e.rejoinAfterMs(i):[1e3,2e3,5e3][i-1]||1e4,this.reconnectAfterMs=i=>e.reconnectAfterMs?e.reconnectAfterMs(i):[10,50,100,150,200,250,500,1e3,2e3][i-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(i,s,a)=>{console.log(`${i}: ${s}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=ct(e.params||{}),this.endPoint=`${t}/${jr.websocket}`,this.vsn=e.vsn||on,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new vs(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken}getLongPollTransport(){return Oe}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=Vt.appendParams(Vt.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=ct(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Oe?this.connectWithFallback(Oe,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(s=>{s.ref===e&&(this.off([i]),t(Date.now()-r))});return!0}transportName(t){switch(t){case Oe:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${Br}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,i=!0,s,a,n=this.transportName(t),o=l=>{this.log("transport",`falling back to ${n}...`,l),this.off([s,a]),i=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${n}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),a=this.onError(l=>{this.log("transport","error",l),i&&!r&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!i){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),cn,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,r||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===de.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(me.error)})}connectionState(){switch(this.conn&&this.conn.readyState){case de.connecting:return"connecting";case de.open:return"open";case de.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new un(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:i,ref:s,join_ref:a}=t;this.log("push",`${e} ${r} (${a}, ${s})`,i)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:i,payload:s,ref:a,join_ref:n}=e;if(a&&a===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${r} ${i} ${a&&"("+a+")"||""}`.trim(),s);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(r,i,s,n)&&l.trigger(i,s,a,n)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,i])=>{try{i(...e)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class dt{constructor(e,r){const i=fn(r);this.presence=new pn(e.getChannel(),i),this.presence.onJoin((s,a,n)=>{const o=dt.onJoinPayload(s,a,n);e.getChannel().trigger("presence",o)}),this.presence.onLeave((s,a,n)=>{const o=dt.onLeavePayload(s,a,n);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return dt.transformState(this.presence.state)}static transformState(e){return e=gn(e),Object.getOwnPropertyNames(e).reduce((r,i)=>{const s=e[i];return r[i]=Ht(s),r},{})}static onJoinPayload(e,r,i){const s=Si(r),a=Ht(i);return{event:"join",key:e,currentPresences:s,newPresences:a}}static onLeavePayload(e,r,i){const s=Si(r),a=Ht(i);return{event:"leave",key:e,currentPresences:s,leftPresences:a}}}function Ht(t){return t.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function gn(t){return JSON.parse(JSON.stringify(t))}function fn(t){return(t==null?void 0:t.events)&&{events:t.events}}function Si(t){return t!=null&&t.metas?Ht(t):[]}var Ei;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Ei||(Ei={}));class vn{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new dt(this.channel.channelAdapter,r)}}class yn{constructor(e,r,i){const s=bn(i);this.channel=e.getSocket().channel(r,s),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,i){let s;try{s=this.channel.push(e,r,i)}catch{throw`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`}if(this.channel.pushBuffer.length>Xa){const a=this.channel.pushBuffer.shift();a.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${a.event}`,a.payload())}return s}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===we.joined}isJoined(){return this.state===we.joined}isJoining(){return this.state===we.joining}isClosed(){return this.state===we.closed}isLeaving(){return this.state===we.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function bn(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}var $i;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})($i||($i={}));var Fe;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(Fe||(Fe={}));var ge;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(ge||(ge={}));class ut{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},i){var s,a;if(this.topic=e,this.params=r,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new yn(this.socket.socketAdapter,e,this.params),this.presence=new vn(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=fs(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((a=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,r=this.timeout){var i,s,a;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:n,presence:o,private:l}}=this.params,c=(s=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(p=>p.filter))!==null&&s!==void 0?s:[],u=!!this.bindings[Fe.PRESENCE]&&this.bindings[Fe.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,d={},h={broadcast:n,presence:Object.assign(Object.assign({},o),{enabled:u}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(d.access_token=this.socket.accessTokenValue),this._onError(p=>{e==null||e(ge.CHANNEL_ERROR,p)}),this._onClose(()=>e==null?void 0:e(ge.CLOSED)),this.updateJoinPayload(Object.assign({config:h},d)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:p})=>{if(this.socket._isManualToken()||this.socket.setAuth(),p===void 0){e==null||e(ge.SUBSCRIBED);return}this._updatePostgresBindings(p,e)}).receive("error",p=>{this.state=we.errored,e==null||e(ge.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(p).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(ge.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var i;const s=this.bindings.postgres_changes,a=(i=s==null?void 0:s.length)!==null&&i!==void 0?i:0,n=[];for(let o=0;o<a;o++){const l=s[o],{filter:{event:c,schema:u,table:d,filter:h}}=l,p=e&&e[o];if(p&&p.event===c&&ut.isFilterValueEqual(p.schema,u)&&ut.isFilterValueEqual(p.table,d)&&ut.isFilterValueEqual(p.filter,h))n.push(Object.assign(Object.assign({},l),{id:p.id}));else{this.unsubscribe(),this.state=we.errored,r==null||r(ge.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=n,this.state!=we.errored&&r&&r(ge.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,i){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),a=e===Fe.PRESENCE||e===Fe.POSTGRES_CHANGES;if(s&&a)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,i)}async httpSend(e,r,i={}){var s;if(r==null)return Promise.reject("Payload is required for httpSend()");const a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const n={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:r,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,n,(s=i.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const c=await o.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,r={}){var i,s;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:n}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:n,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(i=r.timeout)!==null&&i!==void 0?i:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var n,o,l;const c=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(n=this.params)===null||n===void 0?void 0:n.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,i){const s=new AbortController,a=setTimeout(()=>s.abort(),i),n=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(a),n}_on(e,r,i){const s=e.toLocaleLowerCase(),a=this.channelAdapter.on(e,i),n={type:s,filter:r,callback:i,ref:a};return this.bindings[s]?this.bindings[s].push(n):this.bindings[s]=[n],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,i)=>{var s,a,n,o,l,c,u;const d=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(d,i))return!1;const h=(s=this.bindings[d])===null||s===void 0?void 0:s.find(p=>p.ref===e.ref);if(!h)return!0;if(["broadcast","presence","postgres_changes"].includes(d))if("id"in h){const p=h.id,m=(a=h.filter)===null||a===void 0?void 0:a.event;return p&&((n=r.ids)===null||n===void 0?void 0:n.includes(p))&&(m==="*"||(m==null?void 0:m.toLocaleLowerCase())===((o=r.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const p=(c=(l=h==null?void 0:h.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return p==="*"||p===((u=r==null?void 0:r.event)===null||u===void 0?void 0:u.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===d})}_notThisChannelEvent(e,r){const{close:i,error:s,leave:a,join:n}=ms;return r&&[i,s,a,n].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,i)=>{if(typeof r=="object"&&"ids"in r){const s=r.data,{schema:a,table:n,commit_timestamp:o,type:l,errors:c}=s;return Object.assign(Object.assign({},{schema:a,table:n,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(s))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const i of e.bindings[r])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=_i(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=_i(e.columns,e.old_record)),r}}class wn{constructor(e,r){this.socket=new mn(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,i,s=1e4){return new Promise(a=>{setTimeout(()=>a("timeout"),s),this.socket.disconnect(()=>{e(),a("ok")},r,i)})}push(e){this.socket.push(e)}log(e,r,i){this.socket.log(e,r,i)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Lr.connecting}isDisconnecting(){return this.socket.connectionState()==Lr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const xn={HEARTBEAT_INTERVAL:25e3},kn=[1e3,2e3,5e3,1e4],_n=1e4,Sn=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class En{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Za,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=a=>a?(...n)=>a(...n):(...n)=>fetch(...n),!(!((i=r==null?void 0:r.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const s=this._initializeOptions(r);this.socketAdapter=new wn(e,s),this.httpEndpoint=fs(e),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const e=this.channels.map(async i=>{const s=await i.unsubscribe();return i.teardown(),s}),r=await Promise.all(e);return this.disconnect(),r}log(e,r,i){this.socketAdapter.log(e,r,i)}connectionState(){return this.socketAdapter.connectionState()||Lr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const i=`realtime:${e}`,s=this.getChannels().find(a=>a.topic===i);if(s)return s;{const a=new ut(`realtime:${e}`,r,this);return this.channels.push(a),a}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic)}async _performAuth(e=null){let r,i=!1;if(e)r=e,i=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),r=this.accessTokenValue}else r=this.accessTokenValue;i?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(s=>{const a={access_token:r,version:Va};r&&s.updateJoinPayload(a),s.joinedOnce&&s.channelAdapter.isJoined()&&s.channelAdapter.push(ms.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,i)=>{r=="sent"&&this._setAuthSafely(),e&&e(r,i)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const i=new Blob([Sn],{type:"application/javascript"});r=URL.createObjectURL(i)}return r}_initializeOptions(e){var r,i,s,a,n,o,l,c,u;this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null;const d={};d.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:Ya,d.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:xn.HEARTBEAT_INTERVAL,d.transport=(n=e==null?void 0:e.transport)!==null&&n!==void 0?n:Ga.getWebSocketConstructor(),d.params=e==null?void 0:e.params,d.logger=e==null?void 0:e.logger,d.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),d.reconnectAfterMs=(o=e==null?void 0:e.reconnectAfterMs)!==null&&o!==void 0?o:g=>kn[g-1]||_n;let h,p;const m=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Ka;switch(m){case Ja:h=(g,v)=>v(JSON.stringify(g)),p=(g,v)=>v(JSON.parse(g));break;case ps:h=this.serializer.encode.bind(this.serializer),p=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${d.vsn}`)}if(d.vsn=m,d.encode=(c=e==null?void 0:e.encode)!==null&&c!==void 0?c:h,d.decode=(u=e==null?void 0:e.decode)!==null&&u!==void 0?u:p,d.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,d.params=Object.assign(Object.assign({},d.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,d.autoSendHeartbeat=!this.worker}return d}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var ft=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function $n(t,e,r){const i=new URL(e,t);if(r)for(const[s,a]of Object.entries(r))a!==void 0&&i.searchParams.set(s,a);return i.toString()}async function Tn(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function An(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:i,query:s,body:a,headers:n}){const o=$n(t.baseUrl,i,s),l=await Tn(t.auth),c=await e(o,{method:r,headers:{...a?{"Content-Type":"application/json"}:{},...l,...n},body:a?JSON.stringify(a):void 0}),u=await c.text(),d=(c.headers.get("content-type")||"").includes("application/json"),h=d&&u?JSON.parse(u):u;if(!c.ok){const p=d?h:void 0,m=p==null?void 0:p.error;throw new ft((m==null?void 0:m.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:m==null?void 0:m.type,icebergCode:m==null?void 0:m.code,details:p})}return{status:c.status,headers:c.headers,data:h}}}}function Lt(t){return t.join("")}var In=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:Lt(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Lt(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Lt(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Lt(t.namespace)}`}),!0}catch(e){if(e instanceof ft&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof ft&&r.status===409)return;throw r}}};function je(t){return t.join("")}var Pn=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${je(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof ft&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof ft&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},Rn=class{constructor(t){var i;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=An({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(i=t.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new In(this.client,e),this.tableOps=new Pn(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}},er=class extends Error{constructor(t,e="storage",r,i){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=i}};function tr(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var zr=class extends er{constructor(t,e,r,i="storage"){super(t,i,e,r),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},ys=class extends er{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const Cn=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Ln=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Nr=t=>{if(Array.isArray(t))return t.map(r=>Nr(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,i])=>{const s=r.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[s]=Nr(i)}),e},On=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t);function vt(t){"@babel/helpers - typeof";return vt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},vt(t)}function jn(t,e){if(vt(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(vt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Bn(t){var e=jn(t,"string");return vt(e)=="symbol"?e:e+""}function zn(t,e,r){return(e=Bn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Ti(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function $(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ti(Object(r),!0).forEach(function(i){zn(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ti(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}const Ai=t=>{var e;return t.msg||t.message||t.error_description||(typeof t.error=="string"?t.error:(e=t.error)===null||e===void 0?void 0:e.message)||JSON.stringify(t)},Nn=async(t,e,r,i)=>{if(t!==null&&typeof t=="object"&&typeof t.json=="function"){const s=t;let a=parseInt(s.status,10);Number.isFinite(a)||(a=500),s.json().then(n=>{const o=(n==null?void 0:n.statusCode)||(n==null?void 0:n.code)||a+"";e(new zr(Ai(n),a,o,i))}).catch(()=>{const n=a+"";e(new zr(s.statusText||`HTTP ${a} error`,a,n,i))})}else e(new ys(Ai(t),t,i))},Mn=(t,e,r,i)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!i)return $($({},s),r);if(Ln(i)){var a;const n=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(n))l.toLowerCase()==="content-type"&&(o=c);s.headers=Un(n,"Content-Type",(a=o)!==null&&a!==void 0?a:"application/json"),s.body=JSON.stringify(i)}else s.body=i;return e!=null&&e.duplex&&(s.duplex=e.duplex),$($({},s),r)};function Un(t,e,r){const i=$({},t);for(const s of Object.keys(i))s.toLowerCase()===e.toLowerCase()&&delete i[s];return i[e]=r,i}async function Qe(t,e,r,i,s,a,n){return new Promise((o,l)=>{t(r,Mn(e,i,s,a)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(n==="vectors"){const u=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!u||!u.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>Nn(c,l,i,n))})}function bs(t="storage"){return{get:async(e,r,i,s)=>Qe(e,"GET",r,i,s,void 0,t),post:async(e,r,i,s,a)=>Qe(e,"POST",r,s,a,i,t),put:async(e,r,i,s,a)=>Qe(e,"PUT",r,s,a,i,t),head:async(e,r,i,s)=>Qe(e,"HEAD",r,$($({},i),{},{noResolveJson:!0}),s,void 0,t),remove:async(e,r,i,s,a)=>Qe(e,"DELETE",r,s,a,i,t)}}const Dn=bs("storage"),{get:yt,post:ne,put:Mr,head:Hn,remove:ii}=Dn,re=bs("vectors");var Xe=class{constructor(t,e={},r,i="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=Object.fromEntries(Object.entries(e).map(([s,a])=>[s.toLowerCase(),a])),this.fetch=Cn(r),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=$($({},this.headers),{},{[t.toLowerCase()]:e}),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(tr(r))return{data:null,error:r};throw r}}},qn=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e}then(t,e){return this.execute().then(t,e)}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(tr(e))return{data:null,error:e};throw e}}};let ws;ws=Symbol.toStringTag;var Fn=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[ws]="BlobDownloadBuilder",this.promise=null}asStream(){return new qn(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(tr(e))return{data:null,error:e};throw e}}};const Gn={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Ii={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Wn=class extends Xe{constructor(t,e={},r,i){super(t,e,i,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,i){var s=this;return s.handleOperation(async()=>{let a;const n=$($({},Ii),i);let o=$($({},s.headers),t==="POST"&&{"x-upsert":String(n.upsert)});const l=n.metadata;typeof Blob<"u"&&r instanceof Blob?(a=new FormData,a.append("cacheControl",n.cacheControl),l&&a.append("metadata",s.encodeMetadata(l)),a.append("",r)):typeof FormData<"u"&&r instanceof FormData?(a=r,a.has("cacheControl")||a.append("cacheControl",n.cacheControl),l&&!a.has("metadata")&&a.append("metadata",s.encodeMetadata(l))):(a=r,o["cache-control"]=`max-age=${n.cacheControl}`,o["content-type"]=n.contentType,l&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!n.duplex&&(n.duplex="half")),i!=null&&i.headers&&(o=$($({},o),i.headers));const c=s._removeEmptyFolders(e),u=s._getFinalPath(c),d=await(t=="PUT"?Mr:ne)(s.fetch,`${s.url}/object/${u}`,a,$({headers:o},n!=null&&n.duplex?{duplex:n.duplex}:{}));return{path:c,id:d.Id,fullPath:d.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,i){var s=this;const a=s._removeEmptyFolders(t),n=s._getFinalPath(a),o=new URL(s.url+`/object/upload/sign/${n}`);return o.searchParams.set("token",e),s.handleOperation(async()=>{let l;const c=$($({},Ii),i),u=$($({},s.headers),{"x-upsert":String(c.upsert)});return typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",c.cacheControl)):(l=r,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType),{path:a,fullPath:(await Mr(s.fetch,o.toString(),l,{headers:u})).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(t);const s=$({},r.headers);e!=null&&e.upsert&&(s["x-upsert"]="true");const a=await ne(r.fetch,`${r.url}/object/upload/sign/${i}`,{},{headers:s}),n=new URL(r.url+a.url),o=n.searchParams.get("token");if(!o)throw new er("No token returned by API");return{signedUrl:n.toString(),path:t,token:o}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var i=this;return i.handleOperation(async()=>await ne(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:i.headers}))}async copy(t,e,r){var i=this;return i.handleOperation(async()=>({path:(await ne(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:i.headers})).Key}))}async createSignedUrl(t,e,r){var i=this;return i.handleOperation(async()=>{let s=i._getFinalPath(t);const a=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let n=await ne(i.fetch,`${i.url}/object/sign/${s}`,$({expiresIn:e},a?{transform:r.transform}:{}),{headers:i.headers});const o=new URLSearchParams;r!=null&&r.download&&o.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&o.set("cacheNonce",String(r.cacheNonce));const l=o.toString(),c=a&&n.signedURL.includes("/object/sign/")?n.signedURL.replace("/object/sign/","/render/image/sign/"):n.signedURL;return{signedUrl:encodeURI(`${i.url}${c}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var i=this;return i.handleOperation(async()=>{const s=await ne(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:t},{headers:i.headers}),a=new URLSearchParams;r!=null&&r.download&&a.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&a.set("cacheNonce",String(r.cacheNonce));const n=a.toString();return s.map(o=>$($({},o),{},{signedUrl:o.signedURL?encodeURI(`${i.url}${o.signedURL}${n?`&${n}`:""}`):null}))})}download(t,e,r){const i=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",s=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const a=s.toString(),n=this._getFinalPath(t),o=()=>yt(this.fetch,`${this.url}/${i}/${n}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new Fn(o,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>Nr(await yt(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await Hn(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(tr(s)){var i;const a=s instanceof zr?s.status:s instanceof ys?(i=s.originalError)===null||i===void 0?void 0:i.status:void 0;if(a!==void 0&&[400,404].includes(a))return{data:!1,error:s}}throw s}}getPublicUrl(t,e){const r=this._getFinalPath(t),i=new URLSearchParams;e!=null&&e.download&&i.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce));const s=i.toString(),a=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${r}`)+(s?`?${s}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await ii(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async list(t,e,r){var i=this;return i.handleOperation(async()=>{const s=$($($({},Gn),e),{},{prefix:t||""});return await ne(i.fetch,`${i.url}/object/list/${i.bucketId}`,s,{headers:i.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const i=$({},t);return await ne(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,i,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const Vn="2.103.0",St={"X-Client-Info":`storage-js/${Vn}`};var Jn=class extends Xe{constructor(t,e={},r,i){const s=new URL(t);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const a=s.href.replace(/\/$/,""),n=$($({},St),e);super(a,n,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await yt(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await yt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await ne(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await Mr(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await ne(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ii(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Kn=class extends Xe{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=$($({},St),e);super(i,s,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await ne(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const i=r.toString(),s=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await yt(e.fetch,s,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ii(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!On(t))throw new er("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Rn({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(r,{get(s,a){const n=s[a];return typeof n!="function"?n:async(...o)=>{try{return{data:await n.apply(s,o),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},Yn=class extends Xe{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=$($({},St),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await re.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await re.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},Xn=class extends Xe{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=$($({},St),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Zn=class extends Xe{constructor(t,e={},r){const i=t.replace(/\/$/,""),s=$($({},St),{},{"Content-Type":"application/json"},e);super(i,s,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},Qn=class extends Zn{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new eo(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},eo=class extends Yn{constructor(t,e,r,i){super(t,e,i),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new to(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},to=class extends Xn{constructor(t,e,r,i,s){super(t,e,s),this.vectorBucketName=r,this.indexName=i}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,$($({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},ro=class extends Jn{constructor(t,e={},r,i){super(t,e,r,i)}from(t){return new Wn(this.url,this.headers,t,this.fetch)}get vectors(){return new Qn(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Kn(this.url+"/iceberg",this.headers,this.fetch)}};const xs="2.103.0",He=30*1e3,Ur=3,dr=Ur*He,io="http://localhost:9999",so="supabase.auth.token",ao={"X-Client-Info":`gotrue-js/${xs}`},Dr="X-Supabase-Api-Version",ks={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},no=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,oo=10*60*1e3;class bt extends Error{constructor(e,r,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=i}}function x(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class lo extends bt{constructor(e,r,i){super(e,r,i),this.name="AuthApiError",this.status=r,this.code=i}}function co(t){return x(t)&&t.name==="AuthApiError"}class Te extends bt{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class ve extends bt{constructor(e,r,i,s){super(e,i,s),this.name=r,this.status=i}}class te extends ve{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ot(t){return x(t)&&t.name==="AuthSessionMissingError"}class Be extends ve{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class jt extends ve{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Bt extends ve{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function uo(t){return x(t)&&t.name==="AuthImplicitGrantRedirectError"}class Pi extends ve{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class ho extends ve{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Hr extends ve{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function ur(t){return x(t)&&t.name==="AuthRetryableFetchError"}class Ri extends ve{constructor(e,r,i){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=i}}class qr extends ve{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Jt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Ci=` 	
\r=`.split(""),po=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Ci.length;e+=1)t[Ci[e].charCodeAt(0)]=-2;for(let e=0;e<Jt.length;e+=1)t[Jt[e].charCodeAt(0)]=e;return t})();function Li(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;r(Jt[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;r(Jt[i]),e.queuedBits-=6}}function _s(t,e,r){const i=po[t];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function Oi(t){const e=[],r=n=>{e.push(String.fromCodePoint(n))},i={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},a=n=>{fo(n,i,r)};for(let n=0;n<t.length;n+=1)_s(t.charCodeAt(n),s,a);return e.join("")}function mo(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function go(t,e){for(let r=0;r<t.length;r+=1){let i=t.charCodeAt(r);if(i>55295&&i<=56319){const s=(i-55296)*1024&65535;i=(t.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}mo(i,e)}}function fo(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let i=1;i<6;i+=1)if(!(t>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function Ge(t){const e=[],r={queue:0,queuedBits:0},i=s=>{e.push(s)};for(let s=0;s<t.length;s+=1)_s(t.charCodeAt(s),r,i);return new Uint8Array(e)}function vo(t){const e=[];return go(t,r=>e.push(r)),new Uint8Array(e)}function Pe(t){const e=[],r={queue:0,queuedBits:0},i=s=>{e.push(s)};return t.forEach(s=>Li(s,r,i)),Li(null,r,i),e.join("")}function yo(t){return Math.round(Date.now()/1e3)+t}function bo(){return Symbol("auth-callback")}const J=()=>typeof window<"u"&&typeof document<"u",Se={tested:!1,writable:!1},Ss=()=>{if(!J())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Se.tested)return Se.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Se.tested=!0,Se.writable=!0}catch{Se.tested=!0,Se.writable=!1}return Se.writable};function wo(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,a)=>{e[a]=s})}catch{}return r.searchParams.forEach((i,s)=>{e[s]=i}),e}const Es=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),xo=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",qe=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},Ee=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return r}},V=async(t,e)=>{await t.removeItem(e)};class rr{constructor(){this.promise=new rr.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}rr.promiseConstructor=Promise;function zt(t){const e=t.split(".");if(e.length!==3)throw new qr("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!no.test(e[i]))throw new qr("JWT not in base64url format");return{header:JSON.parse(Oi(e[0])),payload:JSON.parse(Oi(e[1])),signature:Ge(e[2]),raw:{header:e[0],payload:e[1]}}}async function ko(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function _o(t,e){return new Promise((i,s)=>{(async()=>{for(let a=0;a<1/0;a++)try{const n=await t(a);if(!e(a,null,n)){i(n);return}}catch(n){if(!e(a,n)){s(n);return}}})()})}function So(t){return("0"+t.toString(16)).substr(-2)}function Eo(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=r.length;let s="";for(let a=0;a<56;a++)s+=r.charAt(Math.floor(Math.random()*i));return s}return crypto.getRandomValues(e),Array.from(e,So).join("")}async function $o(t){const r=new TextEncoder().encode(t),i=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(i);return Array.from(s).map(a=>String.fromCharCode(a)).join("")}async function To(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await $o(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function ze(t,e,r=!1){const i=Eo();let s=i;r&&(s+="/PASSWORD_RECOVERY"),await qe(t,`${e}-code-verifier`,s);const a=await To(i);return[a,i===a?"plain":"s256"]}const Ao=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Io(t){const e=t.headers.get(Dr);if(!e||!e.match(Ao))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Po(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Ro(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Co=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Ne(t){if(!Co.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function hr(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const i=r.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Lo(t,e){return new Proxy(t,{get:(r,i,s)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const a=i.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,i,s)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,i,s)}})}function ji(t){return JSON.parse(JSON.stringify(t))}const $e=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),Oo=[502,503,504];async function Bi(t){var e;if(!xo(t))throw new Hr($e(t),0);if(Oo.includes(t.status))throw new Hr($e(t),t.status);let r;try{r=await t.json()}catch(a){throw new Te($e(a),a)}let i;const s=Io(t);if(s&&s.getTime()>=ks["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?i=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(i=r.error_code),i){if(i==="weak_password")throw new Ri($e(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new te}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((a,n)=>a&&typeof n=="string",!0))throw new Ri($e(r),t.status,r.weak_password.reasons);throw new lo($e(r),t.status||500,i)}const jo=(t,e,r,i)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(i),Object.assign(Object.assign({},s),r))};async function E(t,e,r,i){var s;const a=Object.assign({},i==null?void 0:i.headers);a[Dr]||(a[Dr]=ks["2024-01-01"].name),i!=null&&i.jwt&&(a.Authorization=`Bearer ${i.jwt}`);const n=(s=i==null?void 0:i.query)!==null&&s!==void 0?s:{};i!=null&&i.redirectTo&&(n.redirect_to=i.redirectTo);const o=Object.keys(n).length?"?"+new URLSearchParams(n).toString():"",l=await Bo(t,e,r+o,{headers:a,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function Bo(t,e,r,i,s,a){const n=jo(e,i,s,a);let o;try{o=await t(r,Object.assign({},n))}catch(l){throw console.error(l),new Hr($e(l),0)}if(o.ok||await Bi(o),i!=null&&i.noResolveJson)return o;try{return await o.json()}catch(l){await Bi(l)}}function ae(t){var e;let r=null;Mo(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=yo(t.expires_in)));const i=(e=t.user)!==null&&e!==void 0?e:t;return{data:{session:r,user:i},error:null}}function zi(t){const e=ae(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,i)=>r&&typeof i=="string",!0)&&(e.data.weak_password=t.weak_password),e}function xe(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function zo(t){return{data:t,error:null}}function No(t){const{action_link:e,email_otp:r,hashed_token:i,redirect_to:s,verification_type:a}=t,n=Qt(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:r,hashed_token:i,redirect_to:s,verification_type:a},l=Object.assign({},n);return{data:{properties:o,user:l},error:null}}function Ni(t){return t}function Mo(t){return t.access_token&&t.refresh_token&&t.expires_in}const pr=["global","local","others"];class Uo{constructor({url:e="",headers:r={},fetch:i}){this.url=e,this.headers=r,this.fetch=Es(i),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,r=pr[0]){if(pr.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${pr.join(", ")}`);try{return await E(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(x(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,r={}){try{return await E(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:xe})}catch(i){if(x(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:r}=e,i=Qt(e,["options"]),s=Object.assign(Object.assign({},i),r);return"newEmail"in i&&(s.new_email=i==null?void 0:i.newEmail,delete s.newEmail),await E(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:No,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(x(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await E(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:xe})}catch(r){if(x(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,i,s,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await E(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&i!==void 0?i:"",per_page:(a=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:Ni});if(u.error)throw u.error;const d=await u.json(),h=(n=u.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(x(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Ne(e);try{return await E(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:xe})}catch(r){if(x(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){Ne(e);try{return await E(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:xe})}catch(i){if(x(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,r=!1){Ne(e);try{return await E(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:xe})}catch(i){if(x(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){Ne(e.userId);try{const{data:r,error:i}=await E(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:i}}catch(r){if(x(r))return{data:null,error:r};throw r}}async _deleteFactor(e){Ne(e.userId),Ne(e.id);try{return{data:await E(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(x(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,i,s,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await E(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&i!==void 0?i:"",per_page:(a=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:Ni});if(u.error)throw u.error;const d=await u.json(),h=(n=u.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(m=>{const g=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),v=JSON.parse(m.split(";")[1].split("=")[1]);c[`${v}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(x(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(x(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await E(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(x(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await E(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(x(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(x(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(x(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await E(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:i=>{var s;return{data:{providers:(s=i==null?void 0:i.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(r){if(x(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await E(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(x(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await E(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(x(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await E(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(x(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(x(r))return{data:null,error:r};throw r}}}function Mi(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}const le={debug:!!(globalThis&&Ss()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class $s extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Ui extends $s{}async function Do(t,e,r){le.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",t,e);const i=new globalThis.AbortController;let s;e>0&&(s=setTimeout(()=>{i.abort(),le.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",t)},e)),await Promise.resolve();try{return await globalThis.navigator.locks.request(t,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:i.signal},async a=>{if(a){clearTimeout(s),le.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",t,a.name);try{return await r()}finally{le.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",t,a.name)}}else{if(e===0)throw le.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",t),new Ui(`Acquiring an exclusive Navigator LockManager lock "${t}" immediately failed`);if(le.debug)try{const n=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(n,null,"  "))}catch(n){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",n)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(s),await r()}})}catch(a){if(e>0&&clearTimeout(s),(a==null?void 0:a.name)==="AbortError"&&e>0){if(i.signal.aborted)return le.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",t),console.warn(`@supabase/gotrue-js: Lock "${t}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(t,{mode:"exclusive",steal:!0},async n=>{if(n){le.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",t,n.name);try{return await r()}finally{le.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",t,n.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r()}));throw le.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",t),new Ui(`Lock "${t}" was released because another request stole it`)}throw a}}function Ho(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Ts(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function qo(t){return parseInt(t,16)}function Fo(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Go(t){var e;const{chainId:r,domain:i,expirationTime:s,issuedAt:a=new Date,nonce:n,notBefore:o,requestId:l,resources:c,scheme:u,uri:d,version:h}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(n&&n.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${n}`);if(!d)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const p=Ts(t.address),m=u?`${u}://${i}`:i,g=t.statement?`${t.statement}
`:"",v=`${m} wants you to sign in with your Ethereum account:
${p}

${g}`;let y=`URI: ${d}
Version: ${h}
Chain ID: ${r}${n?`
Nonce: ${n}`:""}
Issued At: ${a.toISOString()}`;if(s&&(y+=`
Expiration Time: ${s.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),c){let k=`
Resources:`;for(const f of c){if(!f||typeof f!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${f}`);k+=`
- ${f}`}y+=k}return`${v}
${y}`}class q extends Error{constructor({message:e,code:r,cause:i,name:s}){var a;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(a=s??(i instanceof Error?i.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=r}}class Kt extends q{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function Wo({error:t,options:e}){var r,i,s;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new q({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((i=a.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new q({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new q({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new q({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new q({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new q({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const n=window.location.hostname;if(As(n)){if(a.rp.id!==n)return new q({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new q({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function Vo({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new q({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new q({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const i=window.location.hostname;if(As(i)){if(r.rpId!==i)return new q({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new q({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new q({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new q({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Jo{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Ko=new Jo;function Yo(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:i}=t,s=Qt(t,["challenge","user","excludeCredentials"]),a=Ge(e).buffer,n=Object.assign(Object.assign({},r),{id:Ge(r.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:a,user:n});if(i&&i.length>0){o.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:Ge(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Xo(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,i=Qt(t,["challenge","allowCredentials"]),s=Ge(e).buffer,a=Object.assign(Object.assign({},i),{challenge:s});if(r&&r.length>0){a.allowCredentials=new Array(r.length);for(let n=0;n<r.length;n++){const o=r[n];a.allowCredentials[n]=Object.assign(Object.assign({},o),{id:Ge(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function Zo(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:Pe(new Uint8Array(t.response.attestationObject)),clientDataJSON:Pe(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Qo(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,i=t.getClientExtensionResults(),s=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:Pe(new Uint8Array(s.authenticatorData)),clientDataJSON:Pe(new Uint8Array(s.clientDataJSON)),signature:Pe(new Uint8Array(s.signature)),userHandle:s.userHandle?Pe(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function As(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Di(){var t,e;return!!(J()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function el(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Kt("Browser returned unexpected credential type",e)}:{data:null,error:new Kt("Empty credential response",e)}}catch(e){return{data:null,error:Wo({error:e,options:t})}}}async function tl(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Kt("Browser returned unexpected credential type",e)}:{data:null,error:new Kt("Empty credential response",e)}}catch(e){return{data:null,error:Vo({error:e,options:t})}}}const rl={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},il={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Yt(...t){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),i={};for(const s of t)if(s)for(const a in s){const n=s[a];if(n!==void 0)if(Array.isArray(n))i[a]=n;else if(r(n))i[a]=n;else if(e(n)){const o=i[a];e(o)?i[a]=Yt(o,n):i[a]=Yt(n)}else i[a]=n}return i}function sl(t,e){return Yt(rl,t,e||{})}function al(t,e){return Yt(il,t,e||{})}class nl{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:i,signal:s},a){var n;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=s??Ko.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:u}=o.webauthn.credential_options.publicKey;if(!u.name){const d=i;if(d)u.name=`${u.id}:${d}`;else{const p=(await this.client.getUser()).data.user,m=((n=p==null?void 0:p.user_metadata)===null||n===void 0?void 0:n.name)||(p==null?void 0:p.email)||(p==null?void 0:p.id)||"User";u.name=`${u.id}:${m}`}}u.displayName||(u.displayName=u.name)}switch(o.webauthn.type){case"create":{const u=sl(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:d,error:h}=await el({publicKey:u,signal:c});return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:h}}case"request":{const u=al(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:d,error:h}=await tl(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:u,signal:c}));return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:h}}}}catch(o){return x(o)?{data:null,error:o}:{data:null,error:new Te("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:i}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new bt("rpId is required for WebAuthn authentication")};try{if(!Di())return{data:null,error:new Te("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:i},signal:s},{request:a});if(!n)return{data:null,error:o};const{webauthn:l}=n;return this._verify({factorId:e,challengeId:n.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:i,credential_response:l.credential_response}})}catch(n){return x(n)?{data:null,error:n}:{data:null,error:new Te("Unexpected error in authenticate",n)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new bt("rpId is required for WebAuthn registration")};try{if(!Di())return{data:null,error:new Te("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this._enroll({friendlyName:e});if(!n)return await this.client.mfa.listFactors().then(u=>{var d;return(d=u.data)===null||d===void 0?void 0:d.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(u=>u?this.client.mfa.unenroll({factorId:u==null?void 0:u.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:n.id,friendlyName:n.friendly_name,webauthn:{rpId:r,rpOrigins:i},signal:s},{create:a});return l?this._verify({factorId:n.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(n){return x(n)?{data:null,error:n}:{data:null,error:new Te("Unexpected error in register",n)}}}}Ho();const ol={url:io,storageKey:so,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ao,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function Hi(t,e,r){return await r()}const Me={};class wt{get jwks(){var e,r;return(r=(e=Me[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){Me[this.storageKey]=Object.assign(Object.assign({},Me[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=Me[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Me[this.storageKey]=Object.assign(Object.assign({},Me[this.storageKey]),{cachedAt:e})}constructor(e){var r,i,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},ol),e);if(this.storageKey=a.storageKey,this.instanceID=(r=wt.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,wt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&J()){const n=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(n),this.logDebugMessages&&console.trace(n)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new Uo({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=Es(a.fetch),this.lock=a.lock||Hi,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock?this.lock=a.lock:this.persistSession&&J()&&(!((i=globalThis==null?void 0:globalThis.navigator)===null||i===void 0)&&i.locks)?this.lock=Do:this.lock=Hi,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new nl(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:Ss()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Mi(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=Mi(this.memoryStorage)),J()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(n){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",n)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async n=>{this._debug("received broadcast notification from other tab or client",n);try{await this._notifyAllSubscribers(n.data.event,n.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}a.skipAutoInitialize||this.initialize().catch(n=>{this._debug("#initialize()","error",n)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${xs}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let r={},i="none";if(J()&&(r=wo(window.location.href),this._isImplicitGrantCallback(r)?i="implicit":await this._isPKCECallback(r)&&(i="pkce")),J()&&this.detectSessionInUrl&&i!=="none"){const{data:s,error:a}=await this._getSessionFromURL(r,i);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),uo(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:n,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",n,"redirect type",o),await this._saveSession(n),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return x(r)?this._returnResult({error:r}):this._returnResult({error:new Te("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,i,s;try{const a=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:ae}),{data:n,error:o}=a;if(o||!n)return this._returnResult({data:{user:null,session:null},error:o});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(x(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var r,i,s;try{let a;if("email"in e){const{email:u,password:d,options:h}=e;let p=null,m=null;this.flowType==="pkce"&&([p,m]=await ze(this.storage,this.storageKey)),a=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:u,password:d,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:p,code_challenge_method:m},xform:ae})}else if("phone"in e){const{phone:u,password:d,options:h}=e;a=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:d,data:(i=h==null?void 0:h.data)!==null&&i!==void 0?i:{},channel:(s=h==null?void 0:h.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:ae})}else throw new jt("You must provide either an email or phone number and a password");const{data:n,error:o}=a;if(o||!n)return await V(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let r;if("email"in e){const{email:a,password:n,options:o}=e;r=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:zi})}else if("phone"in e){const{phone:a,password:n,options:o}=e;r=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:zi})}else throw new jt("You must provide either an email or phone number and a password");const{data:i,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!i||!i.session||!i.user){const a=new Be;return this._returnResult({data:{user:null,session:null},error:a})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:s})}catch(r){if(x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,i,s,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,i,s,a,n,o,l,c,u,d,h;let p,m;if("message"in e)p=e.message,m=e.signature;else{const{chain:g,wallet:v,statement:y,options:k}=e;let f;if(J())if(typeof v=="object")f=v;else{const T=window;if("ethereum"in T&&typeof T.ethereum=="object"&&"request"in T.ethereum&&typeof T.ethereum.request=="function")f=T.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(k!=null&&k.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");f=v}const A=new URL((r=k==null?void 0:k.url)!==null&&r!==void 0?r:window.location.href),z=await f.request({method:"eth_requestAccounts"}).then(T=>T).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!z||z.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const P=Ts(z[0]);let b=(i=k==null?void 0:k.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!b){const T=await f.request({method:"eth_chainId"});b=qo(T)}const I={domain:A.host,address:P,statement:y,uri:A.href,version:"1",chainId:b,nonce:(s=k==null?void 0:k.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(n=(a=k==null?void 0:k.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&n!==void 0?n:new Date,expirationTime:(o=k==null?void 0:k.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=k==null?void 0:k.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=k==null?void 0:k.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(u=k==null?void 0:k.signInWithEthereum)===null||u===void 0?void 0:u.resources};p=Go(I),m=await f.request({method:"personal_sign",params:[Fo(p),P]})}try{const{data:g,error:v}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:p,signature:m},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:ae});if(v)throw v;if(!g||!g.session||!g.user){const y=new Be;return this._returnResult({data:{user:null,session:null},error:y})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:v})}catch(g){if(x(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var r,i,s,a,n,o,l,c,u,d,h,p;let m,g;if("message"in e)m=e.message,g=e.signature;else{const{chain:v,wallet:y,statement:k,options:f}=e;let A;if(J())if(typeof y=="object")A=y;else{const P=window;if("solana"in P&&typeof P.solana=="object"&&("signIn"in P.solana&&typeof P.solana.signIn=="function"||"signMessage"in P.solana&&typeof P.solana.signMessage=="function"))A=P.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(f!=null&&f.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");A=y}const z=new URL((r=f==null?void 0:f.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in A&&A.signIn){const P=await A.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},f==null?void 0:f.signInWithSolana),{version:"1",domain:z.host,uri:z.href}),k?{statement:k}:null));let b;if(Array.isArray(P)&&P[0]&&typeof P[0]=="object")b=P[0];else if(P&&typeof P=="object"&&"signedMessage"in P&&"signature"in P)b=P;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in b&&"signature"in b&&(typeof b.signedMessage=="string"||b.signedMessage instanceof Uint8Array)&&b.signature instanceof Uint8Array)m=typeof b.signedMessage=="string"?b.signedMessage:new TextDecoder().decode(b.signedMessage),g=b.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in A)||typeof A.signMessage!="function"||!("publicKey"in A)||typeof A!="object"||!A.publicKey||!("toBase58"in A.publicKey)||typeof A.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${z.host} wants you to sign in with your Solana account:`,A.publicKey.toBase58(),...k?["",k,""]:[""],"Version: 1",`URI: ${z.href}`,`Issued At: ${(s=(i=f==null?void 0:f.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((a=f==null?void 0:f.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${f.signInWithSolana.notBefore}`]:[],...!((n=f==null?void 0:f.signInWithSolana)===null||n===void 0)&&n.expirationTime?[`Expiration Time: ${f.signInWithSolana.expirationTime}`]:[],...!((o=f==null?void 0:f.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${f.signInWithSolana.chainId}`]:[],...!((l=f==null?void 0:f.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${f.signInWithSolana.nonce}`]:[],...!((c=f==null?void 0:f.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${f.signInWithSolana.requestId}`]:[],...!((d=(u=f==null?void 0:f.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||d===void 0)&&d.length?["Resources",...f.signInWithSolana.resources.map(b=>`- ${b}`)]:[]].join(`
`);const P=await A.signMessage(new TextEncoder().encode(m),"utf8");if(!P||!(P instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=P}}try{const{data:v,error:y}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:Pe(g)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:ae});if(y)throw y;if(!v||!v.session||!v.user){const k=new Be;return this._returnResult({data:{user:null,session:null},error:k})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:y})}catch(v){if(x(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async _exchangeCodeForSession(e){const r=await Ee(this.storage,`${this.storageKey}-code-verifier`),[i,s]=(r??"").split("/");try{if(!i&&this.flowType==="pkce")throw new ho;const{data:a,error:n}=await E(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:i},xform:ae});if(await V(this.storage,`${this.storageKey}-code-verifier`),n)throw n;if(!a||!a.session||!a.user){const o=new Be;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:s??null}),error:n})}catch(a){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(e){try{const{options:r,provider:i,token:s,access_token:a,nonce:n}=e,o=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:s,access_token:a,nonce:n,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:ae}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const u=new Be;return this._returnResult({data:{user:null,session:null},error:u})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,i,s,a,n;try{if("email"in e){const{email:o,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await ze(this.storage,this.storageKey));const{error:d}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:d})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:u}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(n=l==null?void 0:l.channel)!==null&&n!==void 0?n:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u})}throw new jt("You must provide either an email or phone number.")}catch(o){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var r,i;try{let s,a;"options"in e&&(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo,a=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:n,error:o}=await E(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:s,xform:ae});if(o)throw o;if(!n)throw new Error("An error occurred on token verification.");const l=n.session,c=n.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(s){if(x(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(e){var r,i,s,a,n;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await ze(this.storage,this.storageKey));const c=await E(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(i=(r=e.options)===null||r===void 0?void 0:r.redirectTo)!==null&&i!==void 0?i:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:zo});return!((a=c.data)===null||a===void 0)&&a.url&&J()&&!(!((n=e.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:i}=e;if(i)throw i;if(!r)throw new te;const{error:s}=await E(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(e){if(x(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const r=`${this.url}/resend`;if("email"in e){const{email:i,type:s,options:a}=e,{error:n}=await E(this.fetch,"POST",r,{headers:this.headers,body:{email:i,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:n})}else if("phone"in e){const{phone:i,type:s,options:a}=e,{data:n,error:o}=await E(this.fetch,"POST",r,{headers:this.headers,body:{phone:i,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:n==null?void 0:n.message_id},error:o})}throw new jt("You must provide either an email or phone number and a type")}catch(r){if(x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await i,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=r();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await Ee(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<dr:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i){if(this.userStorage){const n=await Ee(this.userStorage,this.storageKey+"-user");n!=null&&n.user?e.user=n.user:e.user=hr()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const n={value:this.suppressGetSessionWarning};e.user=Lo(e.user,n),n.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:xe}):await this._useSession(async r=>{var i,s,a;const{data:n,error:o}=r;if(o)throw o;return!(!((i=n.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new te}:await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0,xform:xe})})}catch(r){if(x(r))return Ot(r)&&(await this._removeSession(),await V(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r))}async _updateUser(e,r={}){try{return await this._useSession(async i=>{const{data:s,error:a}=i;if(a)throw a;if(!s.session)throw new te;const n=s.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await ze(this.storage,this.storageKey));const{data:c,error:u}=await E(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:n.access_token,xform:xe});if(u)throw u;return n.user=c.user,await this._saveSession(n),await this._notifyAllSubscribers("USER_UPDATED",n),this._returnResult({data:{user:n.user},error:null})})}catch(i){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(i))return this._returnResult({data:{user:null},error:i});throw i}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new te;const r=Date.now()/1e3;let i=r,s=!0,a=null;const{payload:n}=zt(e.access_token);if(n.exp&&(i=n.exp,s=i<=r),s){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:i-r,expires_at:i},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(r){if(x(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async r=>{var i;if(!e){const{data:n,error:o}=r;if(o)throw o;e=(i=n.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new te;const{data:s,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(x(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){try{if(!J())throw new Bt("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Bt(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Pi("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Bt("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Pi("No code detected.");const{data:k,error:f}=await this._exchangeCodeForSession(e.code);if(f)throw f;const A=new URL(window.location.href);return A.searchParams.delete("code"),window.history.replaceState(window.history.state,"",A.toString()),{data:{session:k.session,redirectType:null},error:null}}const{provider_token:i,provider_refresh_token:s,access_token:a,refresh_token:n,expires_in:o,expires_at:l,token_type:c}=e;if(!a||!o||!n||!c)throw new Bt("No session defined in URL");const u=Math.round(Date.now()/1e3),d=parseInt(o);let h=u+d;l&&(h=parseInt(l));const p=h-u;p*1e3<=He&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${d}s`);const m=h-d;u-m>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",m,h,u):u-m<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",m,h,u);const{data:g,error:v}=await this._getUser(a);if(v)throw v;const y={provider_token:i,provider_refresh_token:s,access_token:a,expires_in:d,expires_at:h,refresh_token:n,token_type:c,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:y,redirectType:e.type},error:null})}catch(i){if(x(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const r=await Ee(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&r)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a&&!Ot(a))return this._returnResult({error:a});const n=(i=s.session)===null||i===void 0?void 0:i.access_token;if(n){const{error:o}=await this.admin.signOut(n,e);if(o&&!(co(o)&&(o.status===404||o.status===401||o.status===403)||Ot(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await V(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const r=bo(),i={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,i),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async r=>{var i,s;try{const{data:{session:a},error:n}=r;if(n)throw n;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),Ot(a)?console.warn(a):console.error(a)}})}async resetPasswordForEmail(e,r={}){let i=null,s=null;this.flowType==="pkce"&&([i,s]=await ze(this.storage,this.storageKey,!0));try{return await E(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(a){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:r,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;try{const{data:i,error:s}=await this._useSession(async a=>{var n,o,l,c,u;const{data:d,error:h}=a;if(h)throw h;const p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(n=e.options)===null||n===void 0?void 0:n.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await E(this.fetch,"GET",p,{headers:this.headers,jwt:(u=(c=d.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(s)throw s;return J()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(i==null?void 0:i.url),this._returnResult({data:{provider:e.provider,url:i==null?void 0:i.url},error:null})}catch(i){if(x(i))return this._returnResult({data:{provider:e.provider,url:null},error:i});throw i}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var i;try{const{error:s,data:{session:a}}=r;if(s)throw s;const{options:n,provider:o,token:l,access_token:c,nonce:u}=e,d=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=a==null?void 0:a.access_token)!==null&&i!==void 0?i:void 0,body:{provider:o,id_token:l,access_token:c,nonce:u,link_identity:!0,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:ae}),{data:h,error:p}=d;return p?this._returnResult({data:{user:null,session:null},error:p}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new Be}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:p}))}catch(s){if(await V(this.storage,`${this.storageKey}-code-verifier`),x(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var i,s;const{data:a,error:n}=r;if(n)throw n;return await E(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{const i=Date.now();return await _o(async s=>(s>0&&await ko(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await E(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:ae})),(s,a)=>{const n=200*Math.pow(2,s);return a&&ur(a)&&Date.now()+n-i<He})}catch(i){if(this._debug(r,"error",i),x(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const i=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",i),J()&&!r.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i},error:null}}async _recoverAndRefresh(){var e,r;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const s=await Ee(this.storage,this.storageKey);if(s&&this.userStorage){let n=await Ee(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!n&&(n={user:s.user},await qe(this.userStorage,this.storageKey+"-user",n)),s.user=(e=n==null?void 0:n.user)!==null&&e!==void 0?e:hr()}else if(s&&!s.user&&!s.user){const n=await Ee(this.storage,this.storageKey+"-user");n&&(n!=null&&n.user)?(s.user=n.user,await V(this.storage,this.storageKey+"-user"),await qe(this.storage,this.storageKey,s)):s.user=hr()}if(this._debug(i,"session from storage",s),!this._isValidSession(s)){this._debug(i,"session is not valid"),s!==null&&await this._removeSession();return}const a=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<dr;if(this._debug(i,`session has${a?"":" not"} expired with margin of ${dr}s`),a){if(this.autoRefreshToken&&s.refresh_token){const{error:n}=await this._callRefreshToken(s.refresh_token);n&&(console.error(n),ur(n)||(this._debug(i,"refresh failed with a non-retryable error, removing the session",n),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:n,error:o}=await this._getUser(s.access_token);!o&&(n!=null&&n.user)?(s.user=n.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(n){console.error("Error getting user data:",n),this._debug(i,"error getting user data, skipping SIGNED_IN notification",n)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(i,"error",s),console.error(s);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var r,i;if(!e)throw new te;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new rr;const{data:a,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!a.session)throw new te;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(s,"error",a),x(a)){const n={data:null,error:a};return ur(a)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(n),n}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(a),a}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,r,i=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",r,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:r});const a=[],n=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,r)}catch(l){a.push(l)}});if(await Promise.all(n),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await V(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},e),i=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&r.user&&await qe(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const a=ji(s);await qe(this.storage,this.storageKey,a)}else{const s=ji(r);await qe(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await V(this.storage,this.storageKey),await V(this.storage,this.storageKey+"-code-verifier"),await V(this.storage,this.storageKey+"-user"),this.userStorage&&await V(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&J()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),He);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:i}}=r;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((i.expires_at*1e3-e)/He);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${He}ms, refresh threshold is ${Ur} ticks`),s<=Ur&&await this._callRefreshToken(i.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof $s)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!J()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,i){const s=[`provider=${encodeURIComponent(r)}`];if(i!=null&&i.redirectTo&&s.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),i!=null&&i.scopes&&s.push(`scopes=${encodeURIComponent(i.scopes)}`),this.flowType==="pkce"){const[a,n]=await ze(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(n)}`});s.push(o.toString())}if(i!=null&&i.queryParams){const a=new URLSearchParams(i.queryParams);s.push(a.toString())}return i!=null&&i.skipBrowserRedirect&&s.push(`skip_http_redirect=${i.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;return a?this._returnResult({data:null,error:a}):await E(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token})})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var i,s;const{data:a,error:n}=r;if(n)return this._returnResult({data:null,error:n});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await E(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(i=a==null?void 0:a.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const n=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Zo(e.webauthn.credential_response):Qo(e.webauthn.credential_response)})}:{code:e.code}),{data:o,error:l}=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:n,headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var i;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const n=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=s==null?void 0:s.session)===null||i===void 0?void 0:i.access_token});if(n.error)return n;const{data:o}=n;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Yo(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Xo(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(e){const{data:r,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:i}=await this.getUser();if(i)return{data:null,error:i};const s={all:[],phone:[],totp:[],webauthn:[]};for(const a of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])s.all.push(a),a.status==="verified"&&s[a.factor_type].push(a);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,i,s,a;if(e)try{const{payload:p}=zt(e);let m=null;p.aal&&(m=p.aal);let g=m;const{data:{user:v},error:y}=await this.getUser(e);if(y)return this._returnResult({data:null,error:y});((i=(r=v==null?void 0:v.factors)===null||r===void 0?void 0:r.filter(A=>A.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(g="aal2");const f=p.amr||[];return{data:{currentLevel:m,nextLevel:g,currentAuthenticationMethods:f},error:null}}catch(p){if(x(p))return this._returnResult({data:null,error:p});throw p}const{data:{session:n},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=zt(n.access_token);let c=null;l.aal&&(c=l.aal);let u=c;((a=(s=n.user.factors)===null||s===void 0?void 0:s.filter(p=>p.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(u="aal2");const h=l.amr||[];return{data:{currentLevel:c,nextLevel:u,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:i},error:s}=r;return s?this._returnResult({data:null,error:s}):i?await E(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new te})})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async i=>{const{data:{session:s},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new te});const n=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&J()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(x(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,r){try{return await this._useSession(async i=>{const{data:{session:s},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new te});const n=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&J()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(x(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:i}=e;return i?this._returnResult({data:null,error:i}):r?await E(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new te})})}catch(e){if(x(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:i},error:s}=r;return s?this._returnResult({data:null,error:s}):i?(await E(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new te})})}catch(r){if(x(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let i=r.keys.find(o=>o.kid===e);if(i)return i;const s=Date.now();if(i=this.jwks.keys.find(o=>o.kid===e),i&&this.jwks_cached_at+oo>s)return i;const{data:a,error:n}=await E(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(n)throw n;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=s,i=a.keys.find(o=>o.kid===e),!i)?null:i}async getClaims(e,r={}){try{let i=e;if(!i){const{data:p,error:m}=await this.getSession();if(m||!p.session)return this._returnResult({data:null,error:m});i=p.session.access_token}const{header:s,payload:a,signature:n,raw:{header:o,payload:l}}=zt(i);r!=null&&r.allowExpired||Po(a.exp);const c=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!c){const{error:p}=await this.getUser(i);if(p)throw p;return{data:{claims:a,header:s,signature:n},error:null}}const u=Ro(s.alg),d=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,d,n,vo(`${o}.${l}`)))throw new qr("Invalid JWT signature");return{data:{claims:a,header:s,signature:n},error:null}}catch(i){if(x(i))return this._returnResult({data:null,error:i});throw i}}}wt.nextInstanceID={};const ll=wt,cl="2.103.0";let it="";typeof Deno<"u"?it="deno":typeof document<"u"?it="web":typeof navigator<"u"&&navigator.product==="ReactNative"?it="react-native":it="node";const dl={"X-Client-Info":`supabase-js-${it}/${cl}`},ul={headers:dl},hl={schema:"public"},pl={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},ml={};function xt(t){"@babel/helpers - typeof";return xt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},xt(t)}function gl(t,e){if(xt(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,e);if(xt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function fl(t){var e=gl(t,"string");return xt(e)=="symbol"?e:e+""}function vl(t,e,r){return(e=fl(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function qi(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,i)}return r}function U(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?qi(Object(r),!0).forEach(function(i){vl(t,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):qi(Object(r)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(r,i))})}return t}const yl=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),bl=()=>Headers,wl=(t,e,r)=>{const i=yl(r),s=bl();return async(a,n)=>{var o;const l=(o=await e())!==null&&o!==void 0?o:t;let c=new s(n==null?void 0:n.headers);return c.has("apikey")||c.set("apikey",t),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),i(a,U(U({},n),{},{headers:c}))}};function xl(t){return t.endsWith("/")?t:t+"/"}function kl(t,e){var r,i;const{db:s,auth:a,realtime:n,global:o}=t,{db:l,auth:c,realtime:u,global:d}=e,h={db:U(U({},l),s),auth:U(U({},c),a),realtime:U(U({},u),n),storage:{},global:U(U(U({},d),o),{},{headers:U(U({},(r=d==null?void 0:d.headers)!==null&&r!==void 0?r:{}),(i=o==null?void 0:o.headers)!==null&&i!==void 0?i:{})}),accessToken:async()=>""};return t.accessToken?h.accessToken=t.accessToken:delete h.accessToken,h}function _l(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(xl(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Sl=class extends ll{constructor(t){super(t)}},El=class{constructor(t,e,r){var i,s;this.supabaseUrl=t,this.supabaseKey=e;const a=_l(t);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const n=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:hl,realtime:ml,auth:U(U({},pl),{},{storageKey:n}),global:ul},l=kl(r??{},o);if(this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(u,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=wl(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(U({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(u=>this.realtime.setAuth(u)).catch(u=>console.warn("Failed to set initial Realtime auth token:",u)),this.rest=new Fa(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new ro(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Oa(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:i}=await t.auth.getSession();return(e=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:i,userStorage:s,storageKey:a,flowType:n,lock:o,debug:l,throwOnError:c},u,d){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Sl({url:this.authUrl.href,headers:U(U({},h),u),storageKey:a,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:i,userStorage:s,flowType:n,lock:o,debug:l,throwOnError:c,fetch:d,hasCustomAuthorizationHeader:Object.keys(this.headers).some(p=>p.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new En(this.realtimeUrl.href,U(U({},t),{},{params:U(U({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const $l=(t,e,r)=>new El(t,e,r);function Tl(){if(typeof window<"u")return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}Tl()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const Is="https://icgjldvgvtesoehtoinf.supabase.co",Fr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",R=$l(Is,Fr,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0}}),Ps=4e3,Al=1500;function si(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Il(t=""){const e={apikey:Fr};return t?e.Authorization=`Bearer ${t}`:e.Authorization=`Bearer ${Fr}`,e}async function Pl(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok)throw new Error(e&&(e.message||e.msg)||"Supabase request failed.");return e}async function ai(t,e,{accessToken:r="",timeoutMs:i=Ps}={}){const s=`${Is}/rest/v1/${t}?${e.toString()}`,a=await si(fetch(s,{headers:Il(r)}),i,`${t} request timed out.`),n=await Pl(a);return Array.isArray(n)?n:[]}async function Rl(t,e){const r=new URLSearchParams({select:"*",host_id:`eq.${e}`,status:"eq.approved",order:"created_at.desc"});return ai(t,r)}async function Cl(t,e){const{data:r,error:i}=await si(R.from(t).select("*").eq("host_id",e).order("created_at",{ascending:!1}),Ps,`${t} request timed out.`);if(i)throw i;return r||[]}async function Ll(){const{data:t}=await R.auth.getSession();return t.session}async function Rs(){const{data:{user:t}}=await R.auth.getUser();if(!t)return null;const{data:e}=await R.from("profiles").select("*").eq("id",t.id).single();return e?{...t,...e}:t}async function Ol({email:t,password:e,fullName:r,phone:i}){const{data:s,error:a}=await R.auth.signUp({email:t,password:e,options:{data:{full_name:r}}});if(a)throw a;return s.user&&await R.from("profiles").upsert({id:s.user.id,full_name:r,phone:i,role:"user"}),s}async function Cs({email:t,password:e}){const{data:r,error:i}=await R.auth.signInWithPassword({email:t,password:e});if(i)throw i;return r}async function Ls(t){const e=window.location.origin+"/LushaiTrips/",{error:r}=await R.auth.resend({type:"signup",email:t,options:{emailRedirectTo:e}});if(r)throw r}async function jl(){const{error:t}=await R.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/LushaiTrips/"}});if(t)throw t}async function Bl(){const{error:t}=await R.auth.signOut();t&&console.warn("[signOut]",t.message)}async function zl(t){const{error:e}=await R.auth.signInWithOtp({phone:t});if(e)throw e}async function Nl(t,e,r={}){var n;const{data:i,error:s}=await R.auth.verifyOtp({phone:t,token:e,type:"sms"});if(s)throw s;const a=i==null?void 0:i.user;return a&&await R.from("profiles").upsert({id:a.id,phone:t,full_name:r.full_name||((n=a.user_metadata)==null?void 0:n.full_name)||"",role:"user"}),i}async function Os(t="all"){let e=R.from("destinations").select("*").order("rating",{ascending:!1});t&&t!=="all"&&(e=e.eq("category",t));const{data:r,error:i}=await e;if(i)throw i;return r||[]}async function js(t){const{data:e,error:r}=await R.from("destinations").select("*").eq("id",t).single();if(r)throw r;return e}async function Bs(t="all"){let e=R.from("stays").select("*").eq("status","approved").order("top_rated",{ascending:!1});t&&t!=="all"&&(e=e.ilike("type",t));const{data:r,error:i}=await e;if(i)throw i;return r||[]}async function Ml(t){const{data:e,error:r}=await R.from("stays").select("*").eq("id",t).single();if(r)throw r;return e}async function zs(){const{data:t,error:e}=await R.from("guides").select("*").eq("status","approved").order("rating",{ascending:!1});if(e)throw e;return t||[]}async function Ns(t){const{data:e,error:r}=await R.from("guides").select("*").eq("id",t).single();if(r)throw r;return e}async function Ms(){const t=new URLSearchParams({select:"*",status:"eq.approved",order:"rating.desc"});return ai("transport",t)}async function Us(t){const e=new URLSearchParams({select:"*",id:`eq.${t}`,status:"eq.approved",limit:"1"}),r=await ai("transport",e);if(!r.length)throw new Error("Transport listing not found.");return r[0]}async function Ul(t){const{data:{user:e}}=await R.auth.getUser();if(!e)throw new Error("You must be logged in to book");const r={user_id:e.id,listing_id:t.listingId,listing_name:t.listingName,listing_type:t.listingType,checkin:t.checkin||null,checkout:t.checkout||null,guests:parseInt(t.guests)||1,total:t.total,guest_name:t.guestName,guest_email:t.guestEmail,guest_phone:t.guestPhone,notes:t.notes||"",payment_id:t.paymentId||null,status:"confirmed"},{data:i,error:s}=await R.from("bookings").insert(r).select().single();if(s)throw s;return localStorage.setItem("lt_last_booking",JSON.stringify(i)),i}async function Dl(){const{data:{user:t}}=await R.auth.getUser();if(!t)return[];const{data:e,error:r}=await R.from("bookings").select("*").eq("user_id",t.id).order("created_at",{ascending:!1});if(r)throw r;return e||[]}function Hl(){try{return JSON.parse(localStorage.getItem("lt_last_booking"))}catch{return null}}async function Ds(t){const{data:{user:e}}=await R.auth.getUser();if(!e)throw new Error("Not logged in");const{data:r,error:i}=await R.from("stays").insert({...t,host_id:e.id,status:"approved"}).select().single();if(i)throw i;return r}async function ql(t){var n,o;const e=(t==null?void 0:t.host_id)||null,r={...t};delete r.host_id;const i=e||((o=(n=(await R.auth.getUser()).data)==null?void 0:n.user)==null?void 0:o.id)||null;if(!i)throw new Error("Not logged in");const{data:s,error:a}=await R.from("guides").insert({...r,host_id:i,status:"approved"}).select().single();if(a)throw a;return s}async function Fl(t){const{data:{user:e}}=await R.auth.getUser();if(!e)throw new Error("Not logged in");const{data:r,error:i}=await R.from("transport").insert({...t,host_id:e.id,status:"approved"}).select().single();if(i)throw i;return r}async function Hs(t,e="guide-images"){const r=t.type.includes("png")?"png":"jpg",i=`${Date.now()}-${Math.random().toString(36).slice(2)}.${r}`,{data:s,error:a}=await R.storage.from(e).upload(i,t,{contentType:t.type,upsert:!0});if(a)throw new Error(`Image upload failed: ${a.message}`);const{data:n}=R.storage.from(e).getPublicUrl(s.path);return n.publicUrl}async function Gl(t,e="guide-images"){try{const i=await(await fetch(t)).blob();return Hs(i,e)}catch(r){throw new Error(`Image upload failed: ${r.message}`)}}async function qs(t=null){var l,c,u,d,h;const e=t||((c=(l=(await R.auth.getUser()).data)==null?void 0:l.user)==null?void 0:c.id)||null;if(!e)return{stays:[],guides:[],transport:[]};const r=await si(R.auth.getSession(),Al,"Session lookup timed out.").catch(()=>null),i=((h=(d=(u=r==null?void 0:r.data)==null?void 0:u.session)==null?void 0:d.user)==null?void 0:h.id)===e,s=async p=>{if(i)try{return await Cl(p,e)}catch(m){console.warn(`[host-listings] ${p} auth read failed, falling back to public rows:`,m.message)}try{return await Rl(p,e)}catch(m){return console.warn(`[host-listings] ${p} public read failed:`,m.message),[]}},[a,n,o]=await Promise.all([s("stays"),s("guides"),s("transport")]);return{stays:a,guides:n,transport:o}}async function Wl(t){const{data:e,error:r}=await R.from("reviews").select("*").eq("listing_id",t).order("created_at",{ascending:!1});return r?[]:e||[]}async function Vl({listingId:t,listingType:e,rating:r,comment:i}){const{data:{user:s}}=await R.auth.getUser();if(!s)throw new Error("Login required");const a=await Rs(),{data:n,error:o}=await R.from("reviews").insert({user_id:s.id,listing_id:t,listing_type:e,rating:r,comment:i,reviewer_name:(a==null?void 0:a.full_name)||"Guest"}).select().single();if(o)throw o;return n}function ni(){try{return JSON.parse(localStorage.getItem("lt_wishlist"))||[]}catch{return[]}}function Jl(t){const e=ni(),r=e.indexOf(t);return r===-1?e.push(t):e.splice(r,1),localStorage.setItem("lt_wishlist",JSON.stringify(e)),e.includes(t)}function Kl(t){return ni().includes(t)}const ir=Object.freeze(Object.defineProperty({__proto__:null,addReview:Vl,createBooking:Ul,fetchDestinationById:js,fetchDestinations:Os,fetchGuideById:Ns,fetchGuides:zs,fetchReviews:Wl,fetchStayById:Ml,fetchStays:Bs,fetchTransport:Ms,fetchTransportById:Us,getCurrentUser:Rs,getHostListings:qs,getLastBooking:Hl,getSession:Ll,getUserBookings:Dl,getWishlist:ni,insertGuide:ql,insertStay:Ds,insertTransport:Fl,isWishlisted:Kl,resendSignupConfirmation:Ls,sendPhoneOtp:zl,signInEmail:Cs,signInGoogle:jl,signOut:Bl,signUpEmail:Ol,supabase:R,toggleWishlist:Jl,uploadFileToStorage:Hs,uploadImageToStorage:Gl,verifyPhoneOtp:Nl},Symbol.toStringTag,{value:"Module"}));let We=ti,Fi=!1;const Fs=5e3;function Gs(t,e){return Promise.race([t,new Promise((r,i)=>setTimeout(()=>i(new Error("timeout")),e))])}function ke(t){if(Array.isArray(t))return t.filter(Boolean);if(typeof t!="string")return[];const e=t.trim();if(!e)return[];try{const r=JSON.parse(e);return Array.isArray(r)?r.filter(Boolean):[]}catch{return e.split(",").map(r=>r.trim()).filter(Boolean)}}function Ws(t){if(Array.isArray(t))return t.filter(e=>(e==null?void 0:e.label)&&(e==null?void 0:e.value));if(typeof t!="string")return[];try{const e=JSON.parse(t);return Array.isArray(e)?e.filter(r=>(r==null?void 0:r.label)&&(r==null?void 0:r.value)):[]}catch{return[]}}function Vs(t={}){return{id:t.id||"",name:t.name||"",tagline:t.tagline||"",type:t.type||"",tags:ke(t.tags),difficulty:t.difficulty||"",district:t.district||"",lat:t.lat==null?null:Number(t.lat),lng:t.lng==null?null:Number(t.lng),rating:t.rating==null?0:Number(t.rating),reviews:t.reviews==null?0:Number(t.reviews),coverImage:t.coverImage||t.cover_image||"",images:ke(t.images),description:t.description||"",highlights:ke(t.highlights),bestTime:t.bestTime||t.best_time||"",nearbyAttractions:ke(t.nearbyAttractions||t.nearby_attractions),duration:t.duration||"",category:t.category||"",quickFacts:Ws(t.quickFacts||t.quick_facts)}}function Yl(t){return{...Rr(t),tags:ke(t.tags),images:ke(t.images).map(e=>Rr({coverImage:e,images:[]}).coverImage),highlights:ke(t.highlights),nearbyAttractions:ke(t.nearbyAttractions),quickFacts:Ws(t.quickFacts)}}function Js(t){var r,i,s,a,n;const e=ti.find(o=>o.id===t.id)||{};return Yl({...e,...t,tags:(r=t.tags)!=null&&r.length?t.tags:e.tags,images:(i=t.images)!=null&&i.length?t.images:e.images,highlights:(s=t.highlights)!=null&&s.length?t.highlights:e.highlights,nearbyAttractions:(a=t.nearbyAttractions)!=null&&a.length?t.nearbyAttractions:e.nearbyAttractions,quickFacts:(n=t.quickFacts)!=null&&n.length?t.quickFacts:e.quickFacts})}function oi({onUpdate:t}={}){const e=We;return Fi||(Fi=!0,Gs(Os(),Fs).then(r=>{r&&r.length>0&&(We=r.map(i=>Js(Vs(i))),console.log(`[destinations] Supabase loaded ${r.length} destinations`),typeof t=="function"&&t(We))}).catch(r=>{console.warn("[destinations] Supabase fetch failed, using local data:",(r==null?void 0:r.message)||r)})),e}async function Ks(t){const e=We==null?void 0:We.find(r=>r.id===t);if(e)return e;try{const r=await Gs(js(t),Fs);if(r)return Js(Vs(r))}catch(r){console.warn(`[destinations] ${t} Supabase fetch failed, using local:`,(r==null?void 0:r.message)||r)}return ti.find(r=>r.id===t)||null}function Xl(){return Ia}const Zl=new Set(["lengteng-wildlife"]);async function Ql(){const t=M,r=(await oi()).filter(s=>!Zl.has(s.id)).slice(0,6);return`
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
          ${r.map(s=>`
            <div class="card destination-card animate-in" data-href="/destination/${s.id}">
              <div class="card-img-wrap">
                <img src="${s.coverImage}" alt="${s.name}" loading="lazy" />
                <div class="card-badge">${s.type.toUpperCase()}</div>
                <div class="card-rating">${Y(s.rating)} <span>${s.rating}</span></div>
              </div>
              <div class="card-body">
                <h4 class="card-title">${s.name}</h4>
                <div class="card-meta" style="margin-bottom:10px">📍 ${s.district} &nbsp;•&nbsp; ⏱ ${s.duration}</div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${s.tagline}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${s.tags.map(a=>`<span class="tag">${a}</span>`).join("")}
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
          ${[{icon:"🎲",step:"1",title:"Discover or Surprise",desc:"Browse 50+ destinations or hit Surprise Me and let us pick the perfect trip for you."},{icon:"📅",step:"2",title:"Book Your Stay",desc:"Choose from verified homestays, lodges, and campsites. Book guides and transport in one place."},{icon:"🌄",step:"3",title:"Explore Mizoram",desc:"Show up, follow your itinerary, and experience Northeast India's best-kept secret."}].map(s=>`
            <div class="card card-body text-center animate-in">
              <div style="font-size:3rem;margin-bottom:16px">${s.icon}</div>
              <div style="width:32px;height:32px;background:var(--emerald-700);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;margin:0 auto 16px">${s.step}</div>
              <h4 style="margin-bottom:10px">${s.title}</h4>
              <p style="font-size:0.9rem">${s.desc}</p>
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
          ${[{icon:"🏡",title:"Homestays",desc:"Authentic Mizo homes",href:"/stays"},{icon:"👨‍🏫",title:"Local Guides",desc:"Expert local experts",href:"/guides"},{icon:"🚗",title:"Transport",desc:"Cars, bikes & more",href:"/transport"},{icon:"⭐",title:"Reviews",desc:"Real verified stays",href:"/stays"}].map(s=>`
            <a href="${t(s.href)}" class="card card-body text-center" data-link style="cursor:pointer">
              <div style="font-size:2.5rem;margin-bottom:12px">${s.icon}</div>
              <h4 style="margin-bottom:6px">${s.title}</h4>
              <p style="font-size:0.85rem">${s.desc}</p>
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
  `}function ec(){document.querySelectorAll("[data-href]").forEach(t=>{t.addEventListener("click",()=>window.router.navigate(t.dataset.href))}),_t(async()=>{const{stays:t}=await Promise.resolve().then(()=>nc);return{stays:t}},void 0).then(({stays:t})=>{const e=document.getElementById("home-stays-grid");e&&(e.innerHTML=t.slice(0,3).map(r=>`
      <div class="card stay-card animate-in" data-href="/stay/${r.id}">
        <div class="card-img-wrap">
          <img src="${r.coverImage}" alt="${r.name}" loading="lazy" />
          <div class="card-badge">${r.type.toUpperCase()}</div>
          ${r.topRated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
          <div class="card-rating">${Y(r.rating)} <span>${r.rating}</span></div>
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
    `).join(""),document.querySelectorAll(".stay-card[data-href]").forEach(r=>{r.addEventListener("click",()=>window.router.navigate(r.dataset.href))}))})}let qt="all",st="",Gr=[];const tc=new Set(["lengteng-wildlife"]);function Ys(){return Gr.filter(t=>!tc.has(t.id))}function rc(){return`
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
          ${Xl().map(e=>`<div class="chip ${e.id==="all"?"active":""}" data-cat="${e.id}">${e.icon} ${e.label}</div>`).join("")}
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
  `}function ic(){var t;Gr=oi({onUpdate(e){Gr=e,Nt(),Gi()}}),Nt(),Gi(),document.querySelectorAll(".chip[data-cat]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".chip[data-cat]").forEach(r=>r.classList.remove("active")),e.classList.add("active"),qt=e.dataset.cat,Nt()})}),(t=document.getElementById("discover-search"))==null||t.addEventListener("input",e=>{st=e.target.value.toLowerCase(),Nt()})}function sc(){return Ys().filter(t=>{const e=qt==="all"||t.category===qt||t.tags.includes(qt),r=!st||t.name.toLowerCase().includes(st)||t.district.toLowerCase().includes(st)||t.type.toLowerCase().includes(st);return e&&r})}function Nt(){const t=sc(),e=document.getElementById("destinations-grid"),r=document.getElementById("results-count");if(r&&(r.textContent=`${t.length} Destination${t.length!==1?"s":""}`),!!e){if(!t.length){e.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">😕 No destinations found. Try a different filter.</div>';return}e.innerHTML=t.map(i=>ac(i)).join(""),e.querySelectorAll("[data-href]").forEach(i=>{i.addEventListener("click",()=>window.router.navigate(i.dataset.href))})}}function Gi(){const t=Ys().filter(r=>r.reviews<50),e=document.getElementById("hidden-gems-grid");e&&(e.innerHTML=t.slice(0,4).map(r=>`
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
  `).join(""),e.querySelectorAll("[data-href]").forEach(r=>{r.addEventListener("click",()=>window.router.navigate(r.dataset.href))}))}function ac(t){const e={Easy:"#10b981",Moderate:"#f59e0b",Hard:"#ef4444"}[t.difficulty]||"#94a3b8";return`
    <div class="card destination-card animate-in" data-href="/destination/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        <div class="card-rating">${Y(t.rating)} <span>${t.rating} (${t.reviews})</span></div>
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
  `}const mr=[{id:"itin-1",destinationId:"vantawng-falls",days:1,title:"1-Day: Vantawng Falls Trail",category:"adventure",stayId:"vantawng-lodge",plan:[{day:1,activities:["7 AM: Arrive Thenzawl","9 AM: Trek to Vantawng Falls (750ft drop!)","12 PM: Picnic lunch near the falls","2 PM: Village walk & bamboo crafts","5 PM: Sunset from ridge viewpoint","7 PM: Mizo dinner at Vantawng Lodge"]}]},{id:"itin-2",destinationId:"phawngpui-peak",days:3,title:"3-Day: Blue Mountain Summit",category:"adventure",stayId:null,plan:[{day:1,activities:["Drive to Lawngtlai (8 hrs from Aizawl)","Base camp setup","Sunset from lower ridge","Campfire dinner"]},{day:2,activities:["5 AM: Summit attempt (2,157m)","10 AM: Myanmar panorama at peak","Afternoon: Wildlife trail","Stargazing night"]},{day:3,activities:["Dawn photography","Rare orchid walk with guide","Return journey","Buy Puan textile souvenirs"]}]},{id:"itin-3",destinationId:"tam-dil-lake",days:1,title:"1-Day: Tam Dil Lake Escape",category:"relaxation",stayId:"tamdil-lakehouse",plan:[{day:1,activities:["9 AM: Drive from Aizawl (2 hrs)","11 AM: Morning boat ride on the lake","1 PM: Lakeside picnic lunch","3 PM: Pine forest walk","5 PM: Golden hour on the lake","7 PM: Return or stay overnight"]}]},{id:"itin-4",destinationId:"champhai",days:2,title:"2-Day: Champhai Valley & Myanmar Views",category:"relaxation",stayId:"champhai-farmstay",plan:[{day:1,activities:["Morning: Drive to Champhai (157 km)","Afternoon: Farm visit & fruit picking","Evening: Myanmar border viewpoint sunset","Night: Traditional Mizo dinner with family"]},{day:2,activities:["Dawn: Valley fog photography","Morning: Champhai museum & market","Afternoon: Murlen National Park entry","Evening: Return to Aizawl"]}]},{id:"itin-5",destinationId:"reiek-tlang",days:1,title:"1-Day: Reiek Heritage Village",category:"culture",stayId:"bamboo-haven",plan:[{day:1,activities:["8 AM: Depart Aizawl","9:30 AM: Reiek traditional village walk","11 AM: Mizo cultural exhibits","1 PM: Lunch at village café","3 PM: Hilltop panoramic viewpoint","5 PM: Return or Bamboo Haven overnight"]}]},{id:"itin-6",destinationId:"palak-dil",days:2,title:"2-Day: Palak Dil & Saiha Wilderness",category:"wildlife",stayId:null,plan:[{day:1,activities:["Early morning departure from Aizawl","Afternoon: Arrive Saiha","Evening: Palak Dil lake sunset cruise","Night: Forest lodge stay"]},{day:2,activities:["5 AM: Bird watching (migratory species)","Morning: Jungle trail with local guide","Afternoon: Return journey"]}]}],pe=[{id:"bamboo-haven",name:"Bamboo Haven Homestay",type:"Homestay",host:{name:"Liana Hnamte",avatar:"LH",phone:"+91 98765 43210",since:"2022"},location:"Reiek Village, Mamit District",lat:23.7152,lng:92.5694,price:1800,maxGuests:4,rooms:2,rating:4.9,reviews:47,coverImage:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",images:["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80","https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80","https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"],amenities:["WiFi","Parking","Home-cooked Food","Hot Water","Valley View","Bonfire"],description:"Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience. Wake up to misty valley views, eat home-cooked Mizo meals, and fall asleep to the sounds of the forest. Our family has lived here for generations.",about:"Liana and her family offer warm Mizo hospitality in their traditional home.",nearbyAttractions:["Reiek Heritage Village (5 min)","Hmuifang (45 min)","Aizawl (35 km)"],checkIn:"14:00",checkOut:"11:00",rules:["No smoking inside","Quiet hours after 10 PM","No outside food","Pets on request"],topRated:!0,verified:!0,tags:["hidden-gem","budget-friendly"]},{id:"champhai-farmstay",name:"Champhai Valley Farmstay",type:"Homestay",host:{name:"Mimi Lalhmangaihi",avatar:"ML",phone:"+91 65432 10987",since:"2022"},location:"Champhai, Champhai District",lat:23.4692,lng:93.3224,price:1500,maxGuests:4,rooms:2,rating:4.6,reviews:54,coverImage:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",images:["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80","https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"],amenities:["Organic Farm","Home-cooked Food","Fruit Picking","Valley View","Parking","Hot Water"],description:"Experience life on a working Mizo farm in the fruit bowl of Champhai. Pick fresh oranges, help with the harvest, cook traditional recipes, and fall asleep looking at Myanmar across the valley. The most authentic rural Mizoram experience.",about:"Mimi's family has farmed this land for 3 generations. She loves sharing Mizo culture through food.",nearbyAttractions:["Myanmar border viewpoint","Champhai museum","Murlen National Park (2 hrs)"],checkIn:"14:00",checkOut:"11:00",rules:["Farm work is optional but encouraged","Organic produce only","Early breakfast at 7 AM"],topRated:!1,verified:!0,tags:["farm-experience","budget-friendly"]},{id:"tamdil-lakehouse",name:"Tam Dil Lakehouse",type:"Hotel",host:{name:"Robert Lalthanmawia",avatar:"RL",phone:"+91 54321 09876",since:"2020"},location:"Tam Dil, Saitul District",lat:23.6177,lng:92.8894,price:3200,maxGuests:2,rooms:1,rating:4.9,reviews:89,coverImage:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"],amenities:["Lakefront Room","Kayaking","WiFi","AC","Restaurant","Hot Water","Parking","Sunrise View"],description:"Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram's most romantic stay. The floor-to-ceiling windows reflect the lake, the pine forest, and the stars. Breakfast is served on your private deck.",about:"Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.",nearbyAttractions:["Tam Dil Lake (on property)","Tam Dil sanctuary","Saitul (30 min)"],checkIn:"15:00",checkOut:"11:00",rules:["Adults only","No loud parties","Checkout strictly at 11 AM"],topRated:!0,verified:!0,tags:["romantic","lakefront","premium"]}],Xs=pe.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,max_guests:t.maxGuests,top_rated:t.topRated})),nc=Object.freeze(Object.defineProperty({__proto__:null,seedStays:Xs,stays:pe},Symbol.toStringTag,{value:"Module"})),oc=new Set(["lengteng-wildlife"]),lc=[{id:"all",label:"✨ Any Vibe",icon:"🎲"},{id:"adventure",label:"🧗 Adventure"},{id:"relaxation",label:"🌿 Relaxation"},{id:"culture",label:"🏛️ Culture"},{id:"wildlife",label:"🦅 Wildlife"},{id:"budget",label:"💰 Budget"}];let Ft="all",gr=!1,li=[];function cc(){return li.filter(t=>!oc.has(t.id))}function dc(){return`
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
          ${lc.map(t=>`<div class="chip ${t.id==="all"?"active":""}" data-filter="${t.id}">${t.label}</div>`).join("")}
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
  `}async function uc(){var t,e;li=await oi(),document.querySelectorAll(".chip[data-filter]").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".chip[data-filter]").forEach(i=>i.classList.remove("active")),r.classList.add("active"),Ft=r.dataset.filter})}),(t=document.getElementById("dice-btn"))==null||t.addEventListener("click",Wi),(e=document.getElementById("reroll-btn"))==null||e.addEventListener("click",Wi)}function Wi(){if(gr)return;gr=!0;const t=document.getElementById("rolling"),e=document.getElementById("surprise-result"),r=document.getElementById("dice-btn");e.classList.remove("show"),t.classList.remove("hidden"),r.style.animation="spin 0.5s linear infinite",setTimeout(()=>{var l,c;t.classList.add("hidden"),r.style.animation="float 3s ease-in-out infinite";const i=cc(),s=Ft==="all"?i:i.filter(u=>u.category===Ft||u.tags.includes(Ft)),a=s[Math.floor(Math.random()*s.length)]||i[0]||li[0],n=mr.find(u=>u.destinationId===a.id)||mr[Math.floor(Math.random()*mr.length)],o=pe.find(u=>u.id===(n==null?void 0:n.stayId))||pe[Math.floor(Math.random()*pe.length)];document.getElementById("result-card").innerHTML=hc(a,n,o),e.classList.add("show"),(l=document.getElementById("book-result-btn"))==null||l.addEventListener("click",()=>{window.router.navigate(`/stay/${o.id}`)}),(c=document.getElementById("view-dest-btn"))==null||c.addEventListener("click",()=>{window.router.navigate(`/destination/${a.id}`)}),gr=!1},1800)}function hc(t,e,r){return`
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
  `}async function pc(t){var n;const e=M,r=await Ks(t);if(!r)return'<div class="page-hero container"><h1>Destination not found</h1></div>';const i=pe.filter(o=>o.location.toLowerCase().includes(r.district.toLowerCase())).slice(0,2),s=Wt(`dest-${t}`),a=cs(s);return`
    <!-- Gallery Hero -->
    <div style="padding-top:76px">
      <div class="gallery container" style="margin-top:20px">
        <div class="gallery-main" onclick="openLightbox(0,'${t}')">
          <img src="${r.images[0]}" alt="${r.name}" />
        </div>
        ${r.images.slice(1,3).map((o,l)=>`
          <div class="gallery-thumb" onclick="openLightbox(${l+1},'${t}')">
            <img src="${o}" alt="${r.name} ${l+2}" />
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
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;width:46px;height:46px;font-size:1.3rem;cursor:pointer;flex-shrink:0;transition:var(--transition)">${ls(`dest-${t}`)?"❤️":"🤍"}</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:20px">
            <div style="display:flex;gap:4px;align-items:center">${Y(r.rating)} <strong>${r.rating}</strong> <span style="color:var(--text-muted)">(${r.reviews} reviews)</span></div>
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

          ${(n=r.quickFacts)!=null&&n.length?`
            <h3 style="margin-bottom:16px">Quick Facts</h3>
            <div class="grid-2" style="margin-bottom:32px">
              ${r.quickFacts.map(o=>`
                <div class="card card-body">
                  <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">${o.label}</div>
                  <div style="font-weight:700;font-size:1.05rem">${o.value}</div>
                </div>
              `).join("")}
            </div>
          `:""}

          <h3 style="margin-bottom:16px">✨ Highlights</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${r.highlights.map(o=>`<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${o}</span></div>`).join("")}
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
              <ul style="list-style:none;color:var(--text-muted);font-size:0.9rem">${r.nearbyAttractions.map(o=>`<li>• ${o}</li>`).join("")}</ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="dest-map" class="map-container" style="margin-bottom:32px"></div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
            ${r.tags.map(o=>`<span class="tag">${o}</span>`).join("")}
          </div>

          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${a>0?`⭐ ${a} · `:""}${s.length} Review${s.length!==1?"s":""}</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>

          <div id="reviews-list">
            ${s.length?s.map(o=>Zs(o)).join(""):'<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>'}
          </div>

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
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience..."></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>

          ${i.length?`
            <div class="divider-h"></div>
            <h3 style="margin-bottom:24px">🏡 Stays Near ${r.name}</h3>
            <div class="grid-2">
              ${i.map(o=>`
                <div class="card" data-href="/stay/${o.id}" style="cursor:pointer">
                  <div class="card-img-wrap" style="height:160px"><img src="${o.coverImage}" alt="${o.name}" loading="lazy" /></div>
                  <div class="card-body">
                    <div style="font-weight:700">${o.name}</div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px">
                      <span class="price" style="font-size:1rem">₹${o.price.toLocaleString()}<span>/night</span></span>
                      <span>${Y(o.rating)} ${o.rating}</span>
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
            <div style="font-size:0.85rem;color:var(--text-muted);text-align:center">🔒 Secure booking</div>
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
  `}async function mc(t){var s,a,n,o,l,c;const e=await Ks(t);if(!e)return;setTimeout(()=>{const u=document.getElementById("dest-map");if(!u||u._leaflet_id)return;const d=L.map("dest-map").setView([e.lat,e.lng],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(d),L.marker([e.lat,e.lng]).addTo(d).bindPopup(`<b>${e.name}</b><br>${e.district} District`).openPopup()},100);const r=e.images;let i=0;window.openLightbox=u=>{i=u,document.getElementById("lb-img").src=r[i],document.getElementById("lightbox").classList.add("open")},(s=document.getElementById("lb-close"))==null||s.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(a=document.getElementById("lb-prev"))==null||a.addEventListener("click",()=>{i=(i-1+r.length)%r.length,document.getElementById("lb-img").src=r[i]}),(n=document.getElementById("lb-next"))==null||n.addEventListener("click",()=>{i=(i+1)%r.length,document.getElementById("lb-img").src=r[i]}),(o=document.getElementById("wishlist-btn"))==null||o.addEventListener("click",()=>{const u=document.getElementById("wishlist-btn"),d=os(`dest-${t}`);u.textContent=d?"❤️":"🤍",S(d?"Added to Wishlist":"Removed from Wishlist")}),(l=document.getElementById("write-review-btn"))==null||l.addEventListener("click",()=>{if(!mt()){S("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(c=document.getElementById("submit-review-btn"))==null||c.addEventListener("click",()=>{var m,g,v;const u=parseInt(((m=document.querySelector('input[name="rating"]:checked'))==null?void 0:m.value)||0,10),d=(v=(g=document.getElementById("review-text"))==null?void 0:g.value)==null?void 0:v.trim();if(!u){S("Please select a rating","","error");return}if(!d){S("Please write your review","","error");return}const h=se();ns({listingId:`dest-${t}`,rating:u,text:d,userName:h.fullName||h.name,userAvatar:h.avatar}),S("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden");const p=Wt(`dest-${t}`);document.getElementById("reviews-list").innerHTML=p.map(y=>Zs(y)).join("")}),document.querySelectorAll("[data-href]").forEach(u=>{u.addEventListener("click",()=>window.router.navigate(u.dataset.href))})}function Zs(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${Y(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Visit</span>
    </div>
  `}function gc(){return`
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
  `}async function fc(){let t="all",e=Xs;const r=document.getElementById("stays-grid"),i=s=>{if(!r)return;const a=t==="all"?s:s.filter(n=>{var o;return((o=n.type)==null?void 0:o.toLowerCase())===t});r.innerHTML=a.length?a.map(vc).join(""):'<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No stays found.</div>',r.querySelectorAll("[data-href]").forEach(n=>n.addEventListener("click",()=>window.router.navigate(n.dataset.href)))};i(e),document.querySelectorAll(".chip[data-type]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".chip[data-type]").forEach(a=>a.classList.remove("active")),s.classList.add("active"),t=s.dataset.type,i(e)})});try{const s=new Promise((n,o)=>setTimeout(()=>o(new Error("timeout")),8e3)),a=await Promise.race([Bs(),s]);a&&a.length&&(e=a,i(e))}catch(s){console.warn("[stays] Live fetch failed, showing seed data:",s.message)}}function vc(t){var e,r;return`
    <div class="card stay-card" data-href="/stay/${t.id}">
      <div class="card-img-wrap">
        <img src="${t.cover_image}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${(e=t.type)==null?void 0:e.toUpperCase()}</div>
        ${t.top_rated?'<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);backdrop-filter:blur(8px);padding:4px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>':""}
        <div class="card-rating">${Y(t.rating)} <span>${t.rating} (${t.reviews_count})</span></div>
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
  `}function yc(t){return'<div id="stay-detail-container" style="padding-top:76px;min-height:80vh;display:flex;align-items:center;justify-content:center"><div class="spinner" style="font-size:1.5rem">Loading...</div></div>'}async function bc(t){var m,g,v,y,k,f,A,z,P;const e=document.getElementById("stay-detail-container");let r=pe.find(b=>b.id===t);if(!r)try{const{fetchStayById:b,supabase:I}=await _t(async()=>{const{fetchStayById:W,supabase:D}=await Promise.resolve().then(()=>ir);return{fetchStayById:W,supabase:D}},void 0),T=await b(t);let O=null;if(T.host_id){const{data:W}=await I.from("profiles").select("*").eq("id",T.host_id).single();O=W}const j=(O==null?void 0:O.full_name)||"Host";r={...T,maxGuests:T.max_guests,checkIn:T.check_in,checkOut:T.check_out,topRated:T.top_rated,rating:T.rating||4.5,reviews:T.reviews_count||T.reviews||0,lat:T.lat||23.7271,lng:T.lng||92.7176,coverImage:T.cover_image,images:(m=T.images)!=null&&m.length?T.images:[T.cover_image||"https://via.placeholder.com/800"],host:{name:j,full_name:j,phone:(O==null?void 0:O.phone)||"+91 00000 00000",avatar:j.charAt(0).toUpperCase(),since:new Date(T.created_at||new Date).getFullYear()}}}catch(b){console.warn("Could not load live stay:",b),e.innerHTML='<div class="page-hero container"><h1>Stay not found</h1></div>';return}const i=Wt(t),s=cs(i);e.innerHTML=`
    <!-- Gallery -->
    <div class="container" style="margin-top:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h1 style="font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:6px">${r.name}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:0.9rem;color:var(--text-muted)">
            ${Y(s>0?s:r.rating)} <strong style="color:var(--text)">${s>0?s:r.rating}</strong>
            <span>(${i.length||r.reviews} reviews)</span> •
            <span>📍 ${r.location}</span> •
            ${r.verified?'<span style="color:var(--emerald-400)">✅ Verified</span>':""}
            ${r.topRated?'<span class="top-rated-badge">🔥 Top Rated</span>':""}
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:8px 16px;color:var(--text);cursor:pointer;font-size:0.9rem">${ls(t)?"❤️ Saved":"🤍 Save"}</button>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="gallery" style="margin-bottom:0">
        <div class="gallery-main" onclick="openStayLightbox(0)"><img src="${r.images[0]}" alt="${r.name}" /></div>
        ${r.images.slice(1,3).map((b,I)=>`<div class="gallery-thumb" onclick="openStayLightbox(${I+1})"><img src="${b}" alt="${r.name}" /></div>`).join("")}
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
            ${(r.amenities||[]).map(b=>`<div class="amenity-item"><span class="amenity-icon">${{WiFi:"📶",Parking:"🅿️","Home-cooked Food":"🍛","Breakfast Included":"🥐","Hot Water":"🚿","Valley View":"🌄",Bonfire:"🔥","Waterfall View":"💦","Guide Service":"🧭","Tents Provided":"⛺",Campfire:"🔥","Meals Included":"🍽️","Mountain Guide":"🧗",Stargazing:"🔭","Trekking Gear":"🎒","Organic Farm":"🌱","Fruit Picking":"🍊",Kayaking:"🚣",AC:"❄️",Restaurant:"🍴","Sunrise View":"🌅",Lakefront:"💧"}[b]||"✓"}</span><span class="amenity-label">${b}</span></div>`).join("")}
          </div>

          ${wc(r)}

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
                ${(r.rules||[]).map(b=>`<li style="margin-bottom:4px">• ${b}</li>`).join("")}
              </ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="stay-map" class="map-container" style="margin-bottom:32px"></div>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px">📍 ${r.location}</p>
          <div style="margin-bottom:32px">
            ${(r.nearbyAttractions||[]).map(b=>`<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">→ ${b}</div>`).join("")}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${s>0?`⭐ ${s} · `:`⭐ ${r.rating} · `}${i.length||r.reviews} Reviews</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>
          <div id="reviews-list">
            ${i.length?i.map(b=>Wr(b)).join(""):xc()}
          </div>
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input">${[5,4,3,2,1].map(b=>`<input type="radio" name="rating" id="r${b}" value="${b}"><label for="r${b}">★</label>`).join("")}</div>
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
            <div class="booking-price" id="booking-price-block">
              <span class="price" style="font-size:1.6rem" id="booking-price-display">₹${r.price.toLocaleString()}</span>
              <span style="color:var(--text-muted)">/night</span>
              <div id="booking-room-label" style="font-size:0.8rem;color:var(--emerald-400);margin-top:2px"></div>
              <div style="display:flex;gap:4px;margin-top:6px">${Y(s>0?s:r.rating)} <span style="font-size:0.85rem;color:var(--text-muted)">${i.length||r.reviews} reviews</span></div>
            </div>
            <div class="booking-dates">
              <div class="booking-date-field"><label>CHECK-IN</label><input type="date" id="checkin-date" /></div>
              <div class="booking-date-field"><label>CHECK-OUT</label><input type="date" id="checkout-date" /></div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Guests</label>
              <select class="form-select" id="guests-count">
                ${Array.from({length:r.maxGuests||2},(b,I)=>`<option value="${I+1}">${I+1} guest${I>0?"s":""}</option>`).join("")}
              </select>
            </div>
            <div id="price-breakdown" style="margin-bottom:16px"></div>
            <button class="btn btn-primary w-full" id="reserve-btn" style="justify-content:center;font-size:1rem;padding:16px">Reserve & Pay →</button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px">🔒 Secure booking · You won't be charged yet</p>

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
  `,e.style.display="block";const a=new Date,n=new Date(a);n.setDate(n.getDate()+1);const o=b=>b.toISOString().split("T")[0],l=document.getElementById("checkin-date"),c=document.getElementById("checkout-date");l&&(l.value=o(a)),c&&(c.value=o(n));let u=r.price;const d=()=>{document.getElementById("booking-price-display").textContent=`₹${u.toLocaleString()}`},h=()=>{const b=new Date(l==null?void 0:l.value),I=new Date(c==null?void 0:c.value),T=Math.max(1,Math.round((I-b)/864e5)),O=T*u,j=document.getElementById("price-breakdown");j&&(j.innerHTML=`
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>₹${u.toLocaleString()} × ${T} night${T>1?"s":""}</span><span>₹${(T*u).toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>Service fee</span><span>₹${Math.round(O*.05).toLocaleString()}</span>
      </div>
      <div style="height:1px;background:var(--glass-border);margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:700">
        <span>Total</span><span>₹${Math.round(O*1.05).toLocaleString()}</span>
      </div>
    `)};h(),l==null||l.addEventListener("change",h),c==null||c.addEventListener("change",h),(g=document.getElementById("room-types-list"))==null||g.addEventListener("click",b=>{const I=b.target.closest("[data-select-room]");if(!I)return;const T=parseInt(I.dataset.roomPrice)||r.price,O=I.dataset.roomName||"";u=T,d(),h(),document.querySelectorAll("[data-select-room]").forEach(W=>W.classList.remove("btn-primary")),I.classList.add("btn-primary"),I.textContent="✓ Selected";const j=document.getElementById("booking-room-label");j&&(j.textContent=`Room: ${O}`),S(`${O} selected`,`₹${T.toLocaleString()}/night`)}),(v=document.getElementById("reserve-btn"))==null||v.addEventListener("click",()=>{var W;const b=l==null?void 0:l.value,I=c==null?void 0:c.value,T=(W=document.getElementById("guests-count"))==null?void 0:W.value;if(!b||!I){S("Please select dates","","error");return}const O=Math.max(1,Math.round((new Date(I)-new Date(b))/864e5)),j=Math.round(O*u*1.05);window.router.navigate(`/book/${t}?checkin=${b}&checkout=${I}&guests=${T}&total=${j}`)});let p=0;window.openStayLightbox=b=>{p=b,document.getElementById("lb-img").src=r.images[p],document.getElementById("lightbox").classList.add("open")},window.openRoomLightbox=(b,I)=>{var j;const O=(((j=(r.room_types||r.roomTypes||[])[b])==null?void 0:j.images)||[]).filter(Boolean);O.length&&(p=0,document.getElementById("lb-img").src=O[I]||O[0],document.getElementById("lightbox").classList.add("open"))},(y=document.getElementById("lb-close"))==null||y.addEventListener("click",()=>document.getElementById("lightbox").classList.remove("open")),(k=document.getElementById("lb-prev"))==null||k.addEventListener("click",()=>{p=(p-1+r.images.length)%r.images.length,document.getElementById("lb-img").src=r.images[p]}),(f=document.getElementById("lb-next"))==null||f.addEventListener("click",()=>{p=(p+1)%r.images.length,document.getElementById("lb-img").src=r.images[p]}),(A=document.getElementById("wishlist-btn"))==null||A.addEventListener("click",()=>{const b=document.getElementById("wishlist-btn"),I=os(t);b.textContent=I?"❤️ Saved":"🤍 Save",S(I?"Added to Wishlist!":"Removed from Wishlist")}),setTimeout(()=>{const b=document.getElementById("stay-map");if(!b||b._leaflet_id)return;const I=L.map("stay-map").setView([r.lat,r.lng],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(I),L.marker([r.lat,r.lng]).addTo(I).bindPopup(`<b>${r.name}</b>`).openPopup()},100),(z=document.getElementById("write-review-btn"))==null||z.addEventListener("click",()=>{if(!mt()){S("Login required","Please log in to write a review","error");return}document.getElementById("review-form").classList.toggle("hidden")}),(P=document.getElementById("submit-review-btn"))==null||P.addEventListener("click",()=>{var O,j,W;const b=parseInt(((O=document.querySelector('input[name="rating"]:checked'))==null?void 0:O.value)||0),I=(W=(j=document.getElementById("review-text"))==null?void 0:j.value)==null?void 0:W.trim();if(!b||!I){S("Please fill all fields","","error");return}const T=se();ns({listingId:t,rating:b,text:I,userName:T.fullName||T.name,userAvatar:T.avatar}),S("Review submitted! ⭐"),document.getElementById("review-form").classList.add("hidden"),document.getElementById("reviews-list").innerHTML=Wt(t).map(D=>Wr(D)).join("")})}function wc(t){const e=t.room_types||t.roomTypes||[];return e.length?`
    <h3 style="margin-bottom:16px">🛏️ Room Types</h3>
    <div id="room-types-list" style="margin-bottom:32px">${e.map((i,s)=>{const n=(i.images||[]).filter(Boolean).slice(0,3).map((o,l)=>`
      <img src="${o}" alt="${i.name}" onclick="openRoomLightbox(${s},${l})"
        style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid var(--glass-border);cursor:pointer" />
    `).join("");return`
      <div class="card card-body" style="margin-bottom:14px;padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-weight:700;font-size:1.05rem;margin-bottom:4px">${i.name||"Room"}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">
              ${i.count?`${i.count} room${i.count>1?"s":""}`:""}
              ${i.max_guests?` · Up to ${i.max_guests} guest${i.max_guests>1?"s":""}`:""}
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-size:1.3rem;font-weight:800;color:var(--emerald-400)">₹${(i.price||0).toLocaleString()}</div>
            <div style="font-size:0.8rem;color:var(--text-muted)">/night</div>
          </div>
        </div>
        ${n?`<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">${n}</div>`:""}
        <button type="button" class="btn btn-outline btn-sm" data-select-room="${s}"
          data-room-price="${i.price||0}" data-room-name="${i.name||"Room"}"
          style="margin-top:14px">Select this room →</button>
      </div>
    `}).join("")}</div>
  `:""}function Wr(t){var e;return`
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${t.userAvatar||((e=t.userName)==null?void 0:e.charAt(0))||"?"}</div>
        <div class="review-meta">
          <div class="review-name">${t.userName}</div>
          <div class="review-date">${new Date(t.createdAt).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</div>
        </div>
        <div style="margin-left:auto">${Y(t.rating)}</div>
      </div>
      <p class="review-text">${t.text}</p>
      <span class="verified-badge">✅ Verified Guest</span>
    </div>
  `}function xc(t){return[{userName:"Priya Sharma",userAvatar:"P",rating:5,text:"Absolutely magical experience! The host was so welcoming and the views were breathtaking. Will definitely come back.",createdAt:"2026-01-15T00:00:00Z"},{userName:"Rahul Das",userAvatar:"R",rating:4,text:"Beautiful location and authentic Mizo food. A bit remote but that's the charm! Highly recommended for nature lovers.",createdAt:"2026-02-20T00:00:00Z"}].map(r=>Wr(r)).join("")}const Qs=[],sr=[{id:"transport-zara",name:"Zara Mountain Bikes",owner:"Zaramsanga Colney",avatar:"ZC",type:"Motorcycle & Bike Rental",vehicles:[{name:"Royal Enfield Himalayan",capacity:2,price:1800,priceUnit:"per day"},{name:"Honda CB350",capacity:2,price:1400,priceUnit:"per day"},{name:"Mountain Bicycle",capacity:1,price:400,priceUnit:"per day"}],rating:4.6,reviews:38,phone:"+91 87654 55555",email:"zara.bikes@lushaitrips.com",location:"Aizawl",coverImage:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",images:["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80"],description:"Explore Mizoram the way it was meant to be explored - on two wheels. Our fleet of well-maintained Royal Enfields and Honda bikes are ideal for the winding mountain roads of Mizoram. Helmets, riding gear, and maps provided.",features:["Helmets Included","Riding Gear","Route Maps","Breakdown Assistance","Delivery to Hotel"],verified:!0,available:!0},{id:"transport-lal",name:"Lal Shared Sumo Service",owner:"Lalbiakzuala",avatar:"LB",type:"Shared Sumo / Van",vehicles:[{name:"Tata Sumo (Shared)",capacity:10,price:350,priceUnit:"per seat per route"},{name:"Force Traveller Van",capacity:16,price:4500,priceUnit:"per day (private)"}],rating:4.4,reviews:55,phone:"+91 76543 66666",email:"lal.sumo@lushaitrips.com",location:"Aizawl (all major routes)",coverImage:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",images:["https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],description:"Budget-friendly shared Sumo services connect all major towns and tourist spots. Perfect for solo travellers or groups on a budget. Private van hire also available for custom tours and group trips.",features:["Budget Friendly","All Major Routes","Daily Departures","Group Discounts","Private Option"],verified:!0,available:!0}];Qs.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,price_unit:t.priceUnit}));sr.map(t=>({...t,cover_image:t.coverImage,reviews_count:t.reviews,owner_name:t.owner}));const Vr=new Map,kc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",ea=1e4;function ta(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Jr(t){const e=Array.isArray(t.images)?t.images.filter(Boolean):[],r=t.cover_image||t.coverImage||e[0]||kc;return{id:t.id,name:t.name||"Local Guide",title:t.title||"Local Guide",experience:t.experience||"Experienced guide",languages:Array.isArray(t.languages)?t.languages:[],specialties:Array.isArray(t.specialties)?t.specialties:[],rating:Number(t.rating||0),reviews:Number(t.reviews_count||t.reviews||0),price:Number(t.price||0),priceUnit:t.price_unit||t.priceUnit||"per day",location:t.location||"Mizoram",phone:t.phone||"",email:t.email||"",coverImage:r,images:e.length?e:[r],bio:t.bio||"This guide profile will be updated soon.",certifications:Array.isArray(t.certifications)?t.certifications:[],verified:t.verified!==!1,available:t.available!==!1,tags:Array.isArray(t.tags)?t.tags:[]}}function ci(t){return!!(t!=null&&t.id)}function _c(t){return Vr.clear(),t.forEach(e=>Vr.set(e.id,e)),t}function Sc(t){return Qs.find(e=>ci(e)&&e.id===t)||null}function Ec(t){const e=t.priceUnit.replace(/^per\s+/i,""),r=t.rating>0?t.rating.toFixed(1):"New",i=t.reviews||0;return`
    <a href="${M(`/guide/${t.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap" style="height:240px">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" style="object-position:top" />
        ${t.verified?'<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">VERIFIED</div>':""}
        <div class="card-rating">${Y(t.rating)} <span>${r} (${i})</span></div>
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
  `}function ra(t){return[t.coverImage,...t.images].filter((e,r,i)=>e&&i.indexOf(e)===r)}function $c(t){const e=ra(t);return`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${t.coverImage}" alt="${t.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${t.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${t.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${Y(t.rating)} <strong>${t.rating>0?t.rating.toFixed(1):"New"}</strong> <span style="color:var(--text-muted)">(${t.reviews} reviews)</span></div>
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
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secure booking</p>
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
  `}function Vi(t){t.querySelectorAll("[data-link]").forEach(e=>{e.dataset.guideBound!=="true"&&(e.dataset.guideBound="true",e.addEventListener("click",r=>{r.preventDefault(),window.router.navigate(e.getAttribute("href"))}))})}function Tc(){return`
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
          <div class="page-loader" style="grid-column:1/-1">
            <div class="loading-spinner"></div>
            <div style="color:var(--text-muted)">Loading guides...</div>
          </div>
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Guide</div>
          <h2 style="margin-bottom:12px">Are You a Local Expert?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join LushaiTrips as a certified guide. Share your knowledge of Mizoram's hidden trails, wildlife, and culture.</p>
          <a href="${M("/host-signup-guide")}" class="btn btn-primary btn-lg" data-link>Register as a Guide</a>
        </div>
      </div>
    </section>
  `}async function Ac(){const t=document.getElementById("guides-grid");if(t){try{const e=await ta(zs(),ea,"Guide list request timed out."),r=_c(e.filter(ci).map(Jr));if(r.length){t.innerHTML=r.map(Ec).join(""),Vi(t);return}}catch(e){console.warn("[guides] Supabase fetch failed:",e.message)}t.innerHTML=`<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No guides available yet. <a href="${M("/host-signup-guide")}" data-link style="color:var(--emerald-400)">Register as the first guide!</a></div></div>`,Vi(t)}}function Ic(t){return`
    <div id="guide-detail-root" data-guide-id="${t}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading guide profile...</div>
      </div>
    </div>
  `}async function Pc(t){var o,l,c,u,d;const e=document.getElementById("guide-detail-root");if(!e)return;let r=null;try{const h=await ta(Ns(t),ea,"Guide profile request timed out.");ci(h)&&(r=Jr(h))}catch(h){console.warn("[guide-detail] falling back to static data:",h.message)}if(!r){const h=Sc(t);h&&(r=Jr(h))}if(!r){e.innerHTML='<div class="page-hero container"><h1>Guide not found</h1></div>';return}Vr.set(r.id,r),e.outerHTML=$c(r);const i=ra(r);let s=0;window.openGuideLightbox=h=>{var m;s=h;const p=document.getElementById("guide-lb-img");p&&(p.src=i[s]),(m=document.getElementById("guide-lightbox"))==null||m.classList.add("open")},(o=document.getElementById("guide-lb-close"))==null||o.addEventListener("click",()=>{var h;(h=document.getElementById("guide-lightbox"))==null||h.classList.remove("open")}),(l=document.getElementById("guide-lb-prev"))==null||l.addEventListener("click",()=>{s=(s-1+i.length)%i.length;const h=document.getElementById("guide-lb-img");h&&(h.src=i[s])}),(c=document.getElementById("guide-lb-next"))==null||c.addEventListener("click",()=>{s=(s+1)%i.length;const h=document.getElementById("guide-lb-img");h&&(h.src=i[s])}),(u=document.getElementById("guide-lightbox"))==null||u.addEventListener("click",h=>{var p,m;((p=h.target)==null?void 0:p.id)==="guide-lightbox"&&((m=document.getElementById("guide-lightbox"))==null||m.classList.remove("open"))});const a=new Date().toISOString().split("T")[0],n=document.getElementById("guide-date");n&&(n.value=a),(d=document.getElementById("book-guide-btn"))==null||d.addEventListener("click",()=>{var m;const h=(m=document.getElementById("guide-date"))==null?void 0:m.value,p=r.price;window.router.navigate(`/book/guide-${r.id}?date=${h}&total=${p}&type=guide&name=${encodeURIComponent(r.name)}`)})}const Xt=new Map,Rc="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",ia=6e3,sa="lt_recent_transport",aa=new Set(["transport-raj"]),Cc=new Set(["raj mizoram travels","grace travels"]);function na(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Lc(t){return{name:(t==null?void 0:t.name)||"Vehicle",capacity:Number((t==null?void 0:t.capacity)||1),price:Number((t==null?void 0:t.price)||0),priceUnit:(t==null?void 0:t.price_unit)||(t==null?void 0:t.priceUnit)||"per day"}}function Ve(t){const e=Array.isArray(t==null?void 0:t.images)?t.images.filter(Boolean):[],r=(t==null?void 0:t.cover_image)||(t==null?void 0:t.coverImage)||e[0]||Rc,i=Array.isArray(t==null?void 0:t.vehicles)?t.vehicles.map(Lc).filter(s=>s.name):[];return{id:t==null?void 0:t.id,name:(t==null?void 0:t.name)||"Transport Service",owner:(t==null?void 0:t.owner_name)||(t==null?void 0:t.owner)||"Transport Partner",type:(t==null?void 0:t.type)||"Transport",vehicles:i,rating:Number((t==null?void 0:t.rating)||0),reviews:Number((t==null?void 0:t.reviews_count)||(t==null?void 0:t.reviews)||0),phone:(t==null?void 0:t.phone)||"",email:(t==null?void 0:t.email)||"",location:(t==null?void 0:t.location)||"Mizoram",coverImage:r,images:e.length?e:[r],description:(t==null?void 0:t.description)||"Transport details will be added soon.",features:Array.isArray(t==null?void 0:t.features)?t.features:[],verified:(t==null?void 0:t.verified)!==!1,available:(t==null?void 0:t.available)!==!1}}function Oc(t=""){return String(t).trim().replace(/\s+/g," ").toLowerCase()}function di(t){return!(t!=null&&t.id)||aa.has(t.id)?!1:!Cc.has(Oc(t.name))}function jc(t){if(!Array.isArray(t))return[];const e=t.filter(di);return e.length!==t.length&&N.set(sa,e),e}function Ji(t){return Xt.clear(),t.forEach(e=>Xt.set(e.id,e)),t}function ui(){return jc(N.get(sa)).map(Ve).filter(di)}function Kr(t,e=[]){const r=new Map;return[...t,...e].forEach(i=>{!di(i)||r.has(i.id)||r.set(i.id,i)}),[...r.values()]}function Bc(t){return aa.has(t)?null:sr.find(e=>e.id===t)||null}function oa(t){const e=t.rating>0?t.rating.toFixed(1):"New",r=t.reviews||0;return`
    <a href="${M(`/transport/${t.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap">
        <img src="${t.coverImage}" alt="${t.name}" loading="lazy" />
        <div class="card-badge">${t.type.toUpperCase()}</div>
        <div class="card-rating">${Y(t.rating)} <span>${e} (${r})</span></div>
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
  `}function zc(t){return`
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${t.name}</h1>
                ${t.verified?'<span style="color:var(--emerald-400);font-size:0.85rem">Verified Provider</span>':""}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${Y(t.rating)} <strong>${t.rating>0?t.rating.toFixed(1):"New"}</strong> <span style="color:var(--text-muted)">(${t.reviews} reviews)</span></div>
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
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secure booking</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">Phone: ${t.phone||"Available after booking"}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Email: ${t.email||"Available after booking"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Nc(t){t.querySelectorAll("[data-link]").forEach(e=>{e.dataset.transportBound!=="true"&&(e.dataset.transportBound="true",e.addEventListener("click",r=>{r.preventDefault(),window.router.navigate(e.getAttribute("href"))}))})}function Mc(){const t=M;return`
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
          ${Kr(ui(),sr.map(Ve)).map(oa).join("")}
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Transport</div>
          <h2 style="margin-bottom:12px">Have a Vehicle to List?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join our transport network and earn by connecting travellers with reliable rides across Mizoram.</p>
          <a href="${t("/host-signup-transport")}" class="btn btn-primary btn-lg" data-link>List Your Transport</a>
        </div>
      </div>
    </section>
  `}async function Uc(){const t=document.getElementById("transport-grid");if(!t)return;const e=ui();let r=[];try{const i=await na(Ms(),ia,"Transport list request timed out.");r=Ji(Kr(i.map(Ve),e))}catch(i){console.warn("[transport] falling back to static data:",i.message)}if(r.length||(r=Ji(Kr(e,sr.map(Ve)))),!r.length){t.innerHTML='<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No transport listings available yet.</div></div>';return}t.innerHTML=r.map(oa).join(""),Nc(t)}function Dc(t){return`
    <div id="transport-detail-root" data-transport-id="${t}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading transport details...</div>
      </div>
    </div>
  `}async function Hc(t){var o;const e=document.getElementById("transport-detail-root");if(!e)return;let r=Xt.get(t)||null;if(!r)try{const l=await na(Us(t),ia,"Transport profile request timed out.");r=Ve(l)}catch(l){console.warn("[transport-detail] falling back to static data:",l.message)}if(r||(r=ui().find(l=>l.id===t)||null),!r){const l=Bc(t);l&&(r=Ve(l))}if(!r){e.innerHTML='<div class="page-hero container"><h1>Transport listing not found</h1></div>';return}Xt.set(r.id,r),e.outerHTML=zc(r);const i=new Date,s=new Date(i);s.setDate(s.getDate()+1);const a=l=>l.toISOString().split("T")[0];document.getElementById("pickup-date").value=a(i),document.getElementById("dropoff-date").value=a(s);const n=()=>{var m,g,v;const l=parseInt(((m=document.getElementById("vehicle-select"))==null?void 0:m.value)||0,10),c=new Date((g=document.getElementById("pickup-date"))==null?void 0:g.value),u=new Date((v=document.getElementById("dropoff-date"))==null?void 0:v.value),d=Math.max(1,Math.round((u-c)/864e5)),h=l*d,p=document.getElementById("transport-total");return p&&(p.innerHTML=`<div class="flex-between"><span>Rs ${l.toLocaleString()} x ${d} day${d>1?"s":""}</span><strong style="color:var(--text)">Rs ${h.toLocaleString()}</strong></div>`),h};n(),["vehicle-select","pickup-date","dropoff-date"].forEach(l=>{var c;(c=document.getElementById(l))==null||c.addEventListener("change",n)}),(o=document.getElementById("book-transport-btn"))==null||o.addEventListener("click",()=>{const l=n();window.router.navigate(`/book/${t}?total=${l}&type=transport&name=${encodeURIComponent(r.name)}`)})}function qc(t,e){var d,h,p,m;const r=e.get("checkin")||"",i=e.get("checkout")||"",s=e.get("guests")||"1",a=parseInt(e.get("total")||2e3),n=e.get("type")||"stay",o=e.get("name")?decodeURIComponent(e.get("name")):"",c=pe.find(g=>g.id===t)||{name:o||t,coverImage:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",type:n},u=r&&i?Math.max(1,Math.round((new Date(i)-new Date(r))/864e5)):1;return`
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <h1 style="font-size:clamp(1.5rem,3vw,2.2rem)">Complete Your Booking</h1>
        <p style="color:var(--text-muted)">You're almost there — secure your trip now.</p>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 400px;gap:40px;align-items:start">
          <!-- Left: Booking form -->
          <div>
            ${mt()?"":`
              <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px">⚠️ Login Required</div>
                <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px">Please log in to complete your booking.</div>
                <a href="${M("/login")}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
              </div>
            `}

            <h3 style="margin-bottom:20px">Your Information</h3>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="pay-name" placeholder="Your full name" value="${((d=se())==null?void 0:d.fullName)||((h=se())==null?void 0:h.name)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="pay-email" placeholder="email@example.com" value="${((p=se())==null?void 0:p.email)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="pay-phone" placeholder="+91 98765 43210" value="${((m=se())==null?void 0:m.phone)||""}" />
              </div>
              <div class="form-group">
                <label class="form-label">Special Requests</label>
                <input type="text" class="form-input" id="pay-notes" placeholder="e.g. early check-in, dietary needs" />
              </div>
            </div>

            <div class="divider-h"></div>
            <h3 style="margin-bottom:16px">Payment</h3>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px;margin-bottom:28px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <span style="font-size:1.5rem">🔒</span>
                <div>
                  <div style="font-weight:700">Secure Booking</div>
                  <div style="font-size:0.85rem;color:var(--text-muted)">Your payment info is never stored on our servers</div>
                </div>
              </div>
              <div style="display:flex;gap:16px;flex-wrap:wrap">
                ${["UPI / GPay / PhonePe","Debit / Credit Card","Net Banking","Wallets"].map(g=>`<div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">✓</span>${g}</div>`).join("")}
              </div>
            </div>

            <button class="btn btn-primary btn-lg w-full" id="pay-btn" style="justify-content:center;font-size:1.1rem" ${mt()?"":'disabled style="opacity:0.5;cursor:not-allowed;justify-content:center;font-size:1.1rem"'}>
              🔒 Confirm Booking — ₹${a.toLocaleString()}
            </button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:10px">By booking, you agree to our Terms &amp; Conditions and Cancellation Policy.</p>
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
  `}function Fc(t,e){var c;const r=parseInt(e.get("total")||2e3),i=e.get("checkin")||"",s=e.get("checkout")||"",a=e.get("guests")||"1",n=e.get("type")||"stay",o=e.get("name")?decodeURIComponent(e.get("name")):t,l=pe.find(u=>u.id===t);(c=document.getElementById("pay-btn"))==null||c.addEventListener("click",()=>{var v,y,k,f,A,z,P;if(!mt()){S("Please log in first","","error");return}const u=(y=(v=document.getElementById("pay-name"))==null?void 0:v.value)==null?void 0:y.trim(),d=(f=(k=document.getElementById("pay-email"))==null?void 0:k.value)==null?void 0:f.trim(),h=(z=(A=document.getElementById("pay-phone"))==null?void 0:A.value)==null?void 0:z.trim();if(!u||!d||!h){S("Please fill all fields","","error");return}const m={userId:se().id,listingId:t,listingName:(l==null?void 0:l.name)||o,listingType:n,checkin:i,checkout:s,guests:a,total:r,guestName:u,guestEmail:d,guestPhone:h,notes:((P=document.getElementById("pay-notes"))==null?void 0:P.value)||""},g=Sa(m);S("Booking Confirmed! 🎉",`Ref: ${g.id}`),setTimeout(()=>window.router.navigate("/booking-confirmed"),800)})}function Gc(){var r;const t=M,e=$a();return`
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
  `}function Wc(){}const Vc=12e3,fr=5e3;function Mt(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Jc(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function Kc(t){return typeof(t==null?void 0:t.message)=="string"&&(t.message.toLowerCase().includes("email not confirmed")||t.message.toLowerCase().includes("confirm your email"))}function Ki(t){var e,r;t&&Ye({id:t.id,email:t.email||"",full_name:((e=t.user_metadata)==null?void 0:e.full_name)||((r=t.user_metadata)==null?void 0:r.name)||"",phone:t.phone||"",role:"user"})}function Yc(){return`
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

        <div class="auth-switch mt-16">Don't have an account? <a href="${M("/signup-user")}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${M("/host-signup-stay")}" data-link>Register your property -></a></div>
      </div>
    </div>
  `}function Xc(){var t,e;(t=document.getElementById("login-btn"))==null||t.addEventListener("click",async()=>{var a,n,o;const r=(n=(a=document.getElementById("login-email"))==null?void 0:a.value)==null?void 0:n.trim(),i=(o=document.getElementById("login-password"))==null?void 0:o.value;if(!r||!i){S("Please fill all fields","","error");return}const s=document.getElementById("login-btn");s&&(s.disabled=!0,s.textContent="Signing in...");try{s&&(s.textContent="Checking account...");const{user:l}=await Mt(Cs({email:r,password:i}),Vc,"Login timed out. Please try again.");Ki(l),s&&(s.textContent="Loading your account..."),await Mt(Pr(),fr,"Profile sync timed out."),S("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}catch(l){if(Kc(l))try{await Mt(Ls(r),fr,"Confirmation email resend timed out. Please try again."),S("Email not confirmed","We sent a fresh confirmation email. Check spam or promotions, then try logging in again.","error");return}catch(c){S("Email not confirmed",(c==null?void 0:c.message)||"Check spam or promotions for the confirmation email, then try logging in again.","error");return}if(Jc(l))try{const{getSession:c}=await _t(async()=>{const{getSession:d}=await Promise.resolve().then(()=>ir);return{getSession:d}},void 0),u=await Mt(c(),fr,"Login timed out. Please try again.");if(u){Ki(u.user),Pr().catch(d=>{console.warn("[login] background profile sync failed:",(d==null?void 0:d.message)||d)}),S("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}}catch(c){console.warn("[login] timeout verification failed:",(c==null?void 0:c.message)||c)}try{_a(r,i),S("Welcome back!"),setTimeout(()=>window.router.navigate("/"),500);return}catch{S((l==null?void 0:l.message)||"Invalid email or password","","error")}}finally{s&&(s.disabled=!1,s.textContent="Log In")}}),(e=document.getElementById("login-password"))==null||e.addEventListener("keydown",r=>{var i;r.key==="Enter"&&((i=document.getElementById("login-btn"))==null||i.click())})}function Zc(){return`
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
        <div class="auth-switch mt-16">Already have an account? <a href="${M("/login")}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${M("/host-signup-stay")}" data-link>Register as Host -></a></div>
      </div>
    </div>
  `}function Qc(){var t,e;(t=document.getElementById("signup-btn"))==null||t.addEventListener("click",()=>{var o,l,c,u,d,h,p,m;const r=(l=(o=document.getElementById("su-name"))==null?void 0:o.value)==null?void 0:l.trim(),i=(u=(c=document.getElementById("su-email"))==null?void 0:c.value)==null?void 0:u.trim(),s=(h=(d=document.getElementById("su-phone"))==null?void 0:d.value)==null?void 0:h.trim(),a=(p=document.getElementById("su-password"))==null?void 0:p.value,n=(m=document.getElementById("su-confirm"))==null?void 0:m.value;if(!r||!i||!s||!a){S("Please fill all fields","","error");return}if(a!==n){S("Passwords do not match","","error");return}if(a.length<8){S("Password must be at least 8 characters","","error");return}try{ka({fullName:r,email:i,phone:s,password:a}),S("Account created! Welcome"),setTimeout(()=>window.router.navigate("/discover"),600)}catch(g){S(g.message,"","error")}}),(e=document.getElementById("phone-signup-btn"))==null||e.addEventListener("click",()=>S("OTP signup coming soon!"))}const Yr="https://icgjldvgvtesoehtoinf.supabase.co",vr="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",Yi=3e4;let ie=1;const Je=6,_={};let _e=[],he=[],Re=0,F=[];const ed=["Basic Info","Property","Stay Details","Room Types","Photos","Rules & Submit"];function td(t=""){return t?{apikey:vr,Authorization:`Bearer ${t}`}:{apikey:vr,Authorization:`Bearer ${vr}`}}async function rd(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok)throw new Error(e&&(e.message||e.msg)||"Supabase request failed.");return e}function id(){return`sb-${new URL(Yr).hostname.split(".")[0]}-auth-token`}function sd(){try{return JSON.parse(localStorage.getItem(id()))}catch{return null}}async function Xi(t,e,r){const i=t.type.includes("png")?"png":"jpg",s=`${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,a=`${Yr}/storage/v1/object/${e}/${s}`,n=await fetch(a,{method:"POST",headers:{...td(r),"Content-Type":t.type,"x-upsert":"true"},body:t});return await rd(n),`${Yr}/storage/v1/object/public/${e}/${s}`}function ad(t,e="stay-photo.jpg"){return new Promise((r,i)=>{t.toBlob(s=>{if(!s){i(new Error("Could not prepare the selected image."));return}const a=e.replace(/\.[^.]+$/,"").replace(/[^a-z0-9-_]+/gi,"-").toLowerCase()||"stay-photo";r(new File([s],`${a}.jpg`,{type:"image/jpeg"}))},"image/jpeg",.78)})}async function la(t){return new Promise((e,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(`Could not read ${t.name}.`)),i.onload=s=>{const a=new Image;a.onerror=()=>r(new Error(`Could not process ${t.name}.`)),a.onload=async()=>{try{const n=document.createElement("canvas");let{width:o,height:l}=a;const c=800;o>l&&o>c?(l*=c/o,o=c):l>c&&(o*=c/l,l=c),n.width=Math.max(1,Math.round(o)),n.height=Math.max(1,Math.round(l)),n.getContext("2d").drawImage(a,0,0,n.width,n.height);const u=n.toDataURL("image/jpeg",.72),d=await ad(n,t.name);e({preview:u,preparedFile:d})}catch(n){r(n)}},a.src=s.target.result},i.readAsDataURL(t)})}function nd(){return`
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:700px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Property</h2>
          <p style="color:var(--text-muted)">Join our trusted network of Mizoram hosts</p>
        </div>

        <!-- Stepper -->
        <div class="stepper" id="stepper">${ca()}</div>

        <!-- Steps -->
        <div class="card card-body" style="padding:40px" id="step-container">
          ${da(1)}
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:24px">
          <button class="btn btn-secondary" id="prev-btn" style="${ie===1?"visibility:hidden":""}">← Back</button>
          <div style="color:var(--text-dim);font-size:0.85rem;align-self:center">Step ${ie} of ${Je}</div>
          <button class="btn btn-primary" id="next-btn">${ie===Je?"🚀 Submit Listing":"Next →"}</button>
        </div>
      </div>
    </div>
  `}function ca(){return Array.from({length:Je},(t,e)=>{const r=e+1;return`
      <div class="step ${r<ie?"done":r===ie?"active":""}">
        <div class="step-wrapper">
          <div class="step-circle">${r<ie?"✓":r}</div>
          <div class="step-label">${ed[e]}</div>
        </div>
      </div>
      ${r<Je?'<div class="step-line"></div>':""}
    `}).join("")}function da(t){switch(t){case 1:return`
      <h3 style="margin-bottom:24px">👤 Step 1: Basic Information</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Your Full Name *</label><input type="text" class="form-input" id="h-name" placeholder="E.g. Liana Hnamte" value="${_.name||""}" /></div>
        <div class="form-group"><label class="form-label">Phone Number *</label><input type="tel" class="form-input" id="h-phone" placeholder="+91 98765 43210" value="${_.phone||""}" /></div>
      </div>
      <div class="form-group"><label class="form-label">Email Address *</label><input type="email" class="form-input" id="h-email" placeholder="you@example.com" value="${_.email||""}" /></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="h-password" placeholder="Min 8 characters" /></div>
        <div class="form-group"><label class="form-label">Confirm Password *</label><input type="password" class="form-input" id="h-confirm" placeholder="Repeat password" /></div>
      </div>
      </div>`;case 2:return`
      <h3 style="margin-bottom:24px">🏠 Step 2: Property Information</h3>
      <div class="form-group"><label class="form-label">Property Name *</label><input type="text" class="form-input" id="h-prop-name" placeholder="E.g. Bamboo Haven Homestay" value="${_.propName||""}" /></div>
      <div class="form-group">
        <label class="form-label">Property Type *</label>
        <div class="check-group" id="prop-type-group">
          ${["Homestay","Hotel","Camping","Lodge","Farmstay","Guesthouse"].map(e=>`
            <label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:8px">
              <input type="radio" name="prop-type" value="${e}" ${_.propType===e?"checked":""} style="accent-color:var(--emerald-500)" />
              ${e}
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group"><label class="form-label">Full Address *</label><textarea class="form-textarea" id="h-address" placeholder="Village, District, PIN code" style="min-height:80px">${_.address||""}</textarea></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">District *</label>
          <select class="form-select" id="h-district">
            <option value="">Select District</option>
            ${["Aizawl","Lunglei","Champhai","Kolasib","Lawngtlai","Mamit","Saiha","Serchhip","Saitual","Hnahthial","Khawzawl"].map(e=>`<option ${_.district===e?"selected":""}>${e}</option>`).join("")}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Google Maps Link <span style="font-size:0.8rem;color:var(--text-dim)">(optional)</span></label><input type="url" class="form-input" id="h-maps" placeholder="https://maps.google.com/..." value="${_.mapsLink||""}" /></div>
      </div>`;case 3:return`
      <h3 style="margin-bottom:24px">🛎️ Step 3: Stay Details</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Check-in Time *</label><input type="time" class="form-input" id="h-checkin" value="${_.checkIn||"14:00"}" /></div>
        <div class="form-group"><label class="form-label">Check-out Time *</label><input type="time" class="form-input" id="h-checkout" value="${_.checkOut||"11:00"}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">Amenities</label>
        <div class="check-group" style="flex-wrap:wrap">
          ${["WiFi","Parking","Home-cooked Food","Breakfast Included","Hot Water","Valley View","Bonfire","AC","Private Bathroom","Kitchen Access","Laundry","Waterfall View","Farm Access","Stargazing"].map(e=>`
            <label class="check-item">
              <input type="checkbox" name="amenity" value="${e}" ${(_.amenities||[]).includes(e)?"checked":""} />
              <label>${e}</label>
            </label>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">About Your Place *</label>
        <textarea class="form-textarea" id="h-description" placeholder="Describe what makes your place special — views, atmosphere, what guests will love…" style="min-height:140px">${_.description||""}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Nearby Attractions</label>
        <input type="text" class="form-input" id="h-nearby" placeholder="e.g. Vantawng Falls (2 km), Thenzawl market" value="${_.nearby||""}" />
      </div>`;case 4:return od();case 5:return`
      <h3 style="margin-bottom:8px">📸 Step 5: Property Photos</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem">High-quality photos get 3× more bookings. Minimum 3 property photos required. First photo will be your cover image.</p>
      <div class="upload-zone" id="photo-upload-zone" onclick="document.getElementById('photo-input').click()">
        <div style="font-size:2.5rem;margin-bottom:12px">📷</div>
        <div style="font-weight:700;margin-bottom:6px">Upload Property Photos</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">JPG or PNG • Max 5MB each • Minimum 3 required</div>
        <div style="font-size:0.8rem;color:var(--emerald-400)">💡 Include: exterior, common area, view, dining area</div>
        <input type="file" id="photo-input" multiple accept="image/*" style="display:none" />
      </div>
      <div class="upload-preview" id="photo-preview" style="margin-top:16px"></div>
      <div id="photo-count" style="margin-top:10px;font-size:0.85rem;color:var(--text-muted)">${_e.length>0?_e.length+" photo(s) uploaded":"No photos uploaded yet"}</div>`;case 6:return`
      <h3 style="margin-bottom:24px">📜 Step 6: Rules & Submission</h3>
      <div class="form-group">
        <label class="form-label">House Rules</label>
        <textarea class="form-textarea" id="h-rules" placeholder="e.g. No smoking inside&#10;Quiet hours after 10 PM&#10;No outside guests after 9 PM&#10;Pets on request" style="min-height:120px">${_.rules||""}</textarea>
        <span class="form-hint">One rule per line</span>
      </div>
      <div class="form-group">
        <label class="form-label">Cancellation Policy</label>
        <select class="form-select" id="h-cancel">
          <option value="flexible" ${_.cancellation==="flexible"?"selected":""}>Flexible — Full refund 24 hours before</option>
          <option value="moderate" ${_.cancellation==="moderate"?"selected":""}>Moderate — Full refund 5 days before</option>
          <option value="strict" ${_.cancellation==="strict"?"selected":""}>Strict — 50% refund up to 1 week before</option>
        </select>
      </div>
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px;margin-bottom:20px">
        <div style="font-weight:700;margin-bottom:12px">✅ What happens after submission?</div>
        ${["Our team reviews your listing within 24–48 hours","We verify your ID and property photos","Once approved, your listing goes live on LushaiTrips","You receive 90% of every booking directly to your account"].map(e=>`<div style="display:flex;gap:10px;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">→</span>${e}</div>`).join("")}
      </div>
      <label class="check-item" style="margin-bottom:20px">
        <input type="checkbox" id="h-agree" />
        <label style="font-size:0.9rem">I agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Host Terms & Conditions</a> and confirm all information is accurate.</label>
      </label>`}}function od(){return`
    <h3 style="margin-bottom:8px">🛏️ Step 4: Room Types</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem">Add at least one room type. Each type can have its own name, pricing, and photos.</p>
    <div id="room-cards-container">
      ${F.map((e,r)=>Zt(e,r)).join("")}
    </div>
    <button type="button" class="btn btn-secondary" id="add-room-btn" style="width:100%;justify-content:center;margin-top:12px">
      + Add Room Type
    </button>
  `}function Zt(t,e){const r=(t.images||[]).filter(Boolean).map(i=>`<img src="${i}" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid var(--glass-border)" />`).join("");return`
    <div class="card card-body" id="room-card-${e}" style="margin-bottom:16px;padding:24px;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div style="font-weight:700;font-size:1rem">Room Type ${e+1}</div>
        ${F.length>1?`<button type="button" class="btn btn-secondary btn-sm" data-remove-room="${e}" style="padding:4px 10px;font-size:0.8rem">✕ Remove</button>`:""}
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Room Name *</label>
          <input type="text" class="form-input" id="room-name-${e}" placeholder="e.g. Standard, Deluxe Suite" value="${t.name||""}" />
        </div>
        <div class="form-group">
          <label class="form-label">Number of Rooms *</label>
          <input type="number" class="form-input" id="room-count-${e}" min="1" max="50" placeholder="e.g. 3" value="${t.count||""}" />
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Price per Night (₹) *</label>
          <input type="number" class="form-input" id="room-price-${e}" min="500" placeholder="e.g. 2000" value="${t.price||""}" />
          <span class="form-hint">Platform takes 10% commission.</span>
        </div>
        <div class="form-group">
          <label class="form-label">Max Guests *</label>
          <input type="number" class="form-input" id="room-guests-${e}" min="1" max="20" placeholder="e.g. 2" value="${t.maxGuests||""}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Room Photos <span style="font-size:0.8rem;color:var(--text-dim)">(optional)</span></label>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:10px" id="room-photo-preview-${e}">
          ${r}
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button type="button" class="btn btn-secondary btn-sm" data-room-photo-btn="${e}">📷 Add Photos</button>
          <input type="file" id="room-photo-input-${e}" multiple accept="image/*" style="display:none" />
          <span id="room-photo-count-${e}" style="font-size:0.8rem;color:var(--text-muted)">${(t.files||[]).filter(Boolean).length} photo(s)</span>
        </div>
      </div>
    </div>
  `}function ld(t){var e,r,i,s,a,n,o,l,c,u,d,h,p,m,g,v,y,k,f,A,z,P,b,I,T,O;switch(t){case 1:{_.name=(r=(e=document.getElementById("h-name"))==null?void 0:e.value)==null?void 0:r.trim(),_.email=(s=(i=document.getElementById("h-email"))==null?void 0:i.value)==null?void 0:s.trim(),_.phone=(n=(a=document.getElementById("h-phone"))==null?void 0:a.value)==null?void 0:n.trim(),_.password=(o=document.getElementById("h-password"))==null?void 0:o.value;const j=(l=document.getElementById("h-confirm"))==null?void 0:l.value;return!_.name||!_.email||!_.phone||!_.password?(S("Please fill all required fields","","error"),!1):_.password!==j?(S("Passwords do not match","","error"),!1):_.password.length<8?(S("Password must be 8+ characters","","error"),!1):!0}case 2:return _.propName=(u=(c=document.getElementById("h-prop-name"))==null?void 0:c.value)==null?void 0:u.trim(),_.propType=(d=document.querySelector('input[name="prop-type"]:checked'))==null?void 0:d.value,_.address=(p=(h=document.getElementById("h-address"))==null?void 0:h.value)==null?void 0:p.trim(),_.district=(m=document.getElementById("h-district"))==null?void 0:m.value,_.mapsLink=(v=(g=document.getElementById("h-maps"))==null?void 0:g.value)==null?void 0:v.trim(),!_.propName||!_.propType||!_.address||!_.district?(S("Please fill all required fields","","error"),!1):!0;case 3:return _.checkIn=(y=document.getElementById("h-checkin"))==null?void 0:y.value,_.checkOut=(k=document.getElementById("h-checkout"))==null?void 0:k.value,_.amenities=[...document.querySelectorAll('input[name="amenity"]:checked')].map(j=>j.value),_.description=(A=(f=document.getElementById("h-description"))==null?void 0:f.value)==null?void 0:A.trim(),_.nearby=(P=(z=document.getElementById("h-nearby"))==null?void 0:z.value)==null?void 0:P.trim(),_.description?!0:(S("Please describe your place","","error"),!1);case 4:{let j=!0;return F.forEach((D,oe)=>{var G,X,C,ee,H;D.name=(X=(G=document.getElementById(`room-name-${oe}`))==null?void 0:G.value)==null?void 0:X.trim(),D.count=(C=document.getElementById(`room-count-${oe}`))==null?void 0:C.value,D.price=(ee=document.getElementById(`room-price-${oe}`))==null?void 0:ee.value,D.maxGuests=(H=document.getElementById(`room-guests-${oe}`))==null?void 0:H.value,(!D.name||!D.count||!D.price||!D.maxGuests)&&(j=!1)}),j?F.length===0?(S("Please add at least one room type","","error"),!1):F.some(D=>(D.pending||0)>0)?(S("Please wait for room photos to finish preparing","","error"),!1):!0:(S("Please fill all room type fields","","error"),!1)}case 5:return Re>0?(S("Please wait for photos to finish preparing","","error"),!1):he.filter(Boolean).length<3?(S("Please upload at least 3 property photos","","error"),!1):!0;case 6:return _.rules=(I=(b=document.getElementById("h-rules"))==null?void 0:b.value)==null?void 0:I.trim(),_.cancellation=(T=document.getElementById("h-cancel"))==null?void 0:T.value,(O=document.getElementById("h-agree"))!=null&&O.checked?!0:(S("Please agree to Terms & Conditions","","error"),!1)}}function Zi(t){ie=t,document.getElementById("stepper").innerHTML=ca(),document.getElementById("step-container").innerHTML=da(t),document.getElementById("prev-btn").style.visibility=t===1?"hidden":"visible",document.getElementById("next-btn").textContent=t===Je?"🚀 Submit Listing":"Next →",ua(t),window.scrollTo({top:0,behavior:"smooth"})}function yr(){const t=he.filter(Boolean).length,e=document.getElementById("photo-count");e&&(Re>0?e.textContent=`${t} photo(s) ready, ${Re} still preparing…`:e.textContent=t>0?`${t} photo(s) ready to upload`:"No photos uploaded yet")}function br(t){const e=F[t];if(!e)return;const r=document.getElementById(`room-photo-count-${t}`);if(!r)return;const i=(e.files||[]).filter(Boolean).length,s=e.pending||0;r.textContent=s>0?`${i} ready, ${s} preparing…`:`${i} photo(s)`}function Gt(t){const e=document.querySelector(`[data-room-photo-btn="${t}"]`),r=document.getElementById(`room-photo-input-${t}`);!e||!r||(e.addEventListener("click",()=>r.click()),r.addEventListener("change",async i=>{const s=[...i.target.files];if(!s.length)return;const a=F[t];if(!a)return;const n=document.getElementById(`room-photo-preview-${t}`);a.pending=(a.pending||0)+s.length,br(t),s.forEach(async o=>{var u;const l=(a.files||[]).length;a.files||(a.files=[]),a.images||(a.images=[]),a.files.push(null),a.images[l]=null;const c=document.createElement("div");c.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;width:72px;height:72px;border-radius:8px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.03)",c.innerHTML='<div class="loading-spinner" style="width:20px;height:20px;border-width:2px"></div>',n==null||n.appendChild(c);try{const{preview:d,preparedFile:h}=await la(o);a.images[l]=d,a.files[l]=h,c.style.cssText="position:relative;width:72px;height:72px;border-radius:8px;overflow:hidden;border:1px solid var(--glass-border)",c.innerHTML=`<img src="${d}" style="width:100%;height:100%;object-fit:cover" /><button type="button" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:0.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center" data-room-remove="${t}-${l}">✕</button>`,(u=c.querySelector("[data-room-remove]"))==null||u.addEventListener("click",()=>{a.images[l]=null,a.files[l]=null,c.remove(),br(t)})}catch(d){a.images[l]=null,a.files[l]=null,c.remove(),S(d.message||`Could not prepare ${o.name}.`,"","error")}finally{a.pending=Math.max(0,(a.pending||1)-1),br(t)}})}))}function ua(t){var e,r;t===4&&((e=document.getElementById("add-room-btn"))==null||e.addEventListener("click",()=>{F.push({name:"",count:"",price:"",maxGuests:"",files:[],images:[],pending:0});const i=document.getElementById("room-cards-container");i&&(i.innerHTML=F.map((s,a)=>Zt(s,a)).join(""),F.forEach((s,a)=>Gt(a)),document.querySelectorAll("[data-remove-room]").forEach(s=>{s.addEventListener("click",()=>{const a=parseInt(s.dataset.removeRoom);F.splice(a,1),i.innerHTML=F.map((n,o)=>Zt(n,o)).join(""),F.forEach((n,o)=>Gt(o)),Xr(i)})}))}),F.forEach((i,s)=>Gt(s)),Xr(document.getElementById("room-cards-container"))),t===5&&((r=document.getElementById("photo-input"))==null||r.addEventListener("change",async i=>{const s=[...i.target.files];if(!s.length)return;const a=document.getElementById("photo-preview");Re+=s.length,yr(),s.forEach(async n=>{var c;const o=he.length;he.push(null),_e[o]=null;const l=document.createElement("div");l.className="upload-img-wrap",l.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border)",l.innerHTML=`<div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div><div style="font-size:0.68rem;color:var(--text-muted);text-align:center">${n.name}</div>`,a==null||a.appendChild(l);try{const{preview:u,preparedFile:d}=await la(n);_e[o]=u,he[o]=d,l.style.cssText="",l.innerHTML=`<img src="${u}" alt="upload" />${o===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img">✕</button>`,(c=l.querySelector(".remove-img"))==null||c.addEventListener("click",()=>{_e[o]=null,he[o]=null,l.remove(),yr()})}catch(u){_e[o]=null,he[o]=null,l.remove(),S(u.message||`Could not prepare ${n.name}.`,"","error")}finally{Re=Math.max(0,Re-1),yr()}})}))}function Xr(t){t&&document.querySelectorAll("[data-remove-room]").forEach(e=>{e.addEventListener("click",()=>{const r=parseInt(e.dataset.removeRoom);F.splice(r,1),t.innerHTML=F.map((i,s)=>Zt(i,s)).join(""),F.forEach((i,s)=>Gt(s)),Xr(t)})})}function cd(){var t,e;_e=[],he=[],Re=0,F=[{name:"",count:"",price:"",maxGuests:"",files:[],images:[],pending:0}],(t=document.getElementById("next-btn"))==null||t.addEventListener("click",()=>{ld(ie)&&(ie===Je?dd():Zi(ie+1))}),(e=document.getElementById("prev-btn"))==null||e.addEventListener("click",()=>{ie>1&&Zi(ie-1)}),ua(1)}async function dd(){var e,r;const t=document.getElementById("next-btn");t&&(t.disabled=!0,t.textContent="⏳ Submitting…");try{const{supabase:i}=await _t(async()=>{const{supabase:d}=await Promise.resolve().then(()=>ir);return{supabase:d}},void 0);let s=((e=sd())==null?void 0:e.access_token)||null;if(!s){const{data:{session:d}}=await i.auth.getSession();s=(d==null?void 0:d.access_token)||null}if(!s){const{data:d,error:h}=await i.auth.signUp({email:_.email,password:_.password,options:{data:{full_name:_.name}}});if(h)throw h;const{data:p}=await i.auth.getSession();if(!p.session)throw new Error("Email is already registered. Please log in first, or use a different email.");s=p.session.access_token,d.user&&await i.from("profiles").upsert({id:d.user.id,full_name:_.name,phone:_.phone,role:"user"})}await Pr(),t&&(t.textContent="⏳ Uploading room photos…");const a=[];for(const[d,h]of F.entries()){const p=(h.files||[]).filter(Boolean);let m=[];for(const[g,v]of p.entries()){t&&(t.textContent=`⏳ Room ${d+1} photo ${g+1}/${p.length}…`);try{const y=await Promise.race([Xi(v,"stay-images",s),new Promise((k,f)=>setTimeout(()=>f(new Error("upload timeout")),Yi))]);y&&m.push(y)}catch(y){console.warn("[Stay] room image upload failed (skipping):",y.message)}}a.push({name:h.name,count:parseInt(h.count),price:parseInt(h.price),max_guests:parseInt(h.maxGuests),images:m,cover:m[0]||""})}const n=he.filter(Boolean);let o=[];if(n.length>0){t&&(t.textContent="⏳ Uploading property photos…");for(const[d,h]of n.entries()){t&&(t.textContent=`⏳ Uploading ${d+1}/${n.length}…`);try{const p=await Promise.race([Xi(h,"stay-images",s),new Promise((m,g)=>setTimeout(()=>g(new Error("upload timeout")),Yi))]);p&&o.push(p)}catch(p){console.warn("[Stay] property image upload failed (skipping):",p.message)}}}t&&(t.textContent="⏳ Saving listing…");const l=a.reduce((d,h)=>Math.min(d,h.price),1/0),c=a.reduce((d,h)=>d+h.count,0),u=a.reduce((d,h)=>Math.max(d,h.max_guests),0);await Ds({name:_.propName,type:_.propType,location:_.address,district:_.district,price:l===1/0?0:l,rooms:c,max_guests:u,amenities:_.amenities||[],description:_.description,images:o,cover_image:o[0]||"",check_in:_.checkIn,check_out:_.checkOut,rules:((r=_.rules)==null?void 0:r.split(`
`).filter(Boolean))||[],room_types:a,verified:!0,top_rated:!1}),ie=1,_e=[],he=[],F=[],S("Listing live! 🎉","Your stay is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(i){S(i.message||"Submission failed","","error"),t&&(t.disabled=!1,t.textContent="🚀 Submit Listing")}}let et=[],ye=[],at=0;const wr=15e3,ud=6e4,hd=6e4,pd=3e4,Ce="https://icgjldvgvtesoehtoinf.supabase.co",md="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",Qi="lt_recent_guides";function nt(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function gd(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function fd(){return ye.filter(Boolean).length}function ha(){return at}function Zr(t,e="var(--text-muted)"){const r=document.getElementById("g-photo-status");r&&(r.textContent=t,r.style.color=e)}function K(t,e="var(--text-muted)"){const r=document.getElementById("g-submit-status");r&&(r.textContent=t,r.style.color=e)}function Ae(t,e=""){const r=document.getElementById("g-photo-loader"),i=document.getElementById("g-photo-loader-text");!r||!i||(r.style.display=t?"flex":"none",i.textContent=e)}function Ut(){const t=ha(),e=fd();if(t>0){Ae(!0,`Preparing ${t} photo(s)...`),Zr(`${e} photo(s) ready, ${t} still preparing...`,"var(--emerald-400)");return}Ae(!1),Zr(e?`${e} photo(s) ready to upload.`:"No photos selected yet.",e?"var(--emerald-400)":"var(--text-muted)")}function ar(t){return typeof(t==null?void 0:t.message)=="string"?t.message.toLowerCase():""}function vd(t){const e=ar(t);return e.includes("already registered")||e.includes("user already registered")}function yd(t){const e=ar(t);return e.includes("invalid login credentials")||e.includes("invalid email or password")}function xr(t){const e=ar(t);return e.includes("email not confirmed")||e.includes("confirm your email")}function bd(t){const e=ar(t);return e.includes("rate limit")||e.includes("too many requests")}function kr(){throw new Error("Your email is confirmed but we could not sign you in automatically. Please log in via the Login page first, then come back and submit the guide form again.")}function ue(t,e=!0){const r=document.getElementById("submit-guide-btn");r&&(r.disabled=e,r.textContent=t)}function pa(){return`sb-${new URL(Ce).hostname.split(".")[0]}-auth-token`}function wd(){try{return JSON.parse(localStorage.getItem(pa()))}catch{return null}}function ma(t){t&&localStorage.setItem(pa(),JSON.stringify(t))}function Ke(t){var r,i;const e=(t==null?void 0:t.user)||t;e&&Ye({id:e.id,email:e.email||"",full_name:((r=e.user_metadata)==null?void 0:r.full_name)||((i=e.user_metadata)==null?void 0:i.name)||"",phone:e.phone||"",role:"user"})}function Et(t=""){const e={apikey:md};return t&&(e.Authorization=`Bearer ${t}`),e}async function $t(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok){const r=(e==null?void 0:e.msg)||(e==null?void 0:e.message)||"Supabase request failed.";throw new Error(r)}return e}async function _r(t,e){const r=await fetch(`${Ce}/auth/v1/token?grant_type=password`,{method:"POST",headers:{...Et(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),i=await $t(r);return ma(i),Ke(i),i}async function xd(t,e,r){const i=await fetch(`${Ce}/auth/v1/signup`,{method:"POST",headers:{...Et(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,data:{full_name:r}})}),s=await $t(i);return s!=null&&s.access_token?(ma(s),Ke(s)):s!=null&&s.user&&Ke(s.user),s}async function kd(t,e,r){const i=t.type.includes("png")?"png":"jpg",s=`${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,a=`${Ce}/storage/v1/object/${e}/${s}`,n=await fetch(a,{method:"POST",headers:{...Et(r),"Content-Type":t.type,"x-upsert":"true"},body:t});return await $t(n),`${Ce}/storage/v1/object/public/${e}/${s}`}async function _d(t,e){const r=await fetch(`${Ce}/rest/v1/guides`,{method:"POST",headers:{...Et(e),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)}),i=await $t(r);return Array.isArray(i)?i[0]:i}function es(t){if(!(t!=null&&t.id))return;const e=N.get(Qi),r=Array.isArray(e)?e:[],i=[t,...r.filter(s=>(s==null?void 0:s.id)!==t.id)];N.set(Qi,i.slice(0,8))}function Sd(t,e="guide-photo.jpg"){return new Promise((r,i)=>{t.toBlob(s=>{if(!s){i(new Error("Could not prepare the selected image."));return}const a=e.replace(/\.[^.]+$/,"").replace(/[^a-z0-9-_]+/gi,"-").toLowerCase()||"guide-photo";r(new File([s],`${a}.jpg`,{type:"image/jpeg"}))},"image/jpeg",.78)})}async function Ed(t){return new Promise((e,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(`Could not read ${t.name}.`)),i.onload=s=>{const a=new Image;a.onerror=()=>r(new Error(`Could not process ${t.name}.`)),a.onload=async()=>{try{const n=document.createElement("canvas");let{width:o,height:l}=a;const c=800;o>l&&o>c?(l*=c/o,o=c):l>c&&(o*=c/l,l=c),n.width=Math.max(1,Math.round(o)),n.height=Math.max(1,Math.round(l)),n.getContext("2d").drawImage(a,0,0,n.width,n.height);const u=n.toDataURL("image/jpeg",.72),d=await Sd(n,t.name);e({preview:u,preparedFile:d})}catch(n){r(n)}},a.src=s.target.result},i.readAsDataURL(t)})}function $d(t){const e=document.createElement("div");return e.className="upload-img-wrap",e.style.background="rgba(255,255,255,0.03)",e.style.border="1px solid var(--glass-border)",e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="8px",e.innerHTML=`
    <div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div>
    <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;line-height:1.35">${t}</div>
  `,e}function Td(t,e,r){t.style.background="",t.style.border="",t.style.display="",t.style.flexDirection="",t.style.alignItems="",t.style.justifyContent="",t.style.padding="",t.innerHTML=`<img src="${e}" alt="upload" />${r===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>':""}<button class="remove-img">x</button>`}async function Ad(t,e){const r=new URLSearchParams({select:"*",email:`eq.${t}`,phone:`eq.${e}`,order:"created_at.desc",limit:"1"}),i=await fetch(`${Ce}/rest/v1/guides?${r.toString()}`,{headers:Et()}),s=await $t(i);return Array.isArray(s)&&s[0]||null}async function Id({name:t,email:e,password:r,phone:i}){var a,n,o,l,c,u;const s=wd();if(s!=null&&s.access_token){const d=(n=(a=s==null?void 0:s.user)==null?void 0:a.email)==null?void 0:n.toLowerCase();if(d===e.toLowerCase())return K("Using your active session...","var(--emerald-400)"),ue("Using active session..."),Ke(s),{userId:s.user.id,accessToken:s.access_token};if(d)return K("Using your active session...","var(--emerald-400)"),ue("Using active session..."),Ke(s),{userId:s.user.id,accessToken:s.access_token}}K("Signing you in...","var(--emerald-400)"),ue("Signing in...");try{const d=await nt(_r(e,r),wr,"Login timed out. Please try again.");if((o=d==null?void 0:d.user)!=null&&o.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token}}catch(d){if(xr(d)&&kr(),!yd(d))throw d}K("Creating your guide account...","var(--emerald-400)"),ue("Creating account...");try{const d=await nt(xd(e,r,t),ud,"Sign-up timed out. Please try again in a moment.");if((l=d==null?void 0:d.user)!=null&&l.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token};K("Finishing sign-in...","var(--emerald-400)"),ue("Finishing sign-in...");const h=await nt(_r(e,r),wr,"Login timed out. Please try again.");if((c=h==null?void 0:h.user)!=null&&c.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}catch(d){if(vd(d)){K("Account already exists. Signing you in...","var(--emerald-400)"),ue("Signing you in...");try{const h=await nt(_r(e,r),wr,"Login timed out. Please try again.");if((u=h==null?void 0:h.user)!=null&&u.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}catch(h){throw xr(h)&&kr(),h}}throw bd(d)?new Error("Too many signup requests. Please wait a few minutes, or log in first then submit the guide form."):(xr(d)&&kr(),d)}throw new Error("Could not establish a guide account session. Please log in via the Login page first, then submit the guide form.")}function Pd(){return`
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
  `}function Rd(){var t,e;et=[],ye=[],at=0,Ae(!1),Ut(),K("Ready to submit your guide profile."),(t=document.getElementById("g-photos"))==null||t.addEventListener("change",async r=>{const i=[...r.target.files];if(!i.length)return;const s=document.getElementById("g-photo-preview");at+=i.length,Ut(),i.forEach(async a=>{var l;const n=ye.length;ye.push(null),et[n]=null;const o=$d(a.name);s==null||s.appendChild(o);try{const{preview:c,preparedFile:u}=await Ed(a);et[n]=c,ye[n]=u,Td(o,c,n),(l=o.querySelector(".remove-img"))==null||l.addEventListener("click",()=>{et[n]=null,ye[n]=null,o.remove(),Ut()})}catch(c){et[n]=null,ye[n]=null,o.remove(),S(c.message||`Could not prepare ${a.name}.`,"","error")}finally{at=Math.max(0,at-1),Ut()}})}),(e=document.getElementById("submit-guide-btn"))==null||e.addEventListener("click",async()=>{var v,y,k,f,A,z,P,b,I,T,O,j,W,D,oe,G,X;const r=(y=(v=document.getElementById("g-name"))==null?void 0:v.value)==null?void 0:y.trim(),i=(f=(k=document.getElementById("g-email"))==null?void 0:k.value)==null?void 0:f.trim(),s=(z=(A=document.getElementById("g-phone"))==null?void 0:A.value)==null?void 0:z.trim(),a=(P=document.getElementById("g-password"))==null?void 0:P.value,n=(I=(b=document.getElementById("g-title"))==null?void 0:b.value)==null?void 0:I.trim(),o=(O=(T=document.getElementById("g-bio"))==null?void 0:T.value)==null?void 0:O.trim(),l=(j=document.getElementById("g-price"))==null?void 0:j.value,c=(W=document.getElementById("g-location"))==null?void 0:W.value,u=(D=document.getElementById("g-exp"))==null?void 0:D.value,d=[...document.querySelectorAll('input[name="g-lang"]:checked')].map(C=>C.value),h=[...document.querySelectorAll('input[name="g-spec"]:checked')].map(C=>C.value),p=(G=(oe=document.getElementById("g-certs"))==null?void 0:oe.value)==null?void 0:G.split(`
`).filter(Boolean),m=(X=document.getElementById("g-agree"))==null?void 0:X.checked;let g="starting";if(!r||!i||!s||!a||!n||!o||!l||!c||!u||!d.length||!h.length){S("Please fill all required fields","","error");return}if(!m){S("Please agree to the Guide Terms","","error");return}if(ha()>0){S("Please wait for photos to finish preparing.","","error");return}ue("Submitting..."),K("Starting guide registration...","var(--emerald-400)");try{g="auth";const C=await Id({name:r,email:i,password:a,phone:s});K("Loading your account...","var(--emerald-400)"),Ke({user:{id:C.userId,email:i,user_metadata:{full_name:r},phone:s}});const ee=ye.filter(Boolean);let H=[];if(ee.length>0){g="upload",ue("Uploading photos..."),K(`Uploading ${ee.length} photo(s)...`,"var(--emerald-400)"),Ae(!0,`Uploading 1 of ${ee.length} photo(s)...`);for(const[It,Ze]of ee.entries()){Ae(!0,`Uploading ${It+1} of ${ee.length} photo(s)...`);const pi=await Promise.race([kd(Ze,"guide-images",C.accessToken).catch(lr=>(console.warn("[Guide] image upload failed (skipping):",lr.message),null)),new Promise(lr=>setTimeout(()=>{console.warn("[Guide] upload timeout, skipping image"),lr(null)},pd))]);pi&&H.push(pi)}Ae(!1),Zr(H.length===ee.length?`${H.length} photo(s) uploaded successfully.`:`${H.length} of ${ee.length} photo(s) uploaded.`,H.length?"var(--emerald-400)":"var(--text-muted)")}ue("Saving profile..."),K("Saving your guide profile...","var(--emerald-400)"),g="save";const or=await nt(_d({host_id:C.userId,name:r,title:n,experience:u,languages:d,specialties:h,price:parseInt(l),location:c,bio:o,certifications:p,images:H,cover_image:H[0]||"",phone:s,email:i,verified:!0,available:!0,status:"approved"},C.accessToken),hd,"Saving guide profile timed out. Please retry.");es(or),K("Guide profile created successfully.","var(--emerald-400)"),S("Guide application live! 🎉","Your profile is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(C){if(console.error("[Guide Signup] ERROR:",C),Ae(!1),gd(C)){try{const H=g==="save"?await Ad(i,s):null;if(H){es(H),K("Guide profile saved successfully.","var(--emerald-400)"),S("Guide application submitted","Your profile was saved. Redirecting to dashboard."),setTimeout(()=>window.router.navigate("/host-dashboard"),800);return}}catch(H){console.warn("[Guide Signup] timeout verification failed:",(H==null?void 0:H.message)||H)}K(g==="auth"?"Account setup took too long. If this email already has an account, log in first and then submit the guide form.":g==="upload"?"Photo upload took too long. Try fewer or smaller photos, then submit again.":g==="save"?"Saving your guide profile took too long. Please retry in a moment.":"The request took too long. Please retry in a moment.","#f87171")}else K(C.message||"Guide registration failed.","#f87171");S(C.message||"Submission failed. Please try again.","","error"),ue("Submit Guide Application 🧭",!1)}})}let tt=[],be=[],ot=0,Sr=1;const Er=15e3,Cd=6e4,Ld=6e4,Od=3e4,Le="https://icgjldvgvtesoehtoinf.supabase.co",jd="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE",ts="lt_recent_transport";function lt(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function Bd(t){return typeof(t==null?void 0:t.message)=="string"&&t.message.toLowerCase().includes("timed out")}function zd(){return be.filter(Boolean).length}function ga(){return ot}function Qr(t,e="var(--text-muted)"){const r=document.getElementById("t-photo-status");r&&(r.textContent=t,r.style.color=e)}function Q(t,e="var(--text-muted)"){const r=document.getElementById("t-submit-status");r&&(r.textContent=t,r.style.color=e)}function Ie(t,e=""){const r=document.getElementById("t-photo-loader"),i=document.getElementById("t-photo-loader-text");!r||!i||(r.style.display=t?"flex":"none",i.textContent=e)}function Dt(){const t=ga(),e=zd();if(t>0){Ie(!0,`Preparing ${t} photo(s)...`),Qr(`${e} photo(s) ready, ${t} still preparing...`,"var(--emerald-400)");return}Ie(!1),Qr(e?`${e} photo(s) ready to upload.`:"No photos selected yet.",e?"var(--emerald-400)":"var(--text-muted)")}function nr(t){return typeof(t==null?void 0:t.message)=="string"?t.message.toLowerCase():""}function Nd(t){const e=nr(t);return e.includes("already registered")||e.includes("user already registered")}function Md(t){const e=nr(t);return e.includes("invalid login credentials")||e.includes("invalid email or password")}function rs(t){const e=nr(t);return e.includes("email not confirmed")||e.includes("confirm your email")}function Ud(t){const e=nr(t);return e.includes("rate limit")||e.includes("too many requests")}function fe(t,e=!0){const r=document.getElementById("submit-transport-btn");r&&(r.disabled=e,r.textContent=t)}function fa(){return`sb-${new URL(Le).hostname.split(".")[0]}-auth-token`}function Dd(){try{return JSON.parse(localStorage.getItem(fa()))}catch{return null}}function va(t){t&&localStorage.setItem(fa(),JSON.stringify(t))}function kt(t){var r,i;const e=(t==null?void 0:t.user)||t;e&&Ye({id:e.id,email:e.email||"",full_name:((r=e.user_metadata)==null?void 0:r.full_name)||((i=e.user_metadata)==null?void 0:i.name)||"",phone:e.phone||"",role:"user"})}function Tt(t=""){const e={apikey:jd};return t&&(e.Authorization=`Bearer ${t}`),e}async function At(t){let e=null;try{e=await t.json()}catch{e=null}if(!t.ok){const r=(e==null?void 0:e.msg)||(e==null?void 0:e.message)||"Supabase request failed.";throw new Error(r)}return e}async function $r(t,e){const r=await fetch(`${Le}/auth/v1/token?grant_type=password`,{method:"POST",headers:{...Tt(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),i=await At(r);return va(i),kt(i),i}async function Hd(t,e,r){const i=await fetch(`${Le}/auth/v1/signup`,{method:"POST",headers:{...Tt(),"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,data:{full_name:r}})}),s=await At(i);return s!=null&&s.access_token?(va(s),kt(s)):s!=null&&s.user&&kt(s.user),s}async function qd(t,e,r){const i=t.type.includes("png")?"png":"jpg",s=`${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,a=`${Le}/storage/v1/object/${e}/${s}`,n=await fetch(a,{method:"POST",headers:{...Tt(r),"Content-Type":t.type,"x-upsert":"true"},body:t});return await At(n),`${Le}/storage/v1/object/public/${e}/${s}`}async function Fd(t,e){const r=await fetch(`${Le}/rest/v1/transport`,{method:"POST",headers:{...Tt(e),"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)}),i=await At(r);return Array.isArray(i)?i[0]:i}function is(t){if(!(t!=null&&t.id))return;const e=N.get(ts),r=Array.isArray(e)?e:[],i=[t,...r.filter(s=>(s==null?void 0:s.id)!==t.id)];N.set(ts,i.slice(0,8))}async function Gd(t,e){const r=new URLSearchParams({select:"*",email:`eq.${t}`,phone:`eq.${e}`,order:"created_at.desc",limit:"1"}),i=await fetch(`${Le}/rest/v1/transport?${r.toString()}`,{headers:Tt()}),s=await At(i);return Array.isArray(s)&&s[0]||null}async function Wd({name:t,email:e,password:r,phone:i}){var a,n,o,l,c,u;const s=Dd();if(s!=null&&s.access_token&&((n=(a=s==null?void 0:s.user)==null?void 0:a.email)==null?void 0:n.toLowerCase())===e.toLowerCase())return Q("Using your active session...","var(--emerald-400)"),fe("Using active session..."),kt(s),{userId:s.user.id,accessToken:s.access_token};Q("Signing you in...","var(--emerald-400)"),fe("Signing in...");try{const d=await lt($r(e,r),Er,"Login timed out. Please try again.");if((o=d==null?void 0:d.user)!=null&&o.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token}}catch(d){if(rs(d))throw new Error("This account exists but is not confirmed yet. Check your email, then log in and submit the transport form again.");if(!Md(d))throw d}Q("Creating your transport account...","var(--emerald-400)"),fe("Creating account...");try{const d=await lt(Hd(e,r,t),Cd,"Sign-up timed out. Please try again in a moment.");if((l=d==null?void 0:d.user)!=null&&l.id&&(d!=null&&d.access_token))return{userId:d.user.id,accessToken:d.access_token};Q("Finishing sign-in...","var(--emerald-400)"),fe("Finishing sign-in...");const h=await lt($r(e,r),Er,"Login timed out. Please try again.");if((c=h==null?void 0:h.user)!=null&&c.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}catch(d){if(Nd(d)){Q("Account already exists. Signing you in...","var(--emerald-400)"),fe("Signing you in...");const h=await lt($r(e,r),Er,"Login timed out. Please try again.");if((u=h==null?void 0:h.user)!=null&&u.id&&(h!=null&&h.access_token))return{userId:h.user.id,accessToken:h.access_token}}throw Ud(d)?new Error("Too many signup emails were requested. Please wait a few minutes, or log in first and then submit the transport form."):rs(d)?new Error("Your account needs email confirmation before transport registration can continue. Confirm the email, log in, then submit again."):d}throw new Error("We could not create an active transport account session. Please log in again and retry.")}function Vd(t,e="transport-photo.jpg"){return new Promise((r,i)=>{t.toBlob(s=>{if(!s){i(new Error("Could not prepare the selected image."));return}const a=e.replace(/\.[^.]+$/,"").replace(/[^a-z0-9-_]+/gi,"-").toLowerCase()||"transport-photo";r(new File([s],`${a}.jpg`,{type:"image/jpeg"}))},"image/jpeg",.78)})}async function Jd(t){return new Promise((e,r)=>{const i=new FileReader;i.onerror=()=>r(new Error(`Could not read ${t.name}.`)),i.onload=s=>{const a=new Image;a.onerror=()=>r(new Error(`Could not process ${t.name}.`)),a.onload=async()=>{try{const n=document.createElement("canvas");let{width:o,height:l}=a;const c=800;o>l&&o>c?(l*=c/o,o=c):l>c&&(o*=c/l,l=c),n.width=Math.max(1,Math.round(o)),n.height=Math.max(1,Math.round(l)),n.getContext("2d").drawImage(a,0,0,n.width,n.height);const u=n.toDataURL("image/jpeg",.72),d=await Vd(n,t.name);e({preview:u,preparedFile:d})}catch(n){r(n)}},a.src=s.target.result},i.readAsDataURL(t)})}function Kd(t){const e=document.createElement("div");return e.className="upload-img-wrap",e.style.background="rgba(255,255,255,0.03)",e.style.border="1px solid var(--glass-border)",e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="8px",e.innerHTML=`
    <div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div>
    <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;line-height:1.35">${t}</div>
  `,e}function Yd(t,e,r){t.style.background="",t.style.border="",t.style.display="",t.style.flexDirection="",t.style.alignItems="",t.style.justifyContent="",t.style.padding="",t.innerHTML=`<img src="${e}" alt="upload" />${r===0?'<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>':""}<button class="remove-img">x</button>`}function ya(t){return`
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
  `}function Xd(t){var a,n,o,l,c;const e=((n=(a=t.querySelector('[data-vehicle-field="name"]'))==null?void 0:a.value)==null?void 0:n.trim())||"",r=((o=t.querySelector('[data-vehicle-field="capacity"]'))==null?void 0:o.value)||"",i=((l=t.querySelector('[data-vehicle-field="price"]'))==null?void 0:l.value)||"",s=((c=t.querySelector('[data-vehicle-field="price_unit"]'))==null?void 0:c.value)||"per day (fuel incl.)";return{name:e,capacity:r,price:i,priceUnit:s}}function Zd(){const t=[...document.querySelectorAll("[data-vehicle-row]")],e=[];for(const r of t){const i=Xd(r);if(i.name||i.capacity||i.price){if(!i.name||!i.capacity||!i.price)throw new Error("Please complete each vehicle entry or remove the incomplete row.");e.push({name:i.name,capacity:parseInt(i.capacity,10),price:parseInt(i.price,10),price_unit:i.priceUnit})}}if(!e.length)throw new Error("Please add at least one vehicle with its pricing details.");return e}function Qd(){return`
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
            ${ya(0)}
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
  `}function eu(){var t,e,r,i,s;tt=[],be=[],ot=0,Sr=1,Ie(!1),Dt(),Q("Ready to submit your transport listing."),(t=document.getElementById("add-vehicle-btn"))==null||t.addEventListener("click",()=>{Sr+=1;const a=document.getElementById("vehicles-container");a==null||a.insertAdjacentHTML("beforeend",ya(Sr-1))}),(e=document.getElementById("vehicles-container"))==null||e.addEventListener("click",a=>{var o;const n=a.target.closest("[data-remove-vehicle]");n&&((o=n.closest("[data-vehicle-row]"))==null||o.remove())}),(r=document.getElementById("t-photos"))==null||r.addEventListener("change",async a=>{const n=[...a.target.files];if(!n.length)return;const o=document.getElementById("t-photo-preview");ot+=n.length,Dt(),n.forEach(async l=>{var d;const c=be.length;be.push(null),tt[c]=null;const u=Kd(l.name);o==null||o.appendChild(u);try{const{preview:h,preparedFile:p}=await Jd(l);tt[c]=h,be[c]=p,Yd(u,h,c),(d=u.querySelector(".remove-img"))==null||d.addEventListener("click",()=>{tt[c]=null,be[c]=null,u.remove(),Dt()})}catch(h){tt[c]=null,be[c]=null,u.remove(),S(h.message||`Could not prepare ${l.name}.`,"","error")}finally{ot=Math.max(0,ot-1),Dt()}})}),(i=document.getElementById("t-license"))==null||i.addEventListener("change",a=>{a.target.files[0]&&(document.getElementById("t-license-preview").textContent=`Selected: ${a.target.files[0].name}`)}),(s=document.getElementById("submit-transport-btn"))==null||s.addEventListener("click",async()=>{var y,k,f,A,z,P,b,I,T,O,j,W,D,oe;const a=(k=(y=document.getElementById("t-name"))==null?void 0:y.value)==null?void 0:k.trim(),n=(A=(f=document.getElementById("t-email"))==null?void 0:f.value)==null?void 0:A.trim(),o=(P=(z=document.getElementById("t-phone"))==null?void 0:z.value)==null?void 0:P.trim(),l=(b=document.getElementById("t-password"))==null?void 0:b.value,c=(T=(I=document.getElementById("t-biz"))==null?void 0:I.value)==null?void 0:T.trim(),u=(O=document.querySelector('input[name="t-type"]:checked'))==null?void 0:O.value,d=(j=document.getElementById("t-location"))==null?void 0:j.value,h=(D=(W=document.getElementById("t-desc"))==null?void 0:W.value)==null?void 0:D.trim(),p=[...document.querySelectorAll('input[name="t-feat"]:checked')].map(G=>G.value),m=(oe=document.getElementById("t-agree"))==null?void 0:oe.checked;let g=[],v="starting";if(!a||!n||!o||!l||!c||!u||!d||!h){S("Please fill all required fields","","error");return}try{g=Zd()}catch(G){S(G.message,"","error");return}if(!m){S("Please agree to the Transport Partner Terms","","error");return}if(ga()>0){S("Please wait for photos to finish preparing.","","error");return}fe("Submitting..."),Q("Starting transport registration...","var(--emerald-400)");try{v="auth";const G=await Wd({name:a,email:n,password:l,phone:o});Q("Loading your account...","var(--emerald-400)"),kt({user:{id:G.userId,email:n,user_metadata:{full_name:a},phone:o}});const X=be.filter(Boolean);let C=[];if(X.length>0){v="upload",fe("Uploading photos..."),Q(`Uploading ${X.length} photo(s)...`,"var(--emerald-400)"),Ie(!0,`Uploading 1 of ${X.length} photo(s)...`);for(const[H,or]of X.entries()){Ie(!0,`Uploading ${H+1} of ${X.length} photo(s)...`);const It=await Promise.race([qd(or,"transport-images",G.accessToken).catch(Ze=>(console.warn("[Transport] image upload failed (skipping):",Ze.message),null)),new Promise(Ze=>setTimeout(()=>{console.warn("[Transport] upload timeout, skipping image"),Ze(null)},Od))]);It&&C.push(It)}Ie(!1),Qr(C.length===X.length?`${C.length} photo(s) uploaded successfully.`:`${C.length} of ${X.length} photo(s) uploaded.`,C.length?"var(--emerald-400)":"var(--text-muted)")}v="save",fe("Saving listing..."),Q("Saving your transport listing...","var(--emerald-400)");const ee=await lt(Fd({host_id:G.userId,name:c,owner_name:a,type:u,location:d,description:h,features:p,images:C,cover_image:C[0]||"",phone:o,email:n,vehicles:g,verified:!0,available:!0,status:"approved"},G.accessToken),Ld,"Saving transport listing timed out. Please retry.");is(ee),Q("Transport listing created successfully.","var(--emerald-400)"),S("Transport listing live!","Your listing is now visible to travellers."),setTimeout(()=>window.router.navigate("/host-dashboard"),800)}catch(G){if(console.error("[Transport Signup] ERROR:",G),Ie(!1),Bd(G)){try{const C=v==="save"?await Gd(n,o):null;if(C){is(C),Q("Transport listing saved successfully.","var(--emerald-400)"),S("Transport listing submitted","Your listing was saved. Redirecting to dashboard."),setTimeout(()=>window.router.navigate("/host-dashboard"),800);return}}catch(C){console.warn("[Transport Signup] timeout verification failed:",(C==null?void 0:C.message)||C)}Q(v==="auth"?"Account setup took too long. If this email already has an account, log in first and then submit the transport form.":v==="upload"?"Photo upload took too long. Try fewer or smaller photos, then submit again.":v==="save"?"Saving your transport listing took too long. Please retry in a moment.":"The request took too long. Please retry in a moment.","#f87171")}else Q(G.message||"Transport registration failed.","#f87171");S(G.message||"Submission failed. Please try again.","","error"),fe("Submit Transport Listing",!1)}})}function tu(){const t=M,e=se();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;const r=Ea(),i=ei(),s=pe.filter(a=>i.includes(a.id));return`
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
                <div class="card-img-wrap"><img src="${a.coverImage}" alt="${a.name}" loading="lazy" /><div class="card-rating">${Y(a.rating)} ${a.rating}</div></div>
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
  `}function ru(){var e;(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{Ir()});const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(r=>{r.addEventListener("click",()=>{var i;t.forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(s=>s.classList.add("hidden")),(i=document.getElementById(`tab-${r.dataset.tab}`))==null||i.classList.remove("hidden")})}),document.querySelectorAll("[data-href]").forEach(r=>r.addEventListener("click",()=>window.router.navigate(r.dataset.href)))}const iu=1e4,su="lt_recent_guides",au="lt_recent_transport";function nu(t,e,r){let i;const s=new Promise((a,n)=>{i=setTimeout(()=>n(new Error(r)),e)});return Promise.race([t,s]).finally(()=>clearTimeout(i))}function ht(t,e){const i=(Array.isArray(t==null?void 0:t.vehicles)?t.vehicles:[])[0]||null,s=Number(e==="transport"?(i==null?void 0:i.price)||0:(t==null?void 0:t.price)||0);return{id:t==null?void 0:t.id,type:e,name:(t==null?void 0:t.name)||"Untitled Listing",location:(t==null?void 0:t.location)||(t==null?void 0:t.district)||"Mizoram",coverImage:(t==null?void 0:t.cover_image)||(Array.isArray(t==null?void 0:t.images)?t.images[0]:"")||"",price:s,priceLabel:e==="transport"?(i==null?void 0:i.price_unit)||(i==null?void 0:i.priceUnit)||"starting price":e==="guide"?(t==null?void 0:t.price_unit)||"per day":"per night",status:(t==null?void 0:t.status)||"approved",rating:Number((t==null?void 0:t.rating)||0)}}function ou(t){const e=t.status==="pending"?"Under Review":"Live",r=t.status==="pending"?"badge badge-pending":"badge badge-approved",i=t.type.charAt(0).toUpperCase()+t.type.slice(1),s=t.price>0?`Rs ${t.price.toLocaleString()} ${t.priceLabel}`:"Price pending",a=t.rating>0?t.rating.toFixed(1):"New";return`
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
  `}function lu(t){const e=N.get(su),r=N.get(au),i=Array.isArray(e)?e.filter(a=>(a==null?void 0:a.host_id)===t.id):[],s=Array.isArray(r)?r.filter(a=>(a==null?void 0:a.host_id)===t.id):[];return[...i.map(a=>ht(a,"guide")),...s.map(a=>ht(a,"transport"))]}function Tr(t,e,r=""){const i=document.getElementById("stat-listings"),s=document.getElementById("stat-earnings");if(i&&(i.textContent=e.length.toString()),s&&(s.textContent="Rs 0"),!e.length){t.innerHTML=`
      <div style="text-align:center;padding:60px;color:var(--text-muted)">
        <div style="font-size:4rem;margin-bottom:16px">🏠</div>
        <h3 style="margin-bottom:12px">No listings yet</h3>
        <p style="margin-bottom:24px">Your stay, guide, or transport listing will appear here once it is saved.</p>
        ${r?`<div style="font-size:0.82rem;color:var(--text-dim)">${r}</div>`:""}
      </div>
    `;return}t.innerHTML=`
    ${r?`<div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:14px">${r}</div>`:""}
    ${e.map(ou).join("")}
  `}function cu(){const t=M,e=se();if(!e)return`<div class="page-hero container"><h1>Please <a href="${t("/login")}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;const r=e.full_name||e.name||e.email||"Host",i=r.charAt(0).toUpperCase();return`
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
  `}async function du(){const t=document.querySelectorAll(".tab-btn[data-tab]");t.forEach(s=>{s.addEventListener("click",()=>{var a;t.forEach(n=>n.classList.remove("active")),s.classList.add("active"),document.querySelectorAll('[id^="tab-"]').forEach(n=>n.classList.add("hidden")),(a=document.getElementById(`tab-${s.dataset.tab}`))==null||a.classList.remove("hidden")})});const e=se(),r=document.getElementById("tab-listings");if(!r||!(e!=null&&e.id))return;const i=lu(e);i.length&&Tr(r,i,"Showing your recent submissions while live listings load.");try{const{stays:s,guides:a,transport:n}=await nu(qs(e.id),iu,"Loading your listings timed out."),o=[...s.map(l=>ht(l,"stay")),...a.map(l=>ht(l,"guide")),...n.map(l=>ht(l,"transport"))];Tr(r,o)}catch(s){if(console.error("Host dashboard error:",s),i.length){Tr(r,i,"Live listings are taking longer than expected, so recent saved submissions are shown for now.");return}r.innerHTML=`
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        <div style="font-size:1rem;margin-bottom:8px">Could not load listings.</div>
        <div style="font-size:0.85rem">${s.message||"Please refresh and try again."}</div>
      </div>
    `}}function uu(){const t=M;return`
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
  `}function hu(){}function pu(){const t=M;return`
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
  `}function mu(){}function gu(){const t=M;return`
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
  `}function fu(){}function vu(){return`
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
          ${[{q:"How do I book a stay on LushaiTrips?",a:"Browse stays on our platform, click the listing you like, choose your dates and number of guests, and complete the booking form. You'll receive a confirmation email and the host's contact details."},{q:"Can I cancel my booking?",a:"Yes. Our standard cancellation policy allows free cancellation up to 72 hours before check-in. After that, a 50% cancellation charge applies. Each host may also have additional policies listed on their page."},{q:"I'm a host — how do I list my property?",a:'Click "Become a Host" in the navigation, choose your listing type (stay, guide, or transport), fill out the details, and our team will review and approve your listing within 2 business days.'},{q:"Is LushaiTrips safe for solo women travelers?",a:"Mizoram is one of the safest states in India for solo women travelers. All our hosts are verified, and we include safety tips and emergency contact information in every booking confirmation."},{q:"What payment methods do you accept?",a:"We accept all major UPI apps (PhonePe, GPay, Paytm), debit/credit cards, and net banking. International cards (Visa, Mastercard) are also accepted."},{q:"Do I need an Inner Line Permit?",a:"Yes — Indian citizens must obtain a free ILP before visiting Mizoram. You can apply at mizoram.gov.in or at Mizoram House offices in major cities. Foreign nationals need a Protected Area Permit from the MHA."}].map((t,e)=>`
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
  `}function yu(){var t;(t=document.getElementById("contact-form"))==null||t.addEventListener("submit",e=>{e.preventDefault();const r=document.getElementById("contact-submit");r.disabled=!0,r.textContent="⏳ Sending…",setTimeout(()=>{document.getElementById("contact-success").style.display="block",document.getElementById("contact-form").reset(),r.disabled=!1,r.textContent="📨 Send Message"},1200)}),document.querySelectorAll(".faq-toggle").forEach(e=>{e.addEventListener("click",()=>{const r=e.nextElementSibling,i=e.querySelector(".faq-arrow"),s=r.style.display==="block";document.querySelectorAll(".faq-body").forEach(a=>a.style.display="none"),document.querySelectorAll(".faq-arrow").forEach(a=>a.style.transform=""),s||(r.style.display="block",i.style.transform="rotate(180deg)")})}),document.querySelectorAll("#contact-form input, #contact-form textarea, #contact-form select").forEach(e=>{e.addEventListener("focus",()=>e.style.borderColor="var(--emerald-500)"),e.addEventListener("blur",()=>e.style.borderColor="var(--glass-border)")})}function bu(){const t=M;return`
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
              <strong style="color:var(--emerald-400)">TL;DR:</strong> We collect only what's needed to run the platform. We never sell your data. You can request deletion at any time. We use Supabase for authentication and secure, industry-grade platforms for all services.
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
                  <li>Process bookings and facilitate payments</li>
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
                  <li><strong style="color:var(--text)">Payment Processing:</strong> Your payment information is processed securely via our payment provider (PCI DSS compliant). We do not store your card details.</li>
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
                  <li>Payment data is handled exclusively by our secure payment provider — we store only transaction IDs, not card details</li>
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
                  ${[{name:"Supabase",purpose:"Authentication, database, and file storage",link:"https://supabase.com/privacy"},{name:"Google OAuth",purpose:"Social login via Google accounts",link:"https://policies.google.com/privacy"},{name:"Leaflet / OpenStreetMap",purpose:"Map rendering (no personal data shared)",link:"https://www.openstreetmap.org/privacy"}].map(r=>`
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
  `}function wu(){}const ss={"/":{render:Ql,init:ec,footer:!0},"/discover":{render:rc,init:ic,footer:!0},"/surprise":{render:dc,init:uc,footer:!0},"/stays":{render:gc,init:fc,footer:!0},"/guides":{render:Tc,init:Ac,footer:!0},"/transport":{render:Mc,init:Uc,footer:!0},"/booking-confirmed":{render:Gc,init:Wc,footer:!1},"/login":{render:Yc,init:Xc,footer:!1},"/signup-user":{render:Zc,init:Qc,footer:!1},"/host-signup-stay":{render:nd,init:cd,footer:!1},"/host-signup-guide":{render:Pd,init:Rd,footer:!1},"/host-signup-transport":{render:Qd,init:eu,footer:!1},"/profile":{render:tu,init:ru,footer:!0},"/host-dashboard":{render:cu,init:du,footer:!0},"/about":{render:uu,init:hu,footer:!0},"/travel-tips":{render:pu,init:mu,footer:!0},"/safety-guide":{render:gu,init:fu,footer:!0},"/contact":{render:vu,init:yu,footer:!0},"/privacy-policy":{render:bu,init:wu,footer:!0}};function xu(t){if(ss[t])return{route:ss[t],params:{}};if(t.startsWith("/destination/")){const e=t.slice(13);return{route:{render:()=>pc(e),init:()=>mc(e),footer:!0},params:{id:e}}}if(t.startsWith("/stay/")){const e=t.slice(6);return{route:{render:()=>yc(),init:()=>bc(e),footer:!0},params:{id:e}}}if(t.startsWith("/guide/")){const e=t.slice(7);return{route:{render:()=>Ic(e),init:()=>Pc(e),footer:!0},params:{id:e}}}if(t.startsWith("/transport/")){const e=t.slice(11);return{route:{render:()=>Dc(e),init:()=>Hc(e),footer:!0},params:{id:e}}}if(t.startsWith("/book/")){const e=t.slice(6);return{route:{render:()=>null,init:()=>null,footer:!1,booking:e},params:{id:e}}}return{route:{render:()=>`<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px"><div><div style="font-size:5rem;margin-bottom:16px">🗺️</div><h1 style="margin-bottom:12px">Page Not Found</h1><p style="margin-bottom:24px;color:var(--text-muted)">Looks like this trail doesn't exist.</p><a href="${M("/")}" class="btn btn-primary" data-link>Back to Home</a></div></div>`,init:()=>{},footer:!0},params:{}}}function ku(t){const e=t.trim(),r=e.indexOf("?"),i=r>=0?e.slice(0,r):e,s=r>=0?e.slice(r):"",a="/LushaiTrips/".replace(/\/$/,"");return!!a&&(i===a||i.startsWith(`${a}/`))?i+s:M(i)+s}async function ba(t){const e=ku(t),r=new URL(e,window.location.origin);history.pushState({},"",r.pathname+r.search+r.hash),await hi(pt(r.pathname),r.searchParams)}async function hi(t,e=new URLSearchParams){var s;const r=document.getElementById("page-content"),i=document.getElementById("footer-container");try{if(t.startsWith("/book/")){const n=t.slice(6);r.innerHTML=qc(n,e),i.innerHTML="",cr(),Ar(),Fc(n,e),gi();return}const{route:a}=xu(t);cr(),r.innerHTML=await a.render()||"",a.footer?Ta():i.innerHTML="",Ar(),await((s=a.init)==null?void 0:s.call(a)),gi()}catch(a){console.error("[Router] render error:",a),cr(),r.innerHTML=`
      <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px">
        <div>
          <div style="font-size:4rem;margin-bottom:16px">⚠️</div>
          <h2 style="margin-bottom:12px">Something went wrong</h2>
          <p style="color:var(--text-muted);margin-bottom:8px">We hit an unexpected error loading this page.</p>
          <p style="font-size:0.8rem;color:var(--text-muted);background:var(--glass);padding:8px 16px;border-radius:8px;margin-bottom:24px">${(a==null?void 0:a.message)||"Unknown error"}</p>
          <a href="${M("/")}" class="btn btn-primary" data-link>Back to Home</a>
        </div>
      </div>
    `,Ar()}}function Ar(){document.querySelectorAll("[data-link]").forEach(t=>{t.removeEventListener("click",as),t.addEventListener("click",as)})}function as(t){t.preventDefault();const e=t.currentTarget.getAttribute("href");e&&e!=="#"&&ba(e)}window.router={navigate:ba};window.addEventListener("popstate",()=>{hi(pt(location.pathname),new URLSearchParams(location.search))});hi(pt(location.pathname),new URLSearchParams(location.search));
