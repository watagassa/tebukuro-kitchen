import { Slide, useScrollTrigger } from "@mui/material"
import SearchRecipe from "./SearchRecipe"
import SwitchMode from "./SwitchMode"

type propsType = {
    setSearchKeyWord: (kw: string) => void
}

const Header = ({ setSearchKeyWord }: propsType) => {
    const target = useScrollTrigger()

    return (
        <Slide in={!target} appear={false}>
            <div className=" pt-2 px-3 w-full border-black border-b-2 bg-white">
                <SearchRecipe setSearchKeyWord={setSearchKeyWord} />
                <SwitchMode />
            </div>
        </Slide >
    )
}

export default Header