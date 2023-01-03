import { useNavigate } from "react-router-dom";
import TopMenu from "../components/TopMenu"

export default function Profile(){

    const navigate = useNavigate();

    return(
        <div>
            <TopMenu />
            <div>
                <h6>PROFILE PAGE UNDER CONSTRUCTION</h6>
            </div>
        </div>
    )
}