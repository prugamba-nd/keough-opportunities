(() => {
 'use strict';
 const {items,filters} = window.OPPORTUNITIES;
 const $ = id => document.getElementById(id);
 const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const names = (item,key) => item[key].map(id => filters[key][id] || id).join(', ');
 const today = new Date();
 const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
 const daysLeft = item => item.date ? Math.round((Date.parse(item.date+'T00:00:00Z')-todayUTC)/86400000) : null;
 const group = item => item.date ? (daysLeft(item) < 0 ? 'past' : 'dated') : item.kind;
 const logos = {
  "ansari-institute-for-global-engagement-with-religion": "assets/ansari-logo.svg",
  "building-inclusive-growth-big-lab": "assets/big-lab.jpeg",
  "kellogg-institute": "assets/light/kellogg.svg",
  "keough-naughton-institute-for-irish-studies": "assets/light/irish-studies.svg",
  "keough-school-of-global-affairs": "assets/Logo_of_the_Keough_School_of_Global_Affairs.png",
  "klau-institute-for-civil-and-human-rights": "assets/light/logo-klau.svg",
  "kroc-institute-for-international-peace-studies": "assets/light/logo-kroc-wg.svg",
  "liu-institute-for-asia-and-asian-studies": "assets/light/asia-logo.svg",
  "mckenna-center-for-human-development-and-global-business": "assets/light/logo-mckenna.svg",
  "nanovic-institute-for-european-studies": "assets/light/logo-nanovic.svg",
  "pulte-institute-for-global-development": "assets/light/logo-pulte.svg"
};
 // Saved random logo assignments for this visual prototype; source sponsor filters remain intact.
 const previewLogos = {
  "https://keough.nd.edu/opportunities/2026-liu-institute-for-asia-and-asian-studies-asia-faculty-conference-presentation-grant/": "mckenna-center-for-human-development-and-global-business",
  "https://keough.nd.edu/opportunities/2026-liu-institute-for-asia-and-asian-studies-asia-faculty-events-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-liu-institute-for-asia-and-asian-studies-asia-graduate-research-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-liu-institute-for-asia-and-asian-studies-asia-undergraduate-engagement-grant/": "liu-institute-for-asia-and-asian-studies",
  "https://keough.nd.edu/opportunities/2026-liu-institute-for-asia-and-asian-studies-asia-undergraduate-research-grant/": "kroc-institute-for-international-peace-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-faculty-conference-travel-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-faculty-research-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-graduate-conference-travel-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-graduate-research-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-undergraduate-conference-travel-grant/": "liu-institute-for-asia-and-asian-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-civil-and-human-rights-undergraduate-research-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-collaborative-multi-year-initiative-grant/": "pulte-institute-for-global-development",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-dissertation-year-fellowship/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-euro-fellows-professional-development-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-beyond-the-classroom-grant/": "liu-institute-for-asia-and-asian-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-conference-and-workshop-support-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-course-development-and-teaching-grant/": "building-inclusive-growth-big-lab",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-faculty-led-student-trip-grant/": "building-inclusive-growth-big-lab",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-faculty-publication-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-faculty-research-scholarship-and-creative-work-grant/": "building-inclusive-growth-big-lab",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-graduate-club-support-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-graduate-fellows-professional-development-grant/": "kroc-institute-for-international-peace-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-graduate-independent-research-grant/": "building-inclusive-growth-big-lab",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-research-cluster-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-speaker-support-grant/": "pulte-institute-for-global-development",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-undergraduate-club-support-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-undergraduate-independent-research-grant/": "building-inclusive-growth-big-lab",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-european-studies-undergraduate-internship-and-service-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-conference-and-workshop-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-conference-travel-grant/": "kroc-institute-for-international-peace-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-distinguished-scholar-visit-grant/": "kroc-institute-for-international-peace-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-publication-grant/": "nanovic-institute-for-european-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-research-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-faculty-working-group-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-graduate-conference-travel-grant/": "pulte-institute-for-global-development",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-graduate-research-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-graduate-student-professionalization-grant/": "mckenna-center-for-human-development-and-global-business",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-legacy-project-external-grant/": "pulte-institute-for-global-development",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-legacy-project-internal-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-keough-school-of-global-affairs-mga-professional-development-grant/": "klau-institute-for-civil-and-human-rights",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-nd-ucu-collaborative-online-international-learning-grant/": "keough-naughton-institute-for-irish-studies",
  "https://keough.nd.edu/opportunities/2026-keough-school-of-global-affairs-open-access-funding/": "kroc-institute-for-international-peace-studies",
  "https://keough.nd.edu/opportunities/2026-klau-institute-for-civil-and-human-rights-pasquale-migration-and-human-trafficking-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-keough-school-of-global-affairs-pedagogical-innovation-impetus-grant/": "keough-school-of-global-affairs",
  "https://keough.nd.edu/opportunities/2026-keough-school-of-global-affairs-pedagogical-innovation-spark-grant/": "klau-institute-for-civil-and-human-rights",
  "https://keough.nd.edu/opportunities/2026-ansari-institute-for-global-engagement-with-religion-religion-and-global-affairs-internship-grant/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-request-for-researcher-support/": "ansari-institute-for-global-engagement-with-religion",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-research-collaborator-visit-grant/": "mckenna-center-for-human-development-and-global-business",
  "https://keough.nd.edu/opportunities/2026-ansari-institute-for-global-engagement-with-religion-student-research-and-activities-grant/": "keough-school-of-global-affairs",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-study-abroad-sustainability-research-fellows-program/": "mckenna-center-for-human-development-and-global-business",
  "https://keough.nd.edu/opportunities/2026-nanovic-institute-for-european-studies-ukrainian-studies-hub-research-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-kellogg-institute-undergraduate-research-grant/": "kellogg-institute",
  "https://keough.nd.edu/opportunities/2026-pulte-institute-for-global-development-what-works-research-grant/": "kellogg-institute"
};
 const shortNames = {
  'ansari-institute-for-global-engagement-with-religion':['Ansari Institute','For Global Engagement with Religion'],
  'building-inclusive-growth-big-lab':['BIG Lab','Building Inclusive Growth'],
  'kellogg-institute':['Kellogg Institute','For International Studies'],
  'keough-naughton-institute-for-irish-studies':['Keough-Naughton Institute','For Irish Studies'],
  'keough-school-of-global-affairs':['Keough School','Of Global Affairs'],
  'klau-institute-for-civil-and-human-rights':['Klau Institute','For Civil & Human Rights'],
  'kroc-institute-for-international-peace-studies':['Kroc Institute','For International Peace Studies'],
  'liu-institute-for-asia-and-asian-studies':['Liu Institute','For Asia and Asian Studies'],
  'mckenna-center-for-human-development-and-global-business':['McKenna Center','For Human Development and Global Business'],
  'nanovic-institute-for-european-studies':['Nanovic Institute','For European Studies'],
  'pulte-institute-for-global-development':['Pulte Institute','For Global Development']
 };
 Object.entries(filters).forEach(([key,values]) => Object.entries(values).forEach(([value,label]) => {
  const option=document.createElement('option'); option.value=value; option.textContent=label; $(key).append(option);
 }));
 function sponsor(id) {
  const [name,sub]=shortNames[id] || [filters.unit[id],''];
  const fallback=`<span class="sponsor-name"${logos[id]?' hidden':''}>${escape(name)}<small>${escape(sub)}</small></span>`;
  return `<div class="publication-logo">${logos[id]?`<img class="sponsor-image" width="180" height="60" src="${escape(logos[id])}" alt="${escape(filters.unit[id])}" loading="lazy">`:''}${fallback}</div>`;
 }
 function card(item) {
  const closed=item.date && daysLeft(item)<0;
  const status=closed?'Closed':'Open';
  const statusClass=closed?'closed':'open';
  const deadline=item.date ? new Date(item.date+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : item.kind==='rolling'?'Rolling Deadline':item.deadline;
  const timing=item.date?`Apply by <strong><time datetime="${item.date}">${escape(deadline)}</time></strong>`:escape(deadline);
  return `<li class="card-container"><article class="card card--media-mention card--opportunity"><div class="card-body"><div class="opportunity-sponsors">${sponsor(previewLogos[item.url] || item.unit[0])}</div><div class="card-content"><h3 class="card-title entry-title"><a class="card-link" href="${escape(item.url)}">${escape(item.title)}</a></h3><div class="card-summary"><p class="opportunity-deadline"><strong class="opportunity-status opportunity-status--${statusClass}">${status}</strong> <span aria-hidden="true">·</span> ${timing}</p><p>${escape(item.summary)}</p></div></div></div><div class="card-meta"><ul class="opportunity-meta list--inline"><li><strong>Open to:</strong> ${escape(names(item,'audience'))}</li>${item.funding?`<li><strong>Funding:</strong> ${escape(item.funding)}</li>`:''}</ul></div></article></li>`;
 }
 function render() {
  const query=$('query').value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered=items.filter(item => {
   const haystack=[item.title,item.summary,item.funding,names(item,'unit'),names(item,'audience'),names(item,'type')].join(' ').toLocaleLowerCase();
   return query.every(word=>haystack.includes(word)) && ['audience','type','unit'].every(key=>!$(key).value||item[key].includes($(key).value));
  });
  const result=filtered;
  const rank={dated:0,rolling:1,check:2,past:3};
  result.sort((a,b)=> {
   if($('sort').value==='title')return a.title.localeCompare(b.title);
   if($('sort').value==='unit')return names(a,'unit').localeCompare(names(b,'unit'))||a.title.localeCompare(b.title);
   return rank[group(a)]-rank[group(b)] || (a.date&&b.date ? a.date.localeCompare(b.date) : 0) || a.title.localeCompare(b.title);
  });
  $('count').innerHTML=`Showing <strong>${result.length}</strong> ${result.length===1?'opportunity':'opportunities'}`;
  $('results').innerHTML=`<ul class="list--media-mentions no-bullets opportunity-list">${result.map(card).join('')}</ul>`;
  $('results').querySelectorAll('.sponsor-image').forEach(img=>{img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.hidden=false;});});
  $('empty').hidden=result.length!==0;
 }
 function reset(){$('sort').value='deadline';setTimeout(render,0);}
 $('filters').addEventListener('input',render);
 $('filters').addEventListener('submit',event=>{event.preventDefault();render();});
 $('filters').addEventListener('reset',reset);
 $('sort').addEventListener('change',render);
 $('empty-reset').addEventListener('click',()=>{$('filters').reset();$('query').focus();});
 render();
})();
