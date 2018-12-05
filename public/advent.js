"use strict";

/* Handle the fact that the server time might differ from local clock time
 * Obviously we perform hard-validation server-side, but this improves the
 * Experience for anybody who really wants to sit up until midnight in order
 * to open the next door. As you do.
 */
const body = document.querySelector('body');
const calendar = document.querySelector('.calendar');
const serverTime = new Date(calendar.dataset.now);
const timeOffset = serverTime - (Date.now());
const calendarYear = 2018;
const gaTrackingId = 'UA-16864247-1';

function getTime(){
  const timewarp = parseInt(calendar.dataset.timewarp || 0) * 86400000; // allow timewarp to take effect at front-end
  return(new Date(Date.now() + timeOffset + timewarp));
}

/* Lay out the doors */
const doorOrder = [ 9,  8, 20,  6, 11,
                    5,  2, 22, 21, 13,
                   12, 19, 24, 16,  1,
                   23,  7,     18, 14,
                    4, 10, 15,  3, 17];
calendar.innerHTML = doorOrder.map(doorNumber=>`
  <div class="box box-${doorNumber}" data-door-number="${doorNumber}">
    <div class="behind"></div>
    <a class="door" href="#">${doorNumber}</a>
  </div>
`).join('');

/* Load "behind" images as appropriate */

// Can this door be opened yet? (client-side validation only; respects timewarp)
function doorOpenable(doorNumber){
  const now = getTime();
  const jsCalendarYear = calendarYear - 1900;
  if(now.getYear() > jsCalendarYear) return true; // calendar can be fully opened after 2018
  const yearAndMonth = parseInt(`${now.getYear()}${now.getMonth()}`);
  if(yearAndMonth < (parseInt(`${jsCalendarYear}11)`))) return false; // calendar can't be opened at all until December 2018
  return (now.getDate() >= doorNumber);
}

// Gets the <img> tag for a door with a specified door number
function doorImage(doorNumber){
  const timewarp = calendar.dataset.timewarp;
  const timewarpPassword = calendar.dataset.timewarpPassword;
  const width = calendar.offsetWidth;
  return `<img src="door.php?doorNumber=${doorNumber}&width=${width}&timewarp=${timewarp}&timewarpPassword=${timewarpPassword}"></img>`;
}

// Preloads what goes "behind" a door (includes server-side validation; respects timewarp)
function preloadDoor(doorNumber){
  const box = document.querySelector(`.box-${doorNumber}`);
  const behind = box.querySelector('.behind');
  if(doorNumber == 24){
    // Door 24 is a special case with two images
    behind.innerHTML = `${doorImage(24)}${doorImage(25)}`;
  } else {
    behind.innerHTML = doorImage(doorNumber);
  }
  box.classList.add('loaded');
}

// Loads the contents of each door that's loadable and not yet loaded
function loadDoors(forceReload){
  doorOrder.forEach(doorNumber=>{
    const box = document.querySelector(`.box-${doorNumber}`);
    if(box.classList.contains('loaded') && !forceReload) return true;
    if(doorOpenable(doorNumber)){
      preloadDoor(doorNumber);
    }
  });
}

let afterResizeDoorReloader;

/* Handle door clicks */
function doorClicked(door){
  const box = door.closest('.box');
  const doorNumber = box.dataset.doorNumber;
  if(box.classList.contains('loaded')){
    // TODO: check img.complete
    door.classList.add('open');
    box.classList.add('open');
    saveState();
  } else if(doorOpenable(doorNumber)) {
    preloadDoor(doorNumber);
    setTimeout(()=>{
      door.classList.add('open');
      box.classList.add('open');
    }, 150);
  } else {
    alert("That door can't be opened yet.");
  }
}

calendar.querySelectorAll('.door').forEach(door=>{
  door.addEventListener('mouseup', e=>{
    e.preventDefault();
    doorClicked(door);
  });
  door.addEventListener('touchend', e=>{
    e.preventDefault();
    doorClicked(door);
  });
});

/* Handle timewarp mode */
const specialKeyCode = 84; // letter "T"
const requiredPressesOfSpecialKey = 5;
let consecutivePressesOfSpecialKey = 0;
document.addEventListener('keyup', e=>{
  // Handle "C" (close all doors)
  if(e.keyCode == 67) return document.querySelectorAll('.door').forEach(d=>d.classList.remove('open'));
  // Handle Special Key
  if(e.keyCode != specialKeyCode) return(consecutivePressesOfSpecialKey = 0);
  consecutivePressesOfSpecialKey++;
  if(consecutivePressesOfSpecialKey < requiredPressesOfSpecialKey) return;
  calendar.dataset.timewarp = prompt('[DEBUG MODE] Timewarp duration (days):', calendar.dataset.timewarp);
  calendar.dataset.timewarpPassword = prompt('[DEBUG MODE] Timewarp password:', calendar.dataset.timewarpPassword);
  consecutivePressesOfSpecialKey = 0;
  loadDoors();
});


/* Handle device rotation */
function checkOrientation(){
  if(window.innerWidth < window.innerHeight){
    // Portrait
    body.classList.remove('landscape');
    body.classList.add('portrait');
  } else {
    // Landscape
    body.classList.remove('portrait');
    body.classList.add('landscape');
  }
  clearTimeout(afterResizeDoorReloader);
  afterResizeDoorReloader = setTimeout(loadDoors(true), 200);
}
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/* Maintain state with a cookie */

// Save current state to the cookie
function saveState(){
  const openDoors = [...document.querySelectorAll('.box.open')].map(box=>box.dataset.doorNumber).sort().join(',');
  document.cookie = `advent${calendarYear}=${openDoors}; expires=Thu, 31 Jan 2019 12:00:00 UTC`;
}

// Load state from the cookie
function loadState(){
  const matches = document.cookie.match(`advent${calendarYear}=([\\d,]+)`);
  if(!matches) return;
  const openDoors = matches[1].split(',');
  openDoors.forEach(doorNumber=>{
    if(!doorOpenable(doorNumber)) return;
    const box = document.querySelector(`.box-${doorNumber}`);
    const door = box.querySelector('.door');
    setTimeout(()=>{
      door.classList.add('open');
      box.classList.add('open');
    }, doorNumber * 100);
  });
}

/* mark page as loaded and load state (after a very brief delay to allow calendar width to be calculated) */
body.classList.remove('loading');
body.classList.add('loaded');
setTimeout(loadDoors, 50);
setTimeout(checkOrientation, 150);
setTimeout(loadState, 300);
