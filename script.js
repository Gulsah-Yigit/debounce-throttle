const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

/// Every time client puts new letter, timeout resets therefore there won't be any unnecessary callback action. Waits 1second. If no changes, then makes the shot
const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const throttle = (cb, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunction = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunction, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunction, delay);
  };
};

// const updateThrottleText = throttle((text) => {
//   throttleText.textContent = text;
// });

// const updateDebounceText = debounce((text) => {
//   debounceText.textContent = text;
// });

const updateThrottleText = throttle(() => {
  incrementCount(throttleText);
});

const updateDebounceText = debounce(() => {
  incrementCount(debounceText);
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  // updateDebounceText(e.target.value);
  // updateThrottleText(e.target.value);
});

const incrementCount = (element) =>
  (element.textContent = (parseInt(element.innerText) || 0) + 1);

document.addEventListener("mousemove", (e) => {
  incrementCount(defaultText);
  updateDebounceText();
  updateThrottleText();
});
