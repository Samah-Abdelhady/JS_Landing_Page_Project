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
const fragment = document.createDocumentFragment();
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

    let section_id; //to get secition id to make link jump into section on clicking
    let section_title;// to store setion title on link
    let section_listItem, section_link;

    sections.forEach((section, index) => {
    	//create li and a tags
    	section_listItem = document.createElement('li');
    	section_link = document.createElement('a');

    	//get every section id and title
        section_id = section.id;
        section_title = section.getAttribute("data-nav");

        //add class, href and text content to link
        section_link.href = '#'+section_id;
        section_link.textContent = section_title;

		//make first section link is the active one by default
        if(index == 0) {
        	section_link.classList.add('your-active-class');
        }
        section_link.classList.add('menu__link');

        //append link inside li item
        section_listItem.appendChild(section_link);

        //another way to add link insude li item
        //const link = `<a class="menu__link" href="#${section_id}">${section_title}</a>`;
        //section_listItem.innerHTML = link;

        //append li item to fragment
        fragment.appendChild(section_listItem);

    });
    ul_nav_list.appendChild(fragment);
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
			// section.scrollIntoView({behavior: 'smooth', block:false});
		};
	});
};

//to deploy the real activation of current section
const deploy_section_activation = () => {
	window.addEventListener('scroll', apply_section_activation);
};

deploy_section_activation();

// Scroll to anchor ID using scrollTO event
//the function used when click link to move smooth
const click_link_smooth = (event) => {
	event.preventDefault();//prevent default action
	let section_id = event.target.attributes.href.value;//get href of a specific link
	let link_section = document.querySelector(section_id);
	//make link action move smooth
    link_section.scrollIntoView({
      behavior: "smooth"
    });
};

//apply smooth movement for each link when clicking them
const apply_links_smooth_move = () => {
	//get all exist links
	const links = document.querySelectorAll("a");

	//add to all link smooth move on clicking
	links.forEach(link => {
	  link.addEventListener("click", click_link_smooth);

	});
};
apply_links_smooth_move();

//remove active class from links when their section is not in the view during scroll
const remove_link_activeClass = () => {
	const links = document.querySelectorAll('a');
	links.forEach((link) => {
    link.classList.remove("your-active-class");
  });
};

//add active class to the link of the current section on the view
const add_link_activeClass = (section_id) => {
	//get the specific link of the given section id
	let current_link = `nav ul li a[href="#${section_id}"]`;
	let link = document.querySelector(current_link);

	link.classList.add('your-active-class');
};

const change_link_style_onscroll = () => {
	//get top position of scroll
	let scroll_position = document.documentElement.scrollTop;
	let section_top, section_bottom;// the begining and the end of each section
	let section_id;//hold the id of current section on screen

	sections.forEach((section) => {
		section_top = section.offsetTop - section.offsetHeight * 0.2;
		section_bottom = section_top + section.offsetHeight;

		
		if (scroll_position >= section_top && scroll_position < section_bottom) {
			section_id = section.attributes.id.value;
			remove_link_activeClass();//removeactive class from all links
			add_link_activeClass(section_id);//add active class to link of section on view
    }
  });

};

//manipulate active section links during scrolling
const activate_link_activeClass = () => {
	window.addEventListener("scroll", change_link_style_onscroll);
};

activate_link_activeClass();

// // hide navbar during scrolling down and show it during scrolling up
// const hide_navbar_on_scrolling_down = () => {
// 	const page_width = window.screen.width;
// 	const navbar = document.querySelector('.navbar__menu');
// 	let scroll_top = 0;//holds y position in scrolling up
// 	let scrolling_down;//holds y position in scrolling down

// 	if(page_width > 800) {
// 		window.addEventListener('scroll', () => {
// 			scrolling_down = window.pageYOffset || document.documentElement.scrollTop;

// 			if(scrolling_down > scroll_top) { //holds y position in scrolling down
// 				navbar.style.display = 'none';// then hide navbar
// 			}
// 			else {//holds y position in scrolling up
// 				navbar.style.display = 'block';// then show navbar
// 			}
// 			scroll_top = scrolling_down;

// 		});
// 	}
// };
// hide_navbar_on_scrolling_down();

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
	 window.scroll({top: 0, behavior: "smooth"});
	//remove all active links
	remove_link_activeClass();
	add_link_activeClass('section1');
};

//deploy the scroll effect on the btn and the btn effect on the page
const deploy_top_btn = () => {
	window.addEventListener("scroll", scroll_to_top);
	top_btn.addEventListener('click', click_top_btn);
};
deploy_top_btn();

//adding a toogle menuto hold links in case page width is less than 800
//to be design responsive
const apply_toggle_menu = () => {
	const menu = document.getElementById('menu');
	const navbar_menu = document.querySelector('.navbar__menu');
	const links = document.querySelectorAll('a');
//shows all link from menu on clicking it
	menu.addEventListener('click', () => {
		navbar_menu.classList.toggle('active');
	});

//disappear menu links when want to go to a specific link content
	links.forEach(link => {
		link.addEventListener('click', () => {
			navbar_menu.classList.remove('active');
		});
	});

};

apply_toggle_menu();
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



