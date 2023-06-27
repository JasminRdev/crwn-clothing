import CATEGORIES_ACTION_TYPES from "./category.types";

import {createAction} from "../../utils/reducer/reducer.utils"

export const setCategories  = (categoriesArray) => {
    const test = createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
    return test
}