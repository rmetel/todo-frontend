import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  selectCount,
} from "~/slices/CounterSlice";
import React from "react";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const buttonStyle: React.CSSProperties = {
    border: "none",
    padding: "1px 10px",
  };

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          style={buttonStyle}
        >
          +
        </button>
        &nbsp;
        <span>{count}</span>
        &nbsp;
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          style={buttonStyle}
        >
          -
        </button>
      </div>
    </div>
  );
}