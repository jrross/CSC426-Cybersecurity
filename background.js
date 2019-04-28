chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({google: false}, function() {});
	chrome.storage.sync.set({disable: false}, function() {});
	chrome.storage.sync.set({party: false}, function() {});
	chrome.storage.sync.set({subdomain: true}, function() {});
	chrome.storage.sync.set({whitelist: []}, function() {});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {},
			})
			],
					actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
