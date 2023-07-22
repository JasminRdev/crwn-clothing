import CATEGORIES_ACTION_TYPES from "./category.types";

import {createAction} from "../../utils/reducer/reducer.utils"

// export const setCategories  = (categoriesArray) => {
//     const test = createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
//     return test
// }

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)


export const fetchCategoriesSuccess = (categoriesArray) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
)

export const fetchCategoriesFailed = (error) => (
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
)
