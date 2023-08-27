import "../stylesheets/Loader.css";

function Loader() {
  return (
    <div id="loader">
      <div id="spinner">
        <div class="spinner-grow text-light" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  );
}
export default Loader;
