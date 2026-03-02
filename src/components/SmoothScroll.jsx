// Example usage in App.jsx
import SmoothScroll, { useLenis, scrollTo } from './SmoothScroll';
import { useCallback } from 'react';

function App() {
  const handleScrollEvent = useCallback(({ progress, direction }) => {
    // Do something with scroll data
    console.log(`Progress: ${progress}, Direction: ${direction}`);
  }, []);

  const handleButtonClick = useCallback(() => {
    scrollTo('#section-2', { 
      duration: 2,
      easing: (x) => 1 - Math.pow(1 - x, 3),
      offset: -100 // scroll 100px above the element
    });
  }, []);

  return (
    <>
      <SmoothScroll 
        config={{
          duration: 1.5,
          smoothTouch: true,
          touchMultiplier: 2,
        }}
        onScroll={handleScrollEvent}
        enabled={true}
      >
        <button onClick={handleButtonClick}>
          Scroll to Section 2
        </button>
        
        <div id="section-1" style={{ height: '100vh' }}>
          Section 1
        </div>
        
        <div id="section-2" style={{ height: '100vh' }}>
          Section 2
        </div>
      </SmoothScroll>
    </>
  );
}

// Custom hook example for a component
function MyComponent() {
  const lenis = useLenis();
  
  const handleCustomScroll = () => {
    if (lenis) {
      lenis.scrollTo('#target', {
        duration: 1,
        easing: (t) => t * (2 - t), // easeOutQuad
        lock: true // prevent user scrolling during animation
      });
    }
  };
  
  return <button className="w-8 h-8 rounded-full bg-text-secondary text-white absolute right-10 bottom-10" onClick={handleCustomScroll}>Scroll</button>;
}