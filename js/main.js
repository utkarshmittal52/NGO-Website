

$(document).ready(function() {

  
  var navbar = document.querySelector('#mainlanding-nav-bar')
  if(navbar){
    window.onscroll = function() {manageNavBar()}
    var sticky = navbar.offsetTop;
  
    function manageNavBar() {
      if ((window.pageYOffset + 90) > sticky) {
        navbar.classList.add("mainlanding-nav-stick");
      } else {
        navbar.classList.remove("mainlanding-nav-stick");
      }
    }  
  }
  if (document.getElementById("locationMap")) {
    var myLatLng = {
      lng: $("#locationMap").data("longitude"),
      lat: $("#locationMap").data("latitude")
    };
    var single_map = new google.maps.Map(
      document.getElementById("locationMap"),
      {
        zoom: 13,
        center: myLatLng,
        // scrollwheel: false,
        // zoomControl: false,
        // mapTypeControl: false,
        // scaleControl: false,
        // panControl: false,
        // navigationControl: false,
        // streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#747474" }, { lightness: "23" }]
          },
          {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [{ color: "#f38eb0" }]
          },
          {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [{ color: "#ced7db" }]
          },
          {
            featureType: "poi.medical",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffa5a8" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#c7e5c8" }]
          },
          {
            featureType: "poi.place_of_worship",
            elementType: "geometry.fill",
            stylers: [{ color: "#d6cbc7" }]
          },
          {
            featureType: "poi.school",
            elementType: "geometry.fill",
            stylers: [{ color: "#c4c9e8" }]
          },
          {
            featureType: "poi.sports_complex",
            elementType: "geometry.fill",
            stylers: [{ color: "#b1eaf1" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ lightness: "100" }]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "off" }, { lightness: "100" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffd4a5" }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffe9d2" }]
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{ weight: "3.00" }]
          },
          {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{ weight: "0.30" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{ color: "#747474" }, { lightness: "36" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#e9e5dc" }, { lightness: "30" }]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ visibility: "on" }, { lightness: "100" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#d2e7f7" }]
          }
        ]
      }
    );
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: single_map
    });
  }

  if(document.querySelector('.blogs')){
    $.ajax({
      type: "GET",
      url: "https://quokkalabs.com/blog/wp-json/wp/v2/posts?per_page=3&_embed",
      success: function(response) {
        setBlogs(response)
      }
    })
  }

})
let mainlanding = document.querySelectorAll('.mainlanding-item')
if(mainlanding.length){
  mainlanding.forEach(element => {
    element.addEventListener('mousemove', moveBackgroundToTop)
    function moveBackgroundToTop(event){
        element.style.transition = 'background 0.5s cubic-bezier(.55,.4,.79,.67)'
        element.style.backgroundPosition = (event.pageX * -1 / 50) + 'px ' + (event.pageY * -1 / 50) + 'px '
    }
    window.addEventListener('scroll', () => {
      element.style.transition = 'none'
      element.style.backgroundPositionY = (-window.pageYOffset / 3) + 'px'
    })
  })
  var mainlandingHeadingIndex = 0
  var mainlandingHeadingText = 'DIGITAL INNOVATIONS SIMPLIFIED'
  var mainlandingHeadingspeed = 65

  function typeWriter() {
    if (mainlandingHeadingIndex < mainlandingHeadingText.length) {
      document.querySelector("#mainlanding-heading").innerHTML += mainlandingHeadingText.charAt(mainlandingHeadingIndex);
      mainlandingHeadingIndex++;
      setTimeout(typeWriter, mainlandingHeadingspeed)
      if(mainlandingHeadingIndex == mainlandingHeadingText.length - 1){   
         document.querySelector("#mainlanding-subheading").style.opacity = 1
      }
    }
  }
  typeWriter()
}

let aboutUsHeading = document.querySelector('.about-us-mainlanding ')
function setAboutUsHeading(){
  if(aboutUsHeading){
    commonTypeWriter('Collaborate', setSecondHeading)
  }
}

function setSecondHeading(){
  commonTypeWriter(' Contribute ', setThirdHeading)
}
function setThirdHeading(){
  commonTypeWriter('Accomplish', setAboutUsHeading)
}
function commonTypeWriter(data, callBack){
  document.querySelector('#aboutus-main-heading').innerHTML = ''
  var index = 0
  var text = data
  var speed = 65
  function Type() {
    if (index < text.length) {
      document.querySelector('#aboutus-main-heading').innerHTML += text.charAt(index);
      index++;
      setTimeout(Type, speed)
      if(index == text.length - 1){
        document.querySelector("#about-us-subheading").style.opacity = 1
        document.querySelector("#together").style.opacity = 1

        setTimeout(callBack, 2500)
      }
    }
  }
  Type()
}

setAboutUsHeading()

function setBlogs(data){
  let card = document.querySelectorAll('.blog-card')
  data.forEach((response, idx) => {
    let date = new Date(response['date'])
    let html = `<img src=${response._embedded['wp:featuredmedia'][0]['source_url']} loading="lazy">
                <div class="blog-content">
                  <div class="publish-data">
                    <p>Published By ${response._embedded.author[0]['name']}</p>
                    <p>${date.getDay()}-${date.getMonth()}-${date.getFullYear()}</p>
                  </div>
                  <a class="title" href=${response.link} target="_blank">${response.title.rendered}</a>
                  <div class="read-more pt-20">
                    <a class="read-full-blog" href=${response.link} target="_blank">
                      Read More
                      <span class="ml-10">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </div>`
    card[idx].innerHTML = html
  })
}
// section industries home page
let industrySection = document.querySelector('#industry-section')
let industryCard = document.querySelectorAll('.industry-card')
if(industrySection){
  industryCard.forEach(element => {
    element.addEventListener('mouseover', () => {
      industryCard.forEach(card => {
        card.classList.remove('active')
      })
      element.classList.add('active')
      industrySection.style.backgroundImage = `url(images/industry-${element.dataset.industry}.jpg)`
    })
  })
}
//Powerfull analytics tabs
// var analyticSection = document.querySelector('.powerful-analytics')
// if(analyticSection){
//   let buttons = document.querySelectorAll()
// }

// analytics tabs

$(".powerful-analytics-button").click(function(e) {
  e.preventDefault()
  if ($(this).hasClass("active")) {
    return false
  }
  var id = $(this).data('id');
  $(".powerful-analytics-button").removeClass("active");
  $(this).addClass("active");
  $(".powerfull-analytics-desc").addClass('animate-text');
  $("#analytics-desc-" + id).removeClass("animate-text");
});


$(function() {
  var tabs = $('.powerful-analytics-button')
  setInterval(function() {
      var onTab = tabs.filter('.active')
      var nextTab = onTab.index() < tabs.length-1 ? onTab.next() : tabs.first();
      nextTab.click();
  }, 6000);
});

// terra product page tabs

$(".terra-challenge-button").click(function(e) {
  e.preventDefault()
  if ($(this).hasClass("active")) {
    return false
  }
  var id = $(this).data('id');
  $(".terra-challenge-button").removeClass("active");
  $(this).addClass("active");
  $(".terra-challenge-desc").addClass('animate-box');
  $("#terra-challenge-desc-" + id).removeClass("animate-box");
});


$(function() {
  var tabs = $('.terra-challenge-button')
  setInterval(function() {
      var onTab = tabs.filter('.active')
      var nextTab = onTab.index() < tabs.length-1 ? onTab.next() : tabs.first();
      nextTab.click();
  }, 6000);
});


$(".terra-feature-tab").click(function(e) {
  e.preventDefault()
  if ($(this).hasClass("active")) {
    return false
  }
  var id = $(this).data('id');
  $(".terra-feature-tab").removeClass("active");
  $(this).addClass("active");
  $(".terra-feature-desc").addClass('display-none');
  $("#terra-feature-desc-" + id).removeClass("display-none");
});



$(".terra-challenge-collapse").click(function(e) {
  e.preventDefault()
  var id = $(this).data('id')
  if ($(this).hasClass("active")) {
    $(this).removeClass("active")
    $(this).children('i').css('transform', 'rotate(0deg)')
  }
  else{
    $(this).children('i').css('transform', 'rotate(180deg)')
    $(this).addClass("active");
  }
  var panel = document.querySelector(`#${id}`)
  if (panel.style.maxHeight) {
    panel.style.borderBottom = 'none'
    panel.style.maxHeight = null
  } else {
    panel.style.borderBottom = '1px solid #272727 '
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
})


$(".terra-feature-collapse").click(function(e) {
  e.preventDefault()
  var id = $(this).data('id')
  if ($(this).hasClass("active")) {
    $(this).removeClass("active")
    $(this).children('i').css('transform', 'rotate(0deg)')
  }
  else{
    $(this).children('i').css('transform', 'rotate(180deg)')
    $(this).addClass("active");
  }
  var panel = document.querySelector(`#${id}`)
  if (panel.style.maxHeight) {
    panel.style.borderBottom = 'none'
    panel.style.maxHeight = null
  } else {
    panel.style.borderBottom = '1px solid #272727 '
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
})

// design page tabs

$(".design-tabs").click(function(e) {
  e.preventDefault()
  if ($(this).hasClass("active")) {
    return false
  }
  var id = $(this).data('id');
  $(".design-tabs").removeClass("active");
  $(this).addClass("active");
  $(".design-tab-desc").addClass('animate-text');
  $("#desgin-tab-desc-" + id).removeClass("animate-text");
});


$(function() {
  var tabs = $('.design-tabs')
  setInterval(function() {
      var onTab = tabs.filter('.active')
      var nextTab = onTab.index() < tabs.length-1 ? onTab.next() : tabs.first();
      nextTab.click();
  }, 6000);
});



$(".analytics-collapse").click(function(e) {
  e.preventDefault()
  var id = $(this).data('id')
  if ($(this).hasClass("active")) {
    $(this).removeClass("active")
    $(this).children('i').css('transform', 'rotate(0deg)')
  }
  else{
    $(this).children('i').css('transform', 'rotate(180deg)')
    $(this).addClass("active");
  }
  var panel = document.querySelector(`#${id}`)
  if (panel.style.maxHeight) {
    panel.style.borderBottom = 'none'
    panel.style.maxHeight = null
  } else {
    panel.style.borderBottom = '1px solid white'
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
})

if(document.querySelector('.clients-carousel')){
  var owl = $('.clients-carousel').owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1500,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    responsive: {
        0: {
        items: 2
        },
        600: {
        items: 3
        },
        1000: {
        items: 5
        }
    }
    
  })
}

function submitGotProjectForm(evt){
  evt.preventDefault()
  let form = evt.target
  if (form.checkValidity()) {
    submitGotProject(form)
  } else {
    alert("Please complete the form")
  }
}

function submitGotProject(form) {
  let data = {
    name: form.name.value,
    email: form.email.value,
    contact: form.contact.value,
    message: form.message.value,
    purpose: form.purpose.value
  }
  $.ajax({
    type: "POST",
    url: "https://portal.quokkalabs.com/api/v1/contact",
    headers: {'token': "QXyHkMUxZH9X13bor4cB1MP+d0XBtqAms2oGUa7F+gw="},
    data: data,
    success: function(response) {
      $("#successModal").modal("show");
      $(".clear-form")[0].reset();
      setTimeout(function() {
        $("#successModal").modal("hide");
      }, 3000);
    }
  });
}


function showCareerModal(){
  $("#career-modal").modal("show");
}

function setFileName(event){
  let box = document.querySelector('#for-resume')
  // let fileExt =  event[0].name.split('.').pop()
  if(event.length){
    box.innerHTML = event[0].name
  }
  else{
    box.innerHTML = "No File Selected"
  }
}

function submitCareersForm(evt){
  evt.preventDefault()
  let form = evt.target
  if (form.checkValidity()) {
    submitForm(form)
  } else {
    alert("Please complete the form")
  }
}


function submitForm(form) {
  let apply = new FormData();
  apply.append("name", form.name.value);
  apply.append("email", form.email.value);
  apply.append("contact", form.contact.value);
  apply.append("file", form.resume.files[0]);
  $.ajax({
    type: "POST",
    url: "https://portal.quokkalabs.com/api/v1/contact",
    headers: {'token': "QXyHkMUxZH9X13bor4cB1MP+d0XBtqAms2oGUa7F+gw="},
    processData: false,
    contentType: false,
    data: apply,
    success: function(response) {
        $("#career-modal").modal("hide");
        $("#successModal").modal("show");
        let box = document.querySelector('#for-resume')
        box.innerHTML = "No File Selected"
        $(".clear-form")[0].reset();
        setTimeout(function() {
        $("#successModal").modal("hide");
        }, 3000);
      }
    });
}

// mnre

let cardContainer = document.querySelector('#mnre-benefit')
if(cardContainer){
  window.onscroll = function() {fillProgress()}

  function fillProgress(){
    if(cardContainer.offsetTop < (window.pageYOffset + 300) && (cardContainer.offsetTop + cardContainer.offsetHeight - 300) > window.pageYOffset ){   
      var height = cardContainer.offsetHeight - 600;
      var scrolled = ((pageYOffset - cardContainer.offsetTop + 45) / height) * 100;
      document.querySelector('#progress').style.height = scrolled + '%';
    }
  }
}

(function() {
  let offset = window.innerHeight;
  $(".way-animate").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.67s ease");
    if ($this.hasClass("delay-1")) $this.css("transition-delay", "0.2s");
    if ($this.hasClass("delay-2")) $this.css("transition-delay", "0.4s");
    if ($this.hasClass("delay-3")) $this.css("transition-delay", "0.6s");
    if ($this.hasClass("delay-4")) $this.css("transition-delay", "0.8s");
    if ($this.hasClass("delay-5")) $this.css("transition-delay", "1s");
    if ($this.hasClass("delay-6")) $this.css("transition-delay", "0.8s");
    if ($this.hasClass("delay-7")) $this.css("transition-delay", "0.8s");
    if ($this.hasClass("delay-8")) $this.css("transition-delay", "0.8s");
    if ($this.hasClass("delay-9")) $this.css("transition-delay", "0.8s");

    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("way-animate")
          : $this.addClass("way-animate");
      }
    });
  });
})();

(function() {
  let offset = window.innerHeight;
  $(".animate-right").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.67s ease");

    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("animate-right")
          : $this.addClass("animate-right");
      }
    });
  });
})();


(function() {
  let offset = window.innerHeight
  $(".way-animate-3").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.6s ease");

    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("way-animate-3")
          : $this.addClass("way-animate-3");
      }
    });
  });
})();

(function() {
  let offset = window.innerHeight
  $(".animate-left").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.6s ease");

    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("animate-left")
          : $this.addClass("animate-left");
      }
    });
  });
})();


(function() {
  let offset = window.innerHeight
  $(".after-animation").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.6s ease");
    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("after-animation")
          : $this.addClass("after-animation");
      }
    });
  });
})();



(function() {
  let offset = window.innerHeight
  $(".animate-height").each(function(index) {
    let $this = $(this);
    $this.css("transition", "all 0.6s ease");
    let anything = new Waypoint({
      element: $(this),
      offset: offset,
      handler: function(direction) {
        direction == "down"
          ? $this.removeClass("animate-height")
          : $this.addClass("animate-height");
      }
    });
  });
})();


$(".moments-tab").click(function(e) {
  e.preventDefault()
  if ($(this).hasClass("active")) {
    return false
  }
  var id = $(this).data('id');
  $(".moments-tab").removeClass("active");
  $(this).addClass("active");
  $(".tab-image-container").addClass('display-none');
  $("#" + id).removeClass("display-none");
});
