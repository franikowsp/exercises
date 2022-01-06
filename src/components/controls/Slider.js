export default function Slider({ id, parameter, update, min, max, label }) {
  return (
    <>
      <div className="flex">
        <label className="flex-2" for={`input-${id}`}>
          {label}
        </label>
        <input
          className="align-middle flex-1 mx-10"
          name={`input-${id}`}
          id={`input-${id}`}
          type="range"
          min={min}
          max={max}
          step=".001"
          value={parameter}
          onChange={({ target }) => update(Number(target.value))}
        />
      </div>
    </>
  );
}
