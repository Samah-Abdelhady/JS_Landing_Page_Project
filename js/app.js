/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const ul_nav_list = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
// const fragment = document.createDocumentFragment();
const top_btn = document.getElementById('back_to_top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//getting the top position of the current section
const get_top_of_section = (section) => {
	return Math.floor(section.getBoundingClientRect().top);
};

//getting the height of the current section
const get_height_of_section = (section) => {
	return Math.floor(section.getBoundingClientRect().height);
};

//remove active class from other sections which we don't want them to be ctive
const remove_active_class = (section) => {
	section.classList.remove('your-active-class');
	section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};

//add active class for the section we want to see
const add_active_class = (section) => {
	section.classList.add('your-active-class');
	section.style.cssText = "background-color: rgba(0,0,255,0.2)";
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const build_navbar = () => {

    let unordered_list_content;// the unordered list which will contain all links
    let section_id; //to get secition id to make link jump into section on clicking
    let section_title;// to store setion title on link

    sections.forEach(section => {
    	//get every section id and title
        section_id = section.id;
        section_title = section.getAttribute("data-nav");

        //compine id and title into <a> tage into <li> tag
        unordered_list_content += `<li><a class="menu__link" href="#${section_id}">${section_title}</a></li>`;


    });
    ul_nav_list.innerHTML = unordered_list_content;
};

build_navbar();


// Add class 'active' to section when near top of viewport

//change the active class between sections depending on viewed section as a result from scrolling
const apply_section_activation = () => {
	let section_top_position, section_height; // to hold the start top location and  height of each section
	let  is_in_view; // to check if current section is in the top of the view

	sections.forEach(section => {
		section_top_position = get_top_of_section(section);
		section_height = -get_height_of_section(section) + 130;

		// check for the begining of the section and its height
		is_in_view = section_top_position < 150 && section_top_position >= section_height;

		remove_active_class(section);
		if (is_in_view) {
			add_active_class(section);
		};
	});
};

//to deploy the real actiation of current section
const deploy_section_activation = () => {
	window.addEventListener('scroll', apply_section_activation);
};

deploy_section_activation();
// Scroll to anchor ID using scrollTO event

//make button appear when scroll down the page and on click it go back to the top of the page
const  scroll_to_top = () => {
	
	let page_height = window.pageYOffset;

	//check if the scroll down enough height
	if (page_height > 600) { 
	    top_btn.style.display = "block"; // then display the top btn
	   
	  }
    else { 
	  	top_btn.style.display = "none";
	    
	  }

};

//the top btn work is to scroll to top of the page
const click_top_btn = () => {
	window.scrollTo(0,0);
};

//deploy the scroll effect on the btn and the btn effect on the page
const deploy_top_btn = () => {
	window.addEventListener("scroll", scroll_to_top);
	top_btn.addEventListener('click', click_top_btn);
};
deploy_top_btn();
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



