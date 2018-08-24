import './siteFinder.scss';

chayns.ready.then(function() {
    myFavoriteSite.init();
  });
  
(function (myFavoriteSite, chayns, window, undefined) {

    'use strict';

    var $sitesAccordion = document.querySelector('#sitesAccordion');
    var $searchTerm = document.querySelector('#searchTerm');
    var timeout;
    var sitesLoadCount = 30;
    var displayedSitesCount = 0;
    
    myFavoriteSite.init = function init(data) {
        $searchTerm.addEventListener('keyup', function() {
            fetchSiteList('&Skip=0&Take=' + (sitesLoadCount + 1));
        });
        $searchTerm.addEventListener('keydown', function() {
            clearTimeout(timeout);
        });

        fetchSiteList('&Skip=0&Take=' + (sitesLoadCount + 1));
    };

    function getUrl(filter) {
        return new Promise(function(resolve, reject) {
            try {
                timeout = setTimeout(function() {
                var searchTerm = $searchTerm.value;
                var jsonUrl = ['https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=', filter];
                
                if ($searchTerm.value === '')
                    searchTerm = 'chayns';
        
                var fullUrl = jsonUrl[0] + searchTerm + jsonUrl[1];

                resolve(fullUrl);
            }, 200);
            }
            catch (ex) {
                reject();
            }
        });
    }

    function fetchSiteList(filter) {
        var $siteList = document.querySelector('#siteList');

        chayns.showWaitCursor()
        getUrl(filter)
        .then(function(dataUrl) {
            fetch(dataUrl)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                var $showMoreDiv = document.querySelector('#showMoreDiv');
                var $showMoreBtn = document.querySelector('#showMoreBtn');
                var length = json.Data.length;
                var allowShowMore = false;
                $showMoreDiv.style.display = 'none';
                
                if (filter === '&Skip=0&Take=' + (sitesLoadCount + 1)) {
                    $siteList.innerHTML = '';
                    
                    displayedSitesCount = 0;
                }

                if (length > sitesLoadCount) {
                    allowShowMore = true;
                    length = sitesLoadCount;
                }

                for (var i = 0; i < length; i++) {
                    
                    var title = json.Data[i].appstoreName;
                    var siteId = json.Data[i].siteId;
                    
                    var $listItem = document.createElement("div");
                    var $link = document.createElement("a");
                    var $listItemHead = document.createElement("div");
                    var $listItemImageDiv = document.createElement("div");
                    var $listItemBackupImageDiv = document.createElement("div");
                    var $listItemTitleDiv = document.createElement("div");
                    var $listItemTitle = document.createElement("p");
                    var $listItemDescription = document.createElement("p");

                    var url = 'https://chayns.net/' + siteId;
                    var imageSource = 'https://sub60.tobit.com/l/' + siteId;
                    var listItemTitle = document.createTextNode(title);
                    var listItemDescription = document.createTextNode(siteId);
                
                    $listItemImageDiv.style.background = 'url(' + imageSource + ')';
                    $listItemBackupImageDiv.style.background = 'url(images/default_image_small.png)';
                    $listItem.className = 'ListItem ListItem--clickable';
                    $link.href = url;
                    $link.target = '_blank';
                    $listItemHead.className = 'ListItem__head';
                    $listItemImageDiv.className = 'ListItem__Image';
                    $listItemImageDiv.style.backgroundSize = '40px';
                    $listItemBackupImageDiv.className = 'ListItem__Image';
                    $listItemBackupImageDiv.style.backgroundSize = '40px';
                    $listItemTitleDiv.className = 'ListItem__Title';
                    $listItemTitle.className = 'ListItem__Title--headline';
                    $listItemDescription.className = 'ListItem__Title--description';

                    $listItemTitle.appendChild(listItemTitle);
                    $listItemDescription.appendChild(listItemDescription);

                    $siteList.appendChild($listItem);
                    $listItem.appendChild($link);
                    $link.appendChild($listItemHead);
                    $listItemHead.appendChild($listItemBackupImageDiv);
                    $listItemBackupImageDiv.appendChild($listItemImageDiv);
                    $listItemHead.appendChild($listItemTitleDiv);
                    $listItemTitleDiv.appendChild($listItemTitle);
                    $listItemTitleDiv.appendChild($listItemDescription);

                    
                }
                displayedSitesCount += length;
                console.log(displayedSitesCount);
                try {
                    $siteList.removeChild(document.querySelector('#showMoreDiv'));
                }
                catch (ex){}
                
                if (allowShowMore === true) {
                    
                    $showMoreDiv.style.display = 'block';
                    
                    $showMoreBtn.addEventListener('click', function() {
                        fetchSiteList('&Skip=' + displayedSitesCount + '&Take=' + (sitesLoadCount + 1));
                    });
                }

                chayns.hideWaitCursor()
            }).catch(function(ex) {
                console.log('parsing failed', ex);
                $siteList.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
                chayns.hideWaitCursor();
                document.querySelector('#showMoreBtn').style.display = 'none';
            })
        });
    }
   
  })((window.myFavoriteSite = {}), chayns, window);