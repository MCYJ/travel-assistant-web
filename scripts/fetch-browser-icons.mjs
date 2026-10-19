import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const sources={
chrome:['https://www.google.com/chrome/static/images/favicons/android-icon-192x192.png','https://www.google.com/chrome/'],
edge:['https://edgecdn-embza6g8cacagcbn.z01.azurefd.net/welcome/static/favicon.png','https://www.microsoft.com/edge/'],
opera:['https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/favicon/opera/apple-touch-icon-180x180.00d9278d6de6.png','https://www.opera.com/'],
whale:['https://shared-whale.pstatic.net/favicon/icon180.png','https://whale.naver.com/'],
firefox:['https://www.firefox.com/media/img/favicons/firefox/browser/apple-touch-icon.79c2abeb4e35.png','https://www.firefox.com/'],
brave:['https://brave.com/static-assets/images/cropped-brave_appicon_release-180x180.png','https://brave.com/'],
safari:['https://developer.apple.com/assets/elements/icons/safari/safari-96x96_2x.png','https://developer.apple.com/safari/']};
await fs.mkdir('assets/browser-icons',{recursive:true});
const manifest=[];for(const[browser,[url,page]]of Object.entries(sources)){const r=await fetch(url);if(!r.ok)throw Error(browser+' HTTP '+r.status);const bytes=Buffer.from(await r.arrayBuffer());await fs.writeFile(`assets/browser-icons/${browser}.png`,bytes);manifest.push({browser,url,officialPage:page,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),use:'Unmodified product identification; no endorsement implied'});console.log(browser+' saved');}
await fs.writeFile('assets/browser-icons/sources.json',JSON.stringify(manifest,null,2)+'\n');
