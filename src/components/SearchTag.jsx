import PropTypes from "prop-types";

function SearchTag(props) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="What do you want to search?"
        value={props.thisTag}
        onChange={(event) => {
          props.setThisTag(event.target.value);
        }}
        className="search-box"
      />
    </div>
  );
}
SearchTag.propTypes = {
  thisTag: PropTypes.func,
  setThisTag: PropTypes.string,
  key: PropTypes.string,
};

export default SearchTag;
