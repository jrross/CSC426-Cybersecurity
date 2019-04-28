chrome.storage.sync.get('whitelist', function(data) {
	var tempList = data.whitelist;
	var listString = "";
	
	if(tempList.length == 0){
		document.getElementById('whitelist').innerHTML = "None yet";
		return;
	}
	
	for(i = 0; i < tempList.length; i++){
		listString += tempList[i] + "<br>";
	}
	document.getElementById('whitelist').innerHTML = listString;
});

  document.getElementById('remove').onclick = deleteEvent;
  document.getElementById('add').onclick = addEvent;
  
  function deleteEvent(element){
	var rmv = document.getElementById('site').value;
	chrome.storage.sync.get('whitelist', function(data) {
		var tempList = data.whitelist;
		for(i = 0; i < tempList.length; i++){
			if(tempList[i] == rmv){
				tempList.splice(i, 1);
				break;
			}
		}
		chrome.storage.sync.set({whitelist: tempList}, function() {});
		location.reload();
	});
  }
  
  function addEvent(element){
	chrome.storage.sync.get('whitelist', function(data) {
		var tempList = data.whitelist;
		var site = document.getElementById('site').value;
		site = site.replace(/\s/g, '');
		if(site == "")
			return;
		tempList.push(site);
		chrome.storage.sync.set({whitelist: tempList}, function() {});
		location.reload();
	});
  }