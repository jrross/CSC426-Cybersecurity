var links = document.getElementsByTagName("a");
var site = getDomain(window.location.href);

chrome.storage.sync.get(['google','disable','party', 'subdomain', 'whitelist'], function(data) {

	var tempList = data.whitelist;
	var showGoogle = data.google;
	var partyTime = data.party;
	var disabled = data.disable;
	var markSub = data.subdomain;
	
	if(disabled){
		return;
	}
	
	if(site == "google.com" && !showGoogle){
		return;
	}
	
	if(!markSub){
		site = removeSubdomain(site);
	}
	
	for (var i = 0, l = links.length; i < l; i++)
	{
		var skip = false;
		var link = getDomain(links[i].href);
		if(!markSub){
			link = removeSubdomain(link);
		}
		for(j in tempList)
		{
			if(link == tempList[j]){
				skip = true;
				break;
			}
		}
		if(site != link && !skip){
			if(validURL(links[i].href)){
				if(partyTime){
					links[i].classList.add("partytime");
                }
				else{
					links[i].style.backgroundColor = "red";
					}
			}
		}
	}
});

//gets the base domain of a url i.e. google.com
function getDomain(url){
	var urlParts = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/);
	var domain = urlParts[0];
	return domain;
}

//determines if a string is a valid url format
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function removeSubdomain(url){
	var split = url.split('.');
	var len = split.length;
	return split[len-2] + '.' + split[len-1];
}
