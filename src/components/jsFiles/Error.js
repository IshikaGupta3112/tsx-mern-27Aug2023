import error from '../../assets/Error.jpg'
import '../stylesheets/error.css'

function Error(){
    return(
        <>
      <div id='errorDiv'>
<img src={error}></img>
{/* {console.log(star.toString().split('/')[5])} */}
</div>  
        </>
    )

}
export default Error;