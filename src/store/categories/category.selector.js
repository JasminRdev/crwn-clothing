export const selectCategoriesMap = (state) => 
state.categoriesMap.categories
    .reduce((acc, category) => {
      const {title, items} = category
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})