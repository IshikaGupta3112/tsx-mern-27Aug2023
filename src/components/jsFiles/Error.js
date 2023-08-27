import error from "../../assets/Error.jpg";
import "../stylesheets/error.css";

function Error() {
  return (
    <>
      <div id="errorDiv">
        <img src={error} />
        <h1>Site Can not be Loaded!!</h1>
      </div>
    </>
  );
}
export default Error;
