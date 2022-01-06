export default function Slider({ id, parameter, update, min, max, label }) {
  return (
    <>
      <div className="grid grid-cols-12">
        <label className="col-span-1" for={`input-${id}`}>
          {label}
        </label>
        <input
          className="align-middle col-span-11 sm:mx-10"
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
