// Test script to clear localStorage and test first visit experience
// Open browser console and run: localStorage.removeItem('portfolio-visited')

console.log('🧪 LOADING SCREEN TEST INSTRUCTIONS:');
console.log('1. Open browser DevTools (F12)');
console.log('2. Go to Console tab');
console.log('3. Run: localStorage.removeItem("portfolio-visited")');
console.log('4. Refresh page - loading screen should appear!');
console.log('5. Visit /blog or any other page - loading screen should NOT appear (returning visitor)');
console.log('');
console.log('🔄 To test again: repeat steps 3-4');

// Quick test function
function testLoadingScreen() {
  localStorage.removeItem('portfolio-visited');
  console.log('✅ localStorage cleared! Refresh page to see loading screen.');
}

console.log('💡 Quick test: Run testLoadingScreen() then refresh page');