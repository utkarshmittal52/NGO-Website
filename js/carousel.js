
action = new TimelineMax()

action.staggerFrom(".team-image-2", 4, {y: 800, ease:Expo.easeInOut}, 1.5);

const container = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".team",
    duration: 4000,
	triggerHook: 0.12
})
.setTween(action).setPin(".team").addTo(container)

// gsap.to(".headinghj", {rotation: 27, x: 100, duration: 1});

gsap.to(".headinghj", 2, {x: -200, opacity: 0, ease:Expo.easeOut}, 0.3)
// gsap.timeline({
//     scrollTrigger: {
//         trigger: ".team",
//         start: "center center",
//         end: "bottom top",
//         scrub: true,
//         markers: true,
//         pin: true
//     }
// })
// // .from('.team-image-1', {y: innerHeight * 1})
// .from('.team-image-2', {y: innerHeight * 1.5})
// .from('.team-image-3', {x: innerHeight * 1.5})
// .from('.team-image-4', {y: innerHeight * 1.5})
// .from('.team-image-5', {x: innerHeight * 1.5})
// .from('.team-image-6', {y: innerHeight * 1.5})


