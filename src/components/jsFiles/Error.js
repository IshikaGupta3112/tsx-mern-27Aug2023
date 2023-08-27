import error from "../../assets/Error.jpg";
import "../stylesheets/error.css";

function Error() {
  return (
    <>
      <div id="errorDiv">
        <img src={error} />
      </div>
    </>
  );
}
export default Error;
