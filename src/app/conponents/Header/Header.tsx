import { Slide, useScrollTrigger } from "@mui/material"
import SwitchMode from "./SwitchMode"
import SearchBar from "./SearchBar"

const Header = () => {
    const target = useScrollTrigger()

    return (
        <Slide in={!target} appear={false}>
            <div className=" pt-2 px-3 w-full border-black border-b-2 bg-white">
                <SearchBar />
                <SwitchMode />
            </div>
        </Slide >
    )
}

export default Header