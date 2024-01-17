import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "~/slices/CounterSlice";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          className="btn btn-primary btn-sm mx-lg-1"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        &nbsp;
        <span>{count}</span>
        &nbsp;
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="btn btn-primary btn-sm mx-lg-1"
        >
          -
        </button>
      </div>
    </div>
  );
}
