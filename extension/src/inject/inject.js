chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

  		// ----------------------------------------------------------
  		// This part of the script triggers when page is done loading
  		// Check if an element with class name "messages-container scroll-y" exists
setTimeout(() => {
        function reloadPage() {
          location.reload();
        }
  
        setTimeout(reloadPage, 1200000);

        var elements = document.getElementsByClassName("messages-container scroll-y");
  
        if (elements.length > 0) {
          function main(){
            var buttons = document.querySelectorAll('.btn.btn-warning.btn-claim');
            if (buttons.length >= 3) {
              buttons[2].click();
            }
        }
        
        function main1(){
            var elements = document.querySelectorAll('.rain-wrapper');
            elements.forEach(function(element) {
        
                if (element.innerHTML.includes('Free bets for everyone!')) {
                    element.remove();
                }
            });
        }
        
        setInterval(main, 0);
        setInterval(main1, 1000);
        
        } 
}, 10000);
  		// ----------------------------------------------------------

      var checkChange = function(){
        var flag = false;
        var names = document.querySelectorAll('.item-name-container');
        var forEach = Array.prototype.forEach;
        forEach.call(names, function(nameItem){
          if(nameItem.getAttribute('name') === 'test') {
            flag = true;
          }
        });
        window.parent.postMessage(flag + '', '*');
        console.log('flag: ', flag);
      };



      // select the target node
      var target = document.querySelector('body');

      // create an observer instance
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // console.log(mutation.type);
          checkChange();
        });
      });

      // configuration of the observer:
      var config = { attributes: true, childList: true, characterData: true };

      // pass in the target node, as well as the observer options
      observer.observe(target, config);

      // later, you can stop observing
      // observer.disconnect();

  	}
	}, 10);
});
