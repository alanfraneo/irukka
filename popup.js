let findPostsBtn = document.getElementById('findPosts');


findPostsBtn.onclick = function(element) {
    let color = element.target.value;
    var resultDiv = document.getElementById('PostList');
    resultDiv.innerHTML = "";
    var xhr = new XMLHttpRequest();
    let loader = document.getElementById("loader");
    loader.style.display = 'block';
    xhr.open("GET", "https://pitstop.manageengine.com/portal/api/communityTopics?portalId=b87ca73bf299ade4c685d36796bf6574047c91cff3f9636f&from=1&limit=50&categoryId=49000000043983", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            loader.style.display = 'none';
            var topics = resp.data;
            var count = 0;
            for (var i=0; i<topics.length; i++){
                var topic = topics[i];
                var subject = topic.subject;
                var content = topic.content;
                var total = String(subject) + String(content); 
                if(total.toLowerCase().indexOf("report") != -1 || total.toLowerCase().indexOf("query") != -1){
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