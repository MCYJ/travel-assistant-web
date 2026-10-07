import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales } from '../locales.mjs';
const root=fileURLToPath(new URL('../docs/',import.meta.url));
const leaves=value=>typeof value==='string'?[value]:Object.values(value).flatMap(leaves);
test('all 12 locales contain complete overview, referral and privacy copy',()=>{
 assert.equal(Object.keys(locales).length,12);
 const schema=Object.keys(locales.en).sort();
 for(const [lang,t] of Object.entries(locales)){
  assert.deepEqual(Object.keys(t).sort(),schema,lang);
  assert.equal(t.steps.length,3);assert.equal(t.principles.length,4);assert.equal(t.privacySections.length,4);assert.equal(t.categories.length,6);
  for(const text of leaves(t)) assert.ok(text.trim().length>0,lang);
  if(lang!=='en') assert.notEqual(t.readyBody,locales.en.readyBody);
 }
});
test('every generated local link and asset exists, including project base paths',async()=>{
 const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(f=>f.isDirectory()?walk(resolve(dir,f.name)):resolve(dir,f.name)))).flat();
 for(const file of (await walk(root)).filter(f=>f.endsWith('.html'))){
  const html=await readFile(file,'utf8');
  for(const [,raw] of html.matchAll(/(?:href|src|data-url)="([^"]+)"/g)){
   if(/^(https?:|mailto:|#)/.test(raw)) continue;
   const clean=raw.split('#')[0];const target=resolve(dirname(file),clean);
   assert.ok(target.startsWith(root.replace(/\/$/,'')),file+' '+raw);
   const result=await stat(target).catch(()=>null);assert.ok(result,file+' → '+raw);
   if(result.isDirectory()) assert.ok(await stat(resolve(target,'index.html')));
  }
 }
});
test('HTML carries static localization, partner identity, privacy and correct RTL',async()=>{
 for(const lang of Object.keys(locales))for(const page of ['index.html','privacy.html']){
  const html=await readFile(resolve(root,lang,page),'utf8');
  assert.ok(html.includes(`<html lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}">`));
  assert.ok(html.includes('june1012june@gmail.com'));assert.ok(html.includes('662-28-01965'));
  assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,13);
  assert.ok(html.includes('id="main"'));assert.ok(html.includes('rel="canonical"'));
  assert.ok(!/<iframe|<form|googletag|google-analytics|chromewebstore\.google\.com/.test(html));
  if(page==='index.html')assert.ok(html.includes(locales[lang].readyBody.replaceAll('&','&amp;')));
 }
});
test('sitemap lists all canonical localized routes',async()=>{
 const xml=await readFile(resolve(root,'sitemap.xml'),'utf8');assert.equal((xml.match(/<loc>/g)||[]).length,24);
 assert.ok(await stat(resolve(root,'.nojekyll')));
});
