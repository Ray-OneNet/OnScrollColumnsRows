// Import the necessary function for preloading images
import { preloadImages, getGrid } from './utils.js';

// Define a variable that will store the Lenis smooth scrolling object
let lenis;

// Element with class .columns
const grid = document.querySelector('.columns');
// All the columns class .column
const columns = [...grid.querySelectorAll('.column')];
// Map each column to its array of items and keep a reference of the image, its wrapper and the column
const items = columns.map((column, pos) => {
	return [...column.querySelectorAll('.column__item')].map(item => ({
		element: item,
		column: pos,
		wrapper: item.querySelector('.column__item-imgwrap'),
		image: item.querySelector('.column__item-img')
	}));
});
// All itemms
const mergedItems = items.flat();

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.15, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

function getElementPos(element){
	if(!element) return;
	const rect = element.getBoundingClientRect();
	const position = {
		top: rect.top + window.scrollY,
		left: rect.left + window.scrollX,
		right: rect.right + window.scrollX,
		bottom: rect.bottom + window.scrollY,
		width: rect.width,
		height: rect.height,
	};
	return position;
}
function getDifference(animatedEle, ele1, ele2) {
	let animatedEle_pos= getElementPos(animatedEle);
	let ele1_pos= getElementPos(ele1);
	let ele2_pos= getElementPos(ele2);
	let ele2_Width = ele2_pos.width;
    let ele2_Height = ele2_pos.height;
	let ele1_Width = ele1_pos.width;
    let ele1_Height = ele1_pos.height;
    // let cardRadius = ele1.attr("radius-size");
    let offsetLeft1 = ele1_pos.left - animatedEle_pos.left;
    let offsetTop1 = ele1_pos.top - animatedEle_pos.top;
    let offsetLeft2 = ele2_pos.left - animatedEle_pos.left;
    let offsetTop2 = ele2_pos.top - animatedEle_pos.top;

	// let cardWidth = ele1.innerWidth();
    // let cardHeight = ele1.innerHeight();
    // let cardRadius = ele1.attr("radius-size");
    // let offsetLeft = ele1.offset().left - ele2.offset().left;
    // let offsetTop = ele1.offset().top - ele2.offset().top;
    // return transformValue
    return {
		offsetLeft1, 
		offsetTop1,
		offsetLeft2, 
		offsetTop2, 
		ele2_Width, 
		ele2_Height, 
		ele1_Width,
		ele1_Height
	};
  }


const scroll = () => {
	const gridObj = getGrid(mergedItems.map(item => item.element));

	const flip_point_2 = document.getElementById("flip-point-2");
	const flip_point_1 = document.getElementById("flip-point-1");
	const animatedCard = document.getElementById("animatedCard");
	let flipAnimationInfo;
	
	const rowMapping = {
		even: {
			skewX: 5,
			xPercent: -35,
			transformOrigin: '0% 50%'
		},
		odd: {
			skewX: -5,
			xPercent: 35,
			transformOrigin: '100% 50%'
		}
	};
	
	['even', 'odd'].forEach((type, index) => {
		gridObj.rows(type).flat().forEach(row => {
			gsap
			.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: row,
					// start: 'top bottom',
					start: 'top 100%',
					end: 'bottom 0%',
					// end: 'bottom top',
					// scrub: true,
					
				},
			
			})
			.to(row.querySelector('.column__item-imgwrap'), {
				xPercent: rowMapping[type].xPercent,
				skewX: rowMapping[type].skewX
			}, 0)
			.fromTo(row.querySelector('.column__item-img'),{
				scale: 1.35,
				startAt: {transformOrigin: rowMapping[type].transformOrigin},
				opacity: 0
			}, {
				ease: 'power1.in',
				scale: 1,
				opacity: 1,
				delay: Math.random() * 0.5
			}, 0);
		});
	});

	

	
	 

	// let imgFlipTl = gsap.timeline({
	// 	// yes, we can add it to an entire timeline!
	// 	scrollTrigger: {
	// 	  trigger: ".target_section",
	// 	  start: 'top bottom',
	// 	  end: 'bottom bottom',
	// 	  scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// 	  markers: true	,
	// 		onEnter:()=>{
	// 				flipAnimationInfo = getDifference(animatedCard, flip_point_1, flip_point_2);
	// 				gsap.set(animatedCard,{
	// 					width: flipAnimationInfo.ele1_Width,
	// 					height: flipAnimationInfo.ele1_Height,
	// 					x: flipAnimationInfo.offsetLeft1,
	// 					y: flipAnimationInfo.offsetTop1,

	// 				})
	// 		}	
	// 	},
	//   })
	
	//   .to(animatedCard,{
	// 	opacity: 1,
	// 	duration: 0.01,
	// 	ease: "none"
	//   })
	//   .to(".column__item",{
	// 	  opacity: 0,
	// 	  stagger: {
	// 		  amount: 0.5
	// 	  }
	//   },"<")
	// .to(animatedCard,{
	// 	width: flipAnimationInfo.ele2_Width,
	// 	height: flipAnimationInfo.ele2_Height,
	// 	x: flipAnimationInfo.offsetLeft2,
	// 	y: flipAnimationInfo.offsetTop2,
	// 	borderRadius: "8px",
	// 	delay: 0.5
	// },"<")
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages('.column__item-img').then(() => {
	initSmoothScrolling();
	scroll();
	document.body.classList.remove('loading');
});