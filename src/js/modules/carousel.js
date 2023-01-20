import Flickity from "flickity"
import "flickity-imagesloaded"
import "flickity-fade"

/**
 * Javascript
 *
 * This example module logs a greeting to the console and makes the function
 * 'sayGreeting' available via import.
 */

let flickities = [];

const setSliders = (slider, sliderConfig, sliderWrap = "", sliderNextPrev) => {
	;[...slider].forEach(carousel => {
		// Init flickity
		const flkty = new Flickity(carousel, sliderConfig);

		if (sliderNextPrev.prev) {
			const previousButton = carousel
				.closest(sliderWrap)
				.querySelector("[data-carousel-previous-button]")
			// previous
			previousButton.addEventListener("click", e => {
				e.preventDefault()
				flkty.previous()
			})
		}

		if (sliderNextPrev.next) {
			const nextButton = carousel
				.closest(sliderWrap)
				.querySelector("[data-carousel-next-button]")

			// next
			nextButton.addEventListener("click", e => {
				e.preventDefault()
				flkty.next()
			})
		}

		flickities.push(flkty);
	})
}

// General Carousel/Navigation Carousel
const carousel = document.querySelectorAll("[data-carousel]")
const carouselConfig = {
	cellAlign: "left",
	groupCells: false,
	contain: true,
	// pageDots: false,
	// prevNextButtons: false,
	wrapAround: true,
	lazyLoad: 4,
	imagesLoaded: true,
	// autoPlay: 4000,
	// pauseAutoPlayOnHover: true,
	on: {
		ready: () => {
			setTimeout(() => {
				makeOnlyVisibleCellsFocusable(bannerCarouselCells);
			}, 100);
		},
		change: () => {
			makeOnlyVisibleCellsFocusable(bannerCarouselCells);
		}
	}
}
const carouselWrap = "[data-carousel-wrap]"
const carouselNextPrev = {
	next: true,
	prev: true,
}

setSliders(
	carousel,
	carouselConfig,
	carouselWrap,
	carouselNextPrev
)

// Invoke a resize to ensure slide height isn't miscalculated by fonts loading after
// $(() => {
// 	window.dispatchEvent(new Event('resize'));
// });

export default flickities;
