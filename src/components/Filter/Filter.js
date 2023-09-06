export const Filter = ({ onSearch }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        onChange={evt => onSearch(evt)}
        placeholder="Topic filter"
      />
    </div>
  );
};
