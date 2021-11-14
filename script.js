songs = ["Eastside", "Better Now", "hot girl bummer", "if I were u", "LETS GO", "Ransom", "Graduation", "Money Made Me Do It", "Your New Boyfriend", "Candy Paint"];
slider = document.getElementById("musicslider");
title = document.getElementById("title");
volume = document.getElementById("volumeslider");
selector = document.getElementById("selectorpanel");
queue = 0;
howls = [];

for (i=0;i<songs.length;i++) {
  player = new Howl({
    src: ['tracks/'+songs[i]+".mp3"],
    volume: 1,
    autoplay: false,
    preload: false,
    onend: function() {
      if (queue < howls.length-1) {
        queue++;
      } else {
        queue = 0;
      }
      howls[queue].load();
    },
    onload: function() {
      howls[queue].play();
      slider.max = howls[queue]._duration;
      title.innerHTML = songs[queue];
    }
  });
  howls.push(player);
  selector.innerHTML+="<span onclick='selectsong()' class='songselector'>"+songs[i]+"</span><br>";
}
howls[0].load();

function updateTime() {
  howls[queue].seek(slider.value);
}

setInterval(function() {
  slider.value = howls[queue].seek();
}, 1000);

function skip(id) {
  howls[queue].unload();
  if (id == "backward") {
    if (queue > 0) {
      queue--;
    } else {
      queue = howls.length-1;
    }
  } else {
    if (queue < howls.length-1) {
      queue++;
    } else {
      queue = 0;
    }
  }
  howls[queue].load();
}

function checkkey(event) {
  if (event.keyCode == "32") {
    howls[queue].playing() ? howls[queue].pause() : howls[queue].play();
  }
  if (event.keyCode == "39") {
    skip("forward");
  }
  if (event.keyCode == "37") {
    skip("backward");
  }
}

function updateVolume() {
  Howler.volume(volume.value/100);
}

function togglevolumedisplay() {
  if (volume.style.display == "none") {
    volume.style.display = "block";
    document.getElementById("volumeicon").style.opacity = 1;
  } else {
    volume.style.display = "none";
    document.getElementById("volumeicon").style.opacity = 0.5;
  }
}

function revealselector() {
  if (selector.offsetLeft != 0) {
    document.getElementById("selectortoggle").innerHTML = "&lt";
    $("#selectorpanel").animate({
      left: 0+"vw" 
    }, 1000);
  } else {
    document.getElementById("selectortoggle").innerHTML = "&gt";
    $("#selectorpanel").animate({
      left: -50+"vw" 
    }, 1000);
  }
}

function selectsong() {
  var x = document.querySelectorAll(".songselector");
  for (i=0;i<x.length;i++) {
    if (event.target == x[i]) {
      howls[queue].unload();
      queue = i;
      howls[queue].load();
    }
  }
}
