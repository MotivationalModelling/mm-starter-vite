
import {useNavigate} from "react-router-dom";

// ---------------------------------------------------------------------------

/**
 * A button component that can be used to return to the previous page
 */
const ReturnToPrevPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    return (
        <button type="button" className ="btn btn-light" onClick={()=> goBack()}>
            Back
        </button>
    );
};

// ---------------------------------------------------------------------------

export default ReturnToPrevPage;

// ---------------------------------------------------------------------------
