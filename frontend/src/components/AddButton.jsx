import "../styles/addButton.css";

function AddButton({label,onClick}){
    return(
        <button className="add-button" onClick={onClick}>+ {label}</button>
    );
}

export default AddButton;