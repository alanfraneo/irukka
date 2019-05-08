let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    console.log('data.color: '+ data.color);
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    var resultDiv = document.getElementById('PostList');
    resultDiv.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pitstop.manageengine.com/portal/api/communityTopics?portalId=b87ca73bf299ade4c685d36796bf6574047c91cff3f9636f&from=1&limit=50&categoryId=49000000043983", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            var topics = resp.data;
            var count = 0;
            console.log(topics.length);
            for (var i=0; i<topics.length; i++){
                var topic = topics[i];
                var subject = topic.subject;
                var content = topic.content;
                var total = String(subject) + String(content); 
                console.log(subject);
                if(total.toLowerCase().indexOf("report") != -1 || total.toLowerCase().indexOf("query") != -1){
                    console.log('yes');
                    var postURL = 'https://pitstop.manageengine.com/portal/community/topic/'+topic.permalink;
                    var listItemHTML = `<div class='post'>
                                            <a class='subject' target="_blank" href='`+postURL+`'>`+subject+`</a>
                                            <div class='content'>`+content+`</div>
                                            <div class='user'>-`+topic.creator.name+`</div>
                                        </div>`;
                    resultDiv.innerHTML += listItemHTML;
                    count += 1;
                }
            }
            if(count == 0){
                resultDiv.innerHTML = 'No reference to queries or reports';
            }
        }
    }
    xhr.send();
};