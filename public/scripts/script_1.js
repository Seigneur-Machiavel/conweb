if (false) { // for completion
	const anime = require('animejs');
}


/* note:
- 3 levels of reading, hoverer, seeker, programmer
The one who doesn't have time goes to the essentials
The one who moves the mouse discovers additional content
The one who wants to dig into the code to skip level 2 will come across other hidden content */

const urlprefix = ""
const protocol = window.location.protocol;
// Dont forget to use the "urlprefix" while fetching, example :
// .src = `${urlprefix}/sprites/cloud`
/*const env_= 'dev'; // 'prod' or 'dev',
if (env_ == 'dev') { // THIS IS FOR DEV ONLY ( to get better code completion)
    console.log('dev mode');
    // const sf = require('./simple_functions.js');
} else {
    // sf = window.sf;
}*/

//#region - PRELOAD FUNCTIONS - ( They need to be created before html elements who use them )
function toggleDarkMode(element) {
	if (element.checked) {
		document.body.classList.add('dark-mode');
	} else {
		document.body.classList.remove('dark-mode');
	}
}
//#endregion

//#region - VARIABLES
const animations = {};
const GLOBAL = {
	isOpen: false,
	revealedMenuItem: {},
	cyberconActive: false,
}
const menuContentValues = {
	A: { // VISON
		"Decentralization maximalism": {
			subtitle: "Decentralization isn't a feature...<br>it's our core philosophy.",
			description: "We strive for maximalism in decentralization, ensuring that power and control are distributed as widely as possible across the network.<br><br>This principle guides every decision we make, from the architecture of our blockchain to the governance models we adopt.<br><br>By prioritizing decentralization above all, we aim to create a truly resilient and democratic digital ecosystem that stands in contrast to centralized systems, ensuring that our platform remains open, transparent, and accessible to everyone, everywhere.",
			secret: "If you're reading this, you're a seeker. Congratulations!<br>You've discovered a hidden message.<br>Keep exploring to find more."
		},
		"Users oriented services": {
			subtitle: "User-Friendly Tools<br>Inspired by Modern Online Banking",
			description: "Understanding the importance of accessibility, we have meticulously crafted our user interface to mirror the convenience and user-friendliness of modern online banking.<br><br>Our tools are designed with the end-user in mind, ensuring that navigating the Contrast ecosystem is intuitive, straightforward, and efficient.",
			secret: "By using ASIC-resistant algorithms and undercover marketing, we ensure that our platform remains accessible to all users, regardless of their hardware or technical expertise."
		},
		"Fully open source": {
			subtitle: "Any Contrast code is open source",
			description: "Embracing the spirit of true collaboration and innovation, CONTRAST is proud to be fully open source. This commitment allows us to tap into the collective genius of developers, innovators, and enthusiasts worldwide.<br><br>By making our code publicly available, we invite the community to contribute, audit, and enhance our platform, ensuring not only the security and robustness of our technology but also fostering an environment of transparency and trust.<br><br>Open source is the backbone of our approach to creating a blockchain solution that is continually evolving and improving through community-driven development.",
			secret: "None of the industrial companies should aquire the majority, we need your help to keep the network decentralized!<br>- Early adaptors will be rewarded and aquire the majority of the network."
		},
		"Roadmap": {
			subtitle: "Roadmap",
			description: "Place holder",
			secret: "Regardless of your side, any war need an army. We are the army of the decentralized world. Join us by running a node now!"
		},
	},
	B: { // BLOCKCHAIN
		"Subtantial blockchain innovation": {
			subtitle: "~~> Blockchain Innovation ~~",
			description: "--- Validator node, can run on a raspberry pi.<br>--- Explorer/wallet powered by P2P nodes.<br>--- Argon2 algorithm. (ASIC-resistant)<br>--- 20 chars POW related addresses.<br>--- Readable transaction's ID.<br>--- 2 minute block time.<br>--- 11 transactions/s.",
			secret: "Congratulations seeker!<br>You've discovered a hidden message.<br>Keep exploring to find more."
		},
		"Distribution over 10 years": {
			subtitle: "~~> Distribution over 10 years ~~",
			description: "Contrast tokens are distributed over a 10-year period, ensuring a fair and equitable distribution of tokens to all participants.<br><br>Our emission schedule is designed to incentivize early adopters and long-term supporters, rewarding those who contribute to the network's growth and stability.<br><br>By distributing tokens gradually, we aim to create a sustainable and robust ecosystem that is resistant to market manipulation and centralization.",
			secret: "The Fibonacci sequence is used to determine the distribution of CONTRAST tokens over 10 years. This ensures a fair and equitable distribution of tokens to all participants, rewarding early adopters and securing long-term incentives"
		},
		"No ICO, no premine": {
			subtitle: "~~> No ICO, No Premine ~~",
			description: "Contrast is a community-driven project that has never conducted an ICO or premined tokens.<br><br>Our commitment to fairness and transparency is reflected in our decision to distribute CONTRAST tokens through mining rewards, ensuring that all participants have an equal opportunity to earn tokens and contribute to the network.<br><br>By eschewing ICOs and premines, we uphold the principles of decentralization and equality, fostering an ecosystem that is truly open, democratic, and accessible to all.",
			secret: "Community power is related to the coin distribution. We need you to keep the network decentralized!"
		},
		"Wallet": {
			subtitle: `<a href="https://chromewebstore.google.com/detail/contrast-wallet/mjiipclahahbedeiifgpfoagmncdcnoj" target="_blank" class="pageContentDownloadBtn"><div><img src="data:image/png;base64,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" alt="Chrome"></div><h2>Access Chrome extension</h2></a>`,
			description: "Try our wallet extension for Chrome and enjoy the convenience of managing your CONTRAST assets directly from your browser.<br><br>With a simple installation process that takes less than a minute, you can securely store, send, and receive CONTRAST tokens with ease.<br><br>Experience the power of CONTRAST at your fingertips with our Chrome extension.",
			secret: "Contact us to run a node and get better reward than the simple wallet's integrated mining."
		}
	}
}
//#endregion

window.addEventListener('load', async function () {

//#region - HTML-ELEMENTS
const eHTML = {
	pointerDiv: document.getElementById('pointerDiv'),
	msgGamestop: document.getElementById('msgGamestop'),
	homeButton: document.getElementById('homeButton'),
	modal: document.getElementById('modal'),
	//toggleDarkModeButton: document.getElementById('dark-mode-toggle'),

	menuA: document.getElementById('menuA'),
	titleA: document.getElementById('menuA').getElementsByClassName('title')[0],
	menuItemsWrapA: document.getElementById('menuA').getElementsByClassName('menuItemsWrap')[0],
	contentA: document.getElementById('contentA'),
	secretA: document.getElementById('contentA').getElementsByClassName('secret')[0],
	subtitleA: document.getElementById('contentA').getElementsByClassName('subtitle')[0],
	descriptionA: document.getElementById('contentA').getElementsByClassName('description')[0],

	menuB: document.getElementById('menuB'),
	titleB: document.getElementById('menuB').getElementsByClassName('title')[0],
	menuItemsWrapB: document.getElementById('menuB').getElementsByClassName('menuItemsWrap')[0],
	contentB: document.getElementById('contentB'),
	secretB: document.getElementById('contentB').getElementsByClassName('secret')[0],
	subtitleB: document.getElementById('contentB').getElementsByClassName('subtitle')[0],
	descriptionB: document.getElementById('contentB').getElementsByClassName('description')[0],

	mainBack: {
		centerCircle: document.getElementById('centerCircle'),
		
		left: document.getElementById('mainBackLeft'),
		leftObject: document.getElementById('mainBackLeftObject'),
		leftObjectIn: document.getElementById('mainBackLeftObject').children[0],
		leftTitle: document.getElementById('mainBackLeftTitle'),

		right: document.getElementById('mainBackRight'),
		rightObject: document.getElementById('mainBackRightObject'),
		cyberconFrame: document.getElementById('mainBackRightObject').children[0],
		rightObjectIn: document.getElementById('mainBackRightObject').children[1],
		rightTitle: document.getElementById('mainBackRightTitle'),
	}
}
//#endregion

class CursorManager {
	static switchPointerDivColor() {
		eHTML.pointerDiv.classList.toggle('color2');
	}
	static setPointerDivHoveringAttribute(value = true) {
		if (value === true) eHTML.pointerDiv.classList.add('hovering');
		else eHTML.pointerDiv.classList.remove('hovering');
	}
	static setPointerDivRectangleAttribute(value = true) {
		if (value === true) eHTML.pointerDiv.classList.add('rectangle');
		else eHTML.pointerDiv.classList.remove('rectangle');
	}
	static pointerClicked() {
		animations.pointerClicked = anime({
			targets: eHTML.pointerDiv,
			boxShadow: [
				'0 0 0 0px black, 0 0 2px 2px white, inset 0 0 0 0px black',
				'0 0 0px 8px black, 0 0 6px 8px white, inset 0 0 1px 1px black',
				'0 0 0px 12px black, 0 0 0px 10px white, inset 0 0 2px 2px black',
				'0 0 0 0px black, 0 0 0px 2px white, inset 0 0 0 0px black',
				'0 0 0 0px black, 0 0 0px 0px white, inset 0 0 0 0px black',
			],
			easing: 'easeOutExpo',
			duration: 300,
		});
	}
}

//#region - SIMPLE FUNCTIONS
function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function formatedUrl(urlStr = 'http://localhost:27271/') {
	// result : http://localhost:27271
	const url = new URL(urlStr);
	return `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}`;
}
function cyberConAppear(duration = 1000) {
	GLOBAL.cyberconActive = true;
	eHTML.mainBack.rightTitle.classList.remove('visible');
	eHTML.mainBack.cyberconFrame.style.opacity = 0;
	//eHTML.mainBack.cyberconFrame.src = `${protocol}//pinkparrot.science:${protocol === 'https:' ? 27281 : 27280}`;
	if (protocol === 'https:') eHTML.mainBack.cyberconFrame.src = `https://cybercon.app`;
	else eHTML.mainBack.cyberconFrame.src = `http://pinkparrot.science:27280`;

	eHTML.mainBack.cyberconFrame.style.display = 'block';
	eHTML.mainBack.cyberconFrame.style.pointerEvents = 'auto';
	animations.cyberConAppear = anime({
		targets: eHTML.mainBack.cyberconFrame,
		opacity: [0, 1],
		easing: 'easeOutExpo',
		duration,
		complete: () => { eHTML.msgGamestop.classList.add('visible'); }
	});
}
function cyberConDisappear(duration = 1000) {
	GLOBAL.cyberconActive = false;
	eHTML.mainBack.rightTitle.classList.add('visible');
	eHTML.msgGamestop.classList.remove('visible');
	eHTML.mainBack.cyberconFrame.src = 'about:blank';
	eHTML.mainBack.cyberconFrame.style.pointerEvents = 'none';
	animations.cyberConDisappear = anime({
		targets: eHTML.mainBack.cyberconFrame,
		opacity: [1, 0],
		easing: 'easeOutExpo',
		duration,
		complete: () => {
			eHTML.mainBack.cyberconFrame.style.display = 'none';
			eHTML.mainBack.cyberconFrame.src = 'about:blank';
		}
	});
}
//#endregion

//#region - ANIMATIONS
async function welcome() {
	animations.centerCircleTick = anime({
		targets: eHTML.mainBack.centerCircle,
		rotate: [0, 180],
		// quad
		easing: 'easeInExpo',
		duration: 800,
		delay: 1000,
		complete: () => {
			anime({
				targets: [eHTML.mainBack.leftObject, eHTML.mainBack.rightObject],
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 100,
			});
			anime({
				targets: eHTML.mainBack.centerCircle,
				opacity: [1, 0],
				easing: 'easeOutExpo',
				duration: 100,
				delay: 100,
			});
		},
	});

	animations.welcomeLeftObject = anime({
		targets: eHTML.mainBack.leftObject,
		borderRadius: ['50%', '0%'],
		easing: 'easeOutExpo',
		duration: 1000,
		delay: 2000,
	});
	animations.welcomeIn = anime({
		targets: [ eHTML.mainBack.leftObjectIn, eHTML.mainBack.rightObjectIn ],
		scale: [0, 0.667],
		opacity: [0, 1],
		easing: 'easeOutExpo',
		duration: 1000,
		delay: 2000,
	});

	animations.separationLeft = anime({
		targets: eHTML.mainBack.leftObject,
		right: "50%",
		easing: 'easeInQuad',
		duration: 600,
		delay: 2800,
	});
	animations.separationRight = anime({
		targets: eHTML.mainBack.rightObject,
		left: "50%",
		easing: 'easeInQuad',
		duration: 500,
		delay: 2900,
	});

	await new Promise(resolve => setTimeout(resolve, 3200));

	eHTML.mainBack.leftObject.classList.add('active');
	eHTML.mainBack.rightObject.classList.add('active');

	await new Promise(resolve => setTimeout(resolve, 600));
	eHTML.mainBack.leftTitle.classList.add('visible');
	eHTML.mainBack.rightTitle.classList.add('visible');

	eHTML.mainBack.right.style.overflow = 'initial';
}
welcome();
async function openBackObject(target = 'left') {
	GLOBAL.isOpen = target;
	cyberConDisappear(0);

	animations.backObjectClosing = anime({
		targets: [ eHTML.mainBack.leftObjectIn, eHTML.mainBack.rightObjectIn ],
		scale: [0.667, .9],
		easing: 'easeOutQuad',
		duration: 600,
		complete: () => {
			anime({
				targets: [ eHTML.mainBack.leftObjectIn, eHTML.mainBack.rightObjectIn ],
				scale: [.9, 0],
				easing: 'easeInQuad',
				duration: 200
			});
			// close the opposite object
			animations.closeOppositeObject = anime({
				targets: target === 'left'
				? [eHTML.mainBack.rightObject, eHTML.mainBack.rightTitle]
				: [eHTML.mainBack.leftObject, eHTML.mainBack.leftTitle],
				clipPath: target === 'right'
				? ['polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)']
				: ['polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'polygon(0 0, 0% 0, 0% 100%, 0 100%)'],
				easing: 'easeOutExpo',
				duration: 400
			});
		},
	});

	await new Promise(resolve => setTimeout(resolve, 600));

	animations.contractBackObject = anime({
		targets: target === 'left' ? eHTML.mainBack.leftObject : eHTML.mainBack.rightObject,
		scale: [1.1, 1],
		easing: 'easeOutExpo',
		duration: 120,
		complete: () => {
			eHTML.mainBack.leftObject.classList.remove('active');
			eHTML.mainBack.rightObject.classList.remove('active');
		}
	});

	await new Promise(resolve => setTimeout(resolve, 200));

	revealMenu(target === 'left' ? 'A' : 'B');

	animations.openBackObject = anime({
		targets: target === 'left' ? eHTML.mainBack.leftObject : eHTML.mainBack.rightObject,
		height: target === 'left' ? '80%' : '100%',
		aspectRatio: target === 'left' ? '1 / 1' : '8 / 6',
		translate: target === 'left' ? '2% -50%' : '-50% -50%',
		left: target === 'left' ? 'initial' : '0%',
		right: target === 'left' ? '0%' : 'initial',
		easing: 'easeOutExpo',
		duration: 800,
		complete: () => {
			if (target === 'left') return;
			cyberConAppear();
			eHTML.mainBack.left.classList.add('invert');
			eHTML.homeButton.classList.add('invert');
		}
	});
	animations.unRoundBackObject = anime({
		targets: target === 'left' ? eHTML.mainBack.leftObject : eHTML.mainBack.rightObject,
		borderRadius: target === 'right'
		//? ['0% 0% 0% 0%', '0% 10% 10% 0%']
		? ['0% 0% 0% 0%', '0% 0% 0% 0%']
		: ['50% 50% 50% 50%', '10% 0% 0% 10%'],
		easing: 'easeOutExpo',
		duration: 400,
		delay: target === 'right' ? 200 : 0,
	});

	await new Promise(resolve => setTimeout(resolve, 200));
}
async function closeBackObject(target = 'left') {
	eHTML.homeButton.classList.remove('visible');
	cyberConDisappear();
	hideMenu();
	hideContent();

	await new Promise(resolve => setTimeout(resolve, 400));

	GLOBAL.revealedMenuItem = {};
	eHTML.menuItemsWrapA.innerHTML = "";
	eHTML.menuItemsWrapB.innerHTML = "";
	eHTML.mainBack.left.classList.remove('invert');
	eHTML.homeButton.classList.remove('invert');

	animations.closeBackObject = anime({
		targets: target === 'left' ? eHTML.mainBack.leftObject : eHTML.mainBack.rightObject,
		height: '20%',
		aspectRatio: '1 / 1',
		translate: target === 'left' ? '50% -50%' : '-50% -50%',
		left: '50%',
		right: '50%',
		easing: 'easeOutExpo',
		duration: 1000
	});
	animations.roundBackObject = anime({
		targets: target === 'left' ? eHTML.mainBack.leftObject : eHTML.mainBack.rightObject,
		borderRadius: target === 'left'
		? ['0% 10% 10% 0%', '0% 0% 0% 0%']
		: ['10% 0% 0% 10%', '50% 50% 50% 50%'],
		easing: 'easeOutExpo',
		duration: 400,
		delay: 200,
		//complete: () => { eHTML.mainBack.left.classList.remove('invert'); }
	});

	await new Promise(resolve => setTimeout(resolve, 600));

	animations.openOppositeObject = anime({
		targets: target === 'left'
		? [eHTML.mainBack.rightObject, eHTML.mainBack.rightTitle]
		: [eHTML.mainBack.leftObject, eHTML.mainBack.leftTitle],
		clipPath: target === 'left'
		? ['polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
		: ['polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'],
		easing: 'easeOutExpo',
		duration: 400
	});

	await new Promise(resolve => setTimeout(resolve, 600));

	animations.expandBackObject = anime({
		targets: [ eHTML.mainBack.leftObjectIn, eHTML.mainBack.rightObjectIn ],
		scale: [0, 0.667],
		opacity: [0, 1],
		easing: 'easeOutExpo',
		duration: 1000,
		delay: 200
	});

	await new Promise(resolve => setTimeout(resolve, 600));

	eHTML.mainBack.leftObject.style.transform = "";
	eHTML.mainBack.rightObject.style.transform = "";

	eHTML.mainBack.leftObject.classList.add('active');
	eHTML.mainBack.rightObject.classList.add('active');
	GLOBAL.isOpen = false;
}
/** @param {HTMLElement} element */
async function revealMenuItemText(element, text = "toto") {
	if (GLOBAL.revealedMenuItem[text]) { return; }
	GLOBAL.revealedMenuItem[text] = true;

	const letters = text.split('');
	const nbOfLetters = letters.length;
	for (let i = 0; i < nbOfLetters; i++) { 
		const span = document.createElement('span');
		span.innerText = letters[i];
		element.appendChild(span);
		await new Promise(resolve => setTimeout(resolve, 1000 / 60));
		span.classList.add('visible');
		span.classList.add('no-select');

		const nextIsSpace = letters[i + 1] === ' ';
		if (!nextIsSpace) { continue; }

		span.classList.add('endSpace');
		i++;
		await new Promise(resolve => setTimeout(resolve, 120));
	}
}
async function revealMenu(target = "A") {
	eHTML.homeButton.classList.add('visible');

	if (target === "A") {
		eHTML.menuA.classList.remove('disabled');
	} else {
		eHTML.menuB.classList.remove('disabled');
	}
	
	await new Promise(resolve => setTimeout(resolve, 600));

	const targetMenuItemsWrapElement = target === "A" ? eHTML.menuItemsWrapA : eHTML.menuItemsWrapB;
	for (const key in menuContentValues[target]) {
		const menuItem = document.createElement('div');
		menuItem.dataset.key = key;
		menuItem.classList.add('menuItem');
		const span = document.createElement('span');
		span.innerText = '•';
		span.classList.add('endSpace');
		span.classList.add('no-select');
		menuItem.appendChild(span);
		// show menu item text on hover
		menuItem.addEventListener('mouseover', async (event) => {
			revealMenuItemText(menuItem, key);
		});
		targetMenuItemsWrapElement.appendChild(menuItem);

		await new Promise(resolve => setTimeout(resolve, 200));
		span.classList.add('visible');
	}
}
function hideMenu() {
	eHTML.menuA.classList.add('disabled');
	eHTML.menuB.classList.add('disabled');
}
function fillContent(target = "A", key = "Decentralization maximalism") {
	if (target === "A") {
		eHTML.subtitleA.innerHTML = menuContentValues.A[key].subtitle;
		eHTML.descriptionA.innerHTML = menuContentValues.A[key].description;
		if (menuContentValues.A[key].secret) eHTML.secretA.innerHTML = menuContentValues.A[key].secret;
		eHTML.contentA.classList.add('visible');
	} else if (target === "B") {
		eHTML.subtitleB.innerHTML = menuContentValues.B[key].subtitle;
		eHTML.descriptionB.innerHTML = menuContentValues.B[key].description;
		if (menuContentValues.B[key].secret) eHTML.secretB.innerHTML = menuContentValues.B[key].secret;
		eHTML.contentB.classList.add('visible');
	}
}
async function hideContent() {
	eHTML.contentA.classList.remove('visible');
	eHTML.contentB.classList.remove('visible');
	await new Promise(resolve => setTimeout(resolve, 600));

	eHTML.secretA.innerHTML = "";
	eHTML.subtitleA.innerHTML = "";
	eHTML.descriptionA.innerHTML = "";

	eHTML.secretB.innerHTML = "";
	eHTML.subtitleB.innerHTML = "";
	eHTML.descriptionB.innerHTML = "";
}
//#endregion

//#region - EVENT LISTENERS
window.addEventListener('message', function(e) {
	// window.parent.postMessage({ type: 'copy_text', value: referralLink }, 'file://');
	//console.log('Message received from iframe:', e);

	if (e.data?.type === 'copy_text') {
		const authorizedCopyTextOrigins = [
			'https://pinkparrot.science:27281',
			'http://pinkparrot.science:27280',
			'https://cybercon.app',
		];
		if (!authorizedCopyTextOrigins.includes(formatedUrl(e.origin))) {
			console.error('Unauthorized origin for copy_text:', e.origin);
			return;
		}

		navigator.clipboard.writeText(e.data.value).then(() => {
			//console.log('Text copied to clipboard:', e.data.value);
			console.log('Text copied to clipboard!');
		}).catch(err => {
			console.error('Failed to copy text to clipboard:', err);
		});
	}
});
document.addEventListener('mousemove', (event) => {
	//console.log(event.target.id);
	if (event.target.id === eHTML.mainBack.cyberconFrame.id) eHTML.pointerDiv.classList.add('hoverCybercon');
	else eHTML.pointerDiv.classList.remove('hoverCybercon');

	eHTML.pointerDiv.style.left = `${event.clientX}px`;
	eHTML.pointerDiv.style.top = `${event.clientY}px`;
});
/*document.getElementById("dark-mode-toggle").addEventListener('change', (event) => {
	toggleDarkMode(eHTML.toggleDarkModeButton)
	// save dark-mode state
	localStorage.setItem('dark-mode', event.target.checked);
});*/
document.addEventListener('click', async (event) => {
	CursorManager.pointerClicked();

	switch (event.target) {
		case eHTML.mainBack.leftObject:
			if (GLOBAL.isOpen) { return; }
			await openBackObject('left');
			break;
		case eHTML.mainBack.rightObject:
			if (GLOBAL.isOpen) { return; }
			await openBackObject('right');
			break;
		case eHTML.homeButton:
			const target = GLOBAL.isOpen;
			if (!target) { return; }

			await closeBackObject(target);
			break;
	}

	if (event.target.dataset.key && menuContentValues.A[event.target.dataset.key])
		fillContent("A", event.target.dataset.key);
	
	if (event.target.dataset.key && menuContentValues.B[event.target.dataset.key])
		fillContent("B", event.target.dataset.key);
});
document.addEventListener('wheel', (event) => {
	if (event.deltaY < 0) CursorManager.setPointerDivRectangleAttribute(true);
	else if (event.deltaY > 0) CursorManager.setPointerDivRectangleAttribute(false);

    // Prevent the default scroll
    event.preventDefault();
}, { passive: false }); // Add passive: false to the addEventListener method
document.addEventListener('mouseover', (event) => {
	const targetClass = event.target.classList;

	// change first span from '• ' to '> '
	if (targetClass.contains('menuItem'))
		event.target.children[0].innerText = '> ';

	const classTriggeringHovering = [
		['mainBackObject', 'active'],
		['menuItem'],
		['homeButton'],
	];
	for (const arrayOfClasses of classTriggeringHovering) {
		let trigger = true;
		for (const className of arrayOfClasses)
			if (!targetClass.contains(className))
				trigger = false;

		if (!trigger) { continue; }

		CursorManager.setPointerDivHoveringAttribute(true);
		return;
	}

	CursorManager.setPointerDivHoveringAttribute(false);
});
document.addEventListener('mouseout', (event) => {
	const targetClass = event.target.classList;

	// change first span from '> ' to '• '
	if (targetClass.contains('menuItem'))
		event.target.children[0].innerText = '• ';
});
//#endregion

//#region - SET SETTINGS FROM LOCALSTORAGE
/*if (localStorage.getItem('dark-mode') === "false") {
	eHTML.toggleDarkModeButton.checked = false;
	toggleDarkMode(eHTML.toggleDarkModeButton);
}*/
//#endregion ----------------------------------------------

});