fetch('videos.json')
.then(response => response.json())
.then(data => {
    const videosContainer = document.getElementById('videos-container');
    const videoDivs = []; 
    
        data.forEach((video, index) => {
            const videoElement = document.createElement('iframe');
            videoElement.classList.add('VideoFrame');
            videoElement.src = video.PreviewVideo;
            videoElement.setAttribute("allowfullscreen", "");
            
            const videoTitle = document.createElement('h3');
            videoTitle.classList.add("title");
            videoTitle.textContent = video.StoryTitle;
            
            const description = document.createElement('div');
            description.classList.add('video-description-box');

            const des_p = document.createElement('h4');
            des_p.style.textAlign = "left";
            des_p.style.marginLeft = "10px";
            des_p.textContent = "Description";

            const video_description = document.createElement('div');
            video_description.classList.add("video-description");

            const des_span = document.createElement('span');
            des_span.classList.add("description_text");

            const downloadButton = document.createElement('div');
            downloadButton.classList.add("div-download");
            
            const abutton = document.createElement('a');
            abutton.classList.add("download-button");
            abutton.href = video.DownloadManuallyDrive;
            
            const darkenCheckbox = document.createElement('input');
            darkenCheckbox.type = "checkbox";
            darkenCheckbox.classList.add('ui-checkbox');
            darkenCheckbox.id = `checkbox-${index}`;

            const date = document.createElement("h5");
            date.textContent = video.UploadDate;
            date.classList.add("description-text");
            date.style.textAlign = "right";
            date.style.marginRight = "15px";
            date.style.padding = 0;
            
            
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video-card');
            videoDiv.appendChild(darkenCheckbox);
            videoDiv.appendChild(videoTitle);
            videoDiv.appendChild(videoElement);
            videoDiv.appendChild(description);
            
            description.appendChild(des_p);
            description.appendChild(video_description);
            
            video_description.appendChild(des_span);
            
            const description_text = video.Description + "\n.\n.\n.\nFOLLOW TO SEE POSITIVE UP: @happynewsup\nFOLLOW TO SEE POSITIVE UP: @happynewsup\n.\n.\n.\n#happynewsup #positivevibes #happynews #happy #heartwarming #news #goodvibes #goodnews #kindness #randomacts #wholesome #vibes #cute #people #happy #good #help";
            const lines = description_text.split("\n");
            lines.forEach(line => {
                const paragraph = document.createElement("p");
                paragraph.classList.add("description-text");
                paragraph.textContent = line;
                paragraph.style.textAlign = "left";
                des_span.appendChild(paragraph);
            });
            
            description.appendChild(date);
            videoDiv.appendChild(downloadButton);
            downloadButton.appendChild(abutton);
            
            darkenCheckbox.addEventListener('change', function () {
                if (darkenCheckbox.checked) {
                    videoDiv.classList.add("dark");
                    document.getElementById('videocounter').textContent -= 1;
                    setTimeout(() => {
                        videosContainer.appendChild(videoDiv);
                        videoDivs.push(videoDiv);
                    }, 300);
                } else {
                    videoDiv.classList.remove("dark");
                    document.getElementById('videocounter').textContent = Number(document.getElementById('videocounter').textContent) + 1;
                    videoDivs.splice(videoDivs.indexOf(videoDiv), 1);
                }
                localStorage.setItem('videoDivOrder', JSON.stringify(videoDivs.map(v => v.id)));
                localStorage.setItem(`checkboxState-${index}`, darkenCheckbox.checked);
            });
            
            
            const isChecked = localStorage.getItem(`checkboxState-${index}`) === "true";
            darkenCheckbox.checked = isChecked;
            if (isChecked) {
                videoDiv.classList.add("dark");
            }
            videosContainer.appendChild(videoDiv);
            videoDivs.push(videoDiv);
        });
    
        document.getElementById('videocounter').textContent = document.getElementsByClassName('video-card').length -  document.getElementsByClassName('video-card dark').length;
        return new Promise((resolve) => {
            setTimeout(() => {
                videoDivs.sort((a, b) => {
                    return a.classList.contains('dark') ? 1 : -1;
                });
                videoDivs.forEach(div => videosContainer.appendChild(div));
                resolve();
            }, 0);
        })
    })
    .catch(error => console.error('Error loading videos:', error));
