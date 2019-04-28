chrome.storage.sync.get(['google', 'disable', 'party', 'subdomain'], function(data) {
	document.getElementById('enableGoogle').checked = data.google;
	document.getElementById('disable').checked = data.disable;
	document.getElementById('party').checked = data.party;
	document.getElementById('subdomain').checked = data.subdomain;
});

  document.getElementById('enableGoogle').onclick = googleEvent;
  document.getElementById('disable').onclick = disableEvent;
  document.getElementById('party').onclick = partyTime;
  document.getElementById('subdomain').onclick = subdomainEvent;
  document.getElementById('confirm').onclick = confirmEvent;
  document.getElementById('options').onclick = optionEvent;
  
function googleEvent(element) {
	if(document.getElementById('enableGoogle').checked){
		chrome.storage.sync.set({google: true}, function() {});
	}
	else{
		chrome.storage.sync.set({google: false}, function() {});
	}
};

function disableEvent(element) {
	if(document.getElementById('disable').checked){
		chrome.storage.sync.set({disable: true}, function() {});
	}
	else{
		chrome.storage.sync.set({disable: false}, function() {});
	}
}

function partyTime(element){
	if(document.getElementById('party').checked){
		chrome.storage.sync.set({party: true}, function() {});
	}
	else{
		chrome.storage.sync.set({party: false}, function() {});
	}
}

function subdomainEvent(element){
	if(document.getElementById('subdomain').checked){
		chrome.storage.sync.set({subdomain: true}, function() {});
	}
	else{
		chrome.storage.sync.set({subdomain: false}, function() {});
	}
}

function confirmEvent(element){
	chrome.storage.sync.get('whitelist', function(data) {
		var tempList = data.whitelist;
		var site = document.getElementById('whitelistName').value;
		site = site.replace(/\s/g, '');
		if(site == "")
			return;
		tempList.push(site);
		chrome.storage.sync.set({whitelist: tempList}, function() {});
		document.getElementById('whitelistName').value = "";
	});
};
  
function optionEvent(element){
	chrome.tabs.create({'url': "/options.html" } );
};
