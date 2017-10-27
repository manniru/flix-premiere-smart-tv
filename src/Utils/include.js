var included_files=[];function includeOnce(script_filename){if(!inArray(script_filename,included_files)){included_files[included_files.length]=script_filename;includeDom(script_filename);}}
function inArray(needle,haystack){for(var i=0;i<haystack.length;i++){if(haystack[i]===needle){return true;}}
return false;}
function includeDom(script_filename,type){var html_doc=document.getElementsByTagName('head').item(0);var headElement;if(type==="javascript"){headElement=document.createElement('script');headElement.setAttribute('type','text/javascript');headElement.setAttribute('src',script_filename);}
if(type==="style"){headElement=document.createElement('link');headElement.setAttribute('rel','stylesheet');headElement.setAttribute('type','text/css');headElement.setAttribute('href',script_filename);}
html_doc.appendChild(headElement);return false;}
