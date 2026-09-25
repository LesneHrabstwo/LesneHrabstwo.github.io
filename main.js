


fetch("navBar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
  });

//cursor tracker
const tracker = document.querySelector(".cursorTracker");

if (!tracker) {
  console.warn("Cursor tracker element not found!");
}

let currentAngle = 0;
let velocity = 0;
const maxTilt = 90;
const stiffness = 0.15;
const damping = 0.7;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lockedExtreme = null;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function animate() {
  const rect = tracker.getBoundingClientRect();
  const pivotX = rect.left + rect.width / 2;
  const pivotY = rect.top + rect.height / 2;

  const dx = mouseX - pivotX;
  const dy = mouseY - pivotY;

  // Calculate raw angle
  let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

  // Normalize to prevent wrap-around snapping
  while(rawAngle - currentAngle > 180) rawAngle -= 360;
  while(rawAngle - currentAngle < -180) rawAngle += 360;

  // Clamp targetAngle
  let targetAngle = clamp(rawAngle, -maxTilt, maxTilt);

  // Lock logic: smooth easing into extremes
  if (lockedExtreme) {
    const extremeValue = lockedExtreme === "left" ? -maxTilt : maxTilt;
    const delta = extremeValue - currentAngle;
    targetAngle = currentAngle + delta * 0.1; // softer spring near extreme
    velocity *= 0.8; // damping
  }

  // Spring physics
  const force = (targetAngle - currentAngle) * stiffness;
  velocity = (velocity + force) * damping;
  currentAngle += velocity;

  // Apply extreme lock if hitting limits
  if (!lockedExtreme) {
    if (currentAngle <= -maxTilt) lockedExtreme = "left";
    else if (currentAngle >= maxTilt) lockedExtreme = "right";
  }

  // Release lock if cursor above horizontal pivot
  if (lockedExtreme && mouseY < pivotY) lockedExtreme = null;

  tracker.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;

  requestAnimationFrame(animate);
}

animate();

//this is the observer for the scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optional: unobserve so it doesn’t re-trigger
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); // 20% visible

document.querySelectorAll('.slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});