import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const useUserState = () => {
    const {users, isLoading, error ,isLoggedIn, userData ,ban,searchTerm} = useSelector((state: RootState) => state.usersReducer)

    return {
        users,
        error,
        isLoading,
        isLoggedIn,
        userData,
        searchTerm,
        ban
    }
}

export default useUserState