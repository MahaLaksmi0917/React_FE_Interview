import { useState } from "react";

// note here the WrappedComponent is the original Component ... and we are just passing the count and increemnt 
function withCounter(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [count, setCount] = useState(0);

    function increment() {
      setCount((prev) => prev + 1);
    }

    return <WrappedComponent count={count} increment={increment} {...props} />;
  };
}

export default withCounter;